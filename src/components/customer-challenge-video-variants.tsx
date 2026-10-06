import { CUSTOMER_CHALLENGES } from "@/lib/platform";
import { CHALLENGE_NARRATIVE_COPY } from "@/lib/platform/challenge-story-videos";
import { createElement, type ComponentType } from "react";

import { PlatformChallenge } from "@/components/platform-challenge";
import {
  ChallengeChapterTabbedPlayer,
  ChallengeNarrativeReelEmbed,
  ChallengeSplitSyncPlayer,
  ChallengeStoryboardGrid,
} from "@/components/customer-challenge-video-player";

import { PlatformSectionHeader } from "./platform-section-header";

export type CustomerChallengeVideoVariantId =
  | "current"
  | "cinema-first"
  | "split-sync"
  | "chapter-tabs"
  | "storyboard-reel";

export type CustomerChallengeVideoVariantMeta = {
  id: CustomerChallengeVideoVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
  videoPlan: string[];
};

export const customerChallengeVideoVariants: CustomerChallengeVideoVariantMeta[] =
  [
    {
      id: "current",
      title: "A — Current (baseline)",
      tagline:
        "Text + three cards only — no motion. Matches today’s PlatformChallenge block.",
      pros: [
        "Lightweight and accessible",
        "Hook + cards read well in static decks",
        "Easy to localize",
      ],
      cons: [
        "Doesn’t show the “gap” viscerally",
        "Hook is read, not felt",
        "No reusable sales reel from this block",
      ],
      videoPlan: [
        "No video — use copy as VO script for variants B–E",
        "Eyebrow in production is “THE CHALLENGE” (not Customer)",
      ],
    },
    {
      id: "cinema-first",
      title: "B — Cinema first, cards recap",
      tagline:
        "Hook headline → full narrative reel → same three cards as takeaways after watch.",
      pros: [
        "One arc (60–90s target reel)",
        "Cards reinforce memory post-video",
        "Natural for homepage / platform hero handoff",
      ],
      cons: [
        "Tall section; skimmers may skip play",
        "Requires one polished master cut",
      ],
      videoPlan: [
        "Master reel: siloed UIs → unified incident thread",
        "VO: sensor / camera / person / “who connects”",
        "End on closing line; cards = no extra footage",
      ],
    },
    {
      id: "split-sync",
      title: "C — Split sync (editor brief)",
      tagline:
        "Sticky player + clickable beats with timestamps, shot list, and VO per card.",
      pros: [
        "Aligns marketing, product, and editor before final cut",
        "Works with placeholder clips today",
        "Best for stakeholder sign-off",
      ],
      cons: [
        "Briefing UI, not bingeable cinema",
        "Heavy when stacked on mobile",
      ],
      videoPlan: [
        "Three acts (~28s + 24s + 28s) mapped to cards 01–03",
        "Merge to master reel (variant B) when approved",
      ],
    },
    {
      id: "chapter-tabs",
      title: "D — Chapter tabs (one clip per card)",
      tagline:
        "Tabbed player: Fragmented context / Unclear ownership / Inconsistent evidence as separate clips.",
      pros: [
        "Modular updates per pain point",
        "1:1 with sales talk tracks",
        "Single active embed — lighter than E",
      ],
      cons: [
        "Weaker continuous story than B",
        "Extra click to see all three pains",
      ],
      videoPlan: [
        "Three 20–35s micro-clips + optional shared bumper",
        "Reuse clips on Use Cases or in decks",
      ],
    },
    {
      id: "storyboard-reel",
      title: "E — Storyboard grid + master reel",
      tagline:
        "Director panels (timecode, shots, VO) plus target assembled reel at the bottom.",
      pros: [
        "Clearest handoff from screenshot copy to edit",
        "Live micro-previews per card",
        "Documents what “explain in video” means",
      ],
      cons: [
        "Three thumbnails compete for attention",
        "Not how final page should feel — production tool",
      ],
      videoPlan: [
        "Export shot lists from CHALLENGE_STORYBOARD_BEATS",
        "Editor delivers B’s master reel; retire grid on public site",
      ],
    },
  ];

