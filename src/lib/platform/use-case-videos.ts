export type UseCaseVideo = {
  id: string;
  youtubeId: string;
  /** Seconds into the video (optional). */
  startAt?: number;
  title: string;
  description: string;
  /** Maps to hub card slug when applicable. */
  scenarioSlug?: string;
};

/** Five YouTube demos for the Use Cases hub — supplied for design review. */
export const USE_CASE_VIDEOS: UseCaseVideo[] = [
  {
    id: "overview",
    youtubeId: "NyQjZzcMe4A",
    startAt: 6,
    title: "Platform overview",
    description:
      "A quick tour of how teams coordinate incidents, devices and field response in one place.",
  },
  {
    id: "perimeter",
    youtubeId: "v-M35pY_fbw",
    title: "Perimeter intrusion",
    description: "Fence alarm during a night shift — verify, respond, record.",
    scenarioSlug: "perimeter-intrusion",
  },
  {
    id: "sos",
    youtubeId: "1XSWAFwvKcM",
    title: "Responder SOS",
    description: "Field worker requests urgent help with full team visibility.",
    scenarioSlug: "responder-sos",
  },
  {
    id: "restricted",
    youtubeId: "7CJiZCZpnmw",
    title: "Restricted area",
    description: "Door event near a sensitive asset needs a quick decision.",
    scenarioSlug: "restricted-area",
  },
  {
    id: "offline",
    youtubeId: "2Gt_yoyk_-U",
    title: "Field offline",
    description:
      "Temporary network interruption — retain work, sync and confirm.",
    scenarioSlug: "field-offline",
  },
];

export function youtubeEmbedSrc(video: UseCaseVideo) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  });
  if (video.startAt) params.set("start", String(video.startAt));
  return `https://www.youtube-nocookie.com/embed/${video.youtubeId}?${params}`;
}

export function youtubeThumbnail(video: UseCaseVideo) {
  return `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
}
