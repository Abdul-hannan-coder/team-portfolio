"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  Target,
  Play,
  FileText,
  Images,
  Quote,
  User,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import type { Project } from "@/lib/project-data";

const EASE = [0.22, 1, 0.36, 1] as const;
const FALLBACK_IMAGE = "/hero-section2.png";

interface CaseStudyContentProps {
  project: Project;
}

/** Renders a demo video from either an embed URL or a raw HTML embed block. */
function VideoEmbed({ video, title }: { video: string; title: string }) {
  if (video.trim().startsWith("<")) {
    return (
      <div
        className="overflow-hidden rounded-2xl border [&_iframe]:rounded-2xl"
        style={{ borderColor: "var(--accent-copper-border)" }}
        dangerouslySetInnerHTML={{ __html: video }}
      />
    );
  }
  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-black"
      style={{ borderColor: "var(--accent-copper-border)" }}
    >
      <iframe
        src={video}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        allowFullScreen
      />
    </div>
  );
}

function GalleryImage({
  src,
  alt,
  onOpen,
}: {
  src: string;
  alt: string;
  onOpen: () => void;
}) {
  const [current, setCurrent] = useState(src);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-2xl border bg-zinc-900"
      style={{ borderColor: "var(--accent-copper-border)" }}
    >
      <Image
        src={current}
        alt={alt}
        fill
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        sizes="(max-width: 768px) 100vw, 50vw"
        onError={() => setCurrent(FALLBACK_IMAGE)}
      />
      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
      <span
        className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg border opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"
        style={{
          borderColor: "var(--accent-amber-border)",
          background: "rgba(0,0,0,0.6)",
          color: "var(--accent-amber)",
        }}
      >
        <Images className="h-4 w-4" />
      </span>
    </button>
  );
}

/** Full-screen image preview with keyboard + arrow navigation. */
function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: { url: string }[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const total = images.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((index - 1 + total) % total);
      if (e.key === "ArrowRight") onNavigate((index + 1) % total);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, total, onClose, onNavigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition-colors hover:bg-white/10 sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + total) % total);
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition-colors hover:bg-white/10 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % total);
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white transition-colors hover:bg-white/10 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative h-[82vh] w-[92vw] max-w-6xl"
      >
        <Image
          src={images[index].url}
          alt={`Preview ${index + 1}`}
          fill
          className="object-contain"
          sizes="92vw"
          priority
        />
      </motion.div>

      {total > 1 && (
        <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-semibold text-white/80">
          {index + 1} / {total}
        </span>
      )}
    </motion.div>
  );
}

