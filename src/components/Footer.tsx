import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { ROUTES, SITE } from '../content/site'
import { useI18n } from '../i18n'
import SepLine from './SepLine'

export default function Footer() {
  const { t, path } = useI18n()

  const navItems = [
    { label: t.nav.home, to: ROUTES.home },
    { label: t.nav.chiSiamo, to: ROUTES.chiSiamo },
    { label: t.nav.manifesto, to: ROUTES.manifesto },
    { label: t.nav.diventaSocio, to: ROUTES.diventaSocio },
    { label: t.nav.contatti, to: ROUTES.contatti },
    { label: t.nav.privacy, to: ROUTES.privacy },
  ]

  return (
    <footer className="bg-teal-scuro text-bianco">
      <SepLine />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src="/images/amakids-logo.jpeg"
              alt=""
              className="h-12 w-12 rounded-full object-cover"
              width="48"
              height="48"
            />
            <p className="font-(family-name:--font-display) text-xl font-extrabold">
              Ama Kids <span className="text-verde-chiaro">APS</span>
            </p>
          </div>
          <p className="mt-4 max-w-xs">{t.footer.claim}</p>
          <p className="mt-4 text-sm text-grigio-ch/90">
            {t.footer.aps}
            <br />
            {t.footer.codFisc} {SITE.codFisc}
          </p>
        </div>

        <nav aria-label={t.footer.pagineSito}>
          <h2 className="font-(family-name:--font-display) text-lg font-extrabold text-bianco">
            {t.footer.esplora}
          </h2>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={path(item.to)} className="underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic">
          <h2 className="font-(family-name:--font-display) text-lg font-extrabold text-bianco">
            {t.footer.contatti}
          </h2>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-verde-chiaro" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-verde-chiaro" />
              <a href={`mailto:${SITE.email}`} className="break-all underline-offset-4 hover:underline">
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-verde-chiaro" />
              <a href={SITE.phoneHref} className="underline-offset-4 hover:underline">
                {SITE.phone}
              </a>
            </li>
          </ul>
        </address>
      </div>
      <div className="border-t border-bianco/15 px-4 py-4 text-center text-sm text-grigio-ch/80">
        © {new Date().getFullYear()} {SITE.fullName} — Messina
      </div>
    </footer>
  )
}
