import { motion, useScroll, useSpring } from 'motion/react';

/**
 * Brass scroll-progress indicator pinned to the very top of the viewport.
 * Reads window scroll via Motion's useScroll, smoothed with a spring so
 * it doesn't twitch on rapid wheel events. Renders nothing visually
 * substantial until the user actually starts scrolling.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[150] h-[2px] origin-left bg-[var(--brass)] pointer-events-none"
      style={{ scaleX, opacity: 0.85 }}
    />
  );
}
