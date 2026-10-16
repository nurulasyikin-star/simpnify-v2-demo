import { HideSiteHeader } from "@/components/hide-site-header";

export default function LandingStoryReviewLayout({
  children,
}: LayoutProps<"/photos/landing-story">) {
  return (
    <>
      <HideSiteHeader />
      {children}
    </>
  );
}
