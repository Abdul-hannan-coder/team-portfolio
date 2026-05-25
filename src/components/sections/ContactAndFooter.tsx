"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, ChevronDown, Sparkles } from "lucide-react";
import { Footer } from "./Footer";

const EASE = [0.22, 1, 0.36, 1] as const;

const subjects = [
  "Web Development",
  "Mobile App Development",
  "UI/UX Design",
  "Consultation",
  "Other",
];

const inputClass =
  "w-full rounded-xl border bg-[#0a0a0a] px-4 py-3 text-sm font-medium text-white placeholder:text-white/35 transition-all focus:outline-none focus:ring-2";

export const ContactAndFooter = () => {
  const [subject, setSubject] = useState("Web Development");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error?.message ?? data.error ?? "Failed to send");
        return;
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <section
        id="contact"
        className="relative isolate overflow-hidden border-t border-white/[0.06] bg-[#030303] pt-16 pb-20 sm:pt-20 sm:pb-24"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 80% 20%, rgba(251,146,60,0.06) 0%, transparent 50%), radial-gradient(ellipse 40% 35% at 10% 80%, rgba(212,165,116,0.05) 0%, transparent 50%)",
          }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
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
              Get in touch
            </div>

            <h2 className="mb-3 text-xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Ready to start your{" "}
              <span
                className="bg-clip-text text-transparent [-webkit-background-clip:text]"
                style={{
                  backgroundImage:
                    "linear-gradient(100deg, var(--accent-copper-light), var(--accent-amber))",
                }}
              >
                next project?
              </span>
            </h2>

            <p className="text-sm leading-relaxed text-white/55 sm:text-base">
              Share your goals—we&apos;ll help you scope, build, and ship with clarity.
            </p>
          </motion.header>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE }}
            className="mx-auto flex max-w-[48rem] flex-col overflow-hidden rounded-2xl border lg:max-w-5xl lg:flex-row"
            style={{ borderColor: "var(--accent-copper-border)" }}
          >
            {/* Info */}
            <div className="relative overflow-hidden bg-zinc-950/95 p-8 sm:p-10 lg:w-[40%]">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[80px]"
                style={{ background: "rgba(251,146,60,0.1)" }}
              />

              <div className="relative z-10">
                <h3 className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Let&apos;s build something{" "}
                  <span
                    className="bg-clip-text text-transparent [-webkit-background-clip:text]"
                    style={{
                      backgroundImage:
                        "linear-gradient(100deg, var(--accent-copper-light), var(--accent-amber))",
                    }}
                  >
                    amazing
                  </span>
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-white/55">
                  Have a project in mind or need a long-term partner? We&apos;re ready to help you
                  scale.
                </p>

                <ul className="space-y-5">
                  {[
                    { icon: Mail, label: "Email us", value: "info@postsiva.com" },
                    { icon: Phone, label: "Call us", value: "+(92) 323 6891550" },
                    { icon: MapPin, label: "Visit us", value: "Islamabad, Pakistan" },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center gap-4">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{
                          background: "var(--accent-copper-bg)",
                          border: "1px solid var(--accent-copper-border)",
                          color: "var(--accent-amber)",
                        }}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-white">{item.value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="border-t border-white/[0.06] bg-[#0a0a0a]/80 p-8 sm:p-10 lg:w-[60%] lg:border-t-0 lg:border-l">
              <form className="space-y-5" onSubmit={handleSubmit}>
                {status === "success" && (
                  <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-center text-sm font-semibold text-emerald-400">
                    Message sent. We&apos;ll get back to you soon.
                  </p>
                )}
                {status === "error" && errorMessage && (
                  <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-center text-sm font-semibold text-red-400">
                    {errorMessage}
                  </p>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                      Full name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={inputClass}
                      style={
                        {
                          borderColor: "var(--accent-copper-border)",
                          "--tw-ring-color": "var(--accent-amber-glow)",
                        } as React.CSSProperties
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                      Email address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className={inputClass}
                      style={{ borderColor: "var(--accent-copper-border)" }}
                    />
                  </div>
                </div>

                <div className="relative space-y-2" ref={dropdownRef}>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                    Subject
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`${inputClass} flex items-center justify-between text-left`}
                    style={{ borderColor: "var(--accent-copper-border)" }}
                  >
                    <span>{subject}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-white/50 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 z-50 mt-1 overflow-hidden rounded-xl border py-1 shadow-xl"
                        style={{
                          borderColor: "var(--accent-copper-border)",
                          background: "#0a0a0a",
                        }}
                      >
                        {subjects.map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => {
                              setSubject(item);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm font-semibold transition-colors"
                            style={{
                              color: subject === item ? "#0a0a0a" : "var(--accent-copper-light)",
                              background:
                                subject === item
                                  ? "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))"
                                  : "transparent",
                            }}
                          >
                            {item}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                    Your message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className={`${inputClass} resize-none`}
                    style={{ borderColor: "var(--accent-copper-border)" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-black transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
                  }}
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};
