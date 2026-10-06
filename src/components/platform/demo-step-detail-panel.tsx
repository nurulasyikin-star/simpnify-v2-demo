import type { HubCard } from "@/lib/platform/types";
import { publicAsset } from "@/lib/site-path";

import { PlatformScenarioButton } from "./scenario-button";

const STEP_PREVIEWS: Record<string, { src: string; alt: string }> = {
  "floor-plan": {
    src: "/platform/floor-plan/final-floor-plan.gif",
    alt: "Floor Plan Studio with 2D plan, 3D geometry, and device placement",
  },
};

export function formatDemoStepLabel(number: string) {
  return `Step ${parseInt(number, 10)}`;
}

export function DemoStepDetailContent({
  card,
  includeButton = true,
}: {
  card: HubCard;
  includeButton?: boolean;
}) {
  return (
    <>
      <p className="text-sm font-semibold text-secondary">
        {formatDemoStepLabel(card.number)}
      </p>
      <h3 className="mt-3 text-xl font-semibold text-secondary md:text-2xl">
        {card.title}
      </h3>
      {card.outcome ? (
        <p className="mt-2 text-base font-medium leading-7 text-white/90 md:text-lg">
          {card.outcome}
        </p>
      ) : null}
      <p className="mt-3 text-base leading-7 text-platform-muted md:text-lg">
        {card.description}
      </p>
      {includeButton && card.href ? (
        <PlatformScenarioButton href={card.href} className="mt-5" />
      ) : null}
    </>
  );
}

export function DemoStepDetailPanel({ card }: { card: HubCard }) {
  const preview = STEP_PREVIEWS[card.slug];

  return (
    <article className="platform-hub-card">
      <DemoStepDetailContent card={card} includeButton={false} />
      {preview ? (
        <div className="mt-5 overflow-hidden rounded-lg border border-white/10 bg-[#071318]">
          <img
            src={publicAsset(preview.src)}
            alt={preview.alt}
            className="mx-auto block h-auto max-h-[calc(100svh-16rem)] w-full object-contain"
          />
        </div>
      ) : null}
      {card.href ? (
        <div className={preview ? "mt-5 flex justify-end" : "mt-auto flex justify-end pt-5"}>
          <PlatformScenarioButton href={card.href} />
        </div>
      ) : null}
    </article>
  );
}
