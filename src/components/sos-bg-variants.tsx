"use client";

import { createElement, type ComponentType, type ReactNode } from "react";

import { PlatformScenarioButton } from "@/components/platform/scenario-button";
import { SosSignalField } from "@/components/sos-signal-field";
import type { SosBgVariantId } from "@/components/sos-bg-variant-meta";
import { publicAsset } from "@/lib/site-path";

export type { SosBgVariantId } from "@/components/sos-bg-variant-meta";

const SOS_VIDEO = publicAsset("/platform/scenarios/final-SOS.mp4");
const GLOBE_GIF = publicAsset("/platform/network-globe.gif");

function SosStage({
  backdrop,
  reveal = false,
  stacked = false,
}: {
  backdrop: ReactNode;
  reveal?: boolean;
  stacked?: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-black">
      <div className="relative isolate flex min-h-[52vh] items-center justify-center">
        <div className="absolute inset-0" aria-hidden>
          {backdrop}
        </div>
        <video
          src={SOS_VIDEO}
          className={
            stacked
              ? "relative z-10 mx-auto block h-auto max-h-[46vh] w-auto max-w-[88%] object-contain shadow-[0_18px_50px_rgba(0,0,0,0.55)]"
              : reveal
                ? "relative z-10 mx-auto block h-auto max-h-[52vh] w-auto max-w-full object-contain mix-blend-screen"
                : "relative z-10 mx-auto block h-auto max-h-[52vh] w-auto max-w-full bg-black object-contain"
          }
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label="Responder SOS recording"
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 bg-black px-6 py-5">
        <div>
          <p className="text-sm font-semibold text-secondary">02</p>
          <h3 className="mt-1 text-2xl font-semibold text-white">Responder SOS</h3>
        </div>
        <PlatformScenarioButton href="/solutions/responder-sos" />
      </div>
    </article>
  );
}

function NetworkGlobe() {
  return (
    <>
      <img
        src={GLOBE_GIF}
        alt=""
        className="size-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45),transparent_68%)]" />
    </>
  );
}

function SosBgVariantSignalField() {
  return <SosStage stacked backdrop={<SosSignalField />} />;
}

function RadarSweep() {
  return (
    <div className="relative size-full overflow-hidden bg-[#071318]">
      <div className="absolute left-1/2 top-1/2 size-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/15" />
      <div className="absolute left-1/2 top-1/2 size-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/20" />
      <div className="absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-secondary/25" />
      <div className="sos-radar-sweep absolute left-1/2 top-1/2 size-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5),transparent_68%)]" />
    </div>
  );
}

function AuroraGrid() {
  return (
    <div className="relative size-full overflow-hidden bg-[#071318]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,212,191,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.16) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="sos-aurora-blob absolute -left-1/4 top-[-20%] h-[80%] w-[70%] rounded-full bg-secondary/25 blur-3xl" />
      <div className="sos-aurora-blob-delayed absolute -right-1/4 bottom-[-30%] h-[70%] w-[60%] rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,19,24,0.55),transparent_70%)]" />
    </div>
  );
}

function SosBgVariantCurrent() {
  return <SosStage backdrop={<div className="size-full bg-black" />} />;
}

function SosBgVariantNetworkGlobe() {
  return <SosStage reveal backdrop={<NetworkGlobe />} />;
}

function SosBgVariantRadarSweep() {
  return <SosStage reveal backdrop={<RadarSweep />} />;
}

function SosBgVariantAuroraGrid() {
  return <SosStage reveal backdrop={<AuroraGrid />} />;
}

const variantMap: Record<SosBgVariantId, ComponentType> = {
  current: SosBgVariantCurrent,
  "network-globe": SosBgVariantNetworkGlobe,
  "signal-field": SosBgVariantSignalField,
  "radar-sweep": SosBgVariantRadarSweep,
  "aurora-grid": SosBgVariantAuroraGrid,
};

export function SosBgVariant({ id }: { id: SosBgVariantId }) {
  return (
    <>
      <style>{`
        @keyframes sos-radar-spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .sos-radar-sweep {
          background: conic-gradient(from 0deg, transparent 0 72%, rgba(45, 212, 191, 0.28) 88%, transparent 100%);
          animation: sos-radar-spin 14s linear infinite;
        }
        @keyframes sos-aurora-drift {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(12%, 8%, 0) scale(1.08); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        .sos-aurora-blob { animation: sos-aurora-drift 18s ease-in-out infinite; }
        .sos-aurora-blob-delayed { animation: sos-aurora-drift 22s ease-in-out infinite reverse; }
        @media (prefers-reduced-motion: reduce) {
          .sos-radar-sweep,
          .sos-aurora-blob,
          .sos-aurora-blob-delayed { animation: none; }
        }
      `}</style>
      {createElement(variantMap[id])}
    </>
  );
}
