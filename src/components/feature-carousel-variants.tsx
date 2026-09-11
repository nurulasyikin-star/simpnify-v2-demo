"use client";

import type { ComponentType, CSSProperties } from "react";
import { createElement, useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { FeatureCarouselVariantId } from "@/components/feature-carousel-variants-meta";
import { VerticalStepIndicator } from "@/components/platform/vertical-step-indicator";
import { FLOOR_PLAN_SLIDES } from "@/lib/platform";
import type { CarouselSlide } from "@/lib/platform/types";
import { cn } from "@/lib/utils";

export type { FeatureCarouselVariantId } from "@/components/feature-carousel-variants-meta";

const SLIDES = FLOOR_PLAN_SLIDES;
const INITIAL_STEP = 2;

function FloorPlanContext({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[var(--platform-surface)]">
      <div className="border-b border-white/10 px-6 py-8 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          FLOOR PLAN STUDIO
        </p>
        <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
          Your facility becomes an operating picture
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-platform-muted">
          Draw walls and rooms, edit in 2D, see the same geometry in 3D, and
          place devices with measured dimensions.
        </p>
      </div>
      <div className="px-6 py-10 md:px-10 md:py-12">{children}</div>
    </div>
  );
}

function useCarousel(slides: CarouselSlide[], initial = INITIAL_STEP) {
  const [activeIndex, setActiveIndex] = useState(initial);
  const slideCount = slides.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + slideCount) % slideCount);
    },
    [slideCount],
  );

  return {
    activeIndex,
    activeSlide: slides[activeIndex],
    slideCount,
    progress: ((activeIndex + 1) / slideCount) * 100,
    goTo,
    goPrev: () => goTo(activeIndex - 1),
    goNext: () => goTo(activeIndex + 1),
  };
}

