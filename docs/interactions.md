# UI Interaction Inventory

Source of truth for every motion in the Lofty Labz site. Every component reads its timing from [`src/app/lib/choreography.ts`](../src/app/lib/choreography.ts) or [`src/app/lib/motion.ts`](../src/app/lib/motion.ts). If a value isn't here, it shouldn't exist in a component.

## Guiding principles

1. **Progressive disclosure** — points appear before lines; lines before labels. The eye is led from atoms to relationships to meaning.
2. **Selective brightness with preserved orientation** — when one item is chosen, siblings dim but stay spatially present.
3. **Slow, deliberate pacing** — long-arc easings; nothing snaps.
4. **Symmetric reversibility** — exits mirror entries.
5. **One focal point at a time**.

## Springs and easings

| Token | Type | Stiffness | Damping | Mass | Use |
|---|---|---|---|---|---|
| `springs.ui` | spring | 280 | 24 | — | Default hover/position changes |
| `springs.press` | spring | 420 | 28 | — | Press-down feedback |
| `springs.panel` | spring | 180 | 26 | 0.9 | Constellation lift / panel entry |
| `springs.fade` | tween | — | — | — | Opacity-only fades (300ms quart) |
| `EASE_OUT_QUART` | cubic-bezier | — | — | — | `[0.32, 0.72, 0, 1]` — default tween |
| `EASE_IN_OUT` | cubic-bezier | — | — | — | `[0.65, 0, 0.35, 1]` — symmetric easings |

## On-load choreography (initial map paint)

| Beat | Element | State change | Duration | Source |
|---|---|---|---|---|
| `0–600ms` | Starfield | opacity 0 → 1 | 600ms tween | `StarfieldScene` / `OptimizedStarfield` |
| `1000ms` | NorthStar | scale 0 → 1 + opacity 0 → 1 | 400ms tween | `NorthStar.tsx:22` |
| `1200ms` | NorthStar ley line | scaleY 0 → 1 | 1000ms quart | `NorthStar.tsx:55` |
| `800ms + i*80ms` | Constellation `i` | opacity 0 → 1, scale 0 → 1 | 800ms quart | `Constellation.tsx`, `constellationArrival` |
| `start of constellation + j*40ms` | Star `j` inside it | opacity 0 → 1, scale 0.4 → 1 | 500ms quart | `Constellation.tsx`, `starArrival` |
| `+0.05s` per segment | Line `(i-1 → i)` | pathLength 0 → 1 | 600ms | `Constellation.tsx:91` |
| `2000ms` | Hero panel | y 12 → 0, opacity 0 → 1 | spring `panel` | `Hero.tsx:32` |

## Constellation states

| State | Trigger | Scale | Opacity | Blur | Z-index | Transition |
|---|---|---|---|---|---|---|
| `idle` | default | 1 | 1 | 0 | 10 | — |
| `hover` | mouseenter (no expanded) | 1 | 1 | 0 | 10 | UI spring |
| `dimmed` | sibling expanded | 0.85 | 0.12 | 4px | 5 | 400ms quart |
| `expanded` | this constellation selected | 1.45 | 1 | 0 | 30 | panel spring |

Dimmed constellations also translate radially outward by 8% along the vector away from the expanded constellation's center (computed via `radialOutward` in `choreography.ts`).

## Constellation lines

| State | Stroke width | Opacity | Brass telemetry pulse |
|---|---|---|---|
| idle | 1px | 0.15 | no |
| hover | 1px | 0.6 | yes (2.4s linear, staggered by 0.15s) |
| expanded | 1.25px | 0.85 | yes (continues) |

## Star (point in constellation) interaction

| State | Trigger | Visual change | Transition |
|---|---|---|---|
| idle | — | 8×8px white dot, soft shadow | — |
| hover | mouseenter | scale 1.15, brass glow ring, tooltip rises (5px → 0) | `springs.ui` |
| active (parent expanded) | — | dot 12×12px, brass+paper glow | spring |
| press | onPointerDown | scale 0.95 → 1.0 | `springs.press` |
| click on map | onClick (parent not expanded) | navigate `/star/:id` (legacy redirect → nested URL) | — |
| click in expanded | onClick (parent expanded) | open StarPanel; URL pushes `/constellation/:slug/star/:starId` | panel spring |
| focus | tab key | brass 2px ring + 1px translateY lift | 180ms quart |

Tooltip shows: name (medium), metric (10px purple-300), "View case study →" affordance (10px brass mono).

## Constellation label

| State | Opacity | Transition |
|---|---|---|
| idle | 0.7 | 300ms |
| hover | 1 | 300ms |
| expanded | 1 | 300ms |

After 600ms of hover (no expansion), a brass mono caption "Click to enter →" fades in (220ms quart) below the description.

## Expansion timeline (click constellation)

| Beat | Element | Change |
|---|---|---|
| `0–200ms` | non-chosen labels | fade to 0.7 → 0 |
| `100–400ms` | non-chosen lines | opacity 0.15 → 0 |
| `200–600ms` | non-chosen clusters | scale 0.85, opacity 0.12, blur 4px, radial outward |
| `300–900ms` | chosen | scale 1.45, translate to (50%, 28%), z-index 30 |
| `400–700ms` | StarfieldScene | uHasFocal 0 → 1 (DOF narrows on focal point); 3D motif fades to 0.35 opacity |
| `700–1300ms` | ConstellationDetail sections | y 32 → 0, opacity 0 → 1, staggered by 100ms (Promise → Offerings → Stars → Process → CTA) |

## Collapse timeline (back to map / escape)

