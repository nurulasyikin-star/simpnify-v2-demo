import Image from "next/image";

import { PLATFORM_INTRO } from "@/lib/platform";

export function PlatformIntro() {
  const { eyebrow, title, description, image, alt } = PLATFORM_INTRO;

  return (
    <section className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold tracking-wide text-secondary">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-platform-muted md:text-lg">
            {description}
          </p>
        </div>

        <div className="platform-product-frame relative w-full animate-in fade-in zoom-in-95 fill-mode-both duration-700">
          <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#0d1418]">
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
    </section>
  );
}
