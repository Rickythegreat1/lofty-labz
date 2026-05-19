import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Star, Shield, FileText, ArrowLeft } from 'lucide-react';
import { constellations } from '../data/constellations';

export default function NorthStarPage() {
  return (
    <div className="min-h-screen bg-[#0a0612] text-white">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--purple-900)] to-transparent" />
      </div>

      <header className="sticky top-0 z-50 bg-[#0a0612]/85 backdrop-blur-xl border-b border-[var(--border)]">
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

        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-display text-4xl mb-12 text-center">The Promises by Practice</h2>
            <div className="space-y-6">
              {constellations.map((constellation, i) => (
                <motion.div
                  key={constellation.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-[var(--purple-900)] border border-[var(--border)] rounded-xl p-8"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <h3 className="font-display text-2xl mb-2">{constellation.name}</h3>
                      <p className="text-sm text-[var(--purple-300)] font-mono uppercase">{constellation.practice}</p>
                    </div>
                    <div className="flex-1">
                      <div className="bg-[var(--purple-700)]/30 border border-[var(--purple-500)]/30 rounded-lg p-6">
                        <Shield className="w-6 h-6 text-green-400 mb-3" />
                        <p className="text-lg text-[var(--lavender-200)] italic leading-relaxed">"{constellation.promise}"</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[var(--purple-700)] to-[var(--purple-900)] border border-[var(--border)] rounded-2xl p-12 text-center"
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
            className="bg-gradient-to-br from-[var(--purple-700)] to-[var(--purple-900)] border border-[var(--border)] rounded-2xl p-12 text-center"
          >
            <FileText className="w-16 h-16 mx-auto mb-6 text-[var(--purple-300)]" />
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
