import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, viewportConfig } from '@/lib/motion'

interface FadeInSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function FadeInSection({ children, className = '', delay = 0 }: FadeInSectionProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
