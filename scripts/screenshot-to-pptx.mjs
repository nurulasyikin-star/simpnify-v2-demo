import { chromium } from "playwright";
import PptxGenJS from "pptxgenjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "screenshots");
const PPTX_PATH = path.join(ROOT, "simpnify-pages.pptx");
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const PLATFORM_SLUGS = [
  "operations",
  "assets-video",
  "automation",
  "intelligence",
  "field",
  "administration",
];

const SOLUTION_SLUGS = [
  "perimeter-intrusion",
  "responder-sos",
  "restricted-area",
  "field-offline",
];

const STATIC_ROUTES = [
  "/",
  "/our-platform",
  "/about",
  "/why-simpnify",
  "/solutions",
  "/platform",
  "/demos",
  "/demo",
  "/deployment",
  "/partners",
  "/contact",
  "/pilot",
  "/reference",
  "/privacy",
  "/terms",
  "/demo/floor-plan",
  "/demo/sos",
  "/demo/sos-settings",
  "/demo/guided-response",
  "/demo/connectors",
  "/demo/aura",
  "/demo/communications",
  "/photos",
  "/photos/demos",
  "/photos/demos-visual",
  "/photos/about-pledge",
  "/photos/feature-carousel",
  "/photos/use-cases",
];

const ROUTES = [
  ...STATIC_ROUTES,
  ...PLATFORM_SLUGS.map((slug) => `/platform/${slug}`),
  ...SOLUTION_SLUGS.map((slug) => `/solutions/${slug}`),
];

function routeLabel(route) {
  if (route === "/") return "Home";
  return route
    .slice(1)
    .split("/")
    .map((part) =>
      part
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
    )
    .join(" / ");
}

function safeFilename(route) {
  return route === "/" ? "home" : route.slice(1).replace(/\//g, "__");
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  const results = [];

  for (const route of ROUTES) {
    const label = routeLabel(route);
    const filename = `${safeFilename(route)}.png`;
    const filepath = path.join(OUT_DIR, filename);
    const url = `${BASE_URL}${route}`;

    process.stdout.write(`Capturing ${route} ... `);

    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(1200);
      await page.screenshot({ path: filepath, fullPage: true });
      results.push({ route, label, filepath, ok: true });
      process.stdout.write("OK\n");
    } catch (error) {
      results.push({
        route,
        label,
        filepath,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      });
      process.stdout.write(`FAILED (${error})\n`);
    }
  }

  await browser.close();

  const pptx = new PptxGenJS();
  pptx.author = "Simpnify Demo";
  pptx.title = "Simpnify v2 — Page Screenshots";
  pptx.subject = "Full site screenshot deck";
  pptx.layout = "LAYOUT_WIDE";

  // Title slide
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: "0B1220" };
  titleSlide.addText("Simpnify v2 Demo", {
    x: 0.6,
    y: 2.2,
    w: 12,
    h: 1,
    fontSize: 40,
    bold: true,
    color: "FFFFFF",
  });
  titleSlide.addText(`${results.filter((r) => r.ok).length} pages captured · ${new Date().toLocaleDateString()}`, {
    x: 0.6,
    y: 3.3,
    w: 12,
    h: 0.5,
    fontSize: 16,
    color: "94A3B8",
  });

  for (const item of results) {
    const slide = pptx.addSlide();
    slide.background = { color: "F8FAFC" };

    slide.addText(item.label, {
      x: 0.4,
      y: 0.2,
      w: 12.5,
      h: 0.45,
      fontSize: 18,
      bold: true,
      color: "0F172A",
    });
    slide.addText(item.route, {
      x: 0.4,
      y: 0.62,
      w: 12.5,
      h: 0.3,
      fontSize: 11,
      color: "64748B",
    });

    if (item.ok && fs.existsSync(item.filepath)) {
      slide.addImage({
        path: item.filepath,
        x: 0.35,
        y: 1.05,
        w: 12.6,
        h: 6.2,
        sizing: { type: "contain", w: 12.6, h: 6.2 },
      });
    } else {
      slide.addText(`Screenshot failed: ${item.error ?? "unknown error"}`, {
        x: 0.6,
        y: 3.5,
        w: 12,
        h: 1,
        fontSize: 16,
        color: "B91C1C",
      });
    }
  }

  await pptx.writeFile({ fileName: PPTX_PATH });

  const ok = results.filter((r) => r.ok).length;
  const failed = results.length - ok;
  console.log(`\nDone. ${ok}/${results.length} screenshots saved to ${OUT_DIR}`);
  console.log(`PowerPoint: ${PPTX_PATH}`);
  if (failed > 0) {
    console.log("Failed routes:");
    for (const item of results.filter((r) => !r.ok)) {
      console.log(`  - ${item.route}: ${item.error}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
