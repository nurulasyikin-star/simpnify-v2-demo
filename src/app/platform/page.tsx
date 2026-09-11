import type { Metadata } from "next";

import { PlatformPageShell } from "@/components/platform/page-shell";
import { HubCardGrid } from "@/components/platform/hub-card-grid";
import { HUB_PLATFORM_LINKS } from "@/lib/platform";

export const metadata: Metadata = {
  title: "Platform Modules — Simpnify",
  description:
    "Six focused workspaces: Operations, Assets & video, Automation, Intelligence & evidence, Field operations, and Administration & assurance.",
};

export default function PlatformHubPage() {
  return (
    <PlatformPageShell
      eyebrow="PLATFORM MODULES"
      title="A connected platform, with focused workspaces"
      description="Users see capabilities appropriate to their role and responsibility."
    >
      <section className="px-6 pb-16 md:px-16 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <HubCardGrid cards={HUB_PLATFORM_LINKS} columns={3} />
        </div>
      </section>
    </PlatformPageShell>
  );
}
