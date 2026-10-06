import { PlatformImage } from "@/components/platform-image";
import { ArrowRight, CheckCircle2, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { createElement, type ComponentType } from "react";

import { PlatformChallenge } from "@/components/platform-challenge";

import { PlatformSectionHeader } from "./platform-section-header";

export type PlatformChallengeVariantId =
  | "current"
  | "pain-to-proof"
  | "three-reasons"
  | "without-with"
  | "merged-stakes";

export type PlatformChallengeVariantMeta = {
  id: PlatformChallengeVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
};

export const platformChallengeVariants: PlatformChallengeVariantMeta[] = [
  {
    id: "current",
    title: "A — Current (baseline)",
    tagline:
      "Two back-to-back sections: site-scale challenges (with images) then operator pain cards — problem-focused, light on “why Simpnify”.",
    pros: [
      "Covers scale and day-to-day operator pain",
      "Rich imagery on site challenges",
      "Unified-operation checklist adds detail",
    ],
    cons: [
      "Doesn’t answer “why choose us” until later sections",
      "Repetitive 3-card pattern twice",
      "Long scroll before the solution",
    ],
  },
  {
    id: "pain-to-proof",
    title: "B — Pain → proof rows",
    tagline:
      "Each row pairs the real-world gap with what Simpnify delivers — one section, narrative flow into Solution.",
    pros: [
      "Explicit buyer justification on every beat",
      "Keeps site-scale imagery",
      "Single eyebrow — less section fatigue",
    ],
    cons: [
      "Taller rows than compact cards",
      "Operator micro-pains folded into broader rows",
    ],
  },
  {
    id: "three-reasons",
    title: "C — Three reasons clients choose Simpnify",
    tagline:
      "Outcome-first pillars: unify the stack, govern every site, stay convergence-ready — written as decisions, not homework.",
    pros: [
      "Strongest “must choose” headline",
      "Scannable for executives",
      "Clear proof lines under each pillar",
    ],
    cons: [
      "Less granular than today’s six pain points",
      "No per-row photography",
    ],
  },
  {
    id: "without-with",
    title: "D — Without / with Simpnify",
    tagline:
      "Side-by-side contrast table — status quo cost vs what changes when the platform owns the incident thread.",
    pros: [
      "Memorable for RFP and steering committees",
      "Makes “do nothing” feel expensive",
      "Compact vertical footprint",
    ],
    cons: [
      "Less emotional storytelling",
      "Table can feel dry on mobile (stacked)",
    ],
  },
  {
    id: "merged-stakes",
    title: "E — Merged stakes + operator proof",
    tagline:
      "One section: three image cards (scale + convergence) plus a closing band on context, ownership and evidence — replaces both current blocks.",
    pros: [
      "Cuts duplicate section headers",
      "Bridges site scale and operator outcomes",
      "CTA band nudges toward Solution / pilot",
    ],
    cons: [
      "Dense — more copy per card",
      "Unified-operation list shortened to highlights",
    ],
  },
];

const PAIN_TO_PROOF_ROWS = [
  {
    number: "01",
    title: "Every brand, every site, one emergency",
    pain:
      "CCTV, access, analytics and cyber live in different consoles. When something happens, your team rebuilds the story by hand.",
    proof:
      "Simpnify integrates unconnected applications and devices into one intuitive workspace — so operators see signal, location and assets together from the first alert.",
    image: "/platform/our-platform-site/multi-site.png",
    alt: "Multiple sites unified on one platform",
  },
  {
    number: "02",
    title: "Scale without losing governance",
    pain:
      "Multi-site programs drift: different vendors, different procedures, different evidence standards — audits and handoffs suffer.",
    proof:
      "Configure workflows, alarm rules and SOPs once; run the same high standard across sites with shared reporting and controlled handoffs.",
    image: "/platform/our-platform-site/one-site.png",
    alt: "Single-site security architecture unified",
  },
  {
    number: "03",
    title: "Convergence is no longer optional",
    pain:
      "Physical and cyber teams still operate in silos while regulators expect coordinated detect, respond and prove.",
    proof:
      "Simpnify is built for CISA-aligned physical–cyber convergence — collaborative response, situation awareness and defensible records in one platform.",
    image: "/platform/our-platform-site/cisa-convergence.png",
    alt: "CISA convergence guidance visual",
  },
] as const;

const THREE_REASONS = [
  {
    number: "01",
    headline: "One platform, not another integration project",
    body:
      "Clients choose Simpnify when they’re tired of stitching together VMS, access control, analytics, BMS and cyber tools. You get integration, management and control in one place — with the UX operators actually use under stress.",
    proof: "Increased control, situation awareness and management reporting without a bespoke middleware layer every time you add a site.",
  },
  {
    number: "02",
    headline: "Multi-site scale with one operating model",
    body:
      "Growth shouldn’t mean a new playbook per region. Simpnify carries procedures, workflows and evidence standards across sites — even when underlying brands differ.",
    proof: "Same governance for incidents, maintenance and low-level auto-resolve — from control room to field.",
  },
  {
    number: "03",
    headline: "Standards-aligned response you can defend",
    body:
      "Buyers pick Simpnify when audits and after-action reviews ask for proof, not anecdotes. Physical and cyber assets stay under one collaborative risk picture; JESIP-aligned decision support is part of the story, not a bolt-on.",
    proof: "Convergence-ready architecture plus incident history that survives shift change and investigation.",
  },
] as const;

const WITHOUT_WITH_ROWS = [
  {
    without: "Operators jump between screens, calls and spreadsheets to guess what happened.",
    with: "One incident thread connects signal, map, video, people and procedure.",
  },
  {
    without: "Handoffs blur ownership — nobody is sure what’s still open.",
    with: "Workflows and tasks make who is acting explicit, with controlled escalation.",
  },
  {
    without: "Evidence lives in silos; reviews restart after every shift.",
    with: "Reports, media and actions stay attached for audit and after-action review.",
  },
  {
    without: "Each new site or vendor adds cost and fragile custom glue.",
    with: "Connector-style integration and configurable SOPs scale without reinventing the stack.",
  },
  {
    without: "Physical and cyber teams coordinate ad hoc when convergence is required.",
    with: "Unified threats and risks management on a platform designed for both domains.",
  },
] as const;

const MERGED_CARDS = [
  {
    number: "01",
    title: "One-site to multi-site — without fragmenting control",
    description:
      "Whether you run one facility or dozens, unconnected security applications drain efficiency. Simpnify is the platform clients standardize on to integrate, manage and control devices and apps under secure architecture that holds up over time.",
    image: "/platform/our-platform-site/one-site.png",
    alt: "Unified single-site operation",
  },
  {
    number: "02",
    title: "Multi-brand estates, one operator experience",
    description:
      "Different CCTV, access and analytics brands shouldn’t mean different response quality. Simpnify unifies data and procedures so scale doesn’t break compatibility or situational awareness.",
    image: "/platform/our-platform-site/multi-site.png",
    alt: "Multi-site unification",
  },
  {
    number: "03",
    title: "Convergence and proof, built in",
    description:
      "Organizations choose Simpnify when CISA-style convergence and defensible operations are board-level requirements — not slide-deck promises.",
    image: "/platform/our-platform-site/cisa-convergence.png",
    alt: "Security convergence",
  },
] as const;

const OPERATOR_PROOF_ITEMS = [
  {
    title: "Fragmented context",
    answer: "Authorized incidents, maps, video and twin context in one workspace.",
  },
  {
    title: "Unclear ownership",
    answer: "Workflow-driven tasks and handoffs — who acts, what stays open.",
  },
  {
    title: "Inconsistent evidence",
    answer: "Timeline, media and reports preserved for investigation and review.",
  },
] as const;

/** Stub content shown above each variant on the review page (intro + stat band). */
export function PlatformChallengePreviewContext() {
  return (
    <div className="border-b border-white/10 bg-black px-6 py-10 md:px-16">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-platform-subtle">
          Sample context — sections above challenge on /our-platform
        </p>
        <p className="mt-4 text-2xl font-semibold text-white md:text-3xl">
          Unified Risk Management Platform
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-platform-muted">
          <li>
            <span className="font-semibold text-white">10+</span> years delivering
            platforms
          </li>
          <li>
            <span className="font-semibold text-white">4</span> regional offices
          </li>
          <li>
            <span className="font-semibold text-white">2</span> domains — physical
            &amp; cyber
          </li>
        </ul>
      </div>
    </div>
  );
}

function ChallengeVariantPainToProof() {
  return (
    <section className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="WHY CLIENTS CHOOSE SIMPNIFY"
          title="The gap isn’t missing sensors — it’s missing connection"
          description="Industrial and critical-infrastructure teams don’t fail for lack of cameras or alarms. They fail when nothing owns the thread from first signal to defensible close. Here’s what changes when Simpnify is that owner."
        />

        <ul className="mt-12 space-y-6">
          {PAIN_TO_PROOF_ROWS.map(
            ({ number, title, pain, proof, image, alt }, index) => (
              <li
                key={number}
                className="platform-glass-card grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center"
              >
                <div
                  className={
                    index % 2 === 1 ? "md:order-2" : undefined
                  }
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#0d1418]">
                    <PlatformImage
                      src={image}
                      alt={alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "md:order-1" : undefined}>
                  <p className="text-sm font-semibold text-secondary">{number}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-platform-muted">{pain}</p>
                  <div className="mt-4 flex gap-3 rounded-lg border border-secondary/20 bg-secondary/5 px-4 py-3">
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-secondary"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    <p className="text-sm leading-6 text-white/90">{proof}</p>
                  </div>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}

function ChallengeVariantThreeReasons() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="WHY SIMPNIFY"
          title="Three reasons clients standardize on Simpnify"
          description="Not another dashboard — a decision to run security operations as one program: integrated stack, governed scale, and response you can prove."
        />

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {THREE_REASONS.map(({ number, headline, body, proof }) => (
            <li
              key={number}
              className="platform-glass-card flex flex-col border-secondary/10"
            >
              <p className="text-4xl font-semibold tabular-nums text-secondary/40">
                {number}
              </p>
              <h3 className="mt-4 text-lg font-semibold text-white">{headline}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-platform-muted">
                {body}
              </p>
              <p className="mt-5 border-t border-white/10 pt-4 text-xs font-medium uppercase tracking-wide text-secondary">
                What you gain
              </p>
              <p className="mt-2 text-sm leading-6 text-white/85">{proof}</p>
            </li>
          ))}
        </ul>

        <p className="platform-glass-card mt-8 text-center text-sm leading-6 text-platform-muted md:text-base">
          When evaluation comes down to build-vs-buy for unified operations, clients
          choose Simpnify because it already ships integration, workflows and
          convergence posture — not a roadmap slide.
        </p>
      </div>
    </section>
  );
}

function ChallengeVariantWithoutWith() {
  return (
    <section className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="THE CHOICE"
          title="What changes when Simpnify owns the incident thread"
          description="Use this contrast in steering meetings: the cost of disconnected tools vs one platform clients deploy to integrate, manage and control security end to end."
        />

        <div className="platform-glass-card mt-10 overflow-hidden p-0">
          <div className="grid border-b border-white/10 bg-white/[0.03] text-xs font-semibold uppercase tracking-wider text-platform-subtle sm:grid-cols-2">
            <p className="flex items-center gap-2 border-white/10 px-5 py-4 sm:border-r">
              <Minus className="size-4 text-red-400/80" aria-hidden />
              Without unified platform
            </p>
            <p className="flex items-center gap-2 px-5 py-4">
              <Plus className="size-4 text-secondary" aria-hidden />
              With Simpnify
            </p>
          </div>
          <ul>
            {WITHOUT_WITH_ROWS.map(({ without, with: withSimpnify }, i) => (
              <li
                key={i}
                className="grid border-t border-white/10 sm:grid-cols-2"
              >
                <p className="border-white/10 px-5 py-4 text-sm leading-6 text-platform-muted sm:border-r">
                  {without}
                </p>
                <p className="px-5 py-4 text-sm leading-6 text-white/90">
                  {withSimpnify}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-[#071318] transition hover:brightness-110"
          >
            Talk to us about your stack
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <p className="max-w-md text-sm text-platform-muted">
            Clients don&apos;t choose Simpnify for feature checklists — they choose
            it when disconnected operations become unacceptable risk.
          </p>
        </div>
      </div>
    </section>
  );
}

function ChallengeVariantMergedStakes() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="WHY CHOOSE SIMPNIFY"
          title="From fragmented sites to one defensible operation"
          description="One section for scale, convergence and operator reality — why buyers shortlist Simpnify before they ever read a feature matrix."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {MERGED_CARDS.map(({ number, title, description, image, alt }) => (
            <li key={number} className="platform-glass-card flex flex-col">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#0d1418]">
                <PlatformImage
                  src={image}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="mt-5 text-sm font-semibold text-secondary">{number}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-platform-muted">
                {description}
              </p>
            </li>
          ))}
        </ul>

        <div className="platform-glass-card mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
          <div>
            <h3 className="text-base font-semibold text-white">
              Operators choose Simpnify when the pain is daily
            </h3>
            <p className="mt-2 text-sm leading-6 text-platform-muted">
              Site scale gets the budget meeting; context, ownership and evidence
              get the renewal. Simpnify addresses both in one platform narrative.
            </p>
          </div>
          <ul className="space-y-4">
            {OPERATOR_PROOF_ITEMS.map(({ title, answer }) => (
              <li key={title} className="flex gap-3">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary"
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-platform-muted">
                    {answer}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-center text-sm text-platform-subtle">
          Unified operation across multiple sites, VMS brands, access control,
          analytics, cyber, BMS/ICS — and the same procedures everywhere.
        </p>
      </div>
    </section>
  );
}

function ChallengeVariantCurrent() {
  return <PlatformChallenge />;
}

const challengeVariantMap: Record<
  PlatformChallengeVariantId,
  ComponentType
> = {
  current: ChallengeVariantCurrent,
  "pain-to-proof": ChallengeVariantPainToProof,
  "three-reasons": ChallengeVariantThreeReasons,
  "without-with": ChallengeVariantWithoutWith,
  "merged-stakes": ChallengeVariantMergedStakes,
};

export function PlatformChallengeVariant({
  id,
}: {
  id: PlatformChallengeVariantId;
}) {
  return createElement(challengeVariantMap[id]);
}
