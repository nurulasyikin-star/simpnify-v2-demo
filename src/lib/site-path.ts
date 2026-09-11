/** Must match `repo` in next.config.ts (GitHub Pages project site path). */
export const SITE_BASE_PATH = "/simpnify-v2-demo";

/** Prefix a public asset path for GitHub Pages subpath hosting. */
export function publicAsset(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_BASE_PATH}${normalized}`;
}
