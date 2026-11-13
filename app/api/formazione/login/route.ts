import {NextResponse} from "next/server";
import {
  createTrainingSession,
  TRAINING_COOKIE,
  trainingCookieOptions,
  trainingIsConfigured,
  validTrainingCredentials,
} from "@/lib/training-auth";

export async function POST(request: Request) {
  if (!trainingIsConfigured()) {
    return NextResponse.json(
      {ok: false, error: "Area formazione non ancora configurata."},
      {status: 503},
    );
  }

  let body: {email?: string; password?: string};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ok: false, error: "Richiesta non valida."}, {status: 400});
  }

  if (
    typeof body.email !== "string" ||
    typeof body.password !== "string" ||
    !validTrainingCredentials(body.email, body.password)
  ) {
    return NextResponse.json(
      {ok: false, error: "Email o password non corretti."},
      {status: 401},
    );
  }

  const response = NextResponse.json({ok: true});
  response.cookies.set(
    TRAINING_COOKIE,
    createTrainingSession(body.email),
    trainingCookieOptions,
  );
  return response;
}
