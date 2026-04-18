"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Sustainability() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Subtle red diagonal accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom-right, rgba(179,32,37,0.04) 0%, transparent 70%)"
        }}
      />
      <div className="max-w-7xl mx-auto px-8 lg:px-14 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-0.5 bg-[#b32025]" />
              <span
                className="text-[#b32025] text-xs font-semibold tracking-[0.25em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Our Commitment
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#092f4d] text-4xl sm:text-5xl uppercase leading-tight mb-8"
              style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
            >
              Embracing Sustainable{" "}
              <span className="text-[#b32025]">Practices And Materials</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#374151] text-base leading-relaxed mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We meet strict standards and follow rigorous best practices regarding
              reducing waste, emissions, and energy usage. We are committed to providing
              a safe environment for our team by ensuring healthy indoor air quality
              levels and minimizing the use of harmful chemicals.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-[#374151] text-base leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We work continually to improve our practices and operations to make them
              more sustainable. We also offer several eco-friendly printing solutions to
              ensure you can do the same.
            </motion.p>
          </div>

          {/* Visual — certifications */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            {/* Vinyl rolls photo */}
            <div className="relative w-full aspect-[16/9] mb-10 overflow-hidden">
              <Image
                src="/portfolio/1gzQxlUcAk_-Tg_gF7RgD17QtY-N3LySe.jpg"
                alt="Premium vinyl materials"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
            </div>

            {/* Certification badges */}
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {[
                { label: "3M Certified", sublabel: "Installer" },
                { label: "3M MCS", sublabel: "Warranty" },
                { label: "Premium", sublabel: "Materials" },
              ].map((cert) => (
                <div
                  key={cert.label}
                  className="text-center px-6 py-4 border border-[#092f4d]/10"
                >
                  <div
                    className="text-[#092f4d] text-sm font-bold uppercase tracking-widest"
                    style={{ fontFamily: "'Apotek Extended', sans-serif" }}
                  >
                    {cert.label}
                  </div>
                  <div
                    className="text-[#9ca3af] text-xs mt-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {cert.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
