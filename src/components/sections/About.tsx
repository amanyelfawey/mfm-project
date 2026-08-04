import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { marbleSwatches } from '@/data/marbleSwatches'
import { FadeInSection } from '@/components/shared/FadeInSection'

const features = [
  { left: 'Premium Natural Stone', right: 'Elegant Vein Patterns' },
  { left: 'Heat-Resistant Surfaces', right: 'Precision Fabrication' },
  { left: 'Low Maintenance Care', right: 'London Installation Team' },
]

interface AboutProps {
  hideHeading?: boolean
  compact?: boolean
}

export function About({ hideHeading = false, compact = false }: AboutProps) {
  return (
    <section id="about" className="section-pad bg-white text-black">
      <div className="container-luxe">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <div className="lg:col-span-7">
            {!hideHeading && (
              <FadeInSection>
                <div className="mb-4 flex items-center gap-4 sm:mb-5">
                  <span className="h-px w-8 bg-gold sm:w-10" />
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">About Us</p>
                </div>
                <h2 className="max-w-xl font-display text-3xl font-light text-charcoal sm:text-4xl md:text-5xl lg:text-6xl">
                  Choose The Stone That Defines Your Home
                </h2>
              </FadeInSection>
            )}

            {hideHeading && (
              <FadeInSection>
                <h2 className="max-w-xl font-display text-3xl font-light text-charcoal sm:text-4xl md:text-5xl">
                  Choose The Stone That Defines Your Home
                </h2>
              </FadeInSection>
            )}

            <FadeInSection delay={0.1}>
              <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-gray">
                MFM Marble &amp; Granite specialises in sourcing, fabricating, and installing
                premium natural stone. From Calacatta islands to book-matched bathroom cladding,
                every project begins with the slab — white, black, gold-veined, and warm beige.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.15} className="mt-10">
              <div className="hairline mb-8 bg-black/10" />
              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((row) => (
                  <div key={row.left} className="space-y-4">
                    <FeatureItem label={row.left} />
                    <FeatureItem label={row.right} />
                  </div>
                ))}
              </div>
            </FadeInSection>

            {compact && (
              <FadeInSection delay={0.2} className="mt-10">
                <Link to="/about" className="btn-dark">
                  Read More
                  <ArrowRight size={14} />
                </Link>
              </FadeInSection>
            )}
          </div>

          <FadeInSection className="mx-auto w-full max-w-md lg:col-span-5 lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6">
              {marbleSwatches.map((swatch, i) => (
                <motion.div
                  key={swatch.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`group relative ${i % 2 === 1 ? 'mt-4 sm:mt-8 md:mt-12' : ''}`}
                >
                  <div className="aspect-square overflow-hidden rounded-full border-4 border-off-white shadow-[0_18px_40px_rgba(0,0,0,0.12)] ring-1 ring-gold/25 sm:border-[6px]">
                    <img
                      src={swatch.image}
                      alt={swatch.name}
                      className="image-polish h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-2 text-center text-[10px] uppercase tracking-[0.14em] text-gray sm:mt-3 sm:text-[11px] sm:tracking-[0.16em]">
                    {swatch.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}

function FeatureItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-gold" />
      <span className="text-sm font-medium text-charcoal">{label}</span>
    </div>
  )
}
