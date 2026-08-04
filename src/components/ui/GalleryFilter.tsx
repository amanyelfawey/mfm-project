import { motion } from 'framer-motion'
import { GALLERY_CATEGORIES } from '@/lib/constants'
import type { GalleryCategory } from '@/lib/constants'

interface GalleryFilterProps {
  active: GalleryCategory
  onChange: (category: GalleryCategory) => void
}

export function GalleryFilter({ active, onChange }: GalleryFilterProps) {
  return (
    <div className="scrollbar-hide -mx-1 flex gap-x-5 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:gap-x-8 sm:gap-y-3 sm:overflow-visible">
      {GALLERY_CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className="relative shrink-0 pb-2 text-[11px] uppercase tracking-[0.14em] text-gray transition-colors duration-600 hover:text-white sm:text-xs sm:tracking-[0.15em]"
          style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
        >
          {active === category && (
            <motion.span
              layoutId="gallery-filter-indicator"
              className="absolute bottom-0 left-0 right-0 h-px bg-gold"
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
          <span className={active === category ? 'text-gold-light' : ''}>{category}</span>
        </button>
      ))}
    </div>
  )
}
