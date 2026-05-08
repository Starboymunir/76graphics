"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  tags: string;
  photo: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SHOWCASE — "Index + Spotlight"
// Magazine-style work index. Every project visible at once on the left, big
// spotlight image on the right swaps on hover/focus. Reads as a portfolio,
// shows the count immediately, easy non-linear navigation.
// ─────────────────────────────────────────────────────────────────────────────

export default function ShowcaseRail() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Project[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data.slice(0, 6));
        }
      })
      .catch(() => {});
  }, []);

  if (projects.length === 0) {
    return (
      <section id="our-work" className="bg-[#061e31] min-h-[60vh]" aria-hidden />
    );
  }

  const total = projects.length;
  const current = projects[active] ?? projects[0];

  return (
    <section
      id="our-work"
      className="relative bg-[#061e31] overflow-hidden py-20 lg:py-28"
      aria-label="Featured work"
    >
      {/* Star field tone */}
      <div className="absolute inset-0 brand-stars-bg opacity-15 pointer-events-none" />

      {/* Drifting background headline */}
      <div
        aria-hidden
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap select-none pointer-events-none z-0"
      >
        <span
          className="uppercase opacity-[0.04] text-white block"
          style={{
            fontFamily: "'Apotek Extended', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(10rem, 22vw, 22rem)",
            lineHeight: 0.82,
            letterSpacing: "-0.02em",
          }}
        >
          PORTFOLIO · PORTFOLIO
        </span>
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12">
        <Header total={total} />

        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Index list */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <ul className="border-t border-white/10">
              {projects.map((p, i) => (
                <IndexRow
                  key={p.id}
                  project={p}
                  index={i}
                  total={total}
                  active={active === i}
                  onActivate={() => setActive(i)}
                />
              ))}
            </ul>

            <Link
              href="/our-work"
              className="group mt-10 inline-flex items-center gap-3 border-2 border-white/80 hover:bg-[#b32025] hover:border-[#b32025] hover:text-white text-white px-7 py-4 text-xs font-bold tracking-[0.25em] uppercase transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
              data-magnetic
              data-magnetic-strength="0.3"
              data-cursor-label="Full Portfolio"
            >
              See All Work
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Spotlight */}
          <div className="lg:col-span-6 order-1 lg:order-2 lg:sticky lg:top-28">
            <Spotlight project={current} index={active} total={total} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────────────
function Header({ total }: { total: number }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
      <div>
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px w-10 bg-[#b32025]" />
          <span
            className="text-[#b32025] text-[10px] font-bold tracking-[0.4em] uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Selected Work — {String(total).padStart(2, "0")} Projects
          </span>
        </div>
        <h2
          className="text-white uppercase leading-[0.85]"
          style={{
            fontFamily: "'Apotek Extended', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.75rem, 7vw, 6.5rem)",
            letterSpacing: "-0.015em",
          }}
        >
          The
          <br />
          Portfolio.
        </h2>
      </div>
      <p
        className="text-white/55 text-base lg:text-lg max-w-md leading-relaxed"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Real clients we shipped for. Hover any line to preview — click through
        for the full case study.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INDEX ROW
// ─────────────────────────────────────────────────────────────────────────────
function IndexRow({
  project,
  index,
  total,
  active,
  onActivate,
}: {
  project: Project;
  index: number;
  total: number;
  active: boolean;
  onActivate: () => void;
}) {
  const number = String(index + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  return (
    <li className="border-b border-white/10">
      <Link
        href="/our-work"
        onMouseEnter={onActivate}
        onFocus={onActivate}
        className="group relative block py-6 lg:py-7"
        data-cursor="view"
        data-cursor-label="Open"
        aria-label={`View ${project.title} case study`}
      >
        {/* Red wash on active */}
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-[#b32025] origin-left"
          initial={false}
          animate={{ scaleX: active ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="relative flex items-center gap-5 lg:gap-8 px-3 lg:px-4">
          {/* Number */}
          <span
            className={`tabular-nums tracking-tight transition-colors duration-300 ${
              active ? "text-white" : "text-white/30"
            }`}
            style={{
              fontFamily: "'Apotek Extended', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1rem, 1.2vw, 1.25rem)",
            }}
          >
            {number}
            <span className="text-white/20 text-[10px] ml-1">/{totalStr}</span>
          </span>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <h3
              className={`uppercase leading-[0.95] truncate transition-colors duration-300 ${
                active ? "text-white" : "text-white/85 group-hover:text-white"
              }`}
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.6rem, 3.2vw, 3rem)",
                letterSpacing: "-0.01em",
              }}
            >
              {project.title}
            </h3>
            <p
              className={`text-[11px] mt-2 tracking-[0.25em] uppercase truncate transition-colors duration-300 ${
                active ? "text-white/80" : "text-white/40"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {project.category}
              <span className="mx-2 opacity-50">·</span>
              {project.tags}
            </p>
          </div>

          {/* Arrow */}
          <span
            className={`shrink-0 transition-all duration-300 text-white ${
              active
                ? "translate-x-0 opacity-100"
                : "-translate-x-2 opacity-0"
            }`}
            aria-hidden
          >
            <ArrowRight size={28} strokeWidth={2.5} />
          </span>
        </div>
      </Link>
    </li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SPOTLIGHT
// ─────────────────────────────────────────────────────────────────────────────
function Spotlight({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] lg:aspect-[5/6] w-full overflow-hidden"
    >
      {/* Image stack with crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={project.photo}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            unoptimized={project.photo.startsWith("http")}
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Tone gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#061e31] via-[#061e31]/10 to-transparent pointer-events-none" />

      {/* Red corner accents */}
      <div className="absolute top-0 left-0 w-1 h-20 bg-[#b32025]" />
      <div className="absolute top-0 left-0 w-20 h-1 bg-[#b32025]" />
      <div className="absolute bottom-0 right-0 w-1 h-20 bg-[#b32025]" />
      <div className="absolute bottom-0 right-0 w-20 h-1 bg-[#b32025]" />

      {/* Category pill */}
      <div className="absolute top-5 left-5 flex items-center gap-3 pointer-events-none">
        <div className="bg-[#b32025] px-3 py-1.5">
          <span
            className="text-white text-[10px] font-bold tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Bottom counter + CTA */}
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
        <div className="overflow-hidden pointer-events-none">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={project.id}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="block text-white tabular-nums"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {String(index + 1).padStart(2, "0")}
              <span className="text-white/40 text-base ml-2 align-baseline">
                / {String(total).padStart(2, "0")}
              </span>
            </motion.span>
          </AnimatePresence>
        </div>
        <Link
          href="/our-work"
          className="inline-flex items-center gap-2 bg-white text-[#061e31] hover:bg-[#b32025] hover:text-white px-5 py-3 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors"
          style={{ fontFamily: "'Inter', sans-serif" }}
          data-magnetic
          data-magnetic-strength="0.25"
          data-cursor-label="Case Study"
        >
          Case Study
          <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}
