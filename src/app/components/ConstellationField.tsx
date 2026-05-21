import { motion } from 'motion/react';
import { Constellation } from './Constellation';
import type { Constellation as ConstellationData } from '../data/constellations';
import { radialOutward } from '../lib/choreography';

interface ConstellationFieldProps {
  constellations: ConstellationData[];
  hoveredConstellation: string | null;
  /** When set, that constellation is expanded and all others are dimmed. */
  expandedId: string | null;
  /** Whether the right-edge StarPanel is open — affects the expanded
      constellation's center X target so it doesn't sit under the panel. */
  panelOpen: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  onStarSelect: (starId: string) => void;
  opacity: number;
  interactive: boolean;
}

/**
 * The constellation cluster field.
 *
 * Owns rendering of all five constellations from the single source-of-truth
 * data layer. When `expandedId` is set, that constellation lifts to center
 * and siblings dim + drift outward.
 */
export function ConstellationField({
  constellations,
  hoveredConstellation,
  expandedId,
  panelOpen,
  onHover,
  onSelect,
  onStarSelect,
  opacity,
  interactive,
}: ConstellationFieldProps) {
  const expandedPosition = expandedId
    ? constellations.find((c) => c.id === expandedId)?.position
    : undefined;

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
          .map((s) => ({ id: s.id, name: s.name, metric: s.metric, x: s.x, y: s.y }));

        if (renderableStars.length === 0) return null;

        const isExpanded = expandedId === constellation.id;
        const isDimmed = expandedId !== null && !isExpanded;
        const dimmedOffset =
          isDimmed && expandedPosition
            ? radialOutward(constellation.position, expandedPosition, 8)
            : { x: 0, y: 0 };

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
            shape={constellation.shape}
            index={index}
            isExpanded={isExpanded}
            isDimmed={isDimmed}
            dimmedOffset={dimmedOffset}
            panelOpen={panelOpen && isExpanded}
            isHovered={hoveredConstellation === constellation.id}
            onHover={() => onHover(constellation.id)}
            onLeave={() => onHover(null)}
            onSelect={() => onSelect(constellation.id)}
            onStarSelect={onStarSelect}
            starsOpenPanel={isExpanded}
          />
        );
      })}
    </motion.div>
  );
}
