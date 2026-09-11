import type { Metadata } from "next";
import Link from "next/link";

import { PlatformChecklist } from "@/components/platform/checklist";
import { PlatformPageShell } from "@/components/platform/page-shell";
import { StepPipeline } from "@/components/platform/step-pipeline";
import {
  PILOT_ACCEPTANCE,
  PILOT_ROLES,
  PILOT_SEQUENCE,
} from "@/lib/platform";

export const metadata: Metadata = {
  title: "Pilot Scope — Simpnify",
  description:
    "Start with one area, prove the complete response. Discover, configure, exercise and decide — with agreed acceptance criteria.",
};

export default function PilotPage() {
  return (
    <PlatformPageShell
      eyebrow="PROVE THE FIT"
      title="Start with one area. Prove the complete response."
      description="Suggested pilot sequence. Timing depends on scope and site access."
    >
      <section className="px-6 pb-12 md:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-sm font-semibold tracking-wide text-secondary">
            SUGGESTED SEQUENCE
          </h2>
          <StepPipeline steps={PILOT_SEQUENCE} columns={4} />

          <h2 className="mt-16 text-xl font-semibold text-white">
            Who owns what
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {PILOT_ROLES.map(({ title, description }) => (
              <li key={title} className="platform-glass-card">
                <h3 className="font-semibold text-secondary">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-platform-muted">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16 md:px-16 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-semibold text-white">
            Pilot acceptance
          </h2>
          <p className="mt-2 max-w-3xl text-platform-muted">
            Agree success before the demonstration. Observe the actual chain on
            your intended devices and network.
          </p>
          <div className="mt-10">
            <PlatformChecklist items={[...PILOT_ACCEPTANCE]} columns={2} />
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="platform-btn-primary">
              Start a conversation
            </Link>
            <Link href="/reference" className="platform-btn-secondary">
              Capability reference
            </Link>
          </div>
        </div>
      </section>
    </PlatformPageShell>
  );
}