Exact reverse of expansion. Same easings, same beat order in reverse. The chosen constellation rebuilds its lines toward siblings; siblings fade back from blurred + dim into idle.

## StarPanel (case-study) slide

| State | Trigger | Visual change | Transition |
|---|---|---|---|
| hidden | URL has no `/star/:starId` | `x: 100%, opacity: 0` | — |
| visible | URL has `/star/:starId` | `x: 0, opacity: 1` | `panel` spring |
| exit | escape OR close button | `x: 100%, opacity: 0` | 300ms quart |

Internal sections (metadata, hypothesis, baseline/reading, intervention, guarantee, notes, CTA) each reveal via `sectionReveal` with 100ms wave stagger.

## Magnetic CTA ("Book a call" pill)

| Trigger | Effect | Transition |
|---|---|---|
| cursor outside 120px radius | offset {0, 0} | spring (220/18) |
| cursor inside radius | offset = unit(cursor−button) × (1 − dist/120) × 12px | spring (220/18) |
| hover | scale 1.04 | `springs.ui` |
| press | scale 0.98, +1px y | `springs.press` |

## View toggle (Map ↔ List)

Active label gets a 1px brass underline beneath it. Inactive label sits at 0.6 opacity. Both share the same press-down feel (scale 0.98 + 1px y). The whole pill scales 1.02 on hover.

## CoordinatesHUD

| Context | Display | Transition between |
|---|---|---|
| idle | `LAT 33.4{n}° N · LON 112.0{n}° W · PHX, AZ` (last digit drifts with mouse) | 250ms y-fade |
| expanded constellation | `FOCAL {NAME} · X {n} Y {n}` | 250ms y-fade |

## Hero panel

| Beat | Element | Change |
|---|---|---|
| `0` | section | opacity 0 → 1 (500ms quart) |
| `100ms` | content block | y 12 → 0, opacity 0 → 1 (`panel` spring) |
| `800ms` | "Explore the constellation map" button | opacity 0 → 1 (400ms) |
| infinite | down-arrow | y oscillation [0, 3, 0] (2s easeInOut) |

Dismissed via:
- Explore button click → state + localStorage timestamp (7-day cooldown)
- Escape key → same as above
- Auto-dismiss when a constellation expands via deep-link (URL has `:slug`)

## Underline-draw (`.underline-draw`)

Reusable text-link affordance. 1px line in `currentColor`, scaleX 0 → 1, 220ms quart from left edge. Applied to all in-content text links, back links, partner contact emails/phones.

## Focus-lift (`.focus-lift`)

Reusable focus-state motion parity. `:focus-visible` adds `translateY(-1px)`, 180ms quart. Mirrors hover lift so keyboard users see the same affordance feedback as mouse users.

## Cursor

Map area uses `.cursor-reticle` — a 24×24 brass SVG reticle (centered dot + 4 corner ticks). Reverts to system cursor outside the map. `cursor: pointer` overrides for interactive children (stars, buttons) take precedence.

## Reduced motion

`<MotionConfig reducedMotion="user">` wraps the app in `App.tsx`. When the user's OS prefers reduced motion:
- Motion springs resolve instantly (no spring physics, jump to end state).
- CSS keyframes resolve in 1ms (theme.css media query).
- Three.js `uTime` continues advancing — twinkle stops being visible because no animation is rendered, but the scene remains correct. (TODO: hard-freeze `uTime` based on a `reducedMotion` ref for full visual parity.)

## Accordion

Now correctly animates via:
- `data-[state=open]` → `animate-accordion-down` (220ms quart) — height 0 → content height, opacity 0 → 1
- `data-[state=closed]` → `animate-accordion-up` (180ms quart) — reverse

Keyframes defined in [`theme.css`](../src/styles/theme.css). Previously these classes were referenced but undefined; accordions opened with a snap instead of animating.

## Page transitions

React Router v7 owns routing. URL ↔ state is the model:
- `/` — map
- `/constellation/:slug` — map with `slug` expanded; section content visible
- `/constellation/:slug/star/:starId` — expanded + StarPanel open
- Browser back / forward / refresh handled natively by the router.

## Hover-state checklist (audit)

| Element | Has hover? | Has focus? | Has press? |
|---|---|---|---|
| Star (constellation) | ✓ scale + glow | ✓ brass ring + lift | ✓ scale 0.95 |
| Constellation label/button | ✓ opacity + caption | ✓ brass ring + lift | ✓ scale 0.98 |
| Map/List toggle | ✓ scale + bg | ✓ ring + lift | ✓ scale 0.98 |
| Book-a-call magnetic CTA | ✓ scale + magnet | ✓ ring + lift | ✓ scale 0.98 |
| North Star marker | ✓ scale 1.05 + opacity | ✓ ring | ✓ scale 0.95 |
| Hero "Schedule" button | ✓ scale 1.02 | ✓ ring + lift | ✓ scale 0.98 |
| Hero "or read the guarantee" | ✓ underline-draw + color | ✓ ring + lift | — |
| Hero "Explore the map" | ✓ y -2 | ✓ ring + lift | ✓ y 1 |
| Back-to-map (top bar, when expanded) | ✓ color + underline-draw | ✓ ring + lift | — |
| StarPanel close | ✓ color | ✓ ring + lift | — |
| ListView star row | ✓ pl-2 + glow + arrow reveal | ✓ ring + lift | — |
| ListView "Explore X" link | ✓ underline-draw + color | ✓ ring + lift | — |
| TheLabPage emails/phones | ✓ underline-draw + color | ✓ ring + lift | — |
| Accordion trigger | ✓ underline + chevron rotate | ✓ default | — |
| Form inputs | ✓ border focus | ✓ ring | — |
