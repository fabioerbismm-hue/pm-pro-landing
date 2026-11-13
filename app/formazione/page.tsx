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
  {id:"cb4196f1739a437195f4304283e6434e",module:"Modulo 9 · La trattativa",title:"La trattativa con il proprietario — Parte 1",duration:"42 min"},
  {id:"e35ac28d7c734f24bc4d9327e8951b54",module:"Modulo 9 · La trattativa",title:"La trattativa con il proprietario — Parte 2",duration:"21 min"},
  {id:"81ba36bb70814b23919219c1452dab75",module:"Modulo 10 · Condominio e affitti brevi",title:"Condominio e affitti brevi — Parte 1",duration:"29 min"},
  {id:"1ffa2aa1ed4147728494cd58665af95d",module:"Modulo 10 · Condominio e affitti brevi",title:"Condominio e affitti brevi — Parte 2",duration:"18 min"},
  {id:"972625812cae46d39f4fcb2e383b69df",module:"Modulo 10 · Condominio e affitti brevi",title:"Condominio e affitti brevi — Parte 3",duration:"10 min"},
  {id:"099f5dfeac714610bad70207bee0d979",module:"Modulo 11",title:"Sopralluogo e due diligence",duration:"1 h 11 min"},
  {id:"f1cc6ce6e5724f4d8e07c1c360398e35",module:"Modulo 12",title:"Da appartamento vergine a prodotto per affitti brevi",duration:"55 min"},
  {id:"aa408e6f454c4c48bc45f7f042c7b5f8",module:"Modulo 13 · OTA",title:"Airbnb e Booking — Parte 1",duration:"Durata non disponibile"},
  {id:"6fe9c55b082440a6b6f748a6851e5aac",module:"Modulo 13 · OTA",title:"Airbnb e Booking — Parte 2",duration:"15 min"},
  {id:"a0e1f9251e024a4ea2c27c89db566c2a",module:"Modulo 14 · Channel manager",title:"Channel manager — Parte 1",duration:"Durata non disponibile"},
  {id:"a4ce5cbc3f5b41c69163ead1796a3be6",module:"Modulo 14 · Channel manager",title:"Channel manager — Parte 2",duration:"29 min"},
  {id:"fe2cb31c5bd5464a914daa58c6de4ada",module:"Modulo 15 · Gestione operativa",title:"Gestione operativa e customer experience — Parte 1",duration:"28 min"},
  {id:"ff72eda9c46e49599a5d7d77ea630bf",module:"Modulo 15 · Gestione operativa",title:"Gestione operativa e customer experience — Parte 2",duration:"Durata non disponibile"},
  {id:"44f4177193da4d209fc92a35bee604d0",module:"Modulo 16",title:"Controllo economico e KPI per affitti brevi + esercizio pratico",duration:"49 min"},
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
