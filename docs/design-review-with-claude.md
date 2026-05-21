# Using Claude to Review + Improve the Design

A practical guide for getting Claude (Claude Code, the chat assistant, and the Figma + Chrome integrations) to do serious design work on this site. Written specifically for Lofty Labz; the patterns generalize.

## What Claude can — and can't — see

Claude can:

- Read every file in the repo, including data, components, CSS tokens, motion variants, choreography timings.
- Read the rendered DOM (via Chrome AppleScript or Claude in Chrome) — element positions, computed styles, focus order, console errors.
- Read screenshots you paste or attach.
- Read Figma files if you connect the Figma MCP server (already wired in this environment).
- Run Playwright e2e and report pixel measurements + visual-diff results.

Claude can't (yet):

- *Feel* motion in real time. A spring set to `stiffness: 220, damping: 18` lands at the same end-state as `stiffness: 100, damping: 30`, but they feel different. Claude reads the numbers; you feel the difference.
- Judge whether a typeface "looks confident" without you giving the criterion.
- Tell whether a color combination feels right under your monitor + your room lighting.
- Notice that you're tired of seeing brass-on-dark.

So the pattern is: **you bring the taste, Claude brings the throughput**. You point at the thing that feels off; Claude tracks down the root cause, proposes specific changes, and verifies them.

---

## Five review modes

### 1. File-level code review

```text
/front-review src/app/components/StarPanel.tsx
```

The `front-review` skill in this environment audits one JS/TS/CSS/Vue/Svelte/Astro file for code quality, potential bugs, performance, and maintainability. Use `strict` for the deeper pass:

```text
/front-review src/app/components/StarPanel.tsx strict
```

Good for: catching dead code, unused props, redundant motion variants, inconsistent class application.

### 2. Accessibility

```text
/front-a11y src/app/components/StarMap.tsx fix
```

`front-a11y` audits a single file for WCAG 2.1 AA issues. Pass `fix` to apply fixes inline.

```text
/a11y-audit
```

`a11y-audit` runs an end-to-end scan using axe-core (browser runtime) and eslint-plugin-jsx-a11y (static). Use when you want a project-wide a11y reading rather than file-level.

Session 5 used the file-level patterns: scanned `StarMap.tsx`, found 3 keyboard issues; fixed them; verified focus order via live DOM enumeration.

### 3. Visual review via Chrome AppleScript

This project's secret weapon. The user has "Allow JavaScript from Apple Events" enabled in Chrome (View → Developer), so Claude can drive your real Chrome browser:

- Set a URL
- Resize the window
- Read computed styles, bounding rects, focus state, console errors
- Capture canvas dimensions and layer ordering
- Trigger keyboard events
- Clear localStorage and observe entry cascades

Prompt patterns that work:

```text
Drive Chrome to /constellation/the-build, capture the lockup's
bounding rect, then resize the window to 1024×768 and re-measure.
Tell me if anything visibly jumps.
```

```text
Clear localStorage.lofty-hero-dismissed:v1, reload /, and sample
the hero panel opacity at 500ms / 1500ms / 2500ms after reload.
Compare against the cascade timing documented in choreography.ts.
```

Session 5 used this pattern for Tier 1 #4 (hero cascade), #5 (resize during expanded), #3 (focus order enumeration), and Tier 2 (visual smokes across 7 surfaces).

**Important — port conflicts**: When Jersey Builder Pro's Vite runs at 5173, start Lofty Labz at 5174 with `npm run dev -- --port 5174 --strictPort`. Tell Claude which port to drive.

### 4. Figma MCP — design source of truth

Tools available in this environment:

- `mcp__01ec5806-…__get_design_context` — pull the design context for a specific Figma node
- `mcp__01ec5806-…__get_metadata` — read a frame's properties
- `mcp__01ec5806-…__get_screenshot` — pull a screenshot of a specific frame
- `mcp__01ec5806-…__search_design_system` — find a component in the design system
- `mcp__01ec5806-…__get_variable_defs` — read design tokens (colors, type, spacing)

Prompt pattern:

```text
Pull the StarPanel spec from the Lofty Labz Figma file. Compare its
tokens (color, type, spacing) against what's currently in
src/app/components/StarPanel.tsx and theme.css. Flag drift.
```

Or — make code follow Figma:

```text
The "FOCAL" section in CoordinatesHUD.tsx should match the
instrument-readout style in Figma frame node-id=42:117. Pull that
frame, then adjust the component to match.

Verify in Chrome after.
```

### 5. Visual diff with Playwright

The smoke spec at `tests/smoke.spec.ts` takes full-page screenshots at desktop / tablet / mobile for every route. It doesn't currently compare them against baselines — it just captures and asserts no errors. To turn that into a visual-diff regression suite:

