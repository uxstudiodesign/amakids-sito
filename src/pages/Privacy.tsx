import SectionTag from '../components/SectionTag'
import SepLine from '../components/SepLine'
import { usePageMeta } from '../hooks/usePageMeta'
import { SITE } from '../content/site'
import { useI18n } from '../i18n'

// NOTA REDAZIONALE: bozza di informativa da far validare prima del lancio,
// integrandola con l'informativa già redatta per la domanda di ammissione.

export default function Privacy() {
  const { t } = useI18n()
  const p = t.privacy
  usePageMeta(p.metaTitle, p.metaDesc)

  return (
    <>
      <section className="bg-grigio-ch">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionTag>{p.tag}</SectionTag>
          <h1 className="mt-2 text-4xl font-black text-teal-scuro">{p.titolo}</h1>
          <p className="mt-4 text-lg text-grigio">
            {p.contattoPre}{' '}
            <a
              href={`mailto:${SITE.email}`}
              className="font-bold text-teal-scuro underline underline-offset-2 hover:decoration-verde"
            >
              {SITE.email}
            </a>
            .
          </p>
        </div>
        <SepLine />
      </section>

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-16 text-grigio sm:px-6">
        {p.sezioni.map((sezione) => (
          <section key={sezione.titolo} aria-label={sezione.titolo}>
            <h2 className="text-2xl font-extrabold text-teal-scuro">{sezione.titolo}</h2>
            {sezione.paragrafi.map((paragrafo) => (
              <p key={paragrafo.slice(0, 40)} className="mt-3">
                {paragrafo}
              </p>
            ))}
          </section>
        ))}
      </div>
    </>
  )
}
