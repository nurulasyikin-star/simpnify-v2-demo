"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  Camera,
  Check,
  MapPin,
  Pause,
  Play,
  Send,
  ShieldAlert,
  Smartphone,
} from "lucide-react";

const LOOP = 14;
const RED = "#ff4d4f";
const CYAN = "#3db8cf";
const GREEN = "#4ade80";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const ease = (p: number) => 1 - Math.pow(1 - p, 3);
const fs = (cqw: number): CSSProperties => ({ fontSize: `max(7px, ${cqw}cqw)` });

const CHAPTERS = [
  { at: 0, end: 2.4, label: "The alarm fires at the console." },
  { at: 2.4, end: 5, label: "It leaves the console and lands on the phone." },
  { at: 5, end: 6.6, label: "The officer sees the place," },
  { at: 6.6, end: 8.2, label: "the task," },
  { at: 8.2, end: 10, label: "and what to send back." },
  { at: 10, end: LOOP, label: "The answer returns to the console. Loop closed." },
];

const CAMS = ["CAM 01 · Lobby", "CAM 02 · Car park", "CAM 03 · Gate B", "CAM 04 · Loading bay"];

export function AlarmToPhoneFilm({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const tRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tRef.current = 12.5;
      setT(12.5);
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setInView(!!e?.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      tRef.current = (tRef.current + (now - last) / 1000) % LOOP;
      last = now;
      setT(tRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, inView]);

  const seek = (s: number) => {
    tRef.current = s;
    setT(s);
  };

  // Scene state
  const sceneIn = ease(seg(t, 0, 0.6)) * (1 - seg(t, 13.4, LOOP));
  const alarmOn = t >= 0.6 && t < 11.4;
  const verified = t >= 11.4;
  const pulse = alarmOn ? 0.55 + 0.45 * Math.abs(Math.sin(t * 5)) : 0;
  const alertRow = ease(seg(t, 0.9, 1.5));
  const dispatched = t >= 2.4;

  const outbound = ease(seg(t, 2.4, 4));
  const inbound = ease(seg(t, 10, 11.4));
  const lineGlow = Math.max(
    t >= 2.4 && t < 4.2 ? 1 : 0,
    t >= 10 && t < 11.6 ? 1 : 0,
  );

  const notif = ease(seg(t, 4, 4.5)) * (1 - ease(seg(t, 4.8, 5.1)));
  const placeIn = ease(seg(t, 5, 5.5));
  const taskIn = ease(seg(t, 6.6, 7.1));
  const sendIn = ease(seg(t, 8.2, 8.7));
  const pressed = t >= 9.3 && t < 9.55;
  const sent = t >= 9.55;
  const focus =
    t < 6.6 ? "place" : t < 8.2 ? "task" : t < 10 ? "send" : "none";

  const chapterIdx = CHAPTERS.findIndex((c) => t >= c.at && t < c.end);
  const chapter = CHAPTERS[chapterIdx === -1 ? CHAPTERS.length - 1 : chapterIdx];

  const blockStyle = (p: number, active: boolean): CSSProperties => ({
    opacity: p,
    transform: `translateY(${(1 - p) * 12}px)`,
    borderColor: active ? CYAN : "rgba(255,255,255,0.08)",
    boxShadow: active ? `0 0 14px ${CYAN}55` : "none",
    transition: "border-color 300ms, box-shadow 300ms",
  });

  return (
    <div
      ref={rootRef}
      className={`relative w-full overflow-hidden rounded-[10px] bg-[#05090b] [container-type:inline-size] ${className}`}
    >
      <div className="relative aspect-video w-full" style={{ opacity: 0.25 + 0.75 * sceneIn }}>
        {/* grid backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(61,184,207,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(61,184,207,0.08) 1px, transparent 1px)",
            backgroundSize: "4cqw 4cqw",
          }}
        />

        {/* ===== Console ===== */}
        <div
          className="absolute flex flex-col rounded-[0.8cqw] border border-white/10 bg-[#0a1216] p-[1cqw]"
          style={{ left: "4%", top: "10%", width: "54%", height: "70%" }}
        >
          <div className="mb-[0.8cqw] flex items-center justify-between text-white/60" style={fs(0.95)}>
            <span className="tracking-[0.2em]">SIMPNIFY CONSOLE</span>
            <span className="flex items-center gap-[0.4cqw]">
              <span
                className="inline-block h-[0.6cqw] w-[0.6cqw] rounded-full"
                style={{ background: alarmOn ? RED : GREEN, opacity: alarmOn ? pulse : 1 }}
              />
              {alarmOn ? "1 ACTIVE ALARM" : "ALL CLEAR"}
            </span>
          </div>
          <div className="flex min-h-0 flex-1 gap-[1cqw]">
            <div className="grid flex-[1.4] grid-cols-2 grid-rows-2 gap-[0.6cqw]">
              {CAMS.map((cam, i) => {
                const hot = i === 2;
                const border = hot && alarmOn ? RED : hot && verified ? GREEN : "rgba(255,255,255,0.08)";
                return (
                  <div
                    key={cam}
                    className="relative overflow-hidden rounded-[0.4cqw] border"
                    style={{
                      borderColor: border,
                      background:
                        "radial-gradient(ellipse at 30% 30%, #1b2a30 0%, #0b1418 70%)",
                      boxShadow: hot && alarmOn ? `0 0 ${1.6 * pulse}cqw ${RED}aa` : "none",
                    }}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1/3"
                      style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.6))" }}
                    />
                    {hot && alarmOn ? (
                      <div
                        className="absolute rounded-sm border"
                        style={{
                          borderColor: RED,
                          left: `${38 + Math.sin(t * 1.3) * 6}%`,
                          top: "30%",
                          width: "16%",
                          height: "42%",
                          opacity: pulse,
                        }}
                      />
                    ) : null}
                    <span className="absolute bottom-[0.4cqw] left-[0.5cqw] text-white/70" style={fs(0.75)}>
                      {cam}
                    </span>
                    {hot && (alarmOn || verified) ? (
                      <span
                        className="absolute right-[0.5cqw] top-[0.4cqw] rounded-sm px-[0.4cqw] font-semibold text-black"
                        style={{ ...fs(0.7), background: alarmOn ? RED : GREEN }}
                      >
                        {alarmOn ? "INTRUSION" : "VERIFIED"}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-1 flex-col gap-[0.6cqw]">
              <span className="tracking-[0.18em] text-white/40" style={fs(0.75)}>
                EVENTS
              </span>
              <div
                className="rounded-[0.4cqw] border p-[0.7cqw]"
                style={{
                  opacity: alertRow,
                  transform: `translateX(${(1 - alertRow) * 20}px)`,
                  borderColor: verified ? `${GREEN}88` : `${RED}88`,
                  background: verified ? `${GREEN}12` : `${RED}14`,
                }}
              >
                <div className="flex items-center gap-[0.5cqw] font-semibold" style={{ ...fs(0.95), color: verified ? GREEN : RED }}>
                  <ShieldAlert style={{ width: "1.2cqw", height: "1.2cqw" }} />
                  Perimeter breach
                </div>
                <div className="mt-[0.3cqw] text-white/60" style={fs(0.8)}>
                  Gate B · North fence
                </div>
                <div className="mt-[0.5cqw] text-white/80" style={fs(0.8)}>
                  {verified
                    ? "✓ Report received · area secured"
                    : dispatched
                      ? "→ Dispatched to Officer Lim"
                      : "Awaiting dispatch…"}
                </div>
              </div>
              {verified ? (
                <div
                  className="flex items-center gap-[0.6cqw] rounded-[0.4cqw] border border-white/10 p-[0.6cqw]"
                  style={{ opacity: ease(seg(t, 11.4, 12)) }}
                >
                  <div
                    className="h-[2.6cqw] w-[3.6cqw] rounded-[0.3cqw]"
                    style={{ background: "linear-gradient(135deg,#2a3c42,#11191c)" }}
                  />
                  <div className="text-white/70" style={fs(0.75)}>
                    Photo from field
                    <div className="text-white/40">Officer Lim · 14:32</div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* ===== Link line + packets ===== */}
        <div
          aria-hidden
          className="absolute h-[2px]"
          style={{
            left: "58%",
            width: "11%",
            top: "45%",
            background: lineGlow ? CYAN : "rgba(255,255,255,0.12)",
            boxShadow: lineGlow ? `0 0 10px ${CYAN}` : "none",
            transition: "background 300ms, box-shadow 300ms",
          }}
        />
        {t >= 2.4 && t < 4.1 ? (
          <Packet left={58 + 11 * outbound} color={RED} />
        ) : null}
        {t >= 10 && t < 11.5 ? (
          <Packet left={69 - 11 * inbound} color={GREEN} />
        ) : null}

        {/* ===== Phone ===== */}
        <div
          className="absolute overflow-hidden rounded-[1.6cqw] border-[0.35cqw] border-[#1d2a2f] bg-[#081013]"
          style={{
            left: "69%",
            top: "5%",
            width: "24%",
            height: "86%",
            boxShadow: t >= 4 && t < 4.6 ? `0 0 2cqw ${RED}77` : "0 1cqw 3cqw rgba(0,0,0,0.6)",
          }}
        >
          <div className="mx-auto mt-[0.6cqw] h-[0.5cqw] w-[30%] rounded-full bg-[#1d2a2f]" />
          <div className="flex items-center justify-between px-[1cqw] pt-[0.6cqw] text-white/50" style={fs(0.7)}>
            <span>Officer Lim</span>
            <Smartphone style={{ width: "0.9cqw", height: "0.9cqw" }} />
          </div>

          {/* notification */}
          <div
            className="absolute left-[4%] right-[4%] rounded-[0.6cqw] border p-[0.6cqw]"
            style={{
              top: `${-14 + notif * 20}%`,
              opacity: notif,
              borderColor: `${RED}aa`,
              background: "#1a0d0e",
            }}
          >
            <div className="font-semibold" style={{ ...fs(0.85), color: RED }}>
              New task · Perimeter breach
            </div>
            <div className="text-white/60" style={fs(0.7)}>
              Tap to open
            </div>
          </div>

          <div className="flex flex-col gap-[0.7cqw] px-[0.9cqw] pt-[1cqw]">
            {/* PLACE */}
            <div className="rounded-[0.6cqw] border bg-white/[0.03] p-[0.6cqw]" style={blockStyle(placeIn, focus === "place")}>
              <Label n="1" text="THE PLACE" />
              <div
                className="relative mt-[0.4cqw] h-[5.5cqw] overflow-hidden rounded-[0.4cqw]"
                style={{
                  background:
                    "linear-gradient(135deg,#0f1f24,#0b1518), repeating-linear-gradient(45deg, transparent 0 8px, rgba(61,184,207,0.06) 8px 9px)",
                }}
              >
                <div className="absolute left-[10%] right-[10%] top-[30%] h-[2px] bg-white/15" />
                <div className="absolute bottom-[20%] left-[25%] top-[30%] w-[2px] bg-white/15" />
                <MapPin
                  className="absolute"
                  style={{
                    left: "58%",
                    top: `${18 - 6 * Math.abs(Math.sin(t * 4)) * (focus === "place" ? 1 : 0)}%`,
                    width: "1.8cqw",
                    height: "1.8cqw",
                    color: RED,
                  }}
                />
              </div>
              <div className="mt-[0.4cqw] text-white/80" style={fs(0.8)}>
                Gate B · North fence · 120 m
              </div>
            </div>

            {/* TASK */}
            <div className="rounded-[0.6cqw] border bg-white/[0.03] p-[0.6cqw]" style={blockStyle(taskIn, focus === "task")}>
              <Label n="2" text="THE TASK" />
              <div className="mt-[0.3cqw] font-medium text-white" style={fs(0.85)}>
                Verify intruder, secure gate
              </div>
              {["Go to Gate B", "Check fence line"].map((s, i) => {
                const done = t >= 7.3 + i * 0.4;
                return (
                  <div key={s} className="mt-[0.25cqw] flex items-center gap-[0.4cqw] text-white/70" style={fs(0.72)}>
                    <span
                      className="flex h-[0.9cqw] w-[0.9cqw] items-center justify-center rounded-sm border"
                      style={{ borderColor: done ? CYAN : "rgba(255,255,255,0.3)", background: done ? CYAN : "transparent" }}
                    >
                      {done ? <Check style={{ width: "0.7cqw", height: "0.7cqw", color: "#041014" }} /> : null}
                    </span>
                    {s}
                  </div>
                );
              })}
            </div>

            {/* SEND BACK */}
            <div className="rounded-[0.6cqw] border bg-white/[0.03] p-[0.6cqw]" style={blockStyle(sendIn, focus === "send")}>
              <Label n="3" text="SEND BACK" />
              <div className="mt-[0.4cqw] flex gap-[0.4cqw]">
                <div
                  className="flex h-[2.6cqw] w-[2.6cqw] items-center justify-center rounded-[0.3cqw] border border-white/10"
                  style={{ background: t >= 8.8 ? "linear-gradient(135deg,#2a3c42,#11191c)" : "transparent" }}
                >
                  <Camera style={{ width: "1.1cqw", height: "1.1cqw", color: "rgba(255,255,255,0.6)" }} />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-[0.25cqw]">
                  <span
                    className="rounded-full border px-[0.5cqw] text-center"
                    style={{
                      ...fs(0.68),
                      borderColor: t >= 9 ? GREEN : "rgba(255,255,255,0.2)",
                      color: t >= 9 ? GREEN : "rgba(255,255,255,0.6)",
                    }}
                  >
                    Area secured
                  </span>
                </div>
              </div>
              <div
                className="mt-[0.5cqw] flex items-center justify-center gap-[0.4cqw] rounded-[0.4cqw] py-[0.35cqw] font-semibold"
                style={{
                  ...fs(0.8),
                  background: sent ? GREEN : CYAN,
                  color: "#041014",
                  transform: pressed ? "scale(0.94)" : "scale(1)",
                  transition: "transform 120ms, background 200ms",
                }}
              >
                {sent ? <Check style={{ width: "1cqw", height: "1cqw" }} /> : <Send style={{ width: "1cqw", height: "1cqw" }} />}
                {sent ? "Sent" : "Send report"}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Caption ===== */}
        <div className="absolute bottom-[3%] left-[4%] right-[34%]">
          <div key={chapter.label} className="animate-[fadeIn_400ms_ease-out] text-white" style={fs(1.6)}>
            <span className="mr-[0.8cqw] font-semibold" style={{ color: CYAN }}>
              {String(CHAPTERS.indexOf(chapter) + 1).padStart(2, "0")}
            </span>
            {chapter.label}
          </div>
        </div>
      </div>

      {/* ===== Controls ===== */}
      <div className="flex items-center gap-3 border-t border-white/10 bg-black/60 px-4 py-2">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="text-white/80 transition hover:text-secondary"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <div
          className="relative h-1 flex-1 cursor-pointer rounded-full bg-white/10"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            seek(clamp((e.clientX - r.left) / r.width) * LOOP * 0.999);
          }}
        >
          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${(t / LOOP) * 100}%`, background: CYAN }} />
          {CHAPTERS.slice(1).map((c) => (
            <span
              key={c.at}
              className="absolute top-1/2 h-2 w-[2px] -translate-y-1/2 bg-white/40"
              style={{ left: `${(c.at / LOOP) * 100}%` }}
            />
          ))}
        </div>
        <span className="w-20 text-right font-mono text-[11px] text-white/50">
          0:{String(Math.floor(t)).padStart(2, "0")} / 0:{LOOP}
        </span>
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

function Packet({ left, color }: { left: number; color: string }) {
  return (
    <span
      aria-hidden
      className="absolute rounded-full"
      style={{
        left: `${left}%`,
        top: "45%",
        width: "1.1cqw",
        height: "1.1cqw",
        transform: "translate(-50%, -45%)",
        background: color,
        boxShadow: `0 0 1.4cqw ${color}, 0 0 0.4cqw #fff`,
      }}
    />
  );
}

function Label({ n, text }: { n: string; text: string }) {
  return (
    <div className="flex items-center gap-[0.4cqw] tracking-[0.18em]" style={{ ...fs(0.65), color: CYAN }}>
      <span className="flex h-[1cqw] w-[1cqw] items-center justify-center rounded-full border" style={{ borderColor: CYAN }}>
        {n}
      </span>
      {text}
    </div>
  );
}
