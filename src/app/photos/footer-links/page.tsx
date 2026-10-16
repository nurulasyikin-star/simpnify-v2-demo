import type { Metadata } from "next";

import { FooterLinksVariant } from "@/components/footer-links-variants";
import {
  footerLinksVariants,
  type FooterLinksVariantId,
} from "@/components/footer-links-variants-meta";

export const metadata: Metadata = {
  title: "Footer links review — Simpnify",
  description:
    "Compare ways to hide the footer link columns before applying one to production.",
  robots: { index: false, follow: false },
};

function SampleContext() {
  return (
    <div className="px-6 py-12 text-center md:px-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
        Sample page ending
      </p>
      <h3 className="mt-2 text-2xl font-semibold text-white">
        Ready to see Simpnify on your site?
      </h3>
      <span className="mt-5 inline-block rounded-full bg-secondary px-5 py-2 text-sm font-medium text-[#0a1218]">
        Book a demo
      </span>
    </div>
  );
}

function PreviewFrame({
  id,
  title,
  tagline,
  pros,
  cons,
}: {
  id: FooterLinksVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
}) {
  return (
    <section
      id={id}
      className="scroll-mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[#0a1218]"
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

      <div className="bg-[var(--platform-surface)]">
        <SampleContext />
        <FooterLinksVariant id={id} />
      </div>
    </section>
  );
}

export default function FooterLinksPhotosPage() {
  return (
    <main
      id="main-content"
      className="flex-1 bg-[var(--platform-surface)] px-4 pb-20 pt-10 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Design review
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            Footer link columns: hide options
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-platform-muted">
            Five ways to handle the Product, Company and Resources block in the
            footer. A is what ships today. B through D hide the links behind an
            interaction, and E removes them. The previews are interactive, so
            click the toggles to try them. Pick a letter (A–E) when you are
            ready.
          </p>

          <nav
            aria-label="Footer links variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {footerLinksVariants.map(({ id, title }) => (
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
          {footerLinksVariants.map((variant) => (
            <PreviewFrame key={variant.id} {...variant} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          The production footer is hidden on this route so the previews are not
          doubled. The live site stays unchanged until you pick one.
        </p>
      </div>
    </main>
  );
}
