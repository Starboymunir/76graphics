"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "We would never go to anyone else. Their friendly, fast professional service is unmatched, and their artwork is impeccable. 5 stars for their whole team!",
    name: "Marcus D.",
    company: "D&M Logistics",
    initial: "M",
  },
  {
    quote:
      "Their team is quick to respond and easy to work with. They have simplified the branding process for us from design to installation!",
    name: "Sarah K.",
    company: "Apex Solutions Inc.",
    initial: "S",
  },
  {
    quote:
      "I appreciate the attention to detail and precision they demonstrate with each application. 76 Graphics has never disappointed us.",
    name: "Jason L.",
    company: "Prestige Auto Group",
    initial: "J",
  },
];

export default function Testimonials() {
  const autoplayPlugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplayPlugin.current]);

  return (
    <section id="testimonials" className="py-28 bg-[#061e31] overflow-hidden relative brand-stars-bg">

      {/* ── Giant decorative quote mark ── */}
      <div
        aria-hidden="true"
        className="absolute top-8 right-8 lg:right-20 text-white/[0.03] font-black leading-none select-none pointer-events-none"
        style={{ fontFamily: "'Apotek Extended', sans-serif", fontSize: "clamp(12rem, 28vw, 28rem)", lineHeight: 0.8 }}
      >
        "
      </div>

      <div className="max-w-7xl mx-auto px-8 lg:px-14 relative z-10">

        {/* ── Header row ── */}
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
                Client Stories
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
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
              }}
            >
              Done Impeccably.
              <span
                className="block"
                style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
              >
                On Time. Every Time.
              </span>
            </motion.h2>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="w-14 h-14 border border-white/15 hover:border-[#b32025] hover:bg-[#b32025] flex items-center justify-center text-white transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="w-14 h-14 border border-white/15 hover:border-[#b32025] hover:bg-[#b32025] flex items-center justify-center text-white transition-all duration-200 cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="flex-none w-full lg:w-1/2 xl:w-1/3 pr-5"
              >
                <div className="relative bg-[#092f4d] p-10 h-full flex flex-col group hover:bg-[#0d3a5e] transition-colors duration-300 overflow-hidden">

                  {/* Red left bar */}
                  <div className="absolute top-0 left-0 w-[3px] h-full bg-[#b32025]" />

                  {/* Ghost initial */}
                  <div
                    aria-hidden="true"
                    className="absolute bottom-4 right-6 font-black leading-none text-white/[0.04] select-none pointer-events-none"
                    style={{ fontFamily: "'Apotek Extended', sans-serif", fontSize: "8rem", lineHeight: 1 }}
                  >
                    {t.initial}
                  </div>

                  {/* Giant open quote */}
                  <div
                    className="text-[#b32025] font-black leading-none mb-6"
                    style={{ fontFamily: "'Apotek Extended', sans-serif", fontSize: "4rem", lineHeight: 0.7 }}
                    aria-hidden="true"
                  >
                    "
                  </div>

                  {/* Quote */}
                  <p
                    className="text-white/75 group-hover:text-white/90 text-base lg:text-lg leading-relaxed flex-1 mb-8 transition-colors duration-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {t.quote}
                  </p>

                  {/* Attribution */}
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#b32025] flex items-center justify-center shrink-0">
                      <span
                        className="text-white text-sm font-black"
                        style={{ fontFamily: "'Apotek Extended', sans-serif" }}
                      >
                        {t.initial}
                      </span>
                    </div>
                    <div>
                      <div
                        className="text-white font-bold text-sm leading-none mb-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {t.name}
                      </div>
                      <div
                        className="text-[#b32025] text-[11px] tracking-[0.15em] uppercase"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
