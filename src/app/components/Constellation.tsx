import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { HOVER_SCALE, springs } from '../lib/motion';
import {
  TIMING,
  EASE_OUT_QUART,
  constellationArrival,
  starArrival,
  hoverCaption,
} from '../lib/choreography';

interface Star {
  id: string;
  name: string;
  metric: string;
  x: number;
  y: number;
}

interface ShapeAnchor {
  x: number;
  y: number;
}

interface ConstellationProps {
  id: string;
  name: string;
  practice: string;
  tagline: string;
  description: string;
  position: { x: number; y: number };
  stars: Star[];
  /** Optional glyph descriptor. When present, lines follow `edges` and
      `anchors` add non-interactive shape points to complete the silhouette. */
  shape?: {
    anchors: ShapeAnchor[];
    edges: [number, number][];
  };
  /** Index in the cluster (0..n-1). Drives the arrival cascade. */
  index: number;
  /** True only for the chosen constellation when one is expanded. */
  isExpanded: boolean;
  /** True for any sibling that isn't the expanded one. */
  isDimmed: boolean;
  /** Radial offset (% of viewport) — drift direction when dimmed. */
  dimmedOffset: { x: number; y: number };
  /** Right-edge StarPanel is open AND this is the expanded constellation —
      shift the lift target left so the constellation doesn't sit under the panel. */
  panelOpen: boolean;
  /** Hover state, driven by parent so siblings can respond. */
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  /** Click the constellation's label or body — opens the expanded view. */
  onSelect: () => void;
  /** Click a star — opens the case-study panel within the expanded view. */
  onStarSelect: (starId: string) => void;
  /** Whether stars should navigate (true on the map) or open the panel (true when expanded). */
  starsOpenPanel: boolean;
}

