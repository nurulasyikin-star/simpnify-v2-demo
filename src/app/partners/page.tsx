import type { Metadata } from "next";

import { PartnersList } from "@/components/partners-list";
import { PlatformAccentBar } from "@/components/platform-accent-bar";
import { PlatformSectionHeader } from "@/components/platform-section-header";

export const metadata: Metadata = {
  title: "Partners — Simpnify",
  description:
    "Technology, research, and ecosystem partners across Malaysia, Singapore, and the region.",
};

export default function PartnersPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--platform-surface)] pt-16">
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-16 md:px-16 md:py-20">
        <div className="platform-scan-bg" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="flex gap-7">
            <PlatformAccentBar />
            <PlatformSectionHeader
              eyebrow="ECOSYSTEM"
              title="Partners"
              description="Simpnify works with technology leaders, research institutions, and innovation partners to deliver unified security and risk management solutions across the region."
              titleAs="h1"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-7xl">
          <PartnersList />
        </div>
      </section>
    </main>
  );
}
