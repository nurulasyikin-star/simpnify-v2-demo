import { HideSiteHeader } from "@/components/hide-site-header";

export default function HeaderNavReviewLayout({
  children,
}: LayoutProps<"/photos/header-nav">) {
  return (
    <>
      <HideSiteHeader />
      {children}
    </>
  );
}
