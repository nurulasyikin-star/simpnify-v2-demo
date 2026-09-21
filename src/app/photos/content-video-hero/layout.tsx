import { HideSiteHeader } from "@/components/hide-site-header";

export default function ContentVideoHeroReviewLayout({
  children,
}: LayoutProps<"/photos/content-video-hero">) {
  return (
    <>
      <HideSiteHeader />
      {children}
    </>
  );
}
