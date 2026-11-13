import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {Suspense} from "react";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {TrainingLoginForm} from "@/components/TrainingLoginForm";
import {TRAINING_COOKIE, verifyTrainingSession} from "@/lib/training-auth";

export const metadata: Metadata = {
  title: "Accesso formazione | PM Pro",
  description: "Area riservata alla formazione PM Pro.",
  robots: {index: false, follow: false},
};

export default async function TrainingLoginPage() {
  const cookieStore = await cookies();
  if (verifyTrainingSession(cookieStore.get(TRAINING_COOKIE)?.value)) redirect("/formazione");

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-ink px-5 py-12 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(41,169,236,.2),transparent_42%),radial-gradient(circle_at_100%_100%,rgba(52,211,153,.1),transparent_35%)]" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mx-auto flex w-fit items-center gap-3" aria-label="Vai al sito PM Pro">
          <Image src="/images/logo-pm-pro.jpg" alt="PM Pro" width={46} height={46} className="rounded-full" />
          <span className="display text-xl font-bold">PM Pro <span className="text-sky">Academy</span></span>
        </Link>
        <section className="glass mt-8 rounded-[2rem] p-7 sm:p-9">
          <p className="eyebrow">AREA RISERVATA</p>
          <h1 className="display mt-3 text-4xl font-bold">Accedi alla formazione.</h1>
          <p className="mt-4 leading-7 text-muted">Inserisci le credenziali ricevute dal team PM Pro per continuare.</p>
          <Suspense fallback={<p className="mt-8 text-sm text-muted">Caricamento…</p>}>
            <TrainingLoginForm />
          </Suspense>
        </section>
        <p className="mt-6 text-center text-xs text-muted">Contenuti riservati ai clienti PM Pro.</p>
      </div>
    </main>
  );
}
