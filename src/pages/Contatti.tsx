import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import SectionTag from '../components/SectionTag'
import SepLine from '../components/SepLine'
import { usePageMeta } from '../hooks/usePageMeta'
import { SITE } from '../content/site'
import { useI18n } from '../i18n'

export default function Contatti() {
  const { t } = useI18n()
  const c = t.contatti
  usePageMeta(c.metaTitle, c.metaDesc)

  const [searchParams] = useSearchParams()
  const oggettoIniziale =
    searchParams.get('oggetto') === 'iscrizione' ? t.form.oggetti[1] : undefined

  return (
    <>
      <section className="bg-grigio-ch">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionTag>{c.tag}</SectionTag>
          <h1 className="mt-2 text-4xl font-black text-teal-scuro">{c.titolo}</h1>
          <p className="mt-4 max-w-2xl text-lg text-grigio">{c.sottotitolo}</p>
        </div>
        <SepLine />
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-5">
        <section aria-labelledby="titolo-form" className="lg:col-span-3">
          <h2 id="titolo-form" className="text-2xl font-extrabold text-teal-scuro">
            {c.formTitolo}
          </h2>
          <div className="mt-6">
            <ContactForm oggettoIniziale={oggettoIniziale} />
          </div>
        </section>

        <section aria-labelledby="titolo-riferimenti" className="lg:col-span-2">
          <h2 id="titolo-riferimenti" className="text-2xl font-extrabold text-teal-scuro">
            {c.riferimentiTitolo}
          </h2>
          <address className="mt-6 space-y-5 not-italic">
            <p className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-verde" />
              <a
                href={`mailto:${SITE.email}`}
                className="break-all font-bold text-teal-scuro underline underline-offset-4 hover:decoration-verde"
              >
                {SITE.email}
              </a>
            </p>
            <p className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-verde" />
              <a
                href={SITE.phoneHref}
                className="font-bold text-teal-scuro underline underline-offset-4 hover:decoration-verde"
              >
                {SITE.phone}
              </a>
            </p>
            <p className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-verde" />
              <span className="text-grigio">{SITE.address}</span>
            </p>
          </address>

          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 block rounded-2xl border-2 border-teal-medio/30 bg-grigio-ch p-6 transition-colors hover:border-verde"
          >
            <span className="flex items-center gap-3 font-(family-name:--font-display) text-lg font-extrabold text-teal-scuro">
              <MapPin aria-hidden="true" className="h-6 w-6 text-verde" />
              {c.mappaTitolo}
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </span>
            <span className="mt-2 block text-grigio">
              {SITE.address} — {c.mappaTesto}
            </span>
          </a>

          <div className="mt-8 rounded-2xl bg-grigio-ch p-6 text-sm text-grigio">
            <h3 className="font-(family-name:--font-display) text-base font-extrabold text-teal-scuro">
              {c.datiTitolo}
            </h3>
            <p className="mt-2">
              {SITE.fullName}
              <br />
              {c.sedeLabel} {SITE.address}
              <br />
              {t.footer.codFisc} {SITE.codFisc}
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
