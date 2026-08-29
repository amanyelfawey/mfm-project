export interface ServiceItem {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
}

export const services: ServiceItem[] = [
  {
    id: 'kitchens',
    number: '01',
    title: 'Kitchen Worktops & Islands',
    subtitle: 'Kitchen Surfaces',
    description:
      'Custom fabrication and fitting of marble, granite, and quartz worktops, waterfall islands, and matching splashbacks.',
  },
  {
    id: 'bathrooms',
    number: '02',
    title: 'Bathrooms & Wet Rooms',
    subtitle: 'Bathroom Spaces',
    description:
      'Bespoke marble vanity countertops, floor-to-ceiling shower cladding, wet rooms, and custom bath surrounds.',
  },
  {
    id: 'flooring',
    number: '03',
    title: 'Flooring & Staircases',
    subtitle: 'Floors & Steps',
    description:
      'Precision installation of large-format marble flooring, entrance halls, pattern layouts, and solid stone stairs.',
  },
  {
    id: 'cladding',
    number: '04',
    title: 'Feature Walls & Fireplaces',
    subtitle: 'Wall Cladding',
    description:
      'Book-matched stone feature walls, fireplace surrounds, and interior architectural cladding.',
  },
  {
    id: 'fabrication',
    number: '05',
    title: 'Bespoke Fabrication',
    subtitle: 'Cutting & Finishing',
    description:
      'Accurate laser templating, CNC precision cutting, polished edge profiling, and expert on-site installation.',
  },
  {
    id: 'care',
    number: '06',
    title: 'Restoration & Sealing',
    subtitle: 'Care & Maintenance',
    description:
      'Specialist polishing, deep cleaning, scratch repair, and protective sealing for all natural stone surfaces.',
  },
]
