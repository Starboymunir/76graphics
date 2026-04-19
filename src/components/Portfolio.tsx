"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X, ZoomIn } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
type Category = "All" | "Vehicle Wraps" | "Branding" | "Website Design" | "Signage" | "Promotional Products";

const CATEGORIES: Category[] = [
  "All",
  "Vehicle Wraps",
  "Branding",
  "Website Design",
  "Signage",
  "Promotional Products",
];

interface DisplayProject {
  id: string;
  title: string;
  category: Category;
  tags: string;
  photo: string;
  span: string;
}

// ── Fallback images (shown until Cloudinary images load) ──────────────────────
const FALLBACK_PROJECTS: DisplayProject[] = [
  {
    id: "1",
    title: "Commercial Fleet Wrap",
    category: "Vehicle Wraps",
    tags: "Mr. Reliable Heating · full wrap",
    photo: "/portfolio/1VU5_JpxoQr6GquBehlidPMtnedQ8TyqY.jpg",
    span: "col-span-2 row-span-2",
  },
  {
    id: "2",
    title: "Cherry Blossom Custom Wrap",
    category: "Vehicle Wraps",
    tags: "Lexus RC · full wrap · premium vinyl",
    photo: "/portfolio/1YCPEuFx9FFkt3HnM_vkZMTT19VhMXldz.jpg",
    span: "",
  },
  {
    id: "3",
    title: "Cargo Van Full Wrap",
    category: "Vehicle Wraps",
    tags: "Ford Transit · full wrap · commercial",
    photo: "/portfolio/1jKD6IVrv5vvQY4U0yCy_CmbJCL9URqT4.jpg",
    span: "",
  },
  {
    id: "4",
    title: "Night Shot — Eclipse GSX",
    category: "Vehicle Wraps",
    tags: "Mitsubishi Eclipse · custom · chrome details",
    photo: "/portfolio/1IW2u4MDufaJ6uvm_Nl79Dei1hWYTTmAV.jpg",
    span: "col-span-2",
  },
  {
    id: "5",
    title: "Great Wave Artistic Wrap",
    category: "Vehicle Wraps",
    tags: "Lexus RC · artistic · full coverage",
    photo: "/portfolio/1nus0QfhQQWxSsZukZDFM80Beyy8rM_J7.jpg",
    span: "",
  },
  {
    id: "6",
    title: "GR86 Circuit Board Wrap",
    category: "Vehicle Wraps",
    tags: "Toyota GR86 · full coverage · vibrant",
    photo: "/portfolio/1iOPICYZ38nQcQXetyU8VMYWCt-o-niBK.jpg",
    span: "",
  },
  {
    id: "7",
    title: "Purple Eclipse Night Wrap",
    category: "Vehicle Wraps",
    tags: "Custom chrome vinyl · neon underglow",
    photo: "/portfolio/1kf79pi__xLmSnRamX4cLtJY_RVzgQx_I.jpg",
    span: "",
  },
  {
    id: "8",
    title: "Cherry Blossom Sedan",
    category: "Vehicle Wraps",
    tags: "Lexus RC · cherry blossom · full wrap",
    photo: "/portfolio/1ad97RBlWjZfO8dtu9vjpOmFjJnYdat4W.jpg",
    span: "col-span-2",
  },
  {
    id: "9",
    title: "In-Shop Installation",
    category: "Vehicle Wraps",
    tags: "Live install · professional bay · wrap shop",
    photo: "/portfolio/1Iuks3iUQRBzhIQWclmDb1aT5VGzw4Veg.jpg",
    span: "",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromCloudinary(img: any, index: number): DisplayProject {
  const category = (img.context?.category as Category) || "Vehicle Wraps";
  const spans = ["col-span-2 row-span-2", "", "", "col-span-2", "", "", "", "col-span-2", ""];
  return {
    id: img.publicId,
    title: img.context?.title || `Project ${index + 1}`,
    category,
    tags: img.context?.tags || category,
    photo: img.url,
    span: spans[index % spans.length] ?? "",
  };
}

export default function Portfolio() {
  const [active, setActive] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<DisplayProject | null>(null);
  const [projects, setProjects] = useState<DisplayProject[]>(FALLBACK_PROJECTS);

  useEffect(() => {
    fetch("/api/images/portfolio")
      .then((r) => r.ok ? r.json() : [])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((data: any[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data.map(fromCloudinary));
        }
      })
      .catch(() => { /* keep fallback */ });
  }, []);

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="our-work" className="py-28 bg-[#f5f5f5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 lg:px-14 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[#b32025] text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Featured Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[#092f4d] text-4xl sm:text-5xl uppercase leading-none"
              style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
            >
              Real Results.
              <span className="block text-[#b32025]">Real Businesses.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[#092f4d]/60 text-sm mt-4 leading-relaxed max-w-md"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              From startups to established companies, we help brands stand out
              in competitive markets.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/our-work"
              className="inline-flex items-center gap-2 border-2 border-[#092f4d] text-[#092f4d] hover:bg-[#092f4d] hover:text-white px-8 py-4 text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-200 self-start lg:self-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              View Full Portfolio
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-xs font-semibold tracking-[0.15em] uppercase transition-all duration-200 border cursor-pointer ${
                active === cat
                  ? "bg-[#b32025] border-[#b32025] text-white"
                  : "bg-transparent border-[#092f4d]/30 text-[#092f4d] hover:border-[#b32025] hover:text-[#b32025]"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[260px]"
        >
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className={`group relative overflow-hidden cursor-pointer ${
                  filtered.length > 4 ? project.span : ""
                }`}
                onClick={() => setLightbox(project)}
              >
                <Image
                  src={project.photo}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized={project.photo.startsWith("http")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061e31]/85 via-[#061e31]/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-400" />

                <div className="absolute top-4 left-4">
                  <span
                    className="bg-[#b32025] text-white text-[10px] font-semibold tracking-[0.18em] uppercase px-3 py-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {project.category}
                  </span>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn size={14} className="text-white" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                  <h3
                    className="text-white text-lg uppercase mb-1 leading-tight"
                    style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-white/60 text-xs tracking-wide"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {project.tags}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#b32025] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightbox.photo}
                alt={lightbox.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 80vw"
                unoptimized={lightbox.photo.startsWith("http")}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <span
                  className="text-[#b32025] text-xs font-semibold tracking-[0.2em] uppercase block mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {lightbox.category}
                </span>
                <h3
                  className="text-white text-2xl uppercase"
                  style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}
                >
                  {lightbox.title}
                </h3>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
              >
                <X size={18} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
