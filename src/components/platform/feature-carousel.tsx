"use client";

import { PlatformImage } from "@/components/platform-image";
import { useCallback, useEffect, useState } from "react";

import { PlatformSectionHeader } from "@/components/platform-section-header";
import { VerticalStepIndicator } from "@/components/platform/vertical-step-indicator";
import type { CarouselSlide } from "@/lib/platform/types";
import { cn } from "@/lib/utils";

type PlatformFeatureCarouselProps = {
  slides: CarouselSlide[];
  eyebrow?: string;
  title?: string;
  description?: string;
  sectionId?: string;
  variant?: "default" | "embedded";
  ariaLabel?: string;
};

export function PlatformFeatureCarousel({
  slides,
  eyebrow,
  title,
  description,
  sectionId,
  variant = "default",
  ariaLabel = "Feature walkthrough",
}: PlatformFeatureCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = slides.length;
  const isEmbedded = variant === "embedded";

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  const activeSlide = slides[activeIndex];

  return (
    <section
      id={sectionId}
      className={cn(
        "scroll-mt-16 px-6 md:px-16",
        isEmbedded
          ? "py-12 md:py-16"
          : "border-t border-white/10 bg-[var(--platform-surface)] py-16 md:py-20",
      )}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div className="mx-auto max-w-7xl">
        {eyebrow && title ? (
          <PlatformSectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            className={!isEmbedded ? "mb-12" : undefined}
          />
        ) : null}

        <div
          className={cn(
            "grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:items-stretch lg:gap-10 xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)]",
            eyebrow && !isEmbedded && "mt-12",
          )}
        >
          <VerticalStepIndicator
            slides={slides}
            activeIndex={activeIndex}
            onSelect={goTo}
            onPrev={goPrev}
            onNext={goNext}
            idPrefix="feature-carousel"
            className="lg:sticky lg:top-24"
          />

          <div
            id={`feature-carousel-panel-${activeSlide.step}`}
            role="tabpanel"
            aria-labelledby={`feature-carousel-tab-${activeSlide.step}`}
            className="platform-product-frame flex flex-col"
          >
            <div className="relative aspect-[3/2] min-h-[280px] overflow-hidden rounded-xl bg-[#0d1418] lg:min-h-[400px]">
              {slides.map(({ step, image, alt }, index) => (
                <div
                  key={step}
                  className={cn(
                    "absolute inset-0 transition duration-500 ease-out motion-reduce:transition-none",
                    index === activeIndex
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-[1.02] opacity-0",
                  )}
                  aria-hidden={index !== activeIndex}
                >
                  <PlatformImage
                    src={image}
                    alt={index === activeIndex ? alt : ""}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 800px"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            <p
              key={activeSlide.step}
              className="mt-3 px-1 text-sm leading-6 text-platform-muted animate-in fade-in fill-mode-both duration-300 motion-reduce:animate-none"
            >
              <span className="font-medium text-white">{activeSlide.title}.</span>{" "}
              {activeSlide.description}
            </p>

            <p className="mt-3 text-center text-xs text-platform-subtle">
              Actual product UI · sample industrial data
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
