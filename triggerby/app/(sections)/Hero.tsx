"use client";
import { motion, useReducedMotion } from "framer-motion";
import { hero as heroCopy } from "@/content/copy";
import { useEffect } from "react";

export default function Hero() {
  const prefersReduced = useReducedMotion() ?? false;

  useEffect(() => {
    const handler = (e: Event) => {
      // no-op placeholder for future parallax hooks
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section className="vignette relative min-h-[100svh] overflow-hidden">
      {/* Aurora background */}
      <Aurora reduced={prefersReduced} />

      {/* Glass scrim + copy */}
      <div className="absolute inset-0 flex items-end pb-16 px-4 sm:px-6">
        <div className="glass max-w-[680px] w-full rounded-2xl p-4 sm:p-6 shadow-emerald">
          <div className="text-green3 text-xs tracking-wide uppercase mb-2">{heroCopy.badge}</div>
          <h1 className="display-xl font-semibold text-mint1 mb-3">{heroCopy.headline}</h1>
          <p className="body text-mint1/85 mb-6">{heroCopy.sub}</p>
          <div className="flex">
            <button
              className="inline-flex h-12 px-5 items-center justify-center rounded-xl bg-green3 text-bg font-medium shadow-[0_0_0_1px_rgba(236,253,245,.2)] shadow-emerald active:translate-y-px"
              onClick={() => {
                const evt = new CustomEvent("triggerby:open-audit");
                window.dispatchEvent(evt);
              }}
            >
              Scan my store
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Aurora({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return <div className="absolute inset-0 bg-gradient-to-b from-green5/30 via-bg to-bg" aria-hidden />;
  }
  return (
    <div className="absolute inset-0" aria-hidden>
      <motion.div
        className="absolute -inset-[20%] rounded-[40%]"
        style={{
          background:
            "radial-gradient(40% 60% at 30% 20%, rgba(16,185,129,.35), transparent 60%), radial-gradient(45% 65% at 70% 30%, rgba(34,197,94,.25), transparent 60%), radial-gradient(60% 60% at 50% 80%, rgba(16,185,129,.25), transparent 60%)",
          filter: "blur(40px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/10 via-transparent to-bg" />
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 50% 120%, rgba(0,0,0,.35), transparent 40%)" }} />
    </div>
  );
}
