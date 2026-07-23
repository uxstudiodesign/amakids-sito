interface QuoteBlockProps {
  children: string
  fonte?: string
}

/** Citazione con evidenziazione verde. */
export default function QuoteBlock({ children, fonte }: QuoteBlockProps) {
  return (
    <figure className="mx-auto max-w-3xl px-4 text-center">
      <blockquote>
        <p className="font-(family-name:--font-display) text-2xl font-extrabold leading-snug text-teal-scuro sm:text-3xl">
          <span className="box-decoration-clone bg-verde-chiaro/40 px-2">«{children}»</span>
        </p>
      </blockquote>
      {fonte && <figcaption className="mt-4 text-grigio">— {fonte}</figcaption>}
    </figure>
  )
}
