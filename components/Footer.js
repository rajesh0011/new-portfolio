import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import VisitorCounter from "./VisitorCounter";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-ink-line/10 py-12 dark:border-paper/10 bg-white/30 dark:bg-ink-soft/30 backdrop-blur-sm">
      <div className="container-page flex flex-col items-center justify-between gap-8 md:flex-row">
        {/* Left: SVG Logo & Tagline */}
        <div className="flex flex-col items-center gap-2.5 md:items-start">
          <Link href="/" className="inline-block transition-transform hover:scale-[1.03]">
            <Logo className="h-8 w-auto" />
          </Link>
          <p className="text-xs text-ink/55 dark:text-paper/55 max-w-xs text-center md:text-left">
            Crafting high-scale web platforms, booking engines, and design systems.
          </p>
        </div>

        {/* Center: Live Total Visitor Count Badge */}
        <div className="flex flex-col items-center gap-1.5">
          <VisitorCounter variant="footer" />
          <span className="font-mono text-[10px] text-ink/40 dark:text-paper/40">
            Real-time portfolio review analytics
          </span>
        </div>

        {/* Right: Links & Socials */}
        <div className="flex flex-col items-center gap-3 md:items-end">
          <div className="flex items-center gap-5">
            <a
              href="/#projects"
              className="text-xs font-medium text-ink/65 hover:text-gold-dark dark:text-paper/65 dark:hover:text-gold"
            >
              Projects
            </a>
            <a
              href="/#resume-cv"
              className="text-xs font-medium text-ink/65 hover:text-gold-dark dark:text-paper/65 dark:hover:text-gold"
            >
              Resume
            </a>
            <Link
              href="/freelance"
              className="text-xs font-medium text-ink/65 hover:text-gold-dark dark:text-paper/65 dark:hover:text-gold"
            >
              Freelance
            </Link>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="text-ink/50 transition-colors hover:text-gold-dark dark:text-paper/50 dark:hover:text-gold"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="text-ink/50 transition-colors hover:text-gold-dark dark:text-paper/50 dark:hover:text-gold"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="text-ink/50 transition-colors hover:text-gold-dark dark:text-paper/50 dark:hover:text-gold"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          <p className="text-[11px] text-ink/40 dark:text-paper/40 text-center md:text-right">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
