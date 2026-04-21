import Image from "next/image";
import type { ReactNode } from "react";

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[#ff6f73] text-xs uppercase tracking-[0.35em] font-bold mb-4">{children}</p>;
}

export function GiantWord({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-white/[0.04] uppercase pointer-events-none select-none overflow-hidden"
      style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 900, fontSize: "clamp(8rem, 22vw, 22rem)", lineHeight: 0.85 }}
    >
      <div className="whitespace-nowrap text-center">{children}</div>
    </div>
  );
}

export function CutPanel({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`relative overflow-hidden border border-white/10 bg-[#061e31]/70 backdrop-blur-sm ${className}`}>{children}</div>;
}

export function NumberedList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <div key={item} className="flex gap-4 items-start border border-white/10 bg-white/[0.03] px-4 py-4">
          <span className="text-[#ff6f73] text-xs font-bold tracking-[0.24em] pt-1">0{index + 1}</span>
          <p className="text-white/82 text-sm leading-relaxed font-medium">{item}</p>
        </div>
      ))}
    </div>
  );
}

export function SplitCollage({
  large,
  top,
  bottom,
  largeAlt,
  topAlt,
  bottomAlt,
}: {
  large: string;
  top: string;
  bottom: string;
  largeAlt: string;
  topAlt: string;
  bottomAlt: string;
}) {
  return (
    <div className="grid lg:grid-cols-12 gap-5">
      <div className="lg:col-span-7 relative min-h-[420px] [clip-path:polygon(0_0,100%_0,92%_100%,0_100%)] overflow-hidden border border-white/10">
        <Image src={large} alt={largeAlt} fill className="object-cover" />
      </div>
      <div className="lg:col-span-5 grid gap-5">
        <div className="relative min-h-[200px] [clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)] overflow-hidden border border-white/10">
          <Image src={top} alt={topAlt} fill className="object-cover" />
        </div>
        <div className="relative min-h-[200px] [clip-path:polygon(0_0,100%_0,92%_100%,0_100%)] overflow-hidden border border-white/10">
          <Image src={bottom} alt={bottomAlt} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}

export function MarqueeGallery({ images }: { images: Array<{ src: string; alt: string }> }) {
  const loop = [...images, ...images];
  return (
    <div className="overflow-hidden border-y border-white/10 py-5 bg-[#031827]">
      <div className="flex gap-5 w-max animate-[service-marquee_28s_linear_infinite]">
        {loop.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="relative w-[280px] h-[190px] md:w-[340px] md:h-[220px] shrink-0 overflow-hidden border border-white/10 [clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]"
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function QuoteShard({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="relative overflow-hidden border border-[#b32025]/30 bg-[#b32025]/10 p-7 [clip-path:polygon(0_0,100%_0,94%_100%,0_100%)]">
      <p className="text-white/82 italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <p className="mt-4 text-[#ff6f73] text-xs uppercase tracking-[0.24em] font-bold">{author}</p>
    </div>
  );
}

export function ImpactBar({ items }: { items: string[] }) {
  return (
    <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
      {items.map((item) => (
        <div key={item} className="bg-[#061e31] px-5 py-6 text-white/82 text-sm font-medium">
          {item}
        </div>
      ))}
    </div>
  );
}
