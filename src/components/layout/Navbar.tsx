import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, ArrowRight } from 'lucide-react'
import { navLinks } from '@/data/navLinks'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { LogoMark } from '@/components/ui/LogoMark'

export function Navbar() {
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const isHome = pathname === '/'

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    const diff = latest - previous

    // When near top
    if (latest < 60) {
      setHidden(false)
      setIsScrolled(!isHome)
      return
    }

    setIsScrolled(true)

    // Scroll down: hide navbar if moving fast
    if (diff > 8 && latest > 180) {
      setHidden(true)
    } else if (diff < -5) {
      // Scroll up: reveal navbar
      setHidden(false)
    }
  })

  useEffect(() => {
    setHidden(false)
    setIsScrolled(!isHome || window.scrollY > 40)
  }, [pathname, isHome])

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: '-100%', opacity: 0.8 },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 pt-[env(safe-area-inset-top)] ${
          isScrolled
            ? 'bg-charcoal/95 shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-md border-b border-gold/15'
            : 'bg-charcoal/85 backdrop-blur-sm'
        }`}
      >
        <div className="container-luxe flex h-[68px] items-center justify-between gap-2 sm:h-[78px] sm:gap-4 lg:h-[88px] lg:gap-6">
          <Link to="/" className="flex min-w-0 items-center gap-2 text-white sm:gap-3 group">
            <LogoMark className="h-9 w-9 shrink-0 text-gold transition-transform duration-500 group-hover:scale-105 sm:h-11 sm:w-11 lg:h-12 lg:w-12" />
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-base tracking-wide sm:text-xl md:text-2xl">
                MFM
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.22em] text-gold/90 sm:block">
                Marble &amp; Granite
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 xl:flex 2xl:gap-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.sectionId}
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <Link
              to="/contact"
              className="btn-gold !min-h-[38px] !px-3 !py-1.5 text-[10px] sm:!min-h-11 sm:!px-5 sm:text-xs lg:inline-flex"
            >
              <span className="hidden xs:inline sm:inline">Get a Quote</span>
              <span className="xs:hidden">Quote</span>
              <ArrowRight size={14} strokeWidth={1.75} className="hidden sm:block" />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-gold xl:hidden"
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
