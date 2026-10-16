import { createElement, type ComponentType } from "react";

import { PlatformIntro } from "@/components/platform-intro";
import { PlatformStatBar } from "@/components/platform/stat-bar";
import { OurPlatformUseCaseLed } from "@/components/v2-content-variants";
import { primaryNav } from "@/config/site-nav";
import { COMPANY_STATS } from "@/lib/platform";
import { publicAsset } from "@/lib/site-path";

export type LandingStoryVariantId =
  | "current"
  | "chapter-scroll"
  | "cinema-bands"
  | "chapter-index"
  | "two-films";

export type LockupMode = "row" | "stack-logo" | "stack-type";

export type LandingStoryVariantMeta = {
  id: LandingStoryVariantId;
  title: string;
  tagline: string;
  pros: string[];
  cons: string[];
  beats: string[];
};

export const landingStoryVariants: LandingStoryVariantMeta[] = [
  {
    id: "current",
    title: "A — Current homepage",
    tagline:
      "What ships on /our-platform today: horizontal lockup, camera-collage hero, then the live stats, challenge and use-case stories.",
    pros: [
      "Exact page a visitor gets now",
      "Safe baseline if the scroll story waits",
    ],
    cons: [
      "First image is the camera collage",
      "“by Ventionex” sits beside the wordmark at a similar size",
      "GIS, floor plan, mobile and Aura never take a full screen",
      "No Fire demo in the use-case row",
    ],
    beats: [
      "Landing image: camera collage GIF",
      "Logo: side by side",
      "GIS / floor / mobile / Aura: inside later cards",
      "Use cases: story write-ups",
    ],
  },
  {
    id: "chapter-scroll",
    title: "B — Full-page chapter scroll",
    tagline:
      "Her list, one viewport at a time. Dashboard opens the page. Ventionex sits small under the wordmark, in the Avigilon stack.",
    pros: [
      "Closest reading of “just scroll”",
      "GIS is a full-page Digital Twins map",
      "SOS, perimeter and fire each get a film",
      "Logo ratio matches the sample she sent",
    ],
    cons: [
      "Longest page — six screens, then three use-case films",
      "Dashboard UI is cropped to fill the first screen",
      "Fire is still a stand-in until that demo is filmed",
    ],
    beats: [
      "Landing image: Simpnify dashboard, full screen",
      "Then the 10+ / 4 / 2 bar and Unified Risk Management Platform",
      "Logo: wordmark, small Ventionex logo underneath",
      "GIS, floor plan, mobile, Aura: each a full page",
      "Use cases: three stacked films",
    ],
  },
  {
    id: "cinema-bands",
    title: "C — GIS cinema, then bands",
    tagline:
      "Dashboard stays short enough to read the console. Only GIS goes full screen. Floor plan, mobile and Aura are bands. The three demos share one row.",
    pros: [
      "GIS gets the full-page treatment she called out",
      "Dashboard screenshot stays legible",
      "Shorter than a page of identical full screens",
      "“by Ventionex” is a small caption, like the Motorola line",
    ],
    cons: [
      "Floor plan and mobile are quieter than GIS",
      "Ventionex logo mark is replaced by words",
      "Use-case videos are tiles, so each one is smaller",
    ],
    beats: [
      "Landing image: dashboard, half screen",
      "Then the 10+ / 4 / 2 bar and Unified Risk Management Platform",
      "Logo: “by Ventionex” as small type",
      "GIS: full-page Digital Twins map",
      "Floor, mobile, Aura: split bands",
      "Use cases: one row of three",
    ],
  },
  {
    id: "chapter-index",
    title: "D — Sticky chapter index",
    tagline:
      "The same six items, with her list pinned as an index so a long scroll still has a map. Stacked Ventionex mark, same ratio as B.",
    pros: [
      "Her checklist is visible while you scroll",
      "Every item still has its own tall chapter",
      "Easy to jump to Fire, Aura or GIS in a meeting",
    ],
    cons: [
      "Index plus tall chapters is a lot of chrome",
      "Chapters start to feel like the same frame repeated",
      "Sticky bar only earns its place on this long version",
    ],
    beats: [
      "Landing image: dashboard",
      "Then the 10+ / 4 / 2 bar and Unified Risk Management Platform",
      "Logo: small Ventionex logo under the wordmark",
      "Index: Landing, GIS, Floor plan, Mobile, Aura, Use cases",
      "Use cases: three players in the last chapter",
    ],
  },
  {
    id: "two-films",
    title: "E — Two films and a reel",
    tagline:
      "Two full-screen films — GIS, then Aura advising — with floor plan and mobile sharing one response band, and the three demos as one reel.",
    pros: [
      "Cinema where she asked for it: GIS and the Aura advice video",
      "Mobile is framed as how the site responds, next to the floor plan",
      "SOS, perimeter and fire stay on one screen",
      "Shortest of the new scrolls",
    ],
    cons: [
      "Floor plan and mobile share the band",
      "Each use-case video is a column, not its own page",
      "Less literal if she wants every bullet full screen",
    ],
    beats: [
      "Landing image: dashboard",
      "Then the 10+ / 4 / 2 bar and Unified Risk Management Platform",
      "Logo: small “by Ventionex” line",
      "GIS: full-page Digital Twins map",
      "Floor + mobile: one band",
      "Aura: full-page advice film",
      "Use cases: three beats in one reel",
    ],
  },
];

