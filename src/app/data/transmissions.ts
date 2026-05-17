export interface Transmission {
  id: string;
  slug: string;
  txId: string;
  date: string;
  subject: string;
  tags: string[];
  constellation?: string;
  author: string;
  readTime: string;
  excerpt: string;
  content: string[];
}

export const transmissions: Transmission[] = [
  {
    id: 'tx-041',
    slug: 'why-your-agencys-case-studies-are-propaganda',
    txId: 'TX-041',
    date: '04/22/2026',
    subject: 'Why your agency\'s case studies are propaganda',
    tags: ['process', 'transparency'],
    constellation: 'the-build',
    author: 'Ricky Sanderson',
    readTime: '6 min',
    excerpt: 'Every case study I\'ve read this month follows the same script: problem, solution, amazing results, client testimonial. None mention what didn\'t work. None show the guarantee.',
    content: [
      'Every case study I\'ve read this month follows the same script: problem, solution, amazing results, client testimonial in a pull quote. Designed in Figma with a carefully selected hero shot. The numbers are always round and impressive.',
      'Here\'s what none of them include: what didn\'t work. What we\'d do differently. Whether the contractual outcome was met. The honest parts.',
      'We decided our case studies would be different. We call them Lab Notebooks instead of case studies. They include a section called "Notes" where we document what we\'d change next time. They include a yes/no field: "Guarantee Outcome: Met/Not Met."',
      'Here\'s why this matters: if your case study doesn\'t include the parts where you learned something, it\'s not a case study—it\'s a sales brochure. And if you can\'t show me the contractual guarantee you backed it with, I don\'t believe your numbers.',
      'The Lab Notebook format is our way of turning case studies into accountability documents. It makes them harder to write. It makes us look less perfect. But it makes the work real.',
      'If you\'re a founder evaluating agencies, here\'s the test: ask them to show you a project that didn\'t go as planned, and what they learned. If they can\'t, they\'re performing perfection instead of doing the work.'
    ]
  },
  {
    id: 'tx-040',
    slug: 'the-phoenix-advantage',
    txId: 'TX-040',
    date: '04/18/2026',
    subject: 'The Phoenix advantage (and why we won\'t leave)',
    tags: ['manifesto', 'local'],
    author: 'Zach Shanks',
    readTime: '5 min',
    excerpt: 'Every agency coast-based thinks they need to be in SF or NYC to be relevant. We think that\'s backward. Phoenix is our moat.',
    content: [
      'Every agency on the coasts thinks they need to be in SF or NYC to be relevant. We think that\'s backward. Phoenix is our moat.',
      'Here\'s what Phoenix gives us: lower overhead means we can compete on price without sacrificing quality. A growing tech ecosystem means we get early access to ambitious companies before they scale nationally. A collaborative culture means less ego, more shipping.',
      'But the real advantage is philosophical. Phoenix businesses don\'t have patience for agency theater. They want results, not pitch decks. They want guarantees, not promises. That pressure has made us better.',
      'We\'ve turned down clients who wanted us to relocate to their city. We\'ve turned down clients who wanted face-to-face meetings every week (we do video). We build for outcomes, not proximity.',
      'If you\'re a Phoenix business, you already know this. If you\'re not, here\'s what you need to know: we\'re not trying to be a coastal agency. We\'re trying to be the best lab in the desert. That\'s the whole strategy.',
      'Every piece of work we ship has "PHX, AZ" in the footer. That\'s not branding. That\'s a commitment.'
    ]
  },
  {
    id: 'tx-039',
    slug: 'ai-workflows-that-actually-work',
    txId: 'TX-039',
    date: '04/10/2026',
    subject: 'AI workflows that actually work (no hype)',
    tags: ['AI', 'automation', 'process'],
    constellation: 'the-engine',
    author: 'Ricky Sanderson',
    readTime: '8 min',
    excerpt: 'Most AI demos are impressive. Most AI implementations are disappointing. Here\'s what we\'ve learned building automations that clients actually use.',
    content: [
      'Most AI demos are impressive. Most AI implementations are disappointing. The gap is the difference between "can it work?" and "will they use it?"',
      'We\'ve built a dozen AI-powered workflows in the last 6 months. Half of them are in daily use. Half are abandoned. The difference isn\'t the technology—it\'s the design.',
      'Here\'s what works: AI that removes a step people hate. Invoice generation from field notes. Lead qualification from form submissions. Content briefs from raw data. The pattern is always the same—take something tedious and make it instant.',
      'Here\'s what doesn\'t work: AI that adds a new step. "Review this AI-generated report and fix it." "Check this AI suggestion before proceeding." If your AI requires babysitting, it\'s not automation—it\'s a new job.',
      'The test we use: would this save time even if the AI was only 70% accurate? If yes, build it. If no, don\'t. Accuracy can be improved. Adoption can\'t be forced.',
      'Every AI workflow we ship includes a "trust score"—how often the human overrides the AI. If it\'s above 30%, we redesign it. If it stays above 30%, we kill it.',
      'AI is not magic. It\'s a calculator for patterns. Use it like one and it compounds your team. Use it like magic and it wastes their time.'
    ]
  },
  {
    id: 'tx-038',
    slug: 'how-we-price-guarantees',
    txId: 'TX-038',
    date: '04/02/2026',
    subject: 'How we price guarantees (the honest math)',
    tags: ['pricing', 'guarantee', 'transparency'],
    author: 'Ricky Sanderson',
    readTime: '7 min',
    excerpt: 'Everyone asks how we can afford to guarantee outcomes. Here\'s the real answer: we can\'t afford not to. Here\'s the math.',
    content: [
      'Everyone asks how we can afford to guarantee outcomes. Here\'s the real answer: we can\'t afford not to. Here\'s the math.',
      'First: we only take projects where the outcome is measurable and we control most of the variables. "Increase conversion rate by 30%" is measurable. "Make the brand feel premium" is not. We turn down projects where the guarantee would be subjective.',
      'Second: we set the outcome guarantee at 70% of what we believe is achievable. If we think we can hit +40% conversion, we guarantee +28%. This gives us margin for error and variability. It also means we almost always exceed the guarantee.',
      'Third: we hold a reserve equal to 20% of monthly revenue. If we miss a guarantee, the refund comes from this reserve, not from operating capital. As of April 2026, the reserve is $47,000. We\'ve paid out $8,400 lifetime (3 projects, partial refunds).',
      'Fourth: the guarantee changes our sales conversation. Instead of "trust us, we\'re good," it\'s "here\'s the number, here\'s the contract, here\'s what happens if we miss." This converts better than any pitch deck.',
      'The guarantee isn\'t a gimmick. It\'s a filter. It forces us to take only projects we can actually deliver. It makes our case studies accountable. It makes clients partners, not vendors.',
      'If you\'re an agency considering this model: start small. Pick one service. Write the guarantee in plain English. Get it reviewed by a lawyer. Hold a reserve. Ship one project. See what happens. We did. It worked.'
    ]
  },
  {
    id: 'tx-037',
    slug: 'the-motion-as-language-principle',
    txId: 'TX-037',
    date: '03/24/2026',
    subject: 'The motion-as-language principle',
    tags: ['design', 'manifesto', 'UX'],
    author: 'Zach Shanks',
    readTime: '5 min',
    excerpt: 'Animation isn\'t decoration. It\'s information architecture. Here\'s how we use motion to communicate hierarchy, relationships, and state.',
    content: [
      'Animation isn\'t decoration. It\'s information architecture. Every transition we design is a sentence. Every hover state is a word. Motion is how we explain the interface without writing instructions.',
      'Example: the "warp" transition on this site. When you click a star (case study), the camera accelerates toward it, other stars streak past, the selected star expands, then the page resolves. That motion is doing three things at once.',
      'One: it creates spatial continuity. You\'re not jumping to a new page—you\'re traveling through the same space. Two: it signals importance. The acceleration and focus communicate "you\'re about to see something worth your attention." Three: it buys time. The 1.6-second transition masks the content load.',
      'We have a rule: every animation must communicate state, hierarchy, or relationship. If it doesn\'t, it\'s decoration—and we cut it.',
      'State: a button that scales down on press communicates "I registered your input." Hierarchy: an element that fades in after others communicates "I\'m secondary." Relationship: a panel that slides in from the edge communicates "I\'m contextual to what you were looking at."',
      'The test: can you explain what the motion means in one sentence? If not, it\'s not language—it\'s noise.',
      'Motion-as-language doesn\'t mean more animation. It means every animation earns its milliseconds. It means reduced-motion users get the same information, just faster. It means the interface teaches itself.',
      'This is why our sites feel responsive even when they\'re not fast. The motion is doing the explaining while the content loads.'
    ]
  },
  {
    id: 'tx-036',
    slug: 'why-we-dont-do-free-consultations',
    txId: 'TX-036',
    date: '03/15/2026',
    subject: 'Why we don\'t do "free consultations"',
    tags: ['process', 'sales'],
    author: 'Ricky Sanderson',
    readTime: '4 min',
    excerpt: 'We charge $500 for discovery calls with a full refund if we\'re not the right fit. Here\'s why that works better than free.',
    content: [
      'We charge $500 for discovery calls. If we decide we\'re not the right fit for your project, you get the $500 back. If we are the right fit and you hire us, the $500 applies to the project.',
      'Here\'s why this works better than free: it filters out tire-kickers. It makes the call a transaction, not a favor. It ensures both sides show up prepared. And it makes "we\'re not the right fit" a refund, not a rejection.',
      'Before we implemented this, 40% of discovery calls were people who wanted free advice, weren\'t ready to commit, or were shopping 10 agencies. Now that number is under 5%.',
      'The filter works both ways. If a prospect balks at $500 for an hour of strategic consultation, they\'re not our client. Our projects start at $6K. If $500 is a barrier, the real project will be a nightmare.',
      'Here\'s what we deliver in the discovery call: a recorded session, a written summary of our recommendations, and a go/no-go decision. If it\'s no-go, we refund the $500 and often refer them to someone better suited. If it\'s go, we send an SOW within 48 hours.',
      'The paid discovery model has increased our close rate from 22% to 61%. Turns out when people pay for advice, they\'re more likely to take it.',
      'If you\'re an agency: try this. One month. See what happens to the quality of your leads. We did. We never went back.'
    ]
  }
];

export function getTransmissionBySlug(slug: string): Transmission | undefined {
  return transmissions.find(t => t.slug === slug);
}

export function getTransmissionsByConstellation(constellationId: string): Transmission[] {
  return transmissions.filter(t => t.constellation === constellationId);
}

export function getRecentTransmissions(count: number = 4): Transmission[] {
  return transmissions.slice(0, count);
}
