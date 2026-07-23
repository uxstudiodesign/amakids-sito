interface SectionTagProps {
  children: string
}

/** Etichetta uppercase che introduce una sezione. */
export default function SectionTag({ children }: SectionTagProps) {
  return (
    <p className="font-(family-name:--font-display) text-sm font-extrabold uppercase tracking-[0.2em] text-teal-scuro">
      {children}
    </p>
  )
}
