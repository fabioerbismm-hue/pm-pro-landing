import {NextResponse} from "next/server";
import {TRAINING_COOKIE} from "@/lib/training-auth";

export async function POST(request: Request) {
  const publicOrigin =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    new URL(request.url).origin.replace("http://0.0.0.0:3000", "https://pmproitalia.com");
  const response = NextResponse.redirect(`${publicOrigin}/formazione/login`, 303);
  response.cookies.set(TRAINING_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
