---
name: soti
description: Studies soti.net for features that fit the Simpnify mobile app, builds A–E phone design variants with the design-variant-review skill on a /photos review page, and adds a design to mobile-auth-report-v2.pdf only after the user finalizes it. Use when the user invokes soti, asks what to take from SOTI, wants mobile session, live location, or lock screen variants, or wants the SOTI mobile report PDF.
disable-model-invocation: true
---

# SOTI → mobile variants → PDF report

Three steps. Stop after each unless the user asks for the next.

```
- [ ] 1. Pick SOTI ideas that fit
- [ ] 2. Build variants at /photos/mobile-auth
- [ ] 3. Finalize gate
      - Finalized → add the chosen letters to mobile-auth-report-v2.pdf
      - Not finalized → continue. Leave the v2 report unchanged.
```

## 1. Pick SOTI ideas

Browse https://soti.net/ (and its help pages) with the browser tools. Keep only what helps an officer on a shared handphone.

**Take:** Lockdown with SSO, NFC badge login (SOTI Identity), shared-device logout that clears the phone, console help for a stuck device (XSight, officer-facing slice only).

**Leave with SOTI:** fleet enrollment, OS/printer management, remote screen viewing, Snap form builder, geofences that install apps.

Input images: web mobile screens on the left, native "Ventionex Simplify" design on the right. Light and dark, and bottom-sheet popups with a green check or yellow info, stay.

**Color:** when the screen uses a soti.net feature, use teal `#1498b0` for buttons, links, and rings, and `#1aa6a6` for the S mark. Do not use purple `#5b4dff` on those screens. Match the field sign-in page (Secure field access, Sign in).

## 2. Build variants

Follow the `design-variant-review` skill. Do not replace production. Stop when the review page is up. The user picks a letter.

```
- [ ] Read the screenshot and the nearest existing phone variants
- [ ] A is that screenshot, unchanged. Do not restyle A into a SOTI screen
- [ ] B–E are one SOTI story, in order. Each step is a different moment, not a micro-tweak
- [ ] Variants file + review page under /photos, plus a link on /photos
- [ ] Each variant: title, tagline, scene, soti, pros[], cons[]
- [ ] Review page: jump links, sample scene line, preview frame, pros/cons
- [ ] Photos layout already hides the site footer. Do not add a second header or footer
- [ ] SOTI-feature screens use teal #1498b0 (S mark #1aa6a6), not purple #5b4dff. Light and dark, bottom sheet with a green check or yellow info
```

**Wording:** say handphone or phone. Never say handset.

| Screenshot | Files | Route |
|------------|--------|--------|
| Active session (“Active session detected”, Continue / Cancel) | `src/components/mobile-auth-variants.tsx`, `src/app/photos/mobile-auth/page.tsx` | `/photos/mobile-auth` |
| Live location (Today + My Live Location in the browser) | `src/components/mobile-location-variants.tsx`, `src/app/photos/mobile-location/page.tsx` | `/photos/mobile-location` |

`src/app/photos/page.tsx` links to both. Reuse `Phone`, `SimplifyMark`, and `Popup` from `mobile-auth-variants.tsx`.

**Active session, A, F, G, B, C.** D and E are out of this story. Shared handover (`shared-handover`) is a different moment. Do not put it back on this page.

1. A — Our design. The active-session screenshot. Leave it unchanged.
2. F — Continue on this device. SOTI shared-device logout: the other phone is signed out. Green check: this phone is the only session.
3. G — Cancel and keep the other session. The other phone stays signed in. The next screen is Welcome back (same page as B). Yellow info sheet.
4. B — The Welcome back sign-in page. **Tap your badge here** sits under Sign in. Forgot password sits on the password row.
5. C — The badge page, then the same page with Badge accepted, and with Badge not recognised.

**Live location, D, F, G, E.** B is removed.

