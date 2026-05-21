# Changelog

All notable changes to the Lofty Labz constellation-themed website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-05-20

### Added — Architecture
- URL-driven expanded-state navigation: `/`, `/constellation/:slug`, `/constellation/:slug/star/:starSlug` all render `HomePage` → `StarMap` and derive state from `useParams()`. No more separate `ConstellationPage` / `StarPage` components.
- Sixth constellation **The Reel** (motion design) with film-reel glyph + 3 real stars (Easy Ice, Podunkton 2D, IUPUI Math Center).
- Three.js scene `StarfieldScene.tsx` (lazy-loaded) with custom GLSL particle field, per-constellation 3D motifs (build / voice / signal / engine / lighthouse / reel), and DOF focal on the lifted constellation.
- `OptimizedStarfield.tsx` canvas-2D fallback wrapped in both Suspense (chunk load) and `WebGLErrorBoundary` (WebGL init failure).
- `StarHeroVisual.tsx` — 7 brass-on-dark schematic illustrations (cube · dashboard · whiteboard · pipeline · film · snowflake · equations) rendered only for real stars.
- `LottieAnimation.tsx` wrapper + hand-authored `public/lottie/brass-pulse.json`, integrated on HailingFrequencyPage hero.
- `ConstellationIcon.tsx`, `ProcessFlow.tsx`, `ManifestoPillar.tsx`, `TierGlyph.tsx`.
- Lucide icons throughout (Receipts row, offerings grid, process steps).
- 7-day localStorage hero dismissal cooldown (`lofty-hero-dismissed:v1`).
- Skip-link in `Root.tsx` targeting `#main-content`.
- 79-test Playwright smoke + visual-regression suite covering every route at desktop / tablet / mobile, plus full STAR_IDS coverage and link integrity.

### Changed — Content
- Roster: 18 stars across 6 constellations. Real work: champro-merch-builder (merged v1/v2 history), champro-asset-pipeline, edutrack-dashboard, nexus, easy-ice, podunkton-2d, iupui-math-center. Voice / Signal / Lighthouse remain placeholder.
- Placeholder star `metric` fields reframed to `"Case study pending"` so they no longer read as fake real projects (11 stars).
- Removed card chrome from sections; only `.cta-block` retains brass corners. Replaced with `.brass-corner` utility + `.pull-quote` + `.process-rail`.
- North Star copy pulls 6 promises from `constellations.ts` (includes Reel).
- Hero cascade choreographed via `choreography.ts` — single source for all timing.

### Changed — Architecture / Accessibility
- `<motion.header>` sourced before `<main>` in `StarMap.tsx` so keyboard tab order matches visual reading order (skip-link → header → constellations → CTA). Header keeps z-40 for visual stacking.
- `NorthStar.tsx` + `MagneticCTA` (Book a call): `tabIndex={-1}` on inner motion children to neutralize Motion's auto-tabindex from `whileHover` / `whileTap` — single focus stop per logical control. Focus ring + lift live on the parent `<Link>`.
- `<MotionConfig reducedMotion="user">` at App root; global CSS guard in theme.css; shader `uReducedMotion` uniform halts drift + twinkle.

### Removed
- Audio: zero `<audio>`, zero `new Audio()`, zero `AudioContext`, zero Lottie with synced audio. Verified by grep across `src/`, `*.css`, `index.html`.
- Card chrome inside section content. Card pattern survives only on `.cta-block`.
- Standalone `ConstellationPage.tsx` and `StarPage.tsx` (replaced by URL-driven expansion of `StarMap`).
- Fabricated metrics on placeholder stars (see Changed/Content).

### Fixed
- Trackpad parallax stutter: split mousemove into synchronous `mouseRef` (Three.js consumer) + rAF-throttled `mousePosition` state (DOM consumers).
- vw/vh translation on lifted constellation auto-recenters on viewport resize.
- 13+ visual issues from session 2 live critique (starfield over-glow, label wrap, tooltip card chrome, lift target unit, motif positioning, CoordinatesHUD overlap, scroll-fade of lockup, etc.).

### Technical Stack
- React 18.3.1 · React Router 7.13.0 · Motion (Framer Motion) 12.23.24
- Three.js ^0.165.0 · @react-three/fiber ^8.18.0 · @react-three/drei ^9.122.0
- Tailwind CSS 4.1.12 · Radix UI · lottie-react ^2.4.1 · lucide-react 0.487.0
- Vite ^6.4.2 · TypeScript 5.8.3 · Playwright ^1.60.0

---

## [1.0.0] - 2026-05-10

### Added
- Initial release of Lofty Labz constellation-themed website
- Interactive star map navigation system
- Five service constellations (Strategy, Design, Development, Marketing, Growth)
- North Star Guarantee positioning at top center
- Cinematic logo ignition animation
- Parallax starfield background
- 10 complete pages with full content
- 15 detailed case studies across all service areas
- 6 thought leadership blog posts
- Team member bios and profiles
- Company manifesto and values
- Mobile-responsive design with touch-optimized navigation
- Desktop hover states and interactions
- WCAG 2.1 AA accessibility compliance
- Purple brand color palette implementation
- Custom typography (Orbitron + Inter)
- React Router 7 navigation
- Tailwind CSS 4 styling
- Motion (Framer Motion) animations
- shadcn/ui component library
- Radix UI accessibility primitives

### Technical Stack
- React 18.3.1
- TypeScript
- Vite 6.3.5
- React Router 7.13.0
- Tailwind CSS 4.1.12
- Motion 12.23.24
- Radix UI components
- Lucide React icons

### Pages
1. Home - Star map overview
2. Services - Constellation-based service offerings
3. Case Studies - 15 detailed project showcases
4. Team - Meet the crew
5. Blog - 6 articles on strategy, design, and development
6. Manifesto - Guiding principles
7. Guarantee - North Star Guarantee details
8. Contact (Hailing Frequency) - Contact form
9. Privacy Policy - Data protection
10. Terms of Service - Usage terms

### Components
- StarMap - Interactive constellation navigation
- Navigation - Responsive header with mobile menu
- ConstellationCard - Service constellation displays
- CaseStudyCard - Project showcase cards
- BlogPostCard - Article preview cards
- TeamMemberCard - Team bio cards
- Footer - Site footer with links
- Plus 40+ shadcn/ui components

### Bug Fixes
- Fixed syntax errors in HailingFrequencyPage.tsx (escaped special characters in JSX)
- Fixed syntax errors in constellations.ts (escaped apostrophes in strings)
- Resolved compilation errors for successful build

### Documentation
- Comprehensive README with setup instructions
- Contributing guidelines
- License information
- Changelog
- Code of conduct
- Security policy
- Attribution for third-party resources

---

## Versioning Strategy

- **Major** (X.0.0): Breaking changes, major redesigns
- **Minor** (0.X.0): New features, new pages, significant enhancements
- **Patch** (0.0.X): Bug fixes, minor improvements, content updates
