"use client";

import { createElement, useState, type ComponentType } from "react";
import Link from "next/link";

import { PlatformImage } from "@/components/platform-image";
import { FollowUsOn } from "@/components/follow-us-on";
import { siteVisibility } from "@/config/site-visibility";
import { legalLinks, type NavItem } from "@/config/site-nav";

import type { FooterLinksVariantId } from "@/components/footer-links-variants-meta";

const TAGLINE =
  "Unified platform for industrial and critical infrastructure operations.";

const productLinks: NavItem[] = [
  { label: "Platform overview", href: "/our-platform" },
  { label: "Modules", href: "/platform" },
  { label: "Feature", href: "/demos" },
  { label: "Use Cases", href: "/solutions" },
  { label: "Deployment", href: "/deployment" },
];

const companyLinks: NavItem[] = [
  { label: "About", href: "/about" },
  ...(siteVisibility.showPartnersPage
    ? [{ label: "Partners", href: "/partners" }]
    : []),
  { label: "Contact", href: "/contact" },
];

const resourceLinks: NavItem[] = [
  { label: "Pilot scope", href: "/pilot" },
  { label: "Reference", href: "/reference" },
];

const groups = [
  { title: "Product", items: productLinks },
  { title: "Company", items: companyLinks },
  { title: "Resources", items: resourceLinks },
];

const linkClass = "text-sm text-platform-muted transition hover:text-secondary";
const headingClass =
  "text-xs font-semibold uppercase tracking-wider text-platform-subtle";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`size-4 fill-current transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
    </svg>
  );
}

function Brand({ withFollow = true }: { withFollow?: boolean }) {
  return (
    <div>
      <Link
        href="/our-platform"
        className="flex items-center gap-2.5 transition hover:opacity-80"
        aria-label="Simpnify platform"
      >
        <PlatformImage
          src="/simpnify-mark.png"
          alt=""
          width={32}
          height={32}
          className="h-8 w-8"
        />
        <p className="text-lg text-secondary">Simpnify</p>
      </Link>
      <p className="mt-3 max-w-xs text-sm leading-6 text-platform-muted">
        {TAGLINE}
      </p>
      {withFollow && (
        <div className="mt-5">
          <FollowUsOn />
        </div>
      )}
    </div>
  );
}

function BottomBar() {
  return (
    <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-platform-subtle">
        © 2026 Simpnify Sdn Bhd. All rights reserved.
      </p>
      <nav aria-label="Legal">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {legalLinks.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className={linkClass}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <footer className="border-t border-white/10 bg-[var(--platform-surface-raised)] px-6 py-10 md:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        {children}
        <BottomBar />
      </div>
    </footer>
  );
}

function LinkColumn({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <nav>
      <p className={headingClass}>{title}</p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {items.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} className={linkClass}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function FooterLinksVariantCurrent() {
  return (
    <Shell>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Brand />
        </div>
        {groups.map((g) => (
          <LinkColumn key={g.title} {...g} />
        ))}
      </div>
    </Shell>
  );
}

export function FooterLinksVariantSitemapToggle() {
  const [open, setOpen] = useState(false);
  return (
    <Shell>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <Brand />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-platform-muted transition hover:border-secondary/40 hover:text-secondary"
        >
          {open ? "Hide site map" : "Site map"}
          <Chevron open={open} />
        </button>
      </div>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-10 rounded-xl border border-white/10 bg-white/[0.02] p-6 sm:grid-cols-3">
            {groups.map((g) => (
              <LinkColumn key={g.title} {...g} />
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

function AccordionColumn({ title, items }: { title: string; items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-3 border-b border-white/10 pb-2 ${headingClass} transition hover:text-secondary`}
      >
        <span>
          {title}
          <span className="ml-2 font-normal normal-case tracking-normal text-platform-subtle/70">
            {items.length}
          </span>
        </span>
        <Chevron open={open} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <ul className="flex flex-col gap-2.5 overflow-hidden">
          {items.map(({ label, href }, i) => (
            <li key={href} className={i === 0 ? "mt-3" : ""}>
              <Link href={href} className={linkClass}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export function FooterLinksVariantColumnAccordion() {
  return (
    <Shell>
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Brand />
        </div>
        <div className="grid items-start gap-6 sm:grid-cols-3 lg:col-span-3">
          {groups.map((g) => (
            <AccordionColumn key={g.title} {...g} />
          ))}
        </div>
      </div>
    </Shell>
  );
}

export function FooterLinksVariantGroupTabs() {
  const [active, setActive] = useState<string | null>(null);
  const current = groups.find((g) => g.title === active);
  return (
    <Shell>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <Brand />
        <div className="flex flex-col gap-4 lg:items-end">
          <p className={headingClass}>Explore</p>
          <div className="flex flex-wrap gap-2">
            {groups.map(({ title }) => {
              const on = active === title;
              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => setActive(on ? null : title)}
                  aria-pressed={on}
                  className={`rounded-full border px-4 py-1.5 text-sm transition ${
                    on
                      ? "border-secondary/50 bg-secondary/15 text-secondary"
                      : "border-white/10 bg-white/5 text-platform-muted hover:border-secondary/40 hover:text-secondary"
                  }`}
                >
                  {title}
                </button>
              );
            })}
          </div>
          <div className="min-h-6">
            {current && (
              <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
                {current.items.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className={linkClass}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}

export function FooterLinksVariantHidden() {
  return (
    <Shell>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Brand withFollow={false} />
        <FollowUsOn />
      </div>
    </Shell>
  );
}

const map: Record<FooterLinksVariantId, ComponentType> = {
  current: FooterLinksVariantCurrent,
  "sitemap-toggle": FooterLinksVariantSitemapToggle,
  "column-accordion": FooterLinksVariantColumnAccordion,
  "group-tabs": FooterLinksVariantGroupTabs,
  hidden: FooterLinksVariantHidden,
};

export function FooterLinksVariant({ id }: { id: FooterLinksVariantId }) {
  return createElement(map[id]);
}
