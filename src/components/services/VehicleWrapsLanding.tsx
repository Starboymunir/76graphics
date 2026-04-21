import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import type { PageContent } from "@/lib/content";

function WrapRollIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <circle cx="16" cy="24" r="8" stroke="#ffffff" strokeWidth="2" />
      <path d="M24 24h16M24 20h11M24 28h13" stroke="#b32025" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function VanIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <rect x="8" y="15" width="24" height="15" stroke="#ffffff" strokeWidth="2" />
      <path d="M32 19h7l3 4v7h-3" stroke="#567fa7" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="16" cy="33" r="3" fill="#b32025" />
      <circle cx="33" cy="33" r="3" fill="#b32025" />
    </svg>
  );
}

function Shield3mIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <path d="M24 5l14 5v11c0 9-5 14-14 21C15 35 10 30 10 21V10l14-5Z" stroke="#b32025" strokeWidth="2" />
      <path d="m17 24 5 5 9-10" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function VehicleWrapsLanding({ content }: { content: PageContent }) {
  return (
    <div className="min-h-screen bg-[#041a2b] text-white">
      <Navbar />

      <section className="relative pt-36 pb-16 overflow-hidden">
        <Image src="/services/wraps/hero.jpg" alt="Vehicle wrap installation" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(4,26,43,0.97)_20%,rgba(9,47,77,0.76)_57%,rgba(4,26,43,0.92)_100%)]" />
        <div className="absolute -left-20 top-24 w-64 h-64 rounded-full border-2 border-[#b32025]/40" />
        <div className="absolute right-0 top-10 w-[38vw] max-w-[460px] h-[6px] bg-[#b32025] rotate-[-9deg] origin-right" />
        <div className="absolute right-0 top-28 w-[38vw] max-w-[460px] h-[6px] bg-[#ffffff] rotate-[-9deg] origin-right opacity-70" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <p className="text-[#ff6f73] text-xs font-bold uppercase tracking-[0.35em] mb-4">Fleet + Custom Wraps</p>
          <h1 className="max-w-4xl uppercase leading-[0.85]" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(2.3rem, 6vw, 5.7rem)" }}>
            {content.hero.headline1}
            <span className="block text-transparent" style={{ WebkitTextStroke: "2px #ffffff" }}>{content.hero.headline2}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/80 text-lg leading-relaxed">{content.hero.description}</p>
        </div>
      </section>

      <section className="py-16 bg-[#092f4d] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-6">
          {[
            { title: "Design That Reads Fast", text: "Bold layouts tuned for road-speed readability and instant brand recall.", Icon: WrapRollIcon },
            { title: "Fleet Consistency", text: "Multi-vehicle rollout kits that keep every unit on-brand and installation-ready.", Icon: VanIcon },
            { title: "3M-Certified Install", text: "Production-grade materials and trained application for long-term finish quality.", Icon: Shield3mIcon },
          ].map(({ title, text, Icon }) => (
            <article key={title} className="bg-[#061e31]/80 border border-white/10 p-7">
              <Icon />
              <h2 className="mt-5 text-xl uppercase" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{title}</h2>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {content.includes && (
        <section className="py-20 bg-[#061e31] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-full h-20 bg-[#092f4d] [clip-path:polygon(0_0,100%_0,100%_100%,8%_100%)]" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.3em] font-bold mb-3">{content.includes.sectionLabel ?? "What We Handle"}</p>
              <h3 className="uppercase text-3xl" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{content.includes.heading}</h3>
              <p className="mt-5 text-white/80 leading-relaxed">
                {content.hero.description} {content.infoBox?.text ?? "From concept to install, each wrap is engineered for durability and immediate road-level visibility."}
              </p>
              {content.infoBox2 && <p className="mt-4 text-white/70 leading-relaxed">{content.infoBox2.text}</p>}
            </div>
            <div className="lg:col-span-5 grid gap-3">
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

      <section className="py-20 bg-[#041a2b]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-6 relative min-h-[260px] border border-white/10">
            <Image src="/services/wraps/detail.jpg" alt="Commercial van wrap" fill className="object-cover" />
          </div>
          <div className="lg:col-span-3 relative min-h-[260px] border border-white/10">
            <Image src="/portfolio/1rm3tXwgq4UXDLR8T-d_iCF64Z42UjyfL.jpg" alt="Car wrap detail" fill className="object-cover" />
          </div>
          <div className="lg:col-span-3 relative min-h-[260px] border border-white/10">
            <Image src="/portfolio/1IW2u4MDufaJ6uvm_Nl79Dei1hWYTTmAV.jpg" alt="Night wrapped vehicle shot" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#061e31]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <h3 className="uppercase text-3xl" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>Wrap Execution Flow</h3>
          <div className="mt-8 grid md:grid-cols-4 gap-4">
            {[
              "Vehicle Audit",
              "Design Mockup",
              "Print + Prep",
              "Install + QA",
            ].map((step, i) => (
              <div key={step} className="bg-[#092f4d] border border-white/10 p-5">
                <p className="text-[#ff6f73] text-xs">0{i + 1}</p>
                <p className="mt-2 font-semibold text-sm">{step}</p>
              </div>
            ))}
          </div>

          <Link href="/contact" className="mt-10 inline-flex items-center gap-3 bg-[#b32025] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] hover:bg-[#8f1a1e] transition-colors">
            {content.cta?.ctaText ?? "Get a Wrap Quote"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
