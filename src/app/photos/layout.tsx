import { HideSiteFooter } from "@/components/hide-site-footer";

export default function PhotosLayout({ children }: LayoutProps<"/photos">) {
  return (
    <>
      <HideSiteFooter />
      {children}
    </>
  );
}
