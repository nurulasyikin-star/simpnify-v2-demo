import Link from "next/link";

import { getPublicIncidentLifecycle, OPERATING_SUPPORT } from "@/lib/platform";

const INCIDENT_LIFECYCLE = getPublicIncidentLifecycle();

import { PlatformSectionHeader } from "./platform-section-header";

export function PlatformOperatingModel() {
  return (
    <section
      id="lifecycle"
      className="border-t border-white/10 bg-black px-6 py-16 md:px-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="INCIDENT LIFECYCLE"
          title="From first alert to accountable closure"
          description="Four stages — each mapped to platform modules your operators already use."
        />

        <div className="relative mt-14">
          <div
            className="platform-signal-line absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent lg:block"
            aria-hidden
          />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {INCIDENT_LIFECYCLE.map(
            ({ step, label, description, outcome, modules }) => (
              <li key={step} className="platform-hub-card">
                <p className="flex items-center gap-2 text-sm font-semibold text-secondary">
                  <span className="platform-status-dot" aria-hidden />
                  {step}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-secondary">
                  {label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-platform-muted">
                  {description}
                </p>
                <p className="mt-3 text-sm font-medium leading-6 text-white/90">
                  {outcome}
                </p>
                <ul className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-4">
                  {modules.map(({ label: moduleLabel, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm text-secondary transition hover:text-white"
                      >
                        {moduleLabel}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ),
          )}
          </ol>
        </div>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {OPERATING_SUPPORT.map(({ title, description }) => (
            <li
              key={title}
              className="rounded-xl border border-white/10 bg-[#0c1a22]/60 px-5 py-4 backdrop-blur-sm"
            >
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-platform-muted">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
