import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { useScrollPosition } from '@/hooks/useScrollPosition'

export function ScrollToTopButton() {
  const scrollY = useScrollPosition()
  const visible = scrollY > 600

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 flex h-11 w-11 items-center justify-center bg-gold text-white shadow-[0_10px_30px_rgba(201,164,92,0.4)] transition-colors hover:bg-gold-light hover:text-black sm:bottom-8 sm:right-8 sm:h-12 sm:w-12"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