const MEDIA = {
  dashboard: publicAsset("/platform/landing-story/dashboard-dark.png"),
  gis: publicAsset("/platform/landing-story/digital-twins-map.gif"),
  floor: publicAsset("/platform/floor-plan/final-floor-plan.gif"),
  mobile: publicAsset("/platform/our-platform-site/solution-mobile.png"),
  aura: publicAsset("/platform/aura/aura-01-ask.webp"),
  sos: publicAsset("/platform/scenarios/final-SOS.mp4"),
  perimeter: publicAsset("/platform/scenarios/scenario-01-perimeter.webp"),
  fire: publicAsset("/platform/our-platform-site/digital-twin.png"),
  mark: publicAsset("/simpnify-mark.png"),
  wordmark: publicAsset("/simpnify-wordmark.png"),
  ventionex: publicAsset("/ventionex-logo.png"),
};

const AI_LINE = "AI-driven site superiority";

function BrandLockup({ mode }: { mode: LockupMode }) {
  if (mode === "row") {
    return (
      <span className="flex items-center gap-2.5">
        <img src={MEDIA.mark} alt="" className="h-9 w-9" />
        <img src={MEDIA.wordmark} alt="Simpnify" className="h-11 w-auto" />
        <span className="flex items-center gap-2">
          <span className="text-2xl leading-none text-platform-muted">by</span>
          <img
            src={MEDIA.ventionex}
            alt="Ventionex"
            className="h-8 w-auto mix-blend-screen"
          />
        </span>
      </span>
    );
  }

  if (mode === "stack-logo") {
    return (
      <span className="flex flex-col items-center leading-none">
        <span className="flex items-center gap-2">
          <img src={MEDIA.mark} alt="" className="h-8 w-8" />
          <img src={MEDIA.wordmark} alt="Simpnify" className="h-10 w-auto" />
        </span>
        <span className="mt-1 flex items-center gap-1.5">
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
            by
          </span>
          <img
            src={MEDIA.ventionex}
            alt="Ventionex"
            className="h-3.5 w-auto mix-blend-screen"
          />
        </span>
      </span>
    );
  }

  return (
    <span className="flex flex-col items-center leading-none">
      <span className="flex items-center gap-2">
        <img src={MEDIA.mark} alt="" className="h-8 w-8" />
        <img src={MEDIA.wordmark} alt="Simpnify" className="h-11 w-auto" />
      </span>
      <span className="mt-1 text-[11px] font-medium tracking-[0.16em] text-white/55">
        by Ventionex
      </span>
    </span>
  );
}

