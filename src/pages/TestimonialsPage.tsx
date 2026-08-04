import { PageHero } from '@/components/ui/PageHero'
import { Testimonials } from '@/components/sections/Testimonials'

export function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Testimonial"
        title="What Our Clients Say"
        description="Architects, designers, and homeowners on working with MFM Marble & Granite."
        image="/images/textures/marble-cream.webp"
      />
      <Testimonials hideHeader />
    </>
  )
}
