import { DECISION_OS_BANNER } from "@/lib/platform/client-story";

import { PlatformSectionHeader } from "./platform-section-header";

export function PlatformDecisionOsBanner() {
  return (
    <section
      id="decision-os"
      className="border-b border-white/10 bg-gradient-to-b from-[#0c1a22] to-[var(--platform-surface)] px-6 py-14 md:px-16 md:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow={DECISION_OS_BANNER.eyebrow}
          title={DECISION_OS_BANNER.title}
          description={DECISION_OS_BANNER.description}
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {DECISION_OS_BANNER.parallels.map(({ theme, clientLine }) => (
            <li
              key={theme}
              className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-sm"
            >
              <h3 className="text-sm font-semibold text-secondary">{theme}</h3>
              <p className="mt-2 text-sm leading-6 text-platform-muted">
                {clientLine}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
