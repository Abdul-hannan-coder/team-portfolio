"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import { Code2, Smartphone, Globe, Layers, Sparkles, Workflow } from "lucide-react";
import { ServicesArcBackground } from "./ServicesArcBackground";
import { ServiceRow, type ServiceItem } from "./ServiceRow";

const EASE = [0.22, 1, 0.36, 1] as const;

const services: ServiceItem[] = [
  {
    title: "Web Development",
    tag: "Frontend",
    description:
      "High-performance web apps with React and Next.js—built for speed, SEO, and conversion.",
    detailedDescription:
      "We map your goals to a technical roadmap, then ship polished products with maintainable architecture and measurable performance.",
    features: ["Next.js & React", "E-commerce", "API integration", "Core Web Vitals"],
    icon: Globe,
    image: "/services/web-development.png",
    imageClassName: "object-cover object-center",
  },
  {
    title: "Mobile App Development",
    tag: "Mobile",
    description:
      "Cross-platform apps that feel native on iOS and Android—with offline-ready flows where it matters.",
    detailedDescription:
      "One codebase, consistent UX, and platform-specific polish so your users get a seamless experience everywhere.",
    features: ["React Native", "iOS & Android", "UI/UX parity", "Offline support"],
    icon: Smartphone,
    image: "/services/mobile-app-development.png",
    imageClassName: "object-cover object-center",
  },
  {
    title: "UI/UX Design",
    tag: "Design",
    description:
      "Research-led interfaces that balance beauty with clarity—wireframes through high-fidelity systems.",
    detailedDescription:
      "We validate flows early, prototype fast, and deliver design systems your engineering team can implement without guesswork.",
    features: ["User research", "Prototyping", "Design systems", "Visual identity"],
    icon: Layers,
    image: "/services/ui-ux-design.png",
    imageClassName: "object-cover object-top",
  },
  {
    title: "Custom SaaS Solutions",
    tag: "SaaS",
    description:
      "Multi-tenant platforms, billing, dashboards, and analytics—architected to scale with your business.",
    detailedDescription:
      "From MVP to growth stage, we design backends and admin experiences that stay reliable under real production load.",
    features: ["Multi-tenancy", "Subscriptions", "Admin dashboards", "Reporting"],
    icon: Code2,
    image: "/services/custom-saas.png",
    imageClassName: "object-cover object-center",
  },
  {
    title: "Custom Automation",
    tag: "Automation",
    description:
      "Connect CRMs, APIs, and no-code stacks—n8n, Zapier, Make, GoHighLevel—with workflows you can trust.",
    detailedDescription:
      "We eliminate manual handoffs with observable automations, clear error handling, and documentation your team can own.",
    features: ["n8n & Zapier", "CRM sync", "Custom APIs", "Workflow orchestration"],
    icon: Workflow,
    image: "/services/custom-automation.png",
    imageClassName: "object-cover object-center",
  },
];

export const Services = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.35"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section id="services" className="relative isolate overflow-hidden bg-transparent py-16 sm:py-20 lg:py-24">
      <ServicesArcBackground />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
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
            Services
          </div>
          <h2 className="mb-3 text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Built for{" "}
            <span
              className="bg-clip-text font-bold text-transparent [-webkit-background-clip:text]"
              style={{
                backgroundImage:
                  "linear-gradient(100deg, var(--accent-copper-light), var(--accent-amber))",
              }}
            >
              scale & clarity
            </span>
          </h2>
          <p className="text-sm leading-relaxed text-white/55 sm:text-base">
            End-to-end software—from interface to infrastructure—delivered with the rigor your product deserves.
          </p>
        </motion.header>

        <div ref={timelineRef} className="relative mx-auto max-w-6xl">
          {/* Center timeline — mid line through service rows */}
          <div
            className="absolute top-0 bottom-0 left-1/2 z-[1] hidden w-px -translate-x-1/2 md:block"
            aria-hidden
          >
            <div className="absolute inset-0 bg-white/[0.08]" />
            <motion.div
              className="absolute left-0 top-0 w-px origin-top"
              style={{
                scaleY,
                height: "100%",
                background:
                  "linear-gradient(180deg, var(--accent-copper), var(--accent-amber), var(--accent-copper))",
                boxShadow: "0 0 14px var(--accent-amber-glow)",
              }}
            />
          </div>

          <div className="relative z-[2] space-y-0">
            {services.map((service, index) => (
              <ServiceRow
                key={service.title}
                service={service}
                index={index}
                isExpanded={expandedIndex === index}
                onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
                isLast={index === services.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
