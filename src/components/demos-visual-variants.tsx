"use client";

import type { ComponentType } from "react";
import { createElement, useState } from "react";
import { PlatformImage } from "@/components/platform-image";

import type { DemosVisualVariantId } from "@/components/demos-visual-variants-meta";
import {
  DemoStepDetailContent,
  formatDemoStepLabel,
} from "@/components/platform/demo-step-detail-panel";
import { DemosStepRail } from "@/components/platform/demos-step-rail";
import { getDemoCardImage } from "@/lib/platform/demo-card-images";
import { HUB_EXPERIENCE_CARDS } from "@/lib/platform";
import type { HubCard } from "@/lib/platform/types";
import { cn } from "@/lib/utils";

export type { DemosVisualVariantId } from "@/components/demos-visual-variants-meta";

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

function DemoScreenshot({
  card,
  className,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: {
  card: HubCard;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const { src, alt } = getDemoCardImage(card);

  return (
    <PlatformImage
      src={src}
      alt={alt}
      fill
      className={cn("object-cover object-top", className)}
      sizes={sizes}
      priority={priority}
    />
  );
}

function useDemoStepIndex(initial = 0) {
  const [index, setIndex] = useState(initial);
  const active = HUB_EXPERIENCE_CARDS[index];
  return { index, setIndex, active };
}

function DemoStepRail({
  index,
  setIndex,
  variant = "numbered",
}: {
  index: number;
  setIndex: (index: number) => void;
  variant?: "numbered" | "thumbnail";
}) {
  return (
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
          const { src, alt } = getDemoCardImage(card);

          return (
            <li key={card.slug} className="shrink-0 md:flex-1 md:text-center">
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`demo-visual-panel-${card.slug}`}
                id={`demo-visual-tab-${card.slug}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "group flex flex-col items-center gap-2 px-2 py-1 transition md:px-3",
                  isActive ? "text-secondary" : "text-platform-muted hover:text-white",
                )}
              >
                {variant === "thumbnail" ? (
                  <span
                    className={cn(
                      "relative size-12 overflow-hidden rounded-full border-2 transition",
                      isActive
                        ? "border-secondary ring-2 ring-secondary/30"
                        : "border-white/15 group-hover:border-white/30",
                    )}
                  >
                    <PlatformImage
                      src={src}
                      alt=""
                      fill
                      className="object-cover object-top"
                      sizes="48px"
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "absolute inset-0 flex items-center justify-center bg-[#071318]/55 text-[10px] font-semibold text-white transition",
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                      )}
                    >
                      {card.number}
                    </span>
                  </span>
                ) : (
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full border text-sm font-semibold transition",
                      isActive
                        ? "border-secondary bg-secondary/15 text-secondary"
                        : "border-white/15 bg-white/5 group-hover:border-white/30",
                    )}
                  >
                    {card.number}
                  </span>
                )}
                <span className="hidden max-w-[7rem] text-xs leading-4 md:block">
                  {card.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function CrossfadeScreenshots({
  activeIndex,
  className,
}: {
  activeIndex: number;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-[#0d1418]", className)}>
      {HUB_EXPERIENCE_CARDS.map((card, i) => (
        <div
          key={card.slug}
          className={cn(
            "absolute inset-0 transition duration-500 ease-out motion-reduce:transition-none",
            i === activeIndex
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-[1.02] opacity-0",
          )}
          aria-hidden={i !== activeIndex}
        >
          <DemoScreenshot
            card={card}
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 420px"
          />
        </div>
      ))}
    </div>
  );
}

export function DemosVisualVariantCurrent() {
  return (
    <DemosPageContext>
      <DemosStepRail />
    </DemosPageContext>
  );
}

export function DemosVisualVariantSplitScreenshot() {
  const { index, setIndex, active } = useDemoStepIndex();

  return (
    <DemosPageContext>
      <DemoStepRail index={index} setIndex={setIndex} />

      <div
        id={`demo-visual-panel-${active.slug}`}
        role="tabpanel"
        aria-labelledby={`demo-visual-tab-${active.slug}`}
        className="mt-10"
      >
        <article
          key={active.slug}
          className="platform-hub-card animate-in fade-in slide-in-from-right-4 fill-mode-both duration-500 motion-reduce:animate-none"
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <DemoStepDetailContent card={active} />
            </div>
            <div className="platform-product-frame">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <CrossfadeScreenshots activeIndex={index} className="absolute inset-0 rounded-lg" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </DemosPageContext>
  );
}

export function DemosVisualVariantProductFrame() {
  const { index, setIndex, active } = useDemoStepIndex();

  return (
    <DemosPageContext>
      <DemoStepRail index={index} setIndex={setIndex} />

      <div
        id={`demo-visual-panel-${active.slug}`}
        role="tabpanel"
        aria-labelledby={`demo-visual-tab-${active.slug}`}
        className="mt-10"
      >
        <article
          key={active.slug}
          className="platform-hub-card animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500 motion-reduce:animate-none"
        >
          <div className="platform-product-frame mb-8">
            <span
              className="platform-scan-corner -left-1 -top-1 border-l-2 border-t-2"
              aria-hidden
            />
            <span
              className="platform-scan-corner -right-1 -top-1 border-r-2 border-t-2"
              aria-hidden
            />
            <span
              className="platform-scan-corner -bottom-1 -left-1 border-b-2 border-l-2"
              aria-hidden
            />
            <span
              className="platform-scan-corner -bottom-1 -right-1 border-b-2 border-r-2"
              aria-hidden
            />
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
              <CrossfadeScreenshots activeIndex={index} className="absolute inset-0 rounded-lg" />
            </div>
          </div>

          <DemoStepDetailContent card={active} />
        </article>
      </div>
    </DemosPageContext>
  );
}

export function DemosVisualVariantThumbnailRail() {
  const { index, setIndex, active } = useDemoStepIndex();

  return (
    <DemosPageContext>
      <DemoStepRail index={index} setIndex={setIndex} variant="thumbnail" />

      <div
        id={`demo-visual-panel-${active.slug}`}
        role="tabpanel"
        aria-labelledby={`demo-visual-tab-${active.slug}`}
        className="mt-10"
      >
        <article
          key={active.slug}
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c1a22]/60 animate-in fade-in slide-in-from-left-4 fill-mode-both duration-500 motion-reduce:animate-none"
        >
          <div className="relative aspect-[21/9] min-h-[200px] bg-[#0d1418] md:aspect-[2.4/1]">
            <CrossfadeScreenshots activeIndex={index} className="absolute inset-0" />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071318] via-[#071318]/40 to-transparent"
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                {formatDemoStepLabel(active.number)}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-white md:text-2xl">
                {active.title}
              </h3>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <DemoStepDetailContent card={active} />
          </div>
        </article>
      </div>
    </DemosPageContext>
  );
}

export function DemosVisualVariantCinematicBackdrop() {
  const { index, setIndex, active } = useDemoStepIndex();

  return (
    <DemosPageContext>
      <DemoStepRail index={index} setIndex={setIndex} />

      <div
        id={`demo-visual-panel-${active.slug}`}
        role="tabpanel"
        aria-labelledby={`demo-visual-tab-${active.slug}`}
        className="mt-10"
      >
        <article
          key={active.slug}
          className="relative min-h-[420px] overflow-hidden rounded-2xl border border-white/10 animate-in fade-in zoom-in-95 fill-mode-both duration-700 motion-reduce:animate-none md:min-h-[480px]"
        >
          <div className="absolute inset-0">
            {HUB_EXPERIENCE_CARDS.map((card, i) => (
              <div
                key={card.slug}
                className={cn(
                  "absolute inset-0 transition duration-700 ease-out motion-reduce:transition-none",
                  i === index ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                aria-hidden={i !== index}
              >
                <div
                  className={cn(
                    "relative h-full w-full",
                    i === index && "platform-ken-burns",
                  )}
                >
                  <DemoScreenshot
                    card={card}
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 900px"
                  />
                </div>
              </div>
            ))}
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#071318]/95 via-[#071318]/75 to-[#071318]/30"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#071318] via-transparent to-[#071318]/50"
              aria-hidden
            />
          </div>

          <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-end p-6 md:min-h-[480px] md:p-10 lg:max-w-xl">
            <div className="platform-glass-card">
              <DemoStepDetailContent card={active} />
            </div>
          </div>
        </article>
      </div>
    </DemosPageContext>
  );
}

const variantMap: Record<DemosVisualVariantId, ComponentType> = {
  current: DemosVisualVariantCurrent,
  "split-screenshot": DemosVisualVariantSplitScreenshot,
  "product-frame": DemosVisualVariantProductFrame,
  "thumbnail-rail": DemosVisualVariantThumbnailRail,
  "cinematic-backdrop": DemosVisualVariantCinematicBackdrop,
};

export function DemosVisualVariant({ id }: { id: DemosVisualVariantId }) {
  return createElement(variantMap[id]);
}
