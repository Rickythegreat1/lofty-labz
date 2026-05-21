import { Link, useParams } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Phone, Beaker } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { ProcessFlow } from '../components/diagrams/ProcessFlow';
import { ManifestoPillar } from '../components/diagrams/ManifestoPillar';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { sectionReveal } from '../lib/choreography';

export default function TheLabPage() {
  const { section } = useParams<{ section?: string }>();
  const defaultTab = section || 'team';

  useDocumentMeta({
    title: 'The Lab — Team, methodology, and ways of working · Lofty Labz',
    description:
      'Meet the team behind Lofty Labz and read how we run discovery, execution, and measurement on every engagement.',
  });

  const team = [
    {
      name: 'Ricky Sanderson',
      role: 'Partner',
      email: 'hello@loftylabz.com',
      phone: '317-800-4958',
      bio: "Spent 8 years building products at startups that shipped, failed, and occasionally succeeded. Believes most agency work is theater. Prefers contracts with numbers.",
      signatureProject: "Eddie's Trades (+47% conversion)",
      shipsWhat: 'Web applications, automation, the honest part of case studies',
    },
    {
      name: 'Zach Shanks',
      role: 'Partner',
      email: 'hello@loftylabz.com',
      phone: '765-667-2346',
      bio: 'Designer who codes. Former in-house at a VC firm. Thinks motion is language, not decoration. Has strong opinions about whitespace.',
      signatureProject: 'Bright Path Wellness (3x engagement)',
      shipsWhat: 'Brand systems, UI/UX, content strategy, the things people remember',
    },
    {
      name: 'Partner #3',
      role: 'Partner (TBD)',
      email: 'partners@loftylabz.com',
      phone: '',
      bio: 'This seat is reserved for someone who ships, not pitches. Someone who prefers written guarantees to verbal promises. Someone Phoenix-based.',
      signatureProject: 'To be determined',
      shipsWhat: 'The third leg of the stool',
    },
  ];

  const processSteps = [
    {
      phase: '01',
      name: 'Discovery',
      duration: '3-5 days',
      deliverable: 'Hypothesis, baseline metrics, go/no-go decision',
      description:
        "We start with a paid discovery call ($500, refunded if we're not the right fit). We document what you believe is broken, review your analytics, interview users if applicable, and form a testable hypothesis. We establish baseline metrics. We decide together if the engagement makes sense.",
    },
    {
      phase: '02',
      name: 'SOW & Guarantee',
      duration: '2-3 days',
      deliverable: 'Signed Statement of Work with contractual outcome',
      description:
        'We write the SOW in plain English. The outcome guarantee is specific and measurable (e.g., "Increase mobile conversion by 30% within 90 days post-launch"). The refund terms are simple. The timeline is realistic. We send it, you review it with legal if needed, we both sign it.',
    },
    {
      phase: '03',
      name: 'Build',
      duration: 'Varies',
      deliverable: 'Working product, staged releases, weekly updates',
      description:
        "We ship in increments when possible. We show you work-in-progress, not polished presentations. We test on real devices. We iterate based on data. We communicate via Slack or email—whichever you prefer. We don't schedule meetings we don't need.",
    },
    {
      phase: '04',
      name: 'Pre-Launch',
      duration: '1-2 weeks',
      deliverable: 'QA, performance audit, training, documentation',
      description:
        "We audit performance against targets (load time, accessibility, SEO). We train your team on anything they need to operate. We document technical decisions. We set up monitoring and analytics. We rehearse the launch if it's complex.",
    },
    {
      phase: '05',
      name: 'Launch',
      duration: '1 day',
      deliverable: 'Live product, launch checklist completion',
      description:
        "We deploy. We monitor. We're available for immediate fixes. The guarantee measurement period begins here (typically 90 days). We schedule a post-launch check-in for day 7.",
    },
    {
      phase: '06',
      name: 'Measurement',
      duration: '90 days min',
      deliverable: 'Performance reports, guarantee assessment',
      description:
        'We track against the baseline. We report monthly. At the end of the guarantee period, we assess: did we hit it? If yes, engagement complete (or transition to Care retainer). If no, refund per SOW terms. Either way, we document what we learned.',
    },
  ];

  const manifestoPillars = [
    {
      pillar: 'proof' as const,
      number: '01',
      title: 'Proof over promises',
      content:
        "Every case study includes a yes/no field: did we meet the contractual guarantee? Every engagement is backed by a written outcome and a reserve fund. We don't pitch capabilities—we show receipts. Our competitive advantage isn't what we say we can do; it's what we've already done and can prove.",
    },
    {
      pillar: 'motion' as const,
      number: '02',
      title: 'Motion as language',
      content:
        "Animation isn't decoration. It's information architecture. Every transition we design communicates state, hierarchy, or relationship. If it doesn't, we cut it. Motion is how we explain the interface without writing instructions. It's how we create spatial continuity. It's how we buy time while content loads. Motion is a sentence, not a flourish.",
    },
    {
      pillar: 'ai' as const,
      number: '03',
      title: 'AI as multiplier',
      content:
        "AI is not magic. It's a calculator for patterns. We build AI workflows that remove steps people hate—invoice generation from field notes, lead qualification from form data, content briefs from raw research. We don't build AI that requires babysitting. If the human has to override the AI more than 30% of the time, we redesign it. If it stays above 30%, we kill it.",
    },
    {
      pillar: 'phoenix' as const,
      number: '04',
      title: 'Phoenix-first',
      content:
        "We're not trying to be a coastal agency. Lower overhead means we compete on price without sacrificing quality. A growing ecosystem means early access to ambitious companies. A collaborative culture means less ego, more shipping. Phoenix businesses don't have patience for agency theater—that pressure makes us better. Every piece of work we ship has PHX, AZ in the footer.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0612] text-[var(--paper)]">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--purple-900)] to-transparent" />
      </div>

      <header className="sticky top-0 z-50 bg-[#0a0612]/85 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="focus-ring focus-lift rounded-md flex items-center gap-2 text-[var(--purple-300)] hover:text-[var(--paper)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="underline-draw">Back to map</span>
          </Link>
          <Link to="/" className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  d="M50 10 A40 40 0 0 1 50 90 Q35 75 35 50 Q35 25 50 10"
                  fill="var(--purple-500)"
                  stroke="none"
                />
                <g transform="translate(42, 35)">
                  <rect x="5" y="0" width="10" height="3" fill="var(--paper)" />
                  <path
                    d="M5 3 L5 15 Q10 18 15 15 L15 3"
                    fill="none"
                    stroke="var(--paper)"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </div>
            <span className="font-display text-lg tracking-tight uppercase">Lofty Labz</span>
          </Link>
        </div>
      </header>

      <main id="main-content" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div
          variants={sectionReveal}
          custom={0}
          initial="hidden"
          animate="visible"
          className="mb-16 text-center"
        >
          <Beaker className="w-12 h-12 mx-auto mb-6 text-[var(--brass)]" />
          <h1 className="font-display text-5xl md:text-6xl mb-6">The Lab</h1>
          <p className="text-xl text-[var(--lavender-200)] max-w-3xl mx-auto">
            A digital lab in Phoenix. We ship work that performs, or we don't
            ship it. Every engagement is backed by a written guarantee.
          </p>
        </motion.div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-16">
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="manifesto">Manifesto</TabsTrigger>
          </TabsList>

          {/* TEAM — no cards. Two-column asymmetric layout with brass-corner
              monogram block. Photos can drop into the monogram slot later. */}
          <TabsContent value="team">
            <div className="space-y-20">
              {team.map((person, i) => (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`grid md:grid-cols-12 gap-8 items-start ${
                    i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div className="md:col-span-4 flex md:justify-center">
                    <div className="brass-corner w-40 h-40 flex items-center justify-center font-display text-5xl text-[var(--brass)] bg-gradient-to-br from-[var(--purple-900)] to-[var(--purple-700)]/50">
                      {person.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                  </div>
                  <div className="md:col-span-8 space-y-5">
                    <header>
                      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-1">
                        {person.role}
                      </p>
                      <h3 className="font-display text-3xl md:text-4xl leading-tight">
                        {person.name}
                      </h3>
                    </header>
                    <p className="text-base text-[var(--lavender-200)] leading-relaxed">
                      {person.bio}
                    </p>
                    <dl className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-sm border-t border-[var(--border)] pt-4">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-wider text-[var(--brass)] mb-1">
                          Ships
                        </dt>
                        <dd className="text-[var(--lavender-200)]">{person.shipsWhat}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-wider text-[var(--brass)] mb-1">
                          Signature
                        </dt>
                        <dd className="text-[var(--lavender-200)]">{person.signatureProject}</dd>
                      </div>
                    </dl>
                    {(person.email || person.phone) && (
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm pt-2">
                        {person.email && (
                          <a
                            href={`mailto:${person.email}`}
                            className="focus-ring focus-lift rounded-md flex items-center gap-2 text-[var(--lavender-200)] hover:text-[var(--paper)] transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            <span className="underline-draw">{person.email}</span>
                          </a>
                        )}
                        {person.phone && (
                          <a
                            href={`tel:${person.phone}`}
                            className="focus-ring focus-lift rounded-md flex items-center gap-2 text-[var(--lavender-200)] hover:text-[var(--paper)] transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            <span className="underline-draw">{person.phone}</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </TabsContent>

          {/* PROCESS — ProcessFlow diagram replaces the card grid. */}
          <TabsContent value="process">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="text-xl text-[var(--lavender-200)]">
                How an engagement runs from discovery → SOW → kickoff → ship → care.
                Typical timelines and price bands vary by constellation.
              </p>
            </div>
            <ProcessFlow phases={processSteps} />
          </TabsContent>

          {/* MANIFESTO — ManifestoPillar glyphs replace the card grid. */}
          <TabsContent value="manifesto">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <p className="text-xl text-[var(--lavender-200)]">
                Four principles we operate by. Not aspirational—operational.
                These guide every decision, every engagement, every line of code.
              </p>
            </div>
            <div className="space-y-24">
              {manifestoPillars.map((p, i) => (
                <ManifestoPillar
                  key={p.pillar}
                  pillar={p.pillar}
                  number={p.number}
                  title={p.title}
                  content={p.content}
                  index={i}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="cta-block mt-24 p-12 text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl mb-4">Want to work with the lab?</h2>
          <p className="text-lg text-[var(--lavender-200)] mb-8 max-w-2xl mx-auto">
            Book a discovery call. We'll discuss your project, establish
            measurable outcomes, and determine if we're the right fit.
          </p>
          <Link to="/hailing-frequency">
            <Button
              size="lg"
              className="bg-[var(--paper)] text-[var(--purple-900)] hover:bg-[var(--lavender-100)] font-bold text-base px-7 py-5"
            >
              Book a call →
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
