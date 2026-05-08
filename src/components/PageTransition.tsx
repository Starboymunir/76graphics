"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * PageTransition — clip-path curtain swipe between routes.
 * Top half slides down, bottom half slides up, meet at center,
 * then exit in opposite directions to reveal the new page.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const initial = useRef(true);

  useEffect(() => {
    initial.current = false;
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={initial.current ? false : { opacity: 0.001, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="contents"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Curtain overlay — flashes between routes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`curtain-${pathname}`}
          aria-hidden
          className="fixed inset-0 z-[150] pointer-events-none"
          initial={initial.current ? false : { opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-[#031827]"
            initial={initial.current ? { y: "-100%" } : { y: "0%" }}
            animate={{ y: "-101%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#031827]"
            initial={initial.current ? { y: "100%" } : { y: "0%" }}
            animate={{ y: "101%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] origin-center"
            style={{ background: "linear-gradient(90deg,#b32025,#ffffff,#285493)" }}
            initial={initial.current ? { scaleX: 0 } : { scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
