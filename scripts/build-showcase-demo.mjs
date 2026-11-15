import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import loadConfig from 'tailwindcss/loadConfig.js';
import autoprefixer from 'autoprefixer';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const vendor = resolve(root, 'vendor/showcase-serl');
const original = resolve(vendor, 'original');
const runtime = resolve(vendor, 'runtime');
const output = resolve(root, 'public/project-apps/showcase');
const provenance = JSON.parse(await readFile(resolve(vendor, 'provenance.json'), 'utf8'));

for (const file of provenance.files) {
  const bytes = await readFile(resolve(original, file.path));
  if (createHash('sha256').update(bytes).digest('hex') !== file.sha256) throw new Error(`Original ShowcaseSERL source changed: ${file.path}`);
}

await mkdir(output, { recursive: true });
const config = loadConfig(resolve(original, 'tailwind.config.ts'));
config.content = [resolve(original, 'src/**/*.{ts,tsx}'), resolve(runtime, '*.{ts,tsx}')];
const css = await readFile(resolve(original, 'src/app/globals.css'), 'utf8');
const compiled = await postcss([tailwindcss(config), autoprefixer]).process(css, { from: resolve(original, 'src/app/globals.css') });
await writeFile(resolve(output, 'app.css'), `${compiled.css}\n${await readFile(resolve(runtime, 'responsive.css'), 'utf8')}`);

await build({
  absWorkingDir: root,
  entryPoints: [resolve(runtime, 'main.tsx')],
  outfile: resolve(output, 'app.js'),
  bundle: true,
  minify: true,
  platform: 'browser',
  format: 'iife',
  target: ['es2020'],
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"', 'process.env.NEXT_PUBLIC_BASE_PATH': 'window.__SHOWCASE_BASE_PATH__' },
  plugins: [{
    name: 'original-next-browser-adapters',
    setup(builder) {
      const aliases = { 'next/link': 'navigation.tsx', 'next/navigation': 'navigation.tsx', 'next/image': 'image.tsx', crypto: 'crypto.ts' };
      builder.onResolve({ filter: /^(next\/(link|navigation|image)|crypto)$/ }, args => ({ path: resolve(runtime, aliases[args.path]) }));
    },
  }],
});

const container = await readFile(resolve(original, 'src/app/components/Container.tsx'), 'utf8');
const placeholder = container.match(/data:image\/jpeg;base64,[^'\s]+/)?.[0];
if (!placeholder) throw new Error('Original placeholder image was not found');
await writeFile(resolve(output, 'placeholder.txt'), placeholder);
await writeFile(resolve(output, 'research.json'), await readFile(resolve(original, 'public/research.json')));
await writeFile(resolve(output, 'LICENSE'), await readFile(resolve(original, 'LICENSE')));
await writeFile(resolve(output, 'provenance.json'), JSON.stringify({ ...provenance, runtime: 'Original React components and stylesheet with browser navigation/image/SHA-256 adapters; size-only phone CSS.', originalData: true }, null, 2) + '\n');
await writeFile(resolve(output, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>ShowcaseSERL</title><link rel="icon" href="data:,"><link rel="stylesheet" href="./app.css"></head>
<body class="antialiased"><div id="showcase-root"></div><script>window.__SHOWCASE_BASE_PATH__=location.pathname.replace(/\\/index\\.html$/,"").replace(/\\/$/,"");</script><script defer src="./app.js"></script></body></html>\n`);
console.log(`Built original ShowcaseSERL application (${provenance.commit.slice(0, 7)}; ${provenance.files.length} verified source files).`);
