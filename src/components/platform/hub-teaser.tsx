import Link from "next/link";

import { PlatformSectionHeader } from "@/components/platform-section-header";
import type { HubCard } from "@/lib/platform/types";

import { HubCardGrid } from "./hub-card-grid";

type HubTeaserSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  cards: HubCard[];
  viewAllHref: string;
  viewAllLabel: string;
  columns?: 2 | 3;
};

export function HubTeaserSection({
  id,
  eyebrow,
  title,
  description,
  cards,
  viewAllHref,
  viewAllLabel,
  columns = 3,
}: HubTeaserSectionProps) {
  return (
    <section
      id={id}
      className="border-t border-white/10 bg-black px-6 py-16 md:px-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <PlatformSectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <Link
            href={viewAllHref}
            className="shrink-0 platform-btn-secondary self-start md:self-auto"
          >
            {viewAllLabel}
          </Link>
        </div>
        <div className="mt-12">
          <HubCardGrid cards={cards} columns={columns} />
        </div>
      </div>
    </section>
  );
}
