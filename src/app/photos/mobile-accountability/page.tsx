import type { Metadata } from "next";
import Link from "next/link";

import {
  MobileAccountabilityVariant,
  mobileAccountabilityVariants,
  type MobileAccountabilityVariantId,
} from "@/components/mobile-accountability-variants";

export const metadata: Metadata = {
  title: "Mobile emergency accountability design review — Simpnify",
  description:
    "Compare the browser Emergency accountability screens with a SOTI flow for a shared phone: badge sets the role, lockdown, device health, and a clear logout.",
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
  id: MobileAccountabilityVariantId;
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
          <MobileAccountabilityVariant id={id} />
        </div>
      </div>
    </section>
  );
}

export default function MobileAccountabilityPhotosPage() {
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
            Read top to bottom. A is our screen, the one in your screenshot. It
            stays as the reference. B, C, D, and E are one{" "}
            <a href="https://soti.net/" className="text-secondary hover:underline">
              SOTI
            </a>{" "}
            story for the same moment: a shared phone during an evacuation.
          </p>
          <ol className="mt-4 max-w-3xl space-y-2 text-sm leading-6 text-platform-muted">
            <li>
              <span className="font-semibold text-white">A.</span> Our design.
              Emergency accountability in the phone browser, View as a picker.
            </li>
            <li>
              <span className="font-semibold text-white">B.</span> The shared
              phone stays on Simpnify. The officer taps their badge. View
              becomes Incident Commander.
            </li>
            <li>
              <span className="font-semibold text-white">C.</span> The
              evacuation stays on Simpnify. Declare evacuation, then this phone
              stays here.
            </li>
            <li>
              <span className="font-semibold text-white">D.</span> The phone is
              fit, then the signal drops. Observations stay on the phone. The
              console sees the device, not the names.
            </li>
            <li>
              <span className="font-semibold text-white">E.</span> Press Clear
              this phone, then confirm. The phone returns to the waiting screen
              for the next badge.
            </li>
          </ol>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#0a1218] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Worth taking
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-platform-muted">
                <li>NFC badge login, so View is not a list anyone can open</li>
                <li>Lockdown, so the phone stays on Simpnify</li>
                <li>Logout that clears the incident before the next officer</li>
                <li>Help when the phone is stuck, without viewing the screen</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0a1218] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
                Left with SOTI
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-platform-muted">
                <li>Snap form builder for Declare evacuation</li>
                <li>XSight Incident Management as people accounting</li>
                <li>Remote viewing of the officer’s screen</li>
                <li>Fleet enrollment, OS updates, printers, and geofences</li>
              </ul>
            </div>
          </div>

          <nav
            aria-label="Mobile accountability variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {mobileAccountabilityVariants.map(({ id, title }) => (
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
          {mobileAccountabilityVariants
            .filter((variant) => variant.lane === "ours")
            .map((variant) => (
              <PreviewFrame key={variant.id} {...variant} />
            ))}

          <div className="rounded-2xl border border-secondary/30 bg-secondary/10 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              SOTI suggested flow
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#d5ecec]">
              Read B, then C, then D, then E. The badge tap sets Incident
              Commander. If the badge loses connection, the app signs out and
              the phone returns to B. C is the open evacuation. D is the stuck
              phone. E clears the phone.
            </p>
          </div>

          {mobileAccountabilityVariants
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
                  Browser pages. Emergency accountability, then a View list for
                  Incident Commander or Logistic Manager.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  B to E — After the badge
                </p>
                <p className="mt-2 text-sm leading-6 text-platform-muted">
                  The role comes from the badge. The evacuation stays on
                  Simpnify. When the signal drops, the names stay on the phone.
                  E says the phone is clear.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/mobile-accountability
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
