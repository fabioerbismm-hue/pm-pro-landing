import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Footer from "@/components/Footer";

const bookingUrl =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ153nt7BUGM_P6iAaVU8o_qDW-n17y1kXpUSWo1wEKN_WMvUcszQksIAtIBpBwnet914HhjEqTi";

export const metadata: Metadata = {
  title: "Prenota un appuntamento | PM Pro",
  description: "Scegli quando incontrare il team di PM Pro e prenota il tuo appuntamento.",
};

export default function BookingPage() {
  return (
    <>
      <header className="border-b border-white/10 bg-ink">
        <div className="container flex min-h-20 items-center">
          <Link href="/" aria-label="PM Pro, torna alla home" className="inline-flex items-center gap-3">
            <Image src="/images/logo-pm-pro.jpg" alt="" width={48} height={48} className="rounded-full" />
            <span>
              <strong className="block text-sm">PM Pro</strong>
              <span className="text-xs text-muted">by Evolution Media Group</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="bg-[radial-gradient(ellipse_at_top,rgba(25,133,199,.18),transparent_65%)] py-10 sm:py-16">
        <div className="container max-w-5xl">
          <div className="mx-auto mb-7 max-w-2xl text-center sm:mb-10">
            <h1 className="display text-4xl font-bold leading-tight sm:text-6xl">Prenota un appuntamento</h1>
            <p className="mt-4 leading-7 text-muted">
              Scegli una data e un orario disponibili per parlare con il team di PM Pro.
            </p>
          </div>

          <div className="glass overflow-hidden rounded-2xl p-1.5 sm:rounded-3xl sm:p-2">
            <iframe
              src={`${bookingUrl}?gv=true`}
              title="Calendario per prenotare un appuntamento con PM Pro"
              width="100%"
              height={600}
              className="block h-[700px] w-full rounded-xl border-0 bg-white [color-scheme:light] sm:h-[640px] sm:rounded-2xl"
            />
          </div>

          <div className="mt-5 text-center">
            <a href={bookingUrl} className="inline-flex items-center gap-2 text-sm font-bold text-sky hover:underline">
              Apri la prenotazione su Google Calendar <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
