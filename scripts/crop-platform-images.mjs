import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.join(process.cwd(), "public", "platform", "source");
const outDir = path.join(process.cwd(), "public", "platform");

const page1 = path.join(sourceDir, "page-1.png");
const page2 = path.join(sourceDir, "page-2.png");

const crops = [
  {
    src: page1,
    out: "capabilities/ai-agent.webp",
    left: 24,
    top: 52,
    width: 360,
    height: 290,
  },
  {
    src: page1,
    out: "capabilities/unified-systems.webp",
    left: 430,
    top: 130,
    width: 460,
    height: 200,
  },
  {
    src: page1,
    out: "capabilities/workflow-builder.webp",
    left: 1130,
    top: 52,
    width: 520,
    height: 300,
  },
  {
    src: page1,
    out: "capabilities/alarm-rules.webp",
    left: 24,
    top: 790,
    width: 340,
    height: 270,
  },
  {
    src: page1,
    out: "capabilities/digital-twin.webp",
    left: 390,
    top: 790,
    width: 390,
    height: 270,
  },
  {
    src: page1,
    out: "capabilities/analytics.webp",
    left: 800,
    top: 790,
    width: 390,
    height: 270,
  },
  {
    src: page1,
    out: "hero-platform-ui.webp",
    left: 1110,
    top: 400,
    width: 560,
    height: 520,
  },
  {
    src: page2,
    out: "hero-architecture.webp",
    left: 30,
    top: 210,
    width: 1020,
    height: 680,
  },
];

for (const crop of crops) {
  const dest = path.join(outDir, crop.out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  await sharp(crop.src)
    .extract({
      left: crop.left,
      top: crop.top,
      width: crop.width,
      height: crop.height,
    })
    .webp({ quality: 82 })
    .toFile(dest);

  console.log(`Wrote ${crop.out}`);
}
