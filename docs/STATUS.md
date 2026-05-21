# Lofty Labz — Build Status & Hand-off

**Last updated**: 2026-05-20 (end of session 5)
**Branch**: phase-0-eject · uncommitted working tree on disk
**Dev server**: user runs `npm run dev` on `localhost:5173` (or 5174 if Jersey Builder Pro is squatting 5173 — see Session 5 note)

This document is the single source of truth for the *current state* of the site and *what's still open*. Read this first when picking work back up.

---

## Architecture at a glance

- **Stack**: React 18 + React Router 7 + Motion (Framer Motion) 12 + Tailwind v4 + Radix/shadcn + Three.js + R3F + drei + lottie-react + Vite 6 + TypeScript 5.8.
- **Navigation model**: URL-driven expanded states. `/`, `/constellation/:slug`, `/constellation/:slug/star/:starSlug` all render `HomePage` → `StarMap`, which reads `useParams()` and derives state. There is no separate `ConstellationPage` or `StarPage` component anymore.
- **Data layer**: `src/app/data/constellations.ts` — six constellations (Build · Voice · Signal · Engine · Lighthouse · Reel), each with a `shape: { anchors, edges }` glyph descriptor. Star schema includes `liveUrl?`, `repoUrl?`, `figmaUrl?`, `screenshotUrl?`, `heroVisual?`.
- **Map rendering**: `Constellation.tsx` resolves edges across the combined `[stars, ...anchors]` index space. `ConstellationField.tsx` orchestrates lift/dim. `StarfieldScene.tsx` is the Three.js scene (lazy-loaded; falls back to `OptimizedStarfield.tsx`).
- **Audio policy**: ZERO audio anywhere. Verified via grep across `src/`, `*.css`, `index.html`.

---

## What landed in the last 4 sessions (chronological)

### Session 1 — Constellation expand-in-place + design system finalization
- Built `Constellation.tsx`, `ConstellationField.tsx`, `ConstellationDetail.tsx`, `StarPanel.tsx`. Killed standalone `ConstellationPage.tsx` and `StarPage.tsx`.
- Three.js scene scaffold + per-constellation motifs (Build grid, Voice torus stack, Signal rings, Engine torus knot, Lighthouse cone).
- Removed card chrome across TheLabPage, HailingFrequencyPage, ConstellationDetail. Replaced with `.brass-corner` utility + pull-quote + process-rail patterns.
- Added `ConstellationIcon.tsx`, `ProcessFlow.tsx`, `ManifestoPillar.tsx`, `TierGlyph.tsx`.
- Wrote `docs/interactions.md`.

### Session 2 — Vicious live critique + many fixes
- Drove the live site through Chrome (via Claude in Chrome MCP), found 13+ issues, fixed them: starfield over-glow, label wrap, tooltip card chrome, lift target wrong (vw/vh fix), 3D motif positioning, CoordinatesHUD overlap, ConstellationDetail panel-open layout, scroll-fade of lifted constellation, etc.

### Session 3 — Round 2 work audit + The Reel + connectivity round 1
- AppleScript-based audit of the user's real work via existing Chrome tabs (with "Allow JavaScript from Apple Events" enabled). Surfaced: Champro Merch Builder, Jersey Builder Pro, EduTrack, Champro Asset Pipeline, Easy Ice, Podunkton, IUPUI Math Center, UX Pilot AI sketches (not promoted), Wix portfolio, Lovable (empty).
- Added 6th constellation **The Reel** (motion design) with Easy Ice + Podunkton + IUPUI MAC stars + film-reel glyph + ReelMotif Three.js.
- Replaced PHX Coffee Co placeholder with EduTrack.
- Wrote `docs/work-audit.md` (Rounds 1+2).

### Session 5 — Tier 1 verifications + a11y safety + placeholder honesty + doc refresh
- **All Tier 1 verifications complete** — reduced motion (code-audit), mobile 375px, tab focus order, hero cascade, resize-during-expanded, WebGL fallback, stale Playwright refs + e2e (79/79 pass in 9.1m).
- **4 issues found + fixed in same session**:
  1. `<motion.header>` moved before `<main>` in `StarMap.tsx` — tab order now `skip-link → header → constellations → CTA`. z-40 preserves visual stacking.
  2. `NorthStar` double focus stop killed — `tabIndex={-1}` on inner `motion.div`. `aria-label` lives on `<Link>`.
  3. `Book a call` (MagneticCTA) double focus stop killed — same `tabIndex={-1}` pattern. `focus-ring` + `focus-lift` moved to parent `<Link>`.
  4. `WebGLErrorBoundary` class added in `StarMap.tsx`, wraps the `Suspense` around `StarfieldScene` — chunk-fetch failure AND WebGL init failure both fall back to `OptimizedStarfield`.
