import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { springs } from '../lib/motion';

interface WelcomePanelProps {
  onDismiss: () => void;
  onViewList: () => void;
}

export function WelcomePanel({ onDismiss, onViewList }: WelcomePanelProps) {
  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 z-30"
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ ...springs.panel, delay: 0.2 }}
    >
      <div className="max-w-4xl mx-auto mb-8 px-6">
        <div className="bg-[var(--purple-900)]/90 backdrop-blur-xl border border-[var(--border)] rounded-xl p-8 shadow-2xl relative">
          <button
            onClick={onDismiss}
            className="focus-ring absolute top-2 right-2 min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-[var(--purple-700)] rounded-lg transition-colors cursor-pointer"
            aria-label="Close welcome message"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="font-display text-2xl mb-3">This is Lofty Labz.</h2>
          <p className="text-base text-[var(--lavender-200)] mb-6 max-w-2xl">
            A digital lab in Phoenix. Every engagement we ship is backed by a written outcome guarantee.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              onClick={onViewList}
              className="focus-ring px-6 py-2.5 min-h-[44px] bg-[var(--purple-500)] hover:bg-[var(--purple-700)] text-white rounded-lg font-medium transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98, y: 1 }}
            >
              Skip to list view
            </motion.button>
            <motion.button
              className="focus-ring px-6 py-2.5 min-h-[44px] border border-[var(--border)] hover:bg-[var(--purple-700)] text-white rounded-lg font-medium transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98, y: 1 }}
            >
              Book a call
            </motion.button>
          </div>

          <p className="text-xs text-[var(--purple-300)] mt-4 opacity-70">
            Hover a constellation above to learn more about each practice.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
