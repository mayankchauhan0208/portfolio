"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { damping: 30, stiffness: 450 });
  const smoothY = useSpring(y, { damping: 30, stiffness: 450 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX - 18);
      y.set(event.clientY - 18);
    };
    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      setActive(Boolean(target.closest("a, button, [data-cursor='magnetic']")));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full border border-white/35 mix-blend-screen md:block"
      style={{ x: smoothX, y: smoothY }}
      animate={{ scale: active ? 1.9 : 0.85, opacity: active ? 0.32 : 0 }}
      transition={{ duration: 0.18 }}
    />
  );
}
