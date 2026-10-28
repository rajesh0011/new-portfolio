"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import ProjectImage from "./ProjectImage";

const pad = (n) => String(n).padStart(2, "0");

/* ------------------------------- Slides ----------------------------------- */

function IntroPanel({ total }) {
  return (
    <div className="flex h-[min(70svh,620px)] w-[86vw] shrink-0 flex-col justify-center pr-4 sm:w-[60vw] md:w-[460px] lg:w-[520px]">
      <span className="eyebrow">Selected Work</span>
      <h2 className="section-heading mt-3 !text-4xl sm:!text-5xl lg:!text-6xl">
        A gallery of <span className="italic text-gradient-gold">live systems.</span>
      </h2>
      <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/70 dark:text-paper/70">
        {total} flagship builds — scroll down and the gallery glides sideways. Scroll back up to rewind.
      </p>
      <div className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-gold-dark dark:text-gold">
        <span>Keep scrolling</span>
        <motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowRight className="h-4 w-4" />
        </motion.span>
      </div>
    </div>
  );
}

function ProjectSlide({ project, index, progress, parallax }) {
  // Image drifts slightly against the track direction = depth.
  const imgX = useTransform(progress, [0, 1], ["7%", "-7%"]);

  return (
    <article className="group relative flex h-[min(70svh,620px)] w-[88vw] shrink-0 flex-col overflow-hidden rounded-3xl border border-ink-line/10 bg-white/70 shadow-xl shadow-ink/10 backdrop-blur-md transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gold/20 dark:border-paper/10 dark:bg-ink-soft/70 sm:w-[75vw] md:w-[520px] lg:w-[640px] xl:w-[720px]">
      <a
        href={project.url || undefined}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Visit ${project.name}`}
        className="relative block flex-1 overflow-hidden bg-ink/5"
        tabIndex={project.url ? 0 : -1}
      >
        <ProjectImage
          project={project}
          eager={index < 2}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          style={parallax ? { x: imgX, scale: 1.04 } : undefined}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </a>

      {/* Project Name Only */}
      <div className="flex items-center justify-between border-t border-ink-line/10 bg-white/40 px-6 py-2.5 backdrop-blur-sm dark:border-paper/10 dark:bg-ink-soft/40 sm:px-7 sm:py-2">
        <h3 className="mt-1 font-display text-2xl font-semibold leading-tight">
          <a
            href={project.url || undefined}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-gold-dark dark:hover:text-gold mt-1 font-display text-2xl font-semibold leading-tight"
          >
            {project.name}
          </a>
        </h3>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Open ${project.name} in a new tab`}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 hover:scale-110 dark:bg-gold dark:text-ink sm:h-11 sm:w-11"
          >
            <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        )}
      </div>
    </article>
  );
}

function OutroPanel() {
  return (
    <div className="flex h-[min(70svh,620px)] w-[78vw] shrink-0 flex-col items-start justify-center rounded-3xl border border-dashed border-gold/50 p-8 sm:w-[54vw] md:w-[380px]">
      <span className="eyebrow">That&apos;s the highlight reel</span>
      <h3 className="mt-3 font-display text-4xl font-semibold leading-tight">
        There&apos;s more <span className="italic text-gradient-gold">in the archive.</span>
      </h3>
      <a
        href="#projects"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-gold dark:text-ink"
      >
        Browse all projects <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

/* ------------------------------ Section ----------------------------------- */

export default function ProjectsGallery({ projects = [] }) {
  const items = projects.filter((p) => p.inGallery);
  const reduceMotion = useReducedMotion();

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const distanceRef = useRef(0);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  // Measure how far the track has to travel so the pinned section is exactly tall enough.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const d = Math.max(0, track.offsetWidth - window.innerWidth);
      distanceRef.current = d;
      setDistance(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [items.length, reduceMotion]);

  // Scroll progress works in BOTH directions: scrolling back up rewinds the gallery.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.35, restDelta: 0.0005 });
  const x = useTransform(progress, (v) => -v * distanceRef.current);

  useMotionValueEvent(progress, "change", (v) => {
    const idx = Math.min(items.length - 1, Math.max(0, Math.round(v * (items.length - 1))));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  if (!items.length) return null;

  /* Reduced motion / no pinning: plain horizontally scrollable, snap-aligned row. */
  if (reduceMotion) {
    return (
      <section id="showcase" ref={sectionRef} aria-label="Projects gallery" className="scroll-mt-20 py-16">
        <div className="container-page mb-6">
          <span className="eyebrow">Selected Work</span>
          <h2 className="section-heading mt-3">A gallery of live systems.</h2>
        </div>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 sm:px-8">
          {items.map((p, i) => (
            <div key={p.id} className="snap-center">
              <ProjectSlide project={p} index={i} progress={progress} parallax={false} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="showcase"
      ref={sectionRef}
      aria-label="Projects gallery"
      className="relative"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-16">
        {/* soft ambient glows */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-teal/15 blur-[110px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-gold/15 blur-[110px]" />

        {/* Horizontal track */}
        <motion.div
          ref={trackRef}
          style={{ x, willChange: "transform" }}
          className="relative flex w-max items-center gap-5 px-[5vw] sm:gap-8"
        >
          <IntroPanel total={items.length} />
          {items.map((p, i) => (
            <ProjectSlide key={p.id} project={p} index={i} progress={progress} parallax />
          ))}
          <OutroPanel />
        </motion.div>

        {/* Progress UI */}
        <div className="pointer-events-none absolute inset-x-[5vw] bottom-6 flex items-center gap-4 sm:bottom-8">
          <span className="font-display text-xl font-semibold tabular-nums text-ink dark:text-paper">
            {pad(active + 1)}
            <span className="text-ink/40 dark:text-paper/40"> / {pad(items.length)}</span>
          </span>
          <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-ink/10 dark:bg-paper/15">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gradient-to-r from-gold to-teal" />
          </div>
        </div>
      </div>
    </section>
  );
}
