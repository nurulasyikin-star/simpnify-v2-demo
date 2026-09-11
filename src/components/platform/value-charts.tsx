"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { PlatformSectionHeader } from "@/components/platform-section-header";
import {
  ADOPTION_RAMP,
  CUMULATIVE_CAPACITY,
  VALUE_ASSUMPTIONS,
  VALUE_FORMULAS,
  VALUE_SCENARIOS,
} from "@/lib/platform";

type PlatformValueChartsProps = {
  showHeader?: boolean;
  showFormulas?: boolean;
  showLinks?: boolean;
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

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function useCountUp(target: number, active: boolean, durationMs = 1200) {
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
      setValue(Math.round(eased * target * 100) / 100);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, durationMs, reducedMotion, target]);

  return value;
}

function formatHours(value: number) {
  return Number.isInteger(value) ? value.toString() : value.toFixed(2);
}

type ScenarioBarProps = {
  label: string;
  hoursRecovered: number;
  minutesRemoved: number;
  maxHours: number;
  active: boolean;
  delayMs: number;
};

function ScenarioBar({
  label,
  hoursRecovered,
  minutesRemoved,
  maxHours,
  active,
  delayMs,
}: ScenarioBarProps) {
  const displayHours = useCountUp(hoursRecovered, active, 1100 + delayMs);
  const targetHeight = (hoursRecovered / maxHours) * 180;

  return (
    <div className="flex flex-1 flex-col items-center gap-3">
      <p
        className="text-2xl font-semibold text-white tabular-nums transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          transitionDelay: `${delayMs}ms`,
        }}
      >
        {formatHours(displayHours)}h
      </p>
      <div
        className="flex w-full max-w-[88px] items-end justify-center"
        style={{ height: "180px" }}
      >
        <div
          className="w-full origin-bottom rounded-t-lg bg-gradient-to-t from-secondary to-[var(--platform-accent)] shadow-[0_0_24px_-8px_var(--platform-accent)] transition-[height] duration-[900ms] ease-out hover:brightness-110"
          style={{
            height: active ? `${targetHeight}px` : "0px",
            transitionDelay: `${delayMs}ms`,
          }}
          role="img"
          aria-label={`${label} scenario: ${hoursRecovered} hours recovered`}
        />
      </div>
      <div
        className="text-center transition-all duration-500"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(6px)",
          transitionDelay: `${delayMs + 250}ms`,
        }}
      >
        <p className="text-sm font-semibold text-secondary">{label}</p>
        <p className="text-xs text-platform-muted">{minutesRemoved} min removed</p>
      </div>
    </div>
  );
}

type AdoptionBarProps = {
  month: string;
  hours: number;
  active: boolean;
  delayMs: number;
};

function AdoptionBar({ month, hours, active, delayMs }: AdoptionBarProps) {
  const targetHeight = (hours / 25) * 100;

  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <p
        className="text-xs font-medium text-white tabular-nums transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          transitionDelay: `${delayMs}ms`,
        }}
      >
        {hours}
      </p>
      <div
        className="flex w-full items-end justify-center"
        style={{ height: "100px" }}
      >
        <div
          className="w-full origin-bottom rounded-t bg-secondary/70 transition-[height] duration-700 ease-out hover:bg-secondary/90"
          style={{
            height: active ? `${targetHeight}px` : "0px",
            transitionDelay: `${delayMs}ms`,
          }}
        />
      </div>
      <p
        className="text-xs text-platform-subtle transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          transitionDelay: `${delayMs + 150}ms`,
        }}
      >
        {month}
      </p>
    </div>
  );
}

export function PlatformValueCharts({
  showHeader = true,
  showFormulas = false,
  showLinks = true,
}: PlatformValueChartsProps) {
  const maxHours = 40;
  const reducedMotion = usePrefersReducedMotion();

  const { ref: scenariosRef, inView: scenariosInView } =
    useInView<HTMLDivElement>(0.35);
  const { ref: rampRef, inView: rampInView } = useInView<HTMLDivElement>(0.3);

  const baseHours = useCountUp(25, scenariosInView, 1400);

  return (
    <section className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        {showHeader ? (
          <PlatformSectionHeader
            eyebrow="VALUE MODEL"
            title="What could less coordination effort unlock?"
            description={VALUE_ASSUMPTIONS.disclaimer}
          />
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5 text-xs font-semibold text-secondary">
            {VALUE_ASSUMPTIONS.incidentsPerMonth} incidents / month
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/80">
            {VALUE_ASSUMPTIONS.currentEffortMinutes} min current effort
          </span>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="platform-glass-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-platform-subtle">
              Recovered hours / month
            </p>
            <div
              ref={scenariosRef}
              className="mt-8 flex items-end justify-around gap-4 border-b border-white/10 pb-4"
            >
              {VALUE_SCENARIOS.map(
                ({ label, hoursRecovered, minutesRemoved }, index) => (
                  <ScenarioBar
                    key={label}
                    label={label}
                    hoursRecovered={hoursRecovered}
                    minutesRemoved={minutesRemoved}
                    maxHours={maxHours}
                    active={scenariosInView}
                    delayMs={reducedMotion ? 0 : index * 140}
                  />
                ),
              )}
            </div>
            <p className="mt-4 text-center text-xs text-platform-subtle">
              Assumptions, not measured savings.
            </p>
          </div>

          <div className="platform-glass-card flex flex-col justify-center">
            <p className="text-sm font-semibold text-secondary">Base scenario</p>
            <p className="mt-2 text-4xl font-semibold text-white tabular-nums">
              {formatHours(baseHours)} hours
            </p>
            <p className="mt-1 text-sm text-platform-muted">
              per month available for other work
            </p>
            <p className="mt-4 font-mono text-sm text-secondary">
              300 × 5 minutes ÷ 60
            </p>
          </div>
        </div>

        <div className="mt-10 platform-glass-card">
          <p className="text-xs font-semibold uppercase tracking-wide text-platform-subtle">
            Adoption ramp — illustrative six-month forecast
          </p>
          <div ref={rampRef} className="mt-6 flex items-end justify-between gap-2">
            {ADOPTION_RAMP.map(({ month, hours }, index) => (
              <AdoptionBar
                key={month}
                month={month}
                hours={hours}
                active={rampInView}
                delayMs={reducedMotion ? 0 : index * 100}
              />
            ))}
          </div>
          <p className="mt-4 text-sm text-platform-muted">{CUMULATIVE_CAPACITY}</p>
        </div>

        {showFormulas ? (
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {VALUE_FORMULAS.map(({ title, formula }) => (
              <li
                key={title}
                className="rounded-xl border border-white/10 bg-[#0c1a22]/60 px-5 py-4"
              >
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="mt-1 font-mono text-sm text-secondary">{formula}</p>
              </li>
            ))}
          </ul>
        ) : null}

        {showLinks ? (
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/why-simpnify" className="platform-btn-primary">
              Explore value model
            </Link>
            <Link href="/pilot" className="platform-btn-secondary">
              Pilot scope
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
