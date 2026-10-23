"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import { experience } from "@/lib/data";
import { Calendar, MapPin } from "lucide-react";

/**
 * Scroll-driven stacking cards.
 * Each card is `position: sticky`; as the next card slides over it, the
 * card underneath scales down, sinks and dims, creating a parallax depth.
 */
function StackCard({ job, i, total, progress, reduce }) {
  const start = i / total;
  const targetScale = 1 - (total - 1 - i) * 0.045;
  const scale = useTransform(progress, [start, 1], [1, reduce ? 1 : targetScale]);
  const shade = useTransform(progress, [start, Math.min(start + 1 / total, 1)], [0, reduce ? 0 : 0.45]);

  return (
    <div
      className="sticky mb-[14vh] last:mb-0"
      style={{ top: `calc(5rem + ${i} * var(--stack-step))`, zIndex: i + 10 }}
    >
      <motion.div
        style={{ scale, transformOrigin: "50% 0%" }}
        className="relative overflow-hidden rounded-3xl border border-gold/25 bg-white/95 p-5 shadow-2xl shadow-ink/10 backdrop-blur-xl dark:bg-ink-soft/95 sm:p-8 md:p-10"
      >
        {/* accent edge */}
        <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gold via-gold-light to-teal" aria-hidden="true" />
        {/* depth shading as next card covers this one */}
        <motion.span style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-ink" aria-hidden="true" />

        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-ink-line/10 pb-4 dark:border-paper/10">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 font-mono text-[11px] font-bold text-gold-dark dark:text-gold">
              0{i + 1}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink/50 dark:text-paper/50">
              Phase {i + 1} / {total}
            </span>
          </div>
          {job.current ? (
            <span className="flex items-center gap-1.5 rounded-full bg-teal/15 px-3 py-1 font-mono text-[11px] font-semibold text-teal-dark dark:text-teal-light">
              <span className="h-2 w-2 animate-pulse rounded-full bg-teal" /> Current Role
            </span>
          ) : (
            <span className="rounded-full bg-ink-line/5 px-3 py-1 font-mono text-[11px] text-ink/60 dark:bg-paper/5 dark:text-paper/60">
              Milestone Complete
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <div>
            <h3 className="font-display text-2xl font-bold text-ink dark:text-paper sm:text-3xl">{job.role}</h3>
            <p className="mt-1 text-base font-semibold text-gold-dark dark:text-gold sm:text-lg">{job.company}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-ink/65 dark:text-paper/65">
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-gold" />{job.start} — {job.end}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-teal" />{job.location}</span>
          </div>
        </div>

        <ul className="mt-5 space-y-3">
          {job.points.map((point, p) => (
            <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-ink/80 dark:text-paper/80 sm:text-[15px]">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.3 });
  const total = experience.length;

  return (
    <section id="experience" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-3">Career Trajectory</p>
            <h2 className="section-heading max-w-2xl">7+ years delivering mission-critical web applications.</h2>
          </div>
          <p className="max-w-xs text-sm text-ink/65 dark:text-paper/65">
            A progressive track record across enterprise hospitality platforms, SaaS, and high-concurrency systems.
          </p>
        </div>

        {/* Career progress meter (sticks under the navbar while cards stack) */}
        <div className="sticky top-16 z-[5] -mx-1 mb-6 h-1 overflow-hidden rounded-full bg-ink-line/10 dark:bg-paper/10" aria-hidden="true">
          <motion.div style={{ scaleX: smooth }} className="h-full origin-left bg-gradient-to-r from-gold to-teal" />
        </div>

        <div ref={ref} className="relative pb-6">
          {experience.map((job, i) => (
            <StackCard key={job.company} job={job} i={i} total={total} progress={smooth} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}
