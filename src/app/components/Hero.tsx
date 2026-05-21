import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { springs } from '../lib/motion';

interface HeroProps {
  onExploreMap: () => void;
}

/**
 * Phase 3D — the page's first impression.
 *
 * Replaces the prior 800ms ignition lockup + WelcomePanel pair. Renders at
 * z-20 over the constellation field (which is dimmed and non-interactive
 * underneath). Outer section is pointer-events-none so clicks in the empty
 * corners pass through to the top-bar chrome above; the content card and
 * the dismiss button explicitly opt back into pointer events.
 */
export function Hero({ onExploreMap }: HeroProps) {
  return (
    <motion.section
      aria-labelledby="hero-headline"
      className="absolute inset-0 z-20 flex items-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.panel, delay: 0.1 }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-7">
            PHX, AZ &middot; Digital Lab
          </p>
          <h1
            id="hero-headline"
            className="font-display text-[44px] sm:text-[56px] md:text-[72px] lg:text-[80px] leading-[0.95] tracking-[-0.02em] text-[var(--paper)] mb-6"
          >
            A digital lab in Phoenix. Every engagement, in writing.
          </h1>
          <p className="text-lg md:text-[22px] leading-snug text-[var(--lavender-200)] mb-10 max-w-[520px]">
            Five practices, one written guarantee. Phoenix-based.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-5">
            <Link to="/hailing-frequency">
              <motion.button
                className="focus-ring focus-lift inline-flex items-center gap-3 h-14 px-7 bg-[var(--paper)] text-[var(--purple-900)] rounded-[var(--radius-button)] font-bold text-base shadow-[inset_0_1px_0_0_var(--brass)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98, y: 1 }}
                transition={springs.press}
              >
                Schedule a discovery call
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </Link>
            <Link
              to="/the-north-star"
              className="focus-ring focus-lift rounded-md text-[var(--lavender-200)] hover:text-[var(--paper)] transition-colors"
            >
              <span className="underline-draw">or read the guarantee</span> &rarr;
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={onExploreMap}
        className="focus-ring focus-lift rounded-md absolute bottom-10 left-1/2 -translate-x-1/2 inline-flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--purple-300)] hover:text-[var(--paper)] transition-colors pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        whileHover={{ y: -2 }}
        whileTap={{ y: 1 }}
        aria-label="Dismiss hero and explore the constellation map"
      >
        <span>Explore the constellation map</span>
        <motion.span
          aria-hidden="true"
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.span>
      </motion.button>
    </motion.section>
  );
}
