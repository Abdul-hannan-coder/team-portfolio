"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const COLS = 11;
const ROWS = 7;

function seed(c: number, r: number, s: number) {
  return ((c * 92837111) ^ (r * 689287499) ^ s) >>> 0;
}

type Cell = { id: string; h: number; glow: boolean; copper: boolean; delay: number; dur: number };

function buildCells(): Cell[] {
  const out: Cell[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const h = seed(c, r, 1);
      out.push({
        id: `${c}-${r}`,
        h: 8 + (h % 5) * 5,
        glow: seed(c, r, 2) % 10 === 0,
        copper: seed(c, r, 3) % 2 === 0,
        delay: (seed(c, r, 4) % 30) / 10,
        dur: 3.2 + (seed(c, r, 5) % 20) / 10,
      });
    }
  }
  return out;
}

function MiniCube({ cell, reduced }: { cell: Cell; reduced: boolean }) {
  return (
    <motion.div
      className="relative w-full"
      style={{ height: cell.h + 3 }}
      animate={reduced ? undefined : { y: [0, -cell.h * 0.18, 0] }}
      transition={
        reduced
          ? undefined
          : {
              duration: cell.dur,
              repeat: Infinity,
              repeatType: "mirror",
              ease: [0.45, 0, 0.55, 1],
              delay: cell.delay,
            }
      }
    >
      <div
        className="absolute inset-x-0 top-0 h-[3px] rounded-[1px]"
        style={{
          background: cell.copper
            ? "linear-gradient(90deg, #2a2420, #3d3530)"
            : "linear-gradient(90deg, #1a1a1a, #252525)",
          boxShadow: cell.copper ? "inset 0 1px 0 rgba(212,165,116,0.5)" : undefined,
        }}
      />
      <div
        className="absolute inset-x-0 rounded-b-[1px]"
        style={{
          top: 2,
          height: cell.h,
          background: cell.glow
            ? "linear-gradient(180deg, #1a120e, #060504)"
            : "linear-gradient(180deg, #161616, #060606)",
          boxShadow: cell.glow ? "inset 0 0 12px rgba(251,146,60,0.35)" : undefined,
        }}
      >
        {cell.glow && (
          <motion.div
            className="absolute left-1/2 top-1/2 h-[35%] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-[1px]"
            style={{
              background: "linear-gradient(180deg, var(--accent-amber), var(--accent-amber-deep))",
              boxShadow: "0 0 10px var(--accent-amber-glow)",
            }}
            animate={reduced ? undefined : { opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: cell.delay, ease: "easeInOut" }}
          />
        )}
      </div>
    </motion.div>
  );
}

export function TeamCubeAccent() {
  const reduced = useReducedMotion();
  const cells = useMemo(() => buildCells(), []);

  return (
    <motion.div
      className="absolute -right-[8%] top-[8%] w-[min(58vw,520px)]"
      initial={{ opacity: 0, x: 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="[transform-style:preserve-3d]"
        style={{ perspective: "1100px", perspectiveOrigin: "50% 35%" }}
        animate={
          reduced
            ? { rotateX: 52, rotateZ: -38 }
            : {
                rotateX: [50, 54, 50],
                rotateZ: [-37, -39, -37],
                y: [0, -8, 0],
              }
        }
        transition={{
          duration: reduced ? 0 : 14,
          repeat: reduced ? 0 : Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
      <div
        className="grid gap-[2px]"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {cells.map((cell) => (
          <MiniCube key={cell.id} cell={cell} reduced={!!reduced} />
        ))}
      </div>
      </motion.div>
    </motion.div>
  );
}
