"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ShinyButton } from "../ui/shiny-button";
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
        className="flex items-center gap-1 text-white font-semibold hover:text-white/90 transition-colors"
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
            className={`absolute z-50 min-w-[200px] rounded-2xl border border-white/15 bg-black/95 p-2 shadow-xl backdrop-blur-md ${
              compact ? "right-0 top-full mt-2" : "left-1/2 top-full mt-3 -translate-x-1/2"
            }`}
          >
            <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
              Our product
            </p>
            <a
              href={POSTSIVA_PRODUCT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-white transition-colors hover:bg-white/10"
            >
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white/5 ring-1 ring-white/15">
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Team", href: "#team" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-6xl transition-all duration-500 rounded-full border border-white/20 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 py-2 ${
          scrolled
            ? "bg-black/50 shadow-2xl shadow-[rgba(255, 255, 255,0.05)] scale-[0.98] border-[#ffffff]/10"
            : "bg-black/50"
        }`}
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
              className="text-white font-semibold hover:text-white/90 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <ProductMenu />
        </div>

        <div className="md:hidden">
          <ProductMenu compact />
        </div>

        {/* Right Side: Contact Us */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <ShinyButton href="#contact" className="text-sm sm:text-base">
              Contact Us
            </ShinyButton>
          </motion.div>
        </div>
      </motion.nav>
    </div>
  );
};
