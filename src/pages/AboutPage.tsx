import { PageHero } from '@/components/ui/PageHero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Crafted in Stone"
        description="Two decades of sourcing, cutting, and installing the finest marble and granite across London."
        image="/images/textures/marble-beige.webp"
      />
      <About hideHeading />
      <Services showCta={false} />
    </>
  )
}
