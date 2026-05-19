import { Link, useParams } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Phone, Beaker } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';

export default function TheLabPage() {
  const { section } = useParams<{ section?: string }>();
  const defaultTab = section || 'team';

  const team = [
    {
      name: 'Ricky Sanderson',
      role: 'Partner',
      email: 'hello@loftylabz.com',
      phone: '317-800-4958',
      bio: 'Spent 8 years building products at startups that shipped, failed, and occasionally succeeded. Believes most agency work is theater. Prefers contracts with numbers.',
      signatureProject: "Eddie's Trades (+47% conversion)",
      shipsWhat: 'Web applications, automation, the honest part of case studies'
    },
    {
      name: 'Zach Shanks',
      role: 'Partner',
      email: 'hello@loftylabz.com',
      phone: '765-667-2346',
      bio: 'Designer who codes. Former in-house at a VC firm. Thinks motion is language, not decoration. Has strong opinions about whitespace.',
      signatureProject: 'Bright Path Wellness (3x engagement)',
      shipsWhat: 'Brand systems, UI/UX, content strategy, the things people remember'
    },
    {
      name: 'Partner #3',
      role: 'Partner (TBD)',
      email: 'partners@loftylabz.com',
      phone: '',
      bio: 'This seat is reserved for someone who ships, not pitches. Someone who prefers written guarantees to verbal promises. Someone Phoenix-based.',
      signatureProject: 'To be determined',
      shipsWhat: 'The third leg of the stool'
    }
  ];

  const processSteps = [
    {
      phase: '01',
      name: 'Discovery',
      duration: '3-5 days',
      deliverable: 'Hypothesis, baseline metrics, go/no-go decision',
      description: 'We start with a paid discovery call ($500, refunded if we\'re not the right fit). We document what you believe is broken, review your analytics, interview users if applicable, and form a testable hypothesis. We establish baseline metrics. We decide together if the engagement makes sense.'
    },
    {
      phase: '02',
      name: 'SOW & Guarantee',
      duration: '2-3 days',
      deliverable: 'Signed Statement of Work with contractual outcome',
      description: 'We write the SOW in plain English. The outcome guarantee is specific and measurable (e.g., "Increase mobile conversion by 30% within 90 days post-launch"). The refund terms are simple. The timeline is realistic. We send it, you review it with legal if needed, we both sign it.'
    },
    {
      phase: '03',
      name: 'Build',
      duration: 'Varies by project',
      deliverable: 'Working product, staged releases, weekly updates',
      description: 'We ship in increments when possible. We show you work-in-progress, not polished presentations. We test on real devices. We iterate based on data. We communicate via Slack or email—whichever you prefer. We don\'t schedule meetings we don\'t need.'
    },
    {
      phase: '04',
      name: 'Pre-Launch',
      duration: '1-2 weeks',
      deliverable: 'QA, performance audit, training, documentation',
      description: 'We audit performance against targets (load time, accessibility, SEO). We train your team on anything they need to operate. We document technical decisions. We set up monitoring and analytics. We rehearse the launch if it\'s complex.'
    },
    {
      phase: '05',
      name: 'Launch',
      duration: '1 day',
      deliverable: 'Live product, launch checklist completion',
      description: 'We deploy. We monitor. We\'re available for immediate fixes. The guarantee measurement period begins here (typically 90 days). We schedule a post-launch check-in for day 7.'
    },
    {
      phase: '06',
      name: 'Measurement & Care',
      duration: '90 days minimum',
      deliverable: 'Performance reports, guarantee assessment, ongoing optimization',
      description: 'We track against the baseline. We report monthly. At the end of the guarantee period, we assess: did we hit it? If yes, engagement complete (or transition to Care retainer). If no, refund per SOW terms. Either way, we document what we learned.'
    }
  ];

  const manifestoPillars = [
    {
      number: '01',
      title: 'Proof over promises',
      content: 'Every case study includes a yes/no field: did we meet the contractual guarantee? Every engagement is backed by a written outcome and a reserve fund. We don\'t pitch capabilities—we show receipts. Our competitive advantage isn\'t what we say we can do; it\'s what we\'ve already done and can prove.'
    },
    {
      number: '02',
      title: 'Motion as language',
      content: 'Animation isn\'t decoration. It\'s information architecture. Every transition we design communicates state, hierarchy, or relationship. If it doesn\'t, we cut it. Motion is how we explain the interface without writing instructions. It\'s how we create spatial continuity. It\'s how we buy time while content loads. Motion is a sentence, not a flourish.'
    },
    {
      number: '03',
      title: 'AI as multiplier',
      content: 'AI is not magic. It\'s a calculator for patterns. We build AI workflows that remove steps people hate—invoice generation from field notes, lead qualification from form data, content briefs from raw research. We don\'t build AI that requires babysitting. If the human has to override the AI more than 30% of the time, we redesign it. If it stays above 30%, we kill it.'
    },
    {
      number: '04',
      title: 'Phoenix-first',
      content: 'We\'re not trying to be a coastal agency. Lower overhead means we compete on price without sacrificing quality. A growing ecosystem means early access to ambitious companies. A collaborative culture means less ego, more shipping. Phoenix businesses don\'t have patience for agency theater—that pressure makes us better. Every piece of work we ship has PHX, AZ in the footer.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0612] text-white">
      {/* Ambient Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--purple-900)] to-transparent" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0612]/85 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="focus-ring rounded-md flex items-center gap-2 text-[var(--purple-300)] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to map</span>
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
                  <path d="M5 3 L5 15 Q10 18 15 15 L15 3" fill="none" stroke="var(--paper)" strokeWidth="1.5" />
                </g>
              </svg>
            </div>
            <span className="font-display text-lg tracking-tight uppercase">Lofty Labz</span>
          </Link>
        </div>
      </header>

      <main id="main-content" className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Beaker className="w-16 h-16 mx-auto mb-6 text-[var(--purple-300)]" />
          <h1 className="font-display text-6xl mb-6">The Lab</h1>
          <p className="text-xl text-[var(--lavender-200)] max-w-3xl mx-auto">
            A digital lab in Phoenix. We ship work that performs, or we don't ship it. Every engagement is backed by a written guarantee.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="manifesto">Manifesto</TabsTrigger>
          </TabsList>

          {/* Team Content */}
          <TabsContent value="team">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {team.map((person, i) => (
                <div
                  key={i}
                  className="bg-[var(--purple-900)] border border-[var(--border)] rounded-xl p-8 md:p-12"
                >
                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Lab Badge */}
                    <div className="flex flex-col items-center text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-[var(--purple-500)] to-[var(--purple-700)] rounded-full flex items-center justify-center font-display text-5xl mb-4 border-4 border-[var(--border)]">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <h3 className="font-display text-2xl mb-1">{person.name}</h3>
                      <p className="text-[var(--purple-300)] font-mono text-sm uppercase mb-4">
                        {person.role}
                      </p>
                      <div className="space-y-2 text-sm">
                        {person.email && (
                          <a
                            href={`mailto:${person.email}`}
                            className="focus-ring rounded-md flex items-center gap-2 text-[var(--lavender-200)] hover:text-white transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            {person.email}
                          </a>
                        )}
                        {person.phone && (
                          <a
                            href={`tel:${person.phone}`}
                            className="focus-ring rounded-md flex items-center gap-2 text-[var(--lavender-200)] hover:text-white transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            {person.phone}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Bio & Details */}
                    <div className="md:col-span-2 space-y-6">
                      <p className="text-lg text-[var(--lavender-200)] leading-relaxed">
                        {person.bio}
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-[var(--purple-700)]/30 border border-[var(--border)] rounded-lg p-4">
                          <p className="text-xs text-[var(--purple-300)] font-mono uppercase mb-2">
                            Ships What
                          </p>
                          <p className="text-sm text-white">{person.shipsWhat}</p>
                        </div>
                        <div className="bg-[var(--purple-700)]/30 border border-[var(--border)] rounded-lg p-4">
                          <p className="text-xs text-[var(--purple-300)] font-mono uppercase mb-2">
                            Signature Project
                          </p>
                          <p className="text-sm text-white">{person.signatureProject}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Process Content */}
          <TabsContent value="process">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="text-center mb-12">
                <p className="text-xl text-[var(--lavender-200)] max-w-3xl mx-auto">
                  How an engagement runs from discovery → SOW → kickoff → ship → care.
                  Typical timelines and price bands vary by constellation.
                </p>
              </div>

              {processSteps.map((step, i) => (
                <div
                  key={i}
                  className="bg-[var(--purple-900)] border border-[var(--border)] rounded-xl p-8 relative"
                >
                  {/* Phase Number */}
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-[var(--purple-500)] rounded-full flex items-center justify-center font-mono text-2xl font-bold border-4 border-[#0a0612]">
                    {step.phase}
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 ml-8">
                    <div>
                      <h3 className="font-display text-2xl mb-2">{step.name}</h3>
                      <p className="text-[var(--purple-300)] font-mono text-sm mb-3">
                        {step.duration}
                      </p>
                      <p className="text-sm text-[var(--lavender-200)] font-bold">
                        Deliverable:
                      </p>
                      <p className="text-sm text-[var(--lavender-200)]">
                        {step.deliverable}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-base text-[var(--lavender-200)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow to next step */}
                  {i < processSteps.length - 1 && (
                    <div className="text-center mt-6 text-[var(--purple-300)]">
                      ↓
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Manifesto Content */}
          <TabsContent value="manifesto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div className="text-center mb-12">
                <p className="text-xl text-[var(--lavender-200)] max-w-3xl mx-auto">
                  Four principles we operate by. Not aspirational—operational. These guide every decision, every engagement, every line of code.
                </p>
              </div>

              {manifestoPillars.map((pillar, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-[var(--purple-900)] to-[var(--purple-900)]/50 border border-[var(--border)] rounded-xl p-12"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-20 h-20 bg-[var(--purple-500)] rounded-lg flex items-center justify-center font-mono text-3xl font-bold">
                      {pillar.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-3xl mb-6">{pillar.title}</h3>
                      <p className="text-lg text-[var(--lavender-200)] leading-relaxed">
                        {pillar.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 bg-gradient-to-br from-[var(--purple-500)] to-[var(--purple-700)] rounded-2xl p-12 text-center"
        >
          <h2 className="font-display text-4xl mb-4">Want to work with the lab?</h2>
          <p className="text-xl text-[var(--lavender-200)] mb-8 max-w-2xl mx-auto">
            Book a discovery call. We'll discuss your project, establish measurable outcomes, and determine if we're the right fit.
          </p>
          <Link to="/hailing-frequency">
            <Button
              size="lg"
              className="bg-white text-[var(--purple-900)] hover:bg-[var(--lavender-100)] font-bold text-lg px-8 py-6"
            >
              Book a call →
            </Button>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
