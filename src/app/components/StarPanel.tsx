import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Check, X, Github, ExternalLink, Figma } from 'lucide-react';
import type { Constellation } from '../data/constellations';
import { starPanelSlide, sectionReveal, EASE_OUT_QUART } from '../lib/choreography';
import { StarHeroVisual } from './diagrams/StarHeroVisual';

interface StarPanelProps {
  constellation: Constellation;
  starId: string;
  onClose: () => void;
}

/**
 * Right-edge case-study panel.
 *
 * Slides in from the right edge of the viewport when a star is selected
 * inside an expanded constellation. The map and constellation remain visible
 * beneath; the user keeps their orientation in the space.
 *
 * Escape closes this panel without collapsing the constellation (StarMap
 * handles the escape cascade).
 */
export function StarPanel({ constellation, starId, onClose }: StarPanelProps) {
  const star = constellation.stars.find((s) => s.id === starId);

  if (!star) {
    return (
      <motion.aside
        variants={starPanelSlide}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed top-0 right-0 z-50 h-screen w-[min(640px,92vw)] bg-[var(--purple-900)]/95 backdrop-blur-xl border-l border-[var(--glass-border)] shadow-2xl flex items-center justify-center"
      >
        <div className="text-center p-8">
          <h2 className="font-display text-3xl mb-4">Case study not found</h2>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring focus-lift rounded-md text-[var(--purple-300)] hover:text-[var(--paper)] transition-colors underline-draw"
          >
            Return to constellation →
          </button>
        </div>
      </motion.aside>
    );
  }

  return (
    <motion.aside
      variants={starPanelSlide}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed top-0 right-0 z-50 h-screen w-[min(640px,92vw)] bg-[#0a0612]/95 backdrop-blur-xl border-l border-[var(--glass-border)] shadow-2xl overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="star-panel-heading"
    >
      {/* Panel header — brass top edge mirrors .cta-block vocabulary. */}
      <header className="sticky top-0 z-10 bg-[#0a0612]/85 backdrop-blur-xl border-b border-[var(--border)] px-8 py-5 flex items-center justify-between">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--brass)] mb-1 truncate">
            {constellation.name} · {star.projectId}
          </p>
          <h2
            id="star-panel-heading"
            className="font-display text-lg leading-tight truncate"
          >
            {star.name}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="focus-ring focus-lift rounded-md w-10 h-10 flex items-center justify-center text-[var(--purple-300)] hover:text-[var(--paper)] transition-colors shrink-0"
          aria-label="Close case study"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      <div className="px-8 py-10 space-y-12">
        {/* Hero visual — brand-aligned schematic SVG illustration per
            project type. Only rendered for real stars with heroVisual set;
            placeholders skip this entirely so the panel header sits
            directly on top of the metadata block. */}
        {star.heroVisual && (
          <motion.div
            variants={sectionReveal}
            custom={-0.5}
            initial="hidden"
            animate="visible"
          >
            <StarHeroVisual kind={star.heroVisual} height={160} />
          </motion.div>
        )}

        {/* Lab-notebook metadata block — brass corners, no card. */}
        <motion.section
          variants={sectionReveal}
          custom={0}
          initial="hidden"
          animate="visible"
          className="brass-corner p-5 grid grid-cols-2 gap-4 font-mono text-xs"
        >
          <Field label="CLIENT" value={star.client} />
          <Field label="STATUS" value={star.status.toUpperCase()} />
          <Field label="DATE" value={star.date} />
          <Field label="LEAD" value={star.lead} />
          <div className="col-span-2">
            <span className="text-[var(--brass)] tracking-[0.18em]">OUTCOME</span>
            <p className="text-[var(--paper)] mt-1">{star.metric}</p>
          </div>
        </motion.section>

        {/* Receipts — verifiable links for real projects. Hidden entirely
            when no link is present (placeholder case studies). */}
        {(star.liveUrl || star.repoUrl || star.figmaUrl) && (
          <motion.section
            variants={sectionReveal}
            custom={0.5}
            initial="hidden"
            animate="visible"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-3">
              Receipts
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {star.liveUrl && (
                <li>
                  <a
                    href={star.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring focus-lift rounded-md inline-flex items-center gap-2 text-[var(--paper)] hover:text-[var(--brass)] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--brass)]" aria-hidden="true" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--brass)]">
                      LIVE
                    </span>
                    <span className="underline-draw">{shortHost(star.liveUrl)}</span>
                  </a>
                </li>
              )}
              {star.repoUrl && (
                <li>
                  <a
                    href={star.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring focus-lift rounded-md inline-flex items-center gap-2 text-[var(--paper)] hover:text-[var(--brass)] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-[var(--brass)]" aria-hidden="true" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--brass)]">
                      REPO
                    </span>
                    <span className="underline-draw">{shortHost(star.repoUrl)}</span>
                  </a>
                </li>
              )}
              {star.figmaUrl && (
                <li>
                  <a
                    href={star.figmaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring focus-lift rounded-md inline-flex items-center gap-2 text-[var(--paper)] hover:text-[var(--brass)] transition-colors"
                  >
                    <Figma className="w-3.5 h-3.5 text-[var(--brass)]" aria-hidden="true" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--brass)]">
                      FIGMA
                    </span>
                    <span className="underline-draw">{shortHost(star.figmaUrl)}</span>
                  </a>
                </li>
              )}
            </ul>
          </motion.section>
        )}

        <motion.section
          variants={sectionReveal}
          custom={1}
          initial="hidden"
          animate="visible"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-3">
            The Hypothesis
          </p>
          <p className="text-base text-[var(--lavender-200)] leading-relaxed">
            {star.hypothesis}
          </p>
        </motion.section>

        {/* Baseline / Reading two-column comparison. Brass center divider; no card. */}
        <motion.section
          variants={sectionReveal}
          custom={2}
          initial="hidden"
          animate="visible"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-3">
            Baseline → Reading
          </p>
          <div className="grid grid-cols-2 gap-px bg-[var(--brass)]/30">
            <ComparisonColumn
              label="Baseline"
              entries={Object.entries(star.baseline)}
            />
            <ComparisonColumn
              label="Reading"
              entries={Object.entries(star.reading)}
              emphasis
            />
          </div>
        </motion.section>

        <motion.section
          variants={sectionReveal}
          custom={3}
          initial="hidden"
          animate="visible"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-3">
            The Intervention
          </p>
          <ol className="space-y-3">
            {star.intervention.map((item, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className="shrink-0 w-7 h-7 rounded-full border border-[var(--brass)] flex items-center justify-center font-mono text-xs text-[var(--brass)]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm text-[var(--lavender-200)] leading-relaxed pt-1">{item}</p>
              </li>
            ))}
          </ol>
        </motion.section>

        {/* Guarantee verdict — flat row, brass left-rule. */}
        <motion.section
          variants={sectionReveal}
          custom={4}
          initial="hidden"
          animate="visible"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-3">
            Guarantee
          </p>
          <div className="pull-quote">
            <div className="flex items-center gap-3 mb-2">
              {star.guaranteeOutcome ? (
                <Check className="w-5 h-5 text-green-400" aria-hidden="true" />
              ) : (
                <X className="w-5 h-5 text-[var(--destructive)]" aria-hidden="true" />
              )}
              <p className="font-display text-xl">
                {star.guaranteeOutcome ? 'Guarantee met' : 'Guarantee not met'}
              </p>
            </div>
            <p className="text-sm text-[var(--lavender-200)] leading-relaxed">
              {star.guaranteeOutcome
                ? 'This engagement met or exceeded the contractual outcome guarantee.'
                : 'This engagement did not meet the contractual outcome guarantee. Client received the agreed refund per SOW terms.'}
            </p>
          </div>
        </motion.section>

        <motion.section
          variants={sectionReveal}
          custom={5}
          initial="hidden"
          animate="visible"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-3">
            Notes
          </p>
          <p className="text-sm text-[var(--lavender-200)] leading-relaxed italic">
            {star.notes}
          </p>
        </motion.section>

        <motion.div
          variants={sectionReveal}
          custom={6}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, ease: EASE_OUT_QUART }}
          className="cta-block p-8 text-center"
        >
          <h3 className="font-display text-2xl mb-3">Ship something like this?</h3>
          <p className="text-sm text-[var(--lavender-200)] mb-6">
            Every engagement starts with a discovery call.
          </p>
          <Link
            to="/hailing-frequency"
            className="focus-ring focus-lift inline-flex items-center gap-2 px-6 py-3 bg-[var(--paper)] text-[var(--purple-900)] rounded-md font-bold"
          >
            Book a discovery call →
          </Link>
        </motion.div>
      </div>
    </motion.aside>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[var(--brass)] tracking-[0.18em]">{label}</span>
      <p className="text-[var(--paper)] mt-1">{value}</p>
    </div>
  );
}

/** Render a URL as host + first path segment so receipts read as readable
    labels instead of full URLs. */
function shortHost(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/^\//, '').split('/').slice(0, 2).join('/');
    return path ? `${u.hostname}/${path}` : u.hostname;
  } catch {
    return url;
  }
}

function ComparisonColumn({
  label,
  entries,
  emphasis = false,
}: {
  label: string;
  entries: [string, string][];
  emphasis?: boolean;
}) {
  return (
    <div className="bg-[#0a0612] p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--brass)] mb-3">
        {label}
      </p>
      <dl className="space-y-2">
        {entries.map(([key, value]) => (
          <div key={key} className="flex justify-between items-baseline gap-3 text-sm">
            <dt className="text-[var(--lavender-200)] truncate">{key}</dt>
            <dd
              className={`font-mono tabular-nums shrink-0 ${
                emphasis ? 'text-[var(--paper)] font-bold' : 'text-[var(--lavender-200)]'
              }`}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
