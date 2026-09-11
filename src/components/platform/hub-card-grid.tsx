import Link from "next/link";

import { PlatformScenarioButton } from "@/components/platform/scenario-button";
import type { HubCard } from "@/lib/platform/types";

type HubCardGridProps = {
  cards: HubCard[];
  columns?: 2 | 3;
};

function HubCardItem({
  title,
  description,
  outcome,
  href,
}: HubCard) {
  const content = (
    <>
      <h3 className="text-xl font-semibold text-secondary md:text-2xl">{title}</h3>
      {outcome ? (
        <p className="mt-2 text-base font-medium leading-7 text-white/90 md:text-lg">
          {outcome}
        </p>
      ) : null}
      <p className="mt-3 flex-1 text-base leading-7 text-platform-muted md:text-lg">
        {description}
      </p>
      {href ? (
        <PlatformScenarioButton
          className="mt-5 group-hover:border-secondary/50 group-hover:bg-secondary/10 group-hover:text-secondary"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="group platform-hub-card">
        {content}
      </Link>
    );
  }

  return <article className="platform-hub-card">{content}</article>;
}

export function HubCardGrid({ cards, columns = 3 }: HubCardGridProps) {
  return (
    <ul
      className={
        columns === 2
          ? "grid gap-5 md:grid-cols-2"
          : "grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      }
    >
      {cards.map((card) => (
        <li key={card.slug}>
          <HubCardItem {...card} />
        </li>
      ))}
    </ul>
  );
}
