import type { Metadata } from "next";

import { PlatformFeatureCarousel } from "@/components/platform/feature-carousel";
import { PlatformPageShell } from "@/components/platform/page-shell";
import { demoBreadcrumbs, GUIDED_RESPONSE_SLIDES } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Guided Response — Simpnify Demo",
  description:
    "Build branching field guides with evidence requirements and publish review.",
};

export default function DemoGuidedResponsePage() {
  return (
    <PlatformPageShell
      eyebrow="GUIDED RESPONSE"
      title="Give the responder a clear next step"
      description="Start from a sample, configure branching logic, evidence requirements and review before publishing."
      breadcrumbs={demoBreadcrumbs("guided-response")}
    >
      <PlatformFeatureCarousel
        slides={GUIDED_RESPONSE_SLIDES}
        variant="embedded"
        ariaLabel="Guided Response walkthrough"
      />
    </PlatformPageShell>
  );
}
