# PRD — Sito Web Ama Kids APS

**Versione:** 1.0
**Data:** Luglio 2026
**Owner:** Ama Kids APS
**Stato:** Bozza per approvazione

---

## 1. Contesto e obiettivo

Ama Kids APS è un'Associazione di Promozione Sociale con sede a Messina che supporta bambini con neurodivergenze o diversità di funzionamento e le loro famiglie. L'associazione dispone già di un'identità visiva consolidata (logo, palette, manifesto) e necessita di una presenza web ufficiale.

**Obiettivo del sito:** essere il punto di riferimento pubblico dell'associazione per:
1. Far conoscere missione, storia e valori (manifesto)
2. Permettere alle famiglie di contattare l'associazione facilmente
3. Facilitare l'iscrizione come socio (download modulistica)
4. Trasmettere fiducia, calore e professionalità fin dal primo sguardo

**Cosa NON è questo sito (v1):** non è un portale con area riservata, non ha e-commerce, non gestisce donazioni online, non ha blog con CMS. Queste funzionalità sono esplicitamente rimandate a versioni future.

---

## 2. Utenti target

| Persona | Bisogno | Comportamento tipico |
|---|---|---|
| **Genitore in ricerca** | Ha appena ricevuto (o sospetta) una diagnosi per il figlio; cerca supporto locale a Messina | Arriva da Google o passaparola, spesso da mobile, in un momento emotivamente delicato |
| **Famiglia già in contatto** | Vuole i riferimenti, la modulistica, gli orari | Visita diretta, va dritta a contatti/documenti |
| **Professionista** (insegnante, terapista, medico) | Vuole capire chi è l'associazione per indirizzare famiglie o collaborare | Legge missione e manifesto, valuta serietà |
| **Potenziale socio/volontario** | Vuole aderire o dare una mano | Cerca "come iscriversi", scarica la domanda di ammissione |
| **Ente/istituzione** | Verifica dati fiscali e legali per convenzioni o contributi | Cerca Cod. Fisc., sede legale, riferimenti ufficiali |

**Nota critica:** una parte degli utenti sarà essa stessa neurodivergente. L'accessibilità non è un requisito accessorio: è coerenza con la missione. Il sito deve essere esemplare da questo punto di vista (vedi §7).

---

## 3. Stack tecnico

### Vincolo di progetto
**Nessun database, nessun backend proprio.** Sito completamente statico, con l'unica funzionalità dinamica (modulo contatti) delegata a un servizio esterno.

### Stack scelto

| Livello | Tecnologia | Motivazione |
|---|---|---|
| Framework | **React 18 + Vite** | Richiesto; Vite per build veloci e DX semplice |
| Linguaggio | **TypeScript** | Robustezza, autocompletamento, meno bug |
| Styling | **Tailwind CSS** | Coerenza col design system, niente CSS sparso |
| Routing | **React Router v6** (o architettura single-page con anchor) | 5 pagine, routing client-side sufficiente |
| Form contatti | **Web3Forms** oppure **Formspree** (free tier) | Nessun backend: il form POSTa a un endpoint esterno che inoltra via email a amministrazione@amakidsaps.it |
| Hosting | **Netlify** oppure **Vercel** (free tier) | Deploy da Git, HTTPS automatico, CDN, form fallback nativo (Netlify Forms come alternativa) |
| Font | **Nunito + Nunito Sans** (Google Fonts, self-hosted) | Già usati nell'identità del manifesto |
| Icone | **Lucide React** | Leggere, coerenti, accessibili |
| Analytics | **Plausible** o **umami** (opzionale, cookieless) | Niente banner cookie invasivi, GDPR-friendly |

### Alternativa form (decisione da prendere in setup)
1. **Web3Forms** — gratuito, senza account per chi invia, access key nel client (accettabile: protetta da honeypot + hCaptcha)
2. **Formspree** — 50 invii/mese gratis, dashboard di gestione
3. **Netlify Forms** — se si sceglie Netlify come hosting, zero dipendenze esterne (100 invii/mese)

