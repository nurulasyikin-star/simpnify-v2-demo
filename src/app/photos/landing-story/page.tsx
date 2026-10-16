import type { Metadata } from "next";

import { LandingGothamScroll } from "@/components/landing-gotham-scroll";

export const metadata: Metadata = {
  title: "Gotham-style landing — design review",
  description:
    "A Simpnify homepage arranged like Palantir Gotham: a gate, full-screen lines, then numbered product scenes, using Simpnify content.",
  robots: { index: false, follow: false },
};

export default function LandingStoryReviewPage() {
  return (
    <main id="main-content" className="flex-1 bg-black pb-16 pt-8">
      <header className="mx-auto mb-8 max-w-3xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          Design review
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white">
          Homepage, in the Gotham scroll
        </h1>
        <p className="mt-3 text-sm leading-7 text-platform-muted">
          Rearranged to follow{" "}
          <a
            href="https://www.palantir.com/platforms/gotham/"
            className="text-secondary hover:underline"
          >
            Palantir Gotham
          </a>
          : an entering screen, full-screen lines over film, the company
          figures and title, then numbered scenes. The words and pictures are
          Simpnify — cameras into the console, an enlarged dashboard, Digital
          Twins, Aura, floor plan, mobile response, and SOS, perimeter, and
          fire.
        </p>
        <p className="mt-3 text-sm leading-7 text-platform-muted">
          <a href="/our-platform" className="text-secondary hover:underline">
            /our-platform
          </a>{" "}
          is unchanged until you say to ship this.
        </p>
      </header>
      <LandingGothamScroll />
    </main>
  );
}
