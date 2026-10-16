import { HideSiteHeader } from "@/components/hide-site-header";

export default function OurPlatformLayout({
  children,
}: LayoutProps<"/our-platform">) {
  return (
    <>
      <HideSiteHeader />
      {children}
    </>
  );
}
