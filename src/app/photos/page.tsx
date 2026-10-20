import type { Metadata } from "next";

import {
  FooterVariant,
  footerVariants,
  type FooterVariantId,
} from "@/components/footer-variants";

export const metadata: Metadata = {
  title: "Footer design review — Simpnify",
  description: "Compare footer layout options before picking one for production.",
  robots: { index: false, follow: false },
};

function PreviewFrame({
  id,
  title,
  tagline,
  pros,
  cons,
}: {
  id: FooterVariantId;
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

      <div className="flex flex-col">
        <div className="flex min-h-[220px] flex-col justify-end bg-[var(--platform-surface)] px-6 pb-0 pt-10 md:px-8">
          <div className="mx-auto w-full max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-platform-subtle">
              Sample page ending
            </p>
            <p className="mt-3 text-2xl font-semibold text-white">
              Ready to see it in your environment?
            </p>
            <p className="mt-2 text-sm text-platform-muted">
              Placeholder CTA block — shows how the footer closes a typical
              marketing page.
            </p>
            <div className="mt-6 flex justify-center gap-3 pb-10">
              <span className="rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-[#071318]">
                Contact us
              </span>
              <span className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white">
                View demos
              </span>
            </div>
          </div>
        </div>

        <FooterVariant id={id} />
      </div>
    </section>
  );
}

