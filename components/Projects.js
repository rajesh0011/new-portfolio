"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, Sparkles, Filter, ChevronDown, ChevronUp, Layers, ExternalLink } from "lucide-react";
import { projects, projectCategories } from "@/lib/data";
import Card3D from "./Card3D";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);

  // Filter projects based on category and live search query
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      let matchesCategory = true;
      if (activeCategory === "featured") {
        matchesCategory = !!project.featured;
      } else if (activeCategory !== "all") {
        matchesCategory = project.category === activeCategory;
      }

      // Search query filter
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inName = project.name.toLowerCase().includes(q);
      const inSummary = project.summary.toLowerCase().includes(q);
      const inTag = project.tag.toLowerCase().includes(q);
      const inTech = project.tech?.some((t) => t.toLowerCase().includes(q));
      const inPoints = project.points?.some((p) => p.toLowerCase().includes(q));

      return inName || inSummary || inTag || inTech || inPoints;
    });
  }, [activeCategory, searchQuery]);

  function toggleExpand(projectName) {
    setExpandedCard((prev) => (prev === projectName ? null : projectName));
  }

  return (
    <section id="projects" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow">Enterprise Portfolio</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-teal/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-teal-dark dark:text-teal-light">
                <Sparkles className="h-3 w-3" /> 26 Production Deployments
              </span>
            </div>
            <h2 className="section-heading mt-3 max-w-2xl">
              From flagship luxury chains to high-concurrency extranets.
            </h2>
          </div>
          <p className="max-w-md text-sm text-ink/70 dark:text-paper/70">
            Every project listed below is live in production. Explored, architected, and delivered with
            strict performance benchmarks, responsive UX, and enterprise reliability.
          </p>
        </div>

        {/* Controls: Search + Category Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40 dark:text-paper/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by hotel, SaaS, tech (e.g. Next.js, TanStack, STAAH, Extranet)..."
              className="w-full rounded-full border border-ink-line/20 bg-white/60 py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none dark:border-paper/20 dark:bg-ink-soft/60 dark:text-paper dark:placeholder:text-paper/40 backdrop-blur-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-ink/50 hover:text-ink dark:text-paper/50 dark:hover:text-paper"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="mr-1 h-3.5 w-3.5 text-gold-dark dark:text-gold" />
            {projectCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-ink text-paper shadow dark:bg-gold dark:text-ink"
                      : "border border-ink-line/15 bg-white/40 text-ink/70 hover:border-gold/50 hover:text-ink dark:border-paper/15 dark:bg-ink-soft/40 dark:text-paper/70 dark:hover:text-paper"
                  }`}
                >
                  {cat.label}
                  <span
                    className={`ml-1.5 font-mono text-[10px] opacity-70 ${
                      isActive ? "text-paper dark:text-ink" : "text-ink/50 dark:text-paper/50"
                    }`}
                  >
                    ({cat.id === "all" ? projects.length : cat.id === "featured" ? projects.filter((p) => p.featured).length : projects.filter((p) => p.category === cat.id).length})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs text-ink/50 dark:text-paper/50">
          <span>
            Showing <strong className="text-ink dark:text-paper">{filteredProjects.length}</strong> of{" "}
            {projects.length} systems
          </span>
          {activeCategory === "featured" && (
            <span className="flex items-center gap-1 text-gold-dark dark:text-gold">
              ⭐ Recommended for Technical Architecture Review
            </span>
          )}
        </div>

        {/* Project Cards Grid with 3D Physics */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => {
              const isExpanded = expandedCard === p.name;
              return (
                <motion.div
                  key={p.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: (i % 6) * 0.04 }}
                  className="h-full"
                >
                  <Card3D className="flex h-full flex-col justify-between p-6 transition-all">
                    <div>
                      {/* Top Badges */}
                      <div className="mb-4 flex items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="rounded-full bg-teal/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-teal-dark dark:text-teal-light">
                            {p.tag}
                          </span>
                          {p.featured && (
                            <span className="rounded-full bg-gold/15 px-2 py-0.5 font-mono text-[9px] font-semibold text-gold-dark dark:text-gold">
                              ★ FLAGSHIP
                            </span>
                          )}
                        </div>
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`Visit ${p.name}`}
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ink-line/10 bg-paper/60 text-ink/50 transition-colors hover:border-gold hover:text-gold-dark dark:border-paper/10 dark:bg-ink/60 dark:text-paper/50 dark:hover:text-gold"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>

                      {/* Project Name & Summary */}
                      <h3 className="font-display text-xl font-medium sm:text-2xl">
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="group inline-flex items-center gap-1 transition-colors hover:text-gold-dark dark:hover:text-gold"
                        >
                          {p.name}
                        </a>
                      </h3>
                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-ink/75 dark:text-paper/75">
                        {p.summary}
                      </p>

                      {/* Tech Stack Pills */}
                      {p.tech && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
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

                      {/* Expandable Engineering Details */}
                      {p.points && p.points.length > 0 && (
                        <div className="mt-4">
                          <button
                            type="button"
                            onClick={() => toggleExpand(p.name)}
                            className="flex items-center gap-1 font-mono text-[11px] font-medium text-gold-dark hover:underline dark:text-gold"
                          >
                            <span>{isExpanded ? "Hide Engineering Details" : "View Engineering Highlights"}</span>
                            {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="mt-3 space-y-2 overflow-hidden border-t border-ink-line/10 pt-3 dark:border-paper/10"
                              >
                                {p.points.map((pt, pIdx) => (
                                  <li key={pIdx} className="flex items-start gap-2 text-xs leading-relaxed text-ink/70 dark:text-paper/70">
                                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>

                    {/* Bottom Metrics Bar */}
                    <div className="mt-6 border-t border-ink-line/10 pt-4 dark:border-paper/10">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-3">
                          {p.metrics?.map((m) => (
                            <div key={m.label}>
                              <p className="font-mono text-sm font-semibold text-gold-dark dark:text-gold">
                                {m.value}
                              </p>
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
                  </Card3D>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="rounded-2xl border border-dashed border-ink-line/20 p-12 text-center dark:border-paper/20">
            <p className="text-sm text-ink/60 dark:text-paper/60">
              No projects matched &quot;{searchQuery}&quot; in category &quot;{activeCategory}&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-3 rounded-full bg-gold px-4 py-1.5 text-xs font-semibold text-ink"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
