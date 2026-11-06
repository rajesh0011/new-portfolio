"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import ProjectImage from "./ProjectImage";

/**
 * 3D "barrel" carousel for the Enterprise Portfolio section.
 * Cards sit on the inside of a rotating cylinder (framer-motion drives the rotation).
 * Swipe/drag, arrow buttons, arrow keys and clicking a side card all rotate the barrel.
 */
export default function ProjectBarrel({ projects }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [cardW, setCardW] = useState(340);

  const n = projects.length;

  useEffect(() => {
    const measure = () => setCardW(window.innerWidth < 640 ? Math.min(300, window.innerWidth - 64) : 360);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Reset when the filtered list changes.
  useEffect(() => {
    setIndex(0);
    setExpanded(null);
  }, [n]);

  const go = (d) => {
    setExpanded(null);
    setIndex((i) => Math.min(n - 1, Math.max(0, i + d)));
  };

  // Geometry: always lay out at least 8 slots so small result sets still look like a barrel.
  const slots = Math.max(n, 8);
  const step = 360 / slots;
  const gap = 28;
  const radius = (cardW + gap) / 2 / Math.tan(Math.PI / slots);
  const cardH = 560;

  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      className="relative outline-none"
      aria-roledescription="carousel"
      aria-label="Enterprise projects"
    >
      <motion.div
        onPanEnd={(_, info) => {
          if (info.offset.x < -50 || info.velocity.x < -400) go(1);
          else if (info.offset.x > 50 || info.velocity.x > 400) go(-1);
        }}
        style={{ perspective: 1800, touchAction: "pan-y", height: cardH + 40 }}
        className="relative cursor-grab overflow-hidden active:cursor-grabbing"
      >
        <motion.div
          animate={{ rotateY: -index * step }}
          transition={{ type: "spring", stiffness: 70, damping: 18, mass: 0.9 }}
          style={{
            transformStyle: "preserve-3d",
            width: cardW,
            height: cardH,
            left: "50%",
            marginLeft: -cardW / 2,
            top: 20,
            // Push the whole barrel back so the front card sits at z=0 (a big ring would otherwise pass the camera and vanish).
            z: -radius,
          }}
          className="absolute"
        >
          {projects.map((p, i) => {
            const d = i - index;
            const dist = Math.abs(d);
            const isActive = d === 0;
            const isOpen = expanded === p.name;
            return (
              <motion.div
                key={p.id || p.name}
                animate={{ opacity: dist > 3 ? 0 : 1 - dist * 0.18 }}
                transition={{ duration: 0.4 }}
                onClick={() => !isActive && setIndex(i)}
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                  pointerEvents: dist > 3 ? "none" : "auto",
                }}
                className={`flex flex-col overflow-hidden rounded-3xl border bg-white/80 p-5 shadow-xl backdrop-blur-md dark:bg-ink-soft/80 ${
                  isActive
                    ? "border-gold/40 shadow-gold/20"
                    : "cursor-pointer border-ink-line/10 shadow-ink/10 dark:border-paper/10"
                }`}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="rounded-full bg-teal/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-teal-dark dark:text-teal-light">
                      {p.tag}
                    </span>
                    {p.featured && (
                      <span className="rounded-full bg-gold/15 px-2 py-0.5 font-mono text-[9px] text-gold-dark dark:text-gold">
                        ★ FLAGSHIP
                      </span>
                    )}
                  </div>
                  <a
                    href={p.url || undefined}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Visit ${p.name}`}
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ink-line/10 bg-paper/60 text-ink/50 transition-colors hover:border-gold hover:text-gold-dark dark:border-paper/10 dark:bg-ink/60 dark:text-paper/50 dark:hover:text-gold"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                <a
                  href={p.url || undefined}
                  target="_blank"
                  rel="noreferrer noopener"
                  tabIndex={-1}
                  aria-hidden="true"
                  draggable={false}
                  className="group/img relative mb-3 block h-36 w-full flex-shrink-0 overflow-hidden rounded-xl border border-ink-line/10 bg-ink/5 dark:border-paper/10"
                >
                  <ProjectImage
                    project={p}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                  />
                </a>

                <h3 className="font-display text-xl font-medium">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="transition-colors hover:text-gold-dark dark:hover:text-gold"
                  >
                    {p.name}
                  </a>
                </h3>

                <div className="mt-2 min-h-0 flex-1 overflow-y-auto pr-1">
                  <p className="text-xs leading-relaxed text-ink/75 dark:text-paper/75">{p.summary}</p>

                  {p.tech && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-ink-line/10 bg-ink-soft/[0.03] px-2 py-0.5 font-mono text-[10px] text-ink/70 dark:border-paper/10 dark:bg-paper/[0.04] dark:text-paper/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {p.points?.length > 0 && (
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpanded(isOpen ? null : p.name);
                        }}
                        className="flex items-center gap-1 font-mono text-[11px] font-medium text-gold-dark hover:underline dark:text-gold"
                      >
                        <span>{isOpen ? "Hide Engineering Details" : "View Engineering Highlights"}</span>
                        {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </button>
                      {isOpen && (
                        <ul className="mt-2 space-y-2 border-t border-ink-line/10 pt-2 dark:border-paper/10">
                          {p.points.map((pt, k) => (
                            <li key={k} className="flex items-start gap-2 text-xs leading-relaxed text-ink/70 dark:text-paper/70">
                              <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-3 border-t border-ink-line/10 pt-3 dark:border-paper/10">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-3">
                      {p.metrics?.map((m) => (
                        <div key={m.label}>
                          <p className="font-mono text-sm text-gold-dark dark:text-gold">{m.value}</p>
                          <p className="text-[10px] text-ink/50 dark:text-paper/50">{m.label}</p>
                        </div>
                      ))}
                    </div>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-ink/50 hover:text-gold dark:text-paper/50"
                    >
                      Visit <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Previous project"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-line/20 bg-white/60 transition hover:border-gold disabled:opacity-30 dark:border-paper/20 dark:bg-ink-soft/60"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="font-mono text-xs tabular-nums text-ink/60 dark:text-paper/60">
          {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={index === n - 1}
          aria-label="Next project"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-line/20 bg-white/60 transition hover:border-gold disabled:opacity-30 dark:border-paper/20 dark:bg-ink-soft/60"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

