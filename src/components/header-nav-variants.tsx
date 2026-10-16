import { createElement, type ComponentType, type ReactNode } from "react";
import Link from "next/link";

import { PlatformImage } from "@/components/platform-image";
import { primaryNav } from "@/config/site-nav";
import { cn } from "@/lib/utils";

/** Matches the screenshot: Use Cases is the current page. */
const ACTIVE_HREF = "/solutions";

export type HeaderNavVariantId =
  | "current"
  | "active-pill"
  | "capsule-track"
  | "underline-marker"
  | "segmented-bar"
  | "glass-rail"
  | "luminous";

export type HeaderNavVariantMeta = {
  id: HeaderNavVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
};

export const headerNavVariants: HeaderNavVariantMeta[] = [
  {
    id: "current",
    title: "A — Current text links",
    tagline: "What ships today. Four words in a row; the current page is teal text.",
    pros: [
      "Quiet next to the logo",
      "Same treatment already on every page",
      "Plenty of space between labels",
    ],
    cons: [
      "Current page is only a color change",
      "Easy to miss which section you are in",
      "The row does not read as a control",
    ],
  },
  {
    id: "active-pill",
    title: "B — Active pill",
    tagline:
      "Same row, with the current page sitting in a soft teal pill outlined in teal.",
    pros: [
      "Current page is obvious at a glance",
      "Inactive links stay as quiet as today",
      "Small change if you want to ship quickly",
    ],
    cons: [
      "Only the active item has a shape, so the row looks uneven",
      "The pill can read as a button you already pressed",
      "Hover and active are still mostly color",
    ],
  },
  {
    id: "capsule-track",
    title: "C — Capsule track",
    tagline: "All four links live in one rounded track. The current page is a solid teal pill.",
    pros: [
      "The links read as one navigation control",
      "Strongest active state in the set",
      "Feels closer to a product switcher",
    ],
    cons: [
      "Heavier than the current header",
      "The solid pill competes with the logo",
      "Reads more like an app than a marketing site",
    ],
  },
  {
    id: "underline-marker",
    title: "D — Underline marker",
    tagline: "Text stays airy. The current page carries a teal bar along the bottom of the header.",
    pros: [
      "Classic tab cue without a filled shape",
      "Keeps the open header",
      "Active state is positional, not only a color swap",
    ],
    cons: [
      "The bar is thin on a dark header",
      "Can look like a text decoration if the row is short",
      "Needs the full header height to sit cleanly",
    ],
  },
  {
    id: "segmented-bar",
    title: "E — Segmented bar",
    tagline: "Equal cells in one bar. The current page fills its cell.",
    pros: [
      "Every destination has the same hit area",
      "Scanning the current page is fast",
      "Holds together while the list stays at four items",
    ],
    cons: [
      "Widest option in the header",
      "Starts to look like a settings control",
      "Gets cramped if Partners returns to the row",
    ],
  },
  {
    id: "glass-rail",
    title: "F — Glass rail",
    tagline:
      "Frosted capsule with a lit teal pill. The current page glows; the rest sit in the glass.",
    pros: [
      "Reads as one modern control",
      "Glow makes the current page easy to find",
      "Still uses the existing teal, just with light and blur",
    ],
    cons: [
      "Heavier than a text row",
      "Glow can feel loud next to the logo",
      "Blur is subtle on some screens",
    ],
  },
  {
    id: "luminous",
    title: "G — Luminous label",
    tagline:
      "No box. The current page is a bright gradient with a soft light under the word.",
    pros: [
      "Keeps the open header",
      "Feels current without adding a control shape",
      "Inactive links stay quiet so the glow can carry the state",
    ],
    cons: [
      "Gradient text is thinner than solid teal",
      "Easy to miss if the header is cropped",
      "Less obvious as a clickable group",
    ],
  },
];

function Brand() {
  return (
    <Link
      href="/our-platform"
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
    </Link>
  );
}

function HeaderBar({
  children,
  align = "center",
}: {
  children: ReactNode;
  align?: "center" | "stretch";
}) {
  return (
    <div className="border-b border-white/5 bg-[var(--platform-surface)] font-sans text-white">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-7xl justify-between px-4 sm:px-6 lg:px-8",
          align === "stretch" ? "items-stretch" : "items-center",
        )}
      >
        <div className={cn(align === "stretch" && "flex items-center")}>
          <Brand />
        </div>
        {children}
      </div>
    </div>
  );
}

function PageStub() {
  return (
    <div className="bg-[var(--platform-surface)] px-6 py-14 md:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
        Use cases
      </p>
      <p className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-white">
        One platform for detection, response, and the record.
      </p>
      <p className="mt-3 max-w-lg text-sm leading-6 text-platform-muted">
        Sample page under the header. Use Cases is the current item, matching
        the screenshot.
      </p>
    </div>
  );
}

