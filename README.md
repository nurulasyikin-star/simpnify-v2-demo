# simpnify-v2-demo

Marketing website for **Simpnify** — industrial & critical infrastructure platform story (screenshot-based demos, no live API).

- **Stack:** Next.js + shadcn/ui + Tailwind
- **Design:** Dark teal professional theme (`#2998ae` / `#3db8cf`)
- **Content source:** `Simpnify-Industrial-Critical-Infrastructure` presentation deck

## Local dev

```bash
npm install
npm run dev
```

Open [http://localhost:3000/our-platform](http://localhost:3000/our-platform)

### Regenerate images from PDF

```bash
node scripts/render-pdf-pages.mjs "path/to/deck.pdf" public/platform/source
node scripts/crop-industrial-pdf.mjs
```

## Routes

| Path | Description |
| --- | --- |
| `/` | Redirects to `/our-platform` |
| `/our-platform` | Hub — challenge, value, workspaces, demos teaser, SOS, solutions, ROI |
| `/demos` | Demo hub (7 walkthroughs including Aura & communications) |
| `/demo` | Redirects to `/demo/sos` (legacy bookmark) |
| `/demo/sos`, `/demo/aura`, `/demo/communications`, … | Individual product demos |
| `/solutions` | Industrial scenario hub (4 use cases) |
| `/platform` | Platform module hub (6 workspaces) |
| `/why-simpnify` | Illustrative value model & ROI |
| `/pilot` | Pilot scope & acceptance criteria |
| `/reference` | Capability checklists, architecture, gallery |

## Remote

```bash
git remote add origin git@github.com:nurulasyikin-star/simpnify-v2-demo.git
git push -u origin main
```

## Branches and live demo

- **`dev`** / **`uat`** — development and review; no public deploy
- **`main`** — production; updates https://nurulasyikin-star.github.io/simpnify-v2-demo/our-platform/

See **[DEPLOY.md](./DEPLOY.md)** for the promote flow (`dev` → `uat` → `main`).
