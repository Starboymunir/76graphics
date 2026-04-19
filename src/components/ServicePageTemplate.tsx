import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandSwoosh from "@/components/BrandSwoosh";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PageContent } from "@/lib/content";

export default function ServicePageTemplate({ content }: { content: PageContent }) {
  const sectionLabel = content.includes?.sectionLabel ?? "What\u2019s Included";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative bg-[#061e31] brand-stars-bg pt-36 pb-24 overflow-hidden">
        {content.hero.image && (
          <>
            <Image
              src={content.hero.image}
              alt={content.hero.tag}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#061e31]/95 via-[#092f4d]/85 to-[#092f4d]/60" />
          </>
        )}
        <BrandSwoosh position="bottom" />
        <div className="max-w-5xl mx-auto px-8 lg:px-14 relative z-10">
          <p
            className="text-[#b32025] text-xs font-bold tracking-[0.35em] uppercase mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {content.hero.tag}
          </p>
          <h1
            className="text-white uppercase leading-[0.88] mb-6"
            style={{
              fontFamily: "'Apotek Extended', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              letterSpacing: "-0.01em",
            }}
          >
            {content.hero.headline1}
            <span
              className="block"
              style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
            >
              {content.hero.headline2}
            </span>
          </h1>
          <p
            className="text-white/60 text-lg leading-relaxed max-w-2xl mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {content.hero.description}
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-[#b32025] text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#8f1a1e] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {content.hero.ctaText}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </section>

      {/* ── What's Included ── */}
      {content.includes && (
        <section className="py-24 bg-[#092f4d]">
          <div className="max-w-5xl mx-auto px-8 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p
                  className="text-[#b32025] text-xs font-bold tracking-[0.3em] uppercase mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {sectionLabel}
                </p>
                <h2
                  className="text-white uppercase leading-tight mb-8"
                  style={{
                    fontFamily: "'Apotek Extended', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  }}
                >
                  {content.includes.heading}
                </h2>
                <ul className="space-y-4">
                  {content.includes.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-white/70 text-sm"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <Check size={16} className="text-[#b32025] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                {content.infoBox && (
                  <div className="bg-[#061e31] border border-white/10 p-8">
                    <h3
                      className="text-white uppercase mb-3"
                      style={{
                        fontFamily: "'Apotek Extended', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                      }}
                    >
                      {content.infoBox.title}
                    </h3>
                    <p
                      className="text-white/60 text-sm leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {content.infoBox.text}
                    </p>
                  </div>
                )}

                {content.infoBox2 && (
                  <div className="bg-[#061e31] border border-white/10 p-8">
                    <h3
                      className="text-white uppercase mb-3"
                      style={{
                        fontFamily: "'Apotek Extended', sans-serif",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                      }}
                    >
                      {content.infoBox2.title}
                    </h3>
                    <p
                      className="text-white/60 text-sm leading-relaxed"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {content.infoBox2.text}
                    </p>
                  </div>
                )}

                {content.quote && (
                  <div className="bg-[#b32025]/10 border border-[#b32025]/25 p-8">
                    <p
                      className="text-white/80 text-sm italic leading-relaxed mb-4"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      &ldquo;{content.quote.text}&rdquo;
                    </p>
                    <p
                      className="text-[#b32025] text-xs font-bold tracking-widest uppercase"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      — {content.quote.author}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Use Cases (environmental-graphics) ── */}
      {content.useCases && content.useCases.length > 0 && (
        <section className="py-20 bg-[#061e31]">
          <div className="max-w-5xl mx-auto px-8 lg:px-14">
            <p
              className="text-[#b32025] text-xs font-bold tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Perfect For
            </p>
            <h2
              className="text-white uppercase leading-tight mb-12"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              }}
            >
              Who It&apos;s For
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/8">
              {content.useCases.map((uc) => (
                <div key={uc} className="bg-[#092f4d] p-6 text-center">
                  <p
                    className="text-white/70 text-sm font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {uc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Featured Image ── */}
      {content.featuredImage && (
        <section className="relative h-[400px] lg:h-[500px]">
          <Image
            src={content.featuredImage}
            alt={`${content.hero.tag} showcase`}
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#061e31]/40" />
        </section>
      )}

      {/* ── CTA ── */}
      {content.cta && (
        <section
          className={`py-20 ${content.useCases ? "bg-[#092f4d]" : "bg-[#061e31]"}`}
        >
          <div className="max-w-3xl mx-auto px-8 text-center">
            <h2
              className="text-white uppercase mb-4"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
              }}
            >
              {content.cta.headline}
            </h2>
            <p
              className="text-white/50 text-sm mb-8"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {content.cta.description}
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-[#b32025] text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#8f1a1e] transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {content.cta.ctaText}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
