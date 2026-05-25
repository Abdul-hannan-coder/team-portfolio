"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, ZoomIn, ArrowUpRight, Crown } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/lib/team-data";

const EASE = [0.22, 1, 0.36, 1] as const;

type TeamLeaderCardProps = {
  member: TeamMember;
  onZoomImage: (src: string) => void;
};

export function TeamLeaderCard({ member, onZoomImage }: TeamLeaderCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: EASE }}
      className="group relative mx-auto w-full max-w-3xl"
    >
      <div
        className="pointer-events-none absolute -inset-1 rounded-[1.35rem] opacity-50 blur-md transition-opacity duration-500 group-hover:opacity-80"
        style={{
          background:
            "linear-gradient(135deg, var(--accent-copper-border), var(--accent-amber-glow), var(--accent-copper-border))",
        }}
      />

      <div
        className="relative overflow-hidden rounded-2xl border bg-zinc-950/95 p-5 sm:p-6 md:flex md:items-center md:gap-8 md:p-8"
        style={{
          borderColor: "var(--accent-amber-border)",
          boxShadow: "0 8px 40px rgba(251,146,60,0.1)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
          }}
        />

        <div
          className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-[80px]"
          style={{ background: "rgba(251,146,60,0.1)" }}
        />

        <button
          type="button"
          onClick={() => onZoomImage(member.image)}
          className="relative mx-auto mb-5 h-32 w-32 shrink-0 cursor-zoom-in overflow-hidden rounded-2xl transition-shadow duration-300 group-hover:shadow-[0_0_28px_var(--accent-amber-glow)] md:mx-0 md:mb-0 md:h-40 md:w-40"
          style={{ boxShadow: "0 0 0 2px var(--accent-copper-border)" }}
          aria-label={`View photo of ${member.name}`}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="160px"
            priority
          />
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "rgba(0,0,0,0.45)" }}
          >
            <ZoomIn className="h-6 w-6" style={{ color: "var(--accent-amber)" }} />
          </div>
        </button>

        <div className="relative min-w-0 flex-1 text-center md:text-left">
          <div
            className="mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{
              borderColor: "var(--accent-amber-border)",
              background: "var(--accent-amber-bg)",
              color: "var(--accent-amber)",
            }}
          >
            <Crown className="h-3 w-3" />
            Team lead
          </div>

          <h3 className="mb-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
            {member.name}
          </h3>

          <p
            className="mb-3 inline-block rounded-full border px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{
              borderColor: "var(--accent-copper-border)",
              background: "var(--accent-copper-bg)",
              color: "var(--accent-copper-light)",
            }}
          >
            {member.role}
          </p>

          <p className="mb-5 text-sm leading-relaxed text-white/60 sm:text-base">
            {member.description}
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
            <div className="flex items-center gap-2">
              {member.socials.linkedin && (
                <SocialBtn href={member.socials.linkedin} external>
                  <Linkedin className="h-4 w-4" />
                </SocialBtn>
              )}
              {member.socials.email && (
                <SocialBtn href={`mailto:${member.socials.email}`}>
                  <Mail className="h-4 w-4" />
                </SocialBtn>
              )}
              {member.socials.phone && (
                <SocialBtn
                  href={`https://wa.me/${member.socials.phone.replace(/[^0-9]/g, "")}`}
                  external
                >
                  <FaWhatsapp className="h-4 w-4" />
                </SocialBtn>
              )}
            </div>

            <Link
              href={`/team/${member.slug}`}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-black transition-transform hover:scale-[1.02] sm:text-sm"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
              }}
            >
              View full profile
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function SocialBtn({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all hover:border-[color:var(--accent-amber-border)] hover:bg-[color:var(--accent-amber)] hover:text-black"
      style={{
        borderColor: "var(--accent-copper-border)",
        background: "var(--accent-copper-bg)",
        color: "var(--accent-copper-light)",
      }}
    >
      {children}
    </a>
  );
}