function ChallengeTakeawayCards() {
  return (
    <>
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {CUSTOMER_CHALLENGES.map(({ number, title, description }) => (
          <li key={number} className="platform-glass-card">
            <p className="text-sm font-semibold text-secondary">{number}</p>
            <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-platform-muted">
              {description}
            </p>
          </li>
        ))}
      </ul>
      <p className="platform-glass-card mt-8 text-center text-sm leading-6 text-white/90 md:text-base">
        {CHALLENGE_NARRATIVE_COPY.closing}
      </p>
    </>
  );
}

function VariantCurrent() {
  return <PlatformChallenge />;
}

function VariantCinemaFirst() {
  return (
    <section className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow={CHALLENGE_NARRATIVE_COPY.eyebrow}
          title={CHALLENGE_NARRATIVE_COPY.title}
          description={CHALLENGE_NARRATIVE_COPY.hook}
        />
        <div className="mt-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-platform-subtle">
            Narrative reel
          </p>
          <ChallengeNarrativeReelEmbed />
        </div>
        <ChallengeTakeawayCards />
      </div>
    </section>
  );
}

function VariantSplitSync() {
  return (
    <section className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow={CHALLENGE_NARRATIVE_COPY.eyebrow}
          title={CHALLENGE_NARRATIVE_COPY.title}
          description="Select a beat to sync the placeholder clip with the shot list and VO your editor should produce."
        />
        <div className="mt-10">
          <ChallengeSplitSyncPlayer />
        </div>
        <p className="platform-glass-card mt-8 text-center text-sm leading-6 text-white/90">
          {CHALLENGE_NARRATIVE_COPY.closing}
        </p>
      </div>
    </section>
  );
}

function VariantChapterTabs() {
  return (
    <section className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow={CHALLENGE_NARRATIVE_COPY.eyebrow}
          title={CHALLENGE_NARRATIVE_COPY.title}
          description={CHALLENGE_NARRATIVE_COPY.hook}
        />
        <div className="mt-10">
          <ChallengeChapterTabbedPlayer />
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {CUSTOMER_CHALLENGES.map(({ number, title, description }) => (
            <li
              key={number}
              className="platform-glass-card border-secondary/10"
            >
              <p className="text-sm font-semibold text-secondary">{number}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-platform-muted">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function VariantStoryboardReel() {
  return (
    <section className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow={CHALLENGE_NARRATIVE_COPY.eyebrow}
          title="Storyboard: three acts for one narrative"
          description="Each panel matches one card from your screenshot — duration, shots, VO, and preview."
        />
        <div className="mt-10">
          <ChallengeStoryboardGrid />
        </div>
        <div className="mt-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-platform-subtle">
            Assembled reel (target)
          </p>
          <ChallengeNarrativeReelEmbed />
        </div>
        <p className="platform-glass-card mt-8 text-center text-sm leading-6 text-white/90">
          {CHALLENGE_NARRATIVE_COPY.closing}
        </p>
      </div>
    </section>
  );
}

const customerChallengeVideoMap: Record<
  CustomerChallengeVideoVariantId,
  ComponentType
> = {
  current: VariantCurrent,
  "cinema-first": VariantCinemaFirst,
  "split-sync": VariantSplitSync,
  "chapter-tabs": VariantChapterTabs,
  "storyboard-reel": VariantStoryboardReel,
};

export function CustomerChallengeVideoVariant({
  id,
}: {
  id: CustomerChallengeVideoVariantId;
}) {
  return createElement(customerChallengeVideoMap[id]);
}

/** Stub: site challenges section above customer challenge on /our-platform */
export function CustomerChallengeVideoPreviewContext() {
  return (
    <div className="border-b border-white/10 bg-black px-6 py-8 md:px-16">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-platform-subtle">
          Sample context — section above on /our-platform
        </p>
        <p className="mt-3 text-lg font-semibold text-white">
          Managing diverse subsystems and converging security functions
        </p>
        <p className="mt-2 text-sm text-platform-muted">
          Site-scale challenges (three image cards) — then this customer
          challenge block.
        </p>
      </div>
    </div>
  );
}
