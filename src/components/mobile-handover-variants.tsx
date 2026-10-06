import { createElement, type ComponentType, type ReactNode } from "react";

import { Phone, Popup, SimplifyMark } from "@/components/mobile-auth-variants";
import { publicAsset } from "@/lib/site-path";

export type MobileHandoverVariantId =
  | "web-handover"
  | "next-badge"
  | "write-note"
  | "note-stays"
  | "send-clear";

export type MobileHandoverVariantMeta = {
  id: MobileHandoverVariantId;
  lane: "ours" | "soti";
  title: string;
  tagline: string;
  scene: string;
  soti: string;
  pros: string[];
  cons: string[];
};

export const mobileHandoverVariants: MobileHandoverVariantMeta[] = [
  {
    id: "web-handover",
    lane: "ours",
    title: "A — Our design",
    tagline:
      "The Shift Handover screens in your screenshot. The form, the recipient list, the browser warning, and Send handover on an empty note.",
    scene: "Reference. Phone browser, recipient list, and the empty-field warning.",
    soti: "Kept as the reference so it can be compared with the SOTI flow below.",
    pros: [
      "Same words as the live Shift Handover page",
      "Personal end-of-shift note is already a choice on the recipient row",
      "Send handover is one button",
    ],
    cons: [
      "The recipient list is the full staff directory",
      "An empty note uses the browser warning, Please fill out this field",
      "The note can stay on a shared phone after Send handover",
    ],
  },
  {
    id: "next-badge",
    lane: "soti",
    title: "B — Step 1. The note is for the next badge",
    tagline:
      "Shift Handover stays on Simpnify. The recipient is the next officer who taps a badge.",
    scene: "The form. The staff directory stays on the console.",
    soti: "SOTI Lockdown with SSO, and SOTI Identity on a shared phone. The working profile is this handover. The next officer is whoever taps their badge. Staff names stay on the web console.",
    pros: [
      "The address bar and Install are off this screen",
      "The recipient row is the next badge, so the staff list never opens",
    ],
    cons: [
      "Hiding the phone home button still belongs to device management",
      "The officer cannot pick a named colleague on this phone",
    ],
  },
  {
    id: "write-note",
    lane: "soti",
    title: "C — Step 2. Write the note first",
    tagline:
      "An empty handover asks for the note in a sheet. Send stays off until the post, the keys, and anything still open are written.",
    scene: "Empty note. Then the note is written.",
    soti: "The browser warning on A becomes a sheet on the phone. Send handover stays off until the note is written.",
    pros: [
      "The officer sees why Send is off",
      "The written note is what the next badge will read",
    ],
    cons: [
      "A short note can still be sent",
    ],
  },
  {
    id: "note-stays",
    lane: "soti",
    title: "D — Step 3. The note stays if the signal drops",
    tagline:
      "The phone is fit, then the signal drops. The note stays on the phone. The console sees the phone, not the note.",
    scene: "16:40 the phone is on signal. 16:47 Gate 2 drops the signal.",
    soti: "SOTI XSight device health: battery, signal, and last check-in, shown to the officer. The console sees the phone, not this screen. Remote viewing stays off.",
    pros: [
      "Battery, signal, and last check-in sit on the handover",
      "The note is not lost when the signal drops",
      "The screen says the console follows the phone, not the note",
    ],
    cons: [
      "Two states on one step, so the reader has to take them as before and after",
      "The console still cannot read the handover, only that the phone went offline",
    ],
  },
  {
    id: "send-clear",
    lane: "soti",
    title: "E — Step 4. Send, clear, then the next badge",
    tagline:
      "Confirm what leaves this phone. The phone waits. The next badge opens this note. A badge that misses stays on the tap screen.",
    scene: "1 confirm. 2 this phone is clear. 3 the next badge reads the note. 4 a badge that misses.",
    soti: "SOTI shared-device logout that clears the phone, then SOTI Identity. The note, live location, and SOS leave with this officer. The next badge is the only way to open the note.",
    pros: [
      "The confirm sheet lists the note, live location, and SOS before anything clears",
      "The waiting screen tells the next officer to tap a badge",
      "A badge that misses does not open the note",
    ],
    cons: [
      "Four screens for one send",
      "Leaving the phone locked, without Send and clear this phone, does not clear it",
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

function Tabs() {
  return (
    <div className="grid grid-cols-4 border-t border-black/5 py-1.5 text-center text-[9px] text-[#8b93a7]">
      {["Today", "Work", "Inbox", "Comms"].map((t) => (
        <span key={t} className={t === "Work" ? "font-semibold text-[#1498b0]" : undefined}>
          {t}
        </span>
      ))}
    </div>
  );
}

const NOTE =
  "Gate 2 quiet after 18:00. Spare keys with the post. One visitor still inside Block C.";

function HandoverForm({
  note = "",
  health = "ok",
  sheet,
  action = "Send handover",
}: {
  note?: string;
  health?: "ok" | "offline";
  sheet?: ReactNode;
  action?: string;
}) {
  const offline = health === "offline";
  return (
    <Phone>
      <SimplifyMark />
      <div className="px-4 pt-2">
        <p className="text-[9px] font-semibold tracking-[0.14em] text-[#1498b0]">
          SHIFT CONTINUITY
        </p>
        <h3 className="mt-0.5 text-[20px] font-semibold leading-6">Shift Handover</h3>
        <p className="mt-1 text-[10px] leading-4 text-[#667085]">
          Pass the post to the next officer on this phone. Staff names stay on the web console.
        </p>
      </div>
      {offline ? (
        <div className="mx-4 mt-2 rounded-xl bg-[#fff3d1] px-3 py-2">
          <p className="text-[11px] font-semibold text-[#8a6410]">You are offline</p>
          <p className="mt-0.5 text-[10px] leading-4 text-[#8a6410]">
            The note stays on this phone. It sends when signal returns.
          </p>
        </div>
      ) : (
        <div className="mx-4 mt-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-[#e3f6ea] px-2 py-0.5 text-[9px] font-semibold text-[#1c7a45]">
            5G strong
          </span>
          <span className="rounded-full bg-[#fff1d6] px-2 py-0.5 text-[9px] font-semibold text-[#9a6200]">
            Battery 64%
          </span>
          <span className="rounded-full bg-[#e1f1f6] px-2 py-0.5 text-[9px] font-semibold text-[#0e6a82]">
            Check-in 16:40
          </span>
        </div>
      )}
      <div className="px-4 pt-3">
        <p className="text-[11px] font-medium text-[#3c4558]">Recipient</p>
        <div className="mt-1 flex h-10 items-center justify-between rounded-xl border border-[#d7eef2] bg-[#e7f6f8] px-3">
          <span className="text-[12px] font-semibold">Next officer on this phone</span>
          <span className="text-[9px] font-semibold text-[#1498b0]">next badge</span>
        </div>
      </div>
      <div className="px-4 pt-3">
        <p className="text-[11px] font-medium text-[#3c4558]">Handover content</p>
        <div
          className={`mt-1 min-h-[92px] rounded-xl border border-[#dfe5ea] bg-white px-3 py-2 text-[11px] leading-4 ${
            note ? "" : "text-[#a0a8b8]"
          }`}
        >
          {note || "Write what the next officer needs at this post."}
        </div>
      </div>
      <div className="mt-auto px-4 pb-2 pt-4">
        <div
          className={`grid h-11 place-items-center rounded-xl text-[14px] font-semibold text-white ${
            note ? "bg-[#1498b0]" : "bg-[#1498b0]/40"
          }`}
        >
          {action}
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
          This phone stays on Simpnify. A handover is waiting for the next badge.
        </p>
        <div className="mt-6 w-full rounded-2xl border border-[#d7eef2] bg-[#e7f6f8] px-3 py-3 text-left">
          <p className="text-[10px] font-semibold tracking-[0.12em] text-[#1498b0]">WAITING</p>
          <p className="mt-1 text-[13px] font-semibold">Shift Handover</p>
          <p className="mt-0.5 text-[11px] leading-4 text-[#5f7a84]">
            No officer signed in. The note is off this screen.
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

function NotePhone() {
  return (
    <Phone>
      <SimplifyMark />
      <div className="px-4 pt-3">
        <p className="text-[9px] font-semibold tracking-[0.14em] text-[#1498b0]">
          FOR THIS BADGE
        </p>
        <h3 className="mt-1 text-[18px] font-semibold leading-6">Handover for you</h3>
        <p className="mt-1 text-[11px] text-[#667085]">Nur Nadhirah · Security Officer · Gate 2</p>
      </div>
      <div className="mx-4 mt-3 rounded-2xl border border-[#d7eef2] bg-[#e7f6f8] px-3 py-3">
        <p className="text-[10px] font-semibold tracking-[0.12em] text-[#1498b0]">FROM THE LAST OFFICER</p>
        <p className="mt-2 text-[12px] leading-5 text-[#1c2434]">{NOTE}</p>
      </div>
      <p className="mt-3 px-4 text-[11px] leading-4 text-[#667085]">
        This note opened with your badge. Live location and SOS start again on this phone.
      </p>
      <div className="mt-auto px-4 pb-3">
        <div className="grid h-11 place-items-center rounded-xl bg-[#1498b0] text-[14px] font-semibold text-white">
          Start this shift
        </div>
      </div>
      <Tabs />
    </Phone>
  );
}

export function MobileHandoverVariantWeb() {
  return (
    <img
      src={publicAsset("/photos/shift-handover-ours.png")}
      alt="Our design. Shift Handover in the phone browser, the recipient list, and the empty-field warning."
      className="w-full max-w-[920px] shrink-0 rounded-2xl"
    />
  );
}

export function MobileHandoverVariantNext() {
  return (
    <>
      <Shot step="Recipient is the next badge">
        <HandoverForm />
      </Shot>
      <Shot step="Staff names stay on the console">
        <HandoverForm
          sheet={
            <Popup
              tone="info"
              title="Directory stays on the console"
              body="This phone passes the note to the next badge. Staff names stay on the web console."
            />
          }
        />
      </Shot>
    </>
  );
}

export function MobileHandoverVariantWrite() {
  return (
    <>
      <Shot step="Send stays off">
        <HandoverForm
          sheet={
            <Popup
              tone="info"
              title="Write the handover first"
              body="Send stays off until the note has the post, the keys, and anything still open."
            />
          }
        />
      </Shot>
      <Shot step="The note is written">
        <HandoverForm note={NOTE} />
      </Shot>
    </>
  );
}

export function MobileHandoverVariantStays() {
  return (
    <>
      <Shot step="16:40 · Phone is fit to send">
        <HandoverForm note={NOTE} />
      </Shot>
      <Shot step="16:47 · Signal drops, the note stays here">
        <HandoverForm
          note={NOTE}
          health="offline"
          sheet={
            <Popup
              tone="info"
              title="Note stays on this phone"
              body="It sends when signal returns. The console sees this phone, not the note on this screen."
            />
          }
        />
      </Shot>
    </>
  );
}

export function MobileHandoverVariantClear() {
  return (
    <>
      <Shot step="1. Confirm what leaves this phone">
        <HandoverForm
          note={NOTE}
          action="Send and clear this phone"
          sheet={
            <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white px-5 pb-6 pt-5 text-center text-[#1c2434] shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <p className="text-[16px] font-semibold">Send and clear this phone?</p>
              <p className="mt-1 text-[12px] leading-5 text-[#667085]">
                The note goes to the next badge. These leave this phone:
              </p>
              <ul className="mt-3 space-y-1 text-left text-[13px] text-[#3c4558]">
                <li>This handover note</li>
                <li>Live location</li>
                <li>SOS on this phone</li>
              </ul>
              <div className="mt-4 space-y-2">
                <div className="grid h-10 place-items-center rounded-xl bg-[#1498b0] text-[13px] font-semibold text-white">
                  Send and clear this phone
                </div>
                <div className="grid h-10 place-items-center rounded-xl border border-[#d9dcec] text-[13px] font-semibold">
                  Keep writing
                </div>
              </div>
            </div>
          }
        />
      </Shot>
      <Shot step="2. This phone is clear">
        <WaitingPhone
          sheet={
            <Popup
              tone="ok"
              title="This phone is clear"
              body="The note, live location, and SOS are off this screen. The next officer taps their badge."
            />
          }
        />
      </Shot>
      <Shot step="3. The next badge opens this note">
        <NotePhone />
      </Shot>
      <Shot step="4. A badge that misses stays here">
        <WaitingPhone
          sheet={
            <Popup
              tone="info"
              title="Badge not recognised"
              body="This note stays sealed. Tap the badge for the next officer on this phone."
            />
          }
        />
      </Shot>
    </>
  );
}

const variantMap: Record<MobileHandoverVariantId, ComponentType> = {
  "web-handover": MobileHandoverVariantWeb,
  "next-badge": MobileHandoverVariantNext,
  "write-note": MobileHandoverVariantWrite,
  "note-stays": MobileHandoverVariantStays,
  "send-clear": MobileHandoverVariantClear,
};

export function MobileHandoverVariant({ id }: { id: MobileHandoverVariantId }) {
  return createElement(variantMap[id]);
}
