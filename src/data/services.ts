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
    title: 'Marble & Granite Supply',
    subtitle: 'SOURCING',
    image: '/images/marbles/1.webp',
    description: 'Sourcing the finest natural stones from around the world.',
  },
  {
    id: 'fabrication',
    number: '02',
    title: 'Custom Fabrication',
    subtitle: 'CRAFTING',
    image: '/images/gallery/g37.webp',
    description: 'Precision cutting and finishing to fit your unique design needs.',
  },
  {
    id: 'installation',
    number: '03',
    title: 'Installation & Fitting',
    subtitle: 'FITTING',
    image: '/images/gallery/g04.webp',
    description: 'Expert craftsmanship for flawless installation in homes and businesses.',
  },
  {
    id: 'worktops',
    number: '04',
    title: 'Worktops & Countertops',
    subtitle: 'SURFACES',
    image: '/images/gallery/g01.webp',
    description:
      'High-quality kitchen, bathroom, and commercial countertops tailored to perfection.',
  },
  {
    id: 'cladding',
    number: '05',
    title: 'Stone Cladding & Flooring',
    subtitle: 'WALLS & FLOORS',
    image: '/images/gallery/g20.webp',
    description: 'Elegant and durable stone solutions for walls and floors.',
  },
  {
    id: 'restoration',
    number: '06',
    title: 'Restoration & Maintenance',
    subtitle: 'CARE',
    image: '/images/marbles/5.webp',
    description:
      'Professional cleaning, polishing, and repair to keep your stone surfaces pristine.',
  },
]

export const services: ServiceItem[] = items.map((item) => ({
  ...item,
  image: asset(item.image),
}))
