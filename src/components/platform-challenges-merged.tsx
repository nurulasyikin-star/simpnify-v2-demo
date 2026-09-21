import { PlatformImage } from "@/components/platform-image";

import {
  CUSTOMER_CHALLENGES,
  SITE_CHALLENGES,
} from "@/lib/platform";

import { PlatformSectionHeader } from "./platform-section-header";

/** Merged variant: site-scale + operator-pain challenges in one scroll block. */
export function PlatformChallengesMerged() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="THE CHALLENGES"
          title="From site complexity to operator gaps"
          description="Scale and convergence requirements meet the day-to-day cost of fragmented response."
        />

        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-platform-subtle">
          At your sites
        </p>
        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {SITE_CHALLENGES.map(({ number, title, description, image, alt }) => (
            <li
              key={number}
              className="platform-glass-card flex flex-col animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
              style={{ animationDelay: `${Number(number) * 80}ms` }}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#0d1418]">
                <PlatformImage
                  src={image}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <p className="mt-5 text-sm font-semibold text-secondary">{number}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-platform-muted">
                {description}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-xs font-semibold uppercase tracking-[0.2em] text-platform-subtle">
          In the control room
        </p>
        <ul className="mt-5 grid gap-5 md:grid-cols-3">
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
          A unified response connects the signal, location, people, procedure and
          record.
        </p>
      </div>
    </section>
  );
}
