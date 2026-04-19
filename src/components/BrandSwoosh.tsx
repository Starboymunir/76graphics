"use client";

import React from "react";

/**
 * BrandSwoosh — full-width brand ribbon divider.
 *
 * Five diagonal brand-colour bands (navy · steel blue · red · white · navy)
 * span the entire width of the parent section, touching both left and right edges.
 *
 * position="bottom"  → bands at section bottom (default)
 * position="top"     → bands at section top (mirrored vertically)
 *
 * Parent section must have: position relative, overflow hidden.
 */
export default function BrandSwoosh({
  position = "bottom",
  className = "",
}: {
  position?: "top" | "bottom";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute left-0 right-0 w-full pointer-events-none select-none z-0 ${className}`}
      style={{ [position]: 0 }}
    >
      <svg
        viewBox="0 0 1440 68"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: "block",
          width: "100%",
          height: 68,
          transform: position === "top" ? "scaleY(-1)" : undefined,
        }}
      >
        {/* Five diagonal brand bands — shallow angle (~2°), full width */}
        {/* Base navy fill below all bands */}
        <polygon points="0,54 1440,26 1440,68 0,68" fill="#061e31" opacity="0.55" />
        {/* Band 1 — dark navy */}
        <polygon points="0,46 1440,18 1440,28 0,56" fill="#285493" />
        {/* Band 2 — steel blue */}
        <polygon points="0,34 1440,6 1440,20 0,48" fill="#567fa7" />
        {/* Band 3 — red, the hero accent */}
        <polygon points="0,20 1440,-8 1440,8 0,36" fill="#b32025" />
        {/* Stars along red band */}
        {[180, 420, 660, 900, 1140, 1380].map((cx) => {
          const cy = 14 + ((cx / 1440) * -28); // follow band angle
          return (
            <polygon
              key={cx}
              points={`${cx},${cy - 4} ${cx + 1.2},${cy - 1.2} ${cx + 4},${cy - 1.2} ${cx + 1.8},${cy + 0.8} ${cx + 2.8},${cy + 3.6} ${cx},${cy + 2} ${cx - 2.8},${cy + 3.6} ${cx - 1.8},${cy + 0.8} ${cx - 4},${cy - 1.2} ${cx - 1.2},${cy - 1.2}`}
              fill="#ffffff"
              opacity="0.55"
            />
          );
        })}
        {/* Band 4 — white thin accent */}
        <polygon points="0,17 1440,-11 1440,-7 0,21" fill="#ffffff" opacity="0.72" />
        {/* Band 5 — light navy top cap */}
        <polygon points="0,6 1440,-22 1440,-10 0,18" fill="#285493" opacity="0.48" />
      </svg>
    </div>
  );
}