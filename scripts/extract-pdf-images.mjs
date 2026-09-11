import fs from "node:fs";
import path from "node:path";
import { getDocument, OPS } from "pdfjs-dist/legacy/build/pdf.mjs";

const pdfPath =
  process.argv[2] ??
  "C:\\Users\\syiki\\Downloads\\Ventionex Unified Intelligent Platform brochure - r1d.pdf";
const outDir =
  process.argv[3] ??
  path.join(process.cwd(), "public", "platform", "source");

fs.mkdirSync(outDir, { recursive: true });

const data = new Uint8Array(fs.readFileSync(pdfPath));
const pdf = await getDocument({ data, useSystemFonts: true }).promise;

console.log(`Pages: ${pdf.numPages}`);

let imageIndex = 0;

for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
  const page = await pdf.getPage(pageNum);
  const ops = await page.getOperatorList();

  for (let i = 0; i < ops.fnArray.length; i++) {
    if (ops.fnArray[i] !== OPS.paintImageXObject) continue;

    const imageName = ops.argsArray[i][0];
    const img = await page.objs.get(imageName);

    if (!img?.data) continue;

    const meta = {
      pageNum,
      width: img.width,
      height: img.height,
      kind: img.kind,
      index: imageIndex,
    };

    const base = `page${pageNum}-img${imageIndex}`;
    fs.writeFileSync(path.join(outDir, `${base}.json`), JSON.stringify(meta, null, 2));
    fs.writeFileSync(path.join(outDir, `${base}.raw`), Buffer.from(img.data));

    console.log(JSON.stringify(meta));
    imageIndex++;
  }
}

console.log(`Extracted ${imageIndex} images to ${outDir}`);
