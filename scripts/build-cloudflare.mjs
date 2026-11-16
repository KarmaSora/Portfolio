import { spawnSync } from 'node:child_process';

// A dedicated hostname serves the export at /, while GitHub Pages keeps its prefix.
const result = spawnSync(process.execPath, [process.env.npm_execpath, 'run', 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH: '',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.karammatar.com/',
  },
});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
