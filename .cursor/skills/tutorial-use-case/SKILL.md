---
name: tutorial-use-case
description: Extracts and formats Simpnify Help Center steps to record a perimeter-intrusion demo (Detect → Verify → Respond → Record). Use when the user invokes tutorial-use-case, asks to record perimeter intrusion, film a use-case video, shot list from Help, Incident Command sample pack exercise, or links welcome-to-simpnify / Operations & response workflows.
---

# Tutorial use case — perimeter intrusion recording

## When to apply

- User wants a **shot list** or **recording steps** for perimeter intrusion (marketing video, GIF, walkthrough).
- User points at **Help Center** (`/help/article/...`) — especially *Welcome to Simpnify* (overview only; real steps live under **Operations & response**).
- Local Help is on a private host (e.g. `https://192.168.0.26:7100/help/...`). Use **browser tools** to read articles; do not rely on server-side fetch to private IPs.

Help does **not** publish an article titled “perimeter intrusion”. The flow is **Incident Command sample pack** (trigger) + **Incidents** workspace (Accept → Act → Record → Close), aligned with marketing **Detect → Verify → Respond → Record**.

## Output format

Return two sections unless the user asks for one only:

1. **Before you record (off camera)** — prep checklist.
2. **On-camera recording steps** — table: Shot | What to film | What to click.

Add **What not to film as “done”** when relevant.

Use the deployment’s Help base URL when known; otherwise use path-only links (`/help/article/...`).

---

## Before you record (off camera)

From [Incident Command sample pack basics](/help/article/incident-command-samples-basics):

1. Sign in as **system superadmin**.
2. Review **Assurance → Deployment Readiness** (pack readiness before exercise).
3. **Install / validate / repair** the Incident Command Samples pack; confirm contracts and dependencies.
4. Use **Run** on the **perimeter webhook** scenario. The **alarm policy** creates the incident — the webhook does not own downstream flows.
5. Do **not** use the webhook to impersonate **Mobile SOS** or **manual incident report** — those require real authenticated human origins.

Optional: [Demo application guide](/help/article/demo-page-guide) — `/demo/` is the production-shaped Web client; sample packs are labelled commissioning resources.

---

## On-camera recording steps

Map marketing beats to Help’s operator sequence:

| Marketing | Help (Incidents) |
|-----------|------------------|
| Detect | Signal in queue → **Accept** |
| Verify | Map, Digital Twin, camera context (**Act** / assess) |
| Respond | SOP + **Guided Response** dispatch (**Act** / execute) |
| Record | **Record** outcome + evidence → **Close** → **Review history** |

| Shot | What to film | What to click |
|------|----------------|---------------|
| **01 Detect** | Alarm arrives in the queue | **Operations → Incidents**. Perimeter event in **New**. Show alarm name, location, threat/priority on the card. |
| **02 Verify** | Camera + map in one workspace | Select incident. Middle: **map / Digital Twin**. Right: handling panel (incident number, alarm, location). Optional: **Camera Wall** live tile for fence camera. |
| **03 Accept** | Ownership claimed | **Accept** — ownership + acknowledge **this** alarm cycle. Card moves toward **Mine**. |
| **04 Act** | SOP / guided response | Complete bound **SOP** steps. Dispatch published **Guided Response**. Optional: **Response Operations** for assignees. |
| **05 Record** | Evidence on the incident thread | Observations, decisions, attachments. **Record outcome**. Optional: **Ask AURA** → insert draft into report when enabled. |
| **06 Close** | Controlled closure | Readiness checklist (`?` per requirement). **Close** only when steps, evidence, and policy allow (incl. source restore/reset if configured). |
| **07 Review** | Proof for supervisor / next shift | **History**: report, timeline, evidence, outcome. |

---

## What not to film as “done”

- **Restored** alarm still needs acknowledgement; acknowledged **active** source stays visible.
- **Request equipment reset** ≠ proof of physical reset; incident can stay blocked until equipment confirmation.
- Do not **close** on active or unknown source, silence, parked incident, or transport success alone.
- **Command operations → Practice** does not prove live lockdown or change live records.

---

## Primary Help articles

| Topic | Slug |
|-------|------|
| Sample pack install / Run webhook | `incident-command-samples-basics` |
| Accept, Act, Record, Close | `incident-response-basics` |
| Workspace journey | `alarm-incidents-basics` |
| Policy-led escalation | `alarm-escalation-procedure` |
| Guided Response dispatch | `guided-responses-basics` |
| Operations entry | `operations-basics` |
| Daily shell pattern | `web-console-manual` |

Full URL pattern: `{origin}/help/article/{slug}`

---

## Repo alignment (simpnify-v2-demo)

Marketing copy for the same story lives in `src/lib/platform/solutions.ts` (steps: Detect, Verify, Respond, Record) and `src/lib/platform/use-case-videos.ts` (`id: "perimeter"`). Use this skill for **live product recording**; use repo files for **site copy / YouTube embeds**, not as a substitute for Help workflows.

## Agent notes

- *Welcome to Simpnify* (`welcome-to-simpnify`): onboarding only — direct users to Operations & response articles above.
- If the user only attached Welcome URL, still deliver the full perimeter recording checklist from this skill.
- Permissions: missing pages/actions → role and Page Access, not “broken product.”
