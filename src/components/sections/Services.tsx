import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Gem,
  Ruler,
  Hammer,
  SquareStack,
  LayoutGrid,
  Sparkles,
} from 'lucide-react'
import { services } from '@/data/services'
import { FadeInSection } from '@/components/shared/FadeInSection'

interface ServicesProps {
  showCta?: boolean
}

const iconById: Record<string, ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  supply: Gem,
  fabrication: Ruler,
  installation: Hammer,
  worktops: SquareStack,
  cladding: LayoutGrid,
  restoration: Sparkles,
}

export function Services({ showCta = true }: ServicesProps) {
  return (
    <section className="bg-off-white py-14 text-black sm:py-16 lg:py-20">
      <div className="container-luxe">
        <div className="flex flex-col gap-6 border-b border-black/10 pb-8 sm:pb-10 lg:flex-row lg:items-end lg:justify-between">
          <FadeInSection>
            <div className="mb-3 flex items-center gap-3 sm:mb-4">
              <span className="h-px w-8 bg-gold" />
              <p className="text-[10px] uppercase tracking-[0.26em] text-gold sm:text-[11px]">
                What We Offer
              </p>
            </div>
            <h2 className="max-w-[16ch] font-display text-[2rem] font-light leading-[1.08] tracking-[-0.03em] text-charcoal sm:text-4xl md:text-5xl">
              Provides the{' '}
              <span className="text-gold">best services.</span>
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.1} className="lg:max-w-sm lg:text-right">
            <p className="text-sm font-light leading-relaxed text-gray sm:text-[15px] sm:leading-[1.7]">
              We offer a comprehensive range of premium services, including sourcing, fabrication,
              installation, and care — all under one roof.
            </p>
            {showCta && (
              <Link
                to="/gallery"
                className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-charcoal transition-colors hover:text-gold"
              >
                Read more
                <ArrowRight size={14} />
              </Link>
            )}
          </FadeInSection>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {services.map((service, i) => {
            const Icon = iconById[service.id] ?? Gem
            return (
              <FadeInSection key={service.id} delay={(i % 3) * 0.08}>
                <Link
                  to="/gallery"
                  className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-sm sm:min-h-[340px]"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="image-polish absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15 transition-opacity duration-500 group-hover:from-black/90" />

                  <span className="absolute right-4 top-4 font-display text-2xl font-light text-white/25 sm:text-3xl">
                    {service.number}
                  </span>

                  <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center border border-gold/40 bg-black/20 text-gold backdrop-blur-sm transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>

                  <div className="relative z-10 p-5 sm:p-6">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-gold">
                      {service.subtitle}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl font-light leading-tight text-white sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-white/70">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-gold opacity-80 transition-opacity group-hover:opacity-100">
                      Learn more
                      <ArrowRight
                        size={12}
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </span>
                    <span className="mt-4 block h-px w-0 bg-gold transition-all duration-700 group-hover:w-full" />
                  </div>
                </Link>
              </FadeInSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
