"use client";

import { useState } from "react";

import { DemoStepDetailPanel } from "@/components/platform/demo-step-detail-panel";
import { HUB_EXPERIENCE_CARDS } from "@/lib/platform";

export function DemosStepRail() {
  const [index, setIndex] = useState(0);
  const active = HUB_EXPERIENCE_CARDS[index];

  return (
    <>
      <div className="relative">
        <div
          className="platform-signal-line absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent md:block"
          aria-hidden
        />
        <ol
          className="flex gap-2 overflow-x-auto pb-2 md:justify-between md:gap-0 md:overflow-visible md:pb-0"
          role="tablist"
          aria-label="Demo walkthrough steps"
        >
          {HUB_EXPERIENCE_CARDS.map((card, i) => {
            const isActive = i === index;
            return (
              <li key={card.slug} className="shrink-0 md:flex-1 md:text-center">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`demo-panel-${card.slug}`}
                  id={`demo-tab-${card.slug}`}
                  onClick={() => setIndex(i)}
                  className={`group flex flex-col items-center gap-2 px-2 py-1 transition md:px-3 ${
                    isActive ? "text-secondary" : "text-platform-muted hover:text-white"
                  }`}
                >
                  <span
                    className={`flex size-10 items-center justify-center rounded-full border text-sm font-semibold transition ${
                      isActive
                        ? "border-secondary bg-secondary/15 text-secondary"
                        : "border-white/15 bg-white/5 group-hover:border-white/30"
                    }`}
                  >
                    {card.number}
                  </span>
                  <span className="hidden max-w-[7rem] text-xs leading-4 md:block">
                    {card.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div
        id={`demo-panel-${active.slug}`}
        role="tabpanel"
        aria-labelledby={`demo-tab-${active.slug}`}
        className="mt-10"
      >
        <DemoStepDetailPanel card={active} />
      </div>
    </>
  );
}