**Raccomandazione:** Netlify + Netlify Forms = un solo fornitore, zero configurazione aggiuntiva.

### Repository e deploy
- Repo Git (GitHub) con branch `main` → deploy automatico in produzione
- Preview deploy automatici sulle PR
- Dominio: `amakidsaps.it` (già attivo per le email — verificare gestione DNS)

---

## 4. Architettura informativa

### Sitemap (v1 — 5 pagine)

```
/                     Home
/chi-siamo            Chi siamo (missione + storia)
/manifesto            Il Manifesto (versione web integrale)
/diventa-socio        Diventa socio (info + download modulo)
/contatti             Contatti (form + mappa + riferimenti)
```

### Navigazione
- **Header fisso:** logo (link a home) + menu orizzontale (mobile: hamburger accessibile)
- **Footer:** logo, dati istituzionali completi (Cod. Fisc. 97148240837, Via Pisa 7 — 98122 Messina, amministrazione@amakidsaps.it, Tel. 393 444 3936), link alle pagine, link privacy policy
- **CTA persistente:** pulsante "Contattaci" sempre visibile nell'header

---

## 5. Contenuti per pagina

### 5.1 Home (`/`)
| Sezione | Contenuto |
|---|---|
| Hero | Logo, claim "Per ogni bambino, per ogni famiglia", sottotitolo dal manifesto ("Siamo nati dal coraggio di una famiglia…"), CTA primaria → Contatti, CTA secondaria → Manifesto |
| Missione in sintesi | Le 4 card del manifesto: Spazio di accoglienza, Formazione specializzata, Soluzioni concrete, Inclusione piena |
| Citazione | "La neurodiversità non è una malattia da curare. È un modo unico di percepire ed essere nel mondo." |
| La storia (teaser) | Estratto "Ama Kids è quella sensazione di speranza…" + link a Chi siamo |
| Come aiutarci | 2 card: Diventa socio / Contattaci |
| Footer completo | Dati istituzionali |

### 5.2 Chi siamo (`/chi-siamo`)
- **Come nasce l'idea Ama Kids** — testo integrale della storia dal manifesto, inclusa la frase "I miracoli vanno difesi"
- **Cosa vuol essere Ama Kids APS** — missione estesa
- **Ama Kids e la neurodivergenza** — testo con definizione di neurodiversità (citazione Harmon, 2004)
- (Futuro: sezione team/direttivo con foto, quando disponibile)

### 5.3 Manifesto (`/manifesto`)
- Versione web integrale del manifesto già prodotto in PDF, sezione per sezione:
  1. Il lessico (6 card)
  2. I principi (6 blocchi numerati I–VI)
  3. Le 8 dichiarazioni "Crediamo che…"
  4. Gli impegni concreti
- Pulsante **"Scarica il Manifesto in PDF"** (file statico in `/public/docs/`)

### 5.4 Diventa socio (`/diventa-socio`)
- Perché diventare socio (3–4 paragrafi)
- Come funziona: 3 step visivi (1. Scarica e compila la domanda → 2. Inviala o consegnala → 3. Il Consiglio Direttivo delibera)
- Pulsante **"Scarica la Domanda di Ammissione (PDF)"** (file statico)
- Nota quota associativa: "La quota annuale è stabilita dal Consiglio Direttivo — contattaci per l'importo corrente"
- CTA → form contatti precompilato con oggetto "Richiesta iscrizione socio"

### 5.5 Contatti (`/contatti`)
- **Form di contatto** (vedi §6)
- Blocco riferimenti diretti: email (mailto), telefono (tel:), indirizzo
- Mappa: embed OpenStreetMap statico o link a Google Maps (evitare iframe Google Maps con cookie — preferire immagine statica cliccabile)
- Dati istituzionali completi

### 5.6 Privacy policy (`/privacy`)
- Pagina statica con informativa GDPR (titolare: Ama Kids APS)
- Base: informativa già redatta per la domanda di ammissione, estesa al trattamento web (form contatti, eventuale analytics cookieless)

---

## 6. Modulo di contatto — Requisiti funzionali

