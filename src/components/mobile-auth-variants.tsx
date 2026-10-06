import { createElement, type ComponentType, type ReactNode } from "react";

import { publicAsset } from "@/lib/site-path";

export type MobileAuthVariantId =
  | "web-lock"
  | "continue-here"
  | "keep-other"
  | "native-lock"
  | "badge-sso";

export type MobileAuthVariantMeta = {
  id: MobileAuthVariantId;
  lane: "ours" | "soti";
  title: string;
  tagline: string;
  scene: string;
  soti: string;
  pros: string[];
  cons: string[];
};

export const mobileAuthVariants: MobileAuthVariantMeta[] = [
  {
    id: "web-lock",
    lane: "ours",
    title: "A — Our design",
    tagline:
      "The screen in your screenshot. Browser page, then Active session detected, then Continue or Cancel.",
    scene: "Reference. This is our design, kept beside the SOTI flow.",
    soti: "Kept as the reference so it can be compared with the SOTI flow below.",
    pros: [
      "The choice is already named: this device, or keep the other session",
      "Says the other session will be signed out",
      "Same words as the live page",
    ],
    cons: [
      "The product title sits above the decision",
      "Does not say which phone, or that location and SOS stop there",
      "Theme and language sit on the same screen",
    ],
  },
  {
    id: "continue-here",
    lane: "soti",
    title: "F — Continue on this device",
    tagline:
      "What A’s Continue button does. This phone takes the session. The other phone is signed out.",
    scene: "Officer pressed Continue on this device.",
    soti: "SOTI shared-device logout. One person is signed in. Continuing here ends the other phone and clears inbox, live location, and SOS there. This phone becomes the only session.",
    pros: [
      "The officer sees that the other phone actually signed out",
      "Names what moves here: inbox, live location, and SOS",
    ],
    cons: [
      "It still ends someone else’s session, so the label on A has to stay this clear",
    ],
  },
  {
    id: "keep-other",
    lane: "soti",
    title: "G — Cancel, keep the other session",
    tagline:
      "What A’s Cancel button does. The other phone stays signed in. This phone returns to Welcome back.",
    scene: "Officer pressed Cancel and keep the other session.",
    soti: "SOTI’s login profile stays up until someone signs in. Cancel does not open the app. The next screen is the sign-in page, the same one as B.",
    pros: [
      "The other phone is left alone",
      "This phone has a clear next screen instead of a dead end",
    ],
    cons: [
      "The officer must wait until the other phone signs out before this one can take the session",
    ],
  },
  {
    id: "native-lock",
    lane: "soti",
    title: "B — Step 1. Sign in, with a badge",
    tagline:
      "Your Welcome back page. It qualifies as B because SOTI’s login screen is the page that stays up until someone signs in.",
    scene: "Officer opens the shared phone and is not signed in yet.",
    soti: "On soti.net/solutions/lockdown, a shared phone uses a login profile until someone signs in. Users log in with an NFC tag, and a PIN or password stays available. Tap your badge here is that NFC action, on this sign-in page. Username and Sign in stay for when the badge misses.",
    pros: [
      "This is already the sign-in door, which is the job of SOTI’s login profile",
      "The badge is a button on the page the officer already uses",
      "Username and password stay underneath",
    ],
    cons: [
      "It is still the browser page, so hiding the phone home screen stays with device management",
      "Theme and language stay on the sign-in screen",
    ],
  },
  {
    id: "badge-sso",
    lane: "soti",
    title: "C — Step 2. Tap the badge",
    tagline:
      "SOTI Identity. The badge says who is holding the phone. That replaces a typed password.",
    scene: "Same phone as B. The officer holds their badge to the phone.",
    soti: "SOTI Identity NFC sign-in, with SSO. The tap is the sign-in.",
    pros: [
      "The phone knows the officer without a password",
      "Password stays as the fallback when the badge misses",
    ],
    cons: [
      "Needs a badge and NFC on the phone",
      "Password is the fallback when the badge misses",
    ],
  },
];

