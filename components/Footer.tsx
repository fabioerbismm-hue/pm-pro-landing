import Image from "next/image";
import { site } from "@/config/site";

export default function Footer() {
  return <footer className="border-t border-white/10 bg-[#020b18] py-12"><div className="container">
    <div className="flex flex-col justify-between gap-8 sm:flex-row">
      <div className="flex items-center gap-4">
        <Image src="/images/logo-pm-pro.jpg" alt="PM Pro" width={64} height={64} className="h-16 rounded-full" />
        <div><p className="font-bold">PM Pro</p><a href="https://evolutionmediagroups.com/evolution-media" target="_blank" rel="noreferrer" className="text-xs text-muted hover:text-white">by Evolution Media Group</a></div>
      </div>
      <div className="flex flex-wrap gap-5 text-sm text-muted"><a href="/privacy">Privacy Policy</a><a href="/cookie">Cookie Policy</a><a href="/termini">Termini</a></div>
    </div>
    <p className="mt-8 max-w-4xl text-xs leading-5 text-muted">I risultati possono variare in base al territorio, alla struttura, al budget, all’offerta commerciale, alla velocità di gestione e alle condizioni del mercato. PM Pro non garantisce un numero prestabilito di immobili, proprietari o appuntamenti.</p>
    <p className="mt-5 text-xs text-muted">© {new Date().getFullYear()} {site.name}. Tutti i diritti riservati.</p>
  </div></footer>;
}
