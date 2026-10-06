"use client";

import { useState } from "react";
import { Film } from "lucide-react";

import { YoutubeEmbed } from "@/components/use-cases/youtube-embed";
import {
  CHALLENGE_CHAPTER_VIDEOS,
  CHALLENGE_NARRATIVE_REEL,
  CHALLENGE_STORYBOARD_BEATS,
  type ChallengeStoryboardBeat,
} from "@/lib/platform/challenge-story-videos";

export function ChallengeNarrativeReelEmbed({ className = "" }: { className?: string }) {
  return (
    <YoutubeEmbed
      video={CHALLENGE_NARRATIVE_REEL}
      title={CHALLENGE_NARRATIVE_REEL.title}
      className={className}
    />
  );
}

export function ChallengeChapterTabbedPlayer() {
  const [activeId, setActiveId] = useState(CHALLENGE_CHAPTER_VIDEOS[0]?.id ?? "");
  const active =
    CHALLENGE_CHAPTER_VIDEOS.find((v) => v.id === activeId) ?? CHALLENGE_CHAPTER_VIDEOS[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,260px)_1fr]">
      <ul className="flex flex-col gap-2" role="tablist" aria-label="Challenge chapter videos">
        {CHALLENGE_CHAPTER_VIDEOS.map((video) => {
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
        {active ? <YoutubeEmbed video={active} title={active.title} /> : null}
      </div>
    </div>
  );
}

export function ChallengeSplitSyncPlayer() {
  const [activeBeat, setActiveBeat] = useState(0);
  const beat = CHALLENGE_STORYBOARD_BEATS[activeBeat];

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <div className="platform-product-frame lg:sticky lg:top-4">
        {beat ? (
          <YoutubeEmbed video={beat.video} title={beat.cardTitle} />
        ) : null}
        <p className="mt-3 flex items-center gap-2 text-xs text-platform-subtle">
          <Film className="size-3.5 shrink-0" aria-hidden />
          Placeholder clip — final edit follows shot list at right
        </p>
      </div>
      <ol className="space-y-3">
        {CHALLENGE_STORYBOARD_BEATS.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setActiveBeat(index)}
              className={`platform-glass-card w-full text-left transition ${
                index === activeBeat ? "ring-1 ring-secondary/40" : ""
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-semibold text-white">{item.cardTitle}</p>
                <span className="text-xs font-medium text-secondary">{item.duration}</span>
              </div>
              <p className="mt-2 text-xs italic leading-5 text-platform-muted">
                VO: “{item.vo}”
              </p>
              <ul className="mt-3 space-y-1 text-xs leading-5 text-platform-muted">
                {item.shots.map((shot) => (
                  <li key={shot}>• {shot}</li>
                ))}
              </ul>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ChallengeStoryboardGrid() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {CHALLENGE_STORYBOARD_BEATS.map((beat) => (
        <StoryboardPanel key={beat.id} beat={beat} />
      ))}
    </ul>
  );
}

function StoryboardPanel({ beat }: { beat: ChallengeStoryboardBeat }) {
  return (
    <li className="platform-glass-card flex flex-col p-0 overflow-hidden">
      <div className="border-b border-white/10 bg-white/[0.03] px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
          {beat.duration}
        </p>
        <p className="mt-1 text-sm font-semibold text-white">{beat.cardTitle}</p>
      </div>
      <YoutubeEmbed video={beat.video} title={beat.cardTitle} className="rounded-none" />
      <div className="flex flex-1 flex-col px-4 py-4">
        <p className="text-xs font-semibold text-white">Shot list</p>
        <ul className="mt-2 flex-1 space-y-1 text-xs leading-5 text-platform-muted">
          {beat.shots.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-5 text-platform-muted">
          <span className="font-semibold text-white/90">VO:</span> {beat.vo}
        </p>
      </div>
    </li>
  );
}
