import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { asset } from '@/lib/asset'

const rawScenes = [
  {
    id: 'calacatta',
    label: 'Calacatta',
    vein: '/images/hero/1.webp',
    project: '/images/hero/1.webp',
    caption: 'Kitchen island',
    line: 'A monolithic island in luminous white stone.',
    description:
      'Polished white marble with soft grey veins — sharp architectural edges against dark cabinetry, finished with quiet chrome.',
  },
  {
    id: 'nero-kitchen',
    label: 'Nero Island',
    vein: '/images/hero/2.webp',
    project: '/images/hero/2.webp',
    caption: 'Entertaining kitchen',
    line: 'Dark stone, cut for evening light.',
    description:
      'Charcoal marble with jagged white veining — a sculpted island and sink before a gold-lit niche of crystal and bronze.',
  },
  {
    id: 'spa',
    label: 'Spa Suite',
    vein: '/images/hero/3.webp',
    project: '/images/hero/3.webp',
    caption: 'Marble bathroom',
    line: 'A dark-stone sanctuary, lit like a hotel suite.',
    description:
      'Floor-to-ceiling dark marble, warm fluted wood, brushed gold fittings, and a glowing circular mirror for spa-level calm.',
  },
  {
    id: 'nero-bath',
    label: 'Nero Bath',
    vein: '/images/hero/4.webp',
    project: '/images/hero/4.webp',
    caption: 'Bathroom vanity',
    line: 'Black marble walls. White stone under hand.',
    description:
      'Dramatic black marble cladding with white and gold veins — floating vanity, vessel sink, and soft backlight.',
  },
  {
    id: 'open-plan',
    label: 'Open Plan',
    vein: '/images/hero/5.webp',
    project: '/images/hero/5.webp',
    caption: 'Kitchen & dining',
    line: 'Stone that carries the whole room.',
    description:
      'White marble island, veined floors, and dark cabinetry — open-plan living shaped around natural stone and warm LED lines.',
  },
]

const scenes = rawScenes.map((scene) => ({
  ...scene,
  vein: asset(scene.vein),
  project: asset(scene.project),
}))

export function Hero() {
  const [active, setActive] = useState(0)
  const scene = scenes[active]!
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const veinY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const apertureY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % scenes.length)
    }, 7000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black pt-[72px] sm:pt-[78px] lg:pt-[88px]"
    >
      <motion.div className="absolute inset-0" style={{ y: veinY }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={scene.vein}
            src={scene.vein}
            alt=""
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="image-polish h-full w-full scale-110 object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </motion.div>

      <div className="container-luxe relative z-10 grid gap-8 py-10 pb-28 sm:gap-10 sm:py-14 sm:pb-32 md:py-16 lg:min-h-[calc(100svh-88px)] lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-20 lg:pb-36">
        <div className="order-1 lg:col-span-6 xl:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-gold sm:mb-8 sm:text-[11px] sm:tracking-[0.35em]">
              MFM Marble &amp; Granite — London
            </p>

            <div className="relative mb-3 overflow-hidden sm:mb-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`vein-word-${scene.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="block max-w-full font-display text-[22vw] font-light leading-[0.85] tracking-[-0.04em] text-transparent sm:text-[16vw] md:text-[12vw] lg:text-[7.5vw]"
                  style={{
                    backgroundImage: `url(${scene.vein})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextStroke: '1px color-mix(in srgb, var(--color-gold) 40%, transparent)',
                  }}
                  aria-hidden="true"
                >
                  STONE
                </motion.span>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.h1
                key={scene.line}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md font-display text-2xl font-light leading-snug text-white sm:text-3xl md:text-4xl xl:text-5xl"
              >
                {scene.line}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={scene.description}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 max-w-sm text-sm font-light leading-relaxed text-white/60 sm:mt-6 sm:text-base"
              >
                {scene.description}
              </motion.p>
            </AnimatePresence>

            <div className="mt-7 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
              <Link to="/gallery" className="btn-gold w-full sm:w-auto">
                Explore Collection
                <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="btn-outline w-full sm:w-auto">
                Request a Quote
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="order-2 lg:col-span-6 xl:col-span-7">
          <motion.div
            style={{ y: apertureY }}
            className="relative mx-auto w-full max-w-md sm:max-w-lg lg:ml-auto lg:mr-0 lg:max-w-none"
          >
            <div className="mb-3 flex items-end justify-between px-1 sm:mb-4">
              <p className="font-display text-4xl font-light text-white/15 sm:text-5xl md:text-6xl">
                0{active + 1}
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={scene.caption}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-[10px] uppercase tracking-[0.18em] text-gold sm:text-[11px] sm:tracking-[0.22em]"
                >
                  {scene.caption}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="relative mx-3 sm:mx-0">
              <span className="absolute -left-2 -top-2 h-7 w-7 border-l border-t border-gold/70 sm:-left-3 sm:-top-3 sm:h-10 sm:w-10" />
              <span className="absolute -right-2 -top-2 h-7 w-7 border-r border-t border-gold/70 sm:-right-3 sm:-top-3 sm:h-10 sm:w-10" />
              <span className="absolute -bottom-2 -left-2 h-7 w-7 border-b border-l border-gold/70 sm:-bottom-3 sm:-left-3 sm:h-10 sm:w-10" />
              <span className="absolute -bottom-2 -right-2 h-7 w-7 border-b border-r border-gold/70 sm:-bottom-3 sm:-right-3 sm:h-10 sm:w-10" />

              <div className="relative aspect-[4/5] max-h-[48vh] overflow-hidden bg-charcoal sm:max-h-[56vh] md:max-h-none lg:aspect-[4/5] xl:h-[min(68vh,720px)] xl:max-h-none xl:aspect-auto">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={scene.project}
                    src={scene.project}
                    alt={scene.caption}
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="image-polish absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container-luxe scrollbar-hide flex snap-x snap-mandatory gap-2 overflow-x-auto py-3 sm:gap-3 sm:py-4 md:gap-4">
          {scenes.map((item, i) => {
            const isActive = i === active
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(i)}
                className={`group relative flex min-w-[118px] shrink-0 snap-start items-center gap-2.5 px-1 py-1 text-left transition-opacity duration-500 sm:min-w-[140px] sm:flex-1 sm:gap-3 md:min-w-0 ${
                  isActive ? 'opacity-100' : 'opacity-45'
                }`}
                aria-label={`View ${item.label} scene`}
              >
                <span
                  className={`h-10 w-10 shrink-0 overflow-hidden border transition-colors duration-500 sm:h-12 sm:w-12 md:h-14 md:w-14 ${
                    isActive ? 'border-gold' : 'border-white/20'
                  }`}
                >
                  <img src={item.project} alt="" className="h-full w-full object-cover" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[9px] uppercase tracking-[0.18em] text-gold/80 sm:text-[10px]">
                    0{i + 1}
                  </span>
                  <span className="block truncate text-xs text-white sm:text-sm">{item.label}</span>
                </span>
                <span
                  className={`absolute bottom-0 left-0 h-px bg-gold transition-all duration-700 ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
