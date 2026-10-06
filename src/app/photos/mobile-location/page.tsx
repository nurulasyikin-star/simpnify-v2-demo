import type { Metadata } from "next";
import Link from "next/link";

import {
  MobileLocationVariant,
  mobileLocationVariants,
  type MobileLocationVariantId,
} from "@/components/mobile-location-variants";

export const metadata: Metadata = {
  title: "Mobile location design review — Simpnify",
  description:
    "Compare the browser live-location screens with a SOTI flow for a shared phone: lockdown, badge, the same fix, and a clear logout.",
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
  id: MobileLocationVariantId;
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
          <MobileLocationVariant id={id} />
        </div>
      </div>
    </section>
  );
}

export default function MobileLocationPhotosPage() {
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
            stays as the reference. D, F, G, and E are one{" "}
            <a href="https://soti.net/" className="text-secondary hover:underline">
              SOTI
            </a>{" "}
            story for the same moment: a signed-in officer publishing a live
            location from a shared phone.
          </p>
          <ol className="mt-4 max-w-3xl space-y-2 text-sm leading-6 text-platform-muted">
            <li>
              <span className="font-semibold text-white">A.</span> Our design.
              Today and My Live Location, inside the phone browser.
            </li>
            <li>
              <span className="font-semibold text-white">D.</span> The shift is
              open. End shift sits on Today. Right, the signal drops and the
              note stays on the phone.
            </li>
            <li>
              <span className="font-semibold text-white">F.</span> Location.
              Power saving in the zone, drag the pin, then the zone log.
            </li>
            <li>
              <span className="font-semibold text-white">G.</span> Guidance.
              You are clear, then the tag, then the step screen, then that
              same screen under Help requested.
            </li>
            <li>
              <span className="font-semibold text-white">E.</span> Confirm End
              shift on the same Today screen, then the phone is clear.
            </li>
          </ol>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#0a1218] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Worth taking
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-platform-muted">
                <li>Lockdown, so the phone stays on Simpnify</li>
                <li>NFC badge login for the shared phone</li>
                <li>Logout that clears the location before the next officer</li>
                <li>Help when the fix sticks, without viewing the screen</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0a1218] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
                Left with SOTI
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-platform-muted">
                <li>Console maps that locate, track, or store device history</li>
                <li>Geofences that install or remove apps</li>
                <li>Fleet enrollment, OS updates, and printer management</li>
                <li>Remote viewing of the officer’s screen</li>
              </ul>
            </div>
          </div>

          <nav
            aria-label="Mobile location variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {mobileLocationVariants.map(({ id, title }) => (
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
          {mobileLocationVariants
            .filter((variant) => variant.lane === "ours")
            .map((variant) => (
              <PreviewFrame key={variant.id} {...variant} />
            ))}

          <div className="rounded-2xl border border-secondary/30 bg-secondary/10 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              SOTI suggested flow
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#d5ecec]">
              Read D, then F, then G, then E. End shift is on D’s Today
              screen. G shows the step on its own, then the same step under
              the help sheet. E confirms the clear on that Today screen.
            </p>
          </div>

          {mobileLocationVariants
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
                  Browser pages. Today, then My Live Location. The fix publishes
                  about every 10 seconds while this page is open.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">D — The open shift</p>
                <p className="mt-2 text-sm leading-6 text-platform-muted">
                  The open shift. Battery, signal, and sync sit on Today, and
                  the location reads as Gate 2. When the signal drops, the
                  patrol note stays on the phone. SOS needs signal. E says the
                  phone is clear.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/mobile-location
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
