import type { Metadata } from "next";
import Link from "next/link";

import {
  MobileAuthVariant,
  mobileAuthVariants,
  type MobileAuthVariantId,
} from "@/components/mobile-auth-variants";

export const metadata: Metadata = {
  title: "Mobile auth design review — Simpnify",
  description:
    "Compare the web session lock, the native Simpnify screens, and SOTI behaviours that fit a shared handphone.",
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
  id: MobileAuthVariantId;
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
        <div data-shot className="mx-auto flex w-fit max-w-full flex-wrap items-start justify-center gap-8">
          <MobileAuthVariant id={id} />
        </div>
      </div>
    </section>
  );
}

export default function MobileAuthPhotosPage() {
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
            One story. This account is already signed in on another phone.
            Letters jump to the screen below.
          </p>
          <div className="mt-5 rounded-2xl border border-white/10 bg-[#0a1218] p-4">
            <a href="#web-lock" className="block rounded-xl border border-white/10 bg-white/5 px-3 py-3 hover:border-secondary/40">
              <span className="text-sm font-semibold text-white">A · Active session detected</span>
              <span className="mt-1 block text-sm leading-5 text-platform-muted">Our screen. Two buttons.</span>
            </a>
            <p className="py-2 text-center text-xs text-platform-subtle">splits</p>
            <div className="grid gap-3 md:grid-cols-2">
              <a href="#continue-here" className="rounded-xl border border-[#22a85a]/30 bg-[#22a85a]/10 px-3 py-3 hover:border-[#22a85a]/60">
                <span className="block text-xs font-semibold text-[#7ddea8]">Continue</span>
                <span className="mt-1 block text-sm font-semibold text-white">F · This phone keeps it</span>
                <span className="mt-1 block text-xs leading-5 text-platform-muted">The other phone is signed out.</span>
              </a>
              <div className="space-y-2">
                <a href="#keep-other" className="block rounded-xl border border-[#f6c445]/30 bg-[#f6c445]/10 px-3 py-3 hover:border-[#f6c445]/60">
                  <span className="block text-xs font-semibold text-[#f6c445]">Cancel</span>
                  <span className="mt-1 block text-sm font-semibold text-white">G · Welcome back</span>
                  <span className="mt-1 block text-xs leading-5 text-platform-muted">The other phone stays signed in.</span>
                </a>
                <p className="text-center text-xs text-platform-subtle">same sign-in, then the badge</p>
                <a href="#native-lock" className="block rounded-xl border border-white/10 bg-white/5 px-3 py-3 hover:border-secondary/40">
                  <span className="text-sm font-semibold text-white">B · Welcome back</span>
                  <span className="mt-1 block text-sm leading-5 text-platform-muted">Tap your badge here sits under Sign in.</span>
                </a>
                <p className="text-center text-xs text-platform-subtle">then</p>
                <a href="#badge-sso" className="block rounded-xl border border-white/10 bg-white/5 px-3 py-3 hover:border-secondary/40">
                  <span className="text-sm font-semibold text-white">C · Tap the badge</span>
                  <span className="mt-1 block text-sm leading-5 text-platform-muted">Accepted, or not recognised.</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#0a1218] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Worth taking
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-platform-muted">
                <li>Lockdown with SSO, so the phone opens without a typed password</li>
                <li>NFC badge login for a shared device</li>
                <li>Logout that clears the handphone before the next officer</li>
                <li>Admin help when the device itself is stuck</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0a1218] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
                Left with SOTI
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-platform-muted">
                <li>Fleet enrollment, OS updates, and printer management</li>
                <li>Remote viewing of the officer’s screen</li>
                <li>Snap form builder — guidance and reports already cover that</li>
                <li>Geofences that install or remove apps</li>
              </ul>
            </div>
          </div>

          <nav
            aria-label="Mobile auth variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {mobileAuthVariants.map(({ id, title }) => (
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
          {mobileAuthVariants
            .filter((variant) => variant.lane === "ours")
            .map((variant) => (
              <PreviewFrame key={variant.id} {...variant} />
            ))}

          <div className="rounded-2xl border border-secondary/30 bg-secondary/10 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              SOTI suggested flow
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#d5ecec]">
              SOTI keeps one signed-in phone. F is Continue: the other phone is
              signed out and this phone takes inbox, live location, and SOS. G is
              Cancel: the other phone stays signed in, and this phone goes back
              to Welcome back. B is that sign-in page. C is the badge.
            </p>
          </div>

          {mobileAuthVariants
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
                  Browser page. Active session detected. Continue on this
                  device, or cancel and keep the other session.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  F, G, then B, C
                </p>
                <p className="mt-2 text-sm leading-6 text-platform-muted">
                  F is Continue. G is Cancel, and the next screen is Welcome
                  back. B is that page. C is the badge.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/mobile-auth
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
