import { cn } from "@/lib/utils";

type PlatformSectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
};

const TITLE_CLASSES = {
  h1: "mt-2 text-4xl font-semibold text-white md:text-5xl",
  h2: "mt-2 text-3xl font-semibold text-white md:text-4xl",
  h3: "mt-2 text-xl font-semibold text-white md:text-2xl",
} as const;

export function PlatformSectionHeader({
  eyebrow,
  title,
  description,
  className,
  titleAs = "h2",
}: PlatformSectionHeaderProps) {
  const TitleTag = titleAs;

  return (
    <div className={className}>
      <p className="text-sm font-semibold tracking-wide text-secondary">
        {eyebrow}
      </p>
      <TitleTag className={cn(TITLE_CLASSES[titleAs])}>{title}</TitleTag>
      {description ? (
        <p className="mt-4 max-w-3xl text-base leading-7 text-platform-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
