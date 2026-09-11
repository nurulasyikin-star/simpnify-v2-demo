"use client";

import { useState } from "react";
import { Play } from "lucide-react";

import {
  type UseCaseVideo,
  youtubeEmbedSrc,
  youtubeThumbnail,
} from "@/lib/platform/use-case-videos";

type YoutubeEmbedProps = {
  video: UseCaseVideo;
  className?: string;
  title?: string;
};

export function YoutubeEmbed({ video, className = "", title }: YoutubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const label = title ?? video.title;

  if (playing) {
    return (
      <div className={`relative aspect-video overflow-hidden rounded-xl bg-[#0d1418] ${className}`}>
        <iframe
          src={youtubeEmbedSrc(video)}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={`group relative aspect-video w-full overflow-hidden rounded-xl bg-[#0d1418] ${className}`}
      aria-label={`Play video: ${label}`}
    >
      <img
        src={youtubeThumbnail(video)}
        alt=""
        className="absolute inset-0 size-full object-cover opacity-80 transition group-hover:opacity-100"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-[#071318]/80 via-transparent to-transparent" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex size-14 items-center justify-center rounded-full border border-white/20 bg-secondary/90 text-[#071318] shadow-lg transition group-hover:scale-105">
          <Play className="size-6 fill-current" aria-hidden />
        </span>
      </span>
      <span className="absolute bottom-0 left-0 right-0 px-4 pb-4 text-left">
        <span className="text-sm font-semibold text-white">{label}</span>
      </span>
    </button>
  );
}
