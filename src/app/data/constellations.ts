/**
 * KNOWN ISSUE (deferred to Phase 3D — Star Map Overhaul):
 * `Constellation.tsx` reads star positions from hardcoded literals in its
 * component body instead of from this data layer. As a result, edits to
 * `x` / `y` here are not reflected on the star map; the list view, detail
 * pages, and inline constellation diagrams DO honor this data. The fix is
 * a single source-of-truth refactor done as part of the 3D rebuild, so we
 * avoid duplicating the work here.
 */
export interface Star {
  id: string;
  name: string;
  client: string;
  metric: string;
  x?: number;
  y?: number;
  hypothesis: string;
  baseline: Record<string, string>;
  intervention: string[];
  reading: Record<string, string>;
  guaranteeOutcome: boolean;
  notes: string;
  status: 'shipped' | 'in-progress' | 'forming';
  date: string;
  projectId: string;
  lead: string;
}

export interface Constellation {
  id: string;
  name: string;
  practice: string;
  tagline: string;
  description: string;
  position: { x: number; y: number };
  promise: string;
  offerings: {
    name: string;
    priceRange: string;
    scope: string;
    timeline: string;
    details: string[];
  }[];
  stars: Star[];
  process: {
    step: number;
    name: string;
    description: string;
  }[];
}

