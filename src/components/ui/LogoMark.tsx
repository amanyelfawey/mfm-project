import logo from '@/assets/heroo/logo.png'

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="MFM Marble & Granite"
      className={`object-contain ${className}`}
      loading="eager"
      decoding="async"
    />
  )
}
