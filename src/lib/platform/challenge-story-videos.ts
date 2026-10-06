import type { UseCaseVideo } from "@/lib/platform/use-case-videos";

/** Copy anchor for video-first challenge variants (screenshot / storyboard reference). */
export const CHALLENGE_NARRATIVE_COPY = {
  eyebrow: "THE CUSTOMER CHALLENGE",
  title: "The expensive gap is between systems",
  hook: "A sensor knows. A camera sees. A person responds. Who connects the story?",
  closing:
    "A unified response connects the signal, location, people, procedure and record.",
} as const;

/** Stand-in for a dedicated “gap between systems” reel until a final asset exists. */
export const CHALLENGE_NARRATIVE_REEL: UseCaseVideo = {
  id: "gap-narrative",
  youtubeId: "NyQjZzcMe4A",
  startAt: 6,
  title: "Who connects the story?",
  description:
    "Target 60–90s: three siloed UIs → one incident thread on Simpnify. VO walks the hook line, then lands on unified close.",
};

/** Three chapter clips mapped to the three cards — demo placeholders from existing demos. */
export const CHALLENGE_CHAPTER_VIDEOS: UseCaseVideo[] = [
  {
    id: "fragmented-context",
    youtubeId: "v-M35pY_fbw",
    title: "01 — Fragmented context",
    description:
      "Video beat: alarm on one screen, VMS on another, radio log elsewhere — operator rebuilds manually.",
  },
  {
    id: "unclear-ownership",
    youtubeId: "1XSWAFwvKcM",
    title: "02 — Unclear ownership",
    description:
      "Video beat: handoff between control room and field — tasks unclear, status stuck “in progress”.",
  },
  {
    id: "inconsistent-evidence",
    youtubeId: "2Gt_yoyk_-U",
    title: "03 — Inconsistent evidence",
    description:
      "Video beat: shift change; investigation re-opens exports because nothing was tied to the incident record.",
  },
];

export type ChallengeStoryboardBeat = {
  id: string;
  cardTitle: string;
  duration: string;
  shots: string[];
  vo: string;
  video: UseCaseVideo;
};

export const CHALLENGE_STORYBOARD_BEATS: ChallengeStoryboardBeat[] = [
  {
    id: "beat-01",
    cardTitle: "Fragmented context",
    duration: "0:00 – 0:28",
    shots: [
      "Wide: control room, three monitors with unrelated UIs",
      "Insert: cursor alt-tabs; sticky note “check access log”",
      "Push in: operator on phone — “which camera?”",
    ],
    vo: "A sensor knows. But the story lives in five places.",
    video: CHALLENGE_CHAPTER_VIDEOS[0],
  },
  {
    id: "beat-02",
    cardTitle: "Unclear ownership",
    duration: "0:28 – 0:52",
    shots: [
      "Split: dispatch assigns; field marks “acknowledged”",
      "UI: two open tasks, same incident ID",
      "Hold: nobody closes the loop",
    ],
    vo: "A person responds. Who owns what’s still open?",
    video: CHALLENGE_CHAPTER_VIDEOS[1],
  },
  {
    id: "beat-03",
    cardTitle: "Inconsistent evidence",
    duration: "0:52 – 1:20",
    shots: [
      "Clock wipe: end of shift",
      "Empty timeline export vs Simpnify timeline populated",
      "Tag: signal, map, people, procedure, record",
    ],
    vo: "Who connects the story — so the next shift doesn’t start over?",
    video: CHALLENGE_CHAPTER_VIDEOS[2],
  },
];