function Preview({
  children,
  align,
}: {
  children: ReactNode;
  align?: "center" | "stretch";
}) {
  return (
    <div className="overflow-hidden bg-[var(--platform-surface)]">
      <HeaderBar align={align}>{children}</HeaderBar>
      <PageStub />
    </div>
  );
}

export function HeaderNavVariantCurrent() {
  return (
    <Preview>
      <nav aria-label="Global">
        <ul className="flex items-center gap-8 text-sm">
          {primaryNav.map((item) => {
            const active = item.href === ACTIVE_HREF;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "transition hover:text-secondary focus-visible:text-secondary",
                    active ? "text-secondary" : "text-white/90",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Preview>
  );
}

export function HeaderNavVariantActivePill() {
  return (
    <Preview>
      <nav aria-label="Global">
        <ul className="flex items-center gap-2 text-sm">
          {primaryNav.map((item) => {
            const active = item.href === ACTIVE_HREF;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
                    active
                      ? "border border-secondary bg-secondary/15 font-medium text-secondary"
                      : "border border-transparent text-white/90 hover:border-white/15 hover:bg-white/5 hover:text-secondary",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Preview>
  );
}

export function HeaderNavVariantCapsuleTrack() {
  return (
    <Preview>
      <nav aria-label="Global">
        <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 text-sm">
          {primaryNav.map((item) => {
            const active = item.href === ACTIVE_HREF;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-full px-3.5 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
                    active
                      ? "bg-secondary font-semibold text-[#071318]"
                      : "text-white/80 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Preview>
  );
}

export function HeaderNavVariantUnderlineMarker() {
  return (
    <Preview align="stretch">
      <nav aria-label="Global" className="h-full">
        <ul className="flex h-full items-stretch gap-8 text-sm">
          {primaryNav.map((item) => {
            const active = item.href === ACTIVE_HREF;
            return (
              <li key={item.label} className="flex">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center border-b-2 transition focus-visible:text-secondary",
                    active
                      ? "border-secondary font-medium text-secondary"
                      : "border-transparent text-white/90 hover:text-secondary",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Preview>
  );
}

export function HeaderNavVariantSegmentedBar() {
  return (
    <Preview>
      <nav aria-label="Global">
        <ul className="grid grid-cols-4 overflow-hidden rounded-lg border border-white/10 text-sm">
          {primaryNav.map((item, index) => {
            const active = item.href === ACTIVE_HREF;
            return (
              <li
                key={item.label}
                className={cn(
                  index < primaryNav.length - 1 && "border-r border-white/10",
                )}
              >
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block px-4 py-2 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-secondary",
                    active
                      ? "bg-secondary/15 font-medium text-secondary"
                      : "text-white/80 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Preview>
  );
}

export function HeaderNavVariantGlassRail() {
  return (
    <Preview>
      <nav aria-label="Global">
        <ul className="flex items-center gap-0.5 rounded-full bg-white/[0.06] p-1 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md">
          {primaryNav.map((item) => {
            const active = item.href === ACTIVE_HREF;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-full px-3.5 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
                    active
                      ? "bg-gradient-to-b from-[#5ed4e8] to-[#1f7f93] font-semibold text-[#041014] shadow-[0_0_18px_rgba(61,184,207,0.55),inset_0_1px_0_rgba(255,255,255,0.55)]"
                      : "text-white/75 hover:bg-white/10 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Preview>
  );
}

export function HeaderNavVariantLuminous() {
  return (
    <Preview>
      <nav aria-label="Global">
        <ul className="flex items-center gap-8 text-sm">
          {primaryNav.map((item) => {
            const active = item.href === ACTIVE_HREF;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative inline-flex flex-col items-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary",
                    active
                      ? "font-medium"
                      : "text-white/70 hover:text-white",
                  )}
                >
                  <span
                    className={cn(
                      active &&
                        "bg-gradient-to-r from-white via-[#b8f4ff] to-[#3db8cf] bg-clip-text text-transparent",
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -bottom-1.5 h-1.5 w-3/4 rounded-full bg-[#3db8cf] blur-sm",
                      active ? "opacity-90" : "opacity-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Preview>
  );
}

const map: Record<HeaderNavVariantId, ComponentType> = {
  current: HeaderNavVariantCurrent,
  "active-pill": HeaderNavVariantActivePill,
  "capsule-track": HeaderNavVariantCapsuleTrack,
  "underline-marker": HeaderNavVariantUnderlineMarker,
  "segmented-bar": HeaderNavVariantSegmentedBar,
  "glass-rail": HeaderNavVariantGlassRail,
  luminous: HeaderNavVariantLuminous,
};

export function HeaderNavVariant({ id }: { id: HeaderNavVariantId }) {
  return createElement(map[id]);
}
