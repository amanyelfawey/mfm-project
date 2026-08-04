export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    id: 'durable',
    question: 'Is marble durable?',
    answer:
      'Yes. When properly sealed and maintained, natural marble delivers decades of beauty in kitchens, bathrooms, and commercial spaces. We specify the right stone grade for each use.',
  },
  {
    id: 'clean',
    question: 'What is the best way to clean marble?',
    answer:
      'Use a pH-neutral stone cleaner and a soft cloth. Avoid acidic products such as vinegar or lemon, which can etch the surface. We provide a care guide with every installation.',
  },
  {
    id: 'stains',
    question: 'How can I prevent stains on my marble surface?',
    answer:
      'Wipe spills promptly, use coasters and trivets, and ensure the stone is professionally sealed. Regular resealing protects against etching and staining.',
  },
  {
    id: 'repair',
    question: 'Can marble be repaired if it is damaged?',
    answer:
      'Most chips, scratches, and light etching can be polished or filled by a specialist. We offer aftercare and restoration for projects we have installed.',
  },
  {
    id: 'lead-time',
    question: 'How long does a typical project take?',
    answer:
      'Lead times vary by stone availability and complexity. Most residential kitchen or bathroom projects run from selection to install within 3–6 weeks.',
  },
]
