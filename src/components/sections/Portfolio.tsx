"use client";

import { motion } from "framer-motion";
import { Sparkles, Github, Globe, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/project-data";
import { PostsivaProjectSpotlight } from "./PostsivaProjectSpotlight";
import { PortfolioCubeBackground } from "./PortfolioCubeBackground";

const EASE = [0.22, 1, 0.36, 1] as const;
const FALLBACK_IMAGE = "/hero-section2.png";

interface PortfolioProps {
  projects: Project[];
  fullPage?: boolean;
  limit?: number;
}

function ProjectCover({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const [src, setSrc] = useState(project.image);

  return (
    <div className={cn("relative overflow-hidden bg-zinc-900", className)}>
      <Image
        src={src}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onError={() => setSrc(FALLBACK_IMAGE)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/90 via-[#030303]/20 to-transparent" />

      {project.featured && (
        <span
          className="absolute right-3 top-3 flex items-center gap-1 rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
          style={{
            background: "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
            color: "#0a0a0a",
          }}
        >
          <Sparkles className="h-2.5 w-2.5" />
          Featured
        </span>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const hasLinks = Boolean(project.githubLink || project.liveLink);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
      className="group flex h-full flex-col"
    >
      <div
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-xl border bg-zinc-950/95 transition-all duration-300",
          "hover:border-[color:var(--accent-copper-border)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
          project.featured && "border-[color:var(--accent-amber-border)]/60"
        )}
        style={{
          borderColor: "var(--accent-copper-border)",
        }}
      >
        <Link
          href={`/portfolio/${project.slug}`}
          className="relative block aspect-[16/10] shrink-0"
        >
          <ProjectCover project={project} className="absolute inset-0" />
        </Link>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <p
            className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: "var(--accent-copper)" }}
          >
            {project.category}
          </p>

          <Link href={`/portfolio/${project.slug}`} className="mb-2 block">
            <h3 className="line-clamp-2 text-base font-bold leading-snug tracking-tight text-white transition-colors group-hover:text-[var(--accent-copper-light)] sm:text-[17px]">
              {project.title}
            </h3>
          </Link>

          <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-white/55">
            {project.description}
          </p>

          {project.tech.length > 0 && (
            <div className="mb-4 flex min-h-[26px] flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border px-2 py-0.5 text-[10px] font-medium text-white/70"
                  style={{
                    borderColor: "var(--accent-copper-border)",
                    background: "var(--accent-copper-bg)",
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="rounded-md border border-white/10 px-2 py-0.5 text-[10px] font-medium text-white/40">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>
          )}

          <div
            className={cn(
              "mt-auto flex items-center gap-3 border-t border-white/[0.06] pt-4",
              hasLinks ? "justify-between" : "justify-end"
            )}
          >
            {hasLinks && (
              <div className="flex items-center gap-3">
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 transition-colors hover:text-white"
                  >
                    <Globe className="h-3.5 w-3.5 shrink-0" />
                    Live
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 transition-colors hover:text-white"
                  >
                    <Github className="h-3.5 w-3.5 shrink-0" />
                    GitHub
                  </a>
                )}
              </div>
            )}

            <Link
              href={`/portfolio/${project.slug}`}
              className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold transition-colors"
              style={{ color: "var(--accent-amber)" }}
            >
              Case study
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export const Portfolio = ({ projects, fullPage, limit }: PortfolioProps) => {
  const sorted = [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.id - a.id;
  });
  const visible = limit ? sorted.slice(0, limit) : sorted;
  const gridProjects = visible.filter((p) => p.slug !== "postsiva");

  return (
    <section
      id={fullPage ? "portfolio" : "projects"}
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-transparent py-16 sm:py-20"
    >
      <PortfolioCubeBackground />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-12"
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
            {fullPage ? "All projects" : "Our work"}
          </div>

          <h2 className="mb-3 text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {fullPage ? (
              <>
                All{" "}
                <span
                  className="bg-clip-text text-transparent [-webkit-background-clip:text]"
                  style={{
                    backgroundImage:
                      "linear-gradient(100deg, var(--accent-copper-light), var(--accent-amber))",
                  }}
                >
                  projects
                </span>
              </>
            ) : (
              <>
                Our{" "}
                <span
                  className="bg-clip-text text-transparent [-webkit-background-clip:text]"
                  style={{
                    backgroundImage:
                      "linear-gradient(100deg, var(--accent-copper-light), var(--accent-amber))",
                  }}
                >
                  projects
                </span>
              </>
            )}
          </h2>

          <p className="text-sm leading-relaxed text-white/55 sm:text-base">
            {fullPage
              ? "Products and platforms where we delivered technical excellence and measurable impact."
              : "A selection of what we've shipped—from flagship SaaS to custom automation."}
          </p>
        </motion.header>

        {visible.length === 0 ? (
          <p className="mx-auto max-w-lg text-center text-sm text-white/50">
            No projects yet. Add them in the{" "}
            <Link
              href="/postsiva/login"
              className="font-semibold underline"
              style={{ color: "var(--accent-copper-light)" }}
            >
              admin dashboard
            </Link>
            .
          </p>
        ) : (
          <>
            <PostsivaProjectSpotlight />

            {gridProjects.length > 0 && (
              <div className="mb-5 flex items-center gap-3 sm:mb-6">
                <div className="h-px flex-1 bg-white/[0.06]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                  More projects
                </span>
                <div className="h-px flex-1 bg-white/[0.06]" />
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {gridProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </>
        )}

        {!fullPage && visible.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 text-center sm:mt-12"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 rounded-xl border px-5 py-2.5 text-xs font-semibold text-white transition-all hover:brightness-110 sm:text-sm"
              style={{
                borderColor: "var(--accent-copper-border)",
                background:
                  "linear-gradient(135deg, var(--accent-copper-bg), var(--accent-amber-bg))",
              }}
            >
              View all projects
              <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "var(--accent-amber)" }} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};
