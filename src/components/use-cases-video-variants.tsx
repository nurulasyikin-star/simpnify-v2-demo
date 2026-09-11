import type { ComponentType } from "react";
import { createElement } from "react";
import Link from "next/link";

import { HubCardGrid } from "@/components/platform/hub-card-grid";
import { PlatformScenarioButton } from "@/components/platform/scenario-button";
import { TabbedVideoPlayer } from "@/components/use-cases/tabbed-video-player";
import { UseCasesHubContent } from "@/components/use-cases/use-cases-hub-content";
import { YoutubeEmbed } from "@/components/use-cases/youtube-embed";
import { HUB_SOLUTION_CARDS } from "@/lib/platform";
import { USE_CASE_VIDEOS, type UseCaseVideo } from "@/lib/platform/use-case-videos";

export type UseCasesVideoVariantId =
  | "current"
  | "hero-spotlight"
  | "tabbed-player"
  | "video-grid"
  | "card-integrated";

export type UseCasesVideoVariantMeta = {
  id: UseCasesVideoVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
};

export const useCasesVideoVariants: UseCasesVideoVariantMeta[] = [
  {
    id: "current",
    title: "A — Current (baseline)",
    tagline:
      "Scenario hub cards only — no video yet. Text-led discovery with links to spoke pages.",
    pros: ["Fast to scan", "Low page weight", "Familiar card grid"],
    cons: [
      "No motion or operator proof",
      "Relies on static copy to sell scenarios",
      "Misses the five supplied demo reels",
    ],
  },
  {
    id: "hero-spotlight",
    title: "B — Hero spotlight + paired rows",
    tagline:
      "Overview reel up top, then each scenario row pairs its card with the matching clip.",
    pros: [
      "Strong first impression with platform overview",
      "Video tied to each use case in context",
      "Clear hierarchy: watch first, then pick a scenario",
    ],
    cons: [
      "Long scroll with five players",
      "Overview + four rows can feel repetitive",
    ],
  },
  {
    id: "tabbed-player",
    title: "C — Tabbed single player",
    tagline:
      "One focused player — switch between all five clips from a vertical playlist.",
    pros: [
      "Only one embed active at a time",
      "Compact footprint on desktop",
      "Good for comparing clips without scrolling",
    ],
    cons: [
      "Cards sit below the player — less “watch while browsing”",
      "Playlist pattern hides multiple videos at once",
    ],
  },
  {
    id: "video-grid",
    title: "D — Video grid above cards",
    tagline:
      "Five-up thumbnail grid (overview + four scenarios) sits above the existing hub cards.",
    pros: [
      "All clips visible at a glance",
      "Keeps hub cards unchanged underneath",
      "Easy to scan titles before playing",
    ],
    cons: [
      "Dense on mobile — may need horizontal scroll",
      "Separates video from card content",
    ],
  },
  {
    id: "card-integrated",
    title: "E — Card-integrated embeds",
    tagline:
      "Each hub card leads with its scenario video; overview spans full width above the grid.",
    pros: [
      "Video and scenario copy in one unit",
      "Best “show, then open” flow per use case",
      "Overview still gets hero treatment",
    ],
    cons: [
      "Taller cards — more vertical scroll",
      "Four simultaneous thumbnails compete for attention",
    ],
  },
];

function UseCasesSampleHero() {
  return (
    <div className="relative overflow-hidden border-b border-white/10 px-6 py-12 md:px-16 md:py-14">
      <div className="platform-scan-bg" aria-hidden />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex gap-7">
          <div className="w-1 shrink-0 rounded-full bg-secondary" aria-hidden />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Industrial scenarios
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Which situation sounds most like your site?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-platform-muted">
              Choose a scenario to discuss with your team. Each follows a decision
              path with a reviewable outcome.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UseCasesSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-[var(--platform-surface)]">
      <UseCasesSampleHero />
      <div className="px-6 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-7xl">{children}</div>
      </div>
    </section>
  );
}

function videoForSlug(slug: string): UseCaseVideo | undefined {
  return USE_CASE_VIDEOS.find((v) => v.scenarioSlug === slug);
}

/** A — production today: cards only */
export function UseCasesVideoVariantCurrent() {
  return (
    <UseCasesSection>
      <HubCardGrid cards={HUB_SOLUTION_CARDS} columns={2} />
    </UseCasesSection>
  );
}

/** B — overview hero + paired card/video rows (ships on /solutions) */
export function UseCasesVideoVariantHeroSpotlight() {
  return (
    <UseCasesSection>
      <UseCasesHubContent />
    </UseCasesSection>
  );
}

/** C — tabbed single player + cards below */
export function UseCasesVideoVariantTabbedPlayer() {
  return (
    <UseCasesSection>
      <TabbedVideoPlayer />
      <div className="mt-14">
        <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-platform-subtle">
          Explore scenarios
        </h3>
        <HubCardGrid cards={HUB_SOLUTION_CARDS} columns={2} />
      </div>
    </UseCasesSection>
  );
}

/** D — five-up grid above hub cards */
export function UseCasesVideoVariantVideoGrid() {
  return (
    <UseCasesSection>
      <div className="mb-12">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-secondary">
          Scenario demos
        </h3>
        <p className="mb-6 max-w-2xl text-sm text-platform-muted">
          Click a thumbnail to load the clip. Overview plus one reel per industrial
          use case.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {USE_CASE_VIDEOS.map((video) => (
            <li key={video.id}>
              <YoutubeEmbed video={video} />
              <p className="mt-2 text-xs font-medium text-white">{video.title}</p>
            </li>
          ))}
        </ul>
      </div>
      <HubCardGrid cards={HUB_SOLUTION_CARDS} columns={2} />
    </UseCasesSection>
  );
}

/** E — overview hero + cards with embedded video */
export function UseCasesVideoVariantCardIntegrated() {
  const overview = USE_CASE_VIDEOS[0];

  return (
    <UseCasesSection>
      <div className="mb-10">
        <YoutubeEmbed video={overview} />
        <p className="mt-3 text-center text-sm text-platform-muted">
          {overview.title} — {overview.description}
        </p>
      </div>

      <ul className="grid gap-5 md:grid-cols-2">
        {HUB_SOLUTION_CARDS.map((card) => {
          const video = videoForSlug(card.slug);
          return (
            <li key={card.slug}>
              <article className="platform-hub-card h-full overflow-hidden !p-0">
                {video ? (
                  <div className="border-b border-white/10 p-4 pb-0">
                    <YoutubeEmbed video={video} className="!rounded-lg" />
                  </div>
                ) : null}
                <div className="flex h-full flex-col p-5">
                  <h3 className="text-xl font-semibold text-secondary md:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-base leading-7 text-platform-muted md:text-lg">
                    {card.description}
                  </p>
                  <PlatformScenarioButton href={card.href} className="mt-5" />
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </UseCasesSection>
  );
}

const variantMap: Record<UseCasesVideoVariantId, ComponentType> = {
  current: UseCasesVideoVariantCurrent,
  "hero-spotlight": UseCasesVideoVariantHeroSpotlight,
  "tabbed-player": UseCasesVideoVariantTabbedPlayer,
  "video-grid": UseCasesVideoVariantVideoGrid,
  "card-integrated": UseCasesVideoVariantCardIntegrated,
};

export function UseCasesVideoVariant({ id }: { id: UseCasesVideoVariantId }) {
  return createElement(variantMap[id]);
}
