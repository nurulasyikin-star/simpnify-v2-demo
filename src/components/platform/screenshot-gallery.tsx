"use client";

import { PlatformImage } from "@/components/platform-image";
import Link from "next/link";
import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { ScreenshotGalleryItem } from "@/lib/platform";
import { cn } from "@/lib/utils";

type ScreenshotGalleryProps = {
  items: ScreenshotGalleryItem[];
};

function GalleryCardContent({
  item,
  caption = "Synthetic records · product UI",
}: {
  item: ScreenshotGalleryItem;
  caption?: string;
}) {
  return (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
        <PlatformImage
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
      <p className="mt-3 text-sm font-medium text-white">{item.title}</p>
      <p className="text-xs text-platform-subtle">{item.caption ?? caption}</p>
    </>
  );
}

export function ScreenshotGallery({ items }: ScreenshotGalleryProps) {
  const [preview, setPreview] = useState<ScreenshotGalleryItem | null>(null);

  const closePreview = useCallback(() => setPreview(null), []);

  useEffect(() => {
    if (!preview) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closePreview();
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closePreview, preview]);

  return (
    <>
      <ul className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((item) => {
          const cardClassName = cn(
            "platform-product-frame group block w-full text-left transition hover:border-secondary/40",
            item.href ? "cursor-pointer" : "cursor-zoom-in",
          );

          if (item.href) {
            return (
              <li key={item.src}>
                <Link href={item.href} className={cardClassName}>
                  <GalleryCardContent item={item} />
                </Link>
              </li>
            );
          }

          return (
            <li key={item.src}>
              <button
                type="button"
                className={cardClassName}
                aria-label={`View full size: ${item.title}`}
                onClick={() => setPreview(item)}
              >
                <GalleryCardContent item={item} />
              </button>
            </li>
          );
        })}
      </ul>

      {preview ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={preview.title}
          onClick={closePreview}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/60 p-2 text-white transition hover:border-secondary/40 hover:text-secondary"
            aria-label="Close image preview"
            onClick={closePreview}
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative max-h-[90vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0c1a22]">
              <PlatformImage
                src={preview.src}
                alt={preview.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <p className="mt-4 text-center text-sm font-medium text-white">
              {preview.title}
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