export function Phone({
  theme = "light",
  surface = "native",
  children,
}: {
  theme?: "light" | "dark";
  surface?: "native" | "web";
  children: ReactNode;
}) {
  const dark = theme === "dark";
  const web = surface === "web";
  return (
    <div className="w-[280px] shrink-0 rounded-[2.2rem] border border-black/40 bg-black p-[9px] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
      <div
        className={`relative flex min-h-[580px] flex-col overflow-hidden rounded-[1.75rem] ${dark ? "text-white" : "text-[#1c2434]"}`}
        style={{
          background: dark
            ? "linear-gradient(180deg, #23243a 0%, #14151c 46%, #101114 100%)"
            : web
              ? "linear-gradient(180deg, #e7f7f6 0%, #f4fbfb 42%, #ffffff 100%)"
              : "linear-gradient(180deg, #f4f1fb 0%, #fbfbfe 38%, #ffffff 100%)",
        }}
      >
        <div
          className={`absolute left-1/2 top-2 z-20 h-[18px] w-[92px] -translate-x-1/2 rounded-full ${dark ? "bg-black" : "bg-black"}`}
        />
        <div
          className={`flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold ${dark ? "text-white/80" : "text-[#1c2434]"}`}
        >
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="text-[10px]">5G</span>
            <span
              className={`inline-block h-[9px] w-[16px] rounded-[2px] border p-px ${dark ? "border-white/70" : "border-[#1c2434]/70"}`}
            >
              <span
                className={`block h-full w-3/4 rounded-[1px] ${dark ? "bg-white/80" : "bg-[#1c2434]/80"}`}
              />
            </span>
          </span>
        </div>
        <div className="flex flex-1 flex-col">{children}</div>
        <div className="flex justify-center pb-2 pt-1">
          <div
            className={`h-1 w-24 rounded-full ${dark ? "bg-white/30" : "bg-black/20"}`}
          />
        </div>
      </div>
    </div>
  );
}

export function SimplifyMark({ theme = "light" }: { theme?: "light" | "dark" }) {
  const dark = theme === "dark";
  return (
    <div className="flex items-center gap-2 px-5 pt-1">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#1aa6a6] text-[13px] font-bold text-white">
        S
      </span>
      <span>
        <span
          className={`block text-[10px] leading-none ${dark ? "text-white/55" : "text-[#8b93a7]"}`}
        >
          Ventionex
        </span>
        <span className="block text-[14px] font-semibold leading-4">Simpnify</span>
      </span>
    </div>
  );
}

