import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import type { PageContent } from "@/lib/content";

function WallGridIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="32" height="32" stroke="#ffffff" strokeWidth="2" />
      <path d="M8 18h32M8 28h32M18 8v32M28 8v32" stroke="#567fa7" strokeWidth="2" />
      <circle cx="34" cy="14" r="2" fill="#b32025" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <path d="M24 8 8 17l16 9 16-9-16-9Z" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
      <path d="m8 24 16 9 16-9" stroke="#567fa7" strokeWidth="2" strokeLinejoin="round" />
      <path d="m8 31 16 9 16-9" stroke="#b32025" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <path d="M24 6v10M24 32v10M6 24h10M32 24h10M12 12l7 7M29 29l7 7M12 36l7-7M29 19l7-7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="24" r="4" fill="#b32025" />
    </svg>
  );
}

export default function EnvironmentalGraphicsLanding({ content }: { content: PageContent }) {
  return (
    <div className="min-h-screen bg-[#051827] text-white">
      <Navbar />

      <section className="relative pt-36 pb-16 overflow-hidden">
        <Image src="/services/environmental/hero.jpg" alt="Environmental graphics installation" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(5,24,39,0.95)_12%,rgba(9,47,77,0.78)_52%,rgba(5,24,39,0.95)_100%)]" />
        <div className="absolute right-10 top-20 w-40 h-40 rounded-[32px] border border-white/20 rotate-12" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[#ff6f73] font-bold mb-4">Interior Brand Environments</p>
          <h1 className="max-w-4xl uppercase leading-[0.86]" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(2.3rem, 6vw, 5.6rem)" }}>
            {content.hero.headline1}
            <span className="block text-transparent" style={{ WebkitTextStroke: "2px #ffffff" }}>{content.hero.headline2}</span>
          </h1>
          <p className="max-w-2xl mt-6 text-lg leading-relaxed text-white/80">{content.hero.description}</p>
        </div>
      </section>

      <section className="py-18 bg-[#092f4d]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-3 gap-6">
          {[
            { title: "Wall Narratives", text: "Feature walls and story-driven compositions that communicate your brand values instantly.", Icon: WallGridIcon },
            { title: "Layered Materials", text: "Vinyl, frosting, dimensional pieces, and texture combinations for depth and polish.", Icon: LayersIcon },
            { title: "Atmosphere Design", text: "Turn bland interiors into immersive customer experiences with high-impact visuals.", Icon: SparkIcon },
          ].map(({ title, text, Icon }) => (
            <article key={title} className="bg-[#061e31]/85 border border-white/10 p-7">
              <Icon />
              <h2 className="mt-5 text-xl uppercase" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/75">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {content.includes && (
        <section className="py-20 bg-[#061e31] relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-20 bg-[#092f4d] [clip-path:polygon(0_0,100%_0,94%_100%,0_100%)]" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.3em] font-bold mb-3">{content.includes.sectionLabel ?? "Environment Scope"}</p>
              <h3 className="uppercase text-3xl" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{content.includes.heading}</h3>
              <p className="mt-5 text-white/80 leading-relaxed">
                {content.hero.description} {content.infoBox?.text ?? "We convert plain interiors into branded environments that increase memory, comfort, and confidence."}
              </p>
              {content.quote && (
                <blockquote className="mt-6 border-l-2 border-[#b32025] pl-4 text-white/70 italic">&ldquo;{content.quote.text}&rdquo;</blockquote>
              )}
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

      <section className="py-20 bg-[#051827]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4 relative min-h-[360px] border border-white/10">
            <Image src="/services/environmental/detail.jpg" alt="Wall mural application" fill className="object-cover" />
          </div>
          <div className="lg:col-span-4 relative min-h-[360px] border border-white/10">
            <Image src="/portfolio/1cgRLqh19GkO98P8It8aKdFYde_S5XPY9.jpg" alt="Office branded wall" fill className="object-cover" />
          </div>
          <div className="lg:col-span-4 relative min-h-[360px] border border-white/10">
            <Image src="/portfolio/1nus0QfhQQWxSsZukZDFM80Beyy8rM_J7.jpg" alt="Window graphics installation" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#061e31]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <h3 className="uppercase text-3xl" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>Space Transformation Stack</h3>
          <div className="mt-8 grid md:grid-cols-4 gap-4">
            {[
              "Spatial Audit",
              "Concept Boards",
              "Production",
              "On-Site Install",
            ].map((step, i) => (
              <div key={step} className="bg-[#092f4d]/70 border border-white/10 p-5">
                <p className="text-[#ff6f73] text-xs">0{i + 1}</p>
                <p className="mt-2 text-sm font-semibold">{step}</p>
              </div>
            ))}
          </div>

          <Link href="/contact" className="mt-10 inline-flex items-center gap-3 bg-[#b32025] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] hover:bg-[#8f1a1e] transition-colors">
            {content.cta?.ctaText ?? "Transform Your Space"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
