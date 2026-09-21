import type { Metadata } from "next";

import {
  PlatformPageVariant,
  PlatformSectionStack,
  RedundancyDecisionCard,
  VariantResolvedList,
  platformPageVariants,
  redundancyDecisions,
  type PlatformPageVariantId,
} from "@/components/platform-page-variants";

export const metadata: Metadata = {
  title: "Platform page redundancy review — Simpnify",
  description:
    "Compare Our Platform section stacks and decide what to keep, merge, or cut.",
  robots: { index: false, follow: false },
};

function PreviewFrame({
  id,
  title,
  tagline,
  pros,
  cons,
  sections,
  resolves,
}: {
  id: PlatformPageVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
  sections: (typeof platformPageVariants)[number]["sections"];
  resolves: string[];
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-white/10 bg-[#0a1218]"
    >
      <div className="border-b border-white/10 px-6 py-5 md:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-platform-muted">{tagline}</p>
          </div>
          <span className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
            {id}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
            Section stack
          </p>
          <div className="mt-2">
            <PlatformSectionStack sections={sections} />
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
              Pros
            </p>
            <ul className="mt-2 space-y-1 text-sm text-platform-muted">
              {pros.map((item) => (
                <li key={item}>+ {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
              Cons
            </p>
            <ul className="mt-2 space-y-1 text-sm text-platform-muted">
              {cons.map((item) => (
                <li key={item}>− {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {resolves.length > 0 ? (
          <div className="mt-4 rounded-lg border border-secondary/20 bg-secondary/5 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
              Resolves
            </p>
            <div className="mt-2">
              <VariantResolvedList ids={resolves} />
            </div>
          </div>
        ) : null}
      </div>

      <div
        className="max-h-[min(85vh,900px)] overflow-y-auto border-t border-white/10 bg-[var(--platform-surface)]"
        tabIndex={0}
        aria-label={`Live preview: ${title}`}
      >
        <PlatformPageVariant id={id} />
      </div>
    </section>
  );
}

export default function PlatformRedundancyReviewPage() {
  return (
    <main
      id="main-content"
      className="flex-1 bg-[var(--platform-surface)] px-4 pb-20 pt-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Design review
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            Our Platform — redundancy decisions
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-platform-muted">
            Nine overlapping content clusters on{" "}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
              /our-platform
            </code>
            . Review each decision below, then scroll the five section-stack
            variants (A–E) to pick one — or mix (e.g. &quot;D but keep stat bar
            on About only&quot;).
          </p>

          <nav
            aria-label="Variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {platformPageVariants.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-platform-muted transition hover:border-secondary/40 hover:text-secondary"
              >
                {title.split("—")[0].trim()}
              </a>
            ))}
          </nav>
        </header>

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white">
            Decision checklist
          </h2>
          <p className="mt-2 text-sm text-platform-muted">
            For each overlap, reply with your choice (or &quot;keep
            current&quot;). Variants below show pre-composed answers.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {redundancyDecisions.map((item) => {
              const resolvedBy = platformPageVariants
                .filter((variant) => variant.resolves.includes(item.id))
                .map((variant) => variant.id);

              return (
                <RedundancyDecisionCard
                  key={item.id}
                  item={item}
                  resolvedBy={resolvedBy}
                />
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-lg font-semibold text-white">
            Section-stack variants
          </h2>
          <div className="flex flex-col gap-12">
            {platformPageVariants.map((variant) => (
              <PreviewFrame key={variant.id} {...variant} />
            ))}
          </div>
        </section>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Production page unchanged until you pick.{" "}
          <a href="/photos" className="text-secondary hover:underline">
            Footer review
          </a>
          {" · "}
          <a href="/our-platform" className="text-secondary hover:underline">
            Live /our-platform
          </a>
        </p>
      </div>
    </main>
  );
}
