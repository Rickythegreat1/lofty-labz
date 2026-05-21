import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import {
  constellations,
  type Constellation as ConstellationListEntry,
} from '../data/constellations';
import { sectionReveal } from '../lib/choreography';
import { ConstellationIcon, ICON_FOR } from './diagrams/ConstellationIcon';

interface ListViewProps {
  onViewToggle: () => void;
}

function ConstellationRow({ constellation }: { constellation: ConstellationListEntry }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const iconKind = ICON_FOR[constellation.id];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="border-b border-[var(--border)] pb-16 last:border-b-0"
    >
      <div className="mb-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        {iconKind && (
          <div className="md:col-span-2 flex md:justify-start">
            <ConstellationIcon kind={iconKind} size={96} />
          </div>
        )}
        <div className={iconKind ? 'md:col-span-10' : 'md:col-span-12'}>
          <p className="text-[var(--brass)] text-[11px] font-mono uppercase tracking-[0.22em] mb-2">
            {constellation.practice}
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-3">{constellation.name}</h2>
          <p className="text-lg text-[var(--lavender-200)] mb-3 max-w-3xl">{constellation.tagline}</p>
          <p className="text-base text-[var(--lavender-200)]/80 max-w-3xl">
            {constellation.description}
          </p>
        </div>
      </div>

      {/* Flat star list — replaces the prior grid of cards. Per-star stagger
          gives a sense of arrival without making the eye land on box edges. */}
      <ul className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
        {constellation.stars.map((star, i) => (
          <motion.li
            key={star.id}
            initial={{ opacity: 0, x: -8 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.35, delay: 0.15 + i * 0.04 }}
          >
            <Link
              to={`/constellation/${constellation.id}/star/${star.id}`}
              className="focus-ring focus-lift group rounded-md flex items-center gap-5 py-4 hover:pl-2 transition-[padding] duration-200"
              aria-label={`View ${star.name} case study: ${star.metric}`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-[var(--paper)] shrink-0 group-hover:shadow-[0_0_14px_rgba(250,247,251,0.7)] transition-shadow"
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg leading-tight">{star.name}</h3>
                <p className="text-sm text-[var(--lavender-200)] mt-0.5">{star.metric}</p>
              </div>
              <ArrowRight
                className="w-4 h-4 text-[var(--brass)] opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
            </Link>
          </motion.li>
        ))}
      </ul>

      <Link to={`/constellation/${constellation.id}`}>
        <button className="focus-ring focus-lift rounded-md px-1 mt-6 text-[var(--paper)] hover:text-[var(--purple-300)] transition-colors font-medium flex items-center gap-2">
          <span className="underline-draw">Explore {constellation.name}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </Link>
    </motion.div>
  );
}

