import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { STATS } from '@/lib/constants'
import { FadeInSection } from '@/components/shared/FadeInSection'
import { StoneLibrary } from '@/components/ui/StoneLibrary'

const pillars = [
  {
    title: 'Sourcing',
    detail: 'Sourcing the finest natural stones from around the world.',
  },
  {
    title: 'Fabrication',
    detail: 'Precision cutting and finishing to fit your unique design needs.',
  },
  {
    title: 'Installation',
    detail: 'Expert craftsmanship for flawless installation.',
  },
  {
    title: 'Maintenance',
    detail: 'Keeping your stone surfaces in pristine condition.',
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
              <h2 className="max-w-[18ch] font-display text-[2rem] font-light leading-[1.08] tracking-[-0.03em] text-charcoal sm:text-4xl md:text-5xl">
                Crafting Excellence in{' '}
                <span className="text-gold">Marble &amp; Granite</span>
              </h2>
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <div className="mt-4 max-w-xl border-l border-gold/40 pl-4 sm:mt-5 sm:pl-5">
                <p className="text-sm font-light leading-relaxed text-gray sm:text-[15px] sm:leading-[1.7]">
                  <span className="font-display text-base font-light text-charcoal sm:text-lg">
                    Welcome to MFM Marble &amp; Granite Limited,
                  </span>{' '}
                  where craftsmanship meets elegance. With years of expertise in the stone industry,
                  we specialize in providing high-quality marble, granite, and other natural stone
                  solutions for both residential and commercial projects. Our commitment to
                  excellence, precision, and customer satisfaction sets us apart as a trusted name in
                  the industry.
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

            {/* {compact && (
              <FadeInSection delay={0.25} className="mt-6">
                <Link to="/about" className="btn-dark">
                  Our Story
                  <ArrowRight size={14} />
                </Link>
              </FadeInSection>
            )} */}
          </div>

          <FadeInSection className="lg:col-span-5">
            <div className="mb-3 flex items-center justify-center gap-3 lg:justify-start">
              <span className="h-px w-6 bg-gold/50" />
              <p className="text-[9px] uppercase tracking-[0.24em] text-gray">Material Library</p>
            </div>
            <StoneLibrary />
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}
