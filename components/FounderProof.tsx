import Image from "next/image";
import { Award, BadgeCheck, Building2, FileCheck2 } from "lucide-react";

const credentials = [
  {
    icon: BadgeCheck,
    title: "Agente d’affari in mediazione",
    text: "Giudizio di idoneità per il settore immobiliare rilasciato dalla Camera di Commercio Milano Monza Brianza Lodi.",
    meta: "Abilitazione · 21 maggio 2026",
  },
  {
    icon: Building2,
    title: "Amministratore condominiale e immobiliare",
    text: "Corso abilitante di 80 ore con superamento della prova finale presso ente di formazione accreditato.",
    meta: "ICAF · 2025",
  },
  {
    icon: FileCheck2,
    title: "Gestione dei contratti di locazione",
    text: "Aggiornamento specialistico sulla gestione strategica degli affitti transitori e di lungo periodo.",
    meta: "ICAF · 16 ore · 2025",
  },
  {
    icon: Award,
    title: "Attestato di competenza",
    text: "Competenza attestata tramite un ente accreditato per i servizi formativi da Regione Lombardia.",
    meta: "20 novembre 2024",
  },
];

export default function FounderProof() {
  return (
    <section className="section bg-navy" aria-labelledby="founder-proof-title">
      <div className="container">
        <p className="eyebrow">ESPERIENZA DOCUMENTATA</p>
        <h2 id="founder-proof-title" className="display mt-4 max-w-4xl text-5xl font-bold sm:text-7xl">
          Prima del metodo, c’è il mestiere.
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
          PM Pro nasce dentro il settore immobiliare e dell’ospitalità. Le competenze di Luca non sono
          una promessa di marketing: sono supportate da abilitazioni, formazione specialistica e
          attività operativa come host.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {credentials.map(({ icon: Icon, title, text, meta }) => (
            <article key={title} className="glass rounded-3xl p-7">
              <Icon className="text-gold" aria-hidden="true" />
              <h3 className="display mt-6 text-2xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-muted">{text}</p>
              <p className="mt-5 text-xs font-bold uppercase tracking-[.16em] text-sky">{meta}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <figure className="glass overflow-hidden rounded-3xl">
            <div className="relative aspect-[1.65/1] bg-white">
              <Image
                src="/images/social-proof/profilo-host.jpg"
                alt="Riepilogo del profilo Ciovati Group con 910 recensioni, valutazione 4,71 e 3 anni da host"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
            <figcaption className="p-6">
              <p className="display text-2xl font-bold">910 recensioni. Valutazione 4,71.</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Un riscontro operativo maturato nell’ospitalità, mostrato nel riepilogo del profilo
                Ciovati Group fornito da Luca.
              </p>
            </figcaption>
          </figure>

          <figure className="glass overflow-hidden rounded-3xl">
            <div className="relative aspect-[2/3] bg-[#fff5d9]">
              <Image
                src="/images/social-proof/superhost.jpg"
                alt="Comunicazione del riconoscimento Superhost ricevuto da Luca"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
            <figcaption className="p-6">
              <p className="display text-2xl font-bold">Riconoscimento Superhost.</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Un segnale concreto di affidabilità, rapidità di risposta e qualità dell’esperienza
                offerta agli ospiti.
              </p>
            </figcaption>
          </figure>
        </div>

        <p className="mt-5 text-xs leading-5 text-muted">
          Dati e riconoscimenti riferiti ai documenti e agli screenshot forniti. Le metriche del profilo
          possono variare nel tempo.
        </p>
      </div>
    </section>
  );
}
