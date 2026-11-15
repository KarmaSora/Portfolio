import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { portfolioRoot, sourceCheckout, sourceCommit } from './project-source.mjs';
import { applyProjectFix } from './apply-project-fix.mjs';

// Refresh provenance after a deliberate submodule update. Never copies project sources.
const manifests = ['vendor/showcase-serl/provenance.json', 'vendor/terminal-projects/provenance.json', 'vendor/eshop/provenance.json'];
const candidates = new Map();
for (const name of manifests) {
  const manifest = JSON.parse(await readFile(resolve(portfolioRoot, name), 'utf8'));
  const sources = manifest.projects ? Object.values(manifest.projects) : [manifest];
  for (const source of sources) {
    const checkout = sourceCheckout(source);
    if (execFileSync('git', ['-C', checkout, 'status', '--porcelain', '--untracked-files=no'], { encoding: 'utf8' }).trim()) {
      throw new Error(`${source.submodule} has tracked changes. Commit them in its original repository or restore the checkout before refreshing provenance.`);
    }
    source.commit = sourceCommit(source);
    for (const file of source.files) {
      const path = resolve(checkout, source.path || '.', file.path);
      const bytes = await readFile(path);
      file.sha256 = createHash('sha256').update(bytes).digest('hex');
      if (file.gitBlob) file.gitBlob = execFileSync('git', ['hash-object', '--', path], { encoding: 'utf8' }).trim();
    }
    console.log(`${source.submodule}${source.path ? '/' + source.path : ''}: ${source.commit.slice(0, 12)}`);
  }
  candidates.set(name, manifest);
}

const terminals = candidates.get('vendor/terminal-projects/provenance.json').projects;
const fixPath = 'vendor/terminal-projects/fixes/provenance.json';
const fixes = JSON.parse(await readFile(resolve(portfolioRoot, fixPath), 'utf8'));
for (const [slug, fix] of Object.entries(fixes.projects)) {
  const project = terminals[slug];
  for (const file of fix.files) {
    if (project.files.find(entry => entry.path === file.path)?.sha256 !== file.originalSha256) {
      throw new Error(`Review ${fix.patch} against the changed ${slug}/${file.path} before refreshing its fix provenance.`);
    }
  }
  fix.basedOnCommit = project.commit;
  const files = {};
  for (const file of project.files) files[file.path] = await readFile(resolve(sourceCheckout(project), project.path, file.path), 'utf8');
  await applyProjectFix(files, project, fix, resolve(portfolioRoot, 'vendor/terminal-projects/fixes'));
}
candidates.set(fixPath, fixes);

// Validate every candidate before writing any of the provenance files.
for (const [name, manifest] of candidates) {
  const path = resolve(portfolioRoot, name);
  const output = JSON.stringify(manifest, null, 2) + '\n';
  if (await readFile(path, 'utf8') !== output) await writeFile(path, output);
}
const fatBuild = JSON.parse(await readFile(resolve(portfolioRoot, 'vendor/terminal-projects/fat-build/build.json'), 'utf8'));
if (fatBuild.originalCommit !== terminals.fat.commit) console.log('The FAT source revision changed. Run npm run build:fat-demo with Emscripten 4.0.21 before the normal build.');
console.log('Provenance refreshed. Run npm run build and the demo checks, then commit the reviewed submodule pointers and provenance together.');
