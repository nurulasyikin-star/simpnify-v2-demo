export type FooterLinksVariantId =
  | "current"
  | "sitemap-toggle"
  | "column-accordion"
  | "group-tabs"
  | "hidden";

export type FooterLinksVariantMeta = {
  id: FooterLinksVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
};

export const footerLinksVariants: FooterLinksVariantMeta[] = [
  {
    id: "current",
    title: "A — Current (all links visible)",
    tagline:
      "Production today. Product, Company and Resources columns are always expanded.",
    pros: ["Every page one click away", "No interaction needed"],
    cons: [
      "Tall, busy footer",
      "Repeats most of the header nav",
      "Uneven columns leave gaps",
    ],
  },
  {
    id: "sitemap-toggle",
    title: "B — Single “Site map” toggle",
    tagline:
      "All three columns hide behind one button. Clicking it expands the full sitemap under the brand row.",
    pros: [
      "Compact by default",
      "Full sitemap still available in one click",
      "Simplest to build",
    ],
    cons: ["Links are hidden until clicked", "Expanding adds height"],
  },
  {
    id: "column-accordion",
    title: "C — Collapsed column accordions",
    tagline:
      "Column headings stay visible with a link count. Each one opens on its own.",
    pros: [
      "Shows how the site is organised without showing every link",
      "Visitors open only the group they need",
    ],
    cons: [
      "Three separate controls",
      "Opening one makes the columns uneven",
    ],
  },
  {
    id: "group-tabs",
    title: "D — Group tabs with one inline row",
    tagline:
      "Product / Company / Resources become pills. Picking one shows its links in a single horizontal row. Nothing is open by default.",
    pros: [
      "Fixed, short height, even when open",
      "Feels interactive and modern",
    ],
    cons: [
      "Only one group visible at a time",
      "Tabs are an unusual pattern for a footer",
    ],
  },
  {
    id: "hidden",
    title: "E — Hidden entirely (minimal footer)",
    tagline:
      "The link block is removed. Brand and tagline on the left, Follow us on the right. The header handles navigation.",
    pros: ["Cleanest and shortest", "No duplication with the header"],
    cons: [
      "Deployment, Pilot scope and Reference lose their footer entry point",
    ],
  },
];
