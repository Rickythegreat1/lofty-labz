import { Component, lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useNavigate, useParams } from 'react-router';
import { ConstellationField } from './ConstellationField';
import { ConstellationDetail } from './ConstellationDetail';
import { StarPanel } from './StarPanel';
import { CoordinatesHUD } from './CoordinatesHUD';
import { Hero } from './Hero';
import { NorthStar } from './NorthStar';
import { OptimizedStarfield } from './OptimizedStarfield';
import { constellations, getConstellationById } from '../data/constellations';
import { EASE_OUT_QUART } from '../lib/choreography';

// Lazy-load the Three.js scene so the page paints fast. OptimizedStarfield
// serves as the Suspense fallback during the chunk fetch.
const StarfieldScene = lazy(() => import('../three/StarfieldScene'));

/** Map a constellation id to its 3D motif kind. */
const MOTIF_FOR: Record<string, 'build' | 'voice' | 'signal' | 'engine' | 'lighthouse' | 'reel'> = {
  'the-build': 'build',
  'the-voice': 'voice',
  'the-signal': 'signal',
  'the-engine': 'engine',
  'the-lighthouse': 'lighthouse',
  'the-reel': 'reel',
};

interface StarMapProps {
  onViewToggle: () => void;
}

const HERO_DISMISS_KEY = 'lofty-hero-dismissed:v1';
const HERO_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Catches render errors from the lazy Three.js chunk — chunk-fetch failure
 * or WebGL/WebGL2 init failure on older browsers. Falls back to the canvas
 * 2D OptimizedStarfield so the page never blanks out.
 */
class WebGLErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/**
 * StarMap composes the entire spatial navigation of the site.
 *
 * URL → state derivation:
 *   /                                 -> map view, no constellation expanded
 *   /constellation/:slug              -> constellation `slug` expanded; section content visible
 *   /constellation/:slug/star/:star   -> constellation expanded + case-study panel open
 *
 * Routing IS the state model. Browser back / forward / refresh all just work.
 */
