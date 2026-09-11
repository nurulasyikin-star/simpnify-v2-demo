import type { Metadata } from "next";

import { PlatformChallenge } from "@/components/platform-challenge";
import { PlatformCta } from "@/components/platform-cta";
import { PlatformHero } from "@/components/platform-hero";
import { PlatformIntro } from "@/components/platform-intro";
import { PlatformOperatingModel } from "@/components/platform-operating-model";
import { PlatformSiteChallenges } from "@/components/platform-site-challenges";
import { PlatformSolution } from "@/components/platform-solution";
import { PlatformSopDigitalTwin } from "@/components/platform-sop-digital-twin";
import { PlatformValuePillars } from "@/components/platform-value-pillars";
import { PlatformWhySimpnify } from "@/components/platform-why-simpnify";
import { PlatformStatBar } from "@/components/platform/stat-bar";
import { COMPANY_STATS } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Simpnify Platform — Industrial & Critical Infrastructure",
  description:
    "Unified platform for industrial and critical infrastructure. See the site, coordinate the response, and keep the proof — from first alert to final review.",
};

export default function OurPlatformPage() {
  return (
    <main id="main-content" className="pt-16">
      <PlatformHero />
      <PlatformStatBar stats={COMPANY_STATS} />
      <PlatformIntro />
      <PlatformSiteChallenges />
      <PlatformChallenge />
      <PlatformSolution />
      <PlatformOperatingModel />
      <PlatformWhySimpnify />
      <PlatformSopDigitalTwin />
      <PlatformValuePillars />
      <PlatformCta />
    </main>
  );
}
