import type { Metadata } from "next";

import { PlatformFeatureCarousel } from "@/components/platform/feature-carousel";
import { PlatformPageShell } from "@/components/platform/page-shell";
import { demoBreadcrumbs, SOS_SETTINGS_SLIDES } from "@/lib/platform";

export const metadata: Metadata = {
  title: "SOS Settings — Simpnify Demo",
  description:
    "Configure response radius, coverage presets, on-site context, operational controls and revision history.",
};

export default function DemoSosSettingsPage() {
  return (
    <PlatformPageShell
      eyebrow="RESPONSE POLICY"
      title="Agree the response policy with operations"
      description="Visual planner, coverage presets, on-site context, timing limits and accountable revision history."
      breadcrumbs={demoBreadcrumbs("sos-settings")}
    >
      <PlatformFeatureCarousel
        slides={SOS_SETTINGS_SLIDES}
        variant="embedded"
        ariaLabel="SOS settings walkthrough"
      />
    </PlatformPageShell>
  );
}
