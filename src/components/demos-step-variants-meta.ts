export type DemosStepVariantId =
  | "current"
  | "horizontal-rail"
  | "vertical-timeline"
  | "pill-strip"
  | "split-master-detail";

export type DemosStepVariantMeta = {
  id: DemosStepVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
};

export const demosStepVariants: DemosStepVariantMeta[] = [
  {
    id: "current",
    title: "A — Current (baseline)",
    tagline:
      "Two-column card grid — all seven demos visible at once with Open links.",
    pros: [
      "Everything scannable in one view",
      "No interaction required",
      "Familiar hub card pattern",
    ],
    cons: [
      "No sense of sequence or workflow order",
      "Seven cards create a long scroll",
      "Harder to tell a guided tour story",
    ],
  },
  {
    id: "horizontal-rail",
    title: "B — Horizontal step rail",
    tagline:
      "Numbered steps on a connected rail; one detail panel below updates on click.",
    pros: [
      "Clear 01→07 progression",
      "Compact vertical footprint",
      "Echoes incident lifecycle steppers elsewhere on site",
    ],
    cons: [
      "Only one demo visible at a time",
      "Seven steps crowd the rail on mobile",
    ],
  },
  {
    id: "vertical-timeline",
    title: "C — Vertical timeline",
    tagline:
      "Left rail with status dots and labels; selected step expands in a panel on the right.",
    pros: [
      "Timeline reads naturally top-to-bottom",
      "Step list stays visible while browsing",
      "Strong operator-workflow metaphor",
    ],
    cons: [
      "Two-column layout stacks awkwardly on small screens",
      "More complex than a simple grid",
    ],
  },
  {
    id: "pill-strip",
    title: "D — Pill strip + prev/next",
    tagline:
      "Scrollable numbered pills with chevron navigation and a single spotlight card.",
    pros: [
      "Mobile-friendly horizontal pill scroll",
      "Prev/next supports linear walkthrough",
      "Focused one-demo-at-a-time reading",
    ],
    cons: [
      "Pills truncate titles on narrow screens",
      "Extra clicks to compare two demos",
    ],
  },
  {
    id: "split-master-detail",
    title: "E — Split master-detail",
    tagline:
      "Compact step list on the left; full card detail and CTA on the right.",
    pros: [
      "Best of both: list scan + rich detail",
      "Desktop feels like a product tour shell",
      "Active row stays highlighted in the list",
    ],
    cons: [
      "Left list is dense with seven items",
      "Less impactful on mobile when stacked",
    ],
  },
];
