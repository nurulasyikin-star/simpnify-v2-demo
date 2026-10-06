import { createElement, type ComponentType, type ReactNode } from "react";

import { Phone, Popup, SimplifyMark } from "@/components/mobile-auth-variants";
import { publicAsset } from "@/lib/site-path";

export type MobileGuidanceVariantId =
  | "web-guidance"
  | "check-offered"
  | "post-tag"
  | "tag-answer"
  | "help-step";

export type MobileGuidanceVariantMeta = {
  id: MobileGuidanceVariantId;
  lane: "ours" | "soti";
  title: string;
  tagline: string;
  scene: string;
  soti: string;
  pros: string[];
  cons: string[];
};

export const mobileGuidanceVariants: MobileGuidanceVariantMeta[] = [
  {
    id: "web-guidance",
    lane: "ours",
    title: "A — Our design",
    tagline:
      "The screen in your screenshot. Assigned work, You are clear, and three empty lists.",
    scene: "3:15. No nearby offer, no active procedure, no history.",
    soti: "Kept as the reference so it can be compared with the SOTI flow below.",
    pros: [
      "The empty state is named: You are clear",
      "Offers, the active procedure, and history are already three separate lists",
      "SOS stays on the page",
    ],
    cons: [
      "All three lists are empty, so an offer has no shape yet",
      "Guided Response is a second name for Guidance",
      "The address bar, Install, and the account mark sit above the work",
    ],
  },
  {
    id: "check-offered",
    lane: "soti",
    title: "B — Step 1. A check is offered",
    tagline:
      "The same lists, no longer empty. A perimeter check is a nearby offer. Nothing is active until the officer takes it.",
    scene: "14:20. The admin assigns a perimeter check. It arrives as a nearby offer.",
    soti: "The phone is already on Simpnify. This step is the offer itself. The scan and the help request come after the officer takes it. SOTI Snap’s form builder stays out.",
    pros: [
      "The officer can see the check before it becomes the active procedure",
      "The three lists from A still name offers, the active response, and history",
      "Taking it is one button",
    ],
    cons: [
      "A missed offer looks the same as You are clear until someone looks at the count",
      "The page does not yet say where the post tag is",
    ],
  },
  {
    id: "post-tag",
    lane: "soti",
    title: "C — Step 2. Hold the phone to the tag",
    tagline:
      "The check is active. Presence at Gate 2 is a tap on the post tag, not a typed confirm.",
    scene: "14:21. Tan is at the post. Step 2 of 5.",
    soti: "SOTI rugged-phone scanning. An NFC tag at the post proves the officer is there. The admin follows the step and the place. The screen stays on the phone.",
    pros: [
      "Proof of presence without typing",
      "The step, the place, and the tag are on one screen",
      "The line says the admin is following the step, not the screen",
    ],
    cons: [
      "Each post needs a tag",
      "The wording has to stay this plain, or the officer feels watched",
    ],
  },
  {
    id: "tag-answer",
    lane: "soti",
    title: "D — Step 3. The tag answers",
    tagline:
      "The same step, two results. A green check moves the procedure. A yellow note means this tag is not the post.",
    scene: "14:21. The tag either proves Gate 2, or it does not.",
    soti: "The scan is the proof. A matching tag records the step and the place. A different tag does not advance the check, and it does not open the screen to anyone.",
    pros: [
      "The officer sees what was recorded: step, place, and time",
      "A wrong tag stays on this step",
      "Password-style typing is not the fallback",
    ],
    cons: [
      "A shaky tap can look like the wrong post",
      "Two sheets on one step, so the reader has to take them as either-or",
    ],
  },
  {
    id: "help-step",
    lane: "soti",
    title: "E — Step 4. Ask for help",
    tagline:
      "At step 3 the gate lock looks wrong. Help is a button on that step. The sheet shows exactly what left the phone.",
    scene: "14:27. Help from inside the step.",
    soti: "SOTI XSight Live View, the officer-facing slice. The request carries the step, the place, and the time. Remote Control, which can open the phone’s screen, stays with SOTI.",
    pros: [
      "Nobody has to ask where the officer is",
      "The sheet repeats the step, the place, and the time",
      "The admin sees that, not the screen",
    ],
    cons: [
      "The sheet does not show the lock. The admin still has to hear what is wrong",
      "Help needs signal. A saved request is a later rule",
    ],
  },
];

function GuidanceFrame({
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
        <span className="text-[15px] font-semibold">Guidance</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-3 pb-16 pt-2">{children}</div>
      <span className="absolute bottom-8 right-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-[#e5334b] text-[10px] font-bold text-white shadow-lg">
        SOS
      </span>
      {sheet ? (
        <>
          <div className="absolute inset-0 z-20 bg-[#12141c]/35" />
          <div className="absolute inset-0 z-30">{sheet}</div>
        </>
      ) : null}
    </Phone>
  );
}

function ListBlock({
  title,
  count,
  sub,
  live = false,
}: {
  title: string;
  count: string;
  sub: string;
  live?: boolean;
}) {
  return (
    <div className="rounded-xl bg-white px-3 py-2.5 text-[#1c2434] shadow-[0_4px_14px_rgba(20,40,50,0.05)]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[12px] font-semibold">{title}</p>
        {live ? (
          <span className="rounded-full bg-[#e7f8f4] px-2 py-0.5 text-[9px] font-semibold text-[#1b7a45]">
            Live
          </span>
        ) : (
          <span className="text-[12px] font-semibold text-[#8b93a7]">{count}</span>
        )}
      </div>
      <p className="mt-0.5 text-[10px] leading-4 text-[#667085]">{sub}</p>
    </div>
  );
}

