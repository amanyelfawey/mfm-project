import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[100] h-[3px]">
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-left bg-gradient-to-r from-gold/70 via-gold to-gold-light shadow-[0_0_12px_rgba(201,164,92,0.8)]"
      />
    </div>
  )
}
