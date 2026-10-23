"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { profile, education } from "@/lib/data";
import { Award, Briefcase, GraduationCap, MapPin, CheckCircle2, Sparkles } from "lucide-react";
import Card3D from "./Card3D";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
        <div>
          {/* Avatar Profile Card with Visual Polish */}
          <div className="mb-8 flex items-center gap-4">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-gold/40 shadow-lg shadow-gold/15">
              <Image
                src="/avatar.jpg"
                alt="Rajesh Kumar Avatar"
                fill
                sizes="80px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-teal-dark dark:text-teal-light">
                <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
                <span>Available for Select Engagements</span>
              </div>
              <h3 className="font-display text-xl font-bold sm:text-2xl mt-0.5">{profile.name}</h3>
              <p className="text-xs font-mono text-gold-dark dark:text-gold">7+ Years · Senior Frontend Architect</p>
            </div>
          </div>

          <p className="eyebrow mb-3">Engineering Profile</p>
          <h2 className="section-heading">
            7+ years architecting web ecosystems where every millisecond counts.
          </h2>
          <p className="mt-5 text-sm text-ink/65 dark:text-paper/65">
            Specializing in high-traffic hotel reservation platforms, B2B agent portals, enterprise CRMs, and scalable Next.js applications.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-start gap-3 text-sm text-ink/80 dark:text-paper/80">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
              <span><strong>Engineering Excellence:</strong> Micro-frontend mindset, modular design systems, clean code, and zero-regression deployments.</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-ink/80 dark:text-paper/80">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" />
              <span><strong>Data &amp; State:</strong> Deep mastery of TanStack Query (React Query), Redux Toolkit, Context API, and async caching.</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-ink/80 dark:text-paper/80">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
              <span><strong>System Integrations:</strong> STAAH reservation engines, REST/GraphQL APIs, Razorpay/Stripe, and JWT RBAC authentication.</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-base leading-relaxed text-ink/80 dark:text-paper/80 sm:text-lg">
            {profile.summary}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card3D className="p-5">
              <div className="mb-2 flex items-center gap-2 text-gold-dark dark:text-gold">
                <MapPin className="h-4 w-4" />
                <span className="eyebrow">Location &amp; Availability</span>
              </div>
              <p className="font-medium text-ink dark:text-paper">{profile.location}</p>
              <p className="mt-1 text-xs text-ink/60 dark:text-paper/60">
                Open to In-Office, Hybrid &amp; Remote roles worldwide.
              </p>
            </Card3D>

            <Card3D className="p-5">
              <div className="mb-2 flex items-center gap-2 text-gold-dark dark:text-gold">
                <GraduationCap className="h-4 w-4" />
                <span className="eyebrow">Education</span>
              </div>
              <p className="font-medium text-ink dark:text-paper">{education.degree}</p>
              <p className="mt-1 text-xs text-ink/60 dark:text-paper/60">
                {education.school} · {education.years}
              </p>
            </Card3D>
          </div>

          <Card3D className="p-6">
            <div className="mb-3 flex items-center gap-2 text-teal-dark dark:text-teal-light">
              <Award className="h-4 w-4" />
              <span className="eyebrow">Core Engineering Standards</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs text-ink/75 dark:text-paper/75 sm:grid-cols-3">
              <div>
                <p className="font-semibold text-ink dark:text-paper">Component-Driven</p>
                <p className="text-[11px] text-ink/50 dark:text-paper/50">Figma tokens to reusable code</p>
              </div>
              <div>
                <p className="font-semibold text-ink dark:text-paper">Core Web Vitals</p>
                <p className="text-[11px] text-ink/50 dark:text-paper/50">1.5s LCP, 136ms INP, 0.02 CLS</p>
              </div>
              <div>
                <p className="font-semibold text-ink dark:text-paper">Accessibility</p>
                <p className="text-[11px] text-ink/50 dark:text-paper/50">WCAG 2.1 AA keyboard/screen reader</p>
              </div>
            </div>
          </Card3D>
        </div>
      </div>
    </section>
  );
}
