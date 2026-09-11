import Link from "next/link";

import { PILOT_STEPS } from "@/lib/platform";

import { PlatformSectionHeader } from "./platform-section-header";

export function PlatformCta() {
  return (
    <section
      id="next-step"
      className="border-t border-white/10 bg-black px-6 py-16 md:px-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="platform-glass-card overflow-hidden px-8 py-12 md:px-14 md:py-16">
          <PlatformSectionHeader
            eyebrow="NEXT STEP"
            title="Make the next incident easier to manage"
            description="Connect your signals, people, procedures and evidence with Simpnify."
          />

          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {PILOT_STEPS.map(({ step, title, description }) => (
              <li
                key={step}
                className="rounded-xl border border-white/10 bg-black/30 px-5 py-5 backdrop-blur-sm"
              >
                <p className="text-sm font-semibold text-secondary">{step}</p>
                <h3 className="mt-2 text-base font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-platform-muted">
                  {description}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/pilot" className="platform-btn-primary">
              Pilot scope & acceptance
            </Link>
            <Link href="/deployment" className="platform-btn-secondary">
              Deployment & assurance
            </Link>
            <Link href="/contact" className="platform-btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
