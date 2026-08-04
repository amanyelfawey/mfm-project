import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { Faq } from '@/components/sections/Faq'
import { Testimonials } from '@/components/sections/Testimonials'
import { ContactPreview } from '@/components/sections/ContactPreview'

export function HomePage() {
  return (
    <>
      <Hero />
      <About compact />
      <Services />
      <GalleryPreview />
      <Faq />
      <Testimonials showViewMore />
      <ContactPreview />
    </>
  )
}
