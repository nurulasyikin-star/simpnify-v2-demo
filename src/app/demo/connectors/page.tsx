import type { Metadata } from "next";

import { PlatformFeatureCarousel } from "@/components/platform/feature-carousel";
import { PlatformPageShell } from "@/components/platform/page-shell";
import { StepPipeline } from "@/components/platform/step-pipeline";
import {
  CONNECTOR_INTEGRATION_PATHS,
  CONNECTOR_SLIDES,
  demoBreadcrumbs,
  MQTT_EXAMPLE,
} from "@/lib/platform";

export const metadata: Metadata = {
  title: "Connector Workflows — Simpnify Demo",
  description:
    "Visual connector flows, MQTT configuration and integration paths for industrial telemetry.",
};

export default function DemoConnectorsPage() {
  return (
    <PlatformPageShell
      eyebrow="CONNECTOR WORKFLOWS"
      title="Connect the systems your site already relies on"
      description="Receive, normalize, evaluate and respond — with documented protocol paths and explicit device capability proof."
      breadcrumbs={demoBreadcrumbs("connectors")}
    >
      <section className="px-6 pb-8 md:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-sm font-semibold tracking-wide text-secondary">
            INTEGRATION PATHS
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {CONNECTOR_INTEGRATION_PATHS.map(({ title, description }) => (
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

      <PlatformFeatureCarousel
        slides={CONNECTOR_SLIDES}
        variant="embedded"
        ariaLabel="Connector workflow walkthrough"
      />

      <section className="border-t border-white/10 px-6 py-16 md:px-16 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-semibold text-white">
            MQTT industrial example
          </h2>
          <p className="mt-2 text-platform-muted">
            Cabinet sensor telemetry → incident → SOP → field guide
          </p>
          <div className="mt-8">
            <StepPipeline steps={[...MQTT_EXAMPLE.steps]} columns={4} />
          </div>
          <dl className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="platform-glass-card">
              <dt className="text-xs font-semibold uppercase text-platform-subtle">
                Topic
              </dt>
              <dd className="mt-1 font-mono text-sm text-secondary">
                {MQTT_EXAMPLE.topic}
              </dd>
            </div>
            <div className="platform-glass-card">
              <dt className="text-xs font-semibold uppercase text-platform-subtle">
                Condition
              </dt>
              <dd className="mt-1 font-mono text-sm text-secondary">
                {MQTT_EXAMPLE.condition}
              </dd>
            </div>
            <div className="platform-glass-card">
              <dt className="text-xs font-semibold uppercase text-platform-subtle">
                Response
              </dt>
              <dd className="mt-1 text-sm text-white">{MQTT_EXAMPLE.response}</dd>
            </div>
          </dl>
        </div>
      </section>
    </PlatformPageShell>
  );
}
