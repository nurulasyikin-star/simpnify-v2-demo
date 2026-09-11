import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";

import { FollowUsOn } from "@/components/follow-us-on";
import {
  footerExploreLinks,
  legalLinks,
  primaryNav,
  type NavItem,
} from "@/config/site-nav";

export type FooterVariantId =
  | "current"
  | "nav-continuation"
  | "multi-column"
  | "compact-dense"
  | "secondary-inline";

export type FooterVariantMeta = {
  id: FooterVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
};

export const footerVariants: FooterVariantMeta[] = [
  {
    id: "current",
    title: "A — Current (baseline)",
    tagline:
      "Brand left, “More” right — the empty middle band you flagged as wasted space.",
    pros: ["No header duplication", "Secondary pages surfaced"],
    cons: [
      "Large dead zone between columns",
      "Footer doesn’t continue the header journey",
      "Feels like two unrelated blocks",
    ],
  },
  {
    id: "nav-continuation",
    title: "B — Nav continuation strip",
    tagline:
      "Header links echoed in one horizontal row, with deeper pages tucked underneath.",
    pros: [
      "Clear continuation from the fixed header",
      "Fills width — no middle gap",
      "Scroll-end recovery for long pages",
    ],
    cons: ["Duplicates header destinations", "Taller than a minimal footer"],
  },
  {
    id: "multi-column",
    title: "C — Multi-column sitemap",
    tagline:
      "Grouped columns (Product / Company / Resources) — earns the footer height.",
    pros: [
      "No horizontal strip duplication",
      "Room for trust content later",
      "Matches B2B security-site patterns",
    ],
    cons: ["More vertical space", "Requires maintaining column groupings"],
  },
  {
    id: "compact-dense",
    title: "D — Compact dense grid",
    tagline:
      "Brand + social on the left; primary nav and explore links fill the center in a tight grid.",
    pros: [
      "Fixes the middle gap without a full nav clone",
      "Primary + secondary links visible at once",
      "Balanced visual weight",
    ],
    cons: ["Busier layout", "Less room for long-form trust copy"],
  },
  {
    id: "secondary-inline",
    title: "E — Secondary inline (minimal)",
    tagline:
      "Smallest footprint — only pages not in the header, inline with brand and social.",
    pros: [
      "Zero header overlap",
      "Shortest footer",
      "Single flowing row on desktop",
    ],
    cons: [
      "No scroll-end nav recovery",
      "Explore links easy to miss",
    ],
  },
];

const COPYRIGHT = "© 2026 Simpnify Sdn Bhd. All rights reserved.";
const TAGLINE =
  "Unified platform for industrial and critical infrastructure operations.";

const footerShellClass =
  "border-t border-white/10 bg-[var(--platform-surface-raised)]";

