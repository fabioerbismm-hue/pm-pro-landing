import {NextResponse} from "next/server";
import {leadSchema} from "@/config/form";

const DEFAULT_LEAD_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyE5OOWPVtf2D6e7_8piCMi_mZwBLPFacPEVLQrL6TB7WR00AR7Gy5c_WvUlhjvIkM/exec";

const hits = new Map<string, {count: number; reset: number}>();

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const now = Date.now();
  const hit = hits.get(ip);

  if (hit && hit.reset > now && hit.count >= 5) {
    return NextResponse.json(
      {ok: false, error: "Troppe richieste. Riprova più tardi."},
      {status: 429},
    );
  }

  hits.set(ip, {
    count: hit && hit.reset > now ? hit.count + 1 : 1,
    reset: hit && hit.reset > now ? hit.reset : now + 60_000,
  });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {ok: false, error: "Payload non valido"},
      {status: 400},
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Dati non validi",
        issues: parsed.error.flatten().fieldErrors,
      },
      {status: 400},
    );
  }

  if (parsed.data.companySite) return NextResponse.json({ok: true});

  const payload = {
    ...parsed.data,
    companySite: undefined,
    submittedAt: new Date().toISOString(),
    ip,
  };
  const url = process.env.LEAD_WEBHOOK_URL || DEFAULT_LEAD_WEBHOOK_URL;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEAD_WEBHOOK_SECRET
          ? {Authorization: `Bearer ${process.env.LEAD_WEBHOOK_SECRET}`}
          : {}),
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) throw new Error();
    return NextResponse.json({ok: true});
  } catch {
    return NextResponse.json(
      {ok: false, error: "Servizio temporaneamente non disponibile"},
      {status: 502},
    );
  }
}
