import { asset } from '@/lib/asset'

export interface ServiceItem {
  id: string
  number: string
  title: string
  subtitle: string
  image: string
  description: string
}

const items: ServiceItem[] = [
  {
    id: 'supply',
    number: '01',
    title: 'Premium Slab Supply',
    subtitle: 'SOURCING',
    image: '/images/marbles/9.webp',
    description: 'Hand-selected marble and granite slabs from trusted quarries.',
  },
  {
    id: 'fabrication',
    number: '02',
    title: 'Precision Fabrication',
    subtitle: 'CRAFTING',
    image: '/images/gallery/g37.webp',
    description: 'CNC cutting, polishing, and edge profiles finished to millimetre accuracy.',
  },
  {
    id: 'installation',
    number: '03',
    title: 'Expert Installation',
    subtitle: 'FINISHING',
    image: '/images/gallery/g04.webp',
    description: 'Book-matched cladding, islands, and floors installed on site.',
  },
]

export const services: ServiceItem[] = items.map((item) => ({
  ...item,
  image: asset(item.image),
}))
