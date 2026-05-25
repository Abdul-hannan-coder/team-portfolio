"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
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
    "Scalable APIs, secure auth, databases, and cloud-ready architecture built for production workloads.",
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

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: EASE },
  }),
};

function StackCard({
  stack,
  index,
  className,
}: {
  stack: StackItem;
  index: number;
  className?: string;
}) {
  const isFeatured = stack.featured;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(251,146,60,0.1), transparent 55%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const Icon = stack.icon;

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onMouseMove={onMouseMove}
      className={cn("group relative flex flex-col overflow-hidden rounded-2xl border bg-zinc-950/90 backdrop-blur-sm lg:flex-row", className)}
      style={{
        borderColor: isFeatured ? "var(--accent-amber-border)" : "var(--accent-copper-border)",
        boxShadow: isFeatured ? "0 0 40px rgba(251,146,60,0.08)" : undefined,
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, var(--accent-copper-border), var(--accent-amber-glow), var(--accent-copper-border))",
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
        }}
      />

      {isFeatured && (
        <div
          className="pointer-events-none absolute -top-16 right-0 h-56 w-56 rounded-full blur-[90px]"
          style={{ background: "rgba(251,146,60,0.12)" }}
          aria-hidden
        />
      )}

      <div
        className={cn(
          "relative flex items-center justify-center p-4 sm:p-5",
          isFeatured ? "min-h-[176px] lg:w-[40%]" : "lg:w-[42%]"
        )}
      >
        <div
          className={cn(
            "relative w-full overflow-hidden shadow-lg",
            isFeatured ? "aspect-[2/1] rounded-xl" : "aspect-[5/4] rounded-xl"
          )}
          style={{ boxShadow: "0 0 0 1px var(--accent-copper-border)" }}
        >
          <Image
            src={stack.image}
            alt={stack.title}
            fill
            className={cn(stack.imageClassName, "transition-transform duration-700 group-hover:scale-105")}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent" />
        </div>

        <div
          className="absolute top-5 left-5 z-10 flex h-8 w-8 items-center justify-center rounded-lg shadow-md"
          style={{
            background: "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
            color: "#0a0a0a",
          }}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center p-4 sm:p-5 lg:p-6">
        {isFeatured && stack.badge && (
          <span
            className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"
            style={{
              borderColor: "var(--accent-amber-border)",
              background: "var(--accent-amber-bg)",
              color: "var(--accent-amber)",
            }}
          >
            <Server className="h-3.5 w-3.5" />
            {stack.badge}
          </span>
        )}

        <h3
          className={cn(
            "mb-2 font-bold tracking-tight text-white",
            isFeatured ? "text-lg sm:text-xl lg:text-2xl" : "text-base sm:text-lg"
          )}
        >
          {stack.title}
        </h3>

        <p className="max-w-md text-xs leading-relaxed text-white/55 sm:text-sm">{stack.description}</p>

        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {stack.techs.map((tech) => (
            <span
              key={tech}
              className="rounded-full border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white/80 sm:text-[10px]"
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
          className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors sm:text-xs"
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
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#030303] py-16 sm:py-20 scroll-mt-20"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(212,165,116,0.06) 0%, transparent 55%), radial-gradient(ellipse 40% 35% at 90% 80%, rgba(251,146,60,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-14"
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

        <div className="relative mx-auto max-w-[48rem] space-y-4 sm:space-y-5">
          {/* Top row with center mid-line on desktop */}
          <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            <div
              className="pointer-events-none absolute top-6 bottom-6 left-1/2 z-[1] hidden w-px -translate-x-1/2 md:block"
              aria-hidden
            >
              <div className="absolute inset-0 bg-white/[0.06]" />
              <div
                className="absolute inset-0 w-px"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
                  boxShadow: "0 0 12px var(--accent-amber-glow)",
                }}
              />
            </div>

            <StackCard stack={frontend} index={0} className="relative z-[2]" />
            <StackCard stack={mobile} index={1} className="relative z-[2]" />
          </div>

          <StackCard stack={backend} index={2} className="w-full" />
          <StackCard stack={devops} index={3} className="mx-auto w-full max-w-2xl" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mt-10 overflow-hidden sm:mt-12"
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#030303] to-transparent sm:w-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#030303] to-transparent sm:w-24"
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
                  className="shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white/75 sm:text-xs"
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
