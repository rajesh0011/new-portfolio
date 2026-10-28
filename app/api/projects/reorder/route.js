import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { requireAdmin } from "@/lib/auth";
import { isObjectId } from "@/lib/projects-service";

export const runtime = "nodejs";

/** POST /api/projects/reorder (admin)  body: { ids: ["<id>", "<id>", ...] } in display order */
export async function POST(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const ids = Array.isArray(body?.ids) ? body.ids : [];
  if (!ids.length || !ids.every(isObjectId)) {
    return NextResponse.json({ ok: false, error: "ids must be a list of project ids" }, { status: 400 });
  }

  try {
    await connectDB();
    await Project.bulkWrite(
      ids.map((id, index) => ({ updateOne: { filter: { _id: id }, update: { $set: { order: index } } } }))
    );
    revalidatePath("/");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[POST /api/projects/reorder]", err);
    return NextResponse.json({ ok: false, error: "Could not reorder" }, { status: 500 });
  }
}
