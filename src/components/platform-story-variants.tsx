import type { ComponentType } from "react";
import { createElement } from "react";

import { PlatformChallenge } from "@/components/platform-challenge";
import { PlatformChallengesMerged } from "@/components/platform-challenges-merged";
import { PlatformCta } from "@/components/platform-cta";
import { PlatformDecisionOsBanner } from "@/components/platform-decision-os-banner";
import { PlatformHero } from "@/components/platform-hero";
import { PlatformIntro } from "@/components/platform-intro";
import { PlatformIntroSolution } from "@/components/platform-intro-solution";
import { PlatformLifecycleBridge } from "@/components/platform-lifecycle-bridge";
import { PlatformOperatingModel } from "@/components/platform-operating-model";
import { PlatformSiteChallenges } from "@/components/platform-site-challenges";
import { PlatformSolution } from "@/components/platform-solution";
import { PlatformSopDigitalTwin } from "@/components/platform-sop-digital-twin";
import { PlatformTrustSurface } from "@/components/platform-trust-surface";
import { PlatformValuePillars } from "@/components/platform-value-pillars";
import { PlatformWhySimpnify } from "@/components/platform-why-simpnify";
import { PlatformWorkspacesGridSection } from "@/components/platform-workspaces-grid-section";
import { PlatformStatBar } from "@/components/platform/stat-bar";
import { PlatformWorkspacesSection } from "@/components/platform/workspaces-section";
import { STORY_EXTRACTION_NOTES } from "@/lib/platform/client-story";
import { COMPANY_STATS } from "@/lib/platform";

export type PlatformStoryVariantId =
  | "current"
  | "gotham-scroll"
  | "help-mirror"
  | "consolidated-extraction"
  | "decision-os-lite";

export type PlatformStorySectionKey =
  | "decision-os"
  | "hero"
  | "stats"
  | "intro"
  | "site-challenges"
  | "challenge"
  | "merged-challenges"
  | "solution"
  | "intro-solution"
  | "lifecycle"
  | "lifecycle-bridge"
  | "workspaces-grid"
  | "workspaces-list"
  | "why"
  | "sop-twin"
  | "value-pillars"
  | "trust"
  | "cta";

export type PlatformStoryVariantMeta = {
  id: PlatformStoryVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
  sections: PlatformStorySectionKey[];
  extractionFocus: string[];
};

export const platformStoryVariants: PlatformStoryVariantMeta[] = [
  {
    id: "current",
    title: "A — Current production",
    tagline:
      "Baseline /our-platform — existing marketing sections only; no Help/Gotham extraction blocks.",
    pros: [
      "Unchanged stakeholder expectation",
      "Full legacy simpnify.com story on one scroll",
      "Safe default until you pick",
    ],
    cons: [
      "Workspaces live only on /platform — not on homepage",
      "No trust/deployment block for enterprise buyers",
      "Website vs Help vocabulary not shown",
    ],
    sections: [
      "hero",
      "stats",
      "intro",
      "site-challenges",
      "challenge",
      "solution",
      "lifecycle",
      "why",
      "sop-twin",
      "value-pillars",
      "cta",
    ],
    extractionFocus: [],
  },
  {
    id: "gotham-scroll",
    title: "B — Gotham-style scroll",
    tagline:
      "Decision-OS positioning → lifecycle first → workspace hub → merged challenges → features → trust.",
    pros: [
      "Matches enterprise platform storytelling (outcomes before brochure)",
      "Surfaces six workspaces on the homepage",
      "Trust block from Help architecture without manual depth",
    ],
    cons: [
      "Cuts intro/solution/value-pillars — less legacy copy",
      "Long mid-page before Why Simpnify",
      "Positioning banner may feel bold for conservative buyers",
    ],
    sections: [
      "decision-os",
      "hero",
      "stats",
      "lifecycle",
      "workspaces-grid",
      "merged-challenges",
      "why",
      "sop-twin",
      "trust",
      "cta",
    ],
    extractionFocus: [
      "Gotham fuse → decide → act → learn",
      "Help workspace map on homepage",
      "Trust & deployment teaser",
    ],
  },
  {
    id: "help-mirror",
    title: "C — Help Center mirror",
    tagline:
      "Intro → workspace list (Help IA) → lifecycle → vocabulary bridge → solution depth.",
    pros: [
      "Closest alignment to 192.168 Help Center structure",
      "Lifecycle bridge explains Detect vs Accept/Record",
      "List layout matches operator documentation tone",
    ],
    cons: [
      "Still has challenge + solution length",
      "No decision-OS banner",
      "Two workspace layouts if user also sees variant B",
    ],
    sections: [
      "hero",
      "stats",
      "intro",
      "workspaces-list",
      "lifecycle",
      "lifecycle-bridge",
      "site-challenges",
      "challenge",
      "solution",
      "sop-twin",
      "cta",
    ],
    extractionFocus: [
      "Choose your workspace",
      "Accept → Act → Record → Close mapping",
      "Product architecture intro retained",
    ],
  },
  {
    id: "consolidated-extraction",
    title: "D — Consolidated + extraction",
    tagline:
      "Tighter story (merged intro/solution + challenges) plus workspace grid and trust — best of redundancy fix + client pack.",
    pros: [
      "Resolves duplicate intro/solution and dual challenges",
      "Workspaces + trust for RFP-ready homepage",
      "Keeps Why + SOP/twin proof",
    ],
    cons: [
      "No value pillars or lifecycle bridge table",
      "Biggest content edit vs production",
      "Requires comfort with shorter “brochure” repetition",
    ],
    sections: [
      "hero",
      "stats",
      "intro-solution",
      "merged-challenges",
      "lifecycle",
      "workspaces-grid",
      "why",
      "sop-twin",
      "trust",
      "cta",
    ],
    extractionFocus: [
      "Merged marketing copy",
      "Workspace hub + governance footer",
      "Incident lifecycle with module links",
    ],
  },
  {
    id: "decision-os-lite",
    title: "E — Decision OS lite",
    tagline:
      "Short Palantir-like arc: positioning → hero → pillars → lifecycle → workspaces → trust → CTA.",
    pros: [
      "Shortest extracted narrative — fast client read",
      "Value pillars carry See / Coordinate / Prove",
      "Pushes depth to /platform and /demos",
    ],
    cons: [
      "Drops CISA/site challenges and SOP section on homepage",
      "Lightest product proof on scroll",
      "Depends on CTAs to demos",
    ],
    sections: [
      "decision-os",
      "hero",
      "stats",
      "value-pillars",
      "lifecycle",
      "workspaces-list",
      "trust",
      "cta",
    ],
    extractionFocus: [
      "Operating layer headline",
      "Outcome triad + lifecycle",
      "Enterprise trust without specs",
    ],
  },
];

