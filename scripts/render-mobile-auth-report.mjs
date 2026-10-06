/**
 * Builds reports/mobile-auth-report.pdf from the running dev server.
 * Session pages: A our design, then B–E the SOTI flow.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "reports");
const imgDir = path.join(outDir, "mobile-auth");
fs.mkdirSync(imgDir, { recursive: true });

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const items = [
  {
    id: "web-lock",
    letter: "A",
    title: "Our design",
    source: "Our design.",
    soti: "The active-session browser screen from the screenshot. Kept as the reference beside the SOTI flow.",
    description:
      "The officer opens the field app in the phone browser. The page is Simple Unified Platform, then Active session detected. Continuing here signs out the other session. The two actions are Continue on this device, and Cancel and keep the other session. Theme, language, Role controlled, and Audited stay on this screen.",
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
    id: "native-lock",
    letter: "B",
    title: "Step 1. Sign in, with a badge",
    soti: "SOTI Lockdown login profile. A shared phone keeps a sign-in screen up until someone logs in, and users can log in with an NFC tag. See soti.net/solutions/lockdown.",
    description:
      "Your Welcome back page, used as B. Tap your badge here is the NFC button. Username, password, and Sign in stay underneath for when the badge misses.",
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
    letter: "C",
    title: "Step 2. Tap the badge",
    soti: "SOTI Identity NFC sign-in, with SSO. The tap is the sign-in.",
    description:
      "Same phone as B. The officer holds their badge to the phone. The tap says who is holding it. Use password instead is a button under the badge.",
    pros: [
      "The phone knows the officer without a password",
      "Password stays as a button when the badge misses",
    ],
    cons: [
      "Needs a badge and NFC on the phone",
      "Password is the fallback when the badge misses",
    ],
  },
];
items.forEach((i) => {
  i.part = "session";
  i.route = "mobile-auth";
  i.selector = `section#${i.id} [data-shot]`;
  i.wide = i.id === "badge-sso";
});

const settingsItems = [
  {
    id: "auto-lock-shared",
    letter: "C",
    title: "Auto-lock for shared handphones",
    wide: true,
    soti: "SOTI Lockdown timeouts and shared-device sign-in. The phone re-locks, and a badge tap or password reopens it.",
    description:
      "The Security Settings screen gets a lock delay (1, 5, 15 minutes or never) and a choice of how the officer comes back: security badge, password, or both. When the timer runs out, the phone shows a locked screen that says how long it was idle and accepts the badge or password. Hold for SOS stays on the lock screen so safety is never behind the lock.",
    pros: [
      "Turns the Lock delay setting into a clear rule officers can read",
      "Badge resume means no password typed on a pool phone",
      "SOS stays reachable while the screen is locked",
    ],
    cons: [
      "Badge resume needs NFC on the handphone",
      "A short delay can lock an officer out mid-incident, so the minimum needs care",
    ],
  },
  {
    id: "device-status",
    letter: "D",
    title: "Device status in Profile",
    soti: "The officer-facing slice of SOTI MobiControl and XSight device health, shown to the person holding the phone.",
    description:
      "The Profile screen gets a “This device” card: connection, live location permission, battery, last sync, and app version, each with a status dot. A “Send status to console” button shares the same facts the console sees, and a green popup confirms it was sent. The officer can answer “is my location live?” without calling anyone.",
    pros: [
      "Answers “is my location live?” without calling the console",
      "Same facts the console sees, so a support call starts from them",
      "Fits under the profile screen already designed",
    ],
    cons: [
      "One more card on a screen that is currently clean",
      "Needs real permission checks, not a static label",
    ],
  },
  {
    id: "console-lock",
    letter: "E",
    title: "Locked from the console",
    soti: "SOTI remote lock. The console locks the handphone. Remote wipe and screen viewing are left out.",
    description:
      "When the console locks a lost or reassigned phone, the officer sees a yellow “Locked by console” screen that says who locked it and when, with a Call control room button and a supervisor-code unlock. Hold for SOS still works from this screen. It covers the lost-phone case without remote screen viewing.",
    pros: [
      "Says why it is locked, instead of asking for a password",
      "Lost-phone case is covered without remote screen viewing",
      "SOS still works from this screen",
    ],
    cons: [
      "Needs a console control and a rule for who may lock a phone",
      "A false lock during an incident is costly, so unlock must be quick",
    ],
  },
];
settingsItems.forEach((i) => {
  i.part = "settings";
  i.route = "mobile-settings";
  i.selector = `section#${i.id} [data-shot]`;
});

const storyItems = [
  {
    id: "briefings",
    letter: "1",
    title: "Briefings: read before shift",
    merged: "Pushed briefing with acknowledge, plus read-before-shift gate",
    soti: "SOTI content push with read confirmation, and the Lockdown idea that a handphone shows only what policy allows until a condition is met.",
    description:
      "Officer Tan picks up the Gate 2 post phone at 08:55. Today stays closed until she acknowledges the one required briefing. One tap tells the admin she has read it, and Today opens with the briefing marked as read. SOS still works throughout.",
    admin: ["Briefing: Gate 2 lock replaced", "Acknowledged: 7 of 9", "Still unread: Lim, Rao"],
    pros: ["Nobody starts patrol unbriefed", "The admin can see who has read it and chase the rest", "One action, no typing"],
    cons: ["Officers may tap without reading", "Needs an override for a supervisor if a briefing is wrong or long"],
  },
  {
    id: "today",
    letter: "2",
    title: "Today: handphone health and offline",
    merged: "Handphone health strip, plus offline banner and waiting-to-send",
    soti: "SOTI XSight device health (battery, connectivity, last check-in), and field work that keeps running offline and syncs on reconnect.",
    description:
      "At 10:05 the status tags show battery, signal, and last sync, the same facts the admin sees. At 10:12 signal drops: a banner sits flush under the header, the header shows a red Offline dot, the Live Location card turns red, and the patrol note is saved on the phone to send later. SOS is stated plainly as needing signal.",
    admin: ["Handphone: Gate-2-PH", "Battery: 22%", "Connectivity: offline since 10:12"],
    pros: ["Officer knows the phone is fit before a patrol", "Nothing is retyped because a note looked lost", "Online and Offline are visible in the header on every screen"],
    cons: ["Needs a local queue in the native app", "Needs real battery and signal reads, not static labels"],
  },
  {
    id: "location",
    letter: "3",
    title: "Location: zone, battery policy, update now",
    merged: "Zone status and exit log, plus battery-aware tracking",
    soti: "SOTI locate sends one device check-in. When that GPS fix is coarse, the officer drags the pin to the exact spot before it is sent. Geofencing stays a status and a log, and the admin battery policy is unchanged.",
    description:
      "At 11:40 the battery reaches 18%. The Location screen names the zone (Gate 2 perimeter), shows battery, signal and GPS accuracy, and states the admin-set power saving policy with the time of the next update. Update Location Now opens a map. The officer drags the pin to the precise spot (the vehicle barrier), sees the place name, accuracy and coordinates update, then sends that one check-in. It uses a little more battery. At 11:52 the exit from Gate 2 and entry to the loading bay appear as a plain log.",
    admin: ["Officer: Tan, Gate-2-PH", "Check-in: Vehicle barrier, pin dragged", "Update rate: 300 s (power saving)"],
    pros: ["A coarse GPS fix can be corrected before it is sent", "The admin sees the point and the zone, never the screen", "Policy is shown, not hidden"],
    cons: ["Needs zones drawn per site", "Poor accuracy indoors can flip the zone status"],
  },
  {
    id: "guidance",
    letter: "4",
    title: "Guidance: tag scan and ask for help",
    merged: "Scan to confirm a step, plus admin follows my step",
    soti: "SOTI rugged-handphone scanning (NFC and barcode) to prove presence, and XSight-style live visibility limited to the step and not the screen.",
    description:
      "At 14:20 the admin assigns a perimeter check. Tan proves each checkpoint by tapping the NFC tag at the post, and the screen says the admin is following her step and position, not her screen. At step 3 she asks for help from inside the step. A bottom sheet confirms the request and shows exactly what was sent: step 3 of 5, Gate 2 perimeter, 14:27.",
    admin: ["Check: Perimeter check, Tan", "Step: 3 of 5, Gate 2 perimeter", "Help requested: 14:27"],
    pros: ["Proof of presence without typing", "The help request carries step and place, so nobody has to ask where she is", "No remote view of the phone"],
    cons: ["Tags must be fitted at each point", "Officers may feel watched, so the wording matters"],
  },
];
storyItems.forEach((i) => {
  i.part = "story";
  i.route = "mobile-story";
  i.wide = true;
  i.selector = `section#${i.id} > div.grid`;
});

const workItems = [
  {
    id: "scan-asset",
    letter: "C",
    title: "Scan the asset",
    soti: "SOTI Snap forms capture barcodes and QR codes from the camera. Only the scan field is taken, not the form builder.",
    description:
      "On the Reports form, Location or asset becomes a Scan QR or barcode button first and a search second. The camera opens, finds the tag on the gate, and fills in Gate 2, Vehicle barrier, Zone B, so the report points at a real asset record. Search by name stays as the fallback.",
    pros: [
      "No typing a location with gloves on",
      "The report always points at a real asset record",
      "Search stays as the fallback",
    ],
    cons: ["Needs asset labels or QR tags at the site", "Camera permission has to be asked once"],
  },
  {
    id: "offline-queue",
    letter: "D",
    title: "Saved on this phone",
    soti: "SOTI mobile apps keep working offline and sync later. Only the sync status is taken, not device management.",
    description:
      "With no signal, Work shows a banner saying reports are saved on this phone and will send when back online. Each report in My recent reports carries a Draft, Pending sync, or Sent chip, and a Send now button is available. The same chips work for Evidence, Briefings, and Patrols.",
    pros: [
      "The officer knows nothing was lost",
      "Same status chips work for Evidence, Briefings, and Patrols",
      "Matches the Offline field solution page",
    ],
    cons: ["Needs a rule for large attachments", "Two officers editing one report offline needs a conflict rule"],
  },
  {
    id: "patrol-live",
    letter: "E",
    title: "Patrol with checkpoints",
    soti: "SOTI location tracking and geofencing show where a device is. Only the trail and checkpoint check-in are taken, not app push.",
    description:
      "Start Patrol shows the route (8 checkpoints, about 40 minutes, GPS on, route downloaded). Once started, the screen shows the route and trail, a progress bar (5 of 8), the checkpoints done, next, and to do, and a Scan checkpoint button. A report from a checkpoint is already tagged with place and time.",
    pros: [
      "Progress and next stop are visible at a glance",
      "A report from a checkpoint is already tagged with place and time",
      "Reuses the live location the Today screen already shows",
    ],
    cons: ["Needs checkpoints defined in the console", "A missed scan needs a clear manual override"],
  },
];
workItems.forEach((i) => {
  i.part = "work";
  i.route = "mobile-work";
  i.wide = true;
  i.selector = `section#${i.id} [data-shot]`;
});

let browser;
for (const channel of ["chrome", "msedge"]) {
  try {
    browser = await chromium.launch({ channel });
    break;
  } catch {}
}
if (!browser) throw new Error("No Chrome or Edge found");
const page = await browser.newPage({
  viewport: { width: 1280, height: 1400 },
  deviceScaleFactor: 2,
});
for (const route of ["mobile-auth", "mobile-settings", "mobile-story", "mobile-work"]) {
  await page.goto(`${BASE}/simpnify-v2-demo/photos/${route}/`, { waitUntil: "load" });
  await page.addStyleTag({ content: "header.fixed{display:none!important}" });
  await page.waitForTimeout(1500);
  for (const it of [...items, ...settingsItems, ...storyItems, ...workItems].filter((x) => x.route === route)) {
    const phone = page.locator(it.selector).first();
    await phone.scrollIntoViewIfNeeded();
    const file = path.join(imgDir, `${it.part}-${it.letter}-${it.id}.png`);
    await phone.screenshot({ path: file });
    it.img = "data:image/png;base64," + fs.readFileSync(file).toString("base64");
  }
}

const li = (arr) => arr.map((t) => `<li>${t}</li>`).join("");
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @page { size: A4; margin: 16mm 14mm; }
  body { font-family: Segoe UI, Arial, sans-serif; color: #1c2434; font-size: 11.5pt; line-height: 1.5; }
  h1 { font-size: 22pt; margin: 0 0 4px; }
  .meta { color: #667085; font-size: 10pt; margin-bottom: 14px; }
  .intro { margin-bottom: 10px; }
  .item { page-break-before: always; }
  .item:first-of-type { page-break-before: auto; }
  .row { display: flex; gap: 22px; align-items: flex-start; }
  .row img { width: 215px; border-radius: 6px; }
  h2 { font-size: 16pt; margin: 0 0 4px; }
  .tag { display: inline-block; background: #efeaff; color: #5b4dff; font-weight: 700; padding: 1px 9px; border-radius: 99px; margin-right: 8px; }
  .soti { background: #f3f6f9; border-left: 3px solid #5b4dff; padding: 8px 12px; margin: 10px 0; font-size: 10.5pt; }
  h3 { font-size: 11pt; margin: 12px 0 2px; text-transform: uppercase; letter-spacing: .06em; color: #667085; }
  ul { margin: 2px 0 0; padding-left: 18px; }
  .pro li::marker { content: "+  "; color: #22a85a; font-weight: 700; }
  .con li::marker { content: "−  "; color: #d33; font-weight: 700; }
  .left-out li { margin-bottom: 2px; }
</style></head><body>
  <section class="item">
    <h1>Mobile session screens: SOTI ideas for Simpnify</h1>
    <div class="meta">2 October 2026 · Design review · A our design, then B–E the SOTI flow</div>
    <p class="intro">Read part 1 in order. <b>A</b> is our design: the browser page Active session detected. <b>B, C, and E</b> are the SOTI Lockdown story. B is the screen already on the shared phone before anyone signs in. C is the badge, with password as a button. E confirms this phone is signed in. D is removed.</p>
    <h3>Worth taking from SOTI</h3>
    <ul class="left-out">
      <li>Lockdown with SSO, so the phone opens without a typed password</li>
      <li>NFC badge login for a shared device</li>
      <li>Logout that clears the handphone before the next officer</li>
      <li>Admin help when the device itself is stuck</li>
    </ul>
    <h3>Left with SOTI</h3>
    <ul class="left-out">
      <li>Fleet enrollment, OS updates, and printer management</li>
      <li>Remote viewing of the officer's screen</li>
      <li>Snap form builder (guidance and reports already cover that)</li>
      <li>Geofences that install or remove apps</li>
    </ul>
    <h3>Part 1 · Session screens</h3>
    <ul class="left-out">${items.map((i) => `<li><b>${i.letter}</b> · ${i.title}</li>`).join("")}</ul>
    <h3>Part 2 · Profile, settings, and lock</h3>
    <p class="intro" style="margin:2px 0 4px">The native drawer, settings toggles, language, and logout (variant B in the settings review) stay as drawn. Variants C, D, and E add auto-lock, device health, and console lock from SOTI.</p>
    <ul class="left-out">${settingsItems.map((i) => `<li><b>${i.letter}</b> · ${i.title}</li>`).join("")}</ul>
    <h3>Left with SOTI (settings)</h3>
    <ul class="left-out">
      <li>Remote wipe and remote screen viewing</li>
      <li>App install and OS update controls</li>
    </ul>
    <h3>Part 3 · One shift: Briefings, Today, Location, Guidance</h3>
    <p class="intro" style="margin:2px 0 4px">Officer Tan works the Gate 2 post phone. Each chapter combines the two SOTI ideas for that module into the screens she sees, built on the native layouts (purple header, teal card, status tags, mint location card, SOS). A panel shows what the admin sees at the same moment: the handphone and the step, never the officer's screen.</p>
    <ul class="left-out">${storyItems.map((i) => `<li><b>${i.letter}</b> · ${i.title}</li>`).join("")}</ul>
    <h3>Part 4 · Work module: Reports, Evidence, Patrols</h3>
    <p class="intro" style="margin:2px 0 4px">The native Work hub, Reports form, and picker sheet (variant B in the Work review) stay as drawn. Variants C, D, and E add asset scanning, an offline queue with sync status, and a live patrol route from SOTI.</p>
    <ul class="left-out">${workItems.map((i) => `<li><b>${i.letter}</b> · ${i.title}</li>`).join("")}</ul>
    <h3>Left with SOTI (Work)</h3>
    <ul class="left-out">
      <li>Snap form builder, since guidance and reports already cover forms</li>
      <li>Geofences that install or remove apps</li>
    </ul>
  </section>
  ${[...items, ...settingsItems, ...storyItems, ...workItems]
    .map(
      (i) => `<section class="item">
    <p class="meta" style="margin:0 0 6px">${i.part === "session" ? "Part 1 · Session screens" : i.part === "story" ? "Part 3 · One shift" : i.part === "work" ? "Part 4 · Work module" : "Part 2 · Profile, settings, and lock"}</p>
    <div class="row" ${i.wide ? 'style="flex-direction:column"' : ""}>
      <img src="${i.img}" ${i.wide ? 'style="width:100%"' : ""} />
      <div>
        <h2><span class="tag">${i.letter}</span>${i.title}</h2>
        <div class="soti"><b>${i.source ?? "From SOTI."}</b> ${i.soti}</div>
        ${i.merged ? `<p class="meta" style="margin:0">Combines: ${i.merged}</p>` : ""}
        <h3>Description</h3>
        <p style="margin:2px 0 0">${i.description}</p>
        ${i.admin ? `<h3>What the admin sees</h3><ul>${li(i.admin)}</ul>` : ""}
        <h3>Pros</h3><ul class="pro">${li(i.pros)}</ul>
        <h3>Cons</h3><ul class="con">${li(i.cons)}</ul>
      </div>
    </div>
  </section>`,
    )
    .join("")}
</body></html>`;

const rpt = await browser.newPage();
await rpt.setContent(html, { waitUntil: "load" });
const out = path.join(outDir, "mobile-auth-report.pdf");
await rpt.pdf({ path: out, format: "A4", printBackground: true });
const pubDir = path.join(root, "public", "reports");
fs.mkdirSync(pubDir, { recursive: true });
fs.copyFileSync(out, path.join(pubDir, "mobile-auth-report.pdf"));
await browser.close();
console.log("Wrote", out);
