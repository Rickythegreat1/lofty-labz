import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface ProcessFlowPhase {
  phase: string;
  name: string;
  duration: string;
  deliverable: string;
  description: string;
}

interface ProcessFlowProps {
  phases: ProcessFlowPhase[];
}

/**
 * Horizontal process diagram. Six phases connected by a brass dashed line
 * that animates its draw on scroll-in. Each phase gets a numbered brass
 * ring, name, duration line, and descriptive body.
 *
 * Replaces the prior card-grid treatment in TheLabPage. The diagram IS the
 * imagery for the process section — no separate decoration needed.
 */
export function ProcessFlow({ phases }: ProcessFlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="space-y-12">
      {/* Diagram rail — connector line + phase markers. */}
      <div className="relative pt-2 pb-10">
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-7 w-full h-px"
          preserveAspectRatio="none"
          viewBox="0 0 100 1"
        >
          <motion.line
            x1="0"
            y1="0.5"
            x2="100"
            y2="0.5"
            stroke="var(--brass)"
            strokeWidth="0.3"
            strokeDasharray="1.4 1.6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
          />
        </svg>
        <ol className="relative grid grid-cols-3 md:grid-cols-6 gap-y-6">
          {phases.map((phase, i) => (
            <motion.li
              key={phase.phase}
              className="flex flex-col items-center text-center px-2"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: i * 0.08 + 0.2, duration: 0.4 }}
            >
              <span
                className="w-14 h-14 rounded-full border border-[var(--brass)] bg-[#0a0612] flex items-center justify-center font-mono text-sm text-[var(--brass)] mb-3"
                aria-hidden="true"
              >
                {phase.phase}
              </span>
              <p className="font-display text-sm leading-tight">{phase.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--purple-300)] mt-1">
                {phase.duration}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Long-form descriptions stacked below the rail — no cards. */}
      <div className="space-y-8 max-w-3xl mx-auto">
        {phases.map((phase, i) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: i * 0.05 + 0.6, duration: 0.45 }}
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-mono text-xs text-[var(--brass)] tracking-[0.18em]">
                {phase.phase}
              </span>
              <h3 className="font-display text-2xl leading-tight">{phase.name}</h3>
              <span className="font-mono text-xs text-[var(--purple-300)] tracking-wider">
                {phase.duration}
              </span>
            </div>
            <p className="text-sm text-[var(--lavender-200)] mb-2">
              <span className="font-mono text-[10px] text-[var(--brass)] uppercase tracking-wider mr-2">
                Deliverable
              </span>
              {phase.deliverable}
            </p>
            <p className="text-base text-[var(--lavender-200)] leading-relaxed">
              {phase.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
