import type {Metadata} from "next";
import Link from "next/link";
import {TrainingCredentialGenerator} from "@/components/TrainingCredentialGenerator";

export const metadata: Metadata = {
  title: "Gestione accessi | PM Pro Academy",
  robots: {index: false, follow: false},
};

export default function TrainingAdminPage() {
  return (
    <main className="min-h-screen bg-ink px-5 py-10 text-white sm:px-8 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="display text-xl font-bold">PM Pro <span className="text-sky">Academy</span></Link>
          <Link href="/formazione/login" className="text-sm font-bold text-muted hover:text-white">Pagina di accesso</Link>
        </div>
        <section className="mt-12">
          <p className="eyebrow">AMMINISTRAZIONE</p>
          <h1 className="display mt-3 text-4xl font-bold sm:text-6xl">Gestisci gli accessi.</h1>
          <p className="mt-5 max-w-2xl leading-7 text-muted">Genera tutte le credenziali che ti servono. Lo stesso indirizzo email produrrà sempre lo stesso codice personale.</p>
          <TrainingCredentialGenerator/>
        </section>
      </div>
    </main>
  );
}
