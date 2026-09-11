import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PlatformSectionHeader } from "@/components/platform-section-header";
import { WORKSPACES } from "@/lib/platform";

export function PlatformWorkspacesSection() {
  return (
    <section
      id="workspaces"
      className="border-t border-white/10 bg-[var(--platform-surface-raised)] px-6 py-16 md:px-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="PRODUCT AT A GLANCE"
          title="A connected platform, with focused workspaces"
          description="Users see capabilities appropriate to their role and responsibility."
        />

        <ul className="mt-12 space-y-3">
          {WORKSPACES.map(({ name, capabilities, slug, summary, outcome }) => {
            const href = `/platform/${slug}`;

            return (
              <li key={slug}>
                <Link href={href} className="group platform-hub-card md:flex-row md:items-center md:justify-between md:gap-6">
                  <div className="md:w-1/4">
                    <h3 className="text-base font-semibold text-secondary">
                      {name}
                    </h3>
                    <p className="mt-1 text-sm text-platform-muted">{summary}</p>
                    <p className="mt-2 text-sm font-medium text-white/90">
                      {outcome}
                    </p>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-6 text-platform-muted md:mt-0 md:px-6">
                    {capabilities}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-secondary md:mt-0">
                    Open
                    <ArrowRight
                      className="size-4 transition group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
