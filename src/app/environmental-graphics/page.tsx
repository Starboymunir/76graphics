import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandSwoosh from "@/components/BrandSwoosh";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Environmental Graphics & Wall Wraps | 76 Graphics",
  description:
    "Custom wall wraps, window graphics, and environmental branding that transform offices, storefronts, and interiors into immersive brand experiences.",
};

const INCLUDES = [
  "Wall Wraps & Murals",
  "Window Graphics & Frosted Vinyl",
  "Office & Corporate Branding",
  "Retail & Commercial Interiors",
  "Privacy Graphics",
  "Custom Design + Installation",
];

const USE_CASES = [
  "Offices & Corporate Spaces",
  "Retail Stores",
  "Gyms & Studios",
  "Restaurants & Cafés",
];

export default function EnvironmentalGraphicsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#061e31] brand-stars-bg pt-36 pb-24 overflow-hidden">
        <Image
          src="/portfolio/1iOPICYZ38nQcQXetyU8VMYWCt-o-niBK.jpg"
          alt="Environmental graphics and wall wraps by 76 Graphics"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061e31]/95 via-[#092f4d]/85 to-[#092f4d]/60" />
        <BrandSwoosh position="bottom" />
        <div className="max-w-5xl mx-auto px-8 lg:px-14 relative z-10">
          <p
            className="text-[#b32025] text-xs font-bold tracking-[0.35em] uppercase mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Environmental Graphics
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
            Wall Wraps & Graphics That
            <span
              className="block"
              style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
            >
              Transform Your Space
            </span>
          </h1>
          <p
            className="text-white/60 text-lg leading-relaxed max-w-2xl mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Your space is part of your brand. We design and install high-quality wall wraps,
            window graphics, and environmental branding that turn offices, storefronts, and
            interiors into immersive brand experiences.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-[#b32025] text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#8f1a1e] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Transform Your Space
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-24 bg-[#092f4d]">
        <div className="max-w-5xl mx-auto px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p
                className="text-[#b32025] text-xs font-bold tracking-[0.3em] uppercase mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                What We Offer
              </p>
              <h2
                className="text-white uppercase leading-tight mb-8"
                style={{
                  fontFamily: "'Apotek Extended', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                }}
              >
                Branding for Every Surface
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
                  Why It Matters
                </h3>
                <p
                  className="text-white/60 text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Environmental graphics don&apos;t just decorate a space — they create a
                  lasting impression on customers, clients, and employees. Whether it&apos;s
                  a retail store, office, or commercial space, your environment should reflect
                  your brand at every touchpoint.
                </p>
              </div>

              <div className="bg-[#b32025]/10 border border-[#b32025]/25 p-8">
                <p
                  className="text-white/80 text-sm italic leading-relaxed mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  &ldquo;Most businesses focus only on outside visibility — but we help you
                  control the entire customer experience, from the street to inside your
                  space.&rdquo;
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

      {/* Use Cases */}
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
            {USE_CASES.map((uc) => (
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

      {/* Featured Image */}
      <section className="relative h-[400px] lg:h-[500px]">
        <Image
          src="/portfolio/1cgRLqh19GkO98P8It8aKdFYde_S5XPY9.jpg"
          alt="76 Graphics environmental graphics project showcase"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#061e31]/40" />
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#092f4d]">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2
            className="text-white uppercase mb-4"
            style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Ready to Transform Your Space?
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
            Transform Your Space
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
