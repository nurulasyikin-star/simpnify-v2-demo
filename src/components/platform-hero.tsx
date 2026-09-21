import { PlatformContentVideoHeroGotham } from "@/components/platform-content-video-hero-gotham";
import { PLATFORM_CONTENT_VIDEO_HERO } from "@/lib/platform/client-story";

export function PlatformHero() {
  return (
    <PlatformContentVideoHeroGotham
      copy={PLATFORM_CONTENT_VIDEO_HERO}
      titleAs="h1"
    />
  );
}
