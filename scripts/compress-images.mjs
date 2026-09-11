#!/usr/bin/env node
/**
 * Lossy recompress webp/png assets under public/platform (excluding source/).
 * Requires: npm install --save-dev sharp
 *
 * Usage: node scripts/compress-images.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = "public/platform";
const SKIP = new Set(["source"]);
const QUALITY = 78;

async function main() {
  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("Install sharp first: npm install --save-dev sharp");
    process.exit(1);
  }

  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (SKIP.has(entry.name)) continue;
        walk(path.join(dir, entry.name));
        continue;
      }
      if (/\.(webp|png)$/i.test(entry.name)) {
        files.push(path.join(dir, entry.name));
      }
    }
  }

  walk(ROOT);

  let saved = 0;
  for (const file of files) {
    const before = fs.statSync(file).size;
    const image = sharp(file);
    const meta = await image.metadata();

    if (meta.format === "webp") {
      await image.webp({ quality: QUALITY, effort: 6 }).toFile(`${file}.tmp`);
    } else if (meta.format === "png") {
      await image.png({ quality: QUALITY, compressionLevel: 9 }).toFile(`${file}.tmp`);
    } else {
      continue;
    }

    fs.renameSync(`${file}.tmp`, file);
    const after = fs.statSync(file).size;
    saved += before - after;
    console.log(`${path.relative(ROOT, file)}: ${before} -> ${after} bytes`);
  }

  console.log(`Done. Saved ~${Math.round(saved / 1024)} KB across ${files.length} files.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
