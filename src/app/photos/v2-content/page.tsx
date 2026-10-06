import type { Metadata } from "next";

import {
  V2ContentVariant,
  v2ContentVariants,
  type V2ContentVariantId,
} from "@/components/v2-content-variants";

export const metadata: Metadata = {
  title: "v2 content design review — Simpnify",
  description:
    "Compare v2 homepage options: drop v1 marketing, keep PDF copy, surface Map, AURA, GIS, floor plan, enclosed sites, mobile and use cases.",
  robots: { index: false, follow: false },
};

function PreviewFrame({
  id,
  title,
  tagline,
  pros,
  cons,
  stripsV1,
}: {
  id: V2ContentVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
  stripsV1: boolean;
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
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary">
              {id}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                stripsV1
                  ? "border-secondary/30 bg-secondary/10 text-secondary"
                  : "border-white/15 text-platform-muted"
              }`}
            >
              {stripsV1 ? "v1 removed" : "v1 still present"}
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

      <div className="border-t border-white/10 bg-[var(--platform-surface-raised)] px-6 py-4 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-platform-subtle">
          Sample homepage
        </p>
        <p className="mt-1 text-sm text-platform-muted">
          Pretend this is{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5">/our-platform</code>{" "}
          after the visitor lands from the header. Scroll the frame like a real
          page.
        </p>
      </div>

      <div
        className="max-h-[min(85vh,900px)] overflow-y-auto border-t border-white/10 bg-[var(--platform-surface)]"
        tabIndex={0}
        aria-label={`Live preview: ${title}`}
      >
        <V2ContentVariant id={id} />
      </div>
    </section>
  );
}

export default function V2ContentReviewPage() {
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
            v2 site content
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-platform-muted">
            Five homepage stacks to compare. Variant A is production today.
            B–E drop v1 marketing and rebuild around the Industrial &amp;
            Critical Infrastructure PDF, plus the brief: Map, AI triggered
            (AURA), GIS info, Floor plan, Enclosed environment, Mobile apps,
            and use cases (perimeter intrusion, SOS, restricted area).
            Production is unchanged until you pick a letter or id.
          </p>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
              Boss brief — each B–E variant must show
            </p>
            <ul className="mt-2 flex flex-wrap gap-2 text-xs text-platform-muted">
              {[
                "Map",
                "AI triggered — AURA",
                "GIS info",
                "Floor plan",
                "Enclosed environment",
                "Mobile apps",
                "Use cases: perimeter, SOS, restricted area",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 px-2.5 py-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-label="v2 content variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {v2ContentVariants.map(({ id, title }) => (
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
          {v2ContentVariants.map((variant) => (
            <PreviewFrame key={variant.id} {...variant} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/v2-content
          </code>{" "}
          to revisit. Production header stays; production footer is hidden on
          this route so previews aren&apos;t doubled. Reply with A–E (or mix:
          “C’s capability grid with D’s use-case spine”) and we will wire the
          winner into{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /our-platform
          </code>
          .
        </p>
      </div>
    </main>
  );
}