function StepBody({
  title = "Hold the phone to the post",
  step,
  place,
  body,
  progress,
}: {
  title?: string;
  step: string;
  place: string;
  body: string;
  progress: string;
}) {
  return (
    <>
      <p className="text-[10px] font-semibold tracking-[0.14em] text-[#1498b0]">PERIMETER CHECK</p>
      <p className="-mt-1 text-[18px] font-semibold leading-6">{title}</p>
      <div className="rounded-xl bg-white p-3 text-[#1c2434] shadow-[0_4px_14px_rgba(20,40,50,0.05)]">
        <p className="text-[12px] font-semibold">
          {step} · {place}
        </p>
        <div className="mt-2 h-1.5 rounded-full bg-[#e7f6f8]">
          <div className="h-full rounded-full bg-[#1498b0]" style={{ width: progress }} />
        </div>
        <p className="mt-2 text-[11px] leading-4 text-[#3c4558]">{body}</p>
      </div>
      <div className="rounded-xl bg-[#e7f6f8] p-3">
        <p className="text-[10px] leading-4 text-[#0f6e74]">
          Admin is following your step and position, not your screen.
        </p>
      </div>
    </>
  );
}

function NfcMark() {
  return (
    <div className="rounded-xl bg-white p-3 text-center text-[#1c2434] shadow-[0_4px_14px_rgba(20,40,50,0.05)]">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-dashed border-[#1498b0] text-[10px] font-bold text-[#1498b0]">
        NFC
      </span>
      <p className="mt-1 text-[10px] text-[#667085]">Hold the phone to the tag</p>
    </div>
  );
}

export function MobileGuidanceVariantWeb() {
  return (
    <img
      src={publicAsset("/photos/guidance-ours.png")}
      alt="Our design. Assigned work, Guidance, You are clear, in the phone browser."
      className="w-[280px] shrink-0 rounded-[2.2rem]"
    />
  );
}

export function MobileGuidanceVariantOffer() {
  return (
    <GuidanceFrame>
      <p className="text-[10px] font-semibold tracking-[0.14em] text-[#1498b0]">ASSIGNED WORK</p>
      <p className="-mt-1 text-[18px] font-semibold">A check is waiting</p>
      <div className="rounded-xl bg-white p-3 text-[#1c2434] shadow-[0_4px_14px_rgba(20,40,50,0.05)]">
        <p className="text-[13px] font-semibold">Perimeter check</p>
        <p className="mt-0.5 text-[11px] leading-4 text-[#667085]">Gate 2 · 5 steps · nearby offer</p>
        <div className="mt-3 grid h-10 place-items-center rounded-xl bg-[#1498b0] text-[13px] font-semibold text-white">
          Take this check
        </div>
      </div>
      <ListBlock title="Available assignments" count="1" sub="Perimeter check · Gate 2" />
      <ListBlock title="My active response" count="0" sub="No active procedure." />
      <ListBlock title="History" count="0" sub="No assignment history." />
    </GuidanceFrame>
  );
}

export function MobileGuidanceVariantTag() {
  return (
    <GuidanceFrame>
      <StepBody
        step="Step 2 of 5"
        place="Gate 2"
        progress="40%"
        body="Check the fence line, then tap the post tag."
      />
      <NfcMark />
      <ListBlock title="My active response" count="" sub="Perimeter check · step 2 of 5" live />
    </GuidanceFrame>
  );
}

export function MobileGuidanceVariantAnswer() {
  return (
    <>
      <GuidanceFrame
        sheet={
          <Popup
            tone="ok"
            title="Post confirmed"
            body="Step 2 of 5 · Gate 2 · 14:21. The admin sees this step and this place, not your screen."
          />
        }
      >
        <StepBody
          step="Step 2 of 5"
          place="Gate 2"
          progress="40%"
          body="Check the fence line, then tap the post tag."
        />
        <NfcMark />
      </GuidanceFrame>
      <GuidanceFrame
        sheet={
          <Popup
            tone="info"
            title="This tag is not Gate 2"
            body="Stay at the post and hold the phone to that tag. This step has not moved."
          />
        }
      >
        <StepBody
          step="Step 2 of 5"
          place="Gate 2"
          progress="40%"
          body="Check the fence line, then tap the post tag."
        />
        <NfcMark />
      </GuidanceFrame>
    </>
  );
}

export function MobileGuidanceVariantHelp() {
  return (
    <GuidanceFrame
      sheet={
        <Popup
          tone="ok"
          title="Help requested"
          body="Stay with this phone. Sent: step 3 of 5, Gate 2 perimeter, 14:27. Admin Rao sees the step and the place, not the screen."
        />
      }
    >
      <StepBody
        title="The gate lock looks wrong"
        step="Step 3 of 5"
        place="Gate 2"
        progress="60%"
        body="Ask for help from this step. The request carries the step and the place."
      />
      <div className="grid h-10 place-items-center rounded-xl bg-[#1498b0] text-[13px] font-semibold text-white">
        I need help with this step
      </div>
    </GuidanceFrame>
  );
}

const variantMap: Record<MobileGuidanceVariantId, ComponentType> = {
  "web-guidance": MobileGuidanceVariantWeb,
  "check-offered": MobileGuidanceVariantOffer,
  "post-tag": MobileGuidanceVariantTag,
  "tag-answer": MobileGuidanceVariantAnswer,
  "help-step": MobileGuidanceVariantHelp,
};

export function MobileGuidanceVariant({ id }: { id: MobileGuidanceVariantId }) {
  return createElement(variantMap[id]);
}
