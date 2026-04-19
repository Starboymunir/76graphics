"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const BULLETS = [
  "Design + real-world production under one roof",
  "3M-certified installation — no outsourcing",
  "Strategy-first approach, not just aesthetics",
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-[#061e31] relative overflow-hidden">
      {/* Background text */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span
          className="text-white/[0.02] font-black uppercase leading-none whitespace-nowrap"
          style={{
            fontFamily: "'Apotek Extended', sans-serif",
            fontSize: "clamp(8rem, 22vw, 22rem)",
            letterSpacing: "-0.04em",
          }}
        >
          WHY US
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-8 lg:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-10 h-[3px] bg-[#b32025]" />
              <span
                className="text-[#b32025] text-xs font-bold tracking-[0.35em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Why 76 Graphics
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-white uppercase leading-[0.88] mb-6"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
              }}
            >
              We&apos;re Not Just Designers —{" "}
              <span
                style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
              >
                We&apos;re Builders
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p
              className="text-white/55 text-base leading-relaxed mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We combine branding, digital, and real-world production to create
              marketing systems that actually work. No outsourcing. No guesswork.
              Just results.
            </p>
            <ul className="space-y-4">
              {BULLETS.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-white/70 text-sm"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Check size={16} className="text-[#b32025] mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
