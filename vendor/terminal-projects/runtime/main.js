import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';

const projects = {
  marvin: { title: 'MARVIN / Shadow', card: 'marvin-shadow', hint: 'Try 2 for temperature conversion, inv pick book for the backpack, or 13 for country emissions. q exits.' },
  typing: { title: 'Terminal Typing Trainer', card: 'typing-trainer', hint: 'Choose 1, 2 or 3 for a typing test, 4 for session scores, or 5 for timed practice. Follow the original prompts.' },
  analyser: { title: 'Text File Analyser', card: 'typing-trainer', hint: 'Try words, letters, lines, wf or lf. change switches between phil.txt and lorum.txt. q exits.' },
  fat: { title: 'FAT File System', card: 'fat-file-system', hint: 'The fresh 8 MiB disk is formatted automatically. Try mkdir test, cd test, then pwd to see your location. create notes reads lines until a blank line; help lists commands. Restart starts fresh.' },
};
const project = new URLSearchParams(location.search).get('project') || 'marvin';
const info = projects[project];
const status = document.querySelector('#status');
if (!info) throw new Error('Unknown terminal project');
document.title = `${info.title} — Original program`;
document.querySelector('h1').textContent = info.title;
document.querySelector('#hint').textContent = info.hint;
const root = new URL('./', location.href).href;
const revision = new URL(document.querySelector('script[src*="app.js"]').src).searchParams.get('v') || '';
const base = location.pathname.split('/project-apps/terminal/')[0];
document.querySelector('#back').href = `${base}/#${info.card}`;
document.querySelector('#provenance').href = './provenance.json';
for (const [id, item] of Object.entries(projects)) {
  const link = document.createElement('a');
  link.href = `${base}/demos/${id}/`; link.target = '_top'; link.textContent = item.title;
  if (id === project) link.setAttribute('aria-current', 'page');
  document.querySelector('#switcher').append(link);
}
const terminal = new Terminal({
  cursorBlink: true, convertEol: true, scrollback: 5000, fontSize: 15,
  fontFamily: '"Cascadia Mono", "DejaVu Sans Mono", monospace',
  theme: { background: '#101214', foreground: '#ecefee', cursor: '#b4e0cc', selectionBackground: '#3a5250' },
  allowProposedApi: false, screenReaderMode: true,
});
const fit = new FitAddon(); terminal.loadAddon(fit);
terminal.open(document.querySelector('#terminal'));
new ResizeObserver(() => fit.fit()).observe(document.querySelector('#terminal'));
fit.fit();
let worker, token, controller, pending = false, line = '', inputQueue = [], escape = false;
const setStatus = message => { status.textContent = message; };
const sendLine = value => {
  terminal.write('\r\n');
  controller.postMessage({ type: 'line', token, line: value });
  pending = false; setStatus('Running');
};
const consume = () => {
  while (pending && inputQueue.length) {
    const character = inputQueue.shift();
    if (character === '\x1b') { escape = true; continue; }
    if (escape) { if (/[A-Za-z~]/.test(character)) escape = false; continue; }
    if (character === '\r') {
      const value = line; line = ''; sendLine(value);
    } else if (character === '\x7f' || character === '\b') {
      if (line.length) { line = [...line].slice(0, -1).join(''); terminal.write('\b \b'); }
    } else if (character >= ' ') {
      line += character;
      terminal.write(character);
    }
  }
};
terminal.onData(data => {
  if (!pending) return;
  inputQueue.push(...data.replace(/\r\n/g, '\r').replace(/\n/g, '\r'));
  consume();
});
async function start() {
  const restart = document.querySelector('#restart');
  restart.disabled = true;
  worker?.terminate();
  if (token && controller) controller.postMessage({ type: 'close', token });
  pending = false; line = ''; inputQueue = []; escape = false;
  terminal.reset(); setStatus('Loading original program…');
  try {
    if (!('serviceWorker' in navigator)) throw new Error('Open this demo on localhost or HTTPS in a browser with service-worker support.');
    await navigator.serviceWorker.register('./input-worker.js', { scope: './' });
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) await new Promise(resolve => navigator.serviceWorker.addEventListener('controllerchange', resolve, { once: true }));
    controller = navigator.serviceWorker.controller;
    token = crypto.randomUUID();
    await new Promise(resolve => {
      const channel = new MessageChannel(); channel.port1.onmessage = resolve;
      controller.postMessage({ type: 'open', token }, [channel.port2]);
    });
    worker = new Worker(`./program-worker.js?v=${encodeURIComponent(revision)}`);
    worker.onmessage = ({ data }) => {
      if (data.type === 'output') terminal.write(data.value);
      if (data.type === 'running') setStatus('Running');
      if (data.type === 'input') { pending = true; setStatus('Waiting for input'); terminal.focus(); consume(); }
      if (data.type === 'exit') { pending = false; setStatus('Session finished · Restart to run again'); }
      if (data.type === 'error') { pending = false; terminal.writeln(`\r\n${data.value}`); setStatus('Session stopped · Restart to try again'); }
    };
    worker.onerror = () => { pending = false; setStatus('Unable to start the program · Restart to try again'); };
    worker.postMessage({ project, token, root, revision });
  } catch (error) { terminal.writeln(error.message); setStatus('Unable to start'); }
  finally { restart.disabled = false; }
}
document.querySelector('#restart').onclick = start;
window.addEventListener('pagehide', () => { worker?.terminate(); controller?.postMessage({ type: 'close', token }); });
start();
