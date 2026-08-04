import { PageHero } from '@/components/ui/PageHero'
import { Gallery } from '@/components/sections/Gallery'

export function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Collection"
        title="Selected Works"
        description="A curated edit of marble slabs, kitchen islands, bathroom suites, cladding, and flooring — stone first, always."
        image="/images/textures/marble-white.webp"
      />
      <Gallery hideHeader />
    </>
  )
}
