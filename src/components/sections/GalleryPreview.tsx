import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { galleryItems } from '@/data/galleryItems'
import { FadeInSection } from '@/components/shared/FadeInSection'

const previewIds = [
  'material-statuario',
  'bathroom-panda-gold',
  'kitchen-hex-splashback',
  'cladding-chevron-bookmatch',
  'kitchen-waterfall-island',
  'flooring-beige-marble',
]

const previewItems = galleryItems.filter((item) => previewIds.includes(item.id))

export function GalleryPreview() {
  return (
    <section className="section-pad bg-charcoal">
      <div className="container-luxe">
        <div className="mb-8 flex flex-col gap-5 sm:mb-12 sm:gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <FadeInSection>
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-8 bg-gold sm:w-10" />
              <p className="text-xs uppercase tracking-[0.22em] text-gold">Our Collection</p>
            </div>
            <h2 className="font-display text-3xl font-light text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Selected Stone Works
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.1}>
            <Link to="/gallery" className="btn-gold w-full sm:w-auto">
              View Full Gallery
              <ArrowRight size={14} />
            </Link>
          </FadeInSection>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {previewItems.map((item, index) => (
            <FadeInSection key={item.id} delay={index * 0.06}>
              <Link
                to="/gallery"
                className="group relative block aspect-[4/5] overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={`${item.title} — ${item.material}`}
                  loading="lazy"
                  className="image-polish h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-gold sm:mb-2 sm:text-[11px] sm:tracking-[0.18em]">
                    {item.category}
                  </p>
                  <h3 className="font-display text-xl font-light text-white sm:text-2xl">{item.title}</h3>
                  <p className="mt-1 text-[11px] text-white/55 sm:text-xs">{item.material}</p>
                </div>
                <div className="absolute inset-0 border border-gold/0 transition-colors duration-700 group-hover:border-gold/50" />
              </Link>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
