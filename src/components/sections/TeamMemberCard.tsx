"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, ZoomIn, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/lib/team-data";
import { cn } from "@/lib/utils";

type TeamMemberCardProps = {
  member: TeamMember;
  index: number;
  onZoomImage: (src: string) => void;
  lead?: boolean;
};

export function TeamMemberCard({ member, index, onZoomImage, lead }: TeamMemberCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -3 }}
      className="group relative h-full"
    >
      <div
        className={cn(
          "relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border bg-zinc-950/90 p-4 backdrop-blur-sm transition-shadow duration-300 sm:flex-row sm:items-stretch sm:gap-5 sm:p-5",
          lead && "sm:gap-6"
        )}
        style={{
          borderColor: "var(--accent-copper-border)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
          }}
        />

        {lead && (
          <span
            className="absolute right-3 top-3 z-10 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
            style={{
              borderColor: "var(--accent-amber-border)",
              background: "var(--accent-amber-bg)",
              color: "var(--accent-amber)",
            }}
          >
            Lead
          </span>
        )}

        <button
          type="button"
          onClick={() => onZoomImage(member.image)}
          className={cn(
            "relative mx-auto shrink-0 cursor-zoom-in overflow-hidden rounded-xl transition-shadow duration-300 group-hover:shadow-[0_0_20px_var(--accent-amber-glow)] sm:mx-0",
            lead ? "h-28 w-28 sm:h-32 sm:w-32" : "h-24 w-24 sm:h-28 sm:w-28"
          )}
          style={{ boxShadow: "0 0 0 1px var(--accent-copper-border)" }}
          aria-label={`View photo of ${member.name}`}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={lead ? "128px" : "112px"}
          />
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "rgba(0,0,0,0.45)" }}
          >
            <ZoomIn className="h-5 w-5" style={{ color: "var(--accent-amber)" }} />
          </div>
        </button>

        <div className="flex min-w-0 flex-1 flex-col gap-2.5 text-center sm:text-left">
          <div className={cn("space-y-1", lead && "pr-12 sm:pr-14")}>
            <h3 className="text-base font-bold tracking-tight text-white sm:text-lg">
              {member.name}
            </h3>
            <p
              className="inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                borderColor: "var(--accent-copper-border)",
                background: "var(--accent-copper-bg)",
                color: "var(--accent-copper-light)",
              }}
            >
              {member.role}
            </p>
          </div>

          <p className="line-clamp-2 text-sm leading-relaxed text-white/55">
            {member.description}
          </p>

          <div className="mt-auto flex flex-col items-center gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
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
              className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-[var(--accent-copper-light)]"
              style={{ color: "var(--accent-amber)" }}
            >
              View profile
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
      className="flex h-8 w-8 items-center justify-center rounded-lg border transition-all hover:border-[color:var(--accent-amber-border)] hover:bg-[color:var(--accent-amber)] hover:text-black"
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
