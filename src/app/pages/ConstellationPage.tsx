import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { getConstellationById } from '../data/constellations';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

export default function ConstellationPage() {
  const { slug } = useParams<{ slug: string }>();
  const constellation = slug ? getConstellationById(slug) : null;

  if (!constellation) {
    return (
      <div className="min-h-screen bg-[#0a0612] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display mb-4">Constellation not found</h1>
          <Link to="/" className="text-[var(--purple-300)] hover:text-white">
            Return to map →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0612] text-white">
      {/* Ambient Starfield Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--purple-900)] to-transparent" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0612]/85 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="focus-ring rounded-md flex items-center gap-2 text-[var(--purple-300)] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to map</span>
          </Link>
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
        </div>
      </header>

      {/* Content */}
      <main id="main-content" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Constellation Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="mb-8">
            {/* Constellation Diagram - normalized to a 200x100 viewBox with padding */}
            <div className="mb-6 flex justify-center">
              {(() => {
                const points = constellation.stars
                  .map((s) => ({ x: s.x ?? 0, y: s.y ?? 0 }))
                  .filter((p) => p.x !== 0 || p.y !== 0);
                if (points.length === 0) return null;
                const padding = 16;
                const vbWidth = 200;
                const vbHeight = 100;
                const xs = points.map((p) => p.x);
                const ys = points.map((p) => p.y);
                const minX = Math.min(...xs);
                const maxX = Math.max(...xs);
                const minY = Math.min(...ys);
                const maxY = Math.max(...ys);
                const spanX = maxX - minX || 1;
                const spanY = maxY - minY || 1;
                const scaleX = (vbWidth - padding * 2) / spanX;
                const scaleY = (vbHeight - padding * 2) / spanY;
                const project = (p: { x: number; y: number }) => ({
                  x: padding + (p.x - minX) * scaleX,
                  y: padding + (p.y - minY) * scaleY,
                });
                const projected = points.map(project);
                return (
                  <svg width="200" height="100" viewBox="0 0 200 100" className="opacity-50">
                    {projected.map((pt, i) => (
                      <g key={i}>
                        {i > 0 && (
                          <line
                            x1={projected[i - 1].x}
                            y1={projected[i - 1].y}
                            x2={pt.x}
                            y2={pt.y}
                            stroke="var(--purple-300)"
                            strokeWidth="1"
                          />
                        )}
                        <circle cx={pt.x} cy={pt.y} r="3" fill="var(--paper)" />
                      </g>
                    ))}
                  </svg>
                );
              })()}
            </div>

            <h1 className="font-display text-5xl md:text-7xl mb-4">{constellation.name}</h1>
            <p className="text-[var(--purple-300)] text-sm font-mono uppercase tracking-wider mb-4">
              {constellation.practice}
            </p>
            <p className="text-2xl text-[var(--lavender-200)] mb-6">
              {constellation.tagline}
            </p>
            <p className="text-lg text-[var(--lavender-200)]/80">
              {constellation.description}
            </p>
          </div>
        </motion.div>

        {/* The Promise */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-[var(--purple-700)] to-[var(--purple-900)] border border-[var(--border)] rounded-2xl p-8 md:p-12">
            <h2 className="font-display text-2xl mb-4 flex items-center gap-3">
              <Check className="w-6 h-6 text-green-400" />
              The Promise
            </h2>
            <p className="text-xl text-[var(--lavender-200)]">
              "{constellation.promise}"
            </p>
          </div>
        </motion.div>

        {/* What We Make */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl mb-8">What we make</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {constellation.offerings.map((offering, i) => (
              <div
                key={i}
                className="bg-[var(--purple-900)] border border-[var(--border)] rounded-xl p-6"
              >
                <h3 className="font-bold text-xl mb-2">{offering.name}</h3>
                <p className="text-[var(--purple-300)] text-lg mb-4">{offering.priceRange}</p>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-[var(--lavender-200)]">
                    <span className="font-mono text-[var(--purple-300)]">SCOPE:</span> {offering.scope}
                  </p>
                  <p className="text-sm text-[var(--lavender-200)]">
                    <span className="font-mono text-[var(--purple-300)]">TIMELINE:</span> {offering.timeline}
                  </p>
                </div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="details" className="border-[var(--border)]">
                    <AccordionTrigger className="text-sm text-[var(--purple-300)] hover:text-white">
                      What's included
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 mt-4">
                        {offering.details.map((detail, j) => (
                          <li key={j} className="text-sm text-[var(--lavender-200)] flex items-start gap-2">
                            <span className="text-[var(--purple-300)] mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </motion.div>

        {/* The Stars - Case Studies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl mb-8">The Stars</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {constellation.stars.map((star, i) => (
              <Link
                key={i}
                to={`/star/${star.id}`}
                className="group focus-ring rounded-lg"
              >
                <motion.div
                  className="bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--purple-300)] transition-all h-full"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <ArrowRight className="w-4 h-4 text-[var(--purple-300)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{star.name}</h3>
                  <p className="text-sm text-[var(--purple-300)] mb-3">{star.metric}</p>
                  <p className="text-xs text-[var(--lavender-200)]/60 font-mono">
                    {star.projectId} · {star.date}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl mb-8">Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {constellation.process.map((step, i) => (
              <div
                key={i}
                className="relative bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-6"
              >
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-[var(--purple-500)] rounded-full flex items-center justify-center font-mono text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="font-bold text-lg mb-3 mt-2">{step.name}</h3>
                <p className="text-sm text-[var(--lavender-200)]">{step.description}</p>
                {i < constellation.process.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-[var(--purple-300)]">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hailing Frequency CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-gradient-to-br from-[var(--purple-500)] to-[var(--purple-700)] rounded-2xl p-12 text-center"
        >
          <h2 className="font-display text-4xl mb-4">
            Ready to start with {constellation.name}?
          </h2>
          <p className="text-xl text-[var(--lavender-200)] mb-8 max-w-2xl mx-auto">
            Book a 30-minute discovery call. We'll discuss your project, walk through our process, and determine if we're the right fit.
          </p>
          <Link to="/hailing-frequency">
            <Button
              size="lg"
              className="bg-white text-[var(--purple-900)] hover:bg-[var(--lavender-100)] font-bold text-lg px-8 py-6"
            >
              Book a discovery call about {constellation.name} →
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
