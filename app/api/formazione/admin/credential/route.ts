import {NextResponse} from "next/server";
import {
  createTrainingAccessCode,
  trainingIsConfigured,
  validTrainingAdminPassword,
} from "@/lib/training-auth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const attempts = new Map<string, {count: number; reset: number}>();

export async function POST(request: Request) {
  if (!trainingIsConfigured() || !process.env.TRAINING_ADMIN_PASSWORD) {
    return NextResponse.json({ok: false, error: "Generatore non configurato."}, {status: 503});
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const now = Date.now();
  const current = attempts.get(ip);
  if (current && current.reset > now && current.count >= 10) {
    return NextResponse.json({ok: false, error: "Troppi tentativi. Riprova più tardi."}, {status: 429});
  }
  attempts.set(ip, {
    count: current && current.reset > now ? current.count + 1 : 1,
    reset: current && current.reset > now ? current.reset : now + 15 * 60 * 1000,
  });

  let body: {adminPassword?: string; email?: string};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ok: false, error: "Richiesta non valida."}, {status: 400});
  }

  const email = body.email?.trim().toLowerCase() || "";
  if (!body.adminPassword || !validTrainingAdminPassword(body.adminPassword)) {
    return NextResponse.json({ok: false, error: "Password amministratore non corretta."}, {status: 401});
  }
  if (!emailPattern.test(email)) {
    return NextResponse.json({ok: false, error: "Inserisci un’email valida."}, {status: 400});
  }

  return NextResponse.json({ok: true, email, accessCode: createTrainingAccessCode(email)});
}
