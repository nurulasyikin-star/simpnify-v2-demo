import type { Metadata } from "next";
import Link from "next/link";

import {
  platformMotionVariants,
  type PlatformMotionVariantMeta,
} from "@/components/platform-motion-variants-meta";
import { publicAsset } from "@/lib/site-path";

export const metadata: Metadata = {
  title: "Our Platform motion and picture review — Simpnify",
  description:
    "Compare full-page versions of Our Platform that fix uneven scroll motion and soft pictures.",
  robots: { index: false, follow: false },
};

function PreviewFrame({ id, title, tagline, pros, cons }: PlatformMotionVariantMeta) {
  return (
    <section
      id={id}
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-white/10 bg-[#0a1218]"
    >
      <div className="border-b border-white/10 px-6 py-5 md:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-platform-muted">{tagline}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/photos/platform-motion/${id}`}
              target="_blank"
              className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-[#071318] transition hover:opacity-90"
            >
              Open full screen ↗
            </Link>
            <span className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
              {id}
            </span>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
              Pros
            </p>
            <ul className="mt-2 space-y-1 text-sm text-platform-muted">
              {pros.map((item) => (
                <li key={item}>+ {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
              Cons
            </p>
            <ul className="mt-2 space-y-1 text-sm text-platform-muted">
              {cons.map((item) => (
                <li key={item}>− {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <iframe
        src={publicAsset(`/photos/platform-motion/${id}/`)}
        title={`Full page preview: ${title}`}
        loading="lazy"
        className="block h-[min(82vh,860px)] w-full border-0 bg-black"
      />
    </section>
  );
}

export default function PlatformMotionReviewPage() {
  return (
    <main
      id="main-content"
      className="flex-1 bg-[var(--platform-surface)] px-4 pb-20 pt-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-[1600px]">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Design review
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            Our Platform — motion and pictures
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-platform-muted">
            Each preview is the{" "}
            <strong className="font-semibold text-white/90">whole page</strong>{" "}
            with all current content. Only the motion and picture handling
            change.{" "}
            <a href="/our-platform" className="text-secondary hover:underline">
              /our-platform
            </a>{" "}
            now uses smooth GPU zooms, the remastered 1920px / 30fps films, and
            a cap so a clip is not stretched much past its real size. A–E stay
            here for comparison. Scroll inside a preview, or use{" "}
            <em>Open full screen</em> to judge smoothness.
          </p>

          <nav aria-label="Variant jump links" className="mt-6 flex flex-wrap gap-2">
            {platformMotionVariants.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-platform-muted transition hover:border-secondary/40 hover:text-secondary"
              >
                {title.split("—")[0].trim()}
              </a>
            ))}
          </nav>
        </header>

        <div className="flex flex-col gap-12">
          {platformMotionVariants.map((variant) => (
            <PreviewFrame key={variant.id} {...variant} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Site header and footer are hidden inside the previews.{" "}
          <a href="/photos" className="text-secondary hover:underline">
            All reviews
          </a>
          {" · "}
          <a href="/our-platform" className="text-secondary hover:underline">
            Live /our-platform
          </a>
        </p>
      </div>
    </main>
  );
}
