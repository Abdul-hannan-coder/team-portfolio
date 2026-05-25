"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import LogoLoop, { type LogoItem } from "../ui/LogoLoop";

const EASE = [0.22, 1, 0.36, 1] as const;

type HeroTechStackStripProps = {
  logos: LogoItem[];
};

export function HeroTechStackStrip({ logos }: HeroTechStackStripProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
      className="relative mx-auto mt-14 max-w-4xl sm:mt-16"
    >
      <div
        className="relative overflow-hidden rounded-2xl border px-4 py-6 sm:px-6 sm:py-7"
        style={{
          borderColor: "var(--accent-copper-border)",
          background:
            "linear-gradient(180deg, rgba(212,165,116,0.06) 0%, rgba(10,10,10,0.85) 40%, rgba(3,3,3,0.95) 100%)",
          boxShadow: "0 0 40px rgba(251,146,60,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
          }}
        />

        <div className="relative z-10 mb-5 text-center sm:mb-6">
          <div
            className="mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em]"
            style={{
              borderColor: "var(--accent-copper-border)",
              background: "var(--accent-copper-bg)",
              color: "var(--accent-copper-light)",
            }}
          >
            <Sparkles className="h-3 w-3" style={{ color: "var(--accent-amber)" }} />
            Stack
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 sm:text-[11px]">
            Powering innovation with{" "}
            <span
              className="bg-clip-text text-transparent [-webkit-background-clip:text]"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--accent-copper-light), var(--accent-amber))",
              }}
            >
              modern tech
            </span>
          </p>
        </div>

        {/* Mid-line */}
        <div className="relative mx-auto mb-5 max-w-md sm:mb-6" aria-hidden>
          <div className="h-px w-full bg-white/[0.06]" />
          <div
            className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
              boxShadow: "0 0 10px var(--accent-amber-glow)",
            }}
          />
        </div>

        <LogoLoop
          logos={logos}
          speed={40}
          direction="left"
          logoHeight={36}
          gap={48}
          scaleOnHover
          pauseOnHover
          fadeOut
          fadeOutColor="#030303"
          ariaLabel="Technologies we use"
          className="text-white/75 [--logoloop-logoHeight:36px]"
          renderItem={(item, key) => {
            if (!("node" in item)) return null;
            const { node, href, title } = item;

            const pill = (
              <span className="group/pill flex flex-col items-center gap-1.5">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 group-hover/pill:border-[var(--accent-amber-border)] group-hover/pill:shadow-[0_0_18px_var(--accent-amber-glow)] sm:h-12 sm:w-12"
                  style={{
                    borderColor: "var(--accent-copper-border)",
                    background: "rgba(0,0,0,0.5)",
                  }}
                >
                  <span className="text-[1.35rem] text-white/70 transition-colors duration-300 group-hover/pill:text-[var(--accent-amber)] sm:text-2xl">
                    {node}
                  </span>
                </span>
                {title && (
                  <span className="max-w-[72px] truncate text-center text-[8px] font-bold uppercase tracking-wider text-white/0 transition-all duration-300 group-hover/pill:text-white/55 sm:text-[9px]">
                    {title}
                  </span>
                )}
              </span>
            );

            if (href) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={title ?? "Technology"}
                  className="inline-flex rounded-xl outline-none transition-transform duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-[var(--accent-amber)]"
                >
                  {pill}
                </a>
              );
            }

            return <span className="inline-flex">{pill}</span>;
          }}
        />
      </div>
    </motion.div>
  );
}
