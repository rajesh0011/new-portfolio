"use client";

import { useEffect, useState } from "react";
import { liveMetrics } from "@/lib/data";

export default function DepartureBoard() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="card-surface overflow-hidden shadow-xl shadow-ink/5">
      <div className="flex items-center justify-between border-b border-ink-line/10 px-4 py-2.5 dark:border-paper/10">
        <span className="eyebrow">Core Web Vitals Console</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-teal">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-teal" />
          LIVE
        </span>
      </div>
      <div className="grid grid-cols-2 divide-x divide-y divide-ink-line/10 dark:divide-paper/10 sm:grid-cols-4 sm:divide-y-0">
        {liveMetrics.map((m, i) => (
          <div key={m.code} className="flex flex-col gap-1.5 px-4 py-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 dark:text-paper/50">
              {m.code}
            </span>
            <span
              key={tick}
              className="flip-card font-mono text-2xl font-semibold tabular-nums text-ink dark:text-paper sm:text-3xl"
              style={{ animation: "flip 0.6s ease" }}
            >
              {m.value}
              <span className="text-sm text-gold">{m.unit}</span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-teal-dark dark:text-teal-light">
              {m.status}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-ink-line/10 px-4 py-2 dark:border-paper/10">
        <p className="font-mono text-[10px] text-ink/40 dark:text-paper/40">
          Measured on the Welcome Heritage Hotels rebuild — case study below.
        </p>
      </div>
    </div>
  );
}
