"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Camera, Briefcase } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#our-work" },
  { label: "About Us", href: "#about" },
  { label: "Calculator", href: "#calculator" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL = [
  { icon: Globe, label: "Facebook", href: "#" },
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: Briefcase, label: "LinkedIn", href: "#" },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#061e31] text-white relative">
      {/* Stars & stripes decorative strip at very top of footer */}
      <div aria-hidden="true" className="w-full overflow-hidden">
        <svg viewBox="0 0 1440 6" preserveAspectRatio="none" className="block w-full h-[6px]">
          <rect x="0" y="0" width="1440" height="2" fill="#b32025" />
          <rect x="0" y="2" width="1440" height="2" fill="#ffffff" opacity="0.9" />
          <rect x="0" y="4" width="1440" height="2" fill="#285493" />
        </svg>
      </div>

      {/* Top row */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/logos/76Graphics_Primary-White.svg"
              alt="76 Graphics"
              width={180}
              height={56}
              className="mb-6 h-12 w-auto"
            />
            <p
              className="text-white/50 text-sm leading-relaxed max-w-xs"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Your all-in-one branding and marketing partner. We design, build,
              and produce everything your business needs to stand out and grow.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 mt-8">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 border border-white/15 hover:border-[#b32025] hover:bg-[#b32025] flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4
              className="text-white/40 text-xs font-semibold tracking-[0.25em] uppercase mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-white/40 text-xs font-semibold tracking-[0.25em] uppercase mb-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Branding", href: "/branding-services" },
                { label: "Website Design", href: "/website-design" },
                { label: "Vehicle Wraps", href: "/vehicle-wraps" },
                { label: "Signage", href: "/signage" },
                { label: "Environmental Graphics", href: "/environmental-graphics" },
                { label: "Promotional Products", href: "/promotional-products" },
              ].map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider with star decorations */}
      <div className="relative border-t border-white/10">
        <div className="absolute left-1/2 -translate-x-1/2 -top-2.5 flex items-center gap-3" aria-hidden="true">
          {[3, 3.5, 4.5, 3.5, 3].map((size, i) => (
            <svg key={i} viewBox="0 0 20 20" style={{ width: size * 4, height: size * 4 }} className="fill-[#b32025]" opacity={i === 2 ? 0.6 : 0.3}>
              <polygon points="10,1 12.35,7.22 19,7.22 13.82,11.28 15.76,17.5 10,13.78 4.24,17.5 6.18,11.28 1,7.22 7.65,7.22" />
            </svg>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-white/30 text-xs"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          &copy; {new Date().getFullYear()} 76 Graphics. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
      {/* SEO footer text */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5">
          <p
            className="text-white/20 text-xs text-center leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            76 Graphics is a full-service branding and marketing company offering
            branding, websites, vehicle wraps, signage, and promotional products.
          </p>
        </div>
      </div>
    </footer>
  );
}
