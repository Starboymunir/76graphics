"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * BrandIntro — full-screen cinematic curtain reveal on first visit.
 * Gated by sessionStorage so it only plays once per session.
 *
 * Animation stack:
 *  - Two clip-path curtains close → reveal brand mark
 *  - Brand mark scales + glitch-shift + glow
 *  - Letter-stagger headline ("76 GRAPHICS")
 *  - Curtains exit by clip-path inversion
 */
export default function BrandIntro() {
  const [show, show_] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("76g_intro_played");
    if (seen) return;
    show_(true);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      sessionStorage.setItem("76g_intro_played", "1");
      show_(false);
      document.body.style.overflow = "";
    }, 3500);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="brand-intro"
          className="fixed inset-0 z-[200] pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
        >
          {/* Top curtain */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-[#031827]"
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-101%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Bottom curtain */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#031827]"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "101%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Patriotic stripe — drawn while curtains are closed */}
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] origin-left"
            style={{
              background: "linear-gradient(90deg,#b32025 0%,#ffffff 50%,#285493 100%)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 1, 0] }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 2.8, times: [0, 0.35, 0.85, 1], delay: 0.7 }}
          />

          {/* CENTER STAGE */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            {/* Eyebrow */}
            <motion.span
              className="block text-[#ff6f73] text-[10px] sm:text-xs font-bold tracking-[0.45em] uppercase mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.45em" }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              76 Graphics Presents
            </motion.span>

            {/* Main wordmark — letter stagger */}
            <h1
              aria-label="76 Graphics"
              className="uppercase text-white leading-none flex flex-wrap justify-center"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 11vw, 9rem)",
                letterSpacing: "-0.01em",
              }}
            >
              {"76 GRAPHICS".split("").map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  className="inline-block"
                  initial={{ y: "120%", opacity: 0, rotateX: -90 }}
                  animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                  exit={{ y: "-120%", opacity: 0 }}
                  transition={{
                    delay: 1.05 + i * 0.06,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    display: "inline-block",
                    transformOrigin: "50% 100%",
                    whiteSpace: "pre",
                    textShadow: i === 1 ? "0 0 24px rgba(179,32,37,0.55)" : undefined,
                  }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </h1>

            {/* Tagline */}
            <motion.p
              className="mt-6 text-white/70 text-sm sm:text-base tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.5 }}
            >
              Leave Ordinary Behind
            </motion.p>

            {/* Loading-bar pulse */}
            <motion.div
              className="mt-10 h-[2px] w-48 sm:w-72 bg-white/10 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#b32025] via-white to-[#285493]"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ delay: 2.25, duration: 1.0, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
