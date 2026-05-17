import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Link } from 'react-router';

export function NorthStar() {
  return (
    <Link to="/the-north-star">
      <motion.div
        className="flex items-center gap-2 cursor-pointer group min-h-[44px] px-2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="View our guarantee - every engagement backed in writing"
      >
        <motion.div
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Star className="w-5 h-5 fill-[var(--brass)] text-[var(--brass)]" />
        </motion.div>
        <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          The Guarantee
        </span>
      </motion.div>
    </Link>
  );
}
