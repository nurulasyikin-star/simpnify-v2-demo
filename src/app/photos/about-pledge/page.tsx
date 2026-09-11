import type { Metadata } from "next";
import Link from "next/link";

import { AboutPledgeVariant } from "@/components/about-pledge-variants";
import {
  aboutPledgeVariants,
  type AboutPledgeVariantId,
} from "@/components/about-pledge-variants-meta";

export const metadata: Metadata = {
  title: "About pledge cards review — Simpnify",
  description:
    "Compare vision, mission and quality commitment layouts before applying to the About page.",
  robots: { index: false, follow: false },
};

function PreviewFrame({
  id,
  title,
  tagline,
  pros,
  cons,
}: {
  id: AboutPledgeVariantId;
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

      <AboutPledgeVariant id={id} />
    </section>
  );
}

export default function AboutPledgePhotosPage() {
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
            About — vision / mission / quality options
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-platform-muted">
            Five treatments for the pledge row on{" "}
            <Link href="/about" className="text-secondary hover:underline">
              /about
            </Link>
            . Variant A is what ships today (static cards). B–E add tabs, hover
            lift, timeline rail and spotlight expand — click and hover in each
            preview to compare. Pick a letter (A–E) or variant id when ready.
          </p>

          <nav
            aria-label="About pledge variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {aboutPledgeVariants.map(({ id, title }) => (
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
          {aboutPledgeVariants.map((variant) => (
            <PreviewFrame key={variant.id} {...variant} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/about-pledge
          </code>
          . Production footer is hidden on /photos routes.{" "}
          <Link href="/photos" className="text-secondary hover:underline">
            Footer review
          </Link>{" "}
          ·{" "}
          <Link href="/photos/demos-visual" className="text-secondary hover:underline">
            Demos visual review
          </Link>{" "}
          ·{" "}
          <Link href="/photos/use-cases" className="text-secondary hover:underline">
            Use Cases video review
          </Link>
        </p>
      </div>
    </main>
  );
}
