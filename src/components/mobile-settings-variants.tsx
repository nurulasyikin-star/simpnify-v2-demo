import { createElement, type ComponentType, type ReactNode } from "react";

import {
  Field,
  Phone,
  Popup,
  PurpleButton,
  SimplifyMark,
} from "@/components/mobile-auth-variants";

export type MobileSettingsVariantId =
  | "web-settings"
  | "native-settings"
  | "auto-lock-shared"
  | "device-status"
  | "console-lock";

export type MobileSettingsVariantMeta = {
  id: MobileSettingsVariantId;
  title: string;
  tagline: string;
  scene: string;
  soti: string;
  pros: string[];
  cons: string[];
};

export const mobileSettingsVariants: MobileSettingsVariantMeta[] = [
  {
    id: "web-settings",
    title: "A — Web mobile settings",
    tagline:
      "The left side of your frames: list screens, the Auto / Light / Dark sheet, and the locked session.",
    scene: "Officer uses the field app in the phone browser.",
    soti: "Baseline. No SOTI idea here.",
    pros: ["Accurate picture of today", "Good before image for the native work"],
    cons: [
      "Browser bar and install prompts sit on every screen",
      "No auto-lock, language, or data settings in one place",
    ],
  },
  {
    id: "native-settings",
    title: "B — Native drawer and settings",
    tagline:
      "The right side of your frames: profile, drawer, toggles, language, and the logout confirmation.",
    scene: "Officer opens the drawer and goes into Settings.",
    soti: "Your native design. Not taken from SOTI.",
    pros: [
      "Profile, Settings, Help, FAQs, and legal in one drawer",
      "Toggles, language, and logout already follow one pattern",
      "Familiar to anyone who has used an enterprise phone app",
    ],
    cons: [
      "Local storage and mobile data toggles say little about what is stored",
      "Logout does not say what it clears on a shared phone",
    ],
  },
  {
    id: "auto-lock-shared",
    title: "C — Auto-lock for shared handphones",
    tagline:
      "Your Security Settings screen, with a lock delay and a choice of how the officer comes back.",
    scene: "Officer sets how fast the handphone locks and how it reopens.",
    soti: "SOTI Lockdown timeouts and shared-device sign-in. The phone re-locks, and a badge tap or password reopens it.",
    pros: [
      "Turns your Lock delay into a clear rule officers can read",
      "Badge resume means no password typed on a pool phone",
      "SOS stays reachable while the screen is locked",
    ],
    cons: [
      "Badge resume needs NFC on the handphone",
      "A short delay can lock an officer out mid-incident, so the minimum needs care",
    ],
  },
  {
    id: "device-status",
    title: "D — Device status in Profile",
    tagline:
      "Profile gets a Device card: battery, connection, location permission, last sync, and app version.",
    scene: "Officer checks why the phone is not reporting.",
    soti: "The officer-facing slice of SOTI MobiControl and XSight device health, shown to the person holding the phone.",
    pros: [
      "Answers “is my location live?” without calling the console",
      "Same facts the console sees, so a support call starts from them",
      "Fits under the profile you already designed",
    ],
    cons: [
      "One more card on a screen that is currently clean",
      "Needs real permission checks, not a static label",
    ],
  },
  {
    id: "console-lock",
    title: "E — Locked from the console",
    tagline:
      "The Locked state, when the console locks the handphone instead of the officer’s own timer.",
    scene: "Console locks a lost or reassigned phone.",
    soti: "SOTI remote lock. The console locks the handphone. Remote wipe and screen viewing are left out.",
    pros: [
      "Says why it is locked, instead of asking for a password",
      "Lost-phone case is covered without remote screen viewing",
      "SOS still works from this screen",
    ],
    cons: [
      "Needs a console control and a rule for who may lock a phone",
      "A false lock during an incident is costly, so unlock must be quick",
    ],
  },
];

function Toggle({ on }: { on?: boolean }) {
  return (
    <span
      className={`relative inline-block h-5 w-9 rounded-full ${on ? "bg-[#5b4dff]" : "bg-[#d5d9e6]"}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow ${on ? "right-0.5" : "left-0.5"}`}
      />
    </span>
  );
}

function Row({
  label,
  hint,
  right,
}: {
  label: string;
  hint?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#eef0f6] py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-[#1c2434]">{label}</p>
        {hint ? <p className="text-[11px] leading-4 text-[#8b93a7]">{hint}</p> : null}
      </div>
      {right}
    </div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="mx-4 rounded-2xl bg-white px-4 py-1 shadow-[0_8px_24px_rgba(80,60,160,0.06)]">
      {children}
    </div>
  );
}

function ScreenTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-5 pb-3 pt-3">
      <span className="text-[16px] text-[#3c4558]">‹</span>
      <h3 className="text-[16px] font-semibold text-[#1c2434]">{children}</h3>
    </div>
  );
}

