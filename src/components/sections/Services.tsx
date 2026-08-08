import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { services } from '@/data/services'
import { FadeInSection } from '@/components/shared/FadeInSection'

interface ServicesProps {
  showCta?: boolean
}

export function Services({ showCta = true }: ServicesProps) {
  return (
    <section className="bg-off-white py-14 text-black sm:py-16 lg:py-20">
      <div className="container-luxe">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-end">
          <FadeInSection className="lg:col-span-5">
            <div className="mb-3 flex items-center gap-3 sm:mb-4">
              <span className="h-px w-8 bg-gold" />
              <p className="text-[10px] uppercase tracking-[0.26em] text-gold sm:text-[11px]">
                What We Offer
              </p>
            </div>
            <h2 className="max-w-[12ch] font-display text-[2rem] font-light leading-[1.08] tracking-[-0.03em] text-charcoal sm:text-4xl md:text-5xl">
              Three disciplines.
              <span className="mt-1 block text-gold">One standard.</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-gray sm:mt-5">
              Sourcing, crafting, and finishing — kept under one roof so every surface stays true
              from slab to install.
            </p>
            {showCta && (
              <Link to="/gallery" className="btn-dark mt-6 sm:mt-8">
                Explore work
                <ArrowRight size={14} />
              </Link>
            )}
          </FadeInSection>

          <div className="grid gap-3 sm:grid-cols-3 sm:gap-3 lg:col-span-7 lg:gap-4">
            {services.map((service, i) => (
              <FadeInSection key={service.id} delay={i * 0.1}>
                <Link
                  to="/gallery"
                  className={`group relative flex min-h-[280px] flex-col justify-end overflow-hidden sm:min-h-[360px] lg:min-h-[420px] ${
                    i === 1 ? 'sm:mt-8 lg:mt-12' : i === 2 ? 'sm:mt-4 lg:mt-6' : ''
                  }`}
                >
                  <img
                    src={service.image}
                    alt=""
                    className="image-polish absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 transition-opacity duration-500 group-hover:from-black/90" />

                  <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
                    <span className="font-display text-3xl font-light text-white/35 sm:text-4xl">
                      {service.number}
                    </span>

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.22em] text-gold">
                        {service.subtitle}
                      </p>
                      <h3 className="mt-1.5 font-display text-xl font-light leading-tight text-white sm:text-2xl">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm font-light leading-relaxed text-white/70 sm:mt-3 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-500 md:group-hover:max-h-28 md:group-hover:opacity-100">
                        {service.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-gold opacity-80 transition-opacity group-hover:opacity-100">
                        View
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
