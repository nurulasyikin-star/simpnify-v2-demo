/**
 * Public marketing surface — toggle what appears on the live site vs.
 * sales / pilot conversations only (reduces copyable UI detail).
 */
export const siteVisibility = {
  showPartnersPage: false,
  showUseCaseYouTubeVideos: false,
  /** Screenshot walkthroughs hidden from Features hub and direct URLs */
  hiddenDemoSlugs: ["floor-plan", "aura", "sos"] as const,
} as const;

const HIDDEN_DEMO = new Set<string>(siteVisibility.hiddenDemoSlugs);

const BLOCKED_PATHS = new Set<string>([
  ...(siteVisibility.showPartnersPage ? [] : ["/partners"]),
  ...siteVisibility.hiddenDemoSlugs.map((slug) => `/demo/${slug}`),
]);

export function isPublicPath(pathname: string): boolean {
  const path = pathname.split("?")[0].replace(/\/$/, "") || "/";
  return !BLOCKED_PATHS.has(path);
}

export function isDemoPublic(slug: string): boolean {
  return !HIDDEN_DEMO.has(slug);
}

export function isPublicHref(href: string): boolean {
  if (href.startsWith("/demo/")) {
    const slug = href.replace("/demo/", "").split("/")[0];
    return isDemoPublic(slug);
  }
  if (href === "/partners") return siteVisibility.showPartnersPage;
  return true;
}

export function filterPublicHrefs<T extends { href: string }>(items: T[]): T[] {
  return items.filter((item) => isPublicHref(item.href));
}
