import { PlatformIntroAnimatedHeadline } from "@/components/platform-intro-animated-headline";

import { PLATFORM_INTRO } from "@/lib/platform";

export function PlatformIntro() {
  const { title, description } = PLATFORM_INTRO;

  return (
    <section className="border-t border-white/10 bg-[var(--platform-surface)] px-6 py-20 md:px-16 md:py-28">
      <div className="mx-auto w-full max-w-7xl text-center">
        <PlatformIntroAnimatedHeadline text={title} className="w-full text-center" />
        {description ? (
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-platform-muted md:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
