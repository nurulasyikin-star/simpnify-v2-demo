import type { Metadata } from "next";

import { PlatformFeatureCarousel } from "@/components/platform/feature-carousel";
import { PlatformPageShell } from "@/components/platform/page-shell";
import { demoBreadcrumbs, SOS_CAROUSEL_SLIDES } from "@/lib/platform";

export const metadata: Metadata = {
  title: "SOS Demo — Simpnify",
  description:
    "Follow the SOS journey from field request through dispatch, arrival and recorded closure.",
};

export default function DemoSosPage() {
  return (
    <PlatformPageShell
      eyebrow="SOS RESPONSE"
      title="From request to recorded response"
      description="Six steps: request, control room review, dispatch, responder decision, team visibility, and field report."
      breadcrumbs={demoBreadcrumbs("sos")}
    >
      <PlatformFeatureCarousel
        slides={SOS_CAROUSEL_SLIDES}
        variant="embedded"
        ariaLabel="SOS response workflow"
      />
    </PlatformPageShell>
  );
}
