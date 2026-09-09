# simpnify-v2-demo

Marketing website **demo** for Simpnify (review only — no API).

- **Stack:** Next.js + shadcn/ui + Tailwind
- **Version switch:** Header → **Version** dropdown → Version 1 / Version 2 (`?v=1` / `?v=2`)

## Local dev

```bash
npm install
npm run dev
```

Open [http://localhost:3000/our-platform?v=2](http://localhost:3000/our-platform?v=2)

## Deploy preview

- **Vercel (recommended):** Import this GitHub repo → automatic preview on every push/PR
- **GitHub Pages:** Requires `output: 'export'` in `next.config.ts` (not configured yet)

## Routes

| Path | Description |
| --- | --- |
| `/` | Redirects to `/our-platform?v=2` |
| `/our-platform?v=1` | V1 reference layout |
| `/our-platform?v=2` | V2 redesign preview |

## Remote

```bash
git remote add origin git@github.com:nurulasyikin-star/simpnify-v2-demo.git
git push -u origin main
```
