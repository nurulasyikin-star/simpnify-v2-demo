import Image from "next/image";
import Link from "next/link";

import { PlatformPageShell } from "@/components/platform/page-shell";
import { StepPipeline } from "@/components/platform/step-pipeline";
import { moduleBreadcrumbLabel, modulesTrail } from "@/lib/platform";
import type { ModulePage } from "@/lib/platform/types";

export function ModuleSpokePage({ module }: { module: ModulePage }) {
  return (
    <PlatformPageShell
      eyebrow={module.eyebrow}
      title={module.title}
      description={module.description}
      outcome={module.outcome}
      breadcrumbs={modulesTrail(moduleBreadcrumbLabel(module.slug))}
    >
      <section className="px-6 pb-16 md:px-16 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="platform-product-frame mb-12">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#0d1418]">
              <Image
                src={module.image}
                alt={module.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
            <p className="mt-3 text-center text-xs text-platform-subtle">
              Actual product UI · sample industrial data
            </p>
          </div>

          <h2 className="mb-8 text-sm font-semibold tracking-wide text-secondary">
            TYPICAL WORKFLOW
          </h2>
          <StepPipeline steps={module.steps} columns={3} />

          {module.relatedDemos && module.relatedDemos.length > 0 ? (
            <div className="mt-12 platform-glass-card">
              <h2 className="text-sm font-semibold text-secondary">
                Related demos
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {module.relatedDemos.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="rounded-full border border-secondary/30 px-4 py-2 text-sm text-white transition hover:bg-secondary/10"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>
    </PlatformPageShell>
  );
}
