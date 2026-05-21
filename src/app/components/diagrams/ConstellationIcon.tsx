import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

type IconKind = 'build' | 'voice' | 'signal' | 'engine' | 'lighthouse' | 'reel';

interface ConstellationIconProps {
  /** Which practice glyph to draw. Mirrors constellation.id without the 'the-' prefix. */
  kind: IconKind;
  /** Optional size override. Default 96px. */
  size?: number;
}

/**
 * Schematic brass-on-dark single-line icon for each constellation practice.
 * Same drawing family as [ManifestoPillar](./ManifestoPillar.tsx) — every
 * stroke path-draws on scroll-in for a cohesive in-view reveal.
 *
 * Used in [ListView](../ListView.tsx) to give each constellation row a
 * visual anchor that differentiates it from neighbors without re-using
 * the actual map glyph (which is the constellation itself).
 */
export function ConstellationIcon({ kind, size = 96 }: ConstellationIconProps) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const stroke = 'var(--brass)';
  const lineProps = {
    stroke,
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none' as const,
  };
  const initial = { pathLength: 0, opacity: 0 };
  const animate = inView ? { pathLength: 1, opacity: 0.9 } : initial;
  const transition = { duration: 1.2, ease: [0.32, 0.72, 0, 1] as const };

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      className="overflow-visible shrink-0"
    >
      {kind === 'build' && <BuildIcon initial={initial} animate={animate} transition={transition} stroke={stroke} lineProps={lineProps} inView={inView} />}
      {kind === 'voice' && <VoiceIcon initial={initial} animate={animate} transition={transition} stroke={stroke} lineProps={lineProps} inView={inView} />}
      {kind === 'signal' && <SignalIcon initial={initial} animate={animate} transition={transition} stroke={stroke} lineProps={lineProps} inView={inView} />}
      {kind === 'engine' && <EngineIcon initial={initial} animate={animate} transition={transition} stroke={stroke} lineProps={lineProps} inView={inView} />}
      {kind === 'lighthouse' && <LighthouseIcon initial={initial} animate={animate} transition={transition} stroke={stroke} lineProps={lineProps} inView={inView} />}
      {kind === 'reel' && <ReelIcon initial={initial} animate={animate} transition={transition} stroke={stroke} lineProps={lineProps} inView={inView} />}
    </svg>
  );
}

type IconChildProps = {
  initial: { pathLength: number; opacity: number };
  animate: { pathLength: number; opacity: number };
  transition: { duration: number; ease: readonly [number, number, number, number] };
  stroke: string;
  lineProps: {
    stroke: string;
    strokeWidth: number;
    strokeLinecap: 'round';
    strokeLinejoin: 'round';
    fill: 'none';
  };
  inView: boolean;
};

/** The Build — browser window frame with a cursor caret inside. */
function BuildIcon({ initial, animate, transition, stroke, lineProps, inView }: IconChildProps) {
  return (
    <>
      <motion.rect
        x="14"
        y="22"
        width="72"
        height="56"
        rx="2"
        initial={initial}
        animate={animate}
        transition={transition}
        {...lineProps}
      />
      <motion.line
        x1="14"
        y1="34"
        x2="86"
        y2="34"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.3 }}
        {...lineProps}
      />
      <motion.circle
        cx="22"
        cy="28"
        r="1.5"
        fill={stroke}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 0.9, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 0.5 }}
      />
      <motion.circle
        cx="28"
        cy="28"
        r="1.5"
        fill={stroke}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 0.9, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 0.6 }}
      />
      <motion.circle
        cx="34"
        cy="28"
        r="1.5"
        fill={stroke}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 0.9, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 0.7 }}
      />
      {/* Cursor caret inside */}
      <motion.path
        d="M40 50 L40 64 M40 64 L36 60 M40 64 L44 60"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.8 }}
        {...lineProps}
      />
      <motion.line
        x1="50"
        y1="56"
        x2="74"
        y2="56"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.95 }}
        {...lineProps}
        strokeWidth={0.8}
        opacity={0.55}
      />
      <motion.line
        x1="50"
        y1="62"
        x2="68"
        y2="62"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 1.05 }}
        {...lineProps}
        strokeWidth={0.8}
        opacity={0.55}
      />
    </>
  );
}

/** The Voice — megaphone profile with rays. */
function VoiceIcon({ initial, animate, transition, stroke, lineProps, inView }: IconChildProps) {
  void stroke;
  void inView;
  return (
    <>
      <motion.path
        d="M22 38 L46 38 L72 22 L72 78 L46 62 L22 62 Z"
        initial={initial}
        animate={animate}
        transition={transition}
        {...lineProps}
      />
      <motion.path
        d="M76 36 Q86 50 76 64"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.4 }}
        {...lineProps}
      />
      <motion.path
        d="M82 28 Q96 50 82 72"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.55 }}
        {...lineProps}
        opacity={0.6}
      />
    </>
  );
}

