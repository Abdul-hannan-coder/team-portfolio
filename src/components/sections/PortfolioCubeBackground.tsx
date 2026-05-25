"use client";

import { CubeField } from "@/components/ui/CubeField";

/** Cube city on the right — leaves left ribbon lines visible from ServicesPortfolioShell */
export function PortfolioCubeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-y-0 right-[-8%] w-[min(100%,920px)]"
        style={{
          maskImage: "linear-gradient(to left, black 35%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to left, black 35%, transparent 92%)",
        }}
      >
        <CubeField
          variant="portfolio"
          backgroundImage="/projects/projects-cube-bg.png"
          transparentBase
        />
      </div>

      <div className="absolute inset-x-0 top-0 z-[1] h-28 bg-gradient-to-b from-[#030303] to-transparent" />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, #030303 0%, rgba(3,3,3,0.85) 28%, transparent 58%), radial-gradient(ellipse 50% 40% at 75% 60%, rgba(251,146,60,0.06) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}
