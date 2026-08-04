import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
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
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[90] flex flex-col bg-charcoal pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
        >
          <div className="flex items-center justify-between px-5 py-5 sm:px-6 sm:py-6">
            <Link to="/" onClick={onClose} className="flex min-w-0 items-center gap-3 text-white">
              <LogoMark className="h-8 w-8 shrink-0 text-gold" />
              <span className="truncate font-display text-xl">MFM Marble</span>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="text-white/60 transition-colors hover:text-white"
              aria-label="Close menu"
            >
              <X size={28} strokeWidth={1} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-4 overflow-y-auto px-5 py-4 sm:gap-6 sm:px-6">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.sectionId}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  to={link.href}
                  onClick={onClose}
                  className={`font-display text-2xl font-light transition-colors sm:text-3xl ${
                    pathname === link.href ? 'text-gold' : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="space-y-4 border-t border-border px-5 py-6 sm:px-6 sm:py-8">
            <Link to="/contact" onClick={onClose} className="btn-gold w-full">
              Get a Quote
              <ArrowRight size={14} />
            </Link>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
              className="block text-center text-sm tracking-[0.15em] text-gray"
            >
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
