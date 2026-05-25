"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Award, ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";
import type { CertificateWithMember } from "@/lib/landing-data";

const EASE = [0.22, 1, 0.36, 1] as const;

interface CertificatesProps {
  certificates: CertificateWithMember[];
  /** When true, used on /certificates page: "All Certificates" title and no "Show More" button */
  fullPage?: boolean;
}

function CertificateCard({
  cert,
  index,
}: {
  cert: CertificateWithMember;
  index: number;
}) {
  const issuer = cert.issuer ?? "Certified";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay: (index % 6) * 0.06, ease: EASE }}
      className="group relative flex h-full flex-col"
    >
      <div
        className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, var(--accent-copper-border), var(--accent-amber-glow), var(--accent-copper-border))",
        }}
      />

      <div
        className="flex h-full flex-col overflow-hidden rounded-3xl border bg-zinc-950/90 shadow-xl shadow-black/40 backdrop-blur-sm transition-shadow duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
        style={{ borderColor: "var(--accent-copper-border)" }}
      >
        {/* Uniform certificate frame */}
        <div
          className="relative aspect-[4/3] w-full shrink-0 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(251,146,60,0.08) 0%, transparent 60%), linear-gradient(180deg, #141210 0%, #0a0a0a 100%)",
            }}
          />

          <div className="absolute inset-4 flex items-center justify-center overflow-hidden rounded-xl bg-[#fafafa]/[0.97] p-2 shadow-inner ring-1 ring-black/20 sm:inset-5 sm:p-3">
            {cert.image ? (
              <div className="relative h-full w-full min-h-[120px]">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ) : (
              <Award className="h-14 w-14 text-zinc-300" strokeWidth={1.25} />
            )}
          </div>

          {cert.year && (
            <span
              className="absolute left-4 top-4 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
              style={{
                borderColor: "var(--accent-copper-border)",
                background: "rgba(0,0,0,0.75)",
                color: "var(--accent-copper-light)",
              }}
            >
              {cert.year}
            </span>
          )}
        </div>

        {/* Content — fixed rhythm */}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <p
            className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "var(--accent-copper)" }}
          >
            {issuer}
          </p>

          <h3 className="mb-2 min-h-[3.25rem] text-lg font-bold leading-snug tracking-tight text-white line-clamp-2 sm:text-xl">
            {cert.name}
          </h3>

          <p className="mb-6 text-sm text-white/50">{cert.memberName}</p>

          <div className="mt-auto border-t border-white/[0.06] pt-5">
            {cert.link ? (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: "var(--accent-copper-light)" }}
              >
                <span className="group-hover:underline">View certificate</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 opacity-70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : (
              <span className="text-sm font-medium text-white/35">Credential on file</span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export const Certificates = ({ certificates, fullPage }: CertificatesProps) => {
  const visible = fullPage ? certificates : certificates.slice(0, 6);

  return (
    <section
      id="certificates"
      className="relative isolate overflow-hidden bg-[#030303] py-24 sm:py-32 scroll-mt-20"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,165,116,0.07) 0%, transparent 55%), radial-gradient(ellipse 40% 30% at 80% 100%, rgba(251,146,60,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mx-auto mb-16 max-w-3xl text-center md:mb-20"
        >
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]"
            style={{
              borderColor: "var(--accent-copper-border)",
              background: "var(--accent-copper-bg)",
              color: "var(--accent-copper-light)",
            }}
          >
            <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent-amber)" }} />
            Professional excellence
          </div>

          <h2 className="mb-5 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {fullPage ? (
              <>
                All{" "}
                <span
                  className="bg-clip-text font-bold text-transparent [-webkit-background-clip:text]"
                  style={{
                    backgroundImage:
                      "linear-gradient(100deg, var(--accent-copper-light), var(--accent-amber))",
                  }}
                >
                  certifications
                </span>
              </>
            ) : (
              <>
                Our{" "}
                <span
                  className="bg-clip-text font-bold text-transparent [-webkit-background-clip:text]"
                  style={{
                    backgroundImage:
                      "linear-gradient(100deg, var(--accent-copper-light), var(--accent-amber))",
                  }}
                >
                  certifications
                </span>
              </>
            )}
          </h2>

          <p className="text-base leading-relaxed text-white/55 sm:text-lg">
            Credentials from leading providers — verified skills across AI, cloud, and full-stack
            engineering.
          </p>
        </motion.header>

        {certificates.length === 0 ? (
          <p className="text-center text-white/50">No certificates added yet.</p>
        ) : (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((cert, index) => (
              <CertificateCard
                key={`${cert.memberName}-${cert.name}-${index}`}
                cert={cert}
                index={index}
              />
            ))}
          </div>
        )}

        {!fullPage && certificates.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 text-center sm:mt-16"
          >
            <Link
              href="/certificates"
              className="inline-flex items-center gap-2 rounded-2xl border px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:brightness-110"
              style={{
                borderColor: "var(--accent-copper-border)",
                background:
                  "linear-gradient(135deg, var(--accent-copper-bg), var(--accent-amber-bg))",
              }}
            >
              View all certificates
              <ArrowUpRight className="h-4 w-4" style={{ color: "var(--accent-amber)" }} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};
