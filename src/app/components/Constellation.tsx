import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';

interface Star {
  name: string;
  metric: string;
  x: number;
  y: number;
}

interface ConstellationProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  position: { x: number; y: number };
  stars: Star[];
  delay: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

export function Constellation({
  id,
  name,
  tagline,
  description,
  position,
  stars,
  delay,
  isHovered,
  onHover,
  onLeave
}: ConstellationProps) {
  const [activeStar, setActiveStar] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Constellation lines */}
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          left: '-200px',
          top: '-200px'
        }}
      >
        <g transform="translate(200, 200)">
          {stars.map((star, i) => {
            if (i === 0) return null;
            const prevStar = stars[i - 1];
            return (
              <motion.line
                key={i}
                x1={(prevStar.x - position.x) * 10}
                y1={(prevStar.y - position.y) * 10}
                x2={(star.x - position.x) * 10}
                y2={(star.y - position.y) * 10}
                stroke="var(--purple-300)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: isHovered ? 0.6 : 0.15
                }}
                transition={{ duration: 0.6 }}
              />
            );
          })}
        </g>
      </svg>

      {/* Stars */}
      {stars.map((star, i) => {
        const starId = `${name}-${i}`;
        const isActive = activeStar === starId;
        const starSlug = star.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${(star.x - position.x) * 10}px`,
              top: `${(star.y - position.y) * 10}px`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <motion.button
              className="w-11 h-11 flex items-center justify-center cursor-pointer relative"
              onClick={() => navigate(`/star/${starSlug}`)}
              onMouseEnter={() => setActiveStar(starId)}
              onMouseLeave={() => setActiveStar(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View case study: ${star.name} - ${star.metric}`}
            >
              <motion.div
                className="w-2 h-2 bg-white rounded-full shadow-lg"
                animate={{
                  scale: isActive ? 1.5 : 1,
                  boxShadow: isActive
                    ? '0 0 20px rgba(255, 255, 255, 0.8)'
                    : '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />

              {/* Star label */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[var(--purple-900)] border border-[var(--border)] rounded px-3 py-1.5 text-xs shadow-xl z-10"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="font-medium">{star.name}</div>
                    <div className="text-[var(--purple-300)] text-[10px]">{star.metric}</div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                      <div className="w-2 h-2 bg-[var(--purple-900)] border-r border-b border-[var(--border)] transform rotate-45" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        );
      })}

      {/* Constellation name */}
      <Link to={`/constellation/${id}`}>
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-full mt-8 text-center cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <div className="font-display text-lg mb-1">{name}</div>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-xs text-[var(--purple-300)] max-w-[200px]"
            >
              {description}
            </motion.div>
          )}
        </motion.div>
      </Link>

      {/* Info card on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute left-full ml-8 top-1/2 -translate-y-1/2 w-64 bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-4 shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 className="font-display text-base mb-2">{name}</h3>
            <p className="text-sm text-[var(--purple-300)] mb-3">{tagline}</p>
            <Link to={`/constellation/${id}`}>
              <button className="text-sm text-white hover:text-[var(--purple-300)] transition-colors">
                Enter {name} →
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
