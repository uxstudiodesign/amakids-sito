import { BookOpen, HandHeart, Heart, Mail, Users, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import CTAButton from '../components/CTAButton'
import QuoteBlock from '../components/QuoteBlock'
import SectionTag from '../components/SectionTag'
import SepLine from '../components/SepLine'
import { usePageMeta } from '../hooks/usePageMeta'
import { ROUTES } from '../content/site'
import { useI18n } from '../i18n'

const ICONE = [Heart, BookOpen, Users, Wrench]

export default function Home() {
  const { t, path } = useI18n()
  usePageMeta(t.home.metaTitle, t.home.metaDesc)

  return (
    <>
      {/* Hero */}
      <section className="bg-grigio-ch">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-24">
          <img
            src="/images/amakids-logo.jpeg"
            alt={t.home.logoAlt}
            className="h-28 w-28 rounded-full object-cover shadow-lg"
            width="112"
            height="112"
          />
          <h1 className="max-w-3xl text-4xl font-black text-teal-scuro sm:text-5xl">
            {t.home.heroClaim}
          </h1>
          <p className="max-w-2xl text-lg text-grigio">{t.home.heroSottotitolo}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <CTAButton to={path(ROUTES.contatti)}>{t.home.ctaContatti}</CTAButton>
            <CTAButton to={path(ROUTES.manifesto)} variante="secondario">
              {t.home.ctaManifesto}
            </CTAButton>
          </div>
        </div>
        <SepLine />
      </section>

      {/* Missione in sintesi */}
      <section aria-labelledby="titolo-missione" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionTag>{t.home.missioneTag}</SectionTag>
        <h2 id="titolo-missione" className="mt-2 text-3xl font-extrabold text-teal-scuro">
          {t.home.missioneTitolo}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.cards.map((card, indice) => {
            const Icona = ICONE[indice] ?? Heart
            return (
              <Card key={card.titolo} titolo={card.titolo} icona={<Icona className="h-6 w-6" />}>
                {card.testo}
              </Card>
            )
          })}
        </div>
      </section>

      {/* Citazione */}
      <section aria-label={t.home.citazioneLabel} className="bg-grigio-ch py-16">
        <QuoteBlock>{t.home.citazione}</QuoteBlock>
      </section>

      {/* La storia (teaser) */}
      <section aria-labelledby="titolo-storia" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionTag>{t.home.storiaTag}</SectionTag>
        <h2 id="titolo-storia" className="mt-2 text-3xl font-extrabold text-teal-scuro">
          {t.home.storiaTitolo}
        </h2>
        <p className="mt-4 max-w-3xl text-lg text-grigio">{t.home.storiaTeaser}</p>
        <p className="mt-6">
          <Link
            to={path(ROUTES.chiSiamo)}
            className="font-(family-name:--font-display) text-lg font-bold text-teal-scuro underline decoration-2 underline-offset-4 hover:decoration-verde"
          >
            {t.home.storiaLink}
          </Link>
        </p>
      </section>

      {/* Come aiutarci */}
      <section aria-labelledby="titolo-aiuto" className="bg-teal-scuro py-16 text-bianco">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="titolo-aiuto" className="text-3xl font-extrabold text-verde-chiaro">
            {t.home.aiutoTitolo}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-bianco/10 p-8">
              <HandHeart aria-hidden="true" className="h-10 w-10 text-verde-chiaro" />
              <h3 className="mt-4 text-2xl font-extrabold">{t.home.socioTitolo}</h3>
              <p className="mt-2 text-grigio-ch">{t.home.socioTesto}</p>
              <p className="mt-6">
                <Link
                  to={path(ROUTES.diventaSocio)}
                  className="inline-flex min-h-11 items-center rounded-full bg-verde px-6 py-3 font-(family-name:--font-display) font-bold text-nero-soft transition-colors hover:bg-verde-chiaro"
                >
                  {t.home.socioCta}
                </Link>
              </p>
            </div>
            <div className="rounded-2xl bg-bianco/10 p-8">
              <Mail aria-hidden="true" className="h-10 w-10 text-verde-chiaro" />
              <h3 className="mt-4 text-2xl font-extrabold">{t.home.contattoTitolo}</h3>
              <p className="mt-2 text-grigio-ch">{t.home.contattoTesto}</p>
              <p className="mt-6">
                <Link
                  to={path(ROUTES.contatti)}
                  className="inline-flex min-h-11 items-center rounded-full bg-bianco px-6 py-3 font-(family-name:--font-display) font-bold text-teal-scuro transition-colors hover:bg-grigio-ch"
                >
                  {t.home.contattoCta}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
