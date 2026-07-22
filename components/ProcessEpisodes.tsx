import {ArrowRight,CalendarCheck2,ClipboardList,MessagesSquare,MousePointerClick} from "lucide-react";

const episodes=[
  {n:"01",t:"Intercettiamo",d:"Campagne costruite per raggiungere proprietari interessati a delegare la gestione.",icon:MousePointerClick},
  {n:"02",t:"Raccogliamo",d:"Acquisiamo il contesto: immobile, necessità, tempi e situazione del proprietario.",icon:ClipboardList},
  {n:"03",t:"Qualifichiamo",d:"Il team approfondisce interesse, disponibilità e requisiti concordati con te.",icon:MessagesSquare},
  {n:"04",t:"Fissiamo",d:"Solo quando esistono condizioni coerenti organizziamo il confronto con te.",icon:CalendarCheck2},
];

export default function ProcessEpisodes(){return <section id="processo" className="section"><div className="container"><p className="eyebrow">IL PROCESSO</p><h2 className="display mt-4 max-w-3xl text-5xl font-bold sm:text-7xl">Dal click all’appuntamento. Senza saltare i passaggi.</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-muted">Un percorso visibile e ordinato: il tuo tempo entra in gioco solo dopo contatto, raccolta delle informazioni e qualifica.</p><div className="mt-14 grid gap-4 lg:grid-cols-4">{episodes.map((e,i)=>{const Icon=e.icon;return <div key={e.n} className="relative"><article className="glass h-full rounded-3xl p-7 transition hover:-translate-y-1 hover:border-sky/40"><div className="flex items-center justify-between"><span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky/15 text-sky"><Icon size={27}/></span><span className="display text-4xl font-bold text-white/10">{e.n}</span></div><h3 className="display mt-8 text-2xl font-bold">{e.t}</h3><p className="mt-3 leading-7 text-muted">{e.d}</p></article>{i<episodes.length-1&&<ArrowRight className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 text-emerald-400 lg:block"/>}</div>})}</div></div></section>}
