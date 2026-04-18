"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CASES = [
  {
    num: "01",
    title: "Commercial Fleet Wrap",
    description: "Full fleet branding for Mr. Reliable Heating & Cooling",
    photo: "/portfolio/1VU5_JpxoQr6GquBehlidPMtnedQ8TyqY.jpg",
    size: "large", // spans 2 rows
  },
  {
    num: "02",
    title: "Artistic Vehicle Wrap",
    description: "Great Wave-inspired full coverage on a Lexus RC",
    photo: "/portfolio/1nus0QfhQQWxSsZukZDFM80Beyy8rM_J7.jpg",
    size: "small",
  },
  {
    num: "03",
    title: "Custom Chrome Wrap",
    description: "Eclipse GSX with color-shift chrome & neon accents",
    photo: "/portfolio/1kf79pi__xLmSnRamX4cLtJY_RVzgQx_I.jpg",
    size: "small",
  },
];

export default function CaseStudies() {
  return (
    <section className="py-28 bg-[#f5f5f5] relative overflow-hidden">

      {/* ── Diagonal navy accent background ── */}
      <div
        className="absolute top-0 left-0 w-full h-32 bg-[#061e31]"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 60%, 0 100%)" }}
      />

      <div className="max-w-7xl mx-auto px-8 lg:px-14 relative z-10">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
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
                Portfolio
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="uppercase leading-[0.88]"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
                color: "#092f4d",
              }}
            >
              Check Out Our
              <span
                className="block"
                style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
              >
                Case Studies
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/our-work"
              className="group inline-flex items-center gap-3 border-2 border-[#092f4d] text-[#092f4d] hover:bg-[#092f4d] hover:text-white px-8 py-4 text-sm font-bold tracking-[0.12em] uppercase transition-all duration-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              View Full Portfolio
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* ── Creative bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-3" style={{ minHeight: "600px" }}>

          {/* Large card — col 1, spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-1 md:row-span-2 group relative overflow-hidden cursor-pointer perspective-container"
            style={{ minHeight: "400px" }}
          >
            <Image
              src={CASES[0].photo}
              alt={CASES[0].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-108"
              sizes="33vw"
            />
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#061e31]/90 via-[#061e31]/20 to-transparent group-hover:from-[#b32025]/70 transition-all duration-500" />
            {/* Corner notch clip */}
            <div
              className="absolute inset-0"
              style={{ clipPath: "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)" }}
            />
            {/* Red corner chip */}
            <div
              className="absolute top-0 right-0 w-8 h-8 bg-[#b32025]"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span
                className="text-[#b32025] text-xs font-bold tracking-[0.2em] uppercase mb-3 block"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {CASES[0].num} / Case Study
              </span>
              <h3
                className="text-white text-2xl uppercase leading-tight mb-2"
                style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900 }}
              >
                {CASES[0].title}
              </h3>
              <p className="text-white/60 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                {CASES[0].description}
              </p>
            </div>

            {/* Bottom hover line */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#b32025] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
          </motion.div>

          {/* Top-right card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-2 group relative overflow-hidden cursor-pointer"
            style={{ minHeight: "290px" }}
          >
            <Image
              src={CASES[1].photo}
              alt={CASES[1].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061e31]/80 via-[#061e31]/30 to-transparent group-hover:from-[#092f4d]/80 transition-all duration-500" />

            <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-end p-8">
              <span
                className="text-[#b32025] text-xs font-bold tracking-[0.2em] uppercase mb-2 block"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {CASES[1].num} / Case Study
              </span>
              <h3
                className="text-white text-xl lg:text-2xl uppercase leading-tight mb-1"
                style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900 }}
              >
                {CASES[1].title}
              </h3>
              <p className="text-white/55 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                {CASES[1].description}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#b32025] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
          </motion.div>

          {/* Bottom-right card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-2 group relative overflow-hidden cursor-pointer"
            style={{ minHeight: "290px" }}
          >
            <Image
              src={CASES[2].photo}
              alt={CASES[2].title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061e31]/80 via-[#061e31]/30 to-transparent group-hover:from-[#8f181c]/70 transition-all duration-500" />

            <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-end p-8">
              <span
                className="text-[#b32025] text-xs font-bold tracking-[0.2em] uppercase mb-2 block"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {CASES[2].num} / Case Study
              </span>
              <h3
                className="text-white text-xl lg:text-2xl uppercase leading-tight mb-1"
                style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900 }}
              >
                {CASES[2].title}
              </h3>
              <p className="text-white/55 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                {CASES[2].description}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#b32025] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}