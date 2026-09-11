export type AboutPledgeVariantId =
  | "current"
  | "tab-selector"
  | "icon-hover-lift"
  | "timeline-rail"
  | "spotlight-strip";

export type AboutPledgeVariantMeta = {
  id: AboutPledgeVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
};

export const aboutPledgeVariants: AboutPledgeVariantMeta[] = [
  {
    id: "current",
    title: "A — Current (baseline)",
    tagline:
      "Three equal static cards — flat copy blocks with no interaction or visual hierarchy.",
    pros: [
      "Simple and scannable",
      "All three messages visible at once",
      "Matches existing hub-card pattern",
    ],
    cons: [
      "Feels passive on a client-facing page",
      "Dense text with no focal point",
      "No motion or affordance to explore",
    ],
  },
  {
    id: "tab-selector",
    title: "B — Tab selector panel",
    tagline:
      "Pill tabs switch the active pledge; selected card expands with accent bar and larger type.",
    pros: [
      "Clear interaction model — click to focus",
      "Reduces visual noise by highlighting one at a time",
      "Smooth crossfade feels polished in demos",
    ],
    cons: [
      "Only one pledge fully visible at a time",
      "Requires a click to read all three",
    ],
  },
  {
    id: "icon-hover-lift",
    title: "C — Icon hover lift",
    tagline:
      "Numbered cards with icons — hover/tap lifts the card, glows the border and elevates the title.",
    pros: [
      "All three visible; interaction is discoverable on hover",
      "Icons add confidence and quick recognition",
      "Subtle lift reads premium without being flashy",
    ],
    cons: [
      "Hover states less obvious on touch devices",
      "Still three similar blocks side by side",
    ],
  },
  {
    id: "timeline-rail",
    title: "D — Timeline rail",
    tagline:
      "Connected signal-line nodes tell an operational story; click a node to reveal its pledge below.",
    pros: [
      "Narrative flow — vision → mission → quality",
      "Echoes product walkthrough patterns on the site",
      "Strong for live client presentations",
    ],
    cons: [
      "Taller layout with content below the rail",
      "Two-step read (node, then panel)",
    ],
  },
  {
    id: "spotlight-strip",
    title: "E — Spotlight expand strip",
    tagline:
      "Horizontal accordion — hover or click expands one card while others compress; bold headlines.",
    pros: [
      "Most confident, presentation-ready feel",
      "Dynamic width draws the eye to active pledge",
      "Works as a memorable “hero moment” on About",
    ],
    cons: [
      "Compressed cards hide full copy until expanded",
      "Can feel busy if all three are hovered quickly",
    ],
  },
];
