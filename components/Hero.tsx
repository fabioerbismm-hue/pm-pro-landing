"use client";

import {Check,Play,Volume2} from "lucide-react";
import {useEffect,useRef,useState} from "react";
import {track} from "./Tracking";

export default function Hero(){
  const videoRef=useRef<HTMLVideoElement>(null);
  const[muted,setMuted]=useState(false);
  const[showAudioButton,setShowAudioButton]=useState(false);

  useEffect(()=>{
    const video=videoRef.current;
    if(!video)return;
    video.muted=false;
    video.play().then(()=>setShowAudioButton(false)).catch(()=>{
      video.muted=true;
      setMuted(true);
      setShowAudioButton(true);
      void video.play();
    });
    const silenceOnScroll=()=>{
      video.muted=true;
      setMuted(true);
      setShowAudioButton(false);
      window.removeEventListener("scroll",silenceOnScroll);
    };
    window.addEventListener("scroll",silenceOnScroll,{passive:true});
    return()=>window.removeEventListener("scroll",silenceOnScroll);
  },[]);

  async function enableAudio(){
    const video=videoRef.current;
    if(!video)return;
    video.muted=false;
    setMuted(false);
    setShowAudioButton(false);
    await video.play();
  }

  return <section id="top" className="relative flex min-h-screen items-center overflow-hidden pt-20"><div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_40%,rgba(41,169,236,.25),transparent_30%),linear-gradient(110deg,#041126_35%,#071a32)]"/><div className="container relative z-10 grid items-center gap-12 py-20 lg:grid-cols-[1.2fr_.8fr]"><div><div className="mb-6 flex flex-wrap items-center gap-3"><p className="eyebrow">PER PROPERTY MANAGER GIÀ OPERATIVI</p><span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-muted">PM Pro by Evolution Media</span></div><h1 className="display max-w-4xl text-5xl font-bold leading-[.98] sm:text-7xl lg:text-8xl">Non altri lead.<br/><span className="text-emerald-400">Appuntamenti qualificati.</span></h1><p className="mt-7 max-w-2xl text-lg leading-8 text-muted"><span className="block">Troviamo proprietari, li contattiamo e verifichiamo se esistono le condizioni per parlare.</span><span className="mt-2 block">Tu intervieni sulla conversazione, non sul file Excel.</span></p><div className="mt-7 flex flex-wrap gap-3 text-sm">{["Primo contatto gestito","Requisiti verificati","Contesto già raccolto"].map(x=><span key={x} className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-emerald-100"><Check size={16} className="text-emerald-400"/>{x}</span>)}</div><div className="mt-9 flex flex-col gap-3 sm:flex-row"><a className="btn btn-primary" href="#candidatura" onClick={()=>track("hero_cta_click")}>Verifica la tua struttura</a><a className="btn btn-ghost" href="#processo"><Play size={17}/>Come funziona</a></div></div><div className="relative mx-auto w-full max-w-sm"><div className="absolute -inset-5 rounded-[2.5rem] bg-sky/15 blur-2xl"/><div className="glass relative overflow-hidden rounded-[2rem] border-sky/30"><div className="relative aspect-[9/16] bg-black"><video ref={videoRef} className="h-full w-full object-cover" controls autoPlay muted={muted} loop playsInline preload="metadata" aria-label="Luca Ciovati presenta PM Pro"><source src="/video/luca-ciovati.mp4" type="video/mp4"/>Il tuo browser non supporta la riproduzione video.</video>{showAudioButton&&<button type="button" onClick={enableAudio} className="absolute inset-0 m-auto flex h-16 w-44 items-center justify-center gap-2 rounded-full bg-emerald-400 font-extrabold text-ink shadow-2xl"><Volume2 size={21}/>Attiva audio</button>}</div><div className="pointer-events-none absolute inset-x-4 bottom-14 rounded-2xl border border-white/15 bg-ink/85 p-4 backdrop-blur"><p className="text-xs font-bold uppercase tracking-[.14em] text-emerald-400">LO HAI VISTO NELL’AD</p><p className="display mt-1 text-2xl font-bold">Luca Ciovati</p><p className="text-sm text-muted">Co-founder PM Pro · Property manager</p></div></div></div></div></section>;
}
