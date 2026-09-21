"use client";

import { PlatformImage } from "@/components/platform-image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { primaryNav as NAV_ITEMS } from "@/config/site-nav";

const SIMPNIFY_HOME = "/our-platform";
const SIMPNIFY_PHONE = "tel:+6075950387";

const navLinkClass = (isActive: boolean) =>
  cn(
    "transition hover:text-secondary focus-visible:text-secondary",
    isActive ? "text-secondary" : "text-white/90",
  );

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isNavActive = (href: string) => {
    if (href === "/demos") {
      return pathname === "/demos" || pathname.startsWith("/demo/");
    }
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[var(--platform-surface)]/90 font-sans text-white backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5 transition hover:opacity-80">
            <Link
              href={SIMPNIFY_HOME}
              className="flex items-center gap-2.5"
              aria-label="Simpnify homepage"
            >
              <PlatformImage
                src="/simpnify-mark.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9"
                priority
              />
              <PlatformImage
                src="/simpnify-wordmark.png"
                alt=""
                width={140}
                height={44}
                className="h-11 w-auto"
                priority
              />
            </Link>
            <a
              href={SIMPNIFY_PHONE}
              className="flex items-center gap-2"
              aria-label="Call Simpnify"
            >
              <span className="text-2xl leading-none text-platform-muted">
                by
              </span>
              <PlatformImage
                src="/ventionex-logo.png"
                alt=""
                width={120}
                height={32}
                className="h-8 w-auto mix-blend-screen"
                priority
              />
            </a>
          </div>

          <nav className="hidden lg:block" aria-label="Global">
            <ul className="flex items-center gap-8 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isNavActive(item.href) ? "page" : undefined}
                    className={navLinkClass(isNavActive(item.href))}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
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
            id="mobile-nav"
            aria-label="Mobile"
            className="border-t border-white/10 pb-4 lg:hidden"
          >
            <ul className="flex flex-col gap-3 pt-4 text-base">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isNavActive(item.href) ? "page" : undefined}
                    className={cn("block", navLinkClass(isNavActive(item.href)))}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
