import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Layers,
} from 'lucide-react'
import type { ProjectItem } from '@/types'

interface GalleryLightboxProps {
  project: ProjectItem | null
  projects: ProjectItem[]
  onClose: () => void
  onNavigateProject: (direction: 'prev' | 'next') => void
}

export function GalleryLightbox({
  project,
  projects,
  onClose,
  onNavigateProject,
}: GalleryLightboxProps) {
  const [photoIndex, setPhotoIndex] = useState(0)

  // Reset photo index whenever active project changes
  useEffect(() => {
    setPhotoIndex(0)
  }, [project?.id])

  const projectIndex = project ? projects.findIndex((p) => p.id === project.id) : -1
  const images = project?.images ?? []
  const activeImage = images[photoIndex] ?? project?.coverImage ?? ''

  const handlePrevPhoto = useCallback(() => {
    if (images.length <= 1) return
    setPhotoIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
  }, [images.length])

  const handleNextPhoto = useCallback(() => {
    if (images.length <= 1) return
    setPhotoIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
  }, [images.length])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!project) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrevPhoto()
      if (e.key === 'ArrowRight') handleNextPhoto()
    },
    [project, onClose, handlePrevPhoto, handleNextPhoto],
  )

  useEffect(() => {
    if (!project) return
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, handleKeyDown])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between overflow-y-auto bg-black/95 p-3 backdrop-blur-2xl sm:p-6 lg:p-8"
          onClick={onClose}
        >
          {/* Header Bar */}
          <div
            className="flex items-center justify-between border-b border-white/10 pb-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="rounded-xs border border-gold/40 bg-gold/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-gold">
                {project.category}
              </span>
              <span className="text-xs text-white/70">
                {project.material}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1 text-xs text-white/50 mr-4">
                <span>Project {projectIndex + 1} of {projects.length}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold hover:bg-gold hover:text-black"
                aria-label="Close project view"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div
            className="relative my-auto grid w-full max-w-7xl items-center gap-6 py-4 lg:grid-cols-12 lg:gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left/Main Column: Image Viewer with controls */}
            <div className="relative flex flex-col items-center lg:col-span-8">
              <div className="relative aspect-[4/3] max-h-[65svh] w-full overflow-hidden rounded-sm bg-charcoal/80 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    alt={`${project.title} - Photo ${photoIndex + 1}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="image-polish h-full w-full object-contain"
                  />
                </AnimatePresence>

                {/* Photo Navigation arrows on image */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevPhoto}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-gold hover:text-black"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft size={22} strokeWidth={1.5} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextPhoto}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-gold hover:text-black"
                      aria-label="Next photo"
                    >
                      <ChevronRight size={22} strokeWidth={1.5} />
                    </button>
                  </>
                )}

                {/* Image counter indicator */}
                {images.length > 1 && (
                  <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-light tracking-wider text-white backdrop-blur-md">
                    {photoIndex + 1} / {images.length}
                  </div>
                )}
              </div>

              {/* Thumbnails strip */}
              {images.length > 1 && (
                <div className="mt-4 flex w-full gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {images.map((img, idx) => (
                    <button
                      key={img}
                      type="button"
                      onClick={() => setPhotoIndex(idx)}
                      className={`relative aspect-[4/3] h-14 shrink-0 overflow-hidden rounded-xs border transition-all duration-300 ${
                        idx === photoIndex
                          ? 'border-gold ring-1 ring-gold opacity-100 scale-105'
                          : 'border-white/10 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Project Details */}
            <div className="flex flex-col justify-between rounded-sm border border-white/10 bg-white/[0.03] p-6 text-white backdrop-blur-md lg:col-span-4 lg:p-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold">
                  {project.category}
                </p>
                <h3 className="mt-2 font-display text-2xl font-light leading-tight text-white sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-xs font-light text-gold-light tracking-wide">
                  {project.material}
                </p>

                <p className="mt-4 text-xs font-light leading-relaxed text-white/75 sm:text-sm">
                  {project.description}
                </p>

                {/* Features / Details */}
                {project.scope && project.scope.length > 0 && (
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/50">
                      <Layers size={12} className="text-gold" />
                      <span>Project Features</span>
                    </p>
                    <ul className="mt-2.5 space-y-1.5">
                      {project.scope.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs font-light text-white/80">
                          <span className="h-1 w-1 rounded-full bg-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="btn-gold flex w-full items-center justify-center gap-2 !py-3 text-xs"
                >
                  <span>Request a Quote</span>
                  <ArrowRight size={14} />
                </Link>

                {/* Next/Prev Project Nav */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigateProject('prev')}
                    className="flex items-center gap-1.5 text-xs text-white/60 transition-colors hover:text-gold"
                  >
                    <ChevronLeft size={16} />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigateProject('next')}
                    className="flex items-center gap-1.5 text-xs text-white/60 transition-colors hover:text-gold"
                  >
                    <span>Next</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
