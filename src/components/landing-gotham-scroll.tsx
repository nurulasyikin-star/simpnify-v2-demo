"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
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
  gis: publicAsset("/platform/landing-story/system-explorer-271026.mp4"),
  gisPoster: publicAsset("/platform/landing-story/system-explorer-271026-poster.jpg"),
  floor: publicAsset("/platform/floor-plan/operator-floor-plan.webm"),
  floorPoster: publicAsset("/platform/floor-plan/operator-floor-plan-poster.jpg"),
  patrol: publicAsset("/platform/patrol/patrol-combined-v2.mp4"),
  patrolPoster: publicAsset("/platform/patrol/patrol-combined-v2-poster.jpg"),
  sos: publicAsset("/platform/scenarios/final-SOS.mp4"),
  perimeter: publicAsset("/platform/scenarios/scenario-01-perimeter.webp"),
  fire: publicAsset("/platform/our-platform-site/digital-twin.png"),
  aura: publicAsset("/platform/aura/ai-aura.mp4"),
  auraPoster: publicAsset("/platform/aura/ai-aura-poster.jpg"),
};

/** De-dithered, 30fps, 1920px remasters of the soft films (tmp/hd-films). */
const MEDIA_HD: Partial<typeof MEDIA> = {
  cameras: publicAsset("/platform/landing-story/cameras-to-console-hd.mp4"),
  camerasPoster: publicAsset("/platform/landing-story/cameras-poster-hd.jpg"),
  gis: publicAsset("/platform/landing-story/system-explorer-271026.mp4"),
  gisPoster: publicAsset("/platform/landing-story/system-explorer-271026-poster.jpg"),
  floor: publicAsset("/platform/floor-plan/operator-floor-plan.webm"),
  floorPoster: publicAsset("/platform/floor-plan/operator-floor-plan-poster.jpg"),
};

/** Encoded width of each clip/still; sized mode never draws past this by much. */
const MEDIA_WIDTH: Record<string, number> = {
  [MEDIA.cameras]: 1024,
  [MEDIA.gis]: 1920,
  [MEDIA.floor]: 1280,
  [MEDIA.patrol]: 1920,
  [MEDIA.sos]: 1920,
  [MEDIA.fire]: 1920,
  [MEDIA.aura]: 1920,
  [MEDIA_HD.cameras!]: 1920,
  [MEDIA_HD.gis!]: 1920,
  [MEDIA_HD.floor!]: 1920,
};

const SIZED_MAX_UPSCALE = 1.15;

export type GothamMode = {
  /** Compositor-only scroll motion, eased; videos pause off screen; no headline drift. */
  smooth?: boolean;
  /** Media capped near its encoded width and letterboxed instead of stretched. */
  sized?: boolean;
  /** Short one-shot reveals instead of tall scroll-scrubbed sections. */
  calm?: boolean;
  /** Use the remastered 1920px / 30fps films instead of the dithered originals. */
  hd?: boolean;
};

const GothamModeContext = createContext<GothamMode>({});

function useMedia() {
  const { hd } = useContext(GothamModeContext);
  return hd ? { ...MEDIA, ...MEDIA_HD } : MEDIA;
}

function easeInOut(t: number) {
  return t * t * (3 - 2 * t);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useScrollProgress(
  sectionRef: RefObject<HTMLElement | null>,
  measure: (section: HTMLElement) => number,
  smooth: boolean | undefined,
  apply: (eased: number) => void,
) {
  const [progress, setProgress] = useState(0);
  const measureRef = useRef(measure);
  const applyRef = useRef(apply);
  measureRef.current = measure;
  applyRef.current = apply;

  useEffect(() => {
    const read = () => {
      const section = sectionRef.current;
      return section ? measureRef.current(section) : 0;
    };

    let raf = 0;

    if (!smooth) {
      const update = () => {
        raf = 0;
        setProgress(read());
      };
      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        cancelAnimationFrame(raf);
      };
    }

    let current = read();
    let target = current;
    let running = false;
    applyRef.current(easeInOut(current));

    const tick = () => {
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.001) {
        current = target;
        running = false;
      }
      applyRef.current(easeInOut(current));
      if (running) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      target = read();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [smooth, sectionRef]);

  return progress;
}

/** Opens on the way in, closes on the way back. One screen tall, so scroll is not held. */
function useReachToggle(
  enabled: boolean,
  sectionRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  paint: (el: HTMLElement, open: boolean) => void,
  transition: string,
) {
  const paintRef = useRef(paint);
  paintRef.current = paint;

  useEffect(() => {
    if (!enabled) return;
    const section = sectionRef.current;
    const el = targetRef.current;
    if (!section || !el) return;

    const reduced = prefersReducedMotion();
    const draw = (open: boolean) => paintRef.current(el, reduced || open);

    type Zone = "before" | "inside" | "after";
    const readZone = (): Zone => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top >= vh) return "before";
      if (rect.bottom <= 0) return "after";
      return "inside";
    };

    let zone = readZone();
    let open = reduced || zone !== "before";
    draw(open);
    if (!reduced) {
      requestAnimationFrame(() => {
        el.style.transition = transition;
      });
    }

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dir = y > lastY + 2 ? 1 : y < lastY - 2 ? -1 : 0;
      lastY = y;
      const next = readZone();
      const prev = open;
      if (dir > 0 && zone === "before" && next !== "before") open = true;
      if (dir < 0 && zone === "after" && next !== "after") open = false;
      if (dir < 0 && next === "before" && zone !== "before") open = false;
      zone = next;
      if (open !== prev) draw(open);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled, sectionRef, targetRef, transition]);
}

