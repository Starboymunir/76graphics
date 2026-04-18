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
              Premium large format graphics solutions for businesses that demand
              quality — from fleet wraps to full-scale brand activations.
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
                "Vehicle Wraps",
                "Fleet Graphics",
                "Architectural Graphics",
                "Window Films",
                "Trade Show Displays",
                "Brand Activations",
              ].map((s) => (
                <li key={s}>
                  <span
                    className="text-white/60 text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-white/30 text-xs"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          &copy; {new Date().getFullYear()} 76 Graphics. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          {["Privacy Policy", "Terms of Service"].map((item) => (
            <button
              key={item}
              className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200 cursor-pointer"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
