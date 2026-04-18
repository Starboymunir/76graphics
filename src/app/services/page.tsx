"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SERVICES = [
  {
    id: "commercial-vehicle",
    title: "Commercial Vehicle Wraps",
    subtitle: "Fleet & Single Vehicles",
    photo: "/portfolio/1VU5_JpxoQr6GquBehlidPMtnedQ8TyqY.jpg",
    description:
      "Transform your vehicles into moving billboards that work 24/7. From single vans to full fleets, we handle every size job with the same precision and premium materials.",
    features: [
      "Full & partial vehicle wraps",
      "Fleet branding consistency",
      "3M & Avery Dennison vinyl",
      "Interior and exterior graphics",
      "Same-week turnaround available",
    ],
  },
  {
    id: "architectural",
    title: "Architectural Graphics",
    subtitle: "Interior & Exterior",
    photo: "/portfolio/1Iuks3iUQRBzhIQWclmDb1aT5VGzw4Veg.jpg",
    description:
      "Turn walls, floors, windows, and facades into powerful brand experiences. We create immersive environmental graphics that captivate customers and reinforce your identity.",
    features: [
      "Wall murals & wraps",
      "Window films & perforated vinyl",
      "Floor graphics",
      "Storefront branding",
      "Office interior installations",
    ],
  },
  {
    id: "brand-activations",
    title: "Brand & Experiential",
    subtitle: "Events & Activations",
    photo: "/portfolio/1jKD6IVrv5vvQY4U0yCy_CmbJCL9URqT4.jpg",
    description:
      "Make a statement at trade shows, events, and brand activations with eye-catching displays designed to stop foot traffic and convert attention into opportunity.",
    features: [
      "Trade show displays",
      "Pop-up event branding",
      "Custom backdrops & banners",
      "Temporary & permanent installs",
      "Rush turnaround available",
    ],
  },
  {
    id: "retail",
    title: "Retail Graphics",
    subtitle: "POS & In-Store",
    photo: "/portfolio/1kf79pi__xLmSnRamX4cLtJY_RVzgQx_I.jpg",
    description:
      "Drive sales and elevate the customer journey with precision-printed point-of-sale displays, shelf graphics, and branded retail environments that convert.",
    features: [
      "Point-of-sale displays",
      "Shelf talkers & danglers",
      "Full-store brand rollouts",
      "Seasonal & promotional graphics",
      "Quick-change display systems",
    ],
  },
  {
    id: "paint-protection",
    title: "Paint Protection Film",
    subtitle: "PPF & Clear Bra",
    photo: "/portfolio/1YCPEuFx9FFkt3HnM_vkZMTT19VhMXldz.jpg",
    description:
      "Protect your vehicle's finish from chips, scratches, and road debris with virtually invisible, self-healing paint protection film. Premium defence for your investment.",
    features: [
      "Full-body & partial coverage",
      "Self-healing technology",
      "Gloss, matte & satin finishes",
      "OEM-grade protection",
      "Lifetime warranty options",
    ],
  },
  {
    id: "custom-solutions",
    title: "Custom Solutions",
    subtitle: "One-of-a-Kind Projects",
    photo: "/portfolio/1iOPICYZ38nQcQXetyU8VMYWCt-o-niBK.jpg",
    description:
      "Have something unique in mind? Our team thrives on creative challenges. If you can dream it, we have the expertise and equipment to produce and install it.",
    features: [
      "Concept development",
      "Custom substrate printing",
      "Unusual surfaces & applications",
      "Prototype & production runs",
      "Full design-to-install service",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* ── PAGE HERO ── */}
        <section className="relative bg-[#092f4d] brand-stars-bg overflow-hidden py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-[#b32025]" />
              <span
                className="text-[#b32025] text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                What We Offer
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white uppercase leading-none mb-6"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              }}
            >
              Our Services
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 text-lg max-w-2xl leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              From a single vehicle to a full fleet, a pop-up activation to a permanent
              installation — we deliver world-class large format graphics with precision and speed.
            </motion.p>
          </div>
        </section>

        {/* ── SERVICE SECTIONS ── */}
        {SERVICES.map((service, i) => (
          <section
            key={service.id}
            id={service.id}
            className={`${i % 2 === 0 ? "bg-white" : "bg-[#f7f7f7]"} overflow-hidden`}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[560px] ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>

                {/* Photo side */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`relative min-h-[400px] ${i % 2 !== 0 ? "lg:order-2" : ""}`}
                >
                  <Image
                    src={service.photo}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-[#092f4d]/20" />
                </motion.div>

                {/* Content side */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className={`flex flex-col justify-center px-8 lg:px-14 xl:px-16 py-16 lg:py-20 ${i % 2 !== 0 ? "lg:order-1" : ""}`}
                >
                  <span
                    className="text-[#b32025] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {service.subtitle}
                  </span>

                  <h2
                    className="text-[#092f4d] uppercase mb-5 leading-tight"
                    style={{
                      fontFamily: "'Apotek Extended', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    }}
                  >
                    {service.title}
                  </h2>

                  <p
                    className="text-[#374151] text-base leading-relaxed mb-8"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-10">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-[#b32025] shrink-0 mt-0.5" />
                        <span
                          className="text-[#374151] text-sm"
                          style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 bg-[#b32025] hover:bg-[#8f181c] text-white px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-200 hover:-translate-y-0.5 self-start"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Request a Quote
                    <ArrowRight size={15} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* ── CTA BANNER ── */}
        <section className="bg-[#092f4d] py-20 relative overflow-hidden brand-stars-bg">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-white uppercase mb-6 leading-none"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
              }}
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/60 text-lg mb-10 max-w-2xl mx-auto"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Contact us today for a free consultation and same-day quote on your next project.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-[#b32025] hover:bg-[#8f181c] text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Get a Free Quote
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/our-work"
                className="inline-flex items-center justify-center gap-3 border-2 border-white/30 hover:border-white text-white px-10 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                View Our Work
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
