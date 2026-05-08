"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  tags: string;
  photo: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SHOWCASE RAIL — sticky horizontal scroll showcase
// Replaces the generic bento Featured Work block on the homepage.
// Big numerals, smash-in titles, drifting bg headline, parallax cards.
// ─────────────────────────────────────────────────────────────────────────────

export default function ShowcaseRail() {
  const [projects, setProjects] = useState<Project[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

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

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Horizontal track translate. We have N panels + intro panel.
  // Total panels = projects.length + 1 (intro). On scroll progress 0→1 we move
  // from 0 to -((panels - 1) * 100vw) — but in % that's -((panels-1)*100)%.
  const totalPanels = projects.length + 1;
  const trackEnd = -((totalPanels - 1) * 100);
  const xPct = useTransform(scrollYProgress, [0, 1], [0, trackEnd]);
  const x = useSpring(xPct, { stiffness: 90, damping: 24, mass: 0.6 });
  const trackTransform = useMotionTemplate`translate3d(${x}vw, 0, 0)`;

  // Counter-drifting background headline
  const bgX = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const bgTransform = useMotionTemplate`translate3d(${bgX}%, -50%, 0)`;

  // Active index (for the (01) — (06) counter)
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        totalPanels - 1,
        Math.max(0, Math.round(v * (totalPanels - 1)))
      );
      setActiveIdx(idx);
    });
    return () => unsub();
  }, [scrollYProgress, totalPanels]);

  // ── Mobile fallback: simple vertical scroll ──
  if (!isDesktop || projects.length === 0) {
    return <MobileFallback projects={projects} />;
  }

  return (
    <section
      ref={sectionRef}
      id="our-work"
      className="relative bg-[#061e31]"
      style={{ height: `${totalPanels * 100}vh` }}
      aria-label="Featured work"
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-screen overflow-hidden">
        {/* Star field tone */}
        <div className="absolute inset-0 brand-stars-bg opacity-15 pointer-events-none" />

        {/* Drifting background headline */}
        <motion.div
          aria-hidden
          style={{ transform: bgTransform }}
          className="absolute top-1/2 left-0 whitespace-nowrap select-none pointer-events-none z-0"
        >
          <span
            className="uppercase opacity-[0.05] text-white"
            style={{
              fontFamily: "'Apotek Extended', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(14rem, 28vw, 26rem)",
              lineHeight: 0.82,
              letterSpacing: "-0.02em",
            }}
          >
            FEATURED · FEATURED · FEATURED · FEATURED
          </span>
        </motion.div>

        {/* Top bar — section eyebrow + counter */}
        <div className="absolute top-0 left-0 right-0 z-30 px-8 lg:px-14 pt-8 flex items-end justify-between pointer-events-none">
          <div className="flex items-center gap-4">
            <div className="h-px w-10 bg-[#b32025]" />
            <span
              className="text-[#b32025] text-[10px] font-bold tracking-[0.4em] uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Featured Work — Scroll
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <motion.span
              key={activeIdx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-white tabular-nums"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 4vw, 4rem)",
                lineHeight: 1,
              }}
            >
              {String(activeIdx + 1).padStart(2, "0")}
            </motion.span>
            <span
              className="text-white/30 text-sm tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              / {String(totalPanels).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Horizontal track */}
        <motion.div
          style={{ transform: trackTransform }}
          className="absolute top-0 left-0 h-full flex"
        >
          {/* Intro panel */}
          <IntroPanel />
          {projects.map((p, i) => (
            <ProjectPanel
              key={p.id}
              project={p}
              index={i}
              progress={scrollYProgress}
              total={totalPanels}
            />
          ))}
        </motion.div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 z-30 px-8 lg:px-14 pb-6 flex items-center gap-4 pointer-events-none">
          <span
            className="text-white/40 text-[10px] tracking-[0.3em] uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Drag · Scroll · Explore
          </span>
          <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="absolute inset-0 bg-[#b32025]"
            />
          </div>
          <Link
            href="/our-work"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-[11px] font-bold tracking-[0.2em] uppercase pointer-events-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
            data-magnetic
            data-magnetic-strength="0.3"
            data-cursor-label="Full Portfolio"
          >
            All Work
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INTRO PANEL
// ─────────────────────────────────────────────────────────────────────────────
function IntroPanel() {
  return (
    <div className="relative w-screen h-screen flex-shrink-0 flex items-center px-8 lg:px-14">
      <div className="max-w-3xl relative z-10">
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-white uppercase leading-[0.85]"
          style={{
            fontFamily: "'Apotek Extended', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3rem, 8vw, 8rem)",
            letterSpacing: "-0.015em",
          }}
        >
          Real
          <br />
          Brands.
          <br />
          <span style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}>
            Real Loud.
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/55 text-base lg:text-lg mt-8 max-w-md leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Scroll. We&apos;re showing off — every panel is a real client we shipped
          for. Wraps, wayfinding, web, the full stack of stand-out.
        </motion.p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT PANEL
// ─────────────────────────────────────────────────────────────────────────────
function ProjectPanel({
  project,
  index,
  progress,
  total,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  // Each panel is "active" between (i)/(total-1) and (i+1)/(total-1)
  const start = index / (total - 1);
  const end = (index + 1) / (total - 1);

  const imageScale = useTransform(progress, [start - 0.1, start, end], [1.15, 1, 1.05]);
  const imageX = useTransform(progress, [start - 0.1, end + 0.1], [40, -40]);
  const titleY = useTransform(progress, [start - 0.05, start, end - 0.05, end], [60, 0, 0, -40]);
  const titleOpacity = useTransform(progress, [start - 0.05, start, end - 0.05, end], [0, 1, 1, 0]);

  const number = String(index + 2).padStart(2, "0"); // intro is 01, projects start at 02

  return (
    <div className="relative w-screen h-screen flex-shrink-0 flex items-center justify-center px-8 lg:px-14">
      {/* Layout: massive numeral (left), image card (right) */}
      <div className="relative w-full h-full flex items-center">
        {/* Massive numeral backdrop */}
        <div
          aria-hidden
          className="absolute left-0 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0"
        >
          <motion.div style={{ y: titleY }}>
            <span
              className="uppercase block leading-none"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(20rem, 38vw, 40rem)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(179,32,37,0.35)",
                letterSpacing: "-0.03em",
              }}
            >
              {number}
            </span>
          </motion.div>
        </div>

        {/* Image card */}
        <motion.div
          style={{ x: imageX }}
          className="relative ml-auto w-[58%] h-[68vh] z-10"
          data-cursor="view"
          data-cursor-label="View"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div style={{ scale: imageScale }} className="absolute inset-0">
              <Image
                src={project.photo}
                alt={project.title}
                fill
                className="object-cover"
                sizes="60vw"
                unoptimized={project.photo.startsWith("http")}
              />
            </motion.div>
            {/* Gradient corner */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#061e31]/70 via-transparent to-transparent" />
            {/* Red corner accent */}
            <div className="absolute top-0 left-0 w-1 h-24 bg-[#b32025]" />
            <div className="absolute top-0 left-0 w-24 h-1 bg-[#b32025]" />
          </div>

          {/* Bottom info bar */}
          <motion.div
            style={{ opacity: titleOpacity }}
            className="absolute -bottom-px left-0 right-0 bg-[#061e31] border-t border-[#b32025] px-6 py-5 flex items-end justify-between"
          >
            <div>
              <span
                className="text-[#b32025] text-[10px] font-bold tracking-[0.3em] uppercase block mb-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {project.category}
              </span>
              <h3
                className="text-white uppercase leading-none"
                style={{
                  fontFamily: "'Apotek Extended', sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(1.5rem, 2.4vw, 2.4rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {project.title}
              </h3>
              <p
                className="text-white/40 text-xs mt-2 tracking-wide"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {project.tags}
              </p>
            </div>
            <Link
              href="/our-work"
              className="hidden lg:inline-flex items-center gap-2 border border-white/30 hover:border-[#b32025] hover:text-[#b32025] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
              data-magnetic
              data-magnetic-strength="0.25"
            >
              Case Study
              <ArrowRight size={12} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE FALLBACK
// ─────────────────────────────────────────────────────────────────────────────
function MobileFallback({ projects }: { projects: Project[] }) {
  return (
    <section id="our-work" className="bg-[#061e31] py-20 px-6 relative overflow-hidden">
      <div className="brand-stars-bg absolute inset-0 opacity-15 pointer-events-none" />
      <div className="relative z-10 max-w-xl mx-auto">
        <span
          className="text-[#b32025] text-[10px] font-bold tracking-[0.35em] uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Featured Work
        </span>
        <h2
          className="text-white uppercase leading-[0.9] mt-4 mb-10"
          style={{
            fontFamily: "'Apotek Extended', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.5rem, 12vw, 4rem)",
          }}
        >
          Real Brands.
          <br />
          <span style={{ color: "transparent", WebkitTextStroke: "1.5px #b32025" }}>
            Real Loud.
          </span>
        </h2>
        <div className="space-y-6">
          {projects.slice(0, 4).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src={p.photo}
                alt={p.title}
                fill
                className="object-cover"
                sizes="100vw"
                unoptimized={p.photo.startsWith("http")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061e31] via-[#061e31]/30 to-transparent" />
              <div className="absolute top-3 left-3 bg-[#b32025] text-white text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-1">
                {p.category}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span
                  className="text-white/50 text-[10px] tracking-[0.3em] uppercase block mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="text-white uppercase leading-none"
                  style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "1.6rem" }}
                >
                  {p.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
        <Link
          href="/our-work"
          className="mt-10 inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          View Full Portfolio
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
