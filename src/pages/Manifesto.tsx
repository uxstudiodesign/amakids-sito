import { ArrowRight, Minus } from 'lucide-react'
import DownloadCard from '../components/DownloadCard'
import PrincipleBlock from '../components/PrincipleBlock'
import QuoteBlock from '../components/QuoteBlock'
import SectionTag from '../components/SectionTag'
import SepLine from '../components/SepLine'
import { usePageMeta } from '../hooks/usePageMeta'
import { PDF_FILES } from '../content/site'
import { useI18n } from '../i18n'

export default function Manifesto() {
  const { t } = useI18n()
  const m = t.manifesto
  usePageMeta(m.metaTitle, m.metaDesc)

  return (
    <>
      <section className="bg-grigio-ch">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionTag>{m.tag}</SectionTag>
          <h1 className="mt-2 text-4xl font-black text-teal-scuro">
            {m.titoloPre}
            <em className="text-teal-medio">{m.titoloEm}</em>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-grigio">{m.intro}</p>
        </div>
        <SepLine />
      </section>

      {/* Chi siamo — Il bambino al centro */}
      <section aria-labelledby="titolo-centro" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <SectionTag>{m.chiSiamoTag}</SectionTag>
        <h2 id="titolo-centro" className="mt-2 text-3xl font-extrabold text-teal-scuro">
          {m.centroTitolo}
        </h2>
        <div className="mt-6 space-y-5 text-lg text-grigio">
          {m.centro.map((paragrafo) => (
            <p key={paragrafo.slice(0, 40)}>{paragrafo}</p>
          ))}
        </div>
        <blockquote className="mt-8 rounded-2xl bg-grigio-ch p-8">
          <p className="font-(family-name:--font-display) text-xl font-bold leading-relaxed text-teal-scuro">
            {m.citazioneAlleanza}
          </p>
        </blockquote>
      </section>

      {/* Il nostro approccio — Cinque principi operativi */}
      <section aria-labelledby="titolo-principi" className="bg-grigio-ch py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTag>{m.approccioTag}</SectionTag>
          <h2 id="titolo-principi" className="mt-2 text-3xl font-extrabold text-teal-scuro">
            {m.principiTitolo}
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {m.principi.map((principio) => (
              <PrincipleBlock
                key={principio.numero}
                etichetta={m.principioLabel}
                numero={principio.numero}
                titolo={principio.titolo}
                testo={principio.testo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Il bisogno a cui rispondiamo */}
      <section aria-labelledby="titolo-bisogno" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <SectionTag>{m.bisognoTag}</SectionTag>
        <h2 id="titolo-bisogno" className="mt-2 text-3xl font-extrabold text-teal-scuro">
          {m.bisognoTitolo}
        </h2>
        <p className="mt-4 text-lg text-grigio">{m.ostacoliIntro}</p>
        <ul className="mt-6 divide-y divide-teal-medio/20">
          {m.ostacoli.map((ostacolo) => (
            <li key={ostacolo.slice(0, 40)} className="flex items-start gap-3 py-4">
              <Minus aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-verde" />
              <p className="text-lg text-grigio">{ostacolo}</p>
            </li>
          ))}
        </ul>
        <blockquote className="mt-8 rounded-2xl bg-teal-scuro p-8">
          <p className="font-(family-name:--font-display) text-xl font-bold leading-relaxed text-bianco">
            {m.citazioneRischio}
          </p>
        </blockquote>
      </section>

      {/* La nostra funzione — Un ponte */}
      <section aria-labelledby="titolo-ponte" className="bg-grigio-ch py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTag>{m.funzioneTag}</SectionTag>
          <h2 id="titolo-ponte" className="mt-2 text-3xl font-extrabold text-teal-scuro">
            {m.ponteTitolo}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-grigio">{m.ponteIntro}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {m.attori.map((attore, indice) => (
              <li
                key={attore}
                className={`rounded-xl border-t-4 bg-bianco p-5 font-(family-name:--font-display) font-bold text-teal-scuro ${
                  indice % 2 === 0 ? 'border-teal-medio' : 'border-verde'
                }`}
              >
                {attore}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-lg text-grigio">{m.ponteTesto}</p>

          <h3 className="mt-12 text-2xl font-extrabold text-teal-scuro">{m.obiettiviTitolo}</h3>
          <ul className="mt-6 grid gap-x-10 md:grid-cols-2">
            {m.obiettivi.map((obiettivo) => (
              <li
                key={obiettivo.slice(0, 40)}
                className="flex items-start gap-3 border-b border-teal-medio/20 py-4"
              >
                <ArrowRight aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-verde" />
                <p className="text-grigio">{obiettivo}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Download */}
      <section aria-labelledby="titolo-download" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 id="titolo-download" className="sr-only">
          {m.downloadHeading}
        </h2>
        <QuoteBlock>{m.claimFinale}</QuoteBlock>
        <div className="mt-12">
          <DownloadCard
            titolo={m.downloadTitolo}
            descrizione={m.downloadDesc}
            href={PDF_FILES.manifesto}
            etichetta={m.downloadEtichetta}
          />
        </div>
      </section>
    </>
  )
}
