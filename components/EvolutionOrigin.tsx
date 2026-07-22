import Image from "next/image";
import { ArrowUpRight, Layers3 } from "lucide-react";

export default function EvolutionOrigin() {
  return (
    <section className="section" aria-labelledby="evolution-origin-title">
      <div className="container">
        <div className="glass relative overflow-hidden rounded-[2rem] p-7 sm:p-10 lg:p-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky/10 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div>
              <p className="eyebrow">DUE FOUNDER, DUE COMPETENZE</p>
              <h2 id="evolution-origin-title" className="display mt-4 text-5xl font-bold sm:text-6xl">
                PM Pro nasce dall’incontro tra property management e acquisizione.
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted">
                Il progetto è stato fondato da <strong className="text-white">Luca Ciovati</strong> e
                <strong className="text-white"> Mirko Sorrentino</strong>. Luca porta la conoscenza
                quotidiana della gestione immobiliare. Mirko porta l’esperienza costruita con Evolution
                Media Group nei processi di marketing e acquisizione per il settore immobiliare.
              </p>
              <p className="mt-5 text-lg leading-8 text-muted">
                PM Pro nasce così anche nell’ecosistema Evolution Media: non come una semplice agenzia
                che sceglie una nicchia, ma come un progetto verticale costruito insieme a chi vive il
                problema dall’interno.
              </p>
              <a
                href="https://evolutionmediagroups.com/evolution-media"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost mt-8"
              >
                Conosci Evolution Media Group <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>

            <div className="grid gap-4">
              <article className="rounded-2xl border border-white/10 bg-ink/60 p-6">
                <div className="flex items-center gap-5">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-sky/30 bg-white">
                    <Image
                      src="/images/founders/luca-ciovati.webp"
                      alt="Luca Ciovati, co-founder di PM Pro"
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div>
                    <p className="eyebrow">CO-FOUNDER · OPERATIONS</p>
                    <h3 className="display mt-2 text-3xl font-bold">Luca Ciovati</h3>
                  </div>
                </div>
                <p className="mt-3 leading-7 text-muted">
                  Property manager: porta nel sistema esperienza operativa, criteri di qualifica e
                  conoscenza delle esigenze dei proprietari.
                </p>
              </article>
              <article className="rounded-2xl border border-gold/25 bg-gold/5 p-6">
                <div className="flex items-center gap-5">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-gold/30 bg-white">
                    <Image
                      src="/images/founders/mirko-sorrentino.webp"
                      alt="Mirko Sorrentino, co-founder di PM Pro"
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div>
                    <p className="eyebrow">CO-FOUNDER · ACQUISITION</p>
                    <h3 className="display mt-2 text-3xl font-bold">Mirko Sorrentino</h3>
                  </div>
                </div>
                <p className="mt-3 leading-7 text-muted">
                  Founder di Evolution Media Group: porta strategia, marketing e costruzione dei
                  processi di acquisizione per il mercato immobiliare.
                </p>
              </article>
              <div className="flex items-center gap-3 px-2 text-sm text-muted">
                <Layers3 size={18} className="text-sky" aria-hidden="true" />
                Un solo progetto verticale, due prospettive complementari.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
