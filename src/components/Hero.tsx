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

      {/* ── Animated light beam + flag sweep ── */}
      <div className="light-beam" />
      <div className="flag-sweep" aria-hidden="true" />

      {/* ── Left red accent bar ── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-[3px] h-full bg-[#b32025] z-20 origin-top"
      />

      {/* ── Patriotic Shield Crest ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
        className="absolute right-[6%] top-[14%] hidden lg:block z-[1] pointer-events-none select-none"
      >
        <svg viewBox="0 0 160 200" className="w-28 xl:w-36 drop-shadow-2xl" style={{ filter: "drop-shadow(0 4px 24px rgba(9,47,77,0.6))" }}>
          {/* Shield shape */}
          <defs>
            <clipPath id="shield">
              <path d="M8,4 L152,4 Q156,4 156,8 L156,120 Q156,145 80,192 Q4,145 4,120 L4,8 Q4,4 8,4 Z" />
            </clipPath>
            <linearGradient id="shieldBorder" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#567fa7" />
              <stop offset="100%" stopColor="#285493" />
            </linearGradient>
          </defs>
          {/* Outer border glow */}
          <path d="M8,4 L152,4 Q156,4 156,8 L156,120 Q156,145 80,192 Q4,145 4,120 L4,8 Q4,4 8,4 Z"
            fill="none" stroke="url(#shieldBorder)" strokeWidth="3" opacity="0.7" />
          <g clipPath="url(#shield)">
            {/* Red & white stripes background */}
            <rect x="0" y="0" width="160" height="200" fill="#b32025" />
            <rect x="0" y="15.4" width="160" height="15.4" fill="#fff" />
            <rect x="0" y="46.2" width="160" height="15.4" fill="#fff" />
            <rect x="0" y="76.9" width="160" height="15.4" fill="#fff" />
            <rect x="0" y="107.7" width="160" height="15.4" fill="#fff" />
            <rect x="0" y="138.5" width="160" height="15.4" fill="#fff" />
            <rect x="0" y="169.2" width="160" height="15.4" fill="#fff" />
            {/* Blue canton with stars */}
            <rect x="0" y="0" width="76" height="84" fill="#092f4d" />
            {/* 5×4 + 4×3 star pattern (30 stars for visual balance) */}
            {/* Row 1: 5 */}
            <polygon points="10,8 11.1,11.4 14.7,11.4 11.8,13.4 12.9,16.8 10,14.8 7.1,16.8 8.2,13.4 5.3,11.4 8.9,11.4" fill="#fff" opacity="0.9" />
            <polygon points="24,8 25.1,11.4 28.7,11.4 25.8,13.4 26.9,16.8 24,14.8 21.1,16.8 22.2,13.4 19.3,11.4 22.9,11.4" fill="#fff" opacity="0.9" />
            <polygon points="38,8 39.1,11.4 42.7,11.4 39.8,13.4 40.9,16.8 38,14.8 35.1,16.8 36.2,13.4 33.3,11.4 36.9,11.4" fill="#fff" opacity="0.9" />
            <polygon points="52,8 53.1,11.4 56.7,11.4 53.8,13.4 54.9,16.8 52,14.8 49.1,16.8 50.2,13.4 47.3,11.4 50.9,11.4" fill="#fff" opacity="0.9" />
            <polygon points="66,8 67.1,11.4 70.7,11.4 67.8,13.4 68.9,16.8 66,14.8 63.1,16.8 64.2,13.4 61.3,11.4 64.9,11.4" fill="#fff" opacity="0.9" />
            {/* Row 2: 4 (offset) */}
            <polygon points="17,20 18.1,23.4 21.7,23.4 18.8,25.4 19.9,28.8 17,26.8 14.1,28.8 15.2,25.4 12.3,23.4 15.9,23.4" fill="#fff" opacity="0.9" />
            <polygon points="31,20 32.1,23.4 35.7,23.4 32.8,25.4 33.9,28.8 31,26.8 28.1,28.8 29.2,25.4 26.3,23.4 29.9,23.4" fill="#fff" opacity="0.9" />
            <polygon points="45,20 46.1,23.4 49.7,23.4 46.8,25.4 47.9,28.8 45,26.8 42.1,28.8 43.2,25.4 40.3,23.4 43.9,23.4" fill="#fff" opacity="0.9" />
            <polygon points="59,20 60.1,23.4 63.7,23.4 60.8,25.4 61.9,28.8 59,26.8 56.1,28.8 57.2,25.4 54.3,23.4 57.9,23.4" fill="#fff" opacity="0.9" />
            {/* Row 3: 5 */}
            <polygon points="10,32 11.1,35.4 14.7,35.4 11.8,37.4 12.9,40.8 10,38.8 7.1,40.8 8.2,37.4 5.3,35.4 8.9,35.4" fill="#fff" opacity="0.9" />
            <polygon points="24,32 25.1,35.4 28.7,35.4 25.8,37.4 26.9,40.8 24,38.8 21.1,40.8 22.2,37.4 19.3,35.4 22.9,35.4" fill="#fff" opacity="0.9" />
            <polygon points="38,32 39.1,35.4 42.7,35.4 39.8,37.4 40.9,40.8 38,38.8 35.1,40.8 36.2,37.4 33.3,35.4 36.9,35.4" fill="#fff" opacity="0.9" />
            <polygon points="52,32 53.1,35.4 56.7,35.4 53.8,37.4 54.9,40.8 52,38.8 49.1,40.8 50.2,37.4 47.3,35.4 50.9,35.4" fill="#fff" opacity="0.9" />
            <polygon points="66,32 67.1,35.4 70.7,35.4 67.8,37.4 68.9,40.8 66,38.8 63.1,40.8 64.2,37.4 61.3,35.4 64.9,35.4" fill="#fff" opacity="0.9" />
            {/* Row 4: 4 (offset) */}
            <polygon points="17,44 18.1,47.4 21.7,47.4 18.8,49.4 19.9,52.8 17,50.8 14.1,52.8 15.2,49.4 12.3,47.4 15.9,47.4" fill="#fff" opacity="0.9" />
            <polygon points="31,44 32.1,47.4 35.7,47.4 32.8,49.4 33.9,52.8 31,50.8 28.1,52.8 29.2,49.4 26.3,47.4 29.9,47.4" fill="#fff" opacity="0.9" />
            <polygon points="45,44 46.1,47.4 49.7,47.4 46.8,49.4 47.9,52.8 45,50.8 42.1,52.8 43.2,49.4 40.3,47.4 43.9,47.4" fill="#fff" opacity="0.9" />
            <polygon points="59,44 60.1,47.4 63.7,47.4 60.8,49.4 61.9,52.8 59,50.8 56.1,52.8 57.2,49.4 54.3,47.4 57.9,47.4" fill="#fff" opacity="0.9" />
            {/* Row 5: 5 */}
            <polygon points="10,56 11.1,59.4 14.7,59.4 11.8,61.4 12.9,64.8 10,62.8 7.1,64.8 8.2,61.4 5.3,59.4 8.9,59.4" fill="#fff" opacity="0.9" />
            <polygon points="24,56 25.1,59.4 28.7,59.4 25.8,61.4 26.9,64.8 24,62.8 21.1,64.8 22.2,61.4 19.3,59.4 22.9,59.4" fill="#fff" opacity="0.9" />
            <polygon points="38,56 39.1,59.4 42.7,59.4 39.8,61.4 40.9,64.8 38,62.8 35.1,64.8 36.2,61.4 33.3,59.4 36.9,59.4" fill="#fff" opacity="0.9" />
            <polygon points="52,56 53.1,59.4 56.7,59.4 53.8,61.4 54.9,64.8 52,62.8 49.1,64.8 50.2,61.4 47.3,59.4 50.9,59.4" fill="#fff" opacity="0.9" />
            <polygon points="66,56 67.1,59.4 70.7,59.4 67.8,61.4 68.9,64.8 66,62.8 63.1,64.8 64.2,61.4 61.3,59.4 64.9,59.4" fill="#fff" opacity="0.9" />
            {/* Row 6: 4 (offset) */}
            <polygon points="17,68 18.1,71.4 21.7,71.4 18.8,73.4 19.9,76.8 17,74.8 14.1,76.8 15.2,73.4 12.3,71.4 15.9,71.4" fill="#fff" opacity="0.9" />
            <polygon points="31,68 32.1,71.4 35.7,71.4 32.8,73.4 33.9,76.8 31,74.8 28.1,76.8 29.2,73.4 26.3,71.4 29.9,71.4" fill="#fff" opacity="0.9" />
            <polygon points="45,68 46.1,71.4 49.7,71.4 46.8,73.4 47.9,76.8 45,74.8 42.1,76.8 43.2,73.4 40.3,71.4 43.9,71.4" fill="#fff" opacity="0.9" />
            <polygon points="59,68 60.1,71.4 63.7,71.4 60.8,73.4 61.9,76.8 59,74.8 56.1,76.8 57.2,73.4 54.3,71.4 57.9,71.4" fill="#fff" opacity="0.9" />
            {/* Dark overlay to tone it down */}
            <rect x="0" y="0" width="160" height="200" fill="#061e31" opacity="0.35" />
          </g>
          {/* "76" embossed */}
          <text
            x="80" y="130"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ffffff"
            opacity="0.92"
            style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "72px", letterSpacing: "-2px" }}
          >
            76
          </text>
          {/* Inner glow ring */}
          <path d="M12,8 L148,8 Q152,8 152,12 L152,118 Q152,141 80,186 Q8,141 8,118 L8,12 Q8,8 12,8 Z"
            fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.15" />
        </svg>
      </motion.div>

      {/* ── Massive "76" watermark — stars & stripes fill ── */}
      <div
        aria-hidden="true"
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 select-none pointer-events-none z-0"
      >
        <svg
          viewBox="0 0 600 300"
          style={{ width: "clamp(18rem, 36vw, 52rem)", height: "auto" }}
        >
          <defs>
            {/* Stars & stripes pattern */}
            <pattern id="flagFill76" patternUnits="userSpaceOnUse" width="120" height="80">
              {/* Red & white stripes */}
              <rect width="120" height="80" fill="#b32025" opacity="0.12" />
              <rect y="0" width="120" height="10" fill="#fff" opacity="0.06" />
              <rect y="20" width="120" height="10" fill="#fff" opacity="0.06" />
              <rect y="40" width="120" height="10" fill="#fff" opacity="0.06" />
              <rect y="60" width="120" height="10" fill="#fff" opacity="0.06" />
              {/* Blue canton with stars */}
              <rect width="48" height="40" fill="#092f4d" opacity="0.15" />
              <polygon points="8,6 8.8,8.4 11.3,8.4 9.2,10 10,12.4 8,10.8 6,12.4 6.8,10 4.7,8.4 7.2,8.4" fill="#fff" opacity="0.08" />
              <polygon points="20,6 20.8,8.4 23.3,8.4 21.2,10 22,12.4 20,10.8 18,12.4 18.8,10 16.7,8.4 19.2,8.4" fill="#fff" opacity="0.08" />
              <polygon points="32,6 32.8,8.4 35.3,8.4 33.2,10 34,12.4 32,10.8 30,12.4 30.8,10 28.7,8.4 31.2,8.4" fill="#fff" opacity="0.08" />
              <polygon points="44,6 44.8,8.4 47.3,8.4 45.2,10 46,12.4 44,10.8 42,12.4 42.8,10 40.7,8.4 43.2,8.4" fill="#fff" opacity="0.08" />
              <polygon points="14,18 14.8,20.4 17.3,20.4 15.2,22 16,24.4 14,22.8 12,24.4 12.8,22 10.7,20.4 13.2,20.4" fill="#fff" opacity="0.08" />
              <polygon points="26,18 26.8,20.4 29.3,20.4 27.2,22 28,24.4 26,22.8 24,24.4 24.8,22 22.7,20.4 25.2,20.4" fill="#fff" opacity="0.08" />
              <polygon points="38,18 38.8,20.4 41.3,20.4 39.2,22 40,24.4 38,22.8 36,24.4 36.8,22 34.7,20.4 37.2,20.4" fill="#fff" opacity="0.08" />
              <polygon points="8,30 8.8,32.4 11.3,32.4 9.2,34 10,36.4 8,34.8 6,36.4 6.8,34 4.7,32.4 7.2,32.4" fill="#fff" opacity="0.08" />
              <polygon points="20,30 20.8,32.4 23.3,32.4 21.2,34 22,36.4 20,34.8 18,36.4 18.8,34 16.7,32.4 19.2,32.4" fill="#fff" opacity="0.08" />
              <polygon points="32,30 32.8,32.4 35.3,32.4 33.2,34 34,36.4 32,34.8 30,36.4 30.8,34 28.7,32.4 31.2,32.4" fill="#fff" opacity="0.08" />
              <polygon points="44,30 44.8,32.4 47.3,32.4 45.2,34 46,36.4 44,34.8 42,36.4 42.8,34 40.7,32.4 43.2,32.4" fill="#fff" opacity="0.08" />
            </pattern>
          </defs>
          <text
            x="300" y="170"
            textAnchor="middle"
            dominantBaseline="central"
            fill="url(#flagFill76)"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="1.5"
            style={{
              fontFamily: "'Apotek Extended', sans-serif",
              fontWeight: 900,
              fontSize: "320px",
              letterSpacing: "-12px",
            }}
          >
            76
          </text>
        </svg>
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