export function PurpleButton({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-11 place-items-center rounded-xl bg-[#1498b0] text-[14px] font-semibold text-white">
      {children}
    </div>
  );
}

export function Field({
  label,
  value,
  theme = "light",
}: {
  label: string;
  value?: string;
  theme?: "light" | "dark";
}) {
  const dark = theme === "dark";
  return (
    <label className="block">
      <span
        className={`text-[12px] font-medium ${dark ? "text-white/70" : "text-[#3c4558]"}`}
      >
        {label}
      </span>
      <div
        className={`mt-1.5 flex h-11 items-center rounded-xl border px-3 text-[13px] ${
          dark
            ? "border-white/10 bg-[#1c1e2a] text-white/80"
            : "border-[#e4e6f0] bg-white text-[#1c2434]"
        }`}
      >
        {value ?? ""}
      </div>
    </label>
  );
}

function LockBadge({ tone }: { tone: "warn" | "help" | "nfc" }) {
  const ring =
    tone === "help" ? "bg-[#f6c445]" : tone === "nfc" ? "bg-[#efeaff]" : "bg-white";
  return (
    <div
      className={`grid h-[88px] w-[88px] place-items-center rounded-full shadow-[0_10px_30px_rgba(80,60,160,0.12)] ${ring}`}
    >
      {tone === "nfc" ? (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M8 7c2.2 2 2.2 8 0 10" stroke="#1498b0" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M12 4.5c3.6 3 3.6 12 0 15" stroke="#1498b0" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M16 2.5c5 4.2 5 14.8 0 19" stroke="#1498b0" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="5" y="10" width="14" height="10" rx="2" stroke="#1c2434" strokeWidth="1.6" />
          <path d="M8 10V7.5a4 4 0 0 1 8 0V10" stroke="#1c2434" strokeWidth="1.6" />
          {tone === "help" ? (
            <path d="M12 13.2v2.2" stroke="#1c2434" strokeWidth="1.7" strokeLinecap="round" />
          ) : (
            <circle cx="17.2" cy="7.2" r="3.2" fill="#ff4d6a" />
          )}
          {tone === "help" ? (
            <circle cx="12" cy="17.4" r="0.8" fill="#1c2434" />
          ) : (
            <path d="M17.2 5.8v1.6" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
          )}
        </svg>
      )}
    </div>
  );
}

export function Popup({
  tone,
  title,
  body,
}: {
  tone: "ok" | "info" | "err";
  title: string;
  body: string;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white px-5 pb-6 pt-5 text-center text-[#1c2434] shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
      <div
        className={`mx-auto grid h-14 w-14 place-items-center rounded-full text-white ${tone === "ok" ? "bg-[#22a85a]" : tone === "err" ? "bg-[#e5484d]" : "bg-[#f6c445] text-[#1c2434]"}`}
      >
        {tone === "ok" ? (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 12.5 10 16.5 18 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : tone === "err" ? (
          <span className="text-2xl font-semibold text-white">×</span>
        ) : (
          <span className="text-2xl font-semibold text-[#1c2434]">i</span>
        )}
      </div>
      <p className="mt-3 text-[15px] font-semibold">{title}</p>
      <p className="mt-1 text-[12px] leading-5 text-[#667085]">{body}</p>
      <div className="mt-4 grid h-10 place-items-center rounded-lg bg-[#1498b0] text-[14px] font-semibold text-white">
        Done
      </div>
    </div>
  );
}

export function MobileAuthVariantWeb() {
  return (
    <img
      src={publicAsset("/photos/active-session-ours.png")}
      alt="Our design. Active session detected in the phone browser."
      className="w-[280px] shrink-0 rounded-[2.2rem]"
    />
  );
}

function WelcomeBackScreen({ popup }: { popup?: ReactNode }) {
  return (
    <Phone surface="web">
      <div className="mx-3 mt-1 flex h-7 items-center gap-1.5 rounded-full bg-white/80 px-2 text-[9px] text-[#3c4558]">
        <span className="text-[10px]">✕</span>
        <span className="text-[10px] text-[#8b93a7]">▾</span>
        <span className="min-w-0 flex-1 truncate">192.168.0.26:7100</span>
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
          Secure field access
        </span>
      </div>
      <div className="px-4 pt-1">
        <p className="text-[10px] font-semibold tracking-[0.14em] text-[#1aa6a6]">ON-SITE RESPONSE</p>
        <h3 className="mt-0.5 text-[18px] font-semibold leading-5">
          Simple Unified
          <br />
          Platform
        </h3>
        <p className="mt-1 text-[10px] leading-4 text-[#667085]">
          Assigned guidance, automatic foreground location, and SOS.
        </p>
      </div>
      <div className="mx-3 mt-2 rounded-2xl bg-white px-3 py-3 shadow-[0_8px_24px_rgba(20,40,50,0.06)]">
        <p className="text-[9px] font-semibold tracking-[0.14em] text-[#1498b0]">SECURE SIGN IN</p>
        <h3 className="mt-0.5 text-[16px] font-semibold">Welcome back</h3>
        <p className="text-[10px] text-[#667085]">Use your Security Officer account.</p>
        <p className="mt-2 text-[10px] font-medium">Username</p>
        <div className="mt-1 flex h-8 items-center rounded-lg border border-[#e4e8ee] px-2 text-[11px]">
          nurul.asyikin
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-[10px] font-medium">Password</p>
          <p className="text-[10px] font-semibold text-[#1498b0]">Forgot password?</p>
        </div>
        <div className="mt-1 h-8 rounded-lg border border-[#e4e8ee]" />
        <div className="mt-2 grid h-9 place-items-center rounded-xl border border-[#1498b0] text-[12px] font-semibold text-[#1498b0]">
          Sign in
        </div>
        <div className="mt-2 grid h-9 place-items-center rounded-xl bg-[#1498b0] text-[12px] font-semibold text-white">
          Tap your badge here
        </div>
        <p className="mt-1 text-center text-[9px] leading-3 text-[#8b93a7]">
          This device session is bound to the Mobile client contract.
        </p>
      </div>
      <div className="mx-3 mt-2 rounded-2xl bg-white px-3 py-2">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-[#8b93a7]">Theme</span>
          <span className="text-[#8b93a7]">Language</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-[10px]">
          <span className="font-medium">☀ Auto ▾</span>
          <span className="flex items-center gap-1.5">
            <span className="border-b-2 border-[#1498b0] font-semibold text-[#1498b0]">English</span>
            <span>简体中文</span>
            <span>العربية</span>
          </span>
        </div>
      </div>
      <div className="mt-auto flex justify-center gap-4 px-3 pb-2 pt-2 text-[10px] text-[#5f7a84]">
        <span>Role controlled</span>
        <span>Audited</span>
      </div>
      {popup ? (
        <>
          <div className="absolute inset-0 bg-[#12141c]/35" />
          {popup}
        </>
      ) : null}
    </Phone>
  );
}

export function MobileAuthVariantNative() {
  return <WelcomeBackScreen />;
}

export function MobileAuthVariantContinue() {
  return (
    <Phone>
      <SimplifyMark />
      <div className="flex flex-1 flex-col items-center px-6 pt-16 text-center">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#1498b0]">
          THIS PHONE
        </p>
        <h3 className="mt-2 text-[22px] font-semibold leading-7">Session is here</h3>
        <p className="mt-2 max-w-[210px] text-[12px] leading-5 text-[#667085]">
          Inbox, live location, and SOS now run on this phone.
        </p>
      </div>
      <div className="absolute inset-0 bg-[#12141c]/35" />
      <Popup
        tone="ok"
        title="Other phone signed out"
        body="Continuing here ended that session. This phone is the only one signed in."
      />
    </Phone>
  );
}

export function MobileAuthVariantKeepOther() {
  return (
    <WelcomeBackScreen
      popup={
        <Popup
          tone="info"
          title="Other phone stays signed in"
          body="This phone was not signed in. Stay on Welcome back until that session ends."
        />
      }
    />
  );
}

function BadgeScreen({ popup }: { popup?: ReactNode }) {
  return (
    <Phone>
      <SimplifyMark />
      <div className="flex flex-1 flex-col items-center px-6 pt-8 text-center">
        <div className="relative grid h-36 w-36 place-items-center">
          <span className="absolute inset-0 rounded-full border border-[#1498b0]/15" />
          <span className="absolute inset-4 rounded-full border border-[#1498b0]/30" />
          <span className="absolute inset-8 rounded-full border border-[#1498b0]/50" />
          <LockBadge tone="nfc" />
        </div>
        <p className="mt-6 text-[11px] font-semibold tracking-[0.16em] text-[#1498b0]">
          SHARED HANDPHONE
        </p>
        <h3 className="mt-2 text-[22px] font-semibold">Hold your badge here</h3>
        <p className="mt-3 max-w-[230px] text-[12px] leading-5 text-[#667085]">
          This phone opens for your role after the tap. Settings and other apps stay off this screen.
        </p>
        <div className="mt-auto w-full pb-3">
          <PurpleButton>Use password instead</PurpleButton>
        </div>
      </div>
      {popup ? (
        <>
          <div className="absolute inset-0 bg-[#12141c]/35" />
          {popup}
        </>
      ) : null}
    </Phone>
  );
}

export function MobileAuthVariantBadge() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-8">
      <BadgeScreen />
      <BadgeScreen
        popup={
          <Popup
            tone="ok"
            title="Badge accepted"
            body="Welcome, Officer Tan. This phone is now unlocked."
          />
        }
      />
      <BadgeScreen
        popup={
          <Popup
            tone="err"
            title="Badge not recognised"
            body="Hold the badge steady, or use your password instead."
          />
        }
      />
    </div>
  );
}

const variantMap: Record<MobileAuthVariantId, ComponentType> = {
  "web-lock": MobileAuthVariantWeb,
  "continue-here": MobileAuthVariantContinue,
  "keep-other": MobileAuthVariantKeepOther,
  "native-lock": MobileAuthVariantNative,
  "badge-sso": MobileAuthVariantBadge,
};

export function MobileAuthVariant({ id }: { id: MobileAuthVariantId }) {
  return createElement(variantMap[id]);
}
