"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles, Code2, Rocket, Layout, Smartphone, Database, Workflow, ServerIcon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { HeroCubeField } from "./HeroCubeField";
import { HeroTeamFloat } from "./HeroTeamFloat";
import LogoLoop from "../ui/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiPrisma,
  SiShadcnui,
  SiTrpc
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiFramer />, title: "Framer Motion", href: "https://www.framer.com/motion/" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiPrisma />, title: "Prisma", href: "https://www.prisma.io" },
  { node: <SiShadcnui />, title: "Shadcn UI", href: "https://ui.shadcn.com" },
  { node: <SiTrpc />, title: "tRPC", href: "https://trpc.io" },
];

const Particle = ({ delay, duration, left }: { delay: number; duration: number; left: string }) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: "100vh", opacity: [0, 1, 1, 0] }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "linear",
    }}
    style={{ left }}
    className="absolute top-0 w-1.5 h-1.5 bg-[#ffffff]/40 rounded-full blur-[1px]"
  />
);

export default function HeroSection() {
  const [particles, setParticles] = useState<{ id: number; left: string; delay: number; duration: number }[]>([]);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  // const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 15,
      }))
    );
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24">
      {/* 3D cube cityscape — animated matte blocks + copper edges + warm glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroCubeField />
      </div>

      {/* Subtle floating particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden opacity-40">
        {particles.map((p) => (
          <Particle key={p.id} left={p.left} delay={p.delay} duration={p.duration} />
        ))}
      </div>

      {/* Floating Glow Effects */}
      {/* <motion.div style={{ y: y1 }} className="glow-effect top-1/4 -left-20 w-[600px] h-[600px] bg-[#85868a]" />
      <motion.div style={{ y: y2 }} className="glow-effect bottom-1/4 -right-20 w-[600px] h-[600px] bg-[#85868a]" /> */}

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ opacity, scale }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-bold mb-10 text-white"
            style={{
              borderColor: "var(--accent-copper-border)",
              background: "var(--accent-copper-bg)",
              boxShadow: "0 0 30px var(--accent-amber-glow)",
            }}
          >
            <Sparkles className="w-4 h-4 animate-pulse" style={{ color: "var(--accent-amber)" }} />
            <span>Building the Future, Today</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-[#ffffff] mb-8 leading-[1.1] tracking-tighter"
          >
            Engineering Excellence for <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, var(--accent-copper-light), var(--accent-amber))",
              }}
            >
              Modern Digital Solutions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-base md:text-lg text-[#e5e5e5] mb-10 leading-relaxed font-medium"
          >
            At Postsiva Tech, we combine technical excellence with creative innovation
            to deliver software solutions that transform businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link href="#projects" className="cursor-pointer">
              <Button size="lg" className="group h-14 px-8 rounded-2xl text-base font-bold cursor-pointer">
                View Our Work
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#contact" className="cursor-pointer">
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-2xl text-base font-bold cursor-pointer">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <HeroTeamFloat />

        {/* Hero Bottom - Trust Indicators */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
          }}
          className="mt-16 max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-4 sm:gap-5"
        >
          {[
            { label: "React / Next.js", icon: Code2, highlight: false },
            { label: "Python / FastAPI", icon: ServerIcon, highlight: true },
            { label: "Mobile First", icon: Smartphone, highlight: false },
            { label: "Scalable APIs", icon: Rocket, highlight: true },
            { label: "PostgreSQL", icon: Database, highlight: true },
            { label: "N8N Automation", icon: Workflow, highlight: false },
            { label: "DevOps & Cloud", icon: ServerIcon, highlight: false },
            { label: "Modern UI/UX", icon: Layout, highlight: false },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: 16, scale: 0.92 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="flex items-center gap-2.5 group cursor-default px-5 py-3 rounded-2xl border backdrop-blur-md transition-all duration-300 bg-zinc-950/80 shadow-md shadow-black/30"
              style={
                item.highlight
                  ? {
                      borderColor: "var(--accent-amber-border)",
                      background: "var(--accent-amber-bg)",
                      boxShadow: "0 4px 24px var(--accent-amber-glow)",
                    }
                  : {
                      borderColor: "var(--accent-copper-border)",
                    }
              }
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
                style={
                  item.highlight
                    ? { background: "var(--accent-amber)", color: "#000" }
                    : {
                        background: "var(--accent-copper-bg)",
                        color: "var(--accent-copper-light)",
                      }
                }
              >
                <item.icon className="w-4 h-4" />
              </span>
              <span className="font-bold text-white tracking-tight text-xs sm:text-sm">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Logo Loop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 pt-8 "
        >
          <p className="text-base font-extrabold text-[#ffffff] uppercase tracking-[0.2em] mb-10 text-center">
            Powering Innovation with Modern Tech Stack
          </p>
          <LogoLoop
            logos={techLogos}
            speed={35}
            direction="left"
            logoHeight={32}
            gap={64}
            scaleOnHover
            fadeOut
            fadeOutColor="#000000"
            className="text-[#ffffff] transition-colors"
          />
        </motion.div>
      </div>
    </section>
  );
}

