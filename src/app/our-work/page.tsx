"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ZoomIn, X, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CATEGORIES = ["All", "Vehicle Wraps", "Architectural", "Brand Activation"] as const;
type Category = (typeof CATEGORIES)[number];

const PROJECTS = [
  {
    id: 1,
    title: "Commercial Fleet Wrap",
    category: "Vehicle Wraps" as Category,
    tags: "Mr. Reliable Heating · full wrap",
    photo: "/portfolio/1VU5_JpxoQr6GquBehlidPMtnedQ8TyqY.jpg",
    tall: true,
  },
  {
    id: 2,
    title: "Cherry Blossom Lexus RC",
    category: "Vehicle Wraps" as Category,
    tags: "Lexus RC · full wrap · premium vinyl",
    photo: "/portfolio/1YCPEuFx9FFkt3HnM_vkZMTT19VhMXldz.jpg",
    tall: false,
  },
  {
    id: 3,
    title: "Cargo Van Full Wrap",
    category: "Vehicle Wraps" as Category,
    tags: "Ford Transit · commercial · full wrap",
    photo: "/portfolio/1jKD6IVrv5vvQY4U0yCy_CmbJCL9URqT4.jpg",
    tall: false,
  },
  {
    id: 4,
    title: "Night Shot — Eclipse GSX",
    category: "Vehicle Wraps" as Category,
    tags: "Mitsubishi Eclipse · custom · chrome details",
    photo: "/portfolio/1IW2u4MDufaJ6uvm_Nl79Dei1hWYTTmAV.jpg",
    tall: false,
  },
  {
    id: 5,
    title: "Great Wave Artistic Wrap",
    category: "Vehicle Wraps" as Category,
    tags: "Lexus RC · artistic · full coverage",
    photo: "/portfolio/1nus0QfhQQWxSsZukZDFM80Beyy8rM_J7.jpg",
    tall: true,
  },
  {
    id: 6,
    title: "GR86 Circuit Board Wrap",
    category: "Vehicle Wraps" as Category,
    tags: "Toyota GR86 · full coverage · vibrant",
    photo: "/portfolio/1iOPICYZ38nQcQXetyU8VMYWCt-o-niBK.jpg",
    tall: false,
  },
  {
    id: 7,
    title: "Purple Eclipse Night Wrap",
    category: "Brand Activation" as Category,
    tags: "Custom chrome vinyl · neon underglow",
    photo: "/portfolio/1kf79pi__xLmSnRamX4cLtJY_RVzgQx_I.jpg",
    tall: false,
  },
  {
    id: 8,
    title: "Cherry Blossom Sedan",
    category: "Vehicle Wraps" as Category,
    tags: "Lexus RC · cherry blossom · full wrap",
    photo: "/portfolio/1ad97RBlWjZfO8dtu9vjpOmFjJnYdat4W.jpg",
    tall: false,
  },
  {
    id: 9,
    title: "In-Shop Installation",
    category: "Brand Activation" as Category,
    tags: "Live install · professional bay",
    photo: "/portfolio/1Iuks3iUQRBzhIQWclmDb1aT5VGzw4Veg.jpg",
    tall: true,
  },
  {
    id: 10,
    title: "Custom Luxury Wrap",
    category: "Vehicle Wraps" as Category,
    tags: "Premium vinyl · showroom finish",
    photo: "/portfolio/1RxHDGtB6_ycyky_Y4PPjy1B6F4zViWH4.jpg",
    tall: false,
  },
  {
    id: 11,
    title: "Commercial Transit Wrap",
    category: "Vehicle Wraps" as Category,
    tags: "Ford Transit · high contrast · white base",
    photo: "/portfolio/1SuerDLKgEZsDJAjpuX_dpbNjkZHVV7L3.jpg",
    tall: false,
  },
  {
    id: 12,
    title: "Night City Shot",
    category: "Brand Activation" as Category,
    tags: "Event activation · glow · dramatic",
    photo: "/portfolio/1mYmAQKoUtRrqqHxilOnmLZv4ivEaFXD0.jpg",
    tall: false,
  },
];

export default function OurWorkPage() {
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<(typeof PROJECTS)[0] | null>(null);

  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* ── PAGE HERO ── */}
        <section className="relative bg-[#092f4d] brand-stars-bg overflow-hidden py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-[#b32025]" />
              <span
                className="text-[#b32025] text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Our Portfolio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white uppercase leading-none mb-6"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              }}
            >
              Built to Be
              <span className="block text-[#b32025]">Noticed</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-lg max-w-2xl leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Every project is a statement. Browse our portfolio of vehicle wraps, architectural
              graphics, and brand activations — each one crafted to turn heads and drive results.
            </motion.p>
          </div>
        </section>

        {/* ── PORTFOLIO GRID ── */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">

            {/* Category filters */}
            <div className="flex flex-wrap gap-3 mb-12">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-6 py-2.5 text-xs font-bold tracking-[0.2em] uppercase border transition-all duration-200 cursor-pointer ${
                    active === cat
                      ? "bg-[#b32025] border-[#b32025] text-white"
                      : "bg-transparent border-[#092f4d]/20 text-[#092f4d] hover:border-[#b32025] hover:text-[#b32025]"
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Masonry-style grid */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <AnimatePresence>
                {filtered.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`group relative overflow-hidden cursor-pointer ${project.tall ? "row-span-2" : ""}`}
                    style={{ height: project.tall ? "600px" : "300px" }}
                    onClick={() => setLightbox(project)}
                  >
                    <Image
                      src={project.photo}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061e31]/90 via-[#061e31]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-400" />

                    {/* Zoom icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn size={16} className="text-white" />
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <p
                        className="text-[#b32025] text-xs font-semibold tracking-[0.2em] uppercase mb-1"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {project.tags}
                      </p>
                      <h3
                        className="text-white text-lg uppercase leading-tight"
                        style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
                      >
                        {project.title}
                      </h3>
                    </div>

                    {/* Red left accent on hover */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#b32025] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-[#092f4d] py-20 relative overflow-hidden brand-stars-bg">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-white uppercase mb-6 leading-none"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
              }}
            >
              Your Project Is Next
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/60 text-lg mb-10 max-w-2xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Join hundreds of businesses that have elevated their brand with 76 Graphics.
            </motion.p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-[#b32025] hover:bg-[#8f181c] text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Start Your Project
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 border border-white/20 hover:border-white flex items-center justify-center text-white transition-colors cursor-pointer"
              onClick={() => setLightbox(null)}
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.photo}
                alt={lightbox.title}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="mt-4 flex items-start justify-between">
                <div>
                  <h3
                    className="text-white text-xl uppercase"
                    style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
                  >
                    {lightbox.title}
                  </h3>
                  <p
                    className="text-white/50 text-sm mt-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {lightbox.tags}
                  </p>
                </div>
                <span
                  className="text-[#b32025] text-xs font-semibold tracking-widest uppercase border border-[#b32025]/30 px-3 py-1.5"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {lightbox.category}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
