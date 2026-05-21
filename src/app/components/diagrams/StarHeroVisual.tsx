import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export type HeroVisualKind =
  | 'cube'        // 3D rotating wireframe cube — Champro Merch Builder
  | 'dashboard'   // bar-chart grid with pulse — EduTrack
  | 'whiteboard'  // interactive board with cursors — Nexus
  | 'pipeline'   // arrow flow / extraction — Champro Asset Pipeline
  | 'film'        // film clapper / frames — Podunkton + Easy Ice
  | 'snowflake'   // crystalline radial — Easy Ice (alt)
  | 'equations';  // math symbols flowing — IUPUI MAC

interface StarHeroVisualProps {
  kind: HeroVisualKind;
  /** Height of the visual block. Default 160 (rich but not overwhelming). */
  height?: number;
}

/**
 * Brass-on-dark schematic hero visual for the StarPanel — same line-art
 * family as ConstellationIcon + ManifestoPillar. Renders at the top of the
 * panel content above the metadata block, gives each real case study a
 * project-specific visual signature without needing real screenshots.
 *
 * Every stroke path-draws on first view; the visual is intentionally
 * subtle (brass, low-fill, line-only) so it doesn't compete with the
 * Receipts row and metadata immediately below.
 */
export function StarHeroVisual({ kind, height = 160 }: StarHeroVisualProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });

  const stroke = 'var(--brass)';
  const lineProps = {
    stroke,
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none' as const,
  };
  const initial = { pathLength: 0, opacity: 0 };
  const animate = inView ? { pathLength: 1, opacity: 0.85 } : initial;
  const transition = { duration: 1.2, ease: [0.32, 0.72, 0, 1] as const };

  return (
    <div
      className="brass-corner relative w-full overflow-hidden"
      style={{ height: `${height}px` }}
    >
      <svg
        ref={ref}
        viewBox="0 0 320 160"
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
        aria-hidden="true"
        className="overflow-visible"
      >
        {kind === 'cube' && <CubeVisual initial={initial} animate={animate} transition={transition} lineProps={lineProps} inView={inView} stroke={stroke} />}
        {kind === 'dashboard' && <DashboardVisual initial={initial} animate={animate} transition={transition} lineProps={lineProps} inView={inView} stroke={stroke} />}
        {kind === 'whiteboard' && <WhiteboardVisual initial={initial} animate={animate} transition={transition} lineProps={lineProps} inView={inView} stroke={stroke} />}
        {kind === 'pipeline' && <PipelineVisual initial={initial} animate={animate} transition={transition} lineProps={lineProps} inView={inView} stroke={stroke} />}
        {kind === 'film' && <FilmVisual initial={initial} animate={animate} transition={transition} lineProps={lineProps} inView={inView} stroke={stroke} />}
        {kind === 'snowflake' && <SnowflakeVisual initial={initial} animate={animate} transition={transition} lineProps={lineProps} inView={inView} stroke={stroke} />}
        {kind === 'equations' && <EquationsVisual initial={initial} animate={animate} transition={transition} lineProps={lineProps} inView={inView} stroke={stroke} />}
      </svg>
    </div>
  );
}

type ChildProps = {
  initial: { pathLength: number; opacity: number };
  animate: { pathLength: number; opacity: number };
  transition: { duration: number; ease: readonly [number, number, number, number] };
  lineProps: {
    stroke: string;
    strokeWidth: number;
    strokeLinecap: 'round';
    strokeLinejoin: 'round';
    fill: 'none';
  };
  inView: boolean;
  stroke: string;
};

/** 3D wireframe cube. Reads as "in-browser 3D customizer."
    Path-draw animation only — SVG group rotation has unreliable
    transform-origin behavior across browsers. */
function CubeVisual({ initial, animate, transition, lineProps }: ChildProps) {
  return (
    <>
      {/* Front face */}
      <motion.path
        d="M120 50 L200 50 L200 110 L120 110 Z"
        initial={initial}
        animate={animate}
        transition={transition}
        {...lineProps}
      />
      {/* Back face (offset for 3D illusion) */}
      <motion.path
        d="M140 35 L220 35 L220 95 L140 95 Z"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.3 }}
        {...lineProps}
        opacity={0.5}
      />
      {/* Connector edges */}
      {[
        'M120 50 L140 35',
        'M200 50 L220 35',
        'M200 110 L220 95',
        'M120 110 L140 95',
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          initial={initial}
          animate={animate}
          transition={{ ...transition, delay: 0.6 + i * 0.05 }}
          {...lineProps}
          opacity={0.6}
        />
      ))}
    </>
  );
}

