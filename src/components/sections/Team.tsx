"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { seniorDevelopers, testimonialTeam } from "@/lib/team-data";
import { TeamNeonBackground } from "./TeamNeonBackground";
import { TeamMemberCard } from "./TeamMemberCard";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-widest sm:px-6 sm:text-sm"
      style={{
        borderColor: "var(--accent-copper-border)",
        background: "var(--accent-copper-bg)",
        color: "var(--accent-copper-light)",
      }}
    >
      {children}
    </motion.div>
  );
}

export const Team = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="team" className="relative overflow-hidden bg-black py-20 sm:py-28 lg:py-32">
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
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[92vh] w-full max-w-4xl items-center justify-center overflow-hidden rounded-3xl border bg-zinc-950"
              style={{
                borderColor: "var(--accent-copper-border)",
                boxShadow: "0 0 60px var(--accent-amber-glow)",
              }}
            >
              <Image
                src={selectedImage}
                alt="Enlarged team member"
                fill
                className="object-contain p-4"
                sizes="(max-width: 1280px) 100vw, 86vh"
                priority
              />
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-2xl border transition-all hover:text-black sm:right-6 sm:top-6"
                style={{
                  borderColor: "var(--accent-copper-border)",
                  background: "var(--accent-copper-bg)",
                  color: "var(--accent-copper-light)",
                }}
              >
                <X className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 text-center sm:mb-16 lg:mb-24"
        >
          <SectionLabel>
            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Our Expert Team</span>
          </SectionLabel>
          <h2 className="mt-6 text-3xl font-black leading-tight tracking-tighter text-white sm:text-5xl md:text-7xl sm:leading-[1.1]">
            Meet the{" "}
            <span
              className="bg-clip-text text-transparent [-webkit-background-clip:text]"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--accent-copper-light), var(--accent-amber))",
              }}
            >
              Innovators
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-lg font-medium leading-relaxed text-white/70 sm:mt-8 sm:max-w-3xl sm:text-xl md:text-2xl">
            Our diverse group of passionate developers and designers bring technical excellence to every project
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col items-center sm:mb-12">
          <SectionLabel>
            <span>Team Leaders</span>
          </SectionLabel>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-5 max-w-5xl text-center text-base font-semibold leading-relaxed text-white/80 sm:text-xl md:text-2xl"
          >
            Our team leaders are the backbone of our team — deep expertise and a shared passion for outstanding results
          </motion.p>
        </div>

        <div className="mx-auto mb-20 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10 sm:mb-28">
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

        <div className="mb-8 flex flex-col items-center sm:mb-12">
          <SectionLabel>
            <span>Team Members</span>
          </SectionLabel>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-5 max-w-4xl text-center text-base font-semibold leading-relaxed text-white/80 sm:text-xl md:text-2xl"
          >
            The talented professionals behind Postsiva Tech, driving innovation and powering our success
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
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
