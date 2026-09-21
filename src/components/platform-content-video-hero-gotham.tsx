import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { PlatformHeroVideoBg } from "@/components/platform-hero-video-bg";

export type ContentVideoHeroCopy = {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  subhead: string;
  audience: string;
};

function GothamChrome() {
  return (
    <>
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <span className="text-xs font-medium tracking-[0.25em] text-platform-subtle">
          SOFTWARE
        </span>
        <span className="text-sm font-semibold tracking-wide text-white">
          {"{SIMPNIFY}"}
        </span>
        <span className="text-xs font-medium tracking-[0.2em] text-platform-subtle">
          GET STARTED
        </span>
      </div>

      <div
        className="absolute left-6 top-24 z-20 hidden flex-col gap-3 text-sm font-semibold md:flex md:left-10"
        aria-hidden
      >
        <span className="text-white">[A]</span>
        <span className="text-white/25">B</span>
        <span className="text-white/25">C</span>
        <span className="text-white/25">D</span>
      </div>
    </>
  );
}

function GothamBottomDock({
  subhead,
  audience,
  showSubheadInDock,
}: {
  subhead: string;
  audience: string;
  showSubheadInDock?: boolean;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/40 px-6 py-4 backdrop-blur-md md:px-10">
      {showSubheadInDock ? (
        <div className="mx-auto mb-4 max-w-2xl text-center">
          <p className="text-sm leading-6 text-platform-muted md:text-base">
            {subhead}
          </p>
          <p className="mt-2 text-xs font-medium uppercase tracking-wider text-secondary">
            {audience}
          </p>
        </div>
      ) : null}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded border border-white/15 text-white/80">
            <Menu className="h-4 w-4" aria-hidden />
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded border border-white/15 text-white/80">
            <Search className="h-4 w-4" aria-hidden />
          </span>
        </div>
        <Link
          href="/demos"
          className="rounded border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-secondary hover:text-secondary"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export function PlatformContentVideoHeroGotham({
  copy,
  minimalCinema,
  showProductChrome = false,
  titleAs = "h2",
}: {
  copy: ContentVideoHeroCopy;
  minimalCinema?: boolean;
  /** Mock Palantir-style chrome — review page only (site header hidden there). */
  showProductChrome?: boolean;
  titleAs?: "h1" | "h2";
}) {
  const Title = titleAs;

  return (
    <section className="relative min-h-[min(88vh,820px)] overflow-hidden bg-[var(--platform-surface)]">
      <PlatformHeroVideoBg />
      <div className="absolute inset-0 z-[1] bg-black/35" aria-hidden />
      {showProductChrome ? <GothamChrome /> : null}

      <div
        className={`relative z-10 flex min-h-[min(88vh,820px)] flex-col items-center justify-center px-6 pb-28 text-center md:px-12 ${
          showProductChrome ? "pt-24" : "pt-20"
        }`}
      >
        {!minimalCinema ? (
          <p className="text-xs font-semibold tracking-[0.2em] text-platform-subtle">
            {copy.eyebrow}
          </p>
        ) : null}
        <Title className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
          {copy.headlineLine1}
          <br />
          {copy.headlineLine2}
        </Title>
        {!minimalCinema ? (
          <>
            <p className="mt-6 max-w-2xl text-lg leading-7 text-platform-muted md:text-xl">
              {copy.subhead}
            </p>
            <p className="mt-4 text-sm font-medium uppercase tracking-wider text-secondary">
              {copy.audience}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/demos" className="platform-btn-primary">
                Open product tour
              </Link>
              <Link href="/platform" className="platform-btn-secondary">
                Explore modules
              </Link>
            </div>
          </>
        ) : null}
      </div>

      <GothamBottomDock
        subhead={copy.subhead}
        audience={copy.audience}
        showSubheadInDock={minimalCinema}
      />
    </section>
  );
}
