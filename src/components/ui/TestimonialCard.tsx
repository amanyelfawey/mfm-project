import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import type { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div>
      <div className="mb-8 flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-gold text-gold" />
        ))}
      </div>
      <blockquote className="font-display text-2xl md:text-4xl font-light italic leading-snug text-white">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="mt-10">
        <p className="text-base text-white">{testimonial.name}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-gray">
          {testimonial.projectType}
        </p>
      </div>
    </div>
  )
}

export function TestimonialPortrait({ image, name }: { image: string; name: string }) {
  return (
    <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden">
      <img
        src={image}
        alt={name}
        className="image-polish h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/10" />
    </div>
  )
}

export function TestimonialSlide({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
