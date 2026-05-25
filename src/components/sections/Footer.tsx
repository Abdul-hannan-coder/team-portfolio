"use client";

import { Linkedin, Twitter, Send, Instagram, Facebook, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PostsivaLogo } from "../brand/PostsivaLogo";

const EASE = [0.22, 1, 0.36, 1] as const;

const SOCIALS = [
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/company/postiva/posts/?feedView=all",
    label: "LinkedIn",
  },
  { Icon: Twitter, href: "https://x.com/Postsiva", label: "X" },
  { Icon: Instagram, href: "https://www.instagram.com/postsiva/", label: "Instagram" },
  {
    Icon: Facebook,
    href: "https://www.facebook.com/profile.php?id=61587174115716",
    label: "Facebook",
  },
] as const;

const SERVICES = [
  { label: "Web Development", href: "#services" },
  { label: "Mobile Apps", href: "#services" },
  { label: "UI/UX Design", href: "#services" },
  { label: "Custom Software", href: "#services" },
] as const;

const COMPANY = [
  { name: "Our Work", href: "#projects" },
  { name: "Technology", href: "#tech-stack" },
  { name: "Our Team", href: "#team" },
  { name: "FAQs", href: "#faq" },
  { name: "Contact", href: "#contact" },
] as const;

const linkClass =
  "text-sm font-medium text-white/55 transition-colors duration-300 hover:text-[var(--accent-copper-light)]";

export const Footer = () => {
  return (
    <footer className="relative isolate w-full min-w-full bg-[#030303] pb-10 pt-14 sm:pb-12 sm:pt-16">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(251,146,60,0.06) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-10 xl:px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 grid w-full grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-16"
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <PostsivaLogo
              size="lg"
              href="/"
              className="mb-6 inline-block [&_span:last-child]:text-xl sm:[&_span:last-child]:text-2xl"
            />
            <p className="mb-6 max-w-md text-sm leading-relaxed text-white/50">
              Premium digital products with technical excellence—web, mobile, automation, and
              AI-ready platforms built to scale.
            </p>

            <div className="flex flex-wrap gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300"
                  style={{
                    borderColor: "var(--accent-copper-border)",
                    background: "var(--accent-copper-bg)",
                    color: "var(--accent-copper-light)",
                  }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>

            <a
              href="https://postsiva.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors"
              style={{ color: "var(--accent-amber)" }}
            >
              Explore Postsiva product
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Services */}
          <div>
            <h4
              className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: "var(--accent-copper)" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: "var(--accent-copper)" }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {COMPANY.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className={linkClass}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4
              className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: "var(--accent-copper)" }}
            >
              Stay updated
            </h4>
            <p className="mb-4 text-sm leading-relaxed text-white/50">
              Tech insights and product updates—no spam.
            </p>
            <div className="relative max-w-md lg:max-w-none">
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full rounded-xl border bg-[#0a0a0a] py-3 pl-4 pr-14 text-sm font-medium text-white placeholder:text-white/35 focus:outline-none focus:ring-2"
                style={{ borderColor: "var(--accent-copper-border)" }}
              />
              <motion.button
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Subscribe"
                className="absolute right-1.5 top-1.5 bottom-1.5 flex items-center justify-center rounded-lg px-3 text-black"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
                }}
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[10px] text-white/35">
              <Sparkles className="h-3 w-3" style={{ color: "var(--accent-amber)" }} />
              Coming soon — join the list
            </p>
          </div>
        </motion.div>

        {/* Bottom bar — full width within shell */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
          className="flex w-full flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row"
        >
          <p className="text-center text-xs font-medium text-white/45 sm:text-left">
            © {new Date().getFullYear()} Postsiva Tech. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <Link
              href="https://privacy-policy.postsiva.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-white/50 transition-colors hover:text-[var(--accent-copper-light)]"
            >
              Privacy Policy
            </Link>
            <Link
              href="https://terms.postsiva.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-white/50 transition-colors hover:text-[var(--accent-copper-light)]"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
