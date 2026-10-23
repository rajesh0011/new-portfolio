"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import { achievements } from "@/lib/data";
import Card3D from "./Card3D";

// Animates "26+", "60%", "1.5s" style values from 0 when scrolled into view
function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const match = String(value).match(/^([\d.]+)(.*)$/);

  useEffect(() => {
    if (!inView || !match || !ref.current) return;
    const end = parseFloat(match[1]);
    const decimals = (match[1].split(".")[1] || "").length;
    const controls = animate(0, end, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = v.toFixed(decimals) + match[2];
      },
    });
    return () => controls.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref}>{value}</span>;
}

export default function Achievements() {
  return (
    <section className="border-y border-ink-line/10 bg-ink-soft/[0.03] py-12 dark:border-paper/10 dark:bg-paper/[0.02]">
      <div className="container-page grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
        {achievements.map((a, i) => (
          <motion.div
            key={a.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card3D className="flex h-full flex-col justify-center border-gold/20 p-4 text-center sm:p-6">
              <span className="font-display text-3xl font-semibold text-gradient-gold sm:text-4xl md:text-5xl">
                <CountUp value={a.value} />
              </span>
              <span className="mt-2 text-[11px] leading-snug text-ink/70 dark:text-paper/70 sm:text-sm">
                {a.label}
              </span>
            </Card3D>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
