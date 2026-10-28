import { NextResponse } from "next/server";
import {
  checkPassword,
  clearAuthCookie,
  isAdmin,
  isAuthConfigured,
  setAuthCookie,
} from "@/lib/auth";
import { isDbConfigured } from "@/lib/mongodb";

export const runtime = "nodejs";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** GET - who am I? */
export async function GET(request) {
  return NextResponse.json(
    {
      ok: true,
      authenticated: isAdmin(request),
      authConfigured: isAuthConfigured(),
      dbConfigured: isDbConfigured(),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

/** POST - login with { password } */
export async function POST(request) {
  if (!isAuthConfigured()) {
    return NextResponse.json({ ok: false, error: "ADMIN_PASSWORD is not configured on the server" }, { status: 503 });
  }
  let body = {};
  try {
    body = await request.json();
  } catch {}

  if (!checkPassword(body?.password)) {
    await sleep(700); // slow down brute force attempts
    return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  setAuthCookie(res);
  return res;
}

/** DELETE - logout */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  clearAuthCookie(res);
  return res;
}