/** Dashboard bar chart with a pulsing top bar — reads as analytics. */
function DashboardVisual({ initial, animate, transition, lineProps, inView, stroke }: ChildProps) {
  const bars = [
    { x: 80, h: 30 },
    { x: 110, h: 55 },
    { x: 140, h: 40 },
    { x: 170, h: 75 },
    { x: 200, h: 50 },
    { x: 230, h: 90 },
  ];
  return (
    <>
      {/* Axes */}
      <motion.path
        d="M70 30 L70 130 L250 130"
        initial={initial}
        animate={animate}
        transition={transition}
        {...lineProps}
      />
      {/* Bars (rect outlines) */}
      {bars.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={130 - b.h}
          width="14"
          height={b.h}
          initial={initial}
          animate={animate}
          transition={{ ...transition, delay: 0.4 + i * 0.06 }}
          {...lineProps}
        />
      ))}
      {/* Pulse line connecting tops */}
      <motion.path
        d="M87 100 L117 75 L147 90 L177 55 L207 80 L237 40"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.9 }}
        {...lineProps}
        strokeWidth={1.6}
      />
      {/* Pulse dot on highest bar */}
      <motion.circle
        cx="237"
        cy="40"
        r="3"
        fill={stroke}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: [0, 1, 0.4, 1], scale: [0, 1.4, 1, 1.4] } : { opacity: 0, scale: 0 }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 1.2 }}
      />
    </>
  );
}

/** Interactive whiteboard — annotated grid with two cursors. Reads as collaboration. */
function WhiteboardVisual({ initial, animate, transition, lineProps, inView, stroke }: ChildProps) {
  return (
    <>
      {/* Frame */}
      <motion.rect
        x="60"
        y="30"
        width="200"
        height="100"
        initial={initial}
        animate={animate}
        transition={transition}
        {...lineProps}
      />
      {/* Grid */}
      {[80, 100, 120, 140, 160, 180, 200, 220, 240].map((x, i) => (
        <motion.line
          key={`v${i}`}
          x1={x}
          y1="30"
          x2={x}
          y2="130"
          initial={initial}
          animate={animate}
          transition={{ ...transition, delay: 0.3 + i * 0.03 }}
          {...lineProps}
          opacity={0.25}
        />
      ))}
      {[50, 70, 90, 110].map((y, i) => (
        <motion.line
          key={`h${i}`}
          x1="60"
          y1={y}
          x2="260"
          y2={y}
          initial={initial}
          animate={animate}
          transition={{ ...transition, delay: 0.5 + i * 0.03 }}
          {...lineProps}
          opacity={0.25}
        />
      ))}
      {/* Annotation: equation */}
      <motion.path
        d="M85 75 Q105 60 125 80 T165 75"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.9 }}
        {...lineProps}
        strokeWidth={1.6}
      />
      {/* Two cursors */}
      <motion.path
        d="M180 60 L188 78 L195 73 L200 90"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 1.1 }}
        {...lineProps}
        strokeWidth={1.6}
      />
      <motion.circle
        cx="180"
        cy="60"
        r="3"
        fill={stroke}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 1.3 }}
      />
      <motion.path
        d="M225 95 L235 110 L240 103 L248 115"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 1.4 }}
        {...lineProps}
        strokeWidth={1.6}
        opacity={0.6}
      />
      <motion.circle
        cx="225"
        cy="95"
        r="3"
        fill={stroke}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 0.6, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 1.6 }}
      />
    </>
  );
}

/** Asset extraction pipeline — list of files flowing into a target. */
function PipelineVisual({ initial, animate, transition, lineProps, inView, stroke }: ChildProps) {
  const sources = [40, 65, 90, 115];
  return (
    <>
      {/* Source files */}
      {sources.map((y, i) => (
        <motion.rect
          key={i}
          x="40"
          y={y - 6}
          width="36"
          height="12"
          rx="1"
          initial={initial}
          animate={animate}
          transition={{ ...transition, delay: i * 0.1 }}
          {...lineProps}
        />
      ))}
      {/* Flow arrows */}
      {sources.map((y, i) => (
        <motion.path
          key={`arrow-${i}`}
          d={`M80 ${y} L200 80`}
          initial={initial}
          animate={animate}
          transition={{ ...transition, delay: 0.5 + i * 0.08 }}
          {...lineProps}
          opacity={0.6}
        />
      ))}
      {/* Target container */}
      <motion.path
        d="M210 50 L260 50 L260 110 L210 110 Z"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 1.0 }}
        {...lineProps}
        strokeWidth={1.8}
      />
      {/* Indicator pulse */}
      <motion.circle
        cx="235"
        cy="80"
        r="4"
        fill={stroke}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: [0, 1, 0.5, 1], scale: [0, 1.3, 1, 1.3] } : { opacity: 0, scale: 0 }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 1.4 }}
      />
    </>
  );
}

