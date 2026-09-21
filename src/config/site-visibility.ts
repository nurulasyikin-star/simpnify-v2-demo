/**
 * Public marketing surface — toggle what appears on the live site vs.
 * sales / pilot conversations only (reduces copyable UI detail).
 */
export const siteVisibility = {
  showPartnersPage: false,
} as const;

const BLOCKED_PATHS = new Set<string>(
  siteVisibility.showPartnersPage ? [] : ["/partners"],
);

export function isPublicPath(pathname: string): boolean {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  return !BLOCKED_PATHS.has(path);
}

export function isPublicHref(href: string): boolean {
  if (href === "/partners") return siteVisibility.showPartnersPage;
  return true;
}

export function filterPublicHrefs<T extends { href: string }>(items: T[]): T[] {
  return items.filter((item) => isPublicHref(item.href));
}
