import { HubCardGrid } from "@/components/platform/hub-card-grid";
import { PlatformSectionHeader } from "@/components/platform-section-header";
import { getPublicHubPlatformLinks } from "@/lib/platform";

const HUB_PLATFORM_LINKS = getPublicHubPlatformLinks();

export function PlatformWorkspacesGridSection() {
  return (
    <section
      id="workspaces"
      className="border-t border-white/10 bg-black px-6 py-16 md:px-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="CHOOSE YOUR WORKSPACE"
          title="A connected platform, with focused workspaces"
          description="Mirrors the Help Center workspace map — Operations, Assets & video, Automation, Intelligence, Field, and Administration."
        />
        <div className="mt-12">
          <HubCardGrid cards={HUB_PLATFORM_LINKS} columns={3} />
        </div>
      </div>
    </section>
  );
}
