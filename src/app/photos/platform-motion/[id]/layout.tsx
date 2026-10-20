import { HideSiteHeader } from "@/components/hide-site-header";

export default function PlatformMotionPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HideSiteHeader />
      {children}
    </>
  );
}
