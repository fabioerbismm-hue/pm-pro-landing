import {createHmac, timingSafeEqual} from "node:crypto";

export const TRAINING_COOKIE = "pmpro_training_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

function secret() {
  return process.env.TRAINING_SESSION_SECRET || "";
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const first = Buffer.from(a);
  const second = Buffer.from(b);
  return first.length === second.length && timingSafeEqual(first, second);
}

export function trainingIsConfigured() {
  return Boolean(
    process.env.TRAINING_SESSION_SECRET &&
      ((process.env.TRAINING_EMAIL && process.env.TRAINING_PASSWORD) ||
        process.env.TRAINING_ADMIN_PASSWORD),
  );
}

export function createTrainingAccessCode(email: string) {
  if (!secret()) return "";
  const compact = createHmac("sha256", secret())
    .update(`credential:${email.trim().toLowerCase()}`)
    .digest("base64url")
    .slice(0, 12)
    .toUpperCase();
  return `PM-${compact.slice(0, 4)}-${compact.slice(4, 8)}-${compact.slice(8, 12)}`;
}

export function validTrainingCredentials(email: string, password: string) {
  if (!trainingIsConfigured()) return false;
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim().toUpperCase();
  const generatedCredential = safeEqual(
    normalizedPassword,
    createTrainingAccessCode(normalizedEmail),
  );
  const legacyCredential = Boolean(
    process.env.TRAINING_EMAIL &&
      process.env.TRAINING_PASSWORD &&
      safeEqual(normalizedEmail, process.env.TRAINING_EMAIL.trim().toLowerCase()) &&
      safeEqual(password, process.env.TRAINING_PASSWORD),
  );
  return generatedCredential || legacyCredential;
}

export function validTrainingAdminPassword(password: string) {
  return Boolean(
    process.env.TRAINING_ADMIN_PASSWORD &&
      safeEqual(password, process.env.TRAINING_ADMIN_PASSWORD),
  );
}

export function createTrainingSession(email: string) {
  const payload = Buffer.from(
    JSON.stringify({email: email.trim().toLowerCase(), exp: Date.now() + SESSION_DURATION_SECONDS * 1000}),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyTrainingSession(value?: string) {
  if (!value || !trainingIsConfigured()) return false;
  const [payload, signature] = value.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return false;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      email?: string;
      exp?: number;
    };
    return (
      typeof session.exp === "number" &&
      session.exp > Date.now() &&
      typeof session.email === "string" &&
      session.email.includes("@")
    );
  } catch {
    return false;
  }
}

export const trainingCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_DURATION_SECONDS,
};
