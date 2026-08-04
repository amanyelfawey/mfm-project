import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { testimonials } from '@/data/testimonials'
import { FadeInSection } from '@/components/shared/FadeInSection'

const AUTOPLAY_INTERVAL = 7000

interface TestimonialsProps {
  hideHeader?: boolean
  showViewMore?: boolean
}

export function Testimonials({
  hideHeader = false,
  showViewMore = false,
}: TestimonialsProps) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const startTimeRef = useRef(0)

  const goTo = useCallback((index: number) => {
    setCurrent((index + testimonials.length) % testimonials.length)
    startTimeRef.current = Date.now()
  }, [])

  useEffect(() => {
    startTimeRef.current = Date.now()
  }, [])

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      if (Date.now() - startTimeRef.current >= AUTOPLAY_INTERVAL) {
        goTo(current + 1)
      }
    }, 80)
    return () => clearInterval(id)
  }, [isPaused, current, goTo])

  const active = testimonials[current]!

  return (
    <section id="testimonials" className="section-pad marble-texture-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-off-white/90" />

      <div className="container-luxe relative z-10">
        {!hideHeader && (
          <div className="mb-8 flex flex-col gap-5 sm:mb-12 sm:gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <FadeInSection>
              <div className="mb-4 flex items-center gap-4">
                <span className="h-px w-8 bg-gold sm:w-10" />
                <p className="text-xs uppercase tracking-[0.22em] text-gold">Our Testimonial</p>
              </div>
              <h2 className="font-display text-3xl font-light text-charcoal sm:text-4xl md:text-5xl lg:text-6xl">
                What Our Clients Say
              </h2>
            </FadeInSection>

            {showViewMore && (
              <FadeInSection delay={0.1}>
                <Link to="/testimonials" className="btn-dark w-full sm:w-auto">
                  View More
                  <ArrowRight size={14} />
                </Link>
              </FadeInSection>
            )}
          </div>
        )}

        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false)
            startTimeRef.current = Date.now()
          }}
        >
          <FadeInSection>
            <AnimatePresence mode="wait">
              <motion.article
                key={active.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid items-center gap-6 bg-white p-5 shadow-[0_24px_60px_rgba(0,0,0,0.08)] sm:gap-8 sm:p-8 md:grid-cols-[180px_1fr] md:gap-10 md:p-10 lg:grid-cols-[220px_1fr] lg:gap-12 lg:p-12"
              >
                <div className="mx-auto aspect-square w-28 overflow-hidden sm:w-40 md:mx-0 md:w-full">
                  <img
                    src={active.image}
                    alt={active.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="relative text-center md:text-left">
                  <p className="max-w-3xl text-sm font-light leading-relaxed text-gray sm:text-base md:text-lg">
                    &ldquo;{active.quote}&rdquo;
                  </p>

                  <div className="mt-6 sm:mt-8">
                    <p className="text-base font-medium text-charcoal sm:text-lg">{active.name}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-gold sm:text-[11px] sm:tracking-[0.18em]">
                      {active.projectType}
                    </p>
                  </div>

                  <span
                    className="pointer-events-none absolute -bottom-2 right-0 hidden font-display text-7xl leading-none text-gold/35 sm:block md:text-8xl lg:text-[9rem]"
                    aria-hidden="true"
                  >
                    &rdquo;
                  </span>
                </div>
              </motion.article>
            </AnimatePresence>
          </FadeInSection>

          <div className="mt-8 flex justify-center gap-2 sm:mt-10 sm:gap-3">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1 w-8 rounded-full transition-all duration-500 sm:h-px sm:w-12 sm:rounded-none ${
                  i === current ? 'bg-gold' : 'bg-gold/25'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
