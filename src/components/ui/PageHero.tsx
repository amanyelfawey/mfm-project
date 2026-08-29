import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { revealMask, staggerContainer } from '@/lib/motion'
import { asset } from '@/lib/asset'

interface PageHeroProps {
  eyebrow: string
  title: string
  description?: string
  image?: string
}

export function PageHero({
  eyebrow,
  title,
  description,
  image = '/images/marbles/6.webp',
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[44vh] items-end overflow-hidden bg-charcoal sm:min-h-[50vh] md:min-h-[60vh]"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-105">
        <img
          src={asset(image)}
          alt=""
          className="image-polish h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/35" />
      </motion.div>

      <div className="container-luxe relative z-10 w-full pb-10 pt-28 sm:pb-14 sm:pt-32 md:pb-20 md:pt-40">
        <motion.div
          style={{ y: textY, opacity }}
          className="max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="mb-4 flex items-center gap-4 sm:mb-5">
            <span className="h-px w-8 bg-gold sm:w-10" />
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.22em]">
              {eyebrow}
            </p>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              variants={revealMask}
              className="font-display text-4xl font-light text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {title}
            </motion.h1>
          </div>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-xl text-base font-light leading-relaxed text-white/65 sm:mt-6 sm:text-lg"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
