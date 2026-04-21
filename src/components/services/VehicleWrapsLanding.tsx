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

export default function VehicleWrapsLanding({ content }: { content: PageContent }) {
  const scene1 = content.gallery?.scene1 ?? "/services/wraps/scene-1.jpg";
  const scene2 = content.gallery?.scene2 ?? "/services/wraps/scene-2.jpg";
  const feature = content.featuredImage ?? "/services/wraps/detail.jpg";
  const wrapImages = [
    { src: content.hero.image, alt: "Wrapped vehicle hero" },
    { src: feature, alt: "Fleet wrap detail" },
    { src: scene1, alt: "Performance car wrap" },
    { src: scene2, alt: "Commercial vehicle on road" },
  ];
  return (
    <div className="min-h-screen bg-[#041a2b] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden bg-[#041a2b]">
        <GiantWord>Street Impact</GiantWord>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_18%,rgba(179,32,37,0.32),transparent_26%),linear-gradient(120deg,#041a2b_0%,#092f4d_54%,#041a2b_100%)]" />
        <div className="absolute right-[-4%] top-12 w-[48vw] max-w-[540px] h-[8px] bg-[#b32025] rotate-[-8deg]" />
        <div className="absolute right-[-6%] top-28 w-[52vw] max-w-[580px] h-[8px] bg-white/75 rotate-[-8deg]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6">
            <SectionEyebrow>{content.hero.tag}</SectionEyebrow>
            <h1 className="uppercase leading-[0.84]" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(2.7rem, 7vw, 6.3rem)" }}>
              {content.hero.headline1}
              <span className="block text-transparent" style={{ WebkitTextStroke: "2px #ffffff" }}>{content.hero.headline2}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Great wraps don’t just look aggressive in a mockup. They stay legible at speed, hold up in weather, photograph well for marketing, and give every mile a job. We treat the vehicle like moving architecture and design around motion, distance, and durability.
            </p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-3 bg-[#b32025] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] hover:bg-[#8f1a1e] transition-colors">
              {content.cta?.ctaText ?? content.hero.ctaText}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:col-span-6 relative min-h-[500px]">
            <div className="absolute left-0 top-8 w-[72%] h-[56%] overflow-hidden border border-white/12 [clip-path:polygon(0_0,100%_0,86%_100%,0_100%)] shadow-2xl shadow-black/30">
              <Image src={content.hero.image} alt="Vehicle wrap hero" fill className="object-cover" priority />
            </div>
            <div className="absolute right-0 top-0 w-[42%] h-[34%] overflow-hidden border border-white/12 rotate-[6deg] [clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)]">
              <Image src={scene1} alt="Wrap detail scene" fill className="object-cover" />
            </div>
            <div className="absolute right-[6%] bottom-0 w-[70%] h-[38%] overflow-hidden border border-white/12 rotate-[-4deg] [clip-path:polygon(0_0,100%_0,92%_100%,8%_100%)]">
              <Image src={scene2} alt="Commercial fleet scene" fill className="object-cover" />
            </div>
            <div className="absolute left-[8%] bottom-[12%] border border-[#ff6f73]/30 bg-[#061e31]/92 px-5 py-4 max-w-[220px] backdrop-blur-sm">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.22em] font-bold">Road-Level Readability</p>
              <p className="mt-2 text-sm text-white/75">Fast comprehension matters more than visual noise when the vehicle is in motion.</p>
            </div>
          </div>
        </div>
      </section>

      <MarqueeGallery images={wrapImages} />

      <section className="relative py-20 bg-[#061e31] overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-[34%] bg-[#092f4d] [clip-path:polygon(0_0,100%_0,82%_100%,0_100%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <SectionEyebrow>{content.includes?.sectionLabel ?? "What The Wrap Program Covers"}</SectionEyebrow>
            <h2 className="uppercase text-3xl leading-tight" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{content.includes?.heading}</h2>
            <p className="mt-5 text-white/80 leading-relaxed">
              A wrap project only works when design, production, and installation all agree. We build the concept around the exact body panels, the print constraints, and the visibility goals so the finished piece feels intentional instead of improvised.
            </p>
            {content.infoBox2 && <p className="mt-4 text-white/68 leading-relaxed">{content.infoBox2.text}</p>}
            {content.quote && <div className="mt-8"><QuoteShard quote={content.quote.text} author={content.quote.author} /></div>}
          </div>
          <div className="lg:col-span-7">
            <NumberedList items={content.includes?.items ?? []} />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#041a2b]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SplitCollage
            large={feature}
            top={scene1}
            bottom={scene2}
            largeAlt="Fleet wrap project"
            topAlt="Sport wrap angle"
            bottomAlt="Commercial wrap in motion"
          />
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            <CutPanel className="p-6 [clip-path:polygon(0_0,100%_0,94%_100%,0_100%)]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Design Fit</p>
              <p className="mt-3 text-white/75 text-sm">Composition planned around panel breaks, handles, windows, and body movement.</p>
            </CutPanel>
            <CutPanel className="p-6 [clip-path:polygon(6%_0,100%_0,100%_100%,0_100%)]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Print Discipline</p>
              <p className="mt-3 text-white/75 text-sm">Material selection, color consistency, and production prep aligned before installation day.</p>
            </CutPanel>
            <CutPanel className="p-6 [clip-path:polygon(0_0,94%_0,100%_100%,0_100%)]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Longevity</p>
              <p className="mt-3 text-white/75 text-sm">Premium application practices that keep the wrap clean, tight, and durable over time.</p>
            </CutPanel>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#092f4d]">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <ImpactBar items={["Thousands of daily impressions from one moving asset", "A more professional presence for single vehicles or entire fleets", "A brand statement that works on the street, online, and in photographs"]} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
