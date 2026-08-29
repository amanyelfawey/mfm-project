import { Link } from 'react-router-dom'
import { ArrowRight, Images } from 'lucide-react'
import { projects } from '@/data/projects'
import { FadeInSection } from '@/components/shared/FadeInSection'

// 6 Signature showcase projects for Home page preview
const featuredProjects = projects.slice(0, 6)

export function GalleryPreview() {
  return (
    <section className="section-pad bg-charcoal">
      <div className="container-luxe">
        <div className="mb-8 flex flex-col gap-5 sm:mb-12 sm:gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <FadeInSection direction="down">
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-8 bg-gold sm:w-10" />
              <p className="text-xs uppercase tracking-[0.22em] text-gold">Portfolio</p>
            </div>
            <h2 className="font-display text-3xl font-light text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Recent Projects
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.1} direction="left">
            <Link to="/gallery" className="btn-gold w-full sm:w-auto">
              View All Projects
              <ArrowRight size={14} />
            </Link>
          </FadeInSection>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <FadeInSection key={project.id} delay={(index % 3) * 0.08} direction="up" scale blur>
              <Link
                to="/gallery"
                className="group relative block aspect-[4/5] overflow-hidden rounded-sm border border-white/5 transition-all duration-500 hover:border-gold/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                <img
                  src={project.coverImage}
                  alt={`${project.title} — ${project.material}`}
                  loading="lazy"
                  className="image-polish h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  style={{ transitionTimingFunction: 'var(--ease-luxe)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10 opacity-85 transition-opacity duration-500 group-hover:opacity-95" />

                {/* Top Badges */}
                <div className="absolute left-3 top-3 right-3 flex items-center justify-between sm:left-4 sm:top-4 sm:right-4">
                  <span className="rounded-xs border border-white/20 bg-black/40 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-gold backdrop-blur-md">
                    {project.category}
                  </span>
                  <span className="flex items-center gap-1 rounded-xs border border-white/15 bg-black/40 px-2.5 py-1 text-[9px] font-light text-white backdrop-blur-md">
                    <Images size={11} className="text-gold" />
                    <span>{project.images.length} Photos</span>
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <h3 className="font-display text-xl font-light text-white sm:text-2xl transition-colors group-hover:text-gold-light">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-gold-light/90 sm:text-xs">
                    {project.material}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-gold opacity-0 transition-all duration-300 transform translate-y-1 group-hover:opacity-100 group-hover:translate-y-0">
                    <span>View Project</span>
                    <ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  )
}
