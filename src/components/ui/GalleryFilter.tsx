import { motion } from 'framer-motion'
import { GALLERY_CATEGORIES } from '@/lib/constants'
import type { GalleryCategory } from '@/lib/constants'

interface GalleryFilterProps {
  active: GalleryCategory
  onChange: (category: GalleryCategory) => void
}

export function GalleryFilter({ active, onChange }: GalleryFilterProps) {
  return (
    <div className="scrollbar-hide -mx-4 flex gap-x-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:gap-x-8 sm:gap-y-3 sm:overflow-visible sm:px-0 sm:pb-1">
      {GALLERY_CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className="relative shrink-0 py-2 text-[11.5px] uppercase tracking-[0.15em] text-gray transition-colors duration-500 hover:text-white sm:text-xs sm:tracking-[0.16em] cursor-pointer touch-manipulation"
          style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
        >
          {active === category && (
            <motion.span
              layoutId="gallery-filter-indicator"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
          <span className={active === category ? 'text-gold-light font-medium' : ''}>
            {category}
          </span>
        </button>
      ))}
    </div>
  )
}
