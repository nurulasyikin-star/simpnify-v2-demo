import type { Metadata } from "next";
import Link from "next/link";

import { FaqList } from "@/components/platform/faq-list";
import { PlatformChecklist } from "@/components/platform/checklist";
import { PlatformPageShell } from "@/components/platform/page-shell";
import {
  DEPLOYMENT_ASSURANCE,
  DEPLOYMENT_FAQ,
  DEPLOYMENT_MODELS,
} from "@/lib/platform";

export const metadata: Metadata = {
  title: "Deployment & Assurance — Simpnify",
  description:
    "On-premises, private cloud and hybrid deployment options with role-based access, revision-controlled procedures and durable operational records.",
};

export default function DeploymentPage() {
  return (
    <PlatformPageShell
      eyebrow="DEPLOYMENT & ASSURANCE"
      title="Built for your environment — not ours"
      description="Choose how and where Simpnify runs. The same operational workspaces, governed access and evidence model — aligned to industrial and government requirements."
    >
      <section className="border-b border-white/10 px-6 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-sm font-semibold tracking-wide text-secondary">
            DEPLOYMENT CHOICES
          </h2>
          <div className="mt-8">
            <PlatformChecklist items={DEPLOYMENT_MODELS} columns={3} />
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 px-6 py-12 md:px-16 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-sm font-semibold tracking-wide text-secondary">
            ASSURANCE BY DESIGN
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-platform-muted">
            Controls that matter to control-room supervisors, CISO teams and
            procurement — not checkbox features buried in a datasheet.
          </p>
          <div className="mt-8">
            <PlatformChecklist items={DEPLOYMENT_ASSURANCE} columns={2} />
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-16 md:pb-24 md:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-sm font-semibold tracking-wide text-secondary">
            FREQUENTLY ASKED
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-platform-muted">
            Common questions from security, operations and procurement teams.
          </p>
          <div className="mt-8">
            <FaqList items={DEPLOYMENT_FAQ} />
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="platform-btn-primary">
              Discuss your environment
            </Link>
            <Link href="/pilot" className="platform-btn-secondary">
              Define a pilot scope
            </Link>
          </div>
        </div>
      </section>
    </PlatformPageShell>
  );
}
