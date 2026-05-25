"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Layers, Share2, Sparkles, Bot } from "lucide-react";
import { POSTSIVA_LOGO_SRC } from "@/components/brand/PostsivaLogo";

const POSTSIVA_URL = "https://postsiva.com/";
const EASE = [0.22, 1, 0.36, 1] as const;

const highlights = [
  { icon: Share2, title: "10+", subtitle: "Channels" },
  { icon: Layers, title: "Live previews", subtitle: "One composer" },
  { icon: Bot, title: "Personas + tools", subtitle: "AI stack" },
  { icon: Calendar, title: "Drag · schedule", subtitle: "Calendar" },
];

export function PostsivaProjectSpotlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: EASE }}
      className="mb-8 sm:mb-10"
    >
      <div
        className="group relative overflow-hidden rounded-xl border bg-zinc-950/95 backdrop-blur-sm"
        style={{
          borderColor: "var(--accent-amber-border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
          }}
        />

        <div className="relative z-10 flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5 lg:gap-8">
          <div className="min-w-0 flex-1">
            <div
              className="mb-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider"
              style={{
                borderColor: "var(--accent-amber-border)",
                background: "var(--accent-amber-bg)",
                color: "var(--accent-amber)",
              }}
            >
              <Sparkles className="h-3 w-3" />
              Flagship product
            </div>

            <div className="mb-2 flex items-center gap-2.5">
              <span
                className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg p-0.5"
                style={{ boxShadow: "0 0 0 1px var(--accent-copper-border)" }}
              >
                <Image
                  src={POSTSIVA_LOGO_SRC}
                  alt="Postsiva"
                  width={36}
                  height={36}
                  className="h-full w-full object-contain"
                />
              </span>
              <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">Postsiva</h3>
            </div>

            <p className="mb-2 text-sm font-bold leading-snug text-white sm:text-base">
              Publish everywhere.{" "}
              <span
                className="bg-clip-text text-transparent [-webkit-background-clip:text]"
                style={{
                  backgroundImage:
                    "linear-gradient(100deg, var(--accent-copper-light), var(--accent-amber))",
                }}
              >
                One canvas.
              </span>
            </p>
            <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-white/55 sm:text-sm">
              LinkedIn, Meta, TikTok, and more—composer, calendar, inbox, WhatsApp, mobile, and AI
              tools in one workspace.
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
              <a
                href={POSTSIVA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-black transition-transform hover:scale-[1.02] sm:text-sm"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
                }}
              >
                Visit postsiva.com
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <Link
                href="/portfolio/postsiva"
                className="inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/[0.06] sm:text-sm"
                style={{ borderColor: "var(--accent-copper-border)" }}
              >
                Case study
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.subtitle}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 + i * 0.04, ease: EASE }}
                  className="rounded-xl border bg-black/40 px-2.5 py-2"
                  style={{ borderColor: "var(--accent-copper-border)" }}
                >
                  <item.icon className="mb-1 h-3.5 w-3.5" style={{ color: "var(--accent-amber)" }} />
                  <p className="text-xs font-bold leading-tight text-white">{item.title}</p>
                  <p className="text-[8px] font-semibold uppercase tracking-wider text-white/45">
                    {item.subtitle}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full shrink-0 sm:max-w-[240px] md:max-w-[280px] lg:max-w-[300px]">
            <div
              className="relative overflow-hidden rounded-xl border"
              style={{
                borderColor: "var(--accent-copper-border)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <Image
                src="/projects/postsiva-unified.png"
                alt="Postsiva unified workspace"
                width={1200}
                height={800}
                className="h-auto w-full object-cover object-top"
                priority
              />
            </div>
            <span
              className="absolute -top-1.5 right-2 rounded-lg border px-2 py-0.5 text-[9px] font-bold backdrop-blur-md"
              style={{
                borderColor: "var(--accent-amber-border)",
                background: "rgba(0,0,0,0.85)",
                color: "var(--accent-amber)",
              }}
            >
              Live workspace
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
