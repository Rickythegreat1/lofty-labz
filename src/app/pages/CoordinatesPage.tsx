import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, ExternalLink } from 'lucide-react';
import { constellations } from '../data/constellations';
import { transmissions } from '../data/transmissions';

export default function CoordinatesPage() {
  return (
    <div className="min-h-screen bg-[#0a0612] text-white">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--purple-900)] to-transparent" />
      </div>
      <header className="sticky top-0 z-50 bg-[#0a0612]/85 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[var(--purple-300)] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /><span>Back to map</span>
          </Link>
          <Link to="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50 10 A40 40 0 0 1 50 90 Q35 75 35 50 Q35 25 50 10" fill="var(--purple-500)" stroke="none" />
                <g transform="translate(42, 35)"><rect x="5" y="0" width="10" height="3" fill="white" /><path d="M5 3 L5 15 Q10 18 15 15 L15 3" fill="none" stroke="white" strokeWidth="1.5" /></g>
              </svg>
            </div>
            <span className="font-display text-lg tracking-tight uppercase">Lofty Labz</span>
          </Link>
        </div>
      </header>
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16 text-center">
          <MapPin className="w-16 h-16 mx-auto mb-6 text-[var(--purple-300)]" />
          <h1 className="font-display text-6xl mb-6">Coordinates</h1>
          <p className="text-xl text-[var(--lavender-200)] max-w-3xl mx-auto mb-4">LAT 33.4° N · LON 112.1° W · PHX, AZ</p>
          <p className="text-base text-[var(--lavender-200)] max-w-2xl mx-auto">Complete sitemap and information index for loftylabz.com</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
            <h2 className="font-display text-2xl mb-6">Primary Navigation</h2>
            <div className="space-y-3">
              {[{ to: '/', label: 'Star Map', desc: 'Interactive constellation experience' }, { to: '/?view=list', label: 'List View', desc: 'Traditional service catalog' }, { to: '/the-north-star', label: '★ The North Star', desc: 'Our outcome guarantee' }, { to: '/the-lab', label: 'The Lab', desc: 'Team, process, manifesto' }, { to: '/transmissions', label: 'Transmissions', desc: 'R&D logs and essays' }, { to: '/hailing-frequency', label: 'Hailing Frequency', desc: 'Contact & book a call' }].map((item, i) => (
                <Link key={i} to={item.to} className="block bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-4 hover:border-[var(--purple-300)] transition-all">
                  <p className="font-bold">{item.label}</p>
                  <p className="text-sm text-[var(--lavender-200)]">{item.desc}</p>
                </Link>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
            <h2 className="font-display text-2xl mb-6">Service Constellations</h2>
            <div className="space-y-3">
              {constellations.map((c, i) => (
                <Link key={i} to={`/constellation/${c.id}`} className="block bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-4 hover:border-[var(--purple-300)] transition-all">
                  <p className="font-bold">{c.name}</p>
                  <p className="text-sm text-[var(--purple-300)] mb-2">{c.practice}</p>
                  <p className="text-xs text-[var(--lavender-200)]">{c.stars.length} case studies</p>
                </Link>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <h2 className="font-display text-2xl mb-6">Case Studies</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {constellations.flatMap(c => c.stars).map((star, i) => (
                <Link key={i} to={`/star/${star.id}`} className="block bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-4 hover:border-[var(--purple-300)] transition-all">
                  <p className="font-bold text-sm">{star.name}</p>
                  <p className="text-xs text-[var(--purple-300)]">{star.metric}</p>
                </Link>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <h2 className="font-display text-2xl mb-6">Recent Transmissions</h2>
            <div className="space-y-3">
              {transmissions.slice(0, 6).map((t, i) => (
                <Link key={i} to={`/transmissions/${t.slug}`} className="block bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-4 hover:border-[var(--purple-300)] transition-all">
                  <p className="text-xs text-[var(--purple-300)] font-mono mb-1">{t.txId} · {t.date}</p>
                  <p className="font-bold text-sm">{t.subject}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="mt-16 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl mb-6">Contact Information</h2>
            <div className="bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-6 space-y-4">
              <div><p className="text-sm text-[var(--purple-300)] mb-1">Location</p><p className="text-white">Phoenix, Arizona</p><p className="text-sm text-[var(--lavender-200)]">LAT 33.4° N · LON 112.1° W</p></div>
              <div><p className="text-sm text-[var(--purple-300)] mb-1">Partners</p><p className="text-white">Ricky Sanderson · rickymsanderson@gmail.com</p><p className="text-white">Zach Shanks · zachshanks1@gmail.com</p></div>
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl mb-6">Legal</h2>
            <div className="bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-6 space-y-3">
              <p className="text-sm text-[var(--lavender-200)]">© 2026 Lofty Labz. All rights reserved.</p>
              <p className="text-sm text-[var(--lavender-200)]">Phoenix-based digital lab. Every engagement backed by written outcome guarantee.</p>
              <div className="pt-4 border-t border-[var(--border)] space-y-2">
                <Link to="/the-north-star" className="block text-sm text-[var(--purple-300)] hover:text-white transition-colors">Guarantee Terms</Link>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
