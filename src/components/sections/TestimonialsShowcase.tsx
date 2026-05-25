"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { TestimonialsBoard } from "./TestimonialsBoard";

const EASE = [0.22, 1, 0.36, 1] as const;

const STATS = [
  { value: "50+", label: "Projects delivered" },
  { value: "100%", label: "Client satisfaction" },
  { value: "4+", label: "Years experience" },
] as const;

const REVIEWS = [
  {
    text: "Powerful tools for file management, communication, and performance insights.",
    author: "Client from Fiverr",
    rating: 5,
    platform: "Fiverr",
    country: "United States",
    link: "https://fiverr.com",
  },
  {
    text: "EngrSquad delivers solutions that actually work for our business goals.",
    author: "Client from Upwork",
    rating: 5,
    platform: "Upwork",
    country: "United Kingdom",
    link: "https://upwork.com",
  },
  {
    text: "Exceptional quality and speed. The team went above and beyond.",
    author: "Client from LinkedIn",
    rating: 5,
    platform: "LinkedIn",
    country: "Canada",
    link: "https://linkedin.com",
  },
  {
    text: "Highly recommended for complex web applications and automation.",
    author: "Client from Referral",
    rating: 5,
    platform: "Referral",
    country: "Germany",
    link: "#",
  },
  {
    text: "Professional communication and polished delivery on every milestone.",
    author: "Client from Direct",
    rating: 5,
    platform: "Direct",
    country: "Australia",
    link: "#",
  },
];

export function TestimonialsShowcase() {
  return (
    <div className="relative mb-20 sm:mb-24 md:mb-28">
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, ease: EASE }}
        className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
      >
        <div
          className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{
            borderColor: "var(--accent-copper-border)",
            background: "var(--accent-copper-bg)",
            color: "var(--accent-copper-light)",
          }}
        >
          <Sparkles className="h-3 w-3" style={{ color: "var(--accent-amber)" }} />
          Client stories
        </div>

        <h2 className="mb-4 text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Trusted by teams who{" "}
          <span
            className="bg-clip-text text-transparent [-webkit-background-clip:text]"
            style={{
              backgroundImage:
                "linear-gradient(100deg, var(--accent-copper-light), var(--accent-amber))",
            }}
          >
            ship with confidence
          </span>
        </h2>

        <p className="text-sm leading-relaxed text-white/55 sm:text-base">
          Real feedback from founders and operators we&apos;ve partnered with—design, build, and
          scale.
        </p>
      </motion.header>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        className="mx-auto mb-8 flex max-w-2xl flex-wrap justify-center gap-3 sm:mb-10"
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.08, ease: EASE }}
            whileHover={{ y: -3 }}
            className="flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm"
            style={{
              borderColor: "var(--accent-copper-border)",
              background: "var(--accent-copper-bg)",
            }}
          >
            <span className="text-sm font-bold text-white">{stat.value}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <TestimonialsBoard />

      {/* Scrolling review strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative mt-8 sm:mt-10"
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#030303] to-transparent sm:w-20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#030303] to-transparent sm:w-20"
          aria-hidden
        />
        <InfiniteMovingCards
          items={REVIEWS}
          direction="left"
          speed="slow"
          className="mx-auto max-w-5xl"
        />
      </motion.div>
    </div>
  );
}
