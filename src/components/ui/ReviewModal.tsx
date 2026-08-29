import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Check, Sparkles } from 'lucide-react'
import type { Testimonial } from '@/types'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmitReview: (review: Testimonial) => void
}

const DEFAULT_PROJECT_TYPES = [
  'Kitchen Worktops & Island',
  'Bathroom Vanity & Wet Room',
  'Marble Flooring & Staircase',
  'Feature Wall & Fireplace',
  'Commercial Project',
  'Bespoke Stone Fabrication',
  'Restoration & Care',
]

const AVATAR_IMAGES = [
  '/images/hero/1.webp',
  '/images/hero/2.webp',
  '/images/hero/3.webp',
  '/images/hero/5.webp',
]

export function ReviewModal({ isOpen, onClose, onSubmitReview }: ReviewModalProps) {
  const [name, setName] = useState('')
  const [projectType, setProjectType] = useState(DEFAULT_PROJECT_TYPES[0])
  const [customProjectType, setCustomProjectType] = useState('')
  const [quote, setQuote] = useState('')
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  // Handle ESC key to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    },
    [isOpen, onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
      setIsSuccess(false)
      setError('')
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // ONLY validate name as requested
    if (!name.trim()) {
      setError('Please enter your name.')
      return
    }

    setError('')
    setIsSubmitting(true)

    // Simulate short submission delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    const selectedType =
      projectType === 'Other' && customProjectType.trim()
        ? customProjectType.trim()
        : projectType

    const finalQuote =
      quote.trim() ||
      'Exceptional quality and exquisite craftsmanship. Delighted with our stone installation.'

    const randomAvatar = AVATAR_IMAGES[Math.floor(Math.random() * AVATAR_IMAGES.length)]

    const newReview: Testimonial = {
      id: `client-${Date.now()}`,
      name: name.trim(),
      projectType: selectedType,
      quote: finalQuote,
      rating,
      image: randomAvatar,
    }

    onSubmitReview(newReview)
    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset form after short delay and close
    setTimeout(() => {
      setName('')
      setQuote('')
      setRating(5)
      setCustomProjectType('')
      onClose()
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-8 w-full max-w-lg overflow-hidden rounded-sm border border-gold/40 bg-[#faf9f7] p-6 shadow-2xl text-black sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gold accent line */}
            <span className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-gold/50 via-gold to-gold/50" />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-charcoal transition-colors hover:border-gold hover:bg-gold hover:text-white"
              aria-label="Close review modal"
            >
              <X size={18} />
            </button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-gold/10 text-gold shadow-sm">
                  <Check size={32} strokeWidth={2} />
                </div>
                <h3 className="mt-5 font-display text-2xl font-light text-charcoal sm:text-3xl">
                  Thank You for Your Feedback
                </h3>
                <p className="mt-2 max-w-sm text-xs font-light leading-relaxed text-gray sm:text-sm">
                  Your review has been added. We truly appreciate you taking the time to share your experience with MFM Marble &amp; Granite.
                </p>
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
              </motion.div>
            ) : (
              <div>
                {/* Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-gold" />
                    <p className="text-[10px] uppercase tracking-[0.24em] text-gold font-medium">
                      Client Feedback
                    </p>
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-light text-charcoal sm:text-3xl">
                    Share Your Experience
                  </h3>
                  <p className="mt-1 text-xs font-light text-gray">
                    We value your feedback. Let us know how we brought your stone vision to life.
                  </p>
                </div>

                {error && (
                  <div className="mb-4 rounded-xs border border-red-200 bg-red-50 p-2.5 text-xs text-red-600">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {/* Rating selection */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.15em] text-gray mb-1.5">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-1 transition-transform hover:scale-110"
                          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                        >
                          <Star
                            size={24}
                            className={`transition-colors ${
                              (hoverRating !== null ? star <= hoverRating : star <= rating)
                                ? 'fill-gold text-gold'
                                : 'text-black/20'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-xs font-medium text-charcoal">
                        {hoverRating !== null ? `${hoverRating} / 5` : `${rating} / 5`}
                      </span>
                    </div>
                  </div>

                  {/* Name (Only required field) */}
                  <div>
                    <label htmlFor="review-name" className="form-label">
                      Your Name <span className="text-gold">*</span>
                    </label>
                    <input
                      id="review-name"
                      type="text"
                      placeholder="e.g. Victoria Ashford"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        if (error) setError('')
                      }}
                      className="form-input text-sm"
                      required
                    />
                  </div>

                  {/* Project / Space Type */}
                  <div>
                    <label htmlFor="review-projectType" className="form-label">
                      Project / Space
                    </label>
                    <select
                      id="review-projectType"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="form-input cursor-pointer appearance-none bg-transparent text-sm"
                    >
                      {DEFAULT_PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                      <option value="Other">Other (Custom specification)</option>
                    </select>

                    {projectType === 'Other' && (
                      <input
                        type="text"
                        placeholder="Enter project type (e.g. Bespoke Fireplace in Kensington)"
                        value={customProjectType}
                        onChange={(e) => setCustomProjectType(e.target.value)}
                        className="form-input mt-2 text-sm"
                      />
                    )}
                  </div>

                  {/* Review Text (Optional) */}
                  <div>
                    <label htmlFor="review-quote" className="form-label">
                      Your Review / Testimonial (Optional)
                    </label>
                    <textarea
                      id="review-quote"
                      rows={3}
                      placeholder="Tell us about the stone quality, craftsmanship, and service..."
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      className="form-input resize-none text-sm"
                    />
                  </div>

                  {/* Submit button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-gold w-full flex items-center justify-center gap-2 !py-3 !text-xs disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Submitting...' : 'Submit Review'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
