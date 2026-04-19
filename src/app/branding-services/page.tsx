import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandSwoosh from "@/components/BrandSwoosh";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Branding Services | 76 Graphics",
  description:
    "76 Graphics offers professional branding services for businesses that want to stand out — logos, brand identity systems, color palettes, and brand guidelines.",
};

const INCLUDES = [
  "Logo Design",
  "Brand Identity Systems",
  "Color Palettes & Typography",
  "Brand Guidelines",
  "Business Card Design",
  "Social Media Branding Kit",
];

export default function BrandingServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#061e31] brand-stars-bg pt-36 pb-24 overflow-hidden">
        <Image
          src="/portfolio/1VU5_JpxoQr6GquBehlidPMtnedQ8TyqY.jpg"
          alt="Professional branding services by 76 Graphics"
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
            Branding Services
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
            Professional Branding for
            <span
              className="block"
              style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
            >
              Businesses That Want to Stand Out
            </span>
          </h1>
          <p
            className="text-white/60 text-lg leading-relaxed max-w-2xl mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Your brand is more than just a logo — it&apos;s how your business is perceived.
            At 76 Graphics, we create complete brand identities that build trust, attract
            customers, and position your business for growth.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-[#b32025] text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#8f1a1e] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Start Your Branding Project
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
                Everything You Need to Look Established
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
                  A strong brand makes your business look established, credible, and memorable
                  before you even speak to a customer. Businesses with professional branding
                  close more deals, command higher prices, and build trust faster.
                </p>
              </div>

              <div className="bg-[#b32025]/10 border border-[#b32025]/25 p-8">
                <p
                  className="text-white/80 text-sm italic leading-relaxed mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  &ldquo;We don&apos;t just design logos — we build the complete visual identity
                  system that runs across every touchpoint of your business.&rdquo;
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

      {/* Featured Image */}
      <section className="relative h-[400px] lg:h-[500px]">
        <Image
          src="/portfolio/1Lo0BNjDkVwoIUCzp4_t_wkJh6-aa2HLp.jpg"
          alt="76 Graphics branding project showcase"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#061e31]/40" />
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#061e31]">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2
            className="text-white uppercase mb-4"
            style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Ready to Build Your Brand?
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
            Start Your Branding Project
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
