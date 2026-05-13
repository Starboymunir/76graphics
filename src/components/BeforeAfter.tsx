"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// BEFORE / AFTER SLIDER
// Inspired by 360wraps.com — drag the divider to reveal the wrap.
// Replace the BEFORE / AFTER image paths with a real paired shoot when ready.
// ─────────────────────────────────────────────────────────────────────────────

interface Pair {
  before: string;
  after: string;
  label: string;
  meta: string;
}

const PAIRS: Pair[] = [
  {
    // ⚠️ TODO: swap these with a true before/after pair shot from the same angle.
    before: "/portfolio/1Iuks3iUQRBzhIQWclmDb1aT5VGzw4Veg.jpg",
    after: "/portfolio/1VU5_JpxoQr6GquBehlidPMtnedQ8TyqY.jpg",
    label: "Box Truck · Full Wrap",
    meta: "3M Controltac · 5 days · Brooklyn, NY",
  },
];

export default function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35, once: false });
  const [pos, setPos] = useState(50); // percent
  const [pairIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pair = PAIRS[pairIndex];

  // Auto-introduction sweep on first reveal
  const introDone = useRef(false);
  useEffect(() => {
    if (!inView || introDone.current) return;
    introDone.current = true;
    let raf = 0;
    const start = performance.now();
    const duration = 1800;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (t: number) => {
      const k = Math.min((t - start) / duration, 1);
      // 50 → 18 → 82 → 50 sweep
      const e = easeOutCubic(k);
      const v = 50 + Math.sin(e * Math.PI * 2) * 32;
      setPos(v);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
    if (e.key === "Home") setPos(0);
    if (e.key === "End") setPos(100);
  };

  return (
    <section
      ref={ref}
      className="relative bg-[#031827] py-24 lg:py-32 overflow-hidden isolate"
      aria-label="Before and after wrap reveal"
    >
      {/* Backdrop glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(40,84,147,0.7) 0%, transparent 45%), radial-gradient(circle at 10% 80%, rgba(179,32,37,0.5) 0%, transparent 45%)",
        }}
      />
      <div className="brand-stars-bg absolute inset-0 opacity-15 pointer-events-none" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 lg:mb-14">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-10 bg-[#b32025]" />
              <span
                className="text-[#b32025] text-[10px] font-bold tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Drag To Reveal · Before / After
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
              From Plain
              <br />
              <span style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}>
                To Unmissable.
              </span>
            </h2>
          </div>
          <div className="lg:max-w-md">
            <p
              className="text-white/65 text-base lg:text-lg leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Slide the handle. Watch a blank box truck transform into a 360°
              billboard that earns 30,000+ impressions per day on the road.
            </p>
            <p
              className="mt-3 text-white/40 text-xs tracking-wide"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {pair.meta}
            </p>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] lg:aspect-[21/9] bg-[#020c14] border border-white/10 overflow-hidden select-none touch-none cursor-ew-resize"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* AFTER — full width */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pair.after}
            alt={`${pair.label} — after wrap`}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
          <span className="absolute top-4 right-4 bg-[#b32025] text-white text-[9px] font-bold tracking-[0.3em] uppercase px-2.5 py-1 pointer-events-none">
            After
          </span>

          {/* BEFORE — clipped from the left */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pair.before}
              alt={`${pair.label} — before wrap`}
              className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 contrast-110"
              draggable={false}
            />
            <span className="absolute top-4 left-4 bg-white text-[#031827] text-[9px] font-bold tracking-[0.3em] uppercase px-2.5 py-1">
              Before
            </span>
          </div>

          {/* Divider line + handle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none"
            style={{ left: `${pos}%`, transform: "translateX(-1px)" }}
          />
          <button
            type="button"
            tabIndex={0}
            aria-label="Drag to reveal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            role="slider"
            onKeyDown={onKeyDown}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-[0_0_0_4px_rgba(179,32,37,0.6),0_8px_24px_rgba(0,0,0,0.45)] flex items-center justify-center cursor-ew-resize focus:outline-none focus:ring-4 focus:ring-[#b32025]/50"
            style={{ left: `${pos}%` }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#031827" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polyline points="9 6 3 12 9 18" />
              <polyline points="15 6 21 12 15 18" />
            </svg>
          </button>

          {/* Caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <span
              className="text-white/85 text-[10px] font-bold tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              ← Drag · {pair.label} · Drag →
            </span>
          </motion.div>
        </div>

        <p
          className="mt-6 text-white/35 text-[11px] tracking-wide"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Tip: works with mouse, touch, and keyboard arrow keys.
        </p>
      </div>
    </section>
  );
}
