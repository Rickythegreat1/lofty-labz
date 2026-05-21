/**
 * Single source of truth for all constellation + star data.
 *
 * Consumed by:
 *   - `ConstellationField.tsx` (StarMap rendering, Phase 3D+)
 *   - `ListView.tsx`           (list catalog)
 *   - `ConstellationPage.tsx`  (practice detail pages)
 *   - `StarPage.tsx`           (case-study detail pages)
 *
 * Prior to Phase 3D, `StarMap.tsx` shadowed this layer with a hardcoded
 * inline constellation array, so edits here did not affect the map. That
 * drift is resolved — the inline array has been removed.
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
  /**
   * Optional "Receipts" for real projects — verifiable links shown in the
   * StarPanel. When all four are absent, the case study reads as
   * documentation-only (placeholders default to this).
   */
  liveUrl?: string;
  repoUrl?: string;
  figmaUrl?: string;
  screenshotUrl?: string;
  /**
   * Optional brand-aligned hero visual rendered at the top of the StarPanel
   * content. Each kind maps to a schematic SVG illustration drawn in the
   * brass-on-dark line-art aesthetic. See StarHeroVisual.tsx.
   */
  heroVisual?:
    | 'cube'
    | 'dashboard'
    | 'whiteboard'
    | 'pipeline'
    | 'film'
    | 'snowflake'
    | 'equations';
}

/**
 * Glyph shape descriptor for a constellation. When present, lines are drawn
 * along the `edges` array instead of the default sequential chain. `anchors`
 * are non-interactive shape-only points that complete the silhouette where
 * real case-study stars aren't enough.
 *
 * Edge indices reference the combined [stars, ...anchors] list — stars come
 * first (0..N-1), anchors follow (N..N+M-1).
 */
