import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const directory = resolve(root, 'vendor/arm-controller');
const provenance = JSON.parse(await readFile(resolve(directory, 'provenance.json'), 'utf8'));
const original = await readFile(resolve(directory, 'controller-original.elf'));
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
assert.equal(sha256(original), provenance.originalElfSha256, 'Original ARM executable changed');
assert.equal(original.subarray(0, 6).toString('hex'), '7f454c460101', 'Requires a little-endian ELF32 executable');
assert.equal(original.readUInt16LE(18), 40, 'Requires an ARM executable');

const phoff = original.readUInt32LE(28), shoff = original.readUInt32LE(32);
const phsize = original.readUInt16LE(42), phcount = original.readUInt16LE(44);
const shsize = original.readUInt16LE(46), shcount = original.readUInt16LE(48);
const programs = Array.from({ length: phcount }, (_, index) => {
  const offset = phoff + index * phsize;
  return { type: original.readUInt32LE(offset), offset: original.readUInt32LE(offset + 4), address: original.readUInt32LE(offset + 8), size: original.readUInt32LE(offset + 16) };
});
const first = Math.min(...programs.filter(program => program.type === 1).map(program => program.offset));
const prefix = 256, shift = first - prefix;
assert.ok(shift > 0 && phoff + phcount * phsize <= prefix);
assert.ok(original.subarray(phoff + phcount * phsize, first).every(byte => byte === 0), 'Only empty file padding may be removed');
const packaged = Buffer.concat([original.subarray(0, prefix), original.subarray(first)]);
packaged.writeUInt32LE(shoff - shift, 32);
const segments = [];
for (const [index, program] of programs.entries()) {
  const header = phoff + index * phsize;
  const offset = program.offset >= first ? program.offset - shift : program.offset;
  packaged.writeUInt32LE(offset, header + 4);
  if (program.type === 1) {
    packaged.writeUInt32LE(4, header + 28);
    const before = original.subarray(program.offset, program.offset + program.size);
    assert.deepEqual(packaged.subarray(offset, offset + program.size), before, 'ARM machine code/data must remain identical');
    segments.push({ address: program.address, bytes: program.size, sha256: sha256(before) });
  }
}
for (let index = 0; index < shcount; index++) {
  const offset = original.readUInt32LE(shoff + index * shsize + 16);
  if (offset >= first) packaged.writeUInt32LE(offset - shift, shoff - shift + index * shsize + 16);
}
const record = { source: provenance.source, sourceSha256: provenance.sourceSha256, executableSha256: sha256(packaged), entry: packaged.readUInt32LE(24), segments, base64: packaged.toString('base64') };
await mkdir(resolve(root, 'public/demos/arm'), { recursive: true });
await writeFile(resolve(root, 'public/demos/arm/controller.elf'), packaged);
await writeFile(resolve(root, 'public/demos/arm/provenance.json'), JSON.stringify({ ...provenance, executableSha256: record.executableSha256, entry: record.entry, segments, packaging: 'Empty ELF file padding removed; loadable machine-code/data bytes and addresses unchanged.' }, null, 2) + '\n');
await writeFile(resolve(root, 'src/data/arm-program.json'), JSON.stringify(record, null, 2) + '\n');
console.log(`Packaged original ARM executable (${packaged.length} bytes; loadable instructions/data verified unchanged).`);
