"use client";

import { useEffect } from "react";

/**
 * MotionDebug — TEMPORARY diagnostic.
 * Wraps Element.prototype.animate so the next time framer-motion hands WAAPI
 * a non-monotonic offsets array, we log:
 *   - the offending offsets
 *   - the keyframes
 *   - the element (its tagName, className, dataset)
 *   - a rough call stack
 * Then re-throws so behavior is unchanged.
 */
export default function MotionDebug() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as unknown as { __motionDebugInstalled?: boolean }).__motionDebugInstalled) return;
    (window as unknown as { __motionDebugInstalled?: boolean }).__motionDebugInstalled = true;

    const orig = Element.prototype.animate;
    Element.prototype.animate = function patched(
      this: Element,
      keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
      options?: number | KeyframeAnimationOptions,
    ) {
      try {
        return orig.call(this, keyframes, options);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.group("%c[MotionDebug] Element.animate THREW", "color:#b32025;font-weight:bold");
        // eslint-disable-next-line no-console
        console.log("element:", this);
        // eslint-disable-next-line no-console
        console.log("tag:", (this as HTMLElement).tagName, "class:", (this as HTMLElement).className);
        // eslint-disable-next-line no-console
        console.log("dataset:", { ...(this as HTMLElement).dataset });
        // eslint-disable-next-line no-console
        console.log("keyframes:", keyframes);
        // eslint-disable-next-line no-console
        console.log("options:", options);
        if (Array.isArray(keyframes)) {
          const offsets = keyframes.map((k) => k.offset);
          // eslint-disable-next-line no-console
          console.log("offsets:", offsets);
        }
        // eslint-disable-next-line no-console
        console.log("error:", err);
        // eslint-disable-next-line no-console
        console.trace();
        // eslint-disable-next-line no-console
        console.groupEnd();
        throw err;
      }
    } as typeof Element.prototype.animate;
  }, []);

  return null;
}
