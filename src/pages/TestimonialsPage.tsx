import { PageHero } from '@/components/ui/PageHero'
import { Testimonials } from '@/components/sections/Testimonials'

export function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client Testimonials"
        title="What Our Clients Say"
        description="Architects, designers, and homeowners on working with MFM Marble & Granite across London."
        image="/images/marbles/7.webp"
      />
      <Testimonials hideHeader />
    </>
  )
}
