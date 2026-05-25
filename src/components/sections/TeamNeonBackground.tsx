"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { TeamCubeAccent } from "./TeamCubeAccent";

const EASE_PRO = [0.22, 1, 0.36, 1] as const;

const BARS = [
  { width: "52%", top: "6%", right: "-10%", delay: 0, tier: 1 },
  { width: "46%", top: "16%", right: "2%", delay: 0.35, tier: 2 },
  { width: "56%", top: "26%", right: "-5%", delay: 0.7, tier: 1 },
  { width: "42%", top: "36%", right: "7%", delay: 1.05, tier: 2 },
  { width: "50%", top: "46%", right: "-3%", delay: 0.2, tier: 1 },
  { width: "44%", top: "56%", right: "5%", delay: 1.4, tier: 2 },
  { width: "54%", top: "66%", right: "-7%", delay: 0.55, tier: 1 },
  { width: "40%", top: "76%", right: "3%", delay: 0.9, tier: 2 },
  { width: "48%", top: "86%", right: "-1%", delay: 1.25, tier: 2 },
];

const SLABS = [
  { width: "34%", height: 32, top: "20%", right: "8%", delay: 0 },
  { width: "28%", height: 22, top: "50%", right: "14%", delay: 1.2 },
  { width: "30%", height: 26, top: "74%", right: "4%", delay: 0.6 },
];

function AccentBar({
  width,
  top,
  right,
  delay,
  tier,
  reduced,
}: {
  width: string;
  top: string;
  right: string;
  delay: number;
  tier: number;
  reduced: boolean;
}) {
  const thick = tier === 1;
  return (
    <motion.div
      className={`absolute origin-right ${thick ? "h-2.5 sm:h-3" : "h-1.5 sm:h-2"}`}
      style={{ width, top, right, rotate: "-38deg" }}
      initial={{ opacity: 0, scaleX: 0.3 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 1.4, delay: delay * 0.12, ease: EASE_PRO }}
    >
      <motion.div
        className="h-full w-full"
        animate={
          reduced
            ? undefined
            : {
                x: [0, 6, -4, 0],
                y: [0, -4, 2, 0],
              }
        }
        transition={{
          duration: 10 + delay * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5 + delay,
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden rounded-sm"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(20,18,16,0.95) 20%, rgba(12,11,10,0.98) 80%, transparent)",
            boxShadow: thick
              ? "0 8px 40px rgba(0,0,0,0.75), 0 0 24px var(--accent-amber-glow)"
              : "0 4px 24px rgba(0,0,0,0.6)",
          }}
        >
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--accent-copper-border), var(--accent-amber-border), transparent)",
            }}
          />
          {!reduced && (
            <motion.div
              className="absolute -top-px h-[3px] w-28 rounded-full sm:w-36"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--accent-amber), var(--accent-copper-light), transparent)",
                boxShadow: "0 0 20px var(--accent-amber-glow)",
              }}
              animate={{ left: ["-10%", "110%"] }}
              transition={{
                duration: 5.5 + delay,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
                delay: delay * 0.8,
              }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function AccentSlab({
  width,
  height,
  top,
  right,
  delay,
  reduced,
}: {
  width: string;
  height: number;
  top: string;
  right: string;
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      className="absolute origin-right overflow-hidden rounded-md backdrop-blur-[2px]"
      style={{
        width,
        height,
        top,
        right,
        rotate: "-38deg",
        background: "linear-gradient(145deg, rgba(28,26,24,0.95) 0%, rgba(8,8,8,0.98) 100%)",
        borderTop: "1px solid var(--accent-copper)",
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.8), inset 0 1px 0 rgba(212,165,116,0.4), 0 0 40px var(--accent-amber-glow)",
      }}
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay: delay * 0.15, ease: EASE_PRO }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={reduced ? undefined : { y: [0, -10, 0], x: [0, 6, 0] }}
        transition={{
          y: { duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
          x: { duration: 9 + delay, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
        }}
      >
      <motion.div
        className="absolute left-[18%] top-1/2 h-[42%] w-[32%] -translate-y-1/2 rounded-[2px]"
        style={{
          background: "linear-gradient(180deg, var(--accent-amber) 0%, var(--accent-amber-deep) 100%)",
          boxShadow: "0 0 24px var(--accent-amber-glow)",
        }}
        animate={reduced ? undefined : { opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 3.2, repeat: Infinity, delay, ease: "easeInOut" }}
      />
      {!reduced && (
        <motion.div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, delay: delay + 0.5, ease: "easeInOut" }}
        />
      )}
      </motion.div>
    </motion.div>
  );
}

