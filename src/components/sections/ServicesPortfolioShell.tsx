"use client";

import { DiagonalRibbonLines } from "@/components/ui/DiagonalRibbonLines";

/**
 * Wraps Services + Portfolio so diagonal ribbon lines share one coordinate
 * space and continue seamlessly across the section boundary.
 */
export function ServicesPortfolioShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate bg-[#030303]">
      <DiagonalRibbonLines className="z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
