# Lofty Labz — Working Notes for Claude

## If the user opens with "continue"

There is an active multi-session build in progress. To resume:

1. Read [`docs/STATUS.md`](docs/STATUS.md) — current state + remaining-work tier list.
2. Read `~/.claude/plans/lofty-labz-remaining-work.md` — structured plan with exact verification steps and commands.
3. Acknowledge briefly ("Resuming — Tier 1 verifications next: <one-line preview>") and start Tier 1 work directly. Do not re-summarize the prior conversation.
4. Confirm the dev server is reachable: `curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/`.

## Stack

React 18 · React Router 7 · Motion (Framer Motion) 12 · Tailwind v4 · Radix/shadcn · Three.js + @react-three/fiber + @react-three/drei · lottie-react · lucide-react · Vite 6 · TypeScript 5.8.

## Architecture

URL drives state. `/`, `/constellation/:slug`, and `/constellation/:slug/star/:starSlug` all render `HomePage` → `StarMap`, which derives state from `useParams()`. There is no separate page component per constellation — they are modes of one map.

Source of truth for content + glyph geometry: [`src/app/data/constellations.ts`](src/app/data/constellations.ts). Each constellation carries a `shape: { anchors, edges }` descriptor; [`Constellation.tsx`](src/app/components/Constellation.tsx) resolves edges across the combined `[stars, ...anchors]` index space.

## Hard rules (do not break without explicit instruction)

- **No audio anywhere.** Verified across `src/`, CSS, `index.html`. No `<audio>`, no `new Audio()`, no `AudioContext`, no Lottie with synced audio.
- **No card chrome** inside section content. Only `.cta-block` may carry corner brass marks.
- **No invented metrics** for placeholder stars. If a star has no `repoUrl`/`liveUrl`/`figmaUrl`/`heroVisual`, its `metric` field must read as transparently a placeholder.
- **No aesthetic drift.** Brass-on-dark · line-art only · instrument-panel vocabulary · Skyrim-inspired UX (progressive disclosure, selective brightness, symmetric reversibility, one focal point).
- **Every dot is on an edge.** No floating brass anchors. `Constellation.tsx` already enforces this geometrically — the discipline is at the data layer.
- **Real stars only get hero visuals.** Placeholder stars have `heroVisual: undefined`. Hero visuals live in [`src/app/components/diagrams/StarHeroVisual.tsx`](src/app/components/diagrams/StarHeroVisual.tsx) — 7 kinds: cube · dashboard · whiteboard · pipeline · film · snowflake · equations.

## Real-work roster (7 stars across The Build · The Engine · The Reel)

- **The Build**: `champro-merch-builder` (cube) · `edutrack-dashboard` (dashboard) · `nexus` (whiteboard)
- **The Engine**: `champro-asset-pipeline` (pipeline) — 2 placeholders remain
- **The Reel**: `easy-ice` (snowflake) · `podunkton-2d` (film) · `iupui-math-center` (equations)
- **The Voice · Signal · Lighthouse**: all placeholder pending real-work discovery

## Verification toolkit

- Dev server: `npm run dev` on `localhost:5173`
- Typecheck: `npm run typecheck`
- Build: `npm run build`
- e2e: `npm run test:e2e` (Playwright)
- Live visual smokes: Chrome via AppleScript — user has "View → Developer → Allow JavaScript from Apple Events" enabled

## Audit trail

- [`docs/STATUS.md`](docs/STATUS.md) — hand-off doc with tier list of remaining work
- [`docs/work-audit.md`](docs/work-audit.md) — rounds 1-3 of real-work discovery + decisions
- [`docs/interactions.md`](docs/interactions.md) — micro-interaction inventory
- [`docs/a11y-audit.md`](docs/a11y-audit.md) — accessibility audit

## Out of scope (already-decided, do not re-litigate)

- No 7th constellation (no coherent new practice has surfaced)
- No invented case-study screenshots
- No further Three.js bundle splitting at this round (already lazy with fallback; deferred to final optimization pass)
- AI conversation history audit (ChatGPT/Claude/Gemini sidebars) — diminishing returns; structured sources gave enough signal
