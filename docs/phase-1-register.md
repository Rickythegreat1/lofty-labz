# Phase 1 — UX Findings Register

**Repo:** `Rickythegreat1/lofty-labz`
**Branch:** `phase-0-eject` (off `main`)
**Phase 0 commit:** `4dad91b` — `fix: eject from figma make runtime + P0 triage`
**Generated:** May 17, 2026
**Reviewer:** Ricky Sanderson
**Status:** Analysis-only. No code changes pending review.

---

## 1. Phase 0 outcomes (for context)

Before this register, Phase 0 of the execution package shipped on `phase-0-eject`:

| Area | Change | File(s) |
|---|---|---|
| Eject from Figma Make | New `index.html` with inline branded loader (moon + flask lockup, lavender progress line on `#0a0612`) | `index.html` |
| Eject from Figma Make | New `src/main.tsx` React entry; loader fades out 400ms after React mounts | `src/main.tsx` |
| Eject from Figma Make | `react` + `react-dom` moved from `peerDependencies` → `dependencies` at `18.3.1` | `package.json` |
| Eject from Figma Make | New empty `public/` (with `.gitkeep`) for Phase 4 favicons / OG images | `public/.gitkeep` |
| Hygiene | New `.gitignore` (standard Vite + Node ignore set); `package-lock.json` committed | `.gitignore`, `package-lock.json` |
| Vendor missing shadcn primitives (Figma Make push omitted them) | `cn` helper + 6 primitives: button, input, textarea, label, tabs, accordion | `src/app/lib/utils.ts`, `src/app/components/ui/*.tsx` |
| Star map fix | Constellation connecting lines always visible at `0.15` opacity (was hover-only) | `src/app/components/Constellation.tsx:78-80` |
| North Star fix | Star uses `var(--brass)` gold + 4s pulse (was pure white + 2.5s) | `src/app/components/NorthStar.tsx:24, 29` |
| Ignition fix | Lockup ignition timer trimmed from `2000ms` → `800ms` | `src/app/components/StarMap.tsx:86` |
| Contact info | All 4 occurrences of personal `@gmail.com` addresses replaced with `hello@loftylabz.com` | `TheLabPage.tsx`, `ListView.tsx`, `HailingFrequencyPage.tsx`, `CoordinatesPage.tsx` |
| Tracking | `.cursor-protected` manifest lists every file touched, for future Figma Make merge reconciliation | `.cursor-protected` |

The "Book a The [Name] discovery call" grammar bug from the video walkthrough was a confirmed no-op via literal search (`rg "Book a The"` returned zero matches). However, see **Finding #3 below** — the bug still exists in template form.

---

## 2. Build status

### Result

**`npm run build` → exit 0, success.**

```text
vite v6.3.5 building for production...
transforming...
✓ 2056 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   3.18 kB │ gzip:   1.20 kB
dist/assets/index-DeF7o_al.css    3.53 kB │ gzip:   1.09 kB
dist/assets/index-DA059Dd2.js   546.48 kB │ gzip: 165.76 kB
✓ built in 1m 32s
```

### Warnings

**1. Single-chunk bundle > 500 kB (Vite default threshold)**

```text
(!) Some chunks are larger than 500 kB after minification. Consider:
    - Using dynamic import() to code-split the application
    - Use build.rollupOptions.output.manualChunks to improve chunking
    - Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
```

- Cause: `src/app/routes.tsx` uses synchronous `Component:` imports, so every route ships in the entry chunk.
- Impact: First-paint includes JS for all 10 pages.
- Fix scope: Phase 4 production hardening — convert routes to `React.lazy()` + `<Suspense>`. Expected to drop the entry chunk under ~300 kB.

### Lint / type errors

`ReadLints` reported **no diagnostics** across all created or modified files (`src/main.tsx`, `src/app/lib/utils.ts`, `src/app/components/ui/{button,input,textarea,label,tabs,accordion}.tsx`, `src/app/components/Constellation.tsx`, `src/app/components/NorthStar.tsx`, `src/app/components/StarMap.tsx`).

The repo has **no `tsconfig.json`** today. Vite/esbuild transpiles TSX without one, but `tsc --noEmit` is not wired. That's listed as Finding #42 (P3) below.

