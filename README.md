# Lofty Labz

A digital lab in Phoenix. Every engagement, in writing.

The site is a constellation-themed portfolio + studio page: a Three.js starfield, six service constellations rendered as line-art glyphs over a brass-on-dark palette, and an expand-in-place navigation model where the URL alone drives whether a constellation is collapsed, expanded, or showing a case study.

## Overview

Six constellations, six practices:

- **The Build** — Web design & development (Champro Merch Builder · EduTrack · Nexus)
- **The Voice** — Brand identity & messaging (placeholders)
- **The Signal** — Social media & content (placeholders)
- **The Engine** — AI workflows & automation (Champro Asset Pipeline + 2 placeholders)
- **The Lighthouse** — Care retainers & ongoing partnership (placeholders)
- **The Reel** — Motion design & animation (Easy Ice · Podunkton 2D · IUPUI Math Center)

The **North Star Guarantee** sits in the top bar as a brass-tinted marker that links to the written outcome guarantee — one promise per practice.

## Key Features

### Navigation model
The URL *is* the state. `/` renders the map collapsed; `/constellation/:slug` expands a constellation; `/constellation/:slug/star/:starSlug` opens its case-study panel. Browser back / forward / refresh all just work. No separate `ConstellationPage` or `StarPage` components — a single `StarMap` reads `useParams()` and derives layout.

### Visual system
- Brass-on-dark line art, instrument-panel vocabulary, no card chrome inside sections (`.cta-block` is the only exception).
- Custom GLSL particle starfield with depth, twinkle, and a soft DOF focal driven by the lifted constellation.
- One 3D motif per practice (build / voice / signal / engine / lighthouse / reel) drawn behind the lifted constellation.
- Two-layer parallax fallback (`OptimizedStarfield`) wrapped in Suspense + ErrorBoundary so the page paints fast and degrades gracefully on no-WebGL browsers.
- Per-star schematic illustrations (`StarHeroVisual` — cube · dashboard · whiteboard · pipeline · film · snowflake · equations) rendered only for real stars.
- One hand-authored Lottie (`brass-pulse`) on the Hailing Frequency hero.

### Accessibility
- WCAG 2.1 AA target. `MotionConfig reducedMotion="user"` + global CSS guard + shader `uReducedMotion` uniform together honor `prefers-reduced-motion`.
- Skip-link → `#main-content`. Keyboard tab order matches visual reading order. Brass focus ring on every interactive element via `.focus-ring` + `.focus-lift`.
- All star buttons have descriptive `aria-label`s ("View case study: X — metric").

### Verification
- 79-test Playwright smoke + visual regression suite at desktop / tablet / mobile.
- Star slug coverage: every one of the 18 stars exercised directly.
- Link integrity: list view links + constellation links walked and verified.

## Tech Stack

- **Framework**: React 18.3.1 · React Router 7.13.0 · TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.1.12 (v4 CSS-only config) · Radix UI + shadcn/ui patterns
- **Motion**: Motion (Framer Motion) 12.23.24
- **3D**: Three.js ^0.165.0 · @react-three/fiber ^8.18.0 · @react-three/drei ^9.122.0
- **Media**: lottie-react ^2.4.1 · lucide-react 0.487.0
- **Tooling**: Vite ^6.4.2 · @playwright/test ^1.60.0

## Installation

```bash
git clone https://github.com/Rickythegreat1/lofty-labz.git
cd lofty-labz
npm install
npm run dev
```

Dev server runs on `http://localhost:5173` by default. To run alongside another Vite project, pass `--port 5174 --strictPort`.

## Available Scripts

```bash
npm run dev        # Vite dev server
npm run build      # Production build (vite build)
npm run preview    # Serve production build (vite preview)
npm run typecheck  # tsc --noEmit
npm run test:e2e   # Playwright smoke + visual regression
```

## Brand

