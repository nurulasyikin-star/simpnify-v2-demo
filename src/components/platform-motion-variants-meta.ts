import type { GothamMode } from "@/components/landing-gotham-scroll";

export type PlatformMotionVariantId =
  | "current"
  | "smooth"
  | "sized"
  | "smooth-sized"
  | "calm";

export type PlatformMotionVariantMeta = {
  id: PlatformMotionVariantId;
  title: string;
  tagline: string;
  mode: GothamMode;
  pros: string[];
  cons: string[];
};

export const platformMotionVariants: PlatformMotionVariantMeta[] = [
  {
    id: "current",
    title: "A — Current (baseline)",
    tagline:
      "Exactly what ships on /our-platform today: full-bleed films, clip-path zooms driven by React state, drifting headlines, every video playing at once.",
    mode: {},
    pros: [
      "Cinematic, edge-to-edge picture",
      "No change to learn or sign off",
    ],
    cons: [
      "Opening and map films are 1024px wide, stretched to about 2× on a desktop screen",
      "Clip-path zoom repaints the whole video every frame, so it stutters",
      "Every video keeps decoding off screen, and the headline words wobble on scroll",
    ],
  },
  {
    id: "smooth",
    title: "B — Smooth motion + remastered films",
    tagline:
      "Same sections, still full-bleed. Zooms ease on the GPU, videos pause off screen, headlines stop drifting — and the opening, map and floor-plan films are remastered: GIF dither removed, 10/12fps → 30fps, 1920px.",
    mode: { smooth: true, hd: true },
    pros: [
      "Answers both “animation not smooth” and “pixelated”",
      "Keeps edge-to-edge picture (no black bars)",
      "Films themselves now play at 30fps instead of 10fps",
    ],
    cons: [
      "Remaster cleans and sharpens, but can’t invent detail the 1024px sources never had",
      "Zoomed-in map is still a little soft (the map screenshot itself is 1024px)",
      "Aura reveal is a scale and slant rather than the exact trapezoid cut",
    ],
  },
  {
    id: "sized",
    title: "C — Sized to the source",
    tagline:
      "Same motion as today, but no picture is drawn more than ~15% past its real size. Soft films sit centred on black; the opening film fades out at the edges.",
    mode: { sized: true },
    pros: [
      "Directly answers “gambar pixelated”",
      "Sharp films (Aura, patrol, SOS, fire) are unaffected",
    ],
    cons: [
      "Black space around the map and floor-plan films on big screens",
      "Motion still stutters like today",
    ],
  },
  {
    id: "smooth-sized",
    title: "D — Smooth + sized (recommended)",
    tagline:
      "B and C together: eased GPU zooms, paused off-screen video, still headlines, and pictures held near their real size.",
    mode: { smooth: true, sized: true },
    pros: [
      "Fixes both of Adib’s points",
      "Keeps the cinematic scroll story and all sections",
    ],
    cons: [
      "Letterboxing on wide screens until the films are re-exported at 1920px",
    ],
  },
  {
    id: "calm",
    title: "E — Calm reveals",
    tagline:
      "All content kept, but the three tall scroll-scrubbed sections become normal-height cards that rise in once. Smooth and sized rules apply.",
    mode: { smooth: true, sized: true, calm: true },
    pros: [
      "Smoothest option: nothing is tied to the scroll position",
      "Shorter page, quicker to reach use cases and contact",
    ],
    cons: [
      "Loses the big full-screen zoom moments",
      "Feels more like a product page than a film",
    ],
  },
];

export function getPlatformMotionVariant(id: string) {
  return platformMotionVariants.find((variant) => variant.id === id);
}
