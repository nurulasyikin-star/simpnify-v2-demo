import { Suspense } from "react";

import { SiteHeader } from "@/components/site-header";

export function SiteHeaderShell() {
  return (
    <Suspense
      fallback={
        <header className="fixed inset-x-0 top-0 z-50 h-16 bg-black/50 backdrop-blur-md" />
      }
    >
      <SiteHeader />
    </Suspense>
  );
}
