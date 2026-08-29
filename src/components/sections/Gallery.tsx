import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/data/projects'
import type { GalleryCategory } from '@/lib/constants'
import type { ProjectItem } from '@/types'
import { GalleryFilter } from '@/components/ui/GalleryFilter'
import { GalleryLightbox } from '@/components/ui/GalleryLightbox'
import { FadeInSection } from '@/components/shared/FadeInSection'
import { Images, ArrowRight } from 'lucide-react'

function ProjectTile({
  project,
  onClick,
}: {
  project: ProjectItem
  onClick: () => void
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.button
      type="button"
      layout
      layoutId={`project-${project.id}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-sm text-left ${
        project.wide ? 'md:col-span-2' : ''
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          project.wide ? 'aspect-[4/5] sm:aspect-[16/10]' : 'aspect-[4/5]'
        }`}
      >
        <img
          src={project.coverImage}
          alt={`${project.title} — ${project.material}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`image-polish h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.04] ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 opacity-90 transition-opacity duration-700 md:opacity-75 md:group-hover:opacity-95" />
        <div className="absolute inset-0 border border-gold/0 transition-colors duration-700 group-hover:border-gold/50" />

        {/* Top Badges: Category & Photo count */}
        <div className="absolute left-3 top-3 right-3 flex items-center justify-between sm:left-4 sm:top-4 sm:right-4">
          <span className="rounded-xs border border-white/20 bg-black/40 px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] text-gold backdrop-blur-md">
            {project.category}
          </span>
          <span className="flex items-center gap-1 rounded-xs border border-white/15 bg-black/40 px-2 py-1 text-[10px] font-light text-white backdrop-blur-md">
            <Images size={12} className="text-gold" />
            <span>{project.images.length} Photos</span>
          </span>
        </div>

        {/* Bottom Details */}
        <div className="absolute inset-x-0 bottom-0 p-4 text-left transition-all duration-500 sm:p-6">
          <h3 className="font-display text-lg font-light text-white sm:text-xl md:text-2xl">
            {project.title}
          </h3>

          <p className="mt-1 text-[11px] font-light tracking-[0.06em] text-gold-light sm:text-xs">
            {project.material}
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-gold opacity-0 transition-opacity duration-500 md:group-hover:opacity-100">
            <span>View Project</span>
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.button>
  )
}

interface GalleryProps {
  hideHeader?: boolean
}

export function Gallery({ hideHeader = false }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  const filteredProjects = useMemo(
    () =>
      activeCategory === 'All'
        ? projects
        : projects.filter((item) => item.category === activeCategory),
    [activeCategory],
  )

  const handleNavigateProject = (direction: 'prev' | 'next') => {
    if (!selectedProject) return
    const idx = filteredProjects.findIndex((p) => p.id === selectedProject.id)
    const nextIdx =
      direction === 'prev'
        ? (idx - 1 + filteredProjects.length) % filteredProjects.length
        : (idx + 1) % filteredProjects.length
    setSelectedProject(filteredProjects[nextIdx]!)
  }

  return (
    <section id="gallery" className="section-pad bg-black">
      <div className="container-luxe">
        <div
          className={`mb-8 flex flex-col gap-6 sm:mb-12 sm:gap-8 md:mb-16 md:flex-row md:items-end ${
            hideHeader ? 'md:justify-end' : 'md:justify-between'
          }`}
        >
          {!hideHeader && (
            <FadeInSection>
              <div className="mb-4 flex items-center gap-4">
                <span className="h-px w-8 bg-gold sm:w-10" />
                <p className="text-xs uppercase tracking-[0.22em] text-gold">Portfolio</p>
              </div>
              <h2 className="font-display text-3xl font-light text-white sm:text-4xl md:text-6xl">
                Our Projects
              </h2>
            </FadeInSection>
          )}
          <FadeInSection delay={0.1} className="w-full md:w-auto">
            <GalleryFilter active={activeCategory} onChange={setActiveCategory} />
          </FadeInSection>
        </div>

        <motion.div
          layout
          className="grid grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectTile
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <GalleryLightbox
        project={selectedProject}
        projects={filteredProjects}
        onClose={() => setSelectedProject(null)}
        onNavigateProject={handleNavigateProject}
      />
    </section>
  )
}
