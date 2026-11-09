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
 * della pagina corrente, coerenti con i metadati HTML prodotti in build.
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

    const percorso = pathname.replace(/\/+$/, '') || '/'
    const neutro = percorsoNeutro(percorso)
    const urlIt = `${SITE.domain}${neutro}`
    const urlEn = `${SITE.domain}${neutro === '/' ? '/en' : `/en${neutro}`}`
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    const url = locale === 'en' ? urlEn : urlIt
    canonical.href = url
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)

    impostaLinkAlternato('it', urlIt)
    impostaLinkAlternato('en', urlEn)
    impostaLinkAlternato('x-default', urlIt)
  }, [title, description, pathname])
}
