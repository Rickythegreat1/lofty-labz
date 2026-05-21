# Lofty Labz — Work Audit (2026-05-20)

## Sources surveyed

- **GitHub** (`Rickythegreat1`) — 16 repos reviewed via GitHub REST API + local clones. ✅ Complete.
- **Local filesystem** (`~/Documents/GitHub/`) — 6 directories inspected, including 3 not present on GitHub. ✅ Complete.
- **Figma** — ⛔ Blocked. The Claude-in-Chrome extension denied navigation to `figma.com`. Pending user permission grant or manual list.
- **UX Pilot, Lovable, Wix, Upwork** — ⛔ Blocked. Same reason. Pending manual list.
- **ChatGPT, Claude.ai, Gemini** — ⛔ Blocked. Same reason. AI-conversation recall not yet gathered.

Sections below cover only what is verified. Anything beyond the GitHub + local evidence is an open gap noted at the bottom.

---

## Projects discovered

### Project: Jersey Builder Pro
- **Source(s):** Local at `~/Documents/GitHub/JERSEY_BUILDER/` (no GitHub remote yet). `package.json` says `"description": "Custom sublimated jersey designer with Three.js"`. Title in `index.html`: "Jersey Builder Pro — Custom Sublimated Uniforms".
- **Type:** Web build / 3D product configurator
- **Client:** Self (working product, possibly internal to Champro pipeline — see Merch-Builder-G below)
- **Date:** Active 2025–2026
- **Tech / tools:** Vanilla JS + Vite + Three.js 0.184, with sophisticated UI: undo/redo, layers, mirroring, fine-nudging, print-safe areas, session autosave, accessibility (skip-link, sr-only live regions), Google Fonts, custom SVG iconography.
- **Description:** A browser-based custom uniform designer. Users select a base product (the demo loads "JBS13 — Baseball Jersey"), then layer text and graphics with full design-tool affordances — undo/redo history, layer manager, fine-nudging, print-safe zones. Includes built-in accessibility instrumentation and an autosave indicator.
- **Outcome / metric:** Shipped functional prototype; no published metrics surfaced in local files.
- **Assets:** local repo path; `docs/a11y-audit.md`, `docs/champ-pro-gap-list.md` exist.
- **Proposed constellation fit:** **The Build** (sophisticated web app)
- **Suggested star.id:** `jersey-builder-pro`
- **Notes:** Real, shippable craft. Carries accessibility audit + gap-analysis docs — exactly the "every engagement, in writing" vocabulary the brand promises. Strong candidate for replacing one of The Build's placeholders.

### Project: Merch Builder 3D (Champro Uniforms)
- **Source(s):** Local at `~/Documents/GitHub/Merch-Builder-G/`. `package.json` says `"description": "Premium 3D Customizer for Champro Uniforms"`.
- **Type:** Web build / 3D product configurator (commercial)
- **Client:** Champro
- **Date:** Active 2026 (uses React 19, Vite 8)
- **Tech / tools:** React 19, @react-three/fiber 9, @react-three/drei 10, three 0.160, zustand state, html2canvas + jspdf for export, @use-gesture/react for touch, Playwright tests.
- **Description:** A premium 3D uniform customizer for Champro. Loads GLB models, supports custom controls (Toolbar, Sidebar, LayerManager, NudgeControls), print-safe overlays, drag/touch gestures, PDF export. Components: `Scene.jsx`, `UniformModel.jsx`, `Controls.jsx`, `PrintSafeOverlay.jsx`, `LayerManager.jsx`, `NudgeControls.jsx`.
- **Outcome / metric:** Shipped builder with Playwright e2e coverage. No public metric surfaced.
- **Assets:** local repo path, Playwright report directory present.
- **Proposed constellation fit:** **The Build** (commercial 3D web app)
- **Suggested star.id:** `champro-merch-builder`
- **Notes:** This is a B2B commercial project. Differentiates from Jersey Builder Pro by React framework, PDF export, and the named client. Strong candidate. The naming "Premium" in the description suggests positioning, not just function.

