import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { requireAdmin } from "@/lib/auth";
import { projects as staticProjects } from "@/lib/data";
import { sanitizeProjectInput, slugify } from "@/lib/projects-service";

export const runtime = "nodejs";

/**
 * POST /api/admin/seed (admin)
 * Imports the projects from lib/data.js into MongoDB. Safe to run repeatedly -
 * projects whose slug already exists are left untouched.
 */
export async function POST(request) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    await connectDB();
    const ops = staticProjects
      .map((p, i) => {
        const { data } = sanitizeProjectInput({ ...p, featured: !!p.featured, inGallery: !!p.featured });
        if (!data) return null;
        return {
          updateOne: {
            filter: { slug: slugify(p.name) },
            update: { $set: { ...data, slug: slugify(p.name), published: true, order: i } },
            upsert: true,
          },
        };
      })
      .filter(Boolean);

    const result = await Project.bulkWrite(ops);
    revalidatePath("/");
    return NextResponse.json({
      ok: true,
      inserted: result.upsertedCount,
      updated: result.modifiedCount,
      skipped: ops.length - result.upsertedCount - result.modifiedCount,
    });
  } catch (err) {
    console.error("[POST /api/admin/seed]", err);
    return NextResponse.json({ ok: false, error: err.message || "Seeding failed" }, { status: 500 });
  }
}
