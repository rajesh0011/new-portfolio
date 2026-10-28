import mongoose from "mongoose";

// Small uploaded images (project screenshots) stored in MongoDB, because Netlify's
// filesystem is read-only/ephemeral at runtime.
const MediaSchema = new mongoose.Schema(
  {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    name: { type: String, default: "" },
    size: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);
