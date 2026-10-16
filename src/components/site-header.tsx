"use client";

import { PlatformImage } from "@/components/platform-image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { primaryNav as NAV_ITEMS } from "@/config/site-nav";

const SIMPNIFY_HOME = "/our-platform";

const navLinkClass = (isActive: boolean) =>
  cn(
    "transition hover:text-secondary focus-visible:text-secondary",
    isActive ? "text-secondary" : "text-white/90",
  );

const desktopNavLinkClass = (isActive: boolean) =>
  cn(
    "block rounded-full px-3.5 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
    isActive
      ? "bg-gradient-to-b from-[#5ed4e8] to-[#1f7f93] font-semibold text-[#041014] shadow-[0_0_18px_rgba(61,184,207,0.55),inset_0_1px_0_rgba(255,255,255,0.55)]"
      : "text-white/75 hover:bg-white/10 hover:text-white",
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
          <Link
            href={SIMPNIFY_HOME}
            className="flex items-center gap-2 transition hover:opacity-80"
            aria-label="Simpnify homepage"
          >
            <PlatformImage
              src="/simpnify-mark.png"
              alt=""
              width={54}
              height={54}
              className="h-[54px] w-[54px]"
              priority
            />
            <span className="flex flex-col items-end pb-2 leading-none">
              <PlatformImage
                src="/simpnify-wordmark.png"
                alt=""
                width={96}
                height={36}
                className="h-9 w-auto"
                priority
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
                  priority
                />
              </span>
            </span>
          </Link>

          <nav className="hidden lg:block" aria-label="Global">
            <ul className="flex items-center gap-0.5 rounded-full bg-white/[0.06] p-1 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isNavActive(item.href) ? "page" : undefined}
                    className={desktopNavLinkClass(isNavActive(item.href))}
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
