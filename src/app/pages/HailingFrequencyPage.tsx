import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Send, Check } from 'lucide-react';
import { LottieAnimation } from '../components/diagrams/LottieAnimation';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useState } from 'react';
import { useDocumentMeta } from '../lib/useDocumentMeta';
import { sectionReveal } from '../lib/choreography';

export default function HailingFrequencyPage() {
  useDocumentMeta({
    title: 'Hailing Frequency — Book a discovery call · Lofty Labz',
    description:
      'Open a hailing frequency with Lofty Labz. Schedule a 30-minute discovery call or send a transmission about your project.',
  });

  const [submitted, setSubmitted] = useState(false);
  const [showPacket, setShowPacket] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPacket(true);
    setTimeout(() => {
      setShowPacket(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0a0612] text-[var(--paper)]">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--purple-900)] to-transparent" />
      </div>

      <AnimatePresence>
        {showPacket && (
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-16 h-16 bg-[var(--purple-500)] rounded-lg flex items-center justify-center"
              initial={{ scale: 1, y: 0 }}
              animate={{ scale: 0.2, y: -500 }}
              transition={{ duration: 1.2, ease: 'easeIn' }}
            >
              <Send className="w-8 h-8 text-[var(--paper)]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

      <main id="main-content" className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <motion.div
          variants={sectionReveal}
          custom={0}
          initial="hidden"
          animate="visible"
          className="mb-16 text-center"
        >
          {/* Animated brass-pulse Lottie — the radio's signal made visible.
              Replaces the static Radio Lucide icon while keeping the same
              visual weight and palette. */}
          <div className="w-32 h-32 mx-auto mb-4">
            <LottieAnimation
              src="/lottie/brass-pulse.json"
              ariaLabel="Hailing frequency — open signal"
            />
          </div>
          <h1 className="font-display text-5xl md:text-6xl mb-6">Hailing Frequency</h1>
          <p className="text-xl text-[var(--lavender-200)] max-w-3xl mx-auto">
            Ready to ship something real? Three ways to reach us.
          </p>
        </motion.div>

        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12 brass-corner py-8 px-10 text-center"
            >
              <div
                className="w-12 h-12 mx-auto mb-4 rounded-full border border-[var(--brass)] flex items-center justify-center"
                style={{ boxShadow: '0 0 24px rgba(201, 169, 97, 0.35)' }}
              >
                <Check className="w-6 h-6 text-[var(--brass)]" />
              </div>
              <h2 className="font-display text-2xl mb-2">Received.</h2>
              <p className="text-[var(--lavender-200)]">
                We'll respond within one business day.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <Tabs defaultValue="discovery" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger value="discovery">Discovery Call</TabsTrigger>
            <TabsTrigger value="transmission">Send Transmission</TabsTrigger>
            <TabsTrigger value="custom">Custom Engagement</TabsTrigger>
          </TabsList>

          {/* DISCOVERY — flat layout, brass step glyphs, no card wrapper. */}
          <TabsContent value="discovery">
            <motion.div
              variants={sectionReveal}
              custom={1}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <header>
                <h2 className="font-display text-3xl mb-4">Book a 30-min Discovery Call</h2>
                <p className="text-lg text-[var(--lavender-200)]">
                  We charge $500 for discovery calls. If we decide we're not the right fit,
                  you get the $500 back. If we are the right fit and you hire us, the $500
                  applies to the project.
                </p>
              </header>

              <ol className="space-y-5">
                {[
                  {
                    n: '01',
                    title: 'We discuss your project',
                    body: "What you believe is broken, what you've tried, what metrics matter.",
                  },
                  {
                    n: '02',
                    title: 'We form a hypothesis',
                    body: "Together, we establish what success looks like and whether it's measurable.",
                  },
                  {
                    n: '03',
                    title: 'Go or no-go',
                    body: "Either we're the right fit (SOW within 48 hours), or we're not (full refund + referral).",
                  },
                ].map((step) => (
                  <li key={step.n} className="flex gap-5">
                    <span
                      className="shrink-0 w-10 h-10 rounded-full border border-[var(--brass)] flex items-center justify-center font-mono text-xs text-[var(--brass)]"
                      aria-hidden="true"
                    >
                      {step.n}
                    </span>
                    <div>
                      <p className="font-display text-lg leading-tight mb-1">{step.title}</p>
                      <p className="text-sm text-[var(--lavender-200)]">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="brass-corner p-10 text-center">
                <p className="text-[var(--lavender-200)] mb-6">
                  We're finalizing self-serve scheduling. In the meantime, send a note
                  and we'll reply with the next two open slots.
                </p>
                <a
                  href="mailto:hello@loftylabz.com?subject=Discovery%20Call%20Request"
                  className="focus-ring focus-lift inline-flex items-center justify-center rounded-md bg-[var(--purple-500)] hover:bg-[var(--purple-700)] text-[var(--paper)] px-8 py-3 min-h-[44px] font-medium transition-colors"
                >
                  Schedule a Discovery Call →
                </a>
              </div>
            </motion.div>
          </TabsContent>

          {/* TRANSMISSION — form with no outer card. */}
          <TabsContent value="transmission">
            <motion.div
              variants={sectionReveal}
              custom={1}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <header>
                <h2 className="font-display text-3xl mb-4">Send a Transmission</h2>
                <p className="text-lg text-[var(--lavender-200)]">
                  Not ready for a call? Send us a message. Tell us your name, your business,
                  and what's broken. We'll respond within one business day.
                </p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Your name</Label>
                  <Input
                    id="name"
                    required
                    placeholder="Jane Smith"
                    className="bg-[var(--purple-700)]/30 border-[var(--border)] text-[var(--paper)] placeholder:text-[var(--lavender-200)]/50"
                  />
                </div>

                <div>
                  <Label htmlFor="business">Your business</Label>
                  <Input
                    id="business"
                    required
                    placeholder="Business name or URL"
                    className="bg-[var(--purple-700)]/30 border-[var(--border)] text-[var(--paper)] placeholder:text-[var(--lavender-200)]/50"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="jane@business.com"
                    className="bg-[var(--purple-700)]/30 border-[var(--border)] text-[var(--paper)] placeholder:text-[var(--lavender-200)]/50"
                  />
                </div>

                <div>
                  <Label htmlFor="message">What's broken</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    placeholder="Be specific. What have you tried? What metrics matter? What's not working?"
                    className="bg-[var(--purple-700)]/30 border-[var(--border)] text-[var(--paper)] placeholder:text-[var(--lavender-200)]/50"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[var(--purple-500)] hover:bg-[var(--purple-700)] text-[var(--paper)] font-bold"
                  disabled={submitted}
                >
                  {submitted ? 'Sent' : 'Send Transmission →'}
                </Button>
              </form>
            </motion.div>
          </TabsContent>

          {/* CUSTOM ENGAGEMENT — form with no outer card. */}
          <TabsContent value="custom">
            <motion.div
              variants={sectionReveal}
              custom={1}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <header>
                <h2 className="font-display text-3xl mb-4">Custom Engagements</h2>
                <p className="text-lg text-[var(--lavender-200)]">
                  For projects above our productized tier bands (&gt;$70K), or for ongoing
                  partnerships that don't fit our standard service constellation structure.
                </p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="custom-name">Your name</Label>
                    <Input id="custom-name" required placeholder="Jane Smith" className="bg-[var(--purple-700)]/30 border-[var(--border)] text-[var(--paper)] placeholder:text-[var(--lavender-200)]/50" />
                  </div>
                  <div>
                    <Label htmlFor="custom-title">Title</Label>
                    <Input id="custom-title" required placeholder="Head of Product" className="bg-[var(--purple-700)]/30 border-[var(--border)] text-[var(--paper)] placeholder:text-[var(--lavender-200)]/50" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="custom-company">Company</Label>
                  <Input id="custom-company" required placeholder="Company name and website" className="bg-[var(--purple-700)]/30 border-[var(--border)] text-[var(--paper)] placeholder:text-[var(--lavender-200)]/50" />
                </div>
                <div>
                  <Label htmlFor="custom-email">Email</Label>
                  <Input id="custom-email" type="email" required placeholder="jane@company.com" className="bg-[var(--purple-700)]/30 border-[var(--border)] text-[var(--paper)] placeholder:text-[var(--lavender-200)]/50" />
                </div>
                <div>
                  <Label htmlFor="custom-budget">Estimated budget range</Label>
                  <Input id="custom-budget" required placeholder="$70K - $150K" className="bg-[var(--purple-700)]/30 border-[var(--border)] text-[var(--paper)] placeholder:text-[var(--lavender-200)]/50" />
                </div>
                <div>
                  <Label htmlFor="custom-timeline">Desired timeline</Label>
                  <Input id="custom-timeline" required placeholder="Q3 2026 launch" className="bg-[var(--purple-700)]/30 border-[var(--border)] text-[var(--paper)] placeholder:text-[var(--lavender-200)]/50" />
                </div>
                <div>
                  <Label htmlFor="custom-scope">Project scope</Label>
                  <Textarea
                    id="custom-scope"
                    required
                    rows={8}
                    placeholder="Describe the project: what you're building, the problem it solves, what you need from us, and what success looks like."
                    className="bg-[var(--purple-700)]/30 border-[var(--border)] text-[var(--paper)] placeholder:text-[var(--lavender-200)]/50"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[var(--purple-500)] hover:bg-[var(--purple-700)] text-[var(--paper)] font-bold"
                  disabled={submitted}
                >
                  {submitted ? 'Sent' : 'Submit Custom Request →'}
                </Button>
              </form>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Direct Contact — flat list of partners. No cards. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--brass)] mb-3 text-center">
            Or reach us directly
          </p>
          <div className="grid md:grid-cols-2 gap-10 max-w-2xl mx-auto">
            {[
              { name: 'Ricky Sanderson', email: 'hello@loftylabz.com', phone: '317-800-4958' },
              { name: 'Zach Shanks', email: 'hello@loftylabz.com', phone: '765-667-2346' },
            ].map((p) => (
              <div key={p.name} className="text-center md:text-left">
                <h3 className="font-display text-xl mb-1">{p.name}</h3>
                <p className="text-sm text-[var(--purple-300)] mb-3 font-mono uppercase tracking-wider">
                  Partner
                </p>
                <div className="space-y-1 text-sm">
                  <p>
                    <a
                      href={`mailto:${p.email}`}
                      className="focus-ring focus-lift rounded-md text-[var(--purple-300)] hover:text-[var(--paper)] transition-colors"
                    >
                      <span className="underline-draw">{p.email}</span>
                    </a>
                  </p>
                  <p>
                    <a
                      href={`tel:${p.phone}`}
                      className="focus-ring focus-lift rounded-md text-[var(--purple-300)] hover:text-[var(--paper)] transition-colors"
                    >
                      <span className="underline-draw">{p.phone}</span>
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
