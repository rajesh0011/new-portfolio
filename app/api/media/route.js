import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Media from "@/models/Media";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

const MAX_BYTES = 3 * 1024 * 1024; // 3 MB after client-side compression
const DATA_URL = /^data:(image\/(?:jpeg|png|webp|gif));base64,([A-Za-z0-9+/=]+)$/;

/** POST /api/media (admin)  body: { dataUrl, name }  ->  { url: "/api/media/<id>" } */
export async function POST(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const match = DATA_URL.exec(body?.dataUrl || "");
  if (!match) {
    return NextResponse.json({ ok: false, error: "Send a JPEG, PNG, WebP or GIF as a base64 data URL" }, { status: 400 });
  }
  const buffer = Buffer.from(match[2], "base64");
  if (buffer.length > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "Image is larger than 3 MB" }, { status: 413 });
  }

  try {
    await connectDB();
    const doc = await Media.create({
      data: buffer,
      contentType: match[1],
      name: String(body?.name || "").slice(0, 120),
      size: buffer.length,
    });
    return NextResponse.json({ ok: true, id: String(doc._id), url: `/api/media/${doc._id}` }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/media]", err);
    return NextResponse.json({ ok: false, error: "Upload failed" }, { status: 500 });
  }
}
