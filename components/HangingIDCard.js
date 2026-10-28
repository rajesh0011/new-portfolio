"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { BadgeCheck, MapPin } from "lucide-react";
import { profile } from "@/lib/data";

const MAX_ANGLE = 26;
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

/** Deterministic barcode so it never changes between renders / SSR / hydration. */
function Barcode({ seed = "RK-7Y-0011" }) {
  const bars = useMemo(() => {
    let h = 7;
    for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    const out = [];
    let x = 0;
    for (let i = 0; i < 44; i++) {
      h = (h * 1664525 + 1013904223) >>> 0;
      const w = 1 + (h % 3);
      if (i % 2 === 0) out.push({ x, w });
      x += w + 1;
    }
    return { out, width: x };
  }, [seed]);

  return (
    <svg viewBox={`0 0 ${bars.width} 28`} className="h-7 w-full" preserveAspectRatio="none" aria-hidden="true">
      {bars.out.map((b, i) => (
        <rect key={i} x={b.x} y="0" width={b.w} height="28" fill="currentColor" />
      ))}
    </svg>
  );
}

/**
 * Lanyard-style ID card that hangs from the top of the hero. Grab it and swing it
 * (mouse or touch) - it is a spring-driven pendulum pivoting from the anchor point.
 */
export default function HangingIDCard({ className = "" }) {
  const anchorRef = useRef(null);
  const dragging = useRef(false);
  const idleAnim = useRef(null);
  const resumeTimer = useRef(null);
  const reduceMotion = useReducedMotion();

  const target = useMotionValue(0);
  const rotate = useSpring(target, { stiffness: 70, damping: 6, mass: 1 });

  const [roleMain, roleSub] = profile.role.split("|").map((s) => s.trim());

  const startIdle = () => {
    if (reduceMotion || dragging.current) return;
    idleAnim.current?.stop();
    idleAnim.current = animate(target, [-2, 2], {
      duration: 3.6,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    });
  };

  useEffect(() => {
    // Little "entrance swing" so it's obvious the card is physical.
    if (!reduceMotion) {
      target.set(14);
      const t = setTimeout(() => {
        target.set(0);
        startIdle();
      }, 120);
      return () => {
        clearTimeout(t);
        clearTimeout(resumeTimer.current);
        idleAnim.current?.stop();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  const onPointerDown = (e) => {
    dragging.current = true;
    clearTimeout(resumeTimer.current);
    idleAnim.current?.stop();
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!dragging.current || !anchorRef.current) return;
    const r = anchorRef.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = Math.max(e.clientY - r.top, 60);
    target.set(clamp((Math.atan2(dx, dy) * 180) / Math.PI, -MAX_ANGLE, MAX_ANGLE));
  };

  const release = () => {
    if (!dragging.current) return;
    dragging.current = false;
    target.set(0); // spring overshoots and settles = natural swing
    resumeTimer.current = setTimeout(startIdle, 3800);
  };

  return (
    <div ref={anchorRef} className={`relative mx-auto w-[286px] select-none ${className}`}>
      {/* Anchor / hook the lanyard hangs from */}
      <div className="absolute left-1/2 top-0 z-30 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-gold-light to-gold-dark shadow-md ring-2 ring-paper dark:ring-ink" />

      <motion.div
        style={{ rotate, transformOrigin: "50% 0%", touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        className="flex cursor-grab flex-col items-center active:cursor-grabbing"
      >
        {/* Lanyard strap */}
        <div
          aria-hidden="true"
          className="relative h-[84px] w-[22px] overflow-hidden border-x border-gold/70 bg-gradient-to-b from-teal-dark via-teal to-teal-dark shadow-md sm:h-[110px] lg:h-[176px]"
        >
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[8px] font-semibold uppercase tracking-[0.35em] text-paper/80 [writing-mode:vertical-rl]">
            code.with.raj · code.with.raj · code.with.raj
          </span>
        </div>

        {/* Metal clip */}
        <div
          aria-hidden="true"
          className="relative z-20 -mt-px h-9 w-7 rounded-b-md rounded-t-sm bg-gradient-to-b from-zinc-100 via-zinc-400 to-zinc-300 shadow-lg ring-1 ring-black/10"
        >
          <span className="absolute left-1/2 top-1.5 h-2.5 w-4 -translate-x-1/2 rounded-full bg-ink/70" />
          <span className="absolute inset-x-1 bottom-1 h-px bg-white/70" />
        </div>

        {/* ID Card */}
        <div className="relative -mt-2 w-full overflow-hidden rounded-[22px] border border-gold/50 bg-gradient-to-b from-white to-paper-soft shadow-2xl shadow-ink/25 dark:border-gold/30 dark:from-ink-soft dark:to-ink dark:shadow-black/50">
          {/* Slot */}
          <div className="mx-auto mt-3 h-2 w-14 rounded-full bg-ink/15 shadow-inner dark:bg-paper/15" />

          {/* Header */}
          <div className="mt-2 flex items-center justify-between px-5">
            <span className="eyebrow !text-[9px]">Staff · Technology</span>
            <span className="flex items-center gap-1 font-mono text-[9px] font-semibold text-teal-dark dark:text-teal-light">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" /> ACTIVE
            </span>
          </div>

          {/* Photo */}
          <div className="relative mx-5 mt-3 aspect-square overflow-hidden rounded-2xl border border-gold/50 shadow-md">
            <Image
              src="/avatar.jpg"
              alt={`${profile.name} — profile photo`}
              fill
              sizes="260px"
              priority
              draggable={false}
              className="pointer-events-none object-cover"
            />
            {/* Holographic sweep */}
            {!reduceMotion && (
              <motion.div
                aria-hidden="true"
                className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                animate={{ x: ["0%", "380%"] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 4.5, ease: "easeInOut" }}
              />
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/55 to-transparent" />
            <span className="absolute bottom-2 left-3 flex items-center gap-1 font-mono text-[9px] font-semibold uppercase tracking-widest text-paper">
              <BadgeCheck className="h-3 w-3 text-gold-light" /> Verified
            </span>
          </div>

          {/* Name + title */}
          <div className="px-5 pt-4 text-center">
            <h3 className="font-display text-[28px] font-semibold leading-none text-ink dark:text-paper">
              {profile.name}
            </h3>
            <p className="mt-2 font-display text-[17px] font-medium italic leading-tight text-gold-dark dark:text-gold">
              {roleMain}
            </p>
            {roleSub && (
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60 dark:text-paper/60">
                {roleSub}
              </p>
            )}
          </div>

          {/* Details */}
          <div className="mx-5 mt-4 grid grid-cols-2 gap-3 border-t border-dashed border-ink-line/25 pt-3 dark:border-paper/20">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/45 dark:text-paper/45">ID No.</p>
              <p className="font-mono text-[11px] font-semibold text-ink dark:text-paper">RK-7Y-0011</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink/45 dark:text-paper/45">Base</p>
              <p className="flex items-center justify-end gap-1 font-mono text-[11px] font-semibold text-ink dark:text-paper">
                <MapPin className="h-3 w-3 text-teal" /> Gurugram, IN
              </p>
            </div>
          </div>

          {/* Barcode */}
          <div className="mx-5 mb-4 mt-3 text-ink/80 dark:text-paper/70">
            <Barcode />
            <p className="mt-1 text-center font-mono text-[8px] tracking-[0.35em] text-ink/45 dark:text-paper/45">
              REACT · NEXT.JS · TYPESCRIPT
            </p>
          </div>

          <div className="h-1.5 bg-gradient-to-r from-gold via-gold-light to-teal" />
        </div>
      </motion.div>
    </div>
  );
}
