import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'gold' | 'dark' | 'outline'

interface ButtonProps {
  children: ReactNode
  href?: string
  to?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  disabled?: boolean
  variant?: Variant
}

const variantClass: Record<Variant, string> = {
  gold: 'btn-gold',
  dark: 'btn-dark',
  outline: 'btn-outline',
}

export function Button({
  children,
  href,
  to,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  variant = 'gold',
}: ButtonProps) {
  const classes = `${variantClass[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  )
}
