import { PlatformScenarioButton } from "@/components/platform/scenario-button";
import { YoutubeEmbed } from "@/components/use-cases/youtube-embed";
import { siteVisibility } from "@/config/site-visibility";
import { HUB_SOLUTION_CARDS } from "@/lib/platform";
import { USE_CASE_VIDEOS, type UseCaseVideo } from "@/lib/platform/use-case-videos";

function videoForSlug(slug: string): UseCaseVideo | undefined {
  return USE_CASE_VIDEOS.find((v) => v.scenarioSlug === slug);
}

export function UseCasesHubContent() {
  const overview = USE_CASE_VIDEOS[0];
  const showVideos = siteVisibility.showUseCaseYouTubeVideos;

  return (
    <>
      {showVideos ? (
        <div className="mb-12 platform-product-frame">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Watch first
          </p>
          <YoutubeEmbed video={overview} />
          <p className="mt-3 text-center text-sm text-platform-muted">
            {overview.description}
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-6">
        {HUB_SOLUTION_CARDS.map((card) => {
          const video = showVideos ? videoForSlug(card.slug) : undefined;
          return (
            <article
              key={card.slug}
              className={`grid gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6 ${
                video ? "md:grid-cols-2 md:items-center" : ""
              }`}
            >
              <div>
                <h3 className="text-xl font-semibold text-secondary md:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-platform-muted md:text-lg">
                  {card.description}
                </p>
                {card.href ? (
                  <PlatformScenarioButton href={card.href} className="mt-5" />
                ) : null}
              </div>
              {video ? (
                <YoutubeEmbed video={video} className="md:max-w-none" />
              ) : null}
            </article>
          );
        })}
      </div>
    </>
  );
}
