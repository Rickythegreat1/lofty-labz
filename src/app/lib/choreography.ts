/**
 * Central choreography score for the entire site.
 *
 * Every entry, exit, hover, and selection animation reads its timing and
 * variant shape from this file. Components should not invent durations or
 * delays inline — if a value is missing here, add it here first, then use it.
 *
 * The score follows Skyrim-inspired UX principles:
 *   1. Progressive disclosure: points → relationships → meaning.
 *   2. Selective brightness with preserved orientation.
 *   3. Slow, deliberate pacing (long-arc easings).
 *   4. Symmetric reversibility (exits mirror entries).
 *   5. One focal point at a time.
 */
import type { Transition, Variants } from 'motion/react';
import { springs } from './motion';

export const EASE_OUT_QUART = [0.32, 0.72, 0, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/** Master timing constants in seconds. */
export const TIMING = {
  /** First star fade duration. */
  starFade: 0.5,
  /** Per-constellation cascade offset on initial reveal. */
  constellationOffset: 0.08,
  /** Per-star cascade offset within a constellation. */
  starOffset: 0.04,
  /** Path-draw duration for connecting lines. */
  lineDraw: 0.6,
  /** Label fade-in once stars and lines are settled. */
  labelFade: 0.4,
  /** Section reveal between waves (promise → offerings → stars → process). */
  sectionWave: 0.1,
  /** Section reveal duration per wave. */
  sectionFade: 0.6,
  /** Selection transition (chosen lifts, others dim). */
  selectExpand: 0.6,
  selectDim: 0.4,
  /** Caption disclosure delay after constellation hover. */
  hoverCaptionDelay: 0.6,
} as const;

/**
 * Constellation arrival variants.
 *
 * Custom data passed as `custom={constellationIndex}` so each constellation
 * gets a deterministic delay computed from its position in the cluster.
 */
export const constellationArrival: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (index: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.8 + index * TIMING.constellationOffset,
      duration: 0.8,
      ease: EASE_OUT_QUART,
    },
  }),
};

/**
 * Star arrival variants — used inside a constellation.
 *
 * Custom is the star index within the constellation. The star itself fades in,
 * with a brass glow ring that contracts into the white core. Implemented as
 * two motion children inside one button.
 */
export const starArrival: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: (index: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: index * TIMING.starOffset,
      duration: TIMING.starFade,
      ease: EASE_OUT_QUART,
    },
  }),
};

/**
 * Constellation focal states.
 *
 * `idle`     — default at-rest state on the map.
 * `dimmed`   — sibling constellations when one is expanded.
 * `expanded` — the chosen constellation (lifts to center, scales up).
 */
export const constellationFocal: Variants = {
  idle: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { ...springs.panel },
  },
  dimmed: {
    opacity: 0.12,
    scale: 0.85,
    filter: 'blur(4px)',
    transition: {
      duration: TIMING.selectDim,
      ease: EASE_OUT_QUART,
    },
  },
  expanded: {
    opacity: 1,
    scale: 1.0,
    filter: 'blur(0px)',
    transition: { ...springs.panel },
  },
};

/**
 * Section content reveal variants. Used by ConstellationDetail and similar
 * scroll-revealed sections. `custom` is the wave index (promise=0,
 * offerings=1, stars=2, process=3) so each wave staggers in order.
 */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (wave: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: wave * TIMING.sectionWave,
      duration: TIMING.sectionFade,
      ease: EASE_OUT_QUART,
    },
  }),
};

/**
 * Reveal stagger for groups of items inside a section. Apply to a parent
 * with this variant and let children use `revealItem`.
 */
export const revealStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_QUART },
  },
};

/**
 * Star panel slide-in (workstream D). Slides from right; honors
 * prefers-reduced-motion via MotionConfig in App.
 */
export const starPanelSlide: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { ...springs.panel },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.3, ease: EASE_OUT_QUART },
  },
};

/** Caption fade-in once a constellation has been hovered for `hoverCaptionDelay`. */
export const hoverCaption: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: TIMING.hoverCaptionDelay,
      duration: 0.22,
      ease: EASE_OUT_QUART,
    },
  },
};

/**
 * Compute the radial outward direction a dimmed constellation should drift,
 * given its position and the expanded constellation's position. Returns a
 * normalized {x, y} offset in viewport-percent units, scaled by `magnitude`.
 */
export function radialOutward(
  from: { x: number; y: number },
  center: { x: number; y: number },
  magnitude: number = 6
): { x: number; y: number } {
  const dx = from.x - center.x;
  const dy = from.y - center.y;
  const len = Math.hypot(dx, dy) || 1;
  return {
    x: (dx / len) * magnitude,
    y: (dy / len) * magnitude,
  };
}

/** Convenience: a Transition that disables motion when consumed inside reduced-motion mode. */
export const instantTransition: Transition = {
  duration: 0.001,
};
