import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';
import { Link } from 'react-router';
import { Constellation } from './Constellation';
import { NorthStar } from './NorthStar';
import { WelcomePanel } from './WelcomePanel';
import { OptimizedStarfield } from './OptimizedStarfield';

interface StarMapProps {
  onViewToggle: () => void;
}

const constellations = [
  {
    id: 'the-build',
    name: 'The Build',
    practice: 'Web design & development',
    tagline: 'Web design & development that performs, or we keep working.',
    description: 'Sites, applications, headless WP, the works.',
    position: { x: 25, y: 35 },
    stars: [
      { name: "Eddie's Trades", metric: '+47% lead-form conversion', x: 22, y: 32 },
      { name: 'Desert Modern Homes', metric: '2.3s load time', x: 27, y: 35 },
      { name: 'PHX Coffee Co', metric: '+89% mobile traffic', x: 24, y: 38 },
    ]
  },
  {
    id: 'the-voice',
    name: 'The Voice',
    practice: 'Brand identity & messaging',
    tagline: 'Brand identity that doesn\'t apologize.',
    description: 'Logo, system, voice, message — the things people remember you by.',
    position: { x: 65, y: 28 },
    stars: [
      { name: 'Bright Path Wellness', metric: '3x social engagement', x: 63, y: 25 },
      { name: 'Valley Ventures', metric: 'Brand refresh', x: 67, y: 28 },
      { name: 'Local Goods Market', metric: '+210% brand recall', x: 65, y: 31 },
    ]
  },
  {
    id: 'the-signal',
    name: 'The Signal',
    practice: 'Social media & content',
    tagline: 'Content that makes the algorithm relevant, not the boss.',
    description: 'Social, content, the rhythm of staying visible.',
    position: { x: 45, y: 55 },
    stars: [
      { name: 'AZ Auto Repair', metric: '12K monthly reach', x: 43, y: 53 },
      { name: 'Cactus Creative', metric: '+340% engagement', x: 47, y: 55 },
      { name: 'Phoenix Fitness', metric: '800+ leads/month', x: 45, y: 58 },
    ]
  },
  {
    id: 'the-engine',
    name: 'The Engine',
    practice: 'AI workflows & automation',
    tagline: 'Workflows that run while you sleep.',
    description: 'AI, automation, micro-APIs — the layer that compounds your team.',
    position: { x: 75, y: 65 },
    stars: [
      { name: 'Invoice Automator', metric: '40hrs saved/month', x: 73, y: 63 },
      { name: 'Lead Qualifier AI', metric: '85% accuracy', x: 77, y: 65 },
      { name: 'Content Pipeline', metric: '10x output', x: 75, y: 68 },
    ]
  },
  {
    id: 'the-lighthouse',
    name: 'The Lighthouse',
    practice: 'Care retainers & ongoing support',
    tagline: 'What happens after launch matters more than the launch.',
    description: 'Care retainers, monitoring, ongoing optimization.',
    position: { x: 15, y: 68 },
    stars: [
      { name: 'Scottsdale Medical', metric: '99.9% uptime', x: 13, y: 66 },
      { name: 'Desert Dining', metric: 'Monthly updates', x: 17, y: 68 },
      { name: 'Valley Tech Hub', metric: '24hr support', x: 15, y: 71 },
    ]
  }
];