function Headline(
  props: Omit<Parameters<typeof PlatformIntroAnimatedHeadline>[0], "drift">,
) {
  const { smooth } = useContext(GothamModeContext);
  return <PlatformIntroAnimatedHeadline {...props} drift={!smooth} />;
}

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
  fill = false,
  contain = false,
}: {
  src: string;
  video?: boolean;
  position?: "center" | "top";
  poster?: string;
  /** Draw edge to edge. Skips the sized-mode letterbox. */
  fill?: boolean;
  /** Show the whole frame, including its header. No crop. */
  contain?: boolean;
}) {
  const { smooth, sized } = useContext(GothamModeContext);
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
      { rootMargin: smooth ? "300px 0px" : "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [smooth]);

  useEffect(() => {
    if (!shouldLoad || !video) return;
    const node = videoRef.current;
    if (!node) return;
    if (!smooth) {
      const play = node.play();
      if (play) play.catch(() => {});
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) node.play()?.catch(() => {});
        else node.pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad, video, smooth]);

  const sourceWidth = MEDIA_WIDTH[src];
  const capped = Boolean(sized && sourceWidth && !fill && !contain);

  const fit =
    position === "top"
      ? "object-cover object-top"
      : "object-cover object-center";
  const mediaClass = contain
    ? "max-h-full max-w-full object-contain"
    : capped
      ? "h-auto max-h-full w-full object-contain"
      : `absolute inset-0 h-full w-full ${fit}`;
  const mediaStyle = capped
    ? { maxWidth: `min(100%, ${Math.round(sourceWidth * SIZED_MAX_UPSCALE)}px)` }
    : undefined;

  const media =
    shouldLoad && video ? (
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload={smooth ? "metadata" : "auto"}
        className={mediaClass}
        style={mediaStyle}
      />
    ) : shouldLoad && !video ? (
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className={mediaClass}
        style={mediaStyle}
      />
    ) : null;

  return (
    <>
      <span
        ref={sentinelRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
      />
      {contain || capped ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          {media}
        </div>
      ) : (
        media
      )}
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
  const { smooth } = useContext(GothamModeContext);
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const progress = useScrollProgress(
    sectionRef,
    (section) => {
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const start = vh * 0.6;
      const end = -(rect.height - vh) * 0.8;
      const t = (start - rect.top) / (start - end);
      return Math.min(1, Math.max(0, t));
    },
    smooth,
    () => {},
  );

  useEffect(() => {
    if (!smooth) return;
    const section = sectionRef.current;
    const el = innerRef.current;
    if (!section || !el) return;

    const reduced = prefersReducedMotion();
    const paint = (open: boolean) => {
      const scale = reduced || open ? 1 : 0.8;
      const t = (scale - 0.8) / 0.2;
      el.style.transform = `scale(${scale})`;
      el.style.borderRadius = `${(18 * (1 - t)) / scale}px`;
    };

    type Zone = "before" | "inside" | "after";
    const readZone = (): Zone => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.top >= vh * 0.92) return "before";
      if (rect.bottom <= vh * 0.08) return "after";
      return "inside";
    };

    let zone = readZone();
    let open = reduced || zone !== "before";
    paint(open);
    if (!reduced) {
      requestAnimationFrame(() => {
        el.style.transition =
          "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.7s cubic-bezier(0.4, 0, 0.2, 1)";
      });
    }

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dir = y > lastY + 2 ? 1 : y < lastY - 2 ? -1 : 0;
      lastY = y;
      const next = readZone();
      if (dir > 0 && zone === "before" && next !== "before") open = true;
      if (dir < 0) {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
        if (visible <= 0 || (rect.top > 0 && visible < vh * 0.4)) open = false;
        else open = true;
      }
      zone = next;
      paint(open);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [smooth]);

  if (smooth) {
    return (
      <section id={id} ref={sectionRef} className="relative h-screen bg-black">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            ref={innerRef}
            className="absolute inset-0 origin-center overflow-hidden will-change-transform"
            style={{ transform: "scale(0.8)", borderRadius: 22.5 }}
          >
            <Frame src={src} video={video} poster={poster} fill />
          </div>
        </div>
      </section>
    );
  }

  const eased = easeInOut(progress);
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

/** 0 = half width, centered. 1 = full screen width. */
function auraWindow(eased: number) {
  const scale = 0.5 + 0.5 * eased;
  const insetX = ((1 - scale) / 2) * 100;
  return `inset(0% ${insetX.toFixed(2)}% 0% ${insetX.toFixed(2)}%)`;
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
  const { smooth } = useContext(GothamModeContext);
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const progress = useScrollProgress(
    sectionRef,
    (section) => {
      if (prefersReducedMotion()) return 1;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(vh, rect.height - vh);
      const scrolled = Math.min(travel, Math.max(0, -rect.top));
      return scrolled / travel;
    },
    smooth,
    () => {},
  );

  useLayoutEffect(() => {
    if (!smooth) return;
    const section = sectionRef.current;
    const el = innerRef.current;
    if (!section || !el) return;

    const reduced = prefersReducedMotion();
    const startScale = 0.8;
    const paint = (open: boolean) => {
      const scale = reduced || open ? 1 : startScale;
      const t = (scale - startScale) / (1 - startScale);
      el.style.clipPath = "none";
      el.style.transform = `scale(${scale})`;
      el.style.borderRadius = `${(18 * (1 - t)) / scale}px`;
    };

    const frame = el.parentElement ?? el;
    type Zone = "before" | "inside" | "after";
    const metrics = () => {
      const rect = frame.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
      const full = frame.offsetHeight || rect.height;
      return { rect, vh, visible, full };
    };
    const readZone = (): Zone => {
      const { rect, vh } = metrics();
      if (rect.bottom <= 0) return "after";
      if (rect.top >= vh) return "before";
      return "inside";
    };

    let zone = readZone();
    let open = reduced || zone !== "before";
    paint(open);
    if (!reduced) {
      requestAnimationFrame(() => {
        el.style.transition =
          "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.7s cubic-bezier(0.4, 0, 0.2, 1)";
      });
    }

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > lastY + 8;
      const up = y < lastY;
      lastY = y;
      const next = readZone();
      const wasOpen = open;
      if (down && zone === "before" && next !== "before") open = true;
      if (up) {
        const { visible } = metrics();
        open = visible > 0;
      }
      zone = next;
      if (open !== wasOpen) paint(open);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [smooth]);

  if (smooth) {
    return (
      <section id={id} ref={sectionRef} className="relative bg-black">
        <Headline
          unstyled
          text={title}
          className="px-6 pb-6 pt-20 text-[clamp(2.4rem,5.5vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.03em] md:px-16 md:pb-8 md:pt-24"
        />
        <div className="relative h-screen w-full overflow-hidden">
          <div
            ref={innerRef}
            className="absolute inset-0 origin-center overflow-hidden bg-[#071014] will-change-transform"
          >
            <Frame src={src} video poster={poster} fill />
          </div>
        </div>
      </section>
    );
  }

  const eased = easeInOut(progress);
  return (
    <section id={id} ref={sectionRef} className="relative h-[280vh] bg-black">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <Headline
          unstyled
          text={title}
          className="shrink-0 px-6 pb-6 pt-20 text-[clamp(2.4rem,5.5vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.03em] md:px-16 md:pb-8 md:pt-24"
        />
        <div className="relative min-h-0 flex-1">
          <div
            className="absolute inset-0 overflow-hidden bg-[#071014] will-change-[clip-path]"
            style={{ clipPath: auraWindow(eased), transform: "none" }}
          >
            <Frame src={src} video poster={poster} contain />
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
  const { smooth } = useContext(GothamModeContext);
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const progress = useScrollProgress(
    sectionRef,
    (section) => {
      const box = frameRef.current;
      if (box && !smooth) setSize({ w: box.clientWidth, h: box.clientHeight });
      if (prefersReducedMotion()) return 1;
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(vh, rect.height - vh);
      const scrolled = Math.min(travel, Math.max(0, -rect.top));
      return scrolled / travel;
    },
    smooth,
    () => {},
  );

  useReachToggle(
    smooth,
    sectionRef,
    innerRef,
    (el) => {
      el.style.transform = "scale(1)";
    },
    "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
  );

  if (smooth) {
    return (
      <section id={id} ref={sectionRef} className="relative bg-black">
        <h2 className="whitespace-pre-line px-6 pb-6 pt-20 text-[clamp(2.4rem,5.5vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.03em] text-white md:px-16 md:pb-8 md:pt-24">
          {title}
        </h2>
        <div ref={frameRef} className="relative w-full">
          <div
            ref={innerRef}
            className="relative aspect-[3840/1856] w-full overflow-hidden bg-[#071014]"
          >
            <Frame src={src} video poster={poster} fill />
          </div>
        </div>
      </section>
    );
  }

  const eased = easeInOut(progress);
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
        <Headline
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

function CalmBeat({
  id,
  title,
  src,
  poster,
}: {
  id: string;
  title?: string;
  src: string;
  poster?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className="scroll-mt-20 bg-black px-6 py-16 md:px-16 md:py-24"
    >
      {title ? (
        <Headline
          unstyled
          text={title}
          className="mx-auto max-w-[1280px] text-[clamp(2.4rem,5.5vw,5.25rem)] font-medium leading-[0.92] tracking-[-0.03em]"
        />
      ) : null}
      <div
        className={cn(
          "relative mx-auto aspect-video max-w-[1280px] overflow-hidden rounded-[10px] bg-[#0b0b0b] shadow-[0_0_28px_rgba(61,184,207,0.45),0_12px_40px_rgba(0,0,0,0.6)] transition duration-[900ms] ease-out",
          title ? "mt-8 md:mt-10" : "",
          shown ? "translate-y-0 scale-100 opacity-100" : "translate-y-8 scale-[0.96] opacity-0",
        )}
      >
        <Frame src={src} video poster={poster} />
      </div>
    </section>
  );
}

function GateHero({ children }: { children?: ReactNode }) {
  const { sized } = useContext(GothamModeContext);
  const media = useMedia();
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
            src={media.cameras}
            poster={media.camerasPoster}
            autoPlay
            muted
            playsInline
            preload="auto"
            className={
              sized
                ? "absolute left-1/2 top-[40%] h-auto w-[min(100%,1180px)] -translate-x-1/2 -translate-y-1/2"
                : "absolute inset-0 h-full w-full object-cover"
            }
            style={
              sized
                ? {
                    maskImage:
                      "radial-gradient(ellipse 70% 70% at center, black 55%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 70% 70% at center, black 55%, transparent 100%)",
                  }
                : undefined
            }
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

export function LandingGothamScroll({ mode = {} }: { mode?: GothamMode }) {
  return (
    <GothamModeContext.Provider value={mode}>
      <LandingGothamScrollBody />
    </GothamModeContext.Provider>
  );
}

function LandingGothamScrollBody() {
  const mode = useContext(GothamModeContext);
  const MEDIA = useMedia();
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

    let raf = 0;
    const onScroll = mode.smooth
      ? () => {
          if (raf) return;
          raf = requestAnimationFrame(() => {
            raf = 0;
            syncScrollState();
          });
        }
      : syncScrollState;

    syncScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [mode.smooth]);

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
            <Headline text={PLATFORM_INTRO.title} />
          </div>
          <div className="mt-24 w-full md:mt-36">
            <AboutPledgeSpotlight />
          </div>
        </section>
      </GateHero>

      {mode.calm ? (
        <>
          <CalmBeat id="explorer" src={MEDIA.gis} poster={MEDIA.gisPoster} />
          <CalmBeat
            id="aura"
            title={"AI-driven\nsite superiority"}
            src={MEDIA.aura}
            poster={MEDIA.auraPoster}
          />
          <CalmBeat
            id="scroll-floor"
            title={"The building\nis the picture"}
            src={MEDIA.floor}
            poster={MEDIA.floorPoster}
          />
        </>
      ) : (
        <>
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
        </>
      )}
      <SectionGap />
      <section
        id="scroll-mobile"
        aria-label="The patrol answers in hand"
        className="scroll-mt-20 border-t border-white/10 bg-black px-6 pb-6 pt-16 md:px-16 md:pb-8 md:pt-24"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-secondary">
          Mobile apps
        </p>
        <Headline
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
