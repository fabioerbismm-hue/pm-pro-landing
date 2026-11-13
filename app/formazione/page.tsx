import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {TrainingLibrary, type Lesson} from "@/components/TrainingLibrary";
import {TRAINING_COOKIE, verifyTrainingSession} from "@/lib/training-auth";

export const metadata: Metadata = {
  title: "PM Pro Academy | Area formazione",
  description: "Percorso di formazione riservato ai clienti PM Pro.",
  robots: {index: false, follow: false},
};

const lessons: Lesson[] = [
  {id:"d0fcbd18e10d418cad0ec6c4f2cdefec",module:"Modulo 2 · Le basi del business",title:"Le basi del business — Parte 1",duration:"30 min"},
  {id:"18252e0c168b42ffb95dc25bfcf35c78",module:"Modulo 2 · Le basi del business",title:"Le basi del business — Parte 2",duration:"28 min"},
  {id:"669b10aa89ec44948312e8ab5599bfae",module:"Modulo 3",title:"Fiscalità",duration:"1 h 1 min"},
  {id:"ed43d20cfed34ad69b41f0894917b31c",module:"Modulo 4",title:"Burocrazia e normativa",duration:"51 min"},
  {id:"6e211493b0b04fc2a61e610a6a6edbf9",module:"Modulo 5 · L’immobile",title:"L’immobile perfetto non esiste — Parte 1",duration:"29 min"},
  {id:"5cdc51f9d7bb4ea491fc4fc2499d4159",module:"Modulo 5 · L’immobile",title:"L’immobile perfetto non esiste — Parte 2",duration:"50 min"},
  {id:"8ef355c3e97b4fa182b0b4f92d9ff083",module:"Modulo 5 · L’immobile",title:"Marketing di struttura e marketing di territorio",duration:"2 min"},
  {id:"4da45420ac0a45e68b1bf6689c662ddf",module:"Modulo 5 · L’immobile",title:"Caso studio: da negozio ad abitazione da 4K lordi/mese",duration:"5 min"},
  {id:"4e09310feb164baf89b91d58f2b6611b",module:"Modulo 6",title:"Analisi tecnica del mercato e della zona + AirDNA",duration:"54 min"},
  {id:"3639997c0c3640babc078b2a0f04a050",module:"Modulo 7 · Numeri e redditività",title:"Numeri e caso redditività — Parte 1",duration:"13 min"},
  {id:"0f183979692742a1bb6d0dfbce791cbf",module:"Modulo 7 · Numeri e redditività",title:"Numeri e caso redditività — Parte 2",duration:"43 min"},
  {id:"0ab4b17a96dd49b0aaf6734866f83181",module:"Modulo 8",title:"Canali per acquisire immobili — Parte 1",duration:"38 min"},
  {id:"184fc6470bbf41a681c869d3a694209d",module:"Modulo 8",title:"Canali per acquisire immobili — Parte 2",duration:"20 min"},
];

export default async function TrainingPage() {
  const cookieStore = await cookies();
  if (!verifyTrainingSession(cookieStore.get(TRAINING_COOKIE)?.value)) {
    redirect("/formazione/login?next=/formazione");
  }

  return (
    <main className="min-h-screen bg-ink text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 backdrop-blur-xl">
        <div className="container flex min-h-20 items-center justify-between gap-4">
          <Link href="/formazione" className="flex items-center gap-3">
            <Image src="/images/logo-pm-pro.jpg" alt="PM Pro" width={42} height={42} className="rounded-full" priority/>
            <span className="display font-bold">PM Pro <span className="text-sky">Academy</span></span>
          </Link>
          <form action="/api/formazione/logout" method="post">
            <button className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-muted transition hover:border-white/30 hover:text-white">Esci</button>
          </form>
        </div>
      </header>
      <div className="container py-10 sm:py-14">
        <p className="eyebrow">PERCORSO RISERVATO</p>
        <h1 className="display mt-3 max-w-3xl text-4xl font-bold sm:text-6xl">La formazione operativa di PM Pro.</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">Segui le lezioni in ordine, applica ogni passaggio e torna qui quando vuoi: i progressi restano salvati su questo dispositivo.</p>
        <TrainingLibrary lessons={lessons}/>
      </div>
    </main>
  );
}
