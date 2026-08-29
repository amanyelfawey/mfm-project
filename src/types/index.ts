import type { GalleryCategory, ProjectType } from '@/lib/constants'

export interface NavLink {
  label: string
  href: string
  sectionId: string
}

export interface ProjectItem {
  id: string
  title: string
  category: Exclude<GalleryCategory, 'All'>
  material: string
  coverImage: string
  images: string[]
  description: string
  scope?: string[]
  wide?: boolean
}

export interface GalleryItem {
  id: string
  title: string
  material: string
  category: Exclude<GalleryCategory, 'All'>
  image: string
  wide?: boolean
}

export interface Testimonial {
  id: string
  name: string
  projectType: string
  quote: string
  rating: number
  image: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  projectType: ProjectType
}

export interface StatItem {
  value: number
  suffix: string
  label: string
}
