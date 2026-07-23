import type { ReactNode } from 'react'

interface CardProps {
  titolo: string
  children: ReactNode
  icona?: ReactNode
}

/** Card con bordo teal e accento verde in hover, ripresa dal manifesto. */
export default function Card({ titolo, children, icona }: CardProps) {
  return (
    <div className="rounded-2xl border-2 border-teal-medio/30 bg-bianco p-6 transition-colors hover:border-verde">
      {icona && (
        <div aria-hidden="true" className="mb-4 inline-flex rounded-xl bg-grigio-ch p-3 text-teal-scuro">
          {icona}
        </div>
      )}
      <h3 className="font-(family-name:--font-display) text-xl font-extrabold text-teal-scuro">
        {titolo}
      </h3>
      <p className="mt-2 text-grigio">{children}</p>
    </div>
  )
}
