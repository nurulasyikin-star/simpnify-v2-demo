import { createElement, type ComponentType, type ReactNode } from "react";

import { Phone } from "@/components/mobile-auth-variants";
import { LocationCheckIn } from "@/components/location-check-in";

export type MobileLocationVariantId =
  | "web-location"
  | "live-fix"
  | "zone-checkin"
  | "guidance-help"
  | "shift-clear";

export type MobileLocationVariantMeta = {
  id: MobileLocationVariantId;
  lane: "ours" | "soti";
  title: string;
  tagline: string;
  scene: string;
  soti: string;
  pros: string[];
  cons: string[];
};

export const mobileLocationVariants: MobileLocationVariantMeta[] = [
  {
    id: "web-location",
    lane: "ours",
    title: "A — Our design",
    tagline:
      "The two screens in your screenshot. Today and My Live Location, still inside the phone browser.",
    scene: "Reference. Signed-in officer, browser address bar, Install, foreground GPS.",
    soti: "Kept as the reference so it can be compared with the SOTI flow below.",
    pros: [
      "Same words as the live page: every 10 seconds, Active, 5 m",
      "Says location and SOS run only while this officer is signed in",
      "Coordinator tracking is a separate card, and it is empty",
    ],
    cons: [
      "The address bar and Install sit above the shift",
      "The fix is tied to this browser page staying open",
      "The next officer can inherit the session if the phone is not cleared",
    ],
  },
  {
    id: "live-fix",
    lane: "soti",
    title: "D — Step 1. Shift is open",
    tagline:
      "After the badge. Left is the phone on signal. Right is the same Today when the signal drops.",
    scene: "10:05 the phone is fit for patrol, and End shift is on this Today. 10:12 the loading bay drops the signal.",
    soti: "SOTI XSight device health: battery, signal, and last check-in, shown to the officer. The console sees the phone, not this screen. When the signal drops, the note stays on the phone and sends later. SOS needs signal.",
    pros: [
      "Battery, signal, and sync are on the shift, not on a second page",
      "Inside Gate 2 is the location, instead of a raw coordinate",
      "The offline phone says the note is saved and that SOS needs signal",
    ],
    cons: [
      "Two states on one step, so the reader has to take them as before and after",
      "The console still cannot see the patrol note, only that the phone went offline",
    ],
  },
  {
    id: "zone-checkin",
    lane: "soti",
    title: "F — Step 2. Still in the zone",
    tagline:
      "Battery is low, so updates slow down. Update Location Now opens a map. The officer drags the pin, then sends that one check-in.",
    scene: "11:40 power saving. 11:41 drag the pin. 11:52 the zone log.",
    soti: "SOTI locate sends one device check-in. A coarse fix can be dragged to the exact spot before it is sent. The admin sees the point and the zone, never the screen.",
    pros: [
      "The zone is named, not only a coordinate",
      "A coarse GPS fix can be corrected before it is sent",
      "The power-saving rule is written on the screen",
    ],
    cons: [
      "Needs zones drawn for the site",
      "A weak indoor fix can flip the zone",
    ],
  },
  {
    id: "guidance-help",
    lane: "soti",
    title: "G — Step 3. Tap the tag",
    tagline:
      "First, the live Guidance page: you are clear, and there is no assignment. Then the officer proves a checkpoint with the post tag. Help from that step sends the step and the place, not a view of the screen.",
    scene: "You are clear. 14:21 hold the phone to the tag. The step screen, then the same screen under Help requested.",
    soti: "SOTI scanning with NFC proves the officer is at the post. XSight-style visibility is limited to the step. Nobody views the screen.",
    pros: [
      "Presence is proved without typing",
      "The help request already carries the step and the place",
      "The screen says the admin is following the step, not the screen",
    ],
    cons: [
      "Each post needs a tag",
      "The wording has to stay clear so the officer does not feel watched",
    ],
  },
  {
    id: "shift-clear",
    lane: "soti",
    title: "E — Step 4. Phone is clear",
    tagline:
      "End shift already sits on Today. Here they confirm what stops, then the phone is waiting for the next badge.",
    scene: "1 press End shift and clear this phone. 2 the phone is clear.",
    soti: "SOTI shared-device logout. The officer chooses the button. Location and SOS stop, then this phone is ready for the next badge.",
    pros: [
      "The button to press is on the shift, not hidden in a menu",
      "The confirm sheet lists location, SOS, and the saved note before anything clears",
      "The last screen is the waiting phone, so the next officer knows to tap a badge",
    ],
    cons: [
      "Two presses: End shift on Today, then confirm",
      "Leaving the phone locked, without End shift, does not clear it",
    ],
  },
];

