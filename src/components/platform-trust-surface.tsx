import Link from "next/link";

import { TRUST_SURFACE_ITEMS } from "@/lib/platform/client-story";

import { PlatformSectionHeader } from "./platform-section-header";

export function PlatformTrustSurface() {
  return (
    <section
      id="trust"
      className="border-t border-white/10 bg-[var(--platform-surface-raised)] px-6 py-16 md:px-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="TRUST & DEPLOYMENT"
          title="Built for governed, enterprise operations"
          description="Simplified from the Help Center architecture and security model — depth stays in documentation and sales packs."
        />

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {TRUST_SURFACE_ITEMS.map(({ title, description }) => (
            <li key={title} className="platform-hub-card">
              <h3 className="text-base font-semibold text-secondary">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-platform-muted">
                {description}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-platform-subtle">
          Module detail:{" "}
          <Link href="/platform" className="text-secondary hover:text-white">
            Platform workspaces
          </Link>
          {" · "}
          <Link href="/demos" className="text-secondary hover:text-white">
            Interactive demos
          </Link>
        </p>
      </div>
    </section>
  );
}
