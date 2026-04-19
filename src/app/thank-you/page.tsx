import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrandSwoosh from "@/components/BrandSwoosh";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You — We'll Be in Touch | 76 Graphics",
  description:
    "Your quote request has been submitted. Here's what happens next at 76 Graphics.",
};

const NEXT_STEPS = [
  {
    num: "01",
    title: "Quote Delivered Within 24 Hours",
    desc: "Our team reviews your project and sends you a detailed, itemized quote — no fluff.",
  },
  {
    num: "02",
    title: "Discovery Call (Optional)",
    desc: "If you'd like to talk through ideas or ask questions before committing, we're happy to jump on a call.",
  },
  {
    num: "03",
    title: "We Get to Work",
    desc: "Once you're ready, we kick off your project with a clear timeline and regular updates.",
  },
];

export default function ThankYouPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <section className="relative bg-[#061e31] brand-stars-bg pt-36 pb-28 overflow-hidden flex-1">
        <BrandSwoosh position="bottom" />

        <div className="max-w-4xl mx-auto px-8 lg:px-14 relative z-10">
          {/* Icon + heading */}
          <div className="flex flex-col items-center text-center mb-20">
            <div className="w-20 h-20 bg-[#b32025]/15 border border-[#b32025]/30 flex items-center justify-center mb-8">
              <CheckCircle2 size={36} className="text-[#b32025]" />
            </div>
            <p
              className="text-[#b32025] text-xs font-bold tracking-[0.35em] uppercase mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Request Received
            </p>
            <h1
              className="text-white uppercase leading-[0.88] mb-6"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Thank You —
              <span
                className="block"
                style={{ color: "transparent", WebkitTextStroke: "2px #b32025" }}
              >
                We&apos;ll Be in Touch
              </span>
            </h1>
            <p
              className="text-white/50 text-base leading-relaxed max-w-xl"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Your request has been submitted. Here&apos;s exactly what happens next — no
              guessing, no waiting around in the dark.
            </p>
          </div>

          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8 mb-16">
            {NEXT_STEPS.map(({ num, title, desc }) => (
              <div key={num} className="bg-[#092f4d] p-8">
                <span
                  className="text-[#b32025] text-xs font-bold tracking-[0.3em] block mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {num}
                </span>
                <h3
                  className="text-white uppercase mb-3"
                  style={{ fontFamily: "'Apotek Extended', sans-serif", fontWeight: 700, fontSize: "1rem" }}
                >
                  {title}
                </h3>
                <p
                  className="text-white/50 text-sm leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* Back home */}
          <div className="text-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 border border-white/20 text-white/60 hover:text-white hover:border-white/50 px-8 py-3.5 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <ArrowRight size={14} className="rotate-180" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
