"use client";

import { ArrowDown, Play } from "lucide-react";
import { track } from "./Tracking";

export default function Hero() {
  return <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-20">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_35%,rgba(41,169,236,.20),transparent_35%),linear-gradient(110deg,#041126_35%,rgba(4,17,38,.78))]" />
    <div className="absolute right-[8%] top-[21%] h-80 w-80 rounded-full border border-sky/20 opacity-70 shadow-[0_0_100px_rgba(41,169,236,.14)]" />
    <div className="container relative z-10 py-24">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <p className="eyebrow">PER PROPERTY MANAGER GIÀ OPERATIVI</p>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-muted">PM Pro by Evolution Media Group</span>
      </div>
      <h1 className="display max-w-4xl text-5xl font-bold leading-[.98] sm:text-7xl lg:text-8xl">Non ti servono altri lead.<br />Ti servono <span className="bg-gradient-to-r from-sky to-blue bg-clip-text text-transparent">appuntamenti</span> che abbiano senso.</h1>
      <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">PM Pro intercetta, contatta e qualifica proprietari potenzialmente interessati alla gestione professionale. Tu entri quando esiste una conversazione concreta da affrontare.</p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a className="btn btn-primary" href="#candidatura" onClick={() => track("hero_cta_click")}>Verifica se PM Pro è adatto a te</a><a className="btn btn-ghost" href="#processo"><Play size={17} />Guarda come funziona</a></div>
      <p className="mt-4 text-sm text-muted">Non vendiamo database. Valutiamo prima la compatibilità con la tua struttura.</p>
    </div>
    <a href="#problema" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce text-muted sm:block" aria-label="Scorri alla sezione successiva"><ArrowDown /></a>
  </section>;
}
