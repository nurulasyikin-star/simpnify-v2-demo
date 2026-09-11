import { PlatformImage } from "@/components/platform-image";
import { CheckCircle2 } from "lucide-react";

import { WHY_SIMPNIFY_POINTS } from "@/lib/platform";

import { PlatformSectionHeader } from "./platform-section-header";

export function PlatformWhySimpnify() {
  return (
    <section className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <PlatformSectionHeader
            eyebrow="WHY SIMPNIFY?"
            title="Standards-aligned convergence, built in from day one"
          />

          <ul className="mt-8 space-y-5">
            {WHY_SIMPNIFY_POINTS.map(({ title, description }) => (
              <li key={title} className="flex gap-4">
                <span
                  className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary"
                  aria-hidden
                >
                  <CheckCircle2 className="size-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-platform-muted">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="platform-product-frame relative w-full animate-in fade-in zoom-in-95 fill-mode-both duration-700">
          <div className="aspect-[4/5] overflow-hidden rounded-lg bg-[#0d1418]">
            <div className="relative h-full w-full">
              <PlatformImage
                src="/platform/our-platform-site/jdm.png"
                alt="Joint Decision Model (JDM) supporting JESIP-aligned response"
                fill
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
