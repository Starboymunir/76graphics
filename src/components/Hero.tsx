"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BrandSwoosh from "@/components/BrandSwoosh";

const STATS = [
  { num: "500+", label: "Projects Delivered" },
  { num: "10+",  label: "Years in Business"  },
  { num: "72hr", label: "Avg. Turnaround"    },
  { num: "3M",   label: "Certified Installer" },
];

const staggerItem = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Background photo ── */}
      <Image
        src="/portfolio/1Iuks3iUQRBzhIQWclmDb1aT5VGzw4Veg.jpg"
        alt="76 Graphics professional installation facility"
        fill
        className="object-cover object-center"
        priority
      />

      {/* ── Multi-layer overlay ── */}
      {/* Deep navy gradient from left */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#061e31]/96 via-[#092f4d]/80 to-[#092f4d]/50" />
      {/* Bottom darkening for stat strip legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#061e31]/70 via-transparent to-transparent" />
      {/* Star field tone */}
      <div className="absolute inset-0 brand-stars-bg opacity-25" />

      {/* ── Animated light beams ── */}
      <div className="light-beam" />
      <div className="light-beam light-beam-delay" />

      {/* ── Left red accent bar ── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-[3px] h-full bg-[#b32025] z-20 origin-top"
      />

      {/* ── Massive "76" watermark ── */}
      <div
        aria-hidden="true"
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 select-none pointer-events-none z-0"
        style={{
          fontFamily: "'Apotek Extended', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(18rem, 36vw, 52rem)",
          lineHeight: 0.85,
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(255,255,255,0.06)",
          letterSpacing: "-0.04em",
          userSelect: "none",
        }}
      >
        76
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-6xl mx-auto px-8 lg:px-14 pt-32 pb-16">

        {/* Eyebrow label */}
        <motion.div
          custom={0}
          variants={staggerItem}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4 mb-8"
        >
          <span
            className="text-[#b32025] text-xs font-bold tracking-[0.35em] uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Branding &amp; Marketing Partner
          </span>
          <div className="h-px w-16 bg-[#b32025]" />
        </motion.div>

        {/* Main headline — 3 staggered lines */}
        <div className="mb-6 overflow-hidden">
          <motion.div
            custom={1}
            variants={staggerItem}
            initial="hidden"
            animate="visible"
          >
            <h1
              className="text-white uppercase leading-[0.88]"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(3rem, 7.5vw, 7rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Your All-In-One
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={staggerItem}
            initial="hidden"
            animate="visible"
          >
            <h1
              className="uppercase leading-[0.88]"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(3rem, 7.5vw, 7rem)",
                letterSpacing: "-0.01em",
                color: "transparent",
                WebkitTextStroke: "2px #b32025",
              }}
            >
              Branding &amp;
            </h1>
          </motion.div>

          <motion.div
            custom={3}
            variants={staggerItem}
            initial="hidden"
            animate="visible"
          >
            <h1
              className="text-white uppercase leading-[0.88]"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(3rem, 7.5vw, 7rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Marketing Partner
            </h1>
          </motion.div>
        </div>

        {/* Sub-headline */}
        <motion.p
          custom={4}
          variants={staggerItem}
          initial="hidden"
          animate="visible"
          className="text-white/60 text-base lg:text-lg leading-relaxed max-w-xl mb-12"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          From logos to websites, vehicle wraps to promotional products — we build
          brands that get noticed, look professional, and drive real growth.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          custom={5}
          variants={staggerItem}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-start gap-4 mb-16"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 bg-[#b32025] text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(179,32,37,0.5)]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <span className="relative z-10">Get a Quote</span>
            <ArrowRight size={16} className="relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
            {/* Shimmer overlay */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          </Link>
          <Link
            href="/our-work"
            className="inline-flex items-center gap-3 border border-white/25 hover:border-white text-white/80 hover:text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white/8 hover:-translate-y-0.5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            View Our Work
          </Link>
        </motion.div>

        {/* Stats strip — glass panel */}
        <motion.div
          custom={6}
          variants={staggerItem}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 max-w-2xl"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="glass-navy px-6 py-5 text-center"
            >
              <div
                className="text-white text-2xl lg:text-3xl font-black mb-1 leading-none"
                style={{ fontFamily: "'Apotek Extended', sans-serif" }}
              >
                {s.num}
              </div>
              <div
                className="text-white/45 text-[10px] font-semibold tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-white/30"
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.div>

      {/* ── Brand swoosh divider at bottom ── */}
      <BrandSwoosh position="bottom" />
    </section>
  );
}