/** Section heading with an amber icon chip. */
function SectionHeading({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl border"
        style={{
          borderColor: "var(--accent-copper-border)",
          background: "var(--accent-copper-bg)",
          color: "var(--accent-amber)",
        }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{children}</h2>
    </div>
  );
}

export function CaseStudyContent({ project }: CaseStudyContentProps) {
  const isLive = /live/i.test(project.duration ?? "");
  const galleryImages = project.media.filter((m) => m.type === "image");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#030303]">
      <div className="pointer-events-none fixed inset-0 grid-bg" aria-hidden />
      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
          <Link
            href="/portfolio"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-[var(--accent-copper-light)]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Link>

          {/* Hero */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative overflow-hidden rounded-2xl border bg-zinc-950/80 p-6 backdrop-blur-sm sm:p-9"
            style={{
              borderColor: "var(--accent-copper-border)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--accent-copper), var(--accent-amber), transparent)",
              }}
            />

            <span
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
              style={{
                borderColor: "var(--accent-amber-border)",
                background: "var(--accent-amber-bg)",
                color: "var(--accent-amber)",
              }}
            >
              {isLive ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                      style={{ background: "var(--accent-amber)" }}
                    />
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full"
                      style={{ background: "var(--accent-amber)" }}
                    />
                  </span>
                  Live Project
                </>
              ) : (
                <>
                  <Sparkles className="h-3 w-3" />
                  {project.category}
                </>
              )}
            </span>

            <h1 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>

            <p className="mb-7 max-w-3xl text-base leading-relaxed text-white/65 sm:text-lg">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
                  }}
                >
                  Visit Live Site
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.video && (
                <a
                  href="#demo-video"
                  className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/[0.06]"
                  style={{ borderColor: "var(--accent-copper-border)" }}
                >
                  <Play className="h-4 w-4" style={{ color: "var(--accent-amber)" }} />
                  Watch Demo
                </a>
              )}
            </div>
          </motion.section>

          {/* Detailed Overview + Project Details */}
          <section className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <SectionHeading icon={FileText}>Detailed Overview</SectionHeading>
              <p className="whitespace-pre-line text-[15px] leading-relaxed text-white/70">
                {project.fullDescription}
              </p>
            </div>

            <aside className="lg:col-span-1">
              <div
                className="sticky top-28 rounded-2xl border bg-zinc-950/80 p-6 backdrop-blur-sm"
                style={{ borderColor: "var(--accent-copper-border)" }}
              >
                <h3
                  className="mb-6 text-[11px] font-bold uppercase tracking-[0.18em]"
                  style={{ color: "var(--accent-copper)" }}
                >
                  Project Details
                </h3>
                <div className="space-y-6">
                  {project.client && (
                    <div>
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                        Client
                      </p>
                      <p className="flex items-center gap-2 text-sm font-bold text-white">
                        <User className="h-4 w-4" style={{ color: "var(--accent-amber)" }} />
                        {project.client}
                      </p>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                        Duration
                      </p>
                      <p className="flex items-center gap-2 text-sm font-bold text-white">
                        <Clock className="h-4 w-4" style={{ color: "var(--accent-amber)" }} />
                        {project.duration}
                      </p>
                    </div>
                  )}
                  {project.tech.length > 0 && (
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border px-2 py-0.5 text-[11px] font-medium text-white/75"
                            style={{
                              borderColor: "var(--accent-copper-border)",
                              background: "var(--accent-copper-bg)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </section>

          {/* Key Objectives */}
          {project.results.length > 0 && (
            <section className="mt-16">
              <SectionHeading icon={Target}>Key Objectives</SectionHeading>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.results.map((objective, i) => {
                  const words = objective.split(/\s+/);
                  const title = words.slice(0, 3).join(" ");
                  const body = words.slice(3).join(" ");
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: (i % 3) * 0.05, ease: EASE }}
                      className="rounded-2xl border bg-zinc-950/70 p-5 transition-colors hover:border-[color:var(--accent-copper-border)]"
                      style={{ borderColor: "rgba(255,255,255,0.07)" }}
                    >
                      <CheckCircle2
                        className="mb-3 h-5 w-5"
                        style={{ color: "var(--accent-amber)" }}
                      />
                      <h3 className="mb-1.5 text-base font-bold leading-snug text-white">
                        {title}
                      </h3>
                      {body && (
                        <p className="text-sm leading-relaxed text-white/55">{body}</p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Key Highlights */}
          {project.features.length > 0 && (
            <section className="mt-16">
              <SectionHeading icon={Sparkles}>Key Highlights</SectionHeading>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border bg-zinc-950/70 p-5"
                    style={{ borderColor: "rgba(255,255,255,0.07)" }}
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color: "var(--accent-amber)" }}
                    />
                    <span className="text-sm leading-relaxed text-white/70">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Demo Video */}
          {project.video && (
            <section id="demo-video" className="mt-16 scroll-mt-28">
              <SectionHeading icon={Play}>Demo Video</SectionHeading>
              <VideoEmbed video={project.video} title={project.title} />
            </section>
          )}

          {/* Project Gallery */}
          {galleryImages.length > 0 && (
            <section className="mt-16">
              <SectionHeading icon={Images}>Project Gallery</SectionHeading>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {galleryImages.map((m, i) => (
                  <GalleryImage
                    key={i}
                    src={m.url}
                    alt={`${project.title} screenshot ${i + 1}`}
                    onOpen={() => setLightboxIndex(i)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Testimonial */}
          {project.feedback && (
            <section className="mt-20">
              <p
                className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--accent-copper)" }}
              >
                Testimonial
              </p>
              <div className="mx-auto max-w-3xl text-center">
                <Quote
                  className="mx-auto mb-5 h-9 w-9 -scale-x-100"
                  style={{ color: "var(--accent-amber)" }}
                />
                <p className="text-xl font-medium italic leading-relaxed text-white sm:text-2xl">
                  &ldquo;{project.feedback}&rdquo;
                </p>
                {project.client && (
                  <p className="mt-6 text-sm font-bold text-white">{project.client}</p>
                )}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="mt-20">
            <div
              className="relative overflow-hidden rounded-2xl border p-8 sm:p-12"
              style={{
                borderColor: "var(--accent-amber-border)",
                background:
                  "linear-gradient(135deg, var(--accent-copper-bg), var(--accent-amber-bg))",
              }}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
                style={{ background: "var(--accent-amber-glow)" }}
              />
              <div className="relative z-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <h2 className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    Ready to build something like this?
                  </h2>
                  <p className="max-w-xl text-sm leading-relaxed text-white/65">
                    Let&apos;s discuss how we can bring your vision to life with high-performance
                    automation and bespoke product engineering.
                  </p>
                </div>
                <Link
                  href="/#contact"
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
                  }}
                >
                  Start a Conversation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={galleryImages}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
