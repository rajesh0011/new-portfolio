import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB, { isDbConfigured } from "@/lib/mongodb";
import Project from "@/models/Project";
import Media from "@/models/Media";
import { isAdmin, requireAdmin } from "@/lib/auth";
import {
  fallbackProjects,
  isObjectId,
  sanitizeProjectInput,
  serializeProject,
  uniqueSlug,
} from "@/lib/projects-service";

export const runtime = "nodejs";

const json = (body, status = 200, headers = {}) => NextResponse.json(body, { status, headers });
const findByIdOrSlug = (id) => (isObjectId(id) ? Project.findById(id) : Project.findOne({ slug: id }));

/** GET /api/projects/:idOrSlug - public (published only; admins can read drafts) */
export async function GET(request, { params }) {
  const { id } = await params;

  if (!isDbConfigured()) {
    const hit = fallbackProjects().find((p) => p.slug === id);
    return hit ? json({ ok: true, source: "static", project: hit }) : json({ ok: false, error: "Not found" }, 404);
  }

  try {
    await connectDB();
    const doc = await findByIdOrSlug(id);
    if (!doc || (!doc.published && !isAdmin(request))) {
      return json({ ok: false, error: "Not found" }, 404);
    }
    return json({ ok: true, project: serializeProject(doc) }, 200, {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    });
  } catch (err) {
    console.error("[GET /api/projects/:id]", err);
    return json({ ok: false, error: "Could not load project" }, 500);
  }
}

async function update(request, { params }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const { data, error } = sanitizeProjectInput(body, { partial: true });
  if (error) return json({ ok: false, error }, 400);

  try {
    await connectDB();
    const doc = await findByIdOrSlug(id);
    if (!doc) return json({ ok: false, error: "Not found" }, 404);

    if (data.slug && data.slug !== doc.slug) data.slug = await uniqueSlug(data.slug, doc._id);
    const oldImage = doc.image;
    doc.set(data);
    await doc.save();

    // Remove the previous uploaded image if it was replaced.
    if (data.image !== undefined && oldImage && oldImage !== doc.image && oldImage.startsWith("/api/media/")) {
      const mediaId = oldImage.split("/").pop();
      if (isObjectId(mediaId)) await Media.findByIdAndDelete(mediaId).catch(() => {});
    }

    revalidatePath("/");
    return json({ ok: true, project: serializeProject(doc) });
  } catch (err) {
    console.error("[PUT /api/projects/:id]", err);
    return json({ ok: false, error: "Could not update project" }, 500);
  }
}

export const PUT = update;
export const PATCH = update;

/** DELETE /api/projects/:id (admin) */
export async function DELETE(request, { params }) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { id } = await params;

  try {
    await connectDB();
    const doc = await findByIdOrSlug(id);
    if (!doc) return json({ ok: false, error: "Not found" }, 404);

    if (doc.image?.startsWith("/api/media/")) {
      const mediaId = doc.image.split("/").pop();
      if (isObjectId(mediaId)) await Media.findByIdAndDelete(mediaId).catch(() => {});
    }
    await doc.deleteOne();
    revalidatePath("/");
    return json({ ok: true });
  } catch (err) {
    console.error("[DELETE /api/projects/:id]", err);
    return json({ ok: false, error: "Could not delete project" }, 500);
  }
}
