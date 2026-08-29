import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { asset } from '@/lib/asset'
import { BRAND } from '@/lib/constants'

const rawScenes = [
  {
    id: 'gold-vein-kitchen',
    label: 'Gold Vein',
    vein: '/images/hero/bg.jpg',
    project: '/images/hero/h1.jpg',
  },
  {
    id: 'marble-vanity',
    label: 'Marble Vanity',
    vein: '/images/hero/bg.jpg',
    project: '/images/hero/h2.jpg',
  },
  {
    id: 'stone-wet-room',
    label: 'Wet Room',
    vein: '/images/hero/bg.jpg',
    project: '/images/hero/h3.jpg',
  },
  {
    id: 'marble-fireplace',
    label: 'Fireplace',
    vein: '/images/hero/bg.jpg',
    project: '/images/hero/h4.jpg',
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
      className="relative overflow-hidden bg-black pt-[68px] sm:pt-[78px] lg:pt-[88px]"
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
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
      </motion.div>

      <div className="container-luxe relative z-10 grid gap-8 pt-4 pb-16 sm:gap-10 sm:pt-6 sm:pb-20 md:pt-6 md:pb-16 lg:min-h-[calc(84svh-88px)] lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-8 lg:pb-24">
        {/* Text Column */}
        <div className="order-1 lg:col-span-6 xl:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative mb-2 overflow-hidden sm:mb-4">
              <span
                className="block max-w-full font-display text-[18vw] font-light leading-[0.88] tracking-[-0.04em] text-transparent sm:text-[14vw] md:text-[10vw] lg:text-[6.2vw]"
                style={{
                  backgroundImage: `url(${asset('/images/hero/bg.jpg')})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextStroke: '1px color-mix(in srgb, var(--color-gold) 45%, transparent)',
                }}
                aria-hidden="true"
              >
                MFM
              </span>
            </div>

            <h1 className="max-w-md font-display text-2xl font-light leading-snug text-white sm:text-3xl md:text-3xl xl:text-4xl">
              {BRAND.tagline}
            </h1>

            <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-white/70 sm:mt-5 sm:text-base">
              {BRAND.description}
            </p>

            <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
              <Link to="/gallery" className="btn-gold w-full sm:w-auto shadow-lg">
                <span>Explore Collection</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Visual Aperture Column */}
        <div className="order-2 lg:col-span-6 xl:col-span-7">
          <motion.div
            style={{ y: apertureY }}
            className="relative mx-auto w-full max-w-md sm:max-w-lg lg:ml-auto lg:mr-0 lg:max-w-none"
          >
            <div className="mb-2 flex items-end justify-between px-1 sm:mb-4">
              <p className="font-display text-3xl font-light text-white/20 sm:text-5xl md:text-6xl">
                0{active + 1}
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] text-gold sm:text-[11px] sm:tracking-[0.24em]">
                MFM MARBLE &amp; GRANITE
              </p>
            </div>

            <div className="relative mx-2 sm:mx-0">
              <span className="absolute -left-2 -top-2 h-6 w-6 border-l border-t border-gold/70 sm:-left-3 sm:-top-3 sm:h-10 sm:w-10" />
              <span className="absolute -right-2 -top-2 h-6 w-6 border-r border-t border-gold/70 sm:-right-3 sm:-top-3 sm:h-10 sm:w-10" />
              <span className="absolute -bottom-2 -left-2 h-6 w-6 border-b border-l border-gold/70 sm:-bottom-3 sm:-left-3 sm:h-10 sm:w-10" />
              <span className="absolute -bottom-2 -right-2 h-6 w-6 border-b border-r border-gold/70 sm:-bottom-3 sm:-right-3 sm:h-10 sm:w-10" />

              <div className="relative aspect-[4/5] max-h-[46vh] overflow-hidden bg-charcoal sm:max-h-[56vh] md:max-h-none lg:aspect-[4/5] xl:h-[min(68vh,720px)] xl:max-h-none xl:aspect-auto rounded-xs shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={scene.project}
                    src={scene.project}
                    alt={scene.label}
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
    </section>
  )
}