function FooterBottomBar({
  className = "",
  legalClassName = "text-sm text-platform-muted transition hover:text-secondary",
}: {
  className?: string;
  legalClassName?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <p className="text-sm text-platform-subtle">{COPYRIGHT}</p>
      <nav aria-label="Legal">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {legalLinks.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className={legalClassName}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function NavLinkList({
  items,
  className = "text-sm text-platform-muted transition hover:text-secondary",
  layout = "vertical",
}: {
  items: readonly NavItem[];
  className?: string;
  layout?: "vertical" | "horizontal" | "grid";
}) {
  if (layout === "horizontal") {
    return (
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {items.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} className={className}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  if (layout === "grid") {
    return (
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
        {items.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} className={className}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="flex flex-col gap-2.5">
      {items.map(({ label, href }) => (
        <li key={href}>
          <Link href={href} className={className}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FooterVariantCurrent() {
  return (
    <footer className={`${footerShellClass} px-6 py-12 md:px-16`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-xl text-secondary">Simpnify</p>
            <p className="mt-2 text-sm leading-6 text-platform-muted">
              {TAGLINE}
            </p>
            <div className="mt-6">
              <FollowUsOn />
            </div>
          </div>

          <nav aria-label="More on Simpnify">
            <p className="text-sm font-semibold tracking-wide text-platform-muted">
              MORE
            </p>
            <div className="mt-3">
              <NavLinkList items={footerExploreLinks} />
            </div>
          </nav>
        </div>

        <FooterBottomBar />
      </div>
    </footer>
  );
}

export function FooterVariantNavContinuation() {
  return (
    <footer className={`${footerShellClass} px-4 py-8 sm:px-6 lg:px-8`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-6">
          <nav aria-label="Site">
            <NavLinkList
              items={primaryNav}
              layout="horizontal"
              className="text-sm text-white/90 transition hover:text-secondary"
            />
          </nav>
          <nav aria-label="Explore more">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {footerExploreLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-platform-muted transition hover:text-secondary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg text-secondary">Simpnify</p>
            <p className="mt-1 max-w-md text-sm text-platform-muted">
              {TAGLINE}
            </p>
          </div>
          <FollowUsOn />
        </div>

        <FooterBottomBar className="pt-0 border-t-0" />
      </div>
    </footer>
  );
}

const productLinks: NavItem[] = [
  { label: "Platform overview", href: "/our-platform" },
  { label: "Modules", href: "/platform" },
  { label: "Feature", href: "/demos" },
  { label: "Use Cases", href: "/solutions" },
  { label: "Deployment", href: "/deployment" },
];

const companyLinks: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

const resourceLinks: NavItem[] = [
  { label: "Pilot scope", href: "/pilot" },
  { label: "Reference", href: "/reference" },
];

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: readonly NavItem[];
}) {
  return (
    <nav>
      <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
        {title}
      </p>
      <div className="mt-3">
        <NavLinkList items={items} />
      </div>
    </nav>
  );
}

export function FooterVariantMultiColumn() {
  return (
    <footer className={`${footerShellClass} px-6 py-10 md:px-16`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Image
                src="/simpnify-mark.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <p className="text-lg text-secondary">Simpnify</p>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-6 text-platform-muted">
              {TAGLINE}
            </p>
            <div className="mt-5">
              <FollowUsOn />
            </div>
          </div>

          <FooterColumn title="Product" items={productLinks} />
          <FooterColumn title="Company" items={companyLinks} />
          <FooterColumn title="Resources" items={resourceLinks} />
        </div>

        <FooterBottomBar />
      </div>
    </footer>
  );
}

export function FooterVariantCompactDense() {
  const allLinks = [...primaryNav, ...footerExploreLinks];

  return (
    <footer className={`${footerShellClass} px-6 py-8 md:px-16`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,240px)_1fr] lg:items-start">
          <div>
            <p className="text-lg text-secondary">Simpnify</p>
            <p className="mt-2 text-sm leading-6 text-platform-muted">
              {TAGLINE}
            </p>
            <div className="mt-5">
              <FollowUsOn />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <nav aria-label="Site navigation">
              <p className="text-xs font-semibold uppercase tracking-wider text-platform-subtle">
                Continue exploring
              </p>
              <div className="mt-3">
                <NavLinkList items={allLinks} layout="grid" />
              </div>
            </nav>
          </div>
        </div>

        <FooterBottomBar />
      </div>
    </footer>
  );
}

export function FooterVariantSecondaryInline() {
  return (
    <footer className={`${footerShellClass} px-6 py-8 md:px-16`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <div>
              <p className="text-lg text-secondary">Simpnify</p>
              <p className="mt-1 max-w-sm text-sm text-platform-muted">
                {TAGLINE}
              </p>
            </div>

            <nav aria-label="Explore more">
              <ul className="flex flex-wrap items-center gap-x-1 gap-y-2">
                {footerExploreLinks.map(({ label, href }, index) => (
                  <li key={href} className="flex items-center">
                    {index > 0 ? (
                      <span
                        className="mx-2 text-platform-subtle"
                        aria-hidden
                      >
                        ·
                      </span>
                    ) : null}
                    <Link
                      href={href}
                      className="text-sm text-platform-muted transition hover:text-secondary"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <FollowUsOn />
        </div>

        <FooterBottomBar />
      </div>
    </footer>
  );
}

const variantComponents: Record<FooterVariantId, ComponentType> = {
  current: FooterVariantCurrent,
  "nav-continuation": FooterVariantNavContinuation,
  "multi-column": FooterVariantMultiColumn,
  "compact-dense": FooterVariantCompactDense,
  "secondary-inline": FooterVariantSecondaryInline,
};

export function FooterVariant({ id }: { id: FooterVariantId }) {
  const Component = variantComponents[id];
  return <Component />;
}