export function ListView({ onViewToggle }: ListViewProps) {
  return (
    <div className="min-h-screen bg-[#0a0612] text-[var(--paper)]">
      <header className="sticky top-0 z-50 bg-[#0a0612]/85 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50 10 A40 40 0 0 1 50 90 Q35 75 35 50 Q35 25 50 10"
                  fill="var(--purple-500)"
                  stroke="none"
                />
                <g transform="translate(42, 35)">
                  <rect x="5" y="0" width="10" height="3" fill="var(--paper)" />
                  <path d="M5 3 L5 15 Q10 18 15 15 L15 3" fill="none" stroke="var(--paper)" strokeWidth="1.5" />
                </g>
              </svg>
            </div>
            <span className="font-display text-xl tracking-tight uppercase">Lofty Labz</span>
          </div>

          <motion.button
            onClick={onViewToggle}
            className="focus-ring focus-lift flex items-center gap-2 px-4 py-3 min-h-[44px] border border-[var(--border)] rounded-md hover:bg-[var(--purple-700)]/60 transition-colors cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98, y: 1 }}
            aria-label="Toggle to star map view"
          >
            <span className="text-sm opacity-60">
              <span aria-hidden="true">★</span> Map
            </span>
            <span className="text-sm opacity-50">|</span>
            <span className="text-sm relative">
              <span aria-hidden="true">☰</span> List
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-px bg-[var(--brass)]"
              />
            </span>
          </motion.button>
        </div>
      </header>

      <main id="main-content">
        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            variants={sectionReveal}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            <h1 className="font-display text-5xl md:text-7xl mb-6 leading-tight">Lofty Labz</h1>
            <p className="text-xl md:text-2xl text-[var(--lavender-200)] mb-8 max-w-3xl">
              A digital lab in Phoenix. Every engagement backed in writing.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/hailing-frequency">
                <motion.button
                  className="focus-ring focus-lift px-8 py-3 min-h-[44px] bg-[var(--purple-500)] hover:bg-[var(--purple-700)] text-[var(--paper)] rounded-lg font-medium transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98, y: 1 }}
                >
                  Book a call →
                </motion.button>
              </Link>
              <motion.button
                onClick={onViewToggle}
                className="focus-ring focus-lift px-8 py-3 min-h-[44px] border border-[var(--border)] hover:bg-[var(--purple-700)] text-[var(--paper)] rounded-lg font-medium transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98, y: 1 }}
              >
                View star map
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* North Star — pull-quote treatment, no card. */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-12 gap-8 items-start"
          >
            <div className="md:col-span-2 flex md:justify-center">
              <Star className="w-10 h-10 text-[var(--brass)] fill-[var(--brass)]" aria-hidden="true" />
            </div>
            <div className="md:col-span-10 pull-quote">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-2">
                The North Star
              </p>
              <h2 className="font-display text-2xl md:text-3xl mb-4 leading-tight">
                We don't ship work that doesn't perform. And we put it in writing.
              </h2>
              <p className="text-base text-[var(--lavender-200)] mb-5 max-w-2xl">
                Every Lofty Labz engagement carries a measurable, contractual outcome.
                If we don't hit it, you don't pay full price. The terms are short,
                the math is simple, and the SOW is downloadable.
              </p>
              <Link to="/the-north-star">
                <button className="focus-ring focus-lift rounded-md text-[var(--paper)] hover:text-[var(--purple-300)] transition-colors font-medium">
                  <span className="underline-draw">Read our guarantee</span> →
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="space-y-16">
            {constellations.map((constellation) => (
              <ConstellationRow key={constellation.id} constellation={constellation} />
            ))}
          </div>
        </section>

        {/* The Lab — flat list, no cards. */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl mb-8">The Lab</h2>
            <div className="grid md:grid-cols-2 gap-10">
              {[
                { name: 'Ricky Sanderson', role: 'Partner', email: 'hello@loftylabz.com', phone: '317-800-4958' },
                { name: 'Zach Shanks', role: 'Partner', email: 'hello@loftylabz.com', phone: '765-667-2346' },
              ].map((person) => (
                <div key={person.name}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-1">
                    {person.role}
                  </p>
                  <h3 className="font-display text-2xl mb-3">{person.name}</h3>
                  <div className="space-y-1.5 text-sm">
                    <a
                      href={`mailto:${person.email}`}
                      className="focus-ring focus-lift rounded-md block text-[var(--purple-300)] hover:text-[var(--paper)] transition-colors"
                    >
                      <span className="underline-draw">{person.email}</span>
                    </a>
                    <a
                      href={`tel:${person.phone}`}
                      className="focus-ring focus-lift rounded-md block text-[var(--purple-300)] hover:text-[var(--paper)] transition-colors"
                    >
                      <span className="underline-draw">{person.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="cta-block p-12 text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl mb-4">Ready to ship something real?</h2>
            <p className="text-lg text-[var(--lavender-200)] mb-8 max-w-2xl mx-auto">
              Book a 30-minute discovery call. No pitch decks, no sales theater — just an honest
              conversation about what you're building and whether we're the right lab for it.
            </p>
            <Link to="/hailing-frequency">
              <motion.button
                className="focus-ring focus-lift px-8 py-4 min-h-[44px] bg-[var(--paper)] text-[var(--purple-900)] rounded-lg font-bold text-base hover:bg-[var(--lavender-100)] transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98, y: 1 }}
              >
                Book a call →
              </motion.button>
            </Link>
          </motion.div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-[var(--border)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50 10 A40 40 0 0 1 50 90 Q35 75 35 50 Q35 25 50 10"
                  fill="var(--purple-500)"
                  stroke="none"
                />
                <g transform="translate(42, 35)">
                  <rect x="5" y="0" width="10" height="3" fill="var(--paper)" />
                  <path d="M5 3 L5 15 Q10 18 15 15 L15 3" fill="none" stroke="var(--paper)" strokeWidth="1.5" />
                </g>
              </svg>
            </div>
            <span className="font-display text-lg tracking-tight uppercase">Lofty Labz</span>
          </div>
          <div className="text-sm text-[var(--purple-300)] font-mono">
            LAT 33.4° N · LON 112.1° W · PHX, AZ
          </div>
          <div className="text-sm text-[var(--lavender-200)]">www.loftylabz.com</div>
        </div>
      </footer>
    </div>
  );
}
