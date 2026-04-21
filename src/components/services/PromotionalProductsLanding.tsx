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

const PROMO_IMAGES = [
  { src: "/services/promo/hero.jpg", alt: "Promotional product hero" },
  { src: "/services/promo/detail.jpg", alt: "Merchandise detail" },
  { src: "/services/promo/scene-1.jpg", alt: "Product mockup scene" },
  { src: "/services/promo/scene-2.jpg", alt: "Apparel branding scene" },
];

export default function PromotionalProductsLanding({ content }: { content: PageContent }) {
  return (
    <div className="min-h-screen bg-[#061521] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden bg-[#061521]">
        <GiantWord>Brand In Hand</GiantWord>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(179,32,37,0.28),transparent_24%),radial-gradient(circle_at_82%_24%,rgba(86,127,167,0.20),transparent_24%),linear-gradient(135deg,#061521_0%,#092f4d_56%,#061521_100%)]" />
        <div className="absolute left-[6%] top-20 h-48 w-48 rounded-full border border-white/14" />
        <div className="absolute right-[10%] top-24 h-40 w-40 rounded-[28px] border border-[#ff6f73]/22 rotate-12" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6">
            <SectionEyebrow>{content.hero.tag}</SectionEyebrow>
            <h1 className="uppercase leading-[0.84]" style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(2.6rem, 7vw, 6.1rem)" }}>
              {content.hero.headline1}
              <span className="block text-transparent" style={{ WebkitTextStroke: "2px #ffffff" }}>{content.hero.headline2}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
              Promotional products work best when they feel chosen, not generic. We curate merchandise and print pieces that people actually keep, use, wear, and carry forward, so your brand travels with them long after the first interaction.
            </p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-3 bg-[#b32025] px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] hover:bg-[#8f1a1e] transition-colors">
              {content.cta?.ctaText ?? content.hero.ctaText}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:col-span-6 relative min-h-[500px]">
            <div className="absolute left-[6%] top-0 w-[68%] h-[58%] overflow-hidden border border-white/12 [clip-path:polygon(0_0,100%_0,88%_100%,0_100%)] shadow-2xl shadow-black/30">
              <Image src="/services/promo/hero.jpg" alt="Promo product hero" fill className="object-cover" priority />
            </div>
            <div className="absolute right-0 top-[14%] w-[42%] h-[32%] overflow-hidden border border-white/12 rotate-[6deg] [clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)]">
              <Image src="/services/promo/scene-1.jpg" alt="Mockup scene" fill className="object-cover" />
            </div>
            <div className="absolute left-[18%] bottom-0 w-[70%] h-[36%] overflow-hidden border border-white/12 rotate-[-5deg] [clip-path:polygon(0_0,100%_0,92%_100%,6%_100%)]">
              <Image src="/services/promo/scene-2.jpg" alt="Apparel brand scene" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <MarqueeGallery images={PROMO_IMAGES} />

      <section className="relative py-20 bg-[#061e31] overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-[30%] bg-[#092f4d] [clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <SectionEyebrow>{content.includes?.sectionLabel ?? "Merch Program Scope"}</SectionEyebrow>
            <h2 className="uppercase text-3xl leading-tight" style={{ fontFamily: "'Apotek Extended', sans-serif" }}>{content.includes?.heading}</h2>
            <p className="mt-5 text-white/80 leading-relaxed">
              Great branded merchandise creates repeated brand exposure without feeling disposable. The mix matters. The materials matter. The use case matters. We help shape kits and product systems that extend your identity into everyday life.
            </p>
            {content.quote && <div className="mt-8"><QuoteShard quote={content.quote.text} author={content.quote.author} /></div>}
          </div>
          <div className="lg:col-span-7">
            <NumberedList items={content.includes?.items ?? []} />
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#061521]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <SplitCollage
            large="/services/promo/detail.jpg"
            top="/services/promo/scene-1.jpg"
            bottom="/services/promo/scene-2.jpg"
            largeAlt="Branded products showcase"
            topAlt="Promo mockup"
            bottomAlt="Apparel branding"
          />
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            <CutPanel className="p-6 rounded-[22px]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Retention</p>
              <p className="mt-3 text-white/75 text-sm">Choose useful items that keep living with the customer instead of getting tossed away.</p>
            </CutPanel>
            <CutPanel className="p-6 rounded-[22px]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Presentation</p>
              <p className="mt-3 text-white/75 text-sm">Build kits and packaging that make the brand feel elevated before the product is even used.</p>
            </CutPanel>
            <CutPanel className="p-6 rounded-[22px]">
              <p className="text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">Reach</p>
              <p className="mt-3 text-white/75 text-sm">Turn one purchase, one event, or one giveaway into a longer chain of impressions.</p>
            </CutPanel>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#092f4d]">
        <div className="mx-auto max-w-6xl px-6 lg:px-12">
          <ImpactBar items={["Branded products people actually keep and reuse", "A more premium merch mix for events, sales, and onboarding", "Better daily visibility for your brand outside the screen"]} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
