"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Clock, Users } from "lucide-react";

const ITEMS = [
  { Icon: ShieldCheck, label: "Built for Growing Businesses" },
  { Icon: Zap, label: "Real Production Experience" },
  { Icon: Clock, label: "Fast Turnaround" },
  { Icon: Users, label: "One Team, Everything Handled" },
];

export default function TrustStrip() {
  return (
    <section className="bg-[#092f4d] border-t border-b border-white/8">
      <div className="max-w-7xl mx-auto px-8 lg:px-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
          {ITEMS.map(({ Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-3 py-6 px-5 bg-[#092f4d]"
            >
              <Icon size={18} className="text-[#b32025] shrink-0" />
              <span
                className="text-white/60 text-xs font-semibold tracking-wide uppercase"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
