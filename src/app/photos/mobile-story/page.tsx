import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { LocationCheckIn } from "@/components/location-check-in";

export const metadata: Metadata = {
  title: "Mobile story — Simpnify",
  description: "One officer's shift across Briefings, Today, Location and Guidance, redesigned on the native layout.",
  robots: { index: false, follow: false },
};

const PURPLE = "linear-gradient(135deg, #5b4dff 0%, #2b2a6b 100%)";
const TEAL = "linear-gradient(135deg, #1aa6a6 0%, #1e4f8f 100%)";

/* ---------- native shell, laid out like the supplied screens ---------- */
function Screen({
  title,
  back,
  nav,
  sos = true,
  online = true,
  banner,
  sheet,
  children,
}: {
  title?: string;
  back?: boolean;
  nav?: boolean;
  sos?: boolean;
  online?: boolean;
  banner?: ReactNode;
  sheet?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="w-[280px] shrink-0 rounded-[2.2rem] border border-black/40 bg-black p-[9px] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
      <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-[1.75rem] bg-[#f4f5fa] text-[#1c2434]">
        <div className="absolute left-1/2 top-2 z-20 h-[16px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
        <div className="px-4 pb-3 pt-3 text-white" style={{ background: PURPLE }}>
          <div className="flex justify-between text-[10px] font-semibold text-white/80">
            <span>9:41</span>
            <span>5G</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {back ? (
                <span className="text-lg leading-none">‹</span>
              ) : (
                <span className="grid h-6 w-6 place-items-center rounded-md bg-white/20 text-[11px] font-bold">S</span>
              )}
              {title ? <span className="text-[14px] font-semibold">{title}</span> : null}
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold">
              <span className={`h-2.5 w-2.5 rounded-full ${online ? "bg-[#3ddc84]" : "bg-[#ff4d6a]"}`} />
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
        {banner}
        <div className="flex flex-1 flex-col gap-2.5 px-3 pb-4 pt-3">{children}</div>
        {sheet ? (
          <div className="absolute inset-0 z-30 flex flex-col justify-end bg-black/45">
            <div className="rounded-t-3xl bg-white px-5 pb-6 pt-3 text-center shadow-[0_-12px_40px_rgba(0,0,0,0.25)]">
              <span className="mx-auto mb-4 block h-1 w-10 rounded-full bg-black/15" />
              {sheet}
            </div>
          </div>
        ) : null}
        {sos ? (
          <span className="absolute bottom-3 left-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-[#e5334b] text-[11px] font-bold text-white shadow-lg" style={nav ? { bottom: 56 } : undefined}>
            SOS
          </span>
        ) : null}
        {nav ? (
          <div className="grid grid-cols-3 border-t border-black/10 bg-white py-2 text-center text-[10px] text-[#8b93a7]">
            <span className="font-semibold text-[#5b4dff]">Today</span>
            <span>Map</span>
            <span>User</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Hero({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div className="rounded-2xl p-3.5 text-white" style={{ background: TEAL }}>
      <p className="text-[10px] font-bold tracking-[0.2em] text-white/80">{label}</p>
      <p className="mt-0.5 text-[22px] font-bold leading-6">{title}</p>
      {sub ? <p className="mt-1 text-[11px] leading-4 text-white/85">{sub}</p> : null}
    </div>
  );
}

type Tone = "ok" | "warn" | "bad" | "info";
function Tag({ children, tone = "ok" }: { children: ReactNode; tone?: Tone }) {
  const dot = { ok: "bg-[#22a85a]", warn: "bg-[#f0a81c]", bad: "bg-[#e5334b]", info: "bg-[#5b4dff]" }[tone];
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-medium shadow-sm">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}

function Tags({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-1.5">{children}</div>;
}

function Card({ children, tint }: { children: ReactNode; tint?: "mint" | "blue" | "amber" | "lilac" }) {
  const bg = { mint: "bg-[#e3f6ea]", blue: "bg-[#e5eefc]", amber: "bg-[#fff3d1]", lilac: "bg-[#ebe8ff]" }[tint ?? "mint"];
  return <div className={`rounded-xl p-3 ${tint ? bg : "bg-white shadow-[0_6px_18px_rgba(40,40,100,0.07)]"}`}>{children}</div>;
}

function LocationCard({
  title,
  sub,
  action,
  connected = true,
}: {
  title: string;
  sub: string;
  action: string;
  connected?: boolean;
}) {
  const dot = connected ? "bg-[#22a85a]" : "bg-[#e5334b]";
  const halo = connected ? "bg-[#22a85a]/20" : "bg-[#e5334b]/20";
  return (
    <div
      className={`rounded-2xl border p-3 ${connected ? "border-[#b9e6c9] bg-[#e3f6ea]" : "border-[#f3c3cb] bg-[#fdecef]"}`}
    >
      <div className="flex items-center gap-3">
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${halo}`}>
          <span className={`h-3.5 w-3.5 rounded-full ${dot}`} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold">{title}</p>
          <p className={`text-[10px] leading-4 ${connected ? "text-[#4d6b5a]" : "text-[#8a3a46]"}`}>{sub}</p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between rounded-lg bg-white/80 px-2.5 py-1.5 text-[10px] font-semibold">
        <span className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
          {action}
        </span>
        <span className="text-[#8b93a7]">{connected ? "Live" : "Paused"}</span>
      </div>
    </div>
  );
}

function Quick({ counts = ["0", "0", "1", "0"] }: { counts?: string[] }) {
  const items = ["Guidance", "Patrol", "Briefings", "More"];
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((q, i) => (
        <div key={q} className="rounded-xl bg-white p-2 text-center shadow-[0_4px_12px_rgba(40,40,100,0.06)]">
          <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-[#5b4dff] text-[12px] font-bold text-white">{counts[i]}</span>
          <p className="mt-1 text-[8px] font-semibold uppercase tracking-wide text-[#667085]">{q}</p>
        </div>
      ))}
    </div>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1.5 text-[10px] font-bold tracking-[0.14em] text-[#667085]">{label}</p>
      {children}
    </div>
  );
}

function DataGrid({ items }: { items: [string, string, boolean?][] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map(([k, v, hi]) => (
        <div key={k} className="rounded-xl bg-white p-2.5 shadow-[0_4px_12px_rgba(40,40,100,0.06)]">
          <p className="text-[9px] font-bold tracking-wide text-[#8b93a7]">{k}</p>
          <p className={`text-[14px] font-bold ${hi ? "text-[#2f6bff]" : ""}`}>{v}</p>
        </div>
      ))}
    </div>
  );
}

function ListItem({ title, sub, chip }: { title: string; sub: string; chip?: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-[0_4px_12px_rgba(40,40,100,0.06)]">
      <div>
        <p className="text-[12px] font-semibold">{title}</p>
        <p className="text-[10px] text-[#667085]">{sub}</p>
      </div>
      <div className="flex items-center gap-2">
        {chip ? <span className="rounded-full bg-[#ebe8ff] px-2 py-0.5 text-[9px] font-semibold text-[#4a3fd6]">{chip}</span> : null}
        <span className="text-[#8b93a7]">›</span>
      </div>
    </div>
  );
}

function Button({ children, ghost }: { children: ReactNode; ghost?: boolean }) {
  return (
    <div className={`grid h-10 place-items-center rounded-xl text-[13px] font-semibold ${ghost ? "border border-[#d9dcec] bg-white text-[#3c4558]" : "bg-[#5b4dff] text-white"}`}>
      {children}
    </div>
  );
}

function Notice({ title, body, tone = "amber" }: { title: string; body: string; tone?: "amber" | "blue" | "mint" }) {
  const c = { amber: "text-[#8a6410]", blue: "text-[#2e4b8a]", mint: "text-[#14573a]" }[tone];
  return (
    <Card tint={tone}>
      <p className={`text-[12px] font-semibold ${c}`}>{title}</p>
      <p className={`mt-0.5 text-[10px] leading-4 ${c}`}>{body}</p>
    </Card>
  );
}

function Footer() {
  return (
    <p className="mt-auto pb-1 text-center text-[9px] text-[#8b93a7]">
      © 2026 Simpnify · <span className="text-[#2f6bff]">Logout</span>
    </p>
  );
}

/* ---------- story ---------- */
type Step = { time: string; label: string; note: string; screen: ReactNode };
type Chapter = {
  id: string;
  title: string;
  merged: string;
  story: string;
  steps: Step[];
  console: { title: string; rows: [string, string][]; note: string };
};

const chapters: Chapter[] = [
  {
    id: "briefings",
    title: "1 · Briefings",
    merged: "briefings-ack + briefings-gate",
    story:
      "Officer Tan picks up the Gate 2 post phone at 08:55. Before Today opens, the phone asks her to read the one required briefing. One tap tells the admin she has read it.",
    steps: [
      {
        time: "08:55",
        label: "Read before shift",
        note: "Today is held back until the required briefing is acknowledged. SOS still works.",
        screen: (
          <Screen title="Briefings" back>
            <Hero label="BRIEFINGS" title="Briefings" sub="1 required before your shift starts." />
            <Card>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#ffe3e7] px-2 py-0.5 text-[9px] font-bold text-[#b3243a]">NEW · HIGH</span>
                <span className="text-[10px] text-[#8b93a7]">08:30</span>
              </div>
              <p className="mt-2 text-[13px] font-semibold">Gate 2 lock replaced</p>
              <p className="mt-1 text-[11px] leading-4 text-[#667085]">New key code from 18:00. Do not share by radio.</p>
            </Card>
            <Button>Acknowledge and start shift</Button>
            <p className="text-center text-[10px] text-[#8b93a7]">Seen by 6 of 9 officers</p>
          </Screen>
        ),
      },
      {
        time: "08:56",
        label: "Acknowledged, Today opens",
        note: "The briefing moves to Priority media as read. The admin count goes up by one.",
        screen: (
          <Screen nav>
            <Hero label="TODAY" title="Today" sub="Briefing acknowledged 08:56." />
            <Tags><Tag>Active</Tag><Tag tone="info">Briefing read</Tag></Tags>
            <LocationCard title="My Live Location" sub="Automatic location is on for this shift." action="Connected" />
            <Quick />
            <Section label="PRIORITY MEDIA">
              <Card><p className="text-[12px] font-semibold">Gate 2 lock replaced</p><p className="text-[10px] text-[#667085]">Read 08:56</p></Card>
            </Section>
          </Screen>
        ),
      },
    ],
    console: {
      title: "Admin · Briefing “Gate 2 lock replaced”",
      rows: [["Acknowledged", "7 of 9"], ["Tan", "08:56"], ["Still unread", "Lim, Rao"]],
      note: "SOTI-style content push with read confirmation. The admin can chase two names.",
    },
  },
  {
    id: "today",
    title: "2 · Today",
    merged: "today-health + today-offline",
    story:
      "At 10:05 Tan checks Today before a patrol. At 10:12 she walks into the loading bay and signal drops. Today tells her what the phone is doing, so she does not have to guess.",
    steps: [
      {
        time: "10:05",
        label: "Handphone health",
        note: "The status tags now carry battery and signal, the same facts the admin sees.",
        screen: (
          <Screen nav>
            <Hero label="TODAY" title="Today" sub="Gate 2 · day shift" />
            <Tags>
              <Tag>Active</Tag>
              <Tag>Sync 10:04</Tag>
              <Tag tone="warn">Battery 24%</Tag>
              <Tag>5G strong</Tag>
            </Tags>
            <LocationCard title="My Live Location" sub="Inside Gate 2 perimeter." action="Connected" />
            <Quick counts={["1", "1", "0", "0"]} />
            <Section label="PRIORITY MEDIA">
              <Card><p className="text-[11px] text-[#667085]">Charge before your next patrol.</p></Card>
            </Section>
          </Screen>
        ),
      },
      {
        time: "10:12",
        label: "Signal lost",
        note: "Her patrol note is saved on the phone and sends itself later. The banner is honest that SOS needs signal.",
        screen: (
          <Screen
            nav
            online={false}
            banner={
              <div className="bg-[#fff3d1] px-4 py-2.5">
                <p className="text-[12px] font-semibold text-[#8a6410]">You are offline</p>
                <p className="mt-0.5 text-[10px] leading-4 text-[#8a6410]">
                  1 note saved on this phone. It sends when signal returns. SOS needs signal.
                </p>
              </div>
            }
          >
            <Hero label="TODAY" title="Today" />
            <Tags><Tag tone="bad">Offline</Tag><Tag>Sync 10:04</Tag><Tag tone="warn">Battery 22%</Tag></Tags>
            <LocationCard title="My Live Location" sub="Last position saved 10:11." action="Not connected" connected={false} />
            <Section label="WAITING TO SEND">
              <Card><p className="text-[12px] font-semibold">Patrol note · Loading bay</p><p className="text-[10px] text-[#667085]">Saved 10:12</p></Card>
            </Section>
          </Screen>
        ),
      },
    ],
    console: {
      title: "Admin · Handphone Gate-2-PH",
      rows: [["Battery", "22%"], ["Last check-in", "10:04"], ["Connectivity", "Offline since 10:12"]],
      note: "SOTI device health. The admin sees the handphone, not the officer's screen.",
    },
  },
  {
    id: "location",
    title: "3 · Location",
    merged: "location-zone + location-battery",
    story:
      "At 11:40 the battery hits 18%. The phone slows its updates to last the shift, and still tells the admin which zone Tan is in. Update Location Now opens a map so she can drag the pin to the exact spot, then send that one check-in.",
    steps: [
      {
        time: "11:40",
        label: "Power saving, still in zone",
        note: "The update rate is stated on the card. Update Location Now opens a map for one precise check-in.",
        screen: <LocationCheckIn />,
      },
      {
        time: "11:41",
        label: "Drag the pin",
        note: "The GPS fix is 9 m off. She drags the pin to the vehicle barrier, then sends that point.",
        screen: <LocationCheckIn startOpen />,
      },
      {
        time: "11:52",
        label: "Leaves the zone",
        note: "Entry and exit are a plain log, not a movement trail.",
        screen: (
          <Screen title="Location" back>
            <Card tint="lilac">
              <p className="text-[10px] font-bold tracking-wide text-[#4a3fd6]">NOW IN</p>
              <p className="text-[18px] font-bold text-[#2b2a6b]">Loading bay</p>
            </Card>
            <DataGrid items={[["STATUS", "ACTIVE", true], ["ACCURACY", "7 m"], ["ZONE", "Loading bay"], ["UPDATE", "300 s"]]} />
            <Section label="ZONE LOG">
              <Card>
                {[["11:52", "Entered Loading bay"], ["11:51", "Left Gate 2"], ["09:52", "Entered Gate 2"]].map(([t, v]) => (
                  <div key={t} className="flex justify-between border-b border-black/5 py-1.5 text-[11px] last:border-0">
                    <span className="text-[#8b93a7]">{t}</span><span className="font-semibold">{v}</span>
                  </div>
                ))}
              </Card>
            </Section>
          </Screen>
        ),
      },
    ],
    console: {
      title: "Admin · Tan, Gate-2-PH",
      rows: [["Check-in", "Vehicle barrier · pin"], ["Zone", "Loading bay"], ["Update rate", "300 s"]],
      note: "SOTI locate sends one device check-in. A coarse fix can be corrected by dragging the pin. The admin sees the point and the zone, never the screen.",
    },
  },
  {
    id: "guidance",
    title: "4 · Guidance",
    merged: "guidance-scan + guidance-live",
    story:
      "At 14:20 the admin assigns a perimeter check. Tan proves each checkpoint by tapping the post tag. At step 3 the gate lock looks wrong, so she asks for help from inside the step.",
    steps: [
      {
        time: "14:21",
        label: "Tap the tag",
        note: "Presence is proved by tapping the NFC tag at the post. The admin is following her step, not her screen.",
        screen: (
          <Screen title="Guidance" back>
            <span className="w-fit rounded-md bg-[#e5eefc] px-2 py-0.5 text-[9px] font-bold tracking-wide text-[#2f6bff]">GUIDANCE NEWS</span>
            <p className="-mt-1 text-[20px] font-bold">Perimeter check</p>
            <Card>
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold">Step 2 of 5 · Gate 2</p>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-[#ebe8ff]"><div className="h-full w-2/5 rounded-full bg-[#5b4dff]" /></div>
              <p className="mt-2 text-[11px] leading-4">Check the fence line, then tap the post tag.</p>
            </Card>
            <Card tint="lilac">
              <p className="text-[10px] leading-4 text-[#4a3fd6]">Admin is following your step and position, not your screen.</p>
            </Card>
            <div className="rounded-xl bg-white p-3 text-center shadow-sm">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-dashed border-[#5b4dff] text-[10px] font-bold text-[#5b4dff]">NFC</span>
              <p className="mt-1 text-[10px] text-[#667085]">Hold the phone to the tag</p>
            </div>
          </Screen>
        ),
      },
      {
        time: "14:27",
        label: "Ask for help at step 3",
        note: "The help request carries the step, the zone and the photo, so the admin does not have to ask where she is.",
        screen: (
          <Screen
            title="Guidance"
            back
            sheet={
              <>
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border-4 border-[#bfe8cf] bg-[#22a85a] text-2xl font-bold text-white">✓</span>
                <p className="mt-3 text-[16px] font-bold">Help requested</p>
                <p className="mt-1 text-[11px] leading-4 text-[#667085]">
                  Stay with this phone. Admin Rao is on it.
                </p>
                <div className="mt-3 rounded-xl bg-[#f4f5fa] p-2.5 text-left text-[10px] leading-5 text-[#3c4558]">
                  <p>Sent with your request:</p>
                  <p className="font-semibold">Step 3 of 5 · Gate 2 perimeter · 14:27</p>
                  <p className="text-[#8b93a7]">Admin sees your step and position, not your screen.</p>
                </div>
                <div
                  className="mt-4 grid h-10 place-items-center rounded-xl text-[13px] font-semibold text-white"
                  style={{ background: "linear-gradient(90deg, #3b82f6 0%, #7c4dff 100%)" }}
                >
                  Close
                </div>
              </>
            }
          >
            <span className="w-fit rounded-md bg-[#e5eefc] px-2 py-0.5 text-[9px] font-bold tracking-wide text-[#2f6bff]">GUIDANCE NEWS</span>
            <p className="-mt-1 text-[20px] font-bold">Guidance</p>
            <ListItem title="Available assignments" sub="No currently broadcast offers." />
            <ListItem title="My active response" sub="Perimeter check · step 3 of 5" chip="Live" />
            <ListItem title="History" sub="Step 2 confirmed 14:21." />
            <Button>Take photo of the gate lock</Button>
            <Button ghost>I need help with this step</Button>
          </Screen>
        ),
      },
    ],
    console: {
      title: "Admin · Perimeter check · Tan",
      rows: [["Step", "3 of 5"], ["Zone", "Gate 2 perimeter"], ["Help", "Requested 14:27"]],
      note: "SOTI XSight-style live visibility, limited to the step. No remote view of the phone.",
    },
  },
];

export default function MobileStoryPage() {
  return (
    <main
      id="main-content"
      className="flex-1 bg-[var(--platform-surface)] px-4 pb-20 pt-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Story screens · redesign
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">
            One shift, from the SOTI side
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-platform-muted">
            Rebuilt on your native Today, Location, Guidance and Briefings
            layouts: purple header, teal card, status tags, mint location card,
            data grid, list items and the SOS button. Officer Tan&apos;s shift
            adds the combined C and D ideas from{" "}
            <Link href="/photos/mobile-modules" className="text-secondary hover:underline">
              /photos/mobile-modules
            </Link>
            , and each chapter ends with what the admin sees, which is the
            SOTI point of view.
          </p>
          <nav aria-label="Chapters" className="mt-6 flex flex-wrap gap-2">
            {chapters.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-platform-muted transition hover:border-secondary/40 hover:text-secondary"
              >
                {c.title}
              </a>
            ))}
          </nav>
        </header>

        <div className="flex flex-col gap-14">
          {chapters.map((c) => (
            <section
              key={c.id}
              id={c.id}
              className="scroll-mt-24 overflow-hidden rounded-2xl border border-white/10 bg-[#0a1218]"
            >
              <div className="border-b border-white/10 px-6 py-5 md:px-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h2 className="text-xl font-semibold text-white">{c.title}</h2>
                  <span className="rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs text-secondary">
                    {c.merged}
                  </span>
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-[#c5d0d6]">{c.story}</p>
              </div>

              <div className="grid gap-8 bg-[#050b10] px-4 py-8 md:grid-cols-2">
                {c.steps.map((s) => (
                  <figure key={s.time} className="flex flex-col items-center">
                    <figcaption className="mb-4 max-w-[280px] text-center">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
                        {s.time} · {s.label}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-platform-muted">{s.note}</p>
                    </figcaption>
                    {s.screen}
                  </figure>
                ))}
              </div>

              <div className="border-t border-white/10 px-6 py-5 md:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-platform-subtle">
                  What the admin sees
                </p>
                <div className="mt-3 rounded-xl border border-white/10 bg-[#0e1a22] p-4">
                  <p className="text-sm font-semibold text-white">{c.console.title}</p>
                  <dl className="mt-2 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-3">
                    {c.console.rows.map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs text-platform-subtle">{k}</dt>
                        <dd className="text-[#c5d0d6]">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 text-xs leading-5 text-platform-muted">{c.console.note}</p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-platform-subtle">
          Open at{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-platform-muted">
            /photos/mobile-story
          </code>
          .{" "}
          <Link href="/photos/mobile-modules" className="text-secondary hover:underline">
            All variants
          </Link>
          {" · "}
          <Link href="/photos" className="text-secondary hover:underline">
            Other reviews
          </Link>
        </p>
      </div>
    </main>
  );
}
