"use client";

import { useEffect, useRef, useState } from "react";

import type { CompanyStat } from "@/lib/platform/types";
import { cn } from "@/lib/utils";

export const COMPANY_STATS_BAND_SURFACE_CLASS =
  "mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#0a161d] px-4 py-12 md:px-8 md:py-14";

const STAT_ITEM_BASE =
  "flex flex-col items-center justify-center px-6 py-1 text-center sm:px-8 md:px-10";
const STAT_ITEM_DIVIDER =
  "sm:relative sm:before:pointer-events-none sm:before:absolute sm:before:left-0 sm:before:top-1/2 sm:before:h-[3.25rem] sm:before:w-px sm:before:-translate-y-1/2 sm:before:bg-white/12";
const STAT_VALUE_CLASS =
  "font-serif text-[2.75rem] font-semibold leading-none tabular-nums tracking-tight text-secondary md:text-6xl";
const STAT_LABEL_CLASS =
  "mt-4 max-w-[11.5rem] font-serif text-[0.8125rem] leading-[1.45] text-platform-muted sm:max-w-xs";

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

export type PlatformAnimatedStatProps = CompanyStat & {
  itemClassName?: string;
  valueClassName?: string;
  labelClassName?: string;
};

export function PlatformAnimatedStat({
  value,
  suffix,
  label,
  itemClassName = STAT_ITEM_BASE,
  valueClassName = STAT_VALUE_CLASS,
  labelClassName = STAT_LABEL_CLASS,
}: PlatformAnimatedStatProps) {
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
    <li ref={itemRef} className={itemClassName}>
      <p className={valueClassName} aria-label={`${value}${suffix ?? ""} ${label}`}>
        <span aria-hidden>{displayValue}</span>
        {suffix ? <span aria-hidden>{suffix}</span> : null}
      </p>
      <p className={labelClassName}>{label}</p>
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
        <ul className="grid gap-10 sm:grid-cols-3 sm:gap-0">
          {stats.map((stat, index) => (
            <PlatformAnimatedStat
              key={stat.label}
              {...stat}
              itemClassName={cn(STAT_ITEM_BASE, index > 0 && STAT_ITEM_DIVIDER)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
