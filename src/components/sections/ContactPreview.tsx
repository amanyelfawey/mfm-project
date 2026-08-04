import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import { FadeInSection } from '@/components/shared/FadeInSection'

export function ContactPreview() {
  return (
    <section className="relative overflow-hidden bg-charcoal section-pad">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/images/textures/marble-black.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/95 to-charcoal/80" />

      <div className="container-luxe relative z-10">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-12">
          <FadeInSection className="lg:col-span-7">
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-8 bg-gold sm:w-10" />
              <p className="text-xs uppercase tracking-[0.22em] text-gold">Contact Us</p>
            </div>
            <h2 className="font-display text-3xl font-light text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Begin Your Stone Project
            </h2>
            <p className="mt-4 max-w-lg text-base font-light leading-relaxed text-white/65 sm:mt-6 sm:text-lg">
              Tell us about your kitchen, bathroom, or commercial space. We respond with
              material options, lead times, and a clear next step.
            </p>
            <div className="mt-8 sm:mt-10">
              <Link to="/contact" className="btn-gold w-full sm:w-auto">
                Get a Quote
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.12} className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-6 border border-gold/25 bg-black/30 p-5 backdrop-blur-sm sm:space-y-8 sm:p-8">
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-gold">Email</p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="break-all font-display text-xl font-light text-white transition-colors hover:text-gold sm:text-2xl"
                >
                  {CONTACT.email}
                </a>
              </div>
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-gold">Phone</p>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="font-display text-xl font-light text-white transition-colors hover:text-gold sm:text-2xl"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}
