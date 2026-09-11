import type { HubCard } from "@/lib/platform/types";

import { PlatformScenarioButton } from "./scenario-button";

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
  return (
    <article className="platform-hub-card">
      <DemoStepDetailContent card={card} includeButton={false} />
      {card.href ? (
        <div className="mt-auto flex justify-end pt-5">
          <PlatformScenarioButton href={card.href} />
        </div>
      ) : null}
    </article>
  );
}
