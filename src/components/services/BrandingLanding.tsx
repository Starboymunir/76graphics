import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandSwoosh from "@/components/BrandSwoosh";
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

export default function BrandingLanding({ content }: { content: PageContent }) {
  const scene1 = content.gallery?.scene1 ?? "/services/branding/scene-1.jpg";
  const scene2 = content.gallery?.scene2 ?? "/services/branding/scene-2.jpg";
  const feature = content.featuredImage ?? "/services/branding/detail.jpg";
  const brandImages = [
    { src: content.hero.image, alt: "Brand identity workshop" },
    { src: feature, alt: "Logo concept detail" },
    { src: scene1, alt: "Creative direction moodboard" },
    { src: scene2, alt: "Brand system presentation" },
  ];
  return (
    <div className="min-h-screen bg-[#051522] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden bg-[#051522]">
        <GiantWord>Identity Engine</GiantWord>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(179,32,37,0.30),transparent_28%),radial-gradient(circle_at_86%_24%,rgba(86,127,167,0.22),transparent_28%),linear-gradient(135deg,#051522_0%,#092f4d_56%,#051522_100%)]" />
        <div className="absolute -left-24 top-24 h-64 w-64 rotate-12 border border-white/12" />
        <div className="absolute right-[-5%] top-16 h-80 w-80 rounded-full border border-[#ff6f73]/20" />
        <BrandSwoosh position="bottom" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <SectionEyebrow>{content.hero.tag}</SectionEyebrow>
            <h1 className="uppercase leading-[0.84]" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(2.7rem, 7vw, 6.4rem)" }}>
              {content.hero.headline1}
              <span className="block text-transparent" style={{ WebkitTextStroke: "2px #ffffff" }}>{content.hero.headline2}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              We build brands that feel intentional from the first glance to the fifth touchpoint. Instead of handing you a one-off logo, we design a visual operating system that gives your sales team, signage, vehicles, social media, and website the same unmistakable point of view.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-3 bg-[#b32025] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] hover:bg-[#8f1a1e] transition-colors">
                {content.cta?.ctaText ?? content.hero.ctaText}
                <ArrowRight size={16} />
              </Link>
              <div className="px-5 py-4 border border-white/12 bg-white/[0.03] text-sm text-white/75 max-w-xs">
                Naming direction, logo system, typography logic, and deployment assets built as one connected brand machine.
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[460px]">
            <div className="absolute left-0 top-0 w-[72%] h-[58%] [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)] overflow-hidden border border-white/12 shadow-2xl shadow-black/30">
              <Image src={content.hero.image} alt="Brand strategy scene" fill className="object-cover" priority />
            </div>
            <div className="absolute right-0 top-[18%] w-[52%] h-[34%] [clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)] overflow-hidden border border-white/12 rotate-[-6deg]">
              <Image src={scene1} alt="Creative sketching" fill className="object-cover" />
            </div>
            <div className="absolute left-[12%] bottom-0 w-[76%] h-[38%] [clip-path:polygon(0_0,100%_0,92%_100%,8%_100%)] overflow-hidden border border-white/12 rotate-[4deg]">
              <Image src={scene2} alt="Identity presentation" fill className="object-cover" />
            </div>
            <div className="absolute right-[8%] bottom-[14%] bg-[#061e31]/90 border border-[#ff6f73]/30 px-5 py-4 max-w-[220px] backdrop-blur-sm">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">System Thinking</p>
              <p className="mt-2 text-sm text-white/75">The goal is not decoration. The goal is recognition, consistency, and authority at scale.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 bg-[#061e31] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-24 bg-[#092f4d] [clip-path:polygon(0_0,100%_24%,100%_100%,0_72%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <SectionEyebrow>{content.includes?.sectionLabel ?? "What We Build"}</SectionEyebrow>
            <h2 className="uppercase text-3xl leading-tight" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{content.includes?.heading}</h2>
            <p className="mt-5 text-white/78 leading-relaxed">
              Your identity needs enough discipline to stay recognizable and enough elasticity to perform across wildly different contexts. We shape the rules, the assets, and the rollout language so your brand stops feeling improvised.
            </p>
            {content.quote && <div className="mt-8"><QuoteShard quote={content.quote.text} author={content.quote.author} /></div>}
          </div>
          <div className="lg:col-span-7">
            <NumberedList items={content.includes?.items ?? []} />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#051522]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SplitCollage
            large={feature}
            top={scene1}
            bottom={scene2}
            largeAlt="Brand identity deck"
            topAlt="Logo concept fragments"
            bottomAlt="Brand system review"
          />
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            <CutPanel className="p-6 [clip-path:polygon(0_0,100%_0,94%_100%,0_100%)]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Positioning Layer</p>
              <p className="mt-3 text-white/75 text-sm">How you sound, what you emphasize, and what visual cues immediately make you look established.</p>
            </CutPanel>
            <CutPanel className="p-6 [clip-path:polygon(6%_0,100%_0,100%_100%,0_100%)]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Asset Layer</p>
              <p className="mt-3 text-white/75 text-sm">Core mark, alternates, spacing, hierarchy, usage guidance, and real deployment-ready files.</p>
            </CutPanel>
            <CutPanel className="p-6 [clip-path:polygon(0_0,94%_0,100%_100%,0_100%)]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Momentum Layer</p>
              <p className="mt-3 text-white/75 text-sm">A brand that translates cleanly into wraps, websites, print kits, uniforms, and future campaigns.</p>
            </CutPanel>
          </div>
        </div>
      </section>

      <MarqueeGallery images={brandImages} />

      <section className="py-20 bg-[#092f4d]">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <ImpactBar items={["Sharper positioning in crowded local markets", "A more premium feel before the first sales call", "Visual consistency across digital and physical channels"]} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