function SlideStage({
  slides,
  activeIndex,
  fit = "cover",
  className,
  sizes = "(max-width: 1024px) 100vw, 720px",
}: {
  slides: CarouselSlide[];
  activeIndex: number;
  fit?: "cover" | "contain";
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-[#0d1418]", className)}>
      {slides.map((slide, index) => (
        <div
          key={slide.step}
          className={cn(
            "absolute inset-0 transition duration-500 ease-out motion-reduce:transition-none",
            index === activeIndex
              ? "opacity-100"
              : "pointer-events-none opacity-0",
            fit === "cover" &&
              (index === activeIndex ? "scale-100" : "scale-[1.02]"),
          )}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={slide.image}
            alt={index === activeIndex ? slide.alt : ""}
            fill
            className={
              fit === "contain" ? "object-contain" : "object-cover object-top"
            }
            sizes={sizes}
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}

function NavButtons({
  onPrev,
  onNext,
  size = "md",
}: {
  onPrev: () => void;
  onNext: () => void;
  size?: "sm" | "md";
}) {
  const box = size === "sm" ? "size-9" : "size-11";
  const icon = size === "sm" ? "size-4" : "size-5";

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onPrev}
        className={cn(
          "flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-secondary/40 hover:bg-secondary/10",
          box,
        )}
        aria-label="Previous slide"
      >
        <ChevronLeft className={icon} />
      </button>
      <button
        type="button"
        onClick={onNext}
        className={cn(
          "flex items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-secondary/40 hover:bg-secondary/10",
          box,
        )}
        aria-label="Next slide"
      >
        <ChevronRight className={icon} />
      </button>
    </div>
  );
}

function ProgressBar({
  value,
  max,
  progress,
}: {
  value: number;
  max: number;
  progress: number;
}) {
  return (
    <div
      className="h-1 overflow-hidden rounded-full bg-white/10"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={1}
      aria-valuemax={max}
      aria-label="Progress"
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-secondary to-[var(--platform-accent)] transition-[width] duration-500 ease-out motion-reduce:transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function StepCards({
  slides,
  activeIndex,
  goTo,
  variantId,
}: {
  slides: CarouselSlide[];
  activeIndex: number;
  goTo: (index: number) => void;
  variantId: string;
}) {
  return (
    <div
      className={cn(
        "platform-slider-fade mt-8",
        slides.length > 4 && "platform-slider-fade--scroll",
      )}
    >
      <ul
        className="platform-slider-track"
        style={{ "--slide-count": slides.length } as CSSProperties}
        role="tablist"
        aria-label="Steps"
      >
        {slides.map((slide, index) => (
          <li key={slide.step} className="platform-slider-card">
            <button
              type="button"
              role="tab"
              id={`fc-${variantId}-tab-${slide.step}`}
              aria-selected={index === activeIndex}
              onClick={() => goTo(index)}
              className={cn(
                "group flex min-h-[4.75rem] w-full flex-col rounded-xl border px-4 py-3.5 text-left transition",
                index === activeIndex
                  ? "border-secondary/50 bg-secondary/10 shadow-[inset_0_0_0_1px_rgba(41,152,174,0.2),0_0_24px_-8px_rgba(41,152,174,0.45)]"
                  : "border-white/10 bg-[#0c1a22]/60 hover:border-white/20",
              )}
            >
              <p
                className={cn(
                  "text-xs font-semibold transition",
                  index === activeIndex
                    ? "text-secondary"
                    : "text-platform-subtle group-hover:text-secondary",
                )}
              >
                {slide.step}
              </p>
              <p className="mt-1 text-sm font-medium leading-snug text-white">
                {slide.title}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CopyBlock({
  slide,
  slideCount,
  activeIndex,
  hideMeta = false,
}: {
  slide: CarouselSlide;
  slideCount: number;
  activeIndex: number;
  hideMeta?: boolean;
}) {
  return (
    <div
      key={slide.step}
      className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-300 motion-reduce:animate-none"
    >
      {hideMeta ? null : (
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-secondary">
            Step {slide.step} of {String(slideCount).padStart(2, "0")}
          </p>
          <p className="text-xs tabular-nums text-platform-subtle">
            {activeIndex + 1}/{slideCount}
          </p>
        </div>
      )}
      <h4 className="text-2xl font-semibold text-white md:text-3xl">
        {slide.title}
      </h4>
      <p className="mt-3 text-base leading-7 text-platform-muted">
        {slide.description}
      </p>
    </div>
  );
}

function SampleCaption() {
  return (
    <p className="mt-3 text-center text-xs text-platform-subtle">
      Actual product UI · sample industrial data
    </p>
  );
}

export function FeatureCarouselVariantCurrent() {
  const { activeIndex, activeSlide, slideCount, progress, goTo, goPrev, goNext } =
    useCarousel(SLIDES);

  return (
    <FloorPlanContext>
      <div
        className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start lg:gap-14 xl:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]"
        aria-roledescription="carousel"
        aria-label="Floor Plan Studio walkthrough"
      >
        <div className="flex flex-col gap-6">
          <div className="platform-glass-card min-h-[220px] md:min-h-[240px]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-secondary">
                Step {activeSlide.step} of {String(slideCount).padStart(2, "0")}
              </p>
              <p className="text-xs tabular-nums text-platform-subtle">
                {activeIndex + 1}/{slideCount}
              </p>
            </div>
            <div className="mb-6">
              <ProgressBar
                value={activeIndex + 1}
                max={slideCount}
                progress={progress}
              />
            </div>
            <CopyBlock
              slide={activeSlide}
              slideCount={slideCount}
              activeIndex={activeIndex}
              hideMeta
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <NavButtons onPrev={goPrev} onNext={goNext} />
            <div className="flex flex-wrap justify-end gap-2" role="tablist">
              {SLIDES.map((slide, index) => (
                <button
                  key={slide.step}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Go to step ${slide.step}: ${slide.title}`}
                  onClick={() => goTo(index)}
                  className={cn(
                    "size-2.5 rounded-full transition",
                    index === activeIndex
                      ? "scale-125 bg-secondary"
                      : "bg-white/20 hover:bg-secondary/60",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="platform-product-frame lg:min-h-[420px]">
          <SlideStage
            slides={SLIDES}
            activeIndex={activeIndex}
            className="aspect-[3/2] rounded-xl lg:aspect-auto lg:min-h-[380px]"
          />
          <SampleCaption />
        </div>
      </div>

      <StepCards
        slides={SLIDES}
        activeIndex={activeIndex}
        goTo={goTo}
        variantId="current"
      />
    </FloorPlanContext>
  );
}

export function FeatureCarouselVariantOverlayStage() {
  const { activeIndex, activeSlide, slideCount, progress, goTo, goPrev, goNext } =
    useCarousel(SLIDES);

  return (
    <FloorPlanContext>
      <div
        aria-roledescription="carousel"
        aria-label="Floor Plan Studio walkthrough"
      >
        <div className="platform-product-frame">
          <div className="relative aspect-[16/10] min-h-[320px] overflow-hidden rounded-xl md:min-h-[420px]">
            <SlideStage
              slides={SLIDES}
              activeIndex={activeIndex}
              className="absolute inset-0"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#071318]/90 via-[#071318]/35 to-transparent"
              aria-hidden
            />
            <div className="absolute bottom-4 left-4 right-4 z-10 md:bottom-6 md:left-6 md:max-w-sm">
              <div className="platform-glass-card">
                <p className="text-sm font-semibold text-secondary">
                  Step {activeSlide.step} of {String(slideCount).padStart(2, "0")}
                </p>
                <div className="mt-3">
                  <ProgressBar
                    value={activeIndex + 1}
                    max={slideCount}
                    progress={progress}
                  />
                </div>
                <div
                  key={activeSlide.step}
                  className="mt-4 animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-300 motion-reduce:animate-none"
                >
                  <h4 className="text-xl font-semibold text-white md:text-2xl">
                    {activeSlide.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-platform-muted">
                    {activeSlide.description}
                  </p>
                </div>
                <div className="mt-5">
                  <NavButtons onPrev={goPrev} onNext={goNext} size="sm" />
                </div>
              </div>
            </div>
          </div>
          <SampleCaption />
        </div>

        <StepCards
          slides={SLIDES}
          activeIndex={activeIndex}
          goTo={goTo}
          variantId="overlay-stage"
        />
      </div>
    </FloorPlanContext>
  );
}

export function FeatureCarouselVariantVerticalSteps() {
  const { activeIndex, activeSlide, goTo, goPrev, goNext } = useCarousel(SLIDES);

  return (
    <FloorPlanContext>
      <div
        className="grid gap-8 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:items-stretch lg:gap-10"
        aria-roledescription="carousel"
        aria-label="Floor Plan Studio walkthrough"
      >
        <VerticalStepIndicator
          slides={SLIDES}
          activeIndex={activeIndex}
          onSelect={goTo}
          onPrev={goPrev}
          onNext={goNext}
          idPrefix="fc-vertical-steps"
        />

        <div className="platform-product-frame flex flex-col">
          <SlideStage
            slides={SLIDES}
            activeIndex={activeIndex}
            className="aspect-[3/2] min-h-[280px] flex-1 rounded-xl lg:min-h-[400px]"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
          <p
            key={activeSlide.step}
            className="mt-3 px-1 text-sm leading-6 text-platform-muted animate-in fade-in fill-mode-both duration-300 motion-reduce:animate-none"
          >
            <span className="font-medium text-white">{activeSlide.title}.</span>{" "}
            {activeSlide.description}
          </p>
          <SampleCaption />
        </div>
      </div>
    </FloorPlanContext>
  );
}

export function FeatureCarouselVariantImageFirst() {
  const { activeIndex, activeSlide, slideCount, progress, goTo, goPrev, goNext } =
    useCarousel(SLIDES);

  return (
    <FloorPlanContext>
      <div
        aria-roledescription="carousel"
        aria-label="Floor Plan Studio walkthrough"
      >
        <div className="platform-product-frame relative">
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
          <SlideStage
            slides={SLIDES}
            activeIndex={activeIndex}
            fit="contain"
            className="aspect-[16/9] min-h-[280px] rounded-xl md:min-h-[380px]"
            sizes="(max-width: 1024px) 100vw, 1100px"
          />
        </div>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div
            key={activeSlide.step}
            className="max-w-2xl animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-300 motion-reduce:animate-none"
          >
            <p className="text-sm font-semibold text-secondary">
              Step {activeSlide.step} of {String(slideCount).padStart(2, "0")}
            </p>
            <h4 className="mt-1 text-xl font-semibold text-white md:text-2xl">
              {activeSlide.title}
            </h4>
            <p className="mt-2 text-sm leading-6 text-platform-muted">
              {activeSlide.description}
            </p>
          </div>
          <NavButtons onPrev={goPrev} onNext={goNext} />
        </div>

        <div className="mt-5">
          <ProgressBar
            value={activeIndex + 1}
            max={slideCount}
            progress={progress}
          />
        </div>

        <ol
          className="mt-4 flex gap-2 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:gap-3 md:overflow-visible"
          role="tablist"
          aria-label="Steps"
        >
          {SLIDES.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={slide.step} className="min-w-[8.5rem] md:min-w-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => goTo(index)}
                  className={cn(
                    "flex w-full items-baseline gap-2 rounded-lg px-2 py-2 text-left transition",
                    isActive ? "text-secondary" : "text-platform-muted hover:text-white",
                  )}
                >
                  <span className="text-xs font-semibold tabular-nums">
                    {slide.step}
                  </span>
                  <span className="text-sm font-medium text-white">
                    {slide.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <SampleCaption />
      </div>
    </FloorPlanContext>
  );
}

export function FeatureCarouselVariantFilmstrip() {
  const { activeIndex, activeSlide, slideCount, goTo, goPrev, goNext } =
    useCarousel(SLIDES);

  return (
    <FloorPlanContext>
      <div
        aria-roledescription="carousel"
        aria-label="Floor Plan Studio walkthrough"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c1a22]/60">
          <SlideStage
            slides={SLIDES}
            activeIndex={activeIndex}
            className="aspect-[16/9] min-h-[260px] md:min-h-[400px]"
            sizes="(max-width: 1024px) 100vw, 1100px"
          />

          <div className="flex flex-col gap-4 border-t border-white/10 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-6">
            <div
              key={activeSlide.step}
              className="animate-in fade-in fill-mode-both duration-300 motion-reduce:animate-none"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Step {activeSlide.step} of {String(slideCount).padStart(2, "0")}
              </p>
              <h4 className="mt-1 text-lg font-semibold text-white">
                {activeSlide.title}
              </h4>
              <p className="mt-1 max-w-xl text-sm leading-6 text-platform-muted">
                {activeSlide.description}
              </p>
            </div>
            <NavButtons onPrev={goPrev} onNext={goNext} size="sm" />
          </div>
        </div>

        <ul
          className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4"
          role="tablist"
          aria-label="Step previews"
        >
          {SLIDES.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={slide.step}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${slide.step} ${slide.title}`}
                  onClick={() => goTo(index)}
                  className={cn(
                    "group w-full overflow-hidden rounded-xl border text-left transition",
                    isActive
                      ? "border-secondary ring-2 ring-secondary/30"
                      : "border-white/10 hover:border-white/25",
                  )}
                >
                  <span className="relative block aspect-[16/10] bg-[#0d1418]">
                    <Image
                      src={slide.image}
                      alt=""
                      fill
                      className="object-cover object-top"
                      sizes="220px"
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "absolute left-2 top-2 rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                        isActive
                          ? "bg-secondary text-[#071318]"
                          : "bg-[#071318]/80 text-white",
                      )}
                    >
                      {slide.step}
                    </span>
                  </span>
                  <span className="block truncate px-2.5 py-2 text-xs font-medium text-white">
                    {slide.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </FloorPlanContext>
  );
}

const variantMap: Record<FeatureCarouselVariantId, ComponentType> = {
  current: FeatureCarouselVariantCurrent,
  "overlay-stage": FeatureCarouselVariantOverlayStage,
  "vertical-steps": FeatureCarouselVariantVerticalSteps,
  "image-first": FeatureCarouselVariantImageFirst,
  filmstrip: FeatureCarouselVariantFilmstrip,
};

export function FeatureCarouselVariant({
  id,
}: {
  id: FeatureCarouselVariantId;
}) {
  return createElement(variantMap[id]);
}
