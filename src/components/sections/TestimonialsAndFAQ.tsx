"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle, Shield, Zap, BarChart4, Mail, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { TestimonialsShowcase } from "./TestimonialsShowcase";

const EASE = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    question: "How does the project automation work?",
    answer:
      "We use proven workflows and tooling—n8n, custom APIs, and AI where it helps—to automate handoffs without sacrificing quality. Every automation is observable, documented, and built so your team can own it.",
    icon: Zap,
  },
  {
    question: "Is my data and account security guaranteed?",
    answer:
      "Security is built in from day one: encrypted transport, least-privilege access, and isolated environments per client. We follow industry best practices for auth, secrets, and compliance-sensitive workloads.",
    icon: Shield,
  },
  {
    question: "Can I manage multiple team profiles?",
    answer:
      "Yes. Dashboards and admin experiences are designed for teams—roles, workspaces, and multi-project visibility so leads and members stay aligned as you scale.",
    icon: MessageCircle,
  },
  {
    question: "What kind of performance data will I see?",
    answer:
      "You get metrics that matter: delivery velocity, engagement where relevant, uptime, and business KPIs tied to your product. Reports can be tailored for stakeholders and exported when needed.",
    icon: BarChart4,
  },
];

export const TestimonialsAndFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="testimonials" className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#030303] py-16 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 20% 50%, rgba(212,165,116,0.05) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-10 xl:px-14">
        <TestimonialsShowcase />

        <div
          id="faq"
          className="mx-auto max-w-[48rem] border-t border-white/[0.06] pt-16 lg:max-w-5xl lg:pt-20"
        >
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="lg:w-[38%]"
            >
              <div className="lg:sticky lg:top-24">
                <div
                  className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                  style={{
                    borderColor: "var(--accent-copper-border)",
                    background: "var(--accent-copper-bg)",
                    color: "var(--accent-copper-light)",
                  }}
                >
                  <Sparkles className="h-3 w-3" style={{ color: "var(--accent-amber)" }} />
                  Knowledge base
                </div>

                <h2 className="mb-4 text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  Answers to your{" "}
                  <span
                    className="bg-clip-text text-transparent [-webkit-background-clip:text]"
                    style={{
                      backgroundImage:
                        "linear-gradient(100deg, var(--accent-copper-light), var(--accent-amber))",
                    }}
                  >
                    common questions
                  </span>
                </h2>

                <p className="mb-8 text-sm leading-relaxed text-white/55 sm:text-base">
                  New to Postsiva Tech? Explore FAQs to see how we help you ship and scale.
                </p>

                <div
                  className="rounded-2xl border bg-zinc-950/90 p-5 sm:p-6"
                  style={{ borderColor: "var(--accent-copper-border)" }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
                        color: "#0a0a0a",
                      }}
                    >
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Still have questions?</h4>
                      <p className="text-xs text-white/50">We&apos;re here to help.</p>
                    </div>
                  </div>
                  <Link
                    href="#contact"
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-black transition-transform hover:scale-[1.01]"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
                    }}
                  >
                    Contact support
                    <ChevronDown className="h-4 w-4 -rotate-90" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right — accordion + mid-line on desktop */}
            <div className="relative flex-1">
              <div
                className="pointer-events-none absolute top-4 bottom-4 -left-6 z-[1] hidden w-px lg:block"
                aria-hidden
              >
                <div className="absolute inset-0 bg-white/[0.06]" />
                <div
                  className="absolute inset-0 w-px"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
                  }}
                />
              </div>

              <div className="relative z-[2] space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  const Icon = faq.icon;

                  return (
                    <motion.div
                      key={faq.question}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.06, duration: 0.55, ease: EASE }}
                      className="group overflow-hidden rounded-2xl border transition-colors duration-300"
                      style={{
                        borderColor: isOpen ? "var(--accent-amber-border)" : "var(--accent-copper-border)",
                        background: isOpen ? "rgba(10,10,10,0.95)" : "rgba(15,15,15,0.7)",
                        boxShadow: isOpen ? "0 0 24px rgba(251,146,60,0.06)" : undefined,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left sm:px-6 sm:py-5"
                      >
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                          style={{
                            background: isOpen
                              ? "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))"
                              : "var(--accent-copper-bg)",
                            color: isOpen ? "#0a0a0a" : "var(--accent-copper-light)",
                            border: isOpen ? "none" : "1px solid var(--accent-copper-border)",
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <span className="flex-1 text-base font-bold leading-snug text-white sm:text-lg">
                          {faq.question}
                        </span>

                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          style={{ borderColor: "var(--accent-copper-border)" }}
                        >
                          <ChevronDown className="h-4 w-4 text-white/70" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                          >
                            <div className="border-t border-white/[0.06] px-5 pb-5 sm:px-6 sm:pb-6">
                              <p className="pt-4 text-sm leading-relaxed text-white/55 sm:pl-14 sm:text-base">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
