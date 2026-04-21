import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandSwoosh from "@/components/BrandSwoosh";
import { ArrowRight } from "lucide-react";
import type { PageContent } from "@/lib/content";

function CrestIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <path d="M8 7h32v14c0 10-6 15-16 20C14 36 8 31 8 21V7Z" stroke="#b32025" strokeWidth="2" />
      <path d="M16 17h16M16 23h16M16 29h10" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SwatchIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <circle cx="17" cy="17" r="8" stroke="#b32025" strokeWidth="2" />
      <circle cx="31" cy="17" r="8" stroke="#ffffff" strokeWidth="2" />
      <circle cx="24" cy="31" r="8" stroke="#567fa7" strokeWidth="2" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="12" height="12" stroke="#ffffff" strokeWidth="2" />
      <rect x="28" y="8" width="12" height="12" stroke="#b32025" strokeWidth="2" />
      <rect x="8" y="28" width="12" height="12" stroke="#567fa7" strokeWidth="2" />
      <rect x="28" y="28" width="12" height="12" stroke="#ffffff" strokeWidth="2" />
    </svg>
  );
}

export default function BrandingLanding({ content }: { content: PageContent }) {
  return (
    <div className="min-h-screen bg-[#061e31] text-white">
      <Navbar />

      <section className="relative overflow-hidden pt-36 pb-20">
        <Image src="/services/branding/hero.jpg" alt="Branding strategy board" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(6,30,49,0.96)_15%,rgba(9,47,77,0.78)_52%,rgba(6,30,49,0.9)_100%)]" />
        <div className="absolute -right-24 -top-24 w-[340px] h-[340px] rounded-full border border-white/15" />
        <div className="absolute right-10 top-24 w-[220px] h-[220px] [clip-path:polygon(50%_0%,95%_35%,78%_95%,22%_95%,5%_35%)] bg-[#b32025]/20" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <p className="text-xs tracking-[0.35em] uppercase text-[#ff6f73] font-bold mb-4">Brand Strategy Lab</p>
          <h1 className="max-w-4xl uppercase leading-[0.86]" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(2.4rem, 6vw, 5.8rem)" }}>
            {content.hero.headline1}
            <span className="block text-transparent" style={{ WebkitTextStroke: "2px #ffffff" }}>{content.hero.headline2}</span>
          </h1>
          <p className="max-w-2xl text-white/80 mt-6 text-lg leading-relaxed">{content.hero.description}</p>
        </div>
        <BrandSwoosh position="bottom" />
      </section>

      <section className="py-20 bg-[#092f4d]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-3 gap-6">
          {[
            { title: "Identity Architecture", text: "Naming hierarchy, logo families, lockups, and practical rules that scale from social avatars to wraps.", Icon: CrestIcon },
            { title: "Color + Type System", text: "Purpose-built palettes and typography stacks crafted for readability, impact, and production consistency.", Icon: SwatchIcon },
            { title: "Application Toolkit", text: "Ready-to-use brand assets for sales decks, social templates, uniforms, and print materials.", Icon: GridIcon },
          ].map(({ title, text, Icon }) => (
            <article key={title} className="bg-[#061e31]/85 border border-white/10 p-7 rounded-sm">
              <Icon />
              <h2 className="mt-5 text-xl uppercase" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{title}</h2>
              <p className="text-white/70 mt-3 text-sm leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {content.includes && (
        <section className="relative py-20 bg-[#061e31] overflow-hidden">
          <div className="absolute inset-x-0 -top-16 h-24 bg-[#092f4d] [clip-path:polygon(0_0,100%_35%,100%_100%,0_100%)]" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.3em] font-bold mb-3">{content.hero.tag}</p>
              <h3 className="uppercase text-3xl leading-tight" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{content.includes.heading}</h3>
              <p className="mt-5 text-white/80 leading-relaxed">
                {content.hero.description} {content.infoBox?.text ?? "We translate strategy into a flexible identity that works in digital and physical environments without visual drift."}
              </p>
              {content.quote && (
                <blockquote className="mt-6 border-l-2 border-[#b32025] pl-4 text-white/70 italic">&ldquo;{content.quote.text}&rdquo;</blockquote>
              )}
            </div>
            <div className="lg:col-span-5 grid gap-3">
              {content.includes.items.map((item, idx) => (
                <div key={item} className="border border-white/10 bg-[#092f4d]/50 p-4">
                  <p className="text-[#ff6f73] text-xs">0{idx + 1}</p>
                  <p className="mt-1 text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-[#061e31]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 relative min-h-[340px] border border-white/10">
            <Image src="/services/branding/detail.jpg" alt="Brand identity showcase" fill className="object-cover" />
          </div>
          <div className="lg:col-span-5 grid gap-5">
            <div className="relative min-h-[165px] border border-white/10">
              <Image src="/portfolio/1VU5_JpxoQr6GquBehlidPMtnedQ8TyqY.jpg" alt="Vehicle branding system" fill className="object-cover" />
            </div>
            <div className="relative min-h-[165px] border border-white/10">
              <Image src="/portfolio/1GfEFSzGyfuOnG0k7B3zfNiyQ9ocKGgtm.jpg" alt="Digital brand style" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#092f4d]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <h3 className="uppercase text-3xl" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>Brand Build Timeline</h3>
          <div className="mt-8 grid md:grid-cols-4 gap-4">
            {[
              "Discovery Sprint",
              "Creative Territory",
              "System Design",
              "Launch Assets",
            ].map((step, i) => (
              <div key={step} className="border border-white/15 bg-[#061e31]/70 p-5">
                <p className="text-[#ff6f73] text-xs tracking-[0.2em]">0{i + 1}</p>
                <p className="mt-2 text-sm font-semibold">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/contact" className="inline-flex items-center gap-3 bg-[#b32025] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] hover:bg-[#8f1a1e] transition-colors">
              {content.cta?.ctaText ?? "Start Your Branding Project"}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
