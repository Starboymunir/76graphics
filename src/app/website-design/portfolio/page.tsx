import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, Globe } from "lucide-react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getWebsitePortfolio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Website Design Portfolio | 76 Graphics",
  description:
    "Live websites we've designed and built — from Shopify storefronts to Next.js brand sites and lead-generation funnels. See the work, then visit the sites.",
};

export default function WebsitePortfolioPage() {
  const projects = getWebsitePortfolio();

  return (
    <div className="min-h-screen bg-[#031827] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#031827]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(179,32,37,0.28),transparent_28%),radial-gradient(circle_at_15%_70%,rgba(86,127,167,0.18),transparent_28%),linear-gradient(135deg,#031827_0%,#092f4d_55%,#02101a_100%)]" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-white/[0.04] uppercase pointer-events-none select-none text-center whitespace-nowrap"
          style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(7rem, 20vw, 18rem)", lineHeight: 0.85 }}
        >
          Live Sites
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-2 bg-[linear-gradient(90deg,#b32025_0%,#ffffff_45%,#285493_100%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
          <Link
            href="/website-design"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs font-bold uppercase tracking-[0.22em] mb-8 transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <ArrowLeft size={14} />
            Back to Website Design
          </Link>

          <p
            className="text-[#ff6f73] text-xs font-bold tracking-[0.35em] uppercase mb-5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Website Design — Selected Work
          </p>
          <h1
            className="uppercase leading-[0.84] mb-8 max-w-5xl"
            style={{
              fontFamily: "'Apotek Extended', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.6rem, 7vw, 6rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Sites We&apos;ve
            <span className="block text-transparent" style={{ WebkitTextStroke: "2px #b32025" }}>
              Designed &amp; Shipped
            </span>
          </h1>
          <p
            className="text-white/75 text-lg leading-relaxed max-w-3xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Real, live websites running on real domains — built for storefronts, services, brands, and lead generation.
            Each one was scoped, designed, developed, and launched by 76 Graphics.
          </p>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="bg-[#031827] pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 space-y-24 lg:space-y-36">
          {projects.map((project, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <article
                key={project.id}
                className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {/* Screenshot — full glory */}
                <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative aspect-[16/10] overflow-hidden border border-white/10 rounded-[18px] bg-[#061e31] shadow-2xl shadow-black/40"
                    aria-label={`Visit ${project.title}`}
                  >
                    <Image
                      src={project.photo}
                      alt={`${project.title} — homepage screenshot`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={idx === 0}
                    />
                    {/* Browser chrome bar */}
                    <div className="absolute top-0 left-0 right-0 h-9 bg-[#0a1f2f]/95 backdrop-blur-sm border-b border-white/10 flex items-center px-4 gap-2 z-10">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <div
                        className="flex-1 mx-3 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-white/50 tracking-wider"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <Globe size={9} className="mr-1.5" /> {project.domain}
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-5 right-5 inline-flex items-center gap-2 bg-[#b32025] text-white px-4 py-2.5 text-xs font-bold tracking-[0.18em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Open Live Site
                      <ExternalLink size={13} />
                    </div>
                  </a>
                </div>

                {/* Detail panel */}
                <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-8 h-px" style={{ backgroundColor: project.accent }} />
                    <span
                      className="text-xs font-bold tracking-[0.3em] uppercase"
                      style={{ fontFamily: "'Inter', sans-serif", color: project.accent }}
                    >
                      {String(idx + 1).padStart(2, "0")} — {project.year}
                    </span>
                  </div>

                  <h2
                    className="uppercase leading-[0.92] mb-2"
                    style={{
                      fontFamily: "'Apotek Extended', sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(2rem, 3.6vw, 3rem)",
                    }}
                  >
                    {project.title}
                  </h2>
                  <p
                    className="text-white/60 text-sm uppercase tracking-[0.2em] mb-5"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {project.subtitle}
                  </p>

                  <p
                    className="text-white/80 text-base leading-relaxed mb-7"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {project.summary}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2.5 mb-7">
                    {project.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm text-white/75 leading-relaxed"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: project.accent }}
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stack + Services chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                    <div>
                      <p
                        className="text-white/40 text-[10px] font-bold tracking-[0.28em] uppercase mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Stack
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-semibold tracking-[0.15em] uppercase border border-white/15 px-2.5 py-1 text-white/80"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p
                        className="text-white/40 text-[10px] font-bold tracking-[0.28em] uppercase mb-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        Services
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.services.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1 text-white/85"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              backgroundColor: `${project.accent}22`,
                              border: `1px solid ${project.accent}55`,
                            }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-white px-7 py-3.5 text-sm font-bold tracking-[0.16em] uppercase transition-colors hover:opacity-90"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      backgroundColor: project.accent,
                    }}
                  >
                    Visit {project.domain}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-[#092f4d] py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(179,32,37,0.30),transparent_28%)]" />
        <div className="absolute left-0 right-0 top-0 h-1 bg-[linear-gradient(90deg,#b32025_0%,#ffffff_45%,#285493_100%)]" />
        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-12 text-center">
          <p
            className="text-[#ff6f73] text-xs font-bold tracking-[0.35em] uppercase mb-5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Your Site Is Next
          </p>
          <h2
            className="uppercase leading-[0.9] mb-6"
            style={{
              fontFamily: "'Apotek Extended', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            }}
          >
            Let&apos;s Build a Site
            <span className="block text-transparent" style={{ WebkitTextStroke: "2px #b32025" }}>
              That Actually Sells
            </span>
          </h2>
          <p
            className="text-white/70 text-lg max-w-2xl mx-auto mb-9 leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Whether you need a Shopify storefront, a brand site, or a lead-generation funnel — we scope, design, and ship.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#b32025] hover:bg-[#8f181c] px-10 py-4 text-sm font-bold tracking-[0.16em] uppercase transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Start Your Project
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
