"use client";

import { motion } from "framer-motion";
import { DesignIcon, QuoteIcon, TruckIcon } from "@/components/BrandIcons";

const STEPS = [
  {
    number: "01",
    Icon: DesignIcon,
    title: "Tell Us Your Goal",
    body: "We learn about your business, audience, and objectives — so every design decision is strategic, not just aesthetic.",
    accent: "Goal",
  },
  {
    number: "02",
    Icon: QuoteIcon,
    title: "Build Your Strategy",
    body: "We map out the right mix of branding, digital, and physical assets for your business. You get a clear plan before a single dollar is spent.",
    accent: "Strategy",
  },
  {
    number: "03",
    Icon: TruckIcon,
    title: "Design & Produce",
    body: "Our team brings everything to life — design, print, and execution. 3M-certified installation, fast turnaround, zero guesswork.",
    accent: "Produce",
  },
];

export default function Process() {
  return (
    <section className="relative py-28 bg-[#092f4d] brand-stars-bg overflow-hidden">

      {/* ── Giant background typography ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <span
          className="text-white/[0.025] font-black uppercase leading-none whitespace-nowrap"
          style={{
            fontFamily: "'Apotek Extended', sans-serif",
            fontSize: "clamp(8rem, 22vw, 22rem)",
            letterSpacing: "-0.04em",
          }}
        >
          PROCESS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-14 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-6">
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
                How It Works
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-white uppercase leading-[0.88]"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
              }}
            >
              Our{" "}
              <span
                style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
              >
                Process
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/35 text-sm leading-relaxed max-w-xs"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A proven 3-step system to build your brand the right way.
          </motion.p>
        </div>

        {/* ── Steps ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-[#061e31]/60 hover:bg-[#061e31]/90 transition-colors duration-400 p-10 xl:p-14 overflow-hidden cursor-default"
            >
              {/* Top red bar draws in on hover */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#b32025] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              {/* Huge ghost number */}
              <div
                aria-hidden="true"
                className="absolute -top-4 -right-3 font-black leading-none select-none pointer-events-none transition-all duration-500 group-hover:opacity-100"
                style={{
                  fontFamily: "'Apotek Extended', sans-serif",
                  fontSize: "9rem",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(179,32,37,0.18)",
                  lineHeight: 1,
                }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div className="relative z-10 mb-8 text-white/50 group-hover:text-[#b32025] transition-colors duration-300">
                <step.Icon size={52} />
              </div>

              {/* Step indicator */}
              <div className="relative z-10 flex items-center gap-3 mb-5">
                <span
                  className="text-[#b32025] text-sm font-black tracking-wider"
                  style={{ fontFamily: "'Apotek Extended', sans-serif" }}
                >
                  {step.number}
                </span>
                <div className="h-px flex-1 bg-white/10 group-hover:bg-[#b32025]/40 transition-colors duration-400" />
              </div>

              <h3
                className="relative z-10 text-white text-xl lg:text-2xl uppercase mb-4 leading-tight"
                style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900 }}
              >
                {step.title}
              </h3>
              <p
                className="relative z-10 text-white/45 group-hover:text-white/65 text-sm leading-relaxed transition-colors duration-300"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Connecting timeline line (desktop) ── */}
        <div className="hidden md:block relative mt-10">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#b32025] to-transparent origin-left"
          />
        </div>

      </div>
    </section>
  );
}