function AmbientParticles({ count, reduced }: { count: number; reduced: boolean }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${55 + ((i * 41) % 42)}%`,
        top: `${8 + ((i * 29) % 85)}%`,
        size: 1.5 + (i % 3),
        duration: 6 + (i % 5),
        delay: i * 0.55,
      })),
    [count]
  );

  if (reduced) return null;

  return (
    <>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: "var(--accent-copper-light)",
            boxShadow: "0 0 6px var(--accent-amber-glow)",
          }}
          animate={{
            y: [0, -55, -110],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </>
  );
}

export function TeamNeonBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const layerY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const cubeY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.1, 1.04]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden bg-[#030303]">
      {/* Base texture */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute -inset-[12%]">
        <Image
          src="/team/team-neon-bg.png"
          alt=""
          fill
          className="object-cover object-right-top opacity-30 mix-blend-screen"
          sizes="100vw"
        />
      </motion.div>

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Drifting grid */}
      <div
        className={`absolute inset-0 opacity-[0.14] team-bg-grid-drift ${reduced ? "[animation-play-state:paused]" : ""}`}
        style={{
          backgroundImage:
            "linear-gradient(var(--accent-copper-border) 1px, transparent 1px), linear-gradient(90deg, var(--accent-copper-border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to left, black 25%, transparent 85%)",
        }}
      />

      {/* Dual light sweeps */}
      <div
        className={`absolute inset-0 z-[1] team-bg-sweep ${reduced ? "[animation-play-state:paused]" : ""}`}
        style={{
          background:
            "linear-gradient(105deg, transparent 42%, rgba(251,146,60,0.12) 50%, transparent 58%)",
        }}
      />
      {!reduced && (
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(75deg, transparent 45%, rgba(212,165,116,0.08) 52%, transparent 60%)",
          }}
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* 3D cube city — hero-aligned */}
      <motion.div style={{ y: cubeY }} className="absolute inset-0 z-[2]">
        <TeamCubeAccent />
      </motion.div>

      {/* Architecture layer */}
      <motion.div
        style={{ y: layerY }}
        className="absolute inset-0 z-[3] [transform-style:preserve-3d]"
      >
        {SLABS.map((s, i) => (
          <AccentSlab key={`slab-${i}`} {...s} reduced={!!reduced} />
        ))}
        {BARS.map((b, i) => (
          <AccentBar key={`bar-${i}`} {...b} reduced={!!reduced} />
        ))}
      </motion.div>

      <AmbientParticles count={14} reduced={!!reduced} />

      {/* Ambient orbs — CSS for smooth GPU animation */}
      <div
        className={`absolute top-[18%] right-[12%] h-80 w-80 rounded-full blur-[100px] team-bg-orb ${reduced ? "[animation-play-state:paused]" : ""}`}
        style={{ background: "var(--accent-amber-glow)" }}
      />
      <div
        className={`absolute bottom-[12%] right-[28%] h-64 w-64 rounded-full blur-[90px] team-bg-orb-delayed ${reduced ? "[animation-play-state:paused]" : ""}`}
        style={{ background: "var(--accent-copper-bg)" }}
      />

      <div
        className="absolute inset-0 z-[4]"
        style={{
          background:
            "radial-gradient(ellipse 75% 55% at 78% 42%, var(--accent-amber-glow) 0%, transparent 52%), radial-gradient(ellipse 55% 45% at 92% 68%, var(--accent-copper-bg) 0%, transparent 48%)",
        }}
      />

      {/* Readability vignette — keeps text crisp */}
      <div className="absolute inset-0 z-[5] bg-gradient-to-r from-[#030303] from-[30%] via-[#030303]/80 to-transparent" />
      <div className="absolute inset-0 z-[5] bg-gradient-to-b from-[#030303]/60 via-transparent to-[#030303]/90" />
    </div>
  );
}
