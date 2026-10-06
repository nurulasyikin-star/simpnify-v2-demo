import type { Metadata } from "next";

import {
  CustomerChallengeVideoPreviewContext,
  CustomerChallengeVideoVariant,
  customerChallengeVideoVariants,
  type CustomerChallengeVideoVariantId,
} from "@/components/customer-challenge-video-variants";

export const metadata: Metadata = {
  title: "Customer challenge — video narrative review",
  description:
    "Compare how to explain “The expensive gap is between systems” in video on Our Platform.",
  robots: { index: false, follow: false },
};

function PreviewFrame({
  id,
  title,
  tagline,
  pros,
  cons,
  videoPlan,
}: {
  id: CustomerChallengeVideoVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
  videoPlan: string[];
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

        {videoPlan.length > 0 ? (
          <div className="mt-4 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
              Video plan
            </p>
            <ul className="mt-2 space-y-1 text-sm text-platform-muted">
              {videoPlan.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ) : null}

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
        <CustomerChallengeVideoPreviewContext />
        <CustomerChallengeVideoVariant id={id} />
        <div className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-8 text-center md:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-platform-subtle">
            Sample context — section below on /our-platform
          </p>
          <p className="mt-3 text-lg font-semibold text-white">
            The Solution — One platform to integrate, manage and control
          </p>
        </div>
      </div>
    </section>
  );
}

export default function CustomerChallengeVideoReviewPage() {
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
            Customer challenge → video
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-platform-muted">
            Your screenshot block:{" "}
            <strong className="font-semibold text-white/90">
              The expensive gap is between systems
            </strong>{" "}
            plus three cards (fragmented context, unclear ownership, inconsistent
            evidence). These variants show{" "}
            <strong className="font-semibold text-white/90">how to explain that
            story in video</strong> on the page — placeholders use existing demo
            clips until a dedicated reel is cut. Variant{" "}
            <strong className="font-semibold text-white/90">A</strong> is
            production text-only. Pick A–E (or mix, e.g. &quot;B reel + C brief
            for the agency&quot;) when ready.
          </p>

          <nav
            aria-label="Variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {customerChallengeVideoVariants.map(({ id, title }) => (
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
          {customerChallengeVideoVariants.map((variant) => (
            <PreviewFrame key={variant.id} {...variant} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Shot lists and timecodes live in{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5">
            src/lib/platform/challenge-story-videos.ts
          </code>
          . Site footer hidden on{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5">/photos</code>.{" "}
          <a
            href="/photos/platform-challenge"
            className="text-secondary hover:underline"
          >
            Challenge copy variants
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
