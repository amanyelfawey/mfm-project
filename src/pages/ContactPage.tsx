import { PageHero } from '@/components/ui/PageHero'
import { Contact } from '@/components/sections/Contact'

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Begin Your Project"
        description="Tell us about your kitchen, bathroom, or commercial space — we will source the right stone."
        image="/images/textures/marble-carrara.webp"
      />
      <Contact hideHeader />
    </>
  )
}
