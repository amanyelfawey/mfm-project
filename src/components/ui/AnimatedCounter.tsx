import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { EASE_LUXE } from '@/lib/motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  duration = 2,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(0, value, {
      duration,
      ease: EASE_LUXE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })

    return () => controls.stop()
  }, [isInView, value, duration])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
