"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SECTIONS: { title: string; body: React.ReactNode }[] = [
  {
    title: "Information We Collect",
    body: (
      <div className="space-y-3">
        <p>We may collect:</p>
        <ul className="list-disc pl-6 space-y-1.5 text-white/70">
          <li>Name</li>
          <li>Phone number</li>
          <li>Email address</li>
          <li>Business information</li>
          <li>Project details</li>
        </ul>
      </div>
    ),
  },
  {
    title: "How We Use Information",
    body: (
      <div className="space-y-3">
        <p>Your information is used to:</p>
        <ul className="list-disc pl-6 space-y-1.5 text-white/70">
          <li>Provide services</li>
          <li>Communicate about orders and projects</li>
          <li>Send updates and support messages</li>
          <li>Improve our services</li>
        </ul>
      </div>
    ),
  },
  {
    title: "SMS Privacy",
    body: (
      <p className="font-semibold text-white">
        No mobile opt-in data will be shared with third parties for marketing or
        promotional purposes.
      </p>
    ),
  },
  {
    title: "Sharing of Information",
    body: (
      <p>
        We do not sell or rent your personal data. We may share information with
        trusted service providers strictly for business operations (e.g.,
        payment processing), not for marketing.
      </p>
    ),
  },
  {
    title: "Data Security",
    body: (
      <p>
        We implement reasonable security measures to protect your information.
      </p>
    ),
  },
  {
    title: "Your Rights",
    body: (
      <p>
        You may request access, correction, or deletion of your personal
        information by contacting us.
      </p>
    ),
  },
  {
    title: "Cookies & Tracking",
    body: (
      <p>
        Our website may use cookies to enhance user experience and analyze
        traffic.
      </p>
    ),
  },
  {
    title: "Changes to This Policy",
    body: (
      <p>
        We may update this Privacy Policy at any time. Updates will be posted on
        this page.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-[#092f4d] text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-[#b32025] text-xs font-semibold tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Legal
            </p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6"
              style={{ fontFamily: "'Apotek', 'Inter', sans-serif" }}
            >
              Privacy Policy
            </h1>
            <p
              className="text-white/60 text-lg max-w-2xl leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              76 Graphics respects your privacy and is committed to protecting
              your personal information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Decorative stripe */}
      <div aria-hidden="true" className="w-full overflow-hidden">
        <svg viewBox="0 0 1440 4" preserveAspectRatio="none" className="block w-full h-1">
          <rect x="0" y="0" width="1440" height="2" fill="#b32025" />
          <rect x="0" y="2" width="1440" height="2" fill="#285493" />
        </svg>
      </div>

      {/* Body */}
      <section className="py-20 bg-[#061e31]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div
            className="bg-white/[0.03] border border-white/10 p-8 md:p-12 mb-10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <p className="text-white/50 text-xs uppercase tracking-[0.25em] mb-2">
              Business Name
            </p>
            <p className="text-2xl font-semibold">76 Graphics</p>
          </div>

          <div className="space-y-12" style={{ fontFamily: "'Inter', sans-serif" }}>
            {SECTIONS.map((section, idx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                <h2
                  className="text-2xl md:text-3xl font-bold mb-4 flex items-baseline gap-3"
                  style={{ fontFamily: "'Apotek', 'Inter', sans-serif" }}
                >
                  <span className="text-[#b32025] text-base font-mono">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                <div className="text-white/70 text-base leading-relaxed pl-0 md:pl-10">
                  {section.body}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 bg-gradient-to-br from-[#b32025]/20 to-[#092f4d] border border-[#b32025]/30 p-8 md:p-12"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <h2
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{ fontFamily: "'Apotek', 'Inter', sans-serif" }}
            >
              Contact Information
            </h2>
            <div className="space-y-2 text-white/80 text-base">
              <p className="font-semibold text-white">76 Graphics</p>
              <p>20220 Hempstead Rd Ste 33, Houston, TX 77065</p>
              <p>
                <a
                  href="mailto:info@76graphics.com"
                  className="text-white hover:text-[#b32025] transition-colors"
                >
                  info@76graphics.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+18006636007"
                  className="text-white hover:text-[#b32025] transition-colors"
                >
                  (800) 663-6007
                </a>
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#b32025] hover:bg-[#8e1a1e] text-white px-6 py-3 text-sm font-semibold tracking-wider uppercase transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/terms"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white px-6 py-3 text-sm font-semibold tracking-wider uppercase transition-colors"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </motion.div>

          <p
            className="text-white/30 text-xs text-center mt-12"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
