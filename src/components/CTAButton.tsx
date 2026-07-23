import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface CTAButtonProps {
  to: string
  variante?: 'primario' | 'secondario'
  children: ReactNode
}

const STILI = {
  primario:
    'bg-teal-scuro text-bianco hover:bg-teal-medio',
  secondario:
    'border-2 border-verde bg-bianco text-teal-scuro hover:bg-verde-chiaro/30',
} as const

export default function CTAButton({ to, variante = 'primario', children }: CTAButtonProps) {
  return (
    <Link
      to={to}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7 py-3 font-(family-name:--font-display) text-lg font-bold transition-colors ${STILI[variante]}`}
    >
      {children}
    </Link>
  )
}
