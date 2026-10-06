import type { Metadata } from "next";
import Link from "next/link";

import {
  MobileAssetsVariant,
  mobileAssetsVariants,
  type MobileAssetsVariantId,
} from "@/components/mobile-assets-variants";

export const metadata: Metadata = {
  title: "Mobile equipment and asset tasks design review — Simpnify",
  description:
    "Compare My Equipment, Field Asset Tasks, and Field Assistant with a SOTI flow for a shared phone: badge kit, asset label, and a clear logout.",
  robots: { index: false, follow: false },
};

function PreviewFrame({
  id,
  lane,
  title,
  tagline,
  scene,
  soti,
  pros,
  cons,
}: {
  id: MobileAssetsVariantId;
  lane: "ours" | "soti";
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
          <span className="font-semibold text-white">
            {lane === "ours" ? "Our design. " : "SOTI suggestion. "}
          </span>
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
        <div
          data-shot
          className="mx-auto flex w-fit max-w-full flex-wrap items-start justify-center gap-8"
        >
          <MobileAssetsVariant id={id} />
        </div>
      </div>
    </section>
  );
}

export default function MobileAssetsPhotosPage() {
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
            Our design, then the SOTI flow
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-platform-muted">
            Read top to bottom. A is our screens, the ones in your screenshots.
            They stay as the reference. B, C, D, and E are one{" "}
            <a href="https://soti.net/" className="text-secondary hover:underline">
              SOTI
            </a>{" "}
            story for the same phone: a kit from the badge, a label on the
            asset, then a clear phone.
          </p>
          <ol className="mt-4 max-w-3xl space-y-2 text-sm leading-6 text-platform-muted">
            <li>
              <span className="font-semibold text-white">A.</span> Our design.
              My Equipment, Field Asset Tasks, and Field Assistant.
            </li>
            <li>
              <span className="font-semibold text-white">B.</span> The badge
              opens this kit. Radio, keys, and a torch. Not the device fleet.
            </li>
            <li>
              <span className="font-semibold text-white">C.</span> Inspect Pump
              4. Hold the phone to the label. The work log stays in Simpnify.
            </li>
            <li>
              <span className="font-semibold text-white">D.</span> The label
              confirms Pump 4. A green check starts the evidence log.
            </li>
            <li>
              <span className="font-semibold text-white">E.</span> The last
              Field Assistant search is still here. Clear this phone. The next
              badge starts empty.
            </li>
          </ol>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#0a1218] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Worth taking
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-platform-muted">
                <li>Lockdown, so the phone stays on Simpnify</li>
                <li>An NFC badge, so the kit is this officer</li>
                <li>A label scan that proves the asset</li>
                <li>Help that sends the asset name, not the screen</li>
                <li>Logout that clears the kit, the task, and the search</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0a1218] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
                Left with SOTI
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-platform-muted">
                <li>Fleet enrollment and the device inventory</li>
                <li>OS updates and printers</li>
                <li>Remote Control and drawing on the screen</li>
                <li>Snap’s form builder for the work log</li>
                <li>Geofences that install apps</li>
              </ul>
            </div>
          </div>

          <nav
            aria-label="Mobile assets variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {mobileAssetsVariants.map(({ id, title }) => (
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
          {mobileAssetsVariants
            .filter((variant) => variant.lane === "ours")
            .map((variant) => (
              <PreviewFrame key={variant.id} {...variant} />
            ))}

          <div className="rounded-2xl border border-secondary/30 bg-secondary/10 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              SOTI suggested flow
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#d5ecec]">
              Read B, then C, then D, then E. B fills My Equipment from the
              badge. C is the label on Pump 4. D is the green check. E clears
              the kit, the task, and the Field Assistant
              search.
            </p>
          </div>

          {mobileAssetsVariants
            .filter((variant) => variant.lane === "soti")
            .map((variant) => (
              <PreviewFrame key={variant.id} {...variant} />
            ))}

          <div className="rounded-2xl border border-white/10 bg-[#0a1218] px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Compare
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold text-white">A — Our design</p>
                <p className="mt-2 text-sm leading-6 text-platform-muted">
                  Browser pages. No kit, no task, no completed work. Field
                  Assistant searches approved sources.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">B through E</p>
                <p className="mt-2 text-sm leading-6 text-platform-muted">
                  The badge owns the kit. The label proves Pump 4. The search
                  leaves with the officer. The screen stays on the phone.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/mobile-assets
          </code>
          . Production chrome is hidden on this route. Nothing here replaces the
          live app until you pick a letter.{" "}
          <Link href="/photos" className="text-secondary hover:underline">
            Other reviews
          </Link>
        </p>
      </div>
    </main>
  );
}
