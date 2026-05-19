import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface OptimizedStarfieldProps {
  mousePosition: { x: number; y: number };
}

interface FieldStar {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  parallax: number;
}

const DEEP_STAR_COUNT = 200;
const MID_STAR_COUNT = 30; // Phase 3E — tune up only after throttled-CPU 60fps verified.

/**
 * Phase 3E — multi-layer parallax starfield.
 *
 * Two distinct depths share a single canvas + rAF loop:
 *   - Deep field   (DEEP_STAR_COUNT, parallax 0.25, r 0.3–1.0)
 *     Tiny, dim, drift slowly. Reads as "far away".
 *   - Mid field    (MID_STAR_COUNT,  parallax 0.60, r 0.8–1.8)
 *     Larger, brighter, twinkle a touch faster. Reads as "closer".
 *
 * Both layers use var(--star-core-glow) (resolved once via getComputedStyle)
 * so theme token changes propagate without canvas rewrites. Mouse parallax
 * is read off a ref so pointer movement does not retear the effect.
 */
export function OptimizedStarfield({ mousePosition }: OptimizedStarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef(mousePosition);
  const starsRef = useRef<FieldStar[]>([]);

  mouseRef.current = mousePosition;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    if (starsRef.current.length === 0) {
      for (let i = 0; i < DEEP_STAR_COUNT; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 0.7 + 0.3,
          opacity: Math.random() * 0.35 + 0.2,
          speed: Math.random() * 0.0005 + 0.0002,
          parallax: 0.25,
        });
      }
      for (let i = 0; i < MID_STAR_COUNT; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.0 + 0.8,
          opacity: Math.random() * 0.4 + 0.45,
          speed: Math.random() * 0.0009 + 0.0004,
          parallax: 0.6,
        });
      }
    }

    // Resolve star color from the theme token once. If --star-core-glow
    // is absent (e.g. in a test renderer), fall back to a paper-tinted rgb.
    const computed = window.getComputedStyle(document.documentElement);
    const tokenColor = computed.getPropertyValue('--star-core-glow').trim();
    const baseColor = tokenColor || 'rgb(250, 247, 251)';
    const matchRgb = baseColor.match(/rgba?\(([^)]+)\)/);
    const rgbTuple = matchRgb
      ? matchRgb[1].split(',').slice(0, 3).map((v) => v.trim()).join(', ')
      : '250, 247, 251';

    let animationFrame = 0;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mx, y: my } = mouseRef.current;
      const offsetX = mx - 50;
      const offsetY = my - 50;

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const pulse = Math.sin(time * star.speed) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(${rgbTuple}, ${star.opacity * pulse})`;
        ctx.beginPath();
        ctx.arc(
          star.x + offsetX * star.parallax,
          star.y + offsetY * star.parallax,
          star.radius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      time += 1;
      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ willChange: 'opacity' }}
    />
  );
}
