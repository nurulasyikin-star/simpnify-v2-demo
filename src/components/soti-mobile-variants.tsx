import { createElement, type ComponentType, type ReactNode } from "react";

export type SotiMobileVariantId =
  | "current-login"
  | "nfc-lock"
  | "kiosk-home"
  | "shared-shift"
  | "native-shell";

export type SotiMobileVariantMeta = {
  id: SotiMobileVariantId;
  title: string;
  tagline: string;
  scene: string;
  caption: string;
  pros: string[];
  cons: string[];
};

export const sotiMobileVariants: SotiMobileVariantMeta[] = [
  {
    id: "current-login",
    title: "A — Current PWA sign-in",
    tagline:
      "What an officer sees today on the phone browser: username, password, then the field workspace.",
    scene: "Officer opens the mobile address in the phone browser.",
    caption:
      "Today’s mobile workspace still signs in with a username and password inside the browser.",
    pros: [
      "Accurate picture of the live app",
      "Shows the sign-in William’s note is trying to improve",
      "Safe baseline if the report needs a before image",
    ],
    cons: [
      "Does not show the NFC or locked-handphone idea",
      "Still looks like a website, with theme, language and a later Install button",
    ],
  },
  {
    id: "nfc-lock",
    title: "B — Badge lock screen",
    tagline:
      "The picture closest to William’s note: the handphone stays on this screen until a security badge is tapped.",
    scene: "Corporate handphone, before any officer has tapped in.",
    caption:
      "Locked corporate handphone. The officer taps a security badge. Settings and other apps stay off this screen.",
    pros: [
      "Direct answer to the NFC and lock-out description",
      "Strong single image for the report",
      "Makes the shared-handphone story obvious",
    ],
    cons: [
      "A React Native app cannot hide the Android home button by itself",
      "Full phone lockdown still needs an MDM such as SOTI around the app",
    ],
  },
  {
    id: "kiosk-home",
    title: "C — Intended tools only",
    tagline:
      "After the badge tap, the home screen is only the Simpnify tools that role is allowed to use.",
    scene: "Same handphone, immediately after a successful badge tap.",
    caption:
      "After tap-in, the officer sees only assigned field tools. Ending the shift returns the handphone to the lock screen.",
    pros: [
      "Shows SOTI’s “only the intended apps” idea inside our product",
      "SOS stays one thumb away",
      "Easy to compare with a SOTI lockdown home screen",
    ],
    cons: [
      "Replaces the current Today layout, so it looks like a new app",
      "The grid hides briefings, patrol progress and live location",
    ],
  },
  {
    id: "shared-shift",
    title: "D — Shared handphone handover",
    tagline:
      "Pool phones: the previous officer is signed out, then the next officer takes the device with a badge.",
    scene: "Shift change on a handphone shared by the post.",
    caption:
      "Shared handphone at handover. The previous session is cleared. The next officer taps their own badge.",
    pros: [
      "Matches SOTI shared-device login and our existing Shift Handover tool",
      "Explains why one active mobile session matters",
      "Practical for posts that pass one phone between officers",
    ],
    cons: [
      "Less visual than the full lock screen",
      "Needs the reader to already know the field tools exist",
    ],
  },
  {
    id: "native-shell",
    title: "E — React Native field shell",
    tagline:
      "The screen we would actually ship: today’s Today workspace, native chrome, badge session, no Install button.",
    scene: "Officer is on duty inside the native app.",
    caption:
      "React Native field shell. Badge session on the current Today workspace. The phone around the app is locked by device management, not by this screen.",
    pros: [
      "Keeps Today, live location, SOS and the bottom tabs officers already use",
      "Drops the browser Install chrome",
      "Honest about what the app does versus what an MDM does",
    ],
    cons: [
      "The locked-phone story sits in the caption more than in the picture",
      "Closest to today, so the change can look small in a slide",
    ],
  },
];

function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-w-0 max-w-[340px] rounded-[2.5rem] border border-white/20 bg-black p-[10px] shadow-[0_28px_70px_rgba(0,0,0,0.45)]">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#071318] text-white">
        <div className="absolute left-1/2 top-[10px] z-20 h-[22px] w-[104px] -translate-x-1/2 rounded-full bg-black" />
        <div className="flex items-center justify-between px-7 pb-1 pt-3.5 text-[11px] font-medium tracking-wide text-white/85">
          <span>9:41</span>
          <span className="flex items-center gap-1.5">
            <span>5G</span>
            <span className="inline-block h-[10px] w-[18px] rounded-[3px] border border-white/70 p-px">
              <span className="block h-full w-full rounded-[1px] bg-white/85" />
            </span>
          </span>
        </div>
        <div className="flex min-h-[620px] flex-col">{children}</div>
        <div className="flex justify-center pb-2.5 pt-1">
          <div className="h-1 w-28 rounded-full bg-white/35" />
        </div>
      </div>
    </div>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#1aa6a6] text-base font-semibold text-white">
        S
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[13px] font-semibold leading-4">
          Simple Unified Platform
        </span>
        {!compact ? (
          <span className="block text-[10px] text-[#94a3ad]">
            Unified security operations
          </span>
        ) : null}
      </span>
    </div>
  );
}

