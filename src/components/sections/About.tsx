import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { marbleSwatches } from '@/data/marbleSwatches'
import { STATS } from '@/lib/constants'
import { FadeInSection } from '@/components/shared/FadeInSection'

const pillars = [
  {
    title: 'Premium Natural Stone',
    detail: 'Slabs selected for vein and permanence.',
  },
  {
    title: 'Precision Fabrication',
    detail: 'CNC-cut to architectural tolerance.',
  },
  {
    title: 'London Installation',
    detail: 'In-house kitchen, bath & cladding teams.',
  },
  {
    title: 'Enduring Care',
    detail: 'Low-maintenance beauty that lasts.',
  },
]

interface AboutProps {
  hideHeading?: boolean
  compact?: boolean
}

export function About({ hideHeading = false, compact = false }: AboutProps) {
  return (
    <section id="about" className="bg-white py-14 text-black sm:py-16 lg:py-20">
      <div className="container-luxe">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          <div className="lg:col-span-7">
            {!hideHeading && (
              <FadeInSection>
                <div className="mb-3 flex items-center gap-3 sm:mb-4">
                  <span className="h-px w-8 bg-gold" />
                  <p className="text-[10px] uppercase tracking-[0.26em] text-gold ">
                    About Us
                  </p>
                </div>
              </FadeInSection>
            )}

            <FadeInSection delay={hideHeading ? 0 : 0.05}>
              <h2 className="max-w-[16ch] font-display text-[2rem] font-light leading-[1.08] tracking-[-0.03em] text-charcoal sm:text-4xl md:text-5xl">
                Choose the stone{' '}
                <span className="text-gold">that defines your home.</span>
              </h2>
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <div className="mt-4 max-w-xl border-l border-gold/40 pl-4 sm:mt-5 sm:pl-5">
                <p className="text-sm font-light leading-relaxed text-gray sm:text-[15px] sm:leading-[1.7]">
                  <span className="font-display text-base font-light text-charcoal sm:text-lg">
                    Every project begins with the slab.
                  </span>{' '}
                  We source, fabricate, and install premium natural stone across London — Calacatta
                  islands to book-matched cladding in white, black, gold-veined, and warm beige.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.15} className="mt-6 sm:mt-7">
              <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 md:max-w-xl">
                {pillars.map((item, i) => (
                  <li key={item.title} className="group flex gap-3 border-t border-black/10 pt-3">
                    <span className="font-display text-sm font-light text-gold/70 group-hover:text-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[13px] font-medium tracking-wide text-charcoal">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-xs font-light leading-snug text-gray">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </FadeInSection>

            <FadeInSection delay={0.2} className="mt-6 sm:mt-7">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-black/10 py-3 md:max-w-xl">
                {STATS.map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-1.5">
                    <p className="font-display text-xl font-light text-charcoal sm:text-2xl">
                      {stat.value}
                      <span className="text-gold">{stat.suffix}</span>
                    </p>
                    <p className="text-[9px] uppercase tracking-[0.12em] text-gray sm:text-[10px]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeInSection>

            {compact && (
              <FadeInSection delay={0.25} className="mt-6">
                <Link to="/about" className="btn-dark">
                  Our Story
                  <ArrowRight size={14} />
                </Link>
              </FadeInSection>
            )}
          </div>

          <FadeInSection className="mx-auto w-full max-w-sm lg:col-span-5 lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
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
                  className={`group relative ${i % 2 === 1 ? 'mt-3 sm:mt-5' : ''}`}
                >
                  <div className="aspect-square overflow-hidden rounded-full border-4 border-off-white shadow-[0_12px_28px_rgba(0,0,0,0.1)] ring-1 ring-gold/25">
                    <img
                      src={swatch.image}
                      alt={swatch.name}
                      className="image-polish h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-1.5 text-center text-[9px] uppercase tracking-[0.14em] text-gray sm:mt-2 sm:text-[10px]">
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
