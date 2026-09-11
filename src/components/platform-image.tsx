"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { publicAsset } from "@/lib/site-path";
import { cn } from "@/lib/utils";

type PlatformImageProps = ImageProps & {
  fallbackClassName?: string;
};

function ImageFallback({
  alt,
  className,
  fill,
}: {
  alt: string;
  className?: string;
  fill?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-[#0d1418] text-center text-xs text-platform-muted",
        fill ? "absolute inset-0" : "min-h-24 w-full rounded-lg",
        className,
      )}
      role="img"
      aria-label={alt}
    >
      <span className="max-w-[16rem] px-4 leading-5">
        Preview unavailable
      </span>
    </div>
  );
}

export function PlatformImage({
  src,
  alt,
  className,
  fallbackClassName,
  fill,
  onError,
  ...props
}: PlatformImageProps) {
  const [failed, setFailed] = useState(false);
  const label = typeof alt === "string" ? alt : "Image";

  if (failed || !src) {
    return (
      <ImageFallback alt={label} className={fallbackClassName} fill={fill} />
    );
  }

  const resolvedSrc =
    typeof src === "string" && src.startsWith("/") && !src.startsWith("http")
      ? publicAsset(src)
      : src;

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      className={className}
      fill={fill}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
      {...props}
    />
  );
}
