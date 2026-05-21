/**
 * Phase 3F / 3G shared motion presets.
 *
 * One source of truth for spring physics across the app. Components import
 * from here so a single change propagates everywhere — and so a future
 * useReducedMotion wrapper can mute every spring in one place if needed.
 */
import type { Transition } from 'motion/react';

export const springs = {
  /** Default UI spring for hovers and small position changes. */
  ui: { type: 'spring', stiffness: 280, damping: 24 } as const satisfies Transition,
  /** Snappy spring for press-down feedback. */
  press: { type: 'spring', stiffness: 420, damping: 28 } as const satisfies Transition,
  /** Slower, statelier spring for panel entries. */
  panel: { type: 'spring', stiffness: 180, damping: 26, mass: 0.9 } as const satisfies Transition,
  /** Smooth tween for opacity-only transitions. */
  fade: { duration: 0.3, ease: [0.32, 0.72, 0, 1] } as const satisfies Transition,
} as const;

/** Standard hover scale used on interactive star/CTA elements. */
export const HOVER_SCALE = 1.15;

/** Press translation used on every bespoke CTA button. */
export const PRESS_OFFSET_Y = 1;