function PreviewHeader({ mode }: { mode: LockupMode }) {
  return (
    <div className="flex h-16 items-center justify-between border-b border-white/5 bg-[var(--platform-surface)] px-4 sm:px-6">
      <BrandLockup mode={mode} />
      <ul className="hidden items-center gap-6 text-sm text-white/80 lg:flex">
        {primaryNav.map((item) => (
          <li key={item.href}>{item.label}</li>
        ))}
      </ul>
    </div>
  );
}

function LandingProof() {
  return (
    <>
      <PlatformStatBar stats={COMPANY_STATS} />
      <PlatformIntro />
    </>
  );
}

function DashboardHero({
  tall,
  kicker = "Main landing",
  title = "The site, on one console",
  body = "Cameras, map, alarms and the people on shift — the Simpnify dashboard, full frame.",
}: {
  tall?: boolean;
  kicker?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section
      className={`relative flex items-end overflow-hidden bg-black ${
        tall ? "min-h-[72vh]" : "min-h-[46vh]"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="dashboard-live absolute inset-[-6%]">
          <img
            src={MEDIA.dashboard}
            alt="Simpnify operator dashboard with incident counts and device health"
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div
          className="dashboard-live-sweep pointer-events-none absolute inset-x-0 top-0 h-36"
          aria-hidden
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
      <div className="relative z-10 max-w-3xl px-6 py-12 md:px-12 md:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          {kicker}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
          {title}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 md:text-base">
          {body}
        </p>
      </div>
    </section>
  );
}

function Film({
  id,
  eyebrow,
  title,
  body,
  src,
  video,
  fit = "cover",
  tall = true,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  src: string;
  video?: boolean;
  fit?: "cover" | "contain";
  tall?: boolean;
}) {
  const fitClass =
    fit === "contain"
      ? "object-contain p-6 md:p-10"
      : "object-cover";

  return (
    <section
      id={id}
      className={`relative flex scroll-mt-24 items-start overflow-hidden border-t border-white/10 bg-[#071014] ${
        tall ? "min-h-[70vh]" : "min-h-[52vh]"
      }`}
    >
      {video ? (
        <video
          src={src}
          controls
          playsInline
          preload="metadata"
          className={`absolute inset-0 h-full w-full ${fitClass}`}
        />
      ) : (
        <img
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full ${fitClass}`}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/35 to-transparent" />
      <div className="relative z-10 max-w-3xl px-6 pb-28 pt-12 md:px-12 md:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
          {title}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 md:text-base">
          {body}
        </p>
      </div>
    </section>
  );
}

function SplitBand({
  id,
  eyebrow,
  title,
  body,
  src,
  flip,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  src: string;
  flip?: boolean;
}) {
  return (
    <section
      id={id}
      className="grid scroll-mt-24 border-t border-white/10 bg-black md:grid-cols-2"
    >
      <div
        className={`relative min-h-[320px] bg-[#0d1418] ${
          flip ? "md:order-2" : ""
        }`}
      >
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-contain p-4"
        />
      </div>
      <div className="flex flex-col justify-center px-6 py-12 md:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white">{title}</h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-platform-muted md:text-base">
          {body}
        </p>
      </div>
    </section>
  );
}

const gisCopy = {
  eyebrow: "GIS / System Explorer",
  title: "The whole site, moving",
  body: "Nurul is on station in Kuala Lumpur, then Amir in Johor Bahru.",
};

const floorCopy = {
  eyebrow: "Floor plan",
  title: "The building is the picture",
  body: "Rooms, stairs and devices in the same geometry the control room and the field are both looking at.",
};

const mobileCopy = {
  eyebrow: "Mobile apps",
  title: "How the site responds",
  body: "The alarm leaves the console and lands on the phone. The officer sees the place, the task and what to send back.",
};

