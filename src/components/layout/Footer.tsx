import { Link } from 'react-router-dom'
import { navLinks } from '@/data/navLinks'
import { BRAND, CONTACT, SOCIAL } from '@/lib/constants'
import { LogoMark } from '@/components/ui/LogoMark'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function PinterestIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black pt-20 pb-10">
      <div className="hairline mb-16" />

      <div className="container-luxe">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 text-white">
              <LogoMark className="h-8 w-8 text-gold" />
              <div>
                <p className="font-display text-2xl tracking-wide">MFM Marble</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">&amp; Granite</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray">{BRAND.shortTagline}</p>
          </div>

          <div>
            <p className="eyebrow mb-6">Navigation</p>
            <ul className="space-y-3">
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
          </div>

          <div>
            <p className="eyebrow mb-6">Contact</p>
            <ul className="space-y-3 text-sm text-gray">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors duration-600 hover:text-gold"
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
              <li>{CONTACT.address}</li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-6">Follow</p>
            <div className="flex gap-5">
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="text-gray transition-colors hover:text-gold" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href={SOCIAL.pinterest} target="_blank" rel="noopener noreferrer" className="text-gray transition-colors hover:text-gold" aria-label="Pinterest">
                <PinterestIcon />
              </a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray transition-colors hover:text-gold" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="relative mt-12 overflow-hidden sm:mt-20">
          <p
            className="pointer-events-none select-none text-center font-display text-[14vw] font-light leading-none text-white/[0.04] sm:text-[11vw]"
            aria-hidden="true"
          >
            MFM
          </p>
        </div>

        <div className="hairline my-10" />

        <p className="text-center text-xs tracking-[0.1em] text-gray">
          &copy; {new Date().getFullYear()} MFM Marble &amp; Granite. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
