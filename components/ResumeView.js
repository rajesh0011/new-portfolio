"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Printer, Download, ExternalLink, X, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { profile, education, experience, skillGroups } from "@/lib/data";
import Card3D from "./Card3D";
import Link from "next/link";

export default function ResumeView() {
  const [isOpen, setIsOpen] = useState(false);

  function handlePrint() {
    window.print();
  }

  return (
    <section id="resume-cv" className="scroll-mt-20 py-16 sm:py-24 border-t border-ink-line/10 dark:border-paper/10">
      <div className="container-page">
        <Card3D className="p-8 sm:p-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="eyebrow">Curriculum Vitae</span>
                <span className="rounded-full bg-gold/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-gold-dark dark:text-gold">
                  Enterprise Standard
                </span>
              </div>
              <h2 className="font-display text-2xl font-medium sm:text-3xl mt-2">
                Looking for Rajesh Kumar&apos;s full resume?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/70 dark:text-paper/70">
                Detailed career trajectory, verified enterprise projects, technical architecture proficiencies,
                and educational background — formatted for technical screeners and hiring committees.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">

              <Link
                href="https://drive.google.com/file/d/1WJfMa0lgGlSltaej3WOkjq2OfdMjR0O1/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-all hover:shadow-lg dark:bg-gold dark:text-ink"
              >
                <FileText className="h-4 w-4" />
                View / Download CV
              </Link>
              {/* <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-all hover:shadow-lg dark:bg-gold dark:text-ink"
              >
                <FileText className="h-4 w-4" />
                View Full CV Online
              </button> */}
              {/* <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-full border border-ink-line/20 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-gold dark:border-paper/20 dark:text-paper"
              >
                <Printer className="h-4 w-4" />
                Print / Save PDF
              </button> */}
            </div>
          </div>
        </Card3D>
      </div>

      {/* Full Resume Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-ink/70 backdrop-blur-sm"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-ink-line/20 bg-paper p-6 sm:p-10 shadow-2xl dark:border-paper/20 dark:bg-ink"
            >
              {/* Modal Controls */}
              <div className="sticky -top-6 -mt-6 mb-6 flex items-center justify-between border-b border-ink-line/10 bg-paper/95 py-4 dark:border-paper/10 dark:bg-ink/95 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-gold-dark dark:text-gold">
                    Rajesh Kumar — Verified CV
                  </span>
                  <span className="rounded-full bg-teal/10 px-2.5 py-0.5 font-mono text-[10px] text-teal-dark dark:text-teal-light">
                    7+ Years Exp
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 rounded-full border border-ink-line/20 px-3 py-1.5 text-xs font-medium text-ink hover:border-gold dark:border-paper/20 dark:text-paper"
                  >
                    <Printer className="h-3.5 w-3.5" /> Print / PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-line/20 text-ink/70 hover:bg-ink-line/10 dark:border-paper/20 dark:text-paper/70 dark:hover:bg-paper/10"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* CV Body */}
              <div className="space-y-8 text-ink dark:text-paper print:text-black">
                {/* Header */}
                <div className="border-b border-ink-line/15 pb-6 dark:border-paper/15">
                  <h1 className="font-display text-3xl font-bold sm:text-4xl">{profile.name}</h1>
                  <p className="mt-1 font-mono text-sm font-medium text-gold-dark dark:text-gold">
                    Senior Front-End Developer | React.js | Next.js | TypeScript
                  </p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs font-mono text-ink/70 dark:text-paper/70">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" /> {profile.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> {profile.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {profile.location}
                    </span>
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gold-dark hover:underline dark:text-gold">
                      <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                    </a>
                    <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gold-dark hover:underline dark:text-gold">
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  </div>
                </div>

                {/* Professional Summary */}
                <div>
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-gold-dark dark:text-gold">
                    Professional Summary
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80 dark:text-paper/80">
                    {profile.summary}
                  </p>
                </div>

                {/* Technical Expertise */}
                <div>
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-gold-dark dark:text-gold">
                    Technical Expertise
                  </h2>
                  <div className="mt-3 grid gap-3 text-xs sm:grid-cols-2">
                    {skillGroups.map((group) => (
                      <div key={group.title} className="rounded-xl border border-ink-line/10 bg-white/40 p-3 dark:border-paper/10 dark:bg-ink-soft/40">
                        <strong className="font-semibold text-ink dark:text-paper">{group.title}:</strong>
                        <p className="mt-1 text-ink/70 dark:text-paper/70">{group.items.join(", ")}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-gold-dark dark:text-gold">
                    Work Experience
                  </h2>
                  <div className="mt-4 space-y-6">
                    {experience.map((job) => (
                      <div key={job.company} className="border-l-2 border-gold/40 pl-4">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                          <h3 className="font-bold text-sm sm:text-base">
                            {job.role} <span className="text-gold-dark dark:text-gold">· {job.company}</span>
                          </h3>
                          <span className="font-mono text-xs text-ink/50 dark:text-paper/50">
                            {job.start} – {job.end} | {job.location}
                          </span>
                        </div>
                        <ul className="mt-2 space-y-1.5 text-xs text-ink/75 dark:text-paper/75">
                          {job.points.map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-teal flex-shrink-0" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-gold-dark dark:text-gold">
                    Education
                  </h2>
                  <div className="mt-2 text-xs">
                    <p className="font-bold text-sm">{education.degree}</p>
                    <p className="text-ink/70 dark:text-paper/70">
                      {education.school} · {education.years}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
