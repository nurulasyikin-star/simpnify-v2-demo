import { createElement, type ComponentType, type ReactNode } from "react";

import {
  Phone,
  Popup,
  SimplifyMark,
} from "@/components/mobile-auth-variants";
import {
  MobileAccountabilityVariantBadge,
  MobileAccountabilityVariantClear,
  MobileAccountabilityVariantHealth,
  MobileAccountabilityVariantLock,
} from "@/components/mobile-accountability-variants";
import { publicAsset } from "@/lib/site-path";

export type MobileWorkVariantId =
  | "web-work"
  | "role-badge"
  | "work-lock"
  | "evac-lock"
  | "evac-health"
  | "evac-clear";

export type MobileWorkVariantMeta = {
  id: MobileWorkVariantId;
  lane: "ours" | "soti";
  title: string;
  tagline: string;
  scene: string;
  soti: string;
  pros: string[];
  cons: string[];
};

export const mobileWorkVariants: MobileWorkVariantMeta[] = [
  {
    id: "web-work",
    lane: "ours",
    title: "A — Our design",
    tagline:
      "The Work list from the shared phone, then Emergency accountability with View as a picker for Incident Commander or Logistic Manager.",
    scene: "Reference. Browser address bar, Install, View as a list anyone can open.",
    soti: "Kept as the reference so it can be compared with the SOTI flow below.",
    pros: [
      "Same tools as the live Work page, with Emergency accountability first",
      "Same words on the form: declare an evacuation, account for people, record observations",
      "Declare evacuation is a single press",
    ],
    cons: [
      "The address bar and Install sit above the incident",
      "Anyone holding the shared phone can open View and become Incident Commander",
      "The next officer can inherit site, roster, and observations if the phone is not cleared",
    ],
  },
  {
    id: "role-badge",
    lane: "soti",
    title: "B — Step 1. Badge sets the role",
    tagline:
      "The shared phone stays on Simpnify. The officer taps their badge. View becomes Incident Commander. There is no list to pick from.",
    scene: "Waiting phone. Hold the badge. Incident Commander from this badge.",
    soti: "SOTI Identity NFC sign-in, with SSO. Shared Device maps that user to the matching lockdown group. Incident Commander or Logistic Manager comes from the badge, not from View.",
    pros: [
      "The role is who is holding the phone, not who opened a list",
      "Logistic Manager cannot become Incident Commander by tapping View",
      "If the badge misses, the phone stays waiting",
    ],
    cons: [
      "Needs a badge and NFC on the phone",
      "A missing or swapped badge still needs a password fallback",
    ],
  },
  {
    id: "work-lock",
    lane: "soti",
    title: "C — Step 2. Work stays on Simpnify",
    tagline:
      "After the badge. The Work list is the only home. Emergency accountability is the first tool. Administration stays on the web console.",
    scene: "Work hub. Tap Emergency accountability.",
    soti: "SOTI Lockdown with SSO. The working profile is the officer’s tools. The phone cannot leave Simpnify. Role comes from the badge, not from a list on this screen.",
    pros: [
      "The six field tools are the home screen, not a browser page",
      "Lone-worker SOS stays on the same list",
      "Administration never appears on the phone",
    ],
    cons: [
      "Hiding the phone home button still belongs to device management",
      "A second officer cannot open a different role on this phone until it is cleared",
    ],
  },
  {
    id: "evac-lock",
    lane: "soti",
    title: "D — Step 3. Emergency accountability",
    tagline:
      "The form from your screenshot, with no browser chrome. View is locked as Incident Commander. Declare evacuation, then this phone stays here.",
    scene: "View locked. Evacuation declared, phone stays.",
    soti: "SOTI Lockdown. During an evacuation the officer cannot leave Simpnify. View comes from the badge. Time and battery stay in the status bar.",
    pros: [
      "No Chrome, URL, or Install above the incident",
      "View is a locked chip from the badge, not Incident Commander / Logistic Manager",
      "The phone stays on this screen after Declare evacuation",
    ],
    cons: [
      "Logistic Manager cannot jump in on this same phone until it is cleared",
      "Hiding the phone home button still belongs to device management",
    ],
  },
  {
    id: "evac-health",
    lane: "soti",
    title: "E — Step 4. Phone is struggling",
    tagline:
      "Left, the phone is fit for the incident. Right, the signal drops. Observations stay on the phone. The console sees the device, not the names.",
    scene: "16:04 the phone is on signal. 16:11 Gate 2 drops the signal.",
    soti: "SOTI XSight device health: battery, signal, and last check-in, shown to the officer. The console sees the phone, not this screen. Remote viewing stays off.",
    pros: [
      "Battery, signal, and last check-in sit on the incident, not on a second page",
      "Unaccounted people are not lost when the signal drops",
      "The screen says the console follows the phone, not the names",
    ],
    cons: [
      "Two states on one step, so the reader has to take them as before and after",
      "The console still cannot see who is missing, only that the phone went offline",
    ],
  },
  {
    id: "evac-clear",
    lane: "soti",
    title: "F — Step 5. Phone is clear",
    tagline:
      "Three presses. Clear this phone on the incident, confirm what stops, then the phone is waiting for the next badge.",
    scene: "1 press Clear this phone. 2 confirm. 3 the phone is clear.",
    soti: "SOTI shared-device logout that clears app data. Site, roster, observations, and the Incident Commander view belong to this officer. Logout wipes them.",
    pros: [
      "The button to press is on the incident, not hidden in a menu",
      "The confirm sheet lists site, roster, observations, and the role before anything clears",
      "The last screen is waiting, so the next officer knows to tap a badge",
    ],
    cons: [
      "Three screens for one logout",
      "Leaving the phone locked, without Clear this phone, does not clear it",
    ],
  },
];

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

