import { Link } from 'react-router-dom'
import { ArrowRight, Layers, Hammer, Sparkles } from 'lucide-react'
import { services } from '@/data/services'
import { FadeInSection } from '@/components/shared/FadeInSection'

const icons = [Layers, Hammer, Sparkles]

interface ServicesProps {
  showCta?: boolean
}

export function Services({ showCta = true }: ServicesProps) {
  return (
    <section className="section-pad marble-texture-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-off-white/88" />

      <div className="container-luxe relative z-10">
        <div className="mb-8 flex flex-col gap-5 sm:mb-12 sm:gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <FadeInSection>
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-8 bg-gold sm:w-10" />
              <p className="text-xs uppercase tracking-[0.22em] text-gold">What We Offer</p>
            </div>
            <h2 className="font-display text-3xl font-light text-charcoal sm:text-4xl md:text-5xl lg:text-6xl">
              Provides Best Services
            </h2>
          </FadeInSection>

          {showCta && (
            <FadeInSection delay={0.1}>
              <Link to="/gallery" className="btn-dark w-full sm:w-auto">
                Read More
                <ArrowRight size={14} />
              </Link>
            </FadeInSection>
          )}
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[i] ?? Layers
            return (
              <FadeInSection key={service.id} delay={i * 0.1}>
                <article className="group relative h-full bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-transform duration-700 hover:-translate-y-2">
                  <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[4/3]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="image-polish h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
                      loading="lazy"
                    />
                  </div>

                  <div className="relative px-5 pb-8 pt-10 sm:px-7 sm:pb-10 sm:pt-12">
                    <div className="absolute -top-7 left-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white shadow-[0_10px_25px_rgba(201,164,92,0.45)] sm:-top-8 sm:left-7 sm:h-16 sm:w-16">
                      <Icon size={22} strokeWidth={1.5} className="sm:hidden" />
                      <Icon size={26} strokeWidth={1.5} className="hidden sm:block" />
                    </div>

                    <span
                      className="pointer-events-none absolute right-4 top-5 font-display text-5xl font-light text-charcoal/[0.06] sm:right-5 sm:top-6 sm:text-7xl"
                      aria-hidden="true"
                    >
                      {service.number}
                    </span>

                    <h3 className="relative font-display text-xl font-light text-charcoal sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="relative mt-2 text-[10px] uppercase tracking-[0.18em] text-gold sm:text-[11px] sm:tracking-[0.2em]">
                      {service.subtitle}
                    </p>
                    <p className="relative mt-3 text-sm font-light leading-relaxed text-gray sm:mt-4">
                      {service.description}
                    </p>
                  </div>
                </article>
              </FadeInSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
