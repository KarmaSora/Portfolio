# Original terminal projects

`original/` contains 32 byte-for-byte source/data snapshots from Karam's Python and OperatingSystem repositories. `provenance.json` pins commits, paths and hashes. Builds verify every file. Original code owns the ASCII art, menus, prompts, calculations and file operations; xterm supplies browser keyboard input and rendering.

Pinned Pyodide 0.27.7 runs Python. The platform shim maps `os.system('clear')` to terminal clear. MARVIN also receives two explicit country-input corrections from `fixes/`, with separate input/output hashes; immutable original snapshots are retained. Typing scores/comparison/practice files start empty per session; calculations are unchanged. MARVIN remains a scripted fake AI interface.

Synchronous stdin runs in a dedicated worker. A service worker scoped only to this terminal bridges reads to keyboard input; each pending read retries after 20 seconds if needed. The page stays responsive without SharedArrayBuffer or cross-origin isolation. Source/input remain on this origin. HTTPS or localhost with service-worker support is required. Restart terminates the program and discards its files.

FAT runs the original C++ main/Shell/FS/Disk compiled with Emscripten 4.0.21. Its 8 MiB disk is a session-local MEMFS file. The browser automatically sends the original shell's `format` command when its fresh disk starts, reserving root/FAT blocks before user input. `cd` is silent and the prompt stays `filesystem>`; use `pwd` to see the location. End `create` with a blank line, and use permissions such as `chmod r-- notes`. Original algorithms and intended exit/storage behaviour remain intact. A forced `cstdint` include supplies the missing header without source edits. `fat-build/` pins compiler flags and output hashes; normal builds don't require the SDK.

```bash
# Optional deliberate rebuild:
EMXX=/path/to/emsdk/upstream/emscripten/em++ npm run build:fat-demo
npm run build:project-demos
```

`npm ci` installs the pinned browser runtimes. `predev`/`prebuild` generate the ignored `public/project-apps/terminal/`. Python loads only when a terminal opens. Standalone entry: `index.html?project=marvin` (also `typing`, `analyser`, `fat`). Next hosts: `/demos/marvin/`, `/demos/typing/`, `/demos/analyser/`, `/demos/fat/`. The analyser is independently runnable related work under Typing Trainer.

Third-party runtimes retain their package/lockfile and upstream licensing provenance. Public delivery would make bundled Python source inspectable. This work remains local and unpushed; no source repository visibility is changed.

The generated content revision is used by the iframe, terminal bundle, worker and program/FAT payload requests to keep updated assets consistent after refresh. See [reported-issue repair and source/version evidence](../../docs/TERMINAL_DEMO_FIXES_2026-11-15.md).
