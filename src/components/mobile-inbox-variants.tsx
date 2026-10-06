import { createElement, type ComponentType, type ReactNode } from "react";

import { Phone, Popup, SimplifyMark } from "@/components/mobile-auth-variants";
import { publicAsset } from "@/lib/site-path";

export type MobileInboxVariantId =
  | "web-supervisor"
  | "inbox-arrived"
  | "inbox-answer"
  | "inbox-queued"
  | "inbox-clear";

export type MobileInboxVariantMeta = {
  id: MobileInboxVariantId;
  lane: "ours" | "soti";
  title: string;
  tagline: string;
  scene: string;
  soti: string;
  pros: string[];
  cons: string[];
};

export const mobileInboxVariants: MobileInboxVariantMeta[] = [
  {
    id: "web-supervisor",
    lane: "ours",
    title: "A — Our design",
    tagline:
      "The screen in your screenshot. Mobile Supervisor, an operational message, and Send to Mobile inbox. The side card is the selected message.",
    scene: "Supervisor picks a phone and sends one operational message to its inbox.",
    soti: "Kept as the reference so it can be compared with the SOTI flow below.",
    pros: [
      "Each phone is named, with an OK mark, before anything is sent",
      "Send to Mobile inbox is the only action on the card",
      "The selected message sits beside the list, so the send is one message, not the whole list",
    ],
    cons: [
      "The message box on the phone is still empty in this shot",
      "The address bar and the account mark sit above the send",
      "Nothing on this screen shows what the officer will see",
    ],
  },
  {
    id: "inbox-arrived",
    lane: "soti",
    title: "B — Step 1. It is in the inbox",
    tagline:
      "The selected message is on this phone, inside Inbox. It does not appear on the home screen.",
    scene: "14:20. The officer is signed in. The operational message has arrived.",
    soti: "SOTI MobiControl Send Message, delivered to the agent on the phone. SMS and the phone’s own notification stay with SOTI. The words stay in this inbox until the officer answers.",
    pros: [
      "The officer reads it inside Simpnify",
      "It names the sender and that it is for this phone",
      "The home screen does not show the message",
    ],
    cons: [
      "The officer has to open Inbox. A locked phone does not ring",
      "The words are whatever the supervisor sent",
    ],
  },
  {
    id: "inbox-answer",
    lane: "soti",
    title: "C — Step 2. The officer answers",
    tagline:
      "Information is a read receipt. A question can be no. The supervisor sees that answer, not the screen.",
    scene: "14:22. The same inbox. The officer either marks it read, or answers no.",
    soti: "SOTI message types. Information ends on OK. Question records yes or no. The sheet repeats the answer that leaves the phone.",
    pros: [
      "A receipt and a no are different",
      "The sheet says what the supervisor will see",
      "The screen stays on the phone",
    ],
    cons: [
      "A yes uses the same green sheet as a receipt, with the word yes",
      "Two phones, so the reader has to take them as either-or",
    ],
  },
  {
    id: "inbox-queued",
    lane: "soti",
    title: "D — Step 3. It waited for signal",
    tagline:
      "The phone was out of signal. The message waited, then opened in the inbox when the phone came back.",
    scene: "The phone reconnects. The same operational message is waiting.",
    soti: "SOTI can queue a message for an offline device. It arrives when the phone reconnects, still in the inbox, still not on the home screen.",
    pros: [
      "The officer can tell this one waited",
      "A dead spot does not drop the message",
    ],
    cons: [
      "The sheet does not say how long it waited",
      "Queuing is not a receipt. The officer still has to answer",
    ],
  },
  {
    id: "inbox-clear",
    lane: "soti",
    title: "E — Step 4. End shift clears the inbox",
    tagline:
      "The operational message leaves with this officer. The next badge does not inherit it.",
    scene: "End of shift. The officer clears this phone.",
    soti: "SOTI shared-device logout. The inbox, live location, and SOS clear with the session. The phone waits for the next badge.",
    pros: [
      "The next officer does not read the last operational message",
      "The sheet names what stopped on this phone",
    ],
    cons: [
      "Leaving the phone locked, without End shift, does not clear the inbox",
      "This sheet does not tell the supervisor the message was cleared",
    ],
  },
];

