"use client";

import { motion } from "framer-motion";
import { Server, ArrowUpRight, Globe, Smartphone, Cloud, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type StackItem = {
  title: string;
  description: string;
  image: string;
  imageClassName: string;
  techs: string[];
  featured?: boolean;
  badge?: string;
  icon: typeof Globe;
};

const frontend: StackItem = {
  title: "Frontend Development",
  description:
    "Pixel-perfect interfaces with React, Next.js, and motion-rich experiences that convert.",
  image: "/services/web-development.png",
  imageClassName: "object-cover object-center",
  techs: ["React", "Next.js", "Tailwind", "Framer"],
  icon: Globe,
};

const mobile: StackItem = {
  title: "Mobile Applications",
  description:
    "Cross-platform apps with native performance—React Native, Flutter, iOS & Android.",
  image: "/services/mobile-app-development.png",
  imageClassName: "object-cover object-center",
  techs: ["React Native", "Flutter", "iOS", "Android"],
  icon: Smartphone,
};

const backend: StackItem = {
  title: "Backend Solutions",
  description:
    "Scalable APIs, secure auth, databases, and cloud-ready architecture for production workloads.",
  image: "/services/backend-development.png",
  imageClassName: "object-cover object-left",
  techs: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Redis", "Django"],
  featured: true,
  badge: "Core engineering",
  icon: Server,
};

const devops: StackItem = {
  title: "Cloud & DevOps",
  description:
    "CI/CD pipelines, containers, and cloud infrastructure that keep your product reliable at scale.",
  image: "/services/devops-lifecycle.png",
  imageClassName: "object-cover object-center",
  techs: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  icon: Cloud,
};

const STACK_ITEMS = [frontend, mobile, backend, devops] as const;

const MARQUEE_TECHS = [
  "React.js",
  "Next.js",
  "Node.js",
  "Python",
  "FastAPI",
  "Django",
  "PostgreSQL",
  "Redis",
  "Docker",
  "AWS",
  "Kubernetes",
  "TypeScript",
];

function StackCard({ stack, index }: { stack: StackItem; index: number }) {
  const Icon = stack.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      whileHover={{ y: -3 }}
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border bg-zinc-950/90 p-4 backdrop-blur-sm transition-shadow duration-300 sm:flex-row sm:items-stretch sm:gap-5 sm:p-5",
        stack.featured && "ring-1 ring-[color:var(--accent-amber-border)]/40"
      )}
      style={{
        borderColor: stack.featured
          ? "var(--accent-amber-border)"
          : "var(--accent-copper-border)",
        boxShadow: stack.featured
          ? "0 4px 28px rgba(251,146,60,0.08)"
          : "0 4px 24px rgba(0,0,0,0.35)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
        }}
      />

      <div className="relative mx-auto h-24 w-full max-w-[200px] shrink-0 overflow-hidden rounded-xl sm:mx-0 sm:h-28 sm:w-32">
        <Image
          src={stack.image}
          alt={stack.title}
          fill
          className={cn(
            stack.imageClassName,
            "transition-transform duration-500 group-hover:scale-105"
          )}
          sizes="128px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/70 via-transparent to-transparent" />
        <div
          className="absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-md shadow-sm"
          style={{
            background:
              "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
            color: "#0a0a0a",
          }}
        >
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 text-center sm:text-left">
        {stack.featured && stack.badge && (
          <span
            className="mx-auto inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider sm:mx-0"
            style={{
              borderColor: "var(--accent-amber-border)",
              background: "var(--accent-amber-bg)",
              color: "var(--accent-amber)",
            }}
          >
            <Server className="h-3 w-3" />
            {stack.badge}
          </span>
        )}

        <h3 className="text-base font-bold tracking-tight text-white sm:text-lg">
          {stack.title}
        </h3>

        <p className="line-clamp-2 text-xs leading-relaxed text-white/55 sm:text-sm">
          {stack.description}
        </p>

        <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start">
          {stack.techs.map((tech) => (
            <span
              key={tech}
              className="rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white/75"
              style={{
                borderColor: "var(--accent-copper-border)",
                background: "var(--accent-copper-bg)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          href="#services"
          className="mt-auto inline-flex items-center justify-center gap-1 pt-1 text-[10px] font-semibold uppercase tracking-wider transition-colors sm:justify-start sm:text-xs"
          style={{ color: "var(--accent-copper-light)" }}
        >
          View expertise
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}

export const TechStack = () => {
  return (
    <section
      id="tech-stack"
      className="relative isolate scroll-mt-20 overflow-hidden border-t border-white/[0.06] bg-[#030303] py-16 sm:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(212,165,116,0.06) 0%, transparent 55%), radial-gradient(ellipse 40% 35% at 90% 80%, rgba(251,146,60,0.05) 0%, transparent 50%)",
        }}
      />

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
            Our stack
          </div>

          <h2 className="mb-3 text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Our{" "}
            <span
              className="bg-clip-text font-bold text-transparent [-webkit-background-clip:text]"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--accent-copper-light), var(--accent-amber))",
              }}
            >
              technology ecosystem
            </span>
          </h2>

          <p className="text-sm leading-relaxed text-white/55 sm:text-base">
            Enterprise-grade frontend, backend, mobile, and DevOps—engineered to scale with your
            business.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {STACK_ITEMS.map((stack, index) => (
            <StackCard key={stack.title} stack={stack} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mt-8 overflow-hidden sm:mt-10"
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#030303] to-transparent sm:w-16"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#030303] to-transparent sm:w-16"
            aria-hidden
          />

          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex w-max gap-2"
          >
            {[...Array(2)].map((_, loop) =>
              MARQUEE_TECHS.map((tech) => (
                <span
                  key={`${loop}-${tech}`}
                  className="shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-[9px] font-semibold uppercase tracking-wide text-white/70 sm:text-[10px]"
                  style={{
                    borderColor: "var(--accent-copper-border)",
                    background: "var(--accent-copper-bg)",
                  }}
                >
                  {tech}
                </span>
              ))
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
