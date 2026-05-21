import { useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface CoordinatesHUDProps {
  mousePosition: { x: number; y: number };
  /** When a constellation is expanded, the HUD swaps to its identity. */
  expandedConstellation?: {
    name: string;
    position: { x: number; y: number };
  } | null;
}

/**
 * Phoenix coordinates rendered as an instrument readout.
 *
 * Default state: drifting LAT / LON ticks around Phoenix center (33.45° N,
 * 112.07° W) — the hundredths digit moves with mouse parallax.
 *
 * Expanded state: when a constellation is open, the HUD swaps to that
 * constellation's identity and its `position` coordinates. Matches the
 * instrument-panel vocabulary: the readout always reflects where the user
 * is in the space.
 */
export function CoordinatesHUD({ mousePosition, expandedConstellation }: CoordinatesHUDProps) {
  const { latHundredths, lonHundredths } = useMemo(() => {
    const latOffset = (mousePosition.y - 50) / 50;
    const lonOffset = (mousePosition.x - 50) / 50;
    return {
      latHundredths: Math.max(0, Math.min(9, Math.round(5 + latOffset))),
      lonHundredths: Math.max(0, Math.min(9, Math.round(7 + lonOffset))),
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <div
      className="absolute bottom-8 left-8 z-30 font-mono text-xs hidden md:flex items-center gap-3 select-none"
      aria-hidden="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        {expandedConstellation ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3"
          >
            <span className="text-[var(--brass)] tracking-[0.18em] uppercase">FOCAL</span>
            <span className="text-[var(--paper)] uppercase tracking-wider">
              {expandedConstellation.name}
            </span>
            <span className="text-[var(--purple-300)] opacity-50">·</span>
            <span className="text-[var(--brass)] tracking-[0.18em] uppercase">X</span>
            <span className="text-[var(--paper)] tabular-nums">
              {expandedConstellation.position.x.toFixed(0).padStart(2, '0')}
            </span>
            <span className="text-[var(--brass)] tracking-[0.18em] uppercase">Y</span>
            <span className="text-[var(--paper)] tabular-nums">
              {expandedConstellation.position.y.toFixed(0).padStart(2, '0')}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="phoenix"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-3"
          >
            <span className="text-[var(--brass)] tracking-[0.18em] uppercase">LAT</span>
            <span className="text-[var(--paper)] tabular-nums">
              33.4<span className="text-[var(--brass)]">{latHundredths}</span>° N
            </span>
            <span className="text-[var(--purple-300)] opacity-50">·</span>
            <span className="text-[var(--brass)] tracking-[0.18em] uppercase">LON</span>
            <span className="text-[var(--paper)] tabular-nums">
              112.0<span className="text-[var(--brass)]">{lonHundredths}</span>° W
            </span>
            <span className="text-[var(--purple-300)] opacity-50">·</span>
            <span className="text-[var(--brass)] tracking-[0.18em] uppercase">PHX, AZ</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
