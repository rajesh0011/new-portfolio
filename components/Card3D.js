"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Card3D({ children, className = "", onClick, href, ...props }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for smooth 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for buttery-smooth recovery
  const mouseXSpring = useSpring(x, { stiffness: 260, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 260, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-9deg", "9deg"]);

  // Glare / shine reflection coordinates
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
    });
  }

  function handleMouseEnter() {
    setHovered(true);
  }

  function handleMouseLeave() {
    setHovered(false);
    x.set(0);
    y.set(0);
  }

  const Component = href ? motion.a : motion.div;
  const linkProps = href ? { href, target: "_blank", rel: "noreferrer noopener" } : {};

  return (
    <Component
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden rounded-2xl border border-ink-line/10 bg-white/70 shadow-sm transition-shadow duration-300 hover:shadow-2xl hover:shadow-gold/10 dark:border-paper/10 dark:bg-ink-soft/70 backdrop-blur-md ${className}`}
      {...linkProps}
      {...props}
    >
      {/* 3D dynamic specular sheen */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: hovered ? 0.35 : 0,
          background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(212, 168, 87, 0.25), transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-0 h-full w-full">{children}</div>
    </Component>
  );
}
