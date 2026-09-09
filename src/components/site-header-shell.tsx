import { Suspense } from "react";

import { SiteHeader } from "@/components/site-header";

export function SiteHeaderShell() {
  return (
    <Suspense fallback={<header className="h-20 bg-black" />}>
      <SiteHeader />
    </Suspense>
  );
}