export function StarMap({ onViewToggle }: StarMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { slug, starSlug } = useParams<{ slug?: string; starSlug?: string }>();

  const expandedId = useMemo(
    () => (slug && getConstellationById(slug) ? slug : null),
    [slug]
  );
  const expandedConstellation = expandedId ? getConstellationById(expandedId) : null;

  // mousePosition (state) drives DOM-side effects that genuinely benefit
  // from a re-render — MagneticCTA, CoordinatesHUD's last-digit drift.
  // mouseRef is updated synchronously on every mousemove event and read by
  // the Three.js scene each frame to bypass React render churn (the source
  // of the trackpad parallax stutter).
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const mouseRef = useRef({ x: 50, y: 50 });
  const [hoveredConstellation, setHoveredConstellation] = useState<string | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  // Scroll progress within the expanded ConstellationDetail (0..1). Drives
  // the fade of the floating constellation lockup as the user reads.
  const [detailScroll, setDetailScroll] = useState(0);

  // Auto-dismiss the hero whenever a constellation is open. We never want
  // the hero panel to occlude an expanded constellation on deep-link.
  useEffect(() => {
    if (expandedId && heroVisible) {
      setHeroVisible(false);
    }
  }, [expandedId, heroVisible]);

  // Reset scroll fade state whenever the expanded constellation changes so
  // a fresh entry into a new constellation starts with the lockup visible.
  useEffect(() => {
    setDetailScroll(0);
  }, [expandedId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dismissedAt = window.localStorage.getItem(HERO_DISMISS_KEY);
    if (!dismissedAt) return;
    const elapsed = Date.now() - Number.parseInt(dismissedAt, 10);
    if (Number.isFinite(elapsed) && elapsed < HERO_COOLDOWN_MS) {
      setHeroVisible(false);
    }
  }, []);

  // The mousemove path splits into two:
  //   - mouseRef (synchronous, every event) feeds the Three.js parallax via
  //     ref, smoothed downstream by THREE.MathUtils.damp.
  //   - setMousePosition (throttled via rAF) feeds DOM-side consumers
  //     (MagneticCTA, CoordinatesHUD) which can tolerate ~60Hz.
  const mouseRAFRef = useRef<number | null>(null);
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    mouseRef.current.x = x;
    mouseRef.current.y = y;
    if (mouseRAFRef.current !== null) return;
    mouseRAFRef.current = window.requestAnimationFrame(() => {
      mouseRAFRef.current = null;
      setMousePosition({ x: mouseRef.current.x, y: mouseRef.current.y });
    });
  }, []);

  useEffect(() => {
    return () => {
      if (mouseRAFRef.current !== null) {
        window.cancelAnimationFrame(mouseRAFRef.current);
      }
    };
  }, []);

  const dismissHero = useCallback(() => {
    setHeroVisible(false);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(HERO_DISMISS_KEY, Date.now().toString());
    }
  }, []);

  const handleSelectConstellation = useCallback(
    (id: string) => {
      navigate(`/constellation/${id}`);
    },
    [navigate]
  );

  const handleSelectStar = useCallback(
    (starId: string) => {
      if (!expandedId) return;
      navigate(`/constellation/${expandedId}/star/${starId}`);
    },
    [expandedId, navigate]
  );

  const handleCloseStar = useCallback(() => {
    if (!expandedId) return;
    navigate(`/constellation/${expandedId}`);
  }, [expandedId, navigate]);

  const handleCollapseConstellation = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // Escape handling cascade:
  //   star panel open -> close star (keep constellation expanded)
  //   constellation expanded, no star -> collapse to map
  //   hero visible -> dismiss hero
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (starSlug) {
        handleCloseStar();
      } else if (expandedId) {
        handleCollapseConstellation();
      } else if (heroVisible) {
        dismissHero();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [
    starSlug,
    expandedId,
    heroVisible,
    handleCloseStar,
    handleCollapseConstellation,
    dismissHero,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[var(--background)] cursor-reticle"
      onMouseMove={handleMouseMove}
    >
      {!heroVisible && (
        <h1 className="sr-only">
          {expandedConstellation
            ? `${expandedConstellation.name} — ${expandedConstellation.practice} · Lofty Labz`
            : 'Lofty Labz — A digital lab in Phoenix. Every engagement, in writing.'}
        </h1>
      )}

      <WebGLErrorBoundary fallback={<OptimizedStarfield mousePosition={mousePosition} />}>
        <Suspense fallback={<OptimizedStarfield mousePosition={mousePosition} />}>
          <StarfieldScene
            mouseRef={mouseRef}
            // The motif and DOF focal follow the LIFTED constellation
            // position, not the original. Without panel: (50, 22). With
            // panel open: (28, 22) so the motif sits beside the panel.
            expandedPosition={
              expandedConstellation
                ? { x: starSlug ? 28 : 50, y: 22 }
                : null
            }
            motif={expandedId ? MOTIF_FOR[expandedId] ?? null : null}
          />
        </Suspense>
      </WebGLErrorBoundary>

      {/* Persistent UI - Top Bar. Sourced before <main> so keyboard tab order
          matches visual reading order (skip-link → header → constellations →
          CTA). z-index keeps it visually on top regardless of DOM order. */}
      <motion.header
        role="banner"
        className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="focus-ring focus-lift flex items-center gap-3 cursor-pointer min-w-[44px] min-h-[44px] rounded-md"
            aria-label="Return to home"
          >
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
                <path
                  d="M50 10 A40 40 0 0 1 50 90 Q35 75 35 50 Q35 25 50 10"
                  fill="var(--purple-500)"
                  stroke="none"
                />
                <g transform="translate(42, 35)">
                  <rect x="5" y="0" width="10" height="3" fill="var(--paper)" />
                  <path
                    d="M5 3 L5 15 Q10 18 15 15 L15 3"
                    fill="none"
                    stroke="var(--paper)"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </div>
            <span className="font-display text-xl tracking-tight uppercase">Lofty Labz</span>
          </Link>

          <AnimatePresence>
            {expandedId && (
              <motion.button
                key="back-to-map"
                type="button"
                onClick={handleCollapseConstellation}
                className="focus-ring focus-lift rounded-md flex items-center gap-2 px-3 py-2 text-[var(--purple-300)] hover:text-[var(--paper)] transition-colors min-h-[40px]"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3, ease: EASE_OUT_QUART }}
                aria-label="Collapse and return to the map"
              >
                <span aria-hidden="true">←</span>
                <span className="text-sm font-mono uppercase tracking-wider underline-draw">
                  Back to map
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <NorthStar />

        <ViewToggle onViewToggle={onViewToggle} />
      </motion.header>

      <main
        id="main-content"
        aria-label="Constellation map of Lofty Labz services"
        className="absolute inset-0"
      >
        <ConstellationField
          constellations={constellations}
          hoveredConstellation={hoveredConstellation}
          expandedId={expandedId}
          panelOpen={Boolean(starSlug)}
          onHover={setHoveredConstellation}
          onSelect={handleSelectConstellation}
          onStarSelect={handleSelectStar}
          // When expanded and the user starts scrolling into section content,
          // fade the floating lockup so it doesn't occlude reading. Returns
          // to full opacity when scrolled back to top.
          opacity={
            heroVisible
              ? 0.25
              : expandedId
              ? Math.max(0.08, 1 - detailScroll * 0.92)
              : 1
          }
          interactive={!heroVisible && detailScroll < 0.5}
        />

        <AnimatePresence>
          {expandedConstellation && (
            <ConstellationDetail
              key={expandedConstellation.id}
              constellation={expandedConstellation}
              onStarSelect={handleSelectStar}
              panelOpen={Boolean(starSlug)}
              onScrollProgress={setDetailScroll}
            />
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {heroVisible && !expandedId && <Hero key="hero" onExploreMap={dismissHero} />}
      </AnimatePresence>

      <AnimatePresence>
        {!heroVisible && !expandedId && (
          <motion.div
            key="cta"
            className="absolute bottom-8 right-8 z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <MagneticCTA mousePosition={mousePosition} containerRef={containerRef} />
          </motion.div>
        )}
      </AnimatePresence>

      {/*
        CoordinatesHUD lives at bottom-left in the idle map state, where it
        reads as instrument telemetry. When a constellation expands, section
        content scrolls into that bottom-left area; the HUD would visually
        collide with it. Hide on expand — the constellation lockup carries
        the focal identity already.
      */}
      <AnimatePresence>
        {!heroVisible && !expandedId && (
          <motion.div
            key="coords"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CoordinatesHUD mousePosition={mousePosition} expandedConstellation={null} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expandedConstellation && starSlug && (
          <StarPanel
            key={starSlug}
            constellation={expandedConstellation}
            starId={starSlug}
            onClose={handleCloseStar}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * View toggle with a brass active-state underline. The slider moves between
 * the two labels to indicate which view is current.
 */
function ViewToggle({ onViewToggle }: { onViewToggle: () => void }) {
  return (
    <motion.button
      onClick={onViewToggle}
      className="focus-ring focus-lift relative flex items-center gap-2 px-4 py-3 min-h-[44px] border border-[var(--border)] rounded-md hover:bg-[var(--purple-700)]/60 transition-colors cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98, y: 1 }}
      aria-label="Toggle between star map and list view"
    >
      <span className="text-sm relative">
        <span aria-hidden="true">★</span> Map
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--brass)]"
        />
      </span>
      <span className="text-sm opacity-50">|</span>
      <span className="text-sm opacity-60">
        <span aria-hidden="true">☰</span> List
      </span>
    </motion.button>
  );
}

/**
 * Magnetic "Book a call" pill. When the cursor is within 80px (in screen
 * coords), the pill drifts toward the cursor up to 12px. Spring snaps back
 * when out of radius.
 */
function MagneticCTA({
  mousePosition,
  containerRef,
}: {
  mousePosition: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current || !buttonRef.current) {
      setOffset({ x: 0, y: 0 });
      return;
    }
    const container = containerRef.current.getBoundingClientRect();
    const btn = buttonRef.current.getBoundingClientRect();
    const cursorX = container.left + (mousePosition.x / 100) * container.width;
    const cursorY = container.top + (mousePosition.y / 100) * container.height;
    const cx = btn.left + btn.width / 2;
    const cy = btn.top + btn.height / 2;
    const dx = cursorX - cx;
    const dy = cursorY - cy;
    const dist = Math.hypot(dx, dy);
    const RADIUS = 120;
    const MAX_PULL = 12;
    if (dist < RADIUS) {
      const factor = (1 - dist / RADIUS) * MAX_PULL;
      const len = dist || 1;
      setOffset({ x: (dx / len) * factor, y: (dy / len) * factor });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [mousePosition.x, mousePosition.y, containerRef]);

  return (
    <Link
      to="/hailing-frequency"
      ref={buttonRef}
      className="focus-ring focus-lift inline-block rounded-full"
    >
      <motion.span
        // tabIndex={-1} prevents the double focus stop that Motion's
        // whileHover/whileTap would otherwise create on this inner span;
        // focus + brass ring live on the parent <Link>.
        tabIndex={-1}
        className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] bg-[var(--purple-500)] text-[var(--paper)] rounded-full font-medium shadow-lg hover:shadow-xl cursor-pointer"
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98, y: offset.y + 1 }}
      >
        Book a call →
      </motion.span>
    </Link>
  );
}
