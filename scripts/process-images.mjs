/**
 * Crops, colour-grades and compresses the raw project photography in
 * `src/assets` into web-ready art for `public/images`.
 *
 * Only the strongest stone-forward frames are kept. Each job declares a
 * `focus` box so packaging, cables and site clutter stay outside the crop.
 * Colour grading steers every shot toward white / black / gold / beige.
 *
 * Run with: npm run images
 */
import sharp from 'sharp'
import { mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC = path.join(root, 'src', 'assets')
const OUT = path.join(root, 'public', 'images')

const PRESETS = {
  gold: { saturation: 0.92, brightness: 1.06, contrast: 1.1, r: 1.035, g: 1.0, b: 0.95 },
  stoneWarm: { saturation: 0.58, brightness: 1.06, contrast: 1.08, r: 1.02, g: 0.995, b: 0.96 },
  stoneCool: { saturation: 0.42, brightness: 1.07, contrast: 1.1, r: 1.03, g: 0.985, b: 0.99 },
  beige: { saturation: 0.68, brightness: 1.05, contrast: 1.07, r: 1.035, g: 1.0, b: 0.945 },
  mono: { saturation: 0.15, brightness: 1.04, contrast: 1.16, r: 1.0, g: 1.0, b: 1.0 },
  neutral: { saturation: 0.6, brightness: 1.04, contrast: 1.1, r: 1.015, g: 1.0, b: 0.985 },
  dark: { saturation: 0.18, brightness: 0.95, contrast: 1.2, r: 1.0, g: 1.0, b: 1.0 },
  slab: { saturation: 0.5, brightness: 1.04, contrast: 1.08, r: 1.02, g: 1.0, b: 0.97 },
}

const WIDE = 16 / 10
const TILE = 4 / 5
const PORTRAIT = 3 / 4
const MAX_UPSCALE = 1.1

/**
 * Curated selection — value over quantity.
 * Skipped: green marble (g09), blue agate (g08), unfinished subway (g17),
 * messy full-room shots that cannot crop cleanly.
 */
const JOBS = [
  // ---------- Hero ----------
  {
    src: 'marbles/6.jpeg',
    out: 'hero/hero-1',
    focus: [0, 0, 1, 1],
    ar: 16 / 9,
    width: 1600,
    preset: 'dark',
  },
  {
    src: 'marbles/9.jpeg',
    out: 'hero/hero-2',
    focus: [0, 0, 1, 1],
    ar: 16 / 9,
    width: 1600,
    preset: 'slab',
  },

  // ---------- About ----------
  {
    src: 'gallery/g30.jpeg',
    out: 'about/about-1',
    focus: [0.44, 0.08, 0.93, 0.78],
    ar: PORTRAIT,
    width: 1000,
    preset: 'stoneCool',
  },
  {
    src: 'gallery/g07.jpeg',
    out: 'about/about-2',
    focus: [0.14, 0.0, 0.88, 0.7],
    ar: PORTRAIT,
    width: 1000,
    ay: 0.2,
    preset: 'gold',
  },

  // ---------- Slab textures ----------
  { src: 'marbles/9.jpeg', out: 'textures/marble-white', focus: [0, 0, 1, 1], ar: WIDE, width: 1400, preset: 'slab' },
  { src: 'marbles/2.jpeg', out: 'textures/marble-beige', focus: [0, 0, 1, 1], ar: WIDE, width: 1400, preset: 'slab' },
  { src: 'marbles/6.jpeg', out: 'textures/marble-black', focus: [0, 0, 1, 1], ar: WIDE, width: 1400, preset: 'dark' },
  { src: 'marbles/7.jpeg', out: 'textures/marble-cream', focus: [0, 0, 1, 1], ar: WIDE, width: 1400, preset: 'slab' },
  { src: 'marbles/10.jpeg', out: 'textures/marble-carrara', focus: [0, 0, 1, 1], ar: WIDE, width: 1400, preset: 'slab' },

  // ---------- Materials gallery (slab close-ups) ----------
  {
    src: 'marbles/9.jpeg',
    out: 'gallery/material-statuario',
    focus: [0.05, 0.05, 0.95, 0.95],
    ar: TILE,
    width: 1200,
    preset: 'slab',
  },
  {
    src: 'marbles/6.jpeg',
    out: 'gallery/material-nero',
    focus: [0.05, 0.05, 0.95, 0.95],
    ar: TILE,
    width: 1200,
    preset: 'dark',
  },
  {
    src: 'marbles/2.jpeg',
    out: 'gallery/material-beige',
    focus: [0.05, 0.05, 0.95, 0.95],
    ar: TILE,
    width: 1200,
    preset: 'beige',
  },
  {
    src: 'marbles/10.jpeg',
    out: 'gallery/material-carrara',
    focus: [0.05, 0.05, 0.95, 0.95],
    ar: WIDE,
    width: 1400,
    preset: 'slab',
  },

  // ---------- Kitchens ----------
  {
    src: 'gallery/g32.jpeg',
    out: 'gallery/kitchen-hex-splashback',
    focus: [0.08, 0.12, 0.92, 0.88],
    ar: WIDE,
    width: 1400,
    preset: 'beige',
  },
  {
    src: 'gallery/g33.jpeg',
    out: 'gallery/kitchen-quartz-worktop',
    focus: [0.12, 0.18, 0.68, 0.84],
    ar: TILE,
    width: 1200,
    preset: 'beige',
  },
  {
    src: 'gallery/g37.jpeg',
    out: 'gallery/kitchen-granite-island',
    focus: [0.0, 0.4, 0.78, 1.0],
    ar: TILE,
    width: 1200,
    preset: 'neutral',
  },
  {
    src: 'gallery/g35.jpeg',
    out: 'gallery/kitchen-waterfall-island',
    focus: [0.48, 0.12, 0.98, 0.62],
    ar: WIDE,
    width: 1400,
    preset: 'neutral',
  },

  // ---------- Bathrooms (white / black / gold) ----------
  {
    src: 'gallery/g07.jpeg',
    out: 'gallery/bathroom-veined-enclosure',
    focus: [0.14, 0.0, 0.88, 0.72],
    ar: TILE,
    width: 1200,
    ay: 0.15,
    preset: 'gold',
  },
  {
    src: 'gallery/g04.jpeg',
    out: 'gallery/bathroom-panda-gold',
    focus: [0.0, 0.0, 0.72, 0.78],
    ar: TILE,
    width: 1200,
    ay: 0.1,
    preset: 'gold',
  },
  {
    src: 'gallery/g02.jpeg',
    out: 'gallery/bathroom-gold-column',
    focus: [0.35, 0.05, 0.92, 0.58],
    ar: TILE,
    width: 1200,
    preset: 'gold',
  },
  {
    src: 'gallery/g05.jpeg',
    out: 'gallery/bathroom-wet-room',
    focus: [0.02, 0.0, 0.55, 0.55],
    ar: TILE,
    width: 1200,
    ay: 0.0,
    preset: 'gold',
  },
  {
    src: 'gallery/g03.jpeg',
    out: 'gallery/bathroom-brushed-gold',
    focus: [0.08, 0.0, 0.7, 0.3],
    ar: WIDE,
    width: 1400,
    preset: 'gold',
  },
  {
    src: 'gallery/g06.jpeg',
    out: 'gallery/bathroom-viola-suite',
    focus: [0.08, 0.05, 0.72, 0.72],
    ar: TILE,
    width: 1200,
    ay: 0.15,
    preset: 'stoneWarm',
  },

  // ---------- Cladding ----------
  {
    src: 'gallery/g06.jpeg',
    out: 'gallery/cladding-viola-wall',
    focus: [0.0, 0.0, 0.78, 0.55],
    ar: WIDE,
    width: 1400,
    ay: 0.3,
    preset: 'stoneWarm',
  },
  {
    src: 'gallery/g30.jpeg',
    out: 'gallery/cladding-chevron-bookmatch',
    focus: [0.46, 0.1, 0.92, 0.75],
    ar: TILE,
    width: 1200,
    preset: 'stoneCool',
  },
  {
    src: 'gallery/g27.jpeg',
    out: 'gallery/cladding-quartzite-panels',
    focus: [0.0, 0.08, 0.5, 0.75],
    ar: TILE,
    width: 1200,
    ay: 0.4,
    preset: 'stoneCool',
  },
  {
    src: 'gallery/g31.jpeg',
    out: 'gallery/cladding-stone-bench',
    focus: [0.28, 0.48, 1.0, 0.92],
    ar: WIDE,
    width: 1400,
    preset: 'stoneCool',
  },

  // ---------- Flooring ----------
  {
    src: 'gallery/g11.jpeg',
    out: 'gallery/flooring-chequer-steps',
    focus: [0.0, 0.05, 0.65, 0.95],
    ar: TILE,
    width: 1200,
    ay: 0.35,
    preset: 'mono',
  },
  {
    src: 'gallery/g13.jpeg',
    out: 'gallery/flooring-chequer-hallway',
    focus: [0.26, 0.05, 0.82, 0.95],
    ar: TILE,
    width: 1200,
    preset: 'mono',
  },
  {
    src: 'gallery/g01.jpeg',
    out: 'gallery/flooring-viola-marble',
    focus: [0.22, 0.55, 0.9, 0.88],
    ar: WIDE,
    width: 1400,
    preset: 'stoneWarm',
  },
  {
    src: 'gallery/g34.jpeg',
    out: 'gallery/flooring-chequer-pool',
    focus: [0.05, 0.15, 0.85, 0.85],
    ar: WIDE,
    width: 1400,
    preset: 'mono',
  },
  {
    src: 'gallery/g35.jpeg',
    out: 'gallery/flooring-beige-marble',
    focus: [0.0, 0.55, 0.55, 0.95],
    ar: WIDE,
    width: 1400,
    preset: 'beige',
  },
]

function fitBox(width, height, [fx0, fy0, fx1, fy1], ar, ax = 0.5, ay = 0.5) {
  const left = Math.round(fx0 * width)
  const top = Math.round(fy0 * height)
  const boxW = Math.round((fx1 - fx0) * width)
  const boxH = Math.round((fy1 - fy0) * height)

  let w = boxW
  let h = Math.round(w / ar)
  if (h > boxH) {
    h = boxH
    w = Math.round(h * ar)
  }

  return {
    left: Math.max(0, Math.min(left + Math.round((boxW - w) * ax), width - w)),
    top: Math.max(0, Math.min(top + Math.round((boxH - h) * ay), height - h)),
    width: w,
    height: h,
  }
}

async function processJob(job) {
  const { data, info } = await sharp(path.join(SRC, job.src))
    .rotate()
    .toBuffer({ resolveWithObject: true })

  const box = fitBox(info.width, info.height, job.focus, job.ar, job.ax, job.ay)
  const p = PRESETS[job.preset]
  const width = Math.min(job.width, Math.round(box.width * MAX_UPSCALE))
  const target = { width, height: Math.round(width / job.ar) }

  const pipeline = sharp(data)
    .extract(box)
    .resize(target.width, target.height, { fit: 'cover', kernel: 'lanczos3' })
    .modulate({ saturation: p.saturation, brightness: p.brightness })
    .linear(p.contrast, 128 * (1 - p.contrast))
    .recomb([
      [p.r, 0, 0],
      [0, p.g, 0],
      [0, 0, p.b],
    ])
    .sharpen({ sigma: 0.7 })

  const outBase = path.join(OUT, job.out)
  await Promise.all([
    pipeline.clone().webp({ quality: 84, effort: 6 }).toFile(`${outBase}.webp`),
    pipeline.clone().jpeg({ quality: 88, mozjpeg: true }).toFile(`${outBase}.jpg`),
  ])

  console.log(
    `${job.src.padEnd(20)} -> ${job.out.padEnd(40)}` +
      ` crop ${`${box.width}x${box.height}`.padEnd(11)} out ${target.width}x${target.height}`,
  )
}

async function run() {
  await rm(path.join(OUT, 'gallery'), { recursive: true, force: true })
  await mkdir(path.join(OUT, 'gallery'), { recursive: true })
  await mkdir(path.join(OUT, 'hero'), { recursive: true })
  await mkdir(path.join(OUT, 'about'), { recursive: true })
  await mkdir(path.join(OUT, 'textures'), { recursive: true })

  for (const job of JOBS) {
    await processJob(job)
  }
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