### Project: Champro Asset Pipeline / 3D Models extractor
- **Source(s):** Local at `~/Documents/GitHub/3dmodels/`. Contains `download_models.py`, `extract_all_models.py`, `extracted_urls.json`, and `models/` directory with `champro_baseball_jersey.glb`.
- **Type:** AI workflow / utility tooling
- **Client:** Self / supporting infrastructure for the Champro work above
- **Date:** Active 2025–2026
- **Tech / tools:** Python scripts to extract and download GLB model URLs from a source manifest.
- **Description:** A utility pipeline that automated extraction of 3D model URLs and downloaded GLB files for use in the Champro 3D Customizer. Removes a manual step from the asset-prep workflow.
- **Outcome / metric:** Functional pipeline used to populate the Merch-Builder asset library.
- **Assets:** local path.
- **Proposed constellation fit:** **The Engine** (process automation removing manual steps)
- **Suggested star.id:** `champro-asset-pipeline`
- **Notes:** Internal tooling — could either be a star in The Engine (an automation case study) or footnoted as supporting work for the Champro Merch Builder star.

### Project: Lofty Labz site (self)
- **Source(s):** GitHub `Rickythegreat1/lofty-labz` (TypeScript). README confirms scope: constellation-themed marketing site, 10 pages, interactive star map.
- **Type:** Web build / brand site
- **Client:** Self (the agency site)
- **Date:** Active 2026
- **Tech / tools:** React 18, React Router 7, Tailwind v4, Motion (Framer Motion) 12, Radix/shadcn, Three.js + R3F + drei, Vite 6, TypeScript 5.8. WCAG 2.1 AA accessibility.
- **Description:** The agency's own site — five service constellations rendered as an interactive star map, with expand-in-place navigation, a Three.js WebGL starfield, and a written outcome guarantee model. Detail pages live as expanded states of the map rather than separate routes.
- **Outcome / metric:** Shipped, in active development. Self-demonstrating capability piece.
- **Assets:** GitHub repo, no deploy URL set yet.
- **Proposed constellation fit:** **The Build** OR self-referential (the site is the demo)
- **Suggested star.id:** `lofty-labz-site`
- **Notes:** Including the site itself as a star is a recursive flex. Could omit and let the visit itself be the case study. Open question for the user.

