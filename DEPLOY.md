# Branching and deployment

## Branches

| Branch | Purpose | Updates live demo URL? |
| --- | --- | --- |
| **`dev`** | Active development; day-to-day commits | No |
| **`uat`** | Pre-production review / stakeholder sign-off | No |
| **`main`** | Production-stable; what the public demo shows | **Yes** |

**Live site (production only):**  
https://nurulasyikin-star.github.io/simpnify-v2-demo/our-platform/

Deploy runs via GitHub Actions (`.github/workflows/deploy-pages.yml`) on **push to `main` only**.  
If the workflow fails, the previous production build stays live.

---

## Promote flow

```text
  feature work  →  dev  →  uat  →  main  →  GitHub Pages (live)
```

### 1. Develop on `dev`

```powershell
git checkout dev
git pull origin dev
# ... edit, commit ...
git push origin dev
```

Use feature branches off `dev` if you prefer PRs:  
`feature/xyz` → PR → merge into **`dev`**.

### 2. Promote to UAT

When a slice is ready for review (not necessarily every commit):

```powershell
git checkout uat
git pull origin uat
git merge dev
# resolve conflicts if any
git push origin uat
```

Review locally or share artifacts; **`uat` does not auto-deploy** to the public GitHub Pages URL.

### 3. Promote to production (`main`)

When UAT is accepted and the build is stable:

```powershell
git checkout main
git pull origin main
git merge uat
git push origin main
```

Within a few minutes, check **Actions → Deploy to GitHub Pages**. When green, hard-refresh the live URL.

### Hotfix on production (optional)

For urgent production-only fixes:

```powershell
git checkout main
git pull origin main
# fix, commit
git push origin main
# back-merge into uat and dev so branches stay aligned:
git checkout uat && git merge main && git push origin uat
git checkout dev && git merge main && git push origin dev
```

---

## Before merging to `main`

Recommended checks (local):

```powershell
npm install
npm run build
npm run check:export-images
```

`check:export-images` verifies static export image paths include the GitHub Pages base path (`/simpnify-v2-demo`).

---

## GitHub settings (one-time)

- **Settings → Pages → Build and deployment:** Source = **GitHub Actions**
- **Settings → Branches (optional):** Protect `main` — require PR, require Actions to pass before merge

---

## Forking / renaming the repo

If the GitHub repo name changes, update **`repo`** in `next.config.ts` and **`SITE_BASE_PATH`** in `src/lib/site-path.ts` so images and routes match the new Pages URL.
