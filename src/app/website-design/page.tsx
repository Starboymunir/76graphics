import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandSwoosh from "@/components/BrandSwoosh";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Website Design | 76 Graphics",
  description:
    "Custom website design that converts visitors into customers. 76 Graphics builds modern, fast, SEO-optimized websites and landing pages for businesses.",
};

const INCLUDES = [
  "Custom Website Design",
  "Mobile Optimization",
  "Basic SEO Setup",
  "Landing Pages",
  "Contact & Quote Forms",
  "Fast Loading & Performance",
];

export default function WebsiteDesignPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#061e31] brand-stars-bg pt-36 pb-24 overflow-hidden">
        <BrandSwoosh position="bottom" />
        <div className="max-w-5xl mx-auto px-8 lg:px-14 relative z-10">
          <p
            className="text-[#b32025] text-xs font-bold tracking-[0.35em] uppercase mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Website Design
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
            Custom Website Design That
            <span
              className="block"
              style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
            >
              Converts Visitors Into Customers
            </span>
          </h1>
          <p
            className="text-white/60 text-lg leading-relaxed max-w-2xl mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Your website should do more than look good — it should generate leads and sales.
            We design modern, fast, and conversion-focused websites tailored to your business
            and optimized for search engines.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-[#b32025] text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#8f1a1e] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Get Your Website Built
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-[#092f4d]">
        <div className="max-w-5xl mx-auto px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p
                className="text-[#b32025] text-xs font-bold tracking-[0.3em] uppercase mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                What&apos;s Included
              </p>
              <h2
                className="text-white uppercase leading-tight mb-8"
                style={{
                  fontFamily: "'Apotek Extended', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                }}
              >
                A Website That Works for Your Business
              </h2>
              <ul className="space-y-4">
                {INCLUDES.map((item) => (
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
              <div className="bg-[#061e31] border border-white/10 p-8">
                <h3
                  className="text-white uppercase mb-3"
                  style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}
                >
                  SEO-Ready from Day One
                </h3>
                <p
                  className="text-white/60 text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  We build websites optimized for search engines so your business can be found
                  locally and online. Every site includes proper structure, meta tags, fast
                  loading speeds, and mobile responsiveness — the foundation for ranking.
                </p>
              </div>

              <div className="bg-[#b32025]/10 border border-[#b32025]/25 p-8">
                <p
                  className="text-white/80 text-sm italic leading-relaxed mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  &ldquo;A professional website is your 24/7 salesperson. We make sure it
                  actually converts, not just looks good.&rdquo;
                </p>
                <p
                  className="text-[#b32025] text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  — 76 Graphics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#061e31]">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2
            className="text-white uppercase mb-4"
            style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Ready to Build Your Website?
          </h2>
          <p
            className="text-white/50 text-sm mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Most quotes are delivered within 24 hours. No obligation. No pressure.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-[#b32025] text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#8f1a1e] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Get Your Website Built
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