export function SotiMobileVariantCurrent() {
  return (
    <PhoneShell>
      <div className="flex items-center justify-between px-4 pb-2 pt-1">
        <BrandMark />
        <span className="rounded-full bg-[#0e2a33] px-2.5 py-1 text-[10px] text-[#7fd3e2]">
          Secure field access
        </span>
      </div>
      <div className="px-5 pb-4 pt-3">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#3db8cf]">
          ON-SITE RESPONSE
        </p>
        <h3 className="mt-1 text-[28px] font-semibold leading-8">
          Simple Unified Platform
        </h3>
        <p className="mt-2 text-[13px] leading-5 text-[#b7c4cc]">
          Assigned guidance, automatic foreground location, and SOS.
        </p>
      </div>
      <div className="mx-4 mb-4 flex flex-1 flex-col rounded-2xl border border-white/10 bg-[#0c1a22] px-4 py-4">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#3db8cf]">
          SECURE SIGN IN
        </p>
        <h3 className="mt-1 text-xl font-semibold">Welcome back</h3>
        <p className="mt-1 text-[12px] text-[#94a3ad]">
          Use your Security Officer account.
        </p>
        <label className="mt-4 text-[12px] font-medium">Username</label>
        <div className="mt-1.5 h-11 rounded-xl border border-white/10 bg-[#071318]" />
        <label className="mt-3 text-[12px] font-medium">Password</label>
        <div className="relative mt-1.5 h-11 rounded-xl border border-white/10 bg-[#071318]">
          <span className="absolute right-3 top-3 text-[12px] font-semibold text-[#3db8cf]">
            Show
          </span>
        </div>
        <div className="mt-4 grid h-11 place-items-center rounded-xl bg-[#2998ae] text-sm font-semibold text-[#071318]">
          Sign in
        </div>
        <p className="mt-3 text-center text-[12px] text-[#8a9bab]">
          Forgot password?
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-white/10 px-4 py-3 text-[11px] text-[#8a9bab]">
        <span>Theme · Auto</span>
        <span>English · 中文 · العربية</span>
      </div>
    </PhoneShell>
  );
}

export function SotiMobileVariantNfcLock() {
  return (
    <PhoneShell>
      <div className="flex flex-1 flex-col items-center px-6 pb-6 pt-8 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#102830] text-[#3db8cf]">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.7" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        </span>
        <p className="mt-5 text-[11px] font-semibold tracking-[0.18em] text-[#3db8cf]">
          CORPORATE HANDPHONE
        </p>
        <h3 className="mt-2 text-[30px] font-semibold leading-9">Locked</h3>
        <p className="mt-3 max-w-[240px] text-[14px] leading-6 text-[#c5d0d6]">
          Hold your security badge to the back of this phone.
        </p>
        <div className="relative mt-8 grid h-36 w-36 place-items-center">
          <span className="absolute inset-0 rounded-full border border-[#3db8cf]/25" />
          <span className="absolute inset-4 rounded-full border border-[#3db8cf]/40" />
          <span className="absolute inset-8 rounded-full border border-[#3db8cf]/70" />
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[#12343c] text-[#9be7f2]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M7 8c2.5 2 2.5 6 0 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M11 5c4 3.2 4 10.8 0 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M15 3c5.2 4.4 5.2 13.6 0 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </span>
        </div>
        <p className="mt-8 max-w-[250px] text-[12px] leading-5 text-[#8a9bab]">
          Simpnify is the only workspace on this device. Phone settings and other apps stay hidden.
        </p>
        <p className="mt-auto pt-6 text-[12px] font-medium text-[#3db8cf]">
          Use password instead
        </p>
      </div>
    </PhoneShell>
  );
}

const kioskTools = [
  { label: "Today", hint: "Shift" },
  { label: "Guidance", hint: "Steps" },
  { label: "Patrols", hint: "Routes" },
  { label: "Reports", hint: "Notes" },
  { label: "Comms", hint: "Radio" },
  { label: "Inbox", hint: "1 new" },
];

export function SotiMobileVariantKioskHome() {
  return (
    <PhoneShell>
      <div className="px-5 pb-2 pt-2">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#3db8cf]">
          ON DUTY
        </p>
        <h3 className="mt-1 text-[24px] font-semibold leading-7">
          Security Officer
        </h3>
        <p className="mt-1 text-[12px] text-[#94a3ad]">
          Badge accepted · this shift only
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5 px-4 pt-3">
        {kioskTools.map((tool) => (
          <div
            key={tool.label}
            className="rounded-2xl border border-white/10 bg-[#0c1a22] px-3 py-3"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#12343c] text-[11px] font-semibold text-[#9be7f2]">
              {tool.label.slice(0, 1)}
            </span>
            <p className="mt-2 text-[14px] font-semibold">{tool.label}</p>
            <p className="text-[11px] text-[#8a9bab]">{tool.hint}</p>
          </div>
        ))}
      </div>
      <div className="mx-4 mt-3 grid h-12 place-items-center rounded-2xl bg-[#9f2d3a] text-sm font-semibold">
        Hold SOS
      </div>
      <p className="mt-auto px-5 pb-1 pt-4 text-center text-[12px] text-[#8a9bab]">
        End shift and lock this handphone
      </p>
    </PhoneShell>
  );
}

export function SotiMobileVariantSharedShift() {
  return (
    <PhoneShell>
      <div className="px-5 pt-3">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#3db8cf]">
          SHARED HANDPHONE
        </p>
        <h3 className="mt-1 text-[26px] font-semibold leading-8">
          Ready for the next officer
        </h3>
      </div>
      <div className="mx-4 mt-4 rounded-2xl border border-[#1f6b4a]/50 bg-[#0d241c] px-4 py-3">
        <p className="text-[12px] font-semibold text-[#8ee0b8]">
          Previous session closed
        </p>
        <ul className="mt-2 space-y-1 text-[12px] leading-5 text-[#c9ddd2]">
          <li>Inbox cleared</li>
          <li>Live location stopped</li>
          <li>SOS session ended</li>
        </ul>
      </div>
      <div className="mx-4 mt-3 flex flex-1 flex-col items-center rounded-2xl border border-dashed border-[#3db8cf]/40 bg-[#0c1a22] px-4 py-6 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full border border-[#3db8cf]/50 text-[#9be7f2]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M7 10h4M7 14h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
        <p className="mt-4 text-[15px] font-semibold">Tap your badge</p>
        <p className="mt-1 max-w-[220px] text-[12px] leading-5 text-[#94a3ad]">
          This phone is for the post, not for one person. Your role decides which tools open.
        </p>
      </div>
      <p className="px-5 py-4 text-center text-[11px] leading-5 text-[#8a9bab]">
        Shift Handover on Work passes context. This screen passes the device.
      </p>
    </PhoneShell>
  );
}

function Count({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c1a22] px-1 py-3 text-center">
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-[9px] font-semibold tracking-[0.12em] text-[#8a9bab]">
        {label}
      </p>
    </div>
  );
}

export function SotiMobileVariantNativeShell() {
  return (
    <PhoneShell>
      <div className="flex items-center justify-between px-4 pb-1 pt-1">
        <BrandMark compact />
        <span className="rounded-full bg-[#12343c] px-2.5 py-1 text-[10px] font-medium text-[#9be7f2]">
          Badge
        </span>
      </div>
      <div className="mx-3 mt-2 rounded-2xl bg-gradient-to-br from-[#0e3a44] to-[#0c1a22] px-4 py-4">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#7fd3e2]">
          YOUR SHIFT
        </p>
        <h3 className="mt-1 text-[28px] font-semibold">Today</h3>
        <p className="mt-1 text-[12px] leading-5 text-[#c5d0d6]">
          Only work and safety information for your role.
        </p>
      </div>
      <div className="mt-3 flex gap-2 px-3 text-[10px]">
        <span className="rounded-full bg-[#0c1a22] px-2.5 py-1 text-[#9be7f2]">
          Online
        </span>
        <span className="rounded-full bg-[#0c1a22] px-2.5 py-1 text-[#9be7f2]">
          GPS active
        </span>
      </div>
      <div className="mx-3 mt-3 rounded-2xl border border-[#1f6b4a]/40 bg-[#0d241c] px-3 py-3">
        <p className="text-[10px] text-[#8ee0b8]">Operational safety status</p>
        <p className="text-[15px] font-semibold">My Live Location</p>
        <p className="text-[11px] text-[#c9ddd2]">
          Automatic foreground location is active
        </p>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2 px-3">
        <Count value="0" label="GUIDANCE" />
        <Count value="0" label="PATROLS" />
        <Count value="0" label="BRIEFINGS" />
        <Count value="1" label="INBOX" />
      </div>
      <div className="mx-3 mt-3 grid h-11 place-items-center rounded-2xl bg-[#9f2d3a] text-sm font-semibold">
        Hold for SOS
      </div>
      <div className="mt-auto grid grid-cols-4 border-t border-white/10 px-1 py-2 text-center text-[10px] text-[#8a9bab]">
        <span className="font-semibold text-[#9be7f2]">Today</span>
        <span>Work</span>
        <span>Inbox</span>
        <span>Comms</span>
      </div>
    </PhoneShell>
  );
}

const variantMap: Record<SotiMobileVariantId, ComponentType> = {
  "current-login": SotiMobileVariantCurrent,
  "nfc-lock": SotiMobileVariantNfcLock,
  "kiosk-home": SotiMobileVariantKioskHome,
  "shared-shift": SotiMobileVariantSharedShift,
  "native-shell": SotiMobileVariantNativeShell,
};

export function SotiMobileVariant({ id }: { id: SotiMobileVariantId }) {
  return createElement(variantMap[id]);
}
