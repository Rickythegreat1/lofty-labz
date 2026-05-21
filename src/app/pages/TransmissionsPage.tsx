import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Radio } from 'lucide-react';
import { transmissions } from '../data/transmissions';
import { useState } from 'react';
import { useDocumentMeta } from '../lib/useDocumentMeta';

export default function TransmissionsPage() {
  useDocumentMeta({
    title: 'Transmissions — Notes from the lab · Lofty Labz',
    description:
      'Essays and field notes from Lofty Labz on guarantees, build process, measurement, and the craft of digital work.',
  });

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(transmissions.flatMap(t => t.tags))).sort();

  // Filter transmissions by tag
  const filteredTransmissions = selectedTag
    ? transmissions.filter(t => t.tags.includes(selectedTag))
    : transmissions;

  return (
    <div className="min-h-screen bg-[var(--background)] text-white">
      {/* Ambient Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--purple-900)] to-transparent" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--background)]/85 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="focus-ring rounded-md flex items-center gap-2 text-[var(--purple-300)] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to map</span>
          </Link>
          <Link to="/" className="flex items-center gap-3">
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
          </Link>
        </div>
      </header>

      <main id="main-content" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Radio className="w-16 h-16 mx-auto mb-6 text-[var(--purple-300)]" />
          <h1 className="font-display text-6xl mb-6">Transmissions</h1>
          <p className="text-xl text-[var(--lavender-200)] max-w-3xl mx-auto mb-8">
            R&D logs, essays, and honest takes. No thought leadership theater—just what we're learning while building.
          </p>

          {/* Tag Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-mono transition-colors ${
                selectedTag === null
                  ? 'bg-[var(--purple-500)] text-white'
                  : 'bg-[var(--purple-900)] text-[var(--purple-300)] hover:bg-[var(--purple-700)]'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-mono transition-colors ${
                  selectedTag === tag
                    ? 'bg-[var(--purple-500)] text-white'
                    : 'bg-[var(--purple-900)] text-[var(--purple-300)] hover:bg-[var(--purple-700)]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Transmissions List */}
        <div className="space-y-6">
          {filteredTransmissions.map((transmission, i) => (
            <motion.div
              key={transmission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                to={`/transmissions/${transmission.slug}`}
                className="group block focus-ring rounded-lg"
              >
                <div className="bg-[var(--purple-900)] border border-[var(--border)] rounded-xl p-8 hover:border-[var(--purple-300)] transition-all">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      {/* TX ID and Date */}
                      <div className="flex items-center gap-4 mb-3 font-mono text-sm text-[var(--purple-300)]">
                        <span>{transmission.txId}</span>
                        <span>·</span>
                        <span>{transmission.date}</span>
                        <span>·</span>
                        <span>{transmission.readTime}</span>
                      </div>

                      {/* Subject */}
                      <h2 className="font-display text-2xl md:text-3xl mb-3 group-hover:text-[var(--purple-300)] transition-colors">
                        {transmission.subject}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-base text-[var(--lavender-200)] mb-4 leading-relaxed">
                        {transmission.excerpt}
                      </p>

                      {/* Tags and Author */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm text-[var(--lavender-200)]">
                          by {transmission.author}
                        </span>
                        <span className="text-[var(--purple-300)]">·</span>
                        {transmission.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-[var(--purple-700)]/30 rounded text-xs font-mono text-[var(--purple-300)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Arrow Icon */}
                    <ArrowRight className="w-6 h-6 text-[var(--purple-300)] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredTransmissions.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-[var(--lavender-200)]">
              No transmissions found with this tag.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
