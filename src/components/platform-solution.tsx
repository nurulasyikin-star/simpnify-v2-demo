import { PlatformImage } from "@/components/platform-image";

import { PLATFORM_SOLUTION } from "@/lib/platform";

import { PlatformSectionHeader } from "./platform-section-header";

export function PlatformSolution() {
  const { eyebrow, title, description, images } = PLATFORM_SOLUTION;

  return (
    <section className="border-t border-white/10 bg-black px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <PlatformSectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {images.map(({ src, alt }) => (
            <div
              key={src}
              className="platform-product-frame relative w-full animate-in fade-in zoom-in-95 fill-mode-both duration-700"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#0d1418]">
                <div className="relative h-full w-full">
                  <PlatformImage
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
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
