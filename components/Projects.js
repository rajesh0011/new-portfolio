"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Search, Sparkles, Filter, ChevronDown, ChevronUp, Layers, ExternalLink } from "lucide-react";
import { projects as staticProjects, projectCategories } from "@/lib/data";
import ProjectBarrel from "./ProjectBarrel";

export default function Projects({ projects: cmsProjects }) {
  // Data comes from MongoDB (via the home page); the static list is only a safety net.
  const projects = cmsProjects?.length ? cmsProjects : staticProjects;
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
      const inSummary = (project.summary || "").toLowerCase().includes(q);
      const inTag = (project.tag || "").toLowerCase().includes(q);
      const inTech = project.tech?.some((t) => t.toLowerCase().includes(q));
      const inPoints = project.points?.some((p) => p.toLowerCase().includes(q));

      return inName || inSummary || inTag || inTech || inPoints;
    });
  }, [projects, activeCategory, searchQuery]);

  function toggleExpand(projectName) {
    setExpandedCard((prev) => (prev === projectName ? null : projectName));
  }

  return (
    <section id="projects" className="scroll-mt-20 py-20 sm:py-18">
      <div className="container-page">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow">Enterprise Portfolio</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-teal/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-teal-dark dark:text-teal-light">
                <Sparkles className="h-3 w-3" /> {projects.length}+ Production Deployments
              </span>
            </div>
            <h2 className="section-heading mt-3 max-w-2xl  text-3xl md:text-4xl leading-relaxed">
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

        {/* 3D barrel carousel */}
        {filteredProjects.length > 0 && <ProjectBarrel projects={filteredProjects} />}

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
