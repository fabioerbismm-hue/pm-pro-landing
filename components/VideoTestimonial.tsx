import {ExternalLink, Play} from "lucide-react";

const videoId = "D-dvGSlvIv0";

export default function VideoTestimonial() {
  return (
    <section className="section" aria-labelledby="video-testimonial-title">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">CASE STUDY PM PRO</p>
          <h2
            id="video-testimonial-title"
            className="display mt-4 text-5xl font-bold sm:text-7xl"
          >
            <span className="block">Dall’acquisizione</span>
            <span className="mt-2 block text-emerald-400">
              a 2 nuove gestioni.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
            CR Home racconta il percorso svolto con PM Pro e i risultati ottenuti
            in meno di 30 giorni.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-5xl">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-emerald-400/10 blur-3xl" />
          <div className="glass relative overflow-hidden rounded-[2rem] border border-emerald-400/25 p-2 sm:p-3">
            <div className="aspect-video overflow-hidden rounded-[1.5rem] bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
                title="Come CR Home ha acquisito 2 nuove gestioni in meno di 30 giorni"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-7 flex max-w-5xl flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-white/[.03] p-5 sm:flex-row sm:items-center">
          <div className="flex gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-400 text-ink">
              <Play size={18} fill="currentColor" />
            </span>
            <div>
              <p className="font-bold text-white">Case study CR Home</p>
              <p className="mt-1 text-sm text-muted">
                Esperienza e risultati raccontati direttamente dal cliente.
              </p>
            </div>
          </div>
          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-sky hover:underline"
          >
            Guarda su YouTube <ExternalLink size={16} />
          </a>
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-5 text-muted">
          Il risultato descritto riguarda lo specifico caso presentato e non
          costituisce una garanzia di risultati futuri.
        </p>
      </div>
    </section>
  );
}
