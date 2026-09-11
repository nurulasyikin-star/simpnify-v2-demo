import fs from "node:fs";
import path from "node:path";
import { createCanvas } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const pdfPath =
  process.argv[2] ??
  "C:\\Users\\syiki\\Downloads\\Ventionex Unified Intelligent Platform brochure - r1d.pdf";
const outDir =
  process.argv[3] ?? path.join(process.cwd(), "public", "platform", "source");

fs.mkdirSync(outDir, { recursive: true });

const data = new Uint8Array(fs.readFileSync(pdfPath));
const pdf = await getDocument({ data, useSystemFonts: true }).promise;

const scale = 2;

for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
  const page = await pdf.getPage(pageNum);
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(viewport.width, viewport.height);
  const context = canvas.getContext("2d");

  await page.render({ canvasContext: context, viewport }).promise;

  const png = canvas.toBuffer("image/png");
  const outPath = path.join(outDir, `page-${pageNum}.png`);
  fs.writeFileSync(outPath, png);
  console.log(`Wrote ${outPath} (${viewport.width}x${viewport.height})`);
}
