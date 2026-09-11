import Image from "next/image";

import { cn } from "@/lib/utils";
import type { ImageFeature } from "@/lib/platform/types";

type PlatformImageFeatureProps = {
  feature: ImageFeature;
  reverse?: boolean;
};

export function PlatformImageFeature({
  feature,
  reverse = false,
}: PlatformImageFeatureProps) {
  const { eyebrow, title, description, points, image, alt } = feature;

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div className={cn(reverse ? "lg:order-2" : "lg:order-1")}>
        <p className="text-sm font-semibold tracking-wide text-secondary">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
          {title}
        </h3>
        {description ? (
          <p className="mt-4 text-base leading-7 text-platform-muted">
            {description}
          </p>
        ) : null}
        <ul className="mt-6 space-y-3">
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-sm leading-6 text-platform-muted"
            >
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary"
                aria-hidden
              />
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className={cn(reverse ? "lg:order-1" : "lg:order-2")}>
        <div className="platform-product-frame relative w-full animate-in fade-in zoom-in-95 fill-mode-both duration-700">
          <div className="aspect-[3/2] overflow-hidden rounded-lg bg-[#0d1418]">
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
