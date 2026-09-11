import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.join(process.cwd(), "public", "platform", "source");
const outDir = path.join(process.cwd(), "public", "platform");

function page(n) {
  return path.join(sourceDir, `page-${n}.png`);
}

/** @type {{ src: string; out: string; left: number; top: number; width: number; height: number }[]} */
const crops = [
  // Hero
  {
    src: page(1),
    out: "hero-platform-ui.webp",
    left: 1080,
    top: 380,
    width: 1420,
    height: 980,
  },
  // SOS carousel (pages 12–17)
  {
    src: page(12),
    out: "carousel/sos-01-request.webp",
    left: 180,
    top: 280,
    width: 2200,
    height: 900,
  },
  {
    src: page(13),
    out: "carousel/sos-02-control-room.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(14),
    out: "carousel/sos-03-dispatch.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(15),
    out: "carousel/sos-04-responder.webp",
    left: 180,
    top: 280,
    width: 2200,
    height: 900,
  },
  {
    src: page(16),
    out: "carousel/sos-05-team-map.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(17),
    out: "carousel/sos-06-report.webp",
    left: 180,
    top: 280,
    width: 2200,
    height: 900,
  },
  // Floor plan (pages 7–10)
  {
    src: page(7),
    out: "floor-plan/floor-01-3d.webp",
    left: 80,
    top: 290,
    width: 1960,
    height: 880,
  },
  {
    src: page(8),
    out: "floor-plan/floor-02-2d.webp",
    left: 80,
    top: 290,
    width: 1960,
    height: 880,
  },
  {
    src: page(9),
    out: "floor-plan/floor-03-split.webp",
    left: 80,
    top: 290,
    width: 1960,
    height: 880,
  },
  {
    src: page(10),
    out: "floor-plan/floor-04-edit.webp",
    left: 80,
    top: 290,
    width: 1960,
    height: 880,
  },
  // SOS settings (pages 19–23)
  {
    src: page(19),
    out: "sos-settings/sos-set-01-planner.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(20),
    out: "sos-settings/sos-set-02-presets.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(21),
    out: "sos-settings/sos-set-03-onsite.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(22),
    out: "sos-settings/sos-set-04-controls.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(23),
    out: "sos-settings/sos-set-05-revision.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  // Guided response (pages 25–29)
  {
    src: page(25),
    out: "guided-response/guide-01-start.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(26),
    out: "guided-response/guide-02-branch.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(27),
    out: "guided-response/guide-03-config.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(28),
    out: "guided-response/guide-04-evidence.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(29),
    out: "guided-response/guide-05-review.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  // Connectors (pages 30, 31, 32, 36)
  {
    src: page(30),
    out: "connectors/conn-01-flow.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(31),
    out: "connectors/conn-02-node.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(32),
    out: "connectors/conn-03-blocks.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(36),
    out: "connectors/conn-04-mqtt.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  // Platform modules
  {
    src: page(61),
    out: "modules/module-operations.webp",
    left: 80,
    top: 280,
    width: 1580,
    height: 920,
  },
  {
    src: page(62),
    out: "modules/module-assets.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(69),
    out: "modules/module-automation.webp",
    left: 80,
    top: 280,
    width: 1580,
    height: 920,
  },
  {
    src: page(46),
    out: "modules/module-intelligence.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(24),
    out: "modules/module-field.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(82),
    out: "modules/module-admin.webp",
    left: 80,
    top: 280,
    width: 1580,
    height: 920,
  },
  // Scenarios (pages 89–92)
  {
    src: page(89),
    out: "scenarios/scenario-01-perimeter.webp",
    left: 80,
    top: 320,
    width: 2400,
    height: 860,
  },
  {
    src: page(90),
    out: "scenarios/scenario-02-sos.webp",
    left: 80,
    top: 320,
    width: 2400,
    height: 860,
  },
  {
    src: page(91),
    out: "scenarios/scenario-03-restricted.webp",
    left: 80,
    top: 320,
    width: 2400,
    height: 860,
  },
  {
    src: page(92),
    out: "scenarios/scenario-04-offline.webp",
    left: 80,
    top: 320,
    width: 2400,
    height: 860,
  },
  // Architecture & gallery
  {
    src: page(85),
    out: "architecture.webp",
    left: 80,
    top: 300,
    width: 2400,
    height: 900,
  },
  {
    src: page(102),
    out: "gallery/gallery-dashboard.webp",
    left: 80,
    top: 280,
    width: 2400,
    height: 920,
  },
  {
    src: page(103),
    out: "gallery/gallery-sop.webp",
    left: 80,
    top: 280,
    width: 2400,
    height: 920,
  },
  {
    src: page(104),
    out: "gallery/gallery-org.webp",
    left: 80,
    top: 280,
    width: 2400,
    height: 920,
  },
  // Aura (pages 46–49)
  {
    src: page(46),
    out: "aura/aura-01-ask.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(47),
    out: "aura/aura-02-sources.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(48),
    out: "aura/aura-03-governance.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(49),
    out: "aura/aura-04-usecases.webp",
    left: 80,
    top: 320,
    width: 2400,
    height: 860,
  },
  // Communications (pages 51, 52, 54, 56, 58)
  {
    src: page(51),
    out: "comms/comms-01-direct.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(52),
    out: "comms/comms-02-team.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(54),
    out: "comms/comms-03-video.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(56),
    out: "comms/comms-04-group.webp",
    left: 120,
    top: 280,
    width: 2280,
    height: 900,
  },
  {
    src: page(58),
    out: "comms/comms-05-options.webp",
    left: 80,
    top: 320,
    width: 2400,
    height: 860,
  },
];

for (const crop of crops) {
  if (!fs.existsSync(crop.src)) {
    console.warn(`Skip missing: ${crop.src}`);
    continue;
  }

  const dest = path.join(outDir, crop.out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  await sharp(crop.src)
    .extract({
      left: crop.left,
      top: crop.top,
      width: crop.width,
      height: crop.height,
    })
    .webp({ quality: 85 })
    .toFile(dest);

  console.log(`Wrote ${crop.out}`);
}

console.log("Done.");
