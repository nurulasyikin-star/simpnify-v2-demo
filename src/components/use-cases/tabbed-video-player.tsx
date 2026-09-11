"use client";

import { useState } from "react";

import { YoutubeEmbed } from "@/components/use-cases/youtube-embed";
import { USE_CASE_VIDEOS, type UseCaseVideo } from "@/lib/platform/use-case-videos";

export function TabbedVideoPlayer({ videos = USE_CASE_VIDEOS }: { videos?: UseCaseVideo[] }) {
  const [activeId, setActiveId] = useState(videos[0]?.id ?? "");

  const active = videos.find((v) => v.id === activeId) ?? videos[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,280px)_1fr]">
      <ul className="flex flex-col gap-2" role="tablist" aria-label="Use case videos">
        {videos.map((video) => {
          const selected = video.id === active?.id;
          return (
            <li key={video.id}>
              <button
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(video.id)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                  selected
                    ? "border-secondary/50 bg-secondary/10"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                <p className="text-sm font-semibold text-white">{video.title}</p>
                <p className="mt-1 text-xs leading-5 text-platform-muted">
                  {video.description}
                </p>
              </button>
            </li>
          );
        })}
      </ul>

      <div role="tabpanel" className="platform-product-frame">
        {active ? <YoutubeEmbed video={active} /> : null}
        {active ? (
          <p className="mt-3 text-center text-xs text-platform-subtle">
            {active.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
