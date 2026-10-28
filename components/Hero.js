"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, FileText, Sparkles, CheckCircle2, ShieldCheck, Globe as GlobeIcon, Zap } from "lucide-react";
import { profile } from "@/lib/data";
import DepartureBoard from "./DepartureBoard";
import Globe3D from "./Globe3D";
import Card3D from "./Card3D";
import VisitorCounter from "./VisitorCounter";
import HangingIDCard from "./HangingIDCard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-0 sm:pt-16 lg:pt-20">
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[500px] w-[500px] rounded-full bg-gold/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 -left-24 h-[440px] w-[440px] rounded-full bg-teal/15 blur-[130px]"
      />

      <div className="container-page relative z-10 pb-16 sm:pb-24">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-12">
        {/* Left Column: Avatar + Hero Headline & CTAs */}
        <div className="order-2 lg:order-1">
          {/* Top Row: Avatar & Visitor Counter */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mb-6 flex flex-wrap items-center gap-3.5"
          >
            {/* Live Visitor Counter Pill */}
            <VisitorCounter variant="badge" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-display text-3xl font-medium leading-[1.05] text-balance sm:text-4xl md:text-5xl"
          >
            Architecting web ecosystems and booking engines that{" "}
            <span className="italic text-gradient-gold">scale without compromise.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink/75 dark:text-paper/75 sm:text-lg"
          >
            Senior Front-End Developer with <strong className="text-ink dark:text-paper">7+ years</strong> building
            mission-critical platforms across hospitality, enterprise SaaS, and high-concurrency booking engines using{" "}
            <span className="font-normal text-gold-dark dark:text-gold">React.js, Next.js, and TypeScript</span> — delivering sub-second Core Web Vitals and zero-drift UI consistency.
          </motion.p>

          {/* Key Value Proposition Chips */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2.5}
            className="mt-6 flex flex-wrap items-center gap-2.5 text-xs text-ink/65 dark:text-paper/65"
          >
            <span className="flex items-center gap-1.5 rounded-full border border-ink-line/10 bg-white/40 px-3 py-1 dark:border-paper/10 dark:bg-ink-soft/40">
              <CheckCircle2 className="h-3.5 w-3.5 text-teal" /> 1.5s Flagship Mobile LCP
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-ink-line/10 bg-white/40 px-3 py-1 dark:border-paper/10 dark:bg-ink-soft/40">
              <ShieldCheck className="h-3.5 w-3.5 text-gold" /> STAAH &amp; Payment APIs
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-ink-line/10 bg-white/40 px-3 py-1 dark:border-paper/10 dark:bg-ink-soft/40">
              <Sparkles className="h-3.5 w-3.5 text-teal" /> 26+ Shipped Systems
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-normal text-paper transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ink/20 dark:bg-gold dark:text-ink dark:hover:shadow-gold/25"
            >
              Get in Touch
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-ink-line/20 px-6 py-3.5 text-sm font-normal text-ink/80 transition-all hover:border-gold hover:text-gold-dark dark:border-paper/20 dark:text-paper/80 dark:hover:text-gold"
            >
              Explore 26+ Projects
            </a>

            <a
              href="#resume-cv"
              className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-5 py-3.5 text-sm font-medium text-gold-dark transition-all hover:bg-gold/20 dark:text-gold"
            >
              <FileText className="h-4 w-4" />
              View Resume
            </a>

            <div className="flex items-center gap-3 pl-1 text-ink/50 dark:text-paper/50">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub profile"
                className="transition-colors hover:text-gold-dark dark:hover:text-gold"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn profile"
                className="transition-colors hover:text-gold-dark dark:hover:text-gold"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Hanging ID card (hangs from the navbar edge on desktop) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="order-1 lg:order-2 relative flex justify-center lg:-mt-20 lg:justify-center"
        >
          <HangingIDCard />
        </motion.div>
      </div>

      {/* Second row: 3D Globe + Core Web Vitals console */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-14 grid gap-6 sm:mt-20 lg:grid-cols-2 lg:items-center"
      >
        <div className="flex w-full justify-center">
          <Globe3D />
        </div>
        <div className="mx-auto w-full max-w-[500px]">
          <Card3D>
            <DepartureBoard />
          </Card3D>
        </div>
      </motion.div>
    </div>
    </section>
  );
}
