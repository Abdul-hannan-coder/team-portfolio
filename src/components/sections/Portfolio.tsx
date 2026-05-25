"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Sparkles, Github, Globe, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/project-data";
import { PostsivaProjectSpotlight } from "./PostsivaProjectSpotlight";
import { PortfolioCubeBackground } from "./PortfolioCubeBackground";

const EASE = [0.22, 1, 0.36, 1] as const;

interface PortfolioProps {
  projects: Project[];
  fullPage?: boolean;
  limit?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(251,146,60,0.12), transparent 55%)`;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      onMouseMove={onMouseMove}
      className="group relative h-full"
    >
      <div
        className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, var(--accent-copper-border), var(--accent-amber-glow), var(--accent-copper-border))",
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 z-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <div
        className="relative z-10 flex h-full flex-col overflow-hidden rounded-3xl border bg-zinc-950/90 backdrop-blur-md transition-shadow duration-500 group-hover:shadow-[0_0_36px_var(--accent-amber-glow)]"
        style={{
          borderColor: project.featured ? "var(--accent-amber-border)" : "var(--accent-copper-border)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
          }}
        />

        <Link href={`/portfolio/${project.slug}`} className="relative block aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/30 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-85" />

          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span
              className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
              style={{
                borderColor: "var(--accent-copper-border)",
                background: "rgba(0,0,0,0.65)",
                color: "var(--accent-copper-light)",
              }}
            >
              {project.category}
            </span>
            {project.featured && (
              <span
                className="flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
                  color: "#0a0a0a",
                }}
              >
                <Sparkles className="h-3 w-3" />
                Featured
              </span>
            )}
          </div>

          <div
            className="absolute right-4 bottom-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-xl opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
            style={{
              background: "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
              color: "#0a0a0a",
            }}
          >
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </Link>

        <div className="flex grow flex-col p-6 sm:p-7">
          <Link href={`/portfolio/${project.slug}`} className="block">
            <h3 className="mb-2 line-clamp-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
              {project.title}
            </h3>
            <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-white/55 sm:text-base">
              {project.description}
            </p>
          </Link>

          {project.tech.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white/75"
                  style={{
                    borderColor: "var(--accent-copper-border)",
                    background: "var(--accent-copper-bg)",
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-bold text-white/45">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>
          )}

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-4">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white/55 transition-colors hover:text-white"
                  aria-label="GitHub repository"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white/55 transition-colors hover:text-white"
                  aria-label="Live demo"
                >
                  <Globe className="h-4 w-4" />
                  Live
                </a>
              )}
            </div>
            <Link
              href={`/portfolio/${project.slug}`}
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider transition-colors"
              style={{ color: "var(--accent-copper-light)" }}
            >
              Details
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
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-transparent py-24 sm:py-32 lg:pb-40"
    >
      <PortfolioCubeBackground />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mx-auto mb-14 max-w-3xl text-center md:mb-20"
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
            {fullPage ? "All projects" : "Our work"}
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
                  projects
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
                  projects
                </span>
              </>
            )}
          </h2>

          <p className="text-base leading-relaxed text-white/55 sm:text-lg">
            {fullPage
              ? "Products and platforms where we delivered technical excellence and measurable business impact."
              : "A selection of what we've shipped—from flagship SaaS to custom automation."}
          </p>
        </motion.header>

        {visible.length === 0 ? (
          <p className="mx-auto max-w-lg text-center text-base text-white/50">
            No projects yet. Add them in the{" "}
            <Link href="/postsiva/login" className="font-semibold underline" style={{ color: "var(--accent-copper-light)" }}>
              admin dashboard
            </Link>
            .
          </p>
        ) : (
          <>
            <PostsivaProjectSpotlight />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
            >
              {gridProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </>
        )}

        {!fullPage && visible.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 text-center sm:mt-16"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-2xl border px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:brightness-110"
              style={{
                borderColor: "var(--accent-copper-border)",
                background:
                  "linear-gradient(135deg, var(--accent-copper-bg), var(--accent-amber-bg))",
              }}
            >
              View all projects
              <ArrowUpRight className="h-4 w-4" style={{ color: "var(--accent-amber)" }} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};
