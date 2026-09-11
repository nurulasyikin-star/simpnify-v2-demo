import { Plus } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqListProps = {
  items: FaqItem[];
};

export function FaqList({ items }: FaqListProps) {
  return (
    <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-[#0c1a22]/60">
      {items.map(({ question, answer }) => (
        <details key={question} className="group px-6 py-5">
          <summary
            className="cursor-pointer list-none rounded-md text-base font-semibold text-white outline-none marker:content-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--platform-surface-raised)] [&::-webkit-details-marker]:hidden"
          >
            <span className="flex items-center justify-between gap-4">
              <span className="min-w-0 flex-1 pr-2">{question}</span>
              <span
                className="flex size-5 shrink-0 items-center justify-center text-secondary transition-transform duration-200 group-open:rotate-45"
                aria-hidden
              >
                <Plus className="size-4" strokeWidth={2.5} />
              </span>
            </span>
          </summary>
          <p className="mt-4 text-sm leading-7 text-platform-muted">{answer}</p>
        </details>
      ))}
    </div>
  );
}
