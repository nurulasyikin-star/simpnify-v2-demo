import type { Metadata } from "next";
import Link from "next/link";

import {
  MobileInboxVariant,
  mobileInboxVariants,
  type MobileInboxVariantId,
} from "@/components/mobile-inbox-variants";

export const metadata: Metadata = {
  title: "Mobile inbox design review — Simpnify",
  description:
    "Compare the Mobile Supervisor send screen with a SOTI flow: the message arrives in the inbox, the officer answers, it can wait for signal, and end of shift clears it.",
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
  id: MobileInboxVariantId;
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
          <MobileInboxVariant id={id} />
        </div>
      </div>
    </section>
  );
}

export default function MobileInboxPhotosPage() {
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
            <a
              href="https://soti.net/mc/help/v2024.1/en/console/devices/managing/actions/sending_messages.html"
              className="text-secondary hover:underline"
            >
              SOTI Send Message
            </a>{" "}
            story for the officer holding the phone: the message opens in the
            inbox, the officer answers, it can wait for signal, and end of
            shift clears it.
          </p>
          <ol className="mt-4 max-w-3xl space-y-2 text-sm leading-6 text-platform-muted">
            <li>
              <span className="font-semibold text-white">A.</span> Our design.
              Mobile Supervisor. Send to Mobile inbox.
            </li>
            <li>
              <span className="font-semibold text-white">B.</span> The selected
              message is in Inbox on this phone.
            </li>
            <li>
              <span className="font-semibold text-white">C.</span> The officer
              marks it read, or answers no.
            </li>
            <li>
              <span className="font-semibold text-white">D.</span> The phone was
              out of signal. The message waited, then arrived.
            </li>
            <li>
              <span className="font-semibold text-white">E.</span> End shift
              clears the inbox. The next badge starts clean.
            </li>
          </ol>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#0a1218] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                Worth taking
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-platform-muted">
                <li>The message opens in the app inbox</li>
                <li>A read receipt, or a yes and no</li>
                <li>A message can wait until the phone has signal</li>
                <li>End shift clears the inbox on a shared phone</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#0a1218] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
                Left with SOTI
              </p>
              <ul className="mt-2 space-y-1 text-sm leading-6 text-platform-muted">
                <li>The console list of devices and the Send Message action</li>
                <li>SMS and the phone&apos;s notification tray</li>
                <li>Scripts</li>
                <li>Remote view of the screen</li>
              </ul>
            </div>
          </div>

          <nav aria-label="Mobile inbox variant jump links" className="mt-6 flex flex-wrap gap-2">
            {mobileInboxVariants.map(({ id, title }) => (
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
          {mobileInboxVariants
            .filter((variant) => variant.lane === "ours")
            .map((variant) => (
              <PreviewFrame key={variant.id} {...variant} />
            ))}

          <div className="rounded-2xl border border-secondary/30 bg-secondary/10 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              SOTI suggested flow
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[#d5ecec]">
              Read B, then C, then D, then E. B is the inbox. C is the green
              receipt or the yellow no. D is the same message after a dead
              spot. E clears it for the next badge.
            </p>
          </div>

          {mobileInboxVariants
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
                  Browser page. The supervisor picks a phone, writes an
                  operational message, and sends it to that phone&apos;s inbox.
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">B through E</p>
                <p className="mt-2 text-sm leading-6 text-platform-muted">
                  The officer reads it in Inbox, answers, and can still receive
                  it after a dead spot. End shift clears the message. The
                  supervisor sees the answer, not the screen.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/mobile-inbox
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
