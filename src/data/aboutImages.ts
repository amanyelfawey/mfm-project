import a1 from '@/assets/aboutus/1.jpg'
import a2 from '@/assets/aboutus/2.jpg'
import a3 from '@/assets/aboutus/3.jpg'
import a4 from '@/assets/aboutus/4.jpg'
import a5 from '@/assets/aboutus/5.jpg'
import a6 from '@/assets/aboutus/6.jpg'

export interface AboutImage {
  id: string
  name: string
  origin: string
  finish: string
  image: string
  description: string
}

export const aboutImages: AboutImage[] = [
  {
    id: 'verde-alpi',
    name: 'Verde Alpi',
    origin: 'Valle d’Aosta, Italy',
    finish: 'Polished',
    image: a1,
    description:
      'Sage and pewter greens folded into dark diagonal currents — a statement stone for islands and feature walls.',
  },
  {
    id: 'emperador-gold',
    name: 'Emperador Gold',
    origin: 'Murcia, Spain',
    finish: 'Polished',
    image: a2,
    description:
      'Warm bronze and taupe layers cut by a single amber seam. Book-matches into striking mirrored panels.',
  },
  {
    id: 'grigio-perla',
    name: 'Grigio Perla',
    origin: 'Tuscany, Italy',
    finish: 'Honed',
    image: a3,
    description:
      'A soft greige field with cloud-like movement — the quiet choice for large, uninterrupted surfaces.',
  },
  {
    id: 'nero-marquina',
    name: 'Nero Marquina',
    origin: 'Basque Country, Spain',
    finish: 'Polished',
    image: a4,
    description:
      'Deep ink black threaded with fine white crystal. Unmatched for vanities, splashbacks and inlay detail.',
  },
  {
    id: 'portoro-oro',
    name: 'Portoro Oro',
    origin: 'Liguria, Italy',
    finish: 'Brushed',
    image: a5,
    description:
      'An espresso ground webbed with gold and ivory veining — the most dramatic slab in the collection.',
  },
  {
    id: 'pulpis-beige',
    name: 'Pulpis Beige',
    origin: 'Castellón, Spain',
    finish: 'Honed',
    image: a6,
    description:
      'Warm sand tones with delicate crossing veins. A forgiving, timeless base for kitchens and floors.',
  },
]