export function MobileSettingsVariantWeb() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8">
      <Phone>
        <div className="mx-4 mt-1 flex h-8 items-center gap-2 rounded-full bg-[#eef1f4] px-3 text-[10px] text-[#667085]">
          <span className="h-2 w-2 rounded-full bg-[#22a85a]" />
          simpnify.app/m/inbox
        </div>
        <div className="px-4 pt-4">
          <div className="h-9 rounded-lg border border-[#e4e6f0] bg-white px-3 py-2 text-[12px] text-[#8b93a7]">
            Search inbox
          </div>
          {["Gate 2 alarm", "Patrol route changed", "Briefing at 06:00", "Equipment check"].map(
            (t) => (
              <div key={t} className="mt-2 rounded-lg border border-[#e6ebf0] bg-white px-3 py-3">
                <p className="text-[13px] font-medium text-[#1c2434]">{t}</p>
                <p className="text-[11px] text-[#8b93a7]">Today · 09:12</p>
              </div>
            ),
          )}
        </div>
        <div className="mt-auto flex items-center justify-between px-4 py-3 text-[10px] text-[#8b93a7]">
          <span>Theme · Auto</span>
          <span>English</span>
        </div>
      </Phone>
      <Phone>
        <div className="flex-1 bg-[#12141c]/40 pt-[360px]">
          <div className="rounded-t-2xl bg-white px-5 py-4 text-[#1c2434]">
            <p className="text-[14px] font-semibold">Theme</p>
            {["Auto", "Light", "Dark"].map((t, i) => (
              <div
                key={t}
                className="mt-2 flex items-center justify-between rounded-lg border border-[#e4e6f0] px-3 py-2 text-[13px]"
              >
                {t}
                {i === 0 ? <span className="text-[#2aa8be]">●</span> : null}
              </div>
            ))}
          </div>
        </div>
      </Phone>
    </div>
  );
}

export function MobileSettingsVariantNative() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8">
      <Phone>
        <SimplifyMark />
        <div className="mx-4 mt-4 space-y-1 rounded-2xl bg-white px-4 py-3 shadow-[0_8px_24px_rgba(80,60,160,0.06)]">
          <div className="flex items-center gap-3 pb-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#e8e4ff] text-[16px] font-semibold text-[#5b4dff]">
              T
            </span>
            <div>
              <p className="text-[14px] font-semibold text-[#1c2434]">Officer Tan</p>
              <p className="text-[11px] text-[#8b93a7]">Security Officer</p>
            </div>
          </div>
          {["Profile", "Settings", "Help", "FAQs", "Privacy Policy", "Terms & Conditions"].map(
            (t, i) => (
              <p
                key={t}
                className={`rounded-lg px-2 py-2 text-[13px] ${i === 1 ? "bg-[#f1eeff] font-semibold text-[#5b4dff]" : "text-[#3c4558]"}`}
              >
                {t}
              </p>
            ),
          )}
        </div>
        <p className="mt-auto pb-3 text-center text-[13px] font-medium text-[#d6384e]">
          Logout
        </p>
      </Phone>
      <Phone>
        <ScreenTitle>Settings</ScreenTitle>
        <Card>
          <Row label="Local storage" hint="Keep reports on this phone" right={<Toggle on />} />
          <Row label="Allow mobile data" right={<Toggle on />} />
          <Row label="Push notification" right={<Toggle />} />
          <Row label="Language" hint="English" right={<span className="text-[#8b93a7]">›</span>} />
          <Row label="Security" right={<span className="text-[#8b93a7]">›</span>} />
        </Card>
        <div className="absolute inset-0 bg-[#12141c]/35" />
        <div className="absolute inset-x-5 bottom-24 rounded-2xl bg-white px-5 py-5 text-center text-[#1c2434] shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
          <p className="text-[16px] font-semibold">Logout?</p>
          <p className="mt-1 text-[12px] text-[#667085]">Are you sure you want to logout?</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="grid h-10 place-items-center rounded-lg border border-[#e4e6f0] text-[13px]">
              Cancel
            </div>
            <div className="grid h-10 place-items-center rounded-lg bg-[#5b4dff] text-[13px] font-semibold text-white">
              Logout
            </div>
          </div>
        </div>
      </Phone>
    </div>
  );
}

