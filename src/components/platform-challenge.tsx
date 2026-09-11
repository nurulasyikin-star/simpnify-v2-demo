import { CUSTOMER_CHALLENGES } from "@/lib/platform";

import { PlatformSectionHeader } from "./platform-section-header";

export function PlatformChallenge() {
  return (
    <section className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="THE CHALLENGE"
          title="The expensive gap is between systems"
          description="A sensor knows. A camera sees. A person responds. Who connects the story?"
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {CUSTOMER_CHALLENGES.map(({ number, title, description }) => (
            <li
              key={number}
              className="platform-glass-card animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
              style={{ animationDelay: `${Number(number) * 80}ms` }}
            >
              <p className="text-sm font-semibold text-secondary">{number}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-platform-muted">
                {description}
              </p>
            </li>
          ))}
        </ul>

        <p className="platform-glass-card mt-8 text-center text-sm leading-6 text-white/90 md:text-base">
          A unified response connects the signal, location, people, procedure
          and record.
        </p>
      </div>
    </section>
  );
}
