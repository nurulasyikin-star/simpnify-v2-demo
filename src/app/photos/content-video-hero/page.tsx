import type { Metadata } from "next";

import {
  ContentVideoHeroVariant,
  contentVideoHeroVariants,
  type ContentVideoHeroVariantId,
} from "@/components/platform-content-video-hero-variants";

export const metadata: Metadata = {
  title: "Content video hero — design review",
  description:
    "Compare Gotham-style content-video hero layouts and headline copy before updating production.",
  robots: { index: false, follow: false },
};

function PreviewFrame({
  id,
  title,
  tagline,
  pros,
  cons,
}: {
  id: ContentVideoHeroVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
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
            <p className="mt-1 text-sm leading-6 text-platform-muted">
              {tagline}
            </p>
          </div>
          <span className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
            {id}
          </span>
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
        className="border-t border-white/10 bg-[var(--platform-surface)]"
        aria-label={`Live preview: ${title}`}
      >
        <p className="border-b border-white/5 bg-black/30 px-6 py-2 text-center text-xs text-platform-subtle md:px-8">
          Sample context — section below would be Decision OS / stats (hidden
          here). Site header hidden on this route so Gotham chrome reads
          cleanly.
        </p>
        <ContentVideoHeroVariant id={id} />
        <div className="border-t border-white/10 bg-[#0c1a22] px-6 py-8 text-center md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-platform-subtle">
            Next section (placeholder)
          </p>
          <p className="mt-2 text-sm text-platform-muted">
            Platform positioning · stats · lifecycle — scroll continues on
            /our-platform
          </p>
        </div>
      </div>
    </section>
  );
}

export default function ContentVideoHeroReviewPage() {
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
            Content video hero — layout &amp; copy
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-platform-muted">
            Five live heroes over the Energy &amp; Marine GIF background. Variant
            C is production on{" "}
            <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
              /our-platform
            </code>
            . A is the previous left-column layout. Pick another letter if you
            want to change again.
          </p>

          <nav
            aria-label="Content video hero variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {contentVideoHeroVariants.map(({ id, title }) => (
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
          {contentVideoHeroVariants.map((variant) => (
            <PreviewFrame key={variant.id} {...variant} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/content-video-hero
          </code>{" "}
          any time. Production{" "}
          <a href="/our-platform" className="text-secondary hover:underline">
            /our-platform
          </a>{" "}
          now ships variant C.{" "}
          <a href="/photos" className="text-secondary hover:underline">
            Footer review
          </a>
          {" · "}
          <a
            href="/photos/platform-story"
            className="text-secondary hover:underline"
          >
            Platform story review
          </a>
        </p>
      </div>
    </main>
  );
}
