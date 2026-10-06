import type { Metadata } from "next";

import { OurPlatformUseCaseLed } from "@/components/v2-content-variants";

export const metadata: Metadata = {
  title: "Simpnify Platform — Industrial & Critical Infrastructure",
  description:
    "Unified platform for industrial and critical infrastructure. See the site, coordinate the response, and keep the proof — from first alert to final review.",
};

export default function OurPlatformPage() {
  return (
    <main id="main-content" className="pt-16">
      <OurPlatformUseCaseLed />
    </main>
  );
}
