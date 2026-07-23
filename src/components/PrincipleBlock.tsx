interface PrincipleBlockProps {
  etichetta: string
  numero: string
  titolo: string
  testo: string
}

/** Blocco numerato con bordo sinistro, per i principi del manifesto. */
export default function PrincipleBlock({ etichetta, numero, titolo, testo }: PrincipleBlockProps) {
  return (
    <article className="border-l-4 border-verde pl-6">
      <p
        aria-hidden="true"
        className="font-(family-name:--font-display) text-sm font-extrabold uppercase tracking-widest text-grigio"
      >
        {etichetta} {numero}
      </p>
      <h3 className="mt-1 font-(family-name:--font-display) text-2xl font-extrabold text-teal-scuro">
        <span className="sr-only">
          {etichetta} {numero}:{' '}
        </span>
        {titolo}
      </h3>
      <p className="mt-2 max-w-2xl text-grigio">{testo}</p>
    </article>
  )
}
