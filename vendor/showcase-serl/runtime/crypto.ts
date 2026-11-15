import { sha256 } from 'js-sha256'

export function createHash(algorithm: string) {
  if (algorithm !== 'sha256') throw new Error(`Unsupported digest: ${algorithm}`)
  let input = ''
  return {
    update(value: string) { input += value; return this },
    digest(encoding: string) {
      if (encoding !== 'hex') throw new Error(`Unsupported encoding: ${encoding}`)
      return sha256(input)
    },
  }
}

export default { createHash }