1. D — The shift from yesterday’s Today chapter (`today-health` + `today-offline` on `/photos/mobile-story`). Left: XSight device health (battery, signal, last check-in, Gate 2). Right: signal drops, the note stays on the phone, SOS needs signal. The console sees the phone, not the screen.
2. F — Location from the report (`location` on `/photos/mobile-story`). Power saving in the zone, drag the pin, then the zone log. One check-in. The admin sees the point and the zone, never the screen.
3. G — Four screens. You are clear. Hold the phone to the post tag. The full step screen. The same step screen under the Help requested sheet.
4. E — End shift is on D’s Today screen. Confirm End shift and clear this phone on that same screen. Green check: the phone is waiting for the next badge.

Demo-mode rules apply: no type-check, lint, or dev-server restarts.

## 3. Finalize gate

After the variants are up, stop. The design is not in the report until the user finalizes it.

Report: [mobile-auth-report-v2.pdf](http://localhost:3000/simpnify-v2-demo/reports/mobile-auth-report-v2.pdf) · manifest (read-only): [mobile-auth-report-v2.json](http://localhost:3000/simpnify-v2-demo/reports/mobile-auth-report-v2.json). These live under `/reports/`, not `/photos/reports/`.

`reports/mobile-auth-report.pdf` is the older full review. Do not add new letters there. New finalized letters go only in v2.

- **Finalized** (the user says finalize, final, add this, or ship this letter): append that letter’s id to the `finalized` array in `reports/mobile-auth-v2.json`, keeping A, F, G, B, C order. Then run:

```bash
node scripts/render-mobile-auth-report-v2.mjs
```

That rewrites `reports/mobile-auth-report-v2.pdf` and copies it to `public/reports/mobile-auth-report-v2.pdf`. Only ids in `finalized` are pages. An empty list is a cover that says nothing is finalized yet.

- **Not finalized** (continue, not yet, next, or a change request): continue the review. Revise the variants. Do not edit `reports/mobile-auth-v2.json` and do not run the v2 script.

Session pages the script can add, in this order:

| Letter | id | Page |
|--------|----|------|
| A | `web-lock` | Our design. The screenshot image. Label “Our design.” |
| F | `continue-here` | Continue on this device. Other phone signed out. |
| G | `keep-other` | Cancel. Next screen is Welcome back. |
| B | `native-lock` | Welcome back. Tap your badge here under Sign in. |
| C | `badge-sso` | Badge page, plus accepted and not recognised. |

E (`session-takeover`) is removed. Do not put it back.

Live location pages, after the session letters:

| Letter | id | Page |
|--------|----|------|
| A | `web-location` | Our design. Today and My Live Location in the browser. |
| D | `live-fix` | Today on signal, End shift on that screen, then the offline phone. |
| F | `zone-checkin` | Power saving, drag the pin, zone log. |
| G | `guidance-help` | You are clear, the tag, the step screen, then Help requested. |
| E | `shift-clear` | Confirm End shift on Today, then the phone is clear. |

Ids in `finalized` must match `mobile-auth-variants.tsx`. Say handphone or phone in that copy.

Live location is in the same v2 report, after the session letters. Its ids are `web-location`, `live-fix`, `zone-checkin`, `guidance-help`, and `shift-clear` on `/photos/mobile-location`. The script screenshots `section#<id> > div:nth-child(2)` so every phone on that letter is in the picture.

`scripts/render-mobile-auth-report.mjs` still builds the older full review at `reports/mobile-auth-report.pdf`. Leave it alone unless the user asks for that file.

### Gotchas

- Dev server must already be running on port 3000 before a finalized letter is screenshotted. The app uses `basePath` `/simpnify-v2-demo`, so the page URL is `http://localhost:3000/simpnify-v2-demo/photos/mobile-auth/` (trailing slash). Without the base path it returns 404. An empty `finalized` list does not open that page.
- Playwright's bundled browser is not installed. The script launches installed Chrome, then Edge.
- Phone element selector is `section#<id> [data-shot]`.
- Write the script before running it. Do not run both in the same parallel tool batch.
- The v2 script copies the PDF to `public/reports/mobile-auth-report-v2.pdf`, which is what `http://localhost:3000/simpnify-v2-demo/reports/mobile-auth-report-v2.pdf` serves.
