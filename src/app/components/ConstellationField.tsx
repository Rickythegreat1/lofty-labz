import { motion } from 'motion/react';
import { Constellation } from './Constellation';
import type { Constellation as ConstellationData } from '../data/constellations';

interface ConstellationFieldProps {
  constellations: ConstellationData[];
  hoveredConstellation: string | null;
  onHover: (id: string | null) => void;
  opacity: number;
  interactive: boolean;
}

/**
 * Phase 3D / 3E — the constellation cluster field.
 *
 * Owns rendering of all five constellations from the single source-of-truth
 * data layer (src/app/data/constellations.ts). StarMap no longer duplicates
 * any data inline. Star coordinates from the data file are optional, so we
 * filter to renderable stars (those with both x and y) before handing them
 * down to Constellation.
 */
export function ConstellationField({
  constellations,
  hoveredConstellation,
  onHover,
  opacity,
  interactive,
}: ConstellationFieldProps) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ opacity }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      style={{ pointerEvents: interactive ? 'auto' : 'none' }}
    >
      {constellations.map((constellation, index) => {
        const renderableStars = constellation.stars
          .filter((s): s is typeof s & { x: number; y: number } =>
            typeof s.x === 'number' && typeof s.y === 'number'
          )
          .map((s) => ({ name: s.name, metric: s.metric, x: s.x, y: s.y }));

        if (renderableStars.length === 0) return null;

        return (
          <Constellation
            key={constellation.id}
            id={constellation.id}
            name={constellation.name}
            practice={constellation.practice}
            tagline={constellation.tagline}
            description={constellation.description}
            position={constellation.position}
            stars={renderableStars}
            delay={0.1 + index * 0.08}
            isHovered={hoveredConstellation === constellation.id}
            onHover={() => onHover(constellation.id)}
            onLeave={() => onHover(null)}
          />
        );
      })}
    </motion.div>
  );
}