const auraCopy = {
  eyebrow: AI_LINE,
  title: "Aura gives the advice",
  body: "Ask what happened. Inspect the source. The next move stays on the incident.",
};

function ResponseDuo() {
  const panels = [
    { ...floorCopy, src: MEDIA.floor },
    { ...mobileCopy, src: MEDIA.mobile },
  ];

  return (
    <section className="grid border-t border-white/10 bg-black md:grid-cols-2">
      {panels.map((panel) => (
        <article
          key={panel.title}
          className="flex flex-col border-white/10 md:border-r md:last:border-r-0"
        >
          <div className="relative min-h-[340px] bg-[#0d1418]">
            <img
              src={panel.src}
              alt=""
              className="absolute inset-0 h-full w-full object-contain p-6"
            />
          </div>
          <div className="px-6 py-8 md:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              {panel.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              {panel.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-platform-muted">
              {panel.body}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}

function UseCaseMedia({
  title,
  detail,
  src,
  video,
  standIn,
}: {
  title: string;
  detail: string;
  src: string;
  video?: boolean;
  standIn?: boolean;
}) {
  return (
    <article className="flex min-h-[280px] flex-col overflow-hidden border border-white/10 bg-[#071014]">
      <div className="relative min-h-[220px] flex-1 bg-black">
        {video ? (
          <video
            src={src}
            controls
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <img
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {standIn ? (
          <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-secondary">
            Stand-in still
          </span>
        ) : null}
      </div>
      <div className="border-t border-white/10 px-4 py-4">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-5 text-platform-muted">{detail}</p>
      </div>
    </article>
  );
}

function UseCaseRow({
  id,
  layout,
}: {
  id?: string;
  layout: "stack" | "tiles" | "reel";
}) {
  const items = [
    {
      title: "SOS",
      detail: "Field request, dispatch, and the team on the map.",
      src: MEDIA.sos,
      video: true,
    },
    {
      title: "Perimeter intrusion",
      detail: "Fence alarm on a night shift — verify, respond, record.",
      src: MEDIA.perimeter,
    },
    {
      title: "Fire",
      detail: "Demo not filmed yet. This still holds the slot.",
      src: MEDIA.fire,
      standIn: true,
    },
  ];

  if (layout === "stack") {
    return (
      <>
        {items.map((item) => (
          <Film
            key={item.title}
            eyebrow="Use cases"
            title={item.title}
            body={item.detail}
            src={item.src}
            video={item.video}
            fit="cover"
            tall={false}
          />
        ))}
      </>
    );
  }

  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-white/10 bg-[var(--platform-surface)] px-6 py-14 md:px-12"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
        Use cases
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
        {layout === "reel" ? "Three beats, one reel" : "Demo videos"}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-platform-muted">
        SOS, perimeter intrusion, and fire — the three films at the end of the
        scroll.
      </p>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <UseCaseMedia key={item.title} {...item} />
        ))}
      </div>
    </section>
  );
}

function ChapterNav({ prefix }: { prefix: string }) {
  const items = [
    ["landing", "Landing"],
    ["gis", "GIS"],
    ["floor", "Floor plan"],
    ["mobile", "Mobile"],
    ["aura", "Aura"],
    ["cases", "Use cases"],
  ];

  return (
    <nav
      aria-label="Chapter index"
      className="sticky top-0 z-20 flex gap-2 overflow-x-auto border-b border-white/10 bg-[#0a1218]/95 px-4 py-3 backdrop-blur"
    >
      {items.map(([key, label]) => (
        <a
          key={key}
          href={`#${prefix}-${key}`}
          className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80 hover:border-secondary/50 hover:text-secondary"
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

function StoryChapters({
  prefix,
  gisTall = true,
  auraAsFilm = true,
  floorAsFilm = true,
  mobileAsFilm = true,
}: {
  prefix?: string;
  gisTall?: boolean;
  auraAsFilm?: boolean;
  floorAsFilm?: boolean;
  mobileAsFilm?: boolean;
}) {
  const anchor = (key: string) => (prefix ? `${prefix}-${key}` : undefined);

  return (
    <>
      <Film
        id={anchor("gis")}
        {...gisCopy}
        src={MEDIA.gis}
        fit="contain"
        tall={gisTall}
      />
      {floorAsFilm ? (
        <Film
          id={anchor("floor")}
          {...floorCopy}
          src={MEDIA.floor}
          fit="contain"
        />
      ) : (
        <SplitBand id={anchor("floor")} {...floorCopy} src={MEDIA.floor} />
      )}
      {mobileAsFilm ? (
        <Film
          id={anchor("mobile")}
          {...mobileCopy}
          src={MEDIA.mobile}
          fit="contain"
        />
      ) : (
        <SplitBand
          id={anchor("mobile")}
          {...mobileCopy}
          src={MEDIA.mobile}
          flip
        />
      )}
      {auraAsFilm ? (
        <Film id={anchor("aura")} {...auraCopy} src={MEDIA.aura} fit="contain" />
      ) : (
        <SplitBand id={anchor("aura")} {...auraCopy} src={MEDIA.aura} />
      )}
    </>
  );
}

export function LandingStoryVariantCurrent() {
  return (
    <div className="bg-[var(--platform-surface)]">
      <PreviewHeader mode="row" />
      <OurPlatformUseCaseLed />
    </div>
  );
}

export function LandingStoryVariantChapterScroll() {
  return (
    <div className="bg-[var(--platform-surface)]">
      <PreviewHeader mode="stack-logo" />
      <DashboardHero tall />
      <LandingProof />
      <StoryChapters />
      <UseCaseRow layout="stack" />
    </div>
  );
}

export function LandingStoryVariantCinemaBands() {
  return (
    <div className="bg-[var(--platform-surface)]">
      <PreviewHeader mode="stack-type" />
      <DashboardHero />
      <LandingProof />
      <StoryChapters
        gisTall
        floorAsFilm={false}
        mobileAsFilm={false}
        auraAsFilm={false}
      />
      <UseCaseRow layout="tiles" />
    </div>
  );
}

export function LandingStoryVariantChapterIndex() {
  const prefix = "chapter-index";

  return (
    <div className="bg-[var(--platform-surface)]">
      <PreviewHeader mode="stack-logo" />
      <ChapterNav prefix={prefix} />
      <div id={`${prefix}-landing`} className="scroll-mt-24">
        <DashboardHero tall />
        <LandingProof />
      </div>
      <StoryChapters prefix={prefix} />
      <UseCaseRow id={`${prefix}-cases`} layout="tiles" />
    </div>
  );
}

export function LandingStoryVariantTwoFilms() {
  return (
    <div className="bg-[var(--platform-surface)]">
      <PreviewHeader mode="stack-type" />
      <DashboardHero
        title="Run the site from one picture"
        body="Dashboard first. Then the scroll: the map, the building, the phone, Aura’s advice, and the three demos."
      />
      <LandingProof />
      <Film {...gisCopy} src={MEDIA.gis} fit="contain" />
      <ResponseDuo />
      <Film {...auraCopy} src={MEDIA.aura} fit="contain" />
      <UseCaseRow layout="reel" />
    </div>
  );
}

const map: Record<LandingStoryVariantId, ComponentType> = {
  current: LandingStoryVariantCurrent,
  "chapter-scroll": LandingStoryVariantChapterScroll,
  "cinema-bands": LandingStoryVariantCinemaBands,
  "chapter-index": LandingStoryVariantChapterIndex,
  "two-films": LandingStoryVariantTwoFilms,
};

export function LandingStoryVariant({ id }: { id: LandingStoryVariantId }) {
  return createElement(map[id]);
}
