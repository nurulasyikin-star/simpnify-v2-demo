import type { PipelineStep } from "@/lib/platform/types";

type StepPipelineProps = {
  steps: PipelineStep[];
  columns?: 3 | 4;
};

export function StepPipeline({ steps, columns = 4 }: StepPipelineProps) {
  const gridClass =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <ol className={`grid gap-5 ${gridClass}`}>
      {steps.map(({ step, label, description }) => (
        <li key={step} className="platform-glass-card">
          <div className="flex items-center gap-3">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10 text-xs font-semibold text-secondary"
            >
              {step}
            </span>
            <h3 className="text-lg font-semibold text-white">{label}</h3>
          </div>
          <p className="mt-3 text-sm leading-6 text-platform-muted">
            {description}
          </p>
        </li>
      ))}
    </ol>
  );
}