function Tabs({
  active = "Work",
  theme = "light",
  labels = ["Today", "Work", "Inbox", "Comms"],
}: {
  active?: string;
  theme?: "light" | "dark";
  labels?: string[];
}) {
  const dark = theme === "dark";
  return (
    <div
      className={`grid grid-cols-4 border-t py-1.5 text-center text-[9px] ${
        dark ? "border-white/10 text-white/40" : "border-black/5 text-[#8b93a7]"
      }`}
    >
      {labels.map((t) => (
        <span
          key={t}
          className={t === active ? "font-semibold text-[#1498b0]" : undefined}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

const WORK_TOOLS = [
  ["Emergency accountability", "Record muster attendance and reconnoitre observations"],
  ["Guidance", "Complete assigned response steps"],
  ["Reports", "Record field notes or report an incident"],
  ["Briefings", "Read and acknowledge post orders"],
  ["Patrols", "Run assigned routes and checkpoints"],
  ["Lone-worker Safety", "Check in on this phone and hold SOS"],
];

function WorkWebPhone() {
  return (
    <Phone surface="web">
      <div className="mx-3 mt-1 flex h-7 items-center gap-1.5 rounded-full bg-white/80 px-2 text-[9px] text-[#3c4558]">
        <span className="text-[10px]">✕</span>
        <span className="text-[10px] text-[#8b93a7]">▾</span>
        <span className="min-w-0 flex-1 truncate">192.168.0.26:7100/m</span>
      </div>
      <div className="flex items-center justify-between gap-2 px-3.5 pb-1 pt-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#1aa6a6] text-[12px] font-bold text-white">
            S
          </span>
          <span className="min-w-0 text-[11px] font-semibold leading-tight">
            Simple Unified Platform
            <span className="block font-medium text-[#8b93a7]">Unified security operations</span>
          </span>
        </div>
        <span className="shrink-0 rounded-full bg-[#e7f6f8] px-2 py-1 text-[8px] font-medium text-[#1a7f8c]">
          Install
        </span>
      </div>
      <div className="flex-1 overflow-hidden bg-[#f3f6f8] px-3 pb-1 pt-2">
        <p className="text-[9px] font-semibold tracking-[0.14em] text-[#5f7a84]">
          FIELD OPERATIONS
        </p>
        <div className="mt-1 rounded-2xl bg-[#0e5a6e] px-4 py-3 text-white">
          <h3 className="text-[20px] font-semibold">Work</h3>
          <p className="mt-1 text-[10px] leading-4 text-white/80">
            You also control which field tools appear. Administration and
            configuration stay on the Web console.
          </p>
        </div>
        <div className="mt-2 space-y-1.5">
          {WORK_TOOLS.map(([label, hint]) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-[0_1px_4px_rgba(20,40,50,0.04)]"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#e7f6f8] text-[11px] font-semibold text-[#1498b0]">
                {label === "Lone-worker Safety" ? "SOS" : label.slice(0, 1)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1 text-[12px] font-semibold text-[#1c2434]">
                  {label}
                  {label === "Lone-worker Safety" ? (
                    <span className="rounded-full bg-[#e5334b] px-1.5 py-px text-[8px] font-bold text-white">
                      SOS
                    </span>
                  ) : null}
                </span>
                <span className="block text-[9px] leading-3 text-[#8b93a7]">{hint}</span>
              </span>
              <span className="text-[#c5ccd6]">›</span>
            </div>
          ))}
        </div>
      </div>
      <Tabs labels={["Today", "Work", "Inbox", "Camera"]} />
    </Phone>
  );
}

function WorkHub({
  theme = "light",
  sheet,
}: {
  theme?: "light" | "dark";
  sheet?: ReactNode;
}) {
  const dark = theme === "dark";
  return (
    <Phone theme={theme}>
      <SimplifyMark theme={theme} />
      <div className="px-4 pt-2">
        <p className="text-[9px] font-semibold tracking-[0.14em] text-[#1498b0]">
          FIELD OPERATIONS
        </p>
        <h3 className="mt-0.5 text-[20px] font-semibold">Work</h3>
        <p className={`mt-1 text-[10px] leading-4 ${dark ? "text-white/55" : "text-[#667085]"}`}>
          This phone stays on Simpnify. Administration stays on the web console.
        </p>
      </div>
      <div className="mt-2 flex-1 space-y-1.5 px-3">
        {WORK_TOOLS.map(([label, hint]) => {
          const first = label === "Emergency accountability";
          return (
            <div
              key={label}
              className={`flex items-center gap-2 rounded-2xl px-3 py-2 ${
                first
                  ? "bg-[#e7f6f8] ring-1 ring-[#1498b0]/40"
                  : dark
                    ? "bg-white/5"
                    : "bg-white shadow-[0_1px_4px_rgba(20,40,50,0.04)]"
              }`}
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-semibold ${
                  first ? "bg-[#1498b0] text-white" : "bg-[#e7f6f8] text-[#1498b0]"
                }`}
              >
                {label === "Lone-worker Safety" ? "SOS" : label.slice(0, 1)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1 text-[12px] font-semibold">
                  {label}
                  {label === "Lone-worker Safety" ? (
                    <span className="rounded-full bg-[#e5334b] px-1.5 py-px text-[8px] font-bold text-white">
                      SOS
                    </span>
                  ) : null}
                </span>
                <span className={`block text-[9px] leading-3 ${dark ? "text-white/45" : "text-[#8b93a7]"}`}>
                  {hint}
                </span>
              </span>
              <span className={dark ? "text-white/25" : "text-[#c5ccd6]"}>›</span>
            </div>
          );
        })}
      </div>
      <Tabs theme={theme} />
      {sheet ? (
        <>
          <div className="absolute inset-0 bg-[#12141c]/35" />
          {sheet}
        </>
      ) : null}
    </Phone>
  );
}

export function MobileWorkVariantWeb() {
  return (
    <>
      <Shot step="Work list in the phone browser">
        <WorkWebPhone />
      </Shot>
      <img
        src={publicAsset("/photos/emergency-accountability-ours.png")}
        alt="Our design. Emergency accountability in the phone browser, View picker open."
        className="w-full max-w-[640px] shrink-0 rounded-2xl"
      />
    </>
  );
}

export function MobileWorkVariantLock() {
  return (
    <>
      <Shot step="Work is the only home">
        <WorkHub />
      </Shot>
      <Shot step="Emergency accountability is the first tool">
        <WorkHub
          sheet={
            <Popup
              tone="ok"
              title="Opens as Incident Commander"
              body="The badge already set this role. There is no View list to pick Logistic Manager."
            />
          }
        />
      </Shot>
    </>
  );
}

const variantMap: Record<MobileWorkVariantId, ComponentType> = {
  "web-work": MobileWorkVariantWeb,
  "role-badge": MobileAccountabilityVariantBadge,
  "work-lock": MobileWorkVariantLock,
  "evac-lock": MobileAccountabilityVariantLock,
  "evac-health": MobileAccountabilityVariantHealth,
  "evac-clear": MobileAccountabilityVariantClear,
};

export function MobileWorkVariant({ id }: { id: MobileWorkVariantId }) {
  return createElement(variantMap[id]);
}
