import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { localeDaPathname, percorsoNeutro } from '../i18n'
import { SITE } from '../content/site'

function impostaLinkAlternato(hreflang: string, href: string): void {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`)
  if (!link) {
    link = document.createElement('link')
    link.rel = 'alternate'
    link.hreflang = hreflang
    document.head.appendChild(link)
  }
  link.href = href
}

/**
 * Imposta title, meta description, lingua del documento e link hreflang
 * della pagina corrente. Sufficiente per una SPA statica senza SSR.
 */
export function usePageMeta(title: string, description: string): void {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = title

    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', description)
    }

    const locale = localeDaPathname(pathname)
    document.documentElement.lang = locale

    const neutro = percorsoNeutro(pathname)
    const urlIt = `${SITE.domain}${neutro}`
    const urlEn = `${SITE.domain}${neutro === '/' ? '/en' : `/en${neutro}`}`
    impostaLinkAlternato('it', urlIt)
    impostaLinkAlternato('en', urlEn)
    impostaLinkAlternato('x-default', urlIt)
  }, [title, description, pathname])
}
