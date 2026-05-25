"use client";

import { useReducedMotion } from "framer-motion";

/** Bottom-left fan — thick band + copper dotted accent line per lane */
const LANES = [
  { bottom: "1%", band: 56 },
  { bottom: "13%", band: 44 },
  { bottom: "25%", band: 38 },
  { bottom: "37%", band: 32 },
  { bottom: "49%", band: 28 },
  { bottom: "61%", band: 24 },
  { bottom: "73%", band: 20 },
] as const;

const ANGLE_DEG = -33;

type DiagonalRibbonLinesProps = {
  className?: string;
  /** Slight drift animation on bands */
  animate?: boolean;
};

export function DiagonalRibbonLines({ className = "", animate = true }: DiagonalRibbonLinesProps) {
  const reduced = useReducedMotion();
  const motionOn = animate && !reduced;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
      style={{
        maskImage:
          "linear-gradient(to top right, black 0%, black 52%, transparent 88%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to top right, black 0%, black 52%, transparent 88%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      {LANES.map((lane, i) => (
        <div
          key={i}
          className={`absolute left-[-28%] w-[155%] origin-bottom-left ${motionOn ? "services-diagonal-lane" : ""}`}
          style={{
            bottom: lane.bottom,
            ...(motionOn ? {} : { transform: `rotate(${ANGLE_DEG}deg)` }),
            animationDelay: motionOn ? `${i * 0.4}s` : undefined,
          }}
        >
          {/* Thick translucent band */}
          <div
            className="w-full rounded-[2px]"
            style={{
              height: lane.band,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(18,16,14,0.92) 12%, rgba(42,38,34,0.45) 48%, rgba(24,22,20,0.75) 82%, transparent 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          />
          {/* Thin copper dotted line — parallel, just above band */}
          <div
            className="services-copper-dotted-line mt-2 h-[2px] w-full"
            style={{ opacity: 0.55 + i * 0.04 }}
          />
        </div>
      ))}
    </div>
  );
}
