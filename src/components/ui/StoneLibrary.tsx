import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { aboutImages } from '@/data/aboutImages'
import { EASE_LUXE } from '@/lib/motion'

const ORBIT_RADIUS = 39
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
  const stone = aboutImages[active]

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
      className="mx-auto w-full max-w-md lg:max-w-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-square w-full">
        <motion.div
          className="absolute inset-[11%] rounded-full border border-dashed border-black/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        />

        <div className="absolute left-1/2 top-1/2 aspect-square w-[52%] -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-off-white shadow-[0_24px_60px_rgba(0,0,0,0.18)] ring-1 ring-gold/30">
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-[14%] px-4 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stone.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.6, ease: EASE_LUXE }}
                >
                  <p className="font-display text-lg font-light leading-tight text-white sm:text-2xl">
                    {stone.name}
                  </p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-gold-light sm:text-[10px]">
                    {stone.finish}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {aboutImages.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View ${item.name}`}
            aria-pressed={i === active}
            className="absolute aspect-square w-[20%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={positions[i]}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE_LUXE }}
          >
            <span
              className={`block h-full w-full overflow-hidden rounded-full border-2 border-off-white transition-all duration-700 ${
                i === active
                  ? 'scale-110 ring-2 ring-gold shadow-[0_10px_24px_rgba(0,0,0,0.2)]'
                  : 'ring-1 ring-black/10 opacity-70 hover:opacity-100 hover:scale-105'
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
            transition={{ duration: 0.5, ease: EASE_LUXE }}
            className="min-w-0"
          >
            <p className="text-[10px] uppercase tracking-[0.16em] text-charcoal">{stone.origin}</p>
            <p className="mt-1 text-xs font-light leading-relaxed text-gray">{stone.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
