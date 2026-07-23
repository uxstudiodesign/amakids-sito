import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useI18n } from '../i18n'

export default function Layout() {
  const { pathname } = useLocation()
  const { t } = useI18n()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#contenuto" className="skip-link">
        {t.nav.saltaContenuto}
      </a>
      <Header />
      <main id="contenuto" className="flex-1 pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
