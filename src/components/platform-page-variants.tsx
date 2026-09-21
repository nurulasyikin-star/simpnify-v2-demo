import type { ComponentType } from "react";
import { createElement } from "react";

import { PlatformChallenge } from "@/components/platform-challenge";
import { PlatformChallengesMerged } from "@/components/platform-challenges-merged";
import { PlatformCta } from "@/components/platform-cta";
import { PlatformHero } from "@/components/platform-hero";
import { PlatformIntro } from "@/components/platform-intro";
import { PlatformIntroSolution } from "@/components/platform-intro-solution";
import { PlatformOperatingModel } from "@/components/platform-operating-model";
import { PlatformSiteChallenges } from "@/components/platform-site-challenges";
import { PlatformSolution } from "@/components/platform-solution";
import { PlatformSopDigitalTwin } from "@/components/platform-sop-digital-twin";
import { PlatformValuePillars } from "@/components/platform-value-pillars";
import { PlatformWhySimpnify } from "@/components/platform-why-simpnify";
import { PlatformStatBar } from "@/components/platform/stat-bar";
import { COMPANY_STATS } from "@/lib/platform";

export type PlatformPageVariantId =
  | "current"
  | "merged-challenges"
  | "no-value-pillars"
  | "consolidated-story"
  | "landing-lite";

export type PlatformSectionKey =
  | "hero"
  | "stats"
  | "intro"
  | "site-challenges"
  | "challenge"
  | "merged-challenges"
  | "solution"
  | "intro-solution"
  | "lifecycle"
  | "why"
  | "sop-twin"
  | "value-pillars"
  | "cta";

export type RedundancyDecision = {
  id: string;
  label: string;
  overlap: string;
  locations: string[];
  options: string[];
};

export const redundancyDecisions: RedundancyDecision[] = [
  {
    id: "dual-challenges",
    label: "Two challenge sections back-to-back",
    overlap:
      "Site-scale challenges (one-site, multi-site, CISA) then operator pain (fragmented context, ownership, evidence) — same 3-card pattern twice.",
    locations: ["PlatformSiteChallenges", "PlatformChallenge"],
    options: [
      "Keep both (current)",
      "Merge into one section (variant B)",
      "Keep site challenges only — cut operator cards",
      "Keep operator pain only — cut site cards",
    ],
  },
  {
    id: "see-coordinate-proof",
    label: "“See / Coordinate / Keep” triad repeated",
    overlap:
      "Hero H1 is literally “See the site. Coordinate the response.” Value pillars add “See / Coordinate / Keep the proof” with the same lifecycle arc.",
    locations: ["PlatformHero", "PlatformValuePillars"],
    options: [
      "Keep both",
      "Cut Value Pillars — hero + lifecycle already cover it (variant C)",
      "Cut hero sub-copy — let Value Pillars own the triad",
    ],
  },
  {
    id: "operational-story",
    label: "“One operational story” line repeated",
    overlap:
      "“From the first alert to the final review” appears in hero body, Value Pillars description, and CTA copy.",
    locations: ["PlatformHero", "PlatformValuePillars", "PlatformCta"],
    options: [
      "Keep in hero only",
      "Keep in CTA only (closing bookend)",
      "Keep all — intentional reinforcement",
    ],
  },
  {
    id: "platform-definition",
    label: "Platform definition stated twice",
    overlap:
      "Intro and Solution both open with “unified platform integrating physical/cyber security” — Solution adds a long marketing paragraph on top.",
    locations: ["PlatformIntro", "PlatformSolution"],
    options: [
      "Keep both (current)",
      "Merge Intro + Solution (variant D)",
      "Cut Intro — Solution owns the definition",
      "Cut Solution prose — Intro + images only",
    ],
  },
  {
    id: "cisa-convergence",
    label: "CISA convergence mentioned twice",
    overlap:
      "Site challenges card #3 is CISA convergence; Why Simpnify bullet #2 is “Fulfils the latest requirement of CISA.”",
    locations: ["PlatformSiteChallenges", "PlatformWhySimpnify"],
    options: [
      "Keep in Why Simpnify only",
      "Keep in site challenges only",
      "Keep both — different audiences",
    ],
  },
  {
    id: "lifecycle-vs-pillars",
    label: "Lifecycle outcomes mirror value pillars",
    overlap:
      "Detect+Understand ≈ See; Respond ≈ Coordinate; Prove ≈ Keep proof — Operating Model and Value Pillars tell the same story.",
    locations: ["PlatformOperatingModel", "PlatformValuePillars"],
    options: [
      "Keep lifecycle only (variant C/D/E)",
      "Keep pillars only — cut lifecycle module links",
      "Keep both — pillars are summary, lifecycle is detail",
    ],
  },
  {
    id: "sop-workflow",
    label: "SOP / workflow story in three places",
    overlap:
      "User-configurable SOP section, Lifecycle “Respond” stage, and /demos hub all cover workflow builder & guided response.",
    locations: [
      "PlatformSopDigitalTwin",
      "PlatformOperatingModel",
      "/demos",
    ],
    options: [
      "Keep on platform page",
      "Lifecycle link only — cut SOP section (variant E)",
      "SOP section only — trim lifecycle module list",
    ],
  },
  {
    id: "pilot-teaser",
    label: "Pilot steps on platform + full /pilot page",
    overlap:
      "PlatformCta shows 3-step pilot teaser; /pilot has the full sequence, roles and acceptance checklist.",
    locations: ["PlatformCta", "/pilot"],
    options: [
      "Keep teaser + link (current)",
      "CTA buttons only — no inline steps (variant E)",
      "Expand CTA — remove separate /pilot page",
    ],
  },
  {
    id: "company-stats",
    label: "Company stat bar on platform + About",
    overlap:
      "Same COMPANY_STATS (10+ years, 4 offices, 2 domains) on /our-platform and /about.",
    locations: ["PlatformStatBar on /our-platform", "AboutUsContent"],
    options: [
      "Keep both",
      "Platform only",
      "About only",
    ],
  },
];

