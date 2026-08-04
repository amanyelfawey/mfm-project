import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryItems } from '@/data/galleryItems'
import type { GalleryCategory } from '@/lib/constants'
import type { GalleryItem } from '@/types'
import { GalleryFilter } from '@/components/ui/GalleryFilter'
import { GalleryLightbox } from '@/components/ui/GalleryLightbox'
import { FadeInSection } from '@/components/shared/FadeInSection'

function GalleryTile({
  item,
  onClick,
}: {
  item: GalleryItem
  onClick: () => void
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.button
      type="button"
      layout
      layoutId={`gallery-${item.id}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden ${
        item.wide ? 'md:col-span-2' : ''
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          item.wide ? 'aspect-[4/5] sm:aspect-[16/10]' : 'aspect-[4/5]'
        }`}
      >
        <img
          src={item.image}
          alt={`${item.title} — ${item.material}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`image-polish h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.04] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
        />

        {/* Always visible on touch; fade intensifies on hover for desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 transition-opacity duration-700 md:opacity-0 md:group-hover:opacity-100" />
        <div className="absolute inset-0 border border-gold/0 transition-colors duration-700 group-hover:border-gold/50" />

        <div className="absolute inset-x-0 bottom-0 p-4 text-left transition-all duration-700 sm:p-6 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <p className="eyebrow mb-1 sm:mb-2">{item.category}</p>
          <h3 className="font-display text-lg font-light text-white sm:text-xl">{item.title}</h3>
          <p className="mt-1 text-[11px] font-light tracking-[0.08em] text-white/60 sm:text-xs">
            {item.material}
          </p>
        </div>
      </div>
    </motion.button>
  )
}

interface GalleryProps {
  /** Hide the section title when a PageHero already introduces the page. */
  hideHeader?: boolean
}

export function Gallery({ hideHeader = false }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All')
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  )

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!lightboxItem) return
    const idx = filtered.findIndex((i) => i.id === lightboxItem.id)
    const nextIdx = direction === 'prev' ? idx - 1 : idx + 1
    if (nextIdx >= 0 && nextIdx < filtered.length) {
      setLightboxItem(filtered[nextIdx]!)
    }
  }

  return (
    <section id="gallery" className="section-pad bg-black">
      <div className="container-luxe">
        <div
          className={`mb-8 flex flex-col gap-6 sm:mb-12 sm:gap-8 md:mb-16 md:flex-row md:items-end ${
            hideHeader ? 'md:justify-end' : 'md:justify-between'
          }`}
        >
          {!hideHeader && (
            <FadeInSection>
              <div className="mb-4 flex items-center gap-4">
                <span className="h-px w-8 bg-gold sm:w-10" />
                <p className="text-xs uppercase tracking-[0.22em] text-gold">Our Collection</p>
              </div>
              <h2 className="font-display text-3xl font-light text-white sm:text-4xl md:text-6xl">
                Selected Works
              </h2>
            </FadeInSection>
          )}
          <FadeInSection delay={0.1} className="w-full md:w-auto">
            <GalleryFilter active={activeCategory} onChange={setActiveCategory} />
          </FadeInSection>
        </div>

        <motion.div
          layout
          className="grid grid-flow-row-dense grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <GalleryTile
                key={item.id}
                item={item}
                onClick={() => setLightboxItem(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <GalleryLightbox
        item={lightboxItem}
        items={filtered}
        onClose={() => setLightboxItem(null)}
        onNavigate={handleNavigate}
      />
    </section>
  )
}
