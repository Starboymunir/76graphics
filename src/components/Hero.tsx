"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax: background slowest, watermark medium, content fades fastest
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const markY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const markScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Background photo ── */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/portfolio/1Iuks3iUQRBzhIQWclmDb1aT5VGzw4Veg.jpg"
          alt="76 Graphics professional installation facility"
          fill
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* ── Multi-layer overlay ── */}
      {/* Deep navy gradient from left */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#061e31]/96 via-[#092f4d]/80 to-[#092f4d]/50" />
      {/* Bottom darkening for stat strip legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#061e31]/70 via-transparent to-transparent" />
      {/* Star field tone */}
      <div className="absolute inset-0 brand-stars-bg opacity-25" />

      {/* ── Animated flag sweep ── */}
      <div className="flag-sweep" aria-hidden="true" />

      {/* ── Left red accent bar ── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-[3px] h-full bg-[#b32025] z-20 origin-top"
      />



      {/* ── Massive "76" watermark — stars & stripes fill ── */}
      <div
        aria-hidden="true"
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 select-none pointer-events-none z-0"
      >
        <motion.div style={{ y: markY, scale: markScale }} className="will-change-transform">
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
        </motion.div>
      </div>

      {/* ── Main content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-6xl mx-auto px-8 lg:px-14 pt-32 pb-16 will-change-transform"
      >

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
            data-magnetic
            data-magnetic-strength="0.35"
            data-magnetic-radius="140"
            data-cursor="view"
            data-cursor-label="Quote"
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
            data-magnetic
            data-magnetic-strength="0.3"
            data-magnetic-radius="120"
            data-cursor-label="Explore"
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
      </motion.div>

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