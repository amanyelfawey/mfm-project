import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Phone, Mail, MapPin } from 'lucide-react'
import { navLinks } from '@/data/navLinks'
import { CONTACT } from '@/lib/constants'
import { LogoMark } from '@/components/ui/LogoMark'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm xl:hidden"
          onClick={onClose}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col justify-between bg-charcoal pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] shadow-2xl border-l border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex h-[68px] items-center justify-between border-b border-white/10 px-5 sm:h-[78px] sm:px-6">
              <Link to="/" onClick={onClose} className="flex min-w-0 items-center gap-2.5 text-white">
                <LogoMark className="h-8 w-8 shrink-0 text-gold" />
                <span className="truncate font-display text-lg tracking-wide">MFM Marble</span>
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-1 flex-col justify-center gap-2 overflow-y-auto px-6 py-6 sm:gap-3 sm:px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.sectionId}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.05 + i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className={`block py-2 font-display text-2xl font-light transition-colors hover:text-gold sm:text-3xl ${
                      pathname === link.href ? 'text-gold' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Contact Details */}
            <div className="space-y-4 border-t border-white/10 px-6 py-6 sm:px-8 sm:py-7">
              <Link to="/contact" onClick={onClose} className="btn-gold w-full shadow-md">
                <span>Get a Free Quote</span>
                <ArrowRight size={14} />
              </Link>

              <div className="space-y-2 pt-2 text-xs text-white/70">
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-gold"
                >
                  <Phone size={13} className="shrink-0 text-gold" />
                  <span>{CONTACT.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-gold break-all"
                >
                  <Mail size={13} className="shrink-0 text-gold" />
                  <span>{CONTACT.email}</span>
                </a>
                <div className="flex items-start gap-2.5 text-white/50">
                  <MapPin size={13} className="shrink-0 text-gold mt-0.5" />
                  <span className="text-[11px] leading-snug">{CONTACT.address}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
