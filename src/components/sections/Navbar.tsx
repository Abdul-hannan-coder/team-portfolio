"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { PostsivaLogo, POSTSIVA_LOGO_SRC } from "../brand/PostsivaLogo";

const POSTSIVA_PRODUCT_URL = "https://postsiva.com/";

function ProductMenu({ compact }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => !compact && setOpen(true)}
      onMouseLeave={() => !compact && setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-white font-semibold transition-colors hover:text-[var(--accent-copper-light)]"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Product
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 min-w-[200px] rounded-2xl border bg-black/95 p-2 shadow-xl backdrop-blur-md ${
              compact ? "right-0 top-full mt-2" : "left-1/2 top-full mt-3 -translate-x-1/2"
            }`}
            style={{ borderColor: "var(--accent-copper-border)" }}
          >
            <p
              className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "var(--accent-copper)" }}
            >
              Our product
            </p>
            <a
              href={POSTSIVA_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-white transition-colors hover:bg-[var(--accent-copper-bg)]"
            >
              <span
                className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white/5"
                style={{ boxShadow: "inset 0 0 0 1px var(--accent-copper-border)" }}
              >
                <Image
                  src={POSTSIVA_LOGO_SRC}
                  alt=""
                  width={36}
                  height={36}
                  className="h-full w-full object-contain p-0.5"
                />
              </span>
              <span>
                <span className="block font-bold tracking-tight">Postsiva</span>
                <span className="block text-xs text-white/50">postsiva.com</span>
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Team", href: "#team" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-6xl transition-all duration-500 rounded-full border backdrop-blur-md flex items-center justify-between px-4 sm:px-6 py-2 ${
          scrolled
            ? "bg-black/60 scale-[0.98] shadow-[0_8px_32px_var(--accent-amber-glow)]"
            : "bg-black/50"
        }`}
        style={{ borderColor: "var(--accent-copper-border)" }}
      >
        {/* Left Side: Logo */}
        <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400 }}>
          <PostsivaLogo size="md" />
        </motion.div>

        {/* Nav links + product (Postsiva → postsiva.com) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white font-semibold transition-colors hover:text-[var(--accent-copper-light)]"
            >
              {link.name}
            </Link>
          ))}
          <ProductMenu />
        </div>

        {/* Right Side: Contact Us (desktop) + hamburger (mobile) */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="hidden md:block"
          >
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold text-black shadow-[0_4px_20px_var(--accent-amber-glow)] transition-all hover:brightness-110 sm:text-base"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
              }}
            >
              Contact Us
            </Link>
          </motion.div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border text-white transition-colors hover:bg-white/10 md:hidden"
            style={{
              borderColor: "var(--accent-copper-border)",
              background: "var(--accent-copper-bg)",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="h-5 w-5" style={{ color: "var(--accent-amber)" }} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-2 w-full max-w-6xl overflow-hidden rounded-2xl border bg-black/95 p-3 shadow-2xl backdrop-blur-md md:hidden"
            style={{
              borderColor: "var(--accent-copper-border)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
              }}
            />
            <div className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 font-semibold text-white transition-colors hover:bg-[var(--accent-copper-bg)] hover:text-[var(--accent-copper-light)]"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.a
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.05 }}
                href={POSTSIVA_PRODUCT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 font-semibold text-white transition-colors hover:bg-[var(--accent-copper-bg)] hover:text-[var(--accent-copper-light)]"
              >
                Product
                <ArrowUpRight className="h-4 w-4" style={{ color: "var(--accent-amber)" }} />
              </motion.a>

              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.05 }}
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
                }}
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
