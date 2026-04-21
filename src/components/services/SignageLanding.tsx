import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import type { PageContent } from "@/lib/content";

function MarqueeIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <rect x="8" y="10" width="32" height="20" rx="2" stroke="#ffffff" strokeWidth="2" />
      <path d="M12 36h24M18 30v6M30 30v6" stroke="#567fa7" strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="20" r="1.2" fill="#b32025" />
      <circle cx="20" cy="20" r="1.2" fill="#b32025" />
      <circle cx="26" cy="20" r="1.2" fill="#b32025" />
      <circle cx="32" cy="20" r="1.2" fill="#b32025" />
    </svg>
  );
}

function WindowIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <rect x="9" y="8" width="30" height="32" stroke="#ffffff" strokeWidth="2" />
      <path d="M24 8v32M9 24h30" stroke="#567fa7" strokeWidth="2" />
      <path d="M12 13h10" stroke="#b32025" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="16" stroke="#ffffff" strokeWidth="2" />
      <path d="m18 30 4-12 12-4-4 12-12 4Z" stroke="#b32025" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="2" fill="#567fa7" />
    </svg>
  );
}

export default function SignageLanding({ content }: { content: PageContent }) {
  return (
    <div className="min-h-screen bg-[#071b2a] text-white">
      <Navbar />

      <section className="relative pt-36 pb-18 overflow-hidden">
        <Image src="/services/signage/hero.jpg" alt="Business signage installation" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,27,42,0.92)_0%,rgba(9,47,77,0.78)_47%,rgba(7,27,42,0.94)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/20" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[#ff6f73] font-bold mb-4">Signage + Visual Direction</p>
          <h1 className="max-w-4xl uppercase leading-[0.86]" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(2.3rem, 6vw, 5.7rem)" }}>
            {content.hero.headline1}
            <span className="block text-transparent" style={{ WebkitTextStroke: "2px #ffffff" }}>{content.hero.headline2}</span>
          </h1>
          <p className="max-w-2xl mt-6 text-white/80 text-lg leading-relaxed">{content.hero.description}</p>
        </div>
      </section>

      <section className="py-18 bg-[#092f4d]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-3 gap-6">
          {[
            { title: "Exterior Impact", text: "Street-facing signs designed to stop attention and build immediate trust.", Icon: MarqueeIcon },
            { title: "Window Systems", text: "Vinyl and frosted applications that work for promotion, privacy, and brand tone.", Icon: WindowIcon },
            { title: "Wayfinding", text: "Directional and informational signage that guides customers through your space.", Icon: CompassIcon },
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
          <div className="absolute left-0 top-0 w-full h-20 bg-[#092f4d] [clip-path:polygon(0_0,92%_0,100%_100%,0_100%)]" />
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.3em] font-bold mb-3">{content.includes.sectionLabel ?? "Sign Scope"}</p>
              <h3 className="uppercase text-3xl" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{content.includes.heading}</h3>
              <p className="mt-5 text-white/80 leading-relaxed">
                {content.hero.description} {content.infoBox?.text ?? "We design signage ecosystems that attract, orient, and reinforce trust at every step of the customer journey."}
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

      <section className="py-20 bg-[#071b2a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 relative min-h-[360px] border border-white/10">
            <Image src="/services/signage/detail.jpg" alt="Storefront signage closeup" fill className="object-cover" />
          </div>
          <div className="lg:col-span-7 grid gap-5">
            <div className="relative min-h-[175px] border border-white/10">
              <Image src="/portfolio/1kf79pi__xLmSnRamX4cLtJY_RVzgQx_I.jpg" alt="Indoor sign wall" fill className="object-cover" />
            </div>
            <div className="relative min-h-[175px] border border-white/10">
              <Image src="/portfolio/1cgRLqh19GkO98P8It8aKdFYde_S5XPY9.jpg" alt="Directional signage system" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#061e31]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <h3 className="uppercase text-3xl" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>Sign Program Breakdown</h3>
          <div className="mt-8 grid md:grid-cols-2 gap-5">
            <div className="border border-white/10 p-6 bg-[#092f4d]/70">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.2em]">Visibility Layer</p>
              <p className="mt-3 text-white/85 text-sm">Facade signs, monument signs, banners, and curbside messaging that pulls traffic in.</p>
            </div>
            <div className="border border-white/10 p-6 bg-[#092f4d]/70">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.2em]">Experience Layer</p>
              <p className="mt-3 text-white/85 text-sm">Lobby graphics, room IDs, directional signs, and brand messaging inside the space.</p>
            </div>
          </div>

          <Link href="/contact" className="mt-10 inline-flex items-center gap-3 bg-[#b32025] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] hover:bg-[#8f1a1e] transition-colors">
            {content.cta?.ctaText ?? "Request Signage Quote"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
