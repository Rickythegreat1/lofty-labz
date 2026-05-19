import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Radio, Send, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useState } from 'react';

export default function HailingFrequencyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [showPacket, setShowPacket] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPacket(true);
    
    // Simulate packet animation
    setTimeout(() => {
      setShowPacket(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0a0612] text-white">
      {/* Ambient Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--purple-900)] to-transparent" />
      </div>

      {/* Packet Animation */}
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
              <Send className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

      <main id="main-content" className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <Radio className="w-16 h-16 mx-auto mb-6 text-[var(--purple-300)]" />
          <h1 className="font-display text-6xl mb-6">Hailing Frequency</h1>
          <p className="text-xl text-[var(--lavender-200)] max-w-3xl mx-auto">
            Ready to ship something real? Three ways to reach us.
          </p>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12 bg-green-900/20 border border-green-500/50 rounded-xl p-8 text-center"
            >
              <Check className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h2 className="font-display text-2xl mb-2">Received.</h2>
              <p className="text-[var(--lavender-200)]">
                We'll respond within one business day.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Options */}
        <Tabs defaultValue="discovery" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger value="discovery">Discovery Call</TabsTrigger>
            <TabsTrigger value="transmission">Send Transmission</TabsTrigger>
            <TabsTrigger value="custom">Custom Engagement</TabsTrigger>
          </TabsList>

          {/* Discovery Call */}
          <TabsContent value="discovery">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[var(--purple-900)] border border-[var(--border)] rounded-xl p-12"
            >
              <h2 className="font-display text-3xl mb-6">Book a 30-min Discovery Call</h2>
              <p className="text-lg text-[var(--lavender-200)] mb-8">
                We charge $500 for discovery calls. If we decide we're not the right fit, you get the $500 back. If we are the right fit and you hire us, the $500 applies to the project.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[var(--purple-500)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-bold mb-1">We discuss your project</p>
                    <p className="text-sm text-[var(--lavender-200)]">
                      What you believe is broken, what you've tried, what metrics matter.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[var(--purple-500)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-bold mb-1">We form a hypothesis</p>
                    <p className="text-sm text-[var(--lavender-200)]">
                      Together, we establish what success looks like and whether it's measurable.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[var(--purple-500)] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-bold mb-1">Go or no-go</p>
                    <p className="text-sm text-[var(--lavender-200)]">
                      Either we're the right fit (SOW within 48 hours), or we're not (full refund + referral).
                    </p>
                  </div>
                </div>
              </div>

              {/* Scheduling — interim mailto until Calendly is live */}
              <div className="bg-[var(--purple-700)]/30 border border-[var(--border)] rounded-lg p-12 text-center">
                <p className="text-[var(--lavender-200)] mb-6">
                  We&rsquo;re finalizing self-serve scheduling. In the meantime, send a note and we&rsquo;ll reply with the next two open slots.
                </p>
                <a
                  href="mailto:hello@loftylabz.com?subject=Discovery%20Call%20Request"
                  className="focus-ring inline-flex items-center justify-center rounded-md bg-[var(--purple-500)] hover:bg-[var(--purple-700)] text-white px-8 py-3 min-h-[44px] font-medium transition-colors"
                >
                  Schedule a Discovery Call →
                </a>
              </div>
            </motion.div>
          </TabsContent>

          {/* Send Transmission */}
          <TabsContent value="transmission">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[var(--purple-900)] border border-[var(--border)] rounded-xl p-12"
            >
              <h2 className="font-display text-3xl mb-6">Send a Transmission</h2>
              <p className="text-lg text-[var(--lavender-200)] mb-8">
                Not ready for a call? Send us a message. Tell us your name, your business, and what's broken. We'll respond within one business day.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Your name</Label>
                  <Input
                    id="name"
                    required
                    placeholder="Jane Smith"
                    className="bg-[var(--purple-700)]/30 border-[var(--border)] text-white placeholder:text-[var(--lavender-200)]/50"
                  />
                </div>

                <div>
                  <Label htmlFor="business">Your business</Label>
                  <Input
                    id="business"
                    required
                    placeholder="Business name or URL"
                    className="bg-[var(--purple-700)]/30 border-[var(--border)] text-white placeholder:text-[var(--lavender-200)]/50"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="jane@business.com"
                    className="bg-[var(--purple-700)]/30 border-[var(--border)] text-white placeholder:text-[var(--lavender-200)]/50"
                  />
                </div>

                <div>
                  <Label htmlFor="message">What's broken</Label>
                  <Textarea
                    id="message"
                    required
                    rows={6}
                    placeholder="Be specific. What have you tried? What metrics matter? What's not working?"
                    className="bg-[var(--purple-700)]/30 border-[var(--border)] text-white placeholder:text-[var(--lavender-200)]/50"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[var(--purple-500)] hover:bg-[var(--purple-700)] text-white font-bold"
                  disabled={submitted}
                >
                  {submitted ? 'Sent' : 'Send Transmission →'}
                </Button>
              </form>
            </motion.div>
          </TabsContent>

          {/* Custom Engagement */}
          <TabsContent value="custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[var(--purple-900)] border border-[var(--border)] rounded-xl p-12"
            >
              <h2 className="font-display text-3xl mb-6">Custom Engagements</h2>
              <p className="text-lg text-[var(--lavender-200)] mb-8">
                For projects above our productized tier bands (&gt;$70K), or for ongoing partnerships that don&apos;t fit our standard service constellation structure.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="custom-name">Your name</Label>
                    <Input
                      id="custom-name"
                      required
                      placeholder="Jane Smith"
                      className="bg-[var(--purple-700)]/30 border-[var(--border)] text-white placeholder:text-[var(--lavender-200)]/50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="custom-title">Title</Label>
                    <Input
                      id="custom-title"
                      required
                      placeholder="Head of Product"
                      className="bg-[var(--purple-700)]/30 border-[var(--border)] text-white placeholder:text-[var(--lavender-200)]/50"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="custom-company">Company</Label>
                  <Input
                    id="custom-company"
                    required
                    placeholder="Company name and website"
                    className="bg-[var(--purple-700)]/30 border-[var(--border)] text-white placeholder:text-[var(--lavender-200)]/50"
                  />
                </div>

                <div>
                  <Label htmlFor="custom-email">Email</Label>
                  <Input
                    id="custom-email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className="bg-[var(--purple-700)]/30 border-[var(--border)] text-white placeholder:text-[var(--lavender-200)]/50"
                  />
                </div>

                <div>
                  <Label htmlFor="custom-budget">Estimated budget range</Label>
                  <Input
                    id="custom-budget"
                    required
                    placeholder="$70K - $150K"
                    className="bg-[var(--purple-700)]/30 border-[var(--border)] text-white placeholder:text-[var(--lavender-200)]/50"
                  />
                </div>

                <div>
                  <Label htmlFor="custom-timeline">Desired timeline</Label>
                  <Input
                    id="custom-timeline"
                    required
                    placeholder="Q3 2026 launch"
                    className="bg-[var(--purple-700)]/30 border-[var(--border)] text-white placeholder:text-[var(--lavender-200)]/50"
                  />
                </div>

                <div>
                  <Label htmlFor="custom-scope">Project scope</Label>
                  <Textarea
                    id="custom-scope"
                    required
                    rows={8}
                    placeholder="Describe the project: what you're building, the problem it solves, what you need from us, and what success looks like. Be as specific as possible about measurable outcomes."
                    className="bg-[var(--purple-700)]/30 border-[var(--border)] text-white placeholder:text-[var(--lavender-200)]/50"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[var(--purple-500)] hover:bg-[var(--purple-700)] text-white font-bold"
                  disabled={submitted}
                >
                  {submitted ? 'Sent' : 'Submit Custom Request →'}
                </Button>
              </form>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Direct Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="font-display text-2xl mb-6">Or reach us directly</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-6">
              <h4 className="font-bold mb-2">Ricky Sanderson</h4>
              <p className="text-sm text-[var(--lavender-200)] mb-3">Partner</p>
              <div className="space-y-2 text-sm">
                <p>
                  <a href="mailto:hello@loftylabz.com" className="text-[var(--purple-300)] hover:text-white transition-colors">
                    hello@loftylabz.com
                  </a>
                </p>
                <p>
                  <a href="tel:317-800-4958" className="text-[var(--purple-300)] hover:text-white transition-colors">
                    317-800-4958
                  </a>
                </p>
              </div>
            </div>
            <div className="bg-[var(--purple-900)] border border-[var(--border)] rounded-lg p-6">
              <h4 className="font-bold mb-2">Zach Shanks</h4>
              <p className="text-sm text-[var(--lavender-200)] mb-3">Partner</p>
              <div className="space-y-2 text-sm">
                <p>
                  <a href="mailto:hello@loftylabz.com" className="text-[var(--purple-300)] hover:text-white transition-colors">
                    hello@loftylabz.com
                  </a>
                </p>
                <p>
                  <a href="tel:765-667-2346" className="text-[var(--purple-300)] hover:text-white transition-colors">
                    765-667-2346
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
