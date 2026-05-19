import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Check, X, ArrowRight } from 'lucide-react';
import { getStarById } from '../data/constellations';
import { Button } from '../components/ui/button';
import { useEffect, useState } from 'react';
import { useDocumentMeta } from '../lib/useDocumentMeta';

export default function StarPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [showWarp, setShowWarp] = useState(true);
  const result = slug ? getStarById(slug) : null;

  useDocumentMeta({
    title: result
      ? `${result.star.name} — ${result.star.metric} · Lofty Labz`
      : 'Case study not found · Lofty Labz',
    description: result
      ? `${result.star.client} · ${result.star.metric}. A guaranteed outcome from the ${result.constellation.name} practice at Lofty Labz.`
      : 'The case study you were looking for does not exist.',
  });

  useEffect(() => {
    // Simulate warp transition
    const timer = setTimeout(() => setShowWarp(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-[#0a0612] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display mb-4">Case study not found</h1>
          <Link to="/" className="text-[var(--purple-300)] hover:text-white">
            Return to map →
          </Link>
        </div>
      </div>
    );
  }

  const { constellation, star } = result;

  // Get related stars (other stars from same constellation)
  const relatedStars = constellation.stars.filter(s => s.id !== star.id).slice(0, 3);

  return (
    <>
      {/* Warp Transition Overlay */}
      {showWarp && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#0a0612] flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.4, duration: 0.2 }}
        >
          <motion.div
            className="text-white text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-4 h-4 bg-white rounded-full mx-auto mb-4"
              animate={{
                scale: [1, 3, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
            <motion.p
              className="text-sm font-mono text-[var(--purple-300)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Stabilizing the lens...
            </motion.p>
          </motion.div>
        </motion.div>
      )}

      <div className="min-h-screen bg-[#0a0612] text-white">
        {/* Ambient Starfield Background */}
        <div className="fixed inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--purple-900)] to-transparent" />
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#0a0612]/85 backdrop-blur-xl border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="focus-ring rounded-md flex items-center gap-2 text-[var(--purple-300)] hover:text-white transition-colors"
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
                    <rect x="5" y="0" width="10" height="3" fill="var(--paper)" />
                    <path d="M5 3 L5 15 Q10 18 15 15 L15 3" fill="none" stroke="var(--paper)" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
              <span className="font-display text-lg tracking-tight uppercase">Lofty Labz</span>
            </Link>
          </div>
        </header>

        {/* Content */}
        <main id="main-content" className="relative z-10 max-w-5xl mx-auto px-6 py-16">
          {/* Lab Notebook Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mb-12"
          >
            <div className="bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-8 mb-8 font-mono text-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-[var(--purple-300)]">PROJECT ID</span>
                  <p className="text-white">{star.projectId}</p>
                </div>
                <div>
                  <span className="text-[var(--purple-300)]">CLIENT</span>
                  <p className="text-white">{star.client}</p>
                </div>
                <div>
                  <span className="text-[var(--purple-300)]">STATUS</span>
                  <p className="text-white uppercase">{star.status}</p>
                </div>
                <div>
                  <span className="text-[var(--purple-300)]">LEAD</span>
                  <p className="text-white">{star.lead}</p>
                </div>
                <div>
                  <span className="text-[var(--purple-300)]">DATE</span>
                  <p className="text-white">{star.date}</p>
                </div>
                <div>
                  <span className="text-[var(--purple-300)]">CONSTELLATION</span>
                  <p className="text-white">{constellation.name}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-[var(--purple-300)]">OUTCOME</span>
                  <p className="text-white">{star.metric}</p>
                </div>
              </div>
            </div>

            <h1 className="font-display text-5xl md:text-6xl mb-6">{star.name}</h1>
          </motion.div>

          {/* The Hypothesis */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl mb-4 text-[var(--purple-300)]">The Hypothesis</h2>
            <p className="text-lg text-[var(--lavender-200)] leading-relaxed">
              {star.hypothesis}
            </p>
          </motion.section>

          {/* The Baseline */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl mb-4 text-[var(--purple-300)]">The Baseline</h2>
            <div className="bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(star.baseline).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center border-b border-[var(--border)] pb-2">
                    <span className="text-[var(--lavender-200)]">{key}</span>
                    <span className="font-mono text-white font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* The Intervention */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl mb-4 text-[var(--purple-300)]">The Intervention</h2>
            <div className="space-y-4">
              {star.intervention.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[var(--purple-500)] rounded-full flex items-center justify-center font-mono text-sm">
                    {i + 1}
                  </div>
                  <p className="text-[var(--lavender-200)] leading-relaxed pt-1">{item}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* The Reading */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl mb-4 text-[var(--purple-300)]">The Reading</h2>
            <div className="bg-[var(--glass-surface)] backdrop-blur-xl border border-[var(--glass-border)] rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(star.reading).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center border-b border-[var(--purple-300)]/20 pb-2">
                    <span className="text-[var(--lavender-200)]">{key}</span>
                    <span className="font-mono text-white font-bold text-lg">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* The Guarantee Outcome */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl mb-4 text-[var(--purple-300)]">The Guarantee Outcome</h2>
            <div className={`border rounded-lg p-6 ${
              star.guaranteeOutcome
                ? 'bg-green-900/20 border-green-500/50'
                : 'bg-red-900/20 border-red-500/50'
            }`}>
              <div className="flex items-center gap-3">
                {star.guaranteeOutcome ? (
                  <Check className="w-8 h-8 text-green-400" />
                ) : (
                  <X className="w-8 h-8 text-red-400" />
                )}
                <div>
                  <p className="font-bold text-xl mb-2">
                    {star.guaranteeOutcome ? 'Guarantee Met' : 'Guarantee Not Met'}
                  </p>
                  <p className="text-[var(--lavender-200)]">
                    {star.guaranteeOutcome
                      ? 'This engagement met or exceeded the contractual outcome guarantee.'
                      : 'This engagement did not meet the contractual outcome guarantee. Client received partial refund per SOW terms.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Notes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl mb-4 text-[var(--purple-300)]">Notes</h2>
            <div className="bg-[var(--purple-900)]/50 border border-[var(--border)] rounded-lg p-6 italic">
              <p className="text-[var(--lavender-200)] leading-relaxed">
                {star.notes}
              </p>
            </div>
          </motion.section>

          {/* Related Stars */}
          {relatedStars.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="font-display text-2xl mb-6">Related Stars</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedStars.map((relatedStar, i) => (
                  <Link
                    key={i}
                    to={`/star/${relatedStar.id}`}
                    className="group"
                  >
                    <motion.div
                      className="bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--purple-300)] transition-all"
                      whileHover={{ y: -4 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-2 h-2 bg-white rounded-full" />
                        <ArrowRight className="w-4 h-4 text-[var(--purple-300)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{relatedStar.name}</h3>
                      <p className="text-sm text-[var(--purple-300)]">{relatedStar.metric}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.6 }}
            className="cta-block p-12 text-center"
          >
            <h2 className="font-display text-3xl mb-4">
              Ready to ship something like this?
            </h2>
            <p className="text-lg text-[var(--lavender-200)] mb-8 max-w-2xl mx-auto">
              Every engagement starts with a discovery call. We'll discuss your project, walk through our guarantee, and determine if we're the right fit.
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
    </>
  );
}
