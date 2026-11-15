// Optional, explicit rebuild. Normal portfolio builds use the pinned WASM files.
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const vendor = resolve(root, 'vendor/terminal-projects');
const original = resolve(vendor, 'original/fat');
const output = resolve(vendor, 'fat-build');
const compiler = process.env.EMXX || 'em++';
const manifest = JSON.parse(await readFile(resolve(vendor, 'provenance.json'), 'utf8'));
for (const file of manifest.projects.fat.files) {
  const bytes = await readFile(resolve(original, file.path));
  if (createHash('sha256').update(bytes).digest('hex') !== file.sha256) throw new Error(`Original FAT source changed: ${file.path}`);
}
await mkdir(output, { recursive: true });
const version = spawnSync(compiler, ['--version'], { encoding: 'utf8' });
if (version.status !== 0) throw new Error('Install Emscripten 4.0.21 and set EMXX to its em++ executable.');
const flags = ['-O2', '-std=c++17', '-include', 'cstdint', '-sMODULARIZE=1', '-sEXPORT_NAME=createFAT', '-sENVIRONMENT=worker', '-sEXIT_RUNTIME=1', '-sFORCE_FILESYSTEM=1', '-sINVOKE_RUN=0', '-sALLOW_MEMORY_GROWTH=1', '-sEXPORTED_RUNTIME_METHODS=callMain,FS'];
const build = spawnSync(compiler, [...['main.cpp', 'shell.cpp', 'fs.cpp', 'disk.cpp'].map(name => resolve(original, name)), ...flags, '-o', resolve(output, 'fat.js')], { stdio: 'inherit' });
if (build.status !== 0) process.exit(build.status || 1);
const files = {};
for (const name of ['fat.js', 'fat.wasm']) files[name] = createHash('sha256').update(await readFile(resolve(output, name))).digest('hex');
await writeFile(resolve(output, 'build.json'), JSON.stringify({ compiler: version.stdout.split('\n')[0], flags, originalCommit: manifest.projects.fat.commit, files, changes: 'No source edits. Forced cstdint include supplies the fixed-width types expected by the original headers.' }, null, 2) + '\n');
console.log('Compiled the original FAT C++ shell and filesystem to WebAssembly.');
