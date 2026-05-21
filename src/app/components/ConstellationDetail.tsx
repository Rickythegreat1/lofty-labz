import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import {
  Layout,
  AppWindow,
  ShoppingCart,
  Palette,
  RefreshCw,
  FileText,
  Activity,
  Megaphone,
  Cog,
  Sparkles,
  Workflow,
  Heart,
  TrendingUp,
  Shield,
  Repeat,
  Film,
  Layers,
  Search,
  BarChart3,
  Pencil,
  Hammer,
  Rocket,
  ClipboardCheck,
  Compass,
  BookOpen,
  Wrench,
  Play,
  Sliders,
  Send,
  type LucideIcon,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import type { Constellation } from '../data/constellations';
import { sectionReveal, revealStagger, revealItem, EASE_OUT_QUART } from '../lib/choreography';
import { TierGlyph } from './diagrams/TierGlyph';

/**
 * Match an offering / process step name to a brass Lucide icon by keyword.
 * Falls back to null so the layout collapses gracefully when no match.
 */
function iconForOffering(name: string): LucideIcon | null {
  const n = name.toLowerCase();
  if (n.includes('foundation') && (n.includes('site') || n.includes('web'))) return Layout;
  if (n.includes('application') || n.includes('app build')) return AppWindow;
  if (n.includes('e-commerce') || n.includes('store') || n.includes('shop')) return ShoppingCart;
  if (n.includes('brand foundation') || n.includes('identity')) return Palette;
  if (n.includes('rebrand') || n.includes('migration')) return RefreshCw;
  if (n.includes('campaign')) return Megaphone;
  if (n.includes('content sprint') || n.includes('content pipeline')) return FileText;
  if (n.includes('ongoing signal') || n.includes('signal')) return Activity;
  if (n.includes('automation') || n.includes('process auto')) return Cog;
  if (n.includes('ai integration') || n.includes('ai')) return Sparkles;
  if (n.includes('operations engine') || n.includes('engine')) return Workflow;
  if (n.includes('essential care') || n.includes('care')) return Heart;
  if (n.includes('growth')) return TrendingUp;
  if (n.includes('dedicated')) return Shield;
  if (n.includes('brand motion') || n.includes('loop')) return Repeat;
  if (n.includes('explainer') || n.includes('product motion')) return Film;
  if (n.includes('motion system') || n.includes('system')) return Layers;
  if (n.includes('complete identity')) return Palette;
  return null;
}

function iconForProcess(name: string): LucideIcon | null {
  const n = name.toLowerCase();
  if (n.includes('discovery') || n.includes('hypothesis') || n.includes('audit') && n.includes('benchmark')) return Search;
  if (n.includes('baseline') || n.includes('measurement') || n.includes('analysis')) return BarChart3;
  if (n.includes('design') || n.includes('architecture') || n.includes('strategy')) return Pencil;
  if (n.includes('build') || n.includes('test')) return Hammer;
  if (n.includes('launch') || n.includes('publishing')) return Rocket;
  if (n.includes('care') || n.includes('optimize') || n.includes('optimization')) return Shield;
  if (n.includes('audit') || n.includes('benchmark')) return ClipboardCheck;
  if (n.includes('positioning') || n.includes('calendar')) return Compass;
  if (n.includes('visual') || n.includes('exploration')) return Sparkles;
  if (n.includes('documentation') || n.includes('training')) return BookOpen;
  if (n.includes('implementation') || n.includes('support')) return Wrench;
  if (n.includes('brief') || n.includes('reference')) return FileText;
  if (n.includes('storyboard')) return Layers;
  if (n.includes('animatic') || n.includes('animation')) return Play;
  if (n.includes('sound') || n.includes('polish')) return Sliders;
  if (n.includes('delivery') || n.includes('iteration')) return Send;
  if (n.includes('creation') || n.includes('approval')) return Pencil;
  if (n.includes('scale')) return TrendingUp;
  if (n.includes('monitor') || n.includes('incident') || n.includes('onboarding')) return Activity;
  if (n.includes('strategic') || n.includes('planning')) return Compass;
  return null;
}

interface ConstellationDetailProps {
  constellation: Constellation;
  onStarSelect: (starId: string) => void;
  /** When the right-edge StarPanel is open, content shifts left so it
      doesn't get clipped behind the panel. */
  panelOpen: boolean;
  /** Reports the scroll progress inside this detail container (0..1) to
      the parent so the constellation lockup can fade as user reads.
      Optional so HMR boundaries don't crash if the callback hasn't
      reconciled yet. */
  onScrollProgress?: (progress: number) => void;
}

/**
 * Section content for the expanded-constellation state.
 *
 * Rendered inside StarMap, beneath the lifted constellation. Content is the
 * old ConstellationPage stripped of all card chrome — flat scroll content
 * with brass-corner containment where needed.
 *
 * The constellation itself (lines + stars + name + practice) is drawn by
 * Constellation.tsx above this; we only render the section content below it.
 */
export function ConstellationDetail({
  constellation,
  onStarSelect,
  panelOpen,
  onScrollProgress,
}: ConstellationDetailProps) {
  const scrollRef = useRef<HTMLElement | null>(null);

  // Track scroll position inside the detail container. The parent uses
  // this to fade the constellation lockup as the user reads — so content
  // isn't occluded by the floating constellation overhead.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !onScrollProgress) return;
    const FADE_RANGE = 200; // px before constellation is fully faded
    const onScroll = () => {
      const t = Math.min(1, Math.max(0, el.scrollTop / FADE_RANGE));
      onScrollProgress(t);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [onScrollProgress]);

  return (
    <motion.section
      ref={scrollRef as React.RefObject<HTMLElement>}
      aria-labelledby={`expanded-${constellation.id}-heading`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT_QUART }}
      className="absolute inset-x-0 bottom-0 top-[50vh] z-20 overflow-y-auto pointer-events-auto bg-gradient-to-b from-[#0a0612]/0 via-[#0a0612]/95 to-[#0a0612]"
      style={{
        // Reserve space for the StarPanel (640px) on the right when open.
        // When closed, content centers normally.
        paddingRight: panelOpen ? 'min(660px, 92vw)' : undefined,
      }}
    >
      <div
        className={`px-6 pb-32 pt-12 ${
          panelOpen ? 'max-w-2xl mr-auto ml-12 lg:ml-20' : 'max-w-6xl mx-auto'
        }`}
      >
        {/* The Promise — pull-quote treatment, no card. */}
        <motion.div
          variants={sectionReveal}
          custom={0}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-3">
            The Promise
          </p>
          <h2
            id={`expanded-${constellation.id}-heading`}
            className="pull-quote font-display text-3xl md:text-4xl leading-tight text-[var(--paper)] max-w-3xl"
          >
            {constellation.promise}
          </h2>
        </motion.div>

        {/* What we make — three offerings, flat layout with brass corner marks. */}
        <motion.div
          variants={sectionReveal}
          custom={1}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-3">
            What we make
          </p>
          <motion.div
            variants={revealStagger}
            initial="hidden"
            animate="visible"
            className={`grid gap-x-10 gap-y-12 ${
              panelOpen ? 'grid-cols-1' : 'md:grid-cols-3'
            }`}
          >
            {constellation.offerings.map((offering, i) => {
              const OfferingIcon = iconForOffering(offering.name);
              return (
              <motion.div
                key={i}
                variants={revealItem}
                className="brass-corner py-6 px-5"
              >
                <div className="flex items-start justify-between mb-3 gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    {OfferingIcon && (
                      <OfferingIcon
                        className="w-4 h-4 text-[var(--brass)] mt-1.5 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <h3 className="font-display text-xl leading-tight">{offering.name}</h3>
                  </div>
                  <TierGlyph tier={(i + 1) as 1 | 2 | 3} />
                </div>
                <p className="font-mono text-sm text-[var(--brass)] mb-4">{offering.priceRange}</p>
                <dl className="space-y-1.5 mb-5 text-sm">
                  <div className="flex gap-2">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--purple-300)] shrink-0 pt-0.5">
                      Scope
                    </dt>
                    <dd className="text-[var(--lavender-200)]">{offering.scope}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-[var(--purple-300)] shrink-0 pt-0.5">
                      Time
                    </dt>
                    <dd className="text-[var(--lavender-200)]">{offering.timeline}</dd>
                  </div>
                </dl>
                <Accordion type="single" collapsible>
                  <AccordionItem value="details" className="border-[var(--border)]">
                    <AccordionTrigger className="text-sm text-[var(--purple-300)] hover:text-[var(--paper)] py-2">
                      What's included
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1.5 mt-2">
                        {offering.details.map((detail, j) => (
                          <li
                            key={j}
                            className="text-sm text-[var(--lavender-200)] flex items-start gap-2"
                          >
                            <span className="text-[var(--brass)] mt-1.5 w-1 h-1 rounded-full bg-[var(--brass)] shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* The Stars — flat list with thin baseline divider; click opens StarPanel. */}
        <motion.div
          variants={sectionReveal}
          custom={2}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-3">
            The Stars · case studies
          </p>
          <motion.ul
            variants={revealStagger}
            initial="hidden"
            animate="visible"
            className="divide-y divide-[var(--border)]"
          >
            {constellation.stars.map((star) => (
              <motion.li key={star.id} variants={revealItem}>
                <button
                  type="button"
                  onClick={() => onStarSelect(star.id)}
                  className="focus-ring focus-lift group w-full text-left rounded-md py-5 flex items-center gap-5 hover:pl-2 transition-[padding] duration-200"
                  aria-label={`Open case study: ${star.name} — ${star.metric}`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-[var(--paper)] shrink-0 group-hover:shadow-[0_0_14px_rgba(250,247,251,0.7)] transition-shadow"
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl leading-tight">{star.name}</h3>
                    <p className="text-sm text-[var(--lavender-200)] mt-0.5">{star.metric}</p>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--purple-300)] shrink-0">
                    {star.projectId} · {star.date}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[var(--brass)] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    →
                  </span>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Process — horizontal step rail. Numbered brass circles, no cards. */}
        <motion.div
          variants={sectionReveal}
          custom={3}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-3">
            Process
          </p>
          <div
            className={`process-rail grid gap-x-6 gap-y-10 relative pt-2 ${
              panelOpen ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {constellation.process.map((step) => {
              const StepIcon = iconForProcess(step.name);
              return (
              <div key={step.step} className="relative pl-12">
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full border border-[var(--brass)] flex items-center justify-center font-mono text-sm text-[var(--brass)] bg-[#0a0612]">
                  {String(step.step).padStart(2, '0')}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  {StepIcon && (
                    <StepIcon
                      className="w-3.5 h-3.5 text-[var(--brass)] shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  <h3 className="font-display text-lg leading-tight">{step.name}</h3>
                </div>
                <p className="text-sm text-[var(--lavender-200)] leading-relaxed">
                  {step.description}
                </p>
              </div>
              );
            })}
          </div>
        </motion.div>

        {/* Closing CTA — the only retained "card" pattern; brass cap line. */}
        <motion.div
          variants={sectionReveal}
          custom={4}
          initial="hidden"
          animate="visible"
          className="cta-block p-10 md:p-14 text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl mb-4">
            Ready to start with {constellation.name}?
          </h2>
          <p className="text-lg text-[var(--lavender-200)] mb-8 max-w-2xl mx-auto">
            Book a 30-minute discovery call. We'll discuss your project, walk
            through our process, and determine if we're the right fit.
          </p>
          <Link to="/hailing-frequency">
            <Button
              size="lg"
              className="bg-[var(--paper)] text-[var(--purple-900)] hover:bg-[var(--lavender-100)] font-bold text-base px-7 py-5"
            >
              Book a discovery call about {constellation.name} →
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
