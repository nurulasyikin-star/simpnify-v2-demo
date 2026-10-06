/**
 * Builds reports/mobile-auth-report-v2.pdf from designs listed in
 * reports/mobile-auth-v2.json. An empty list writes a cover only.
 * Run this only after a design is finalized.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "reports");
const imgDir = path.join(outDir, "mobile-auth-v2");
const manifestPath = path.join(outDir, "mobile-auth-v2.json");
fs.mkdirSync(imgDir, { recursive: true });

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const catalog = [
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
    id: "continue-here",
    letter: "F",
    title: "Continue on this device",
    soti: "SOTI shared-device logout. One person is signed in. Continuing here ends the other phone and clears it.",
    description:
      "The officer pressed Continue on A. A green check says the other phone was signed out. Inbox, live location, and SOS now run on this phone.",
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
    letter: "G",
    title: "Cancel, keep the other session",
    soti: "SOTI’s login profile stays up until someone signs in. Cancel does not open the app. The next screen is Welcome back.",
    description:
      "The officer pressed Cancel on A. A yellow info sheet says the other phone stays signed in. Under the sheet is Welcome back, the same sign-in page as B.",
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

catalog.forEach((item) => {
  item.route = "mobile-auth";
  item.part = "Session";
  item.selector = `section#${item.id} [data-shot]`;
});

const location = [
  {
    id: "web-location",
    letter: "A",
    title: "Our design. Today and live location",
    source: "Our design.",
    soti: "The two browser screens from the screenshot. Kept as the reference beside the SOTI flow.",
    description:
      "The officer is signed in on the phone browser. Today and My Live Location sit under the address bar and Install. Foreground GPS runs every 10 seconds while this page stays open. Status is Active, accuracy 5 m.",
    pros: [
      "Same words as the live page: every 10 seconds, Active, 5 m",
      "Says location and SOS run only while this officer is signed in",
      "Coordinator tracking is a separate card, and it is empty",
    ],
    cons: [
      "The address bar and Install sit above the shift",
      "The fix is tied to this browser page staying open",
      "The next officer can inherit the session if the phone is not cleared",
    ],
  },
  {
    id: "live-fix",
    letter: "D",
    title: "Step 1. Shift is open",
    soti: "SOTI XSight device health: battery, signal, and last check-in, shown to the officer. The console sees the phone, not this screen. When the signal drops, the note stays on the phone and sends later. SOS needs signal.",
    description:
      "After the badge, Today shows the phone is fit for patrol: Active, sync 10:04, battery, 5G, and inside Gate 2. End shift sits on this same Today screen. When the signal drops, the note stays on the phone, location pauses at the last position, and SOS needs signal.",
    pros: [
      "Battery, signal, and sync are on the shift, not on a second page",
      "Inside Gate 2 is the location, instead of a raw coordinate",
      "The offline phone says the note is saved and that SOS needs signal",
    ],
    cons: [
      "Two states on one step, so the reader has to take them as before and after",
      "The console still cannot see the patrol note, only that the phone went offline",
    ],
  },
  {
    id: "zone-checkin",
    letter: "F",
    title: "Step 2. Still in the zone",
    soti: "SOTI locate sends one device check-in. A coarse fix can be dragged to the exact spot before it is sent. The admin sees the point and the zone, never the screen.",
    description:
      "Battery is low, so updates slow down while the officer is still in the zone. Update Location Now opens a map. The officer drags the pin, then sends that one check-in. The zone log shows the move from Gate 2 into the loading bay.",
    pros: [
      "The zone is named, not only a coordinate",
      "A coarse GPS fix can be corrected before it is sent",
      "The power-saving rule is written on the screen",
    ],
    cons: [
      "Needs zones drawn for the site",
      "A weak indoor fix can flip the zone",
    ],
  },
  {
    id: "guidance-help",
    letter: "G",
    title: "Step 3. Tap the tag",
    soti: "SOTI scanning with NFC proves the officer is at the post. XSight-style visibility is limited to the step. Nobody views the screen.",
    description:
      "Guidance starts on the live page: you are clear, and there is no assignment. The officer holds the phone to the post tag. The step screen shows Perimeter check, step 3 of 5, and I need help with this step. The same screen then opens Help requested. Admin Rao gets the step and the place, not a view of the screen.",
    pros: [
      "Presence is proved without typing",
      "The help request already carries the step and the place",
      "The screen says the admin is following the step, not the screen",
    ],
    cons: [
      "Each post needs a tag",
      "The wording has to stay clear so the officer does not feel watched",
    ],
  },
  {
    id: "shift-clear",
    letter: "E",
    title: "Step 4. Phone is clear",
    soti: "SOTI shared-device logout. The officer chooses the button. Location and SOS stop, then this phone is ready for the next badge.",
    description:
      "End shift already sits on Today. The officer confirms what stops: live location, SOS standby, and the saved patrol note after it sends. A green check says this phone is clear. The next officer taps their badge.",
    pros: [
      "The button to press is on the shift, not hidden in a menu",
      "The confirm sheet lists location, SOS, and the saved note before anything clears",
      "The last screen is the waiting phone, so the next officer knows to tap a badge",
    ],
    cons: [
      "Two presses: End shift on Today, then confirm",
      "Leaving the phone locked, without End shift, does not clear it",
    ],
  },
];

location.forEach((item) => {
  item.route = "mobile-location";
  item.part = "Live location";
  item.wide = true;
  item.selector = `section#${item.id} > div:nth-child(2)`;
});

catalog.push(...location);

const work = [
  {
    id: "web-work",
    letter: "A",
    title: "Our design. Work and Emergency accountability",
    source: "Our design.",
    soti: "The Work list and the Emergency accountability screens from the screenshots. Kept as the reference beside the SOTI flow.",
    description:
      "The officer opens Work in the phone browser. Emergency accountability is the first tool. The form has Site, View, Evacuation sessions, Attestation / reason, and Evacuation name. View is a list: Incident Commander or Logistic Manager. Declare evacuation is one press. Import manual roster stays on the page.",
    pros: [
      "Same tools as the live Work page, with Emergency accountability first",
      "Same words on the form: declare an evacuation, account for people, record observations",
      "Declare evacuation is a single press",
    ],
    cons: [
      "The address bar and Install sit above the incident",
      "Anyone holding the shared phone can open View and become Incident Commander",
      "The next officer can inherit site, roster, and observations if the phone is not cleared",
    ],
  },
  {
    id: "role-badge",
    letter: "B",
    title: "Step 1. Badge sets the role",
    soti: "SOTI Identity NFC sign-in, with SSO. Shared Device maps that user to the matching lockdown group. Incident Commander or Logistic Manager comes from the badge, not from View.",
    description:
      "The shared phone stays on Simpnify. Waiting: no officer signed in, no evacuation on this phone. The officer holds their badge. A green check says Incident Commander. There is no list to pick from.",
    pros: [
      "The role is who is holding the phone, not who opened a list",
      "Logistic Manager cannot become Incident Commander by tapping View",
      "If the badge misses, the phone stays waiting",
    ],
    cons: [
      "Needs a badge and NFC on the phone",
      "A missing or swapped badge still needs a password fallback",
    ],
  },
  {
    id: "work-lock",
    letter: "C",
    title: "Step 2. Work stays on Simpnify",
    soti: "SOTI Lockdown with SSO. The working profile is the officer’s tools. The phone cannot leave Simpnify. Role comes from the badge, not from a list on this screen.",
    description:
      "After the badge, Work is the only home. Emergency accountability is the first tool. Guidance, Reports, Briefings, Patrols, and Lone-worker Safety stay on the list. Administration stays on the web console.",
    pros: [
      "The six field tools are the home screen, not a browser page",
      "Lone-worker SOS stays on the same list",
      "Administration never appears on the phone",
    ],
    cons: [
      "Hiding the phone home button still belongs to device management",
      "A second officer cannot open a different role on this phone until it is cleared",
    ],
  },
  {
    id: "evac-lock",
    letter: "D",
    title: "Step 3. Emergency accountability",
    soti: "SOTI Lockdown. During an evacuation the officer cannot leave Simpnify. View comes from the badge. Time and battery stay in the status bar.",
    description:
      "The form from the screenshot, with no browser chrome. View is locked as Incident Commander. Site, sessions, attestation, evacuation name, and import roster stay. Declare evacuation, then this phone stays here.",
    pros: [
      "No Chrome, URL, or Install above the incident",
      "View is a locked chip from the badge, not Incident Commander or Logistic Manager",
      "The phone stays on this screen after Declare evacuation",
    ],
    cons: [
      "Logistic Manager cannot jump in on this same phone until it is cleared",
      "Hiding the phone home button still belongs to device management",
    ],
  },
  {
    id: "evac-health",
    letter: "E",
    title: "Step 4. Phone is struggling",
    soti: "SOTI XSight device health: battery, signal, and last check-in, shown to the officer. The console sees the phone, not this screen. Remote viewing stays off.",
    description:
      "Left, the phone is fit for the incident: 5G, battery, last check-in. Right, Gate 2 drops the signal. Observations stay on the phone and send later. The console sees this device, not the names on this screen.",
    pros: [
      "Battery, signal, and last check-in sit on the incident, not on a second page",
      "Unaccounted people are not lost when the signal drops",
      "The screen says the console follows the phone, not the names",
    ],
    cons: [
      "Two states on one step, so the reader has to take them as before and after",
      "The console still cannot see who is missing, only that the phone went offline",
    ],
  },
  {
    id: "evac-clear",
    letter: "F",
    title: "Step 5. Phone is clear",
    soti: "SOTI shared-device logout that clears app data. Site, roster, observations, and the Incident Commander view belong to this officer. Logout wipes them.",
    description:
      "On the incident, press Clear this phone. Confirm what leaves this phone: site, roster, observations, and the role. A green check says this phone is clear. The next officer taps their badge.",
    pros: [
      "The button to press is on the incident, not hidden in a menu",
      "The confirm sheet lists site, roster, observations, and the role before anything clears",
      "The last screen is waiting, so the next officer knows to tap a badge",
    ],
    cons: [
      "Three screens for one logout",
      "Leaving the phone locked, without Clear this phone, does not clear it",
    ],
  },
];

work.forEach((item) => {
  item.route = "mobile-work";
  item.part = "Work";
  item.wide = true;
  item.selector = `section#${item.id} [data-shot]`;
});

catalog.push(...work);

const safety = [
  {
    id: "web-watch",
    letter: "A",
    title: "Our design. Lone-worker safety",
    source: "Our design.",
    soti: "The browser screens from the screenshot. Kept as the reference beside the SOTI flow.",
    description:
      "The officer opens Lone-worker Safety in the phone browser. Check-in interval is 30 minutes, with 15 minutes, 1 hour, and 2 hours in the picker. Start safety watch begins the deadline. On the live watch, check in by Oct 2, 2026, 4:26 AM, then I am safe or End watch. The server deadline stays in force when the browser is backgrounded or offline.",
    pros: [
      "The server deadline stays in force when the browser is backgrounded or offline",
      "I am safe and End watch sit on the live watch",
      "The interval is visible before the watch starts",
    ],
    cons: [
      "The watch can start before the phone knows who is holding it",
      "End watch does not say the phone is clear for the next officer",
      "It is still a browser page, so the officer can leave it",
    ],
  },
  {
    id: "badge-watch",
    letter: "B",
    title: "Step 1. Badge opens the watch",
    soti: "SOTI Identity NFC sign-in, on the lockdown pre-authentication step for a shared Android phone. The tap says who is holding the phone. A password stays available when the badge misses. The safety watch does not start until that sign-in.",
    description:
      "The shared phone stays on Simpnify. Waiting: no officer signed in, no check-in on this phone. The officer holds their badge. A green check says the badge is accepted. Check-in is every 30 minutes. The server owns the deadline.",
    pros: [
      "The watch belongs to the officer who tapped the badge",
      "The phone is waiting, with no previous deadline on screen",
      "Password remains when the badge misses",
    ],
    cons: [
      "Needs a badge and NFC on the phone",
      "The interval is confirmed after the badge, so start is one more step",
    ],
  },
  {
    id: "watch-lock",
    letter: "C",
    title: "Step 2. The watch stays on Simpnify",
    soti: "SOTI ONE Lockdown keeps this phone on Simpnify. Home screen and other apps stay off. The check-in deadline stays Simpnify’s. I am safe sends to that server, including when the phone is in a pocket.",
    description:
      "The watch is running. Check in by Oct 2, 2026, 4:26 AM. I am safe and End watch sit on the watch. A green check says the server has this check-in. The phone stays on Simpnify.",
    pros: [
      "The officer cannot wander off the watch into another app",
      "The deadline and the two buttons stay on one screen",
      "The green sheet says the server has the check-in",
    ],
    cons: [
      "Help and Support stay inside Simpnify",
      "Another app is not available beside SOS",
    ],
  },
  {
    id: "watch-late",
    letter: "D",
    title: "Step 3. The phone is late",
    soti: "SOTI XSight device health, shown to the officer: battery, signal, and when this phone last reached the console. Out of contact is a lockdown event. The console sees this phone. Remote viewing stays off. The safety deadline stays on the Simpnify server.",
    description:
      "Left, the phone is fit for the watch: 5G, battery 68%, console check-in 4:20 AM, deadline still 4:26 AM. Right, the signal drops. I am safe stays on the phone. A yellow sheet says the deadline is still 4:26 AM, the console sees this phone, and SOS needs signal.",
    pros: [
      "The officer sees battery, signal, and the console check-in",
      "A lost signal leaves the deadline and I am safe on the phone",
      "Help can tell the phone is late without opening the screen",
    ],
    cons: [
      "I am safe cannot reach the server until the signal returns",
      "SOS needs signal",
    ],
  },
  {
    id: "watch-clear",
    letter: "E",
    title: "Step 4. End watch, phone is clear",
    soti: "SOTI shared-device logout clears this officer’s session on the phone. The watch, the deadline, and the last I am safe leave with that logout. If the officer forgets End watch, the next badge can end the session from the unlock screen. The watch still clears.",
    description:
      "On the watch, press End watch and clear this phone. Confirm what leaves: this officer, the watch, the 4:26 AM deadline, and the last I am safe. A green check says this phone is clear. The next officer taps their badge.",
    pros: [
      "The confirm sheet lists the officer, the watch, the deadline, and I am safe",
      "The last screen is the waiting badge, so the next officer knows what to do",
      "A forgotten End watch can still be ended by the next badge",
    ],
    cons: [
      "Three screens for one logout",
      "Leaving the phone locked, without End watch or a new badge, leaves the watch running",
    ],
  },
];

safety.forEach((item) => {
  item.route = "mobile-safety";
  item.part = "Lone-worker safety";
  item.wide = true;
  item.selector = `section#${item.id} [data-shot]`;
});

catalog.push(...safety);

const handover = [
  {
    id: "web-handover",
    letter: "A",
    title: "Our design. Shift Handover",
    source: "Our design.",
    soti: "The Shift Handover screens from the screenshot. Kept as the reference beside the SOTI flow.",
    description:
      "The officer opens Shift Handover in the phone browser. Recipient is Personal end-of-shift note, then a list of staff. Handover content is a text box. An empty note shows the browser warning, Please fill out this field. Send handover stays on the page.",
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
    letter: "B",
    title: "Step 1. The note is for the next badge",
    soti: "SOTI Lockdown with SSO, and SOTI Identity on a shared phone. The working profile is this handover. The next officer is whoever taps their badge. Staff names stay on the web console.",
    description:
      "Shift Handover stays on Simpnify. The recipient row is Next officer on this phone. A yellow sheet says the staff directory stays on the console.",
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
    letter: "C",
    title: "Step 2. Write the note first",
    soti: "The browser warning on A becomes a sheet on the phone. Send handover stays off until the note is written.",
    description:
      "An empty handover opens a yellow sheet: Write the handover first. Send stays off until the note has the post, the keys, and anything still open. The written note is what the next badge will read.",
    pros: [
      "The officer sees why Send is off",
      "The written note is what the next badge will read",
    ],
    cons: ["A short note can still be sent"],
  },
  {
    id: "note-stays",
    letter: "D",
    title: "Step 3. The note stays if the signal drops",
    soti: "SOTI XSight device health: battery, signal, and last check-in, shown to the officer. The console sees the phone, not this screen. Remote viewing stays off.",
    description:
      "At 16:40 the phone is fit to send: 5G, battery, last check-in. At 16:47 Gate 2 drops the signal. The note stays on the phone and sends when signal returns. The console sees this phone, not the note.",
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
    letter: "E",
    title: "Step 4. Send, clear, then the next badge",
    soti: "SOTI shared-device logout that clears the phone, then SOTI Identity. The note, live location, and SOS leave with this officer. The next badge is the only way to open the note.",
    description:
      "Confirm Send and clear this phone. The note, live location, and SOS leave this phone. A green check says this phone is clear. The next badge opens the note. A badge that misses stays on the tap screen, and the note stays sealed.",
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

handover.forEach((item) => {
  item.route = "mobile-handover";
  item.part = "Shift handover";
  item.wide = true;
  item.selector = `section#${item.id} [data-shot]`;
});

catalog.push(...handover);

const inbox = [
  {
    id: "web-supervisor",
    letter: "A",
    title: "Our design. Mobile Supervisor",
    source: "Our design.",
    soti: "The Mobile Supervisor screen from the screenshot. Kept as the reference beside the SOTI flow.",
    description:
      "The supervisor opens Mobile Supervisor in the phone browser. Each phone is named, with an OK mark. An operational message sits on the card, and Send to Mobile inbox is the action. The side card is the selected message for one phone.",
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
    letter: "B",
    title: "Step 1. It is in the inbox",
    soti: "SOTI MobiControl Send Message, delivered to the agent on the phone. SMS and the phone’s own notification stay with SOTI. The words stay in this inbox until the officer answers.",
    description:
      "The officer is signed in. Inbox shows one new operational message: Gate 2 is closed. Use Gate 3. It names Mobile Supervisor and this phone. The message stays in the app. It is not a notification on the home screen.",
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
    letter: "C",
    title: "Step 2. The officer answers",
    soti: "SOTI message types. Information ends on OK. Question records yes or no. The sheet repeats the answer that leaves the phone. The supervisor sees that answer, not the screen.",
    description:
      "The same inbox, two results. Information is a green check: Received at 14:22. A question, Can you cover Gate 3, is a yellow sheet: You answered no. Both stay on this phone.",
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
    letter: "D",
    title: "Step 3. It waited for signal",
    soti: "SOTI can queue a message for an offline device. It arrives when the phone reconnects, still in the inbox, still not on the home screen.",
    description:
      "The phone was out of signal. A yellow sheet says this message waited, and it is in the inbox now. The same operational message is there: Gate 2 is closed. Use Gate 3. It did not open the screen.",
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
    letter: "E",
    title: "Step 4. End shift clears the inbox",
    soti: "SOTI shared-device logout. The inbox, live location, and SOS clear with the session. The phone waits for the next badge.",
    description:
      "The officer presses End shift and clear this phone. A green check says the operational message, live location, and SOS are off this phone. The inbox is empty. It is waiting for the next badge.",
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

inbox.forEach((item) => {
  item.route = "mobile-inbox";
  item.part = "Inbox";
  item.wide = true;
  item.selector = `section#${item.id} [data-shot]`;
});

catalog.push(...inbox);

const assets = [
  {
    id: "web-assets",
    letter: "A",
    title: "Our design. Equipment, tasks, and Field Assistant",
    source: "Our design.",
    soti: "My Equipment, Field Asset Tasks, and Field Assistant from the screenshots. Kept as the reference beside the SOTI flow.",
    description:
      "Three browser screens. My Equipment has no kit. Field Asset Tasks has no assigned task and no completed work. Field Assistant has no search yet, then an answer from an approved source.",
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
    letter: "B",
    title: "Step 1. This badge, this kit",
    soti: "SOTI Lockdown replaces the phone home with this app, and the home can change with the role. SOTI Identity NFC sign-in is the badge. The console still assigns the kit. Enrollment of the phone itself stays with SOTI.",
    description:
      "My Equipment shows Radio CH-4, Gate 2 keys, and a torch. A green check says this kit is on the badge, and it leaves with that badge. The device fleet is not on this phone.",
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
    letter: "C",
    title: "Step 2. Hold the phone to the label",
    soti: "SOTI Lockdown can use the phone as a capture tool for an NFC or QR scan. That scan proves this asset. SOTI Snap's form builder stays out. The marks and the evidence log stay in Simpnify.",
    description:
      "The task is Inspect Pump 4, one active task at Gate 2. The officer holds the phone to the label fixed on the pump. The evidence log stays in Simpnify.",
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
    letter: "D",
    title: "Step 3. The label answers",
    soti: "The scan is the proof. A matching label records the asset and the time. SOTI XSight Remote Control, which can open this screen, stays off.",
    description:
      "A green check says Pump 4 is confirmed at 14:22. The officer can start the evidence log in Simpnify. The console sees the asset and the time, not this screen.",
    pros: [
      "The officer sees what was recorded: the asset and the time",
      "The line says the console does not see the screen",
    ],
    cons: ["A shaky scan can look like the wrong asset, and this step only shows the match"],
  },
  {
    id: "phone-clear",
    letter: "E",
    title: "Step 4. Clear this phone",
    soti: "SOTI shared-device logout can clear user data when the officer leaves. The kit, the Pump 4 task, and this Field Assistant search belong to this badge. Logout wipes them. The approved sources stay Simpnify's.",
    description:
      "Field Assistant still shows the last search, Pump 4 label was not recognised. Press Clear this phone. Confirm the kit, the Pump 4 task, and this search. A green check says the phone is waiting for the next badge.",
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

assets.forEach((item) => {
  item.route = "mobile-assets";
  item.part = "Field assets";
  item.wide = true;
  item.selector = `section#${item.id} [data-shot]`;
});

catalog.push(...assets);

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const wanted = Array.isArray(manifest.finalized) ? manifest.finalized : [];
const items = wanted
  .map((id) => catalog.find((item) => item.id === id))
  .filter(Boolean);
const unknown = wanted.filter((id) => !catalog.some((item) => item.id === id));
if (unknown.length) {
  console.warn("Skipped unknown ids:", unknown.join(", "));
}

let browser;
async function launch() {
  for (const channel of ["chrome", "msedge"]) {
    try {
      return await chromium.launch({ channel });
    } catch {}
  }
  throw new Error("No Chrome or Edge found");
}

if (items.length) {
  browser = await launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 1400 },
    deviceScaleFactor: 2,
  });
  const routes = [...new Set(items.map((item) => item.route))];
  for (const route of routes) {
    await page.setViewportSize({
      width:
        route === "mobile-auth" ? 1280 : route === "mobile-safety" || route === "mobile-assets" ? 2000 : 1440,
      height: 1600,
    });
    await page.goto(`${BASE}/simpnify-v2-demo/photos/${route}/`, {
      waitUntil: "load",
    });
    await page.addStyleTag({ content: "header.fixed{display:none!important}" });
    await page.waitForTimeout(1500);
    for (const item of items.filter((entry) => entry.route === route)) {
      const phone = page.locator(item.selector).first();
      await phone.scrollIntoViewIfNeeded();
      const file = path.join(imgDir, `${item.letter}-${item.id}.png`);
      await phone.screenshot({ path: file });
      item.img = "data:image/png;base64," + fs.readFileSync(file).toString("base64");
    }
  }
  await page.close();
}

const li = (arr) => arr.map((text) => `<li>${text}</li>`).join("");
function letterList(group) {
  return `<ul class="left-out">${group.map((item) => `<li><b>${item.letter}</b> · ${item.title}</li>`).join("")}</ul>`;
}
const sessionItems = items.filter((item) => item.part === "Session");
const locationItems = items.filter((item) => item.part === "Live location");
const workItems = items.filter((item) => item.part === "Work");
const safetyItems = items.filter((item) => item.part === "Lone-worker safety");
const handoverItems = items.filter((item) => item.part === "Shift handover");
const inboxItems = items.filter((item) => item.part === "Inbox");
const assetsItems = items.filter((item) => item.part === "Field assets");
const list =
  items.length > 0
    ? `${sessionItems.length ? `<h3>Session</h3>${letterList(sessionItems)}` : ""}${locationItems.length ? `<h3>Live location</h3>${letterList(locationItems)}` : ""}${workItems.length ? `<h3>Work</h3>${letterList(workItems)}` : ""}${safetyItems.length ? `<h3>Lone-worker safety</h3>${letterList(safetyItems)}` : ""}${handoverItems.length ? `<h3>Shift handover</h3>${letterList(handoverItems)}` : ""}${inboxItems.length ? `<h3>Inbox</h3>${letterList(inboxItems)}` : ""}${assetsItems.length ? `<h3>Field assets</h3>${letterList(assetsItems)}` : ""}`
    : `<p class="intro">No design is in this report yet. The review can continue. A letter is added here only after you finalize it.</p>`;

const pages = items
  .map(
    (item) => `<section class="item">
    <p class="meta" style="margin:0 0 6px">${item.part ?? "Session"}</p>
    <div class="row" ${item.wide ? 'style="flex-direction:column"' : ""}>
      <img src="${item.img}" ${item.wide ? 'style="width:100%"' : ""} />
      <div>
        <h2><span class="tag" ${item.part === "Session" ? "" : 'style="background:#e7f6f8;color:#0f6e74"'}>${item.letter}</span>${item.title}</h2>
        <div class="soti"><b>${item.source ?? "From SOTI."}</b> ${item.soti}</div>
        <h3>Description</h3>
        <p style="margin:2px 0 0">${item.description}</p>
        <h3>Pros</h3><ul class="pro">${li(item.pros)}</ul>
        <h3>Cons</h3><ul class="con">${li(item.cons)}</ul>
      </div>
    </div>
  </section>`,
  )
  .join("");

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
    <h1>Finalized mobile screens</h1>
    <div class="meta">2 October 2026 · mobile-auth-report-v2 · Only designs you have finalized</div>
    <p class="intro">This report is the finalized set. Session letters stay as finalized. Live location is the shared-phone shift. Work is Emergency accountability on that same phone: the badge sets the role, Work stays on Simpnify, the form, the stuck phone, then Clear this phone. Lone-worker safety is the check-in watch on that phone: the badge opens it, the watch stays on Simpnify, the late phone, then End watch and clear this phone. Shift handover passes the post on that phone: the next badge is the recipient, the note is written first, the note stays if the signal drops, then Send and clear this phone. Inbox is the operational message on that phone: it opens in Inbox, the officer answers, it can wait for signal, then End shift clears this phone. Field assets is the kit on that phone: the badge opens the kit, the officer holds the phone to the asset label, the label confirms Pump 4, then Clear this phone.</p>
    <h3>In this report</h3>
    ${list}
  </section>
  ${pages}
</body></html>`;

browser ??= await launch();
const rpt = await browser.newPage();
await rpt.setContent(html, { waitUntil: "load" });
const out = path.join(outDir, "mobile-auth-report-v2.pdf");
await rpt.pdf({ path: out, format: "A4", printBackground: true });
const pubDir = path.join(root, "public", "reports");
fs.mkdirSync(pubDir, { recursive: true });
fs.copyFileSync(out, path.join(pubDir, "mobile-auth-report-v2.pdf"));
fs.copyFileSync(manifestPath, path.join(pubDir, "mobile-auth-report-v2.json"));
const pubAliasDir = path.join(root, "public", "report");
fs.mkdirSync(pubAliasDir, { recursive: true });
fs.copyFileSync(out, path.join(pubAliasDir, "mobile-auth-report-v2.pdf"));
fs.copyFileSync(manifestPath, path.join(pubAliasDir, "mobile-auth-report-v2.json"));
await browser.close();
console.log("Wrote", out, "finalized:", items.map((item) => item.letter).join(", ") || "(none)");
