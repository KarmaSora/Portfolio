import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import * as chromeLauncher from 'chrome-launcher';
import { existsSync } from 'node:fs';
import { mkdir, mkdtemp, readdir, rm, writeFile } from 'node:fs/promises';
import { homedir, tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { parseArgs } from 'node:util';
import { startPreview } from './preview.mjs';

const { values } = parseArgs({
  options: {
    dir: { type: 'string', default: 'out' },
    url: { type: 'string' },
    output: { type: 'string', default: 'reports/lighthouse' },
    mode: { type: 'string', default: 'both' },
  },
});
if (!['both', 'mobile', 'desktop'].includes(values.mode)) throw new Error('--mode must be both, mobile or desktop.');
if (values.url && !/^https?:\/\//.test(values.url)) throw new Error('--url must be an HTTP or HTTPS URL.');

async function chromePath() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const cache = process.env.PLAYWRIGHT_BROWSERS_PATH || join(homedir(), '.cache', 'ms-playwright');
  const browsers = (await readdir(cache).catch(() => [])).filter((name) => /^chromium-\d+$/.test(name)).sort((a, b) => Number(b.split('-')[1]) - Number(a.split('-')[1]));
  for (const browser of browsers) {
    for (const suffix of ['chrome-linux64/chrome', 'chrome-linux/chrome', 'chrome-win/chrome.exe', 'chrome-mac/Chromium.app/Contents/MacOS/Chromium']) {
      const candidate = join(cache, browser, suffix);
      if (existsSync(candidate)) return candidate;
    }
  }
  const installed = chromeLauncher.Launcher.getInstallations();
  if (installed.length) return installed[0];
  throw new Error('Chrome was not found. Install Chrome/Chromium or set CHROME_PATH to its executable.');
}

let preview;
let chrome;
let profile;
try {
  const executable = await chromePath();
  preview = values.url ? undefined : await startPreview(values.dir);
  const url = values.url || preview.url;
  const output = resolve(values.output);
  await mkdir(output, { recursive: true });
  profile = await mkdtemp(join(tmpdir(), 'portfolio-lighthouse-'));
  // chrome-launcher assumes Windows Chrome under WSL. A Linux browser needs the
  // native profile path as the final flag instead of the converted Windows path.
  const nativeProfile = process.platform === 'linux' && !executable.endsWith('.exe') ? [`--user-data-dir=${profile}`] : [];
  chrome = await chromeLauncher.launch({
    chromePath: executable,
    userDataDir: profile,
    chromeFlags: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', ...nativeProfile],
  });
  const summary = { url, auditedAt: new Date().toISOString(), results: {} };
  for (const mode of values.mode === 'both' ? ['mobile', 'desktop'] : [values.mode]) {
    console.log(`Running Lighthouse (${mode}): ${url}`);
    const result = await lighthouse(url, {
      port: chrome.port,
      logLevel: 'error',
      output: ['html', 'json'],
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    }, mode === 'desktop' ? desktopConfig : undefined);
    if (!result || result.lhr.runtimeError) throw new Error(result?.lhr.runtimeError?.message || 'Lighthouse did not return a report.');
    await writeFile(join(output, `${mode}.html`), result.report[0]);
    await writeFile(join(output, `${mode}.json`), result.report[1]);
    const scores = Object.fromEntries(Object.entries(result.lhr.categories).map(([id, category]) => [id, category.score === null ? null : Math.round(category.score * 100)]));
    summary.results[mode] = { scores, lighthouseVersion: result.lhr.lighthouseVersion, warnings: result.lhr.runWarnings };
    console.log(`${mode}: ${JSON.stringify(scores)}`);
  }
  await writeFile(join(output, 'summary.json'), JSON.stringify(summary, null, 2) + '\n');
  console.log(`Lighthouse HTML and JSON reports saved to ${output}`);
} finally {
  try {
    if (chrome) await chrome.kill();
  } finally {
    if (profile) await rm(profile, { recursive: true, force: true });
    if (preview) await new Promise((resolve) => preview.server.close(resolve));
  }
}
