import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type PlatformScenarioButtonProps = {
  href?: string;
  children?: React.ReactNode;
  className?: string;
};

export function PlatformScenarioButton({
  href,
  children = "Open scenario",
  className,
}: PlatformScenarioButtonProps) {
  const classes = cn(
    "platform-btn-secondary group inline-flex items-center gap-2 text-base transition hover:border-secondary/50 hover:bg-secondary/10 hover:text-secondary md:text-lg",
    className,
  );

  const content = (
    <>
      {children}
      <ArrowRight
        className="size-5 transition group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
        aria-hidden
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <span className={classes}>{content}</span>;
}
