"use client";

import type { ComponentType } from "react";
import { createElement, useState } from "react";
import { Building2, Shield } from "lucide-react";

import type { AboutPledgeVariantId } from "@/components/about-pledge-variants-meta";
import {
  AboutPledgeSpotlight,
  PLEDGES,
} from "@/components/about-pledge-spotlight";
import { cn } from "@/lib/utils";

export type { AboutPledgeVariantId } from "@/components/about-pledge-variants-meta";

const PILLARS_PREVIEW = [
  {
    icon: Shield,
    title: "Unified operations",
    description:
      "One platform connecting incidents, devices, maps, video and field response.",
  },
  {
    icon: Building2,
    title: "Industrial-grade delivery",
    description:
      "Scalable architecture with integration, commissioning and procedure governance.",
  },
] as const;

function AboutPledgePageContext({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col bg-[var(--platform-surface)]">
      <div className="border-b border-white/10 px-6 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Sample context
          </p>
          <h2 className="mt-2 text-sm font-semibold tracking-wide text-secondary">
            WHAT WE STAND FOR
          </h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-2">
            {PILLARS_PREVIEW.map(({ icon: Icon, title, description }) => (
              <li key={title} className="platform-hub-card">
                <span
                  className="flex size-10 items-center justify-center rounded-full bg-secondary/15 text-secondary"
                  aria-hidden
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-secondary">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-platform-muted">{description}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-platform-subtle">
            ↑ Pillars section ends here — pledge variants begin below
          </p>
        </div>
      </div>
      <div className="px-6 py-10 md:px-8 md:py-12">
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    </div>
  );
}

export function AboutPledgeVariantCurrent() {
  return (
    <AboutPledgePageContext>
      <div className="grid gap-6 lg:grid-cols-3">
        {PLEDGES.map(({ label, body }) => (
          <div key={label} className="platform-hub-card lg:col-span-1">
            <h2 className="text-sm font-semibold tracking-wide text-secondary">{label}</h2>
            <p className="mt-4 text-sm leading-7 text-platform-muted">{body}</p>
          </div>
        ))}
      </div>
    </AboutPledgePageContext>
  );
}

export function AboutPledgeVariantTabSelector() {
  const [active, setActive] = useState(0);
  const pledge = PLEDGES[active];

  return (
    <AboutPledgePageContext>
      <div>
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Company pledges"
        >
          {PLEDGES.map(({ id, label }, i) => {
            const isActive = i === active;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition",
                  isActive
                    ? "border-secondary/50 bg-secondary/15 text-secondary shadow-[0_0_24px_-8px_rgba(93,212,232,0.5)]"
                    : "border-white/10 bg-white/5 text-platform-muted hover:border-white/20 hover:text-white",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <article
          role="tabpanel"
          className="platform-hub-card mt-6 animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-300 motion-reduce:animate-none md:p-8"
          key={pledge.id}
        >
          <div className="flex gap-5">
            <div
              className="w-1 shrink-0 self-stretch rounded-full bg-gradient-to-b from-secondary via-secondary/40 to-transparent"
              aria-hidden
            />
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-secondary">
                {pledge.label}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">
                {pledge.headline}
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-platform-muted md:text-base">
                {pledge.body}
              </p>
            </div>
          </div>
        </article>

        <div className="mt-4 flex justify-center gap-1.5" aria-hidden>
          {PLEDGES.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1 rounded-full transition-all",
                i === active ? "w-6 bg-secondary" : "w-1.5 bg-white/20",
              )}
            />
          ))}
        </div>
      </div>
    </AboutPledgePageContext>
  );
}

export function AboutPledgeVariantIconHoverLift() {
  return (
    <AboutPledgePageContext>
      <div className="grid gap-5 lg:grid-cols-3">
        {PLEDGES.map(({ id, label, headline, body, icon: Icon }, i) => (
          <article
            key={id}
            className="group platform-hub-card cursor-default transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:bg-[#0c1a22] hover:shadow-[0_12px_40px_-12px_rgba(93,212,232,0.35)]"
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className="flex size-11 items-center justify-center rounded-xl bg-secondary/15 text-secondary transition group-hover:bg-secondary/25 group-hover:shadow-[0_0_20px_-4px_rgba(93,212,232,0.5)]"
                aria-hidden
              >
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <span className="text-xs font-mono text-platform-subtle/80">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-5 text-xs font-semibold tracking-[0.15em] text-secondary">
              {label}
            </p>
            <h3 className="mt-2 text-base font-semibold text-white transition group-hover:text-secondary">
              {headline}
            </h3>
            <p className="mt-3 text-sm leading-6 text-platform-muted">{body}</p>
          </article>
        ))}
      </div>
    </AboutPledgePageContext>
  );
}

export function AboutPledgeVariantTimelineRail() {
  const [active, setActive] = useState(0);
  const pledge = PLEDGES[active];

  return (
    <AboutPledgePageContext>
      <div>
        <div className="relative">
          <div
            className="platform-signal-line absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent md:block"
            aria-hidden
          />
          <ol
            className="flex gap-2 overflow-x-auto pb-2 md:justify-between md:gap-0 md:overflow-visible md:pb-0"
            role="tablist"
            aria-label="Company pledge timeline"
          >
            {PLEDGES.map(({ id, label, icon: Icon }, i) => {
              const isActive = i === active;
              return (
                <li key={id} className="shrink-0 md:flex-1 md:text-center">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group flex flex-col items-center gap-3 px-3 py-1 transition md:px-4",
                      isActive ? "text-secondary" : "text-platform-muted hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "relative z-10 flex size-10 items-center justify-center rounded-full border-2 bg-[var(--platform-surface)] transition",
                        isActive
                          ? "border-secondary bg-secondary/15 shadow-[0_0_24px_-4px_rgba(93,212,232,0.6)]"
                          : "border-white/15 group-hover:border-white/30",
                      )}
                    >
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                    <span className="max-w-[9rem] text-center text-[10px] font-semibold tracking-wide md:text-xs">
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <article
          role="tabpanel"
          className="platform-hub-card mt-8 animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-400 motion-reduce:animate-none"
          key={pledge.id}
        >
          <div className="flex items-center gap-3">
            <pledge.icon className="size-5 text-secondary" strokeWidth={1.75} aria-hidden />
            <p className="text-xs font-semibold tracking-[0.2em] text-secondary">
              {pledge.label}
            </p>
          </div>
          <h3 className="mt-3 text-xl font-semibold text-white">{pledge.headline}</h3>
          <p className="mt-3 text-sm leading-7 text-platform-muted md:text-base">
            {pledge.body}
          </p>
        </article>
      </div>
    </AboutPledgePageContext>
  );
}

export function AboutPledgeVariantSpotlightStrip() {
  return (
    <AboutPledgePageContext>
      <AboutPledgeSpotlight />
    </AboutPledgePageContext>
  );
}

const map: Record<AboutPledgeVariantId, ComponentType> = {
  current: AboutPledgeVariantCurrent,
  "tab-selector": AboutPledgeVariantTabSelector,
  "icon-hover-lift": AboutPledgeVariantIconHoverLift,
  "timeline-rail": AboutPledgeVariantTimelineRail,
  "spotlight-strip": AboutPledgeVariantSpotlightStrip,
};

export function AboutPledgeVariant({ id }: { id: AboutPledgeVariantId }) {
  return createElement(map[id]);
}
