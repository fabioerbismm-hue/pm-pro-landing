"use client";

import {FormEvent, useState} from "react";
import {Check, Copy, KeyRound} from "lucide-react";

type Credential = {email: string; accessCode: string};

export function TrainingCredentialGenerator() {
  const [credential, setCredential] = useState<Credential | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setCredential(null);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/formazione/admin/credential", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email: form.get("email"), adminPassword: form.get("adminPassword")}),
      });
      const result = await response.json() as {ok?: boolean; error?: string; email?: string; accessCode?: string};
      if (!response.ok || !result.ok || !result.email || !result.accessCode) throw new Error(result.error || "Generazione non riuscita.");
      setCredential({email: result.email, accessCode: result.accessCode});
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Generazione non riuscita.");
    } finally {
      setLoading(false);
    }
  }

  async function copyCredential() {
    if (!credential) return;
    await navigator.clipboard.writeText(`Accesso PM Pro Academy\nhttps://pmproitalia.com/formazione/login\nEmail: ${credential.email}\nCodice: ${credential.accessCode}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <form onSubmit={submit} className="glass rounded-3xl p-6 sm:p-8">
        <h2 className="display text-2xl font-bold">Genera un nuovo accesso</h2>
        <p className="mt-2 text-sm leading-6 text-muted">Ogni corsista riceve un codice personale legato alla propria email.</p>
        <label className="mt-6 block">
          <span className="mb-2 block text-sm font-bold">Email del corsista</span>
          <input name="email" type="email" required className="w-full rounded-2xl border border-white/15 bg-white/[.06] px-4 py-3.5" placeholder="corsista@email.it"/>
        </label>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-bold">Password amministratore</span>
          <input name="adminPassword" type="password" required autoComplete="current-password" className="w-full rounded-2xl border border-white/15 bg-white/[.06] px-4 py-3.5"/>
        </label>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>}
        <button disabled={loading} className="btn btn-primary mt-6 w-full disabled:opacity-60"><KeyRound size={18}/>{loading ? "Generazione…" : "Genera credenziali"}</button>
      </form>

      <section className="rounded-3xl border border-dashed border-white/15 bg-white/[.025] p-6 sm:p-8">
        <h2 className="display text-2xl font-bold">Credenziali da inviare</h2>
        {credential ? (
          <div className="mt-6">
            <div className="space-y-4 rounded-2xl border border-emerald-400/25 bg-emerald-400/[.07] p-5">
              <div><p className="text-xs font-bold uppercase tracking-wider text-muted">Email</p><p className="mt-1 break-all font-bold">{credential.email}</p></div>
              <div><p className="text-xs font-bold uppercase tracking-wider text-muted">Codice di accesso</p><p className="display mt-1 text-2xl font-bold tracking-wide text-emerald-300">{credential.accessCode}</p></div>
            </div>
            <button onClick={copyCredential} className="btn btn-ghost mt-4 w-full" type="button">{copied ? <Check size={18}/> : <Copy size={18}/>} {copied ? "Copiato" : "Copia messaggio"}</button>
          </div>
        ) : <p className="mt-6 leading-7 text-muted">Le credenziali appariranno qui. Potrai copiarle e inviarle direttamente al corsista.</p>}
      </section>
    </div>
  );
}
