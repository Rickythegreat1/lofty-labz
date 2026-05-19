import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface OptimizedStarfieldProps {
  mousePosition: { x: number; y: number };
}

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
}

export function OptimizedStarfield({ mousePosition }: OptimizedStarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef(mousePosition);
  const starsRef = useRef<Star[]>([]);

  // Keep the latest mouse position addressable inside the rAF loop without
  // tearing down the render chain on every pointer move.
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
      for (let i = 0; i < 200; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          speed: Math.random() * 0.0005 + 0.0002,
        });
      }
    }

    let animationFrame = 0;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: mx, y: my } = mouseRef.current;
      const parallaxX = (mx - 50) * 0.5;
      const parallaxY = (my - 50) * 0.5;

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const pulse = Math.sin(time * star.speed) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(250, 247, 251, ${star.opacity * pulse})`;
        ctx.beginPath();
        ctx.arc(star.x + parallaxX, star.y + parallaxY, star.radius, 0, Math.PI * 2);
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ willChange: 'opacity' }}
    />
  );
}