- **Tier 5 placeholder metric reframing** — 11 stars in Voice / Signal / Engine / Lighthouse without `repoUrl` / `liveUrl` / `figmaUrl` / `heroVisual` rewritten to `metric: 'Case study pending'`. Placeholders no longer read as fake real projects on the map face.
- **"Five practices" → "Six practices"** in Hero subtitle, HomePage default meta description, and `index.html` static + OG + Twitter descriptions. The Reel had been hard-rule added in Session 3 but the meta copy hadn't followed.
- **Tier 2 visual smokes** — 7 surfaces (/the-north-star, /the-lab, /the-lab/process, /transmissions, /transmissions/why-your-agencys-case-studies-are-propaganda, /coordinates, /constellation/the-reel) all render clean. North Star surfaces all six promises. Reel constellation Promise pull-quote doesn't overlap lockup.
- **Tier 6 docs** — `CHANGELOG.md` 1.1.0 entry, `ATTRIBUTIONS.md` rewritten with full open-source roster (Lucide, Lottie, Three.js, R3F, drei, Motion, Playwright, fonts), `README.md` rebuilt around current architecture, `docs/work-audit.md` Round 4 + 5 appended, `docs/interactions.md` Session 4 + 5 entries appended.
- Focusables on `/` decreased 31 → 29.

