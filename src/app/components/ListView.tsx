import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

interface ListViewProps {
  onViewToggle: () => void;
}

const constellations = [
  {
    id: 'the-build',
    name: 'The Build',
    practice: 'Web design & development',
    tagline: 'Web design & development that performs, or we keep working.',
    description: 'Sites, applications, headless WP, the works.',
    stars: [
      { name: "Eddie's Trades", metric: '+47% lead-form conversion' },
      { name: 'Desert Modern Homes', metric: '2.3s load time' },
      { name: 'PHX Coffee Co', metric: '+89% mobile traffic' },
    ]
  },
  {
    id: 'the-voice',
    name: 'The Voice',
    practice: 'Brand identity & messaging',
    tagline: 'Brand identity that doesn\'t apologize.',
    description: 'Logo, system, voice, message — the things people remember you by.',
    stars: [
      { name: 'Bright Path Wellness', metric: '3x social engagement' },
      { name: 'Valley Ventures', metric: 'Brand refresh' },
      { name: 'Local Goods Market', metric: '+210% brand recall' },
    ]
  },
  {
    id: 'the-signal',
    name: 'The Signal',
    practice: 'Social media & content',
    tagline: 'Content that makes the algorithm relevant, not the boss.',
    description: 'Social, content, the rhythm of staying visible.',
    stars: [
      { name: 'AZ Auto Repair', metric: '12K monthly reach' },
      { name: 'Cactus Creative', metric: '+340% engagement' },
      { name: 'Phoenix Fitness', metric: '800+ leads/month' },
    ]
  },
  {
    id: 'the-engine',
    name: 'The Engine',
    practice: 'AI workflows & automation',
    tagline: 'Workflows that run while you sleep.',
    description: 'AI, automation, micro-APIs — the layer that compounds your team.',
    stars: [
      { name: 'Invoice Automator', metric: '40hrs saved/month' },
      { name: 'Lead Qualifier AI', metric: '85% accuracy' },
      { name: 'Content Pipeline', metric: '10x output' },
    ]
  },
  {
    id: 'the-lighthouse',
    name: 'The Lighthouse',
    practice: 'Care retainers & ongoing support',
    tagline: 'What happens after launch matters more than the launch.',
    description: 'Care retainers, monitoring, ongoing optimization.',
    stars: [
      { name: 'Scottsdale Medical', metric: '99.9% uptime' },
      { name: 'Desert Dining', metric: 'Monthly updates' },
      { name: 'Valley Tech Hub', metric: '24hr support' },
    ]
  }
];

type ConstellationListEntry = (typeof constellations)[number];

function ConstellationRow({ constellation }: { constellation: ConstellationListEntry }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="border-b border-[var(--border)] pb-16 last:border-b-0"
    >
      <div className="mb-8">
        <h2 className="font-display text-3xl mb-2">{constellation.name}</h2>
        <p className="text-[var(--purple-300)] text-sm font-mono uppercase tracking-wider mb-3">
          {constellation.practice}
        </p>
        <p className="text-lg text-[var(--lavender-200)] mb-4">{constellation.tagline}</p>
        <p className="text-base text-[var(--lavender-200)]/80">{constellation.description}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {constellation.stars.map((star, i) => (
          <Link
            key={i}
            to={`/star/${star.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            className="group focus-ring rounded-lg"
          >
            <motion.div
              className="bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--purple-300)] transition-all cursor-pointer"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`View ${star.name} case study: ${star.metric}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-2 h-2 bg-white rounded-full" />
                <ArrowRight className="w-4 h-4 text-[var(--purple-300)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-bold text-base mb-2">{star.name}</h3>
              <p className="text-sm text-[var(--purple-300)]">{star.metric}</p>
            </motion.div>
          </Link>
        ))}
      </div>

      <Link to={`/constellation/${constellation.id}`}>
        <button className="focus-ring rounded-md px-1 mt-6 text-white hover:text-[var(--purple-300)] transition-colors font-medium flex items-center gap-2">
          Explore {constellation.name}
          <ArrowRight className="w-4 h-4" />
        </button>
      </Link>
    </motion.div>
  );
}

