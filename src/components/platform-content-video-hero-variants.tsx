import type { ComponentType } from "react";
import { createElement } from "react";
import Link from "next/link";

import { PlatformAccentBar } from "@/components/platform-accent-bar";
import { PlatformHeroVideoBg } from "@/components/platform-hero-video-bg";
import {
  PlatformContentVideoHeroGotham,
  type ContentVideoHeroCopy,
} from "@/components/platform-content-video-hero-gotham";
import { PLATFORM_CONTENT_VIDEO_HERO } from "@/lib/platform/client-story";

export type ContentVideoHeroVariantId =
  | "current"
  | "gotham-centered"
  | "lifecycle-span"
  | "operating-layer"
  | "minimal-cinema";

export type ContentVideoHeroVariantMeta = {
  id: ContentVideoHeroVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
};

export const contentVideoHeroVariants: ContentVideoHeroVariantMeta[] = [
  {
    id: "current",
    title: "A — Previous left column",
    tagline:
      "Legacy layout: accent bar + copy on the left, collage visible on the right (pre–variant C).",
    pros: [
      "Room for CTAs without covering the GIF",
      "Familiar marketing layout",
      "Works with existing platform buttons",
    ],
    cons: [
      "Not the centered Gotham / content-video frame",
      "Headline competes with collage on wide screens",
      "Feels brochure-first vs platform-first",
    ],
  },
  {
    id: "gotham-centered",
    title: "B — Gotham centered (alt copy)",
    tagline:
      "Same layout as production; “Decision clarity from control room to field” headline.",
    pros: [
      "Matches Palantir Gotham hero rhythm",
      "Subhead carries sensors + defensible decisions",
      "Built for content-video storytelling",
    ],
    cons: [
      "Hides site nav — needs in-hero Get Started",
      "Less body copy above the fold",
      "Bold for conservative PSIM buyers",
    ],
  },
  {
    id: "lifecycle-span",
    title: "C — Lifecycle span (production)",
    tagline:
      "Ships on /our-platform — “Unified operations from first signal to proof”.",
    pros: [
      "Maps to incident lifecycle modules",
      "Clear end-to-end promise",
      "Still “from X to Y” Gotham cadence",
    ],
    cons: [
      "“Proof” is internal vocabulary until explained",
      "Less field/control-room imagery",
      "Subhead must do sensor/AI work",
    ],
  },
  {
    id: "operating-layer",
    title: "D — Operating layer thesis",
    tagline:
      "Decision OS title as the hero; subhead expands fusion + audit-ready record.",
    pros: [
      "Aligns with Decision OS banner below the fold",
      "Enterprise platform positioning",
      "Less metaphor, more explicit product category",
    ],
    cons: [
      "Longer headline lines",
      "Softer cinematic punch than B",
      "Reads closer to a section header than a tagline",
    ],
  },
  {
    id: "minimal-cinema",
    title: "E — Minimal cinema",
    tagline:
      "Headline only in the center; subhead + audience moved to bottom dock — maximum video.",
    pros: [
      "Video/GIF is the hero",
      "Strong for reel or looped content",
      "Clean screenshot for decks",
    ],
    cons: [
      "Value prop easy to miss on first glance",
      "Bottom text can feel cramped on mobile",
      "Weakest CTA prominence",
    ],
  },
];

const COPY_BASELINE_A: ContentVideoHeroCopy = {
  eyebrow: "SIMPNIFY / UNIFIED PLATFORM",
  headlineLine1: "Decision clarity from",
  headlineLine2: "control room to field",
  subhead:
    "Unify every sensor and system into decisions you can defend.",
  audience: PLATFORM_CONTENT_VIDEO_HERO.audience,
};

const COPY_GOTHAM: ContentVideoHeroCopy = {
  ...COPY_BASELINE_A,
};

const COPY_OPERATING: ContentVideoHeroCopy = {
  eyebrow: "PLATFORM POSITIONING",
  headlineLine1: "One operating layer for",
  headlineLine2: "security decisions",
  subhead:
    "Fuse physical, safety, and cyber into governed workflows and an audit-ready record your teams can defend.",
  audience: PLATFORM_CONTENT_VIDEO_HERO.audience,
};

function ContentVideoHeroBaselineLeftColumn() {
  return (
    <section className="relative min-h-[min(92vh,920px)] overflow-hidden bg-[var(--platform-surface)] px-6 py-12 md:px-16 md:py-20">
      <PlatformHeroVideoBg />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex gap-7">
          <PlatformAccentBar />
          <div className="space-y-5">
            <p className="text-sm font-semibold tracking-wide text-secondary">
              {COPY_BASELINE_A.eyebrow}
            </p>
            <h2 className="text-5xl font-semibold text-white md:text-6xl">
              {COPY_BASELINE_A.headlineLine1}
              <br />
              {COPY_BASELINE_A.headlineLine2}
            </h2>
            <p className="max-w-xl text-lg leading-7 text-platform-muted md:text-xl">
              {COPY_BASELINE_A.subhead}
            </p>
            <p className="text-lg font-medium text-secondary">
              {COPY_BASELINE_A.audience}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/demos" className="platform-btn-primary">
                Open product tour
              </Link>
              <Link href="/platform" className="platform-btn-secondary">
                Explore modules
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden min-h-[280px] lg:block" aria-hidden />
      </div>
    </section>
  );
}

function ContentVideoHeroGothamCentered() {
  return (
    <PlatformContentVideoHeroGotham
      copy={COPY_GOTHAM}
      showProductChrome
    />
  );
}

function ContentVideoHeroLifecycleSpan() {
  return (
    <PlatformContentVideoHeroGotham
      copy={PLATFORM_CONTENT_VIDEO_HERO}
      showProductChrome
    />
  );
}

function ContentVideoHeroOperatingLayer() {
  return (
    <PlatformContentVideoHeroGotham
      copy={COPY_OPERATING}
      showProductChrome
    />
  );
}

function ContentVideoHeroMinimalCinema() {
  return (
    <PlatformContentVideoHeroGotham
      copy={PLATFORM_CONTENT_VIDEO_HERO}
      minimalCinema
      showProductChrome
    />
  );
}

const variantMap: Record<ContentVideoHeroVariantId, ComponentType> = {
  current: ContentVideoHeroBaselineLeftColumn,
  "gotham-centered": ContentVideoHeroGothamCentered,
  "lifecycle-span": ContentVideoHeroLifecycleSpan,
  "operating-layer": ContentVideoHeroOperatingLayer,
  "minimal-cinema": ContentVideoHeroMinimalCinema,
};

export function ContentVideoHeroVariant({
  id,
}: {
  id: ContentVideoHeroVariantId;
}) {
  return createElement(variantMap[id]);
}
