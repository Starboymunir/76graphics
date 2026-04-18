"use client";

import Image from "next/image";

const PHOTOS = [
  {
    src: "/portfolio/1jKD6IVrv5vvQY4U0yCy_CmbJCL9URqT4.jpg",
    label: "Van Full Wrap",
  },
  {
    src: "/portfolio/1kf79pi__xLmSnRamX4cLtJY_RVzgQx_I.jpg",
    label: "Custom Vehicle Wrap",
  },
  {
    src: "/portfolio/1YCPEuFx9FFkt3HnM_vkZMTT19VhMXldz.jpg",
    label: "Luxury Car Wrap",
  },
  {
    src: "/portfolio/1gzQxlUcAk_-Tg_gF7RgD17QtY-N3LySe.jpg",
    label: "Full Color Wrap",
  },
  {
    src: "/portfolio/1IW2u4MDufaJ6uvm_Nl79Dei1hWYTTmAV.jpg",
    label: "Shop Night Shot",
  },
  {
    src: "/portfolio/1nus0QfhQQWxSsZukZDFM80Beyy8rM_J7.jpg",
    label: "Artistic Vehicle Wrap",
  },
  {
    src: "/portfolio/1ad97RBlWjZfO8dtu9vjpOmFjJnYdat4W.jpg",
    label: "Custom Graphics",
  },
  {
    src: "/portfolio/1VU5_JpxoQr6GquBehlidPMtnedQ8TyqY.jpg",
    label: "Fleet Wrap",
  },
  {
    src: "/portfolio/1iOPICYZ38nQcQXetyU8VMYWCt-o-niBK.jpg",
    label: "Premium Wrap",
  },
  {
    src: "/portfolio/1GfEFSzGyfuOnG0k7B3zfNiyQ9ocKGgtm.jpg",
    label: "Full Vehicle Wrap",
  },
  {
    src: "/portfolio/1ajjKrdlIu5XMscvJmFbu28TqzmAUVpdE.jpg",
    label: "Night Wrap Shot",
  },
  {
    src: "/portfolio/1vFBc9fCPAogQ7O2Fnovo8dsdRXsfuOaI.jpg",
    label: "Commercial Wrap",
  },
];

// Duplicate for seamless loop
const TRACK = [...PHOTOS, ...PHOTOS];

export default function WorkStrip() {
  return (
    <section className="bg-[#061e31] py-0 overflow-hidden relative brand-stars-bg">
      {/* Top red line */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-[#b32025]" />
      {/* Bottom red line */}
      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#b32025]" />

      {/* Label */}
      <div className="flex items-center justify-between px-8 lg:px-14 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-0.5 bg-[#b32025]" />
          <span
            className="text-white/50 text-xs tracking-[0.25em] uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Our Work In The Wild
          </span>
        </div>
        <span
          className="text-white/30 text-xs tracking-widest uppercase hidden sm:block"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          500+ Completed Projects
        </span>
      </div>

      {/* Marquee row 1 — scrolls left */}
      <div className="relative overflow-hidden py-3">
        <div
          className="flex gap-3 w-max animate-[marquee_40s_linear_infinite]"
          style={{ willChange: "transform" }}
        >
          {TRACK.map((photo, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-64 h-40 overflow-hidden group"
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="256px"
              />
              <div className="absolute inset-0 bg-[#092f4d]/40 group-hover:bg-[#092f4d]/20 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/70 to-transparent">
                <span
                  className="text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {photo.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee row 2 — scrolls right */}
      <div className="relative overflow-hidden py-3">
        <div
          className="flex gap-3 w-max animate-[marquee-reverse_35s_linear_infinite]"
          style={{ willChange: "transform" }}
        >
          {[...TRACK].reverse().map((photo, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-64 h-40 overflow-hidden group"
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="256px"
              />
              <div className="absolute inset-0 bg-[#b32025]/20 group-hover:bg-[#b32025]/5 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
