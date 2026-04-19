import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandSwoosh from "@/components/BrandSwoosh";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Business Signage | 76 Graphics",
  description:
    "Custom business signage that gets you noticed. Storefront signs, window graphics, indoor branding, and more from 76 Graphics.",
};

const INCLUDES = [
  "Storefront Signs",
  "Window Graphics & Vinyl",
  "Indoor Branding & Wall Graphics",
  "Yard Signs & Banners",
  "Trade Show Displays",
  "Custom Design + Production",
];

export default function SignagePage() {
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
            Signage & Graphics
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
            Custom Business Signage That
            <span
              className="block"
              style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
            >
              Gets You Noticed
            </span>
          </h1>
          <p
            className="text-white/60 text-lg leading-relaxed max-w-2xl mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            From storefront signs to indoor graphics, we create signage that attracts attention
            and brings customers through your doors. Professional design, high-quality production,
            and reliable installation.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-[#b32025] text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#8f1a1e] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Request Signage Quote
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
                Signage for Every Surface
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
                  First Impressions Matter
                </h3>
                <p
                  className="text-white/60 text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Your signage is often the first thing a customer sees. Professional,
                  well-designed signage immediately communicates quality and trustworthiness
                  before anyone steps through your door.
                </p>
              </div>

              <div className="bg-[#b32025]/10 border border-[#b32025]/25 p-8">
                <p
                  className="text-white/80 text-sm italic leading-relaxed mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  &ldquo;Great signage doesn&apos;t just identify your location — it sells your
                  brand before a customer ever walks in.&rdquo;
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
            Need Signage for Your Business?
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
            Request Signage Quote
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
