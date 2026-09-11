import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PlatformPageShell } from "@/components/platform/page-shell";
import { ScreenshotGallery } from "@/components/platform/screenshot-gallery";
import {
  ARCHITECTURE_LAYERS,
  REFERENCE_ENGINEERING,
  REFERENCE_OPERATIONAL,
  SCREENSHOT_GALLERY,
} from "@/lib/platform";

export const metadata: Metadata = {
  title: "Reference — Simpnify",
  description:
    "Capability reference for operational functions, engineering governance, architecture and product screenshots.",
};

export default function ReferencePage() {
  return (
    <PlatformPageShell
      eyebrow="REFERENCE & GALLERY"
      title="Coverage, sources and real screens"
      description="Compact checklists for requirements discussions, plus architecture and screenshot evidence from the product."
    >
      <section className="px-6 pb-12 md:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-semibold text-white">
            Operational functions
          </h2>
          <ul className="mt-6 space-y-3">
            {REFERENCE_OPERATIONAL.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-white/10 bg-[#0c1a22]/60 px-5 py-4 text-sm leading-6 text-platform-muted"
              >
                {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-14 text-xl font-semibold text-white">
            Engineering & governance
          </h2>
          <ul className="mt-6 space-y-3">
            {REFERENCE_ENGINEERING.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-white/10 bg-[#0c1a22]/60 px-5 py-4 text-sm leading-6 text-platform-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16 md:px-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-semibold text-white">
            Conceptual architecture
          </h2>
          <div className="mt-8 platform-product-frame">
            <div className="relative aspect-[16/7] overflow-hidden rounded-xl">
              <Image
                src="/platform/architecture.webp"
                alt="Simpnify conceptual architecture diagram"
                fill
                className="object-contain bg-[#0d1418]"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ARCHITECTURE_LAYERS.map(({ label, description }) => (
              <li
                key={label}
                className="rounded-xl border border-white/10 px-4 py-3"
              >
                <p className="text-sm font-semibold text-secondary">{label}</p>
                <p className="text-xs text-platform-muted">{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16 md:px-16 md:pb-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-semibold text-white">
            Screenshot gallery
          </h2>
          <ScreenshotGallery items={SCREENSHOT_GALLERY} />
          <div className="mt-10">
            <Link href="/our-platform" className="platform-btn-secondary">
              Return to platform story
            </Link>
          </div>
        </div>
      </section>
    </PlatformPageShell>
  );
}
