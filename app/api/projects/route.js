import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB, { isDbConfigured } from "@/lib/mongodb";
import Project from "@/models/Project";
import { isAdmin, requireAdmin } from "@/lib/auth";
import {
  escapeRegex,
  fallbackProjects,
  sanitizeProjectInput,
  serializeProject,
  uniqueSlug,
} from "@/lib/projects-service";

export const runtime = "nodejs";

const json = (body, status = 200, headers = {}) => NextResponse.json(body, { status, headers });

/**
 * GET /api/projects
 *   ?category=hospitality   filter by category
 *   ?featured=true          only featured
 *   ?gallery=true           only projects shown in the horizontal gallery
 *   ?q=next.js              search name / summary / tag / tech
 *   ?limit=12               cap results
 *   ?includeDrafts=true     (admin only) include unpublished projects
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const includeDrafts = searchParams.get("includeDrafts") === "true";
  const category = searchParams.get("category");
  const featured = searchParams.get("featured") === "true";
  const gallery = searchParams.get("gallery") === "true";
  const q = (searchParams.get("q") || "").trim().slice(0, 80);
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "0", 10) || 0, 0), 200);

  if (includeDrafts && !isAdmin(request)) {
    return json({ ok: false, error: "Unauthorized" }, 401);
  }

  const cache = includeDrafts
    ? { "Cache-Control": "no-store" }
    : { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" };

  if (!isDbConfigured()) {
    if (includeDrafts) return json({ ok: false, error: "MONGODB_URI is not configured" }, 503);
    let list = fallbackProjects();
    if (category && category !== "all") list = list.filter((p) => p.category === category);
    if (featured) list = list.filter((p) => p.featured);
    if (gallery) list = list.filter((p) => p.inGallery);
    if (q) list = list.filter((p) => `${p.name} ${p.summary} ${p.tag} ${p.tech.join(" ")}`.toLowerCase().includes(q.toLowerCase()));
    if (limit) list = list.slice(0, limit);
    return json({ ok: true, source: "static", count: list.length, projects: list }, 200, cache);
  }

  try {
    await connectDB();
    const filter = {};
    if (!includeDrafts) filter.published = true;
    if (category && category !== "all") filter.category = category;
    if (featured) filter.featured = true;
    if (gallery) filter.inGallery = true;
    if (q) {
      const rx = new RegExp(escapeRegex(q), "i");
      filter.$or = [{ name: rx }, { summary: rx }, { tag: rx }, { tech: rx }];
    }
    let query = Project.find(filter).sort({ order: 1, createdAt: 1 });
    if (limit) query = query.limit(limit);
    const docs = await query.lean();
    return json({ ok: true, source: "mongodb", count: docs.length, projects: docs.map(serializeProject) }, 200, cache);
  } catch (err) {
    console.error("[GET /api/projects]", err);
    return json({ ok: false, error: "Could not load projects" }, 500);
  }
}

/** POST /api/projects  (admin) - create a project */
export async function POST(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }

  const { data, error } = sanitizeProjectInput(body);
  if (error) return json({ ok: false, error }, 400);

  try {
    await connectDB();
    data.slug = await uniqueSlug(data.slug || data.name);
    const last = await Project.findOne().sort({ order: -1 }).select("order").lean();
    data.order = (last?.order ?? -1) + 1;
    const doc = await Project.create(data);
    revalidatePath("/");
    return json({ ok: true, project: serializeProject(doc) }, 201);
  } catch (err) {
    console.error("[POST /api/projects]", err);
    return json({ ok: false, error: "Could not create project" }, 500);
  }
}
