import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

function shouldEnableCustomCursor() {
  if (typeof window === 'undefined') return false
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches
  return !prefersReduced && hasFinePointer
}

export function CustomCursor() {
  const enabled = shouldEnableCustomCursor()
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const ringX = useSpring(cursorX, springConfig)
  const ringY = useSpring(cursorY, springConfig)

  useEffect(() => {
    if (!enabled) return

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [enabled, cursorX, cursorY])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9998] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
        style={{ left: cursorX, top: cursorY }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9997] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30"
        style={{ left: ringX, top: ringY }}
      />
    </>
  )
}
