import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Globe, Menu, X } from 'lucide-react'
import { ROUTES } from '../content/site'
import { useI18n } from '../i18n'

export default function Header() {
  const [menuAperto, setMenuAperto] = useState(false)
  const { pathname } = useLocation()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const { t, path, percorsoAltraLingua } = useI18n()

  const navItems = [
    { label: t.nav.home, to: ROUTES.home },
    { label: t.nav.chiSiamo, to: ROUTES.chiSiamo },
    { label: t.nav.manifesto, to: ROUTES.manifesto },
    { label: t.nav.diventaSocio, to: ROUTES.diventaSocio },
    { label: t.nav.contatti, to: ROUTES.contatti },
  ]

  useEffect(() => {
    setMenuAperto(false)
  }, [pathname])

  useEffect(() => {
    if (!menuAperto) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuAperto(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuAperto])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 font-(family-name:--font-display) font-bold transition-colors ${
      isActive
        ? 'text-teal-scuro underline decoration-verde decoration-4 underline-offset-8'
        : 'text-grigio hover:text-teal-scuro'
    }`

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-grigio-ch bg-bianco/95 backdrop-blur">
      <div className="mx-auto flex h-24 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to={path('/')} className="flex shrink-0 items-center gap-3" aria-label={t.nav.logoLabel}>
          <img
            src="/images/amakids-logo.jpeg"
            alt=""
            className="h-20 w-20 rounded-full object-cover"
            width="80"
            height="80"
          />
          <span className="font-(family-name:--font-display) text-xl font-extrabold text-teal-scuro">
            Ama Kids <span className="text-verde-scuro">APS</span>
          </span>
        </Link>

        <nav aria-label={t.nav.navPrincipale} className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={path(item.to)} className={linkClass} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
          <Link
            to={path(ROUTES.contatti)}
            className="ml-3 rounded-full bg-teal-scuro px-5 py-2.5 font-(family-name:--font-display) font-bold text-bianco transition-colors hover:bg-teal-medio"
          >
            {t.nav.contattaci}
          </Link>
          <Link
            to={percorsoAltraLingua}
            aria-label={t.nav.cambiaLingua}
            className="ml-2 inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 border-teal-medio/40 px-3.5 py-2 font-(family-name:--font-display) font-bold text-teal-scuro transition-colors hover:border-verde"
          >
            <Globe aria-hidden="true" className="h-4 w-4" />
            {t.nav.linguaBreve}
          </Link>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md text-teal-scuro lg:hidden"
          aria-expanded={menuAperto}
          aria-controls="menu-mobile"
          onClick={() => setMenuAperto((aperto) => !aperto)}
        >
          {menuAperto ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{menuAperto ? t.nav.chiudiMenu : t.nav.apriMenu}</span>
        </button>
      </div>

      {menuAperto && (
        <nav
          id="menu-mobile"
          aria-label={t.nav.navPrincipale}
          className="border-t border-grigio-ch bg-bianco px-4 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={path(item.to)}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `block rounded-md px-3 py-3 font-(family-name:--font-display) text-lg font-bold ${
                      isActive ? 'bg-grigio-ch text-teal-scuro' : 'text-grigio'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to={percorsoAltraLingua}
                className="flex items-center gap-2 rounded-md px-3 py-3 font-(family-name:--font-display) text-lg font-bold text-grigio"
              >
                <Globe aria-hidden="true" className="h-5 w-5" />
                {t.nav.cambiaLingua}
              </Link>
            </li>
            <li className="mt-3">
              <Link
                to={path(ROUTES.contatti)}
                className="block rounded-full bg-teal-scuro px-5 py-3 text-center font-(family-name:--font-display) font-bold text-bianco"
              >
                {t.nav.contattaci}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
