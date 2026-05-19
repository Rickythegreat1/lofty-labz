import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router';
import { ConstellationField } from './ConstellationField';
import { CoordinatesHUD } from './CoordinatesHUD';
import { Hero } from './Hero';
import { NorthStar } from './NorthStar';
import { OptimizedStarfield } from './OptimizedStarfield';
import { constellations } from '../data/constellations';

interface StarMapProps {
  onViewToggle: () => void;
}

/**
 * Phase 3D — StarMap as composition layer.
 *
 * The view now stacks (back to front):
 *   1. OptimizedStarfield     z-0   — the deep starfield (Phase 3E adds depth)
 *   2. ConstellationField     z-10  — five service constellations, sourced
 *                                      from data/constellations.ts (no more
 *                                      inline data drift — closes finding #6)
 *   3. Hero                   z-20  — first-impression panel, replaces the
 *                                      old 800ms ignition lockup + WelcomePanel.
 *                                      Dismissed by an explicit "Explore the
 *                                      constellation map" button; dismissal
 *                                      persists for 7 days via localStorage.
 *   4. Top-bar chrome         z-40  — logo, NorthStar marker, map/list toggle.
 *                                      Visible from frame 1 (no ignition gate).
 *   5. Bottom-right CTA       z-30  — "Book a call" pill, hidden while the
 *                                      hero is up (redundant with hero CTA).
 *   6. Coordinates HUD        z-30  — Phoenix coordinates, hidden while
 *                                      the hero is up.
 */

const HERO_DISMISS_KEY = 'lofty-hero-dismissed:v1';
const HERO_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000;

export function StarMap({ onViewToggle }: StarMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [hoveredConstellation, setHoveredConstellation] = useState<string | null>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dismissedAt = window.localStorage.getItem(HERO_DISMISS_KEY);
    if (!dismissedAt) return;
    const elapsed = Date.now() - Number.parseInt(dismissedAt, 10);
    if (Number.isFinite(elapsed) && elapsed < HERO_COOLDOWN_MS) {
      setHeroVisible(false);
    }
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const dismissHero = useCallback(() => {
    setHeroVisible(false);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(HERO_DISMISS_KEY, Date.now().toString());
    }
  }, []);

  // Allow Escape to dismiss the hero without forcing the user to mouse to the
  // "Explore" button. Keyboard equivalence for the same affordance.
  useEffect(() => {
    if (!heroVisible) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dismissHero();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [heroVisible, dismissHero]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0612]"
      onMouseMove={handleMouseMove}
    >
      <h1 className="sr-only">
        Lofty Labz &mdash; A digital lab in Phoenix. Every engagement, in writing.
      </h1>

      <OptimizedStarfield mousePosition={mousePosition} />

      <main
        id="main-content"
        aria-label="Constellation map of Lofty Labz services"
        className="absolute inset-0"
      >
        <ConstellationField
          constellations={constellations}
          hoveredConstellation={hoveredConstellation}
          onHover={setHoveredConstellation}
          opacity={heroVisible ? 0.25 : 1}
          interactive={!heroVisible}
        />
      </main>

      <AnimatePresence>
        {heroVisible && <Hero key="hero" onExploreMap={dismissHero} />}
      </AnimatePresence>

      {/* Persistent UI - Top Bar (always visible from frame 1) */}
      <motion.header
        role="banner"
        className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          to="/"
          className="focus-ring flex items-center gap-3 cursor-pointer min-w-[44px] min-h-[44px] rounded-md"
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

        <NorthStar />

        <motion.button
          onClick={onViewToggle}
          className="focus-ring flex items-center gap-2 px-4 py-3 min-h-[44px] border border-[var(--border)] rounded-md hover:bg-[var(--purple-700)] transition-colors cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98, y: 1 }}
          aria-label="Toggle between star map and list view"
        >
          <span className="text-sm">&#9733; Map</span>
          <span className="text-sm opacity-50">|</span>
          <span className="text-sm">&#9776; List</span>
        </motion.button>
      </motion.header>

      <AnimatePresence>
        {!heroVisible && (
          <motion.div
            key="cta"
            className="absolute bottom-8 right-8 z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/hailing-frequency">
              <motion.button
                className="focus-ring px-6 py-3 min-h-[44px] bg-[var(--purple-500)] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98, y: 1 }}
              >
                Book a call &rarr;
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!heroVisible && (
          <motion.div
            key="coords"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CoordinatesHUD mousePosition={mousePosition} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
