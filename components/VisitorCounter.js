"use client";

import { useEffect, useState } from "react";
import { Users, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function VisitorCounter({ variant = "footer", className = "" }) {
  const [count, setCount] = useState(null);
  const [activeNow, setActiveNow] = useState(3);

  useEffect(() => {
    // Use session storage so refresh reads the updated count from CounterAPI
    const hasCounted = typeof window !== "undefined" ? sessionStorage.getItem("counted_counterapi") : null;
    const endpoint = hasCounted ? "/api/visitor-count?action=read" : "/api/visitor-count";

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.count === "number") {
          setCount(data.count);
          if (typeof window !== "undefined") {
            sessionStorage.setItem("counted_counterapi", "true");
          }
          if (data.activeNow) setActiveNow(data.activeNow);
        }
      })
      .catch((err) => {
        console.error("Counter fetch error:", err);
      });
  }, []);

  const displayCount = count !== null ? count.toLocaleString() : "...";

  if (variant === "badge") {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 font-mono text-xs text-teal-dark dark:text-teal-light ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
        </span>
        <span className="font-semibold">{displayCount}</span>
        <span className="text-[10px] uppercase opacity-75">Live Visits</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-3 rounded-full border border-ink-line/15 bg-white/50 px-4 py-2 font-mono text-xs text-ink/80 shadow-sm backdrop-blur-md dark:border-paper/15 dark:bg-ink-soft/50 dark:text-paper/80 ${className}`}
    >
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
        </span>
        <Users className="h-3.5 w-3.5 text-gold-dark dark:text-gold" />
        <span>Total Visitors:</span>
        <strong className="font-bold text-ink dark:text-paper">
          {displayCount}
        </strong>
      </div>

      <span className="text-ink/30 dark:text-paper/30">|</span>

      <div className="flex items-center gap-1.5 text-[11px] text-teal-dark dark:text-teal-light">
        <Activity className="h-3 w-3" />
        <span>{activeNow} reviewing now</span>
      </div>
    </div>
  );
}
