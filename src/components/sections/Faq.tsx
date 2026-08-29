import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { faqItems } from '@/data/faqItems'
import { STATS } from '@/lib/constants'
import { FadeInSection } from '@/components/shared/FadeInSection'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import faqImage from '@/assets/faq/1.jpg'

interface FaqProps {
  hideHeader?: boolean
}

export function Faq({ hideHeader = false }: FaqProps) {
  const [openId, setOpenId] = useState(faqItems[2]?.id ?? faqItems[0]?.id ?? '')

  return (
    <section id="faq" className="section-pad bg-white text-black">
      <div className="container-luxe">
        <div className="grid items-start gap-10 sm:gap-14 lg:grid-cols-12">
          {/* Left Column: Image with floating badges */}
          <FadeInSection direction="right" blur scale className="relative mb-10 lg:col-span-5 lg:mb-0 lg:pb-12">
            <div className="relative aspect-[4/5] max-h-[380px] sm:max-h-[460px] lg:max-h-none overflow-hidden rounded-sm shadow-lg">
              <img
                src={faqImage}
                alt="marbles"
                className="image-polish h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="absolute -bottom-6 left-2 right-2 xs:left-4 xs:right-4 flex max-w-full sm:-bottom-6 sm:left-6 sm:right-auto">
              <div className="flex min-w-0 flex-1 flex-col justify-center bg-gold px-3 py-4 text-white shadow-[0_16px_40px_rgba(201,164,92,0.35)] sm:min-w-[140px] sm:flex-none sm:px-6 sm:py-7 md:min-w-[160px]">
                <p className="font-display text-2xl xs:text-3xl font-light leading-none sm:text-4xl md:text-5xl">
                  <AnimatedCounter value={STATS[0].value} suffix={STATS[0].suffix} />
                </p>
                <p className="mt-1.5 text-[8.5px] uppercase tracking-[0.14em] sm:text-[10px] sm:tracking-[0.16em]">
                  {STATS[0].label}
                </p>
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center bg-charcoal px-3 py-4 text-white shadow-[0_16px_40px_rgba(0,0,0,0.25)] sm:min-w-[140px] sm:flex-none sm:px-6 sm:py-7 md:min-w-[160px]">
                <p className="font-display text-2xl xs:text-3xl font-light leading-none sm:text-4xl md:text-5xl">
                  <AnimatedCounter value={STATS[1].value} suffix={STATS[1].suffix} />
                </p>
                <p className="mt-1.5 text-[8.5px] uppercase tracking-[0.14em] sm:text-[10px] sm:tracking-[0.16em]">
                  {STATS[1].label}
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-6 lg:col-start-7">
            {!hideHeader && (
              <FadeInSection direction="left" className="mb-6 sm:mb-10">
                <div className="mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4">
                  <span className="h-px w-8 bg-gold sm:w-10" />
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">Common Queries</p>
                </div>
                <h2 className="font-display text-2xl font-light text-charcoal sm:text-4xl md:text-5xl">
                  Frequently Asked <span className="text-gold">Questions</span>
                </h2>
              </FadeInSection>
            )}

            <FadeInSection delay={0.1} direction="up" className="divide-y divide-black/10 border-t border-black/10">
              {faqItems.map((item) => {
                const isOpen = openId === item.id
                return (
                  <div key={item.id} className="py-4 sm:py-5 transition-colors">
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? '' : item.id)}
                      className="flex w-full items-start justify-between gap-3 text-left sm:gap-6 group cursor-pointer touch-manipulation"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-medium text-charcoal transition-colors group-hover:text-gold sm:text-base md:text-lg">
                        {item.question}
                      </span>
                      <span className="mt-1 shrink-0 text-gold transition-transform duration-300 group-hover:scale-110">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="mt-2.5 pb-1 text-xs sm:text-sm font-light leading-relaxed text-gray">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  )
}
