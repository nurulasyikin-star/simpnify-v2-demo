import type { Metadata } from "next";

import { PlatformFeatureCarousel } from "@/components/platform/feature-carousel";
import { PlatformPageShell } from "@/components/platform/page-shell";
import { demoBreadcrumbs, FLOOR_PLAN_SLIDES } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Floor Plan Studio — Simpnify Demo",
  description:
    "Build 2D plans, see 3D geometry, and place devices in one spatial operating picture.",
};

export default function DemoFloorPlanPage() {
  return (
    <PlatformPageShell
      eyebrow="FLOOR PLAN STUDIO"
      title="Your facility becomes an operating picture"
      description="Draw walls and rooms, edit in 2D, see the same geometry in 3D, and place devices with measured dimensions."
      breadcrumbs={demoBreadcrumbs("floor-plan")}
    >
      <PlatformFeatureCarousel
        slides={FLOOR_PLAN_SLIDES}
        variant="embedded"
        ariaLabel="Floor Plan Studio walkthrough"
      />
    </PlatformPageShell>
  );
}
