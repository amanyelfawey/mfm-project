import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { CONTACT } from '@/lib/constants'
import { ContactForm } from '@/components/ui/ContactForm'
import { FadeInSection } from '@/components/shared/FadeInSection'

interface ContactProps {
  hideHeader?: boolean
}

export function Contact({ hideHeader = false }: ContactProps) {
  return (
    <section id="contact" className="section-pad bg-off-white">
      <div className="container-luxe">
        {!hideHeader && (
          <FadeInSection className="mb-10 sm:mb-16">
            <p className="eyebrow mb-4 sm:mb-6">Contact</p>
            <h2 className="font-display text-3xl font-light text-black sm:text-4xl md:text-6xl">
              Begin Your Project
            </h2>
          </FadeInSection>
        )}

        <div className="grid grid-cols-1 gap-12 sm:gap-16 lg:grid-cols-12">
          <FadeInSection className="lg:col-span-7">
            <ContactForm />
          </FadeInSection>

          <FadeInSection delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-8 sm:space-y-10">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <Mail size={16} className="shrink-0 text-gold" strokeWidth={1.5} />
                  <p className="eyebrow">Email</p>
                </div>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="break-all font-display text-xl font-light text-black transition-colors hover:text-gold sm:text-2xl md:text-3xl"
                >
                  {CONTACT.email}
                </a>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <Phone size={16} className="shrink-0 text-gold" strokeWidth={1.5} />
                  <p className="eyebrow">Phone</p>
                </div>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="font-display text-xl font-light text-black transition-colors hover:text-gold sm:text-2xl md:text-3xl"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <MapPin size={16} className="shrink-0 text-gold" strokeWidth={1.5} />
                  <p className="eyebrow">Address</p>
                </div>
                <p className="text-sm font-light text-gray sm:text-base">{CONTACT.address}</p>
              </div>

              <div>
                <div className="mb-3 flex items-center gap-3">
                  <Clock size={16} className="shrink-0 text-gold" strokeWidth={1.5} />
                  <p className="eyebrow">Hours</p>
                </div>
                <p className="text-sm font-light text-gray sm:text-base">{CONTACT.hours}</p>
              </div>
            </div>

            <div className="mt-8 overflow-hidden grayscale sm:mt-12">
              <iframe
                title="MFM Marble location"
                src={CONTACT.mapEmbedUrl}
                width="100%"
                height="220"
                className="min-h-[220px] w-full sm:min-h-[280px]"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}
