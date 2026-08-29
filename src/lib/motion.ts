import type { Transition, Variants } from 'framer-motion'

export const EASE_LUXE = [0.16, 1, 0.3, 1] as const
export const EASE_SPRING = [0.25, 1, 0.5, 1] as const

export const DURATION_SECTION = 0.85
export const DURATION_HERO = 1.05
export const STAGGER_CHILDREN = 0.1

export const transitionLuxe: Transition = {
  duration: DURATION_SECTION,
  ease: EASE_LUXE,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionLuxe,
  },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionLuxe,
  },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitionLuxe,
  },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitionLuxe,
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
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.85, ease: EASE_LUXE },
  },
}

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 25 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 0.9, ease: EASE_LUXE },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER_CHILDREN,
      delayChildren: 0.08,
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

// Configured so elements smoothly animate when scrolling in/out in both directions
export const viewportConfig = {
  once: false,
  margin: '-6% 0px -6% 0px' as `${number}% ${number}px`,
  amount: 0.15,
}
