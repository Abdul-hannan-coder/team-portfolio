"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";

/** Arc artwork + glow only — diagonal ribbons live in ServicesPortfolioShell */
export function ServicesArcBackground() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 min-h-full overflow-hidden">
      <div
        className={`absolute inset-y-0 left-0 w-[min(100%,760px)] ${reduced ? "" : "services-bg-kenburns"}`}
        style={{
          maskImage: "linear-gradient(to right, black 50%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, black 50%, transparent 100%)",
        }}
      >
        <Image
          src="/services/services-arc-bg.png"
          alt=""
          fill
          className="object-cover object-left-bottom opacity-65 blur-[1px]"
          sizes="(max-width: 760px) 100vw, 50vw"
          priority
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 6% 95%, rgba(251,146,60,0.12) 0%, transparent 55%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#030303]/70 to-[#030303]/95" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/85 via-transparent to-[#030303]/90" />
    </div>
  );
}
