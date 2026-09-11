export type FeatureCarouselVariantId =
  | "current"
  | "overlay-stage"
  | "vertical-steps"
  | "image-first"
  | "filmstrip";

export type FeatureCarouselVariantMeta = {
  id: FeatureCarouselVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
};

export const featureCarouselVariants: FeatureCarouselVariantMeta[] = [
  {
    id: "current",
    title: "A — Current (baseline)",
    tagline:
      "Left copy card, prev/next + dots, screenshot stage, and a second row of step cards — three ways to change steps.",
    pros: [
      "Familiar pattern already used on every demo page",
      "Step titles stay visible in the bottom row",
      "Progress bar makes sequence explicit",
    ],
    cons: [
      "Arrows, dots, and step cards all do the same job",
      "Copy card is short; empty space sits beside the tall screenshot",
      "Screenshot is cropped (object-cover) inside a fixed frame",
    ],
  },
  {
    id: "overlay-stage",
    title: "B — Overlay stage",
    tagline:
      "One product frame: screenshot fills the stage, copy sits in a glass card on the image, bottom step cards are the only secondary nav.",
    pros: [
      "Kills the empty left column",
      "Copy and UI stay in one visual unit",
      "Drops the redundant dots",
    ],
    cons: [
      "Glass card covers part of the product UI",
      "Harder to read copy on busy screenshots",
    ],
  },
  {
    id: "vertical-steps",
    title: "C — Vertical step list",
    tagline:
      "Numbered vertical step indicator on the left (progress rail + filled past nodes); screenshot + caption on the right.",
    pros: [
      "Left rail earns full height with clear past / active / upcoming states",
      "Single navigation model — scan the list, see the UI",
      "Active step expands its description in place",
    ],
    cons: [
      "Five-step demos make a denser list",
      "Stacks to screenshot-then-list on mobile",
    ],
  },
  {
    id: "image-first",
    title: "D — Image-first cinema",
    tagline:
      "Full-width screenshot with object-contain so the UI isn’t cropped; compact caption bar and a thin numbered rail underneath.",
    pros: [
      "Gives the product UI the most room",
      "No cropped chrome or clipped captions",
      "Caption bar is one line of nav, not a second card grid",
    ],
    cons: [
      "Letterboxing on odd aspect ratios",
      "Less “card” structure than the rest of the site",
    ],
  },
  {
    id: "filmstrip",
    title: "E — Thumbnail filmstrip",
    tagline:
      "Large screenshot, caption + arrows under it, and a filmstrip of real UI thumbnails instead of text-only step cards.",
    pros: [
      "Thumbnails preview the actual screens",
      "Removes abstract numbered cards",
      "Feels like a product tour, not a slide deck",
    ],
    cons: [
      "Thumbnails need enough contrast to read at small size",
      "Titles are secondary to the pictures",
    ],
  },
];
