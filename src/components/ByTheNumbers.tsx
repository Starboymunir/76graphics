"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// BY THE NUMBERS — black-canvas stat reel with cursor image trail
// • Big animated counters that count up when in view
// • Cursor leaves a trail of behind-the-scenes thumbnails (Day 4 image trail)
// • Bottom status ticker — "currently wrapping…" credibility loop
// ─────────────────────────────────────────────────────────────────────────────

interface Stat {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  { value: 500, suffix: "+", label: "Vehicles Wrapped", sub: "Sedans · Trucks · Fleets · Exotics" },
  { value: 12, suffix: " yr", label: "On The Road", sub: "Since 2014, Florida-based" },
  { value: 24, suffix: " hr", label: "Typical Turnaround", sub: "Single-vehicle wraps" },
  { value: 4,  suffix: "M sq ft", label: "Vinyl Laid", sub: "And counting, every week" },
];

const TRAIL_IMAGES = [
  "/portfolio/1VU5_JpxoQr6GquBehlidPMtnedQ8TyqY.jpg",
  "/portfolio/1nus0QfhQQWxSsZukZDFM80Beyy8rM_J7.jpg",
  "/portfolio/1kf79pi__xLmSnRamX4cLtJY_RVzgQx_I.jpg",
  "/portfolio/1A7JclbQ26kC6aXoBUx0O3q9D5mKfFI-8.jpg",
  "/portfolio/1Eoz9vDo_DVOIJNZ-pIfGGE1g32SDXVeA.jpg",
  "/portfolio/1F4JeZEX8J-3B5znP326Po8JgD-G7ObZ3.jpg",
  "/portfolio/1HI2f82JMaISz3MfC1BLA6wEnKUBLFJSF.jpg",
  "/portfolio/1jKD6IVrv5vvQY4U0yCy_CmbJCL9URqT4.jpg",
];

const TICKER = [
  "Now wrapping · Sprinter Van · Gloss Black",
  "Printing · 800 sq ft · Perforated Window Film",
  "On the lift · Lexus RC · Color-shift Chrome",
  "In the booth · Fleet of 12 · Mr. Reliable HVAC",
  "Cutting · Architectural Vinyl · Storefront Install",
  "Shipping today · Trade Show Backdrop · 32 ft",
  "Squeegee in hand · 3M Certified Installer",
  "Out for delivery · Ford F-250 · Matte Stealth",
];

