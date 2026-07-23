export const SITE = {
  name: 'Ama Kids APS',
  fullName: 'Ama Kids — Associazione di Promozione Sociale',
  domain: 'https://www.amakidsaps.it',
  email: 'amministrazione@amakidsaps.it',
  phone: '393 444 3936',
  phoneHref: 'tel:+393934443936',
  address: 'Via Pisa 7 — 98122 Messina',
  codFisc: '97148240837',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via+Pisa+7,+98122+Messina',
} as const

export const PDF_FILES = {
  manifesto: '/docs/manifesto-amakids.pdf',
  domandaAmmissione: '/docs/domanda-ammissione-amakids.pdf',
} as const

/** Rotte "neutre" (senza prefisso lingua) delle pagine principali. */
export const ROUTES = {
  home: '/',
  chiSiamo: '/chi-siamo',
  manifesto: '/manifesto',
  diventaSocio: '/diventa-socio',
  contatti: '/contatti',
  privacy: '/privacy',
} as const
