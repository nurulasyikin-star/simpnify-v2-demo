"use client";

import { createElement, useEffect, useState, type ComponentType, type ReactNode } from "react";
import Link from "next/link";
import { Camera, Clock, FileCheck, Play, Radar, Send } from "lucide-react";

import type { PerimeterPlaceholderVariantId } from "@/components/perimeter-placeholder-variants-meta";
import { PlatformImage } from "@/components/platform-image";
import { publicAsset } from "@/lib/site-path";
import { cn } from "@/lib/utils";

const MEDIA = {
  perimeter: publicAsset("/platform/scenarios/scenario-01-perimeter.webp"),
  backdrop: publicAsset("/platform/landing-story/cameras-poster.jpg"),
};

const STEPS = [
  { step: "01", label: "Detect", description: "Approved perimeter event", icon: Radar },
  { step: "02", label: "Verify", description: "Camera + location context", icon: Camera },
  { step: "03", label: "Respond", description: "Dispatch the assigned guide", icon: Send },
  { step: "04", label: "Record", description: "Evidence + controlled closure", icon: FileCheck },
];

function OpsRow({ children }: { children: ReactNode }) {
  return (
    <section className="bg-black px-6 py-16 md:px-16 md:py-24 lg:px-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 lg:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <h2 className="whitespace-pre-line text-[clamp(3.25rem,6.5vw,5.75rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-white">
          {"Perimeter\nintrusion"}
        </h2>
        <div className="relative aspect-video overflow-hidden rounded-[10px] border-[3px] border-[#3db8cf] bg-[#0b0b0b] shadow-[0_0_28px_rgba(61,184,207,0.45),0_12px_40px_rgba(0,0,0,0.6)]">
          {children}
        </div>
      </div>
    </section>
  );
}

function SoonPill({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-secondary/40 bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary backdrop-blur",
        className,
      )}
    >
      <Clock className="size-3.5" aria-hidden />
      {children}
    </span>
  );
}

export function PerimeterPlaceholderCurrent() {
  return (
    <OpsRow>
      <img
        src={MEDIA.perimeter}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </OpsRow>
  );
}

export function PerimeterPlaceholderBlurredPreview() {
  return (
    <OpsRow>
      <img
        src={MEDIA.backdrop}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-md brightness-[0.35]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
      <div className="relative flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
        <span className="flex size-16 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur md:size-20">
          <Play className="size-7 translate-x-0.5 text-white/80 md:size-8" aria-hidden />
        </span>
        <SoonPill>Walkthrough video · Coming soon</SoonPill>
        <p className="max-w-md text-sm leading-6 text-white/70 md:text-base">
          Detect → Verify → Respond → Record, in under two minutes.
        </p>
      </div>
    </OpsRow>
  );
}

export function PerimeterPlaceholderStoryboard() {
  return (
    <OpsRow>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(61,184,207,0.14),transparent_60%)]" />
      <SoonPill className="absolute right-3 top-3 z-10">Full video demo · Coming soon</SoonPill>
      <div className="relative flex h-full items-center px-4 pt-10 md:px-8">
        <ol className="grid w-full grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {STEPS.map(({ step, label, description, icon: Icon }) => (
            <li
              key={step}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-3 md:p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-[0.16em] text-white/45">
                  {step}
                </span>
                <Icon className="size-4 text-secondary md:size-5" aria-hidden />
              </div>
              <p className="mt-3 text-sm font-semibold text-secondary md:text-base">{label}</p>
              <p className="mt-1 text-xs leading-5 text-white/70 md:text-sm">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </OpsRow>
  );
}

const ALERT_STATES = [
  { label: "Detected", detail: "Fence sensor FZ-07 tripped", tone: "bg-red-500" },
  { label: "Verifying", detail: "Camera N-03 pulled into view", tone: "bg-amber-400" },
  { label: "Dispatched", detail: "Guide Aiman en route · ETA 3 min", tone: "bg-secondary" },
  { label: "Closed", detail: "Evidence linked · supervisor review", tone: "bg-emerald-400" },
];

export function PerimeterPlaceholderLiveAlert() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % ALERT_STATES.length), 1800);
    return () => clearInterval(timer);
  }, []);

  const state = ALERT_STATES[active];

  return (
    <OpsRow>
      <img
        src={MEDIA.backdrop}
        alt=""
        className="absolute inset-0 h-full w-full object-cover brightness-[0.25]"
      />
      <div className="relative flex h-full items-center justify-center px-4">
        <div className="w-full max-w-md rounded-xl border border-white/15 bg-[#0a1218]/90 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur md:p-5">
          <div className="flex items-center justify-between text-[11px] font-medium tracking-[0.14em] text-white/50">
            <span>INCIDENT · P1</span>
            <span>02:14</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="relative flex size-3">
              <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", state.tone)} />
              <span className={cn("relative inline-flex size-3 rounded-full", state.tone)} />
            </span>
            <p className="text-base font-semibold text-white md:text-lg">
              North fence · Intrusion
            </p>
          </div>
          <p className="mt-1 pl-6 text-sm text-white/65">{state.detail}</p>
          <ol className="mt-4 grid grid-cols-4 gap-1.5">
            {ALERT_STATES.map((s, i) => (
              <li key={s.label}>
                <div
                  className={cn(
                    "h-1 rounded-full transition-colors duration-500",
                    i <= active ? s.tone : "bg-white/10",
                  )}
                />
                <p
                  className={cn(
                    "mt-1.5 text-[10px] font-medium uppercase tracking-wider transition-colors md:text-[11px]",
                    i === active ? "text-white" : "text-white/40",
                  )}
                >
                  {s.label}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <SoonPill className="absolute bottom-3 left-3">Video walkthrough coming soon</SoonPill>
    </OpsRow>
  );
}

export function PerimeterPlaceholderBrandedMinimal() {
  return (
    <OpsRow>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d2a33] via-[#071014] to-black" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(61,184,207,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(61,184,207,0.5)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
        <PlatformImage
          src="/simpnify-mark.png"
          alt=""
          width={56}
          height={56}
          className="h-12 w-12 md:h-14 md:w-14"
        />
        <p className="text-[11px] font-medium tracking-[0.22em] text-secondary">
          DEMO IN PRODUCTION
        </p>
        <p className="max-w-sm text-lg font-semibold leading-snug text-white md:text-2xl">
          Perimeter intrusion walkthrough
        </p>
        <Link
          href="/contact"
          className="mt-1 rounded-full bg-secondary px-5 py-2 text-sm font-semibold text-[#071318] transition hover:brightness-110"
        >
          Request a live demo
        </Link>
      </div>
    </OpsRow>
  );
}

const map: Record<PerimeterPlaceholderVariantId, ComponentType> = {
  current: PerimeterPlaceholderCurrent,
  "blurred-preview": PerimeterPlaceholderBlurredPreview,
  storyboard: PerimeterPlaceholderStoryboard,
  "live-alert": PerimeterPlaceholderLiveAlert,
  "branded-minimal": PerimeterPlaceholderBrandedMinimal,
};

export function PerimeterPlaceholderVariant({ id }: { id: PerimeterPlaceholderVariantId }) {
  return createElement(map[id]);
}
