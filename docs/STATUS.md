# Lofty Labz — Build Status & Hand-off

**Last updated**: 2026-05-20 (end of session 4)
**Branch**: main · uncommitted working tree on disk
**Dev server**: user runs `npm run dev` on `localhost:5173`

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

(From the end-of-session-4 audit. Run Tier 1 first.)

### TIER 1 — Could block ship · run these first

These are verifications that have never actually been executed end-to-end. Each is a ~5-10 minute task.

| # | Item | How to verify |
|---|---|---|
| 1 | **Reduced motion** | OS toggle `prefers-reduced-motion: reduce`, reload `/`, expand a constellation, open a star panel. Confirm: Three.js drift halts (uReducedMotion uniform), Motion springs resolve instantly, accordion + underline-draw transitions cut to 0.001s. |
| 2 | **Mobile path (375px)** | Chrome DevTools device emulation OR resize_window to 375x812. Confirm ListView engages, all 6 constellation rows render, icons + per-star stagger work, no horizontal overflow. |
| 3 | **Tab key focus order** | Keyboard-only walk through `/`. Expected order: skip-link → logo → (back-to-map if expanded) → NorthStar → Map/List toggle → constellations → CTA. Brass focus rings visible at each step. |
| 4 | **First-time visit hero** | Clear `localStorage.lofty-hero-dismissed:v1`, reload `/`. Cascade should fire: starfield → North Star → constellations stagger → lines path-draw → labels → hero panel rises ~2000ms. Dismiss button + Escape both work. |
| 5 | **Resize during expanded state** | Open `/constellation/the-build`, then resize browser. Constellation should re-center smoothly using vw/vh — no visual jump. |
| 6 | **WebGPU fallback** | Open in older Safari (or set `gl: () => null` temporarily). `OptimizedStarfield` should mount via Suspense fallback. |
| 7 | **Stale Playwright references** | `grep -rn "eddies-trades\|desert-modern-homes\|invoice-automator\|jersey-builder-pro" tests/` — should return zero. Run `npm run test:e2e`. Likely needs snapshot regeneration. |

### TIER 2 — Surfaces not re-verified after Session 4 changes

Each of these needs a screenshot via Chrome AppleScript + a quick read-through. ~2 min each.

- `/the-north-star` — pulls promises from `constellations.ts`; verify all 6 promises render (including The Reel's)
- `/the-lab` (Team tab) — monogram cards + email/phone underline-draws
- `/the-lab/process` — ProcessFlow horizontal rail
- `/transmissions` — index renders
- `/transmissions/why-your-agencys-case-studies-are-propaganda` — detail renders
- `/coordinates` — page renders
- The Reel expanded state — post-fix; confirm Promise pull-quote doesn't overlap lockup once animation settles

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

### TIER 5 — PhD-quality polish opportunities

- **Placeholder stars metric handling** — Voice/Signal/Lighthouse placeholders show fabricated metrics ("3x social engagement", "85% accuracy"). Reframe as "Case study pending" or "Anonymized client" until real ones land. *Currently reads as fake real projects.*
- **Error states** — what if a star has malformed data? Constellation with broken shape? Not exercised.
- **CoordinatesHUD context swap** — verify it shows focal constellation name + position when expanded (earlier plan mentioned this; need DOM check).
- **Loading state before Three.js boots** — `OptimizedStarfield` mounts as fallback; verify it's actually visible on cold load (no two-canvas flash).
- **Scrollbar styling** — currently OS default. Could be brass-themed.
- **Cursor reticle** — only verified on map. Other surfaces use default cursor; might be intentional (only the map is the "navigation cosmos").

### TIER 6 — Documentation drift

- `README.md` — not updated since constellation rewrite
- `CHANGELOG.md` — not updated for Sessions 2–4
- `ATTRIBUTIONS.md` — verify Lucide / Lottie / Three.js credits exist
- `docs/interactions.md` — created in Session 1, doesn't reflect hero visuals, Lottie, Receipts icons, per-offering icons

### TIER 7 — Already-decided "do not do"

For completeness — these are NOT action items, listed so they don't get re-raised:

- No audio anywhere (verified)
- No 7th constellation (no real-work pattern justifies it)
- No real case-study screenshots invented (those are content authorship)
- No further Three.js bundle splitting until real users report slow map load

---

## Recommended next-actions on resume

In priority order:

1. **Tier 1** verifications — the seven items above. Each is a ~5–10 min check.
2. **Tier 7-stale-tests** — run `npm run test:e2e`, fix breakages, regenerate snapshots.
3. **Tier 2** quick visual smokes — 7 surfaces, ~2 min each.
4. **Tier 5 placeholder metric reframing** — high signal / low effort; placeholders no longer look like fake real projects.
5. **Tier 6 documentation drift** — append CHANGELOG, refresh interactions.md, update README.

Everything else is opportunistic.

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
