import type {Metadata} from "next";
import Link from "next/link";
import {MetaLeadEvent} from "@/components/MetaLeadEvent";

export const metadata:Metadata={
  title:"Candidatura ricevuta | PM Pro",
  description:"La tua candidatura a PM Pro è stata ricevuta.",
  robots:{index:false,follow:false},
};

export default function ThankYouPage(){
  return <main className="relative min-h-screen overflow-hidden bg-ink px-5 py-10 text-white sm:px-8 sm:py-16">
    <MetaLeadEvent/>
    <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,rgba(36,169,225,.18),transparent_65%)]"/>
    <div className="relative mx-auto max-w-5xl">
      <Link href="/" className="display inline-flex items-center gap-3 text-xl font-bold tracking-tight" aria-label="Torna alla home di PM Pro">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky text-ink">PM</span>
        <span>PM Pro <span className="text-sky">by Evolution Media</span></span>
      </Link>

      <section className="mt-12 text-center sm:mt-16">
        <p className="text-sm font-bold uppercase tracking-[.2em] text-sky">Invio completato</p>
        <h1 className="display mx-auto mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">Candidatura ricevuta.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">Prima di chiudere questa pagina, guarda il video qui sotto: contiene le informazioni importanti sui prossimi passaggi.</p>
      </section>

      <div className="glass mt-10 overflow-hidden rounded-3xl border border-white/10 p-2 shadow-2xl shadow-sky/10 sm:p-3">
        <video className="aspect-video w-full rounded-2xl bg-black" controls playsInline preload="metadata">
          <source src="/video/thank-you-pm-pro.mp4" type="video/mp4"/>
          Il tuo browser non supporta la riproduzione del video.
        </video>
      </div>

      <div className="mx-auto mt-8 max-w-2xl text-center">
        <p className="leading-7 text-muted">Il team analizzerà le informazioni inviate e ti ricontatterà se ci sono i presupposti per un confronto.</p>
        <Link href="/" className="mt-7 inline-flex text-sm font-bold text-sky hover:underline">Torna al sito PM Pro</Link>
        <div className="mt-8 flex justify-center gap-5 text-xs text-muted">
          <a href="https://www.iubenda.com/privacy-policy/39457603" className="iubenda-white iubenda-noiframe iubenda-embed hover:text-white" title="Privacy Policy">Privacy Policy</a>
          <a href="https://www.iubenda.com/privacy-policy/39457603/cookie-policy" className="iubenda-white iubenda-noiframe iubenda-embed hover:text-white" title="Cookie Policy">Cookie Policy</a>
        </div>
      </div>
    </div>
  </main>;
}
