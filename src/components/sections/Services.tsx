import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  UtensilsCrossed,
  Droplets,
  Grid3X3,
  Flame,
  Ruler,
  Sparkles,
} from 'lucide-react'
import { services } from '@/data/services'
import { FadeInSection } from '@/components/shared/FadeInSection'

interface ServicesProps {
  showCta?: boolean
}

const iconById: Record<
  string,
  ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
> = {
  kitchens: UtensilsCrossed,
  bathrooms: Droplets,
  flooring: Grid3X3,
  cladding: Flame,
  fabrication: Ruler,
  care: Sparkles,
}

export function Services({ showCta = true }: ServicesProps) {
  return (
    <section className="bg-off-white py-16 text-black sm:py-20 lg:py-24">
      <div className="container-luxe">
        {/* Simple & Elegant Header */}
        <div className="flex flex-col gap-6 border-b border-black/10 pb-8 sm:pb-10 lg:flex-row lg:items-end lg:justify-between">
          <FadeInSection direction="down">
            <div className="mb-3 flex items-center gap-3 sm:mb-4">
              <span className="h-px w-8 bg-gold" />
              <p className="text-[10px] uppercase tracking-[0.26em] text-gold sm:text-[11px]">
                Our Services
              </p>
            </div>
            <h2 className="max-w-[18ch] font-display text-[2rem] font-light leading-[1.08] tracking-[-0.03em] text-charcoal sm:text-4xl md:text-5xl">
              What We <span className="text-gold">Do</span>
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.1} direction="left" className="lg:max-w-md lg:text-right">
            <p className="text-sm font-light leading-relaxed text-gray sm:text-[15px] sm:leading-[1.7]">
              Specialist sourcing, cutting, and fitting of natural marble, granite, and quartz for homes and commercial spaces.
            </p>
            {showCta && (
              <Link
                to="/gallery"
                className="mt-4 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-charcoal transition-colors hover:text-gold"
              >
                <span>View Projects</span>
                <ArrowRight size={14} />
              </Link>
            )}
          </FadeInSection>
        </div>

        {/* Minimalist, Clean & Elegant Cards (No Images, Pure Simplicity) */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {services.map((service, i) => {
            const Icon = iconById[service.id] ?? Sparkles
            return (
              <FadeInSection key={service.id} delay={(i % 3) * 0.08} direction="up" scale blur>
                <div className="group relative flex h-full flex-col justify-between border border-black/8 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)] sm:p-8">
                  {/* Top Subtle Gold Accent on Hover */}
                  <span className="absolute left-0 top-0 h-[2px] w-0 bg-gold transition-all duration-500 group-hover:w-full" />

                  <div>
                    {/* Header: Icon + Number */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-gold/30 bg-gold/5 text-gold transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                        <Icon size={19} strokeWidth={1.5} />
                      </div>

                      <span className="font-display text-2xl font-light text-black/20 transition-colors duration-500 group-hover:text-gold">
                        {service.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-6 font-display text-xl font-light text-charcoal transition-colors group-hover:text-black sm:text-2xl">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-xs font-light leading-relaxed text-gray sm:text-[13.5px]">
                      {service.description}
                    </p>
                  </div>

                  {/* Simple Direct Link */}
                  <div className="mt-8 border-t border-black/5 pt-4">
                    <Link
                      to="/contact"
                      className="group/link inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-charcoal transition-colors hover:text-gold font-medium"
                    >
                      <span>Request a Quote</span>
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-300 group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </FadeInSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
