import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

type PillarKey = 'proof' | 'motion' | 'ai' | 'phoenix';

interface ManifestoPillarProps {
  /** Which pillar glyph to draw. */
  pillar: PillarKey;
  number: string;
  title: string;
  content: string;
  /** Index — used for alternating layout. */
  index: number;
}

/**
 * Custom SVG glyph + manifesto pillar lockup. Brass-on-dark single-line
 * drawings — same vocabulary as the constellation lines so the four
 * pillars read as siblings of the constellations themselves.
 *
 * Even-indexed pillars: glyph at left, copy at right.
 * Odd-indexed pillars: copy at left, glyph at right.
 */
export function ManifestoPillar({
  pillar,
  number,
  title,
  content,
  index,
}: ManifestoPillarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reverse = index % 2 === 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? 'md:[&>div:first-child]:order-2' : ''}`}
    >
      <div className="flex justify-center">
        <PillarGlyph pillar={pillar} inView={inView} />
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--brass)] mb-3">
          Pillar {number}
        </p>
        <h3 className="font-display text-3xl md:text-4xl leading-tight mb-5">{title}</h3>
        <p className="text-base text-[var(--lavender-200)] leading-relaxed">{content}</p>
      </div>
    </motion.div>
  );
}

function PillarGlyph({ pillar, inView }: { pillar: PillarKey; inView: boolean }) {
  const lineProps = {
    stroke: 'var(--brass)',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    fill: 'none',
  };
  const initial = { pathLength: 0, opacity: 0 };
  const animate = inView ? { pathLength: 1, opacity: 0.85 } : initial;
  const transition = { duration: 1.4, ease: [0.32, 0.72, 0, 1] as const };

  return (
    <svg
      viewBox="0 0 160 160"
      width="180"
      height="180"
      aria-hidden="true"
      className="overflow-visible"
    >
      {pillar === 'proof' && (
        <>
          {/* checkmark inside a square — written, signed, sealed */}
          <motion.rect
            x="20"
            y="20"
            width="120"
            height="120"
            initial={initial}
            animate={animate}
            transition={transition}
            {...lineProps}
          />
          <motion.path
            d="M50 80 L75 105 L115 60"
            initial={initial}
            animate={animate}
            transition={{ ...transition, delay: 0.5 }}
            {...lineProps}
            strokeWidth={2}
          />
          <motion.line
            x1="40"
            y1="125"
            x2="120"
            y2="125"
            initial={initial}
            animate={animate}
            transition={{ ...transition, delay: 0.8 }}
            {...lineProps}
            strokeWidth={0.8}
            opacity={0.4}
          />
        </>
      )}
      {pillar === 'motion' && (
        <>
          {/* radiating arc waves — motion as language */}
          <motion.circle
            cx="80"
            cy="80"
            r="6"
            fill="var(--brass)"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
          />
          {[20, 40, 60].map((r, i) => (
            <motion.path
              key={r}
              d={`M ${80 - r} 80 A ${r} ${r} 0 0 1 ${80 + r} 80`}
              initial={initial}
              animate={animate}
              transition={{ ...transition, delay: 0.3 + i * 0.2 }}
              {...lineProps}
              opacity={0.9 - i * 0.2}
            />
          ))}
        </>
      )}
      {pillar === 'ai' && (
        <>
          {/* node graph — AI as multiplier */}
          {[
            { cx: 30, cy: 40 },
            { cx: 130, cy: 40 },
            { cx: 80, cy: 80 },
            { cx: 30, cy: 120 },
            { cx: 130, cy: 120 },
          ].map((node, i) => (
            <motion.circle
              key={i}
              cx={node.cx}
              cy={node.cy}
              r="6"
              fill="var(--brass)"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            />
          ))}
          {[
            'M30 40 L80 80',
            'M130 40 L80 80',
            'M80 80 L30 120',
            'M80 80 L130 120',
            'M30 40 L130 40',
            'M30 120 L130 120',
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              initial={initial}
              animate={animate}
              transition={{ ...transition, delay: 0.7 + i * 0.05 }}
              {...lineProps}
              opacity={0.5}
            />
          ))}
        </>
      )}
      {pillar === 'phoenix' && (
        <>
          {/* compass rose pointing southwest (Phoenix) */}
          <motion.circle
            cx="80"
            cy="80"
            r="56"
            initial={initial}
            animate={animate}
            transition={transition}
            {...lineProps}
          />
          <motion.path
            d="M80 24 L88 80 L80 136 L72 80 Z"
            initial={initial}
            animate={animate}
            transition={{ ...transition, delay: 0.4 }}
            {...lineProps}
          />
          <motion.path
            d="M24 80 L80 88 L136 80 L80 72 Z"
            initial={initial}
            animate={animate}
            transition={{ ...transition, delay: 0.6 }}
            {...lineProps}
            opacity={0.5}
          />
          {/* Phoenix marker — small star bottom-left quadrant */}
          <motion.path
            d="M52 110 L55 116 L61 117 L57 121 L58 127 L52 124 L46 127 L47 121 L43 117 L49 116 Z"
            fill="var(--brass)"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 1.0, duration: 0.4 }}
          />
        </>
      )}
    </svg>
  );
}