export interface ConstellationShape {
  anchors: { x: number; y: number }[];
  edges: [number, number][];
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
  /**
   * Optional glyph descriptor. When present, the constellation renders as a
   * representational shape (browser frame, megaphone, gear, etc.) rather
   * than a sequential point chain.
   */
  shape?: ConstellationShape;
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
        // Real project — Champro Merch Builder, the canonical commercial
        // product. Jersey Builder Pro was its V1 prototype; both are now
        // captured in this one star per the user's clarification that
        // they're two iterations of the same project. Positioned at the
        // top-left corner of the browser-frame glyph (post-merge layout).
        id: 'champro-merch-builder',
        name: 'Champro Merch Builder',
        client: 'Champro',
        metric: 'In-browser 3D customizer — two iterations, one product',
        x: 16,
        y: 30,
        hypothesis: "Champro's customers needed a self-serve in-browser 3D customizer for uniforms — with the same affordances as a desktop design tool (layers, nudging, undo/redo, mirroring, print-safe areas) and a production-grade handoff so the factory could ingest output without manual rework. Two iterations got us there.",
        baseline: {
          'Customizer': 'No 3D in-browser tool',
          'Customer iteration': 'Static mockups via email',
          'Production handoff': 'Manual rework',
          'Design tooling': 'Legacy / desktop-only'
        },
        intervention: [
          'V1 — Jersey Builder Pro prototype: vanilla JS + Vite + Three.js. Proved the in-browser designer affordances — undo/redo with ⌘Z / ⌘⇧Z, layer manager, fine-nudging, mirroring, print-safe overlay, autosave with a visible "Saved" indicator, sr-only live regions + skip-link for accessibility',
          'V1 shipped with an explicit accessibility audit (docs/a11y-audit.md) and a gap-list (docs/champ-pro-gap-list.md) — the written-deliverables cadence the brand promises',
          'V2 — commercial Champro Merch Builder: rebuilt on React 19 + @react-three/fiber + zustand store for predictable customizer state',
          'V2 added touch/trackpad gesture support via @use-gesture/react',
          'V2 shipped a PDF export pipeline (html2canvas + jspdf) so production receives a deterministic spec sheet',
          'V2 carries Playwright e2e coverage — every customizer interaction tested before shipping'
        ],
        reading: {
          'Customizer': '3D in-browser shipped',
          'Customer iteration': 'Real-time, self-serve',
          'Production handoff': 'PDF export pipeline',
          'Design tooling': 'React 19 + R3F + Three',
          'Documentation': 'a11y audit + gap-list (V1)'
        },
        guaranteeOutcome: true,
        notes: 'Two iterations of the same product. V1 (Jersey Builder Pro) was the in-browser-designer prototype that proved the affordances; V2 (current Champro Merch Builder) is the commercial React 19 + R3F + PDF-export build. Counted as one star because they\'re iterations of one design intent for one client, not two separate engagements.',
        status: 'shipped',
        date: '2025-2026',
        projectId: 'CHPR-2026-001',
        lead: 'Sanderson',
        repoUrl: 'https://github.com/Rickythegreat1/Merch-Builder-G',
        heroVisual: 'cube'
      },
      {
        // Real project — EduTrack admin dashboard at Crossroads Education
        // (2017-2020). Position adjusted to (32, 30) for the new browser
        // frame: top-right corner anchors the right edge.
        id: 'edutrack-dashboard',
        name: 'EduTrack',
        client: 'Crossroads Education',
        metric: 'School-deployed admin dashboard',
        x: 32,
        y: 30,
        hypothesis: 'Tutors and school administrators were managing scheduling, attendance, and student data through disconnected tools. A unified employee-management + analytics dashboard could replace the manual process with a single source of truth.',
        baseline: {
          'Admin workflow': 'Disconnected spreadsheets',
          'Tutor task management': 'Manual',
          'Data visibility': 'No real-time view',
          'Design system': 'None — ad-hoc UI'
        },
        intervention: [
          'Designed an Employee Management + Data Analytics Dashboard for tutors and school staff',
          'Built an atomic-design system shared across two Crossroads products (EduTrack + Nexus)',
          'Ran user interviews, journey-mapping, and open/closed card sorts with administrators',
          'Generated personas, wireframes, and prototypes ahead of build',
          'Owned UI choreography and accessibility decisions through implementation'
        ],
        reading: {
          'Admin workflow': 'Unified dashboard',
          'Tutor task management': 'Real-time, task-driven',
          'Data visibility': 'Live analytics surface',
          'Design system': 'Atomic, shared across products'
        },
        guaranteeOutcome: true,
        notes: 'Deployed in a school that secured a Bill & Melinda Gates Foundation grant during the engagement. The atomic design system also fed Crossroads Education\'s Nexus product (digital learning platform with interactive whiteboards and tutor queueing).',
        status: 'shipped',
        date: '2017-2020',
        projectId: 'CRE-2020-002',
        lead: 'Sanderson',
        heroVisual: 'dashboard'
      },
      {
        // Real project — Nexus, Crossroads Education's student-tutor live-
        // session platform. Companion to EduTrack (the admin surface) at
        // the same employer, same era, shared design system. Positioned
        // at the bottom-right corner of the browser-frame glyph.
        id: 'nexus',
        name: 'Nexus',
        client: 'Crossroads Education',
        metric: 'Digital learning platform — student-tutor live sessions',
        x: 32,
        y: 42,
        hypothesis: 'Crossroads Education needed to simulate the in-person tutoring experience online — interactive whiteboards, fair queueing, parity of attention from tutors to students. Without those, online tutoring would feel like a downgrade instead of an option.',
        baseline: {
          'Tutoring delivery': 'In-person only',
          'Whiteboard parity': 'No digital equivalent',
          'Tutor allocation': 'Manual / ad-hoc',
          'Design system': 'None — ad-hoc UI'
        },
        intervention: [
          'Designed interactive digital whiteboards with parity for in-person session affordances',
          'Built a fair tutor-queueing system that matched student demand to tutor availability',
          'Shared the atomic design system with the EduTrack admin dashboard for cross-product consistency',
          'Ran user interviews + journey-mapping with students and tutors before build',
          'Generated personas, wireframes, and prototypes ahead of implementation'
        ],
        reading: {
          'Tutoring delivery': 'Hybrid (in-person + live online)',
          'Whiteboard parity': 'Digital whiteboards shipped',
          'Tutor allocation': 'Queueing system',
          'Design system': 'Atomic, shared with EduTrack'
        },
        guaranteeOutcome: true,
        notes: 'Companion product to EduTrack at Crossroads Education (2017-2020). Shared atomic design system across both products: Nexus is the student-tutor live-session surface; EduTrack is the admin / data dashboard.',
        status: 'shipped',
        date: '2017-2020',
        projectId: 'CRE-2020-001',
        lead: 'Sanderson',
        heroVisual: 'whiteboard'
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
    ],
    // Browser-frame glyph, post-merge layout:
    //   Stars (3, all real Crossroads/Champro work):
    //     0 — champro-merch-builder  (16, 30) — top-left corner
    //     1 — edutrack-dashboard     (32, 30) — top-right corner
    //     2 — nexus                  (32, 42) — bottom-right corner
    //   Anchors (4):
    //     a0 idx 3 — (16, 42) bottom-left corner (closes the frame)
    //     a1 idx 4 — (19, 32) chrome dot 1 (inside top bar)
    //     a2 idx 5 — (22, 32) chrome dot 2
    //     a3 idx 6 — (25, 32) chrome dot 3
    //   Every dot is on at least one edge:
    //     Frame perimeter: champro → edutrack → nexus → a0 → champro
    //     Chrome bar: chained chrome dots inside the top bar
    shape: {
      anchors: [
        { x: 16, y: 42 }, // a0 (idx 3): bottom-left corner
        { x: 19, y: 32 }, // a1 (idx 4): chrome dot 1
        { x: 22, y: 32 }, // a2 (idx 5): chrome dot 2
        { x: 25, y: 32 }  // a3 (idx 6): chrome dot 3
      ],
      edges: [
        [0, 1], // top edge: champro → edutrack
        [1, 2], // right edge: edutrack → nexus
        [2, 3], // bottom edge: nexus → bottom-left anchor
        [3, 0], // left edge: bottom-left → champro
        [4, 5], // chrome chain segment 1
        [5, 6]  // chrome chain segment 2
      ]
    }
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
        x: 72,
        y: 20,
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
        x: 72,
        y: 36,
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
        x: 60,
        y: 28,
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
    ],
    // Megaphone glyph opening rightward. Star 0 (Bright Path) sits at the
    // wide-top, star 1 (Valley Ventures) at the wide-bottom, star 2 (Local
    // Goods) at the handle. Anchors 0-1 close the narrow back, anchors 2-4
    // are the radiating sound rays.
    // Megaphone glyph with radiating soundwaves:
    //   Stars (3): 0 bright-path (72,20) mouth-top, 1 valley-ventures (72,36)
    //     mouth-bottom, 2 local-goods (60,28) handle.
    //   Anchors (5): a0(62,25)/a1(62,31) narrow throat, a2(78,22)/a3(80,28)/
    //     a4(78,34) sound rays radiating from the mouth.
    // Every dot is now on an edge — the 3 ray dots are reached via new edges
    // from the mouth-top and mouth-bottom stars (sound emanating).
    shape: {
      anchors: [
        { x: 62, y: 25 }, // a0 (idx 3): narrow back top
        { x: 62, y: 31 }, // a1 (idx 4): narrow back bottom
        { x: 78, y: 22 }, // a2 (idx 5): sound ray top
        { x: 80, y: 28 }, // a3 (idx 6): sound ray middle
        { x: 78, y: 34 }  // a4 (idx 7): sound ray bottom
      ],
      edges: [
        [2, 3], // handle → narrow-top
        [3, 0], // narrow-top → mouth-top
        [0, 1], // mouth-top → mouth-bottom (the mouth)
        [1, 4], // mouth-bottom → narrow-bottom
        [4, 2], // narrow-bottom → handle
        [0, 5], // mouth-top → ray-top (discrete soundwave 1)
        [0, 6], // mouth-top → ray-middle (discrete soundwave 2)
        [1, 7]  // mouth-bottom → ray-bottom (discrete soundwave 3)
      ]
    }
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
        x: 45,
        y: 48,
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
        x: 45,
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
        y: 62,
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
    ],
    // Broadcast tower glyph: star 0 (AZ Auto Repair) is the antenna tip,
    // star 1 (Cactus Creative) is the central junction, star 2 (Phoenix
    // Fitness) is the base. Anchors 0-1 are the horizontal crossbeam,
    // anchors 2-3 are the splayed feet, anchors 4-5 are signal pulses.
    // Broadcast-tower glyph with antenna pulses:
    //   Stars (3): 0 antenna (45,48), 1 hub (45,55), 2 base (45,62).
    //   Anchors (6): a0/a1 crossbeams, a2/a3 feet, a4/a5 signal pulses.
    // New edges: antenna → both pulse anchors so the broadcast is rendered
    // as lines emitting upward-outward instead of two floating dots.
    shape: {
      anchors: [
        { x: 42, y: 55 }, // a0 (idx 3): left crossbeam
        { x: 48, y: 55 }, // a1 (idx 4): right crossbeam
        { x: 42, y: 62 }, // a2 (idx 5): left foot
        { x: 48, y: 62 }, // a3 (idx 6): right foot
        { x: 40, y: 51 }, // a4 (idx 7): left signal pulse
        { x: 50, y: 51 }  // a5 (idx 8): right signal pulse
      ],
      edges: [
        [0, 1], // spine top (antenna → hub)
        [1, 2], // spine bottom (hub → base)
        [3, 1], // left crossbeam → hub
        [1, 4], // hub → right crossbeam
        [5, 2], // left foot → base
        [2, 6], // base → right foot
        [0, 7], // antenna → left signal pulse (NEW: broadcast emission)
        [0, 8]  // antenna → right signal pulse (NEW: broadcast emission)
      ]
    }
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
        // Real project — Champro Asset Pipeline. Python utility that
        // extracted and downloaded GLB model URLs from a source manifest,
        // populating the Merch Builder's asset library. Replaces a
        // fictional placeholder; positioned at the top of the Engine's
        // gear glyph.
        id: 'champro-asset-pipeline',
        name: 'Champro Asset Pipeline',
        client: 'Champro (internal tooling)',
        metric: 'GLB ingestion automated',
        x: 75,
        y: 60,
        hypothesis: 'Manual asset prep was the bottleneck on every new product drop for the Champro Merch Builder. Each GLB needed URL extraction, validation, and download into the customizer asset library — a tedious step prone to copy-paste errors.',
        baseline: {
          'Asset prep': 'Manual per-product',
          'URL extraction': 'Copy-paste from source',
          'Download integrity': 'Spot-checked',
          'Tooling': 'None'
        },
        intervention: [
          'Wrote `extract_all_models.py` to parse the source manifest into a clean URL list',
          'Wrote `download_models.py` to batch-pull every GLB with integrity checks',
          'Centralized output into a versioned `models/` directory for the customizer',
          'Stashed `extracted_urls.json` as a source-of-truth manifest the next drop can diff against'
        ],
        reading: {
          'Asset prep': 'Scripted, one command',
          'URL extraction': 'Automated',
          'Download integrity': 'Per-file verification',
          'Tooling': 'Python pipeline'
        },
        guaranteeOutcome: true,
        notes: 'Internal supporting work for the Champro Merch Builder commercial build. Removes a manual step from every product drop.',
        status: 'shipped',
        date: '2025-2026',
        projectId: 'CHPR-PIPE-001',
        lead: 'Sanderson',
        heroVisual: 'pipeline'
      },
      {
        id: 'lead-qualifier-ai',
        name: 'Lead Qualifier AI',
        client: 'Scottsdale Solar',
        metric: '85% accuracy',
        x: 80,
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
        y: 70,
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
    ],
    // Gear glyph: 8 outer teeth on an octagonal ring + a center hub.
    // Star 0 (Champro Asset Pipeline) is the top tooth, star 1 (Lead
    // Qualifier AI) is the right tooth, star 2 (Content Pipeline) is the
    // bottom tooth. Anchors 0-4 fill the remaining teeth, anchor 5 is the
    // dimmer center hub.
    // Gear glyph with center hub now connected by spokes:
    //   Stars (3): 0 top (75,60), 1 right (80,65), 2 bottom (75,70).
    //   Anchors (6): a0-a4 — five more teeth around the perimeter; a5 — center hub.
    // The hub was previously a free-floating brass dot. Three spokes now
    // run from each real star to the hub, reinforcing the gear metaphor.
    shape: {
      anchors: [
        { x: 70, y: 65 }, // a0 (idx 3): left tooth
        { x: 79, y: 61 }, // a1 (idx 4): top-right tooth
        { x: 79, y: 69 }, // a2 (idx 5): bottom-right tooth
        { x: 71, y: 69 }, // a3 (idx 6): bottom-left tooth
        { x: 71, y: 61 }, // a4 (idx 7): top-left tooth
        { x: 75, y: 65 }  // a5 (idx 8): center hub — now on 3 spokes
      ],
      edges: [
        [0, 4], // top → top-right
        [4, 1], // top-right → right
        [1, 5], // right → bottom-right
        [5, 2], // bottom-right → bottom
        [2, 6], // bottom → bottom-left
        [6, 3], // bottom-left → left
        [3, 7], // left → top-left
        [7, 0], // top-left → top (closes octagon)
        [0, 8], // top star → hub (NEW: spoke)
        [1, 8], // right star → hub (NEW: spoke)
        [2, 8]  // bottom star → hub (NEW: spoke)
      ]
    }
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
        x: 15,
        y: 64,
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
        x: 15,
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
        y: 76,
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
    ],
    // Lighthouse-tower glyph: vertical spine + splayed feet + three beam
    // rays now connected to the lantern.
    //   Stars (3): 0 lantern (15,64), 1 gallery (15,68), 2 base (15,76).
    //   Anchors (5): a0/a1 splayed feet, a2/a3/a4 beam dots radiating to
    //   the upper-right of the lantern.
    // The 3 beam dots were previously free-floating; they're now reached
    // by light-ray edges emitted from the lantern (star 0).
    shape: {
      anchors: [
        { x: 12, y: 76 }, // a0 (idx 3): left foot
        { x: 18, y: 76 }, // a1 (idx 4): right foot
        { x: 22, y: 60 }, // a2 (idx 5): beam dot 1 (highest)
        { x: 24, y: 64 }, // a3 (idx 6): beam dot 2
        { x: 22, y: 68 }  // a4 (idx 7): beam dot 3 (lowest)
      ],
      edges: [
        [0, 1], // lantern → gallery
        [1, 2], // gallery → base
        [3, 2], // left foot → base
        [2, 4], // base → right foot
        [0, 5], // lantern → beam dot 1 (NEW: light ray)
        [0, 6], // lantern → beam dot 2 (NEW: light ray)
        [0, 7]  // lantern → beam dot 3 (NEW: light ray)
      ]
    }
  },
  {
    // Sixth constellation — added in round-2 audit when three real motion
    // projects (Easy Ice, Podunkton, IUPUI Math Center) surfaced that
    // didn't fit Build/Voice/Signal/Engine/Lighthouse. Per the user's
    // standing rule: add a new constellation when ≥3 real projects share
    // a coherent practice outside the existing five.
    id: 'the-reel',
    name: 'The Reel',
    practice: 'Motion design & animation',
    tagline: 'Motion that carries meaning, not decoration.',
    description: 'Animation, motion graphics, content production — story told in time.',
    position: { x: 50, y: 85 },
    promise: "If the motion doesn't communicate state, hierarchy, or relationship inside 5 seconds of viewing, we cut it. No decoration billed as direction.",
    offerings: [
      {
        name: 'Brand Motion Loop',
        priceRange: '$3K - $8K',
        scope: 'Short-form looping motion (social / web hero)',
        timeline: '2-3 weeks',
        details: [
          'Brand voice + motion vocabulary discovery',
          'Storyboard + animatic',
          '5-15 second loops, multi-aspect-ratio export',
          'Sound design pass',
          '2 rounds of revisions',
          'Source files + delivery preset'
        ]
      },
      {
        name: 'Explainer / Product Motion',
        priceRange: '$10K - $25K',
        scope: '60-120 second 2D animation',
        timeline: '5-8 weeks',
        details: [
          'Script + voice-over coordination',
          'Storyboard + animatic with sound',
          'Custom illustration + rigged animation',
          'Music + sound design',
          'Captions + accessibility delivery',
          'Multi-platform export specs'
        ]
      },
      {
        name: 'Motion System',
        priceRange: '$12K - $30K',
        scope: 'Motion language for a product or brand',
        timeline: '6-10 weeks',
        details: [
          'Audit existing motion + brand context',
          'Define easing curves, durations, vocabulary',
          'Reference library + Lottie / video deliverables',
          'Engineering handoff documentation',
          'Implementation guidance for in-product motion',
          'Quarterly governance review (first year)'
        ]
      }
    ],
    stars: [
      {
        // Real project — Easy Ice animation work. Featured on the user's
        // Wix portfolio as a recent project; companion `easyicev2-l8tyl0`
        // FlutterFlow repo on GitHub suggests an app component too.
        id: 'easy-ice',
        name: 'Easy Ice',
        client: 'Easy Ice',
        metric: 'Brand motion shipped',
        x: 50,
        y: 77,
        hypothesis: 'Easy Ice needed brand-aligned motion for short-form social and web placements that read as their own — not as stock animation lightly tinted with brand colors.',
        baseline: {
          'Motion library': 'Stock placeholders',
          'Brand consistency': 'Inconsistent across placements',
          'Production cadence': 'Per-asset bespoke'
        },
        intervention: [
          'Discovery on Easy Ice brand voice + competitive motion landscape',
          'Designed a small motion vocabulary (easing, timing, transitions) the brand can reuse',
          'Animated brand-aligned short-form loops for social + web',
          'Coordinated multi-aspect-ratio delivery'
        ],
        reading: {
          'Motion library': 'Brand-owned vocabulary shipped',
          'Brand consistency': 'Coherent across placements',
          'Production cadence': 'Reusable system'
        },
        guaranteeOutcome: true,
        notes: 'Featured project on rickymsanderson5.wixsite.com. The FlutterFlow companion repo on GitHub is open for follow-on app work.',
        status: 'shipped',
        date: '2025',
        projectId: 'EZICE-2025-001',
        lead: 'Sanderson',
        heroVisual: 'snowflake'
      },
      {
        // Real project — Podunkton 2D animation. Junior animator + production
        // assistant credit (early-career role, disclosed honestly here).
        id: 'podunkton-2d',
        name: 'Podunkton',
        client: 'Podunkton',
        metric: 'Junior animator credit · 2D series',
        x: 44,
        y: 91,
        hypothesis: 'The Podunkton series needed additional 2D animation capacity to hit episodic delivery without compromising hand-drawn craft.',
        baseline: {
          'Series capacity': 'Lean team',
          'Pipeline': 'Established',
          'Role required': 'Junior animator + production assist'
        },
        intervention: [
          'Inbetweens + clean-up on assigned 2D shots',
          'Production assist: file management, asset packaging, render coordination',
          'Worked inside an existing senior-led pipeline'
        ],
        reading: {
          'Shots contributed': 'Per-episode quota met',
          'Pipeline impact': 'No regressions introduced',
          'Role progression': 'Junior credit on shipped series'
        },
        guaranteeOutcome: true,
        notes: 'Early-career junior role — included to document the practice depth, not framed as senior work. Honest portfolio over inflated credits.',
        status: 'shipped',
        date: '2017-2018',
        projectId: 'PDKT-2D-001',
        lead: 'Sanderson',
        heroVisual: 'film'
      },
      {
        // Real project — three years of student-facing animation at IUPUI's
        // Math Assistance Center. The longest motion engagement on record.
        id: 'iupui-math-center',
        name: 'IUPUI Math Assistance Center',
        client: 'IUPUI Math Assistance Center',
        metric: '3 years of student-facing animation',
        x: 56,
        y: 91,
        hypothesis: 'The Math Assistance Center needed informative + engaging content to reach IUPUI students about resources and services — written copy alone wasn\'t landing.',
        baseline: {
          'Outreach format': 'Static flyers + email',
          'Student engagement': 'Low',
          'Production capacity': 'None in-house'
        },
        intervention: [
          'Wrote + scripted content for student-facing animations',
          'Recorded voice-overs and composed/recorded original music',
          'Designed icons + visual systems tied to math-tutoring topics',
          'Animated in After Effects and Adobe Flash',
          'Filmed + edited supporting live-action material'
        ],
        reading: {
          'Outreach format': 'Animated content library',
          'Student engagement': 'Multi-channel reach',
          'Production capacity': 'In-house pipeline built'
        },
        guaranteeOutcome: true,
        notes: '2014–2017. End-to-end ownership: writing → score → animation → delivery. Foundational motion-design experience.',
        status: 'shipped',
        date: '2014-2017',
        projectId: 'IUPUI-MAC-001',
        lead: 'Sanderson',
        heroVisual: 'equations'
      }
    ],
    process: [
      {
        step: 1,
        name: 'Brief & Reference',
        description: 'We capture the message, the audience, and references for tone. The motion brief is one page or less.'
      },
      {
        step: 2,
        name: 'Storyboard',
        description: 'Frames on paper. Beats are decided before any motion happens.'
      },
      {
        step: 3,
        name: 'Animatic',
        description: 'Storyboard set to timing. We confirm pacing before final animation begins.'
      },
      {
        step: 4,
        name: 'Animation',
        description: 'Final animation built in the right tool for the job (After Effects, hand-drawn, Lottie, or in-product motion code).'
      },
      {
        step: 5,
        name: 'Sound + Polish',
        description: 'Sound design and music timed to motion. Final passes for legibility, captions, and accessibility.'
      },
      {
        step: 6,
        name: 'Delivery & Iterations',
        description: 'Multi-platform export, captions, source files. Two iteration rounds included.'
      }
    ],
    // Film-reel glyph: 3 star points around a hexagonal rim + 3 spokes to
    // a central spindle. The rim is closed with 2 brass anchors at the
    // left and right poles. Combined points list (stars 0-2 + anchors
    // 3-5): 0 easy-ice top, 1 podunkton-2d bottom-left, 2 iupui bottom-
    // right, 3 left anchor, 4 right anchor, 5 center spindle.
    shape: {
      anchors: [
        { x: 43, y: 84 }, // a0: left rim anchor (idx 3)
        { x: 57, y: 84 }, // a1: right rim anchor (idx 4)
        { x: 50, y: 85 }  // a2: center spindle (idx 5)
      ],
      edges: [
        [0, 4], // top → right rim
        [4, 2], // right rim → bottom-right
        [2, 1], // bottom-right → bottom-left
        [1, 3], // bottom-left → left rim
        [3, 0], // left rim → top
        [0, 5], // top → spindle
        [1, 5], // bottom-left → spindle
        [2, 5]  // bottom-right → spindle
      ]
    }
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
