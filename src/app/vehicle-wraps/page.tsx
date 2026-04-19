import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandSwoosh from "@/components/BrandSwoosh";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Vehicle Wraps | 76 Graphics",
  description:
    "Custom vehicle wraps that turn your car into a moving billboard. Full & partial wraps, commercial fleet wraps, design, print, and professional installation.",
};

const INCLUDES = [
  "Full & Partial Vehicle Wraps",
  "Commercial Fleet Wraps",
  "Custom Wrap Design",
  "Professional Print",
  "3M-Certified Installation",
  "Color Change Wraps",
];

export default function VehicleWrapsPage() {
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
            Vehicle Wraps
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
            Custom Vehicle Wraps That Turn
            <span
              className="block"
              style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
            >
              Your Car Into a Moving Billboard
            </span>
          </h1>
          <p
            className="text-white/60 text-lg leading-relaxed max-w-2xl mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Vehicle wraps are one of the most powerful forms of advertising. We design, print,
            and install high-quality wraps that generate thousands of impressions daily —
            turning every drive into a marketing opportunity.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-[#b32025] text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#8f1a1e] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Get a Wrap Quote
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
                Design, Print & Install — All in One Place
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
                  The Most Cost-Effective Advertising
                </h3>
                <p
                  className="text-white/60 text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  A single vehicle wrap can generate between 30,000–70,000 impressions per day.
                  Compared to billboards, radio, or digital ads — the cost per impression is
                  a fraction of any other channel. It&apos;s a one-time investment that works 24/7.
                </p>
              </div>

              <div className="bg-[#061e31] border border-white/10 p-8">
                <h3
                  className="text-white uppercase mb-3"
                  style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}
                >
                  3M-Certified Installation
                </h3>
                <p
                  className="text-white/60 text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Our certified installers use premium 3M vinyl to ensure a perfect finish
                  that lasts years without peeling, fading, or bubbling. We stand behind
                  every installation we do.
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
            Ready to Wrap Your Vehicle?
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
            Get a Wrap Quote
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
