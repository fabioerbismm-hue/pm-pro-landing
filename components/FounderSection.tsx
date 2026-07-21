export default function FounderSection() {
  return (
    <section id="luca" className="section">
      <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div className="relative aspect-[9/16] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_30px_80px_rgba(0,0,0,.35)]">
          <video
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
            aria-label="Luca Ciovati racconta PM Pro"
          >
            <source src="/video/luca-ciovati.mp4" type="video/mp4" />
            Il tuo browser non supporta la riproduzione video.
          </video>
        </div>

        <div>
          <p className="eyebrow">COSTRUITO DA UN PROPERTY MANAGER</p>
          <h2 className="display mt-4 text-5xl font-bold sm:text-6xl">
            Luca conosce il problema perché non lo ha studiato da fuori.
          </h2>
          <div className="mt-7 space-y-5 text-lg leading-8 text-muted">
            <p>PM Pro nasce dall’esperienza sul campo di Luca Ciovati.</p>
            <p>
              Gestire immobili, proprietari, ospiti e collaboratori è una parte del lavoro. L’altra,
              spesso più trascurata, è costruire un flusso costante di nuovi immobili da valutare.
            </p>
            <p>
              È da questa esigenza che nasce PM Pro: non dall’idea di vendere pubblicità ai property
              manager, ma dalla necessità di costruire un processo di acquisizione più serio per chi
              opera già nel settore.
            </p>
          </div>
          <blockquote className="mt-8 border-l-2 border-gold pl-6">
            <p className="display text-2xl font-semibold">
              “Non volevo creare un altro servizio che consegnasse lead. Volevo costruire il passaggio
              che manca tra una campagna e un vero appuntamento.”
            </p>
            <footer className="mt-4 text-sm text-gold">Luca Ciovati · Founder PM Pro</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