function WebBar() {
  return (
    <div className="mx-3 mt-1 flex h-7 items-center gap-1.5 rounded-full bg-white/90 px-2 text-[9px] text-[#3c4558] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <span className="text-[10px] text-[#8b93a7]">⌂</span>
      <span className="text-[10px] text-[#e5484d]">▲</span>
      <span className="min-w-0 flex-1 truncate">192.168.0.26:7100/m</span>
      <span className="text-[11px] text-[#8b93a7]">↻</span>
    </div>
  );
}

function WebHeader({ back = false }: { back?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 px-3 pb-1 pt-2">
      <div className="flex min-w-0 items-center gap-1.5">
        {back ? <span className="text-[16px] text-[#3c4558]">‹</span> : null}
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[#1aa6a6] text-[11px] font-bold text-white">
          S
        </span>
        <span className="min-w-0 truncate text-[10px] font-semibold leading-tight">
          Simple Unified…
          <span className="block font-medium text-[#8b93a7]">Unified security operatio…</span>
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <span className="rounded-full bg-[#1498b0] px-2 py-1 text-[9px] font-semibold text-white">
          Install
        </span>
        <span className="grid h-5 w-5 place-items-center rounded-full bg-[#1498b0] text-[8px] font-bold text-white">
          SS
        </span>
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-xl bg-white py-2 text-center shadow-[0_6px_16px_rgba(20,40,50,0.05)]">
      <p className="text-[14px] font-semibold">{n}</p>
      <p className="text-[8px] font-semibold tracking-wide text-[#8b93a7]">{label}</p>
    </div>
  );
}

function WebToday() {
  return (
    <Phone surface="web">
      <WebBar />
      <WebHeader />
      <div className="mx-3 mt-1 rounded-2xl bg-[#0f6e74] px-3.5 py-3 text-white">
        <p className="text-[9px] font-semibold tracking-[0.16em] text-white/70">YOUR SHIFT</p>
        <p className="text-[22px] font-semibold leading-6">Today</p>
        <p className="mt-1 text-[10px] leading-4 text-white/85">
          Only work and safety information enabled for your role appears here.
        </p>
      </div>
      <p className="mt-2 px-3.5 text-[9px] text-[#5f7a84]">
        ● Online · Sync Oct 2, 3:11 AM · GPS active
      </p>
      <div className="mx-3 mt-2 rounded-2xl border border-[#b7eadf] bg-[#e7f8f4] px-3 py-2.5">
        <p className="text-[9px] text-[#3d8f86]">Operational safety status</p>
        <div className="mt-0.5 flex items-start justify-between gap-2">
          <div>
            <p className="text-[13px] font-semibold text-[#14686f]">My Live Location</p>
            <p className="text-[10px] text-[#3d6b66]">Automatic foreground location is active</p>
          </div>
          <span className="shrink-0 text-[10px] font-semibold text-[#1b7a45]">Connected</span>
        </div>
      </div>
      <div className="mx-3 mt-2 grid grid-cols-4 gap-1.5">
        <Stat n="0" label="GUIDANCE" />
        <Stat n="0" label="PATROLS" />
        <Stat n="0" label="BRIEFINGS" />
        <Stat n="1" label="INBOX" />
      </div>
      <div className="mx-3 mt-2 flex items-center justify-between">
        <p className="text-[9px] font-semibold tracking-[0.12em] text-[#8b93a7]">
          PRIORITY ORDER
          <span className="mt-0.5 block text-[13px] font-semibold tracking-normal text-[#1c2434]">
            Next up
          </span>
        </p>
        <span className="text-[10px] font-semibold text-[#1498b0]">Refresh</span>
      </div>
      <div className="mx-3 mt-1.5 rounded-2xl border border-dashed border-[#d5e3e6] bg-white/70 px-3 py-3 text-center">
        <p className="text-[12px] font-semibold">No pending work</p>
        <p className="mt-1 text-[10px] leading-4 text-[#667085]">
          Your assigned work and required acknowledgements will appear here.
        </p>
      </div>
      <div className="mt-auto flex items-end justify-between px-3 pb-1 pt-2">
        <p className="text-[8px] text-[#8b93a7]">
          © 2026 Simpnify Sdn Bhd
          <span className="mt-0.5 block text-[#1498b0]">Help · Support</span>
        </p>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e5334b] text-[10px] font-bold text-white">
          SOS
        </span>
      </div>
      <div className="grid grid-cols-4 border-t border-black/5 py-1.5 text-center text-[9px] text-[#8b93a7]">
        <span className="font-semibold text-[#1498b0]">Today</span>
        <span>Work</span>
        <span>Inbox</span>
        <span>Comms</span>
      </div>
    </Phone>
  );
}

function WebLocation() {
  return (
    <Phone surface="web">
      <WebBar />
      <WebHeader back />
      <div className="px-3.5 pt-1">
        <p className="text-[9px] font-semibold tracking-[0.14em] text-[#1498b0]">
          OPERATIONAL SAFETY
        </p>
        <div className="mt-0.5 flex items-start justify-between gap-2">
          <h3 className="text-[18px] font-semibold leading-5">My Live Location</h3>
          <span className="shrink-0 text-[10px] font-semibold text-[#1b7a45]">● Connected</span>
        </div>
        <p className="mt-1 text-[10px] leading-4 text-[#667085]">
          Foreground location starts automatically after sign-in for authorized field officers.
        </p>
      </div>
      <div className="mx-3 mt-2 rounded-2xl border border-[#b7eadf] bg-[#e7f8f4] px-3 py-2.5">
        <p className="text-[9px] font-semibold tracking-[0.12em] text-[#3d8f86]">
          AUTOMATIC FOREGROUND LOCATION
        </p>
        <p className="mt-1 text-[11px] leading-4">
          A foreground GPS fix is published automatically about every{" "}
          <span className="font-semibold">10 seconds</span>.
        </p>
        <p className="mt-1 text-[10px] leading-4 text-[#3d6b66]">
          No separate sharing switch is required. The same location stream keeps SOS responder standby ready while this PWA is open.
        </p>
        <p className="mt-1 text-right text-[10px] font-semibold text-[#1b7a45]">Active</p>
      </div>
      <div className="mx-3 mt-2 grid grid-cols-4 gap-1 text-center">
        {[
          ["STATUS", "Active"],
          ["ACCURACY", "5 m"],
          ["LATITUDE", "37.4…"],
          ["LONGITUDE", "-122…"],
        ].map(([k, v]) => (
          <div key={k}>
            <p className="text-[8px] font-semibold tracking-wide text-[#8b93a7]">{k}</p>
            <p className="text-[11px] font-semibold">{v}</p>
          </div>
        ))}
      </div>
      <div className="mx-3 mt-3">
        <p className="text-[13px] font-semibold">Coordinator tracking requests</p>
        <p className="mt-1 text-[10px] leading-4 text-[#667085]">
          No authorized coordinator is actively tracking this device.
        </p>
      </div>
      <div className="mx-3 mt-3">
        <p className="text-[13px] font-semibold">Privacy and battery</p>
        <p className="mt-1 text-[10px] leading-4 text-[#667085]">
          Automatic operational location and coordinator tracking run only while signed in. Active SOS uses the same location stream. The PWA does not request native background tracking.
        </p>
      </div>
    </Phone>
  );
}

export function MobileLocationVariantWeb() {
  return (
    <>
      <WebToday />
      <WebLocation />
    </>
  );
}

const STORY_PURPLE = "linear-gradient(135deg, #1498b0 0%, #0f6e74 100%)";
const STORY_TEAL = "linear-gradient(135deg, #1aa6a6 0%, #1498b0 100%)";

function StoryPhone({
  online = true,
  title,
  banner,
  sheet,
  children,
}: {
  online?: boolean;
  title?: string;
  banner?: ReactNode;
  sheet?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="w-[280px] shrink-0 rounded-[2.2rem] border border-black/40 bg-black p-[9px] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
      <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-[1.75rem] bg-[#f4f5fa] text-[#1c2434]">
        <div className="absolute left-1/2 top-2 z-20 h-[16px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
        <div className="px-4 pb-3 pt-3 text-white" style={{ background: STORY_PURPLE }}>
          <div className="flex justify-between text-[10px] font-semibold text-white/80">
            <span>9:41</span>
            <span>5G</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            {title ? (
              <span className="flex items-center gap-1.5 text-[14px] font-semibold">
                <span className="text-lg leading-none">‹</span>
                {title}
              </span>
            ) : (
              <span className="grid h-6 w-6 place-items-center rounded-md bg-white/20 text-[11px] font-bold">
                S
              </span>
            )}
            <span className="flex items-center gap-1.5 text-[10px] font-semibold">
              <span className={`h-2.5 w-2.5 rounded-full ${online ? "bg-[#3ddc84]" : "bg-[#ff4d6a]"}`} />
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
        {banner}
        <div className="flex flex-1 flex-col gap-2.5 px-3 pb-16 pt-3">{children}</div>
        <span className="absolute bottom-3 left-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-[#e5334b] text-[11px] font-bold text-white shadow-lg">
          SOS
        </span>
        {sheet ? (
          <div className="absolute inset-0 z-30 flex flex-col justify-end bg-black/45">
            <div className="rounded-t-3xl bg-white px-5 pb-6 pt-3 text-center shadow-[0_-12px_40px_rgba(0,0,0,0.25)]">
              <span className="mx-auto mb-4 block h-1 w-10 rounded-full bg-black/15" />
              {sheet}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StoryHero({ sub }: { sub?: string }) {
  return (
    <div className="rounded-2xl p-3.5 text-white" style={{ background: STORY_TEAL }}>
      <p className="text-[10px] font-bold tracking-[0.2em] text-white/80">TODAY</p>
      <p className="mt-0.5 text-[22px] font-bold leading-6">Today</p>
      {sub ? <p className="mt-1 text-[11px] leading-4 text-white/85">{sub}</p> : null}
    </div>
  );
}

function StoryTag({ children, tone = "ok" }: { children: ReactNode; tone?: "ok" | "warn" | "bad" }) {
  const dot = { ok: "bg-[#22a85a]", warn: "bg-[#f0a81c]", bad: "bg-[#e5334b]" }[tone];
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-medium shadow-sm">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {children}
    </span>
  );
}

function StoryLocation({
  sub,
  action,
  live,
  connected = true,
}: {
  sub: string;
  action: string;
  live: string;
  connected?: boolean;
}) {
  const dot = connected ? "bg-[#22a85a]" : "bg-[#e5334b]";
  return (
    <div className={`rounded-2xl border p-3 ${connected ? "border-[#b9e6c9] bg-[#e3f6ea]" : "border-[#f3c3cb] bg-[#fdecef]"}`}>
      <div className="flex items-center gap-3">
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${connected ? "bg-[#22a85a]/20" : "bg-[#e5334b]/20"}`}>
          <span className={`h-3.5 w-3.5 rounded-full ${dot}`} />
        </span>
        <div>
          <p className="text-[13px] font-semibold">My Live Location</p>
          <p className={`text-[10px] leading-4 ${connected ? "text-[#4d6b5a]" : "text-[#8a3a46]"}`}>{sub}</p>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between rounded-lg bg-white/80 px-2.5 py-1.5 text-[10px] font-semibold">
        <span className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
          {action}
        </span>
        <span className="text-[#8b93a7]">{live}</span>
      </div>
    </div>
  );
}

function StoryCounts({ counts }: { counts: string[] }) {
  const labels = ["GUIDANCE", "PATROL", "BRIEFINGS", "MORE"];
  return (
    <div className="grid grid-cols-4 gap-2">
      {labels.map((label, i) => (
        <div key={label} className="rounded-xl bg-white p-2 text-center shadow-[0_4px_12px_rgba(40,40,100,0.06)]">
          <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-[#1498b0] text-[12px] font-bold text-white">
            {counts[i]}
          </span>
          <p className="mt-1 text-[8px] font-semibold tracking-wide text-[#667085]">{label}</p>
        </div>
      ))}
    </div>
  );
}

function Shot({ step, children }: { step: string; children: ReactNode }) {
  return (
    <figure className="flex w-[280px] shrink-0 flex-col items-center gap-3">
      <figcaption className="text-center text-[11px] font-semibold leading-4 text-white/80">
        {step}
      </figcaption>
      {children}
    </figure>
  );
}

function SheetButton({
  children,
  tone = "fill",
}: {
  children: ReactNode;
  tone?: "fill" | "ghost";
}) {
  return (
    <div
      className={`grid h-10 place-items-center rounded-xl text-[13px] font-semibold ${
        tone === "fill" ? "bg-[#1498b0] text-white" : "border border-[#d9dcec] text-[#1c2434]"
      }`}
    >
      {children}
    </div>
  );
}

function WaitingShift({ sheet }: { sheet?: ReactNode }) {
  return (
    <StoryPhone sheet={sheet}>
      <StoryHero sub="Shared phone · badge required" />
      <div className="flex flex-wrap gap-1.5">
        <StoryTag tone="warn">Waiting for badge</StoryTag>
      </div>
      <StoryLocation
        sub="Starts after the badge on this phone."
        action="Not started"
        live="Waiting"
        connected={false}
      />
      <p className="text-[11px] leading-4 text-[#667085]">
        This phone stays on Simpnify. The officer taps their badge on sign in. If the badge loses connection, the app signs out and returns here.
      </p>
    </StoryPhone>
  );
}

function WebGuidance() {
  return (
    <Phone surface="web">
      <WebBar />
      <WebHeader back />
      <div className="flex items-start justify-between px-3.5 pt-1">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.14em] text-[#1498b0]">ASSIGNED WORK</p>
          <h3 className="text-[20px] font-semibold leading-6">Guidance</h3>
          <p className="mt-0.5 text-[10px] leading-4 text-[#667085]">
            Nearby offers, your active procedure, and audited history.
          </p>
        </div>
        <span className="shrink-0 text-[10px] font-semibold text-[#1b7a45]">● Live</span>
      </div>
      <div className="mx-3 mt-3 rounded-2xl bg-white px-3 py-5 text-center shadow-[0_8px_24px_rgba(20,40,50,0.05)]">
        <span className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-[#e3f6ea] text-[#22a85a]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 12.5 10 16.5 18 8" stroke="#22a85a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="mt-2 text-[14px] font-semibold">You are clear</p>
        <p className="mt-1 text-[10px] leading-4 text-[#667085]">
          There are no Guided Response assignments for you.
        </p>
      </div>
      {[
        ["Available assignments", "No nearby broadcast offers."],
        ["My active response", "No active procedure."],
        ["History", "No assignment history."],
      ].map(([title, sub]) => (
        <div key={title} className="mx-3 mt-2 rounded-xl border border-[#e6eef0] bg-white px-3 py-2">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold">{title}</p>
            <span className="text-[11px] text-[#8b93a7]">0</span>
          </div>
          <p className="text-[10px] text-[#667085]">{sub}</p>
        </div>
      ))}
      <div className="mt-auto flex items-end justify-between px-3 pb-1 pt-3">
        <p className="text-[8px] text-[#8b93a7]">
          © 2026 Simpnify Sdn Bhd
          <span className="mt-0.5 block text-[#1498b0]">Help · Support</span>
        </p>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e5334b] text-[10px] font-bold text-white">
          SOS
        </span>
      </div>
      <div className="grid grid-cols-4 border-t border-black/5 py-1.5 text-center text-[9px] text-[#8b93a7]">
        <span>Today</span>
        <span className="font-semibold text-[#1498b0]">Work</span>
        <span>Inbox</span>
        <span>Comms</span>
      </div>
    </Phone>
  );
}

function TodayOnDuty({ sheet }: { sheet?: ReactNode }) {
  return (
    <StoryPhone sheet={sheet}>
      <StoryHero sub="Gate 2 · day shift" />
      <div className="flex flex-wrap gap-1.5">
        <StoryTag>Active</StoryTag>
        <StoryTag>Sync 10:04</StoryTag>
        <StoryTag tone="warn">Battery 24%</StoryTag>
        <StoryTag>5G strong</StoryTag>
      </div>
      <StoryLocation sub="Inside Gate 2 perimeter." action="Connected" live="Live" />
      <StoryCounts counts={["1", "1", "0", "0"]} />
      <div>
        <p className="mb-1.5 text-[10px] font-bold tracking-[0.14em] text-[#667085]">PRIORITY MEDIA</p>
        <div className="rounded-xl bg-white p-3 text-[11px] text-[#667085] shadow-[0_6px_18px_rgba(40,40,100,0.07)]">
          Charge before your next patrol.
        </div>
      </div>
      <div className="rounded-xl bg-white p-3 shadow-[0_6px_18px_rgba(40,40,100,0.07)]">
        <p className="text-[12px] font-semibold">End this shift on this phone</p>
        <p className="mt-1 text-[11px] leading-4 text-[#667085]">
          Press End shift. Location and SOS stop, and the phone is cleared for the next officer.
        </p>
        <div className="mt-3">
          <SheetButton>End shift</SheetButton>
        </div>
      </div>
    </StoryPhone>
  );
}

export function MobileLocationVariantFix() {
  return (
    <>
      <TodayOnDuty />
      <StoryPhone
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
        <StoryHero />
        <div className="flex flex-wrap gap-1.5">
          <StoryTag tone="bad">Offline</StoryTag>
          <StoryTag>Sync 10:04</StoryTag>
          <StoryTag tone="warn">Battery 22%</StoryTag>
        </div>
        <StoryLocation
          sub="Last position saved 10:11."
          action="Not connected"
          live="Paused"
          connected={false}
        />
        <div>
          <p className="mb-1.5 text-[10px] font-bold tracking-[0.14em] text-[#667085]">WAITING TO SEND</p>
          <div className="rounded-xl bg-white p-3 shadow-[0_6px_18px_rgba(40,40,100,0.07)]">
            <p className="text-[12px] font-semibold">Patrol note · Loading bay</p>
            <p className="text-[10px] text-[#667085]">Saved 10:12</p>
          </div>
        </div>
      </StoryPhone>
    </>
  );
}

export function MobileLocationVariantZone() {
  return (
    <>
      <Shot step="11:40 · Power saving, still in zone">
        <LocationCheckIn />
      </Shot>
      <Shot step="11:41 · Drag the pin, then send">
        <LocationCheckIn startOpen />
      </Shot>
      <Shot step="11:52 · Leaves the zone">
        <StoryPhone title="Location">
          <div className="rounded-xl bg-[#e7f6f8] p-3">
            <p className="text-[10px] font-bold tracking-wide text-[#0f6e74]">NOW IN</p>
            <p className="text-[18px] font-bold text-[#0f6e74]">Loading bay</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              ["STATUS", "Active"],
              ["ACCURACY", "7 m"],
              ["ZONE", "Loading bay"],
              ["UPDATE", "300 s"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-white p-2.5 shadow-[0_4px_12px_rgba(40,40,100,0.06)]">
                <p className="text-[9px] font-bold tracking-wide text-[#8b93a7]">{k}</p>
                <p className="text-[14px] font-bold">{v}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="mb-1.5 text-[10px] font-bold tracking-[0.14em] text-[#667085]">ZONE LOG</p>
            <div className="rounded-xl bg-white px-3 py-1 shadow-[0_6px_18px_rgba(40,40,100,0.07)]">
              {[
                ["11:52", "Entered Loading bay"],
                ["11:51", "Left Gate 2"],
                ["09:52", "Entered Gate 2"],
              ].map(([t, v]) => (
                <div key={t} className="flex justify-between border-b border-black/5 py-1.5 text-[11px] last:border-0">
                  <span className="text-[#8b93a7]">{t}</span>
                  <span className="font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </StoryPhone>
      </Shot>
    </>
  );
}

function HelpStep({ sheet }: { sheet?: ReactNode }) {
  return (
    <StoryPhone title="Guidance" sheet={sheet}>
      <span className="w-fit rounded-md bg-[#e7f6f8] px-2 py-0.5 text-[9px] font-bold tracking-wide text-[#1498b0]">
        GUIDANCE NEWS
      </span>
      <p className="-mt-1 text-[22px] font-bold">Guidance</p>
      <div className="rounded-2xl bg-[#eceff3] px-3.5 py-3">
        <p className="text-[13px] font-semibold">My active response</p>
        <p className="mt-0.5 text-[11px] text-[#667085]">Perimeter check · step 3 of 5</p>
      </div>
      <div className="grid h-11 place-items-center rounded-2xl border border-[#d5d8e0] bg-[#eceff3] text-[13px] font-semibold">
        I need help with this step
      </div>
    </StoryPhone>
  );
}

export function MobileLocationVariantGuidance() {
  return (
    <>
      <Shot step="Our page. You are clear">
        <WebGuidance />
      </Shot>
      <Shot step="14:21 · Hold the phone to the tag">
        <StoryPhone title="Guidance">
          <span className="w-fit rounded-md bg-[#e7f6f8] px-2 py-0.5 text-[9px] font-bold tracking-wide text-[#1498b0]">
            GUIDANCE NEWS
          </span>
          <p className="-mt-1 text-[20px] font-bold">Perimeter check</p>
          <div className="rounded-xl bg-white p-3 shadow-[0_6px_18px_rgba(40,40,100,0.07)]">
            <p className="text-[12px] font-semibold">Step 2 of 5 · Gate 2</p>
            <div className="mt-2 h-1.5 rounded-full bg-[#e7f6f8]">
              <div className="h-full w-2/5 rounded-full bg-[#1498b0]" />
            </div>
            <p className="mt-2 text-[11px] leading-4">Check the fence line, then tap the post tag.</p>
          </div>
          <div className="rounded-xl bg-[#e7f6f8] p-3">
            <p className="text-[10px] leading-4 text-[#0f6e74]">
              Admin is following your step and position, not your screen.
            </p>
          </div>
          <div className="rounded-xl bg-white p-3 text-center shadow-sm">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-dashed border-[#1498b0] text-[10px] font-bold text-[#1498b0]">
              NFC
            </span>
            <p className="mt-1 text-[10px] text-[#667085]">Hold the phone to the tag</p>
          </div>
        </StoryPhone>
      </Shot>
      <Shot step="The step. Press I need help with this step">
        <HelpStep />
      </Shot>
      <Shot step="14:27 · Same screen, help requested">
        <HelpStep
          sheet={
            <>
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#22a85a] text-white">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 12.5 10 16.5 18 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
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
                style={{ background: "linear-gradient(90deg, #1aa6a6 0%, #1498b0 100%)" }}
              >
                Close
              </div>
            </>
          }
        />
      </Shot>
    </>
  );
}

export function MobileLocationVariantClear() {
  return (
    <>
      <Shot step="1. Press End shift and clear this phone">
        <TodayOnDuty
          sheet={
            <>
              <p className="text-[16px] font-semibold">End this shift?</p>
              <p className="mt-1 text-[12px] leading-5 text-[#667085]">
                Press the button below. These stop on this phone:
              </p>
              <ul className="mt-3 space-y-1 text-left text-[13px] text-[#3c4558]">
                <li>Live location</li>
                <li>SOS standby</li>
                <li>The saved patrol note, after it sends</li>
              </ul>
              <div className="mt-4 space-y-2">
                <SheetButton>End shift and clear this phone</SheetButton>
                <SheetButton tone="ghost">Stay on this shift</SheetButton>
              </div>
            </>
          }
        />
      </Shot>
      <Shot step="2. This phone is clear">
        <WaitingShift
          sheet={
            <>
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#22a85a] text-white">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 12.5 10 16.5 18 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="mt-3 text-[16px] font-semibold">This phone is clear</p>
              <p className="mt-1 text-[12px] leading-5 text-[#667085]">
                Location stopped. SOS closed. The screen behind this sheet is waiting. The next officer taps their badge.
              </p>
              <div className="mt-4">
                <SheetButton>Done</SheetButton>
              </div>
            </>
          }
        />
      </Shot>
    </>
  );
}

const variantMap: Record<MobileLocationVariantId, ComponentType> = {
  "web-location": MobileLocationVariantWeb,
  "live-fix": MobileLocationVariantFix,
  "zone-checkin": MobileLocationVariantZone,
  "guidance-help": MobileLocationVariantGuidance,
  "shift-clear": MobileLocationVariantClear,
};

export function MobileLocationVariant({ id }: { id: MobileLocationVariantId }) {
  return createElement(variantMap[id]);
}
