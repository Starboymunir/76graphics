"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const PACKAGES = [
  {
    name: "Starter Brand Kit",
    price: "$500",
    priceSuffix: "– $1,500",
    tag: "New Businesses",
    tagColor: "bg-white/10 text-white/60",
    description: "Perfect for businesses that are just launching and need to look professional from day one.",
    features: [
      "Logo Design",
      "Brand Colors & Typography",
      "Business Card Design",
      "Social Media Starter Kit",
    ],
    cta: "Get Started",
    href: "/contact",
    highlight: false,
  },
  {
    name: "Growth Package",
    price: "$2,000",
    priceSuffix: "– $5,000",
    tag: "Most Popular",
    tagColor: "bg-[#b32025] text-white",
    description: "For businesses ready to scale — combining branding, web presence, and print into one complete system.",
    features: [
      "Full Branding Package",
      "Custom Website (5–7 pages)",
      "Basic SEO Setup",
      "Window Graphics or Signage",
    ],
    cta: "Get Started",
    href: "/contact",
    highlight: true,
  },
  {
    name: "Full Business System",
    price: "$6,000",
    priceSuffix: "– $15,000+",
    tag: "Maximum Impact",
    tagColor: "bg-white/10 text-white/60",
    description: "Everything you need to dominate your market — branding, web, wraps, signage, and promotional products.",
    features: [
      "Complete Branding System",
      "Full Website",
      "Vehicle Wrap",
      "Wall + Window Graphics",
      "Promotional Products",
    ],
    cta: "Talk to Us",
    href: "/contact",
    highlight: false,
  },
];

export default function Packages() {
  return (
    <section className="py-28 bg-[#061e31] relative overflow-hidden">
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
          PACKAGES
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-14 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
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
                Packages
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
              Simple,{" "}
              <span style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}>
                Clear Pricing
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
            We don't just design — we build complete marketing systems.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8">
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={`relative flex flex-col p-8 lg:p-10 ${
                pkg.highlight ? "bg-[#b32025]/10 border border-[#b32025]/30" : "bg-[#0d3a5e]"
              }`}
            >
              {/* Tag */}
              <span
                className={`inline-block self-start text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 mb-6 ${pkg.tagColor}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {pkg.tag}
              </span>

              {/* Package name */}
              <h3
                className="text-white uppercase mb-2 leading-tight"
                style={{
                  fontFamily: "'Apotek Extended', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                }}
              >
                {pkg.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-4">
                <span
                  className="text-white text-3xl font-black"
                  style={{ fontFamily: "'Apotek Extended', sans-serif" }}
                >
                  {pkg.price}
                </span>
                <span
                  className="text-white/40 text-sm"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {pkg.priceSuffix}
                </span>
              </div>

              {/* Description */}
              <p
                className="text-white/50 text-sm leading-relaxed mb-8"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {pkg.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-10 flex-1">
                {pkg.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-white/70 text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <Check size={14} className="text-[#b32025] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={pkg.href}
                className={`group inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold tracking-[0.12em] uppercase transition-all duration-200 ${
                  pkg.highlight
                    ? "bg-[#b32025] text-white hover:bg-[#8f1a1e]"
                    : "border border-white/25 text-white/70 hover:border-white hover:text-white"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {pkg.cta}
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-white/25 text-xs mt-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          All packages are customizable. Pricing is a starting range — final quote based on scope.
        </motion.p>
      </div>
    </section>
  );
}
