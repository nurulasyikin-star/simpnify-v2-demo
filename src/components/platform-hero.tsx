import { PlatformImage } from "@/components/platform-image";
import Link from "next/link";

import { PlatformAccentBar } from "@/components/platform-accent-bar";

export function PlatformHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--platform-surface)] px-6 py-12 md:px-16 md:py-20">
      <div className="platform-scan-bg" aria-hidden />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex gap-7">
          <PlatformAccentBar />
          <div className="space-y-5">
            <p className="text-sm font-semibold tracking-wide text-secondary">
              SIMPNIFY / UNIFIED PLATFORM
            </p>
            <p className="max-w-xl text-lg leading-7 text-platform-muted md:text-xl">
              When systems don&apos;t connect, every incident costs more.
            </p>
            <h1 className="text-5xl font-semibold text-white md:text-6xl">
              See the site.
              <br />
              Coordinate the response.
            </h1>
            <p className="text-lg font-medium text-secondary">
              Industrial & critical infrastructure
            </p>
            <p className="max-w-xl text-base leading-7 text-platform-muted md:text-lg">
              One operational story from the first alert to the final review —
              connecting signals, people, procedures and evidence.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/demos" className="platform-btn-primary">
                Open product tour
              </Link>
              <Link href="/platform" className="platform-btn-secondary">
                Explore modules
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="platform-product-frame relative w-full animate-in fade-in zoom-in-95 fill-mode-both duration-700">
            <span
              className="platform-scan-corner -left-1 -top-1 border-l-2 border-t-2"
              aria-hidden
            />
            <span
              className="platform-scan-corner -right-1 -top-1 border-r-2 border-t-2"
              aria-hidden
            />
            <span
              className="platform-scan-corner -bottom-1 -left-1 border-b-2 border-l-2"
              aria-hidden
            />
            <span
              className="platform-scan-corner -bottom-1 -right-1 border-b-2 border-r-2"
              aria-hidden
            />
            <div className="aspect-[3/2] overflow-hidden rounded-lg bg-[#0d1418]">
              <div className="relative h-full w-full">
                <PlatformImage
                  src="/platform/hero-platform-ui.webp"
                  alt="Simpnify Floor Plan Studio showing an industrial building sample"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
          <Link
            href="/partners"
            className="mt-4 text-xs text-platform-muted transition hover:text-secondary"
          >
            Delivered in alliance with technology partners
          </Link>
        </div>
      </div>
    </section>
  );
}
