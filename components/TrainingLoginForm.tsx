"use client";

import {FormEvent, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";

export function TrainingLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/formazione/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: form.get("email"), password: form.get("password")}),
      });
      const result = (await response.json()) as {ok?: boolean; error?: string};
      if (!response.ok || !result.ok) throw new Error(result.error || "Accesso non riuscito.");
      const next = searchParams.get("next");
      router.replace(next?.startsWith("/") ? next : "/formazione");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Accesso non riuscito.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-white/80">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full rounded-2xl border border-white/15 bg-white/[.06] px-4 py-3.5 text-white placeholder:text-white/30"
          placeholder="nome@email.it"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-bold text-white/80">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-2xl border border-white/15 bg-white/[.06] px-4 py-3.5 text-white placeholder:text-white/30"
          placeholder="Inserisci la password"
        />
      </label>
      {error && <p role="alert" className="rounded-xl bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}
      <button disabled={loading} className="btn btn-primary w-full disabled:cursor-wait disabled:opacity-60">
        {loading ? "Accesso in corso…" : "Accedi alla formazione"}
      </button>
    </form>
  );
}
