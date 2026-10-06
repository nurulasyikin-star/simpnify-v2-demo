import type { ReactNode } from "react";

export type ModuleId = "today" | "location" | "guidance" | "briefings";

export type ModuleVariant = {
  id: string;
  title: string;
  tagline: string;
  soti: string;
  pros: string[];
  cons: string[];
  render: () => ReactNode;
};

const NAVY = "#2b2a6b";
const TEAL = "linear-gradient(135deg, #1aa6a6 0%, #1e4f8f 100%)";

export function Phone({
  title,
  back,
  tab,
  fab,
  children,
}: {
  title?: string;
  back?: boolean;
  tab?: string;
  fab?: boolean;
  children: ReactNode;
}) {
  const tabs = ["Today", "Work", "Inbox", "Comms"];
  return (
    <div className="w-[270px] shrink-0 rounded-[2.2rem] border border-black/40 bg-black p-[9px] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
      <div className="relative flex min-h-[560px] flex-col overflow-hidden rounded-[1.75rem] bg-[#f4f5fa] text-[#1c2434]">
        <div className="absolute left-1/2 top-2 z-20 h-[16px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
        <div
          className="px-5 pb-3 pt-3 text-white"
          style={{ background: NAVY }}
        >
          <div className="flex items-center justify-between text-[10px] font-semibold text-white/80">
            <span>9:41</span>
            <span>5G</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {back ? (
                <span className="text-lg leading-none">‹</span>
              ) : (
                <span className="grid h-6 w-6 place-items-center rounded-md bg-[#5b4dff] text-[11px] font-bold">
                  S
                </span>
              )}
              <span className="text-[14px] font-semibold">
                {title ?? "Simplify"}
              </span>
            </div>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15 text-[10px]">
              T
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2.5 px-3 pb-3 pt-3">
          {children}
        </div>
        {fab ? (
          <span className="absolute bottom-16 left-3 grid h-11 w-11 place-items-center rounded-full bg-[#e5334b] text-[10px] font-bold text-white shadow-lg">
            SOS
          </span>
        ) : null}
        <div className="grid grid-cols-4 border-t border-black/10 bg-white py-2 text-center text-[10px] text-[#8b93a7]">
          {tabs.map((t) => (
            <span
              key={t}
              className={t === (tab ?? "Today") ? "font-semibold text-[#5b4dff]" : ""}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function WebPhone({ children }: { children: ReactNode }) {
  return (
    <div className="w-[270px] shrink-0 rounded-[2.2rem] border border-black/40 bg-black p-[9px] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
      <div className="flex min-h-[560px] flex-col overflow-hidden rounded-[1.75rem] bg-white text-[#1c2434]">
        <div className="mx-3 mt-3 flex h-7 items-center gap-2 rounded-full bg-[#eef1f4] px-3 text-[10px] text-[#667085]">
          <span className="h-2 w-2 rounded-full bg-[#22a85a]" />
          simpnify.app
        </div>
        <div className="flex flex-1 flex-col gap-2.5 px-3 pb-3 pt-3">{children}</div>
        <div className="grid grid-cols-4 border-t border-black/10 py-2 text-center text-[10px] text-[#667085]">
          <span className="font-semibold text-[#1a7f8c]">Today</span>
          <span>Work</span>
          <span>Inbox</span>
          <span>Comms</span>
        </div>
      </div>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl bg-white p-3 shadow-[0_6px_18px_rgba(40,40,100,0.07)] ${className}`}>
      {children}
    </div>
  );
}

export function Hero({ label, title, sub }: { label: string; title: string; sub?: string }) {
  return (
    <div className="rounded-xl p-3 text-white" style={{ background: TEAL }}>
      <p className="text-[9px] font-semibold tracking-[0.16em] text-white/75">{label}</p>
      <p className="mt-0.5 text-[20px] font-semibold leading-6">{title}</p>
      {sub ? <p className="mt-1 text-[11px] leading-4 text-white/85">{sub}</p> : null}
    </div>
  );
}

export function Btn({ children, tone = "purple" }: { children: ReactNode; tone?: "purple" | "ghost" | "red" }) {
  const cls =
    tone === "purple"
      ? "bg-[#5b4dff] text-white"
      : tone === "red"
        ? "bg-[#e5334b] text-white"
        : "border border-[#d9dcec] text-[#3c4558]";
  return (
    <div className={`grid h-10 place-items-center rounded-lg text-[13px] font-semibold ${cls}`}>
      {children}
    </div>
  );
}

export function Chip({ children, tone = "ok" }: { children: ReactNode; tone?: "ok" | "warn" | "bad" | "info" }) {
  const cls = {
    ok: "bg-[#e3f6ea] text-[#1b7a45]",
    warn: "bg-[#fff3d1] text-[#8a6410]",
    bad: "bg-[#ffe3e7] text-[#b3243a]",
    info: "bg-[#ebe8ff] text-[#4a3fd6]",
  }[tone];
  return <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${cls}`}>{children}</span>;
}

export function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/5 py-1.5 text-[11px] last:border-0">
      <span className="font-medium tracking-wide text-[#8b93a7]">{k}</span>
      <span className="font-semibold">{v}</span>
    </div>
  );
}

export function Quick() {
  const items = ["Documents", "Shortcuts", "Patrols", "Reports"];
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((i) => (
        <div key={i} className="text-center">
          <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-[#ebe8ff] text-[11px] font-bold text-[#5b4dff]">
            {i[0]}
          </span>
          <p className="mt-1 text-[9px] text-[#667085]">{i}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- TODAY ---------- */
const today: ModuleVariant[] = [
  {
    id: "today-web",
    title: "A — Web Today",
    tagline: "Teal header card, small stats, empty Next up.",
    soti: "Baseline. Not a SOTI feature.",
    pros: ["Matches the live web mobile", "Shows what is being replaced"],
    cons: ["One long scroll", "Location status is easy to miss"],
    render: () => (
      <WebPhone>
        <div className="rounded-lg bg-[#1a8d93] p-3 text-white">
          <p className="text-[9px] tracking-[0.16em]">YOUR SHIFT</p>
          <p className="text-[18px] font-semibold">Today</p>
        </div>
        <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
          {["0 Guidance", "0 Patrols", "0 Briefings", "1 Inbox"].map((s) => (
            <div key={s} className="rounded-lg border border-black/10 py-2">{s}</div>
          ))}
        </div>
        <p className="mt-1 text-[12px] font-semibold">Next up</p>
        <p className="text-[11px] text-[#667085]">Nothing scheduled.</p>
      </WebPhone>
    ),
  },
  {
    id: "today-native",
    title: "B — Native Today",
    tagline: "Your frame: teal card, live location card, quick actions, Next up, tab bar.",
    soti: "Your native design. Not taken from SOTI.",
    pros: ["Location has its own card with Configure", "Quick actions replace the stat row", "Tab bar is thumb-reachable"],
    cons: ["Counts for guidance and briefings are gone", "Four shortcuts must be chosen per role"],
    render: () => (
      <Phone fab>
        <Hero label="YOUR SHIFT" title="Today" sub="Only work and safety information for your role." />
        <Card>
          <p className="text-[10px] text-[#8b93a7]">Operational safety status</p>
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold">My Live Location</p>
            <span className="rounded-md bg-[#ebe8ff] px-2 py-1 text-[10px] font-semibold text-[#5b4dff]">Configure</span>
          </div>
        </Card>
        <Quick />
        <Card>
          <p className="text-[12px] font-semibold">Next up</p>
          <p className="mt-1 text-[11px] text-[#667085]">No pending risk.</p>
        </Card>
      </Phone>
    ),
  },
  {
    id: "today-health",
    title: "C — Handphone health strip",
    tagline: "Battery, signal, GPS, and last sync under the Today card.",
    soti: "SOTI XSight device health: battery, connectivity, and last check-in. Officer sees it; no remote screen view.",
    pros: ["Officer knows the phone is fit before a patrol", "One line, not a dashboard", "Same data the console would see"],
    cons: ["Another strip on a busy screen", "Needs the app to read battery and signal"],
    render: () => (
      <Phone fab>
        <Hero label="YOUR SHIFT" title="Today" />
        <Card>
          <p className="text-[10px] font-semibold text-[#8b93a7]">THIS HANDPHONE</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Chip tone="warn">Battery 24%</Chip>
            <Chip>5G strong</Chip>
            <Chip>GPS active</Chip>
            <Chip tone="info">Synced 10:14</Chip>
          </div>
          <p className="mt-2 text-[10px] text-[#667085]">Charge before your next patrol.</p>
        </Card>
        <Quick />
        <Card>
          <p className="text-[12px] font-semibold">Next up</p>
          <p className="mt-1 text-[11px] text-[#667085]">No pending risk.</p>
        </Card>
      </Phone>
    ),
  },
  {
    id: "today-offline",
    title: "D — Offline queue banner",
    tagline: "When signal drops, Today says what is saved on the phone and waiting to send.",
    soti: "SOTI keeps field work running offline and syncs when the handphone reconnects.",
    pros: ["Officers stop retyping a report they think was lost", "SOS limits are stated plainly", "Fits basements and car parks"],
    cons: ["Needs a local queue in the native app", "Banner must clear itself cleanly"],
    render: () => (
      <Phone fab>
        <div className="rounded-xl bg-[#fff3d1] p-3">
          <p className="text-[12px] font-semibold text-[#8a6410]">You are offline</p>
          <p className="mt-0.5 text-[11px] leading-4 text-[#8a6410]">
            2 reports saved on this phone. They send when signal returns. SOS needs signal.
          </p>
        </div>
        <Hero label="YOUR SHIFT" title="Today" />
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold">Waiting to send</p>
            <Chip tone="warn">2</Chip>
          </div>
          <p className="mt-1 text-[11px] text-[#667085]">Patrol note · Gate 2 report</p>
        </Card>
        <Quick />
      </Phone>
    ),
  },
];

/* ---------- LOCATION ---------- */
const location: ModuleVariant[] = [
  {
    id: "location-web",
    title: "A — Web Location",
    tagline: "Dense text about background GPS and a tracking-request table.",
    soti: "Baseline. Not a SOTI feature.",
    pros: ["Matches the live web mobile"],
    cons: ["Text heavy", "No clear active or off state"],
    render: () => (
      <WebPhone>
        <p className="text-[15px] font-semibold">Location</p>
        <p className="text-[11px] leading-4 text-[#667085]">
          Background GPS publishes your position every 120 seconds while a shift is active. Coordinators may request tracking.
        </p>
        <div className="rounded-lg border border-black/10 text-[10px]">
          <div className="flex justify-between border-b border-black/10 p-2 font-semibold"><span>Request</span><span>Status</span></div>
          <div className="flex justify-between p-2"><span>None</span><span>-</span></div>
        </div>
      </WebPhone>
    ),
  },
  {
    id: "location-native",
    title: "B — Native Location",
    tagline: "Your frame: status card, four metrics, privacy and battery note, red SOS button.",
    soti: "Your native design. Not taken from SOTI.",
    pros: ["Active state is obvious", "Metrics are scannable", "SOS stays reachable"],
    cons: ["Still has no map or place name", "Privacy note needs plain wording"],
    render: () => (
      <Phone title="Location" back fab>
        <Card>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#e5334b]" />
            <p className="text-[12px] font-semibold">Background GPS is publishing</p>
          </div>
        </Card>
        <Card>
          <Row k="STATUS" v="ACTIVE" />
          <Row k="ACCURACY" v="0 m" />
          <Row k="LAST TIME" v="10:14" />
          <Row k="HEARTBEAT" v="120 s" />
        </Card>
        <Card>
          <p className="text-[12px] font-semibold">Privacy and battery</p>
          <p className="mt-1 text-[10px] leading-4 text-[#667085]">Position is shared with your coordinator only while on shift.</p>
        </Card>
        <Btn>Next</Btn>
      </Phone>
    ),
  },
  {
    id: "location-zone",
    title: "C — Post zone status",
    tagline: "Says which site zone the officer is in, and logs entering and leaving it.",
    soti: "SOTI geofencing. We use it as a status and a log. We do not use it to install or remove apps.",
    pros: ["Turns coordinates into “Gate 2”", "Entry and exit are a simple log", "Gives the Today card something useful to say"],
    cons: ["Needs zones drawn per site", "Poor accuracy indoors can flip the status"],
    render: () => (
      <Phone title="Location" back fab>
        <div className="rounded-xl bg-[#e3f6ea] p-3">
          <p className="text-[10px] font-semibold tracking-wide text-[#1b7a45]">INSIDE ZONE</p>
          <p className="text-[18px] font-semibold text-[#14573a]">Gate 2 perimeter</p>
          <p className="text-[10px] text-[#1b7a45]">Entered 09:52 · accuracy 6 m</p>
        </div>
        <Card>
          <p className="text-[12px] font-semibold">Today</p>
          <Row k="09:52" v="Entered Gate 2" />
          <Row k="09:20" v="Left Loading bay" />
          <Row k="08:58" v="Entered Loading bay" />
        </Card>
        <Btn tone="ghost">View on map</Btn>
      </Phone>
    ),
  },
  {
    id: "location-battery",
    title: "D — Battery-aware tracking",
    tagline: "Low battery slows position updates and says so, so the phone lasts the shift.",
    soti: "SOTI device health and battery policies: trade update rate for battery before the handphone dies.",
    pros: ["Answers the “Privacy and battery” worry on screen", "Officer can send a fix on demand", "Admin still sees last known position"],
    cons: ["Slower updates mean a coarser trail", "Needs a rule for when SOS overrides it"],
    render: () => (
      <Phone title="Location" back fab>
        <div className="rounded-xl bg-[#fff3d1] p-3">
          <p className="text-[12px] font-semibold text-[#8a6410]">Battery 18% — saving power</p>
          <p className="mt-0.5 text-[10px] leading-4 text-[#8a6410]">Updates slowed to every 300 s. SOS always sends live position.</p>
        </div>
        <Card>
          <Row k="STATUS" v="ACTIVE" />
          <Row k="HEARTBEAT" v="300 s" />
          <Row k="LAST TIME" v="10:14" />
        </Card>
        <Btn>Update Location Now</Btn>
        <p className="text-center text-[10px] text-[#8b93a7]">Sends one fix now. Uses a little more battery.</p>
        <Btn tone="ghost">Keep power saving</Btn>
      </Phone>
    ),
  },
];

/* ---------- GUIDANCE ---------- */
const guidance: ModuleVariant[] = [
  {
    id: "guidance-web",
    title: "A — Web Guidance",
    tagline: "“You are clear”, available assignments, and history.",
    soti: "Baseline. Not a SOTI feature.",
    pros: ["Matches the live web mobile"],
    cons: ["Status is text only", "Lists do not show they open"],
    render: () => (
      <WebPhone>
        <div className="rounded-lg bg-[#e3f6ea] p-3 text-[13px] font-semibold text-[#14573a]">✓ You are clear</div>
        <p className="text-[12px] font-semibold">Available assignments</p>
        <p className="text-[11px] text-[#667085]">None.</p>
        <p className="text-[12px] font-semibold">History</p>
        <p className="text-[11px] text-[#667085]">No past responses.</p>
      </WebPhone>
    ),
  },
  {
    id: "guidance-native",
    title: "B — Native Guidance",
    tagline: "Your frame: status card with icon, chevron lists, red SOS button.",
    soti: "Your native design. Not taken from SOTI.",
    pros: ["Status has an icon, not only words", "Lists clearly open", "Active responses get their own section"],
    cons: ["The “No clear” wording in the frame reads as a typo", "Steps inside a response are not shown here"],
    render: () => (
      <Phone title="Guidance" back tab="Work" fab>
        <Card className="text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#ebe8ff] text-lg">📋</span>
          <p className="mt-2 text-[13px] font-semibold">You are clear</p>
        </Card>
        {["Available assignments", "My active responses", "History"].map((s) => (
          <Card key={s}>
            <div className="flex items-center justify-between text-[12px] font-semibold">
              <span>{s}</span>
              <span className="text-[#8b93a7]">›</span>
            </div>
          </Card>
        ))}
      </Phone>
    ),
  },
  {
    id: "guidance-scan",
    title: "C — Scan to confirm a step",
    tagline: "A checkpoint step is done by tapping an NFC tag or scanning a code at the spot.",
    soti: "SOTI rugged-handphone workflows: barcode and NFC scans prove the person was at the place.",
    pros: ["Proof of presence without typing", "Works with the NFC the badge idea needs", "Manual confirm remains as fallback"],
    cons: ["Tags must be fitted at each point", "Camera and NFC permissions to explain"],
    render: () => (
      <Phone title="Perimeter check" back tab="Work" fab>
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold">Step 2 of 5</p>
            <Chip tone="info">Gate 2</Chip>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-[#ebe8ff]"><div className="h-full w-2/5 rounded-full bg-[#5b4dff]" /></div>
          <p className="mt-3 text-[12px] leading-4">Check the fence line is intact, then confirm at the post tag.</p>
        </Card>
        <Card className="text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-dashed border-[#5b4dff] text-[11px] font-semibold text-[#5b4dff]">NFC</span>
          <p className="mt-2 text-[11px] text-[#667085]">Hold the phone to the tag</p>
        </Card>
        <Btn tone="ghost">Confirm without a tag</Btn>
      </Phone>
    ),
  },
  {
    id: "guidance-live",
    title: "D — Console sees my step",
    tagline: "The officer sees that the coordinator can follow progress, and can ask for help from a step.",
    soti: "SOTI XSight live visibility of what a handphone is doing, limited to the step and not the screen.",
    pros: ["Coordinator knows who is stuck at which step", "Ask for help sits inside the step", "No remote screen view"],
    cons: ["Officers may feel watched, so the wording matters", "Needs live sync on every step"],
    render: () => (
      <Phone title="Perimeter check" back tab="Work" fab>
        <Card>
          <p className="text-[12px] font-semibold">Step 3 of 5</p>
          <p className="mt-1 text-[11px] leading-4">Photograph the gate lock.</p>
        </Card>
        <div className="rounded-xl bg-[#ebe8ff] p-3">
          <p className="text-[11px] font-semibold text-[#4a3fd6]">Console is following</p>
          <p className="text-[10px] leading-4 text-[#4a3fd6]">They see your step and position, not your screen.</p>
        </div>
        <Btn>Take photo</Btn>
        <Btn tone="ghost">I need help with this step</Btn>
      </Phone>
    ),
  },
];

/* ---------- BRIEFINGS ---------- */
const briefings: ModuleVariant[] = [
  {
    id: "briefings-web",
    title: "A — Web Briefings",
    tagline: "A single “No active briefings” line.",
    soti: "Baseline. Not a SOTI feature.",
    pros: ["Matches the live web mobile"],
    cons: ["Empty state does little", "No way to tell a briefing was read"],
    render: () => (
      <WebPhone>
        <p className="text-[15px] font-semibold">Briefings</p>
        <p className="text-[11px] text-[#667085]">No active briefings.</p>
      </WebPhone>
    ),
  },
  {
    id: "briefings-native",
    title: "B — Native Briefings",
    tagline: "Your frame: the teal header card from Today, with a centred empty state.",
    soti: "Your native design. Not taken from SOTI.",
    pros: ["Same header as Today", "Calmer empty state"],
    cons: ["Nothing shows what a live briefing looks like"],
    render: () => (
      <Phone title="Briefings" back tab="Work" fab>
        <Hero label="SHIFT BRIEFINGS" title="Briefings" sub="Read before you start patrol." />
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[#ebe8ff] text-xl">📄</span>
          <p className="mt-2 text-[13px] font-semibold">No active briefings</p>
        </div>
      </Phone>
    ),
  },
  {
    id: "briefings-ack",
    title: "C — Pushed briefing, acknowledge",
    tagline: "A new briefing arrives with a badge and needs one tap to acknowledge. The console sees who has.",
    soti: "SOTI content push to handphones with read confirmation.",
    pros: ["Proof each officer read it", "Unread count shows on the tab", "Short, one action"],
    cons: ["Officers may tap without reading", "Needs a push channel in the native app"],
    render: () => (
      <Phone title="Briefings" back tab="Work" fab>
        <Card>
          <div className="flex items-center justify-between">
            <Chip tone="bad">New · High</Chip>
            <span className="text-[10px] text-[#8b93a7]">10:02</span>
          </div>
          <p className="mt-2 text-[13px] font-semibold">Gate 2 lock replaced</p>
          <p className="mt-1 text-[11px] leading-4 text-[#667085]">New key code starts at 18:00. Do not share by radio.</p>
        </Card>
        <Btn>Acknowledge</Btn>
        <p className="text-center text-[10px] text-[#8b93a7]">Seen by 6 of 9 officers</p>
      </Phone>
    ),
  },
  {
    id: "briefings-gate",
    title: "D — Read before shift",
    tagline: "Today opens only after the required briefing is acknowledged.",
    soti: "SOTI Lockdown idea: the handphone shows only what the policy allows until a condition is met.",
    pros: ["Nobody starts patrol unbriefed", "Builds on badge unlock", "Clear list of what is required"],
    cons: ["Blocks work if a briefing is long or wrong", "Needs an override for the supervisor"],
    render: () => (
      <Phone title="Before you start" tab="Today">
        <Hero label="REQUIRED" title="1 briefing to read" sub="Today opens after you acknowledge." />
        <Card>
          <p className="text-[12px] font-semibold">Gate 2 lock replaced</p>
          <p className="mt-1 text-[11px] text-[#667085]">2 min read</p>
        </Card>
        <Btn>Read and start shift</Btn>
        <p className="text-center text-[10px] text-[#8b93a7]">SOS is still available</p>
      </Phone>
    ),
  },
];

export const mobileModules: { id: ModuleId; title: string; intro: string; variants: ModuleVariant[] }[] = [
  { id: "today", title: "Today", intro: "Home. A is the web page, B is your native frame.", variants: today },
  { id: "location", title: "Location", intro: "Background GPS status and tracking requests.", variants: location },
  { id: "guidance", title: "Guidance", intro: "Assignments, active responses, and history.", variants: guidance },
  { id: "briefings", title: "Briefings", intro: "Shift briefings the officer must read.", variants: briefings },
];
