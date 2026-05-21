import { lazy, Suspense, useEffect, useState } from 'react';

// Lazy-load the lottie-react player so the ~50KB Lottie bundle only
// arrives when a page actually mounts a LottieAnimation. Pages without
// Lottie pay nothing.
const LottiePlayer = lazy(() =>
  import('lottie-react').then((mod) => ({ default: mod.default }))
);

interface LottieAnimationProps {
  /** Path to a Lottie JSON file under /public (e.g. '/lottie/brass-pulse.json'). */
  src: string;
  /** Loop the animation. Default true. */
  loop?: boolean;
  /** Autoplay on mount. Default true. */
  autoplay?: boolean;
  /** Explicit width in pixels — defaults to fill parent. */
  width?: number | string;
  /** Explicit height in pixels — defaults to fill parent. */
  height?: number | string;
  /** Accessible label. Default 'Decorative animation'. */
  ariaLabel?: string;
}

/**
 * Brand-aligned Lottie wrapper.
 *
 * The JSON files in /public/lottie/ are pre-authored in the brass-on-dark
 * line-art palette (brass #c9a961 strokes / fills, no third-party color
 * baked in). When dropping in additional Lottie animations:
 *   1. Pre-process the JSON to swap colors to brass before saving.
 *   2. Keep strokes thin (1-2px) and avoid solid color fills.
 *   3. Loop subtly (3-5 second cycle, no jarring snaps).
 *
 * Honors `prefers-reduced-motion` — the player won't loop on users who've
 * opted out (lottie-react reads the media query natively).
 */
export function LottieAnimation({
  src,
  loop = true,
  autoplay = true,
  width = '100%',
  height = '100%',
  ariaLabel = 'Decorative animation',
}: LottieAnimationProps) {
  // Lottie animation JSON has a complex schema we don't need to model
  // here — `Record<string, unknown>` keeps it loose without leaking `any`.
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .then((data: Record<string, unknown>) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  // If the JSON couldn't be fetched, silently render nothing — the rest of
  // the layout shouldn't reserve space for missing animations.
  if (failed) return null;

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      style={{ width, height, lineHeight: 0 }}
    >
      <Suspense fallback={null}>
        {animationData && (
          <LottiePlayer
            animationData={animationData}
            loop={loop}
            autoplay={autoplay}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </Suspense>
    </div>
  );
}
