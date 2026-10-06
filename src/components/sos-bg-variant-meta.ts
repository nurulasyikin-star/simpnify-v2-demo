export type SosBgVariantId =
  | "current"
  | "network-globe"
  | "signal-field"
  | "radar-sweep"
  | "aurora-grid";

export type SosBgVariantMeta = {
  id: SosBgVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
};

export const sosBgVariants: SosBgVariantMeta[] = [
  {
    id: "current",
    title: "A — Current black",
    tagline: "Solid black behind the recording. This is what Our Platform shows now.",
    pros: [
      "The dashboard stays fully sharp",
      "Nothing else moves behind the clip",
    ],
    cons: [
      "Wide black bands sit on both sides of the browser window",
      "The empty area does not carry the network story",
    ],
  },
  {
    id: "network-globe",
    title: "B — Network globe",
    tagline:
      "The existing network-globe GIF shows through the black bands. Light panels in the recording stay on top.",
    pros: [
      "Same globe-and-devices picture already used in the SOS story",
      "Fills the empty sides without a second layout",
    ],
    cons: [
      "Dark browser chrome softens where it meets the GIF",
      "The GIF is tall, so a wide frame crops the top and bottom",
    ],
  },
  {
    id: "signal-field",
    title: "C — Signal field",
    tagline:
      "The signal field fills the card. The recording sits on top of it, fully opaque.",
    pros: [
      "The dashboard stays sharp because it is not blended into the field",
      "The node network stays visible in the space around the clip",
    ],
    cons: [
      "Black that is part of the recording still covers the field inside the video frame",
      "Motion is continuous, so it never fully rests",
    ],
  },
  {
    id: "radar-sweep",
    title: "D — Radar sweep",
    tagline:
      "Faint rings and one slow sweep, like a control-room display behind the clip.",
    pros: [
      "Low contrast, so the recording stays the subject",
      "Feels operational rather than decorative",
    ],
    cons: [
      "The sweep can pull the eye as it crosses the frame",
      "Less specific to the SOS globe story than B or C",
    ],
  },
  {
    id: "aurora-grid",
    title: "E — Aurora grid",
    tagline:
      "A faint moving teal wash over a still grid. The quietest of the motion options.",
    pros: [
      "Grid suggests a map without competing imagery",
      "Motion is slow enough to ignore while the clip plays",
    ],
    cons: [
      "Can read as a generic dark gradient",
      "Dark UI edges still take on a slight tint",
    ],
  },
];
