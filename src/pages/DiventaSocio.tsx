import { ClipboardCheck, FileDown, Send } from 'lucide-react'
import CTAButton from '../components/CTAButton'
import DownloadCard from '../components/DownloadCard'
import SectionTag from '../components/SectionTag'
import SepLine from '../components/SepLine'
import { usePageMeta } from '../hooks/usePageMeta'
import { MEMBERSHIP_PAYMENT, PDF_FILES, ROUTES } from '../content/site'
import { useI18n } from '../i18n'

const ICONE_STEP = [FileDown, Send, ClipboardCheck]

export default function DiventaSocio() {
  const { t, path } = useI18n()
  const s = t.socio
  usePageMeta(s.metaTitle, s.metaDesc)

  return (
    <>
      <section className="bg-grigio-ch">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionTag>{s.tag}</SectionTag>
          <h1 className="mt-2 text-4xl font-black text-teal-scuro">{s.titolo}</h1>
        </div>
        <SepLine />
      </section>

      <section aria-labelledby="titolo-perche" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 id="titolo-perche" className="text-3xl font-extrabold text-teal-scuro">
          {s.percheTitolo}
        </h2>
        <div className="mt-6 space-y-5 text-lg text-grigio">
          {s.perche.map((paragrafo) => (
            <p key={paragrafo.slice(0, 40)}>{paragrafo}</p>
          ))}
        </div>
      </section>

      <section aria-labelledby="titolo-come" className="bg-grigio-ch py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="titolo-come" className="text-3xl font-extrabold text-teal-scuro">
            {s.comeTitolo}
          </h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {s.step.map((step, indice) => {
              const Icona = ICONE_STEP[indice] ?? FileDown
              return (
                <li
                  key={step.titolo}
                  className="rounded-2xl border-2 border-teal-medio/30 bg-bianco p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-scuro font-(family-name:--font-display) text-xl font-black text-bianco">
                      {indice + 1}
                    </span>
                    <Icona aria-hidden="true" className="h-7 w-7 text-verde" />
                  </div>
                  <h3 className="mt-4 font-(family-name:--font-display) text-xl font-extrabold text-teal-scuro">
                    {step.titolo}
                  </h3>
                  <p className="mt-2 text-grigio">{step.testo}</p>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section aria-labelledby="titolo-modulo" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 id="titolo-modulo" className="sr-only">
          {s.moduloHeading}
        </h2>
        <div className="space-y-6">
          <DownloadCard
            titolo={s.statutoTitolo}
            descrizione={s.statutoDesc}
            href={PDF_FILES.statuto}
            etichetta={s.statutoEtichetta}
          />
          <DownloadCard
            titolo={s.moduloTitolo}
            descrizione={s.moduloDesc}
            href={PDF_FILES.domandaAmmissione}
            etichetta={s.moduloEtichetta}
          />
        </div>
        <p className="mt-8 rounded-xl bg-grigio-ch p-5 text-grigio">
          <strong className="text-teal-scuro">{s.quotaLabel}</strong> {s.quota}
        </p>
        <div className="mt-6 rounded-xl border border-teal-medio/30 p-5 text-grigio">
          <h3 className="text-xl font-extrabold text-teal-scuro">{s.pagamentoTitolo}</h3>
          <dl className="mt-4 space-y-3">
            <div><dt className="font-bold">{s.intestatarioLabel}</dt><dd>{MEMBERSHIP_PAYMENT.accountHolder}</dd></div>
            <div><dt className="font-bold">IBAN</dt><dd className="break-all font-mono">{MEMBERSHIP_PAYMENT.iban}</dd></div>
            <div><dt className="font-bold">BIC/SWIFT</dt><dd className="font-mono">{MEMBERSHIP_PAYMENT.bic}</dd></div>
            <div><dt className="font-bold">{s.causaleLabel}</dt><dd>{MEMBERSHIP_PAYMENT.reference}</dd></div>
          </dl>
          <p className="mt-4">{s.ricevuta}</p>
        </div>
        <div className="mt-8">
          <CTAButton to={`${path(ROUTES.contatti)}?oggetto=iscrizione`}>{s.cta}</CTAButton>
        </div>
      </section>
    </>
  )
}