export const constellations: Constellation[] = [
  {
    id: 'the-build',
    name: 'The Build',
    practice: 'Web design & development',
    tagline: 'Web design & development that performs, or we keep working.',
    description: 'Sites, applications, headless WP, the works.',
    position: { x: 25, y: 35 },
    promise: "We don't ship a site that's slower than your old one. If we do, the next 90 days of Care are on the house.",
    offerings: [
      {
        name: 'Foundation Site',
        priceRange: '$8K - $15K',
        scope: '5-8 page marketing site',
        timeline: '4-6 weeks',
        details: [
          'Mobile-first responsive design',
          'SEO foundation & analytics',
          'CMS integration (WordPress/Sanity)',
          'Performance optimization (<2.5s load)',
          '2 rounds of revisions',
          '30 days post-launch support'
        ]
      },
      {
        name: 'Application Build',
        priceRange: '$25K - $60K',
        scope: 'Custom web application',
        timeline: '8-16 weeks',
        details: [
          'Full stack development',
          'Database architecture',
          'API integration',
          'Authentication & security',
          'Admin dashboard',
          '90 days post-launch support',
          'Technical documentation'
        ]
      },
      {
        name: 'E-commerce Engine',
        priceRange: '$18K - $40K',
        scope: 'Online store with custom features',
        timeline: '6-10 weeks',
        details: [
          'Shopify/WooCommerce setup',
          'Custom checkout flow',
          'Payment gateway integration',
          'Inventory management',
          'Product recommendation engine',
          '60 days post-launch support'
        ]
      }
    ],
    stars: [
      {
        id: 'eddies-trades',
        name: "Eddie's Trades",
        client: "Eddie's Trades",
        metric: '+47% lead-form conversion',
        x: 22,
        y: 32,
        hypothesis: 'The existing site was slow, hard to navigate on mobile, and buried the contact form. Client believed this was costing them qualified leads.',
        baseline: {
          'Mobile Load Time': '5.8s',
          'Lead Form Conversion': '1.2%',
          'Mobile Bounce Rate': '68%',
          'Monthly Leads': '23'
        },
        intervention: [
          'Rebuilt site on Next.js with static generation for instant loads',
          'Redesigned mobile-first with prominent "Get Quote" CTA above fold',
          'Implemented smart form with service auto-detection',
          'Added social proof testimonials at decision points',
          'Set up conversion tracking and heat mapping'
        ],
        reading: {
          'Mobile Load Time': '1.8s (-69%)',
          'Lead Form Conversion': '1.76% (+47%)',
          'Mobile Bounce Rate': '42% (-38%)',
          'Monthly Leads': '41 (+78%)'
        },
        guaranteeOutcome: true,
        notes: 'The conversion lift exceeded our guarantee. Would add live chat widget earlier in next build.',
        status: 'shipped',
        date: '03/12/2026',
        projectId: 'EXP-2026-014',
        lead: 'Sanderson'
      },
      {
        id: 'desert-modern-homes',
        name: 'Desert Modern Homes',
        client: 'Desert Modern Homes',
        metric: '2.3s load time',
        x: 27,
        y: 35,
        hypothesis: 'High-resolution architecture photos were killing performance. Client wanted to maintain visual impact without losing potential buyers to slow loads.',
        baseline: {
          'Desktop Load Time': '6.2s',
          'Mobile Load Time': '8.9s',
          'Image Weight': '12.4MB per page',
          'Bounce Rate': '71%'
        },
        intervention: [
          'Implemented Next.js Image optimization with WebP/AVIF',
          'Built lazy-loading gallery with progressive enhancement',
          'Set up Cloudflare CDN with edge caching',
          'Created responsive image sets for all viewports',
          'Added skeleton states for perceived performance'
        ],
        reading: {
          'Desktop Load Time': '2.1s (-66%)',
          'Mobile Load Time': '2.3s (-74%)',
          'Image Weight': '1.8MB per page (-85%)',
          'Bounce Rate': '38% (-46%)'
        },
        guaranteeOutcome: true,
        notes: 'Client initially worried about image quality. A/B testing showed no difference in user preference between optimized and original.',
        status: 'shipped',
        date: '01/22/2026',
        projectId: 'EXP-2026-008',
        lead: 'Shanks'
      },
      {
        id: 'phx-coffee-co',
        name: 'PHX Coffee Co',
        client: 'PHX Coffee Co',
        metric: '+89% mobile traffic',
        x: 24,
        y: 38,
        hypothesis: 'Desktop-only site was invisible to the Instagram audience driving most awareness. Needed mobile-native rebuild.',
        baseline: {
          'Mobile Traffic': '18%',
          'Mobile Conversion': '0.4%',
          'Instagram Bounce': '82%',
          'Mobile Speed': 'Unscored'
        },
        intervention: [
          'Rebuilt as Progressive Web App with offline menu',
          'Added Instagram-style stories for new roasts',
          'Implemented one-tap ordering from mobile',
          'Created location-aware store finder',
          'Optimized for Core Web Vitals'
        ],
        reading: {
          'Mobile Traffic': '34% (+89%)',
          'Mobile Conversion': '2.1% (+425%)',
          'Instagram Bounce': '34% (-59%)',
          'Mobile Speed': '98/100 Lighthouse'
        },
        guaranteeOutcome: true,
        notes: 'PWA install rate at 12% of mobile visitors. Considering push notifications for roast drops.',
        status: 'shipped',
        date: '02/28/2026',
        projectId: 'EXP-2026-012',
        lead: 'Sanderson'
      }
    ],
    process: [
      {
        step: 1,
        name: 'Discovery & Hypothesis',
        description: 'We document what you believe is broken, review analytics, interview users, and form a testable hypothesis.'
      },
      {
        step: 2,
        name: 'Baseline Measurement',
        description: 'We establish current metrics. No vanity numbers—only measurements tied to business outcomes.'
      },
      {
        step: 3,
        name: 'Design & Architecture',
        description: 'We prototype the solution, validate with users, and architect for performance and scale.'
      },
      {
        step: 4,
        name: 'Build & Test',
        description: 'We ship in increments, test on real devices, and iterate based on data—not opinions.'
      },
      {
        step: 5,
        name: 'Launch & Measure',
        description: 'We deploy, monitor, and measure against baseline. The guarantee activates here.'
      },
      {
        step: 6,
        name: 'Care & Optimize',
        description: 'We stay engaged through retainers, monitoring uptime, speed, and opportunities for improvement.'
      }
    ]
  },
  {
    id: 'the-voice',
    name: 'The Voice',
    practice: 'Brand identity & messaging',
    tagline: "Brand identity that doesn't apologize.",
    description: 'Logo, system, voice, message — the things people remember you by.',
    position: { x: 65, y: 28 },
    promise: "If your team doesn't adopt the brand system within 90 days, we'll revise it until they do—no additional cost.",
    offerings: [
      {
        name: 'Brand Foundation',
        priceRange: '$6K - $12K',
        scope: 'Logo, colors, typography system',
        timeline: '3-4 weeks',
        details: [
          'Logo design (3 concepts)',
          'Color palette & usage guide',
          'Typography system',
          'Brand voice guidelines',
          'Digital brand kit',
          'Social media templates'
        ]
      },
      {
        name: 'Complete Identity',
        priceRange: '$15K - $30K',
        scope: 'Full brand system & collateral',
        timeline: '6-8 weeks',
        details: [
          'Everything in Foundation',
          'Brand messaging framework',
          'Print collateral design',
          'Email templates',
          'Presentation templates',
          'Brand implementation training',
          'Style guide documentation'
        ]
      },
      {
        name: 'Rebrand & Migration',
        priceRange: '$25K - $50K',
        scope: 'Transform existing brand',
        timeline: '8-12 weeks',
        details: [
          'Brand audit & strategy',
          'Complete visual identity',
          'Messaging & positioning',
          'Website design update',
          'Asset migration plan',
          'Internal rollout support',
          'External launch campaign'
        ]
      }
    ],
    stars: [
      {
        id: 'bright-path-wellness',
        name: 'Bright Path Wellness',
        client: 'Bright Path Wellness',
        metric: '3x social engagement',
        x: 63,
        y: 25,
        hypothesis: 'Generic health/wellness aesthetic made them invisible in a crowded market. Needed differentiation without alienating existing clients.',
        baseline: {
          'Social Engagement Rate': '0.8%',
          'Brand Recognition': '12% (survey)',
          'Instagram Follows/Month': '34',
          'Referral Attribution': '8%'
        },
        intervention: [
          'Developed "clinical warmth" visual identity—clean but human',
          'Created illustration system for complex health topics',
          'Wrote messaging framework emphasizing evidence + empathy',
          'Designed social templates for patient education',
          'Trained staff on brand voice application'
        ],
        reading: {
          'Social Engagement Rate': '2.4% (+200%)',
          'Brand Recognition': '41% (+242%)',
          'Instagram Follows/Month': '127 (+274%)',
          'Referral Attribution': '23% (+188%)'
        },
        guaranteeOutcome: true,
        notes: 'Staff adoption was immediate. The illustration system is now their biggest differentiator in patient communication.',
        status: 'shipped',
        date: '12/15/2025',
        projectId: 'EXP-2025-042',
        lead: 'Shanks'
      },
      {
        id: 'valley-ventures',
        name: 'Valley Ventures',
        client: 'Valley Ventures',
        metric: 'Brand refresh',
        x: 67,
        y: 28,
        hypothesis: '2015-era logo and inconsistent collateral made the firm appear dated to potential investors.',
        baseline: {
          'Pitch Success Rate': '14%',
          'Brand Consistency Score': '3.2/10',
          'Collateral Quality (Survey)': '5.1/10',
          'Investor Perception': 'Mid-tier'
        },
        intervention: [
          'Modernized logo with subtle nod to Phoenix geography',
          'Built comprehensive Figma design system',
          'Created pitch deck template system',
          'Wrote investment thesis messaging',
          'Designed limited print suite for key meetings'
        ],
        reading: {
          'Pitch Success Rate': '22% (+57%)',
          'Brand Consistency Score': '8.7/10 (+172%)',
          'Collateral Quality (Survey)': '8.9/10 (+75%)',
          'Investor Perception': 'Tier-1 regional'
        },
        guaranteeOutcome: true,
        notes: 'Partners now use the pitch system without modification—measure of system strength.',
        status: 'shipped',
        date: '11/08/2025',
        projectId: 'EXP-2025-037',
        lead: 'Sanderson'
      },
      {
        id: 'local-goods-market',
        name: 'Local Goods Market',
        client: 'Local Goods Market',
        metric: '+210% brand recall',
        x: 65,
        y: 31,
        hypothesis: 'Name was forgettable. Visual identity looked like every other farmers market. Needed memorable without being gimmicky.',
        baseline: {
          'Aided Brand Recall': '18%',
          'Unaided Recall': '4%',
          'Booth Recognition': '22%',
          'Repeat Visitor Rate': '31%'
        },
        intervention: [
          'Developed modular logo system using Phoenix-grown produce shapes',
          'Created bold, high-contrast color palette',
          'Designed farmer spotlight card system',
          'Wrote vendor story framework',
          'Built reusable signage system'
        ],
        reading: {
          'Aided Brand Recall': '56% (+211%)',
          'Unaided Recall': '19% (+375%)',
          'Booth Recognition': '67% (+205%)',
          'Repeat Visitor Rate': '52% (+68%)'
        },
        guaranteeOutcome: true,
        notes: 'The modular logo system lets vendors create co-branded materials—unexpected adoption win.',
        status: 'shipped',
        date: '10/03/2025',
        projectId: 'EXP-2025-031',
        lead: 'Shanks'
      }
    ],
    process: [
      {
        step: 1,
        name: 'Brand Audit',
        description: 'We inventory existing assets, survey stakeholders, and identify gaps between current and desired perception.'
      },
      {
        step: 2,
        name: 'Strategy & Positioning',
        description: 'We define differentiation, audience, and core messages. This is the foundation everything else rests on.'
      },
      {
        step: 3,
        name: 'Visual Exploration',
        description: 'We present 2-3 distinct visual directions, each solving the strategy differently.'
      },
      {
        step: 4,
        name: 'System Development',
        description: 'We build the complete identity system: logo, color, type, imagery, templates.'
      },
      {
        step: 5,
        name: 'Documentation & Training',
        description: 'We create usage guidelines and train your team on application—adoption is the real measure.'
      },
      {
        step: 6,
        name: 'Implementation Support',
        description: 'We assist with rollout, troubleshoot edge cases, and ensure consistency across touchpoints.'
      }
    ]
  },
  {
    id: 'the-signal',
    name: 'The Signal',
    practice: 'Social media & content',
    tagline: 'Content that makes the algorithm relevant, not the boss.',
    description: 'Social, content, the rhythm of staying visible.',
    position: { x: 45, y: 55 },
    promise: "If engagement doesn't improve by 40% within 60 days, we'll refund the difference and adjust the strategy—no questions asked.",
    offerings: [
      {
        name: 'Content Sprint',
        priceRange: '$2K - $4K',
        scope: '30 days of content',
        timeline: '1 month',
        details: [
          '12-16 posts (platform-specific)',
          'Content calendar & strategy',
          'Copywriting & hashtag research',
          'Stock imagery or simple graphics',
          'Performance reporting',
          'One strategy adjustment mid-sprint'
        ]
      },
      {
        name: 'Ongoing Signal',
        priceRange: '$3K - $7K/month',
        scope: 'Monthly retainer',
        timeline: 'Ongoing',
        details: [
          '20-30 posts per month',
          'Custom graphics & video editing',
          'Community management (responses)',
          'Monthly strategy sessions',
          'A/B testing & optimization',
          'Quarterly competitive analysis'
        ]
      },
      {
        name: 'Campaign Build',
        priceRange: '$8K - $18K',
        scope: 'Multi-channel launch campaign',
        timeline: '6-8 weeks',
        details: [
          'Campaign strategy & messaging',
          '40-60 pieces of content',
          'Paid social ad creative & targeting',
          'Landing page integration',
          'Influencer outreach (if applicable)',
          'Real-time monitoring & adjustment',
          'Post-campaign analysis'
        ]
      }
    ],
    stars: [
      {
        id: 'az-auto-repair',
        name: 'AZ Auto Repair',
        client: 'AZ Auto Repair',
        metric: '12K monthly reach',
        x: 43,
        y: 53,
        hypothesis: 'Auto repair is considered commoditized. Educational content could build trust and differentiate.',
        baseline: {
          'Monthly Reach': '1,200',
          'Engagement Rate': '0.6%',
          'Leads from Social': '2/month',
          'Content Frequency': '1-2x/week'
        },
        intervention: [
          'Created "myth-buster" video series on common car issues',
          'Designed behind-the-scenes shop culture content',
          'Built customer story template system',
          'Established 4x/week posting rhythm',
          'Set up lead capture via DMs'
        ],
        reading: {
          'Monthly Reach': '12,400 (+933%)',
          'Engagement Rate': '3.8% (+533%)',
          'Leads from Social': '19/month (+850%)',
          'Content Frequency': '4x/week (+100%)'
        },
        guaranteeOutcome: true,
        notes: 'Video content performs 4x better than static. Client now shoots most content in-house with our templates.',
        status: 'shipped',
        date: '03/01/2026',
        projectId: 'EXP-2026-013',
        lead: 'Shanks'
      },
      {
        id: 'cactus-creative',
        name: 'Cactus Creative',
        client: 'Cactus Creative',
        metric: '+340% engagement',
        x: 47,
        y: 55,
        hypothesis: 'As a creative agency, their social needed to demonstrate capability, not just describe it.',
        baseline: {
          'Avg Engagement/Post': '12',
          'Profile Visits/Month': '340',
          'Inquiry DMs/Month': '3',
          'Follower Growth': '8/month'
        },
        intervention: [
          'Shifted to process-reveal content (before/after, time-lapses)',
          'Created design tip carousel format',
          'Built client work showcase template',
          'Implemented interactive polls & challenges',
          'Optimized posting schedule via analytics'
        ],
        reading: {
          'Avg Engagement/Post': '53 (+342%)',
          'Profile Visits/Month': '1,240 (+265%)',
          'Inquiry DMs/Month': '14 (+367%)',
          'Follower Growth': '42/month (+425%)'
        },
        guaranteeOutcome: true,
        notes: 'Process content became their signature. Several pieces went micro-viral (30K+ views).',
        status: 'shipped',
        date: '01/12/2026',
        projectId: 'EXP-2026-006',
        lead: 'Sanderson'
      },
      {
        id: 'phoenix-fitness',
        name: 'Phoenix Fitness',
        client: 'Phoenix Fitness',
        metric: '800+ leads/month',
        x: 45,
        y: 58,
        hypothesis: 'Gym content is saturated. Needed a hook that cut through—chose hyper-local Phoenix fitness culture.',
        baseline: {
          'Leads/Month': '67',
          'Cost Per Lead': '$8.40',
          'Content Saves': '23/month',
          'Story Completion': '34%'
        },
        intervention: [
          'Created "Phoenix Heat Training" series (desert-specific workouts)',
          'Built trainer spotlight series with workout tips',
          'Designed challenge campaigns with local prizes',
          'Implemented lead magnet (free workout plan) via bio link',
          'Set up automated DM funnel'
        ],
        reading: {
          'Leads/Month': '847 (+1,164%)',
          'Cost Per Lead': '$2.10 (-75%)',
          'Content Saves': '340/month (+1,378%)',
          'Story Completion': '61% (+79%)'
        },
        guaranteeOutcome: true,
        notes: 'The Phoenix-specific angle resonated beyond expectations. Now a model for our other fitness clients.',
        status: 'shipped',
        date: '02/18/2026',
        projectId: 'EXP-2026-011',
        lead: 'Shanks'
      }
    ],
    process: [
      {
        step: 1,
        name: 'Audit & Benchmark',
        description: 'We analyze current content performance, competitive landscape, and audience behavior patterns.'
      },
      {
        step: 2,
        name: 'Strategy & Calendar',
        description: 'We define content pillars, posting frequency, and create a 30-day calendar aligned to business goals.'
      },
      {
        step: 3,
        name: 'Creation & Approval',
        description: 'We produce content in batches, submit for review, iterate based on feedback.'
      },
      {
        step: 4,
        name: 'Publishing & Monitoring',
        description: 'We schedule posts, respond to comments, and track real-time performance.'
      },
      {
        step: 5,
        name: 'Analysis & Optimization',
        description: 'We review metrics weekly, identify top performers, and adjust strategy accordingly.'
      },
      {
        step: 6,
        name: 'Iteration & Scale',
        description: 'We double down on what works, kill what doesn\'t, and compound growth over time.'
      }
    ]
  },
  {
    id: 'the-engine',
    name: 'The Engine',
    practice: 'AI workflows & automation',
    tagline: 'Workflows that run while you sleep.',
    description: 'AI, automation, micro-APIs — the layer that compounds your team.',
    position: { x: 75, y: 65 },
    promise: "If the automation doesn't save the documented time within 90 days, we'll optimize it or refund 50% of the build cost.",
    offerings: [
      {
        name: 'Process Automation',
        priceRange: '$4K - $10K',
        scope: 'Single workflow automation',
        timeline: '2-4 weeks',
        details: [
          'Workflow mapping & optimization',
          'API integration (2-3 tools)',
          'Automation build (Zapier/Make/n8n)',
          'Error handling & notifications',
          'Documentation & training',
          '30 days monitoring & tweaks'
        ]
      },
      {
        name: 'AI Integration',
        priceRange: '$12K - $25K',
        scope: 'Custom AI-powered feature',
        timeline: '6-8 weeks',
        details: [
          'Use case definition & data audit',
          'Model selection & fine-tuning',
          'Integration with existing systems',
          'User interface design',
          'Testing & accuracy benchmarking',
          '60 days monitoring & optimization'
        ]
      },
      {
        name: 'Operations Engine',
        priceRange: '$30K - $70K',
        scope: 'Multi-system automation suite',
        timeline: '10-16 weeks',
        details: [
          'Full operations audit',
          'Custom dashboard & reporting',
          'Multi-workflow automation',
          'AI-powered decision support',
          'Team training & handoff',
          '90 days support & optimization',
          'Technical documentation'
        ]
      }
    ],
    stars: [
      {
        id: 'invoice-automator',
        name: 'Invoice Automator',
        client: 'Desert HVAC Solutions',
        metric: '40hrs saved/month',
        x: 73,
        y: 63,
        hypothesis: 'Manual invoice creation from field notes was costing 10+ hours/week and introducing errors.',
        baseline: {
          'Invoice Creation Time': '45min/invoice',
          'Monthly Time Cost': '52 hours',
          'Invoice Error Rate': '8%',
          'Late Payment Rate': '34%'
        },
        intervention: [
          'Built field app for technicians to log work',
          'Created auto-invoice generation from logs',
          'Integrated with QuickBooks for sync',
          'Added automated payment reminders',
          'Set up admin dashboard for oversight'
        ],
        reading: {
          'Invoice Creation Time': '4min/invoice (-91%)',
          'Monthly Time Cost': '12 hours (-77%)',
          'Invoice Error Rate': '0.8% (-90%)',
          'Late Payment Rate': '14% (-59%)'
        },
        guaranteeOutcome: true,
        notes: 'Payback period was 3.2 months. Client now wants to expand to scheduling automation.',
        status: 'shipped',
        date: '01/29/2026',
        projectId: 'EXP-2026-009',
        lead: 'Sanderson'
      },
      {
        id: 'lead-qualifier-ai',
        name: 'Lead Qualifier AI',
        client: 'Scottsdale Solar',
        metric: '85% accuracy',
        x: 77,
        y: 65,
        hypothesis: 'Sales team was spending hours qualifying leads that would never convert. AI could pre-qualify.',
        baseline: {
          'Lead Qualification Time': '15min/lead',
          'Conversion Rate': '8%',
          'Sales Time on Bad Leads': '60%',
          'Monthly Qualification Cost': '$4,800'
        },
        intervention: [
          'Trained model on 2 years of lead data',
          'Built qualification scoring system',
          'Integrated with CRM for auto-routing',
          'Created reject/nurture automation',
          'Set up accuracy monitoring dashboard'
        ],
        reading: {
          'Lead Qualification Time': '30sec/lead (-97%)',
          'Conversion Rate': '18% (+125%)',
          'Sales Time on Bad Leads': '12% (-80%)',
          'Monthly Qualification Cost': '$400 (-92%)'
        },
        guaranteeOutcome: true,
        notes: 'Model accuracy improved to 91% after 60 days of feedback loop. Now a competitive advantage.',
        status: 'shipped',
        date: '03/15/2026',
        projectId: 'EXP-2026-015',
        lead: 'Shanks'
      },
      {
        id: 'content-pipeline',
        name: 'Content Pipeline',
        client: 'Valley Real Estate Group',
        metric: '10x output',
        x: 75,
        y: 68,
        hypothesis: 'Content creation bottleneck was limiting growth. AI-assisted workflow could scale without hiring.',
        baseline: {
          'Blog Posts/Month': '2',
          'Social Posts/Month': '8',
          'Email Newsletters/Month': '1',
          'Content Team Size': '1 person'
        },
        intervention: [
          'Built AI content brief generator from listings',
          'Created template system for consistency',
          'Automated social media derivation from blogs',
          'Set up approval workflow with Slack',
          'Implemented SEO optimization checks'
        ],
        reading: {
          'Blog Posts/Month': '12 (+500%)',
          'Social Posts/Month': '48 (+500%)',
          'Email Newsletters/Month': '4 (+300%)',
          'Content Team Size': '1 person (0% increase)'
        },
        guaranteeOutcome: true,
        notes: 'Human still writes final drafts—AI handles research, outlining, and SEO. Quality maintained while volume scaled.',
        status: 'shipped',
        date: '02/22/2026',
        projectId: 'EXP-2026-010',
        lead: 'Sanderson'
      }
    ],
    process: [
      {
        step: 1,
        name: 'Workflow Audit',
        description: 'We map current process, identify bottlenecks, and quantify time/cost of manual work.'
      },
      {
        step: 2,
        name: 'Opportunity Scoring',
        description: 'We rank automation opportunities by ROI, feasibility, and risk.'
      },
      {
        step: 3,
        name: 'Architecture & Build',
        description: 'We design the system, build integrations, and set up error handling.'
      },
      {
        step: 4,
        name: 'Testing & Training',
        description: 'We test edge cases, train your team, and document the system.'
      },
      {
        step: 5,
        name: 'Deploy & Monitor',
        description: 'We launch, monitor performance, and track time savings against baseline.'
      },
      {
        step: 6,
        name: 'Optimize & Expand',
        description: 'We fine-tune based on real usage, then identify next automation opportunities.'
      }
    ]
  },
  {
    id: 'the-lighthouse',
    name: 'The Lighthouse',
    practice: 'Care retainers & ongoing support',
    tagline: 'What happens after launch matters more than the launch.',
    description: 'Care retainers, monitoring, ongoing optimization.',
    position: { x: 15, y: 68 },
    promise: "If we don't respond to a critical issue within 4 hours, that month's retainer is credited in full.",
    offerings: [
      {
        name: 'Essential Care',
        priceRange: '$500 - $1K/month',
        scope: 'Basic maintenance & monitoring',
        timeline: 'Monthly retainer',
        details: [
          'Uptime monitoring (99.5% SLA)',
          'Security updates & patches',
          'Performance monitoring',
          'Monthly backup verification',
          '2 hours of updates/fixes',
          '24-hour critical response'
        ]
      },
      {
        name: 'Growth Care',
        priceRange: '$2K - $4K/month',
        scope: 'Active optimization & support',
        timeline: 'Monthly retainer',
        details: [
          'Everything in Essential',
          'A/B testing & optimization',
          'Content updates (8hrs/month)',
          'Analytics reporting & insights',
          '4-hour critical response',
          'Quarterly strategy sessions'
        ]
      },
      {
        name: 'Dedicated Care',
        priceRange: '$6K - $12K/month',
        scope: 'Priority support & development',
        timeline: 'Monthly retainer',
        details: [
          'Everything in Growth',
          'Dedicated slack channel',
          '40+ hours development/month',
          'Feature development',
          '1-hour critical response',
          'Monthly planning sessions',
          'Priority bug fixes'
        ]
      }
    ],
    stars: [
      {
        id: 'scottsdale-medical',
        name: 'Scottsdale Medical',
        client: 'Scottsdale Medical Center',
        metric: '99.9% uptime',
        x: 13,
        y: 66,
        hypothesis: 'Previous agency disappeared after launch. Needed reliable ongoing partner for patient portal.',
        baseline: {
          'Uptime': '97.2%',
          'Avg Response Time': '18 hours',
          'Patient Complaints': '23/month',
          'Security Patches': 'Irregular'
        },
        intervention: [
          'Migrated to redundant hosting infrastructure',
          'Set up 24/7 monitoring with alerts',
          'Established 4-hour response SLA',
          'Implemented automated security scanning',
          'Created monthly performance reports'
        ],
        reading: {
          'Uptime': '99.94%',
          'Avg Response Time': '1.2 hours',
          'Patient Complaints': '3/month (-87%)',
          'Security Patches': 'Weekly automated'
        },
        guaranteeOutcome: true,
        notes: 'Only one downtime incident in 8 months (CDN issue, resolved in 47 minutes). SLA never breached.',
        status: 'shipped',
        date: '07/12/2025',
        projectId: 'EXP-2025-024',
        lead: 'Shanks'
      },
      {
        id: 'desert-dining',
        name: 'Desert Dining',
        client: 'Desert Dining Group',
        metric: 'Monthly updates',
        x: 17,
        y: 68,
        hypothesis: 'Restaurant group needed constant menu, hours, and promotion updates but had no technical staff.',
        baseline: {
          'Update Requests/Month': '18',
          'Update Turnaround': '3-5 days',
          'Menu Accuracy': '78%',
          'Promotion Speed': 'Too slow'
        },
        intervention: [
          'Trained staff on simple CMS for menus',
          'Created templates for common updates',
          'Set up 24-hour update turnaround',
          'Built automated social posting from updates',
          'Implemented change tracking system'
        ],
        reading: {
          'Update Requests/Month': '22 (+22%)',
          'Update Turnaround': '4 hours (-95%)',
          'Menu Accuracy': '99%',
          'Promotion Speed': 'Same-day'
        },
        guaranteeOutcome: true,
        notes: 'Client now makes 60% of updates themselves. We handle complex changes. Empowerment was the real outcome.',
        status: 'shipped',
        date: '09/20/2025',
        projectId: 'EXP-2025-029',
        lead: 'Sanderson'
      },
      {
        id: 'valley-tech-hub',
        name: 'Valley Tech Hub',
        client: 'Valley Tech Hub',
        metric: '24hr support',
        x: 15,
        y: 71,
        hypothesis: 'Co-working space platform needed always-on support for member-facing features.',
        baseline: {
          'Support Availability': '9-5 weekdays',
          'Critical Issue Resolution': '12-24 hours',
          'Member Satisfaction': '6.8/10',
          'Platform Bugs/Month': '14'
        },
        intervention: [
          'Established on-call rotation for critical issues',
          'Set up monitoring for booking system',
          'Created member-facing status page',
          'Implemented proactive bug sweeps',
          'Built feature request tracking'
        ],
        reading: {
          'Support Availability': '24/7 critical',
          'Critical Issue Resolution': '2.3 hours (-90%)',
          'Member Satisfaction': '8.9/10 (+31%)',
          'Platform Bugs/Month': '3 (-79%)'
        },
        guaranteeOutcome: true,
        notes: 'The status page reduced support tickets by 40%—transparency built trust.',
        status: 'shipped',
        date: '08/15/2025',
        projectId: 'EXP-2025-027',
        lead: 'Shanks'
      }
    ],
    process: [
      {
        step: 1,
        name: 'Onboarding & Audit',
        description: 'We inventory all systems, set up monitoring, and establish baseline performance metrics.'
      },
      {
        step: 2,
        name: 'Monitoring Setup',
        description: 'We implement uptime monitoring, security scanning, and performance tracking with alerts.'
      },
      {
        step: 3,
        name: 'Ongoing Maintenance',
        description: 'We apply updates, patches, and optimizations on a regular schedule.'
      },
      {
        step: 4,
        name: 'Incident Response',
        description: 'We respond to issues per SLA, document root cause, and prevent recurrence.'
      },
      {
        step: 5,
        name: 'Optimization & Reporting',
        description: 'We identify improvement opportunities and provide monthly performance reports.'
      },
      {
        step: 6,
        name: 'Strategic Planning',
        description: 'We participate in quarterly planning to align technology with business goals.'
      }
    ]
  }
];

export function getConstellationById(id: string): Constellation | undefined {
  return constellations.find(c => c.id === id);
}

export function getStarById(starId: string): { constellation: Constellation; star: Star } | null {
  for (const constellation of constellations) {
    const star = constellation.stars.find(s => s.id === starId);
    if (star) {
      return { constellation, star };
    }
  }
  return null;
}