export default function ByTheNumbers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] overflow-hidden py-24 lg:py-32"
      aria-label="By the numbers"
    >
      {/* Subtle grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 30%, #ffffff 0%, transparent 0.5px), radial-gradient(circle at 75% 70%, #ffffff 0%, transparent 0.5px)",
          backgroundSize: "3px 3px, 5px 5px",
        }}
      />
      {/* Red ambient glow */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(179,32,37,0.18) 0%, transparent 60%)",
        }}
      />

      {/* Cursor image trail — desktop only */}
      <ImageTrail boundaryRef={sectionRef} />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-10 bg-[#b32025]" />
              <span
                className="text-[#b32025] text-[10px] font-bold tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Inside The Shop
              </span>
            </div>
            <h2
              className="text-white uppercase leading-[0.85]"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.75rem, 7vw, 6.5rem)",
                letterSpacing: "-0.015em",
              }}
            >
              By The
              <br />
              <span style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}>
                Numbers.
              </span>
            </h2>
          </div>
          <p
            className="text-white/55 text-base lg:text-lg max-w-md leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Twelve years. Four million square feet of vinyl. One shop in Florida that
            just keeps shipping.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {STATS.map((stat, i) => (
            <StatBlock key={stat.label} stat={stat} active={inView} delay={i * 0.12} />
          ))}
        </div>

        {/* Status ticker */}
        <div className="mt-14 border-t border-b border-white/10 py-5 overflow-hidden relative">
          <div className="flex items-center gap-3 absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#0a0a0a] pr-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b32025] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#b32025]" />
            </span>
            <span
              className="text-white text-[10px] font-bold tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Live
            </span>
            <span className="h-4 w-px bg-white/20 ml-1" />
          </div>
          <Ticker />
        </div>

        {/* Materials we trust */}
        <div className="mt-14 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
          <span
            className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase shrink-0"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Films We Trust —
          </span>
          <div className="flex flex-wrap items-center gap-6 lg:gap-10">
            {["3M", "Avery Dennison", "Inozetek", "Hexis", "Oracal"].map((brand) => (
              <span
                key={brand}
                className="text-white/65 hover:text-white transition-colors text-base lg:text-lg uppercase tracking-tight"
                style={{
                  fontFamily: "'Apotek Extended', sans-serif",
                  fontWeight: 900,
                  letterSpacing: "-0.01em",
                }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STAT BLOCK — animated counter
// ─────────────────────────────────────────────────────────────────────────────
function StatBlock({ stat, active, delay }: { stat: Stat; active: boolean; delay: number }) {
  const [display, setDisplay] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (!active) return;
    const controls = animate(motionValue, stat.value, {
      duration: 2,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return controls.stop;
  }, [active, motionValue, stat.value, delay]);

  // Format: keep value as integer for whole-number stats, or 1 decimal for "4M" → 4
  const formatted = stat.value < 10 ? display.toFixed(1).replace(/\.0$/, "") : Math.round(display).toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-[#0a0a0a] p-6 lg:p-9 group"
    >
      {/* Number */}
      <div className="flex items-baseline">
        <span
          className="text-white tabular-nums"
          style={{
            fontFamily: "'Apotek Extended', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3.5rem, 7vw, 6.5rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
        >
          {stat.prefix}
          {formatted}
        </span>
        <span
          className="text-[#b32025] ml-1"
          style={{
            fontFamily: "'Apotek Extended', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(1.25rem, 2vw, 2rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <div className="mt-4 lg:mt-6">
        <h3
          className="text-white uppercase leading-tight"
          style={{
            fontFamily: "'Apotek Extended', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(0.9rem, 1.05vw, 1.05rem)",
            letterSpacing: "0.02em",
          }}
        >
          {stat.label}
        </h3>
        <p
          className="text-white/40 text-xs mt-1.5"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {stat.sub}
        </p>
      </div>

      {/* Hover red bar */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-[#b32025] w-0 group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TICKER — infinite horizontal status loop
// ─────────────────────────────────────────────────────────────────────────────
function Ticker() {
  return (
    <motion.div
      className="flex gap-12 whitespace-nowrap pl-24"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
    >
      {[...TICKER, ...TICKER].map((line, i) => (
        <span
          key={i}
          className="text-white/70 text-sm tracking-wide inline-flex items-center gap-12"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {line}
          <span className="text-[#b32025]">●</span>
        </span>
      ))}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE TRAIL — cursor-following thumbnails (Day 4)
// Tracks recent mouse positions inside the section, drops a stack of small
// portfolio thumbnails that fade out and scale down. Pure DOM, throttled by
// distance threshold + rAF.
// ─────────────────────────────────────────────────────────────────────────────
type TrailItem = { id: number; x: number; y: number; src: string };

function ImageTrail({ boundaryRef }: { boundaryRef: React.RefObject<HTMLDivElement | null> }) {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const lastRef = useRef<{ x: number; y: number } | null>(null);
  const idRef = useRef(0);
  const imgIdxRef = useRef(0);
  const enabledRef = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Disable on touch devices and reduced motion
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    enabledRef.current = !coarse && !reduced;
    if (!enabledRef.current) return;

    const el = boundaryRef.current;
    if (!el) return;

    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const last = lastRef.current;
      const dist = last ? Math.hypot(x - last.x, y - last.y) : Infinity;
      if (dist < 110) return; // distance throttle — only drop every ~110px
      lastRef.current = { x, y };
      const src = TRAIL_IMAGES[imgIdxRef.current % TRAIL_IMAGES.length];
      imgIdxRef.current += 1;
      const id = idRef.current++;
      setTrail((prev) => [...prev.slice(-7), { id, x, y, src }]); // cap at 8
      window.setTimeout(() => {
        setTrail((prev) => prev.filter((t) => t.id !== id));
      }, 1200);
    };

    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, [boundaryRef]);

  return (
    <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
      <AnimatePresence>
        {trail.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, scale: 0.7, rotate: (Math.random() - 0.5) * 8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
            style={{
              top: t.y,
              left: t.x,
              transform: "translate(-50%, -50%)",
              width: "clamp(160px, 14vw, 240px)",
              aspectRatio: "4 / 5",
            }}
          >
            <div className="relative w-full h-full overflow-hidden shadow-2xl shadow-black/60">
              <Image
                src={t.src}
                alt=""
                fill
                className="object-cover"
                sizes="240px"
                aria-hidden
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
