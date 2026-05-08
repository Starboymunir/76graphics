"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * KineticMarquee — scroll-driven kinetic typography with multi-row infinite marquees,
 * skewed counter-rotating tracks, and a giant outline-stroke headline that reacts to scroll.
 * Inspired by redtag.digital's "LEAVE ORDINARY BEHIND" treatment.
 */
const ROW_WORDS = [
  "Bold Wraps",
  "Loud Brands",
  "Built In-House",
  "Born In Texas",
  "Ready To Roll",
];

const ROW_WORDS_2 = [
  "Vehicle Wraps",
  "Brand Identity",
  "Web Design",
  "Signage",
  "Environmental Graphics",
  "Promotional Products",
];

export default function KineticMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // big headline rotates and shifts based on scroll progress
  const headlineX = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const headlineSkew = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  const stripeWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#031827] py-32"
      aria-label="Brand kinetic statement"
    >
      {/* Ambient gradients */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(179,32,37,0.18),transparent_30%),radial-gradient(circle_at_82%_70%,rgba(86,127,167,0.18),transparent_30%)]"
      />

      {/* TOP MARQUEE — left → right */}
      <Marquee items={ROW_WORDS} direction="left" speed={45} skew={-2} />

      {/* CENTRAL HEADLINE */}
      <motion.div
        style={{ x: headlineX, skewY: headlineSkew }}
        className="relative my-12 will-change-transform"
      >
        <h2
          className="uppercase whitespace-nowrap text-center"
          style={{
            fontFamily: "'Apotek Extended', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3.5rem, 14vw, 13rem)",
            lineHeight: 0.82,
            letterSpacing: "-0.015em",
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.85)",
          }}
        >
          Leave Ordinary Behind
        </h2>
        {/* Filled overlay clipped by progress */}
        <motion.h2
          aria-hidden
          className="uppercase whitespace-nowrap text-center absolute inset-0"
          style={{
            fontFamily: "'Apotek Extended', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3.5rem, 14vw, 13rem)",
            lineHeight: 0.82,
            letterSpacing: "-0.015em",
            color: "#ff6f73",
            clipPath: "inset(0 var(--clip,100%) 0 0)",
            // @ts-expect-error - css variable
            ["--clip" as string]: useTransform(scrollYProgress, [0, 1], ["100%", "0%"]),
          }}
        >
          Leave Ordinary Behind
        </motion.h2>
      </motion.div>

      {/* BOTTOM MARQUEE — right → left, counter-rotates */}
      <Marquee items={ROW_WORDS_2} direction="right" speed={55} skew={2} variant="outline" />

      {/* Patriotic stripe driven by scroll */}
      <motion.div
        aria-hidden
        className="mt-20 h-[3px] origin-left"
        style={{
          width: stripeWidth,
          background: "linear-gradient(90deg,#b32025 0%,#ffffff 50%,#285493 100%)",
        }}
      />
    </section>
  );
}

function Marquee({
  items,
  direction = "left",
  speed = 50,
  skew = 0,
  variant = "solid",
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  skew?: number;
  variant?: "solid" | "outline";
}) {
  // Duplicate so the loop seamlessly wraps
  const loop = [...items, ...items, ...items];
  const distance = "33.3333%";

  return (
    <div
      className="overflow-hidden"
      style={{ transform: `skewY(${skew}deg)` }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: direction === "left" ? [`0%`, `-${distance}`] : [`-${distance}`, `0%`],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {loop.map((word, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span
              className="px-8 sm:px-14 inline-block"
              style={{
                fontFamily: "'Apotek Extended', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 8vw, 7rem)",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                color: variant === "outline" ? "transparent" : "#ffffff",
                WebkitTextStroke: variant === "outline" ? "1.5px rgba(255,255,255,0.5)" : undefined,
              }}
            >
              {word}
            </span>
            <span aria-hidden className="inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#b32025] shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
