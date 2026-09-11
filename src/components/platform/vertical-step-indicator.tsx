"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { formatDemoStepLabel } from "@/components/platform/demo-step-detail-panel";
import type { CarouselSlide } from "@/lib/platform/types";
import { cn } from "@/lib/utils";

type VerticalStepIndicatorProps = {
  slides: CarouselSlide[];
  activeIndex: number;
  onSelect: (index: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
  idPrefix?: string;
  className?: string;
};

export function VerticalStepIndicator({
  slides,
  activeIndex,
  onSelect,
  onPrev,
  onNext,
  idPrefix = "walkthrough-step",
  className,
}: VerticalStepIndicatorProps) {
  const slideCount = slides.length;
  const trackProgress =
    slideCount > 1 ? (activeIndex / (slideCount - 1)) * 100 : 100;

  return (
    <div className={cn("flex flex-col", className)}>
      <ol className="relative flex flex-col" role="tablist" aria-label="Steps">
        <span
          className="pointer-events-none absolute bottom-4 left-[2.375rem] top-4 w-px bg-white/10"
          aria-hidden
        />
        <span
          className="pointer-events-none absolute left-[2.375rem] top-4 w-px bg-gradient-to-b from-secondary via-secondary/70 to-secondary/30 transition-[height] duration-500 ease-out motion-reduce:transition-none"
          style={{
            height:
              activeIndex === 0
                ? "0px"
                : `calc(${trackProgress}% - 0.75rem)`,
          }}
          aria-hidden
        />

        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;

          return (
            <li key={slide.step} className="relative pb-6 last:pb-0">
              <span
                className={cn(
                  "absolute left-0 top-0.5 z-10 flex h-9 min-w-[4.75rem] items-center justify-center rounded-full border-2 px-2.5 text-sm font-semibold whitespace-nowrap transition duration-300 motion-reduce:transition-none",
                  isActive &&
                    "border-secondary bg-secondary/15 text-secondary shadow-[0_0_24px_-6px_rgba(41,152,174,0.55)] ring-4 ring-secondary/15",
                  isPast &&
                    "border-secondary bg-secondary text-[#071318]",
                  !isActive &&
                    !isPast &&
                    "border-white/20 bg-[var(--platform-surface)] text-platform-subtle",
                )}
                aria-hidden
              >
                {formatDemoStepLabel(slide.step)}
              </span>

              <button
                type="button"
                role="tab"
                id={`${idPrefix}-tab-${slide.step}`}
                aria-selected={isActive}
                aria-controls={`${idPrefix}-panel-${slide.step}`}
                onClick={() => onSelect(index)}
                className={cn(
                  "ml-[5.5rem] w-[calc(100%-5.5rem)] rounded-xl border px-4 py-3 text-left transition",
                  isActive
                    ? "border-secondary/40 bg-secondary/10"
                    : "border-transparent hover:border-white/10 hover:bg-white/5",
                )}
              >
                <p
                  className={cn(
                    "text-base font-semibold leading-snug",
                    isActive ? "text-white" : "text-platform-muted",
                  )}
                >
                  {slide.title}
                </p>
                {isActive ? (
                  <p className="mt-2 text-base leading-7 text-platform-muted">
                    {slide.description}
                  </p>
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>

      {onPrev && onNext ? (
        <div className="mt-6 flex items-center border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-secondary/40 hover:bg-secondary/10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-secondary/40 hover:bg-secondary/10"
              aria-label="Next slide"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
