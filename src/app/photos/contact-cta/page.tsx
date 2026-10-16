import type { Metadata } from "next";
import Link from "next/link";

import { ContactCtaVariant } from "@/components/contact-cta-variants";
import {
  contactCtaVariants,
  type ContactCtaVariantId,
} from "@/components/contact-cta-variants-meta";

export const metadata: Metadata = {
  title: "Contact CTA review — Simpnify",
  description:
    "Compare ways to bring office contact details into the 'Are you ready?' section.",
  robots: { index: false, follow: false },
};

function PreviewFrame({
  id,
  title,
  tagline,
  pros,
  cons,
}: {
  id: ContactCtaVariantId;
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

      <div className="bg-black">
        <div className="px-6 py-10 md:px-16">
          <p className="text-[11px] font-medium tracking-[0.22em] text-white/30">
            {"{ SAMPLE — END OF USE CASES GRID }"}
          </p>
          <div className="mt-4 grid grid-cols-3 gap-4 opacity-40">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-video border border-white/10 bg-[#071014]" />
            ))}
          </div>
        </div>
        <ContactCtaVariant id={id} />
      </div>
    </section>
  );
}

export default function ContactCtaPhotosPage() {
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
            &ldquo;Are you ready?&rdquo; + office contacts
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-platform-muted">
            Five ways to fold the four offices from{" "}
            <Link href="/contact" className="text-secondary hover:underline">
              /contact
            </Link>{" "}
            into the closing section of{" "}
            <Link href="/our-platform" className="text-secondary hover:underline">
              /our-platform
            </Link>
            . Variant A is what ships today. Pick a letter (A–E) or id when
            ready.
          </p>

          <nav
            aria-label="Contact CTA variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {contactCtaVariants.map(({ id, title }) => (
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
          {contactCtaVariants.map((variant) => (
            <PreviewFrame key={variant.id} {...variant} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/contact-cta
          </code>
          . Production footer is hidden on /photos routes.{" "}
          <Link href="/photos" className="text-secondary hover:underline">
            Footer review
          </Link>
        </p>
      </div>
    </main>
  );
}
