import type { Metadata } from "next";
import Link from "next/link";

import {
  MobileHandoverVariant,
  mobileHandoverVariants,
  type MobileHandoverVariantId,
} from "@/components/mobile-handover-variants";

export const metadata: Metadata = {
  title: "Mobile Shift Handover design review — Simpnify",
  description:
    "Compare the web Shift Handover form with a SOTI flow for a shared phone: lockdown, the next badge, a note that stays offline, and a clear logout.",
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
  id: MobileHandoverVariantId;
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
          <MobileHandoverVariant id={id} />
        </div>
      </div>
    </section>
  );
}

export default function MobileHandoverPhotosPage() {
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
            Read top to bottom. A is our screen, Shift Handover from your
            screenshot. B, C, D, and E are one{" "}
            <a href="https://soti.net/" className="text-secondary hover:underline">
              SOTI
            </a>{" "}
            story: a shared phone at the end of a shift. Pick a letter when you
            are ready.
          </p>
          <ol className="mt-4 max-w-3xl space-y-2 text-sm leading-6 text-platform-muted">
            <li>
              <span className="font-semibold text-white">A.</span> Our design.
              The form, the recipient list, and the browser warning on an empty
              note.
            </li>
            <li>
              <span className="font-semibold text-white">B.</span> The handover
              stays on Simpnify. The recipient is the next badge.
            </li>
            <li>
              <span className="font-semibold text-white">C.</span> An empty note
              asks to be written. Then the note is on the form.
            </li>
            <li>
              <span className="font-semibold text-white">D.</span> The phone is
              fit, then the signal drops. The note stays on the phone. The
              console sees the phone, not the note.
            </li>
            <li>
              <span className="font-semibold text-white">E.</span> Confirm, clear
              this phone, then the next badge opens the note. A badge that
              misses stays on the tap screen.
            </li>
          </ol>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#0a1218] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Worth taking
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-platform-muted">
                <li>Lockdown, so Shift Handover stays on Simpnify</li>
                <li>A badge, so the next officer is the recipient</li>
                <li>Logout that clears the phone after the note is sent</li>
                <li>Help when the phone is stuck, without viewing the note</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0a1218] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
                Left with SOTI
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-platform-muted">
                <li>Fleet enrollment, OS updates, and printer management</li>
                <li>Remote viewing of the officer’s screen</li>
                <li>Snap form builder for the handover note</li>
                <li>Geofences that install or remove apps</li>
              </ul>
            </div>
          </div>

          <nav
            aria-label="Shift handover variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {mobileHandoverVariants.map(({ id, title }) => (
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
          {mobileHandoverVariants
            .filter((variant) => variant.lane === "ours")
            .map((variant) => (
              <PreviewFrame key={variant.id} {...variant} />
            ))}

          <div className="rounded-2xl border border-secondary/30 bg-secondary/10 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              SOTI suggested flow
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#d5ecec]">
              Read B, then C, then D, then E. The handover stays on Simpnify.
              The next badge is the recipient. An empty note asks to be written.
              If the signal drops, the note stays on the phone. E sends it and
              clears this phone.
            </p>
          </div>

          {mobileHandoverVariants
            .filter((variant) => variant.lane === "soti")
            .map((variant) => (
              <PreviewFrame key={variant.id} {...variant} />
            ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/mobile-handover
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
