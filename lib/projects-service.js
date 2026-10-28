import mongoose from "mongoose";
import connectDB, { isDbConfigured } from "@/lib/mongodb";
import Project from "@/models/Project";
import { projects as staticProjects } from "@/lib/data";

/* ---------------------------------- helpers --------------------------------- */

export function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function escapeRegex(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function isObjectId(id) {
  return mongoose.isValidObjectId(id);
}

const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

function list(v, { max = 20, len = 400, splitComma = true } = {}) {
  const arr = Array.isArray(v)
    ? v
    : typeof v === "string"
    ? v.split(splitComma ? /\r?\n|,/ : /\r?\n/)
    : [];
  return arr.map((x) => str(x, len)).filter(Boolean).slice(0, max);
}

const isHttpUrl = (v) => /^https?:\/\/[^\s]+$/i.test(v);
const isSafeImage = (v) =>
  isHttpUrl(v) || (v.startsWith("/") && !v.startsWith("//") && !/[\s"'<>]/.test(v));

/**
 * Validates + normalises incoming JSON. With `partial: true` only keys that were
 * actually sent are returned (used for PATCH/PUT updates).
 */
export function sanitizeProjectInput(body, { partial = false } = {}) {
  if (!body || typeof body !== "object") return { error: "Invalid JSON body" };
  const has = (k) => Object.prototype.hasOwnProperty.call(body, k);
  const data = {};

  if (!partial || has("name")) {
    data.name = str(body.name, 140);
    if (!data.name) return { error: "Project name is required" };
  }
  if (has("slug")) {
    data.slug = slugify(body.slug);
    if (!data.slug) return { error: "Invalid slug" };
  }
  if (has("url")) {
    data.url = str(body.url, 500);
    if (data.url && !isHttpUrl(data.url)) return { error: "Project URL must start with http:// or https://" };
  }
  if (has("image")) {
    data.image = str(body.image, 600);
    if (data.image && !isSafeImage(data.image)) return { error: "Image must be an https URL, a /public path or an uploaded image" };
  }
  if (has("tag")) data.tag = str(body.tag, 80);
  if (has("category")) data.category = slugify(body.category) || "hospitality";
  if (has("summary")) data.summary = str(body.summary, 1200);
  if (has("tech")) data.tech = list(body.tech, { max: 20, len: 40 });
  if (has("points")) data.points = list(body.points, { max: 12, len: 500, splitComma: false });
  if (has("metrics")) {
    data.metrics = (Array.isArray(body.metrics) ? body.metrics : [])
      .map((m) => ({ label: str(m?.label, 60), value: str(m?.value, 60) }))
      .filter((m) => m.label && m.value)
      .slice(0, 6);
  }
  for (const flag of ["featured", "inGallery", "published"]) {
    if (has(flag)) data[flag] = Boolean(body[flag]);
  }
  if (has("order")) {
    const n = Number(body.order);
    if (Number.isFinite(n)) data.order = n;
  }
  return { data };
}

export async function uniqueSlug(base, excludeId) {
  const root = slugify(base) || "project";
  let slug = root;
  let i = 2;
  // eslint-disable-next-line no-await-in-loop
  while (await Project.exists({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    slug = `${root}-${i++}`;
  }
  return slug;
}

export function serializeProject(doc) {
  const o = doc.toObject ? doc.toObject() : doc;
  return {
    id: String(o._id),
    slug: o.slug,
    name: o.name,
    url: o.url || "",
    tag: o.tag || "",
    category: o.category || "",
    summary: o.summary || "",
    points: o.points || [],
    metrics: (o.metrics || []).map((m) => ({ label: m.label, value: m.value })),
    tech: o.tech || [],
    image: o.image || "",
    featured: !!o.featured,
    inGallery: !!o.inGallery,
    published: o.published !== false,
    order: o.order ?? 0,
    updatedAt: o.updatedAt ? new Date(o.updatedAt).toISOString() : null,
  };
}

/* ------------------------- static fallback (data.js) ------------------------- */

export function fallbackProjects() {
  return staticProjects.map((p, i) => ({
    id: slugify(p.name),
    slug: slugify(p.name),
    name: p.name,
    url: p.url || "",
    tag: p.tag || "",
    category: p.category || "",
    summary: p.summary || "",
    points: p.points || [],
    metrics: p.metrics || [],
    tech: p.tech || [],
    image: p.image || "",
    featured: !!p.featured,
    inGallery: !!p.featured,
    published: true,
    order: i,
    updatedAt: null,
  }));
}

/**
 * Used by the home page (server component). Reads published projects from MongoDB.
 * Falls back to the static list in lib/data.js when MongoDB isn't configured, is
 * unreachable, or hasn't been seeded yet - so the site never renders empty.
 */
export async function getPublicProjects() {
  if (!isDbConfigured()) return fallbackProjects();
  try {
    await connectDB();
    const docs = await Project.find({ published: true }).sort({ order: 1, createdAt: 1 }).lean();
    if (!docs.length) return fallbackProjects();
    return docs.map(serializeProject);
  } catch (err) {
    console.error("[projects] MongoDB read failed, using static fallback:", err.message);
    return fallbackProjects();
  }
}
