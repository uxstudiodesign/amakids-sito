import CTAButton from '../components/CTAButton'
import { usePageMeta } from '../hooks/usePageMeta'
import { useI18n } from '../i18n'

export default function NotFound() {
  const { t, path } = useI18n()
  usePageMeta(t.notFound.metaTitle, t.notFound.metaDesc)

  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
      <h1 className="text-4xl font-black text-teal-scuro">{t.notFound.titolo}</h1>
      <p className="text-lg text-grigio">{t.notFound.testo}</p>
      <CTAButton to={path('/')}>{t.notFound.cta}</CTAButton>
    </section>
  )
}