export function ListView({ onViewToggle }: ListViewProps) {
  return (
    <div className="min-h-screen bg-[#0a0612] text-[var(--paper)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0612]/85 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
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

          {/* View Toggle */}
          <button
            onClick={onViewToggle}
            className="focus-ring flex items-center gap-2 px-4 py-3 min-h-[44px] border border-[var(--border)] rounded-md hover:bg-[var(--purple-700)] transition-colors cursor-pointer"
            aria-label="Toggle to star map view"
          >
            <span className="text-sm">★ Map</span>
            <span className="text-sm opacity-50">|</span>
            <span className="text-sm">☰ List</span>
          </button>
        </div>
      </header>

      <main id="main-content">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-5xl md:text-7xl mb-6 leading-tight">
            Lofty Labz
          </h1>
          <p className="text-xl md:text-2xl text-[var(--lavender-200)] mb-8 max-w-3xl">
            A digital lab in Phoenix. Every engagement backed in writing.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/hailing-frequency">
              <motion.button
                className="focus-ring px-8 py-3 min-h-[44px] bg-[var(--purple-500)] hover:bg-[var(--purple-700)] text-white rounded-lg font-medium transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Book a call →
              </motion.button>
            </Link>
            <motion.button
              onClick={onViewToggle}
              className="focus-ring px-8 py-3 min-h-[44px] border border-[var(--border)] hover:bg-[var(--purple-700)] text-white rounded-lg font-medium transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View star map
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* The North Star - Guarantee */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[var(--glass-surface)] backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl p-8 md:p-12"
        >
          <div className="flex items-start gap-4 mb-6">
            <Star className="w-8 h-8 fill-white text-white flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-display text-3xl mb-4">The North Star</h2>
              <p className="text-xl text-[var(--lavender-200)] mb-6">
                We don't ship work that doesn't perform. And we put it in writing.
              </p>
              <p className="text-base text-[var(--lavender-200)] mb-6">
                Every Lofty Labz engagement carries a measurable, contractual outcome.
                If we don't hit it, you don't pay full price. The terms are short,
                the math is simple, and the SOW is downloadable.
              </p>
              <Link to="/the-north-star">
                <button className="text-white hover:text-[var(--purple-300)] transition-colors font-medium">
                  Read our guarantee →
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Constellations / Services */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="space-y-16">
          {constellations.map((constellation) => (
            <ConstellationRow key={constellation.id} constellation={constellation} />
          ))}
        </div>
      </section>

      {/* The Lab */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="font-display text-3xl mb-8">The Lab</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Ricky Sanderson', role: 'Partner', email: 'hello@loftylabz.com', phone: '317-800-4958' },
              { name: 'Zach Shanks', role: 'Partner', email: 'hello@loftylabz.com', phone: '765-667-2346' }
            ].map((person, i) => (
              <div
                key={i}
                className="bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-[var(--purple-500)] rounded-full flex items-center justify-center font-display text-2xl">
                    {person.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{person.name}</h3>
                    <p className="text-sm text-[var(--purple-300)]">{person.role}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-[var(--lavender-200)]">
                  <p>📧 {person.email}</p>
                  <p>📞 {person.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Hailing Frequency CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="cta-block p-12 text-center"
        >
          <h2 className="font-display text-4xl mb-4">Ready to ship something real?</h2>
          <p className="text-xl text-[var(--lavender-200)] mb-8 max-w-2xl mx-auto">
            Book a 30-minute discovery call. No pitch decks, no sales theater — just an honest conversation about what you're building and whether we're the right lab for it.
          </p>
          <Link to="/hailing-frequency">
            <motion.button
              className="focus-ring px-8 py-4 min-h-[44px] bg-white text-[var(--purple-900)] rounded-lg font-bold text-lg hover:bg-[var(--lavender-100)] transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a call →
            </motion.button>
          </Link>
        </motion.div>
      </section>
      </main>

      {/* Footer */}
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
          <div className="text-sm text-[var(--lavender-200)]">
            www.loftylabz.com
          </div>
        </div>
      </footer>
    </div>
  );
}