function Tabs() {
  return (
    <div className="grid grid-cols-4 border-t border-black/5 py-1.5 text-center text-[9px] text-[#8b93a7]">
      {["Today", "Work", "Inbox", "Comms"].map((label) => (
        <span
          key={label}
          className={label === "Inbox" ? "font-semibold text-[#1498b0]" : undefined}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function InboxFrame({
  sheet,
  children,
}: {
  sheet?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Phone>
      <SimplifyMark />
      <div className="flex items-center gap-1 px-4 pt-3">
        <span className="text-[18px] leading-none text-[#1c2434]">‹</span>
        <span className="text-[15px] font-semibold">Inbox</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-3 pb-2 pt-2">{children}</div>
      <Tabs />
      {sheet ? (
        <>
          <div className="absolute inset-0 z-20 bg-[#12141c]/35" />
          <div className="absolute inset-0 z-30">{sheet}</div>
        </>
      ) : null}
    </Phone>
  );
}

function MessageCard({
  kicker,
  body,
  meta,
}: {
  kicker: string;
  body: string;
  meta: string;
}) {
  return (
    <div className="rounded-xl bg-white p-3 text-[#1c2434] shadow-[0_4px_14px_rgba(20,40,50,0.05)]">
      <p className="text-[10px] font-semibold tracking-[0.14em] text-[#1498b0]">{kicker}</p>
      <p className="mt-1 text-[13px] font-semibold leading-5">{body}</p>
      <p className="mt-2 text-[10px] leading-4 text-[#667085]">{meta}</p>
    </div>
  );
}

function Pair({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figure className="flex w-[280px] shrink-0 flex-col items-center gap-3">
      <figcaption className="text-center text-[11px] font-semibold leading-4 text-white/80">
        {label}
      </figcaption>
      {children}
    </figure>
  );
}

export function MobileInboxVariantWeb() {
  return (
    <img
      src={publicAsset("/photos/mobile-supervisor-ours.png")}
      alt="Our design. Mobile Supervisor in the phone browser, with Send to Mobile inbox."
      className="w-full max-w-[760px] rounded-2xl"
    />
  );
}

export function MobileInboxVariantArrived() {
  return (
    <InboxFrame>
      <p className="text-[10px] font-semibold tracking-[0.14em] text-[#1498b0]">1 NEW</p>
      <p className="-mt-1 text-[18px] font-semibold leading-6">Operational message</p>
      <MessageCard
        kicker="FROM MOBILE SUPERVISOR"
        body="Gate 2 is closed. Use Gate 3."
        meta="For this phone · 14:20"
      />
      <div className="rounded-xl bg-[#e7f6f8] p-3">
        <p className="text-[10px] leading-4 text-[#0f6e74]">
          This stays in the inbox. It is not a notification on the home screen.
        </p>
      </div>
      <div className="grid h-10 place-items-center rounded-xl bg-[#1498b0] text-[13px] font-semibold text-white">
        I&apos;ve read this
      </div>
    </InboxFrame>
  );
}

export function MobileInboxVariantAnswer() {
  return (
    <>
      <Pair label="Information. Read.">
        <InboxFrame
          sheet={
            <Popup
              tone="ok"
              title="Received"
              body="14:22. The supervisor sees that you read it, not your screen."
            />
          }
        >
          <MessageCard
            kicker="FROM MOBILE SUPERVISOR"
            body="Gate 2 is closed. Use Gate 3."
            meta="For this phone · 14:20"
          />
        </InboxFrame>
      </Pair>
      <Pair label="Question. No.">
        <InboxFrame
          sheet={
            <Popup
              tone="info"
              title="You answered no"
              body="Can you cover Gate 3? The supervisor sees no, not your screen."
            />
          }
        >
          <MessageCard
            kicker="QUESTION"
            body="Can you cover Gate 3?"
            meta="Answered no · 14:22"
          />
        </InboxFrame>
      </Pair>
    </>
  );
}

export function MobileInboxVariantQueued() {
  return (
    <InboxFrame
      sheet={
        <Popup
          tone="info"
          title="This message waited"
          body="The phone was out of signal. It is in the inbox now. It did not open your screen."
        />
      }
    >
      <p className="text-[10px] font-semibold tracking-[0.14em] text-[#1498b0]">WAITED FOR SIGNAL</p>
      <p className="-mt-1 text-[18px] font-semibold leading-6">Operational message</p>
      <MessageCard
        kicker="FROM MOBILE SUPERVISOR"
        body="Gate 2 is closed. Use Gate 3."
        meta="Queued while this phone was offline"
      />
    </InboxFrame>
  );
}

export function MobileInboxVariantClear() {
  return (
    <InboxFrame
      sheet={
        <Popup
          tone="ok"
          title="Inbox cleared"
          body="The operational message, live location, and SOS are off this phone. It is waiting for the next badge."
        />
      }
    >
      <p className="text-[10px] font-semibold tracking-[0.14em] text-[#1498b0]">END SHIFT</p>
      <p className="-mt-1 text-[18px] font-semibold leading-6">This phone is clear</p>
      <div className="rounded-xl bg-white p-4 text-center text-[#1c2434] shadow-[0_4px_14px_rgba(20,40,50,0.05)]">
        <p className="text-[13px] font-semibold">No operational messages</p>
        <p className="mt-1 text-[11px] leading-4 text-[#667085]">Waiting for the next badge.</p>
      </div>
      <div className="grid h-10 place-items-center rounded-xl bg-[#1498b0] text-[13px] font-semibold text-white">
        End shift and clear this phone
      </div>
    </InboxFrame>
  );
}

const variantMap: Record<MobileInboxVariantId, ComponentType> = {
  "web-supervisor": MobileInboxVariantWeb,
  "inbox-arrived": MobileInboxVariantArrived,
  "inbox-answer": MobileInboxVariantAnswer,
  "inbox-queued": MobileInboxVariantQueued,
  "inbox-clear": MobileInboxVariantClear,
};

export function MobileInboxVariant({ id }: { id: MobileInboxVariantId }) {
  return createElement(variantMap[id]);
}
