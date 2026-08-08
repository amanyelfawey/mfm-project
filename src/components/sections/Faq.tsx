import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { faqItems } from '@/data/faqItems'
import { FadeInSection } from '@/components/shared/FadeInSection'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { asset } from '@/lib/asset'

interface FaqProps {
  hideHeader?: boolean
}

export function Faq({ hideHeader = false }: FaqProps) {
  const [openId, setOpenId] = useState(faqItems[2]?.id ?? faqItems[0]?.id ?? '')

  return (
    <section id="faq" className="section-pad bg-white text-black">
      <div className="container-luxe">
        <div className="grid items-start gap-12 sm:gap-14 lg:grid-cols-12">
          <FadeInSection className="relative mb-8 lg:col-span-5 lg:mb-0 lg:pb-12">
            <div className="relative aspect-[4/5] max-h-[420px] overflow-hidden sm:max-h-none">
              <img
                src={asset('/images/marbles/10.webp')}
                alt="White marble slab with grey veining"
                className="image-polish h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="absolute -bottom-5 left-3 right-3 flex max-w-full sm:-bottom-6 sm:left-6 sm:right-auto">
              <div className="flex min-w-0 flex-1 flex-col justify-center bg-gold px-4 py-5 text-white shadow-[0_16px_40px_rgba(201,164,92,0.35)] sm:min-w-[140px] sm:flex-none sm:px-6 sm:py-7 md:min-w-[160px]">
                <p className="font-display text-3xl font-light leading-none sm:text-4xl md:text-5xl">
                  <AnimatedCounter value={20} suffix="+" />
                </p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.14em] sm:text-[10px] sm:tracking-[0.16em]">
                  Years Of Experience
                </p>
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center bg-charcoal px-4 py-5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.25)] sm:min-w-[140px] sm:flex-none sm:px-6 sm:py-7 md:min-w-[160px]">
                <p className="font-display text-3xl font-light leading-none sm:text-4xl md:text-5xl">
                  <AnimatedCounter value={500} suffix="+" />
                </p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.14em] sm:text-[10px] sm:tracking-[0.16em]">
                  Projects Completed
                </p>
              </div>
            </div>
          </FadeInSection>

          <div className="lg:col-span-6 lg:col-start-7">
            {!hideHeader && (
              <FadeInSection className="mb-8 sm:mb-10">
                <div className="mb-4 flex items-center gap-4">
                  <span className="h-px w-8 bg-gold sm:w-10" />
                  <p className="text-xs uppercase tracking-[0.22em] text-gold">Common Queries</p>
                </div>
                <h2 className="font-display text-3xl font-light text-charcoal sm:text-4xl md:text-5xl">
                  Asked Questions?
                </h2>
              </FadeInSection>
            )}

            <FadeInSection delay={0.1} className="divide-y divide-black/10 border-t border-black/10">
              {faqItems.map((item) => {
                const isOpen = openId === item.id
                return (
                  <div key={item.id} className="py-5">
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? '' : item.id)}
                      className="flex w-full items-start justify-between gap-3 text-left sm:gap-6"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-medium text-charcoal sm:text-base md:text-lg">
                        {item.question}
                      </span>
                      <span className="mt-1 shrink-0 text-gold">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden text-sm font-light leading-relaxed text-gray"
                        >
                          <span className="mt-4 block pb-1">{item.answer}</span>
                        </motion.p>
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
