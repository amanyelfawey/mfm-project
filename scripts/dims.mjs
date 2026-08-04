/** Throwaway helper: prints EXIF-corrected dimensions of every source asset. */
import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

for (const dir of ['gallery', 'marbles']) {
  const full = path.join(root, 'src', 'assets', dir)
  for (const name of await readdir(full)) {
    const { info } = await sharp(path.join(full, name))
      .rotate()
      .toBuffer({ resolveWithObject: true })
    console.log(`${dir}/${name.padEnd(12)} ${info.width}x${info.height}`)
  }
}
