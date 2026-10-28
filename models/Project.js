import mongoose from "mongoose";

const MetricSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true, maxlength: 60 },
    value: { type: String, required: true, trim: true, maxlength: 60 },
  },
  { _id: false }
);

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 140 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    url: { type: String, trim: true, default: "" },
    tag: { type: String, trim: true, default: "", maxlength: 80 },
    category: { type: String, trim: true, default: "hospitality", index: true },
    summary: { type: String, trim: true, default: "", maxlength: 1200 },
    points: { type: [String], default: [] },
    metrics: { type: [MetricSchema], default: [] },
    tech: { type: [String], default: [] },
    // Either an uploaded image ("/api/media/<id>"), a public path, or a full https URL.
    image: { type: String, trim: true, default: "" },
    featured: { type: Boolean, default: false },
    inGallery: { type: Boolean, default: false }, // show in the horizontal scroll gallery
    published: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProjectSchema.index({ published: 1, order: 1 });

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
