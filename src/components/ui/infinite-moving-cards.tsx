"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";

type Testimonial = {
  text: string;
  name: string;
  role: string;
  image?: string;
};

function Avatar({ image, name }: { image?: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (!image || failed) {
    return (
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{
          background: "var(--accent-copper-bg)",
          boxShadow: "inset 0 0 0 1px var(--accent-copper-border)",
        }}
      >
        {initials}
      </span>
    );
  }

  return (
    <span
      className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full"
      style={{ boxShadow: "inset 0 0 0 1px var(--accent-copper-border)" }}
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover"
        sizes="48px"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: Testimonial[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "30s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "55s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "90s");
      }
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-5 py-6 sm:gap-6 sm:py-8",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="group relative flex h-full w-[330px] shrink-0 flex-col rounded-2xl border p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 sm:w-[400px] sm:p-8"
            style={{
              borderColor: "var(--accent-copper-border)",
              background: "rgba(10,10,10,0.95)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
            key={item.name + idx}
          >
            <div
              className="absolute -left-2 -top-2 z-10 flex h-9 w-9 rotate-[-8deg] items-center justify-center rounded-xl text-black shadow-md transition-transform duration-300 group-hover:rotate-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-copper-light), var(--accent-amber))",
              }}
            >
              <Quote className="h-4 w-4" />
            </div>

            <div className="grow">
              <p className="relative mb-6 text-base font-medium italic leading-relaxed text-white/90 sm:text-lg">
                <span className="relative z-10">&quot;{item.text}&quot;</span>
              </p>
            </div>

            <div
              className="flex items-center gap-3.5 border-t pt-5"
              style={{ borderColor: "var(--accent-copper-border)" }}
            >
              <Avatar image={item.image} name={item.name} />
              <div className="min-w-0 text-left">
                <div className="truncate text-base font-bold leading-tight tracking-tight text-white">
                  {item.name}
                </div>
                <div className="mt-0.5 truncate text-xs font-semibold text-white/50">
                  {item.role}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
