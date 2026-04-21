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

const SIGNAGE_IMAGES = [
  { src: "/services/signage/hero.jpg", alt: "Signage hero" },
  { src: "/services/signage/detail.jpg", alt: "Storefront signage detail" },
  { src: "/services/signage/scene-1.jpg", alt: "Illuminated sign scene" },
  { src: "/services/signage/scene-2.jpg", alt: "Urban signage scene" },
];

export default function SignageLanding({ content }: { content: PageContent }) {
  return (
    <div className="min-h-screen bg-[#071b2a] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden bg-[#071b2a]">
        <GiantWord>Wayfinding</GiantWord>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_14%,rgba(179,32,37,0.26),transparent_24%),linear-gradient(180deg,#071b2a_0%,#092f4d_48%,#071b2a_100%)]" />
        <div className="absolute left-[8%] top-16 h-24 w-24 rounded-full border border-white/18" />
        <div className="absolute right-[10%] top-20 h-56 w-56 [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)] border border-[#ff6f73]/20" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6">
            <SectionEyebrow>{content.hero.tag}</SectionEyebrow>
            <h1 className="uppercase leading-[0.84]" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(2.6rem, 7vw, 6.1rem)" }}>
              {content.hero.headline1}
              <span className="block text-transparent" style={{ WebkitTextStroke: "2px #ffffff" }}>{content.hero.headline2}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Strong signage does two jobs at once: it attracts attention from a distance and creates confidence up close. We design sign systems that feel branded, readable, and physically rooted in the architecture instead of looking pasted on as an afterthought.
            </p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-3 bg-[#b32025] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] hover:bg-[#8f1a1e] transition-colors">
              {content.cta?.ctaText ?? content.hero.ctaText}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:col-span-6 relative min-h-[500px]">
            <div className="absolute left-[4%] top-0 w-[64%] h-[58%] overflow-hidden border border-white/12 [clip-path:polygon(0_0,100%_0,90%_100%,0_100%)] shadow-2xl shadow-black/30">
              <Image src="/services/signage/hero.jpg" alt="Signage hero" fill className="object-cover" priority />
            </div>
            <div className="absolute right-0 top-[12%] w-[40%] h-[30%] overflow-hidden border border-white/12 rotate-[7deg] [clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)]">
              <Image src="/services/signage/scene-1.jpg" alt="Neon sign" fill className="object-cover" />
            </div>
            <div className="absolute left-[14%] bottom-0 w-[74%] h-[36%] overflow-hidden border border-white/12 rotate-[-5deg] [clip-path:polygon(0_0,100%_0,92%_100%,4%_100%)]">
              <Image src="/services/signage/scene-2.jpg" alt="Street signage" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <MarqueeGallery images={SIGNAGE_IMAGES} />

      <section className="relative py-20 bg-[#061e31] overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-[28%] bg-[#092f4d] [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <SectionEyebrow>{content.includes?.sectionLabel ?? "Sign System Scope"}</SectionEyebrow>
            <h2 className="uppercase text-3xl leading-tight" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{content.includes?.heading}</h2>
            <p className="mt-5 text-white/80 leading-relaxed">
              A complete signage program has hierarchy. Some pieces need to pull traffic from the street. Some need to orient people once they are inside. Some need to quietly reinforce the brand without fighting the architecture. We plan the full visual rhythm, not isolated signs.
            </p>
            {content.quote && <div className="mt-8 max-w-xl"><QuoteShard quote={content.quote.text} author={content.quote.author} /></div>}
          </div>
          <div className="lg:col-span-5">
            <NumberedList items={content.includes?.items ?? []} />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#071b2a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SplitCollage
            large="/services/signage/detail.jpg"
            top="/services/signage/scene-1.jpg"
            bottom="/services/signage/scene-2.jpg"
            largeAlt="Storefront sign"
            topAlt="Illuminated sign"
            bottomAlt="Street sign perspective"
          />
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            <CutPanel className="p-6 rounded-[18px]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Attention</p>
              <p className="mt-3 text-white/75 text-sm">Big-picture visibility decisions that help the location get seen in real traffic conditions.</p>
            </CutPanel>
            <CutPanel className="p-6 rounded-[18px]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Legibility</p>
              <p className="mt-3 text-white/75 text-sm">Contrast, scale, and message hierarchy shaped so the information reads quickly.</p>
            </CutPanel>
            <CutPanel className="p-6 rounded-[18px]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Consistency</p>
              <p className="mt-3 text-white/75 text-sm">Exterior, window, interior, and directional pieces all feeling part of the same identity.</p>
            </CutPanel>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#092f4d]">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <ImpactBar items={["Stronger curb appeal at first glance", "Cleaner customer navigation through the space", "A location that looks more established and premium"]} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
