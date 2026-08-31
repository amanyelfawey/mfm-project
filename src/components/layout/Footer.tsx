import { Link } from 'react-router-dom'
import { navLinks } from '@/data/navLinks'
import { BRAND, CONTACT, SOCIAL } from '@/lib/constants'
import { LogoMark } from '@/components/ui/LogoMark'
import { FadeInSection } from '@/components/shared/FadeInSection'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black pt-16 pb-8 sm:pt-20 sm:pb-10">
      <div className="hairline mb-12 sm:mb-16" />

      <div className="container-luxe">
        <div className="grid gap-10 sm:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <FadeInSection direction="up" delay={0}>
            <div className="flex items-center gap-3 text-white">
              <LogoMark className="h-8 w-8 text-gold" />
              <div>
                <p className="font-display text-2xl tracking-wide">MFM Marble</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">&amp; Granite</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray max-w-sm">{BRAND.shortTagline}</p>
          </FadeInSection>

          <FadeInSection direction="up" delay={0.08}>
            <p className="eyebrow mb-4 sm:mb-6">Navigation</p>
            <ul className="space-y-2.5 sm:space-y-3">
              {navLinks.map((link) => (
                <li key={link.sectionId}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray transition-colors duration-600 hover:text-gold"
                    style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeInSection>

          <FadeInSection direction="up" delay={0.16}>
            <p className="eyebrow mb-4 sm:mb-6">Contact</p>
            <ul className="space-y-2.5 sm:space-y-3 text-sm text-gray">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors duration-600 hover:text-gold break-all"
                  style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="transition-colors duration-600 hover:text-gold"
                  style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone2.replace(/\s/g, '')}`}
                  className="transition-colors duration-600 hover:text-gold"
                  style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
                >
                  {CONTACT.phone2Display}
                </a>
              </li>
              <li className="leading-relaxed">{CONTACT.address}</li>
            </ul>
          </FadeInSection>

          <FadeInSection direction="up" delay={0.24}>
            <p className="eyebrow mb-4 sm:mb-6">Follow</p>
            <div className="flex gap-4 sm:gap-5">
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-gray transition-colors hover:border-gold hover:text-gold" aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>
          </FadeInSection>
        </div>

        <FadeInSection direction="none" blur delay={0.2} className="relative mt-10 overflow-hidden sm:mt-16">
          <p
            className="pointer-events-none select-none text-center font-display text-[14vw] font-light leading-none text-white/[0.04] sm:text-[11vw]"
            aria-hidden="true"
          >
            MFM
          </p>
        </FadeInSection>

        <div className="hairline my-8 sm:my-10" />

        <p className="text-center text-xs tracking-[0.1em] text-gray">
          &copy; {new Date().getFullYear()} MFM Marble &amp; Granite. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
