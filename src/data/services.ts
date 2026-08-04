export interface ServiceItem {
  id: string
  number: string
  title: string
  subtitle: string
  image: string
  description: string
}

export const services: ServiceItem[] = [
  {
    id: 'supply',
    number: '01',
    title: 'Premium Slab Supply',
    subtitle: 'SOURCING',
    image: '/images/gallery/material-statuario.webp',
    description: 'Hand-selected marble and granite slabs from trusted quarries.',
  },
  {
    id: 'fabrication',
    number: '02',
    title: 'Precision Fabrication',
    subtitle: 'CRAFTING',
    image: '/images/gallery/kitchen-waterfall-island.webp',
    description: 'CNC cutting, polishing, and edge profiles finished to millimetre accuracy.',
  },
  {
    id: 'installation',
    number: '03',
    title: 'Expert Installation',
    subtitle: 'FINISHING',
    image: '/images/gallery/bathroom-panda-gold.webp',
    description: 'Book-matched cladding, islands, and floors installed on site.',
  },
]
