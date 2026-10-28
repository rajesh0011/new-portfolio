import connectDB from "@/lib/mongodb";
import Media from "@/models/Media";
import { isObjectId } from "@/lib/projects-service";

export const runtime = "nodejs";

/** GET /api/media/:id - serves an uploaded image with long-lived caching */
export async function GET(_request, { params }) {
  const { id } = await params;
  if (!isObjectId(id)) return new Response("Not found", { status: 404 });

  try {
    await connectDB();
    const doc = await Media.findById(id);
    if (!doc) return new Response("Not found", { status: 404 });
    return new Response(new Uint8Array(doc.data), {
      headers: {
        "Content-Type": doc.contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("[GET /api/media/:id]", err);
    return new Response("Server error", { status: 500 });
  }
}
