import {NextResponse} from "next/server";
import {leadSchema} from "@/config/form";
import {createHash, randomUUID} from "node:crypto";

const DEFAULT_LEAD_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbzFpvy-OsiZ9iLReKUFXtZOXifz2yNV9KCVYXPcEfYwJjqjz_LmUNwkO5OqghAhr84/exec";

const hits = new Map<string, {count: number; reset: number}>();

const sha256 = (value: string) =>
  createHash("sha256").update(value.trim().toLowerCase()).digest("hex");

async function sendMetaLead({
  eventId,
  ip,
  userAgent,
  sourceUrl,
  lead,
  fbp,
  fbc,
}: {
  eventId: string;
  ip: string;
  userAgent: string;
  sourceUrl: string;
  lead: {firstName: string; lastName: string; email: string; phone: string};
  fbp?: string;
  fbc?: string;
}) {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!token) return;

  const pixelId = process.env.META_PIXEL_ID || "2483298032196925";
  const version = process.env.META_GRAPH_API_VERSION || "v23.0";
  const normalizedPhone = lead.phone.replace(/\D/g, "");
  const userData: Record<string, string | string[]> = {
    em: [sha256(lead.email)],
    ph: [sha256(normalizedPhone)],
    fn: [sha256(lead.firstName)],
    ln: [sha256(lead.lastName)],
    client_ip_address: ip,
    client_user_agent: userAgent,
  };
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const body: Record<string, unknown> = {
    data: [{
      event_name: "Lead",
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url: sourceUrl,
      action_source: "website",
      user_data: userData,
    }],
  };
  if (process.env.META_CAPI_TEST_EVENT_CODE) {
    body.test_event_code = process.env.META_CAPI_TEST_EVENT_CODE;
  }

  const response = await fetch(
    `https://graph.facebook.com/${version}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
    {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    },
  );
  if (!response.ok) throw new Error(`Meta CAPI error: ${response.status}`);
}

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

  const {companySite: _companySite, metaEventId, metaFbp, metaFbc, ...lead} =
    parsed.data;
  void _companySite;
  const eventId = metaEventId || randomUUID();
  const payload = {
    ...lead,
    submittedAt: new Date().toISOString(),
    ip,
  };
  const url = DEFAULT_LEAD_WEBHOOK_URL;

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
    const webhookResult = await response.json() as {ok?: boolean; error?: string};
    if (webhookResult.ok !== true) {
      throw new Error(webhookResult.error || "Webhook non riuscito");
    }

    try {
      await sendMetaLead({
        eventId,
        ip,
        userAgent: request.headers.get("user-agent") || "",
        sourceUrl: request.headers.get("origin") || "https://pmproitalia.com/",
        lead,
        fbp: metaFbp,
        fbc: metaFbc,
      });
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Meta CAPI error");
    }

    return NextResponse.json({ok: true, eventId});
  } catch {
    return NextResponse.json(
      {ok: false, error: "Servizio temporaneamente non disponibile"},
      {status: 502},
    );
  }
}
