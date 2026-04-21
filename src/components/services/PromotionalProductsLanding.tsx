import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import type { PageContent } from "@/lib/content";

function BoxIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <path d="M24 6 8 14v20l16 8 16-8V14L24 6Z" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
      <path d="M8 14l16 8 16-8M24 22v20" stroke="#567fa7" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function ShirtIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <path d="M16 10h16l6 6-5 7-4-3v18H19V20l-4 3-5-7 6-6Z" stroke="#ffffff" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 16h8" stroke="#b32025" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <rect x="8" y="18" width="32" height="22" stroke="#ffffff" strokeWidth="2" />
      <path d="M8 26h32M24 18v22" stroke="#567fa7" strokeWidth="2" />
      <path d="M24 18c0-5 8-8 10-3 1 4-3 7-10 7Zm0 0c0-5-8-8-10-3-1 4 3 7 10 7Z" stroke="#b32025" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export default function PromotionalProductsLanding({ content }: { content: PageContent }) {
  return (
    <div className="min-h-screen bg-[#061e31] text-white">
      <Navbar />

      <section className="relative pt-36 pb-16 overflow-hidden">
        <Image src="/services/promo/hero.jpg" alt="Promotional products layout" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(179,32,37,0.3),transparent_38%),linear-gradient(118deg,rgba(6,30,49,0.95)_10%,rgba(9,47,77,0.8)_54%,rgba(6,30,49,0.95)_100%)]" />
        <div className="absolute right-8 bottom-8 w-40 h-40 border border-white/20 rounded-full" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[#ff6f73] font-bold mb-4">Branded Merchandise Systems</p>
          <h1 className="max-w-4xl uppercase leading-[0.86]" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(2.3rem, 6vw, 5.6rem)" }}>
            {content.hero.headline1}
            <span className="block text-transparent" style={{ WebkitTextStroke: "2px #ffffff" }}>{content.hero.headline2}</span>
          </h1>
          <p className="max-w-2xl mt-6 text-white/80 text-lg leading-relaxed">{content.hero.description}</p>
        </div>
      </section>

      <section className="py-18 bg-[#092f4d]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-3 gap-6">
          {[
            { title: "Packaging + Print", text: "Business cards, inserts, labels, and kits built for immediate brand recognition.", Icon: BoxIcon },
            { title: "Wearables", text: "Uniforms and merch lines that look sharp and represent your brand in public.", Icon: ShirtIcon },
            { title: "Giveaway Strategy", text: "Useful promo items that extend your brand life beyond one event or one meeting.", Icon: GiftIcon },
          ].map(({ title, text, Icon }) => (
            <article key={title} className="bg-[#061e31]/85 border border-white/10 p-7">
              <Icon />
              <h2 className="mt-5 text-xl uppercase" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{title}</h2>
              <p className="mt-3 text-sm text-white/75 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {content.includes && (
        <section className="py-20 bg-[#061e31] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-full h-20 bg-[#092f4d] [clip-path:polygon(0_0,100%_0,100%_100%,6%_100%)]" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.3em] font-bold mb-3">{content.includes.sectionLabel ?? "Merch Scope"}</p>
              <h3 className="uppercase text-3xl" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{content.includes.heading}</h3>
              <p className="mt-5 text-white/80 leading-relaxed">
                {content.hero.description} {content.infoBox?.text ?? "We build curated product ecosystems so your logo shows up where daily decisions happen."}
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

      <section className="py-20 bg-[#061e31]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 relative min-h-[360px] border border-white/10">
            <Image src="/services/promo/detail.jpg" alt="Branded product showcase" fill className="object-cover" />
          </div>
          <div className="lg:col-span-5 grid gap-5">
            <div className="relative min-h-[175px] border border-white/10">
              <Image src="/portfolio/1YCPEuFx9FFkt3HnM_vkZMTT19VhMXldz.jpg" alt="Merch line detail" fill className="object-cover" />
            </div>
            <div className="relative min-h-[175px] border border-white/10">
              <Image src="/portfolio/1BFr6Fn-wiiMVAzJnhpMXROma2SyWeSl3.jpg" alt="Printed collateral" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#092f4d]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <h3 className="uppercase text-3xl" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>Merch Program Blueprint</h3>
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            <div className="border border-white/10 p-6 bg-[#061e31]/70">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.2em]">Core Kit</p>
              <p className="mt-3 text-white/85 text-sm">Daily-use items that keep your brand visible in offices, cars, and client desks.</p>
            </div>
            <div className="border border-white/10 p-6 bg-[#061e31]/70">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.2em]">Campaign Kit</p>
              <p className="mt-3 text-white/85 text-sm">Event-ready products and seasonal drops designed around promotions and launches.</p>
            </div>
          </div>

          <Link href="/contact" className="mt-10 inline-flex items-center gap-3 bg-[#b32025] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] hover:bg-[#8f1a1e] transition-colors">
            {content.cta?.ctaText ?? "Get Custom Merch"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
