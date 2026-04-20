"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface ServiceItem {
  title: string;
  titleLine2: string;
  subtitle: string;
  description: string;
  photo: string;
  href: string;
}

const FALLBACK: ServiceItem[] = [
  {
    title: "Brand",
    titleLine2: "Foundation",
    subtitle: "Identity & Systems",
    description:
      "We create the identity behind your business — logos, colors, and brand systems that make you look established, credible, and memorable from day one.",
    photo: "/portfolio/1VU5_JpxoQr6GquBehlidPMtnedQ8TyqY.jpg",
    href: "/branding-services",
  },
  {
    title: "Digital",
    titleLine2: "Presence",
    subtitle: "Websites & Landing Pages",
    description:
      "Modern, fast, conversion-focused websites and landing pages that turn visitors into customers. Built for search engines so your business gets found.",
    photo: "/portfolio/1Iuks3iUQRBzhIQWclmDb1aT5VGzw4Veg.jpg",
    href: "/website-design",
  },
  {
    title: "Physical",
    titleLine2: "Marketing",
    subtitle: "Wraps, Signs & Environmental Graphics",
    description:
      "Vehicle wraps, signage, and environmental graphics that turn your business into a full brand experience — inside and out. Design, print, and installation — all handled.",
    photo: "/portfolio/1jKD6IVrv5vvQY4U0yCy_CmbJCL9URqT4.jpg",
    href: "/vehicle-wraps",
  },
  {
    title: "Promotional",
    titleLine2: "& Print",
    subtitle: "Merch & Materials",
    description:
      "Business cards, branded apparel, packaging, and promotional products that keep your brand in people's hands — long after the first impression.",
    photo: "/portfolio/1kf79pi__xLmSnRamX4cLtJY_RVzgQx_I.jpg",
    href: "/promotional-products",
  },
];

export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const [services, setServices] = useState<ServiceItem[]>(FALLBACK);

  useEffect(() => {
    fetch("/api/admin/content?page=homepage")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.services && Array.isArray(data.services) && data.services.length > 0) {
          setServices(data.services);
        }
      })
      .catch(() => {});
  }, []);

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
                Build. Launch. Scale.
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
            Hover any panel to explore — one team, everything handled.
          </motion.p>
        </div>
      </div>

      {/* ── Accordion panels ── */}
      <div
        className="flex flex-col lg:flex-row w-full"
        style={{ height: "clamp(480px, 65vh, 680px)" }}
        onMouseLeave={() => setActive(null)}
      >
        {services.map((s, i) => (
          <motion.div
            key={i}
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
              alt={s.title + " " + s.titleLine2}
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
                className="text-white/70 text-xs font-bold tracking-[0.3em] uppercase text-center px-2 lg:[writing-mode:vertical-rl] lg:[text-orientation:mixed] lg:rotate-180"
                style={{
                  fontFamily: "'Apotek Extended', sans-serif",
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
                {String(i + 1).padStart(2, "0")}
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