export type PlatformPageVariantMeta = {
  id: PlatformPageVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
  sections: PlatformSectionKey[];
  resolves: string[];
};

export const platformPageVariants: PlatformPageVariantMeta[] = [
  {
    id: "current",
    title: "A — Current (baseline)",
    tagline:
      "All 11 sections as shipped — every story beat, including the overlaps flagged above.",
    pros: [
      "Nothing removed — safe for stakeholder demos",
      "Mirrors legacy simpnify.com section order",
      "Each topic has its own scroll anchor",
    ],
    cons: [
      "Two challenge sections feel repetitive",
      "Hero + Value Pillars + Lifecycle say the same arc",
      "Intro + Solution duplicate the platform pitch",
      "Long scroll before CTA",
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
    resolves: [],
  },
  {
    id: "merged-challenges",
    title: "B — Merged challenges",
    tagline:
      "One challenge block: site-scale cards on top, operator-pain cards below — cuts the back-to-back duplicate headers.",
    pros: [
      "Fixes the most obvious redundancy",
      "Keeps all challenge content",
      "Clear “sites → operators” narrative flow",
    ],
    cons: [
      "Still a long challenge section",
      "Value pillars + intro/solution overlap remain",
    ],
    sections: [
      "hero",
      "stats",
      "intro",
      "merged-challenges",
      "solution",
      "lifecycle",
      "why",
      "sop-twin",
      "value-pillars",
      "cta",
    ],
    resolves: ["dual-challenges"],
  },
  {
    id: "no-value-pillars",
    title: "C — Cut value pillars",
    tagline:
      "Remove Value Pillars — hero headline and lifecycle outcomes already own See / Coordinate / Prove.",
    pros: [
      "Removes the clearest copy echo",
      "Shorter page without losing the arc",
      "Lifecycle stays as the proof point",
    ],
    cons: [
      "Loses the icon-card summary for skimmers",
      "Challenge + intro/solution overlap remain",
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
      "cta",
    ],
    resolves: ["see-coordinate-proof", "lifecycle-vs-pillars"],
  },
  {
    id: "consolidated-story",
    title: "D — Consolidated story",
    tagline:
      "Merge challenges + intro/solution + cut value pillars — one tighter narrative before lifecycle and features.",
    pros: [
      "Resolves 4 redundancy clusters at once",
      "Still shows images and full lifecycle",
      "Better pacing for first-time visitors",
    ],
    cons: [
      "Further from legacy site section order",
      "Less “marketing brochure” repetition",
      "Still includes Why + SOP blocks",
    ],
    sections: [
      "hero",
      "stats",
      "intro-solution",
      "merged-challenges",
      "lifecycle",
      "why",
      "sop-twin",
      "cta",
    ],
    resolves: [
      "dual-challenges",
      "see-coordinate-proof",
      "platform-definition",
      "lifecycle-vs-pillars",
    ],
  },
  {
    id: "landing-lite",
    title: "E — Landing lite",
    tagline:
      "Hero, stats, lifecycle and CTA only — push site challenges, why, SOP and demos to subpages.",
    pros: [
      "Shortest homepage — fastest path to CTA",
      "Zero section-level duplication on this page",
      "Forces depth into /platform, /demos, /about",
    ],
    cons: [
      "Loses legacy website content on the homepage",
      "Buyers must click through for CISA/JESIP/SOP proof",
      "Biggest structural change",
    ],
    sections: ["hero", "stats", "lifecycle", "cta"],
    resolves: [
      "dual-challenges",
      "see-coordinate-proof",
      "platform-definition",
      "cisa-convergence",
      "lifecycle-vs-pillars",
      "sop-workflow",
      "pilot-teaser",
    ],
  },
];

const SECTION_LABELS: Record<PlatformSectionKey, string> = {
  hero: "Hero",
  stats: "Stat bar",
  intro: "Intro",
  "site-challenges": "Site challenges",
  challenge: "Operator challenges",
  "merged-challenges": "Merged challenges",
  solution: "Solution",
  "intro-solution": "Intro + Solution",
  lifecycle: "Incident lifecycle",
  why: "Why Simpnify",
  "sop-twin": "SOP + Digital twin",
  "value-pillars": "Value pillars",
  cta: "Next step CTA",
};

const SECTION_COMPONENTS: Record<PlatformSectionKey, ComponentType> = {
  hero: PlatformHero,
  stats: () => <PlatformStatBar stats={COMPANY_STATS} />,
  intro: PlatformIntro,
  "site-challenges": PlatformSiteChallenges,
  challenge: PlatformChallenge,
  "merged-challenges": PlatformChallengesMerged,
  solution: PlatformSolution,
  "intro-solution": PlatformIntroSolution,
  lifecycle: PlatformOperatingModel,
  why: PlatformWhySimpnify,
  "sop-twin": PlatformSopDigitalTwin,
  "value-pillars": PlatformValuePillars,
  cta: PlatformCta,
};

export function PlatformSectionStack({
  sections,
}: {
  sections: PlatformSectionKey[];
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

export function PlatformPageVariant({ id }: { id: PlatformPageVariantId }) {
  const variant = platformPageVariants.find((item) => item.id === id);
  if (!variant) return null;

  return (
    <div className="bg-[var(--platform-surface)]">
      {variant.sections.map((sectionKey) =>
        createElement(SECTION_COMPONENTS[sectionKey], {
          key: sectionKey,
        }),
      )}
    </div>
  );
}

export function RedundancyDecisionCard({
  item,
  resolvedBy,
}: {
  item: RedundancyDecision;
  resolvedBy: PlatformPageVariantId[];
}) {
  return (
    <article className="rounded-xl border border-white/10 bg-[#0c1a22]/40 p-5">
      <h3 className="text-sm font-semibold text-white">{item.label}</h3>
      <p className="mt-2 text-sm leading-6 text-platform-muted">{item.overlap}</p>
      <p className="mt-3 text-xs text-platform-subtle">
        <span className="font-semibold text-platform-muted">Where: </span>
        {item.locations.join(" · ")}
      </p>
      <ul className="mt-3 space-y-1">
        {item.options.map((option) => (
          <li key={option} className="text-xs leading-5 text-platform-muted">
            ○ {option}
          </li>
        ))}
      </ul>
      {resolvedBy.length > 0 ? (
        <p className="mt-3 text-xs text-secondary">
          Addressed by:{" "}
          {resolvedBy
            .map((variantId) => variantId.replace("-", " "))
            .join(", ")}
        </p>
      ) : null}
    </article>
  );
}

export function VariantResolvedList({ ids }: { ids: string[] }) {
  if (ids.length === 0) {
    return (
      <p className="text-xs text-platform-subtle">
        Baseline — no redundancies resolved yet.
      </p>
    );
  }

  return (
    <ul className="space-y-1">
      {ids.map((resolveId) => {
        const decision = redundancyDecisions.find((d) => d.id === resolveId);
        return (
          <li key={resolveId} className="text-xs text-platform-muted">
            ✓ {decision?.label ?? resolveId}
          </li>
        );
      })}
    </ul>
  );
}
