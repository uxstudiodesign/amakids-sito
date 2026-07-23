import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { it } from './it'
import { en } from './en'

export type Dictionary = typeof it
export type Locale = 'it' | 'en'

const DIZIONARI: Record<Locale, Dictionary> = { it, en }

export function localeDaPathname(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'it'
}

/** Rimuove l'eventuale prefisso /en, restituendo il percorso "neutro". */
export function percorsoNeutro(pathname: string): string {
  if (pathname === '/en') return '/'
  if (pathname.startsWith('/en/')) return pathname.slice(3)
  return pathname
}

/**
 * Hook i18n: locale corrente (derivato dall'URL), dizionario e helper
 * per costruire percorsi nella lingua attiva.
 */
export function useI18n() {
  const { pathname } = useLocation()
  const locale = localeDaPathname(pathname)
  const t = DIZIONARI[locale]

  const path = useCallback(
    (to: string) => (locale === 'en' ? (to === '/' ? '/en' : `/en${to}`) : to),
    [locale],
  )

  const altraLingua: Locale = locale === 'it' ? 'en' : 'it'
  const neutro = percorsoNeutro(pathname)
  const percorsoAltraLingua = altraLingua === 'en' ? (neutro === '/' ? '/en' : `/en${neutro}`) : neutro

  return { locale, t, path, altraLingua, percorsoAltraLingua }
}
