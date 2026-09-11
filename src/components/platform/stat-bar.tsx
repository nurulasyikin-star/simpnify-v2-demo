"use client";

import { useEffect, useRef, useState } from "react";

import type { CompanyStat } from "@/lib/platform/types";

type PlatformStatBarProps = {
  stats: CompanyStat[];
  className?: string;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useCountUp(target: number, active: boolean, durationMs = 1600) {
  const [value, setValue] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    if (reducedMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, durationMs, reducedMotion, target]);

  return value;
}

function AnimatedStat({ value, suffix, label }: CompanyStat) {
  const itemRef = useRef<HTMLLIElement>(null);
  const [inView, setInView] = useState(false);
  const displayValue = useCountUp(value, inView);

  useEffect(() => {
    const node = itemRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <li
      ref={itemRef}
      className="flex flex-col items-center px-4 py-2 text-center md:items-start md:text-left"
    >
      <p
        className="text-4xl font-semibold tabular-nums text-secondary md:text-5xl"
        aria-label={`${value}${suffix ?? ""} ${label}`}
      >
        <span aria-hidden>{displayValue}</span>
        {suffix ? <span aria-hidden>{suffix}</span> : null}
      </p>
      <p className="mt-2 max-w-xs text-sm leading-6 text-platform-muted">
        {label}
      </p>
    </li>
  );
}

export function PlatformStatBar({ stats, className }: PlatformStatBarProps) {
  return (
    <section
      className={
        className ??
        "border-y border-white/10 bg-[var(--platform-surface-raised)] px-6 py-10 md:px-16 md:py-12"
      }
      aria-label="Company highlights"
    >
      <div className="mx-auto max-w-7xl">
        <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6 sm:divide-x sm:divide-white/10">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </ul>
      </div>
    </section>
  );
}
