"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, ZoomIn, ExternalLink } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/lib/team-data";

type TeamMemberCardProps = {
  member: TeamMember;
  index: number;
  onZoomImage: (src: string) => void;
  lead?: boolean;
};

export function TeamMemberCard({ member, index, onZoomImage, lead }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -32 : 32, y: 24 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8 }}
      className="group relative h-full w-full"
    >
      <div
        className="absolute -inset-px -z-10 rounded-[2.5rem] opacity-0 blur-sm transition-all duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, var(--accent-copper-border), var(--accent-amber-glow), var(--accent-copper-border))",
        }}
      />

      <div
        className="relative flex h-full flex-col items-center gap-8 overflow-hidden rounded-[2.5rem] border bg-zinc-950/85 p-8 shadow-xl shadow-black/50 backdrop-blur-md transition-all duration-500 sm:p-10"
        style={{
          borderColor: "var(--accent-copper-border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
          }}
        />

        {lead && (
          <span
            className="absolute right-5 top-5 rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-widest"
            style={{
              borderColor: "var(--accent-amber-border)",
              background: "var(--accent-amber-bg)",
              color: "var(--accent-amber)",
            }}
          >
            Lead
          </span>
        )}

        <div
          className="relative h-64 w-64 shrink-0 cursor-zoom-in overflow-hidden rounded-3xl shadow-lg transition-all duration-500 group-hover:shadow-[0_0_30px_var(--accent-amber-glow)]"
          style={{ boxShadow: "0 0 0 2px var(--accent-copper-border)" }}
          onClick={() => onZoomImage(member.image)}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 256px, 320px"
          />
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: "var(--accent-amber-bg)" }}
          >
            <ZoomIn className="h-8 w-8" style={{ color: "var(--accent-amber)" }} />
          </div>
        </div>

        <h3 className="text-center text-2xl font-black tracking-tight text-white sm:text-4xl">
          {member.name}
        </h3>

        <div
          className="rounded-full border px-6 py-2 text-center text-xs font-bold uppercase tracking-widest"
          style={{
            borderColor: "var(--accent-copper-border)",
            background: "var(--accent-copper-bg)",
            color: "var(--accent-copper-light)",
          }}
        >
          {member.role}
        </div>

        <p className="max-w-sm text-center text-lg font-medium leading-relaxed text-white/75">
          {member.description}
        </p>

        <div className="flex items-center justify-center gap-5">
          {member.socials.linkedin && (
            <SocialBtn href={member.socials.linkedin} external>
              <Linkedin className="h-6 w-6" />
            </SocialBtn>
          )}
          {member.socials.email && (
            <SocialBtn href={`mailto:${member.socials.email}`}>
              <Mail className="h-6 w-6" />
            </SocialBtn>
          )}
          {member.socials.phone && (
            <SocialBtn
              href={`https://wa.me/${member.socials.phone.replace(/[^0-9]/g, "")}`}
              external
            >
              <FaWhatsapp className="h-6 w-6" />
            </SocialBtn>
          )}
        </div>

        <div className="mt-auto w-full">
          <Link
            href={`/team/${member.slug}`}
            className="group/btn flex w-full items-center justify-center gap-2 rounded-2xl border py-5 font-black text-white transition-all hover:text-black"
            style={{
              borderColor: "var(--accent-copper-border)",
              background:
                "linear-gradient(135deg, var(--accent-copper-bg), var(--accent-amber-bg))",
              boxShadow: "0 4px 20px var(--accent-amber-glow)",
            }}
          >
            <span className="transition-colors group-hover/btn:text-black">View Full Profile</span>
            <ExternalLink className="h-5 w-5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-black" />
          </Link>
        </div>
      </div>
    </motion.div>
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
      className="flex h-12 w-12 items-center justify-center rounded-xl border transition-all hover:border-[color:var(--accent-amber-border)] hover:bg-[color:var(--accent-amber)] hover:text-black"
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
