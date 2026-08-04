import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryItem } from '@/types'

interface GalleryLightboxProps {
  item: GalleryItem | null
  items: GalleryItem[]
  onClose: () => void
  onNavigate: (direction: 'prev' | 'next') => void
}

export function GalleryLightbox({ item, items, onClose, onNavigate }: GalleryLightboxProps) {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!item) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate('prev')
      if (e.key === 'ArrowRight') onNavigate('next')
    },
    [item, onClose, onNavigate],
  )

  useEffect(() => {
    if (!item) return
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [item, handleKeyDown])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-3 backdrop-blur-xl sm:p-6"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center text-white/70 transition-colors hover:text-white sm:right-6 sm:top-6 md:right-10 md:top-10"
            aria-label="Close lightbox"
          >
            <X size={26} strokeWidth={1} />
          </button>

          {currentIndex > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onNavigate('prev')
              }}
              className="absolute left-2 z-20 flex h-11 w-11 items-center justify-center text-white/70 transition-colors hover:text-white sm:left-4 md:left-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={30} strokeWidth={1} />
            </button>
          )}

          {currentIndex < items.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onNavigate('next')
              }}
              className="absolute right-2 z-20 flex h-11 w-11 items-center justify-center text-white/70 transition-colors hover:text-white sm:right-4 md:right-10"
              aria-label="Next image"
            >
              <ChevronRight size={30} strokeWidth={1} />
            </button>
          )}

          <motion.div
            layoutId={`gallery-${item.id}`}
            className="relative mx-auto max-h-[88svh] w-full max-w-5xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={item.image}
              alt={`${item.title} — ${item.material}`}
              className="image-polish mx-auto max-h-[70svh] w-full object-contain sm:max-h-[78svh]"
            />
            <div className="bg-gradient-to-t from-black/85 to-transparent px-4 py-5 sm:absolute sm:inset-x-0 sm:bottom-0 sm:p-8">
              <p className="eyebrow mb-2">{item.category}</p>
              <h3 className="font-display text-xl font-light text-white sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-1 text-xs font-light tracking-[0.08em] text-white/60 sm:mt-2 sm:text-sm">
                {item.material}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
