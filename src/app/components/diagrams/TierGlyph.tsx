interface TierGlyphProps {
  /** 1 = foundation, 2 = full, 3 = ongoing. */
  tier: 1 | 2 | 3;
}

/**
 * Three-dot scope indicator for offering tiers. Brass on dark; subsequent
 * tiers brighten the next dot in sequence.
 */
export function TierGlyph({ tier }: TierGlyphProps) {
  return (
    <span
      aria-label={`Tier ${tier} of 3`}
      className="inline-flex items-center gap-1 shrink-0"
    >
      {[1, 2, 3].map((slot) => {
        const filled = slot <= tier;
        return (
          <span
            key={slot}
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: filled ? 'var(--brass)' : 'transparent',
              border: `1px solid var(--brass)`,
              opacity: filled ? 0.9 : 0.35,
            }}
          />
        );
      })}
    </span>
  );
}
