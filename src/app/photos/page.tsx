import type { Metadata } from "next";

import {
  FooterVariant,
  footerVariants,
  type FooterVariantId,
} from "@/components/footer-variants";

export const metadata: Metadata = {
  title: "Footer design review — Simpnify",
  description: "Compare footer layout options before picking one for production.",
  robots: { index: false, follow: false },
};

function PreviewFrame({
  id,
  title,
  tagline,
  pros,
  cons,
}: {
  id: FooterVariantId;
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

      <div className="flex flex-col">
        <div className="flex min-h-[220px] flex-col justify-end bg-[var(--platform-surface)] px-6 pb-0 pt-10 md:px-8">
          <div className="mx-auto w-full max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-platform-subtle">
              Sample page ending
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">
              Ready to see it in your environment?
            </p>
            <p className="mt-2 text-sm text-platform-muted">
              Placeholder CTA block — shows how the footer closes a typical
              marketing page.
            </p>
            <div className="mt-6 flex justify-center gap-3 pb-10">
              <span className="rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-[#071318]">
                Contact us
              </span>
              <span className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white">
                View demos
              </span>
            </div>
          </div>
        </div>

        <FooterVariant id={id} />
      </div>
    </section>
  );
}

export default function PhotosPage() {
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
            Footer options
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-platform-muted">
            Five layouts to compare. Variant A is what ships today. Scroll each
            preview — the sample page ending plus footer shows how it feels at
            the bottom of a real page. Pick a letter (A–E) or variant id when
            you&apos;re ready.
          </p>

          <nav
            aria-label="Footer variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {footerVariants.map(({ id, title }) => (
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
          {footerVariants.map((variant) => (
            <PreviewFrame key={variant.id} {...variant} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open this page at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos
          </code>{" "}
          any time to revisit. Production footer is hidden here so previews
          aren&apos;t doubled.{" "}
          <a href="/photos/demos" className="text-secondary hover:underline">
            Demos step review
          </a>
          {" · "}
          <a href="/photos/demos-visual" className="text-secondary hover:underline">
            Demos images &amp; animation review
          </a>
          {" · "}
          <a href="/photos/use-cases" className="text-secondary hover:underline">
            Use Cases video review
          </a>
          {" · "}
          <a href="/photos/feature-carousel" className="text-secondary hover:underline">
            Walkthrough carousel review
          </a>
          {" · "}
          <a href="/photos/about-pledge" className="text-secondary hover:underline">
            About pledge review
          </a>
          {" · "}
          <a
            href="/photos/platform-redundancy"
            className="text-secondary hover:underline"
          >
            Platform redundancy review
          </a>
        </p>
      </div>
    </main>
  );
}
