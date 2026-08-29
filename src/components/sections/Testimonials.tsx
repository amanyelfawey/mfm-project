import { useState, useEffect, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Star, PenLine } from 'lucide-react'
import { testimonials as initialTestimonials } from '@/data/testimonials'
import { FadeInSection } from '@/components/shared/FadeInSection'
import { ReviewModal } from '@/components/ui/ReviewModal'
import { asset } from '@/lib/asset'
import type { Testimonial } from '@/types'

const AUTOPLAY_INTERVAL = 6000

interface TestimonialsProps {
  hideHeader?: boolean
  showViewMore?: boolean
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
}

export function Testimonials({
  hideHeader = false,
  showViewMore = false,
}: TestimonialsProps) {
  const [items, setItems] = useState<Testimonial[]>(initialTestimonials)
  const [[current, direction], setPage] = useState<[number, number]>([0, 0])
  const [isPaused, setIsPaused] = useState(false)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => {
        const next = (prev + newDirection + items.length) % items.length
        return [next, newDirection]
      })
    },
    [items.length],
  )

  const goTo = useCallback(
    (index: number) => {
      setPage(([prev]) => {
        const dir = index >= prev ? 1 : -1
        return [index, dir]
      })
    },
    [],
  )

  useEffect(() => {
    if (isPaused || isReviewModalOpen) return

    timerRef.current = setTimeout(() => {
      paginate(1)
    }, AUTOPLAY_INTERVAL)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current, isPaused, isReviewModalOpen, paginate])

  const handleAddReview = (newReview: Testimonial) => {
    setItems((prev) => [newReview, ...prev])
    setPage([0, 1])
  }

  const active = items[current] ?? items[0]!

  return (
    <section
      id="testimonials"
      className="section-pad relative overflow-hidden bg-off-white bg-cover bg-center"
      style={{ backgroundImage: `url('${asset('/images/marbles/2.webp')}')` }}
    >
      <div className="absolute inset-0 bg-off-white/92" />

      <div className="container-luxe relative z-10">
        {!hideHeader && (
          <div className="mb-8 flex flex-col gap-5 sm:mb-12 sm:gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
            <FadeInSection direction="down">
              <div className="mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4">
                <span className="h-px w-8 bg-gold sm:w-10" />
                <p className="text-xs uppercase tracking-[0.22em] text-gold">Client Testimonials</p>
              </div>
              <h2 className="font-display text-2xl font-light text-charcoal sm:text-4xl md:text-5xl lg:text-6xl">
                What Our Clients Say
              </h2>
            </FadeInSection>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Leave a Review Button */}
              <FadeInSection delay={0.05}>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="btn-gold flex items-center gap-2 !py-2.5 !text-[10.5px] sm:!text-[11px] shadow-sm cursor-pointer"
                >
                  <PenLine size={14} />
                  <span>Leave a Review</span>
                </button>
              </FadeInSection>

              {showViewMore && (
                <FadeInSection delay={0.1}>
                  <Link to="/testimonials" className="btn-dark w-full sm:w-auto !py-2.5 !text-[10.5px] sm:!text-[11px]">
                    <span>View More</span>
                    <ArrowRight size={14} />
                  </Link>
                </FadeInSection>
              )}

              {/* Header Navigation Arrows (Desktop & Mobile) */}
              <FadeInSection delay={0.15} className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-black/15 bg-white text-charcoal shadow-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-white cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-black/15 bg-white text-charcoal shadow-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-white cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} strokeWidth={1.75} />
                </button>
              </FadeInSection>
            </div>
          </div>
        )}

        {/* When header is hidden (e.g. on TestimonialsPage), show a Leave Review top bar */}
        {hideHeader && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Reviews</p>
              <h2 className="font-display text-2xl font-light text-charcoal sm:text-3xl">
                Client Experiences
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="btn-gold flex items-center gap-2 !py-2.5 !text-[11px] shadow-sm cursor-pointer"
            >
              <PenLine size={14} />
              <span>Leave a Review</span>
            </button>
          </div>
        )}

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <FadeInSection>
            <div className="relative overflow-hidden rounded-sm">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.article
                  key={active.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x
                    if (swipe < -100 || offset.x < -60) {
                      paginate(1)
                    } else if (swipe > 100 || offset.x > 60) {
                      paginate(-1)
                    }
                  }}
                  className="relative grid cursor-grab items-center gap-5 bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] active:cursor-grabbing sm:gap-8 sm:p-8 md:grid-cols-[180px_1fr] md:gap-10 md:p-10 lg:grid-cols-[220px_1fr] lg:gap-12 lg:p-12"
                >
                  {/* Portrait / Client Project */}
                  <div className="relative mx-auto aspect-square w-24 xs:w-28 overflow-hidden rounded-sm border border-gold/30 shadow-md sm:w-36 md:mx-0 md:w-full">
                    <img
                      src={active.image}
                      alt={active.name}
                      className="image-polish h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative text-center md:text-left">
                    {/* Stars */}
                    <div className="mb-3 sm:mb-4 flex justify-center gap-1 md:justify-start">
                      {Array.from({ length: active.rating ?? 5 }).map((_, i) => (
                        <Star key={i} size={15} className="fill-gold text-gold" />
                      ))}
                    </div>

                    <blockquote className="max-w-3xl font-display text-base font-light leading-relaxed text-charcoal sm:text-xl md:text-2xl">
                      &ldquo;{active.quote}&rdquo;
                    </blockquote>

                    <div className="mt-5 border-t border-black/10 pt-3.5 sm:mt-7 sm:pt-4">
                      <p className="text-base font-medium text-charcoal sm:text-lg">{active.name}</p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-gold sm:text-[11px] sm:tracking-[0.18em]">
                        {active.projectType}
                      </p>
                    </div>

                    <span
                      className="pointer-events-none absolute -bottom-4 right-0 hidden select-none font-display text-8xl leading-none text-gold/20 sm:block lg:text-[10rem]"
                      aria-hidden="true"
                    >
                      &rdquo;
                    </span>
                  </div>
                </motion.article>
              </AnimatePresence>

              {/* Side Floating Controls on Desktop */}
              <button
                type="button"
                onClick={() => paginate(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-md backdrop-blur-sm transition-all hover:bg-gold hover:text-white cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-md backdrop-blur-sm transition-all hover:bg-gold hover:text-white cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} strokeWidth={1.75} />
              </button>
            </div>
          </FadeInSection>

          {/* Bottom Bar: Indicators + Mobile Navigation Buttons + Counter */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 sm:mt-8">
            {/* Counter */}
            <div className="text-xs font-light tracking-widest text-charcoal/60">
              <span className="font-display text-base font-medium text-charcoal">
                0{current + 1}
              </span>{' '}
              / 0{items.length}
            </div>

            {/* Pagination Lines/Dots */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 transition-all duration-500 cursor-pointer ${
                    i === current
                      ? 'w-8 sm:w-10 bg-gold'
                      : 'w-3.5 sm:w-4 bg-gold/30 hover:bg-gold/60'
                  }`}
                />
              ))}
            </div>

            {/* Mobile / Direct Navigation Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => paginate(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white text-charcoal shadow-sm transition-all hover:border-gold hover:bg-gold hover:text-white cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white text-charcoal shadow-sm transition-all hover:border-gold hover:bg-gold hover:text-white cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleAddReview}
      />
    </section>
  )
}
