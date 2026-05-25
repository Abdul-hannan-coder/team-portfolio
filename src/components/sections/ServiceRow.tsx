"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ChevronRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

export type ServiceItem = {
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  icon: LucideIcon;
  image: string;
  imageClassName?: string;
  tag?: string;
};

type ServiceRowProps = {
  service: ServiceItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  isLast: boolean;
};

export function ServiceRow({ service, index, isExpanded, onToggle, isLast }: ServiceRowProps) {
  const isReversed = index % 2 === 1;
  const Icon = service.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay: index * 0.06, ease: EASE }}
      className={`relative ${!isLast ? "pb-28 md:pb-36" : ""}`}
    >
      <div
        className={`flex flex-col gap-10 md:gap-14 lg:gap-16 ${
          isReversed ? "md:flex-row-reverse" : "md:flex-row"
        } md:items-center`}
      >
        {/* Copy */}
        <div className={`flex-1 ${isReversed ? "md:text-right" : "md:text-left"} text-center`}>
          <div className={`flex flex-col ${isReversed ? "md:items-end" : "md:items-start"} items-center`}>
            <div className="mb-5 flex items-center gap-3">
              <span
                className="font-mono text-xs font-bold tracking-[0.2em] uppercase"
                style={{ color: "var(--accent-copper)" }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-8 bg-white/15" />
              {service.tag && (
                <span
                  className="rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    borderColor: "var(--accent-copper-border)",
                    color: "var(--accent-copper-light)",
                  }}
                >
                  {service.tag}
                </span>
              )}
            </div>

            <h3 className="mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {service.title}
            </h3>
            <p className="mb-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              {service.description}
            </p>

            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  key="details"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="w-full overflow-hidden"
                >
                  <div className={`mb-6 max-w-xl ${isReversed ? "md:ml-auto" : ""}`}>
                    <p className="mb-5 text-sm leading-relaxed text-white/55 sm:text-base">
                      {service.detailedDescription}
                    </p>
                    <ul
                      className={`grid gap-3 sm:grid-cols-2 ${
                        isReversed ? "md:justify-items-end" : ""
                      }`}
                    >
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className={`flex items-start gap-2.5 text-sm font-medium text-white/85 ${
                            isReversed ? "md:flex-row-reverse md:text-right" : ""
                          }`}
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0"
                            style={{ color: "var(--accent-amber)" }}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={onToggle}
              aria-expanded={isExpanded}
              className="group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:gap-3"
              style={{
                borderColor: "var(--accent-copper-border)",
                background: isExpanded ? "var(--accent-amber-bg)" : "transparent",
                color: "var(--accent-copper-light)",
              }}
            >
              {isExpanded ? "Show less" : "View capabilities"}
              <ChevronRight
                className={`h-4 w-4 transition-transform duration-300 ${
                  isExpanded ? "rotate-90" : "group-hover:translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Visual */}
        <div className="w-full flex-1 md:max-w-[52%]">
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-950 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.9)]"
          >
            <div
              className="pointer-events-none absolute inset-0 z-10 rounded-3xl ring-1 ring-inset ring-white/[0.06]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(145deg, transparent 50%, rgba(251,146,60,0.08) 100%)",
              }}
            />
            <Image
              src={service.image}
              alt={service.title}
              fill
              className={`object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04] ${
                service.imageClassName ?? ""
              }`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div
              className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-xl border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-md md:hidden"
            >
              <Icon className="h-4 w-4" style={{ color: "var(--accent-amber)" }} />
              <span className="text-xs font-semibold text-white">{service.title}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mid-line node — sits on center timeline */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: index * 0.05 }}
        className="absolute top-8 left-1/2 z-20 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-xl border md:flex"
        style={{
          borderColor: "var(--accent-copper-border)",
          background: "linear-gradient(160deg, #1a1a1a 0%, #0a0a0a 100%)",
          boxShadow: "0 0 0 3px rgba(0,0,0,0.6), 0 0 20px var(--accent-amber-glow)",
        }}
      >
        <div
          className="absolute inset-[3px] rounded-lg"
          style={{ background: "linear-gradient(135deg, var(--accent-copper-light), #fff)" }}
        />
        <Icon className="relative z-10 h-5 w-5 text-black" />
      </motion.div>
    </motion.article>
  );
}
