import type { Metadata } from "next";

import { PlatformFeatureCarousel } from "@/components/platform/feature-carousel";
import { PlatformPageShell } from "@/components/platform/page-shell";
import { AURA_SLIDES, AURA_USE_CASES, demoBreadcrumbs } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Aura — Simpnify Demo",
  description:
    "Permission-aware operational assistant — ask questions, inspect sources and review governed knowledge.",
};

export default function DemoAuraPage() {
  return (
    <PlatformPageShell
      eyebrow="AURA / OPERATIONAL ASSISTANT"
      title="Ask a question. Inspect the source."
      description="Aura brings approved help and enabled operational sources into the moment an operator needs them."
      breadcrumbs={demoBreadcrumbs("aura")}
    >
      <PlatformFeatureCarousel
        slides={AURA_SLIDES}
        variant="embedded"
        ariaLabel="Aura assistant walkthrough"
      />
      <section className="border-t border-white/10 px-6 py-16 md:px-16 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-semibold text-white">
            Industrial prompt patterns
          </h2>
          <p className="mt-2 text-sm text-platform-muted">
            Results depend on enabled sources and role access.
          </p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {AURA_USE_CASES.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-white/10 bg-[#0c1a22]/60 px-5 py-4 text-sm leading-6 text-platform-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PlatformPageShell>
  );
}