### Palette
- `--background` `#0a0612` (deep purple-black)
- `--paper` `#faf7fb` (warm white)
- `--brass` `#c9a961` (accent — focus rings, glyph outlines, focal hairlines)
- `--purple-900 / 700 / 500 / 300`, `--lavender-200 / 100` (interface scale)
- `--ink`, `--ink-muted` (text on light)

### Typography
- **Display**: Archivo Black
- **Body**: DM Sans
- **Mono**: JetBrains Mono

## Project Structure

```
lofty-labz/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Root MotionConfig
│   │   ├── layouts/Root.tsx           # Skip-link + ScrollProgress + Outlet
│   │   ├── components/
│   │   │   ├── StarMap.tsx            # Top-level URL → state composer
│   │   │   ├── ConstellationField.tsx # Orchestrates the 6 constellations
│   │   │   ├── Constellation.tsx      # Per-constellation glyph renderer
│   │   │   ├── ConstellationDetail.tsx# Expanded section content
│   │   │   ├── StarPanel.tsx          # Case-study side panel
│   │   │   ├── OptimizedStarfield.tsx # Canvas-2D fallback
│   │   │   ├── diagrams/
│   │   │   │   ├── ConstellationIcon.tsx
│   │   │   │   ├── StarHeroVisual.tsx
│   │   │   │   └── LottieAnimation.tsx
│   │   │   └── ui/                    # shadcn/ui primitives
│   │   ├── three/StarfieldScene.tsx   # GLSL particle field + per-practice motif
│   │   ├── data/constellations.ts     # SOURCE OF TRUTH for content + glyph geometry
│   │   ├── pages/                     # Home, NorthStar, TheLab, HailingFrequency, Coordinates, Transmissions, etc.
│   │   └── lib/choreography.ts        # Central timing + variants
│   └── styles/theme.css               # Tokens, .brass-corner, .pull-quote, .process-rail, .focus-ring, .focus-lift
├── public/lottie/brass-pulse.json     # Hand-authored brand Lottie
├── tests/smoke.spec.ts                # 79-test Playwright suite
├── docs/
│   ├── STATUS.md                      # Hand-off doc with tier list of remaining work
│   ├── work-audit.md                  # Real-work discovery audit (rounds 1-3)
│   ├── interactions.md                # UI interaction inventory
│   └── phase-1-register.md            # Design-system register
└── CLAUDE.md                          # Working notes for the AI build agent
```

## Hard Rules

- **No audio** anywhere on the site
- **No card chrome** inside sections (only `.cta-block` may carry brass corners)
- **No invented metrics** on placeholder stars — `metric: 'Case study pending'` for any star without `repoUrl` / `liveUrl` / `figmaUrl` / `heroVisual`
- **Every dot is on an edge** — no floating brass anchors
- **Real stars only get hero visuals**

See [CLAUDE.md](CLAUDE.md) for the agent-facing version.

## Routes

| Path | Renders |
|---|---|
| `/` | Map view (StarMap collapsed) |
| `/?view=list` | List view (constellations + stars as sections) |
| `/constellation/:slug` | StarMap with that constellation expanded |
| `/constellation/:slug/star/:starSlug` | + case-study panel open |
| `/star/:slug` | Legacy flat path → redirects through `StarRedirect` to the nested form |
| `/the-north-star` | Outcome guarantee — one promise per constellation |
| `/the-lab` (+ `/process`, `/manifesto`) | Studio page — Team / Process / Manifesto tabs |
| `/hailing-frequency` | Contact form |
| `/coordinates` | Site index (HTML sitemap) |
| `/transmissions` (+ `/:slug`) | Long-form writing |

## License

Proprietary and confidential. All rights reserved.

## Contact

- **Web**: [loftylabz.com](https://loftylabz.com)
- **GitHub**: [Rickythegreat1/lofty-labz](https://github.com/Rickythegreat1/lofty-labz)

See [ATTRIBUTIONS.md](ATTRIBUTIONS.md) for open-source credits.
