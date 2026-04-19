"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-[#092f4d] relative overflow-hidden brand-stars-bg">
      <div className="max-w-4xl mx-auto px-8 lg:px-14 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-white uppercase leading-[0.88] mb-6"
          style={{
            fontFamily: "'Apotek Extended', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
          }}
        >
          Let&apos;s Build Your Brand{" "}
          <span
            style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
          >
            The Right Way
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/50 text-base leading-relaxed max-w-xl mx-auto mb-10"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Whether you need a logo, a full website, or a complete marketing
          system — we&apos;ve got you covered.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className="group inline-flex items-center gap-3 bg-[#b32025] text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#8f1a1e] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Start Your Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 border border-white/20 text-white/60 hover:text-white hover:border-white/50 px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Get a Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
