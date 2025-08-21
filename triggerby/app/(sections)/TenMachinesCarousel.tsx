"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import manifest from "@/assets.manifest.json";

type Machine = (typeof manifest)["machines"][number];

const AUTO_MS = 4800;

export default function TenMachinesCarousel() {
  const prefersReduced = useReducedMotion() ?? false;
  const machines: Machine[] = manifest.machines;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReduced) return;
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % machines.length), AUTO_MS);
    return () => clearInterval(id);
  }, [machines.length, paused, prefersReduced]);

  const current = machines[index];

  function onTap(zone: "prev" | "next") {
    setIndex((i) => (zone === "next" ? (i + 1) % machines.length : (i - 1 + machines.length) % machines.length));
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const start = touchStartX.current;
    const end = e.changedTouches[0]?.clientX ?? start;
    if (start == null || end == null) return;
    const dx = end - start;
    if (Math.abs(dx) > 40) {
      onTap(dx < 0 ? "next" : "prev");
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Progress bars */}
      {!prefersReduced && (
        <div className="flex gap-1 px-4 sm:px-6 pt-4">
          {machines.map((_, i) => (
            <div key={i} className="h-1 grow rounded bg-mint1/10 overflow-hidden">
              <div
                className="h-full bg-green3"
                style={{
                  width: i < index ? "100%" : i === index ? "100%" : "0%",
                  transition: i === index ? `width ${AUTO_MS}ms linear` : undefined,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Stage */}
      <div
        className="relative mt-3 px-4 sm:px-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative aspect-[10/13] w-full max-w-[680px] mx-auto rounded-2xl overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={current.slug}
              className="absolute inset-0"
              initial={{ opacity: 0.001, scale: prefersReduced ? 1 : 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: prefersReduced ? 1 : 1.02 }}
              transition={{ duration: prefersReduced ? 0 : 0.4 }}
            >
              <img
                src={current.card}
                alt={current.alt}
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              {/* Copy scrim */}
              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                <div className="glass rounded-xl p-3">
                  <div className="text-sm text-green2 mb-1">{current.title}</div>
                  <div className="text-mint1/90 text-[13px] leading-snug">{current.desc}</div>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {/* Tap zones */}
          <button aria-label="Previous" className="absolute inset-y-0 left-0 w-1/3" onClick={() => onTap("prev")} />
          <button aria-label="Next" className="absolute inset-y-0 right-0 w-1/3" onClick={() => onTap("next")} />
        </div>
      </div>

      {/* Filmstrip thumbs */}
      <div className="flex items-center justify-center gap-2 py-3">
        {machines.map((m, i) => (
          <button
            key={m.slug}
            aria-label={`Go to ${m.title}`}
            className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-green3" : "bg-mint1/25"}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
