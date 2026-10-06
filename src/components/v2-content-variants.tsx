import { createElement, type ComponentType } from "react";
import Link from "next/link";
import {
  Bot,
  Building2,
  Layers,
  LayoutTemplate,
  Map,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

import { PlatformChallenge } from "@/components/platform-challenge";
import { PlatformCta } from "@/components/platform-cta";
import { PlatformHero } from "@/components/platform-hero";
import { PlatformImage } from "@/components/platform-image";
import { PlatformIntro } from "@/components/platform-intro";
import { PlatformOperatingModel } from "@/components/platform-operating-model";
import { PlatformSectionHeader } from "@/components/platform-section-header";
import { PlatformSolution } from "@/components/platform-solution";
import { PlatformSopDigitalTwin } from "@/components/platform-sop-digital-twin";
import { PlatformStatBar } from "@/components/platform/stat-bar";
import { PlatformValuePillars } from "@/components/platform-value-pillars";
import { PlatformWhySimpnify } from "@/components/platform-why-simpnify";
import { HubCardGrid } from "@/components/platform/hub-card-grid";
import { PlatformScenarioButton } from "@/components/platform/scenario-button";
import { ResponderSosCard } from "@/components/responder-sos-card";
import {
  COMPANY_STATS,
  HUB_SOLUTION_CARDS,
  SOLUTION_SCENARIOS,
  WORKSPACES,
} from "@/lib/platform";
import type { HubCard } from "@/lib/platform/types";

export type V2ContentVariantId =
  | "current"
  | "pdf-chapters"
  | "capability-first"
  | "use-case-led"
  | "compact-landing";

export type V2ContentVariantMeta = {
  id: V2ContentVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
  stripsV1: boolean;
};

export const v2ContentVariants: V2ContentVariantMeta[] = [
  {
    id: "current",
    title: "A — Current (baseline)",
    tagline:
      "What ships on /our-platform today: v2 hero + challenge mixed with v1 solution copy, CISA/JESIP, SOP, and company stats. Floor plan, AURA, SOS and mobile stay hidden.",
    pros: [
      "Nothing removed — safe if stakeholders still want the old brochure",
      "Matches the live demo site exactly",
    ],
    cons: [
      "v1 copy still leads (CISA, JESIP, “integrate unconnected devices”)",
      "Boss checklist is mostly off-page or gated",
      "PDF story is buried under legacy sections",
    ],
    stripsV1: false,
  },
  {
    id: "pdf-chapters",
    title: "B — PDF chapter order",
    tagline:
      "Follow the v2 deck: challenge → value → workspaces → lifecycle → boss capabilities → use cases → pilot. All v1 marketing blocks removed.",
    pros: [
      "Same narrative as the sales PDF",
      "Every boss item has a named section",
      "Workspaces show the full product, not the gated subset",
    ],
    cons: [
      "Longest v2 page — more scrolling than C or E",
      "Capabilities sit after lifecycle, so the checklist is not first",
    ],
    stripsV1: true,
  },
  {
    id: "capability-first",
    title: "C — Capability-first",
    tagline:
      "Lead with the boss list (Map, AURA, GIS, Floor plan, Enclosed environment, Mobile), then the three named use cases. Shortest path to “we have what you asked.”",
    pros: [
      "Checklist is impossible to miss",
      "Use cases sit next to the tools that run them",
      "No v1 leftover, no duplicate value/lifecycle blocks",
    ],
    cons: [
      "Less “why it matters” before the product",
      "Does not walk the PDF chapter order",
    ],
    stripsV1: true,
  },
  {
    id: "use-case-led",
    title: "D — Use-case led",
    tagline:
      "Hero, then company highlights and Unified Risk Management — then scenarios. Map / GIS / floor plan / enclosed / AURA / mobile appear as tools on each story.",
    pros: [
      "Keeps the stat bar and platform headline from today’s page",
      "Matches how buyers talk (“what happens at 02:14”)",
      "Capabilities feel proven, not listed",
      "Directly covers the use-case line in the brief",
    ],
    cons: [
      "AURA and GIS are supporting chips, not hero features",
      "Harder to audit the six capabilities at a glance",
    ],
    stripsV1: true,
  },
  {
    id: "compact-landing",
    title: "E — Compact v2 landing",
    tagline:
      "Hero, dense 6-up capabilities, three use-case buttons, value triad, CTA. A first-meeting page — depth stays on /demos and /solutions.",
    pros: [
      "Fastest scan for a 10-minute review",
      "Still hits every boss requirement",
      "Clearest “v1 is gone” impression",
    ],
    cons: [
      "Least product UI on the homepage",
      "Workspaces and lifecycle live only on inner pages",
    ],
    stripsV1: true,
  },
];

type CapabilityId =
  | "map"
  | "aura"
  | "gis"
  | "floor-plan"
  | "enclosed"
  | "mobile";

type V2Capability = {
  id: CapabilityId;
  title: string;
  summary: string;
  detail: string;
  href: string;
  image: string;
  alt: string;
  icon: LucideIcon;
};

const V2_CAPABILITIES: V2Capability[] = [
  {
    id: "map",
    title: "Map",
    summary: "Locate the event before deploying the team.",
    detail:
      "Shared console map keeps requestor, responders and devices in one operating picture as the response progresses.",
    href: "/demo/sos",
    image: "/platform/carousel/sos-05-team-map.webp",
    alt: "Console map showing SOS team locations",
    icon: Map,
  },
  {
    id: "aura",
    title: "AI triggered — AURA",
    summary: "Ask a question. Inspect the source.",
    detail:
      "Aura explores approved help and enabled operational sources — grounded answers, not invented procedures. AI detections can trigger the same accountable response path.",
    href: "/demo/aura",
    image: "/platform/aura/aura-01-ask.webp",
    alt: "Aura workspace answering an operator question",
    icon: Bot,
  },
  {
    id: "gis",
    title: "GIS info",
    summary: "Geo-referenced site context, not a pin on a picture.",
    detail:
      "Building lookup, coverage radius, GPS and outdoor layers make “nearby” and “arrived” mean something on the commissioned site.",
    href: "/demo/sos-settings",
    image: "/platform/sos-settings/sos-set-01-planner.webp",
    alt: "SOS settings visual dispatch radius planner",
    icon: Layers,
  },
  {
    id: "floor-plan",
    title: "Floor plan",
    summary: "Your facility becomes an operating picture.",
    detail:
      "Floor Plan Studio: rooms, openings, stairs and device placements in 2D and 3D — the same geometry operators and technical teams discuss.",
    href: "/demo/floor-plan",
    image: "/platform/floor-plan/floor-01-3d.webp",
    alt: "Floor Plan Studio 3D view of industrial building",
    icon: LayoutTemplate,
  },
  {
    id: "enclosed",
    title: "Enclosed environment",
    summary: "Indoor rooms, restricted space, control buildings.",
    detail:
      "Operate inside the facility — substations, process areas and control rooms — with measured geometry and placed devices, not only the outdoor perimeter.",
    href: "/demo/floor-plan",
    image: "/platform/floor-plan/floor-02-2d.webp",
    alt: "Floor Plan Studio 2D editor with sample rooms",
    icon: Building2,
  },
  {
    id: "mobile",
    title: "Mobile apps",
    summary: "A field workspace built around the shift.",
    detail:
      "Today, patrols, SOS, messages and handover on supported phones — control room and field share one operational picture.",
    href: "/demo/sos",
    image: "/platform/carousel/sos-04-responder.webp",
    alt: "Mobile responder SOS acceptance screen",
    icon: Smartphone,
  },
];

const CAPABILITY_BY_ID = Object.fromEntries(
  V2_CAPABILITIES.map((item) => [item.id, item]),
) as Record<CapabilityId, V2Capability>;

const USE_CASE_TOOLS: Record<string, CapabilityId[]> = {
  "perimeter-intrusion": ["map", "gis", "floor-plan", "enclosed"],
  "responder-sos": ["mobile", "map", "gis", "aura"],
  "restricted-area": ["floor-plan", "enclosed", "gis", "aura"],
  "field-offline": ["mobile"],
};

const ALL_WORKSPACE_CARDS: HubCard[] = WORKSPACES.map(
  ({ slug, name, capabilities, outcome }, index) => ({
    slug,
    number: String(index + 1).padStart(2, "0"),
    title: name,
    description: capabilities,
    outcome,
    href: `/platform/${slug}`,
  }),
);

const PRIMARY_USE_CASES = HUB_SOLUTION_CARDS.filter((card) =>
  ["perimeter-intrusion", "responder-sos", "restricted-area"].includes(
    card.slug,
  ),
);

function V2StripBanner() {
  return (
    <p className="border-b border-secondary/20 bg-secondary/10 px-6 py-3 text-center text-xs leading-5 text-secondary md:px-16">
      v1 removed — no CISA / JESIP brochure, no multi-brand VMS pitch, no
      company stat bar. Copy from the Industrial &amp; Critical Infrastructure
      PDF.
    </p>
  );
}

function V2CapabilitiesGrid({
  layout = "cards",
}: {
  layout?: "cards" | "featured" | "dense";
}) {
  if (layout === "dense") {
    return (
      <section className="border-t border-white/10 bg-black px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <PlatformSectionHeader
            eyebrow="IN THE PRODUCT"
            title="What this site now shows"
            description="The six surfaces your team asked to keep visible on a v2 site."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {V2_CAPABILITIES.map(({ id, title, summary, href, icon: Icon }) => (
              <li key={id}>
                <Link
                  href={href}
                  className="flex h-full gap-3 rounded-xl border border-white/10 bg-[#0c1a22]/60 px-4 py-4 transition hover:border-secondary/40"
                >
                  <Icon className="mt-0.5 size-5 shrink-0 text-secondary" />
                  <span>
                    <span className="block text-sm font-semibold text-white">
                      {title}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-platform-muted">
                      {summary}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (layout === "featured") {
    const featured = V2_CAPABILITIES.filter(
      (item) => item.id === "map" || item.id === "floor-plan",
    );
    const rest = V2_CAPABILITIES.filter(
      (item) => item.id !== "map" && item.id !== "floor-plan",
    );

    return (
      <section className="border-t border-white/10 bg-black px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <PlatformSectionHeader
            eyebrow="V2 CAPABILITIES"
            title="Map, floor plan, AURA, GIS, enclosed sites, mobile"
            description="Named product surfaces — not the v1 “integrate every brand” paragraph."
          />
          <ul className="mt-12 grid gap-5 lg:grid-cols-2">
            {featured.map((item) => (
              <CapabilityArticle key={item.id} item={item} featured />
            ))}
          </ul>
          <ul className="mt-5 grid gap-5 sm:grid-cols-2">
            {rest.map((item) => (
              <CapabilityArticle key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-white/10 bg-black px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="PRODUCT SURFACES"
          title="See the site — indoors, outdoors, and on the phone"
          description="Spatial context, AI-triggered assistance, and field apps from the v2 platform presentation."
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {V2_CAPABILITIES.map((item) => (
            <CapabilityArticle key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function CapabilityArticle({
  item,
  featured = false,
}: {
  item: V2Capability;
  featured?: boolean;
}) {
  const Icon = item.icon;

  return (
    <li>
      <article className="platform-hub-card h-full overflow-hidden !p-0">
        <div
          className={`relative bg-[#0d1418] ${
            featured ? "aspect-[16/9]" : "aspect-[3/2]"
          }`}
        >
          <PlatformImage
            src={item.image}
            alt={item.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-secondary">
            <Icon className="size-4" />
            {item.title}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">
            {item.summary}
          </h3>
          <p className="mt-2 text-sm leading-6 text-platform-muted">
            {item.detail}
          </p>
          <PlatformScenarioButton href={item.href} className="mt-4">
            Open walkthrough
          </PlatformScenarioButton>
        </div>
      </article>
    </li>
  );
}

function V2UseCases({
  layout = "cards",
  includeOffline = true,
}: {
  layout?: "cards" | "spine" | "pills";
  includeOffline?: boolean;
}) {
  const scenarios = includeOffline
    ? SOLUTION_SCENARIOS
    : SOLUTION_SCENARIOS.filter((item) => item.slug !== "field-offline");

  if (layout === "pills") {
    const cards = includeOffline ? HUB_SOLUTION_CARDS : PRIMARY_USE_CASES;
    return (
      <section className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <PlatformSectionHeader
            eyebrow="USE CASES"
            title="Which situation sounds most like your site?"
            description="Perimeter intrusion, responder SOS, restricted area — plus field continuity when the network drops."
          />
          <ul className="mt-8 flex flex-col gap-3">
            {cards.map((card) => (
              <li key={card.slug}>
                <Link
                  href={card.href ?? "/solutions"}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 transition hover:border-secondary/40"
                >
                  <span>
                    <span className="block text-base font-semibold text-white">
                      {card.title}
                    </span>
                    <span className="mt-1 block text-sm text-platform-muted">
                      {card.description}
                    </span>
                  </span>
                  <span className="text-sm font-medium text-secondary">
                    Open →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  if (layout === "spine") {
    return (
      <section className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <PlatformSectionHeader
            eyebrow="INDUSTRIAL SCENARIOS"
            title="Four practical response stories"
            description="Each scenario names the v2 tools it actually uses — map, GIS, floor plan, enclosed rooms, AURA, mobile."
          />
          <div className="mt-12 flex flex-col gap-10">
            {scenarios.map((scenario) => {
              const tools = USE_CASE_TOOLS[scenario.slug] ?? [];
              if (scenario.slug === "responder-sos") {
                return (
                  <ResponderSosCard
                    key={scenario.slug}
                    number={scenario.number}
                    title={scenario.title}
                  />
                );
              }
              return (
                <article
                  key={scenario.slug}
                  className="grid gap-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] md:grid-cols-2 md:items-center"
                >
                  <div className="relative aspect-[4/3] bg-[#0d1418] md:aspect-auto md:min-h-[280px]">
                    <PlatformImage
                      src={scenario.image}
                      alt={scenario.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <p className="text-sm font-semibold text-secondary">
                      {scenario.number}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      {scenario.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-platform-muted">
                      {scenario.subtitle}
                    </p>
                    <ol className="mt-5 grid gap-2 sm:grid-cols-2">
                      {scenario.steps.map(({ step, label, description }) => (
                        <li key={step} className="text-sm">
                          <span className="font-semibold text-secondary">
                            {step} {label}.
                          </span>{" "}
                          <span className="text-platform-muted">
                            {description}
                          </span>
                        </li>
                      ))}
                    </ol>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {tools.map((id) => (
                        <li
                          key={id}
                          className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary"
                        >
                          {CAPABILITY_BY_ID[id].title}
                        </li>
                      ))}
                    </ul>
                    <PlatformScenarioButton
                      href={`/solutions/${scenario.slug}`}
                      className="mt-6"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="USE CASES"
          title="Perimeter. SOS. Restricted area."
          description="Four practical response stories from the v2 presentation — discuss the one that sounds like your site."
        />
        <div className="mt-12">
          <HubCardGrid
            cards={includeOffline ? HUB_SOLUTION_CARDS : PRIMARY_USE_CASES}
            columns={2}
          />
        </div>
      </div>
    </section>
  );
}

function V2Workspaces() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="PRODUCT AT A GLANCE"
          title="A connected platform, with focused workspaces"
          description="Users see capabilities appropriate to their role — the six workspaces from the v2 deck, including field, assets and intelligence."
        />
        <div className="mt-12">
          <HubCardGrid cards={ALL_WORKSPACE_CARDS} columns={3} />
        </div>
      </div>
    </section>
  );
}

function V2CompactValue() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-12 md:px-16">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
        {[
          ["See the context", "Incidents, devices, maps and video together."],
          ["Coordinate the action", "Clear tasks and controlled procedures."],
          ["Keep the proof", "Reports, evidence and history for review."],
        ].map(([title, description]) => (
          <div
            key={title}
            className="rounded-xl border border-white/10 px-5 py-5"
          >
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-platform-muted">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function V2ContentVariantCurrent() {
  return (
    <div className="bg-[var(--platform-surface)]">
      <PlatformHero />
      <PlatformStatBar stats={COMPANY_STATS} />
      <PlatformIntro />
      <PlatformChallenge />
      <PlatformSolution />
      <PlatformOperatingModel />
      <PlatformWhySimpnify />
      <PlatformSopDigitalTwin />
      <PlatformValuePillars />
      <PlatformCta />
    </div>
  );
}

export function V2ContentVariantPdfChapters() {
  return (
    <div className="bg-[var(--platform-surface)]">
      <V2StripBanner />
      <PlatformHero />
      <PlatformChallenge />
      <PlatformValuePillars />
      <V2Workspaces />
      <PlatformOperatingModel />
      <V2CapabilitiesGrid layout="cards" />
      <V2UseCases layout="cards" />
      <PlatformCta />
    </div>
  );
}

export function V2ContentVariantCapabilityFirst() {
  return (
    <div className="bg-[var(--platform-surface)]">
      <V2StripBanner />
      <PlatformHero />
      <V2CapabilitiesGrid layout="featured" />
      <V2UseCases layout="cards" includeOffline={false} />
      <PlatformChallenge />
      <PlatformCta />
    </div>
  );
}

function UseCaseLedPageStack({ showReviewBanner = false }: { showReviewBanner?: boolean }) {
  return (
    <>
      {showReviewBanner ? <V2StripBanner /> : null}
      <PlatformHero />
      <PlatformStatBar stats={COMPANY_STATS} />
      <PlatformIntro />
      <PlatformChallenge />
      <V2UseCases layout="spine" />
      <V2CapabilitiesGrid layout="dense" />
      <PlatformCta />
    </>
  );
}

/** Production /our-platform — variant D (use-case led), no review banner. */
export function OurPlatformUseCaseLed() {
  return (
    <div className="bg-[var(--platform-surface)]">
      <UseCaseLedPageStack />
    </div>
  );
}

export function V2ContentVariantUseCaseLed() {
  return (
    <div className="bg-[var(--platform-surface)]">
      <UseCaseLedPageStack showReviewBanner />
    </div>
  );
}

export function V2ContentVariantCompactLanding() {
  return (
    <div className="bg-[var(--platform-surface)]">
      <V2StripBanner />
      <PlatformHero />
      <V2CapabilitiesGrid layout="dense" />
      <V2UseCases layout="pills" includeOffline={false} />
      <V2CompactValue />
      <PlatformCta />
    </div>
  );
}

const map: Record<V2ContentVariantId, ComponentType> = {
  current: V2ContentVariantCurrent,
  "pdf-chapters": V2ContentVariantPdfChapters,
  "capability-first": V2ContentVariantCapabilityFirst,
  "use-case-led": V2ContentVariantUseCaseLed,
  "compact-landing": V2ContentVariantCompactLanding,
};

export function V2ContentVariant({ id }: { id: V2ContentVariantId }) {
  return createElement(map[id]);
}
