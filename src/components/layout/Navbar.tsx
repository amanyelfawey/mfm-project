import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, ArrowRight } from 'lucide-react'
import { navLinks } from '@/data/navLinks'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { LogoMark } from '@/components/ui/LogoMark'

export function Navbar() {
  const scrollY = useScrollPosition()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const isHome = pathname === '/'
  const isScrolled = scrollY > 40 || !isHome

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled || !isHome
            ? 'bg-charcoal shadow-[0_10px_40px_rgba(0,0,0,0.35)]'
            : 'bg-charcoal/90 backdrop-blur-md'
        }`}
      >
        <div className="container-luxe flex h-[72px] items-center justify-between gap-3 sm:h-[78px] sm:gap-4 lg:h-[88px] lg:gap-6">
          <Link to="/" className="flex min-w-0 items-center gap-2 text-white sm:gap-3">
            <LogoMark className="h-12 w-12 shrink-0 text-gold sm:h-12 sm:w-12" />
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-lg tracking-wide sm:text-xl md:text-2xl">
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

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              to="/contact"
              className="btn-gold !min-h-10 !px-3 !py-2 text-[10px] sm:!min-h-11 sm:!px-5 sm:text-xs lg:inline-flex"
            >
              <span className="hidden sm:inline">Get a Quote</span>
              <span className="sm:hidden">Quote</span>
              <ArrowRight size={14} strokeWidth={1.75} className="hidden sm:block" />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-white xl:hidden"
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
