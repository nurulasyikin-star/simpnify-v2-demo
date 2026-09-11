import { Eye, ShieldCheck, Users } from "lucide-react";

import { VALUE_PILLARS } from "@/lib/platform";

import { PlatformSectionHeader } from "./platform-section-header";

const ICONS = [Eye, Users, ShieldCheck] as const;

export function PlatformValuePillars() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="VALUE PROPOSITION"
          title="Turn visibility into operational control"
          description="One operational story, from the first alert to the final review."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {VALUE_PILLARS.map(({ title, description }, index) => {
            const Icon = ICONS[index];
            return (
              <li
                key={title}
                className="platform-glass-card animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span
                  className="flex size-10 items-center justify-center rounded-full bg-secondary/15 text-secondary"
                  aria-hidden
                >
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <p className="mt-5 text-sm font-semibold text-secondary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-platform-muted">
                  {description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
