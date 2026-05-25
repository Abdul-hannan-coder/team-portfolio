"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, X, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { seniorDevelopers, testimonialTeam } from "@/lib/team-data";
import { TeamNeonBackground } from "./TeamNeonBackground";
import { TeamMemberCard } from "./TeamMemberCard";

const EASE = [0.22, 1, 0.36, 1] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
      style={{
        borderColor: "var(--accent-copper-border)",
        background: "var(--accent-copper-bg)",
        color: "var(--accent-copper-light)",
      }}
    >
      {children}
    </div>
  );
}

export const Team = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section
      id="team"
      className="relative overflow-hidden border-t border-white/[0.06] bg-black py-16 sm:py-20 lg:py-24"
    >
      <TeamNeonBackground />

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[85vh] w-full max-w-2xl items-center justify-center overflow-hidden rounded-2xl border bg-zinc-950"
              style={{
                borderColor: "var(--accent-copper-border)",
                boxShadow: "0 0 40px var(--accent-amber-glow)",
              }}
            >
              <Image
                src={selectedImage}
                alt="Enlarged team member"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 672px"
                priority
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-xl border transition-all hover:text-black"
                style={{
                  borderColor: "var(--accent-copper-border)",
                  background: "var(--accent-copper-bg)",
                  color: "var(--accent-copper-light)",
                }}
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-12"
        >
          <SectionLabel>
            <Sparkles className="h-3 w-3" style={{ color: "var(--accent-amber)" }} />
            <span>Our team</span>
          </SectionLabel>
          <h2 className="mt-4 text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Meet the{" "}
            <span
              className="bg-clip-text text-transparent [-webkit-background-clip:text]"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--accent-copper-light), var(--accent-amber))",
              }}
            >
              innovators
            </span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base">
            Developers and designers who bring technical excellence to every engagement.
          </p>
        </motion.header>

        <div className="mb-6 flex flex-col items-center gap-2 sm:mb-8">
          <SectionLabel>
            <Users className="h-3 w-3" />
            <span>Team leaders</span>
          </SectionLabel>
          <p className="max-w-xl text-center text-xs leading-relaxed text-white/50 sm:text-sm">
            Senior engineers guiding architecture, delivery, and quality across projects.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:mb-14">
          {seniorDevelopers.map((dev, index) => (
            <TeamMemberCard
              key={dev.slug}
              member={dev}
              index={index}
              lead
              onZoomImage={setSelectedImage}
            />
          ))}
        </div>

        <div className="mb-6 flex flex-col items-center gap-2 sm:mb-8">
          <SectionLabel>
            <span>Team members</span>
          </SectionLabel>
          <p className="max-w-xl text-center text-xs leading-relaxed text-white/50 sm:text-sm">
            The specialists building products, interfaces, and automation at Postsiva Tech.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {testimonialTeam.map((member, index) => (
            <TeamMemberCard
              key={member.slug}
              member={member}
              index={index}
              onZoomImage={setSelectedImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
