/** Throwaway helper: mirrors public/images/**.webp to .preview/**.jpg for review. */
import sharp from 'sharp'
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(root, 'public', 'images')
const PREVIEW = path.join(root, '.preview')

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (entry.name.endsWith('.webp')) files.push(full)
  }
  return files
}

const files = await walk(OUT)
for (const file of files) {
  const rel = path.relative(OUT, file).replace(/[\\/]/g, '-').replace(/\.webp$/, '.jpg')
  await mkdir(PREVIEW, { recursive: true })
  await sharp(file).resize({ width: 720 }).jpeg({ quality: 80 }).toFile(path.join(PREVIEW, rel))
}
console.log(`${files.length} previews written to .preview`)
