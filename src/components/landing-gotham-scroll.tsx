"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { EMAIL, OFFICES, toTelHref } from "@/components/contact-offices";
import { PerimeterLiveAlert } from "@/components/perimeter-live-alert";
import { PlatformImage } from "@/components/platform-image";
import {
  COMPANY_STATS_BAND_SURFACE_CLASS,
  PlatformStatBar,
} from "@/components/platform/stat-bar";
import { PlatformIntroAnimatedHeadline } from "@/components/platform-intro-animated-headline";
import { primaryNav } from "@/config/site-nav";
import { COMPANY_STATS, PLATFORM_INTRO } from "@/lib/platform";
import { AboutPledgeSpotlight } from "@/components/about-pledge-spotlight";
import { publicAsset } from "@/lib/site-path";
import { cn } from "@/lib/utils";

const MEDIA = {
  cameras: publicAsset("/platform/landing-story/cameras-to-console-zoomed.mp4"),
  camerasPoster: publicAsset("/platform/landing-story/cameras-poster.jpg"),
  gis: publicAsset("/platform/landing-story/digital-twins-map.mp4"),
  gisPoster: publicAsset("/platform/landing-story/digital-twins-poster.jpg"),
  floor: publicAsset("/platform/floor-plan/final-floor-plan.mp4"),
  floorPoster: publicAsset("/platform/floor-plan/final-floor-plan-poster.jpg"),
  patrol: publicAsset("/platform/patrol/jb-office-patrol.mp4"),
  patrolPoster: publicAsset("/platform/patrol/jb-office-patrol-poster.jpg"),
  sos: publicAsset("/platform/scenarios/final-SOS.mp4"),
  perimeter: publicAsset("/platform/scenarios/scenario-01-perimeter.webp"),
  fire: publicAsset("/platform/our-platform-site/digital-twin.png"),
  aura: publicAsset("/platform/aura/ai-aura.mp4"),
  auraPoster: publicAsset("/platform/aura/ai-aura-poster.jpg"),
};

/** In-page scroll order → header pill to highlight (matches primaryNav hrefs). */
const SCROLL_NAV_SEGMENTS: { id: string; href: string }[] = [
  { id: "gate", href: "/demos" },
  { id: "scroll-about", href: "/about" },
  { id: "explorer", href: "/demos" },
  { id: "aura", href: "/demos" },
  { id: "scroll-floor", href: "/demos" },
  { id: "scroll-mobile", href: "/demos" },
  { id: "scroll-use-cases", href: "/solutions" },
  { id: "scroll-contact", href: "/contact" },
];

/** Where each pill should scroll on this page. */
const NAV_SCROLL_TARGET: Record<string, string> = {
  "/about": "scroll-about",
  "/demos": "explorer",
  "/solutions": "scroll-use-cases",
  "/contact": "scroll-contact",
};

function pillNavLinkClass(isActive: boolean) {
  return cn(
    "block rounded-full px-3.5 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
    isActive
      ? "bg-gradient-to-b from-[#5ed4e8] to-[#1f7f93] font-semibold text-[#041014] shadow-[0_0_18px_rgba(61,184,207,0.55),inset_0_1px_0_rgba(255,255,255,0.55)]"
      : "text-white/75 hover:bg-white/10 hover:text-white",
  );
}

function mobileNavLinkClass(isActive: boolean) {
  return cn(
    "transition hover:text-secondary focus-visible:text-secondary",
    isActive ? "text-secondary" : "text-white/90",
  );
}

function SectionGap() {
  return <div aria-hidden className="h-[8vh] bg-black" />;
}

