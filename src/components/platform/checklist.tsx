import type { ChecklistItem } from "@/lib/platform/types";
import { Check } from "lucide-react";

type PlatformChecklistProps = {
  items: ChecklistItem[];
  columns?: 2 | 3;
};

export function PlatformChecklist({
  items,
  columns = 2,
}: PlatformChecklistProps) {
  return (
    <ul
      className={
        columns === 3
          ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          : "grid gap-4 md:grid-cols-2"
      }
    >
      {items.map(({ title, description }) => (
        <li key={title} className="platform-glass-card flex gap-4">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary"
            aria-hidden
          >
            <Check className="size-4" strokeWidth={2.5} />
          </span>
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-platform-muted">
              {description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
