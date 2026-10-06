import { createElement, type ComponentType, type ReactNode } from "react";

import { Phone, Popup, SimplifyMark } from "@/components/mobile-auth-variants";
import { publicAsset } from "@/lib/site-path";

export type MobileSafetyVariantId =
  | "web-watch"
  | "badge-watch"
  | "watch-lock"
  | "watch-late"
  | "watch-clear";

export type MobileSafetyVariantMeta = {
  id: MobileSafetyVariantId;
  lane: "ours" | "soti";
  title: string;
  tagline: string;
  scene: string;
  soti: string;
  pros: string[];
  cons: string[];
};

export const mobileSafetyVariants: MobileSafetyVariantMeta[] = [
  {
    id: "web-watch",
    lane: "ours",
    title: "A — Our design",
    tagline:
      "The screen in your screenshot. Start the watch, pick 15 minutes to 2 hours, then check in with I am safe.",
    scene: "Reference. Interval, the picker, then the live watch in the phone browser.",
    soti: "Kept as the reference so it can be compared with the SOTI flow below.",
    pros: [
      "The server deadline stays in force when the browser is backgrounded or offline",
      "I am safe and End watch sit on the live watch",
      "The interval is visible before the watch starts",
    ],
    cons: [
      "The watch can start before the phone knows who is holding it",
      "End watch does not say the phone is clear for the next officer",
      "It is still a browser page, so the officer can leave it",
    ],
  },
  {
    id: "badge-watch",
    lane: "soti",
    title: "B — Step 1. Badge opens the watch",
    tagline:
      "The shared phone is waiting. The officer taps a badge. The 30-minute watch opens as that officer.",
    scene: "No watch is running until someone is signed in.",
    soti: "SOTI Identity NFC sign-in, on the lockdown pre-authentication step for a shared Android phone. The tap says who is holding the phone. A password stays available when the badge misses. The safety watch does not start until that sign-in.",
    pros: [
      "The watch belongs to the officer who tapped the badge",
      "The phone is waiting, with no previous deadline on screen",
      "Password remains when the badge misses",
    ],
    cons: [
      "Needs a badge and NFC on the phone",
      "The interval is confirmed after the badge, so start is one more step",
    ],
  },
  {
    id: "watch-lock",
    lane: "soti",
    title: "C — Step 2. The watch stays on Simpnify",
    tagline:
      "The check-in is running. I am safe goes to the server. The phone stays on this watch.",
    scene: "Officer is on the watch. The deadline is Oct 2, 2026, 4:26 AM.",
    soti: "SOTI ONE Lockdown keeps this phone on Simpnify. Home screen and other apps stay off. The check-in deadline stays Simpnify’s. I am safe sends to that server, including when the phone is in a pocket.",
    pros: [
      "The officer cannot wander off the watch into another app",
      "The deadline and the two buttons stay on one screen",
      "The green sheet says the server has the check-in",
    ],
    cons: [
      "Help and Support stay inside Simpnify",
      "Another app is not available beside SOS",
    ],
  },
  {
    id: "watch-late",
    lane: "soti",
    title: "D — Step 3. The phone is late",
    tagline:
      "The phone is fit, then the signal drops. The deadline still counts. I am safe stays on the phone.",
    scene: "Check-in is due at 4:26 AM. Then the phone loses signal.",
    soti: "SOTI XSight device health, shown to the officer: battery, signal, and when this phone last reached the console. Out of contact is a lockdown event. The console sees this phone. Remote viewing stays off. The safety deadline stays on the Simpnify server.",
    pros: [
      "The officer sees battery, signal, and the console check-in",
      "A lost signal leaves the deadline and I am safe on the phone",
      "Help can tell the phone is late without opening the screen",
    ],
    cons: [
      "I am safe cannot reach the server until the signal returns",
      "SOS needs signal",
    ],
  },
  {
    id: "watch-clear",
    lane: "soti",
    title: "E — Step 4. End watch, phone is clear",
    tagline:
      "End watch lists what leaves this phone. The next screen is the badge again.",
    scene: "Officer ends the watch and leaves the phone for the next badge.",
    soti: "SOTI shared-device logout clears this officer’s session on the phone. The watch, the deadline, and the last I am safe leave with that logout. If the officer forgets End watch, the next badge can end the session from the unlock screen. The watch still clears.",
    pros: [
      "The confirm sheet lists the officer, the watch, the deadline, and I am safe",
      "The last screen is the waiting badge, so the next officer knows what to do",
      "A forgotten End watch can still be ended by the next badge",
    ],
    cons: [
      "Three screens for one logout",
      "Leaving the phone locked, without End watch or a new badge, leaves the watch running",
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
      {["Today", "Work", "Inbox", "Account"].map((t) => (
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

function Foot({
  theme = "light",
  sos = true,
}: {
  theme?: "light" | "dark";
  sos?: boolean;
}) {
  const dark = theme === "dark";
  return (
    <div className="mt-auto flex items-end justify-between px-4 pb-1 pt-3">
      <p className={`text-[8px] ${dark ? "text-white/35" : "text-[#8b93a7]"}`}>
        © 2026 Simpnify Sdn Bhd
        <span className="mt-0.5 block text-[#1498b0]">Help · Support</span>
      </p>
      {sos ? (
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e5334b] text-[10px] font-bold text-white">
          SOS
        </span>
      ) : (
        <span />
      )}
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
        <h3 className="mt-2 text-[20px] font-semibold leading-6">Tap your badge</h3>
        <p className="mt-3 max-w-[220px] text-[12px] leading-5 text-[#667085]">
          This phone stays on Simpnify. Lone-worker safety starts as you. No
          watch is running until the badge tap.
        </p>
        <div className="mt-6 w-full rounded-2xl border border-[#d7eef2] bg-[#e7f6f8] px-3 py-3 text-left">
          <p className="text-[10px] font-semibold tracking-[0.12em] text-[#1498b0]">
            WAITING
          </p>
          <p className="mt-1 text-[13px] font-semibold">Lone-worker safety</p>
          <p className="mt-0.5 text-[11px] leading-4 text-[#5f7a84]">
            No officer signed in. No check-in on this phone.
          </p>
        </div>
        <div className="mt-auto w-full pb-2">
          <div className="grid h-11 place-items-center rounded-xl bg-[#1498b0] text-[14px] font-semibold text-white">
            Tap your badge here
          </div>
        </div>
      </div>
      <Tabs active="" />
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
          This tap is the sign-in. The watch opens for this officer. A password
          stays available when the badge misses.
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

function WatchHeader({ theme = "light" }: { theme?: "light" | "dark" }) {
  const dark = theme === "dark";
  return (
    <div className="px-4 pt-2">
      <p className="text-[9px] font-semibold tracking-[0.14em] text-[#1498b0]">
        PERSONAL SAFETY
      </p>
      <h3 className="mt-0.5 text-[18px] font-semibold leading-5">Lone-worker Safety</h3>
      <p className={`mt-1 text-[10px] leading-4 ${dark ? "text-white/55" : "text-[#667085]"}`}>
        Server deadlines stay authoritative even when this phone is in a pocket
        or offline.
      </p>
    </div>
  );
}

function StartPhone({ sheet }: { sheet?: ReactNode }) {
  return (
    <Phone>
      <SimplifyMark />
      <WatchHeader />
      <div className="px-4 pt-3">
        <p className="text-[10px] font-medium text-[#3c4558]">Check-in interval</p>
        <div className="mt-1 flex h-10 items-center justify-between rounded-xl border border-[#dfe5ea] bg-white px-3 text-[13px]">
          <span>30 minutes</span>
          <span className="text-[#8b93a7]">⌄</span>
        </div>
        <p className="mt-1 text-[10px] leading-4 text-[#8b93a7]">
          From this site. 15 minutes, 1 hour, and 2 hours stay available.
        </p>
        <div className="mt-3 grid h-11 place-items-center rounded-xl bg-[#1498b0] text-[14px] font-semibold text-white">
          Start safety watch
        </div>
      </div>
      <Foot />
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

function SafetyWatch({
  theme = "light",
  health = "hidden",
  sheet,
  endClear = false,
}: {
  theme?: "light" | "dark";
  health?: "hidden" | "ok" | "offline";
  sheet?: ReactNode;
  endClear?: boolean;
}) {
  const dark = theme === "dark";
  const offline = health === "offline";
  return (
    <Phone theme={theme}>
      <SimplifyMark theme={theme} />
      <WatchHeader theme={theme} />
      {health === "ok" ? (
        <div className="mx-4 mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-[#e3f6ea] px-2 py-0.5 text-[9px] font-semibold text-[#1c7a45]">
            5G strong
          </span>
          <span className="rounded-full bg-[#fff1d6] px-2 py-0.5 text-[9px] font-semibold text-[#9a6200]">
            Battery 68%
          </span>
          <span className="rounded-full bg-[#e1f1f6] px-2 py-0.5 text-[9px] font-semibold text-[#0e6a82]">
            Console 4:20 AM
          </span>
        </div>
      ) : null}
      {offline ? (
        <div className="mx-4 mt-2 rounded-xl bg-[#fff3d1] px-3 py-2">
          <p className="text-[11px] font-semibold text-[#8a6410]">You are offline</p>
          <p className="mt-0.5 text-[10px] leading-4 text-[#8a6410]">
            I am safe stays on this phone. The deadline is still 4:26 AM.
          </p>
        </div>
      ) : (
        <div
          className={`mx-4 mt-2 rounded-xl px-3 py-2 ${
            dark ? "bg-[#12343a]" : "bg-[#e7f8f4]"
          }`}
        >
          <p className={`text-[11px] font-semibold ${dark ? "text-[#b7eadf]" : "text-[#14686f]"}`}>
            Safety status backed up to the server
          </p>
        </div>
      )}
      <div className="px-4 pt-3">
        <p className={`text-[10px] font-medium ${dark ? "text-white/70" : "text-[#3c4558]"}`}>
          Check in by
        </p>
        <p className="mt-0.5 text-[15px] font-semibold leading-5">Oct 2, 2026, 4:26 AM</p>
        {endClear ? (
          <div className="mt-3 grid h-11 place-items-center rounded-xl bg-[#1498b0] text-[13px] font-semibold text-white">
            End watch and clear this phone
          </div>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="grid h-10 place-items-center rounded-xl bg-[#1498b0] text-[12px] font-semibold text-white">
              I am safe
            </div>
            <div
              className={`grid h-10 place-items-center rounded-xl border text-[12px] font-semibold ${
                dark ? "border-[#5ec4d4] text-[#5ec4d4]" : "border-[#1498b0] text-[#1498b0]"
              }`}
            >
              End watch
            </div>
          </div>
        )}
      </div>
      <Foot theme={theme} sos={!endClear} />
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

export function MobileSafetyVariantWeb() {
  return (
    <img
      src={publicAsset("/photos/lone-worker-ours.png")}
      alt="Our design. Lone-worker safety in the phone browser: start the watch, pick the interval, then I am safe."
      className="w-full max-w-[920px] shrink-0 rounded-2xl"
    />
  );
}

export function MobileSafetyVariantBadge() {
  return (
    <>
      <Shot step="Waiting. No officer on this phone">
        <WaitingPhone />
      </Shot>
      <Shot step="Hold the badge to the phone">
        <BadgeHoldPhone />
      </Shot>
      <Shot step="Badge accepted. 30-minute watch">
        <StartPhone
          sheet={
            <Popup
              tone="ok"
              title="Badge accepted"
              body="This officer starts the watch. Check-in is every 30 minutes. The server owns the deadline."
            />
          }
        />
      </Shot>
    </>
  );
}

export function MobileSafetyVariantLock() {
  return (
    <>
      <Shot step="Check in by 4:26 AM">
        <SafetyWatch />
      </Shot>
      <Shot step="I am safe. The server has it">
        <SafetyWatch
          sheet={
            <Popup
              tone="ok"
              title="You are safe"
              body="The server has this check-in. The next deadline is still on the server. This phone stays on Simpnify."
            />
          }
        />
      </Shot>
    </>
  );
}

export function MobileSafetyVariantLate() {
  return (
    <>
      <Shot step="4:20 AM · Phone is fit for the watch">
        <SafetyWatch health="ok" />
      </Shot>
      <Shot step="4:26 AM · Signal drops, the deadline stays">
        <SafetyWatch
          health="offline"
          sheet={
            <Popup
              tone="info"
              title="Signal dropped"
              body="I am safe stays on this phone until the signal returns. The deadline is still 4:26 AM. The console sees this phone, not this screen. SOS needs signal."
            />
          }
        />
      </Shot>
    </>
  );
}

export function MobileSafetyVariantClear() {
  return (
    <>
      <Shot step="1. On the watch, press End watch and clear this phone">
        <SafetyWatch endClear />
      </Shot>
      <Shot step="2. Confirm what leaves this phone">
        <SafetyWatch
          endClear
          sheet={
            <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white px-5 pb-6 pt-5 text-center text-[#1c2434] shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <p className="text-[16px] font-semibold">End the watch?</p>
              <p className="mt-1 text-[12px] leading-5 text-[#667085]">
                Press the button below. These leave this phone:
              </p>
              <ul className="mt-3 space-y-1 text-left text-[13px] text-[#3c4558]">
                <li>This officer</li>
                <li>Lone-worker safety watch</li>
                <li>Check-in deadline, 4:26 AM</li>
                <li>The last I am safe</li>
              </ul>
              <div className="mt-4 space-y-2">
                <div className="grid h-10 place-items-center rounded-xl bg-[#1498b0] text-[13px] font-semibold text-white">
                  End watch and clear this phone
                </div>
                <div className="grid h-10 place-items-center rounded-xl border border-[#d9dcec] text-[13px] font-semibold">
                  Stay on this watch
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
              body="The watch, the deadline, and this officer are gone. The screen behind this sheet is waiting. The next officer taps their badge."
            />
          }
        />
      </Shot>
    </>
  );
}

const variantMap: Record<MobileSafetyVariantId, ComponentType> = {
  "web-watch": MobileSafetyVariantWeb,
  "badge-watch": MobileSafetyVariantBadge,
  "watch-lock": MobileSafetyVariantLock,
  "watch-late": MobileSafetyVariantLate,
  "watch-clear": MobileSafetyVariantClear,
};

export function MobileSafetyVariant({ id }: { id: MobileSafetyVariantId }) {
  return createElement(variantMap[id]);
}