function LandingPillHeader({
  visible,
  activeHref,
}: {
  visible: boolean;
  activeHref: string | null;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSegment = (href: string) => {
    const id = NAV_SCROLL_TARGET[href];
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const scrollToTop = () => {
    document.getElementById("gate")?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[var(--platform-surface)]/90 font-sans text-white backdrop-blur-md transition duration-500",
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0",
      )}
      aria-hidden={!visible}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 transition hover:opacity-80"
            aria-label="Simpnify homepage"
          >
            <PlatformImage
              src="/simpnify-mark.png"
              alt=""
              width={54}
              height={54}
              className="h-[54px] w-[54px]"
            />
            <span className="flex flex-col items-end pb-2 leading-none">
              <PlatformImage
                src="/simpnify-wordmark.png"
                alt=""
                width={96}
                height={36}
                className="h-9 w-auto"
              />
              <span className="-mt-1 flex items-center gap-1">
                <span className="text-[12px] font-medium leading-none text-white/80">
                  by
                </span>
                <PlatformImage
                  src="/ventionex-logo.png"
                  alt=""
                  width={58}
                  height={14}
                  className="h-3.5 w-auto mix-blend-screen"
                />
              </span>
            </span>
          </button>

          <nav className="hidden lg:block" aria-label="Global">
            <ul className="flex items-center gap-0.5 rounded-full bg-white/[0.06] p-1 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md">
              {primaryNav.map((item) => {
                const inPage = Boolean(NAV_SCROLL_TARGET[item.href]);
                const isActive = activeHref === item.href;

                return (
                  <li key={item.label}>
                    {inPage ? (
                      <button
                        type="button"
                        onClick={() => scrollToSegment(item.href)}
                        className={pillNavLinkClass(isActive)}
                        aria-current={isActive ? "true" : undefined}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={pillNavLinkClass(isActive)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="landing-mobile-nav"
            onClick={() => setMobileOpen((open) => !open)}
            className="rounded-sm bg-white/10 p-2 text-white transition hover:bg-secondary/20 lg:hidden"
          >
            <span className="sr-only">
              {mobileOpen ? "Close menu" : "Open menu"}
            </span>
            {mobileOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>

        {mobileOpen ? (
          <nav
            id="landing-mobile-nav"
            aria-label="Mobile"
            className="border-t border-white/10 pb-4 lg:hidden"
          >
            <ul className="flex flex-col gap-3 pt-4 text-base">
              {primaryNav.map((item) => {
                const inPage = Boolean(NAV_SCROLL_TARGET[item.href]);
                const isActive = activeHref === item.href;

                return (
                  <li key={item.label}>
                    {inPage ? (
                      <button
                        type="button"
                        onClick={() => scrollToSegment(item.href)}
                        className={cn("block w-full text-left", mobileNavLinkClass(isActive))}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn("block", mobileNavLinkClass(isActive))}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function Frame({
  src,
  video,
  position = "center",
  poster,
}: {
  src: string;
  video?: boolean;
  position?: "center" | "top";
  poster?: string;
}) {
  const sentinelRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || !video) return;
    const node = videoRef.current;
    if (!node) return;
    const play = node.play();
    if (play) play.catch(() => {});
  }, [shouldLoad, video]);

  const fit =
    position === "top"
      ? "object-cover object-top"
      : "object-cover object-center";

  return (
    <>
      <span
        ref={sentinelRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
      />
      {shouldLoad && video ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 h-full w-full ${fit}`}
        />
      ) : null}
      {shouldLoad && !video ? (
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full ${fit}`}
        />
      ) : null}
    </>
  );
}

function ScrollReveal({
  id,
  src,
  video,
  poster,
}: {
  id: string;
  src: string;
  video?: boolean;
  poster?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const start = vh * 0.6;
      const end = -(rect.height - vh) * 0.8;
      const t = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, t)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const eased = progress * progress * (3 - 2 * progress);
  const lerp = (from: number, to: number) => from + (to - from) * eased;
  const insetY = lerp(30, 0);
  const insetX = lerp(32, 0);
  const radius = lerp(18, 0);

  return (
    <section id={id} ref={sectionRef} className="relative h-[240vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          className="absolute inset-0 will-change-[clip-path]"
          style={{
            clipPath: `inset(${insetY}% ${insetX}% round ${radius}px)`,
          }}
        >
          <Frame src={src} video={video} poster={poster} />
        </div>
      </div>
    </section>
  );
}

function AuraReveal({
  id,
  title,
  src,
  poster,
}: {
  id: string;
  title: string;
  src: string;
  poster?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(vh, rect.height - vh);
      const scrolled = Math.min(travel, Math.max(0, -rect.top));
      setProgress(scrolled / travel);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const eased = progress * progress * (3 - 2 * progress);
  const lerp = (from: number, to: number) => from + (to - from) * eased;
  const halfW = lerp(18, 50);
  const top = lerp(40, 0);
  const bottom = lerp(118, 100);
  const skew = lerp(16, 0);
  const left = 50 - halfW;
  const right = 50 + halfW;
  const polygon = `polygon(${left + skew}% ${top}%, ${right + skew}% ${top}%, ${right - skew}% ${bottom}%, ${left - skew}% ${bottom}%)`;
  return (
    <section id={id} ref={sectionRef} className="relative h-[280vh] bg-black">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <PlatformIntroAnimatedHeadline
          unstyled
          text={title}
          className="shrink-0 px-6 pb-6 pt-20 text-[clamp(2.4rem,5.5vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.03em] md:px-16 md:pb-8 md:pt-24"
        />
        <div className="relative min-h-0 flex-1">
          <div
            className="absolute inset-0 bg-[#071014] will-change-[clip-path]"
            style={{ clipPath: polygon }}
          >
            <Frame src={src} video poster={poster} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HexReveal({
  id,
  title,
  src,
  poster,
}: {
  id: string;
  title: string;
  src: string;
  poster?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const box = frameRef.current;
      if (!section || !box) return;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(vh, rect.height - vh);
      const scrolled = Math.min(travel, Math.max(0, -rect.top));
      setProgress(reduced ? 1 : scrolled / travel);
      setSize({ w: box.clientWidth, h: box.clientHeight });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const eased = progress * progress * (3 - 2 * progress);
  const cx = size.w / 2;
  const cy = size.h / 2;
  const startScale = 0.65;
  const scale = startScale + (1 - startScale) * eased;
  const halfW = cx * scale;
  const halfH = cy * scale;
  const points = [
    [cx - halfW, cy - halfH],
    [cx + halfW, cy - halfH],
    [cx + halfW, cy + halfH],
    [cx - halfW, cy + halfH],
  ] as const;
  const clip = size.w
    ? `polygon(${points.map(([x, y]) => `${x}px ${y}px`).join(", ")})`
    : `inset(${((1 - startScale) / 2) * 100}%)`;
  const outlineOpacity = Math.max(0, 1 - eased * 1.4);

  return (
    <section id={id} ref={sectionRef} className="relative h-[280vh] bg-black">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <h2 className="shrink-0 whitespace-pre-line px-6 pb-6 pt-20 text-[clamp(2.4rem,5.5vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.03em] text-white md:px-16 md:pb-8 md:pt-24">
          {title}
        </h2>
        <div ref={frameRef} className="relative min-h-0 flex-1">
        <div
          className="absolute inset-0 bg-[#071014] will-change-[clip-path]"
          style={{ clipPath: clip }}
        >
          <Frame src={src} video poster={poster} />
        </div>
        </div>
      </div>
    </section>
  );
}

function OpsSplit({
  id,
  title,
  src,
  video,
  standIn,
  flip,
  children,
}: {
  id?: string;
  title: string;
  src?: string;
  video?: boolean;
  standIn?: boolean;
  flip?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 bg-black px-6 py-16 md:px-16 md:py-24 lg:px-24"
    >
      <div
        className={`mx-auto grid max-w-[1440px] items-center gap-8 lg:gap-16 ${
          flip
            ? "lg:grid-cols-[minmax(0,1.3fr)_minmax(240px,0.7fr)]"
            : "lg:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.3fr)]"
        }`}
      >
        <PlatformIntroAnimatedHeadline
          unstyled
          text={title}
          className={`text-[clamp(3.25rem,6.5vw,5.75rem)] font-semibold leading-[0.9] tracking-[-0.04em] ${
            flip ? "lg:order-2" : ""
          }`}
        />
        <div className="relative aspect-video overflow-hidden rounded-[10px] bg-[#0b0b0b] shadow-[0_0_28px_rgba(61,184,207,0.45),0_12px_40px_rgba(0,0,0,0.6)]">
          {children ?? (src ? <Frame src={src} video={video} /> : null)}
          {standIn ? (
            <span className="absolute left-3 top-3 text-[10px] font-medium tracking-[0.16em] text-white/80">
              STAND-IN STILL
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function GateHero({ children }: { children?: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const video = videoRef.current;
    if (!video || !reduced) return;
    video.pause();
    const holdLastFrame = () => {
      if (Number.isFinite(video.duration)) {
        video.currentTime = Math.max(0, video.duration - 0.05);
      }
    };
    if (video.readyState >= 1) holdLastFrame();
    else video.addEventListener("loadedmetadata", holdLastFrame, { once: true });
    return () => video.removeEventListener("loadedmetadata", holdLastFrame);
  }, []);

  return (
    <div className="relative isolate bg-black">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <video
            ref={videoRef}
            src={MEDIA.cameras}
            poster={MEDIA.camerasPoster}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />
        </div>
      </div>

      <section id="gate" className="relative z-10 min-h-screen">
        <div className="flex min-h-screen flex-col justify-end px-6 pb-8 pt-24 md:px-12 md:pb-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "You are\nnow\nentering",
              "Scroll\nto explore",
              "The operating\nlayer for site\ndecisions",
              "© 2026\nSimpnify\nSdn Bhd",
            ].map((line) => (
              <p
                key={line}
                className="whitespace-pre-line border-l border-white/45 pl-4 text-[11px] font-medium uppercase leading-5 tracking-[0.16em] text-white/85"
              >
                {line}
              </p>
            ))}
          </div>
          <div className="ml-auto mt-8 flex w-fit flex-col items-start">
            <h2 className="text-[clamp(4.5rem,16vw,11rem)] font-medium leading-none tracking-[-0.045em] text-white">
              Simpnify
            </h2>
            <p className="mt-2 text-sm tracking-[0.28em] text-white/60">
              by Ventionex
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function LandingGothamScroll() {
  const [showSiteNav, setShowSiteNav] = useState(false);
  const [activeNavHref, setActiveNavHref] = useState<string | null>(null);
  useEffect(() => {
    const syncScrollState = () => {
      const gate = document.getElementById("gate");
      if (gate) {
        const bottom = gate.getBoundingClientRect().bottom;
        setShowSiteNav(bottom < window.innerHeight * 0.42);
      }

      const marker = window.scrollY + window.innerHeight * 0.38;
      let href: string | null = null;
      for (const segment of SCROLL_NAV_SEGMENTS) {
        const el = document.getElementById(segment.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) href = segment.href;
      }
      setActiveNavHref(href);
    };

    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("resize", syncScrollState);
    return () => {
      window.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("resize", syncScrollState);
    };
  }, []);

  return (
    <div className="relative bg-black text-white">
      <LandingPillHeader visible={showSiteNav} activeHref={activeNavHref} />

      <GateHero>
        <section
          id="scroll-about"
          className="relative scroll-mt-0 border-t border-white/10 bg-gradient-to-b from-black/30 via-black/70 to-black px-6 pb-4 pt-12 md:px-16 md:pb-6 md:pt-16"
        >
          <PlatformStatBar
            stats={COMPANY_STATS}
            className={COMPANY_STATS_BAND_SURFACE_CLASS}
          />
          <div className="mx-auto mt-20 max-w-6xl md:mt-32">
            <PlatformIntroAnimatedHeadline text={PLATFORM_INTRO.title} />
            <div className="mt-24 md:mt-36">
              <AboutPledgeSpotlight />
            </div>
          </div>
        </section>
      </GateHero>

      <ScrollReveal
        id="explorer"
        src={MEDIA.gis}
        video
        poster={MEDIA.gisPoster}
      />
      <SectionGap />
      <AuraReveal
        id="aura"
        title={"AI-driven\nsite superiority"}
        src={MEDIA.aura}
        poster={MEDIA.auraPoster}
      />

      <SectionGap />

      <HexReveal
        id="scroll-floor"
        title={"The building\nis the picture"}
        src={MEDIA.floor}
        poster={MEDIA.floorPoster}
      />
      <SectionGap />
      <section
        id="scroll-mobile"
        aria-label="The patrol answers in hand"
        className="scroll-mt-20 border-t border-white/10 bg-black px-6 pb-6 pt-16 md:px-16 md:pb-8 md:pt-24"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-secondary">
          Mobile apps
        </p>
        <PlatformIntroAnimatedHeadline
          unstyled
          text={"The patrol\nanswers in hand"}
          className="mt-4 max-w-5xl text-[clamp(2.6rem,5.5vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.03em]"
        />
        <div className="relative mt-8 aspect-video overflow-hidden rounded-[10px] bg-[#0b0b0b] shadow-[0_0_28px_rgba(61,184,207,0.45),0_12px_40px_rgba(0,0,0,0.6)] md:mt-10">
          <Frame
            src={MEDIA.patrol}
            video
            poster={MEDIA.patrolPoster}
          />
        </div>
      </section>
      <SectionGap />
      <OpsSplit
        id="scroll-use-cases"
        title={"SOS\nin the field"}
        src={MEDIA.sos}
        video
      />
      <OpsSplit title={"Perimeter\nintrusion"} flip>
        <PerimeterLiveAlert />
      </OpsSplit>
      <OpsSplit
        title={"Fire\non the site"}
        src={MEDIA.fire}
        standIn
      />

      <SectionGap />

      <section
        id="scroll-contact"
        className="scroll-mt-20 border-t border-white/10 bg-black px-6 py-14 md:px-16 md:py-20"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {OFFICES.map((office, i) => (
            <div
              key={office.country}
              className={cn(
                "border-b border-white/10 py-8 sm:px-6 lg:border-b-0",
                i === 0 && "lg:pl-0",
                i > 0 && "lg:border-l",
              )}
            >
              <p className="text-[11px] font-medium tracking-[0.22em] text-secondary">
                {office.country.toUpperCase()}
              </p>
              <p className="mt-4 text-sm leading-6 text-white/70">
                {office.address}
              </p>
              <div className="mt-4 space-y-1 text-sm text-white/50">
                {office.phones.map((phone) => (
                  <p key={phone}>
                    Tel.{" "}
                    <a
                      href={toTelHref(phone)}
                      className="text-white hover:text-secondary"
                    >
                      {phone}
                    </a>
                  </p>
                ))}
                {office.fax ? <p>Fax {office.fax}</p> : null}
              </div>
            </div>
          ))}
        </div>

        <a
          href={`mailto:${EMAIL}`}
          className="group flex items-center justify-between border-t border-white/10 pt-6 text-sm"
        >
          <span>
            <span className="font-semibold text-white">General enquiries</span>
            <span className="ml-3 text-secondary">{EMAIL}</span>
          </span>
          <span className="text-secondary transition group-hover:translate-x-1">
            →
          </span>
        </a>
      </section>
    </div>
  );
}
