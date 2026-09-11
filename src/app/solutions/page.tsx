import type { Metadata } from "next";

import { PlatformPageShell } from "@/components/platform/page-shell";
import { UseCasesHubContent } from "@/components/use-cases/use-cases-hub-content";

export const metadata: Metadata = {
  title: "Industrial Solutions — Simpnify",
  description:
    "Four practical response stories: perimeter intrusion, responder SOS, restricted area access and field offline continuity.",
};

export default function SolutionsHubPage() {
  return (
    <PlatformPageShell
      eyebrow="INDUSTRIAL SCENARIOS"
      title="Which situation sounds most like your site?"
      description="Choose a scenario to discuss with your team. Each follows a decision path with a reviewable outcome."
    >
      <section className="px-6 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-7xl">
          <UseCasesHubContent />
        </div>
      </section>
    </PlatformPageShell>
  );
}
