import {NextResponse} from "next/server";
import {TRAINING_COOKIE} from "@/lib/training-auth";

export async function POST() {
  const response = NextResponse.redirect(
    "https://pmproitalia.com/formazione/login",
    303,
  );
  response.cookies.set(TRAINING_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return response;
}
