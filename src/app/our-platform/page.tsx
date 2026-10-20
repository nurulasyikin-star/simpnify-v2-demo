import type { Metadata } from "next";

import { LandingGothamScroll } from "@/components/landing-gotham-scroll";

export const metadata: Metadata = {
  title: "Simpnify Platform — Industrial & Critical Infrastructure",
  description:
    "Unified platform for industrial and critical infrastructure. See the site, coordinate the response, and keep the proof — from first alert to final review.",
};

export default function OurPlatformPage() {
  return (
    <main id="main-content" className="flex-1">
      <LandingGothamScroll mode={{ smooth: true, hd: true, sized: true }} />
    </main>
  );
}