export function Constellation({
  id,
  name,
  practice,
  tagline,
  description,
  position,
  stars,
  shape,
  index,
  isExpanded,
  isDimmed,
  dimmedOffset,
  panelOpen,
  isHovered,
  onHover,
  onLeave,
  onSelect,
  onStarSelect,
  starsOpenPanel,
}: ConstellationProps) {
  const [activeStar, setActiveStar] = useState<string | null>(null);
  const navigate = useNavigate();

  // Compute target FLIP-like translation when expanded.
  //   - Default expanded position: (50vw, 22vh).
  //   - With StarPanel open, shift the center left to (28vw, 22vh) so the
  //     constellation lives in the left half — not behind the panel.
  const targetX = panelOpen ? 28 : 50;
  const targetY = 22;
  const expandedDx = isExpanded ? targetX - position.x : 0;
  const expandedDy = isExpanded ? targetY - position.y : 0;

  // Idle / hover / focal-state interplay. We slightly DROP the expanded
  // scale to 1.25 so the lifted constellation doesn't crowd its own
  // section content beneath it.
  const targetScale = isExpanded ? 1.25 : isDimmed ? 0.85 : 1;
  const targetOpacity = isDimmed ? 0.12 : 1;
  const targetBlur = isDimmed ? 'blur(4px)' : 'blur(0px)';

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: isExpanded ? 30 : isDimmed ? 5 : 10,
        pointerEvents: isDimmed ? 'none' : 'auto',
      }}
      variants={constellationArrival}
      custom={index}
      initial="hidden"
      animate={{
        opacity: targetOpacity,
        scale: targetScale,
        x: `${dimmedOffset.x + expandedDx}vw`,
        y: `${dimmedOffset.y + expandedDy}vh`,
        filter: targetBlur,
      }}
      transition={{
        opacity: { duration: TIMING.selectDim, ease: EASE_OUT_QUART },
        scale: { ...springs.panel },
        x: { ...springs.panel },
        y: { ...springs.panel },
        filter: { duration: TIMING.selectDim, ease: EASE_OUT_QUART },
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Constellation lines.
          - If a `shape` is provided, edges are drawn between any two points
            from the combined [stars, ...anchors] index space. This produces
            representational glyphs (browser, megaphone, gear, etc.).
          - Otherwise, fall back to sequential chaining (legacy behaviour).
       */}
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          left: '-200px',
          top: '-200px',
        }}
      >
        <g transform="translate(200, 200)">
          {(() => {
            // Build a combined points list for edge index resolution.
            const allPoints = [
              ...stars.map((s) => ({ x: s.x, y: s.y })),
              ...(shape?.anchors ?? []),
            ];
            const edges: [number, number][] =
              shape?.edges ??
              // Sequential fallback: chain i → i-1 across all stars.
              stars.slice(1).map((_, i) => [i, i + 1] as [number, number]);

            return edges.map(([a, b], i) => {
              const pa = allPoints[a];
              const pb = allPoints[b];
              if (!pa || !pb) return null;
              const x1 = (pa.x - position.x) * 10;
              const y1 = (pa.y - position.y) * 10;
              const x2 = (pb.x - position.x) * 10;
              const y2 = (pb.y - position.y) * 10;

              return (
                <g key={`edge-${i}`}>
                  <motion.line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="var(--purple-300)"
                    strokeWidth={isExpanded ? 1.6 : 1.3}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: isExpanded ? 0.95 : isHovered ? 0.8 : 0.55,
                    }}
                    transition={{
                      pathLength: { duration: TIMING.lineDraw, delay: i * 0.04 },
                      opacity: { duration: 0.3 },
                    }}
                  />
                  {(isHovered || isExpanded) && (
                    <motion.line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="var(--brass)"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeDasharray="8 160"
                      initial={{ strokeDashoffset: 168, opacity: 0 }}
                      animate={{
                        strokeDashoffset: [168, 0],
                        opacity: [0, 0.85, 0.85, 0],
                      }}
                      transition={{
                        duration: 2.4,
                        delay: i * 0.12,
                        repeat: Infinity,
                        ease: 'linear',
                        times: [0, 0.1, 0.9, 1],
                      }}
                    />
                  )}
                </g>
              );
            });
          })()}

          {/* Non-interactive shape anchors — dim 2px brass dots that
              complete the glyph silhouette where there aren't enough real
              case-study stars. */}
          {(shape?.anchors ?? []).map((a, i) => {
            const ax = (a.x - position.x) * 10;
            const ay = (a.y - position.y) * 10;
            return (
              <motion.circle
                key={`anchor-${i}`}
                cx={ax}
                cy={ay}
                r={1.6}
                fill="var(--brass)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isExpanded ? 0.7 : isHovered ? 0.55 : 0.35,
                  scale: 1,
                }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.04 }}
              />
            );
          })}
        </g>
      </svg>

      {/* Stars — promoted in z-index when constellation is expanded. */}
      {stars.map((star, i) => {
        const starKey = `${name}-${i}`;
        const isActive = activeStar === starKey;
        // Floaty motion: per-star deterministic phase so the cluster
        // doesn't pulse in sync. Reduced-motion users get static stars
        // via MotionConfig in App.tsx (Motion respects it natively).
        const floatDuration = 7 + (i % 4) * 0.8; // 7.0 – 9.4 seconds
        const floatPhase = (i * 0.31) % 1;

        return (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              left: `${(star.x - position.x) * 10}px`,
              top: `${(star.y - position.y) * 10}px`,
              transform: 'translate(-50%, -50%)',
              zIndex: isExpanded ? 50 : 1,
            }}
            variants={starArrival}
            custom={i}
            initial="hidden"
            animate="visible"
          >
            {/* Floaty inner wrapper — orbits the star dot ±1.5px in a slow
                ellipse without disturbing the underlying line geometry
                (lines remain anchored at the star's grid position). */}
            <motion.div
              animate={{
                x: [0, 1.2, 0, -1.2, 0],
                y: [0, -1.6, 0, 1.6, 0],
              }}
              transition={{
                duration: floatDuration,
                delay: floatPhase * floatDuration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ width: '100%', height: '100%' }}
            >
            <motion.button
              className="focus-ring focus-lift w-11 h-11 flex items-center justify-center cursor-pointer relative rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                if (starsOpenPanel) {
                  onStarSelect(star.id);
                } else {
                  navigate(`/star/${star.id}`);
                }
              }}
              onMouseEnter={() => setActiveStar(starKey)}
              onMouseLeave={() => setActiveStar(null)}
              whileHover={{ scale: HOVER_SCALE }}
              whileTap={{ scale: 0.95 }}
              transition={springs.ui}
              aria-label={`View case study: ${star.name} — ${star.metric}`}
            >
              <motion.div
                className="rounded-full"
                animate={{
                  width: isExpanded ? 12 : 8,
                  height: isExpanded ? 12 : 8,
                  backgroundColor: '#faf7fb',
                  boxShadow: isActive
                    ? '0 0 24px rgba(250, 247, 251, 0.9), 0 0 48px rgba(201, 169, 97, 0.35)'
                    : isExpanded
                    ? '0 0 14px rgba(250, 247, 251, 0.55), 0 0 30px rgba(201, 169, 97, 0.25)'
                    : '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
                transition={springs.ui}
              />

              {/* Tooltip on star hover — flat type, no card chrome. A 1px
                  brass top-rule reads as instrument-panel tag rather than
                  a balloon. Hidden when the StarPanel is the affordance
                  for this star (avoids duplicate identity in expanded mode). */}
              <AnimatePresence>
                {isActive && !starsOpenPanel && (
                  <motion.div
                    className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-center z-10 pointer-events-none"
                    style={{
                      textShadow: '0 1px 8px rgba(10, 6, 18, 0.95), 0 0 18px rgba(10, 6, 18, 0.8)',
                    }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="h-px w-8 bg-[var(--brass)] mx-auto mb-1.5 opacity-70" />
                    <div className="font-display text-sm leading-tight text-[var(--paper)]">{star.name}</div>
                    <div className="text-[var(--lavender-200)] text-[11px] mt-0.5">{star.metric}</div>
                    <div className="text-[var(--brass)] text-[9px] mt-1 font-mono uppercase tracking-[0.18em]">
                      View case study →
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Constellation name + practice line. The whole lockup is the
          select-affordance — clicking it expands the constellation. */}
      <motion.button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className="focus-ring focus-lift rounded-md absolute left-1/2 -translate-x-1/2 top-full mt-8 cursor-pointer w-[260px]"
        aria-label={`Enter the ${name} constellation — ${practice}`}
        aria-expanded={isExpanded}
        whileTap={{ scale: 0.98, y: 1 }}
      >
        <motion.div
          className="text-center"
          animate={{ opacity: isExpanded ? 1 : isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          <div className="font-display text-lg leading-tight whitespace-nowrap">{name}</div>
          <div className="text-[10px] tracking-[0.18em] uppercase font-mono text-[var(--brass)] mt-1 leading-tight">
            {practice}
          </div>
          <AnimatePresence>
            {isHovered && !isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="text-xs text-[var(--lavender-200)] max-w-[220px] mx-auto"
              >
                {description}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isHovered && !isExpanded && (
              <motion.div
                variants={hoverCaption}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="text-[10px] mt-2 font-mono uppercase tracking-[0.18em] text-[var(--brass)]"
              >
                Click to enter →
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>

      {/* tagline-as-context — only visible when this constellation IS the expanded one.
          Sits beneath the lifted constellation so the lifted stars stay above. */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-full mt-24 w-[min(640px,86vw)] text-center pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: EASE_OUT_QUART, delay: 0.3 }}
          >
            <p className="text-sm text-[var(--lavender-200)] leading-relaxed">
              {tagline}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
