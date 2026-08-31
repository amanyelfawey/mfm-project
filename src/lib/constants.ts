export const BRAND = {
  name: 'MFM Marble & Granite',
  tagline: 'Marble & Granite Crafted for Legacy',
  description:
    'From luxury residences to landmark commercial projects, we deliver premium marble and granite solutions with uncompromising quality, precision, and craftsmanship.',
  shortTagline: "London's finest marble and granite specialists with over 7 years of luxury bespoke craftsmanship.",
} as const

export const CONTACT = {
  email: 'info@mfm-marble.uk',
  phone: '+44 7459 123331',
  phoneDisplay: '+44 7459 123331',
  phone2: '02070974818',
  phone2Display: '020 7097 4818',
  address: '1000 Great West Rd, London TW8 9DW',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=1000+Great+West+Rd+London+TW8+9DW&t=&z=15&ie=UTF8&iwloc=&output=embed',
} as const

export const SOCIAL = {
  instagram: 'https://instagram.com',
} as const

export const STATS = [
  { value: 7, suffix: '+', label: 'Years Experience' },
  { value: 350, suffix: '+', label: 'Projects Completed' },
  { value: 99, suffix: '%', label: 'Client Satisfaction' },
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
  'Kitchens',
  'Bathrooms',
  'Flooring',
  'Cladding',
] as const

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number]
export type ProjectType = (typeof PROJECT_TYPES)[number]