1. Run `npm run test:e2e` once to capture a "good" baseline in `test-results/screenshots/`.
2. Add Playwright's `toHaveScreenshot()` to the assertions.
3. Re-run after each design change; any pixel diff fails CI.

Useful when you're about to make a sweeping change (font swap, color migration, motion-easing pass) and want to know exactly what shifted.

---

## The iteration loop that actually works

The pattern Session 5 used and that scales well:

```text
1. You: name the felt problem in plain language.
   "The Reel constellation feels disconnected from the others — like
   it was bolted on. Look at the lift animation specifically; the
   feel is different than the original five."

2. Claude: form a hypothesis from the code, propose 2-3 specific edits.
   "ReelMotif uses ease-out cubic at 600ms; the others use the
   choreography.ts EASE_OUT_QUART at 800ms. Two options:
     a) Pull ReelMotif into the shared spring
     b) Keep its current ease but match the duration."

3. You: pick or redirect.
   "Try (a). I want everything reading from choreography.ts."

4. Claude: apply, then verify live in Chrome at desktop + mobile.
   Reports any visible regressions.

5. You: feel it. Either green-light or send back with a specific note.
```

What makes this work:

- **You commit to feel-language**, not Claude's vocabulary. "Disconnected." "Heavy." "Late." "Stiff." Don't translate to easings and milliseconds — that's Claude's job.
- **Claude commits to specific code**, not general advice. "Try a softer ease" is useless. "Change line 47 from `easeOutCubic` to `EASE_OUT_QUART` and reduce duration from 600 to 500ms" is actionable.
- **One loop per concern.** Don't bundle four felt-problems into one prompt. Each gets its own pass.

---

## Specific patterns for this codebase

### When changing motion timing

Always touch `src/app/lib/choreography.ts` first if the change should be system-wide. Components import from it; don't duplicate easings.

### When changing colors or spacing

Always touch `src/styles/theme.css` (the `:root` token block) first. Never hardcode a hex value in a component.

### When changing copy that appears in metadata

The `useDocumentMeta` hook in `src/app/lib/useDocumentMeta.ts` wires titles + descriptions per page. If you change a constellation name or practice description, update both the data layer (`src/app/data/constellations.ts`) AND the meta hook + `index.html` static OG/Twitter cards. Session 5 caught a "Five practices" string that hadn't been swept after The Reel was added — exactly this class of drift.

### When adding a new constellation

The hard rule from CLAUDE.md: "Every dot is on an edge." Author the constellation in `constellations.ts` with `shape: { anchors, edges }`. `Constellation.tsx` resolves edge indices across the combined `[stars, ...anchors]` array. Add a matching motif in `StarfieldScene.tsx` if you want a 3D backdrop.

### When the placeholder/real distinction matters

Real stars carry `repoUrl` / `liveUrl` / `figmaUrl` AND a `heroVisual`. Placeholders carry none of those AND `metric: 'Case study pending'`. Don't invent metrics. The CLAUDE.md hard rule + Session 5 Tier 5 reframing both reinforce this.

---

## What Claude won't do well

- **Original visual direction.** Claude can pattern-match to existing references (Skyrim UX, brass-on-dark, etc.), but it won't *invent* a new aesthetic that surprises you. That's still your job. Once you've chosen a direction, Claude is excellent at extending it consistently.
- **Long-form copy.** Claude writes generic agency-copy by default. The strong copy on this site (the manifesto, the transmissions, the "every engagement, in writing" line) reads as voice-specific because it was written or heavily redirected by hand. Use Claude for first drafts and structural editing; the voice comes from you.
- **Trade-off calls.** "Should the hero auto-dismiss after N seconds, or wait for explicit dismiss?" is a product decision. Claude will execute either, but the decision is yours.

---

## Quick reference — useful prompts

Review code quality of one file:
```
/front-review src/app/components/StarMap.tsx strict
```

Audit accessibility of one file:
```
/front-a11y src/app/components/Hero.tsx fix
```

Run accessibility scan across the project:
```
/a11y-audit
```

Drive Chrome to verify a change:
```
Make sure http://localhost:5174/ is up. Drive Chrome there, enumerate
all focusable elements in DOM order, and tell me if the tab order
matches the visual reading order.
```

Run the e2e suite (production build):
```
npm run build && npm run test:e2e
```

Pull design from Figma:
```
Use the Figma MCP to pull frame X from the Lofty Labz file. Tell me
what tokens it uses.
```

---

## Stopping rules

Stop a review session when:

- You've made one significant change and it lands clean (typecheck + e2e + your eye agree).
- Claude proposes a fix that touches more than 4 files for what felt like a one-spot problem — that's a sign the diagnosis is off, not that the fix is bigger.
- You can't articulate the problem in plain language anymore. Sleep on it.

Commit between stopping points. The Session 5 pattern (a11y commit · content commit · docs commit · polish commit) keeps history reviewable when you come back a week later wondering why something changed.