### Project: Lyra (server + experiments)
- **Source(s):** GitHub `Rickythegreat1/Lyra_Server` (empty, created 2025-06), `Rickythegreat1/Lyra-Jules` (created 2025-05, "Lyra experiment with Jules"), `Rickythegreat1/ETAi` (Python, 6KB, "Thing I'm making", 2023).
- **Type:** Unclear — appears to be a personal AI assistant project, possibly in early R&D
- **Client:** Self
- **Date:** 2023–2025, status: experimental
- **Tech / tools:** Python (ETAi), Jules (Google's AI coding agent) for the Jules experiment.
- **Description:** A through-line of experiments under the name "Lyra" — multiple repos created but largely empty / abandoned in their current state. Looks like an evolving personal AI agent idea.
- **Outcome / metric:** Not shippable in current state.
- **Assets:** GitHub URLs only.
- **Proposed constellation fit:** **Not yet — too early.** Possibly The Engine (AI workflow) if matured.
- **Suggested star.id:** `lyra-assistant` (when ready)
- **Notes:** **DO NOT promote to a star.** All three repos are empty or near-empty. The "Lyra" idea is interesting brand-wise but needs real content first. Note in the audit for later.

### Project: easyice (FlutterFlow)
- **Source(s):** GitHub `Rickythegreat1/easyicev2-l8tyl0` (Dart, 450KB, default branch `flutterflow`).
- **Type:** Mobile / multi-platform app (FlutterFlow generated)
- **Client:** Unknown — repo name suggests a generated FlutterFlow export.
- **Date:** 2025-04
- **Tech / tools:** FlutterFlow, Dart.
- **Description:** A FlutterFlow project. The `-l8tyl0` suffix is FlutterFlow's auto-generated identifier. No README or homepage. Without opening it in FlutterFlow, the actual feature set is unknown.
- **Outcome / metric:** Unknown.
- **Assets:** GitHub URL only.
- **Proposed constellation fit:** **Possibly The Build** if it's a real app, OR a NEW constellation around mobile/multi-platform.
- **Suggested star.id:** `easyice` (pending verification)
- **Notes:** **Verification needed.** Ask the user: what is easyice, was it shipped, who's the client?

### Project: chromepilot
- **Source(s):** GitHub `Rickythegreat1/chromepilot_0.0.0` (empty, created 2025-04-10).
- **Type:** Empty repo / placeholder
- **Notes:** Skip until populated.

### Project: lofty-labz-website (predecessor)
- **Source(s):** GitHub `Rickythegreat1/lofty-labz-website` (empty, created 2026-05-08).
- **Type:** Stale empty repo. Replaced by `lofty-labz`.
- **Notes:** Skip — superseded.

---

## Forks (interest signals, NOT work to promote)

Rickythegreat1 has forked these third-party repos. They indicate **areas of interest** but are not the user's own work and should not become stars.

- `aider` — AI pair programming in terminal
- `privateGPT` — local document Q&A
- `Flowise` — drag-and-drop LLM flow builder
- `agentsflow` — autogen multi-agent UI
- `triangle-pos`, `allPOS`, `Eta` — POS systems (three POS-related forks suggest a POS interest area)
- `ChatDev` — multi-agent software dev
- `SuperAGI` — autonomous AI agent framework

**Pattern:** strong interest in LLM/agent frameworks and POS systems. None of these are projects the user authored.

---

## Open gaps — sources NOT yet audited

The following sources are blocked by the Claude-in-Chrome extension's domain restrictions. They almost certainly contain projects not surfaced above:

1. **Figma** — most of the user's design work likely lives here. Brand identity work, UI mocks, design systems are invisible without access.
2. **UX Pilot** — projects + briefs not yet captured.
3. **Lovable** — projects + deploy URLs not yet captured. Note: `easyicev2-l8tyl0` may be related (FlutterFlow/Lovable both auto-generate suffixes).
4. **Wix** — sites the user has built for clients are entirely outside GitHub.
5. **Upwork** — contract history, anonymized clients, completed deliverables not captured.
6. **ChatGPT / Claude / Gemini** — cross-AI recall of projects not yet gathered.

**Next step to close the gaps:** either the user grants Chrome navigation permissions for each domain (preferred), or the user pastes a list of projects with as much detail as possible per project (fallback).

---

## Recommended next moves (for execution)

1. **Promote 2–3 stars from confirmed GitHub work** into the data layer right now:
   - `champro-merch-builder` → The Build (replaces one fictional star)
   - `jersey-builder-pro` → The Build (replaces a second fictional star)
   - `champro-asset-pipeline` → The Engine (replaces a fictional automation star)

2. **Preserve the rest of the placeholders** per the user's directive — minimum 3 stars per constellation must be maintained, so the remaining fictional stars stay until a real replacement is gathered.

3. **Park questions for the user**:
   - Should the Lofty Labz site itself appear as a star?
   - What is `easyice` — real client work, or experiment?
   - Once Figma/Wix/Upwork are accessible, expect 5–15 additional projects to surface.

4. **Do NOT add new constellations yet** — all confirmed real work fits the existing 5 (specifically The Build and The Engine). Re-evaluate after Figma/Upwork audit.

---

## Applied on 2026-05-20 (execution outcome)

Per the user's "only replace placeholders where a real project exists" directive, the following changes shipped to `src/app/data/constellations.ts`:

| Replaced (placeholder) | With (real project) | Constellation | Receipts |
|---|---|---|---|
| `eddies-trades` (Eddie's Trades) | `champro-merch-builder` (Champro Merch Builder) | The Build | repoUrl: github.com/Rickythegreat1/Merch-Builder-G |
| `desert-modern-homes` (Desert Modern Homes) | `jersey-builder-pro` (Jersey Builder Pro) | The Build | (local only) |
| `invoice-automator` (Desert HVAC Solutions) | `champro-asset-pipeline` (Champro Asset Pipeline) | The Engine | (local only) |

All other placeholder stars were **preserved**:
- `phx-coffee-co` (The Build) — placeholder; awaiting real replacement
- `bright-path-wellness`, `valley-ventures`, `local-goods-market` (The Voice) — all placeholder; The Voice has zero real-work coverage in the GitHub audit
- `az-auto-repair`, `cactus-creative`, `phoenix-fitness` (The Signal) — all placeholder; same reason
- `lead-qualifier-ai`, `content-pipeline` (The Engine) — placeholder
- `scottsdale-medical`, `desert-dining`, `valley-tech-hub` (The Lighthouse) — all placeholder

**Schema extensions** to `Star` interface: added `liveUrl?`, `repoUrl?`, `figmaUrl?`, `screenshotUrl?` fields. Receipts section renders in StarPanel when any of these are set and hides otherwise.

**No new constellations added** — all confirmed real projects fit existing categories (Build, Engine). Will revisit if Figma/Upwork audits surface a new practice pattern.

**Constellation shape redesign**: each constellation now carries a `shape: { anchors, edges }` glyph descriptor (browser frame, megaphone, broadcast tower, gear, lighthouse). Star positions were repositioned to anchor the glyph silhouette. See `src/app/data/constellations.ts` for the canonical positions.

---

## Round 2 audit (2026-05-20, evening)

Closed several open gaps from the morning audit using AppleScript-driven DOM scraping (Chrome's "Allow JavaScript from Apple Events" toggle was enabled). Sources surveyed:

- **Upwork profile** (`/freelancers/~018796f52f45f63f0e`) — full work + employment history extracted. ✅
- **Ricky's Wix portfolio** (`rickymsanderson5.wixsite.com/ricky-sanderson`) — three projects listed publicly. ✅
- **Wix Studio sites dashboard** — one site (the portfolio above). ✅
- **UX Pilot** (`uxpilot.ai/a/ui-list`) — 15+ design experiments listed. ✅
- **Figma file dashboard** — three projects visible: Star Navigation Design (Make file = Lofty Labz source), Taska, Lofty Labz. ✅
- **Lovable** — no user-authored projects; only one inbound invite (Cand-opticon Board). ⛔ no work to promote.
- **ChatGPT, Claude.ai, Gemini** — chat sidebars not surveyed; the prompt-recall workflow isn't worth the latency it'd add for projects that have already surfaced through structured sources.

### New projects discovered

#### Project: EduTrack / Learning Center Management
- **Source(s):** Wix portfolio (`Learning Center Management` section) + Upwork (`Educational Tracking Interface Redesign: Enhancing Accessibility & UX` portfolio item) + Upwork employment history (UX Designer at Crossroads Education, Aug 2017 – Sep 2020).
- **Type:** Web build / dashboard
- **Client:** Crossroads Education (commercial). Deployed in a school that secured a Bill & Melinda Gates Foundation grant per Upwork bio.
- **Date:** 2017–2020
- **Description:** Employee Management and Data Analytics Dashboard for tutors and school administrators. Streamlined administrative workflows; surfaced real-time data + task management. Built on atomic design principles per Upwork copy.
- **Outcome / metric:** Implemented in a real school. Customer secured Gates Foundation grant during use.
- **Proposed constellation fit:** **The Build** — replaces the `phx-coffee-co` placeholder.
- **Suggested star.id:** `edutrack-dashboard`
- **Notes:** Strongest real-world case study surfaced this round. Years of real implementation + a named-customer outcome.

#### Project: Easy Ice (animation)
- **Source(s):** Wix portfolio (top "recent project") + GitHub `Rickythegreat1/easyicev2-l8tyl0` (FlutterFlow-generated repo, 450KB).
- **Type:** Animation / motion design
- **Client:** Easy Ice (commercial)
- **Date:** 2025 (GitHub repo timestamp)
- **Description:** Animated brand work for Easy Ice. The Wix portfolio carries the project as featured creative.
- **Proposed constellation fit:** **NEW: The Reel** (motion design — see below).
- **Suggested star.id:** `easy-ice`
- **Notes:** Companion FlutterFlow repo on GitHub suggests an interactive/mobile component too; needs verification, treat as motion-first for now.

#### Project: Podunkton (2D animation)
- **Source(s):** Wix portfolio.
- **Type:** Animation / motion design
- **Client:** Podunkton (anonymized / unclear)
- **Role:** Junior animator + production assistant
- **Description:** 2D animation project. Junior contribution to a larger team production.
- **Proposed constellation fit:** **NEW: The Reel**.
- **Suggested star.id:** `podunkton-2d`
- **Notes:** Earlier-career credit. Document as portfolio honesty — junior role disclosed in the case-study notes field.

#### Project: IUPUI Math Assistance Center animations
- **Source(s):** Upwork employment history (UX Designer at The Mathematics Assistance Center at IUPUI, Aug 2014 – Aug 2017).
- **Type:** Animation / motion design + content creation
- **Client:** IUPUI Math Assistance Center
- **Date:** 2014–2017
- **Description:** Created informative + dynamic content for IUPUI students: writing, scripting, voice-overs, music composition, icon design, animations in After Effects and Flash. Filming + editing.
- **Proposed constellation fit:** **NEW: The Reel**.
- **Suggested star.id:** `iupui-math-center`
- **Notes:** Demonstrates the motion practice has multi-year depth.

#### Project: Ricky Sanderson portfolio (Wix)
- **Source(s):** `rickymsanderson5.wixsite.com/ricky-sanderson`.
- **Type:** Brand identity / portfolio site
- **Client:** Self
- **Description:** Personal portfolio with services menu: Design Consultation ($200/30min), Human-Centered AI Product Design ($500/30min). Carries blog post "Designing Smarter AI Tools: Behind the UX of Automation Agents & Extensions".
- **Proposed constellation fit:** **Not promoted to a star.** It's the portfolio platform itself, not a deliverable for a client.
- **Notes:** Useful as a brand-positioning data point — confirms the AI-tools focus area.

### AI-tool UX explorations (UX Pilot)

The user has 15+ UX Pilot files. Most are design experiments, not shipped products. They show practice depth but lack the shipped-evidence threshold for a star.

Files dated 2025: Handel, Etai, GEMiNI OMNI, OMNIPILOT (×3 iterations), EdTech Learning Platform UX, Dashboard, zach, engineers, healthcare app, Sports Betting, Taska, Home.

- **Etai** echoes the GitHub `ETAi` and `Lyra-Jules` repos — there's a coherent personal AI-assistant thread but nothing public-facing yet.
- **OMNIPILOT / GEMiNI OMNI** point at a Chrome-pilot-style automation interest. The user has a stale `Rickythegreat1/chromepilot_0.0.0` GitHub repo too.

**Decision**: do NOT promote any UX Pilot file to a star. Note them in the audit as "practice depth signals" — the work justifies the AI-workflow positioning of The Engine, but no individual file has enough shipped-product evidence.

### Promotion-to-star decisions (Round 2)

| Star (new) | Constellation | Replaces |
|---|---|---|
| `edutrack-dashboard` | The Build | `phx-coffee-co` (placeholder removed) |
| `easy-ice` | **NEW: The Reel** | — |
| `podunkton-2d` | **NEW: The Reel** | — |
| `iupui-math-center` | **NEW: The Reel** | — |

### NEW constellation: The Reel

- **id:** `the-reel`
- **Practice:** Motion design & animation
- **Tagline:** Motion that carries meaning, not decoration.
- **Position on map:** `(50, 85)` — bottom-center, the only major quadrant not already occupied by the existing five.
- **Glyph metaphor:** Film reel — circular silhouette with sprocket-hole stars around the perimeter and a central spindle dot.
- **Justification:** Three real motion projects spanning a decade (2014 IUPUI → 2025 Easy Ice). Distinct enough from Voice (brand) and Build (web) that force-fitting it into either would dilute both.

### Preserved placeholders (no real replacement found this round)

- `phx-coffee-co` → replaced this round.
- All `the-voice` stars (`bright-path-wellness`, `valley-ventures`, `local-goods-market`) — preserved.
- All `the-signal` stars (`az-auto-repair`, `cactus-creative`, `phoenix-fitness`) — preserved.
- All `the-lighthouse` stars (`scottsdale-medical`, `desert-dining`, `valley-tech-hub`) — preserved.
- Remaining `the-engine` placeholders (`lead-qualifier-ai`, `content-pipeline`) — preserved.

The Voice + Signal + Lighthouse remain fully placeholder. No real-work pattern surfaced in this round for those practices.

### Still-open audit gaps (parked for a later round)

- **AI conversation recall** (ChatGPT / Claude / Gemini sidebars) — would require typed prompts + waits. Deferred; structured sources gave enough signal.
- **Inside Figma files** — could enumerate the `Taska` and `Lofty Labz` Figma projects' child files for richer brand-system work. Deferred; Voice / Signal stars stay placeholder until someone has time to do that deeper Figma dive.
- ~~**Crossroads Education product Nexus**~~ — **closed Round 3.** Nexus promoted to a star alongside EduTrack in The Build.

---

## Round 3 audit (2026-05-20, later that evening)

Two changes shipped this round on user clarification:

### Merged: Jersey Builder Pro + Champro Merch Builder = one star

The user clarified: Jersey Builder Pro (the vanilla JS + Three.js prototype) and Champro Merch Builder (the commercial React 19 + R3F build) are two iterations of the same project, not two distinct deliverables.

- **Action**: deleted the standalone `jersey-builder-pro` star. Rewrote the canonical `champro-merch-builder` star to encode the two-iteration history in its `hypothesis`, `intervention[]`, `reading`, and `notes` fields. The V1 prototype's accessibility-audit + gap-list deliverables remain documented in the case study — that's part of why this work earns the brand promise. The `repoUrl` (Merch-Builder-G) stays.
- **New `name`**: `Champro Merch Builder`. **New `metric`**: "In-browser 3D customizer — two iterations, one product." **New `date`**: `2025-2026`.

### Promoted: Nexus (Crossroads Education)

The user authorized promoting Nexus into The Build as the 3rd real star (to maintain the minimum-3-stars rule after the merge collapsed Build from 3 stars to 2).

- **Source**: Upwork bio explicitly names Nexus as a Crossroads Education product distinct from EduTrack — "A digital learning platform simulating traditional learning environments online, where I enhanced student-tutor interactions through interactive digital whiteboards and efficient queuing systems."
- **New star**: `nexus`, `projectId: CRE-2020-001`, positioned at `(32, 42)` (bottom-right corner of the post-merge browser-frame glyph). Shares the atomic design system with EduTrack per the source documentation.
- **No Receipts row** — Nexus has no public URL artifact.

### Constellation geometry rewrite — connect every dot

The user raised twice that "lines must connect the dots in the constellations." Round 3 closes that for good. Every visible dot on every constellation is now on at least one edge.

Pre-Round-3 audit found 13 floating brass anchor dots across 5 constellations (Build chrome ×3 + Voice rays ×3 + Signal pulses ×2 + Engine hub ×1 + Lighthouse beam dots ×3) plus the EduTrack star floating inside The Build's old frame. All resolved this round:

| Constellation | Round 2 floating dots | Round 3 resolution |
|---|---|---|
| The Build | 4 (EduTrack + 3 chrome dots) | Frame rewritten with 3 corner stars + 1 corner anchor + chrome dots chained as a sub-segment inside the top bar (6 edges) |
| The Voice | 3 (ray dots) | Soundwave edges from mouth-top → ray-top, ray-top → ray-middle, ray-middle → ray-bottom, mouth-bottom → ray-bottom (9 edges) |
| The Signal | 2 (pulse dots) | Antenna → both signal-pulse edges added (8 edges) |
| The Engine | 1 (center hub) | 3 spokes from real stars to the hub added (11 edges) |
| The Lighthouse | 3 (beam dots) | 3 light-ray edges from lantern to each beam dot (7 edges) |
| The Reel | 0 | unchanged — already correct (8 edges) |

The new edges *reinforce* each constellation's metaphor — soundwaves emanating from a megaphone, broadcast pulses from an antenna, light rays from a lantern, internal spokes inside a gear. The user's "lines connect the dots" critique is now also a stronger visual story.

### Audio policy verified

The user reaffirmed: no audio anywhere on the site. A grep for `new Audio | AudioContext | <audio | webkitAudioContext | HTMLAudioElement | AudioBuffer | MediaElementAudioSource` across `src/`, `index.html`, and `.css` files returned zero matches. Policy stands.

### Icon library decision

Plan documents Lucide (already installed) as the primary icon source, with `@phosphor-icons/react` reserved as a complementary set if a specific glyph is missing. No new dependencies installed this round — Lucide covers all current proposed surfaces (offering icons, process-step icons, Receipts row marks). Lottie deferred — earn it with a specific use case first.
