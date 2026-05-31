"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { allTeamMembers } from "@/lib/team-data";

/** Abdul Hannan top row; Maryam bottom row (works on 3-col and 2-col layouts) */
const HERO_SLUG_ORDER = [
  "uzair-yasin",
  "fahad-jabbar",
  "abdul-hannan",
  "alisha-kayani",
  "maryam-riaz",
  "esha-amjad",
] as const;

const heroMembers = HERO_SLUG_ORDER.map((slug) =>
  allTeamMembers.find((m) => m.slug === slug)
).filter((m): m is (typeof allTeamMembers)[number] => Boolean(m));

const FLOAT_DELAYS = [0, 0.35, 0.7, 0.2, 0.55, 0.9];

function FloatingAvatar({
  name,
  image,
  slug,
  delay,
}: {
  name: string;
  image: string;
  slug: string;
  delay: number;
}) {
  return (
    <motion.div
      className="flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.5 + delay }}
    >
      <motion.div
        animate={{
          y: [0, -8, 6, 0],
          x: [0, 5, -4, 0],
          rotate: [0, 2, -1.5, 0],
        }}
        transition={{
          duration: 5 + delay * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className="group relative w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] md:w-[100px] md:h-[100px]"
      >
        <Link
          href={`/team/${slug}`}
          aria-label={name}
          className="block w-full h-full rounded-full border-2 border-white/25 bg-zinc-900 shadow-xl shadow-black/40 overflow-hidden ring-2 ring-white/10 hover:border-[color:var(--accent-amber-border)] hover:scale-105 transition-transform duration-300"
        >
          <Image
            src={image}
            alt={name}
            width={100}
            height={100}
            className="w-full h-full object-cover object-top"
          />
        </Link>
        <span
          className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border px-2.5 py-1 text-[11px] sm:text-xs font-bold text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100"
          style={{
            borderColor: "var(--accent-copper-border)",
            background: "rgba(0,0,0,0.92)",
          }}
        >
          {name}
        </span>
      </motion.div>
    </motion.div>
  );
}

export function HeroTeamFloat() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative max-w-5xl mx-auto w-full px-4 mb-16 md:mb-20"
    >
      <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full -z-10" />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-12 sm:gap-x-14 sm:gap-y-14 md:gap-x-20 md:gap-y-16 py-4">
        {heroMembers.map((member, i) => (
          <FloatingAvatar
            key={member.slug}
            name={member.name}
            image={member.image}
            slug={member.slug}
            delay={FLOAT_DELAYS[i % FLOAT_DELAYS.length]}
          />
        ))}
      </div>
    </motion.div>
  );
}
