"use client";

import { useEffect, useState } from "react";

const BASE = "https://192.168.0.26:7100";

type Step = {
  id: string;
  title: string;
  url: string;
  action: string[];
  caption: string; // on-screen text to add in editor
  cta?: string;
  secs: number;
};

const STEPS: Step[] = [
  { id: "00", title: "Prep (off camera)", url: "/help/article/incident-command-samples-basics",
    action: ["Sign in as system superadmin", "Assurance → VAPT Readiness (sidebar): review the Overview cards, then use the top-right CTAs: Export JSON / Export CSV package / Print report to confirm the pack is ready", "Install/validate Incident Command Samples pack", "Start screen recorder (1080p, 30fps, hide bookmarks)"],
    caption: "", secs: 0 },
  { id: "01", title: "Detect", url: "/operations/incidents",
    action: ["Operations → Incidents", "In another tab: Run the perimeter webhook scenario", "Film the new alarm landing in 'New' (name, location, priority)"],
    caption: "Perimeter breach detected. Instantly.", secs: 6 },
  { id: "02", title: "Verify", url: "/operations/incidents",
    action: ["Select the incident", "Show map / Digital Twin + handling panel", "Optional: Camera Wall tile of fence camera"],
    caption: "See the camera, the map, the context. One screen.", secs: 7 },
  { id: "03", title: "Accept", url: "/operations/incidents",
    action: ["Click Accept", "Card moves toward 'Mine'"],
    caption: "One click to take ownership.", secs: 4 },
  { id: "04", title: "Respond", url: "/operations/incidents",
    action: ["Complete SOP steps", "Dispatch the published Guided Response"],
    caption: "SOP and dispatch, guided step by step.", secs: 8 },
  { id: "05", title: "Record", url: "/operations/incidents",
    action: ["Add observation / evidence", "Record outcome", "Optional: Ask AURA -> insert draft"],
    caption: "Every action captured as evidence.", secs: 6 },
  { id: "06", title: "Close + Review", url: "/operations/incidents",
    action: ["Check readiness checklist", "Close (only when allowed)", "Open History: report, timeline, evidence"],
    caption: "Closed with proof. Ready for the next shift.", secs: 6 },
  { id: "07", title: "CTA end card", url: "/pilot",
    action: ["Cut to the site /pilot page or a title card", "Hold 3-4 seconds"],
    caption: "Book a pilot. simpnify.com", cta: "Book a pilot", secs: 4 },
];

const NOT_DONE = [
  "Restored alarm still needs acknowledgement",
  "Equipment reset request is not proof of reset",
  "Never close on active/unknown source or transport success alone",
  "Practice mode does not prove live lockdown",
];

export default function RecordPage() {
  const [i, setI] = useState(0);
  const [done, setDone] = useState<Record<number, boolean>>({});
  const s = STEPS[i];
  const total = STEPS.reduce((a, b) => a + b.secs, 0);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setI((v) => Math.min(v + 1, STEPS.length - 1));
      if (e.key === "ArrowLeft") setI((v) => Math.max(v - 1, 0));
      if (e.key === " ") { e.preventDefault(); setDone((d) => ({ ...d, [i]: !d[i] })); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [i]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-auto bg-slate-950 text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-6 p-6 md:grid-cols-[260px_1fr]">
        <aside className="space-y-2">
          <h1 className="text-lg font-semibold">Perimeter intrusion promo</h1>
          <p className="text-xs text-slate-400">Target ~{total}s · captions only · ← → navigate · Space = mark done</p>
          {STEPS.map((st, n) => (
            <button key={st.id} onClick={() => setI(n)}
              className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm ${n === i ? "border-cyan-400 bg-cyan-400/10" : "border-slate-800 hover:bg-slate-900"}`}>
              <span>{st.id} {st.title}</span>
              <span className="text-xs text-slate-400">{done[n] ? "✓" : st.secs ? `${st.secs}s` : ""}</span>
            </button>
          ))}
        </aside>

        <main className="space-y-5">
          <div className="text-sm text-cyan-300">Shot {s.id} · {s.secs ? `${s.secs}s` : "off camera"}</div>
          <h2 className="text-4xl font-bold">{s.title}</h2>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <div className="mb-1 text-xs uppercase tracking-wide text-slate-400">Open URL</div>
            <a className="break-all font-mono text-cyan-300 underline" target="_blank" rel="noreferrer"
              href={s.url.startsWith("/help") || s.url.startsWith("/operations") ? BASE + s.url : s.url}>
              {s.url.startsWith("/pilot") ? s.url + "  (this app)" : BASE + s.url}
            </a>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <div className="mb-2 text-xs uppercase tracking-wide text-slate-400">Actions</div>
            <ol className="list-decimal space-y-2 pl-5 text-lg">
              {s.action.map((a) => <li key={a}>{a}</li>)}
            </ol>
          </div>

          {s.caption && (
            <div className="rounded-xl border border-cyan-400/40 bg-cyan-400/5 p-4">
              <div className="mb-1 text-xs uppercase tracking-wide text-cyan-300">On-screen caption</div>
              <div className="text-2xl font-semibold">“{s.caption}”</div>
              {s.cta && <div className="mt-3 inline-block rounded-full bg-cyan-400 px-5 py-2 font-semibold text-slate-950">CTA: {s.cta}</div>}
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => setI(Math.max(i - 1, 0))} className="rounded-lg border border-slate-700 px-4 py-2">← Back</button>
            <button onClick={() => { setDone((d) => ({ ...d, [i]: true })); setI(Math.min(i + 1, STEPS.length - 1)); }}
              className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950">Done · Next →</button>
          </div>

          <details className="rounded-xl border border-amber-500/30 p-4 text-sm text-amber-200">
            <summary className="cursor-pointer">Do not film as “done”</summary>
            <ul className="mt-2 list-disc space-y-1 pl-5">{NOT_DONE.map((n) => <li key={n}>{n}</li>)}</ul>
          </details>
        </main>
      </div>
    </div>
  );
}
