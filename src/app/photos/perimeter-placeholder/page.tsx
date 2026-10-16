import type { Metadata } from "next";

import { PerimeterPlaceholderVariant } from "@/components/perimeter-placeholder-variants";
import { perimeterPlaceholderVariants } from "@/components/perimeter-placeholder-variants-meta";

export const metadata: Metadata = {
  title: "Perimeter intrusion placeholder — design review",
  robots: { index: false, follow: false },
};

export default function PerimeterPlaceholderReviewPage() {
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
            Perimeter intrusion — until the video is ready
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-platform-muted">
            The landing page&apos;s use-case row shows a cropped flow diagram
            while the perimeter video is still being filmed. Five ways to fill
            the frame. A is what ships today. Pick a letter (A–E) when
            you&apos;re ready.
          </p>
          <nav aria-label="Variant jump links" className="mt-6 flex flex-wrap gap-2">
            {perimeterPlaceholderVariants.map(({ id, title }) => (
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
          {perimeterPlaceholderVariants.map(({ id, title, tagline, pros, cons }) => (
            <section
              key={id}
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

              <p className="bg-black px-6 pt-6 text-[11px] font-medium tracking-[0.22em] text-white/40 md:px-16 lg:px-24">
                IN CONTEXT · LANDING USE-CASE ROW (SOS ABOVE, FIRE BELOW)
              </p>
              <PerimeterPlaceholderVariant id={id} />
            </section>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Review at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/perimeter-placeholder
          </code>
          . Production footer is hidden on this route.
        </p>
      </div>
    </main>
  );
}