### Campi
| Campo | Tipo | Obbligatorio | Validazione |
|---|---|---|---|
| Nome e cognome | text | Sì | min 2 caratteri |
| Email | email | Sì | formato email |
| Telefono | tel | No | solo numeri/+/spazi se compilato |
| Oggetto | select | Sì | opzioni: "Informazioni generali", "Richiesta iscrizione socio", "Collaborazioni e volontariato", "Altro" |
| Messaggio | textarea | Sì | min 10 caratteri, max 2000 |
| Consenso privacy | checkbox | Sì | obbligatorio, link a /privacy |
| Honeypot | hidden | — | anti-spam invisibile |

### Comportamento
1. Validazione client-side inline, con messaggi di errore chiari **sotto ogni campo** (mai solo bordi rossi: sempre testo esplicito)
2. Submit → POST all'endpoint del form provider → stato di caricamento visibile sul pulsante
3. **Successo:** messaggio di conferma nella pagina ("Grazie! Ti risponderemo entro 2-3 giorni lavorativi") — niente redirect
4. **Errore:** messaggio con alternativa ("Qualcosa è andato storto. Puoi scriverci direttamente a amministrazione@amakidsaps.it")
5. Email di notifica recapitata a `amministrazione@amakidsaps.it` con tutti i campi
6. Anti-spam: honeypot + (se necessario dopo il lancio) hCaptcha invisibile

### Cosa non fare
- Nessun salvataggio dei dati lato client oltre la sessione
- Nessun tracciamento del contenuto del form
- Nessun captcha visivo aggressivo in v1 (barriera di accessibilità)

---

## 7. Accessibilità — Requisito primario (WCAG 2.2 AA)

Data la missione dell'associazione, il sito deve essere un esempio di accessibilità:

