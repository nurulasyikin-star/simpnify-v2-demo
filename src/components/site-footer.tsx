import { PlatformImage } from "@/components/platform-image";
import Link from "next/link";

import { FollowUsOn } from "@/components/follow-us-on";
import { legalLinks } from "@/config/site-nav";

const TAGLINE =
  "Unified platform for industrial and critical infrastructure operations.";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[var(--platform-surface-raised)] px-6 py-10 md:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
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
          </div>
          <FollowUsOn />
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-platform-subtle">
            © 2026 Simpnify Sdn Bhd. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map(({ label, href }) => (
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
      </div>
    </footer>
  );
}
