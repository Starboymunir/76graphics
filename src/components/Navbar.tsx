"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/our-work" },
  { label: "About Us", href: "/about" },
  { label: "Calculator", href: "/#calculator" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#092f4d] shadow-xl shadow-black/20" : "bg-[#092f4d]/95 backdrop-blur-sm"
        }`}
      >
        {/* Red-white-blue patriotic accent strip */}
        <div aria-hidden="true" className="w-full">
          <svg viewBox="0 0 1440 3" preserveAspectRatio="none" className="block w-full h-[3px]">
            <rect x="0" y="0" width="1440" height="1" fill="#b32025" />
            <rect x="0" y="1" width="1440" height="1" fill="#ffffff" opacity="0.85" />
            <rect x="0" y="2" width="1440" height="1" fill="#285493" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logos/76Graphics_Primary-White.svg"
              alt="76 Graphics"
              width={160}
              height={48}
              priority
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href.replace("#", "")));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-200 ${
                    isActive ? "text-white border-b border-[#b32025] pb-0.5" : "text-white/70 hover:text-white"
                  }`}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+18006636007"
              className="hidden md:inline-flex items-center gap-2 text-white/80 hover:text-white text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Phone size={14} className="text-[#b32025]" />
              (800) 663-6007
            </a>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 bg-[#b32025] hover:bg-[#8f181c] text-white text-xs font-bold tracking-[0.2em] uppercase px-6 py-3.5 transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Request a Quote
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-40 bg-[#092f4d] border-b border-white/10 shadow-2xl lg:hidden"
          >
            <nav className="px-6 py-6 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/80 hover:text-white text-left font-medium text-base tracking-[0.15em] uppercase py-3 border-b border-white/10 flex items-center justify-between"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.label}
                  <ChevronRight size={16} className="text-[#b32025]" />
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 bg-[#b32025] hover:bg-[#8f181c] text-white text-xs font-bold tracking-[0.2em] uppercase px-6 py-4 transition-colors duration-200 text-center block"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Request a Quote
              </Link>
              <a
                href="tel:+18006636007"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white text-white text-xs font-semibold tracking-[0.2em] uppercase px-6 py-4 transition-colors duration-200 text-center"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Phone size={14} className="text-[#b32025]" />
                (800) 663-6007
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
