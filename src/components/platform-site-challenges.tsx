import { PlatformImage } from "@/components/platform-image";

import { SITE_CHALLENGES, UNIFIED_OPERATION_ITEMS } from "@/lib/platform";

import { PlatformSectionHeader } from "./platform-section-header";

export function PlatformSiteChallenges() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="THE CHALLENGES"
          title="Managing diverse subsystems and converging security functions"
          description="Exploring the top challenges of business security — from one-site operation to multi-site scale to security convergence requirements."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
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
              <p className="mt-5 text-sm font-semibold text-secondary">
                {number}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-platform-muted">
                {description}
              </p>
            </li>
          ))}
        </ul>

        <div className="platform-glass-card mt-8">
          <h3 className="text-base font-semibold text-white">
            How to have unified operation for:
          </h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {UNIFIED_OPERATION_ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm leading-6 text-platform-muted"
              >
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
