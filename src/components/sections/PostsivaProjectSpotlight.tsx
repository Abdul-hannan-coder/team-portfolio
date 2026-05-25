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
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, ease: EASE }}
      className="mb-12 sm:mb-16"
    >
      <div
        className="group relative overflow-hidden rounded-3xl border bg-zinc-950/90 shadow-2xl shadow-black/50 backdrop-blur-sm"
        style={{ borderColor: "var(--accent-copper-border)" }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-80"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
          }}
        />

        <div
          className="absolute -top-20 -left-20 h-64 w-64 rounded-full blur-[100px]"
          style={{ background: "rgba(251,146,60,0.12)" }}
        />
        <div
          className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full blur-[110px]"
          style={{ background: "rgba(212,165,116,0.1)" }}
        />

        <div className="relative z-10 grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-12">
          <div className="text-left">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{
                borderColor: "var(--accent-amber-border)",
                background: "var(--accent-amber-bg)",
                color: "var(--accent-amber)",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Flagship product
            </div>

            <div className="mb-4 flex items-center gap-3">
              <span
                className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl p-1"
                style={{ boxShadow: "0 0 0 1px var(--accent-copper-border)" }}
              >
                <Image
                  src={POSTSIVA_LOGO_SRC}
                  alt="Postsiva"
                  width={44}
                  height={44}
                  className="h-full w-full object-contain"
                />
              </span>
              <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Postsiva</h3>
            </div>

            <p className="mb-3 text-xl font-bold leading-snug text-white sm:text-2xl">
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
            <p className="mb-8 max-w-lg text-base leading-relaxed text-white/55">
              LinkedIn, Meta, TikTok, and more—composer, calendar, inbox, WhatsApp, mobile, ChatGPT
              Apps, and MCP in one workspace.
            </p>

            <div className="mb-8 flex flex-wrap gap-3">
              <a
                href={POSTSIVA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold text-black shadow-lg transition-transform hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
                }}
              >
                Visit postsiva.com
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/portfolio/postsiva"
                className="inline-flex items-center gap-2 rounded-2xl border px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06]"
                style={{ borderColor: "var(--accent-copper-border)" }}
              >
                Case study
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.subtitle}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.05, ease: EASE }}
                  className="rounded-2xl border bg-black/40 p-3 backdrop-blur-sm"
                  style={{ borderColor: "var(--accent-copper-border)" }}
                >
                  <item.icon className="mb-2 h-4 w-4" style={{ color: "var(--accent-amber)" }} />
                  <p className="text-sm font-bold leading-tight text-white">{item.title}</p>
                  <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-white/45">
                    {item.subtitle}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div
              className="absolute -inset-3 rounded-[1.75rem] blur-2xl opacity-60"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-amber-glow), var(--accent-copper-bg))",
              }}
            />
            <div
              className="relative overflow-hidden rounded-2xl border shadow-2xl"
              style={{
                borderColor: "var(--accent-copper-border)",
                boxShadow: "0 0 40px var(--accent-amber-glow)",
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
              className="absolute -top-2 right-4 rounded-xl border px-3 py-1.5 text-[10px] font-bold backdrop-blur-md"
              style={{
                borderColor: "var(--accent-amber-border)",
                background: "rgba(0,0,0,0.85)",
                color: "var(--accent-amber)",
              }}
            >
              Live workspace
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
