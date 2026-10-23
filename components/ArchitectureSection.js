"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Zap, Layers, Network, CheckCircle2, Cpu } from "lucide-react";
import Card3D from "./Card3D";

const pillars = [
  {
    id: "performance",
    icon: Zap,
    title: "Core Web Vitals & Sub-Second Latency",
    badge: "LCP < 1.5s · INP < 140ms",
    summary:
      "Enterprise consumer platforms live and die by millisecond latency. My systems systematically beat Google's Good CWV thresholds through SSR/ISR, memoization, edge asset caching, and critical path CSS.",
    bullets: [
      "Achieved 1.5s LCP, 136ms INP, and 0.02 CLS on flagship hospitality rebuilds.",
      "Engineered automated route-based code-splitting and progressive image loading (AVIF/WebP).",
      "Eliminated JavaScript execution bottlenecks via useMemo, useCallback, and React Profiler audits.",
    ],
    metric: "60% Faster Load",
  },
  {
    id: "modularity",
    icon: Layers,
    title: "Enterprise Design Systems & Micro-Frontends",
    badge: "10+ Shared Modules · -40% Dev Effort",
    summary:
      "Architected reusable, accessible (WCAG 2.1 AA) UI component systems powering 20+ hotel brands, customer loyalty portals, and booking funnels from a single source of truth.",
    bullets: [
      "Standardized UI tokens, typography, and micro-interactions for cross-team velocity.",
      "Reduced redundant code and engineering cycles by 40% across 10+ core modules.",
      "Ensured strict keyboard navigability, screen-reader semantics, and ARIA compliance.",
    ],
    metric: "-40% Sprint Cycle Time",
  },
  {
    id: "state",
    icon: Network,
    title: "High-Concurrency State & TanStack Query",
    badge: "Sub-100ms Query Latency",
    summary:
      "Engineered multi-tier asynchronous data layers using TanStack Query and Redux Toolkit to orchestrate high-density real-time rate grids, OTA extranets, and search filters.",
    bullets: [
      "Implemented optimistic UI updates for instant perceived responsiveness on inventory grids.",
      "Deduplicated concurrent network calls with smart stale-while-revalidate caching windows.",
      "Built resilient error boundaries and retry logic for high-traffic peak booking events.",
    ],
    metric: "Zero UI Freeze",
  },
  {
    id: "integrations",
    icon: ShieldCheck,
    title: "Secure API Orchestration & STAAH Engines",
    badge: "PCI-DSS Gateways · JWT RBAC",
    summary:
      "Integrated STAAH channel manager APIs, custom hotel reservation backends, Razorpay/Stripe payment gateways, and B2B corporate credit ledger authorization systems.",
    bullets: [
      "Integrated complex room inventory distribution feeds with real-time rate synchronization.",
      "Built secure multi-tenant B2B agent portals with role-based access control (RBAC).",
      "Seamless payment gateway handoffs with zero transaction loss and instant voucher generation.",
    ],
    metric: "99.9% Uptime",
  },
];

export default function ArchitectureSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activePillar = pillars[activeTab];

  return (
    <section id="architecture" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <div className="mb-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow">Enterprise Engineering Philosophy</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-gold/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-gold-dark dark:text-gold">
                <Cpu className="h-3 w-3" /> Production Scale
              </span>
            </div>
            <h2 className="section-heading mt-3 max-w-2xl">
              Engineered for massive concurrency, rock-solid stability, and zero drift.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ink/60 dark:text-paper/60">
            How I approach large-scale frontend architecture across 26+ shipped systems.
          </p>
        </div>

        {/* Tab triggers */}
        <div className="mb-8 flex flex-wrap gap-2 border-b border-ink-line/10 pb-4 dark:border-paper/10">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition-all sm:text-sm ${
                  isActive
                    ? "bg-ink text-paper shadow-md dark:bg-gold dark:text-ink"
                    : "text-ink/70 hover:bg-ink-line/5 dark:text-paper/70 dark:hover:bg-paper/5"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-gold dark:text-ink" : "text-ink/40 dark:text-paper/40"}`} />
                <span>{p.title.split("&")[0]}</span>
                {isActive && (
                  <motion.div
                    layoutId="activePillarTab"
                    className="absolute inset-0 -z-10 rounded-xl bg-ink dark:bg-gold"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Pillar Card with 3D Depth */}
        <Card3D className="p-8 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePillar.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center"
            >
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-teal-dark dark:text-teal-light">
                    {activePillar.badge}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-medium sm:text-3xl text-balance">
                  {activePillar.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink/75 dark:text-paper/75 sm:text-lg">
                  {activePillar.summary}
                </p>

                <ul className="mt-6 space-y-3">
                  {activePillar.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-ink/80 dark:text-paper/80 sm:text-base">
                      <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-gold" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl border border-ink-line/10 bg-ink-soft/[0.04] p-8 text-center dark:border-paper/10 dark:bg-paper/[0.03]">
                <p className="eyebrow mb-2">Proven Benchmark</p>
                <span className="font-display text-4xl font-semibold text-gold-dark dark:text-gold sm:text-5xl">
                  {activePillar.metric}
                </span>
                <p className="mt-3 max-w-[200px] text-xs text-ink/60 dark:text-paper/60">
                  Measured on live production builds under peak user loads.
                </p>
                <div className="mt-6 flex items-center gap-2 font-mono text-[11px] text-teal-dark dark:text-teal-light">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-teal" />
                  Enterprise Production Standard
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Card3D>
      </div>
    </section>
  );
}
