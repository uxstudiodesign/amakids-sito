export interface DatiForm {
  nome: string
  email: string
  telefono: string
  oggetto: string
  messaggio: string
  privacy: boolean
}

export type ErroriForm = Partial<Record<keyof DatiForm, string>>

export interface MessaggiErrore {
  nome: string
  email: string
  telefono: string
  oggetto: string
  messaggioMin: string
  messaggioMax: string
  privacy: string
}

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const REGEX_TELEFONO = /^[0-9+\s]+$/

/** Validazione client-side con messaggi espliciti (mai solo bordi rossi). */
export function validaForm(dati: DatiForm, messaggi: MessaggiErrore): ErroriForm {
  const errori: ErroriForm = {}

  if (dati.nome.trim().length < 2) {
    errori.nome = messaggi.nome
  }

  if (!REGEX_EMAIL.test(dati.email.trim())) {
    errori.email = messaggi.email
  }

  if (dati.telefono.trim() !== '' && !REGEX_TELEFONO.test(dati.telefono.trim())) {
    errori.telefono = messaggi.telefono
  }

  if (dati.oggetto === '') {
    errori.oggetto = messaggi.oggetto
  }

  const messaggio = dati.messaggio.trim()
  if (messaggio.length < 10) {
    errori.messaggio = messaggi.messaggioMin
  } else if (messaggio.length > 2000) {
    errori.messaggio = messaggi.messaggioMax
  }

  if (!dati.privacy) {
    errori.privacy = messaggi.privacy
  }

  return errori
}
