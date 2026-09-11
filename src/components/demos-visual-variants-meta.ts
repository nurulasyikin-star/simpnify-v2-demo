export type DemosVisualVariantId =
  | "current"
  | "split-screenshot"
  | "product-frame"
  | "thumbnail-rail"
  | "cinematic-backdrop";

export type DemosVisualVariantMeta = {
  id: DemosVisualVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
};

export const demosVisualVariants: DemosVisualVariantMeta[] = [
  {
    id: "current",
    title: "A — Current (baseline)",
    tagline:
      "Horizontal step rail with text-only detail panel — no product screenshots.",
    pros: [
      "Lightweight and fast to load",
      "Clear step progression",
      "Minimal distraction from copy",
    ],
    cons: [
      "Large empty area in the detail card",
      "Feels abstract without UI proof",
      "Hard to preview what each demo looks like",
    ],
  },
  {
    id: "split-screenshot",
    title: "B — Split screenshot panel",
    tagline:
      "Same step rail; detail card becomes a two-column layout with a live product screenshot on the right.",
    pros: [
      "Fills the dead space immediately",
      "Screenshot crossfades on step change",
      "Keeps the familiar rail interaction",
    ],
    cons: [
      "Stacks vertically on mobile",
      "Screenshot is smaller than a hero treatment",
    ],
  },
  {
    id: "product-frame",
    title: "C — Product frame spotlight",
    tagline:
      "Screenshot in the platform product frame above copy — echoes the homepage hero treatment.",
    pros: [
      "Strong product credibility",
      "Scan corners and frame feel on-brand",
      "Text panel animates in below the image",
    ],
    cons: [
      "Taller section — more scroll per step",
      "Image dominates on small screens",
    ],
  },
  {
    id: "thumbnail-rail",
    title: "D — Thumbnail step rail",
    tagline:
      "Step circles show mini UI thumbnails; selecting a step slides in a full preview panel.",
    pros: [
      "Glanceable previews for all seven demos",
      "Rail communicates content at a glance",
      "Slide-in animation adds polish without excess",
    ],
    cons: [
      "Thumbnails are small on mobile",
      "Busier rail than numbered circles",
    ],
  },
  {
    id: "cinematic-backdrop",
    title: "E — Cinematic backdrop",
    tagline:
      "Full-bleed screenshot with gradient overlay and subtle Ken Burns zoom; copy floats in a glass card.",
    pros: [
      "Most dramatic and premium feel",
      "Uses vertical space boldly",
      "Ambient motion draws attention",
    ],
    cons: [
      "Heaviest visual weight",
      "Background image can compete with text",
      "Not ideal if users need to compare steps quickly",
    ],
  },
];