export function StarMap({ onViewToggle }: StarMapProps) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [hoveredConstellation, setHoveredConstellation] = useState<string | null>(null);
  const [ignitionComplete, setIgnitionComplete] = useState(false);
  const [logoAnimating, setLogoAnimating] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIgnitionComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Throttle mousemove for performance
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#0a0612]"
      onMouseMove={handleMouseMove}
    >
      <h1 className="sr-only">Lofty Labz — A digital lab in Phoenix. Every engagement backed in writing.</h1>

      {/* Optimized Starfield Background */}
      <OptimizedStarfield mousePosition={mousePosition} />

      {/* Ignition Sequence - Logo */}
      {logoAnimating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <motion.div
              className="flex items-center gap-3"
              animate={{
                scale: 1,
                x: 'calc(-50vw + 80px)',
                y: 'calc(-50vh + 48px)'
              }}
              transition={{ delay: 1.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              onAnimationComplete={() => setLogoAnimating(false)}
            >
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M50 10 A40 40 0 0 1 50 90 Q35 75 35 50 Q35 25 50 10"
                    fill="var(--purple-500)"
                    stroke="none"
                  />
                  <g transform="translate(42, 35)">
                    <rect x="5" y="0" width="10" height="3" fill="var(--paper)" />
                    <path d="M5 3 L5 15 Q10 18 15 15 L15 3" fill="none" stroke="var(--paper)" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
              <span className="font-display text-xl tracking-tight uppercase">Lofty Labz</span>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Persistent UI - Top Bar */}
      {!logoAnimating && (
        <motion.header
          role="banner"
          className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="focus-ring flex items-center gap-3 cursor-pointer min-w-[44px] min-h-[44px] rounded-md"
            aria-label="Return to home"
          >
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50 10 A40 40 0 0 1 50 90 Q35 75 35 50 Q35 25 50 10"
                  fill="var(--purple-500)"
                  stroke="none"
                />
                <g transform="translate(42, 35)">
                  <rect x="5" y="0" width="10" height="3" fill="var(--paper)" />
                  <path d="M5 3 L5 15 Q10 18 15 15 L15 3" fill="none" stroke="var(--paper)" strokeWidth="1.5" />
                </g>
              </svg>
            </div>
            <span className="font-display text-xl tracking-tight uppercase">Lofty Labz</span>
          </Link>

          {/* The North Star */}
          <NorthStar />

          {/* View Toggle */}
          <motion.button
            onClick={onViewToggle}
            className="focus-ring flex items-center gap-2 px-4 py-3 min-h-[44px] border border-[var(--border)] rounded-md hover:bg-[var(--purple-700)] transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98, y: 1 }}
            aria-label="Toggle between star map and list view"
          >
            <span className="text-sm">★ Map</span>
            <span className="text-sm opacity-50">|</span>
            <span className="text-sm">☰ List</span>
          </motion.button>
        </motion.header>
      )}

      {/* Constellations */}
      <main
        id="main-content"
        aria-label="Constellation map of Lofty Labz services"
        className="absolute inset-0"
      >
        <AnimatePresence>
          {ignitionComplete && (
            <>
              {constellations.map((constellation, index) => (
                <Constellation
                  key={constellation.id}
                  {...constellation}
                  delay={0.3 + index * 0.1}
                  isHovered={hoveredConstellation === constellation.id}
                  onHover={() => setHoveredConstellation(constellation.id)}
                  onLeave={() => setHoveredConstellation(null)}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </main>

      {/* Welcome Panel */}
      <AnimatePresence>
        {showWelcome && ignitionComplete && !logoAnimating && (
          <WelcomePanel
            onDismiss={() => setShowWelcome(false)}
            onViewList={onViewToggle}
          />
        )}
      </AnimatePresence>

      {/* Hailing Frequency CTA */}
      {!logoAnimating && (
        <motion.div
          className="absolute bottom-8 right-8 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/hailing-frequency">
            <motion.button
              className="focus-ring px-6 py-3 min-h-[44px] bg-[var(--purple-500)] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98, y: 1 }}
            >
              Book a call →
            </motion.button>
          </Link>
        </motion.div>
      )}

      {/* Coordinates HUD */}
      {!logoAnimating && (
        <motion.div
          className="absolute bottom-8 left-8 z-30 font-mono text-xs text-[var(--purple-300)] hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          LAT 33.4° N · LON 112.1° W · PHX, AZ
        </motion.div>
      )}
    </div>
  );
}