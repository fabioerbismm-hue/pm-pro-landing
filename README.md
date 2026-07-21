# PM Pro — landing page

Landing B2B in Next.js App Router, TypeScript e Tailwind. Il progetto non pubblica metriche, qualifiche, recensioni o risultati non verificati.

## Avvio locale

1. `npm install`
2. Copia `.env.example` in `.env.local` e compila le variabili.
3. `npm run dev`

## Webhook

Imposta `LEAD_WEBHOOK_URL` con l’endpoint di Zapier, Make o CRM. Se necessario, imposta `LEAD_WEBHOOK_SECRET`: viene inviato server-side come bearer token. `/api/lead` valida i dati, blocca l’honeypot, applica un rate limit basilare e aggiunge timestamp. Per produzione multi-instance è consigliato sostituire il rate limit in memoria con Redis/KV.

## Deploy Vercel

Importa il repository in Vercel, aggiungi le variabili d’ambiente e avvia il deploy. Build command: `npm run build`.

## Contenuti ancora da fornire

- Fotografie reali di Luca Ciovati (hero, founder, CTA finale) e relativi alt text.
- Eventuale video founder e poster.
- Ragione sociale, P.IVA, email, telefono e URL pubblico.
- URL definitivi di Privacy Policy, Cookie Policy e Termini.
- Eventuali dati founder verificati: esperienza, immobili gestiti, aree operative.
- Endpoint webhook/CRM e segreto.
- ID GTM, GA4/Meta e configurazione CMP. Gli hook evento sono predisposti in `components/Tracking.tsx`; gli script marketing vanno collegati alla futura CMP e caricati solo dopo consenso quando richiesto.

## Configurazione

Modifica `config/site.ts`, `config/founder.ts` e `config/form.ts`. I campi founder mancanti sono intenzionalmente `null`, vuoti o non mostrati.
