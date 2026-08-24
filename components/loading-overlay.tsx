"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const heroRoles = ["Senior Visual Designer | Senior Graphic Designer"];

export function LoadingOverlay({ onComplete }: { onComplete?: () => void }) {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((value) => {
        if (value >= 100) {
          window.clearInterval(timer);
          window.setTimeout(() => setDone(true), 420);
          return 100;
        }
        return Math.min(100, value + Math.ceil(Math.random() * 14));
      });
    }, 95);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!done) return;
    const completeTimer = window.setTimeout(() => onComplete?.(), 520);
    return () => window.clearTimeout(completeTimer);
  }, [done, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] grid place-items-center bg-obsidian"
      initial={false}
      animate={done ? { y: "-100%", opacity: 0.96 } : { y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
      aria-hidden={done}
      style={{ pointerEvents: done ? "none" : "auto" }}
    >
      <div className="absolute inset-x-0 top-10 flex overflow-hidden border-y border-white/10 py-3 text-xs uppercase tracking-[0.35em] text-white/45">
        <motion.div
          className="flex min-w-max gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 2 }).map((_, index) => (
            <span key={index}>{heroRoles.join(" / ")}</span>
          ))}
        </motion.div>
      </div>
      <motion.div
        className="relative grid h-48 w-48 place-items-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-2xl"
        animate={{ boxShadow: ["0 0 0 rgba(142,232,255,0)", "0 0 90px rgba(142,232,255,0.22)", "0 0 0 rgba(142,232,255,0)"] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <div className="absolute inset-4 rounded-full border border-dashed border-signal/35" />
        <div className="text-center">
          <div className="font-display text-4xl text-white">{progress}</div>
          <div className="mt-2 text-[0.65rem] uppercase tracking-[0.3em] text-mercury">Loading</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
