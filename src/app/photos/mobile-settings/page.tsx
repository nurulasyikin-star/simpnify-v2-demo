import type { Metadata } from "next";
import Link from "next/link";

import {
  MobileSettingsVariant,
  mobileSettingsVariants,
  type MobileSettingsVariantId,
} from "@/components/mobile-settings-variants";

export const metadata: Metadata = {
  title: "Mobile settings design review — Simpnify",
  description:
    "Compare the web mobile screens, the native profile and settings, and SOTI ideas for auto-lock, device status, and console lock.",
  robots: { index: false, follow: false },
};

function PreviewFrame({
  id,
  title,
  tagline,
  scene,
  soti,
  pros,
  cons,
}: {
  id: MobileSettingsVariantId;
  title: string;
  tagline: string;
  scene: string;
  soti: string;
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
        <p className="mt-4 text-sm leading-6 text-[#c5d0d6]">
          <span className="font-semibold text-white">From SOTI. </span>
          {soti}
        </p>
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

      <div className="bg-[#050b10] px-4 py-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.16em] text-platform-subtle">
          {scene}
        </p>
        <div data-shot className="mx-auto flex w-fit max-w-full flex-wrap items-start justify-center gap-8">
          <MobileSettingsVariant id={id} />
        </div>
      </div>
    </section>
  );
}

export default function MobileSettingsPhotosPage() {
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
            Mobile profile, settings, and lock
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-platform-muted">
            A is the web mobile version from the left of your frames. B is the
            native drawer, settings, and logout from the right. C, D, and E keep
            that look and add the parts of{" "}
            <a href="https://soti.net/" className="text-secondary hover:underline">
              soti.net
            </a>{" "}
            that fit the security and settings screens. Pick a letter when ready.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#0a1218] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Worth taking
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-platform-muted">
                <li>Lock timeouts, with a badge or password to reopen</li>
                <li>Device health shown to the officer holding the phone</li>
                <li>Remote lock from the console for lost or reassigned phones</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0a1218] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
                Left with SOTI
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-platform-muted">
                <li>Remote wipe and remote screen viewing</li>
                <li>App install and OS update controls</li>
                <li>Profile edit stays as drawn: name, title, location</li>
              </ul>
            </div>
          </div>

          <nav
            aria-label="Mobile settings variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {mobileSettingsVariants.map(({ id, title }) => (
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
          {mobileSettingsVariants.map((variant) => (
            <PreviewFrame key={variant.id} {...variant} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/mobile-settings
          </code>
          . Production chrome is hidden on this route.{" "}
          <Link href="/photos/mobile-auth" className="text-secondary hover:underline">
            Session screens review
          </Link>
          {" · "}
          <Link href="/photos" className="text-secondary hover:underline">
            Other reviews
          </Link>
        </p>
      </div>
    </main>
  );
}
