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

export default function EnvironmentalGraphicsLanding({ content }: { content: PageContent }) {
  const scene1 = content.gallery?.scene1 ?? "/services/environmental/scene-1.jpg";
  const scene2 = content.gallery?.scene2 ?? "/services/environmental/scene-2.jpg";
  const feature = content.featuredImage ?? "/services/environmental/detail.jpg";
  const envImages = [
    { src: content.hero.image, alt: "Branded interior hero" },
    { src: feature, alt: "Environmental detail" },
    { src: scene1, alt: "Interior branding concept" },
    { src: scene2, alt: "Modern workspace scene" },
  ];
  return (
    <div className="min-h-screen bg-[#041724] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden bg-[#041724]">
        <GiantWord>Spatial Story</GiantWord>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(179,32,37,0.26),transparent_24%),radial-gradient(circle_at_18%_22%,rgba(86,127,167,0.18),transparent_22%),linear-gradient(135deg,#041724_0%,#092f4d_55%,#041724_100%)]" />
        <div className="absolute right-[8%] top-20 h-52 w-52 rounded-[36px] border border-white/16 rotate-12" />
        <div className="absolute left-[-4%] bottom-16 h-40 w-40 rounded-full border border-[#ff6f73]/18" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6">
            <SectionEyebrow>{content.hero.tag}</SectionEyebrow>
            <h1 className="uppercase leading-[0.84]" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(2.6rem, 7vw, 6.1rem)" }}>
              {content.hero.headline1}
              <span className="block text-transparent" style={{ WebkitTextStroke: "2px #ffffff" }}>{content.hero.headline2}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Environmental graphics turn square footage into story. We design spaces that feel branded before anyone reads a sentence, using scale, layering, material contrast, and visual rhythm to make the environment itself carry the message.
            </p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-3 bg-[#b32025] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] hover:bg-[#8f1a1e] transition-colors">
              {content.cta?.ctaText ?? content.hero.ctaText}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:col-span-6 relative min-h-[500px]">
            <div className="absolute left-[6%] top-0 w-[66%] h-[60%] overflow-hidden border border-white/12 [clip-path:polygon(0_0,100%_0,88%_100%,0_100%)] shadow-2xl shadow-black/30">
              <Image src={content.hero.image} alt="Interior branding hero" fill className="object-cover" priority />
            </div>
            <div className="absolute right-0 top-[18%] w-[42%] h-[30%] overflow-hidden border border-white/12 rotate-[6deg] [clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)]">
              <Image src={scene1} alt="Interior scene" fill className="object-cover" />
            </div>
            <div className="absolute left-[18%] bottom-0 w-[68%] h-[34%] overflow-hidden border border-white/12 rotate-[-4deg] [clip-path:polygon(0_0,100%_0,92%_100%,6%_100%)]">
              <Image src={scene2} alt="Workspace experience" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <MarqueeGallery images={envImages} />

      <section className="relative py-20 bg-[#061e31] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-24 bg-[#092f4d] [clip-path:polygon(0_0,100%_0,92%_100%,0_78%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <SectionEyebrow>{content.includes?.sectionLabel ?? "Environmental Scope"}</SectionEyebrow>
            <h2 className="uppercase text-3xl leading-tight" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{content.includes?.heading}</h2>
            <p className="mt-5 text-white/80 leading-relaxed">
              The environment shapes perception before any salesperson does. When walls, glazing, wayfinding, and focal moments are designed as one system, a space feels more premium, more memorable, and more aligned with the brand promise.
            </p>
            {content.quote && <div className="mt-8"><QuoteShard quote={content.quote.text} author={content.quote.author} /></div>}
          </div>
          <div className="lg:col-span-7">
            <NumberedList items={content.includes?.items ?? []} />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#041724]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SplitCollage
            large={feature}
            top={scene1}
            bottom={scene2}
            largeAlt="Branded interior wall"
            topAlt="Space concept"
            bottomAlt="Workspace atmosphere"
          />
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            <CutPanel className="p-6 rounded-[22px]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Mood</p>
              <p className="mt-3 text-white/75 text-sm">Create a feeling the second someone enters, before the sales conversation even starts.</p>
            </CutPanel>
            <CutPanel className="p-6 rounded-[22px]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Memory</p>
              <p className="mt-3 text-white/75 text-sm">Use focal walls and repeated visual cues so the space becomes instantly recognizable.</p>
            </CutPanel>
            <CutPanel className="p-6 rounded-[22px]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Flow</p>
              <p className="mt-3 text-white/75 text-sm">Guide attention naturally from entrance to destination with spatial rhythm and graphic placement.</p>
            </CutPanel>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#092f4d]">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <ImpactBar items={["A stronger sense of brand immersion inside the space", "Higher perceived quality for clients, guests, and staff", "A more memorable environment people talk about and photograph"]} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
