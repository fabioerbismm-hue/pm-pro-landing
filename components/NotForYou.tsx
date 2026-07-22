import {X} from "lucide-react";

const items=["file da centinaia di contatti","lead venduti contemporaneamente ad altri","persone da inseguire per settimane","appuntamenti fissati senza criteri","promesse di immobili garantiti","campagne lasciate senza controllo"];

export default function NotForYou(){return <section className="section bg-navy"><div className="container grid gap-10 lg:grid-cols-2 lg:items-center"><div><p className="eyebrow">COSA NON FACCIAMO</p><h2 className="display mt-4 text-5xl font-bold sm:text-6xl">Non siamo il servizio giusto se cerchi nomi da scaricare.</h2><p className="mt-6 text-lg text-muted">PM Pro lavora sulla qualità del processo, non sul volume da mostrare in un report.</p></div><ul className="glass grid gap-4 rounded-3xl border-red-500/35 bg-red-950/10 p-7">{items.map(x=><li key={x} className="flex gap-3 text-lg text-red-100/80 line-through decoration-red-500/80"><X className="shrink-0 text-red-400"/>{x}</li>)}</ul></div></section>}
