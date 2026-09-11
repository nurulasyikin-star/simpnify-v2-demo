import type { Metadata } from "next";

import { PlatformFeatureCarousel } from "@/components/platform/feature-carousel";
import { PlatformPageShell } from "@/components/platform/page-shell";
import { StepPipeline } from "@/components/platform/step-pipeline";
import {
  COMMS_CONTINUITY_STEPS,
  COMMS_SLIDES,
  demoBreadcrumbs,
} from "@/lib/platform";

export const metadata: Metadata = {
  title: "Communications — Simpnify Demo",
  description:
    "Messages, voice and video calls beside the response — with durable field continuity.",
};

export default function DemoCommunicationsPage() {
  return (
    <PlatformPageShell
      eyebrow="COMMUNICATIONS"
      title="Keep the conversation beside the response"
      description="Messages preserve context. Calls help the team clarify what they can see. Messaging, calls, location and SOS remain separately controlled capabilities."
      breadcrumbs={demoBreadcrumbs("communications")}
    >
      <PlatformFeatureCarousel
        slides={COMMS_SLIDES}
        variant="embedded"
        ariaLabel="Communications walkthrough"
      />
      <section className="border-t border-white/10 px-6 py-16 md:px-16 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-semibold text-white">
            Field continuity
          </h2>
          <p className="mt-2 max-w-3xl text-platform-muted">
            A retained draft, a submitted message and a live call have different
            connectivity needs. Pending work is not a delivered emergency.
          </p>
          <div className="mt-8">
            <StepPipeline steps={[...COMMS_CONTINUITY_STEPS]} columns={4} />
          </div>
        </div>
      </section>
    </PlatformPageShell>
  );
}
