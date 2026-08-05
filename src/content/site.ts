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

/**
 * Endpoint e access key Web3Forms per il form contatti.
 * La key è pubblica by design (vedi PRD §3): protetta da honeypot lato form.
 */
export const WEB3FORMS = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '79366fdf-ae80-4dbd-a2ce-6d6601af48b9',
} as const

export const PDF_FILES = {
  manifesto: '/docs/manifesto-amakids.pdf',
  domandaAmmissione: '/docs/domanda-ammissione-amakids.pdf',
  statuto: '/docs/statuto-amakids.pdf',
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
