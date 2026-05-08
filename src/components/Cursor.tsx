"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor — custom desktop cursor with two layered elements:
 *   1. Outer ring  — lerps softly toward the mouse (springy follow)
 *   2. Inner dot   — tracks the mouse 1:1
 *
 * Behaviors:
 *  - Hides on touch devices and when prefers-reduced-motion is set
 *  - Swells + flips colour on interactive elements (a, button, [data-cursor], etc.)
 *  - Reads `data-cursor-label` from the hovered element to surface contextual labels
 *    (e.g. data-cursor-label="VIEW") — tiny chip rendered next to the ring
 *  - Adds the global `.cursor-active` class to <html> so we can hide the OS cursor
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const labelEl = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    if (isCoarse || reduced || !wide) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-active");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      // Lerp ring toward mouse
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(var(--cursor-scale, 1))`;
      }
      if (labelEl.current) {
        labelEl.current.style.transform = `translate3d(${rx + 22}px, ${ry + 22}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Hover detection — interactive selector list
    const interactiveSelector = [
      "a",
      "button",
      "[role='button']",
      "input",
      "textarea",
      "select",
      "label",
      "[data-cursor]",
      "[data-cursor-label]",
      "[data-magnetic]",
    ].join(",");

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(interactiveSelector) as HTMLElement | null;
      if (!target) return;
      const variant = target.getAttribute("data-cursor") ?? "default";
      const label = target.getAttribute("data-cursor-label");
      ring.current?.setAttribute("data-variant", variant);
      ring.current?.classList.add("is-hover");
      dot.current?.classList.add("is-hover");
      if (label && labelEl.current) {
        labelEl.current.textContent = label;
        labelEl.current.classList.add("is-visible");
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(interactiveSelector) as HTMLElement | null;
      if (!target) return;
      ring.current?.removeAttribute("data-variant");
      ring.current?.classList.remove("is-hover");
      dot.current?.classList.remove("is-hover");
      labelEl.current?.classList.remove("is-visible");
    };

    const onLeave = () => {
      ring.current?.classList.add("is-hidden");
      dot.current?.classList.add("is-hidden");
    };
    const onEnter = () => {
      ring.current?.classList.remove("is-hidden");
      dot.current?.classList.remove("is-hidden");
    };

    const onDown = () => {
      ring.current?.classList.add("is-down");
      dot.current?.classList.add("is-down");
    };
    const onUp = () => {
      ring.current?.classList.remove("is-down");
      dot.current?.classList.remove("is-down");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Magnetic hover — translate magnetic elements toward the cursor when within range
    const magnetic = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]"),
    );
    const magnets = magnetic.map((el) => {
      const strength = Number(el.getAttribute("data-magnetic-strength") ?? "0.35");
      const radius = Number(el.getAttribute("data-magnetic-radius") ?? "120");
      return { el, strength, radius };
    });

    const onMagMove = (e: MouseEvent) => {
      for (const m of magnets) {
        const r = m.el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < m.radius) {
          const t = 1 - dist / m.radius;
          m.el.style.transform = `translate(${dx * m.strength * t}px, ${dy * m.strength * t}px)`;
          m.el.style.transition = "transform 0.18s cubic-bezier(0.22,1,0.36,1)";
        } else if (m.el.style.transform) {
          m.el.style.transform = "translate(0,0)";
        }
      }
    };
    window.addEventListener("mousemove", onMagMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mousemove", onMagMove);
      document.documentElement.classList.remove("cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={labelEl} className="cursor-label" aria-hidden="true" />
    </>
  );
}
