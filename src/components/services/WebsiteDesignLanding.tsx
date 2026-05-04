import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import type { PageContent } from "@/lib/content";
import {
  CutPanel,
  GiantWord,
  ImpactBar,
  MarqueeGallery,
  NumberedList,
  QuoteShard,
  SectionEyebrow,
  SplitCollage,
} from "@/components/services/ServiceDesignPrimitives";

export default function WebsiteDesignLanding({ content }: { content: PageContent }) {
  const scene1 = content.gallery?.scene1 ?? "/services/web/scene-1.jpg";
  const scene2 = content.gallery?.scene2 ?? "/services/web/scene-2.jpg";
  const feature = content.featuredImage ?? "/services/web/detail.jpg";
  const webImages = [
    { src: content.hero.image, alt: "Website hero interface" },
    { src: feature, alt: "Web project dashboard" },
    { src: scene1, alt: "Desktop browsing view" },
    { src: scene2, alt: "Code and design workflow" },
  ];
  return (
    <div className="min-h-screen bg-[#031827] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden bg-[#031827]">
        <GiantWord>Lead Machine</GiantWord>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(179,32,37,0.30),transparent_26%),linear-gradient(135deg,#031827_0%,#092f4d_58%,#02101a_100%)]" />
        <div className="absolute left-0 right-0 bottom-0 h-2 bg-[linear-gradient(90deg,#b32025_0%,#ffffff_45%,#285493_100%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 pt-6">
            <SectionEyebrow>{content.hero.tag}</SectionEyebrow>
            <h1 className="uppercase leading-[0.84]" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(2.6rem, 7vw, 6.2rem)" }}>
              {content.hero.headline1}
              <span className="block text-transparent" style={{ WebkitTextStroke: "2px #b32025" }}>{content.hero.headline2}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              We design websites as selling environments, not digital brochures. The layout, motion, copy rhythm, forms, and page hierarchy are all engineered to move a visitor from curiosity into action without adding friction.
            </p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-3 bg-[#b32025] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] hover:bg-[#8f1a1e] transition-colors">
              {content.cta?.ctaText ?? content.hero.ctaText}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/website-design/portfolio"
              className="mt-4 ml-0 sm:ml-3 inline-flex items-center gap-3 border border-white/25 hover:border-white text-white px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] transition-colors"
            >
              View Live Sites
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:col-span-6 relative min-h-[520px]">
            <div className="absolute inset-x-[8%] top-0 h-[70%] rounded-[28px] border border-white/12 bg-[#061e31]/60 p-4 shadow-2xl shadow-black/30">
              <div className="relative h-full w-full overflow-hidden rounded-[22px] border border-white/10">
                <Image src={content.hero.image} alt="Website showcase" fill className="object-cover" priority />
              </div>
            </div>
            <div className="absolute left-0 bottom-[8%] w-[46%] h-[38%] overflow-hidden border border-white/12 rotate-[-7deg] [clip-path:polygon(0_0,100%_0,88%_100%,0_100%)]">
              <Image src={scene1} alt="User browsing" fill className="object-cover" />
            </div>
            <div className="absolute right-0 bottom-0 w-[48%] h-[36%] overflow-hidden border border-white/12 rotate-[5deg] [clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)]">
              <Image src={scene2} alt="Development workflow" fill className="object-cover" />
            </div>
            <div className="absolute right-[10%] top-[8%] border border-[#ff6f73]/30 bg-[#061e31]/92 px-5 py-4 max-w-[220px] backdrop-blur-sm">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.22em] font-bold">Conversion Logic</p>
              <p className="mt-2 text-sm text-white/75">A site should explain, reassure, and close. Every component has a job.</p>
            </div>
          </div>
        </div>
      </section>

      <MarqueeGallery images={webImages} />

      <section className="relative py-20 bg-[#061e31] overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-[32%] bg-[#092f4d] [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <SectionEyebrow>{content.includes?.sectionLabel ?? "What The Build Includes"}</SectionEyebrow>
            <h2 className="uppercase text-3xl leading-tight" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{content.includes?.heading}</h2>
            <p className="mt-5 text-white/80 leading-relaxed">
              The best-performing websites don’t rely on luck. They combine clear offer framing, faster technical performance, structured content, mobile-first interaction, and enough polish to make the business feel premium and trustworthy.
            </p>
            {content.quote && <div className="mt-8 max-w-xl"><QuoteShard quote={content.quote.text} author={content.quote.author} /></div>}
          </div>
          <div className="lg:col-span-5">
            <NumberedList items={content.includes?.items ?? []} />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#031827]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SplitCollage
            large={feature}
            top={scene1}
            bottom={scene2}
            largeAlt="Web experience mockup"
            topAlt="Website browsing scene"
            bottomAlt="Code production scene"
          />
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            <CutPanel className="p-6 rounded-[24px]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Offer Architecture</p>
              <p className="mt-3 text-white/75 text-sm">Structure the message so the visitor understands what you do, why it matters, and what to do next.</p>
            </CutPanel>
            <CutPanel className="p-6 rounded-[24px]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Speed + SEO</p>
              <p className="mt-3 text-white/75 text-sm">Performance tuning, crawlable content structure, and technical setup that supports discoverability.</p>
            </CutPanel>
            <CutPanel className="p-6 rounded-[24px]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Lead Capture</p>
              <p className="mt-3 text-white/75 text-sm">Forms, CTAs, and friction-reduced pathways designed to turn attention into inquiries.</p>
            </CutPanel>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#092f4d]">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <ImpactBar items={["Sharper first impressions on every screen size", "Faster paths from search click to contact form", "A web presence that feels premium, current, and intentional"]} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
