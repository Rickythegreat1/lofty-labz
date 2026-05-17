import { Link, useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Radio, Clock, User } from 'lucide-react';
import { getTransmissionBySlug, getRecentTransmissions } from '../data/transmissions';
import { getConstellationById } from '../data/constellations';
import { Button } from '../components/ui/button';

export default function TransmissionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const transmission = slug ? getTransmissionBySlug(slug) : null;

  if (!transmission) {
    return (
      <div className="min-h-screen bg-[#0a0612] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display mb-4">Transmission not found</h1>
          <Link to="/transmissions" className="text-[var(--purple-300)] hover:text-white">
            Return to transmissions →
          </Link>
        </div>
      </div>
    );
  }

  const constellation = transmission.constellation
    ? getConstellationById(transmission.constellation)
    : null;

  const recentTransmissions = getRecentTransmissions(3).filter(t => t.id !== transmission.id);

  return (
    <div className="min-h-screen bg-[#0a0612] text-white">
      {/* Ambient Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--purple-900)] to-transparent" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0612]/85 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[var(--purple-300)] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <Link to="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50 10 A40 40 0 0 1 50 90 Q35 75 35 50 Q35 25 50 10"
                  fill="var(--purple-500)"
                  stroke="none"
                />
                <g transform="translate(42, 35)">
                  <rect x="5" y="0" width="10" height="3" fill="white" />
                  <path d="M5 3 L5 15 Q10 18 15 15 L15 3" fill="none" stroke="white" strokeWidth="1.5" />
                </g>
              </svg>
            </div>
            <span className="font-display text-lg tracking-tight uppercase">Lofty Labz</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* TX Info */}
          <div className="bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-6 mb-8 font-mono text-sm">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[var(--purple-300)]" />
                <span className="text-[var(--purple-300)]">{transmission.txId}</span>
              </div>
              <span className="text-[var(--purple-300)]">·</span>
              <span className="text-white">{transmission.date}</span>
              <span className="text-[var(--purple-300)]">·</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--purple-300)]" />
                <span className="text-white">{transmission.readTime}</span>
              </div>
              <span className="text-[var(--purple-300)]">·</span>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[var(--purple-300)]" />
                <span className="text-white">{transmission.author}</span>
              </div>
            </div>
          </div>

          {/* Subject */}
          <h1 className="font-display text-5xl md:text-6xl mb-6 leading-tight">
            {transmission.subject}
          </h1>

          {/* Tags and Constellation */}
          <div className="flex flex-wrap items-center gap-3">
            {transmission.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-[var(--purple-700)]/30 rounded-full text-sm font-mono text-[var(--purple-300)]"
              >
                {tag}
              </span>
            ))}
            {constellation && (
              <>
                <span className="text-[var(--purple-300)]">·</span>
                <Link
                  to={`/constellation/${constellation.id}`}
                  className="text-sm text-[var(--purple-300)] hover:text-white transition-colors"
                >
                  Related to {constellation.name} →
                </Link>
              </>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="prose prose-invert prose-lg max-w-none mb-16"
        >
          {transmission.content.map((paragraph, i) => (
            <p
              key={i}
              className="text-lg text-[var(--lavender-200)] leading-relaxed mb-6"
            >
              {paragraph}
            </p>
          ))}
        </motion.article>

        {/* Related Transmissions */}
        {recentTransmissions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-display text-2xl mb-6">More Transmissions</h2>
            <div className="space-y-4">
              {recentTransmissions.map((related, i) => (
                <Link
                  key={i}
                  to={`/transmissions/${related.slug}`}
                  className="block group"
                >
                  <div className="bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--purple-300)] transition-all">
                    <div className="flex items-center gap-3 mb-2 font-mono text-xs text-[var(--purple-300)]">
                      <span>{related.txId}</span>
                      <span>·</span>
                      <span>{related.date}</span>
                    </div>
                    <h3 className="font-display text-xl mb-2 group-hover:text-[var(--purple-300)] transition-colors">
                      {related.subject}
                    </h3>
                    <p className="text-sm text-[var(--lavender-200)]">
                      {related.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gradient-to-br from-[var(--purple-500)] to-[var(--purple-700)] rounded-2xl p-12 text-center"
        >
          <h2 className="font-display text-3xl mb-4">Work with us</h2>
          <p className="text-lg text-[var(--lavender-200)] mb-8 max-w-2xl mx-auto">
            If this resonates with how you think about work, let's talk. Every engagement starts with a discovery call.
          </p>
          <Link to="/hailing-frequency">
            <Button
              size="lg"
              className="bg-white text-[var(--purple-900)] hover:bg-[var(--lavender-100)] font-bold text-lg px-8 py-6"
            >
              Book a call →
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
