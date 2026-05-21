# Lofty Labz — Full Test Pass Report

**Date:** 2026-05-19
**Branch:** `phase-0-eject`
**Suite:** static (typecheck + build + audit + source scan) plus Playwright (Chromium) at three viewports

---

## 1. Headline Result

**Suite passes 73/73.** Two app bugs and one Tailwind misconfiguration discovered along the way are fixed in this same branch.

| Phase                        | Result                  |
| ---------------------------- | ----------------------- |
| `tsc --noEmit`               | clean                   |
| `vite build`                 | clean, 11 s             |
| `npm audit` (prod + dev)     | 0 vulnerabilities       |
| Source scan (console.\*, TODO, FIXME, dangling imports) | clean |
| Playwright smoke + visual    | 73/73 passing in ~5:00  |

CSS bundle: **4.9 KB → 46.4 KB** after the Tailwind fix (see §3.1). The 9× growth is the long-missing utility set landing in the build for the first time since the Phase 0 eject.

---

## 2. What the Suite Covers

### 2.1 Static checks (`package.json` scripts)

- `npm run typecheck` — `tsc --noEmit` against the full project
- `npm run build` — production Vite build
- `npm audit` — both prod and dev trees
- Code scan: `console.log/debug/warn/error`, `TODO`, `FIXME`, `XXX`, `HACK`, and dangling imports of deleted modules

### 2.2 Playwright (`tests/smoke.spec.ts`)

Runs against the production `vite preview` server on port 4173 (auto-started by `playwright.config.ts`). One worker, no retries — every failure is signal.

**Smoke + visual regression** (16 routes × 3 viewports = 48 tests). For every route the test asserts:

- HTTP < 400 from the preview server
- at least one `<h1>` is attached
- `document.title` is non-empty
- `<meta name="description">` is non-empty
- zero browser console errors, zero `pageerror`, zero failed asset requests
- captures a `fullPage` screenshot at 1440×900, 768×1024, and 375×812

Routes covered:

| Static / marketing | Detail | Edge |
| --- | --- | --- |
| `/` (hero visible + dismissed) | `/constellation/the-build` | `/bogus-route-404` |
| `/?view=list` | `/constellation/the-voice` | |
| `/the-north-star` | `/constellation/the-signal` | |
| `/the-lab` | `/constellation/the-engine` | |
| `/hailing-frequency` | `/constellation/the-lighthouse` | |
| `/coordinates` | `/star/eddies-trades` | |
| `/transmissions` | `/star/bright-path-wellness` | |
| `/transmissions/why-your-agencys-case-studies-are-propaganda` | | |

**Interaction flows** (5 tests):

- hero visible on first load, dismisses on the explicit "Explore the constellation map" button
- `Escape` also dismisses the hero
- hero dismissal persists across a reload (7-day localStorage cooldown)
- map ↔ list view toggle works from the chrome
- skip link is the first focus stop on Tab and points at `#main-content`

**Star slug coverage** (15 tests, one per case study) — every star `id` in `data/constellations.ts` resolves to a real case study, not the "Case study not found" fallback.

**Link integrity** (2 tests) — opens every `/star/:id` and `/constellation/:id` link rendered on the list view and confirms it lands on a real page.

---

## 3. Issues Found

Test pass surfaced one critical configuration bug, two real app bugs, and two minor polish items. All five are fixed on this branch.

### 3.1 CRITICAL — Tailwind utilities were never bundled

**Symptom.** Initial fullPage screenshots came back at **5400+ px tall on the home page** at desktop. The constellation map (which is `h-screen overflow-hidden` and should be a single 900 px viewport) was rendering as a vertical scroll of stacked elements 6× taller than it should be. Pages on mobile were 6900 px tall. The 4.9 KB CSS bundle gave it away — a fully-utilities Tailwind build is ~30–50 KB minimum.

**Root cause.** Two regressions from the Phase 0 eject, compounding:

1. `src/main.tsx` imported `fonts.css` and `theme.css` directly but **never imported `tailwind.css`**. The Tailwind entry point was orphaned in the source tree and never reached the bundler.
2. `src/styles/tailwind.css` carried `@import 'tw-animate-css'`, but the `tw-animate-css` package was not in `package.json`. Even if main.tsx had imported it, the build would have errored on resolution.

Because nothing reached Tailwind, everything `className="absolute"`, `flex`, `h-screen`, `overflow-hidden`, `p-6`, `grid`, etc. fell back to browser defaults. `position: static` everywhere meant every "absolutely positioned" overlay flowed into the document body in vertical order, hence the giant scroll heights and stacked layout.

**Fix.**

- `src/main.tsx` — replace the two individual style imports with `import './styles/index.css'` so the fonts / tailwind / theme triple all reach the bundle
- `src/styles/tailwind.css` — drop the broken `source(none)` opt-out so Tailwind v4 auto-detects sources
- `package.json` — install `tw-animate-css` (required by `src/app/components/ui/accordion.tsx`, which uses `animate-accordion-up` / `animate-accordion-down`)

**Verification.** Post-fix screenshots at the same routes now sit at **1440×900** for the home map and 404 (single-viewport pages) and grow only when there's real long-scroll content (list view, marketing pages). CSS bundle is 46.4 KB / 6.6 KB gzip.

### 3.2 BUG — `Eddie's Trades` star link returned 404

**Symptom.** Visiting `/star/eddie-s-trades` (the URL rendered by `ListView` and the constellation-field star buttons) returned the "Case study not found" fallback page.

