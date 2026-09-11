import type { HubCard } from "./types";

export type DemoCardImage = {
  src: string;
  alt: string;
};

export const DEMO_CARD_IMAGES: Record<string, DemoCardImage> = {
  "floor-plan": {
    src: "/platform/floor-plan/floor-01-3d.webp",
    alt: "Floor Plan Studio 3D view of industrial building",
  },
  sos: {
    src: "/platform/carousel/sos-01-request.webp",
    alt: "SOS request form with location and situation description",
  },
  "sos-settings": {
    src: "/platform/sos-settings/sos-set-01-planner.webp",
    alt: "SOS settings visual dispatch radius planner",
  },
  "guided-response": {
    src: "/platform/guided-response/guide-01-start.webp",
    alt: "Guide Builder start screen with samples",
  },
  connectors: {
    src: "/platform/connectors/conn-01-flow.webp",
    alt: "Connector Flow canvas overview",
  },
  aura: {
    src: "/platform/aura/aura-01-ask.webp",
    alt: "Aura workspace answering an operator question",
  },
  communications: {
    src: "/platform/comms/comms-01-direct.webp",
    alt: "Direct messages between control room and responder",
  },
};

export function getDemoCardImage(card: HubCard): DemoCardImage {
  return (
    DEMO_CARD_IMAGES[card.slug] ?? {
      src: "/platform/hero-platform-ui.webp",
      alt: `${card.title} product screenshot`,
    }
  );
}
