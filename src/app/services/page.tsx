import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandSwoosh from "@/components/BrandSwoosh";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | 76 Graphics",
  description:
    "Branding, website design, vehicle wraps, signage, environmental graphics, and promotional products. 76 Graphics is your all-in-one branding & marketing partner.",
};

const SERVICES = [
  {
    num: "01",
    title: "Branding & Identity",
    description:
      "Logos, brand systems, colors, typography, and guidelines that make your business look established from day one.",
    href: "/branding-services",
    cta: "Learn More",
  },
  {
    num: "02",
    title: "Website Design",
    description:
      "Custom, conversion-focused websites and landing pages built for speed, SEO, and turning visitors into paying customers.",
    href: "/website-design",
    cta: "Learn More",
  },
  {
    num: "03",
    title: "Vehicle Wraps",
    description:
      "Full & partial wraps, fleet wraps, and color changes. Design, print, and 3M-certified installation \u2014 all in one place.",
    href: "/vehicle-wraps",
    cta: "Learn More",
  },
  {
    num: "04",
    title: "Signage",
    description:
      "Storefront signs, window graphics, banners, and trade show displays that attract attention and bring customers through your doors.",
    href: "/signage",
    cta: "Learn More",
  },
  {
    num: "05",
    title: "Environmental Graphics",
    description:
      "Wall wraps, window vinyl, office branding, and interior graphics that transform your space into an immersive brand experience.",
    href: "/environmental-graphics",
    cta: "Learn More",
  },
  {
    num: "06",
    title: "Promotional Products",
    description:
      "Business cards, branded apparel, stickers, packaging, and merch that keeps your brand in people\u2019s hands long after the first impression.",
    href: "/promotional-products",
    cta: "Learn More",
  },
];

export default function ServicesPage() {
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
            What We Do
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
            Your All-In-One
            <span
              className="block"
              style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
            >
              Branding Partner
            </span>
          </h1>
          <p
            className="text-white/60 text-lg leading-relaxed max-w-2xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            From logos to websites, vehicle wraps to promotional products &mdash; we build
            brands that get noticed, look professional, and drive real growth.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-[#092f4d]">
        <div className="max-w-7xl mx-auto px-8 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
            {SERVICES.map((service) => (
              <Link
                key={service.num}
                href={service.href}
                className="group bg-[#0d3a5e] hover:bg-[#0f4570] p-8 lg:p-10 transition-colors duration-300 flex flex-col"
              >
                <span
                  className="text-[#b32025] text-xs font-bold tracking-[0.3em] block mb-6"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {service.num}
                </span>
                <h2
                  className="text-white uppercase leading-tight mb-4"
                  style={{
                    fontFamily: "'Apotek Extended', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
                  }}
                >
                  {service.title}
                </h2>
                <p
                  className="text-white/50 text-sm leading-relaxed mb-8 flex-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {service.description}
                </p>
                <span
                  className="inline-flex items-center gap-2 text-[#b32025] text-xs font-bold tracking-[0.15em] uppercase group-hover:gap-3 transition-all duration-200"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {service.cta}
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#061e31]">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <h2
            className="text-white uppercase mb-4"
            style={{
              fontFamily: "'Apotek Extended', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
            }}
          >
            Not Sure What You Need?
          </h2>
          <p
            className="text-white/50 text-sm mb-8"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Tell us about your business and we&rsquo;ll recommend the right services for you.
            Most quotes delivered within 24 hours.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-[#b32025] text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#8f1a1e] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Get a Free Quote
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
