export type PerimeterPlaceholderVariantId =
  | "current"
  | "blurred-preview"
  | "storyboard"
  | "live-alert"
  | "branded-minimal";

export type PerimeterPlaceholderVariantMeta = {
  id: PerimeterPlaceholderVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
};

export const perimeterPlaceholderVariants: PerimeterPlaceholderVariantMeta[] = [
  {
    id: "current",
    title: "A — Current flow diagram",
    tagline: "What ships today: the scenario decision diagram, cropped by the 16:9 frame.",
    pros: ["No work needed", "Shows the decision path"],
    cons: [
      "Cropped edges look unfinished",
      "Reads as a slide, not a product — sits next to a real SOS video",
    ],
  },
  {
    id: "blurred-preview",
    title: "B — Blurred preview + coming-soon badge",
    tagline: "Dimmed product footage behind a play icon and a 'Walkthrough coming soon' pill.",
    pros: [
      "Looks like a planned release, not a gap",
      "Matches the video rhythm of the SOS row above",
      "Easiest to swap for the real video later",
    ],
    cons: ["No actual scenario content until the video lands"],
  },
  {
    id: "storyboard",
    title: "C — Four-step storyboard",
    tagline: "Detect → Verify → Respond → Record as clean cards, tagged 'Full video demo coming soon'.",
    pros: [
      "Real content now — explains the scenario on its own",
      "Reuses the existing response sequence copy",
    ],
    cons: ["Static; less cinematic than the neighbouring rows"],
  },
  {
    id: "live-alert",
    title: "D — Animated live-alert mock",
    tagline: "A fake console alert that cycles Detected → Verifying → Dispatched → Closed.",
    pros: [
      "Feels like the live product — most premium",
      "Motion holds attention like a video would",
    ],
    cons: ["Mock UI can be mistaken for a real screen", "Most code of the options"],
  },
  {
    id: "branded-minimal",
    title: "E — Branded 'in production' panel",
    tagline: "Gradient + grid texture, Simpnify mark, 'Demo in production' and a live-demo CTA.",
    pros: ["Clean and honest", "CTA turns the gap into a lead"],
    cons: ["Least informative about the scenario"],
  },
];
