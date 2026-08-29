import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_LUXE, viewportConfig } from '@/lib/motion'

interface FadeInSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  scale?: boolean
  blur?: boolean
  distance?: number
  once?: boolean
}

export function FadeInSection({
  children,
  className = '',
  delay = 0,
  duration = 0.85,
  direction = 'up',
  scale = false,
  blur = false,
  distance = 32,
  once = false,
}: FadeInSectionProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 }
      case 'down':
        return { y: -distance, x: 0 }
      case 'left':
        return { x: distance, y: 0 }
      case 'right':
        return { x: -distance, y: 0 }
      case 'none':
      default:
        return { x: 0, y: 0 }
    }
  }

  const initialPos = getInitialPosition()

  const dynamicVariants: Variants = {
    hidden: {
      opacity: 0,
      ...initialPos,
      ...(scale ? { scale: 0.95 } : {}),
      ...(blur ? { filter: 'blur(6px)' } : {}),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      ...(scale ? { scale: 1 } : {}),
      ...(blur ? { filter: 'blur(0px)' } : {}),
      transition: {
        duration,
        delay,
        ease: EASE_LUXE,
      },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        ...viewportConfig,
        once,
      }}
      variants={dynamicVariants}
    >
      {children}
    </motion.div>
  )
}
