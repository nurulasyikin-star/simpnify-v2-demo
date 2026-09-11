import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { BreadcrumbItem } from "@/lib/platform/breadcrumbs";

type PlatformBreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function PlatformBreadcrumb({ items }: PlatformBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-platform-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition hover:text-secondary"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-white" : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
