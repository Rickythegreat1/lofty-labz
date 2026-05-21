import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Star, Shield, FileText, ArrowLeft } from 'lucide-react';
import { constellations } from '../data/constellations';
import { useDocumentMeta } from '../lib/useDocumentMeta';

export default function NorthStarPage() {
  useDocumentMeta({
    title: 'The North Star — Lofty Labz Outcome Guarantee',
    description:
      'Every Lofty Labz engagement ships with a written outcome guarantee. Read the policy, the fine print, and how we hold a reserve to back it.',
  });

  return (
    <div className="min-h-screen bg-[var(--background)] text-white">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--purple-900)] to-transparent" />
      </div>

      <header className="sticky top-0 z-50 bg-[var(--background)]/85 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="focus-ring rounded-md flex items-center gap-2 text-[var(--purple-300)] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to map</span>
          </Link>
          <Link to="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50 10 A40 40 0 0 1 50 90 Q35 75 35 50 Q35 25 50 10" fill="var(--purple-500)" stroke="none" />
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

      <main id="main-content" className="relative z-10">
        <section className="min-h-screen flex items-center justify-center px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <Star className="w-16 h-16 mx-auto mb-8 fill-white text-white" />
            <h1 className="font-display text-6xl md:text-8xl mb-8 leading-tight">
              We don't ship work<br />that doesn't perform.
            </h1>
            <p className="font-display text-4xl md:text-5xl text-[var(--purple-300)] mb-12">
              And we put it in writing.
            </p>
            <p className="text-xl md:text-2xl text-[var(--lavender-200)] max-w-3xl mx-auto leading-relaxed">
              Every Lofty Labz engagement carries a measurable, contractual outcome.
              If we don't hit it, you don't pay full price. The terms are short,
              the math is simple, and the SOW is downloadable.
            </p>
          </motion.div>
        </section>

        <section className="max-w-5xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-3 text-center">
              By Practice
            </p>
            <h2 className="font-display text-4xl mb-16 text-center">The Promises</h2>
            <ul className="space-y-12">
              {constellations.map((constellation, i) => (
                <motion.li
                  key={constellation.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="grid md:grid-cols-12 gap-6 items-start"
                >
                  <header className="md:col-span-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--brass)] mb-2">
                      {constellation.practice}
                    </p>
                    <h3 className="font-display text-2xl leading-tight">{constellation.name}</h3>
                  </header>
                  <div className="md:col-span-8 pull-quote">
                    <Shield className="w-5 h-5 text-[var(--brass)] mb-3" aria-hidden="true" />
                    <p className="text-lg text-[var(--lavender-200)] leading-relaxed italic">
                      "{constellation.promise}"
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cta-block p-12 text-center"
          >
            <h2 className="font-display text-3xl mb-6">The Guarantee Reserve</h2>
            <p className="text-lg text-[var(--lavender-200)] max-w-2xl mx-auto">
              We maintain a standing reserve to back every guarantee we write.
            </p>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-3xl mb-8">The Honest Fine Print</h2>
            <div className="bg-[var(--purple-900)] border border-[var(--border)] rounded-xl p-8 space-y-6">
              <div>
                <h3 className="font-bold text-xl mb-3">What the guarantee doesn't cover</h3>
                <ul className="space-y-2 text-[var(--lavender-200)]">
                  {['Changes in business model or market conditions beyond our control during the engagement', 'Outcomes dependent on client-side execution we don\'t control (e.g., sales team performance)', 'Projects where baseline metrics weren\'t properly established before engagement', 'Acts of God, pandemics, or force majeure events that disrupt measurement periods'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><span className="text-[var(--purple-300)] mt-1">•</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-3">What we require</h3>
                <ul className="space-y-2 text-[var(--lavender-200)]">
                  {['Access to analytics and measurement tools for baseline and ongoing tracking', 'A 90-day measurement window minimum after launch to assess outcomes', 'Regular check-ins and transparent reporting throughout the engagement', 'Written documentation of all contractual outcomes before work begins'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><span className="text-[var(--purple-300)] mt-1">•</span><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cta-block p-12 text-center"
          >
            <FileText className="w-16 h-16 mx-auto mb-6 text-[var(--brass)]" />
            <h2 className="font-display text-3xl mb-4">Every Engagement, In Writing</h2>
            <p className="text-lg text-[var(--lavender-200)] max-w-2xl mx-auto">
              Every engagement ships with a written scope of work.
            </p>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <h2 className="font-display text-4xl mb-6">Ready to work with a guarantee?</h2>
            <p className="text-xl text-[var(--lavender-200)] mb-8 max-w-2xl mx-auto">Book a discovery call. We'll discuss your project, establish measurable outcomes, and put it all in writing.</p>
            <Link to="/hailing-frequency">
              <button className="focus-ring px-8 py-4 bg-[var(--purple-500)] hover:bg-[var(--purple-700)] text-white rounded-lg font-bold text-lg transition-colors">Book a call →</button>
            </Link>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
