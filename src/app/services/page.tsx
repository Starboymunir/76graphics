import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandSwoosh from "@/components/BrandSwoosh";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getPageContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Services | 76 Graphics",
  description:
    "Branding, website design, vehicle wraps, signage, environmental graphics, and promotional products. 76 Graphics is your all-in-one branding & marketing partner.",
};

const SERVICE_ENTRIES = [
  { key: "branding-services", href: "/branding-services", num: "01", kicker: "Identity Systems", accent: "#b32025" },
  { key: "website-design", href: "/website-design", num: "02", kicker: "Conversion Web", accent: "#567fa7" },
  { key: "vehicle-wraps", href: "/vehicle-wraps", num: "03", kicker: "Rolling Media", accent: "#b32025" },
  { key: "signage", href: "/signage", num: "04", kicker: "Spatial Visibility", accent: "#567fa7" },
  { key: "environmental-graphics", href: "/environmental-graphics", num: "05", kicker: "Branded Interiors", accent: "#b32025" },
  { key: "promotional-products", href: "/promotional-products", num: "06", kicker: "Brand In Hand", accent: "#567fa7" },
] as const;

export default function ServicesPage() {
  const services = SERVICE_ENTRIES.map((entry) => {
    const content = getPageContent(entry.key);
    return {
      ...entry,
      content,
      image: content?.featuredImage ?? content?.hero.image ?? "/services/branding/detail.jpg",
      scene: content?.gallery?.scene1 ?? content?.gallery?.scene2 ?? content?.hero.image ?? "/services/branding/scene-1.jpg",
    };
  }).filter((entry) => entry.content);

  const lead = services[0];
  const rail = services.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-[#051522] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden bg-[#051522]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(179,32,37,0.22),transparent_24%),radial-gradient(circle_at_82%_20%,rgba(86,127,167,0.18),transparent_26%),linear-gradient(135deg,#051522_0%,#092f4d_52%,#051522_100%)]" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-white/[0.04] uppercase pointer-events-none select-none text-center whitespace-nowrap"
          style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(8rem, 22vw, 20rem)", lineHeight: 0.85 }}
        >
          Service Worlds
        </div>
        <BrandSwoosh position="bottom" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6">
            <p className="text-[#ff6f73] text-xs font-bold tracking-[0.35em] uppercase mb-4">What We Do</p>
            <h1
              className="text-white uppercase leading-[0.84] mb-6"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.8rem, 7vw, 6.2rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Six Distinct
              <span className="block text-transparent" style={{ WebkitTextStroke: "2px #b32025" }}>
                Growth Systems
              </span>
            </h1>
            <p className="text-white/74 text-lg leading-relaxed max-w-2xl">
              Every service at 76 Graphics is built like its own discipline, not a checkbox on a brochure. Explore the worlds below: identity, web, wraps, signage, environments, and merch designed as high-impact systems for real business growth.
            </p>
          </div>

          {lead && (
            <Link
              href={lead.href}
              className="lg:col-span-6 group relative min-h-[440px] block overflow-hidden border border-white/12 [clip-path:polygon(0_0,100%_0,94%_100%,0_100%)] shadow-2xl shadow-black/25"
            >
              <Image src={lead.image} alt={lead.content?.hero.tag ?? lead.key} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(5,21,34,0.18)_0%,rgba(5,21,34,0.88)_74%,rgba(5,21,34,0.96)_100%)]" />
              <div className="absolute left-0 top-0 h-full w-2" style={{ backgroundColor: lead.accent }} />
              <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end">
                <p className="text-xs uppercase tracking-[0.28em] text-[#ff6f73] font-bold">{lead.kicker}</p>
                <h2 className="mt-3 text-white uppercase leading-[0.9] max-w-md" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}>
                  {lead.content?.hero.headline1}
                </h2>
                <p className="mt-4 text-white/72 max-w-lg leading-relaxed text-sm lg:text-base">
                  {lead.content?.hero.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[#ff6f73] text-xs font-bold tracking-[0.18em] uppercase group-hover:gap-3 transition-all duration-200">
                  Explore Service
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="py-20 bg-[#061e31]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {rail.slice(0, 2).map((service) => (
              <Link
                key={service.key}
                href={service.href}
                className="group relative min-h-[320px] overflow-hidden border border-white/10 bg-[#092f4d] [clip-path:polygon(0_0,100%_0,92%_100%,0_100%)]"
              >
                <Image src={service.image} alt={service.content?.hero.tag ?? service.key} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(6,30,49,0.16)_0%,rgba(6,30,49,0.86)_72%,rgba(6,30,49,0.96)_100%)]" />
                <div className="absolute inset-0 p-7 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[#ff6f73] text-xs font-bold tracking-[0.25em] uppercase">{service.kicker}</p>
                    <span className="text-white/34 text-4xl" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{service.num}</span>
                  </div>
                  <div>
                    <h2 className="uppercase text-white leading-[0.92] max-w-sm" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 2.6vw, 2.2rem)" }}>
                      {service.content?.hero.tag}
                    </h2>
                    <p className="mt-3 text-white/70 max-w-md text-sm leading-relaxed">
                      {service.content?.includes?.heading ?? service.content?.hero.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#051522] overflow-hidden border-y border-white/10">
        <div className="flex gap-5 w-max animate-[service-marquee_30s_linear_infinite] px-6 lg:px-12">
          {[...services, ...services].map((service, index) => (
            <Link
              key={`${service.key}-${index}`}
              href={service.href}
              className="group relative w-[300px] h-[210px] md:w-[360px] md:h-[240px] shrink-0 overflow-hidden border border-white/10 [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]"
            >
              <Image src={service.scene} alt={service.content?.hero.tag ?? service.key} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,30,49,0.05)_0%,rgba(6,30,49,0.82)_100%)]" />
              <div className="absolute left-5 right-5 bottom-5">
                <p className="text-[#ff6f73] text-[10px] uppercase tracking-[0.22em] font-bold">{service.num}</p>
                <p className="mt-2 text-white text-lg uppercase leading-tight" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700 }}>
                  {service.content?.hero.tag}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#092f4d]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-6">
          {services.slice(3).map((service, index) => (
            <Link
              key={service.key}
              href={service.href}
              className={`group relative overflow-hidden border border-white/10 ${index === 0 ? "lg:col-span-7 min-h-[360px]" : "lg:col-span-5 min-h-[360px]"}`}
            >
              <Image src={service.image} alt={service.content?.hero.tag ?? service.key} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(9,47,77,0.12)_0%,rgba(6,30,49,0.88)_74%,rgba(6,30,49,0.96)_100%)]" />
              <div className="absolute inset-0 p-7 lg:p-8 flex flex-col justify-between">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[#ff6f73] text-xs uppercase tracking-[0.25em] font-bold">{service.kicker}</p>
                  <span className="text-white/28 text-4xl" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{service.num}</span>
                </div>
                <div>
                  <h2 className="uppercase text-white leading-[0.92] max-w-sm" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)" }}>
                    {service.content?.hero.tag}
                  </h2>
                  <p className="mt-3 text-white/72 max-w-md text-sm leading-relaxed">
                    {service.content?.hero.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[#ff6f73] text-xs font-bold tracking-[0.18em] uppercase group-hover:gap-3 transition-all duration-200">
                    Open Page
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20 bg-[#061e31]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-white uppercase mb-4" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.6rem)" }}>
            Need The Right Mix?
          </h2>
          <p className="text-white/56 text-base lg:text-lg leading-relaxed mb-8">
            Most clients don&apos;t need one isolated tactic. They need the right combination of identity, visibility, digital performance, and physical brand presence. We can map the right stack for your business.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-[#b32025] text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase hover:bg-[#8f1a1e] transition-colors"
          >
            Get a Free Quote
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
