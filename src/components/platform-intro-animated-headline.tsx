"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type PlatformIntroAnimatedHeadlineProps = {
  text: string;
  className?: string;
};

const SCROLL_PULL = 0.07;
const MAX_OFFSET_PX = 36;
const FOLLOW_EASE = 0.032;
const RETURN_EASE = 0.018;
const WORD_LAG = 0.05;
const SCROLL_IDLE_MS = 140;
const COLOR_SWEEP_DURATION_S = 6;

export function PlatformIntroAnimatedHeadline({
  text,
  className,
}: PlatformIntroAnimatedHeadlineProps) {
  const words = text.trim().split(/\s+/);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lastScrollYRef = useRef(0);
  const inViewRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const targetOffsetRef = useRef(0);
  const currentOffsetRef = useRef(0);
  const wordOffsetsRef = useRef<number[]>(words.map(() => 0));
  const scrollingRef = useRef(false);
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const rafRef = useRef(0);

  useEffect(() => {
    wordOffsetsRef.current = words.map(() => 0);
  }, [words.length]);

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    lastScrollYRef.current = window.scrollY;

    const clampOffset = (value: number) =>
      Math.max(-MAX_OFFSET_PX, Math.min(MAX_OFFSET_PX, value));

    const applyTransforms = () => {
      wordRefs.current.forEach((el, index) => {
        if (!el) return;
        const offset = wordOffsetsRef.current[index] ?? 0;
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });
    };

    const tick = () => {
      const target = targetOffsetRef.current;
      const current = currentOffsetRef.current;
      const ease = scrollingRef.current ? FOLLOW_EASE : RETURN_EASE;
      const next = current + (target - current) * ease;
      currentOffsetRef.current = next;

      for (let index = 0; index < words.length; index += 1) {
        const previous = wordOffsetsRef.current[index] ?? next;
        const desired = next * (1 + index * WORD_LAG);
        wordOffsetsRef.current[index] = previous + (desired - previous) * ease;
      }

      if (!scrollingRef.current && Math.abs(target) > 0.05) {
        targetOffsetRef.current += (0 - target) * RETURN_EASE;
      }

      if (
        !scrollingRef.current &&
        Math.abs(targetOffsetRef.current) < 0.05 &&
        Math.abs(currentOffsetRef.current) < 0.05
      ) {
        targetOffsetRef.current = 0;
        currentOffsetRef.current = 0;
        wordOffsetsRef.current = words.map(() => 0);
      }

      applyTransforms();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          targetOffsetRef.current = 0;
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(headline);

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;
      lastScrollYRef.current = currentY;

      if (reducedMotionRef.current || !inViewRef.current) return;
      if (delta === 0) return;

      scrollingRef.current = true;
      targetOffsetRef.current = clampOffset(
        targetOffsetRef.current + delta * SCROLL_PULL,
      );

      if (scrollIdleTimerRef.current) {
        clearTimeout(scrollIdleTimerRef.current);
      }
      scrollIdleTimerRef.current = setTimeout(() => {
        scrollingRef.current = false;
      }, SCROLL_IDLE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (scrollIdleTimerRef.current) {
        clearTimeout(scrollIdleTimerRef.current);
      }
      cancelAnimationFrame(rafRef.current);
    };
  }, [words.length]);

  return (
    <h2
      ref={headlineRef}
      className={cn(
        "platform-intro-headline w-full max-w-none text-center font-semibold text-white",
        className,
      )}
      aria-label={text}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          ref={(el) => {
            wordRefs.current[index] = el;
          }}
          className={cn(
            "platform-intro-headline-word platform-intro-headline-word--highlight mr-[0.28em] inline-block last:mr-0",
          )}
          style={{
            animationDelay: `${(index / words.length) * COLOR_SWEEP_DURATION_S}s`,
          }}
        >
          {word}
        </span>
      ))}
    </h2>
  );
}
