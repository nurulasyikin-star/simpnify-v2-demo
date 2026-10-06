import { createElement, type ComponentType, type ReactNode } from "react";

import {
  Phone,
  Popup,
  SimplifyMark,
} from "@/components/mobile-auth-variants";
import { publicAsset } from "@/lib/site-path";

export type MobileAccountabilityVariantId =
  | "web-accountability"
  | "role-badge"
  | "evac-lock"
  | "evac-health"
  | "evac-clear";

export type MobileAccountabilityVariantMeta = {
  id: MobileAccountabilityVariantId;
  lane: "ours" | "soti";
  title: string;
  tagline: string;
  scene: string;
  soti: string;
  pros: string[];
  cons: string[];
};

export const mobileAccountabilityVariants: MobileAccountabilityVariantMeta[] = [
  {
    id: "web-accountability",
    lane: "ours",
    title: "A — Our design",
    tagline:
      "The two screens in your screenshot. Emergency accountability in the phone browser, then the View list for Incident Commander or Logistic Manager.",
    scene: "Reference. Browser address bar, Install, View as a picker.",
    soti: "Kept as the reference so it can be compared with the SOTI flow below.",
    pros: [
      "Same words as the live page: declare an evacuation, account for people, record observations",
      "View already names the two roles that matter on this screen",
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
    id: "evac-lock",
    lane: "soti",
    title: "C — Step 2. Evacuation stays on Simpnify",
    tagline:
      "After the badge. Emergency accountability with no browser chrome. View is locked. Declare evacuation, then this phone stays here.",
    scene: "View locked. Evacuation declared, phone stays.",
    soti: "SOTI Lockdown replaces the home screen with authorized apps only. During an evacuation the officer cannot leave Simpnify. Time and battery stay in the status bar.",
    pros: [
      "No Chrome, URL, or Install above the incident",
      "View is a locked chip from the badge, not a dropdown",
      "The phone stays on this screen after Declare evacuation",
    ],
    cons: [
      "Hiding the phone home button still belongs to device management",
      "A second officer cannot jump in as Logistic Manager on this same phone until it is cleared",
    ],
  },
  {
    id: "evac-health",
    lane: "soti",
    title: "D — Step 3. Phone is struggling",
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
    title: "E — Step 4. Phone is clear",
    tagline:
      "Three presses. Clear this phone on the incident, confirm what stops, then the phone is the waiting screen from B for the next badge.",
    scene: "1 press Clear this phone. 2 confirm. 3 the phone is clear.",
    soti: "SOTI shared-device logout that clears app data. Site, roster, observations, and the Incident Commander view belong to this officer. Logout wipes them.",
    pros: [
      "The button to press is on the incident, not hidden in a menu",
      "The confirm sheet lists site, roster, observations, and the role before anything clears",
      "The last screen is B again, so the next officer knows to tap a badge",
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
}: {
  active?: string;
  theme?: "light" | "dark";
}) {
  const dark = theme === "dark";
  return (
    <div
      className={`grid grid-cols-4 border-t py-1.5 text-center text-[9px] ${
        dark ? "border-white/10 text-white/40" : "border-black/5 text-[#8b93a7]"
      }`}
    >
      {["Today", "Work", "Inbox", "Comms"].map((t) => (
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

function NfcMark() {
  return (
    <div className="relative grid h-36 w-36 place-items-center">
      <span className="absolute inset-0 rounded-full border border-[#1498b0]/15" />
      <span className="absolute inset-4 rounded-full border border-[#1498b0]/30" />
      <span className="absolute inset-8 rounded-full border border-[#1498b0]/50" />
      <div className="grid h-[88px] w-[88px] place-items-center rounded-full bg-[#e7f6f8] shadow-[0_10px_30px_rgba(20,152,176,0.16)]">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M8 7c2.2 2 2.2 8 0 10" stroke="#1498b0" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M12 4.5c3.6 3 3.6 12 0 15" stroke="#1498b0" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M16 2.5c5 4.2 5 14.8 0 19" stroke="#1498b0" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function WaitingPhone({ sheet }: { sheet?: ReactNode }) {
  return (
    <Phone>
      <SimplifyMark />
      <div className="flex flex-1 flex-col items-center px-5 pt-8 text-center">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#1498b0]">
          SHARED PHONE
        </p>
        <h3 className="mt-2 text-[20px] font-semibold leading-6">
          Tap your badge
        </h3>
        <p className="mt-3 max-w-[220px] text-[12px] leading-5 text-[#667085]">
          This phone stays on Simpnify. Emergency accountability opens as your
          role. Incident Commander or Logistic Manager comes from the badge, not
          a list.
        </p>
        <div className="mt-6 w-full rounded-2xl border border-[#d7eef2] bg-[#e7f6f8] px-3 py-3 text-left">
          <p className="text-[10px] font-semibold tracking-[0.12em] text-[#1498b0]">
            WAITING
          </p>
          <p className="mt-1 text-[13px] font-semibold">Emergency accountability</p>
          <p className="mt-0.5 text-[11px] leading-4 text-[#5f7a84]">
            No officer signed in. No evacuation on this phone.
          </p>
        </div>
        <div className="mt-auto w-full pb-2">
          <div className="grid h-11 place-items-center rounded-xl bg-[#1498b0] text-[14px] font-semibold text-white">
            Tap your badge here
          </div>
        </div>
      </div>
      <Tabs />
      {sheet ? (
        <>
          <div className="absolute inset-0 bg-[#12141c]/35" />
          {sheet}
        </>
      ) : null}
    </Phone>
  );
}

function BadgeHoldPhone() {
  return (
    <Phone>
      <SimplifyMark />
      <div className="flex flex-1 flex-col items-center px-6 pt-8 text-center">
        <NfcMark />
        <p className="mt-6 text-[11px] font-semibold tracking-[0.16em] text-[#1498b0]">
          SHARED PHONE
        </p>
        <h3 className="mt-2 text-[22px] font-semibold">Hold your badge here</h3>
        <p className="mt-3 max-w-[230px] text-[12px] leading-5 text-[#667085]">
          This tap is the sign-in. View will be Incident Commander for this
          officer. Settings and other apps stay off this screen.
        </p>
        <div className="mt-auto w-full pb-3">
          <div className="grid h-11 place-items-center rounded-xl border border-[#1498b0] text-[14px] font-semibold text-[#1498b0]">
            Use password instead
          </div>
        </div>
      </div>
    </Phone>
  );
}

function FieldRow({
  label,
  value,
  locked,
  muted,
  theme = "light",
}: {
  label: string;
  value: string;
  locked?: boolean;
  muted?: boolean;
  theme?: "light" | "dark";
}) {
  const dark = theme === "dark";
  return (
    <div className="px-4 pt-1.5">
      <p className={`text-[10px] font-medium ${dark ? "text-white/70" : "text-[#3c4558]"}`}>
        {label}
      </p>
      <div
        className={`mt-0.5 flex h-8 items-center justify-between rounded-lg border px-3 text-[11px] ${
          dark
            ? "border-white/10 bg-white/5 text-white"
            : "border-[#dfe5ea] bg-white text-[#1c2434]"
        }`}
      >
        <span className={muted ? (dark ? "text-white/40" : "text-[#a0a8b8]") : undefined}>
          {value}
        </span>
        {locked ? (
          <span className="text-[9px] font-semibold text-[#1498b0]">from your badge</span>
        ) : (
          <span className={dark ? "text-white/30" : "text-[#b6bdca]"}>⌄</span>
        )}
      </div>
    </div>
  );
}

function AccForm({
  theme = "light",
  declared = false,
  health = "ok",
  sheet,
  showClear = false,
}: {
  theme?: "light" | "dark";
  declared?: boolean;
  health?: "ok" | "offline";
  sheet?: ReactNode;
  showClear?: boolean;
}) {
  const dark = theme === "dark";
  const offline = health === "offline";
  return (
    <Phone theme={theme}>
      <SimplifyMark theme={theme} />
      <div className="px-4 pt-2">
        <p className="text-[9px] font-semibold tracking-[0.14em] text-[#1498b0]">
          LIVE SITE RESPONSE
        </p>
        <h3 className="mt-0.5 text-[18px] font-semibold leading-5">
          Emergency accountability
        </h3>
        <p className={`mt-1 text-[10px] leading-4 ${dark ? "text-white/55" : "text-[#667085]"}`}>
          Declare an evacuation, account for people and record observations.
        </p>
      </div>
      {offline ? (
        <div className="mx-4 mt-2 rounded-xl bg-[#fff3d1] px-3 py-2">
          <p className="text-[11px] font-semibold text-[#8a6410]">You are offline</p>
          <p className="mt-0.5 text-[10px] leading-4 text-[#8a6410]">
            Observations stay on this phone. They send when signal returns.
          </p>
        </div>
      ) : (
        <div className="mx-4 mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-[#e3f6ea] px-2 py-0.5 text-[9px] font-semibold text-[#1c7a45]">
            5G strong
          </span>
          <span className="rounded-full bg-[#fff1d6] px-2 py-0.5 text-[9px] font-semibold text-[#9a6200]">
            Battery 68%
          </span>
          <span className="rounded-full bg-[#e1f1f6] px-2 py-0.5 text-[9px] font-semibold text-[#0e6a82]">
            Check-in 16:04
          </span>
        </div>
      )}
      <p
        className={`mt-2 px-4 text-right text-[10px] font-semibold ${
          dark ? "text-[#5ec4d4]" : "text-[#1498b0]"
        }`}
      >
        Refresh
      </p>
      <FieldRow
        label="Site"
        value={declared || showClear ? "Gate 2" : "—"}
        muted={!declared && !showClear}
        theme={theme}
      />
      <FieldRow
        label="View"
        value="Incident Commander"
        locked
        theme={theme}
      />
      <FieldRow
        label="Evacuation sessions"
        value={declared || showClear ? "Gate 2 · Fire" : "—"}
        muted={!declared && !showClear}
        theme={theme}
      />
      <FieldRow
        label="Attestation / reason"
        value={declared || showClear ? "Fire" : "—"}
        muted={!declared && !showClear}
        theme={theme}
      />
      <FieldRow
        label="Evacuation name"
        value={declared || showClear ? "Gate 2 assembly" : "—"}
        muted={!declared && !showClear}
        theme={theme}
      />
      {declared || showClear ? (
        <div className="mx-4 mt-2 rounded-xl border border-[#b7eadf] bg-[#e7f8f4] px-3 py-2">
          <p className="text-[10px] font-semibold text-[#14686f]">EVACUATION OPEN</p>
          <p className="text-[12px] font-semibold text-[#14686f]">12 accounted · 3 missing</p>
          <p className="text-[10px] text-[#3d6b66]">
            Console sees this phone, not the names.
          </p>
        </div>
      ) : (
        <div className="px-4 pt-2">
          <div className="grid h-10 place-items-center rounded-xl bg-[#1498b0] text-[13px] font-semibold text-white">
            Declare evacuation
          </div>
          <p className={`mt-2 text-[10px] font-medium ${dark ? "text-white/55" : "text-[#3c4558]"}`}>
            Import manual roster (JSON)
          </p>
          <div
            className={`mt-0.5 flex h-8 items-center rounded-lg border px-3 text-[11px] ${
              dark
                ? "border-white/10 bg-white/5 text-white/40"
                : "border-[#dfe5ea] bg-white text-[#8b93a7]"
            }`}
          >
            Choose file · No file chosen
          </div>
        </div>
      )}
      {!declared && !showClear ? (
        <p className={`mt-2 text-center text-[11px] ${dark ? "text-white/40" : "text-[#8b93a7]"}`}>
          No evacuation selected
        </p>
      ) : null}
      {showClear ? (
        <div className="mt-auto px-4 pb-2 pt-3">
          <div className="grid h-11 place-items-center rounded-xl bg-[#1498b0] text-[13px] font-semibold text-white">
            Clear this phone
          </div>
        </div>
      ) : (
        <div className="mt-auto flex items-end justify-between px-4 pb-1 pt-3">
          <p className={`text-[8px] ${dark ? "text-white/35" : "text-[#8b93a7]"}`}>
            © 2026 Simpnify Sdn Bhd
            <span className="mt-0.5 block text-[#1498b0]">Help · Support</span>
          </p>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e5334b] text-[10px] font-bold text-white">
            SOS
          </span>
        </div>
      )}
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

export function MobileAccountabilityVariantWeb() {
  return (
    <img
      src={publicAsset("/photos/emergency-accountability-ours.png")}
      alt="Our design. Emergency accountability in the phone browser, View picker open."
      className="w-full max-w-[640px] shrink-0 rounded-2xl"
    />
  );
}

export function MobileAccountabilityVariantBadge() {
  return (
    <>
      <Shot step="Waiting. No officer on this phone">
        <WaitingPhone />
      </Shot>
      <Shot step="Hold the badge to the phone">
        <BadgeHoldPhone />
      </Shot>
      <Shot step="Badge accepted as Incident Commander">
        <WaitingPhone
          sheet={
            <Popup
              tone="ok"
              title="Incident Commander"
              body="This badge opened that view. There is no list to pick from."
            />
          }
        />
      </Shot>
    </>
  );
}

export function MobileAccountabilityVariantLock() {
  return (
    <>
      <Shot step="View locked from the badge">
        <AccForm />
      </Shot>
      <Shot step="Evacuation declared. Phone stays here">
        <AccForm
          declared
          sheet={
            <Popup
              tone="ok"
              title="Evacuation declared"
              body="This phone stays on Simpnify until you clear it. Home screen and other apps stay off."
            />
          }
        />
      </Shot>
    </>
  );
}

export function MobileAccountabilityVariantHealth() {
  return (
    <>
      <Shot step="16:04 · Phone is fit for the incident">
        <AccForm declared />
      </Shot>
      <Shot step="16:11 · Signal drops, names stay here">
        <AccForm
          declared
          health="offline"
          sheet={
            <Popup
              tone="info"
              title="Signal dropped"
              body="Observations stay on this phone. They send later. The console sees this device, not the names on this screen."
            />
          }
        />
      </Shot>
    </>
  );
}

export function MobileAccountabilityVariantClear() {
  return (
    <>
      <Shot step="1. On the incident, press Clear this phone">
        <AccForm declared showClear />
      </Shot>
      <Shot step="2. Confirm what stops on this phone">
        <AccForm
          declared
          showClear
          sheet={
            <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white px-5 pb-6 pt-5 text-center text-[#1c2434] shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <p className="text-[16px] font-semibold">Clear this phone?</p>
              <p className="mt-1 text-[12px] leading-5 text-[#667085]">
                Press the button below. These leave this phone:
              </p>
              <ul className="mt-3 space-y-1 text-left text-[13px] text-[#3c4558]">
                <li>Site · Gate 2</li>
                <li>Gate 2 assembly and observations</li>
                <li>Imported roster</li>
                <li>Incident Commander view</li>
              </ul>
              <div className="mt-4 space-y-2">
                <div className="grid h-10 place-items-center rounded-xl bg-[#1498b0] text-[13px] font-semibold text-white">
                  End evacuation and clear this phone
                </div>
                <div className="grid h-10 place-items-center rounded-xl border border-[#d9dcec] text-[13px] font-semibold">
                  Stay on this incident
                </div>
              </div>
            </div>
          }
        />
      </Shot>
      <Shot step="3. This phone is clear">
        <WaitingPhone
          sheet={
            <Popup
              tone="ok"
              title="This phone is clear"
              body="Site, roster, observations, and the role are gone. The screen behind this sheet is waiting. The next officer taps their badge."
            />
          }
        />
      </Shot>
    </>
  );
}

const variantMap: Record<MobileAccountabilityVariantId, ComponentType> = {
  "web-accountability": MobileAccountabilityVariantWeb,
  "role-badge": MobileAccountabilityVariantBadge,
  "evac-lock": MobileAccountabilityVariantLock,
  "evac-health": MobileAccountabilityVariantHealth,
  "evac-clear": MobileAccountabilityVariantClear,
};

export function MobileAccountabilityVariant({
  id,
}: {
  id: MobileAccountabilityVariantId;
}) {
  return createElement(variantMap[id]);
}
