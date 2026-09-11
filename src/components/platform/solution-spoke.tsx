import { PlatformImage } from "@/components/platform-image";
import Link from "next/link";

import { PlatformPageShell } from "@/components/platform/page-shell";
import { StepPipeline } from "@/components/platform/step-pipeline";
import { solutionsTrail, SOLUTION_SCENARIOS } from "@/lib/platform";
import type { SolutionScenario } from "@/lib/platform/types";

export function SolutionSpokePage({
  scenario,
}: {
  scenario: SolutionScenario;
}) {
  return (
    <PlatformPageShell
      eyebrow={`USE CASE ${scenario.number}`}
      title={scenario.title}
      description={scenario.subtitle}
      breadcrumbs={solutionsTrail(scenario.title)}
    >
      <section className="px-6 pb-16 md:px-16 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="platform-product-frame mb-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#0d1418]">
              <PlatformImage
                src={scenario.image}
                alt={scenario.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
            <p className="mt-3 text-center text-xs text-platform-subtle">
              Illustrative scenario · sample industrial use case
            </p>
          </div>

          <h2 className="mb-8 text-sm font-semibold tracking-wide text-secondary">
            RESPONSE SEQUENCE
          </h2>
          <StepPipeline steps={scenario.steps} columns={4} />

          {scenario.whyItMatters ? (
            <p className="mt-10 platform-glass-card text-center text-base leading-7 text-white/90">
              {scenario.whyItMatters}
            </p>
          ) : null}

          <div className="mt-10">
            <h2 className="mb-4 text-sm font-semibold text-platform-muted">
              Other scenarios
            </h2>
            <ul className="flex flex-wrap gap-3">
              {SOLUTION_SCENARIOS.filter((s) => s.slug !== scenario.slug).map(
                ({ slug, title }) => (
                  <li key={slug}>
                    <Link
                      href={`/solutions/${slug}`}
                      className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:border-secondary/40"
                    >
                      {title}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>
    </PlatformPageShell>
  );
}
