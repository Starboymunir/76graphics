"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────────
// CSS WRAP DEMO (Day 8) — "most complex CSS" flex piece
// Watch the wrap apply itself with zero JS in the animation. Two stacked
// images (before / after) crossfaded by a CSS clip-path keyframe sweep, plus
// an animated red squeegee bar that moves with the reveal. The whole thing
// loops infinitely. CSS does the heavy lifting via keyframes defined inline.
// ─────────────────────────────────────────────────────────────────────────────

const BEFORE = "/portfolio/1Iuks3iUQRBzhIQWclmDb1aT5VGzw4Veg.jpg";
const AFTER = "/portfolio/1VU5_JpxoQr6GquBehlidPMtnedQ8TyqY.jpg";

export default function WrapApplyDemo() {
  return (
    <section
      className="relative bg-[#f5f5f5] py-24 lg:py-32 overflow-hidden"
      aria-label="Watch a wrap apply"
    >
      {/* Diagonal navy accent band */}
      <div
        className="absolute top-0 left-0 w-full h-32 bg-[#031827]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 60%, 0 100%)" }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left copy */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-px w-10 bg-[#b32025]" />
              <span
                className="text-[#b32025] text-[10px] font-bold tracking-[0.4em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Pure CSS · No JS
              </span>
            </div>
            <h2
              className="text-[#031827] uppercase leading-[0.85]"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.25rem, 5.5vw, 5rem)",
                letterSpacing: "-0.015em",
              }}
            >
              Watch It
              <br />
              <span style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}>
                Apply.
              </span>
            </h2>
            <p
              className="text-[#031827]/70 text-base lg:text-lg mt-6 leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Six-foot panels of premium vinyl, laid clean by hand. The animation
              you&apos;re watching is pure CSS — same craft we put into the cars.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "3M / Avery Dennison certified films",
                "5-year warranty on every install",
                "Heat-formed around every contour",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-[#031827]/80"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span className="mt-2 w-3 h-px bg-[#b32025] shrink-0" />
                  <span className="text-sm">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — animated stage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative aspect-[16/10] overflow-hidden border-[3px] border-[#031827] shadow-2xl shadow-[#031827]/20"
          >
            {/* Before (unwrapped car) */}
            <div className="absolute inset-0">
              <Image
                src={BEFORE}
                alt="Vehicle before wrap"
                fill
                className="object-cover"
                sizes="60vw"
              />
            </div>

            {/* After (wrapped) — clipped + animated */}
            <div className="wrap-after absolute inset-0">
              <Image
                src={AFTER}
                alt="Vehicle after wrap"
                fill
                className="object-cover"
                sizes="60vw"
              />
              {/* Vinyl shine overlay */}
              <div className="absolute inset-0 vinyl-shine pointer-events-none" />
            </div>

            {/* Squeegee bar */}
            <div className="squeegee" aria-hidden />

            {/* Status pill */}
            <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b32025] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b32025]" />
              </span>
              <span
                className="bg-[#031827] text-white text-[9px] font-bold tracking-[0.3em] uppercase px-2.5 py-1"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Wrapping
              </span>
            </div>

            {/* Step indicator */}
            <div className="absolute bottom-4 right-4 flex items-center gap-3 pointer-events-none z-10">
              <span
                className="text-white text-[9px] font-bold tracking-[0.3em] uppercase bg-[#031827]/80 px-3 py-1.5"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                01 → Strip · 02 → Lay · 03 → Heat · 04 → Done
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scoped CSS for the wrap animation. Pure keyframes — no JS. */}
      <style jsx>{`
        .wrap-after {
          clip-path: inset(0 100% 0 0);
          animation: wrap-sweep 6.5s ease-in-out infinite;
        }
        @keyframes wrap-sweep {
          0% {
            clip-path: inset(0 100% 0 0);
          }
          40% {
            clip-path: inset(0 0% 0 0);
          }
          60% {
            clip-path: inset(0 0% 0 0);
          }
          100% {
            clip-path: inset(0 100% 0 0);
          }
        }

        .squeegee {
          position: absolute;
          top: -10%;
          bottom: -10%;
          left: 0;
          width: 14px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.45) 30%,
            #b32025 50%,
            rgba(255, 255, 255, 0.45) 70%,
            transparent 100%
          );
          box-shadow:
            0 0 24px rgba(179, 32, 37, 0.6),
            0 0 60px rgba(179, 32, 37, 0.35);
          transform: translateX(0);
          animation: squeegee-sweep 6.5s ease-in-out infinite;
          z-index: 5;
          pointer-events: none;
        }
        @keyframes squeegee-sweep {
          0% {
            transform: translateX(-20px) skewX(-8deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          40% {
            transform: translateX(calc(100% + 20px)) skewX(-8deg);
            opacity: 1;
          }
          45% {
            opacity: 0;
          }
          59% {
            opacity: 0;
            transform: translateX(calc(100% + 20px)) skewX(-8deg);
          }
          60% {
            opacity: 0;
            transform: translateX(calc(100% + 20px)) skewX(8deg);
          }
          65% {
            opacity: 1;
          }
          100% {
            transform: translateX(-20px) skewX(8deg);
            opacity: 1;
          }
        }

        .vinyl-shine {
          background: linear-gradient(
            115deg,
            transparent 30%,
            rgba(255, 255, 255, 0.18) 45%,
            transparent 60%
          );
          background-size: 250% 250%;
          animation: shine-drift 6.5s ease-in-out infinite;
          mix-blend-mode: overlay;
        }
        @keyframes shine-drift {
          0%, 40% {
            background-position: 100% 0%;
            opacity: 0;
          }
          50% {
            opacity: 0.9;
          }
          60%, 100% {
            background-position: -50% 100%;
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wrap-after,
          .squeegee,
          .vinyl-shine {
            animation: none;
          }
          .wrap-after {
            clip-path: inset(0 0% 0 0);
          }
          .squeegee {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
