import { useMemo } from 'react';

interface CoordinatesHUDProps {
  mousePosition: { x: number; y: number };
}

/**
 * Phase 3E — Phoenix coordinates rendered as an instrument readout.
 *
 * Baseline 33.45° N, 112.07° W is Phoenix center. The hundredths digit of
 * each axis ticks ±1 across the full viewport so the readout drifts as the
 * cursor moves, the same way a real instrument's last digit wanders. Range
 * intentionally tiny — the user reads it as parallax-driven jitter, not as
 * a counter.
 *
 * JetBrains Mono via the global font stack on `.font-mono`. Color is
 * brass for the static frame and paper for the live digits so the eye
 * picks up the change without losing the frame.
 */
export function CoordinatesHUD({ mousePosition }: CoordinatesHUDProps) {
  const { latHundredths, lonHundredths } = useMemo(() => {
    const latOffset = (mousePosition.y - 50) / 50; // [-1, +1]
    const lonOffset = (mousePosition.x - 50) / 50; // [-1, +1]
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
      <span className="text-[var(--brass)] tracking-[0.18em] uppercase">LAT</span>
      <span className="text-[var(--paper)] tabular-nums">
        33.4<span className="text-[var(--brass)]">{latHundredths}</span>&deg; N
      </span>
      <span className="text-[var(--purple-300)] opacity-50">&middot;</span>
      <span className="text-[var(--brass)] tracking-[0.18em] uppercase">LON</span>
      <span className="text-[var(--paper)] tabular-nums">
        112.0<span className="text-[var(--brass)]">{lonHundredths}</span>&deg; W
      </span>
      <span className="text-[var(--purple-300)] opacity-50">&middot;</span>
      <span className="text-[var(--brass)] tracking-[0.18em] uppercase">PHX, AZ</span>
    </div>
  );
}
