import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#0a0612] text-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6"
      >
        <motion.div className="mb-8" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto opacity-30">
            <circle cx="100" cy="100" r="60" fill="var(--purple-500)" opacity="0.3" />
            <rect x="80" y="60" width="40" height="80" fill="var(--purple-700)" />
            <circle cx="100" cy="60" r="20" fill="var(--purple-300)" />
            <line x1="100" y1="80" x2="100" y2="140" stroke="white" strokeWidth="2" />
          </svg>
        </motion.div>

        <h1 className="font-display text-8xl md:text-9xl mb-4 text-[var(--purple-300)]">404</h1>
        <h2 className="font-display text-4xl md:text-5xl mb-6">You're between stars</h2>
        <p className="text-xl text-[var(--lavender-200)] mb-12 max-w-md mx-auto">Nothing here. The telescope has drifted off course.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <button className="focus-ring inline-flex items-center gap-2 px-8 py-4 bg-[var(--purple-500)] hover:bg-[var(--purple-700)] text-white rounded-lg font-bold transition-colors">
              <Home className="w-5 h-5" />
              Return to map
            </button>
          </Link>
          <Link to="/?view=list">
            <button className="px-8 py-4 border border-[var(--border)] text-white hover:bg-[var(--purple-700)] rounded-lg font-bold transition-colors">View list catalog</button>
          </Link>
        </div>

        <div className="mt-12 text-sm text-[var(--lavender-200)] font-mono">
          <p>Lost coordinates</p>
          <p>Last known: PHX, AZ · LAT 33.4° N · LON 112.1° W</p>
        </div>
      </motion.div>
    </main>
  );
}
