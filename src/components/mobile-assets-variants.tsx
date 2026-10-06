import { createElement, type ComponentType, type ReactNode } from "react";

import { Phone, Popup, SimplifyMark } from "@/components/mobile-auth-variants";
import { publicAsset } from "@/lib/site-path";

export type MobileAssetsVariantId =
  | "web-assets"
  | "badge-kit"
  | "asset-label"
  | "label-answer"
  | "phone-clear";

export type MobileAssetsVariantMeta = {
  id: MobileAssetsVariantId;
  lane: "ours" | "soti";
  title: string;
  tagline: string;
  scene: string;
  soti: string;
  pros: string[];
  cons: string[];
};

export const mobileAssetsVariants: MobileAssetsVariantMeta[] = [
  {
    id: "web-assets",
    lane: "ours",
    title: "A — Our design",
    tagline:
      "The three screens in your screenshots. My Equipment, Field Asset Tasks, and Field Assistant, still in the phone browser.",
    scene: "Reference. Empty kit, empty tasks, then a search of approved sources.",
    soti: "Kept as the reference so it can be compared with the SOTI flow below.",
    pros: [
      "The kit is only what the console assigned to you",
      "A task starts by scanning the label on the asset",
      "Field Assistant answers from approved sources",
    ],
    cons: [
      "The address bar and Install sit above the kit",
      "An empty phone does not say whose badge it is waiting for",
      "The last search can still be on the phone for the next officer",
    ],
  },
  {
    id: "badge-kit",
    lane: "soti",
    title: "B — Step 1. This badge, this kit",
    tagline:
      "The shared phone stays on Simpnify. The officer taps their badge. My Equipment shows that kit, and nothing from the device fleet.",
    scene: "14:10. Badge accepted. Radio, Gate 2 keys, and a torch.",
    soti: "SOTI Lockdown replaces the phone home with this app, and the home can change with the role. SOTI Identity NFC sign-in is the badge. The console still assigns the kit. Enrollment of the phone itself stays with SOTI.",
    pros: [
      "The kit is who is holding the phone",
      "No browser chrome above My Equipment",
      "The next officer does not inherit this list",
    ],
    cons: [
      "Needs a badge and NFC on the phone",
      "A kit that the console has not assigned still looks empty",
    ],
  },
  {
    id: "asset-label",
    lane: "soti",
    title: "C — Step 2. Hold the phone to the label",
    tagline:
      "The task is Inspect Pump 4. Proof is the label fixed to the pump, not a typed confirm. The work log stays in Simpnify.",
    scene: "14:18. One active task. The officer is at the pump.",
    soti: "SOTI Lockdown can use the phone as a capture tool for an NFC or QR scan. That scan proves this asset. SOTI Snap’s form builder stays out. The marks and the evidence log stay in Simpnify.",
    pros: [
      "The officer can see the task before the scan",
      "The label is on the asset, so the proof is the place",
      "The work log is not rebuilt in another product",
    ],
    cons: [
      "Each asset needs a label",
      "A missed scan looks the same as not being at the pump yet",
    ],
  },
  {
    id: "label-answer",
    lane: "soti",
    title: "D — Step 3. The label answers",
    tagline: "A green check starts the evidence log. The console sees the asset and the time.",
    scene: "14:22. The label matches Pump 4.",
    soti: "The scan is the proof. A matching label records the asset and the time. SOTI XSight Remote Control, which can open this screen, stays off.",
    pros: [
      "The officer sees what was recorded: the asset and the time",
      "The line says the console does not see the screen",
    ],
    cons: ["A shaky scan can look like the wrong asset, and this step only shows the match"],
  },
  {
    id: "phone-clear",
    lane: "soti",
    title: "E — Step 4. Clear this phone",
    tagline:
      "Field Assistant still has the last search. Clear this phone, confirm what leaves, then the phone is waiting for the next badge.",
    scene: "14:40. The search is still here. Then it is gone.",
    soti: "SOTI shared-device logout can clear user data when the officer leaves. The kit, the Pump 4 task, and this Field Assistant search belong to this badge. Logout wipes them. The approved sources stay Simpnify’s.",
    pros: [
      "The button is on the search the next officer must not see",
      "The confirm sheet names the kit, the task, and the search",
      "The last screen is a waiting phone, so the next officer taps a badge",
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

function AssetFrame({
  theme = "light",
  title,
  sheet,
  children,
}: {
  theme?: "light" | "dark";
  title: string;
  sheet?: ReactNode;
  children: ReactNode;
}) {
  const dark = theme === "dark";
  return (
    <Phone theme={theme}>
      <SimplifyMark theme={theme} />
      <div className="flex items-center gap-1 px-4 pt-3">
        <span className={`text-[18px] leading-none ${dark ? "text-white/80" : "text-[#1c2434]"}`}>
          ‹
        </span>
        <span className="text-[15px] font-semibold">{title}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 px-3 pb-2 pt-2">{children}</div>
      <div className="mt-auto flex items-end justify-between px-4 pb-1">
        <p className={`text-[8px] leading-3 ${dark ? "text-white/35" : "text-[#8b93a7]"}`}>
          © 2026 Simpnify Sdn Bhd
        </p>
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e5334b] text-[10px] font-bold text-white shadow-lg">
          SOS
        </span>
      </div>
      <div
        className={`grid grid-cols-5 border-t py-1.5 text-center text-[8px] ${
          dark ? "border-white/10 text-white/40" : "border-black/5 text-[#8b93a7]"
        }`}
      >
        {["Today", "Work", "Report", "Inbox", "Details"].map((tab) => (
          <span key={tab} className={tab === "Report" ? "font-semibold text-[#1498b0]" : undefined}>
            {tab}
          </span>
        ))}
      </div>
      {sheet ? (
        <>
          <div className="absolute inset-0 z-20 bg-[#12141c]/35" />
          <div className="absolute inset-0 z-30">{sheet}</div>
        </>
      ) : null}
    </Phone>
  );
}

function KitList() {
  const rows = [
    ["Radio CH-4", "On this badge"],
    ["Gate 2 keys", "On this badge"],
    ["Torch", "On this badge"],
  ];
  return (
    <>
      <p className="text-[10px] font-semibold tracking-[0.14em] text-[#1498b0]">FIELD ASSET</p>
      <p className="-mt-1 text-[18px] font-semibold">My Equipment</p>
      <p className="text-[11px] leading-4 text-[#667085]">
        Only this badge. The console still assigns the kit.
      </p>
      {rows.map(([name, detail]) => (
        <div
          key={name}
          className="rounded-xl bg-white px-3 py-2.5 text-[#1c2434] shadow-[0_4px_14px_rgba(20,40,50,0.05)]"
        >
          <p className="text-[13px] font-semibold">{name}</p>
          <p className="text-[11px] text-[#667085]">{detail}</p>
        </div>
      ))}
    </>
  );
}

function LabelMark() {
  return (
    <div className="rounded-xl bg-white p-3 text-center text-[#1c2434] shadow-[0_4px_14px_rgba(20,40,50,0.05)]">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-dashed border-[#1498b0] text-[10px] font-bold text-[#1498b0]">
        QR
      </span>
      <p className="mt-1 text-[10px] text-[#667085]">Hold the phone to the label</p>
    </div>
  );
}

function TaskBody() {
  return (
    <>
      <p className="text-[10px] font-semibold tracking-[0.14em] text-[#1498b0]">FIELD ASSET</p>
      <p className="-mt-1 text-[18px] font-semibold leading-6">Inspect Pump 4</p>
      <div className="rounded-xl bg-white p-3 text-[#1c2434] shadow-[0_4px_14px_rgba(20,40,50,0.05)]">
        <p className="text-[12px] font-semibold">1 active · Gate 2</p>
        <p className="mt-1 text-[11px] leading-4 text-[#3c4558]">
          Scan the label fixed to the pump. The evidence log stays in Simpnify.
        </p>
      </div>
    </>
  );
}

export function MobileAssetsVariantWeb() {
  const shots = [
    ["/photos/equipment-ours.png", "My Equipment", "Our design. My Equipment, no kit assigned, in the phone browser."],
    ["/photos/asset-tasks-ours.png", "Field Asset Tasks", "Our design. Field Asset Tasks, no task and no completed work."],
    [
      "/photos/field-assistant-ours.png",
      "Field Assistant",
      "Our design. Field Assistant, no search yet, then an approved source.",
    ],
  ] as const;
  return (
    <>
      {shots.map(([src, caption, alt]) => (
        <figure key={caption} className="flex shrink-0 flex-col items-center gap-3">
          <figcaption className="text-center text-[11px] font-semibold leading-4 text-white/80">
            {caption}
          </figcaption>
          <img src={publicAsset(src)} alt={alt} className="h-[540px] w-auto rounded-[1.4rem]" />
        </figure>
      ))}
    </>
  );
}

export function MobileAssetsVariantKit() {
  return (
    <>
      <Shot step="Badge accepted. This kit only">
        <AssetFrame title="My Equipment">
          <KitList />
        </AssetFrame>
      </Shot>
      <Shot step="The next officer does not see it">
        <AssetFrame
          title="My Equipment"
          sheet={
            <Popup
              tone="ok"
              title="This kit is on your badge"
              body="Radio CH-4, Gate 2 keys, and a torch. The console assigned them. They leave with this badge."
            />
          }
        >
          <KitList />
        </AssetFrame>
      </Shot>
    </>
  );
}

export function MobileAssetsVariantLabel() {
  return (
    <Shot step="One task. Scan the pump">
      <AssetFrame title="Field Asset Tasks">
        <TaskBody />
        <LabelMark />
        <div className="grid h-10 place-items-center rounded-xl bg-[#1498b0] text-[13px] font-semibold text-white">
          I&apos;m at the label
        </div>
      </AssetFrame>
    </Shot>
  );
}

export function MobileAssetsVariantAnswer() {
  return (
    <Shot step="The label matches">
      <AssetFrame
        title="Field Asset Tasks"
        sheet={
          <Popup
            tone="ok"
            title="Pump 4 confirmed"
            body="14:22. Start the evidence log in Simpnify. The console sees the asset and the time, not this screen."
          />
        }
      >
        <TaskBody />
        <LabelMark />
      </AssetFrame>
    </Shot>
  );
}

export function MobileAssetsVariantClear() {
  return (
    <>
      <Shot step="The last search is still here">
        <AssetFrame title="Field Assistant">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-[#1498b0]">FIELD ASSIST</p>
          <p className="-mt-1 text-[18px] font-semibold">Field Assistant</p>
          <div className="rounded-xl bg-white px-3 py-2 text-[#1c2434] shadow-[0_4px_14px_rgba(20,40,50,0.05)]">
            <p className="text-[10px] text-[#8b93a7]">Approved sources only</p>
            <p className="text-[12px] font-medium">Pump 4 label was not recognised</p>
          </div>
          <div className="rounded-xl bg-white p-3 text-[#1c2434] shadow-[0_4px_14px_rgba(20,40,50,0.05)]">
            <p className="text-[10px] font-semibold text-[#1498b0]">Approved source</p>
            <p className="mt-1 text-[12px] font-semibold">Stay on the assigned asset</p>
            <p className="mt-1 text-[11px] leading-4 text-[#3c4558]">
              If the label is not Pump 4, do not start the evidence log.
            </p>
            <p className="mt-2 text-[11px] font-semibold text-[#1498b0]">Open cited source</p>
          </div>
          <div className="mt-auto grid h-10 place-items-center rounded-xl bg-[#1498b0] text-[13px] font-semibold text-white">
            Clear this phone
          </div>
        </AssetFrame>
      </Shot>
      <Shot step="Confirm what leaves">
        <AssetFrame
          title="Field Assistant"
          sheet={
            <Popup
              tone="info"
              title="Clear this phone?"
              body="This kit, the Pump 4 task, and this search leave. Approved sources stay. The next officer starts empty."
            />
          }
        >
          <p className="text-[10px] font-semibold tracking-[0.14em] text-[#1498b0]">FIELD ASSIST</p>
          <p className="-mt-1 text-[18px] font-semibold">Field Assistant</p>
          <div className="rounded-xl bg-white px-3 py-2.5 text-[#1c2434] shadow-[0_4px_14px_rgba(20,40,50,0.05)]">
            <p className="text-[12px] font-semibold">Pump 4 label was not recognised</p>
            <p className="mt-1 text-[11px] leading-4 text-[#667085]">This search is on this badge.</p>
          </div>
        </AssetFrame>
      </Shot>
      <Shot step="Waiting for the next badge">
        <Phone>
          <SimplifyMark />
          <div className="flex flex-1 flex-col items-center px-6 pt-16 text-center">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[#1498b0]">SHARED PHONE</p>
            <h3 className="mt-2 text-[22px] font-semibold leading-7">Tap your badge</h3>
            <p className="mt-2 max-w-[210px] text-[12px] leading-5 text-[#667085]">
              No kit, no task, and no search on this phone.
            </p>
          </div>
          <div className="absolute inset-0 bg-[#12141c]/35" />
          <Popup
            tone="ok"
            title="Phone is clear"
            body="The kit, the Pump 4 task, and the search are gone. This phone is waiting for the next badge."
          />
        </Phone>
      </Shot>
    </>
  );
}

const variantMap: Record<MobileAssetsVariantId, ComponentType> = {
  "web-assets": MobileAssetsVariantWeb,
  "badge-kit": MobileAssetsVariantKit,
  "asset-label": MobileAssetsVariantLabel,
  "label-answer": MobileAssetsVariantAnswer,
  "phone-clear": MobileAssetsVariantClear,
};

export function MobileAssetsVariant({ id }: { id: MobileAssetsVariantId }) {
  return createElement(variantMap[id]);
}