const SECTION_LABELS: Record<PlatformStorySectionKey, string> = {
  "decision-os": "Decision OS banner",
  hero: "Hero",
  stats: "Stat bar",
  intro: "Intro",
  "site-challenges": "Site challenges",
  challenge: "Operator challenges",
  "merged-challenges": "Merged challenges",
  solution: "Solution",
  "intro-solution": "Intro + Solution",
  lifecycle: "Incident lifecycle",
  "lifecycle-bridge": "Help ↔ marketing table",
  "workspaces-grid": "Workspaces (card grid)",
  "workspaces-list": "Workspaces (Help list)",
  why: "Why Simpnify",
  "sop-twin": "SOP + Digital twin",
  "value-pillars": "Value pillars",
  trust: "Trust & deployment",
  cta: "Next step CTA",
};

const SECTION_COMPONENTS: Record<PlatformStorySectionKey, ComponentType> = {
  "decision-os": PlatformDecisionOsBanner,
  hero: PlatformHero,
  stats: () => <PlatformStatBar stats={COMPANY_STATS} />,
  intro: PlatformIntro,
  "site-challenges": PlatformSiteChallenges,
  challenge: PlatformChallenge,
  "merged-challenges": PlatformChallengesMerged,
  solution: PlatformSolution,
  "intro-solution": PlatformIntroSolution,
  lifecycle: PlatformOperatingModel,
  "lifecycle-bridge": PlatformLifecycleBridge,
  "workspaces-grid": PlatformWorkspacesGridSection,
  "workspaces-list": PlatformWorkspacesSection,
  why: PlatformWhySimpnify,
  "sop-twin": PlatformSopDigitalTwin,
  "value-pillars": PlatformValuePillars,
  trust: PlatformTrustSurface,
  cta: PlatformCta,
};

export function PlatformStorySectionStack({
  sections,
}: {
  sections: PlatformStorySectionKey[];
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {sections.map((key) => (
        <span
          key={key}
          className="rounded-md border border-secondary/25 bg-secondary/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-secondary"
        >
          {SECTION_LABELS[key]}
        </span>
      ))}
    </div>
  );
}

export function PlatformStoryVariant({ id }: { id: PlatformStoryVariantId }) {
  const variant = platformStoryVariants.find((item) => item.id === id);
  if (!variant) return null;

  return (
    <div className="bg-[var(--platform-surface)] pt-16">
      {variant.sections.map((sectionKey) =>
        createElement(SECTION_COMPONENTS[sectionKey], {
          key: sectionKey,
        }),
      )}
    </div>
  );
}

export { STORY_EXTRACTION_NOTES };