export default function PhotosPage() {
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
            Footer options
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-platform-muted">
            Five layouts to compare. Variant A is what ships today. Scroll each
            preview — the sample page ending plus footer shows how it feels at
            the bottom of a real page. Pick a letter (A–E) or variant id when
            you&apos;re ready.
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            Responder SOS black background — globe GIF or a quieter motion
            field? Open{" "}
            <a href="/photos/sos-bg" className="font-semibold underline">
              /photos/sos-bg
            </a>
            .
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            Perimeter intrusion frame while the video isn&apos;t filmed yet
            (coming-soon options)? Open{" "}
            <a href="/photos/perimeter-placeholder" className="font-semibold underline">
              /photos/perimeter-placeholder
            </a>
            .
          </p>

          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            Mobile profile, settings, and auto-lock screens? Open{" "}
            <a href="/photos/mobile-settings" className="font-semibold underline">
              /photos/mobile-settings
            </a>
            .
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            Mobile story screens (one shift, C + D combined, with the console view)? Open{" "}
            <a href="/photos/mobile-story" className="font-semibold underline">
              /photos/mobile-story
            </a>
            .
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            Mobile modules (Today, Location, Guidance, Briefings)? Open{" "}
            <a href="/photos/mobile-modules" className="font-semibold underline">
              /photos/mobile-modules
            </a>
            .
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            Mobile Work module — Work list and Emergency accountability, then
            the SOTI flow (lockdown, locked role, stuck phone, clear logout)?
            Open{" "}
            <a href="/photos/mobile-work" className="font-semibold underline">
              /photos/mobile-work
            </a>
            .
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            Mobile session — our active-session screen, then the SOTI flow
            (phone stays on the app, badge, same choice, confirmation)? Open{" "}
            <a href="/photos/mobile-auth" className="font-semibold underline">
              /photos/mobile-auth
            </a>
            .
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            Mobile live location — our browser Today and My Live Location, then
            the SOTI flow (phone stays on the app, badge, same fix, clear
            logout)? Open{" "}
            <a href="/photos/mobile-location" className="font-semibold underline">
              /photos/mobile-location
            </a>
            .
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            Mobile Guidance — our You are clear screen, then the SOTI flow (a
            nearby offer, the post tag, and help that sends the step and the
            place)? Open{" "}
            <a href="/photos/mobile-guidance" className="font-semibold underline">
              /photos/mobile-guidance
            </a>
            .
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            Mobile inbox — our Mobile Supervisor send screen, then the SOTI flow
            (the message opens in Inbox, the officer answers, it can wait for
            signal, and end of shift clears it)? Open{" "}
            <a href="/photos/mobile-inbox" className="font-semibold underline">
              /photos/mobile-inbox
            </a>
            .
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            Mobile emergency accountability — our browser form and View picker,
            then the SOTI flow (badge sets the role, lockdown, stuck phone,
            clear logout)? Open{" "}
            <a
              href="/photos/mobile-accountability"
              className="font-semibold underline"
            >
              /photos/mobile-accountability
            </a>
            .
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            Mobile Shift Handover — our browser form and recipient list, then
            the SOTI flow (next badge, write the note, note stays offline, clear
            this phone)? Open{" "}
            <a href="/photos/mobile-handover" className="font-semibold underline">
              /photos/mobile-handover
            </a>
            .
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            Mobile lone-worker safety — our browser watch and interval, then
            the SOTI flow (badge opens the watch, lockdown, late phone, clear
            logout)? Open{" "}
            <a href="/photos/mobile-safety" className="font-semibold underline">
              /photos/mobile-safety
            </a>
            .
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            Mobile equipment — our My Equipment, Field Asset Tasks, and Field
            Assistant, then the SOTI flow (badge kit, asset label, clear
            phone)? Open{" "}
            <a href="/photos/mobile-assets" className="font-semibold underline">
              /photos/mobile-assets
            </a>
            .
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            SOTI mobile report and phone images for William? Open{" "}
            <a href="/photos/soti-mobile" className="font-semibold underline">
              /photos/soti-mobile
            </a>
            .
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            &ldquo;Are you ready?&rdquo; section with office contacts folded in? Open{" "}
            <a href="/photos/contact-cta" className="font-semibold underline">
              /photos/contact-cta
            </a>
            .
          </p>
          <p className="mt-4 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
            Looking for the v2 content review (drop v1, PDF copy, Map / AURA /
            GIS / floor plan / mobile / use cases)? Open{" "}
            <a href="/photos/v2-content" className="font-semibold underline">
              /photos/v2-content
            </a>
            .
          </p>

          <nav
            aria-label="Footer variant jump links"
            className="mt-6 flex flex-wrap gap-2"
          >
            {footerVariants.map(({ id, title }) => (
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
          {footerVariants.map((variant) => (
            <PreviewFrame key={variant.id} {...variant} />
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open this page at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos
          </code>{" "}
          any time to revisit. Production footer is hidden here so previews
          aren&apos;t doubled.{" "}
          <a href="/photos/v2-content" className="text-secondary hover:underline">
            v2 content review
          </a>
          {" · "}
          <a href="/photos/demos" className="text-secondary hover:underline">
            Demos step review
          </a>
          {" · "}
          <a href="/photos/demos-visual" className="text-secondary hover:underline">
            Demos images &amp; animation review
          </a>
          {" · "}
          <a href="/photos/use-cases" className="text-secondary hover:underline">
            Use Cases video review
          </a>
          {" · "}
          <a href="/photos/feature-carousel" className="text-secondary hover:underline">
            Walkthrough carousel review
          </a>
          {" · "}
          <a href="/photos/about-pledge" className="text-secondary hover:underline">
            About pledge review
          </a>
          {" · "}
          <a
            href="/photos/platform-redundancy"
            className="text-secondary hover:underline"
          >
            Platform redundancy review
          </a>
          {" · "}
          <a
            href="/photos/platform-challenge"
            className="text-secondary hover:underline"
          >
            Platform challenge (why choose)
          </a>
          {" · "}
          <a
            href="/photos/customer-challenge-video"
            className="text-secondary hover:underline"
          >
            Customer challenge → video
          </a>
          {" · "}
          <a
            href="/photos/platform-story"
            className="text-secondary hover:underline"
          >
            Platform story (Gotham + Help)
          </a>
          {" · "}
          <a
            href="/photos/content-video-hero"
            className="text-secondary hover:underline"
          >
            Content video hero
          </a>
          {" · "}
          <a
            href="/photos/platform-motion"
            className="text-secondary hover:underline"
          >
            Platform motion and pictures
          </a>
        </p>
      </div>
    </main>
  );
}