/** The Signal — broadcast tower with three signal arcs. */
function SignalIcon({ initial, animate, transition, stroke, lineProps, inView }: IconChildProps) {
  void inView;
  return (
    <>
      {/* Tower base + spire */}
      <motion.path
        d="M50 20 L50 78 M38 78 L62 78 M44 52 L56 52 M42 38 L58 38"
        initial={initial}
        animate={animate}
        transition={transition}
        {...lineProps}
      />
      <motion.circle
        cx="50"
        cy="18"
        r="2"
        fill={stroke}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 0.4 }}
      />
      {/* Signal arcs */}
      <motion.path
        d="M30 28 Q24 16 30 8"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.5 }}
        {...lineProps}
        opacity={0.7}
      />
      <motion.path
        d="M70 28 Q76 16 70 8"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.5 }}
        {...lineProps}
        opacity={0.7}
      />
      <motion.path
        d="M22 26 Q14 12 22 -2"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.7 }}
        {...lineProps}
        opacity={0.4}
      />
      <motion.path
        d="M78 26 Q86 12 78 -2"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.7 }}
        {...lineProps}
        opacity={0.4}
      />
    </>
  );
}

/** The Engine — cog with central dot. */
function EngineIcon({ initial, animate, transition, stroke, lineProps, inView }: IconChildProps) {
  void inView;
  // Build cog teeth as a single path of radial spokes around an inner circle.
  const teeth = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * Math.PI) / 4;
    const inner = 24;
    const outer = 38;
    const x1 = 50 + Math.cos(angle) * inner;
    const y1 = 50 + Math.sin(angle) * inner;
    const x2 = 50 + Math.cos(angle) * outer;
    const y2 = 50 + Math.sin(angle) * outer;
    return `M${x1} ${y1} L${x2} ${y2}`;
  }).join(' ');

  return (
    <>
      <motion.circle
        cx="50"
        cy="50"
        r="24"
        initial={initial}
        animate={animate}
        transition={transition}
        {...lineProps}
      />
      <motion.path
        d={teeth}
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.4 }}
        {...lineProps}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="6"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.7 }}
        {...lineProps}
      />
      <motion.circle
        cx="50"
        cy="50"
        r="2"
        fill={stroke}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 0.9 }}
      />
    </>
  );
}

/** The Lighthouse — tower silhouette with three beam arcs. */
function LighthouseIcon({ initial, animate, transition, stroke, lineProps, inView }: IconChildProps) {
  void stroke;
  void inView;
  return (
    <>
      {/* Tower */}
      <motion.path
        d="M42 30 L42 82 L58 82 L58 30 Z M40 26 L60 26 M44 26 L44 22 L56 22 L56 26"
        initial={initial}
        animate={animate}
        transition={transition}
        {...lineProps}
      />
      <motion.line
        x1="42"
        y1="50"
        x2="58"
        y2="50"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.3 }}
        {...lineProps}
        opacity={0.6}
      />
      {/* Three beam arcs sweeping right */}
      <motion.path
        d="M62 26 Q74 30 78 38"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.5 }}
        {...lineProps}
        opacity={0.85}
      />
      <motion.path
        d="M62 22 Q80 24 90 30"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.65 }}
        {...lineProps}
        opacity={0.55}
      />
      <motion.path
        d="M62 18 Q86 18 96 22"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.8 }}
        {...lineProps}
        opacity={0.3}
      />
    </>
  );
}

/** The Reel — film reel face: outer ring + sprocket holes + central spindle. */
function ReelIcon({ initial, animate, transition, stroke, lineProps, inView }: IconChildProps) {
  void stroke;
  // Six sprocket holes evenly around the rim
  const sprockets = Array.from({ length: 6 }).map((_, i) => {
    const angle = (i * Math.PI) / 3 - Math.PI / 2;
    const r = 26;
    return { cx: 50 + Math.cos(angle) * r, cy: 50 + Math.sin(angle) * r };
  });
  return (
    <>
      {/* Outer rim */}
      <motion.circle
        cx="50"
        cy="50"
        r="34"
        initial={initial}
        animate={animate}
        transition={transition}
        {...lineProps}
      />
      {/* Inner rim */}
      <motion.circle
        cx="50"
        cy="50"
        r="20"
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.3 }}
        {...lineProps}
        opacity={0.6}
      />
      {/* Sprocket holes around the rim */}
      {sprockets.map((s, i) => (
        <motion.circle
          key={i}
          cx={s.cx}
          cy={s.cy}
          r="2.4"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 0.9, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 0.5 + i * 0.05 }}
          fill="var(--brass)"
        />
      ))}
      {/* Center spindle */}
      <motion.circle
        cx="50"
        cy="50"
        r="3"
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ delay: 0.9 }}
        fill="var(--brass)"
      />
    </>
  );
}

/** Map a Constellation id to its icon kind. */
export const ICON_FOR: Record<string, IconKind> = {
  'the-build': 'build',
  'the-voice': 'voice',
  'the-signal': 'signal',
  'the-engine': 'engine',
  'the-lighthouse': 'lighthouse',
  'the-reel': 'reel',
};
