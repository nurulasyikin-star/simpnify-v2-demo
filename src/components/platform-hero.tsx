import { cn } from "@/lib/utils";

type PlatformHeroProps = {
  version: "1" | "2";
};

export function PlatformHero({ version }: PlatformHeroProps) {
  const isV2 = version === "2";

  return (
    <section className="bg-black px-6 py-12 md:px-16 md:py-16">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex gap-7">
          <div className="relative w-0.5 shrink-0 bg-[#5a5a5f]">
            <div className="absolute top-0 h-16 w-0.5 bg-white" />
          </div>
          <div className="space-y-5">
            <p className="text-sm tracking-wide text-[#8a8a92]">INTRO</p>
            <h1 className="text-5xl font-normal text-white md:text-6xl">
              Simpnify
            </h1>
            {isV2 ? (
              <p className="text-lg font-medium text-[#9398ff]">
                See the site. Coordinate the response.
              </p>
            ) : null}
            <p className="max-w-xl text-base leading-7 text-white/90 md:text-lg">
              Simpnify is an unified threats and risks management software
              platform that integrate physical security, safety and cyber
              security systems and functions, to enable collaboration and
              interoperability for enterprise-wide risks and threats handling.
            </p>
            {isV2 ? (
              <button
                type="button"
                className="rounded-full bg-gradient-to-b from-[#f5f6f8] to-[#dbdee3] px-6 py-3 text-sm font-semibold text-[#1e1e22]"
              >
                Watch Demo
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div
            className={cn(
              "w-full rounded-2xl border border-white/10 bg-[#141418] p-3 shadow-2xl",
              isV2 ? "ring-1 ring-[#b8c7f2]/30" : "",
            )}
          >
            <div className="aspect-video overflow-hidden rounded-lg bg-[#0d0d10]">
              <div className="flex h-full">
                <div className="w-12 bg-[#0a0a0c]" />
                <div className="flex flex-1 flex-col">
                  <div className="relative flex-1 bg-[#1a1f24]">
                    <div className="absolute left-1/3 top-1/4 h-24 w-40 rounded-full border-2 border-green-400/70 bg-green-500/20" />
                    <p className="absolute inset-0 flex items-center justify-center text-sm text-white/70">
                      {isV2
                        ? "Simpnify — Fire Alarm Handling (V2)"
                        : "Simpnify — Fire Alarm Handling Screenshot"}
                    </p>
                  </div>
                  <div className="h-20 bg-[#111114]" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-0 h-3 w-28 rounded bg-[#2e2e33]" />
        </div>
      </div>
    </section>
  );
}
