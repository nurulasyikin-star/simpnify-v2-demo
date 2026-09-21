import { PlatformImage } from "@/components/platform-image";

import { PLATFORM_INTRO, PLATFORM_SOLUTION } from "@/lib/platform";

import { PlatformSectionHeader } from "./platform-section-header";

/** Merged variant: one “what & why” block instead of separate Intro + Solution. */
export function PlatformIntroSolution() {
  const { title, description, image, alt } = PLATFORM_INTRO;
  const { images } = PLATFORM_SOLUTION;

  return (
    <section className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow="THE PLATFORM"
          title={title}
          description={description}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="platform-product-frame relative w-full lg:col-span-1">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#0d1418]">
              <div className="relative h-full w-full">
                <PlatformImage
                  src={image}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
          {images.map(({ src, alt: imageAlt }) => (
            <div key={src} className="platform-product-frame relative w-full">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#0d1418]">
                <div className="relative h-full w-full">
                  <PlatformImage
                    src={src}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
