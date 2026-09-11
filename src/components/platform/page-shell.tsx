import { PlatformAccentBar } from "@/components/platform-accent-bar";
import { PlatformBreadcrumb } from "@/components/platform/breadcrumb";
import { PlatformSectionHeader } from "@/components/platform-section-header";
import type { BreadcrumbItem } from "@/lib/platform/breadcrumbs";

type PlatformPageShellProps = {
  eyebrow: string;
  title: string;
  description?: string;
  outcome?: string;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
};

export function PlatformPageShell({
  eyebrow,
  title,
  description,
  outcome,
  breadcrumbs = [],
  children,
}: PlatformPageShellProps) {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--platform-surface)] pt-16">
      <section className="relative overflow-hidden border-b border-white/10 px-6 py-16 md:px-16 md:py-20">
        <div className="platform-scan-bg" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl">
          {breadcrumbs.length > 0 ? <PlatformBreadcrumb items={breadcrumbs} /> : null}

          <div className="flex gap-7">
            <PlatformAccentBar />
            <div>
              <PlatformSectionHeader
                eyebrow={eyebrow}
                title={title}
                description={description}
                titleAs="h1"
              />
              {outcome ? (
                <p className="mt-4 text-lg font-medium text-secondary">
                  {outcome}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      {children}
    </main>
  );
}
