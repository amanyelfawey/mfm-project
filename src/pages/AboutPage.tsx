import { PageHero } from '@/components/ui/PageHero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import aboutHeroImg from '@/assets/aboutus/2.jpg'

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Crafted in Stone"
        description="Two decades of sourcing, cutting, and installing the finest marble and granite."
        image={aboutHeroImg}
      />
      <About hideHeading />
      <Services showCta={false} />
    </>
  )
}
