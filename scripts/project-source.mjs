import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const portfolioRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function sourceCheckout(source) {
  const checkout = resolve(portfolioRoot, source.submodule);
  if (!checkout.startsWith(resolve(portfolioRoot, 'projects') + sep) || !existsSync(resolve(checkout, '.git'))) {
    throw new Error(`Missing project submodule: ${source.submodule}. Run git submodule update --init first. See docs/PROJECT_SUBMODULES.md.`);
  }
  return checkout;
}

export function sourceCommit(source) {
  return execFileSync('git', ['-C', sourceCheckout(source), 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
}

export function projectSource(source) {
  const commit = sourceCommit(source);
  if (commit !== source.commit) {
    throw new Error(`${source.submodule} is at ${commit}, but the demo records ${source.commit}. Restore the pinned checkout with git submodule update --init, or review the update and run npm run sources:refresh.`);
  }
  return resolve(sourceCheckout(source), source.path || '.');
}
