import {Check,X} from "lucide-react";

const generic=["Solo nome e numero","Nessuna verifica","Tutto il lavoro resta a te"];
const pro=["Proprietario già contattato","Requisiti e interesse verificati","Contesto pronto per la conversazione"];

export default function LeadComparison(){return <section id="problema" className="section bg-navy"><div className="container"><p className="eyebrow">CAPISCI LA DIFFERENZA IN 5 SECONDI</p><h2 className="display mt-4 max-w-4xl text-5xl font-bold sm:text-7xl">Un nominativo non è un appuntamento.</h2><div className="mt-10 grid gap-5 lg:grid-cols-2"><Card title="LEAD GENERICO" items={generic} bad/><Card title="APPUNTAMENTO PM PRO" items={pro}/></div></div></section>}

function Card({title,items,bad}:{title:string;items:string[];bad?:boolean}){return <article className={`rounded-3xl border p-7 sm:p-9 ${bad?"border-red-500/45 bg-red-950/30":"border-emerald-400/45 bg-emerald-950/30"}`}><p className={`text-xs font-extrabold tracking-[.18em] ${bad?"text-red-400":"text-emerald-400"}`}>{title}</p><ul className="mt-7 grid gap-5 text-lg">{items.map(x=><li className="flex gap-3" key={x}>{bad?<X className="shrink-0 text-red-400"/>:<Check className="shrink-0 text-emerald-400"/>}{x}</li>)}</ul></article>}
