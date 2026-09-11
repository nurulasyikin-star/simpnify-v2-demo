#!/usr/bin/env node
/**
 * Scan built static HTML for image src paths and verify files exist on disk.
 * Usage: npm run build && node scripts/check-export-images.mjs
 */
import fs from "node:fs";
import path from "node:path";

const OUT_DIR = "out";
const SITE_BASE_PATH = "/simpnify-v2-demo";

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const htmlFiles = walk(OUT_DIR).filter((file) => file.endsWith(".html"));
const srcPattern = /src="([^"]+\.(webp|png|jpg|jpeg|svg))"/g;
const missing = new Set();
const checked = new Set();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(srcPattern)) {
    const src = match[1];
    if (src.startsWith("http")) continue;
    checked.add(src);

    if (!src.startsWith(SITE_BASE_PATH)) {
      missing.add(`${src} (missing basePath prefix)`);
      continue;
    }

    const diskPath = path.join(
      OUT_DIR,
      src.slice(SITE_BASE_PATH.length + 1),
    );

    if (!fs.existsSync(diskPath)) {
      missing.add(`${src} (from ${path.relative(OUT_DIR, file)})`);
    }
  }
}

console.log(`Checked ${checked.size} image src values across ${htmlFiles.length} HTML files.`);

if (missing.size === 0) {
  console.log("OK: all image src paths resolve in the static export.");
  process.exit(0);
}

console.log(`Missing ${missing.size} image(s):`);
for (const item of missing) console.log(`  - ${item}`);
process.exit(1);
