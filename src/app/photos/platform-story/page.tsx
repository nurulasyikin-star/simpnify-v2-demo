import type { Metadata } from "next";

import {
  PlatformStorySectionStack,
  PlatformStoryVariant,
  STORY_EXTRACTION_NOTES,
  platformStoryVariants,
  type PlatformStoryVariantId,
} from "@/components/platform-story-variants";

export const metadata: Metadata = {
  title: "Platform story review — Simpnify",
  description:
    "Compare Our Platform layouts that combine Gotham-style narrative, Help Center extraction, and existing marketing sections.",
  robots: { index: false, follow: false },
};

function PreviewFrame({
  id,
  title,
  tagline,
  pros,
  cons,
  sections,
  extractionFocus,
}: {
  id: PlatformStoryVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
  sections: (typeof platformStoryVariants)[number]["sections"];
  extractionFocus: string[];
}) {
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
          <span className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
            {id}
          </span>
        </div>

        {extractionFocus.length > 0 ? (
          <div className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
              Extraction focus
            </p>
            <ul className="mt-2 space-y-1 text-sm text-platform-muted">
              {extractionFocus.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
            Section stack
          </p>
          <div className="mt-2">
            <PlatformStorySectionStack sections={sections} />
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

      <div
        className="max-h-[min(85vh,900px)] overflow-y-auto border-t border-white/10 bg-[var(--platform-surface)]"
        tabIndex={0}
        aria-label={`Live preview: ${title}`}
      >
        <PlatformStoryVariant id={id} />
      </div>
    </section>
  );
}

export default function PlatformStoryReviewPage() {
  return (
    <main
      id="main-content"
      className="flex-1 bg-[var(--platform-surface)] px-4 pb-20 pt-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Design review
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            Our Platform — Gotham + Help extraction
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-platform-muted">
            Five live stacks combining Palantir-style decision-platform narrative,
            Help Center workspace/lifecycle/trust themes, and your existing{" "}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
              /our-platform
            </code>{" "}
            sections. Variant A is production today. Pick A–E (or mix, e.g.
            &quot;D with lifecycle-bridge from C&quot;) when ready.
          </p>

          <ul className="mt-4 space-y-1 text-sm text-platform-subtle">
            {STORY_EXTRACTION_NOTES.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>

          <nav
            aria-label="Variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {platformStoryVariants.map(({ id, title }) => (
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
          {platformStoryVariants.map((variant) => (
            <PreviewFrame key={variant.id} {...variant} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Production{" "}
          <a href="/our-platform" className="text-secondary hover:underline">
            /our-platform
          </a>{" "}
          unchanged until you choose. Site footer hidden on all{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5">/photos</code>{" "}
          routes.{" "}
          <a href="/photos" className="text-secondary hover:underline">
            Footer review
          </a>
          {" · "}
          <a
            href="/photos/content-video-hero"
            className="text-secondary hover:underline"
          >
            Content video hero
          </a>
          {" · "}
          <a
            href="/photos/platform-redundancy"
            className="text-secondary hover:underline"
          >
            Redundancy-only review
          </a>
        </p>
      </div>
    </main>
  );
}
