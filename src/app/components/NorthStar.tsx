import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Link } from 'react-router';

/**
 * The Guarantee mark in the top bar.
 *
 * Phase 3E — adds a faint brass "ley line" dropping from beneath the star
 * icon down into the constellation field. 1px wide, gradient fade brass →
 * transparent, drawn over ~40vh so it suggests the guarantee anchors the
 * entire map without ever pulling focus.
 */
export function NorthStar() {
  return (
    <div className="relative">
      <Link
        to="/the-north-star"
        className="focus-ring focus-lift rounded-md"
        aria-label="View our guarantee - every engagement backed in writing"
      >
        <motion.div
          // tabIndex={-1} prevents Motion from auto-adding tabIndex={0} from
          // whileHover/whileTap; focus + ring live on the parent <Link>.
          tabIndex={-1}
          className="flex items-center gap-2 cursor-pointer group min-h-[44px] px-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Star className="w-5 h-5 fill-[var(--brass)] text-[var(--brass)]" />
          </motion.div>
          <span className="text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
            The Guarantee
          </span>
        </motion.div>
      </Link>

      <motion.div
        aria-hidden="true"
        className="absolute top-full left-[18px] w-px pointer-events-none origin-top"
        style={{
          height: '40vh',
          background:
            'linear-gradient(to bottom, rgba(201, 169, 97, 0.32) 0%, rgba(201, 169, 97, 0) 100%)',
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 1.2, duration: 1.0, ease: [0.32, 0.72, 0, 1] }}
      />
    </div>
  );
}