### `npm audit`

| Scope | Result |
|---|---|
| `npm audit --omit=dev` (runtime deps only) | **0 vulnerabilities.** Safe to deploy. |
| `npm audit` (full, including devDeps) | **1 high-severity vulnerability** — `vite <= 6.4.1` (advisories `GHSA-g4jq-h2w9-997c`, `GHSA-jqfw-vq24-v9c3`, `GHSA-93m4-6634-74q7`, `GHSA-4w7w-66w2-5vf9`, `GHSA-p9ff-h696-f583`). All affect the **dev server** only (file-serving / `server.fs.deny` bypasses / WebSocket arbitrary read). Production output is unaffected. |

Recommended action: bump Vite to `^6.4.2` in a small follow-up commit, OR roll it into Phase 4. The `npm audit fix --force` upgrade is in-range for `vite@6.x` and unlikely to break the build.

### Bundle composition note

Single 546 kB chunk is dominated by `react-dom` (~135 kB), `motion` (Framer Motion, ~100 kB), Radix primitives (`@radix-ui/react-tabs`, `react-accordion`, `react-dialog`, `react-label`, etc., aggregate ~120 kB), `lucide-react` (~40 kB shaken), `react-router` (~50 kB), and the page code (~100 kB).

---

## 3. UX Findings Register

**Severity scale:**
- **P0** — runtime bug / data integrity / blocker
- **P1** — critical for launch
- **P2** — strongly recommended before launch
- **P3** — nice to have

All `Evidence (File:Line)` references reflect the state of the `phase-0-eject` branch (post-commit `4dad91b`). Findings were derived by reading the source, not by inferring from the video walkthrough.

---

### A. Real bugs (not just slop)

