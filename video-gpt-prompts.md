# Perimeter intrusion promo — GPT (Pro) workflow

Goal: ~40s promo, captions only, CTA at end. You record the real screens; GPT writes copy and optional b-roll/intro.

## Steps
1. Open `http://localhost:3000/record`. Follow shots 01-07 and screen-record each (OBS / Win+Alt+R). Record each shot as a separate clip.
2. Paste Prompt A into ChatGPT to tighten captions + CTA.
3. (Optional, Pro) Prompt B in Sora for a 5s intro/outro b-roll. Do not use AI for product UI.
4. Edit in CapCut/DaVinci: clips in order, captions from step 2, end card, 1080p export. Cut dead time and speed up waits 1.5-2x.
5. Prompt C for title, description, and a 15s cut-down for social.

## Prompt A — captions + CTA
```
You write on-screen captions for a 40-second silent B2B security product promo (Simpnify, incident command).
Shots: Detect, Verify, Accept, Respond, Record, Close+Review, CTA.
Rules: max 8 words per caption, active voice, no hype words, no claims beyond: instant alarm in queue, camera+map in one screen, one-click ownership, guided SOP/dispatch, evidence captured, closed with proof.
Give 3 caption options per shot and 3 CTA end-card options (headline + button text). Table format.
```

## Prompt B — Sora intro (optional)
```
5-second cinematic night shot of an industrial perimeter fence with a security camera, subtle red alert light pulsing, slow push-in, no people, no text, no logos, 16:9.
```

## Prompt C — publish copy
```
Given these final captions: <paste>. Write: 1) YouTube title (<60 chars), 2) 2-line description with CTA link placeholder, 3) a 15-second cut using only shots Detect, Respond, CTA with re-timed captions.
```
