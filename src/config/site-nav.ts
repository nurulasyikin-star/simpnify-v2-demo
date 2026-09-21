// Single source of truth for site-wide navigation.
// Header = primary journey (always visible via the fixed nav).
// Footer must NOT repeat these — it should only surface links that
// aren't already one click away in the header (see footerLinks below).

import { siteVisibility } from "@/config/site-visibility";

export type NavItem = {
  label: string;
  href: string;
};

const primaryNavAll: readonly NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Features", href: "/demos" },
  { label: "Use Cases", href: "/solutions" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
] as const;

export const primaryNav: readonly NavItem[] = primaryNavAll.filter(
  (item) => item.href !== "/partners" || siteVisibility.showPartnersPage,
);

// Links that exist but are intentionally NOT in the primary header nav
// (deeper/secondary pages) — these are the only "explore more" links
// that belong in the footer, so header and footer never duplicate.
export const footerExploreLinks: readonly NavItem[] = [
  { label: "Deployment", href: "/deployment" },
  { label: "Pilot Scope", href: "/pilot" },
  { label: "Reference", href: "/reference" },
] as const;

export const legalLinks: readonly NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
] as const;