| # | Finding | Severity | Evidence (File:Line) | UX Impact | Recommended Fix | Target File | Validation |
|---|---|---|---|---|---|---|---|
| 1 | `useRef` + `useInView` called inside `.map()` callback — violates React Rules of Hooks | **P0** | `src/app/components/ListView.tsx:179-180` | Hook order is data-dependent. React will warn and behavior is undefined when the constellations array shape changes. May silently break scroll-reveal. | Lift hook out: render each constellation as a dedicated `<ConstellationRow>` child component that calls `useRef`/`useInView` at its top level. | `src/app/components/ListView.tsx` | No React hook-order warnings in console; all 5 list rows animate independently. |
| 2 | `OptimizedStarfield` re-mounts its rAF loop on every mouse move because `useEffect` depends on `[mousePosition]` | **P0** | `src/app/components/OptimizedStarfield.tsx:12-71` | Each pointer move tears down the canvas init + 200-star init array setup and starts a new rAF — pegs CPU and defeats the optimization the name promises. | Store `mousePosition` in a ref read inside the render loop; change `useEffect` dep array to `[]`. Star array init guard at line 26 already handles persistence. | `src/app/components/OptimizedStarfield.tsx` | Single `requestAnimationFrame` chain in DevTools Performance trace; cursor sweeps don't spike CPU. |
| 3 | "Book a The [Name] discovery call" grammar bug **still present** in template form | **P1** | `src/app/pages/ConstellationPage.tsx:252` (`Book a {constellation.name} discovery call`) | Renders as "Book a The Build discovery call" / "Book a The Voice discovery call" for all 5 constellations. The Phase 0 `rg "Book a The"` returned no matches because the bug is templated, not literal. | Either rephrase template to `Book a discovery call about {constellation.name}` or pre-strip the leading "The " from `constellation.name` for this string only. | `src/app/pages/ConstellationPage.tsx` | All 5 constellation pages read grammatically on the CTA button. |
| 4 | "Ready to start the build" — lowercased constellation name + article reads as a verb phrase | P1 | `src/app/pages/ConstellationPage.tsx:242` | "Ready to start the voice", "ready to start the signal", "ready to start the engine" — sentences that look like infinitive verb phrases. Damages brand voice. | `Ready to start with {constellation.name}?` or `Ready to set {constellation.name} in motion?` | `src/app/pages/ConstellationPage.tsx` | All 5 pages produce readable CTAs. |
| 5 | Inline constellation diagram uses map-percentage coords inside a 200×100 SVG viewBox — points render off-canvas or clipped | P1 | `src/app/pages/ConstellationPage.tsx:70-91` | `star.x * 2` produces values like 44-156 for x and 50-76 for y; some points land outside the diagram's drawn area. | Normalize per-constellation: compute bounding box of stars, scale into the viewBox with padding. | `src/app/pages/ConstellationPage.tsx` | Diagram shows all stars + lines within the visible 200×100 frame for all 5 constellations. |
| 6 | StarMap.tsx hardcodes a duplicate 5-constellation array — diverges from `src/app/data/constellations.ts` (36 KB, has full case-study records) | P1 | `src/app/components/StarMap.tsx:14-75` vs `src/app/data/constellations.ts` | The map shows different stars than the real data layer. Star slugs in the map navigate to URLs that may not match data IDs (`star.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')` vs the data's actual `id` field). Two sources of truth. | Import constellations from `data/constellations.ts`, derive map x/y from a layout module, drop the hardcoded array. | `src/app/components/StarMap.tsx`, `src/app/data/constellations.ts` | Clicking any star from the map lands on a working `/star/:slug` page with real data. |

### B. Information hierarchy & semantics

| # | Finding | Severity | Evidence (File:Line) | UX Impact | Recommended Fix | Target File | Validation |
|---|---|---|---|---|---|---|---|
| 7 | Map view has no `<h1>` element — document outline starts at `<h2>` inside WelcomePanel | P1 | `src/app/components/StarMap.tsx` (no h1 in file); `src/app/components/WelcomePanel.tsx:29` (`<h2>This is Lofty Labz.</h2>`) | Screen readers and SEO see no top-level heading on `/`. Violates one-h1-per-page rule and undermines the "communicate digital agency in 3s" PRD goal. | Add a visually-prominent or visually-hidden `<h1>` to StarMap: e.g. `<h1 className="sr-only">Lofty Labz — A Digital Lab in Phoenix</h1>` plus a visible value-prop line. | `src/app/components/StarMap.tsx` | Lighthouse / aXe report exactly one h1; SR announces "Lofty Labz, A Digital Lab in Phoenix" on landing. |
| 8 | "Digital agency" is not communicable within 3s — top bar reads "Lofty Labz / The Guarantee / Map\|List", body is empty until 800ms ignition completes | P1 | `src/app/components/StarMap.tsx:142, 179, 188` | PRD Section 2.6 requirement unmet. A first-time visitor sees a wordmark and an icon for nearly a second. | Hero-style value-prop line ("A digital lab in Phoenix. Every engagement backed in writing.") rendered immediately after the lockup ignition, before constellation reveal. | `src/app/components/StarMap.tsx` | At t≈1.0s after route load, the words "digital lab" are on screen and readable. |
| 9 | Map view has no `<main>` landmark; top bar is a `motion.div`, not `<header>` or `<nav>` | P1 | `src/app/components/StarMap.tsx:101, 150` | Screen-reader users can't skip to content. No "skip to main" link anywhere in the app. | Wrap the persistent top bar in `<header role="banner">`, the constellation field in `<main>`, the welcome panel in `<aside aria-label="Welcome">`. Add a skip-to-content link at the top of the layout. | `src/app/components/StarMap.tsx`, `src/app/layouts/Root.tsx` | aXe reports `landmark-one-main`, `region`, `skip-link` passing on `/`. |
| 10 | Welcome panel copy invites "Pan to explore" but no panning exists in code | P1 | `src/app/components/WelcomePanel.tsx:53`; no pan handlers in `src/app/components/StarMap.tsx` | Lying to users. The map is static; only the background starfield has mouse-parallax. | Either implement actual map panning (drag or arrow keys) and bind to mousePosition state, OR change copy to "Hover a constellation to explore." | `src/app/components/WelcomePanel.tsx`, optionally `src/app/components/StarMap.tsx` | Either the map pans, or the copy reflects current behavior. |
| 11 | Constellation labels at 0.3 opacity at rest (verified against Section 9 correction recommending 0.7) | P1 | `src/app/components/Constellation.tsx:152` (`animate={{ opacity: isHovered ? 1 : 0.3 }}`) | At-rest labels are barely legible against the dark sky, especially on tablet brightness. Discoverability suffers — users see stars but can't read names without hovering. | Change to `opacity: isHovered ? 1 : 0.7`. Per Phase 3C in the package. | `src/app/components/Constellation.tsx` | All 5 constellation names readable from a normal viewing distance on the default theme. |
| 12 | Constellation subtitle / practice name (e.g. "Web Development") not rendered on the map at all — only `name` and `description` exist in props | P2 | `src/app/components/Constellation.tsx:12-23` (interface), `:155` (only `name` renders) | PRD Section 2.6 requires both display name and subtitle always visible. Currently the practice name only appears on hover via `description` text. | Add `subtitle: string` to props; render it below `name` in Inter/DM Sans 300 at ~60% opacity, always visible. Source from `constellations.ts.practice`. | `src/app/components/Constellation.tsx`, `src/app/components/StarMap.tsx` | "THE BUILD / Web design & development" visible on every constellation at rest. |
| 13 | NotFoundPage decorative stars not marked `aria-hidden` | P3 | `src/app/pages/NotFoundPage.tsx:9-17` | Twenty decorative dots may be announced by some SRs as empty. | Add `aria-hidden="true"` to the wrapping div. | `src/app/pages/NotFoundPage.tsx` | aXe reports no decorative-element issues. |

### C. State clarity (focus, hover, active)

| # | Finding | Severity | Evidence (File:Line) | UX Impact | Recommended Fix | Target File | Validation |
|---|---|---|---|---|---|---|---|
| 14 | No `focus-visible` styles on the bespoke buttons across StarMap, ListView, NorthStarPage, HailingFrequencyPage hero CTAs | P1 | `src/app/components/StarMap.tsx:182-192, 232-241`; `src/app/components/ListView.tsx:125-141`; `src/app/pages/NorthStarPage.tsx:139, 151`; `src/app/components/Constellation.tsx:105-142` | Keyboard users get only the default browser outline (often invisible against dark purple). Tab order cannot be visually followed. | Adopt a shared focus utility class — e.g. `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brass)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]` — apply to every interactive primitive. | All files above + `src/styles/theme.css` (add a `@layer utilities` shortcut) | Tab through every page with no mouse; focus ring is visible on every step. |
| 15 | View-mode toggle does not indicate the active mode visually or with `aria-pressed`/`aria-current` | P2 | `src/app/components/StarMap.tsx:182-193`; `src/app/components/ListView.tsx:98-107` | Both toggles show "★ Map \| ☰ List" identically on both pages. User cannot tell at a glance which view is active. Section 2.2 says modes are "co-equal" — that means both clearly labeled, not both ambiguous. | Add a segmented-control style: highlight the active segment with `bg-[var(--purple-700)]` (or `--brass` underline), apply `aria-pressed="true"` on the active button. | `src/app/components/StarMap.tsx`, `src/app/components/ListView.tsx` | At a glance you can tell which view you're in. SR announces "Map, pressed" or similar. |
| 16 | `cursor-pointer` applied to non-interactive elements (motion.div used as link wrapper) | P3 | `src/app/components/ListView.tsx:212`; `src/app/pages/ConstellationPage.tsx:186`; `src/app/pages/StarPage.tsx:295` | Visually correct because parent `<Link>` handles click, but signals interactivity on a wrapper that doesn't receive focus directly. Minor a11y noise. | Move `cursor-pointer` to the parent `<Link>`. | All three files | Lighthouse reports no interactive-role / cursor mismatch. |

### D. Star map mechanics

| # | Finding | Severity | Evidence (File:Line) | UX Impact | Recommended Fix | Target File | Validation |
|---|---|---|---|---|---|---|---|
| 17 | Star cores rendered as pure-white circles (`bg-white`) — violates Section 2.5 hard ban on pure white | P1 | `src/app/components/Constellation.tsx:115`; `src/app/components/ListView.tsx:219, 313`; `src/app/pages/ConstellationPage.tsx:87`; `src/app/pages/StarPage.tsx:300` | Pure white on near-black is the AI-slop default per the diagnostic. PRD calls for `--star-core` / `--paper` warm off-white. | Replace `bg-white` with `bg-[var(--paper)]` (or new token `--color-star-core`). Replace `<svg fill="white">` on lockups with `fill="var(--paper)"`. | All files above + `src/styles/theme.css` (consider adding `--star-core`) | `rg "bg-white\|fill=\"white\""` returns zero results in `src/app/`. |
| 18 | Lockup flask uses `fill="white"` / `stroke="white"` in seven places (`StarMap`, `ListView`, every page header, `index.html` loader) | P2 | `src/app/components/StarMap.tsx:137-138, 170-171`; `src/app/components/ListView.tsx:89-90, 313-314`; pages × 5 (`ConstellationPage:48-49`, `StarPage:102-103`, `NorthStarPage:27-28`, `HailingFrequencyPage:69-70`, `TheLabPage`, `TransmissionDetailPage`, etc.); `index.html:108-114` | Eight+ copies of the same SVG drift if one is changed. Pure white violates token policy. | Extract `<LoftyLabzLockup />` into `src/app/components/Lockup.tsx`; use `var(--paper)` for the flask; replace every inline copy. Loader SVG in `index.html` keeps its own copy (must be pre-React) but updates to `#faf7fb`. | New `Lockup.tsx` + all callers | `rg "M50 10 A40 40" -t tsx` returns one match (the component) + the loader. |
| 19 | North Star uses generic lucide `Star` (5-point cartoon star), not a custom SVG | P2 | `src/app/components/NorthStar.tsx:29` | "Generic AI aesthetics" per the slop diagnostic. The PRD positions North Star as the brand anchor — a recognizable custom shape. | Replace with a custom SVG (4-point sharp star, 8-point compass, or stylized monogram). Keep brass color + 4s pulse from Phase 0. | `src/app/components/NorthStar.tsx` | NorthStar shape is unique; no lucide-react import remains in this file. |
| 20 | Single starfield layer; no parallax depth (Section 9.11 calls for 3 layers) | P2 | `src/app/components/OptimizedStarfield.tsx:26-36` (single star array, single `parallaxX` multiplier of 0.5) | Map looks flat; no sense of depth. | After fixing finding #2, split 200 stars into 3 layers (e.g. 100 background @ 0.2x, 60 mid @ 0.5x, 40 foreground @ 1.0x) with size + opacity varied per layer. | `src/app/components/OptimizedStarfield.tsx` | Subtle parallax visible when moving mouse; foreground dust drifts faster than background. |
| 21 | Welcome panel is full-width bottom; Section 3E spec says bottom-left | P2 | `src/app/components/WelcomePanel.tsx:13` (`absolute bottom-0 left-0 right-0`) | Overlaps the bottom-right "Book a call →" CTA (`StarMap.tsx:226-242`) while it's open. Visual collision visible after t≈1.4s. | Position bottom-left with max-width ~440px, remove `right-0`. | `src/app/components/WelcomePanel.tsx` | "Book a call" pill not covered by panel; both elements coexist cleanly. |
| 22 | Welcome panel has an explicit X close button; Section 3E says dismiss on scroll / click-outside, no X | P2 | `src/app/components/WelcomePanel.tsx:21-27` | Adds a dismissable UI control that competes for attention. Implies modal weight on a panel that's meant to be conversational. | Remove the X. Add `onScroll` listener (or `IntersectionObserver` on a sentinel) + an outside-click handler to call `onDismiss`. | `src/app/components/WelcomePanel.tsx`, `src/app/components/StarMap.tsx` | Scrolling or clicking the constellation field hides the panel; no X visible. |
| 23 | Welcome panel uses duration-based easing, not spring physics | P3 | `src/app/components/WelcomePanel.tsx:17` (`duration: 0.6, ease: [...]`) | Mechanical motion. Section 3E spec calls for `stiffness: 280, damping: 24` spring. | Switch `transition={{ type: 'spring', stiffness: 280, damping: 24 }}`. | `src/app/components/WelcomePanel.tsx` | Entrance has slight overshoot characteristic of spring physics. |
| 24 | Ignition lockup doesn't coordinate with the new pre-React loader fade | P3 | `src/app/components/StarMap.tsx:115-128` | The `index.html` loader fades over 400ms; the React lockup animates in over `0.4s delay + 0.7s scale` (line 117) for nearly 1.1s. Visible double-flash possible on slow devices. | Trim ignition initial delay to 0; let the inline loader fade act as the entrance. | `src/app/components/StarMap.tsx`, `src/main.tsx` | Cold-load on throttled CPU shows one smooth transition from loader to lockup to map. |

### E. AI-slop pattern checklist (per Section 10 Phase 1 spec)

Each marked item is confirmed present in the post-Phase-0 codebase.

| # | Pattern | Status | Evidence (File:Line) | Severity | Recommended Fix |
|---|---|---|---|---|---|
| 25 | Default shadcn card/dialog/popover styling | ☑ partially mitigated | Phase 0 vendored 6 primitives with theme-aware variants in `src/app/components/ui/`, but they're still close to canonical shadcn defaults. No dialog/popover primitive yet — `Constellation.tsx:128-141` and `:171-186` roll their own tooltip-style cards. | P2 | Phase 3B: re-skin every primitive with custom glow + radius differentiation; replace ad-hoc info-cards with a shared `<GlassPanel>` component. |
| 26 | Uniform border-radius across surfaces | ☑ | `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full`, `rounded-md`, `rounded-sm` scattered without a system: `ListView.tsx:151` (2xl card), `ListView.tsx:126` (lg button), `StarMap.tsx:184` (md button), `StarMap.tsx:234` (full pill), etc. | P2 | Adopt the package's radius scale: button 6px, card 12px, sheet 20px, full-bleed 0. Codify as `--radius-button`, `--radius-card`, `--radius-sheet` tokens. |
| 27 | Center-aligned everywhere | ☑ | `text-center` on hero/CTA blocks: `ConstellationPage:243`, `StarPage:319`, `NorthStarPage:43, 62, 92, 134, 147`, `HailingFrequencyPage:85, 142`. Welcome panel inside `max-w-4xl mx-auto`. | P1 | Phase 3C: left-align body content, reserve center for spatial map elements only. Per-page asymmetric layouts. |
| 28 | Generic fade-in-on-scroll (no stagger, no spatial origin) | ☑ | Same `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}` pattern in `ListView:113, 148, 186, 244, 279`; `ConstellationPage:62, 109, 127, 173, 207, 235`; `StarPage:115, 158, 171, 191, 211, 231, 265, 281, 313`; `NorthStarPage:39, 61, 91, 111, 134, 147`. | P2 | Phase 3G: introduce `staggerChildren: 0.04`; vary `x` based on which side of the map the section conceptually belongs to. |
| 29 | Purple gradient CTA blocks (textbook slop per Section 3) | ☑ | `from-[var(--purple-X)] to-[var(--purple-Y)]` background on **8** large CTA blocks: `ListView:151, 283`; `ConstellationPage:114, 239`; `StarPage:218, 317`; `NorthStarPage:92, 135`. | P1 | Replace with solid `--color-surface-card` + thin gold (`--brass`) top-border. No gradient. |
| 30 | Pure white text/fills on dark backgrounds | ☑ | `bg-white` star dots (Constellation:115, ListView:219, 313, ConstellationPage:87, StarPage:300); `fill="white"` flask lockup (8 files); `fill-white text-white` on lucide Star (`NorthStarPage:45`, `ListView:154`); `text-white` on `<button>` (StarMap:234, ListView:126). | P1 | Replace pure white with `var(--paper)` (#faf7fb). Reserve true white for accidental high-emphasis pixels only (e.g. focus rings on dark surfaces). |
| 31 | Missing focus-visible styles | ☑ | See finding #14. | P1 | See fix in #14. |
| 32 | WCAG AA contrast risk: `--purple-300` (#9b7fd9) and `--lavender-200`/80 on `--purple-900` (#1a1426) | ☐ unmeasured | `text-[var(--purple-300)]` is used as primary body color on `--purple-900` cards (e.g. `ConstellationPage:95, 140`; `ListView:194`). `text-[var(--lavender-200)]/80` (80% opacity light text) appears on `ListView:199, ConstellationPage:101`. | P2 | Measure all 8 token-on-token combinations. Add a contrast check to the design system reference page. Adjust `--purple-300` lightness or remove the `/80` opacity tier where needed. |
| 33 | Two equal-weight CTAs in the hero | ☑ | `ListView:124-141` — "Book a call →" (purple-500) + "View star map" (border-outline) — both `min-h-[44px]`, same padding, same radius. `WelcomePanel:34-50` — "Skip to list view" + "Book a call" side by side. | P1 | Phase 3C: single primary CTA per hero. Demote secondary to a text-link below. |
| 34 | Generic loading spinner | ☐ fixed in Phase 0 | `index.html:101-128` now renders the moon+flask lockup + lavender progress line. | — | — |
| 35 | Placeholder content (Calendly embed, Sample SOW download, $47,000 reserve number) | ☑ | `HailingFrequencyPage:170-177` ("Calendly booking widget would be embedded here"); `NorthStarPage:139-142` (download button does nothing); `NorthStarPage:7-8` (`guaranteeReserve = 47000`, `lastUpdated = 'May 1, 2026'` hardcoded). | P2 | Confirm with owner: is the $47K reserve real? Is there a Calendly link? Is the Sample SOW PDF prepared? Either integrate real assets or remove the section. |

### F. Responsive, performance, hardening (Phase 2 preview)

| # | Finding | Severity | Evidence (File:Line) | UX Impact | Recommended Fix | Target File | Validation |
|---|---|---|---|---|---|---|---|
| 36 | No `prefers-reduced-motion` query anywhere in React code | P1 | `rg "prefers-reduced-motion"` returns one match — `index.html:88-95` (just the loader). All `motion.*` components ignore the OS setting. | Vestibular-sensitive users get unmitigated 200-star parallax, ignition zoom, and constant pulsing animations. | Wrap all motion in a `useReducedMotion()` check (motion/react provides this hook); collapse to opacity-only when set. | All `motion.*` callers, or a shared `MotionConfig` in `src/app/layouts/Root.tsx` | OS reduce-motion ON yields no parallax, no scale animations, no pulse. |
| 37 | Coordinate HUD hidden on mobile (`hidden md:block`) | P2 | `src/app/components/StarMap.tsx:247` | Brand element disappears on the device where most first impressions happen. PRD calls it "excellent" and worth keeping. | Move to bottom edge, smaller `text-[10px]` on mobile; show always. | `src/app/components/StarMap.tsx` | Coordinates visible at 375px width. |
| 38 | Constellation hover info-card uses `left-full ml-8` — overflows viewport when constellation is near the right edge | P2 | `src/app/components/Constellation.tsx:172` | "The Voice" (`position.x: 65`) and "The Engine" (`position.x: 75`) push the info card off-screen on narrow displays. | Conditionally flip the card to `right-full mr-8` when `position.x > 50`. | `src/app/components/Constellation.tsx` | Hovering all 5 constellations at 1024px keeps the info card on-screen. |
| 39 | Single 546 kB JS bundle, no code-splitting | P2 | Vite build warning (this report § 2); `src/app/routes.tsx` uses synchronous `Component:` imports | First-paint includes every page's JS. | Convert routes to `lazy()` + `<Suspense>`. Provide a tiny fallback (just the purple background, no spinner — the branded loader has already served). | `src/app/routes.tsx` | `dist/assets/index-*.js` drops below 300 kB; per-route chunks emit. |
| 40 | No `<title>`/`<meta description>` per page | P2 | `index.html:7` sets one title; no per-route head management. | All 10 routes share the same browser tab title and OG card. | Add `react-router` route handles + a tiny `<DocumentHead>` component, OR wire `react-helmet-async`. Section 10 Phase 4 task. | `src/app/routes.tsx`, new `src/app/components/DocumentHead.tsx` | Each route shows a distinct browser title and OG preview. |
| 41 | No favicons committed | P2 | `public/` is empty (just `.gitkeep`); `index.html` has no `<link rel="icon">` | Default browser globe icon on the tab. | Generate 16/32/180/512 from the lockup SVG; commit to `public/`; reference in `index.html`. Phase 4 task. | `public/`, `index.html` | Browser tab shows the moon+flask lockup. |
| 42 | `package.json` missing `typecheck` script; repo has no `tsconfig.json` | P3 | `package.json:7-10` only has `dev`, `build`, `preview`; no tsconfig | Cursor / contributors lack a fast type-error feedback loop. | Add a minimal `tsconfig.json` (React 18, ES2022, JSX preserve, `noEmit`); add `"typecheck": "tsc --noEmit"` to scripts. | `package.json`, new `tsconfig.json` | `npm run typecheck` runs and reports any TS errors. |
| 43 | Vite dev-server vulnerability (audit: 1 high, dev-only) | P3 | `npm audit` → vite `<=6.4.1`, advisories `GHSA-g4jq-h2w9-997c` and 4 others | Path-traversal / fs-deny bypass in `vite dev`. Production output unaffected. | `npm install vite@^6.4.2 --save-dev`. | `package.json` | `npm audit` reports 0 vulnerabilities. |

---

## 4. Summary counts

| Severity | Count | Findings |
|---|---|---|
| **P0** (real runtime bugs) | **2** | #1, #2 |
| **P1** (must-fix for launch) | **13** | #3, #4, #5, #6, #7, #8, #9, #10, #11, #14, #17, #29, #30, #33, #36 |
| **P2** (strongly recommended) | **19** | #12, #13, #15, #18, #19, #20, #21, #22, #25, #26, #28, #32, #35, #37, #38, #39, #40, #41 |
| **P3** (nice to have) | **5** | #16, #23, #24, #42, #43 |
| **Total** | **43** | (#34 was the Phase 0 fix to the loading spinner — closed.) |

Findings **#1** and **#2** are real React runtime bugs that were **not** on the package's original P0 list. They were uncovered by reading the source during this Phase 1 pass.

---

## 5. Open questions blocking Phase 2 scope

Before drafting the Phase 2 Production-Readiness Audit, owner needs to call:

1. **Bug priority bump.** Findings #1 (hooks rule violation in `ListView`) and #2 (rAF teardown in `OptimizedStarfield`) are real React bugs. Confirm they go into Phase 2's **Must-Fix** bucket — they are not stylistic and likely affect every user already.
2. **Placeholder content reality check** (finding #35). Three items are stubbed in the live code:
   - HailingFrequencyPage has a "Calendly booking widget would be embedded here" placeholder. Real Calendly URL?
   - NorthStarPage has a "Download Sample SOW (PDF)" button that does nothing. Real PDF prepared?
   - NorthStarPage hardcodes `guaranteeReserve = $47,000` and `lastUpdated = May 1, 2026`. Is this number real? Should it pull from somewhere?
   Each answer changes whether the item is Must-Fix (wire it up) or copy-edit (remove or rephrase).
3. **Star map data drift** (finding #6). The map's hardcoded constellations diverge from the 36 kB `constellations.ts`. Resolve in Phase 2 Must-Fix (boring data refactor) or wait for Phase 3D Star Map Overhaul (where the map gets redesigned anyway)?
4. **Vite vulnerability fix** (finding #43). Bump Vite to `^6.4.2` immediately on `phase-0-eject` before opening the PR, or roll into Phase 4 with the other hardening?

---

## 6. What needs your hand before the next session

The Phase 0 commit (`4dad91b`) is on local branch `phase-0-eject`. This Cursor environment has no git credentials and no `gh` CLI, so push + PR open are deferred to you:

```bash
cd /Users/akaDaCutest/Documents/GitHub/lofty-labz
git push -u origin phase-0-eject
gh pr create --base main --head phase-0-eject \
  --title "fix: eject from figma make runtime + P0 triage" \
  --body-file <(git log -1 --format=%B)
```

Or push and open the PR via the GitHub UI directly.

If you want this register as part of the same PR, the file is at `docs/phase-1-register.md` (currently untracked). Stage and amend the existing commit:

```bash
git add docs/phase-1-register.md
git commit --amend --no-edit
```

Otherwise it stays as a working file outside the commit history.

---

*End of Phase 1 register. Phase 2 audit will be drafted as a separate plan once the four open questions above are resolved.*
