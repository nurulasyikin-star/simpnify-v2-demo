export type ContactCtaVariantId =
  | "current"
  | "split-ledger"
  | "office-row"
  | "country-tabs"
  | "direct-table";

export type ContactCtaVariantMeta = {
  id: ContactCtaVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
};

export const contactCtaVariants: ContactCtaVariantMeta[] = [
  {
    id: "current",
    title: "A — Current (CTA only)",
    tagline:
      "Production today. Headline and two buttons; offices live on /contact.",
    pros: ["Cleanest close to the page", "One clear action"],
    cons: [
      "Visitor has to click through to find a phone number",
      "Big empty band on the right at desktop width",
    ],
  },
  {
    id: "split-ledger",
    title: "B — Split: CTA left, offices right",
    tagline:
      "Headline keeps the left column; the four offices sit in a 2×2 hairline grid on the right, filling the empty side.",
    pros: [
      "Uses the dead right-hand space",
      "CTA and contact details read as one block",
      "Still feels like the Gotham section, not a new page",
    ],
    cons: [
      "Addresses get narrow at mid widths",
      "Fax lines dropped to stay compact",
    ],
  },
  {
    id: "office-row",
    title: "C — CTA on top, four offices in a row",
    tagline:
      "Current CTA stays as-is. Below a rule, the offices run as four columns split by hairlines, with a general-enquiry strip at the bottom.",
    pros: [
      "Least change to the existing CTA",
      "Every office shows full detail, including fax",
      "Reads like a closing directory",
    ],
    cons: ["Adds the most height", "Four columns stack to one on mobile"],
  },
  {
    id: "country-tabs",
    title: "D — Country tabs",
    tagline:
      "CTA left. On the right, pick Malaysia / Singapore / UAE / Vietnam and one office shows at a time with large type.",
    pros: [
      "Smallest footprint with full detail",
      "Bigger, more legible phone numbers",
      "Interactive without leaving the page",
    ],
    cons: [
      "Only one office visible at once",
      "Extra click to compare locations",
    ],
  },
  {
    id: "direct-table",
    title: "E — Direct line table",
    tagline:
      "Buttons replaced by the enquiry email as the main action. Offices listed as table rows: country, address, phone.",
    pros: [
      "Fastest path to a human — email and phone up front",
      "Very scannable, matches the section's editorial tone",
    ],
    cons: [
      "Loses the 'Get started' button weight",
      "Table feel is more utilitarian",
    ],
  },
];
