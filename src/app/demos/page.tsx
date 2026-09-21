import type { Metadata } from "next";

import { DemosStepRail } from "@/components/platform/demos-step-rail";
import { PlatformPageShell } from "@/components/platform/page-shell";

export const metadata: Metadata = {
  title: "Demos — Simpnify",
  description:
    "Selected product walkthroughs — response policy, guided response, connectors and communications.",
};

export default function DemosHubPage() {
  return (
    <PlatformPageShell
      eyebrow="FEATURES"
      title="Experience the app"
      description="Screenshot-based walkthroughs from the industrial platform presentation. Each feature follows a documented product workflow with sample data."
    >
      <section className="px-6 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-7xl">
          <DemosStepRail />
        </div>
      </section>
    </PlatformPageShell>
  );
}
