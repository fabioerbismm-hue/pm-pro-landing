"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { track } from "./Tracking";

const links = [["Il problema", "#problema"], ["Come funziona", "#processo"], ["I founder", "#founder"], ["Candidatura", "#candidatura"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <>
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/75 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between">
        <a href="#top" aria-label="PM Pro, torna in alto" className="flex items-center gap-3">
          <Image src="/images/logo-pm-pro.jpg" alt="PM Pro" width={52} height={52} className="rounded-full" priority />
          <span className="hidden leading-tight sm:block"><strong className="block text-sm">PM Pro</strong><span className="text-[10px] uppercase tracking-[.13em] text-muted">by Evolution Media Group</span></span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => <a key={href} href={href} className="text-sm text-muted hover:text-white">{label}</a>)}
          <a href="#candidatura" onClick={() => track("hero_cta_click", { position: "navbar" })} className="btn btn-primary text-sm">Verifica la tua struttura</a>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Apri menu">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="container grid gap-5 border-t border-white/10 py-6 md:hidden">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</nav>}
    </header>
    <a href="#candidatura" className="btn btn-primary fixed bottom-4 left-4 right-4 z-40 md:hidden">Verifica la tua struttura</a>
  </>;
}