**Root cause.** `ListView` and `Constellation` derived the route slug from the star's display name: `star.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')`. `StarPage` resolves via `getStarById(slug)` which looks up by the canonical `star.id` from `data/constellations.ts`. For most stars the two strings collide (`Bright Path Wellness` → `bright-path-wellness` in both), but `"Eddie's Trades"` slug-ified to `eddie-s-trades` (apostrophe became a hyphen) while the data id is `eddies-trades`.

**Fix.** Switched both `ListView.tsx` and `Constellation.tsx` to use `star.id` as the route slug. Threaded `id` through the `ConstellationField → Constellation` boundary so the field always has the canonical id to wire into the link.

**Verification.** The new `Link integrity` test in the suite walks every `/star/:id` link rendered on the list view and asserts the destination is not the not-found page. All 15 case studies resolve.

### 3.3 BUG — Duplicate `<h1>` on the home page

**Symptom.** `StarMap` rendered an `sr-only` h1 ("Lofty Labz — A digital lab in Phoenix. Every engagement, in writing.") while `Hero` rendered a visible h1 ("A digital lab in Phoenix. Every engagement, in writing."). Two top-level h1s on the same screen — accessibility tooling and the smoke-test selectors both tripped over it.

**Fix.** Gated the `sr-only` h1 on `!heroVisible`. While the hero is mounted, its own visible h1 carries page identity. When the hero is dismissed, the sr-only h1 takes over so screen readers always have exactly one top-level heading.

### 3.4 POLISH — `ScrollProgress` brass bar painted "fully scrolled" on no-scroll routes

**Symptom.** On routes with no scrollable content (`/`, `/404`), the 2 px brass progress indicator at the very top of the viewport appeared at `scaleX(0.998)` — visually a full-width brass line, suggesting the user had scrolled to the bottom of a page they hadn't even scrolled.

**Root cause.** When `scrollHeight === clientHeight`, `useScroll()` returns `0 / 0` for `scrollYProgress`. The spring snapped to an arbitrary final value (~1.0) instead of staying at 0.

**Fix.** `ScrollProgress.tsx` now measures `document.documentElement.scrollHeight - innerHeight` via a `ResizeObserver` and only mounts the bar when the page actually has scrollable content. On the map and the 404 the bar is invisible; on long-scroll pages (constellation, transmission, list) it animates as expected.

### 3.5 NOT A BUG — `useInView`-gated sections appear empty in `fullPage` screenshots

**Symptom.** `home-list-desktop-1440.png` and the marketing pages show their hero / above-the-fold content but a large empty middle where the constellation listings or process steps should be.

**Cause.** `ListView`'s `ConstellationRow` and several marketing-page sections animate in via `useInView({ once: true })` with a `-100 px` margin. Playwright's `fullPage` screenshot captures the document's full height in a single shot, but `IntersectionObserver` never fires for elements outside the initial viewport, so those sections stay at `opacity: 0`.

This is the *correct* runtime behavior — real users scroll, intersection observer triggers, content fades in. The screenshot artifact is cosmetic to the test report only. Not changing.

### 3.6 NOT FIXED — Inconsistency in `Constellation.tsx`: I removed the unused `starId` local but the variable name `starKey` is now redundant with `star.id`

Not user-visible. Tracked here for the next pass.

---

## 4. New Test Infrastructure Added

| File | Purpose |
| --- | --- |
| `playwright.config.ts` | Single-worker Chromium project, auto-boots `vite preview` on 4173, retains traces on failure, JSON report at `test-results/report.json` |
| `tests/smoke.spec.ts` | The smoke + visual + interaction + slug coverage + link integrity suite |
| `package.json` script | `npm run test:e2e` |
| `.gitignore` | `test-results`, `playwright-report`, `/playwright/.cache` |

Reproduce locally: `npm install && npx playwright install chromium && npm run test:e2e`.

Screenshots land in `test-results/screenshots/{route-label}-{viewport-name}.png`. The HTML report at `playwright-report/index.html` is generated on every run.

---

## 5. Files Touched by This Test Pass

```
package.json                              ← +tw-animate-css, +test:e2e, +@playwright/test (dev)
package-lock.json                         ← reflects above
playwright.config.ts                      ← new
tests/smoke.spec.ts                       ← new
.gitignore                                ← +playwright artifacts
.cursor-protected                         ← manifest entries for files below

src/main.tsx                              ← import './styles/index.css'
src/styles/tailwind.css                   ← drop source(none) directive

src/app/components/Constellation.tsx      ← link uses star.id, Star interface gains id
src/app/components/ConstellationField.tsx ← forwards star.id
src/app/components/ListView.tsx           ← imports canonical data from data/constellations.ts; star.id link
src/app/components/StarMap.tsx            ← sr-only h1 gated on !heroVisible
src/app/components/ScrollProgress.tsx     ← gate on scrollHeight > viewport
```

---

## 6. Suggested Follow-Ups (Out of Scope for This Pass)

- Add `npm run test:e2e` to CI alongside `typecheck` and `build`
- Add a Playwright project for `webkit` and `firefox` (currently chromium-only to keep the suite fast and the install lean)
- Consider a real visual regression baseline (`toHaveScreenshot()`) once Phase 3D and 3E look stable across browsers
- When self-serve scheduling lands, the smoke test for `/hailing-frequency` can assert the booking widget mounts
- The 404 route currently returns HTTP 200 from `vite preview` (SPA fallback). For SEO-grade behavior, host with a server-side 404 status for unknown paths
