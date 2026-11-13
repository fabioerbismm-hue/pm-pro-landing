"use client";

import {useEffect, useMemo, useState} from "react";
import {Check, ChevronRight, Clock3, Play} from "lucide-react";

export type Lesson = {
  id: string;
  module: string;
  title: string;
  duration: string;
};

const STORAGE_KEY = "pmpro-academy-completed";

export function TrainingLibrary({lessons}: {lessons: Lesson[]}) {
  const [activeId, setActiveId] = useState(lessons[0]?.id || "");
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) setCompleted(saved.filter((value): value is string => typeof value === "string"));
    } catch {}
  }, []);

  const active = lessons.find(lesson => lesson.id === activeId) || lessons[0];
  const progress = Math.round((completed.length / lessons.length) * 100);
  const grouped = useMemo(() => {
    return lessons.reduce<Record<string, Lesson[]>>((result, lesson) => {
      (result[lesson.module] ||= []).push(lesson);
      return result;
    }, {});
  }, [lessons]);

  function toggleCompleted(id: string) {
    setCompleted(current => {
      const next = current.includes(id) ? current.filter(value => value !== id) : [...current, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return (
    <div className="mt-10 grid gap-7 lg:grid-cols-[minmax(0,1.65fr)_minmax(310px,.75fr)]">
      <section className="min-w-0">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-sky/10">
          <iframe
            key={active.id}
            src={`https://www.loom.com/embed/${active.id}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`}
            title={active.title}
            className="aspect-video w-full"
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
          />
        </div>
        <div className="mt-6 flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[.035] p-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-emerald-400">{active.module}</p>
            <h2 className="display mt-2 text-2xl font-bold sm:text-3xl">{active.title}</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted"><Clock3 size={16}/>{active.duration}</p>
          </div>
          <button
            onClick={() => toggleCompleted(active.id)}
            className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition ${completed.includes(active.id) ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-300" : "border-white/15 hover:border-sky/50"}`}
          >
            <Check size={17}/>{completed.includes(active.id) ? "Completata" : "Segna completata"}
          </button>
        </div>
      </section>

      <aside className="lg:max-h-[calc(100vh-150px)] lg:overflow-y-auto lg:pr-2">
        <div className="mb-5 rounded-2xl border border-white/10 bg-white/[.04] p-5">
          <div className="flex items-center justify-between text-sm"><span className="font-bold">Il tuo percorso</span><span className="text-emerald-400">{completed.length}/{lessons.length}</span></div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-400 transition-all" style={{width: `${progress}%`}}/></div>
        </div>
        <div className="space-y-6">
          {Object.entries(grouped).map(([module, moduleLessons]) => (
            <section key={module}>
              <h3 className="mb-2 px-2 text-xs font-extrabold uppercase tracking-[.16em] text-muted">{module}</h3>
              <div className="space-y-2">
                {moduleLessons.map((lesson, index) => {
                  const isActive = lesson.id === active.id;
                  const isCompleted = completed.includes(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {setActiveId(lesson.id); window.scrollTo({top: 0, behavior: "smooth"});}}
                      className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${isActive ? "border-sky/50 bg-sky/10" : "border-white/[.07] bg-white/[.025] hover:border-white/20"}`}
                    >
                      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${isCompleted ? "bg-emerald-400/15 text-emerald-300" : isActive ? "bg-sky text-white" : "bg-white/[.06] text-muted"}`}>
                        {isCompleted ? <Check size={18}/> : <Play size={16} fill="currentColor"/>}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-2 text-sm font-bold leading-5">{moduleLessons.length > 1 ? `${index + 1}. ` : ""}{lesson.title}</span>
                        <span className="mt-1 block text-xs text-muted">{lesson.duration}</span>
                      </span>
                      <ChevronRight size={17} className="shrink-0 text-white/25"/>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </aside>
    </div>
  );
}
