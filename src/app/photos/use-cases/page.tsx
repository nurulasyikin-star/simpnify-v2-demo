import type { Metadata } from "next";
import Link from "next/link";

import {
  UseCasesVideoVariant,
  useCasesVideoVariants,
  type UseCasesVideoVariantId,
} from "@/components/use-cases-video-variants";

export const metadata: Metadata = {
  title: "Use Cases video layout review — Simpnify",
  description:
    "Compare YouTube display options for the Use Cases page before applying to production.",
  robots: { index: false, follow: false },
};

function PreviewFrame({
  id,
  title,
  tagline,
  pros,
  cons,
}: {
  id: UseCasesVideoVariantId;
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
            <p className="mt-1 text-sm leading-6 text-platform-muted">{tagline}</p>
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

      <UseCasesVideoVariant id={id} />
    </section>
  );
}

export default function UseCasesPhotosPage() {
  return (
    <main
      id="main-content"
      className="flex-1 bg-[var(--platform-surface)] px-4 pb-20 pt-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Design review
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            Use Cases — YouTube display options
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-platform-muted">
            Five layouts for the five supplied demo reels on{" "}
            <Link href="/solutions" className="text-secondary hover:underline">
              /solutions
            </Link>
            . Variant A is what ships today (cards only). Scroll each preview in
            context — mock page hero plus video section. Pick a letter (A–E) or
            variant id when ready.
          </p>

          <nav
            aria-label="Use Cases video variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {useCasesVideoVariants.map(({ id, title }) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-platform-muted transition hover:border-secondary/40 hover:text-secondary"
              >
                {title.split("—")[0].trim()}
              </a>
            ))}
          </nav>

          <p className="mt-4 text-xs text-platform-subtle">
            Videos: platform overview + perimeter, SOS, restricted area, field
            offline scenarios.
          </p>
        </header>

        <div className="flex flex-col gap-12">
          {useCasesVideoVariants.map((variant) => (
            <PreviewFrame key={variant.id} {...variant} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/use-cases
          </code>
          . Production footer is hidden on /photos routes.{" "}
          <Link href="/photos" className="text-secondary hover:underline">
            Footer review
          </Link>{" "}
          ·{" "}
          <Link href="/photos/demos-visual" className="text-secondary hover:underline">
            Features images review
          </Link>{" "}
          ·{" "}
          <Link href="/photos/feature-carousel" className="text-secondary hover:underline">
            Walkthrough carousel review
          </Link>
        </p>
      </div>
    </main>
  );
}
