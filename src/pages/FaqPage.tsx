import { PageHero } from '@/components/ui/PageHero'
import { Faq } from '@/components/sections/Faq'

export function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Common Queries"
        title="Frequently Asked Questions"
        description="Everything you need to know about marble care, durability, timelines, and our bespoke installation process."
        image="/images/marbles/9.webp"
      />
      <Faq hideHeader />
    </>
  )
}
