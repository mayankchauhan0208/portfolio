"use client";

import { motion } from "framer-motion";

export function Marquee() {
  const items = ["Brand Systems", "UI Concepts", "Campaign Visuals", "Motion Editing", "Premium Presentations"];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.025] py-5">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="font-display text-2xl uppercase tracking-[0.22em] text-white/45 md:text-4xl">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