/** Film clapper / frames — reads as motion/animation work. */
function FilmVisual({ initial, animate, transition, lineProps, inView }: ChildProps) {
  return (
    <>
      {/* Filmstrip body */}
      <motion.rect
        x="40"
        y="40"
        width="240"
        height="80"
        initial={initial}
        animate={animate}
        transition={transition}
        {...lineProps}
      />
      {/* Sprocket holes top */}
      {[60, 90, 120, 150, 180, 210, 240, 270].map((x, i) => (
        <motion.rect
          key={`top-${i}`}
          x={x - 4}
          y="48"
          width="8"
          height="8"
          rx="1"
          initial={initial}
          animate={animate}
          transition={{ ...transition, delay: 0.3 + i * 0.04 }}
          {...lineProps}
        />
      ))}
      {/* Sprocket holes bottom */}
      {[60, 90, 120, 150, 180, 210, 240, 270].map((x, i) => (
        <motion.rect
          key={`bot-${i}`}
          x={x - 4}
          y="104"
          width="8"
          height="8"
          rx="1"
          initial={initial}
          animate={animate}
          transition={{ ...transition, delay: 0.5 + i * 0.04 }}
          {...lineProps}
        />
      ))}
      {/* Frame separators */}
      {[100, 160, 220].map((x, i) => (
        <motion.line
          key={`sep-${i}`}
          x1={x}
          y1="62"
          x2={x}
          y2="98"
          initial={initial}
          animate={animate}
          transition={{ ...transition, delay: 0.9 + i * 0.05 }}
          {...lineProps}
          opacity={0.6}
        />
      ))}
      {/* Tiny content marks per frame */}
      {[70, 130, 190, 250].map((x, i) => (
        <motion.circle
          key={`mark-${i}`}
          cx={x}
          cy="80"
          r="3"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 0.9, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 1.1 + i * 0.08 }}
          {...lineProps}
        />
      ))}
    </>
  );
}

/** Snowflake — six-fold radial glyph, evokes Easy Ice.
    Static (no rotation) — relies on path-draw entry animation. */
function SnowflakeVisual({ initial, animate, transition, lineProps }: ChildProps) {
  const arms = Array.from({ length: 6 }).map((_, i) => {
    const angle = (i * Math.PI) / 3;
    const x = Math.cos(angle) * 50;
    const y = Math.sin(angle) * 50;
    return { x, y, angle, delay: 0.2 + i * 0.08 };
  });

  return (
    <g transform="translate(160, 80)">
      {arms.map((a, i) => (
        <motion.g
          key={i}
          initial={initial}
          animate={animate}
          transition={{ ...transition, delay: a.delay }}
        >
          <line x1="0" y1="0" x2={a.x} y2={a.y} {...lineProps} />
          <line
            x1={a.x * 0.7}
            y1={a.y * 0.7}
            x2={a.x * 0.7 + Math.cos(a.angle + Math.PI / 3) * 14}
            y2={a.y * 0.7 + Math.sin(a.angle + Math.PI / 3) * 14}
            {...lineProps}
            opacity={0.7}
          />
          <line
            x1={a.x * 0.7}
            y1={a.y * 0.7}
            x2={a.x * 0.7 + Math.cos(a.angle - Math.PI / 3) * 14}
            y2={a.y * 0.7 + Math.sin(a.angle - Math.PI / 3) * 14}
            {...lineProps}
            opacity={0.7}
          />
        </motion.g>
      ))}
    </g>
  );
}

/** Equations / math glyphs flowing — reads as IUPUI Math Center content. */
function EquationsVisual({ initial, animate, transition, lineProps, inView, stroke }: ChildProps) {
  return (
    <>
      {/* Sigma */}
      <motion.path
        d="M60 50 L100 50 L70 80 L100 110 L60 110"
        initial={initial}
        animate={animate}
        transition={transition}
        {...lineProps}
        strokeWidth={1.8}
      />
      {/* Integral */}
      <motion.path
        d="M125 45 Q135 45 135 60 L135 100 Q135 115 145 115"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.3 }}
        {...lineProps}
        strokeWidth={1.8}
      />
      {/* Equals */}
      <motion.line
        x1="160"
        y1="72"
        x2="195"
        y2="72"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.6 }}
        {...lineProps}
      />
      <motion.line
        x1="160"
        y1="88"
        x2="195"
        y2="88"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.7 }}
        {...lineProps}
      />
      {/* Pi */}
      <motion.path
        d="M210 60 L260 60 M220 60 L220 110 M250 60 L250 110"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.9 }}
        {...lineProps}
        strokeWidth={1.8}
      />
      {/* Result dot animating */}
      <motion.circle
        cx="285"
        cy="80"
        r="4"
        fill={stroke}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: [0, 1, 0.6, 1], scale: [0, 1.3, 1, 1.3] } : { opacity: 0, scale: 0 }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 1.4 }}
      />
    </>
  );
}
