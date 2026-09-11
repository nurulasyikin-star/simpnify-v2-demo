"use client";

import { useState } from "react";
import { Award, Target, Telescope } from "lucide-react";

import { cn } from "@/lib/utils";

export const PLEDGES = [
  {
    id: "vision",
    label: "OUR VISION",
    headline: "Trusted global infrastructure",
    body:
      "To be the trusted provider of unified security infrastructure and command & control for governments and corporations operating critical sites worldwide.",
    icon: Telescope,
  },
  {
    id: "mission",
    label: "OUR MISSION",
    headline: "One operational story",
    body:
      "Connect signals, people, procedures and evidence in one operational story — from the first alert through coordinated response to accountable closure.",
    icon: Target,
  },
  {
    id: "quality",
    label: "QUALITY COMMITMENT",
    headline: "Built for long-term operability",
    body:
      "Meet client requirements with innovative practices, qualified integrations and technology chosen for long-term operability — not short-term demos.",
    icon: Award,
  },
] as const;

export function AboutPledgeSpotlight() {
  const [active, setActive] = useState(0);

  return (
    <div
      className="flex flex-col gap-3 lg:flex-row lg:gap-2"
      role="tablist"
      aria-label="Company pledges"
      onMouseLeave={() => setActive(0)}
    >
      {PLEDGES.map(({ id, label, headline, body, icon: Icon }, i) => {
        const isActive = i === active;
        return (
          <article
            key={id}
            role="tab"
            aria-selected={isActive}
            tabIndex={0}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setActive(i);
            }}
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 ease-out",
              isActive
                ? "border-secondary/50 bg-gradient-to-br from-[#0c1a22] to-[#0a1520] shadow-[0_0_40px_-12px_rgba(93,212,232,0.45)] lg:flex-[2.2]"
                : "border-white/10 bg-[#0c1a22]/60 hover:border-white/20 lg:flex-1",
            )}
          >
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500",
                isActive && "opacity-100",
              )}
              aria-hidden
            />
            <div className="relative flex h-full flex-col p-5 md:p-6">
              <div className="flex items-center justify-between gap-2">
                <Icon
                  className={cn(
                    "size-5 shrink-0 transition-colors",
                    isActive ? "text-secondary" : "text-platform-subtle",
                  )}
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span
                  className={cn(
                    "text-[10px] font-semibold tracking-[0.15em] transition-colors",
                    isActive ? "text-secondary" : "text-platform-subtle",
                  )}
                >
                  {label}
                </span>
              </div>
              <h3
                className={cn(
                  "mt-4 font-semibold leading-snug transition-all duration-500",
                  isActive
                    ? "text-lg text-white md:text-xl"
                    : "text-sm text-platform-muted line-clamp-2",
                )}
              >
                {isActive ? headline : label}
              </h3>
              <p
                className={cn(
                  "mt-3 text-sm leading-6 text-platform-muted transition-all duration-500",
                  isActive
                    ? "max-h-40 opacity-100"
                    : "max-h-0 overflow-hidden opacity-0 lg:max-h-0",
                )}
              >
                {body}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
