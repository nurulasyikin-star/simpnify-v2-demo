"use client";

import type { ComponentType } from "react";
import { createElement, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { DemosStepVariantId } from "@/components/demos-step-variants-meta";
import { DemoStepDetailPanel } from "@/components/platform/demo-step-detail-panel";
import { DemosStepRail } from "@/components/platform/demos-step-rail";
import { HubCardGrid } from "@/components/platform/hub-card-grid";
import { HUB_EXPERIENCE_CARDS } from "@/lib/platform";

export type { DemosStepVariantId } from "@/components/demos-step-variants-meta";

function DemosPageContext({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col bg-[var(--platform-surface)]">
      <div className="border-b border-white/10 px-6 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            FEATURES
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
            Experience the app
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-platform-muted">
            Screenshot-based walkthroughs from the industrial platform
            presentation. Each feature follows a documented product workflow with
            sample data.
          </p>
        </div>
      </div>
      <div className="px-6 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    </div>
  );
}

function useStepIndex(count: number, initial = 0) {
  const [index, setIndex] = useState(initial);
  const go = (next: number) =>
    setIndex((next + count) % count);
  return { index, setIndex, goPrev: () => go(index - 1), goNext: () => go(index + 1) };
}

export function DemosStepVariantCurrent() {
  return (
    <DemosPageContext>
      <HubCardGrid cards={HUB_EXPERIENCE_CARDS} columns={2} />
    </DemosPageContext>
  );
}

export function DemosStepVariantHorizontalRail() {
  return (
    <DemosPageContext>
      <DemosStepRail />
    </DemosPageContext>
  );
}

export function DemosStepVariantVerticalTimeline() {
  const { index, setIndex } = useStepIndex(HUB_EXPERIENCE_CARDS.length);
  const active = HUB_EXPERIENCE_CARDS[index];

  return (
    <DemosPageContext>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-12">
        <ol className="relative flex flex-col gap-1 border-l border-white/10 pl-6 lg:pl-8">
          {HUB_EXPERIENCE_CARDS.map((card, i) => {
            const isActive = i === index;
            const isPast = i < index;
            return (
              <li key={card.slug} className="relative">
                <span
                  className={`absolute -left-[1.65rem] top-3 size-2.5 rounded-full ring-4 ring-[var(--platform-surface)] lg:-left-[2.15rem] ${
                    isActive
                      ? "bg-secondary"
                      : isPast
                        ? "bg-secondary/50"
                        : "bg-white/20"
                  }`}
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`w-full rounded-lg px-3 py-3 text-left transition ${
                    isActive
                      ? "bg-secondary/10 text-white"
                      : "text-platform-muted hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="text-xs font-semibold text-secondary">
                    {card.number}
                  </span>
                  <span className="mt-1 block text-sm font-semibold">
                    {card.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <DemoStepDetailPanel card={active} />
      </div>
    </DemosPageContext>
  );
}

export function DemosStepVariantPillStrip() {
  const { index, setIndex, goPrev, goNext } = useStepIndex(
    HUB_EXPERIENCE_CARDS.length,
  );
  const active = HUB_EXPERIENCE_CARDS[index];

  return (
    <DemosPageContext>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goPrev}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-platform-muted transition hover:border-secondary/40 hover:text-secondary"
            aria-label="Previous demo"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>

          <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">
            {HUB_EXPERIENCE_CARDS.map((card, i) => {
              const isActive = i === index;
              return (
                <button
                  key={card.slug}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    isActive
                      ? "border-secondary bg-secondary/15 text-secondary"
                      : "border-white/10 bg-white/5 text-platform-muted hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span className="font-semibold">{card.number}</span>
                  <span className="ml-1.5 hidden sm:inline">{card.title}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-platform-muted transition hover:border-secondary/40 hover:text-secondary"
            aria-label="Next demo"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </div>

        <p className="text-center text-xs text-platform-subtle">
          Step {active.number} of {String(HUB_EXPERIENCE_CARDS.length).padStart(2, "0")}
        </p>

        <DemoStepDetailPanel card={active} />
      </div>
    </DemosPageContext>
  );
}

export function DemosStepVariantSplitMasterDetail() {
  const { index, setIndex } = useStepIndex(HUB_EXPERIENCE_CARDS.length);
  const active = HUB_EXPERIENCE_CARDS[index];

  return (
    <DemosPageContext>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-8">
        <ul className="flex flex-col gap-1 rounded-xl border border-white/10 bg-[#0c1a22]/40 p-2">
          {HUB_EXPERIENCE_CARDS.map((card, i) => {
            const isActive = i === index;
            return (
              <li key={card.slug}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                    isActive
                      ? "bg-secondary/10 text-white"
                      : "text-platform-muted hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className="mt-0.5 text-xs font-semibold text-secondary">
                    {card.number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold leading-5">
                      {card.title}
                    </span>
                    {isActive && card.outcome ? (
                      <span className="mt-1 block text-xs leading-5 text-platform-muted">
                        {card.outcome}
                      </span>
                    ) : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <DemoStepDetailPanel card={active} />
      </div>
    </DemosPageContext>
  );
}

const variantMap: Record<DemosStepVariantId, ComponentType> = {
  current: DemosStepVariantCurrent,
  "horizontal-rail": DemosStepVariantHorizontalRail,
  "vertical-timeline": DemosStepVariantVerticalTimeline,
  "pill-strip": DemosStepVariantPillStrip,
  "split-master-detail": DemosStepVariantSplitMasterDetail,
};

export function DemosStepVariant({ id }: { id: DemosStepVariantId }) {
  return createElement(variantMap[id]);
}
