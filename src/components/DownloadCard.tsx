import { FileDown } from 'lucide-react'

interface DownloadCardProps {
  titolo: string
  descrizione: string
  href: string
  etichetta: string
}

/** Card per il download dei PDF (manifesto, domanda di ammissione). */
export default function DownloadCard({ titolo, descrizione, href, etichetta }: DownloadCardProps) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border-2 border-teal-medio/30 bg-grigio-ch p-6 sm:flex-row sm:items-center">
      <div aria-hidden="true" className="rounded-xl bg-bianco p-3 text-verde">
        <FileDown className="h-8 w-8" />
      </div>
      <div className="flex-1">
        <h3 className="font-(family-name:--font-display) text-xl font-extrabold text-teal-scuro">
          {titolo}
        </h3>
        <p className="mt-1 text-grigio">{descrizione}</p>
      </div>
      <a
        href={href}
        download
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-teal-scuro px-6 py-3 font-(family-name:--font-display) font-bold text-bianco transition-colors hover:bg-teal-medio"
      >
        <FileDown aria-hidden="true" className="h-5 w-5" />
        {etichetta}
      </a>
    </div>
  )
}
