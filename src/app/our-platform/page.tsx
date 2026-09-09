import { PlatformHero } from "@/components/platform-hero";

type OurPlatformPageProps = {
  searchParams: Promise<{ v?: string }>;
};

export default async function OurPlatformPage({
  searchParams,
}: OurPlatformPageProps) {
  const params = await searchParams;
  const version = params.v === "1" ? "1" : "2";

  return (
    <main>
      <PlatformHero version={version} />
      <section className="border-t border-white/10 bg-[#0a0a0c] px-6 py-16 md:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-sm font-semibold text-[#9398ff]">
            Demo · Version {version}
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-white">
            {version === "2"
              ? "Our Platform — redesign preview"
              : "Our Platform — current reference"}
          </h2>
          <p className="max-w-3xl text-base leading-7 text-[#8a8a92]">
            {version === "2"
              ? "This is the V2 demo shell. More sections (challenges, solution, demo CTA) can be added on this branch for review."
              : "Version 1 mirrors the current live intro layout. Switch to Version 2 in the header dropdown to preview the redesign direction."}
          </p>
        </div>
      </section>
    </main>
  );
}
