import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';

export async function applyProjectFix(files, project, fix, directory) {
  if (fix.basedOnCommit !== project.commit) throw new Error('The local input fix targets a different source revision.');
  const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
  const patch = await readFile(resolve(directory, fix.patch));
  if (sha256(patch) !== fix.patchSha256) throw new Error('The local input patch changed without updating its provenance.');
  for (const file of fix.files) {
    if (sha256(files[file.path]) !== file.originalSha256) throw new Error(`Review the input patch against the updated source: ${file.path}`);
  }
  const work = await mkdtemp(join(tmpdir(), 'portfolio-project-fix-'));
  try {
    for (const [name, contents] of Object.entries(files)) await writeFile(resolve(work, name), contents);
    execFileSync('git', ['apply', '--check', '-'], { cwd: work, input: patch, stdio: ['pipe', 'pipe', 'pipe'] });
    execFileSync('git', ['apply', '-'], { cwd: work, input: patch, stdio: ['pipe', 'pipe', 'pipe'] });
    const result = { ...files };
    for (const file of fix.files) {
      const bytes = await readFile(resolve(work, file.path));
      if (sha256(bytes) !== file.sha256) throw new Error(`Patched output does not match the reviewed fix: ${file.path}`);
      result[file.path] = bytes.toString('utf8');
    }
    return result;
  } finally {
    await rm(work, { recursive: true, force: true });
  }
}
