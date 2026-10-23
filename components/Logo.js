"use client";

export default function Logo({ className = "h-8 w-auto", ...props }) {
  return (
    <div className={`inline-flex items-center select-none font-mono tracking-tight ${className}`} {...props}>
      <svg
        viewBox="0 0 250 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        aria-label="code.with.raj"
      >
        <defs>
          {/* Gradients matching web application design system */}
          <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5FD4C4" />
            <stop offset="100%" stopColor="#22B8A6" />
          </linearGradient>

          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8C989" />
            <stop offset="100%" stopColor="#D4A857" />
          </linearGradient>

          <linearGradient id="bracketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22B8A6" />
            <stop offset="100%" stopColor="#D4A857" />
          </linearGradient>

          {/* Subtle glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#22B8A6" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Background pill subtle glow */}
        <rect
          x="1"
          y="2"
          width="248"
          height="36"
          rx="18"
          fill="currentColor"
          className="text-ink/5 dark:text-paper/5 transition-colors"
        />
        <rect
          x="1"
          y="2"
          width="248"
          height="36"
          rx="18"
          stroke="currentColor"
          strokeWidth="1"
          className="text-ink-line/10 dark:text-paper/10"
        />

        {/* Text Representation: <>code.with.raj</> */}
        <text
          x="14"
          y="26"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
          fontSize="17"
          fontWeight="700"
          letterSpacing="-0.5px"
        >
          {/* Opening <> bracket in vibrant teal */}
          <tspan fill="url(#tealGrad)" fontWeight="800" filter="url(#glow)">
            &lt;&gt;
          </tspan>

          {/* "code" text in dark/light contrast */}
          <tspan
            fill="currentColor"
            className="text-ink dark:text-paper transition-colors"
            fontWeight="700"
          >
            code
          </tspan>

          {/* First dot in gold */}
          <tspan fill="url(#goldGrad)" fontWeight="800">
            .
          </tspan>

          {/* "with" in subtle teal/gold tint */}
          <tspan fill="#22B8A6" fontWeight="600">
            with
          </tspan>

          {/* Second dot in gold */}
          <tspan fill="url(#goldGrad)" fontWeight="800">
            .
          </tspan>

          {/* "raj" in highlighted gold */}
          <tspan fill="url(#goldGrad)" fontWeight="800" filter="url(#glow)">
            raj
          </tspan>

          {/* Closing </> bracket in gradient teal/gold */}
          <tspan fill="url(#bracketGrad)" fontWeight="800" filter="url(#glow)">
            &lt;/&gt;
          </tspan>
        </text>
      </svg>
    </div>
  );
}
