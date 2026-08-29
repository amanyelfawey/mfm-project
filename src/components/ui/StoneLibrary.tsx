import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { aboutImages } from '@/data/aboutImages'
import { EASE_LUXE } from '@/lib/motion'

const ORBIT_RADIUS = 38
const CYCLE_MS = 4200

const positions = aboutImages.map((_, i) => {
  const angle = ((-90 + i * (360 / aboutImages.length)) * Math.PI) / 180
  return {
    left: `${50 + ORBIT_RADIUS * Math.cos(angle)}%`,
    top: `${50 + ORBIT_RADIUS * Math.sin(angle)}%`,
  }
})

export function StoneLibrary() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const stone = aboutImages[active]!

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % aboutImages.length),
      CYCLE_MS,
    )
    return () => window.clearInterval(id)
  }, [paused])

  return (
    <div
      className="mx-auto w-full max-w-[310px] xs:max-w-[350px] sm:max-w-md lg:max-w-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-square w-full">
        {/* Orbit track ring */}
        <motion.div
          className="absolute inset-[11%] rounded-full border border-dashed border-black/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        />

        {/* Central Stone Visual */}
        <div className="absolute left-1/2 top-1/2 aspect-square w-[52%] -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-off-white shadow-[0_20px_50px_rgba(0,0,0,0.16)] ring-1 ring-gold/30">
            <AnimatePresence initial={false}>
              <motion.img
                key={stone.id}
                src={stone.image}
                alt={stone.name}
                className="image-polish absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: EASE_LUXE }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-[12%] px-3 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stone.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: EASE_LUXE }}
                >
                  <p className="font-display text-base font-light leading-tight text-white xs:text-lg sm:text-xl md:text-2xl">
                    {stone.name}
                  </p>
                  <p className="mt-0.5 text-[8.5px] uppercase tracking-[0.16em] text-gold-light sm:text-[10px]">
                    {stone.finish}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Orbiting Stone Buttons */}
        {aboutImages.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View ${item.name}`}
            aria-pressed={i === active}
            className="absolute aspect-square w-[21%] -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer touch-manipulation"
            style={positions[i]}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: 0.08 + i * 0.06, ease: EASE_LUXE }}
          >
            <span
              className={`block h-full w-full overflow-hidden rounded-full border-2 border-off-white transition-all duration-500 ${
                i === active
                  ? 'scale-110 ring-2 ring-gold shadow-[0_8px_20px_rgba(0,0,0,0.22)]'
                  : 'ring-1 ring-black/10 opacity-75 hover:opacity-100 hover:scale-105'
              }`}
              style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
            >
              <img
                src={item.image}
                alt=""
                className="image-polish h-full w-full object-cover"
                loading="lazy"
              />
            </span>
          </motion.button>
        ))}
      </div>

      {/* Description Strip */}
      <div className="mt-4 flex items-start gap-3 border-t border-black/10 pt-3 sm:mt-5">
        <span className="mt-0.5 font-display text-sm font-light text-gold">
          {String(active + 1).padStart(2, '0')}
          <span className="text-gray">/{String(aboutImages.length).padStart(2, '0')}</span>
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            key={stone.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.45, ease: EASE_LUXE }}
            className="min-w-0"
          >
            <p className="text-[10px] uppercase tracking-[0.16em] text-charcoal font-medium">{stone.origin}</p>
            <p className="mt-0.5 text-xs font-light leading-relaxed text-gray">{stone.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
