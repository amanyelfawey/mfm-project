import type { ProjectItem } from '@/types'
import { asset } from '@/lib/asset'

const rawProjects: ProjectItem[] = [
  {
    id: 'kitchen-island-waterfall',
    title: 'Kitchen Island & Waterfall Worktops',
    category: 'Kitchens',
    material: 'Calacatta Viola & Statuario Marble',
    coverImage: '/images/gallery/g20.webp',
    images: [
      '/images/gallery/g20.webp',
      '/images/gallery/g18.webp',
      '/images/gallery/g19.webp',
      '/images/gallery/g36.webp',
      '/images/gallery/g37.webp',
    ],
    description:
      'Custom fabricated Calacatta Viola kitchen island with 50mm mitred waterfall edges, integrated undermount sink, and matching worktop surfaces.',
    scope: [
      'Waterfall Island Design',
      'Continuous Vein Matching',
      'Undermount Sink Cutouts',
      'Protective Stone Sealing',
    ],
    wide: true,
  },
  {
    id: 'master-bathroom-wet-room',
    title: 'Master Bathroom & Wet Room',
    category: 'Bathrooms',
    material: 'Panda White Marble',
    coverImage: '/images/gallery/g04.webp',
    images: [
      '/images/gallery/g04.webp',
      '/images/gallery/g03.webp',
      '/images/gallery/g02.webp',
      '/images/gallery/g05.webp',
      '/images/gallery/g07.webp',
    ],
    description:
      'Full marble bathroom suite featuring book-matched Panda White wall slabs, a seamless wet room shower enclosure, and bespoke stone details.',
    scope: [
      'Book-Matched Wall Slabs',
      'Seamless Wet Room Floor',
      'Custom Stone Columns',
      'Full Waterproof Sealing',
    ],
    wide: true,
  },
  {
    id: 'book-matched-feature-wall',
    title: 'Book-Matched Feature Wall',
    category: 'Cladding',
    material: 'White Quartzite',
    coverImage: '/images/gallery/g26.webp',
    images: [
      '/images/gallery/g26.webp',
      '/images/gallery/g25.webp',
      '/images/gallery/g27.webp',
      '/images/gallery/g30.webp',
      '/images/gallery/g31.webp',
    ],
    description:
      'Large-format book-matched quartzite feature wall and custom fireplace surround with precision joint alignments and integrated floating bench.',
    scope: [
      'Book-Matched Slab Cladding',
      'Fireplace Surround & Hearth',
      'Cantilevered Floating Bench',
      'Precision Edge Mitring',
    ],
    wide: false,
  },
  {
    id: 'polished-marble-hallway',
    title: 'Polished Marble Hallway Floor',
    category: 'Flooring',
    material: 'Calacatta Viola & Crema Marfil',
    coverImage: '/images/gallery/g01.webp',
    images: [
      '/images/gallery/g01.webp',
      '/images/gallery/g28.webp',
      '/images/gallery/g29.webp',
      '/images/gallery/g35.webp',
    ],
    description:
      'Large-format polished marble flooring installed through main reception and hallway corridors with continuous vein flow and high-lustre finish.',
    scope: [
      'Large-Format Floor Laying',
      'Diamond Pad Level Polishing',
      'Anti-Fracture Underlay',
      'Sub-Floor Leveling',
    ],
    wide: true,
  },
  {
    id: 'contemporary-quartz-kitchen',
    title: 'Contemporary Quartz Kitchen',
    category: 'Kitchens',
    material: 'Engineered Quartz & Splashback',
    coverImage: '/images/gallery/g32.webp',
    images: [
      '/images/gallery/g32.webp',
      '/images/gallery/g33.webp',
      '/images/gallery/g21.webp',
    ],
    description:
      'Clean modern kitchen surfaces with precision quartz worktops, flush hob cutouts, and custom geometric splashback tiling.',
    scope: [
      'Quartz Worktop Fabrication',
      'Geometric Stone Splashback',
      'Flush Hob & Sink Cutouts',
      'Seamless Joint Finish',
    ],
    wide: false,
  },
  {
    id: 'chequerboard-entrance-hall',
    title: 'Chequerboard Entrance Hall',
    category: 'Flooring',
    material: 'Nero Marquina & Carrara Marble',
    coverImage: '/images/gallery/g13.webp',
    images: [
      '/images/gallery/g13.webp',
      '/images/gallery/g11.webp',
      '/images/gallery/g34.webp',
    ],
    description:
      'Classic black-and-white marble floor installation with diagonal chequerboard pattern and matching solid stone steps.',
    scope: [
      'Diagonal Pattern Tile Laying',
      'Solid Marble Step Treads',
      'Precision Border Inlay',
      'Satin Polish & Seal',
    ],
    wide: false,
  },
  {
    id: 'calacatta-viola-en-suite',
    title: 'Calacatta Viola En-Suite',
    category: 'Bathrooms',
    material: 'Calacatta Viola Marble',
    coverImage: '/images/gallery/g06.webp',
    images: [
      '/images/gallery/g06.webp',
      '/images/gallery/g14.webp',
      '/images/gallery/g22.webp',
      '/images/gallery/g23.webp',
      '/images/gallery/g24.webp',
    ],
    description:
      'Custom Calacatta Viola vanity top with undermount basin, matching recessed shower niches, and wall-to-floor marble tiles.',
    scope: [
      'Bespoke Vanity Countertop',
      'Recessed Stone Niches',
      'Matching Wall & Floor Tiles',
      'Stain-Resistant Sealing',
    ],
    wide: false,
  },
  {
    id: 'architectural-stone-cladding',
    title: 'Architectural Stone Cladding',
    category: 'Cladding',
    material: 'Natural Stone Panels',
    coverImage: '/images/gallery/g10.webp',
    images: [
      '/images/gallery/g10.webp',
      '/images/gallery/g08.webp',
      '/images/gallery/g12.webp',
      '/images/gallery/g15.webp',
      '/images/gallery/g16.webp',
      '/images/gallery/g17.webp',
    ],
    description:
      'Honed natural stone panels and precision mitred corner cladding for contemporary interior feature walls.',
    scope: [
      'Architectural Panel Fitting',
      'Mitred Corner Returns',
      'Shadow Gap Detailing',
      'Protective Surface Sealing',
    ],
    wide: false,
  },
]

export const projects: ProjectItem[] = rawProjects.map((p) => ({
  ...p,
  coverImage: asset(p.coverImage),
  images: p.images.map((img) => asset(img)),
}))
