import { FadeInSection } from '@/components/shared/FadeInSection'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const textColor = light ? 'text-black' : 'text-white'
  const descColor = light ? 'text-gray' : 'text-gray'

  return (
    <FadeInSection className={`max-w-2xl ${alignClass}`}>
      <p className="eyebrow mb-6">{eyebrow}</p>
      <h2 className={`text-4xl md:text-6xl font-display font-light ${textColor} mb-6`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg font-light leading-relaxed ${descColor}`}>{description}</p>
      )}
    </FadeInSection>
  )
}
