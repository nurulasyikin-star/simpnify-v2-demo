"use client";

import { useEffect, useRef, useState } from "react";

import { publicAsset } from "@/lib/site-path";

const CHALLENGE_GIF = publicAsset(
  "/platform/our-platform-site/challenge-ev-digital-twin.gif",
);

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

/** Smoother, slower Gotham-style ease */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** More scroll distance = slower expand */
const SCROLL_TRACK_VH = 200;

export function PlatformChallengeScrollGif() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setProgress(1);
      return;
    }

    const update = () => {
      const rect = track.getBoundingClientRect();
      const scrollable = track.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(rect.top <= 0 ? 1 : 0);
        return;
      }
      setProgress(clamp01(-rect.top / scrollable));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const eased = easeInOutCubic(progress);

  // Image 1 → thin wide letterbox; image 2 → full viewport
  const widthVw = 68 + eased * 32;
  const heightVh = 13 + eased * 87;
  const fullBleed = eased >= 0.999;

  // Headline fades in first ~40% of scroll (Palantir-style)
  const headlineOpacity = clamp01(1 - progress / 0.42);
  const headlineLift = progress * 28;

  // Crop zoom: tight on strip, relax as frame opens
  const mediaScale = 1.05 + (1 - eased) * 2.1;

  const vignette = (1 - eased) * 0.35;

  return (
    <div
      ref={trackRef}
      className="relative w-full"
      style={{ height: `${SCROLL_TRACK_VH}vh` }}
    >
      <div
        className="sticky top-0 z-30 h-screen w-full overflow-hidden bg-[#0c1014]"
        style={{ marginLeft: "calc(50% - 50vw)", width: "100vw" }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-black transition-opacity"
          style={{ opacity: eased * 0.75 }}
          aria-hidden
        />

        <div
          className="relative flex h-full w-full flex-col items-center justify-center px-6"
          style={{ paddingBottom: fullBleed ? 0 : "6vh" }}
        >
          <div
            className="mx-auto mb-10 max-w-3xl text-center transition-opacity duration-150"
            style={{
              opacity: headlineOpacity,
              transform: `translateY(-${headlineLift}px)`,
            }}
          >
            <p className="text-sm font-semibold tracking-wide text-secondary">
              THE CHALLENGE
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
              The expensive gap is between systems
            </h2>
            <p className="mt-4 text-base leading-7 text-platform-muted">
              A sensor knows. A camera sees. A person responds. Who connects the
              story?
            </p>
          </div>

          <div
            className={
              fullBleed
                ? "absolute inset-0 overflow-hidden bg-black"
                : "relative overflow-hidden border border-white/10 bg-black shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            }
            style={
              fullBleed
                ? undefined
                : {
                    width: `${widthVw}vw`,
                    height: `${heightVh}vh`,
                    maxWidth: "72rem",
                    borderRadius: Math.round(10 * (1 - eased)),
                  }
            }
          >
            <img
              src={CHALLENGE_GIF}
              alt="Digital twin of a smart-city EV charging station during a fire incident"
              width={1920}
              height={1080}
              className="size-full object-cover object-center will-change-transform"
              style={{ transform: `scale(${mediaScale})` }}
              decoding="async"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[#0c1014]"
              style={{ opacity: vignette }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
