"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#architecture", label: "Architecture" },
  { href: "/#projects", label: "Projects (26+)" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#resume-cv", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "border-b border-ink-line/10 dark:border-paper/10 bg-paper/85 dark:bg-ink/85 backdrop-blur-md shadow-sm"
          : "bg-transparent"
        }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        {/* Brand with New SVG Logo <>code.with.raj</> */}
        <Link href="/" className="group flex items-center transition-transform duration-300 hover:scale-[1.03]">
          <Logo className="h-8 w-auto sm:h-9" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-xs font-medium uppercase tracking-wider text-ink/70 transition-colors hover:text-ink dark:text-paper/70 dark:hover:text-paper"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href="/#resume-cv"
            className="hidden items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold text-gold-dark transition-all hover:bg-gold/20 dark:text-gold sm:inline-flex"
          >
            <FileText className="h-3.5 w-3.5" />
            CV
          </a>

          {/* <Link
            href="/freelance"
            className="hidden rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-paper transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-gold dark:text-ink sm:inline-block"
          >
            Hire Me
          </Link> */}

          <ThemeToggle />

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-line/20 dark:border-paper/20 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-ink-line/10 bg-paper/95 dark:border-paper/10 dark:bg-ink/95 lg:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              <div className="mb-2 px-3 pb-2 border-b border-ink-line/10 dark:border-paper/10">
                <Logo className="h-8 w-auto" />
              </div>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink/80 hover:bg-ink-line/5 dark:text-paper/80 dark:hover:bg-paper/5"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2">
                <a
                  href="/#resume-cv"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-lg border border-gold/40 bg-gold/10 px-3 py-2 text-center text-xs font-semibold text-gold-dark dark:text-gold"
                >
                  View CV
                </a>
                <Link
                  href="/freelance"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-lg bg-ink px-3 py-2 text-center text-xs font-semibold text-paper dark:bg-gold dark:text-ink"
                >
                  Hire Me
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
