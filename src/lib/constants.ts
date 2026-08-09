export const BRAND = {
  name: 'MFM Marble & Granite',
  tagline: 'Marble & Granite Crafted for Legacy',
  description:
    'From luxury residences to landmark commercial projects, we deliver premium marble and granite solutions with uncompromising quality, precision, and craftsmanship.',
  shortTagline: "London's finest marble and granite specialists since 2004.",
} as const

export const CONTACT = {
  email: 'hello@mfmstone.co.uk',
  phone: '+44 20 7946 0958',
  phoneDisplay: '+44 20 7946 0958',
  address: '14 Clerkenwell Green, London EC1R 0DP',
  hours: 'Mon–Fri: 9:00 – 18:00',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Clerkenwell+Green+London&t=&z=15&ie=UTF8&iwloc=&output=embed',
} as const

export const SOCIAL = {
  instagram: 'https://instagram.com',
  pinterest: 'https://pinterest.com',
  linkedin: 'https://linkedin.com',
} as const

export const STATS = [
  { value: 6, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 100, suffix: '%', label: 'Natural Stone' },
] as const

export const PROJECT_TYPES = [
  'Kitchen',
  'Bathroom',
  'Flooring',
  'Commercial',
  'Cladding',
  'Other',
] as const

export const GALLERY_CATEGORIES = [
  'All',
  'Materials',
  'Kitchens',
  'Bathrooms',
  'Cladding',
  'Flooring',
] as const

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number]
export type ProjectType = (typeof PROJECT_TYPES)[number]
