import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Send } from 'lucide-react'
import { ROUTES, SITE } from '../content/site'
import { useI18n } from '../i18n'
import { validaForm, type DatiForm, type ErroriForm } from '../utils/validazioneForm'

type StatoInvio = 'inattivo' | 'invio' | 'successo' | 'errore'

interface ContactFormProps {
  oggettoIniziale?: string
}

const DATI_INIZIALI: DatiForm = {
  nome: '',
  email: '',
  telefono: '',
  oggetto: '',
  messaggio: '',
  privacy: false,
}

export default function ContactForm({ oggettoIniziale }: ContactFormProps) {
  const { t, path } = useI18n()
  const f = t.form
  const [dati, setDati] = useState<DatiForm>({
    ...DATI_INIZIALI,
    oggetto: oggettoIniziale ?? '',
  })
  const [errori, setErrori] = useState<ErroriForm>({})
  const [stato, setStato] = useState<StatoInvio>('inattivo')

  function aggiorna<K extends keyof DatiForm>(campo: K, valore: DatiForm[K]) {
    setDati((precedenti) => ({ ...precedenti, [campo]: valore }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nuoviErrori = validaForm(dati, f.errori)
    setErrori(nuoviErrori)
    if (Object.keys(nuoviErrori).length > 0) return

    const formData = new FormData(event.currentTarget)
    formData.set('form-name', 'contatti')
    const corpo = new URLSearchParams()
    formData.forEach((valore, chiave) => {
      if (typeof valore === 'string') corpo.append(chiave, valore)
    })

    setStato('invio')
    try {
      const risposta = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: corpo.toString(),
      })
      if (!risposta.ok) {
        throw new Error(`Invio non riuscito (HTTP ${risposta.status})`)
      }
      setStato('successo')
      setDati(DATI_INIZIALI)
    } catch (error) {
      console.error('Invio del form non riuscito:', error)
      setStato('errore')
    }
  }

  const classeInput =
    'w-full rounded-lg border-2 border-teal-medio/40 bg-bianco px-4 py-3 text-nero-soft focus:border-teal-medio'

  if (stato === 'successo') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border-2 border-verde bg-verde-chiaro/20 p-8 text-center"
      >
        <h3 className="font-(family-name:--font-display) text-2xl font-extrabold text-teal-scuro">
          {f.successoTitolo}
        </h3>
        <p className="mt-2 text-grigio">{f.successoTesto}</p>
      </div>
    )
  }

  return (
    <form name="contatti" method="POST" data-netlify="true" noValidate onSubmit={onSubmit} className="space-y-6">
      <input type="hidden" name="form-name" value="contatti" />
      {/* Honeypot anti-spam: nascosto a tutti, screen reader compresi */}
      <p className="hidden" aria-hidden="true">
        <label>
          {f.honeypot} <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div>
        <label htmlFor="nome" className="mb-1 block font-bold text-teal-scuro">
          {f.nome} <span aria-hidden="true">*</span>
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          autoComplete="name"
          value={dati.nome}
          onChange={(e) => aggiorna('nome', e.target.value)}
          aria-invalid={Boolean(errori.nome)}
          aria-describedby={errori.nome ? 'errore-nome' : undefined}
          className={classeInput}
        />
        {errori.nome && (
          <p id="errore-nome" className="mt-1 font-semibold text-red-700">
            {errori.nome}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block font-bold text-teal-scuro">
          {f.email} <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={dati.email}
          onChange={(e) => aggiorna('email', e.target.value)}
          aria-invalid={Boolean(errori.email)}
          aria-describedby={errori.email ? 'errore-email' : undefined}
          className={classeInput}
        />
        {errori.email && (
          <p id="errore-email" className="mt-1 font-semibold text-red-700">
            {errori.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="telefono" className="mb-1 block font-bold text-teal-scuro">
          {f.telefono} <span className="font-normal text-grigio">{f.telefonoNota}</span>
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          autoComplete="tel"
          value={dati.telefono}
          onChange={(e) => aggiorna('telefono', e.target.value)}
          aria-invalid={Boolean(errori.telefono)}
          aria-describedby={errori.telefono ? 'errore-telefono' : undefined}
          className={classeInput}
        />
        {errori.telefono && (
          <p id="errore-telefono" className="mt-1 font-semibold text-red-700">
            {errori.telefono}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="oggetto" className="mb-1 block font-bold text-teal-scuro">
          {f.oggetto} <span aria-hidden="true">*</span>
        </label>
        <select
          id="oggetto"
          name="oggetto"
          required
          value={dati.oggetto}
          onChange={(e) => aggiorna('oggetto', e.target.value)}
          aria-invalid={Boolean(errori.oggetto)}
          aria-describedby={errori.oggetto ? 'errore-oggetto' : undefined}
          className={classeInput}
        >
          <option value="">{f.oggettoPlaceholder}</option>
          {f.oggetti.map((oggetto) => (
            <option key={oggetto} value={oggetto}>
              {oggetto}
            </option>
          ))}
        </select>
        {errori.oggetto && (
          <p id="errore-oggetto" className="mt-1 font-semibold text-red-700">
            {errori.oggetto}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="messaggio" className="mb-1 block font-bold text-teal-scuro">
          {f.messaggio} <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="messaggio"
          name="messaggio"
          required
          rows={6}
          maxLength={2000}
          value={dati.messaggio}
          onChange={(e) => aggiorna('messaggio', e.target.value)}
          aria-invalid={Boolean(errori.messaggio)}
          aria-describedby={errori.messaggio ? 'errore-messaggio' : undefined}
          className={classeInput}
        />
        {errori.messaggio && (
          <p id="errore-messaggio" className="mt-1 font-semibold text-red-700">
            {errori.messaggio}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="privacy"
            name="privacy"
            type="checkbox"
            required
            checked={dati.privacy}
            onChange={(e) => aggiorna('privacy', e.target.checked)}
            aria-invalid={Boolean(errori.privacy)}
            aria-describedby={errori.privacy ? 'errore-privacy' : undefined}
            className="mt-1 h-5 w-5 accent-verde"
          />
          <label htmlFor="privacy" className="text-grigio">
            {f.privacyPre}{' '}
            <Link
              to={path(ROUTES.privacy)}
              className="font-bold text-teal-scuro underline underline-offset-2 hover:decoration-verde"
            >
              {f.privacyLink}
            </Link>{' '}
            {f.privacyPost} <span aria-hidden="true">*</span>
          </label>
        </div>
        {errori.privacy && (
          <p id="errore-privacy" className="mt-1 font-semibold text-red-700">
            {errori.privacy}
          </p>
        )}
      </div>

      <div aria-live="assertive">
        {stato === 'errore' && (
          <p className="rounded-lg border-2 border-red-700 bg-red-50 p-4 font-semibold text-red-700">
            {f.errorePre}{' '}
            <a href={`mailto:${SITE.email}`} className="underline">
              {SITE.email}
            </a>
            .
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={stato === 'invio'}
        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-teal-scuro px-8 py-3 font-(family-name:--font-display) text-lg font-bold text-bianco transition-colors hover:bg-teal-medio disabled:cursor-wait disabled:opacity-70"
      >
        <Send aria-hidden="true" className="h-5 w-5" />
        {stato === 'invio' ? f.invio : f.invia}
      </button>
    </form>
  )
}
