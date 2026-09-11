import { SOS_CAROUSEL_SLIDES } from "@/lib/platform";

import { PlatformFeatureCarousel } from "./platform/feature-carousel";

type PlatformUiCarouselProps = {
  variant?: "default" | "demo";
};

export function PlatformUiCarousel({ variant = "default" }: PlatformUiCarouselProps) {
  const isDemo = variant === "demo";

  return (
    <PlatformFeatureCarousel
      slides={SOS_CAROUSEL_SLIDES}
      eyebrow={isDemo ? undefined : "EXPERIENCE THE APP"}
      title={isDemo ? undefined : "SOS — from request to recorded response"}
      description={
        isDemo
          ? undefined
          : "Follow the field emergency journey: request, coordinate, dispatch, respond and close with evidence."
      }
      sectionId="product-tour"
      variant={isDemo ? "embedded" : "default"}
      ariaLabel="SOS response workflow"
    />
  );
}
