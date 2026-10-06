"use client";

import { useRef, useState } from "react";

const PURPLE = "linear-gradient(135deg, #1498b0 0%, #0f6e74 100%)";

const places = [
  { name: "Gate 2 perimeter", detail: "Inside zone", x: 34, y: 48 },
  { name: "Vehicle barrier", detail: "Gate 2 · door", x: 58, y: 64 },
  { name: "Loading bay", detail: "East door", x: 76, y: 28 },
  { name: "Fence line", detail: "North post", x: 22, y: 22 },
];

function nearest(x: number, y: number) {
  return places.reduce((best, place) => {
    const d = (place.x - x) ** 2 + (place.y - y) ** 2;
    return d < best.d ? { place, d } : best;
  }, { place: places[0], d: Infinity });
}

export function LocationCheckIn({ startOpen = false }: { startOpen?: boolean }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const [open, setOpen] = useState(startOpen);
  const [pos, setPos] = useState({ x: 58, y: 64 });
  const [sent, setSent] = useState(false);

  const hit = nearest(pos.x, pos.y);
  const accuracy = Math.max(3, Math.round(Math.sqrt(hit.d) / 2));
  const lat = (1.2998 + (pos.y / 100) * 0.0012).toFixed(5);
  const lng = (103.8537 + (pos.x / 100) * 0.0014).toFixed(5);

  function move(clientX: number, clientY: number) {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.min(92, Math.max(8, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.min(88, Math.max(10, ((clientY - rect.top) / rect.height) * 100));
    setPos({ x, y });
    setSent(false);
  }

  return (
    <div className="w-[280px] shrink-0 rounded-[2.2rem] border border-black/40 bg-black p-[9px] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
      <div className="relative flex min-h-[600px] flex-col overflow-hidden rounded-[1.75rem] bg-[#f4f5fa] text-[#1c2434]">
        <div className="absolute left-1/2 top-2 z-20 h-[16px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
        <div className="px-4 pb-3 pt-3 text-white" style={{ background: PURPLE }}>
          <div className="flex justify-between text-[10px] font-semibold text-white/80">
            <span>9:41</span>
            <span>5G</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg leading-none">‹</span>
              <span className="text-[14px] font-semibold">Location</span>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold">
              <span className="h-2.5 w-2.5 rounded-full bg-[#3ddc84]" />
              Online
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2.5 px-3 pb-4 pt-3">
          <div className="rounded-2xl border border-[#b9e6c9] bg-[#e3f6ea] p-3">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#22a85a]/20">
                <span className="h-3.5 w-3.5 rounded-full bg-[#22a85a]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold">{sent ? hit.place.name : "Gate 2 perimeter"}</p>
                <p className="text-[10px] leading-4 text-[#4d6b5a]">
                  {sent ? `Sent to your admin · ${lat}, ${lng}` : "Sharing with your admin · last sent 11:38"}
                </p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between rounded-lg bg-white/80 px-2.5 py-1.5 text-[10px] font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22a85a]" />
                {sent ? hit.place.detail : "Inside zone"}
              </span>
              <span className="text-[#8b93a7]">{sent ? "Sent" : "Live"}</span>
            </div>
          </div>
          {open ? null : (
            <>
              <div className="flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-medium shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f0a81c]" />
                  Battery 18%
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-medium shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22a85a]" />
                  5G strong
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-medium shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22a85a]" />
                  GPS 9 m
                </span>
              </div>
              <div className="rounded-xl bg-[#e7f6f8] p-3">
                <p className="text-[9px] font-bold tracking-wide text-[#0f6e74]">POWER SAVING · SET BY YOUR ADMIN</p>
                <p className="mt-1 text-[11px] leading-4 text-[#0f6e74]">Below 20% battery, a fix is sent every 300 s. Next update in 4 min.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="grid h-10 place-items-center rounded-xl bg-[#1498b0] text-[13px] font-semibold text-white"
              >
                Update Location Now
              </button>
              <p className="-mt-1 text-center text-[10px] text-[#8b93a7]">Opens a map. One check-in. Uses a little more battery.</p>
              <div className="rounded-xl bg-white p-3 shadow-[0_6px_18px_rgba(40,40,100,0.07)]">
                <p className="text-[11px] font-semibold">Privacy and battery</p>
                <p className="text-[10px] leading-4 text-[#667085]">Shared with your admin on shift only.</p>
              </div>
            </>
          )}
        </div>

        <span className="absolute bottom-3 left-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-[#e5334b] text-[11px] font-bold text-white shadow-lg">
          SOS
        </span>

        {open ? (
        <div className="absolute inset-x-0 bottom-0 top-[168px] z-30 flex flex-col justify-end bg-black/45">
          <div className="bg-white px-4 pb-5 pt-3 shadow-[0_-12px_40px_rgba(0,0,0,0.25)]">
            <span className="mx-auto mb-3 block h-1 w-10 rounded-full bg-black/15" />
            <p className="text-[14px] font-semibold">Place your pin</p>
            <p className="mt-0.5 text-[10px] leading-4 text-[#667085]">
              SOTI locate asks for one fix. Drag the pin to where you are standing.
            </p>
            <div
              ref={mapRef}
              className="relative mt-3 h-[168px] cursor-crosshair touch-none overflow-hidden rounded-xl bg-[#d5efe3]"
              onPointerDown={(e) => {
                drag.current = true;
                e.currentTarget.setPointerCapture(e.pointerId);
                move(e.clientX, e.clientY);
              }}
              onPointerMove={(e) => {
                if (drag.current) move(e.clientX, e.clientY);
              }}
              onPointerUp={() => {
                drag.current = false;
              }}
            >
              <div className="absolute left-[8%] top-[14%] h-[52px] w-[72px] rounded-md border border-[#8fbfa8] bg-[#c5ddd0]">
                <span className="block px-1 pt-1 text-[8px] font-semibold text-[#14573a]">Gate 2</span>
              </div>
              <div className="absolute right-[6%] top-[10%] h-[40px] w-[58px] rounded-md border border-[#d7c48a] bg-[#f3e7c4]">
                <span className="block px-1 pt-1 text-[8px] font-semibold text-[#8a6410]">Loading bay</span>
              </div>
              <div className="absolute left-0 right-0 top-[58%] h-2.5 bg-[#f4f7f5]" />
              <div className="absolute bottom-0 left-[46%] top-0 w-2.5 bg-[#f4f7f5]" />
              <span
                className="absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1498b0]/40 bg-[#1498b0]/10"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              />
              <span
                className="absolute z-10 -translate-x-1/2 -translate-y-full"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <svg width="22" height="28" viewBox="0 0 22 28" aria-hidden>
                  <path d="M11 27s8-8.2 8-14a8 8 0 1 0-16 0c0 5.8 8 14 8 14z" fill="#1498b0" />
                  <circle cx="11" cy="13" r="3" fill="white" />
                </svg>
              </span>
            </div>
            <div className="mt-3 rounded-xl bg-[#f4f5fa] px-3 py-2">
              <p className="text-[12px] font-semibold">{hit.place.name}</p>
              <p className="text-[10px] text-[#667085]">
                {hit.place.detail} · accuracy {accuracy} m
              </p>
              <p className="text-[10px] font-medium text-[#3c4558]">
                {lat}, {lng}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSent(true)}
              className="mt-3 grid h-10 w-full place-items-center rounded-xl bg-[#1498b0] text-[13px] font-semibold text-white"
            >
              {sent ? "Location updated" : "Update this location"}
            </button>
            <p className="mt-1.5 text-center text-[10px] text-[#8b93a7]">
              One check-in to your admin. Uses a little more battery.
            </p>
          </div>
        </div>
        ) : null}
      </div>
    </div>
  );
}
