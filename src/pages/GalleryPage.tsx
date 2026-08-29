import { PageHero } from '@/components/ui/PageHero'
import { Gallery } from '@/components/sections/Gallery'

export function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Project Portfolio"
        title="Featured Stone Works"
        description="A curated portfolio of bespoke marble kitchens, luxury bathroom suites, book-matched cladding, and expansive flooring projects delivered across London."
        image="/images/marbles/9.webp"
      />
      <Gallery hideHeader />
    </>
  )
}
