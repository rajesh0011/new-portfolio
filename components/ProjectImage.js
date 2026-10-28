"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getScreenshotUrl } from "@/lib/projectImage";

/**
 * Shows the project's CMS image. If it is missing/broken it falls back to a live
 * screenshot of the site, and finally to a branded placeholder.
 */
export default function ProjectImage({ project, className = "", style, eager = false }) {
  const [stage, setStage] = useState(0);
  const sources = [project.image, getScreenshotUrl(project.url)].filter(Boolean);
  const src = sources[stage];

  if (!src) {
    const initials = project.name
      .split(/\s+/)
      .filter((w) => /[A-Za-z0-9]/.test(w[0]))
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-gold/30 via-paper-soft to-teal/30 dark:from-gold/20 dark:via-ink-soft dark:to-teal/20 ${className}`}
        role="img"
        aria-label={project.name}
      >
        <span className="font-display text-6xl font-semibold text-ink/40 dark:text-paper/40">{initials}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <motion.img
      key={src}
      src={src}
      alt={`${project.name} website preview`}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      onError={() => setStage((s) => s + 1)}
      className={className}
      style={style}
    />
  );
}
