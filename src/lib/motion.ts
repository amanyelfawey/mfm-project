import type { Transition, Variants } from 'framer-motion'

export const EASE_LUXE = [0.16, 1, 0.3, 1] as const

export const DURATION_SECTION = 0.9
export const DURATION_HERO = 1.1
export const STAGGER_CHILDREN = 0.12

export const transitionLuxe: Transition = {
  duration: DURATION_SECTION,
  ease: EASE_LUXE,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionLuxe,
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_CHILDREN,
      delayChildren: 0.1,
    },
  },
}

export const revealMask: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: {
      duration: DURATION_HERO,
      ease: EASE_LUXE,
    },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_LUXE },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: EASE_LUXE },
  },
}

export const viewportConfig = {
  once: true,
  margin: '-15% 0px' as `${number}% ${number}px`,
}