export function MobileSettingsVariantAutoLock() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8">
      <Phone>
        <ScreenTitle>Security</ScreenTitle>
        <Card>
          <Row label="Auto-lock" hint="Lock this phone when idle" right={<Toggle on />} />
        </Card>
        <p className="px-5 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wider text-[#8b93a7]">
          Lock delay
        </p>
        <div className="mx-4 grid grid-cols-4 gap-2">
          {["1 min", "5 min", "15 min", "Never"].map((t, i) => (
            <span
              key={t}
              className={`grid h-10 place-items-center rounded-lg text-[12px] ${i === 1 ? "bg-[#5b4dff] font-semibold text-white" : "bg-white text-[#3c4558] shadow-sm"}`}
            >
              {t}
            </span>
          ))}
        </div>
        <p className="px-5 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wider text-[#8b93a7]">
          Reopen with
        </p>
        <Card>
          <Row label="Security badge" hint="Tap the back of the phone" right={<Toggle on />} />
          <Row label="Password" hint="Always available" right={<Toggle on />} />
        </Card>
        <p className="mx-5 mt-3 text-[11px] leading-4 text-[#8b93a7]">
          Hold SOS stays on the lock screen.
        </p>
      </Phone>
      <Phone>
        <SimplifyMark />
        <div className="flex flex-1 flex-col items-center px-6 pt-10 text-center">
          <div className="grid h-[88px] w-[88px] place-items-center rounded-full bg-white shadow-[0_10px_30px_rgba(80,60,160,0.12)]">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="5" y="10" width="14" height="10" rx="2" stroke="#1c2434" strokeWidth="1.6" />
              <path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="#1c2434" strokeWidth="1.6" />
            </svg>
          </div>
          <h3 className="mt-5 text-[20px] font-semibold">Locked after 5 min</h3>
          <p className="mt-2 text-[12px] text-[#667085]">Tap your badge or enter your password.</p>
          <div className="mt-6 w-full text-left">
            <Field label="Password" value="••••••••" />
          </div>
          <div className="mt-4 w-full">
            <PurpleButton>Login</PurpleButton>
          </div>
          <p className="mt-3 text-[12px] text-[#5b4dff]">Forgot password?</p>
          <div className="mt-auto mb-2 grid h-10 w-full place-items-center rounded-xl bg-[#9f2d3a] text-[13px] font-semibold text-white">
            Hold for SOS
          </div>
        </div>
      </Phone>
    </div>
  );
}

export function MobileSettingsVariantDevice() {
  return (
    <Phone>
      <ScreenTitle>Profile</ScreenTitle>
      <div className="flex items-center gap-3 px-5 pb-4">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[#e8e4ff] text-[18px] font-semibold text-[#5b4dff]">
          T
        </span>
        <div>
          <p className="text-[15px] font-semibold text-[#1c2434]">Officer Tan</p>
          <p className="text-[11px] text-[#8b93a7]">Security Officer · Gate 2</p>
        </div>
      </div>
      <p className="px-5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[#8b93a7]">
        This device
      </p>
      <Card>
        <Row label="Connection" hint="5G · strong" right={<span className="text-[#22a85a]">●</span>} />
        <Row label="Live location" hint="Allowed while in use" right={<span className="text-[#22a85a]">●</span>} />
        <Row label="Battery" hint="64%" right={<span className="text-[#f0a020]">●</span>} />
        <Row label="Last sync" hint="2 min ago" right={<span className="text-[#22a85a]">●</span>} />
        <Row label="App version" hint="2.4.1 · up to date" />
      </Card>
      <div className="mx-4 mt-3">
        <PurpleButton>Send status to console</PurpleButton>
      </div>
      <Popup tone="ok" title="Status sent" body="The console can now see this device’s status." />
    </Phone>
  );
}

export function MobileSettingsVariantConsoleLock() {
  return (
    <Phone>
      <SimplifyMark />
      <div className="flex flex-1 flex-col items-center px-6 pt-10 text-center">
        <div className="grid h-[88px] w-[88px] place-items-center rounded-full bg-[#f6c445] shadow-[0_10px_30px_rgba(180,140,20,0.18)]">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="5" y="10" width="14" height="10" rx="2" stroke="#1c2434" strokeWidth="1.6" />
            <path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="#1c2434" strokeWidth="1.6" />
          </svg>
        </div>
        <p className="mt-6 text-[11px] font-semibold tracking-[0.16em] text-[#b07a00]">
          LOCKED BY CONSOLE
        </p>
        <h3 className="mt-2 text-[20px] font-semibold">This phone was locked</h3>
        <p className="mt-2 max-w-[230px] text-[12px] leading-5 text-[#667085]">
          Contact your supervisor to unlock it. Locked 09:41 by Control Room.
        </p>
        <div className="mt-6 w-full">
          <PurpleButton>Call control room</PurpleButton>
        </div>
        <p className="mt-3 text-[12px] text-[#5b4dff]">Unlock with supervisor code</p>
        <div className="mt-auto mb-2 grid h-10 w-full place-items-center rounded-xl bg-[#9f2d3a] text-[13px] font-semibold text-white">
          Hold for SOS
        </div>
      </div>
    </Phone>
  );
}

const variantMap: Record<MobileSettingsVariantId, ComponentType> = {
  "web-settings": MobileSettingsVariantWeb,
  "native-settings": MobileSettingsVariantNative,
  "auto-lock-shared": MobileSettingsVariantAutoLock,
  "device-status": MobileSettingsVariantDevice,
  "console-lock": MobileSettingsVariantConsoleLock,
};

export function MobileSettingsVariant({ id }: { id: MobileSettingsVariantId }) {
  return createElement(variantMap[id]);
}
