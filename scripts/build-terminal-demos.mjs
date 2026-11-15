import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const vendor = resolve(root, 'vendor/terminal-projects');
const output = resolve(root, 'public/project-apps/terminal');
const provenance = JSON.parse(await readFile(resolve(vendor, 'provenance.json'), 'utf8'));
const fixes = JSON.parse(await readFile(resolve(vendor, 'fixes/provenance.json'), 'utf8'));
await mkdir(resolve(output, 'programs'), { recursive: true });
for (const [slug, project] of Object.entries(provenance.projects)) {
  const files = {};
  for (const file of project.files) {
    const bytes = await readFile(resolve(vendor, 'original', slug, file.path));
    if (createHash('sha256').update(bytes).digest('hex') !== file.sha256) throw new Error(`Original ${slug} source changed: ${file.path}`);
    files[file.path] = bytes.toString('utf8');
  }
  if (slug === 'fat') continue;
  const localFix = fixes.projects[slug];
  if (localFix) {
    if (localFix.basedOnCommit !== project.commit) throw new Error(`Local ${slug} fixes target a different original revision`);
    for (const file of localFix.files) {
      const original = project.files.find(entry => entry.path === file.path);
      if (!original || original.sha256 !== file.originalSha256) throw new Error(`Local fix original does not match: ${slug}/${file.path}`);
      const bytes = await readFile(resolve(vendor, 'fixes', slug, file.path));
      if (createHash('sha256').update(bytes).digest('hex') !== file.sha256) throw new Error(`Local fix changed without updating provenance: ${slug}/${file.path}`);
      files[file.path] = bytes.toString('utf8');
    }
  }
  if (slug === 'typing') for (const name of ['score.txt', 'compare.txt', 'randomTest.txt']) files[name] = '';
  await writeFile(resolve(output, 'programs', `${slug}.json`), JSON.stringify(files));
}
await mkdir(resolve(output, 'python'), { recursive: true });
for (const name of ['pyodide.js', 'pyodide.asm.js', 'pyodide.asm.wasm', 'python_stdlib.zip', 'pyodide-lock.json', 'README.md']) await cp(resolve(root, 'node_modules/pyodide', name), resolve(output, 'python', name));
await mkdir(resolve(output, 'licenses'), { recursive: true });
for (const name of ['xterm', 'addon-fit']) await cp(resolve(root, 'node_modules/@xterm', name, 'LICENSE'), resolve(output, 'licenses', `${name}.txt`));
for (const name of ['pyodide', 'python', 'emscripten']) await cp(resolve(vendor, 'licenses', `${name}.txt`), resolve(output, 'licenses', `${name}.txt`));
await build({ entryPoints: [resolve(vendor, 'runtime/main.js')], outfile: resolve(output, 'app.js'), bundle: true, minify: true, platform: 'browser', target: ['es2020'] });
await cp(resolve(root, 'node_modules/@xterm/xterm/css/xterm.css'), resolve(output, 'terminal.css'));
for (const name of ['input-worker.js', 'program-worker.js', 'app.css']) await cp(resolve(vendor, 'runtime', name), resolve(output, name));
const fatBuild = JSON.parse(await readFile(resolve(vendor, 'fat-build/build.json'), 'utf8'));
if (fatBuild.originalCommit !== provenance.projects.fat.commit) throw new Error('FAT binary was built from a different source revision');
for (const [name, hash] of Object.entries(fatBuild.files)) {
  if (createHash('sha256').update(await readFile(resolve(vendor, 'fat-build', name))).digest('hex') !== hash) throw new Error(`Pinned FAT build changed: ${name}`);
}
await cp(resolve(vendor, 'fat-build'), resolve(output, 'fat'), { recursive: true });
const template = await readFile(resolve(vendor, 'runtime/index.html'), 'utf8');
const digest = createHash('sha256').update(template);
for (const name of ['app.js', 'app.css', 'terminal.css', 'input-worker.js', 'program-worker.js', 'fat/fat.js', 'fat/fat.wasm', 'programs/marvin.json', 'programs/typing.json', 'programs/analyser.json']) digest.update(await readFile(resolve(output, name)));
const revision = digest.digest('hex').slice(0, 16);
await writeFile(resolve(output, 'index.html'), template.replaceAll('./app.js', `./app.js?v=${revision}`).replaceAll('./app.css', `./app.css?v=${revision}`).replaceAll('./terminal.css', `./terminal.css?v=${revision}`));
await writeFile(resolve(root, 'src/data/terminal-runtime.json'), JSON.stringify({ revision }, null, 2) + '\n');
await writeFile(resolve(output, 'provenance.json'), JSON.stringify({ ...provenance, revision, localFixes: fixes.projects, adapters: ['Browser stdin/stdout and terminal clear; original snapshots are retained with explicit local MARVIN input fixes.', 'Typing mutable scores/comparison files start empty in each session.', 'FAT compiled from original C++; the first shell command formats the new session-local MEMFS disk.'], runtimes: { pyodide: '0.27.7', xterm: '5.5.0', emscripten: '4.0.21' } }, null, 2) + '\n');
console.log(`Built Python and FAT demos (${revision}; 32 verified original files plus documented MARVIN input fixes).`);
