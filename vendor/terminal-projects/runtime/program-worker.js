let active = false;
self.onmessage = async event => {
  if (active) return;
  active = true;
  const { project, token, root, revision = '' } = event.data;
  const version = `?v=${encodeURIComponent(revision)}`;
  const decoder = new TextDecoder();
  const send = (type, value) => self.postMessage({ type, value });
  const readLine = () => {
    send('input');
    for (;;) {
      const request = new XMLHttpRequest();
      request.open('GET', `${root}__stdin?token=${encodeURIComponent(token)}`, false);
      request.send();
      if (request.status === 204) continue;
      if (request.status === 410) return null;
      if (request.status !== 200) throw new Error('Terminal input connection was interrupted. Restart the session.');
      return request.responseText;
    }
  };
  try {
    if (project === 'fat') {
      importScripts(`${root}fat/fat.js${version}`);
      let bytes = [], position = 0, initialiseDisk = true;
      const module = await createFAT({
        locateFile: name => `${root}fat/${name}${version}`,
        noInitialRun: true,
        stdin() {
          // End this device read after one line. Otherwise libc's buffered read
          // requests another line before getline() can process the first one.
          if (bytes.length && position >= bytes.length) {
            bytes = []; position = 0;
            return undefined;
          }
          if (position >= bytes.length) {
            // Every new worker has a fresh MEMFS disk. Run the original shell's
            // format command before user input so root/FAT blocks are reserved.
            const line = initialiseDisk ? 'format' : readLine();
            if (initialiseDisk) {
              send('output', 'format\n');
              initialiseDisk = false;
            }
            if (line === null) return null;
            bytes = new TextEncoder().encode(`${line}\n`); position = 0;
          }
          return bytes[position++];
        },
        stdout: value => send('output', decoder.decode(new Uint8Array([value]), { stream: true })),
        stderr: value => send('output', decoder.decode(new Uint8Array([value]), { stream: true })),
        printErr: value => send('output', `${value}\n`),
        onExit: code => send('exit', code),
      });
      send('running');
      module.callMain([]);
    } else {
      importScripts(`${root}python/pyodide.js`);
      const python = await loadPyodide({ indexURL: `${root}python/`, stdin: readLine });
      python.setStdout({ write(buffer) { send('output', decoder.decode(buffer, { stream: true })); return buffer.length; }, isatty: true });
      python.setStderr({ write(buffer) { send('output', decoder.decode(buffer, { stream: true })); return buffer.length; }, isatty: true });
      const response = await fetch(`${root}programs/${project}.json${version}`);
      if (!response.ok) throw new Error('The original project files could not be loaded.');
      const files = await response.json();
      python.FS.mkdir('/project');
      for (const [name, content] of Object.entries(files)) python.FS.writeFile(`/project/${name}`, content);
      python.registerJsModule('terminal_io', { clear: () => send('output', '\x1b[2J\x1b[H') });
      // Adapt the terminal's clear command, without changing original Python files.
      python.runPython(`import os, sys, terminal_io
os.chdir('/project')
sys.path.insert(0, '/project')
def _terminal_system(command):
    if command.strip() == 'clear':
        terminal_io.clear()
        return 0
    raise OSError('This browser terminal supports the clear command only')
os.system = _terminal_system
`);
      send('running');
      python.runPython("import runpy; runpy.run_path('/project/main.py', run_name='__main__')");
      send('exit', 0);
    }
  } catch (error) {
    // Emscripten can signal a normal exit through an ExitStatus exception.
    if (error?.name === 'ExitStatus' && error.status === 0) return;
    send('error', error?.message || String(error));
  }
};