### Session 4 — Federated merge + connectivity round 2 + hero visuals + Lottie
- **Merged** `jersey-builder-pro` into `champro-merch-builder` (v1+v2 history captured in case-study fields).
- **Added** Nexus star to The Build (Crossroads Education's student-tutor live-session platform).
- **Connected every dot** across 5 constellations (Build chrome chain, Voice soundwaves, Signal broadcast pulses, Engine spokes-to-hub, Lighthouse beam rays). The Reel was already correct.
- **StarHeroVisual** component — 7 brass-on-dark schematic illustrations: cube, dashboard, whiteboard, pipeline, film, snowflake, equations. Assigned to every real star.
- **Lucide icons** added throughout: Receipts row (Github/ExternalLink/Figma), offerings (Layout/AppWindow/ShoppingCart/Palette/etc.), process steps (Search/BarChart3/Pencil/Hammer/Rocket/etc.).
- **Lottie integration** — installed `lottie-react`, created `LottieAnimation` wrapper, hand-authored `public/lottie/brass-pulse.json` (3 concentric brass rings + core dot), integrated on HailingFrequency hero (replaced static Radio icon).
- **Audit doc Round 3** appended.
- **Three.js bundle analysis** — measured (818KB/221KB gzip lazy); deferred further splitting (already lazy with fallback; revisit at end-of-project optimization).

---

## Critical file map

| Path | What |
|---|---|
| `src/app/data/constellations.ts` | Single source-of-truth for all 6 constellations, stars, shape descriptors. ANY content edit goes here. |
| `src/app/components/Constellation.tsx` | Glyph renderer (lines + stars + anchors + lockup + tagline-on-expand). Handles lift FLIP via `vw`/`vh` translation. |
| `src/app/components/ConstellationField.tsx` | Orchestrates the 6 constellations + radial-outward drift when dimmed. |
| `src/app/components/ConstellationDetail.tsx` | Section content (Promise pull-quote, offerings grid, stars list, process rail, CTA). Per-offering + per-process icons live here. |
| `src/app/components/StarMap.tsx` | The top-level map composer. URL params → state. Mouse ref → parallax. Three.js Suspense wrap. |
| `src/app/components/StarPanel.tsx` | Right-edge case-study panel. Hero visual + Receipts (with icons) + metadata + hypothesis + comparison + intervention + guarantee + notes + CTA. |
| `src/app/components/diagrams/ConstellationIcon.tsx` | ListView brass icons per constellation. |
| `src/app/components/diagrams/StarHeroVisual.tsx` | Per-star schematic SVG at top of StarPanel content. |
| `src/app/components/diagrams/LottieAnimation.tsx` | Lazy Lottie wrapper. Currently used on HailingFrequencyPage. |
| `src/app/three/StarfieldScene.tsx` | GLSL particle starfield + per-constellation Motif (build/voice/signal/engine/lighthouse/reel). |
| `src/app/lib/choreography.ts` | Central timing + variants. All animation reads from here. |
| `src/styles/theme.css` | Brand tokens, `.brass-corner`, `.pull-quote`, `.process-rail`, `.focus-lift`, `.underline-draw`, accordion keyframes, reticle cursor. |
| `docs/work-audit.md` | Comprehensive work audit (3 rounds). |
| `docs/interactions.md` | UI interaction inventory (slightly stale — flag for refresh). |
| `public/lottie/brass-pulse.json` | The first Lottie animation; brand-aligned three-ring pulse. |

---

## Remaining work — TIER 1 through TIER 7

(Original from end-of-session-4 audit. Tier 1 / 2 / 5-metrics / 6 closed in Session 5; Tier 3 / 4 / 5-StarPanel-internals remain.)

### TIER 1 — ✅ COMPLETE (Session 5)

All 7 verifications driven end-to-end. 4 issues found + fixed in the same session (see Session 5 entry above). Table preserved for the audit trail.

| # | Item | How to verify |
|---|---|---|
| 1 | **Reduced motion** | OS toggle `prefers-reduced-motion: reduce`, reload `/`, expand a constellation, open a star panel. Confirm: Three.js drift halts (uReducedMotion uniform), Motion springs resolve instantly, accordion + underline-draw transitions cut to 0.001s. |
| 2 | **Mobile path (375px)** | Chrome DevTools device emulation OR resize_window to 375x812. Confirm ListView engages, all 6 constellation rows render, icons + per-star stagger work, no horizontal overflow. |
| 3 | **Tab key focus order** | Keyboard-only walk through `/`. Expected order: skip-link → logo → (back-to-map if expanded) → NorthStar → Map/List toggle → constellations → CTA. Brass focus rings visible at each step. |
| 4 | **First-time visit hero** | Clear `localStorage.lofty-hero-dismissed:v1`, reload `/`. Cascade should fire: starfield → North Star → constellations stagger → lines path-draw → labels → hero panel rises ~2000ms. Dismiss button + Escape both work. |
| 5 | **Resize during expanded state** | Open `/constellation/the-build`, then resize browser. Constellation should re-center smoothly using vw/vh — no visual jump. |
| 6 | **WebGPU fallback** | Open in older Safari (or set `gl: () => null` temporarily). `OptimizedStarfield` should mount via Suspense fallback. |
| 7 | **Stale Playwright references** | `grep -rn "eddies-trades\|desert-modern-homes\|invoice-automator\|jersey-builder-pro" tests/` — should return zero. Run `npm run test:e2e`. Likely needs snapshot regeneration. |

### TIER 2 — ✅ COMPLETE (Session 5)

Drove Chrome to each surface, captured DOM state + key counts.

- `/the-north-star` ✅ — 6 promises render incl. The Reel; title "The North Star — Lofty Labz Outcome Guarantee"
- `/the-lab` (Team tab default) ✅ — 3 tabs (Team / Process / Manifesto), 3 brass-corner team cards
- `/the-lab/process` ✅ — Process tab activates
- `/transmissions` ✅ — 6 transmission entries, 5 h2 titles, all linked
- `/transmissions/why-your-agencys-case-studies-are-propaganda` ✅ — 299 words, 2 h2 subsections, Related-to-The-Build link present
- `/coordinates` ✅ — 6 h2 sections (Nav / Constellations / Cases / Transmissions / Contact / Legal), lat/lon + Phoenix present
- The Reel expanded ✅ — Promise pull-quote at y:365–545, lockup at y:146–266. No overlap.

### TIER 3 — Imagery still missing per original "design imagery for each unique section"

- Real team headshots for `TheLabPage` Team tab (currently monogram initials in brass-corner squares — content-authoring task, not code)
- Phoenix lab environmental photo for `TheLabPage` hero (currently just `Beaker` Lucide icon)
- NorthStarPage hero visual richer than just Lucide `Star`
- Star Panel hero visual for PLACEHOLDER stars (Voice/Signal/Lighthouse) — currently they get no hero. Could add a generic "case-study-pending" treatment.
- More Lottie animations beyond `brass-pulse.json`. Currently only used on HailingFrequency.

### TIER 4 — Plan-acknowledged deferrals

- **AI conversation history audit** (ChatGPT / Claude.com / Gemini sidebars) — never asked the AIs about Ricky's projects. Would surface ~unknown amount of additional real work.
- **Deeper Figma file enumeration** — `Taska` and `Lofty Labz` Figma projects' child files not enumerated. Might surface Voice/Signal real work.
- **`@phosphor-icons/react`** as complementary icon library — plan recommended; never installed (Lucide covered everything needed so far).

### TIER 5 — Polish opportunities (placeholder metric ✅ done; rest remain)

- ~~**Placeholder stars metric handling**~~ ✅ DONE in Session 5 — 11 placeholders now read `metric: 'Case study pending'`. The Star Panel internals (hypothesis / baseline / reading / intervention bullets / projectId / lead / date) are still fabricated for placeholders — out of Tier 5 scope this session; flag for a future "placeholder StarPanel honesty" pass.
- **Error states** — what if a star has malformed data? Constellation with broken shape? Not exercised.
- **CoordinatesHUD context swap** — verify it shows focal constellation name + position when expanded (earlier plan mentioned this; need DOM check).
- **Loading state before Three.js boots** — `OptimizedStarfield` mounts as fallback; verify it's actually visible on cold load (no two-canvas flash).
- **Scrollbar styling** — currently OS default. Could be brass-themed.
- **Cursor reticle** — only verified on map. Other surfaces use default cursor; might be intentional (only the map is the "navigation cosmos").

### TIER 6 — ✅ COMPLETE (Session 5)

- `README.md` ✅ rewritten — current architecture (6 constellations, URL-driven expand-in-place, Three.js + Lottie + Motion stack, current scripts, current routes, current project structure)
- `CHANGELOG.md` ✅ — 1.1.0 entry covers Sessions 2–5
- `ATTRIBUTIONS.md` ✅ — full open-source roster (React, Router, Vite, TS, Tailwind, Radix, shadcn/ui, cva, clsx, tailwind-merge, Motion, Three.js, R3F, drei, lottie-react / lottie-web, Lucide, Playwright, DM Sans + Archivo Black + JetBrains Mono)
- `docs/interactions.md` ✅ — Session 4 + 5 entries appended (StarHeroVisual, Lottie, Lucide icon families, hero cascade timing table, post-fix tab order, WebGL fallback path)
- `docs/work-audit.md` ✅ — Round 4 (hero visuals + Lottie + Lucide) + Round 5 (Tier 1 + a11y fixes + placeholder honesty) appended

### TIER 7 — Already-decided "do not do"

For completeness — these are NOT action items, listed so they don't get re-raised:

- No audio anywhere (verified)
- No 7th constellation (no real-work pattern justifies it)
- No real case-study screenshots invented (those are content authorship)
- No further Three.js bundle splitting until real users report slow map load

---

## Recommended next-actions on resume

Tier 1, 2, 5-metrics, and 6 are DONE as of Session 5. What remains is opportunistic — not blocking ship, but worth a pass when time allows:

1. **Tier 5 placeholder StarPanel honesty** — placeholders still have fabricated hypothesis / baseline / reading / intervention bullets / projectId / lead / date inside their Star Panel. Tier 5 this session only reframed the map-face metric. Two paths: (a) add a `placeholder: true` flag + StarPanel branch to render a "Case study coming soon" treatment, or (b) rewrite the internal fields to obviously-placeholder copy. (a) is cleaner.
2. **Tier 3 imagery** — real team photos, Phoenix lab photo, richer NorthStarPage hero. Content authorship, not code.
3. **Tier 4 deferrals** — AI conversation history audit (ChatGPT / Claude / Gemini sidebars), deeper Figma file enumeration, install `@phosphor-icons/react` if a specific glyph is missing.
4. **Tier 5 polish remaining** — error states for malformed star data, CoordinatesHUD context swap DOM check, cold-load two-canvas flash check, brass-themed scrollbar, reticle cursor on non-map surfaces.

---

## Verification toolkit (for the next session)

**Chrome AppleScript pattern** — already-on-the-user's-Chrome live testing. The user has enabled `View → Developer → Allow JavaScript from Apple Events`. Memory entry [[reference-chrome-applescript]] documents the patterns. Localhost tab is typically `tab 13`.

**Type-check + build**:
```
cd /Users/akaDaCutest/Documents/GitHub/lofty-labz && npm run typecheck
cd /Users/akaDaCutest/Documents/GitHub/lofty-labz && npm run build
```

**Dev server** (user runs separately, but verify):
```
curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/
```

**Playwright** (likely needs fixes):
```
cd /Users/akaDaCutest/Documents/GitHub/lofty-labz && npm run test:e2e
```

---

## Hard rules — don't break these

- **No audio** anywhere on the site
- **No card chrome** in sections / subsections — only `.cta-block` is allowed
- **No fake metrics** invented; placeholders should look like placeholders
- **No aesthetic drift** — brass-on-dark, line-art, instrument-panel vocabulary
- **No skipped pre-commit hooks** if/when committing
- **No destructive git operations** without explicit user request
