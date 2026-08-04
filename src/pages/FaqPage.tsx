import { PageHero } from '@/components/ui/PageHero'
import { Faq } from '@/components/sections/Faq'

export function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Common Queries"
        title="Asked Questions?"
        description="Everything you need to know about marble care, durability, timelines, and our process."
        image="/images/textures/marble-white.webp"
      />
      <Faq hideHeader />
    </>
  )
}
