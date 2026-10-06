/**
 * Draft review GIF: challenge narrative + demo clips + presenter interstitials.
 * Requires ffmpeg on PATH and network for yt-dlp.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const workDir = path.join(root, "tmp", "challenge-gif");
const outDir = path.join(root, "public", "review");
const outGif = path.join(outDir, "customer-challenge-narrative-review.gif");

const SEGMENTS = [
  {
    id: "presenter-hook",
    type: "presenter",
    duration: 4,
    title: "THE CUSTOMER CHALLENGE",
    line: "The expensive gap is between systems.",
    sub: "AI flow presenter · draft VO",
  },
  {
    id: "clip-context",
    type: "youtube",
    youtubeId: "v-M35pY_fbw",
    section: "*0:00-0:07",
    label: "01 Fragmented context",
  },
  {
    id: "presenter-02",
    type: "presenter",
    duration: 3.5,
    title: "Who connects the story?",
    line: "A sensor knows. A camera sees. A person responds.",
    sub: "",
  },
  {
    id: "clip-ownership",
    type: "youtube",
    youtubeId: "1XSWAFwvKcM",
    section: "*0:00-0:07",
    label: "02 Unclear ownership",
  },
  {
    id: "presenter-03",
    type: "presenter",
    duration: 3.5,
    title: "Shift change shouldn't reset the investigation",
    line: "03 Inconsistent evidence",
    sub: "",
  },
  {
    id: "clip-evidence",
    type: "youtube",
    youtubeId: "2Gt_yoyk_-U",
    section: "*0:00-0:07",
    label: "Evidence on the timeline",
  },
  {
    id: "clip-unified",
    type: "youtube",
    youtubeId: "NyQjZzcMe4A",
    section: "*0:06-0:14",
    label: "Unified response on Simpnify",
  },
  {
    id: "presenter-close",
    type: "presenter",
    duration: 4,
    title: "Signal · location · people · procedure · record",
    line: "Review this GIF before we cut the final reel.",
    sub: "Simpnify · draft",
  },
];

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: false,
    ...opts,
  });
  if (r.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} failed (${r.status})`);
  }
}

const WIN_FONT =
  process.platform === "win32"
    ? "C\\\\:/Windows/Fonts/arial.ttf"
    : "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf";

function ffmpegPath() {
  const r = spawnSync("ffmpeg", ["-version"], { encoding: "utf8", shell: false });
  if (r.status === 0) return "ffmpeg";
  const local = path.join(
    process.env.LOCALAPPDATA || "",
    "Microsoft",
    "WinGet",
    "Packages",
  );
  if (fs.existsSync(local)) {
    const hits = [];
    const walk = (dir, depth) => {
      if (depth > 6) return;
      for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) walk(p, depth + 1);
        else if (ent.name === "ffmpeg.exe") hits.push(p);
      }
    };
    walk(local, 0);
    if (hits[0]) return hits[0];
  }
  throw new Error("ffmpeg not found — install with: winget install Gyan.FFmpeg");
}

function escapeDrawtext(s) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/:/g, "\\:")
    .replace(/'/g, "'\\''")
    .replace(/%/g, "\\%");
}

const WORKFLOW_PNG = path.join(
  root,
  "public",
  "platform",
  "our-platform-site",
  "workflow-builder.png",
);

function makePresenterMp4(ffmpeg, seg, outPath) {
  const w = 1280;
  const h = 720;
  const title = escapeDrawtext(seg.title);
  const line = escapeDrawtext(seg.line);
  const sub = seg.sub ? escapeDrawtext(seg.sub) : "";
  const subPart = sub
    ? `,drawtext=fontfile=${WIN_FONT}:fontcolor=#5eead4:fontsize=22:x=(w-text_w)/2:y=h*0.78:text='${sub}'`
    : "";
  const textVf = `drawtext=fontfile=${WIN_FONT}:fontcolor=white:fontsize=42:x=(w-text_w)/2:y=h*0.22:text='${title}',drawtext=fontfile=${WIN_FONT}:fontcolor=#94a3b8:fontsize=28:x=(w-text_w)/2:y=h*0.34:text='${line}'${subPart}`;

  if (fs.existsSync(WORKFLOW_PNG)) {
    run(ffmpeg, [
      "-y",
      "-f",
      "lavfi",
      "-i",
      `color=c=0x0a1218:s=${w}x${h}:d=${seg.duration}`,
      "-loop",
      "1",
      "-t",
      String(seg.duration),
      "-i",
      WORKFLOW_PNG,
      "-filter_complex",
      `[1:v]scale=520:-1[flow];[0:v][flow]overlay=(W-w)/2:(H-h)/2+40,${textVf}`,
      "-t",
      String(seg.duration),
      "-c:v",
      "libx264",
      "-pix_fmt",
      "yuv420p",
      outPath,
    ]);
    return;
  }

  run(ffmpeg, [
    "-y",
    "-f",
    "lavfi",
    "-i",
    `color=c=0x0a1218:s=${w}x${h}:d=${seg.duration}`,
    "-vf",
    textVf,
    "-t",
    String(seg.duration),
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    outPath,
  ]);
}

const LOCAL_HERO_MP4 = path.join(
  root,
  "public",
  "platform",
  "our-platform-site",
  "energy-marine-cameras-hero.mp4",
);

function clipFromLocalHero(ffmpeg, seg, outPath) {
  if (!fs.existsSync(LOCAL_HERO_MP4)) {
    throw new Error(`Missing local clip source: ${LOCAL_HERO_MP4}`);
  }
  const match = seg.section.match(/\*(\d+):(\d+)-(\d+):(\d+)/);
  const start = match ? Number(match[1]) * 60 + Number(match[2]) : 0;
  const end = match ? Number(match[3]) * 60 + Number(match[4]) : start + 7;
  console.log(`Clip ${seg.id}: local hero ${start}s–${end}s`);
  run(ffmpeg, [
    "-y",
    "-ss",
    String(start),
    "-to",
    String(end),
    "-i",
    LOCAL_HERO_MP4,
    "-vf",
    "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1",
    "-an",
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    outPath,
  ]);
}

function downloadYoutube(ffmpeg, seg, outPath) {
  if (process.env.CHALLENGE_GIF_USE_YOUTUBE !== "1") {
    clipFromLocalHero(ffmpeg, seg, outPath);
    return;
  }
  const url = `https://www.youtube.com/watch?v=${seg.youtubeId}`;
  const raw = path.join(workDir, `${seg.id}-raw.mp4`);
  const npx = process.platform === "win32" ? "npx.cmd" : "npx";
  const dl = spawnSync(
    npx,
    [
      "--yes",
      "yt-dlp",
      "-f",
      "bv*[height<=720]+ba/b[height<=720]",
      "--merge-output-format",
      "mp4",
      "--download-sections",
      seg.section,
      "-o",
      raw,
      url,
    ],
    { cwd: root, stdio: "inherit", shell: true },
  );

  if (dl.status !== 0 || !fs.existsSync(raw)) {
    clipFromLocalHero(ffmpeg, seg, outPath);
    return;
  }

  run(ffmpeg, [
    "-y",
    "-i",
    raw,
    "-vf",
    "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,setsar=1",
    "-an",
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    outPath,
  ]);
}

function main() {
  fs.mkdirSync(workDir, { recursive: true });
  fs.mkdirSync(outDir, { recursive: true });

  const ffmpeg = ffmpegPath();
  const parts = [];

  for (const seg of SEGMENTS) {
    const part = path.join(workDir, `${seg.id}.mp4`);
    if (seg.type === "presenter") {
      makePresenterMp4(ffmpeg, seg, part);
    } else {
      downloadYoutube(ffmpeg, seg, part);
    }
    parts.push(part);
  }

  const listPath = path.join(workDir, "concat.txt");
  fs.writeFileSync(
    listPath,
    parts.map((p) => `file '${p.replace(/\\/g, "/")}'`).join("\n"),
    "utf8",
  );

  const merged = path.join(workDir, "merged.mp4");
  run(ffmpeg, [
    "-y",
    "-f",
    "concat",
    "-safe",
    "0",
    "-i",
    listPath,
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    merged,
  ]);

  const palette = path.join(workDir, "palette.png");
  run(ffmpeg, [
    "-y",
    "-i",
    merged,
    "-vf",
    "fps=10,scale=960:-1:flags=lanczos,palettegen=stats_mode=diff",
    palette,
  ]);

  run(ffmpeg, [
    "-y",
    "-i",
    merged,
    "-i",
    palette,
    "-lavfi",
    "fps=10,scale=960:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3",
    "-loop",
    "0",
    outGif,
  ]);

  console.log("\nWrote review GIF:", outGif);
}

main();
