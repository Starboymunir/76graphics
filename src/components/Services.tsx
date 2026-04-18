"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const SERVICES = [
  {
    title: "Commercial Vehicle",
    titleLine2: "Solutions",
    subtitle: "Fleet & Single Vehicles",
    description:
      "Establish credibility for your business with professional, custom-designed wraps that strategically showcase your brand on every vehicle in your fleet.",
    photo: "/portfolio/1VU5_JpxoQr6GquBehlidPMtnedQ8TyqY.jpg",
    photoAlt: "Commercial vehicle wrap installation",
    num: "01",
  },
  {
    title: "Architectural",
    titleLine2: "Graphics",
    subtitle: "Interior & Exterior",
    description:
      "Transform any space, interior or exterior, with custom vinyl wraps that showcase your brand on virtually any architectural surface — walls, windows, floors.",
    photo: "/portfolio/1Iuks3iUQRBzhIQWclmDb1aT5VGzw4Veg.jpg",
    photoAlt: "Architectural graphics installation",
    num: "02",
  },
  {
    title: "Brand &",
    titleLine2: "Experiential",
    subtitle: "Events & Activations",
    description:
      "Create unforgettable experiences and build powerful customer connections with thoughtful, creative brand activations that stop people in their tracks.",
    photo: "/portfolio/1jKD6IVrv5vvQY4U0yCy_CmbJCL9URqT4.jpg",
    photoAlt: "Brand activation installation",
    num: "03",
  },
  {
    title: "Custom",
    titleLine2: "Solutions",
    subtitle: "Anything. Anywhere.",
    description:
      "Have a unique problem? We have a creative solution. From events to retail to any space you can imagine — we deliver WOW on demand.",
    photo: "/portfolio/1kf79pi__xLmSnRamX4cLtJY_RVzgQx_I.jpg",
    photoAlt: "Custom artistic vehicle wrap",
    num: "04",
  },
];

export default function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="bg-[#061e31] relative overflow-hidden">

      {/* ── Section header ── */}
      <div className="max-w-7xl mx-auto px-8 lg:px-14 pt-24 pb-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#b32025] text-xs font-bold tracking-[0.35em] uppercase mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              What We Do
            </motion.p>
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
              Seize Opportunities
              <span
                className="block"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "2px #b32025",
                }}
              >
                For Your Brand
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/45 text-sm leading-relaxed max-w-xs lg:text-right"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Hover any panel to explore — from a single vehicle to a full brand world.
          </motion.p>
        </div>
      </div>

      {/* ── Accordion panels ── */}
      <div
        className="flex flex-col lg:flex-row w-full"
        style={{ height: "clamp(480px, 65vh, 680px)" }}
        onMouseLeave={() => setActive(null)}
      >
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.num}
            className="relative overflow-hidden cursor-pointer flex-shrink-0"
            style={{
              flex: active === null ? 1 : active === i ? 3 : 0.55,
              transition: "flex 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              minWidth: 0,
            }}
            onMouseEnter={() => setActive(i)}
          >
            {/* Photo */}
            <Image
              src={s.photo}
              alt={s.photoAlt}
              fill
              className="object-cover transition-transform duration-700"
              style={{
                transform: active === i ? "scale(1.06)" : "scale(1)",
              }}
              sizes="25vw"
            />

            {/* Dark overlay — lightens on active */}
            <div
              className="absolute inset-0 transition-all duration-600"
              style={{
                background:
                  active === i
                    ? "linear-gradient(to top, #061e31 0%, #092f4d/80 40%, transparent 100%)"
                    : "linear-gradient(to top, #061e31 0%, #061e31cc 60%, #061e3199 100%)",
                opacity: active === i ? 1 : 0.88,
              }}
            />

            {/* Top bar accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px] bg-[#b32025] transition-opacity duration-300"
              style={{ opacity: active === i ? 1 : 0 }}
            />

            {/* Vertical title — shown when collapsed */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
              style={{ opacity: active === i ? 0 : 1 }}
            >
              <span
                className="text-white/70 text-xs font-bold tracking-[0.3em] uppercase whitespace-nowrap"
                style={{
                  fontFamily: "'Apotek Extended', sans-serif",
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                }}
              >
                {s.subtitle}
              </span>
            </div>

            {/* Expanded content */}
            <div
              className="absolute bottom-0 left-0 right-0 p-8 lg:p-10 transition-all duration-500"
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {/* Number */}
              <div
                aria-hidden="true"
                className="absolute top-6 right-8 text-white/[0.06] font-black leading-none select-none"
                style={{ fontFamily: "'Apotek Extended', sans-serif", fontSize: "5rem" }}
              >
                {s.num}
              </div>

              <span
                className="text-[#b32025] text-xs font-bold tracking-[0.25em] uppercase mb-3 block"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {s.subtitle}
              </span>
              <h3
                className="text-white uppercase leading-[0.9] mb-4"
                style={{
                  fontFamily: "'Apotek Extended', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                }}
              >
                {s.title}
                <span className="block text-[#b32025]">{s.titleLine2}</span>
              </h3>
              <p
                className="text-white/65 text-sm leading-relaxed mb-6 max-w-xs"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {s.description}
              </p>
              <span className="inline-flex items-center gap-2 text-white text-xs font-bold tracking-[0.15em] uppercase group">
                <span style={{ fontFamily: "'Inter', sans-serif" }}>Learn More</span>
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

