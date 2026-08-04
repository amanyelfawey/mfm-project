# MFM Stone — Luxury Marble & Granite Portfolio

A premium multi-page portfolio website for a London-based marble, granite, and natural stone company. Built with React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, and React Router.

## Features

- Luxury black / white / gold / beige design system
- Multi-page routing: Home, About, Gallery, Testimonials, Contact
- Stone-first imagery curated from client photography (cropped + colour-graded)
- Materials gallery category (slab close-ups)
- Filterable project gallery with lightbox
- Testimonial carousel, contact form (React Hook Form + Zod)
- Mobile slide-in menu, grain overlay, optional custom cursor

## Routes

| Path | Page |
|------|------|
| `/` | Home (hero + section previews) |
| `/about` | Full about story + stats |
| `/gallery` | Full filterable gallery |
| `/testimonials` | Client stories carousel |
| `/contact` | Enquiry form + map |

## Getting Started

```bash
npm install
npm run images   # process src/assets into public/images
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Image pipeline

Raw photography lives in `src/assets/gallery` and `src/assets/marbles`.  
`npm run images` runs `scripts/process-images.mjs`, which:

1. Crops each shot to a focus box (keeps packaging/cables out of frame)
2. Colour-grades toward white / black / gold / beige
3. Exports `.webp` + `.jpg` into `public/images/`

Only the strongest stone-forward frames are selected — not every raw photo.

## Customise

- Brand & contact: `src/lib/constants.ts`
- Gallery items: `src/data/galleryItems.ts`
- Crop / grade jobs: `scripts/process-images.mjs`