1. **Semantica HTML corretta:** landmark (`header`, `nav`, `main`, `footer`), heading gerarchici senza salti
2. **Contrasto:** tutti i testi ≥ 4.5:1 (verificare il teal chiaro #3BBFBF su bianco: usarlo solo per elementi grandi o decorativi, mai per body text)
3. **Navigazione da tastiera completa:** focus visibile e ben marcato ovunque, skip-link "Salta al contenuto"
4. **Screen reader:** label esplicite su tutti i campi form, `aria-live` per messaggi di successo/errore, alt text su tutte le immagini
5. **Riduzione stimoli:** rispettare `prefers-reduced-motion` (nessuna animazione per chi la disattiva); nessun autoplay, nessun carousel automatico, nessun elemento lampeggiante
6. **Leggibilità:** font ≥ 16px per il body, interlinea ≥ 1.5, larghezza di riga max ~70 caratteri, linguaggio semplice e diretto
7. **Target touch:** ≥ 44×44px per tutti gli elementi interattivi
8. **Test:** verifica con Lighthouse (target ≥ 95 accessibilità), axe DevTools, navigazione reale con VoiceOver/NVDA prima del lancio

---

## 8. Design system

### Palette (dall'identità esistente)
```
--teal-scuro:  #1E5F74   /* testi principali su chiaro, sfondi sezioni scure */
--teal-medio:  #2A8FA8   /* accenti, link */
--teal-chiaro: #3BBFBF   /* decorativo, titoli grandi su teal scuro */
--verde:       #5DAF3E   /* CTA secondarie, evidenziazioni, sezione impegni */
--verde-chiaro:#A8D88A   /* tag, dettagli su sfondo scuro */
--bianco:      #FAFEFE   /* sfondo base */
--grigio-ch:   #EFF8F8   /* sfondi sezioni alternate */
--grigio:      #4A6B72   /* body text secondario */
--nero-soft:   #1A2E32   /* body text primario */
```

### Tipografia
- **Titoli:** Nunito, weight 700–900
- **Body:** Nunito Sans, weight 300–600
- Scala fluida con `clamp()` (già collaudata nel manifesto HTML)

### Componenti riutilizzabili (da sviluppare)
`Header`, `Footer`, `Hero`, `Card` (bordo teal, hover verde), `SectionTag` (etichetta uppercase), `SepLine` (banda tricolore teal/verde/ciano), `QuoteBlock` (citazione con highlight verde), `PrincipleBlock` (numerato con bordo sinistro), `ContactForm`, `CTAButton` (primario teal / secondario verde), `DownloadCard` (per i PDF)

### Riferimento visivo
Il manifesto PDF/HTML già prodotto è la fonte di verità per lo stile: stesse bande tricolori, stesse card, stessi accenti.

---

## 9. SEO e metadati

- Title e meta description unici per pagina (es. home: "Ama Kids APS — Associazione per bambini neurodivergenti e famiglie a Messina")
- Open Graph + Twitter card con immagine dedicata (logo su sfondo teal)
- Schema.org `NGO` in JSON-LD con nome, indirizzo, Cod. Fisc., contatti
- `sitemap.xml` e `robots.txt` generati in build
- Keyword primarie: *associazione neurodivergenza Messina, autismo Messina supporto famiglie, ADHD bambini Messina, APS inclusione Messina*
- Prestazioni: Lighthouse Performance ≥ 90 (immagini in WebP/AVIF, font preload, code splitting per rotta)

---

## 10. Requisiti non funzionali

| Requisito | Target |
|---|---|
| Performance | LCP < 2.5s su 4G, bundle iniziale < 150KB gzip |
| Compatibilità | Ultime 2 versioni di Chrome, Firefox, Safari, Edge; iOS/Android recenti |
| Responsive | Mobile-first, breakpoint 640/768/1024px |
| Uptime | Garantito dall'hosting statico (CDN) |
| Sicurezza | HTTPS, security headers (CSP di base), nessun dato sensibile nel client oltre l'access key del form |
| GDPR | Analytics cookieless (o assente), privacy policy, consenso esplicito sul form |
| Manutenibilità | Contenuti testuali centralizzati in file di costanti/JSON per modifiche semplici senza toccare i componenti |

---

## 11. Fasi e deliverable

### Fase 1 — Setup e fondamenta (deliverable: repo funzionante)
- Init Vite + React + TS + Tailwind, config font e palette
- Header, Footer, routing, layout base
- Deploy pipeline attiva (Netlify/Vercel)

### Fase 2 — Pagine statiche (deliverable: sito navigabile)
- Home completa
- Chi siamo, Manifesto (con PDF scaricabili), Diventa socio
- Privacy policy

### Fase 3 — Form e rifinitura (deliverable: sito completo)
- Form contatti integrato e testato (invio reale a amministrazione@amakidsaps.it)
- Audit accessibilità (axe + screen reader) e correzioni
- SEO: metadati, JSON-LD, sitemap
- Test cross-device

### Fase 4 — Lancio
- Collegamento dominio amakidsaps.it
- Verifica DNS/email invariati
- Submit a Google Search Console
- Handoff: breve guida scritta per aggiornare i contenuti

### Fuori scope v1 (backlog futuro)
- Blog/news con CMS headless (es. Decap CMS, resta senza DB)
- Donazioni online (es. link PayPal/Satispay come step intermedio)
- Area soci riservata
- Calendario eventi
- Versione in inglese
- Newsletter (integrazione con provider esterno)

---

## 12. Criteri di accettazione (v1)

- [ ] Tutte le 5 pagine + privacy raggiungibili e responsive
- [ ] Form contatti: invio reale ricevuto su amministrazione@amakidsaps.it, gestione successo/errore, honeypot attivo
- [ ] PDF Manifesto e Domanda di Ammissione scaricabili
- [ ] Lighthouse: Accessibility ≥ 95, Performance ≥ 90, SEO ≥ 95
- [ ] Navigazione completa da sola tastiera verificata
- [ ] Test screen reader su home e form superato
- [ ] `prefers-reduced-motion` rispettato
- [ ] Dati istituzionali corretti in footer e privacy (Cod. Fisc. 97148240837, Via Pisa 7 — 98122 Messina)
- [ ] Nessun database, nessun server proprietario: tutto statico + form provider
