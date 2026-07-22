import {Check,X} from "lucide-react";

const yes=["gestisci già immobili","hai una struttura operativa","puoi prendere in carico nuovi incarichi","conosci il valore di un mandato","vuoi ridurre la dipendenza dal passaparola","sei disposto a seguire seriamente gli appuntamenti"];
const no=["non hai ancora esperienza nella gestione","cerchi proprietari garantiti","vuoi solo un database","non hai capacità operativa","non puoi gestire le opportunità","consideri inutile ogni contatto non subito pronto"];

export default function QualificationSection(){return <section className="section"><div className="container"><p className="eyebrow">UNA SCELTA RECIPROCA</p><h2 className="display mt-4 text-5xl font-bold sm:text-7xl">PM Pro non è per tutti i property manager.</h2><div className="mt-12 grid gap-5 lg:grid-cols-2"><List title="Potrebbe essere adatto a te se" items={yes}/><List title="Non è adatto a te se" items={no} bad/></div><p className="display mt-10 text-center text-3xl font-semibold">Meglio dirlo prima di farti perdere tempo.</p></div></section>}

function List({title,items,bad}:{title:string;items:string[];bad?:boolean}){return <div className={`glass rounded-3xl p-7 ${bad?"border-red-500/35 bg-red-950/10":"border-emerald-400/35 bg-emerald-950/10"}`}><h3 className="display text-2xl font-bold">{title}</h3><ul className="mt-6 grid gap-4">{items.map(x=><li className="flex gap-3" key={x}>{bad?<X className="shrink-0 text-red-400"/>:<Check className="shrink-0 text-emerald-400"/>}{x}</li>)}</ul></div>}
