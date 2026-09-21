"use client";

import { publicAsset } from "@/lib/site-path";

/** Ventionex Energy & Marine block — refinery bg + stainless camera collage (mirrored from Wix). */
export const PLATFORM_HERO_GIF_SRC = publicAsset(
  "/platform/our-platform-site/energy-marine-cameras-hero.gif",
);

export function PlatformHeroVideoBg() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <img
        src={PLATFORM_HERO_GIF_SRC}
        alt=""
        className="h-full w-full scale-105 object-cover object-center opacity-90"
        decoding="async"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1014]/80 via-[#0a1014]/35 to-transparent" />
    </div>
  );
}
