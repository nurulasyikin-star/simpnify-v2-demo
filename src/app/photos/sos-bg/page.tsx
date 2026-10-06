import type { Metadata } from "next";

import {
  sosBgVariants,
  type SosBgVariantId,
} from "@/components/sos-bg-variant-meta";
import { SosBgVariant } from "@/components/sos-bg-variants";

export const metadata: Metadata = {
  title: "SOS background review — Simpnify",
  description:
    "Compare animated backgrounds for the black area behind the Responder SOS video.",
  robots: { index: false, follow: false },
};

function PreviewFrame({
  id,
  title,
  tagline,
  pros,
  cons,
}: {
  id: SosBgVariantId;
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
      <div className="bg-[var(--platform-surface)] px-4 py-8 md:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-platform-subtle">
          Sample — Responder SOS card
        </p>
        <SosBgVariant id={id} />
      </div>
    </section>
  );
}

export default function SosBgReviewPage() {
  return (
    <main
      id="main-content"
      className="flex-1 bg-[var(--platform-surface)] px-4 pb-20 pt-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Design review
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            SOS black background
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-platform-muted">
            Five backgrounds for the empty black around the Responder SOS
            video. A is what ships today. B uses the network globe GIF already
            in the project. C, D, and E are new motion drawn for this dark
            page. B–E show through the black in the recording so the light
            dashboard stays visible. Nothing here is on Our Platform until you
            pick one.
          </p>
          <nav
            aria-label="SOS background jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {sosBgVariants.map(({ id, title }) => (
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
          {sosBgVariants.map((variant) => (
            <PreviewFrame key={variant.id} {...variant} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Reply with a letter (A–E) to apply it to the Responder SOS card.
          Production chrome is hidden on this route so the previews are not
          doubled.
        </p>
      </div>
    </main>
  );
}
