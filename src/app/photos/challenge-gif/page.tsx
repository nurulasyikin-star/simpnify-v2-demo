import type { Metadata } from "next";

import { publicAsset } from "@/lib/site-path";

export const metadata: Metadata = {
  title: "Customer challenge GIF — draft review",
  robots: { index: false, follow: false },
};

export default function ChallengeGifReviewPage() {
  return (
    <main
      id="main-content"
      className="flex-1 bg-[var(--platform-surface)] px-4 pb-20 pt-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold text-white">Draft narrative GIF</h1>
        <p className="mt-3 text-sm leading-7 text-platform-muted">
          Review-only assembly: AI flow presenter interstitials (workflow builder
          visual + VO text) alternating with b-roll clips. Not wired to production.
          Rebuild with{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5">
            npm run render:challenge-gif
          </code>
          . Set{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5">
            CHALLENGE_GIF_USE_YOUTUBE=1
          </code>{" "}
          to pull demo YouTube segments instead of local hero mp4.
        </p>
        <div className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-black">
          {/* basePath-aware — plain /review/... 404s under GitHub Pages export */}
          <img
            src={publicAsset("/review/customer-challenge-narrative-review.gif")}
            alt="Draft customer challenge narrative GIF"
            width={960}
            height={540}
            className="w-full"
            decoding="async"
          />
        </div>
        <p className="mt-4 text-center text-sm text-platform-subtle">
          Direct file:{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5">
            public/review/customer-challenge-narrative-review.gif
          </code>
        </p>
      </div>
    </main>
  );
}
