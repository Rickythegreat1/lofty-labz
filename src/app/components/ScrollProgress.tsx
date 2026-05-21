import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Brass scroll-progress indicator pinned to the very top of the viewport.
 *
 * Reads window scroll via Motion's useScroll, smoothed with a spring so it
 * doesn't twitch on rapid wheel events. Only mounts when there is actual
 * scrollable content — on routes like the map view where scrollHeight ==
 * clientHeight, useScroll's progress reads as NaN and the spring snaps to
 * an arbitrary final value, painting a misleading "fully scrolled" bar.
 * Gating on a measured ResizeObserver keeps the bar honest: invisible on
 * single-screen pages, animated only when there is somewhere to scroll.
 */
export function ScrollProgress() {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const measure = () => {
      const doc = document.documentElement;
      setHasScroll(doc.scrollHeight - window.innerHeight > 1);
    };

    measure();
    window.addEventListener('resize', measure);
    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
    if (document.body) observer.observe(document.body);

    return () => {
      window.removeEventListener('resize', measure);
      observer.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.2,
  });

  if (!hasScroll) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[150] h-[2px] origin-left bg-[var(--brass)] pointer-events-none"
      style={{ scaleX, opacity: 0.85 }}
    />
  );
}
