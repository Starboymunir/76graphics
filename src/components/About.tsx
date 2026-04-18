"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const STATS = [
  { num: "500+", label: "Projects Delivered", color: "#b32025" },
  { num: "10+",  label: "Years in Business",  color: "#285493" },
  { num: "72hr", label: "Avg. Turnaround",    color: "#b32025" },
  { num: "200+", label: "Clients Served",     color: "#285493" },
];

export default function About() {
  return (
    <section id="about" className="bg-[#061e31] overflow-hidden relative">

      {/* ── Full-bleed photo row ── */}
      <div className="relative h-[55vh] min-h-[360px] overflow-hidden">
        <Image
          src="/portfolio/1Iuks3iUQRBzhIQWclmDb1aT5VGzw4Veg.jpg"
          alt="76 Graphics wrap installation"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Heavy gradient bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#061e31] via-[#061e31]/30 to-transparent" />
        {/* Left red bar */}
        <div className="absolute top-0 left-0 w-[3px] h-full bg-[#b32025]" />

        {/* Large brand mark watermark */}
        <div className="absolute inset-0 flex items-center justify-end pr-16 pointer-events-none select-none">
          <Image
            src="/logos/pngs/76Graphics_BrandMark-White.png"
            alt=""
            width={320}
            height={320}
            className="w-48 lg:w-64 h-auto opacity-[0.07]"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ── Stats strip — overlap the photo ── */}
      <div className="relative z-10 -mt-1 max-w-7xl mx-auto px-8 lg:px-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#092f4d] px-6 py-8 text-center group hover:bg-[#0d3a5e] transition-colors duration-300"
            >
              <div
                className="font-black leading-none mb-2 transition-colors duration-300 group-hover:text-[#b32025]"
                style={{
                  fontFamily: "'Apotek Extended', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#ffffff",
                }}
              >
                {s.num}
              </div>
              <div
                className="text-white/40 text-[10px] font-bold tracking-[0.22em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Content row ── */}
      <div className="max-w-7xl mx-auto px-8 lg:px-14 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left: text */}
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
              Who We Are
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-white uppercase leading-[0.88] mb-8"
            style={{
              fontFamily: "'Apotek Extended', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
            }}
          >
            Crafted With
            <span
              className="block"
              style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
            >
              Precision
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white/60 text-base leading-relaxed mb-5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            76 Graphics is a premium large format graphics studio built on three
            pillars: exceptional design, military-grade print quality, and
            installation you can rely on. We partner with businesses of every
            size — from solo operators building a brand to Fortune 500 fleets.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-white/60 text-base leading-relaxed mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Every project begins with a conversation and ends with a result that
            stops traffic — literally. Our in-house team handles everything from
            design to installation, ensuring zero compromise at every step.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 bg-[#b32025] hover:bg-[#8f181c] text-white px-8 py-4 text-sm font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(179,32,37,0.4)]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Our Story
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Right: certifications + secondary photo */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6"
        >
          {/* Secondary photo with parallelogram clip */}
          <div
            className="relative h-72 overflow-hidden"
            style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}
          >
            <Image
              src="/portfolio/1nus0QfhQQWxSsZukZDFM80Beyy8rM_J7.jpg"
              alt="Artistic vehicle wrap"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#b32025]/30 to-transparent mix-blend-multiply" />
          </div>

          {/* Cert badges */}
          <div className="flex items-center gap-4 flex-wrap">
            {["3M Certified Installer", "3M MCS Warranty", "Premium Materials"].map((c) => (
              <div
                key={c}
                className="border border-white/15 px-4 py-2.5 text-white/55 text-[10px] font-bold tracking-[0.2em] uppercase hover:border-[#b32025] hover:text-white/90 transition-all duration-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {c}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
