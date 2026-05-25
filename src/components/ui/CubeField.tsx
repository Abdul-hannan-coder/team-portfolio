"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef } from "react";

export type CubeFieldVariant = "hero" | "portfolio";

type CubeCell = {
  id: string;
  height: number;
  glow: boolean;
  copper: boolean;
  delay: number;
  duration: number;
};

function seed(col: number, row: number, salt: number) {
  return ((col * 92837111) ^ (row * 689287499) ^ salt) >>> 0;
}

function buildGrid(cols: number, rows: number): CubeCell[] {
  const cells: CubeCell[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const h = seed(col, row, 1);
      cells.push({
        id: `${col}-${row}`,
        height: 14 + (h % 6) * 10 + (row % 2) * 4,
        glow: seed(col, row, 2) % 9 === 0,
        copper: seed(col, row, 3) % 3 !== 0,
        delay: (seed(col, row, 4) % 40) / 10,
        duration: 2.8 + (seed(col, row, 5) % 25) / 10,
      });
    }
  }
  return cells;
}

function Cube({ cell, reduced }: { cell: CubeCell; reduced: boolean }) {
  const depth = cell.height;
  return (
    <motion.div
      className="relative w-full"
      style={{ height: depth + 6 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: reduced ? 0 : [0, -depth * 0.2, 0] }}
      transition={{
        opacity: { duration: 0.5, delay: cell.delay * 0.04 },
        y: reduced
          ? undefined
          : {
              duration: cell.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: cell.delay,
            },
      }}
    >
      <div
        className="absolute inset-x-0 top-0 rounded-[2px]"
        style={{
          height: 6,
          background: cell.copper
            ? "linear-gradient(135deg, #3d3530 0%, #1a1816 100%)"
            : "linear-gradient(135deg, #2a2a2a 0%, #121212 100%)",
          boxShadow: cell.copper
            ? "inset 0 1px 0 rgba(212, 165, 116, 0.5), 0 0 14px rgba(180, 120, 70, 0.2)"
            : "inset 0 1px 0 rgba(255,255,255,0.06)",
          border: cell.copper ? "1px solid rgba(212, 165, 116, 0.35)" : "1px solid rgba(255,255,255,0.04)",
        }}
      />
      <div
        className="absolute inset-x-0 rounded-b-[2px]"
        style={{
          top: 5,
          height: depth,
          background: cell.glow
            ? "linear-gradient(180deg, #1f1510 0%, #0a0806 100%)"
            : "linear-gradient(180deg, #1c1c1c 0%, #080808 100%)",
          boxShadow: cell.glow
            ? "inset 0 0 24px rgba(251, 146, 60, 0.4), 0 4px 20px rgba(0,0,0,0.8)"
            : "inset -2px 0 8px rgba(0,0,0,0.5)",
        }}
      >
        {cell.glow && !reduced && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm"
            style={{
              width: "55%",
              height: Math.min(depth * 0.35, 18),
              background: "linear-gradient(180deg, var(--accent-amber) 0%, var(--accent-amber-deep) 100%)",
              boxShadow: "0 0 20px var(--accent-amber-glow)",
            }}
            animate={{ opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
            transition={{
              duration: 2.2 + cell.delay * 0.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
      <div
        className="absolute top-[5px] right-0 w-[3px] rounded-br-[1px] opacity-60"
        style={{ height: depth, background: "linear-gradient(180deg, #0a0a0a, #000)" }}
      />
    </motion.div>
  );
}

const VARIANT_CONFIG = {
  hero: {
    cols: 16,
    rows: 9,
    top: "42%",
    width: "min(110vw, 1100px)",
    rotateX: [51, 55, 51] as number[],
    rotateZ: [-39, -35, -39] as number[],
  },
  portfolio: {
    cols: 18,
    rows: 10,
    top: "48%",
    width: "min(130vw, 1280px)",
    rotateX: [48, 52, 48] as number[],
    rotateZ: [-36, -32, -36] as number[],
  },
};

type CubeFieldProps = {
  variant?: CubeFieldVariant;
  backgroundImage?: string;
  /** When true, no solid black base — for layered section backgrounds */
  transparentBase?: boolean;
};

export function CubeField({
  variant = "hero",
  backgroundImage,
  transparentBase = false,
}: CubeFieldProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const cfg = VARIANT_CONFIG[variant];
  const cells = useMemo(() => buildGrid(cfg.cols, cfg.rows), [cfg.cols, cfg.rows]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", variant === "portfolio" ? "-12%" : "0%"]);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden ${transparentBase ? "bg-transparent" : "bg-black"}`}
    >
      {backgroundImage && (
        <motion.div style={{ y: parallaxY }} className="absolute -inset-[8%]">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover object-center opacity-35 mix-blend-lighten"
            sizes="100vw"
          />
        </motion.div>
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 55% at 50% 45%, var(--accent-amber-glow) 0%, transparent 55%), radial-gradient(ellipse 60% 45% at 25% 65%, var(--accent-copper-bg) 0%, transparent 50%)",
        }}
      />

      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          className="[transform-style:preserve-3d]"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 42%",
            marginTop: variant === "portfolio" ? "8%" : "0",
          }}
          animate={
            reduced
              ? { rotateX: 52, rotateZ: -34 }
              : {
                  rotateX: cfg.rotateX,
                  rotateZ: cfg.rotateZ,
                  x: ["-1.5%", "1.5%", "-1.5%"],
                }
          }
          transition={{
            duration: 16,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <div
            className="mx-auto grid gap-[3px] sm:gap-1"
            style={{
              gridTemplateColumns: `repeat(${cfg.cols}, minmax(0, 1fr))`,
              width: cfg.width,
              transformStyle: "preserve-3d",
            }}
          >
            {cells.map((cell) => (
              <Cube key={cell.id} cell={cell} reduced={!!reduced} />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {variant === "hero" ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/95" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-black/55 to-black/40" />
        </>
      )}
    </div>
  );
}
