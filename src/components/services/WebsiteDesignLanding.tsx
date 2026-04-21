import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import type { PageContent } from "@/lib/content";

function WireframeIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <rect x="7" y="8" width="34" height="32" rx="2" stroke="#ffffff" strokeWidth="2" />
      <path d="M7 16h34M16 16v24" stroke="#567fa7" strokeWidth="2" />
      <path d="M21 23h14M21 29h11" stroke="#b32025" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <path d="M26 4L12 25h9l-3 19 18-24h-9l4-16Z" stroke="#b32025" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="16" stroke="#ffffff" strokeWidth="2" />
      <circle cx="24" cy="24" r="9" stroke="#567fa7" strokeWidth="2" />
      <circle cx="24" cy="24" r="3" fill="#b32025" />
    </svg>
  );
}

export default function WebsiteDesignLanding({ content }: { content: PageContent }) {
  return (
    <div className="min-h-screen bg-[#031827] text-white">
      <Navbar />

      <section className="relative pt-36 pb-16 overflow-hidden border-b border-white/10">
        <Image src="/services/web/hero.jpg" alt="Website design workspace" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(179,32,37,0.34),transparent_36%),linear-gradient(120deg,rgba(3,24,39,0.96)_18%,rgba(9,47,77,0.88)_56%,rgba(3,24,39,0.94)_100%)]" />
        <div className="absolute left-0 right-0 bottom-0 h-2 bg-[linear-gradient(90deg,#b32025_0%,#ffffff_45%,#285493_100%)]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[#ff6f73] font-bold mb-4">Conversion-Focused Web</p>
            <h1 className="uppercase leading-[0.85]" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(2.3rem, 6vw, 5.6rem)" }}>
              {content.hero.headline1}
              <span className="block text-transparent" style={{ WebkitTextStroke: "2px #b32025" }}>{content.hero.headline2}</span>
            </h1>
            <p className="mt-6 text-white/80 max-w-2xl text-lg leading-relaxed">{content.hero.description}</p>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-[#061e31]/90 border border-white/15 p-6">
              <p className="text-white/60 text-xs uppercase tracking-[0.2em]">Expected Results</p>
              <p className="mt-4 text-3xl" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>Faster. Clearer. Higher-Intent Leads.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#061e31]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-3 gap-6">
          {[
            { title: "UX Blueprint", text: "Every page has a role in your sales funnel with clear visual hierarchy and conversion intent.", Icon: WireframeIcon },
            { title: "Performance Build", text: "Lean code, image strategy, and Core Web Vitals tuning for speed on real devices.", Icon: LightningIcon },
            { title: "Conversion Layer", text: "Offer framing, CTA systems, and lead capture UX that pushes visitors to act.", Icon: TargetIcon },
          ].map(({ title, text, Icon }) => (
            <article key={title} className="bg-[#031827] border border-white/10 p-7">
              <Icon />
              <h2 className="mt-5 text-xl uppercase" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{title}</h2>
              <p className="mt-3 text-white/70 text-sm leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {content.includes && (
        <section className="py-20 bg-[#031827] relative overflow-hidden">
          <div className="absolute -left-20 top-10 w-56 h-56 rounded-full border border-[#b32025]/25" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.3em] font-bold mb-3">{content.includes.sectionLabel ?? "What We Build"}</p>
              <h3 className="uppercase text-3xl" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{content.includes.heading}</h3>
              <p className="mt-5 text-white/80 leading-relaxed">
                {content.hero.description} {content.infoBox?.text ?? "Each page is crafted for intent, speed, and measurable lead behavior so your site works as a sales engine."}
              </p>
            </div>
            <div className="lg:col-span-4 space-y-3">
              {content.includes.items.map((item, idx) => (
                <div key={item} className="border border-white/10 bg-[#092f4d]/45 p-4">
                  <p className="text-[#ff6f73] text-xs">0{idx + 1}</p>
                  <p className="mt-1 text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-[#031827]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 relative min-h-[380px] border border-white/10">
            <Image src="/services/web/detail.jpg" alt="Website project preview" fill className="object-cover" />
          </div>
          <div className="lg:col-span-4 grid gap-5">
            <div className="relative min-h-[180px] border border-white/10">
              <Image src="/portfolio/1Iuks3iUQRBzhIQWclmDb1aT5VGzw4Veg.jpg" alt="Responsive website interface" fill className="object-cover" />
            </div>
            <div className="relative min-h-[180px] border border-white/10">
              <Image src="/portfolio/1xEsh2EfTcZnDNofX9yh7eGBZPn7uq6a0.jpg" alt="SEO and analytics setup" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#092f4d]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-6">
          <div className="border border-white/15 p-6 bg-[#061e31]/70">
            <p className="text-[#ff6f73] text-xs uppercase tracking-[0.2em]">Build Stack</p>
            <p className="mt-3 text-white/85">Custom page architecture, mobile-first sections, clear offer framing, and integrated lead forms.</p>
          </div>
          <div className="border border-white/15 p-6 bg-[#061e31]/70">
            <p className="text-[#ff6f73] text-xs uppercase tracking-[0.2em]">Growth Ready</p>
            <p className="mt-3 text-white/85">Technical SEO foundation, scalable CMS-ready blocks, and campaign landing pages on demand.</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-12 mt-10">
          <Link href="/contact" className="inline-flex items-center gap-3 bg-[#b32025] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] hover:bg-[#8f1a1e] transition-colors">
            {content.cta?.ctaText ?? "Get Your Website Built"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
