"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

import { publicAsset } from "@/lib/site-path";
import { cn } from "@/lib/utils";

const BACKDROP = publicAsset("/platform/landing-story/cameras-poster.jpg");

const ALERT_STATES = [
  { label: "Detected", detail: "Fence sensor FZ-07 tripped", tone: "bg-red-500" },
  { label: "Verifying", detail: "Camera N-03 pulled into view", tone: "bg-amber-400" },
  { label: "Dispatched", detail: "Guide Aiman en route · ETA 3 min", tone: "bg-secondary" },
  { label: "Closed", detail: "Evidence linked · supervisor review", tone: "bg-emerald-400" },
];

/** Fills a positioned 16:9 frame; stands in until the perimeter video is filmed. */
export function PerimeterLiveAlert() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % ALERT_STATES.length), 1800);
    return () => clearInterval(timer);
  }, []);

  const state = ALERT_STATES[active];

  return (
    <>
      <img
        src={BACKDROP}
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
      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-secondary/40 bg-black/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary backdrop-blur">
        <Clock className="size-3.5" aria-hidden />
        Video walkthrough coming soon
      </span>
    </>
  );
}
