import CTAButton from '../components/CTAButton'
import QuoteBlock from '../components/QuoteBlock'
import SectionTag from '../components/SectionTag'
import SepLine from '../components/SepLine'
import { usePageMeta } from '../hooks/usePageMeta'
import { ROUTES } from '../content/site'
import { useI18n } from '../i18n'

export default function ChiSiamo() {
  const { t, path } = useI18n()
  usePageMeta(t.chiSiamo.metaTitle, t.chiSiamo.metaDesc)

  return (
    <>
      <section className="bg-grigio-ch">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionTag>{t.chiSiamo.tag}</SectionTag>
          <h1 className="mt-2 text-4xl font-black text-teal-scuro">{t.chiSiamo.titolo}</h1>
        </div>
        <SepLine />
      </section>

      <section aria-labelledby="titolo-idea" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 id="titolo-idea" className="text-3xl font-extrabold text-teal-scuro">
          {t.chiSiamo.ideaTitolo}
        </h2>
        <div className="mt-6 space-y-5 text-lg text-grigio">
          {t.chiSiamo.storia.map((paragrafo) => (
            <p key={paragrafo.slice(0, 40)}>{paragrafo}</p>
          ))}
        </div>
        <div className="mt-10">
          <QuoteBlock>{t.chiSiamo.miracoli}</QuoteBlock>
        </div>
      </section>

      <section aria-labelledby="titolo-cosa" className="bg-grigio-ch py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 id="titolo-cosa" className="text-3xl font-extrabold text-teal-scuro">
            {t.chiSiamo.cosaTitolo}
          </h2>
          <div className="mt-6 space-y-5 text-lg text-grigio">
            {t.chiSiamo.missione.map((paragrafo) => (
              <p key={paragrafo.slice(0, 40)}>{paragrafo}</p>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="titolo-neuro" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 id="titolo-neuro" className="text-3xl font-extrabold text-teal-scuro">
          {t.chiSiamo.neuroTitolo}
        </h2>
        <div className="mt-6 space-y-5 text-lg text-grigio">
          {t.chiSiamo.neuro.map((paragrafo) => (
            <p key={paragrafo.slice(0, 40)}>{paragrafo}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <CTAButton to={path(ROUTES.manifesto)}>{t.chiSiamo.ctaManifesto}</CTAButton>
          <CTAButton to={path(ROUTES.contatti)} variante="secondario">
            {t.chiSiamo.ctaContatti}
          </CTAButton>
        </div>
      </section>
    </>
  )
}
