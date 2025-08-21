"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const DEFAULT_LINES = [
  "No dashboards. Just revenue.",
  "Your AI, on-brand, 24/7.",
  "Micro-wins every second.",
  "Shopify, finally compounding."
];

export function HypeTypewriter({ lines = DEFAULT_LINES, intervalMs = 2200 }: { lines?: string[]; intervalMs?: number }) {
  const prefersReduced = useReducedMotion();
  const items = useMemo(() => lines.filter(Boolean), [lines]);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(() => setI((p) => (p + 1) % items.length), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, items.length, prefersReduced]);

  const current = items[i % items.length];

  return (
    <div className="px-4 sm:px-6 py-4 select-none" aria-hidden>
      <div className="text-center text-mint1/80 text-sm">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: prefersReduced ? 0 : 0.35 }}
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default HypeTypewriter;
