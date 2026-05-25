"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const BOARD_SRC = "/testimonials/testimonials-board.png";
const SNAP = { type: "spring" as const, stiffness: 65, damping: 17, mass: 0.9 };
const EASE = [0.22, 1, 0.36, 1] as const;

const CORNERS = [
  { id: "tl", className: "top-3 left-3 border-t-2 border-l-2 rounded-tl-lg" },
  { id: "tr", className: "top-3 right-3 border-t-2 border-r-2 rounded-tr-lg" },
  { id: "bl", className: "bottom-3 left-3 border-b-2 border-l-2 rounded-bl-lg" },
  { id: "br", className: "bottom-3 right-3 border-b-2 border-r-2 rounded-br-lg" },
] as const;

const PARTICLES = [
  { left: "12%", delay: "0s", size: 4 },
  { left: "28%", delay: "1.2s", size: 3 },
  { left: "72%", delay: "0.6s", size: 5 },
  { left: "88%", delay: "2s", size: 3 },
  { left: "50%", delay: "1.5s", size: 4 },
] as const;

type PanelProps = {
  side: "left" | "right";
  delay: number;
  inView: boolean;
  reduced: boolean | null;
};

function SlidePanel({ side, delay, inView, reduced }: PanelProps) {
  const clipVisible =
    side === "left" ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)";
  const clipHidden =
    side === "left" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
  const skipMotion = reduced === true;
  const show = skipMotion || inView;

  return (
    <motion.div
      className="absolute inset-0 z-[1]"
      initial={{ clipPath: skipMotion ? clipVisible : clipHidden }}
      animate={{ clipPath: show ? clipVisible : clipHidden }}
      transition={{
        ...SNAP,
        delay: show && !skipMotion ? delay : 0,
      }}
    >
      <div
        className={cn(
          "absolute inset-0 origin-center",
          show && !skipMotion && "testimonials-kenburns"
        )}
      >
        <Image
          src={BOARD_SRC}
          alt=""
          aria-hidden
          fill
          className="object-contain object-center"
          sizes="(max-width: 768px) 100vw, 1152px"
          priority
        />
      </div>
    </motion.div>
  );
}

export function TestimonialsBoard() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12, margin: "-40px" });
  const skipMotion = reduced === true;
  const active = inView && !skipMotion;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 28, scale: 0.94 }
      }
      transition={{ duration: 0.65, ease: EASE }}
      className="relative mx-auto max-w-4xl sm:max-w-5xl"
      style={{ perspective: 1200 }}
    >
      {/* Ambient glow — pulses when in view */}
      <motion.div
        className="pointer-events-none absolute -inset-4 rounded-3xl blur-2xl"
        animate={
          active
            ? { opacity: [0.35, 0.55, 0.35], scale: [1, 1.03, 1] }
            : { opacity: 0.35, scale: 1 }
        }
        transition={
          active
            ? { duration: 5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.4 }
        }
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(251,146,60,0.14) 0%, transparent 70%)",
        }}
      />

      <motion.div
        animate={active ? { y: [0, -6, 0] } : { y: 0 }}
        transition={
          active
            ? { duration: 7, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
        }
        className="relative"
      >
        <motion.div
          initial={{ rotateX: 6 }}
          animate={inView ? { rotateX: 0 } : { rotateX: 6 }}
          transition={{ duration: 0.8, delay: skipMotion ? 0 : 0.15, ease: EASE }}
          className={cn(
            "relative overflow-hidden rounded-2xl border shadow-2xl shadow-black/60",
            active && "testimonials-frame-glow"
          )}
          style={{
            transformStyle: "preserve-3d",
            borderColor: "var(--accent-copper-border)",
            boxShadow: "0 28px 80px rgba(0,0,0,0.55)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
            }}
          />

          <div
            className="relative w-full bg-[#ececee] aspect-[1505/1045]"
            role="img"
            aria-label="Client testimonials collage for Postsiva Tech"
          >
            <SlidePanel side="left" delay={0} inView={inView} reduced={reduced} />
            <SlidePanel side="right" delay={0.12} inView={inView} reduced={reduced} />

            {/* Light edge vignette — kept high so the bottom row stays clear */}
            <div
              className="pointer-events-none absolute inset-0 z-[2]"
              style={{
                background:
                  "radial-gradient(ellipse 90% 80% at 50% 38%, transparent 62%, rgba(0,0,0,0.06) 100%)",
              }}
            />

            {/* Shine sweeps */}
            {active && (
              <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
                <div className="testimonials-shine absolute inset-0 h-full w-full" />
                <div className="testimonials-shine-slow absolute inset-0 h-full w-full" />
              </div>
            )}

            {/* Center seam */}
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={
                inView
                  ? {
                      scaleY: 1,
                      opacity: 1,
                      boxShadow: active
                        ? [
                            "0 0 8px var(--accent-amber-glow)",
                            "0 0 20px var(--accent-amber-glow)",
                            "0 0 8px var(--accent-amber-glow)",
                          ]
                        : "0 0 12px var(--accent-amber-glow)",
                    }
                  : { scaleY: 0, opacity: 0 }
              }
              transition={{
                scaleY: { delay: skipMotion ? 0 : 0.35, duration: 0.4, ease: EASE },
                opacity: { delay: skipMotion ? 0 : 0.35, duration: 0.4 },
                boxShadow: active
                  ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.4 },
              }}
              className="pointer-events-none absolute inset-y-4 left-1/2 z-10 w-px -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(180deg, transparent, var(--accent-amber), var(--accent-copper), transparent)",
              }}
            />

            {/* Spark at seam center */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={
                inView
                  ? { scale: active ? [1, 1.4, 1] : 1, opacity: active ? [0.6, 1, 0.6] : 0.8 }
                  : { scale: 0, opacity: 0 }
              }
              transition={{
                delay: skipMotion ? 0 : 0.5,
                duration: active ? 2 : 0.35,
                repeat: active ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-[11] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "var(--accent-amber)",
                boxShadow: "0 0 16px var(--accent-amber-glow)",
              }}
            />

            {/* Corner brackets */}
            {CORNERS.map((corner, i) => (
              <motion.span
                key={corner.id}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
                transition={{
                  delay: skipMotion ? 0 : 0.45 + i * 0.07,
                  duration: 0.45,
                  ease: EASE,
                }}
                className={cn(
                  "pointer-events-none absolute z-[4] h-6 w-6 sm:h-8 sm:w-8",
                  corner.className,
                  active && "testimonials-corner-bracket"
                )}
                style={{ borderColor: "var(--accent-copper)" }}
              />
            ))}

            {/* Rising particles */}
            {active &&
              PARTICLES.map((p) => (
                <span
                  key={p.left}
                  className="testimonials-particle pointer-events-none absolute bottom-6 z-[4] rounded-full"
                  style={{
                    left: p.left,
                    width: p.size,
                    height: p.size,
                    animationDelay: p.delay,
                    background:
                      "radial-gradient(circle, var(--accent-amber) 0%, transparent 70%)",
                  }}
                />
              ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
