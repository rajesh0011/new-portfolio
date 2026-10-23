"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { Code2, Database, Layout, Gauge, GitBranch, Cpu } from "lucide-react";
import Card3D from "./Card3D";

const icons = [Code2, Database, Layout, Gauge, GitBranch, Cpu];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-page">
        <div className="mb-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-4">Technical Stack &amp; Competencies</p>
            <h2 className="section-heading max-w-2xl">
              Enterprise engineering tooling tuned for velocity and scale.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ink/60 dark:text-paper/60">
            Validated across production environments serving hundreds of thousands of monthly active users.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="h-full"
              >
                <Card3D className="flex h-full flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-display text-lg font-medium text-ink dark:text-paper">
                        {group.title}
                      </h3>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold-dark dark:text-gold">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-ink-line/15 bg-white/40 px-3 py-1 font-mono text-xs text-ink/80 transition-all hover:border-gold hover:text-gold-dark dark:border-paper/15 dark:bg-ink-soft/40 dark:text-paper/80 dark:hover:text-gold"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-ink-line/10 pt-3 font-mono text-[10px] uppercase tracking-wider text-ink/40 dark:text-paper/40">
                    Production Proven
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
