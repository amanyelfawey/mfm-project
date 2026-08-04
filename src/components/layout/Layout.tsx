import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTopButton } from '@/components/shared/ScrollToTopButton'
import { GrainOverlay } from '@/components/shared/GrainOverlay'
import { CustomCursor } from '@/components/shared/CustomCursor'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export function Layout() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <CustomCursor />
      <GrainOverlay />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </MotionConfig>
  )
}
