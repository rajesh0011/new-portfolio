import crypto from "crypto";
import { NextResponse } from "next/server";

const COOKIE = "rk_admin";
const TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function secret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "";
}

function hmac(value) {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}

export function isAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(input) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || typeof input !== "string") return false;
  const h = (s) => crypto.createHash("sha256").update(s).digest();
  return crypto.timingSafeEqual(h(input), h(pw));
}

function createToken() {
  const exp = String(Math.floor(Date.now() / 1000) + TTL_SECONDS);
  return `${exp}.${hmac(exp)}`;
}

function verifyToken(token) {
  if (!token || !secret()) return false;
  const [exp, sig] = String(token).split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Math.floor(Date.now() / 1000)) return false;
  return safeEqual(sig, hmac(exp));
}

export function isAdmin(request) {
  return verifyToken(request.cookies.get(COOKIE)?.value);
}

/** Returns a 401 response when not logged in, otherwise null. */
export function requireAdmin(request) {
  if (isAdmin(request)) return null;
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

const cookieBase = () => ({
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
  path: "/",
});

export function setAuthCookie(response) {
  response.cookies.set(COOKIE, createToken(), { ...cookieBase(), maxAge: TTL_SECONDS });
}

export function clearAuthCookie(response) {
  response.cookies.set(COOKIE, "", { ...cookieBase(), maxAge: 0 });
}
