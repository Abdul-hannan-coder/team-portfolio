"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Quote, ExternalLink, Star } from "lucide-react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    text: string;
    author: string;
    rating: number;
    platform: string;
    country: string;
    link: string;
  }[];
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
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
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
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-6 sm:gap-5 sm:py-8",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="group relative flex h-full w-[240px] shrink-0 flex-col rounded-2xl border p-5 shadow-lg transition-all duration-300 hover:-translate-y-2 sm:w-[280px] sm:p-6"
            style={{
              borderColor: "var(--accent-copper-border)",
              background: "rgba(10,10,10,0.95)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}
            key={item.author + idx}
          >
            <div className="absolute -left-2 -top-2 z-10 flex h-8 w-8 rotate-[-8deg] items-center justify-center rounded-xl bg-white text-black shadow-md transition-transform duration-300 group-hover:rotate-0">
              <Quote className="h-4 w-4" />
            </div>

            <div className="absolute right-4 top-4 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full border text-white/80 transition-all hover:text-white"
                style={{
                  borderColor: "var(--accent-copper-border)",
                  background: "var(--accent-copper-bg)",
                }}
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mb-3 flex gap-1">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <div className="grow">
              <p className="relative mb-4 text-sm font-semibold italic leading-relaxed text-white/90 sm:text-[15px]">
                <span className="relative z-10">&quot;{item.text}&quot;</span>
              </p>
            </div>

            <div
              className="flex items-center gap-3 border-t pt-4"
              style={{ borderColor: "var(--accent-copper-border)" }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ background: "var(--accent-copper-bg)" }}
              >
                {item.author[0]}
              </div>
              <div className="min-w-0 text-left">
                <div className="truncate text-sm font-bold leading-tight tracking-tight text-white">
                  {item.author}
                </div>
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                  {item.country}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
