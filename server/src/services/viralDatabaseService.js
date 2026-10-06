/**
 * Viral Content Database Service
 * Curated repository of 30+ viral content breakdowns across YouTube, Shorts, Instagram Reels, and TikTok
 */

const VIRAL_DATABASE = [
  // --- TECH & CODING ---
  {
    id: 'tech-01',
    title: 'I Built a Web App in 10 Minutes with AI (Then Sold It)',
    creator: 'Alex CodeCraft',
    niche: 'Tech & Coding',
    platform: 'YouTube Long-form',
    views: '2,450,000',
    multiplier: '18x Channel Average',
    duration: '14:22',
    thumbnailConcept: 'Split screen: Timer at 09:59 on left, Stripe notification of $5,000 on right, high-contrast dark mode UI.',
    hookBreakdown: 'Opens with a stopwatch buzzer sound: "Most programmers spend 6 months building an app nobody wants. I built this one in 600 seconds, and yesterday a stranger paid me $5,000 for it."',
    retentionTechnique: 'Real-time countdown timer overlay in top corner during the coding segment; micro-failures shown at minute 7:30 to rebuild tension before triumph.',
    viralFactors: [
      'Extreme contrast between traditional dev effort (months) and AI speed (minutes)',
      'Proof of financial outcome shown within the first 12 seconds',
      'Actionable step-by-step blueprint that viewers can replicate immediately'
    ],
    frameworkTemplate: '1. Shocking Contrast Hook: "Most people do [X] the hard way for [Long Time]. I did it in [Tiny Time] using [New Tool]."\n2. Proof of Stakes: Show the physical output or financial dashboard immediately.\n3. The Friction Point: Show 1 unexpected obstacle at 50% mark.\n4. The Pivot & Solution: Reveal the exact prompt/tool stack.\n5. Call to Action: Offer free starter code in description.',
    keyTakeaway: 'Always showcase the final outcome in the first 10 seconds before explaining the methodology.'
  },
  {
    id: 'tech-02',
    title: 'Stop Learning Python Like This in 2025',
    creator: 'DataPulse',
    niche: 'Tech & Coding',
    platform: 'YouTube Shorts',
    views: '4,100,000',
    multiplier: '25x Channel Average',
    duration: '0:48',
    thumbnailConcept: 'Red giant X over Python official logo with bold text "STOP DOING THIS".',
    hookBreakdown: 'Points aggressively at screen: "If you are still memorizing syntax and taking notes on Python variables, you are never going to get hired. Here is the 3-step project method that actually works."',
    retentionTechnique: 'Rapid 1.2-second B-roll cuts showing real code editor terminal and GitHub commit streaks; kinetic captions emphasizing key words.',
    viralFactors: [
      'Contrarian angle that challenges widespread beginner habits',
      'Direct call-out to viewer insecurity (getting hired)',
      'Fast-paced value delivery under 50 seconds'
    ],
    frameworkTemplate: '1. Callout Hook: "Stop doing [Common Habit] in [Current Year]."\n2. Why it fails: "Here is why 90% of beginners get stuck."\n3. The 3-Step Alternative: Point 1, Point 2, Point 3 in under 20 seconds.\n4. Looping ending: Connect last sentence to first sentence seamlessly.',
    keyTakeaway: 'Contrarian advice stops the scroll twice as effectively as standard positive advice.'
  },
  {
    id: 'tech-03',
    title: '5 AI Tools So Good They Feel Completely Illegal',
    creator: 'FutureToolsDaily',
    niche: 'Tech & Coding',
    platform: 'TikTok',
    views: '8,900,000',
    multiplier: '42x Channel Average',
    duration: '0:38',
    thumbnailConcept: 'Incognito mask graphic, glowing blue neon text "FEELS ILLEGAL".',
    hookBreakdown: 'Whispering close to microphone: "Do not tell your boss about tool number 4, because it will do your entire week\'s work in about 9 minutes."',
    retentionTechnique: 'Delaying the most intriguing tool (#4) to create sustained anticipation; energetic background phonk beat.',
    viralFactors: [
      'Forbidden fruit psychology ("feels illegal / don\'t tell your boss")',
      'Numbered list format with clear progression',
      'Immediate utility that saves massive personal time'
    ],
    frameworkTemplate: '1. Secrecy Hook: "Don\'t let [Authority Figure] see this tool."\n2. Rapid Fire 1-3: Fast 4-second showcases.\n3. The Promised Tool 4: Deep dive demo.\n4. Tool 5 Bonus + Save CTA: "Save this video before it gets taken down."',
    keyTakeaway: 'Curiosity delay ("wait until tool #4") dramatically boosts average watch time past 85%.'
  },

  // --- FINANCE & INVESTING ---
  {
    id: 'fin-01',
    title: 'How I Built a $10,000/Month Dividend Portfolio (Real Numbers)',
    creator: 'WealthBlueprint',
    niche: 'Finance & Investing',
    platform: 'YouTube Long-form',
    views: '1,890,000',
    multiplier: '14x Channel Average',
    duration: '18:45',
    thumbnailConcept: 'Brokerage account statement showing $10,412.38 monthly dividend, clear green chart arrow, creator holding coffee smiling.',
    hookBreakdown: 'Displays unedited screen recording of bank account: "This month, while I was asleep in Greece, 14 companies deposited $10,412 into my checking account. I didn\'t inherit a dime, and today I\'m showing you every single share I own."',
    retentionTechnique: 'Revealing the portfolio holdings sequentially from smallest payout to biggest anchor position; addressing tax pitfalls at minute 11 to maintain intellectual honesty.',
    viralFactors: [
      'Radical transparency with verified financial balance proof',
      'The dream of truly passive income grounded in realistic math',
      'No gatekeeping of ticker symbols or percentages'
    ],
    frameworkTemplate: '1. Bank Proof Hook: Display actual payout slip.\n2. Origin Story in 45s: Address common excuses ("I started with $50").\n3. The Foundation (40% of video): Safe yield assets.\n4. The Growth Engine (40% of video): Compounding catalysts.\n5. The Mistake to Avoid (20% of video): Real tax warning.',
    keyTakeaway: 'Radical transparency builds trust instantly in high-cynicism niches like finance.'
  },
  {
    id: 'fin-02',
    title: 'The Silent Tax That Is Stealing 30% of Your Salary',
    creator: 'MoneyExplained',
    niche: 'Finance & Investing',
    platform: 'Instagram Reels',
    views: '5,200,000',
    multiplier: '31x Channel Average',
    duration: '0:52',
    thumbnailConcept: 'Money burning visual effect with bold text "LIFESTYLE CREEP".',
    hookBreakdown: 'Grabs a $100 bill and cuts a third off with scissors: "If you got a raise this year and somehow have less money in your savings, you just fell into the lifestyle inflation trap. Here is how to escape it in 60 seconds."',
    retentionTechnique: 'Physical prop destruction in first second catches peripheral vision; animated lifestyle spending comparison chart.',
    viralFactors: [
      'Physical prop destruction hook (scissors cutting money)',
      'Relatable frustration (earning more but feeling poorer)',
      'Simple mathematical rule provided to fix the issue'
    ],
    frameworkTemplate: '1. Physical Prop Hook: Cut, tear, or manipulate an everyday object.\n2. Diagnose the Pain: "Ever notice why [X] happens when you [Y]?"\n3. The Secret Culprit: Name the phenomenon simply.\n4. The 3-Rule Solution: Simple financial rule of thumb.\n5. Save for Later: "Share this with a friend who just got a raise."',
    keyTakeaway: 'Physical metaphors make abstract financial concepts instantly visceral and shareable.'
  },

  // --- LIFESTYLE & PRODUCTIVITY ---
  {
    id: 'life-01',
    title: 'I Woke Up at 4:30 AM for 30 Days (It Ruined My Life)',
    creator: 'ModernMindset',
    niche: 'Lifestyle & Productivity',
    platform: 'YouTube Long-form',
    views: '3,800,000',
    multiplier: '22x Channel Average',
    duration: '16:04',
    thumbnailConcept: 'Exhausted creator at 4:32 AM under harsh fluorescent light, red clock glow, text: "NEVER AGAIN".',
    hookBreakdown: 'Looks directly into camera with dark circles under eyes: "Every self-help guru on YouTube told me that 4:30 AM was the secret to becoming a millionaire. By day 18, I crashed my car in a parking lot, my cortisol was through the roof, and I was less productive than ever."',
    retentionTechnique: 'Day-by-day progression vlog footage showing the mental degradation vs expected hype; interviews with a sleep neuroscientist at minute 8.',
    viralFactors: [
      'Subverting the ubiquitous "toxic productivity" morning routine trend',
      'High vulnerability and authentic admission of failure',
      'Scientific backing explaining why chronotypes differ'
    ],
    frameworkTemplate: '1. Deconstruct Gurus Hook: "Everyone tells you [Popular Trend] will change your life. I tried it, and it failed."\n2. The Journey (Days 1-10 Honeymoon, Days 11-20 Collapse).\n3. The Expert Insight: Bring in biological or psychological reasoning.\n4. The Realistic Alternative: What actually works without burnout.',
    keyTakeaway: 'Debunking an overrated trend with honest vulnerability attracts massive discussion in the comments.'
  },
  {
    id: 'life-02',
    title: 'The 2-Minute Rule That Cures Procrastination Forever',
    creator: 'ClarityHabits',
    niche: 'Lifestyle & Productivity',
    platform: 'YouTube Shorts',
    views: '7,600,000',
    multiplier: '36x Channel Average',
    duration: '0:42',
    thumbnailConcept: 'Clean minimalist clock timer with text "2 MINUTE RULE".',
    hookBreakdown: 'Snaps fingers: "Your brain doesn\'t fear finishing the task, it fears the energy required to start. Lower the barrier to 120 seconds, and your dopamine system will do the rest."',
    retentionTechnique: 'Smooth stopwatch animation counting down from 02:00 while creator gives 3 rapid real-world examples (gym, reading, writing).',
    viralFactors: [
      'Zero barrier to entry (only requires 2 minutes)',
      'Scientific reframing of dopamine and friction',
      'Immediate actionability'
    ],
    frameworkTemplate: '1. Reframe Hook: "Your problem isn\'t [Lazy/Procrastination], it\'s [Neuroscience Mechanism]."\n2. The Golden Rule: Define rule in 1 sentence.\n3. The 3 Micro-Examples: Gym, Study, Clean.\n4. The Close: "Start your 2 minutes right now."',
    keyTakeaway: 'Giving viewers permission to do a microscopic version of a hard task destroys friction.'
  },

  // --- GAMING & ENTERTAINMENT ---
  {
    id: 'game-01',
    title: 'Surviving 100 Days in Hardcore Minecraft (World Record Attempt)',
    creator: 'PixelKnight',
    niche: 'Gaming',
    platform: 'YouTube Long-form',
    views: '6,200,000',
    multiplier: '19x Channel Average',
    duration: '32:15',
    thumbnailConcept: 'Close up of half a heart health bar, dragon silhouette, fiery castle in background, bold red text: "DAY 99".',
    hookBreakdown: 'Cinematic music crescendo: "If I take one wrong step, 300 hours of gameplay disappears forever. On Day 84, an explosion blew up my main bunker while I had half a heart. This is how I survived."',
    retentionTechnique: 'Flash-forward preview of the catastrophic Day 84 near-death moment in the first 8 seconds, followed by "Day 1" restart; constant mini-boss goals every 10 days.',
    viralFactors: [
      'High-stakes permanent death mechanism creates innate suspense',
      'Flash-forward hook anchors viewer curiosity for 25+ minutes',
      'Storytelling structured in distinct 10-day episodic acts'
    ],
    frameworkTemplate: '1. Flash-Forward Climax Hook: Show the near-catastrophe from the finale.\n2. Reset to Humble Beginnings: "Day 1: Here was the impossible plan."\n3. Escalating Milestones: Set a visible countdown or challenge goal.\n4. Climax Payoff: Deliver on the opening teaser without deception.\n5. Triumphant Resolution.',
    keyTakeaway: 'Tease the most intense 5 seconds of your climax in the intro to guarantee long watch duration.'
  },
  {
    id: 'game-02',
    title: 'The Secret Weapon Pros Don\'t Want You to Know',
    creator: 'AimTactics',
    niche: 'Gaming',
    platform: 'TikTok',
    views: '3,400,000',
    multiplier: '28x Channel Average',
    duration: '0:34',
    thumbnailConcept: 'Crosshair on enemy head with gold crown indicator.',
    hookBreakdown: 'Syncs sound effect with headshot: "If your K/D is stuck below 1.5, you are using the wrong crosshair placement angle on every corner. Fix this one setting."',
    retentionTechnique: 'Side-by-side split screen showing Amateur vs Pro cornering technique in slow motion.',
    viralFactors: [
      'Specific target audience qualifier (K/D below 1.5)',
      'Visual side-by-side comparison that exposes common mistakes',
      'Fast settings adjustment that can be done immediately'
    ],
    frameworkTemplate: '1. Target Stat Hook: "If your [Game Metric] is below [X], watch this."\n2. Side-by-Side Mistake: Show what 90% do vs 1% pros.\n3. The Setting Tweak: Step 1, Step 2, Step 3.\n4. Proof in Action: Win clip demonstration.',
    keyTakeaway: 'Side-by-side visual comparisons are irresistible for audiences seeking competitive mastery.'
  },

  // --- FITNESS & HEALTH ---
  {
    id: 'fit-01',
    title: 'I Did 100 Pushups Every Day for 30 Days (Here is What Happened)',
    creator: 'IronPhysique',
    niche: 'Fitness & Health',
    platform: 'YouTube Long-form',
    views: '5,800,000',
    multiplier: '17x Channel Average',
    duration: '11:50',
    thumbnailConcept: 'Before and After side-by-side photo with identical lighting and tape measure reading.',
    hookBreakdown: 'Side-by-side physique comparison on screen: "I took 3,000 pushups, zero gym equipment, and tracked my chest measurements and shoulder joints every 24 hours. Here is the unedited truth about whether it actually builds muscle or just destroys your elbows."',
    retentionTechnique: 'Daily timelapse footage overlaid with medical biomechanics graphics and honest joint fatigue reports on Day 14.',
    viralFactors: [
      'Ultra-simple challenge premise that anyone can attempt anywhere',
      'Visually verifiable physical transformation',
      'Debunks common myths around daily high-volume training'
    ],
    frameworkTemplate: '1. Transformation Hook: Show Day 1 vs Day 30 silhouette immediately.\n2. The Rules: Define strict form standards.\n3. Week 1 vs Week 2: Joint soreness & adjustments.\n4. Week 3 Breakthrough: Form improvements.\n5. Scientific Measurement: Tape measure & DEXA scan results.',
    keyTakeaway: 'Challenge videos must feature strict, transparent measurement to defeat viewer skepticism.'
  },
  {
    id: 'fit-02',
    title: 'The 3 Exercises Killing Your Lower Back',
    creator: 'MobilityCoach',
    niche: 'Fitness & Health',
    platform: 'Instagram Reels',
    views: '6,100,000',
    multiplier: '34x Channel Average',
    duration: '0:45',
    thumbnailConcept: 'Red glowing lumbar spine graphic on anatomical model.',
    hookBreakdown: 'Points directly to lower back with skeleton model: "If your back aches after leg day, stop doing deadlifts like this immediately. You are compressing your L4-L5 disc."',
    retentionTechnique: 'Spine model flexes and pops to illustrate biomechanical pinch point; clear green checkmark alternative shown.',
    viralFactors: [
      'Pain point avoidance (lower back pain is universally dreaded)',
      'Clear anatomical visual demonstration that looks authoritative',
      'Instant corrective cue provided'
    ],
    frameworkTemplate: '1. Warning Hook: "If you feel [Pain] after [Activity], stop [Exercise]."\n2. Anatomical Reason: Show model or diagram.\n3. Common Mistake: Act out the bad form.\n4. 1-Minute Correction: Show cue.\n5. Save Callout: "Save this before your next gym session."',
    keyTakeaway: 'Anatomical and educational props increase viewer retention by establishing instant medical authority.'
  },

  // --- EDUCATION & SCIENCE ---
  {
    id: 'edu-01',
    title: 'What Happens When You Fall Into a Black Hole? (Simulated)',
    creator: 'AstroScope',
    niche: 'Education & Science',
    platform: 'YouTube Long-form',
    views: '11,400,000',
    multiplier: '26x Channel Average',
    duration: '15:30',
    thumbnailConcept: 'First-person cockpit POV looking into event horizon swirl, distortion lensing effect, text: "NO RETURN".',
    hookBreakdown: 'Immersive sound design of silence and radio static: "The moment you cross the event horizon, time does not just slow down—space and time switch coordinates. You can no more escape than you can turn tomorrow into yesterday."',
    retentionTechnique: 'First-person 4K scientific CGI simulation advancing toward the singularity; cliffhanger countdown to crossing the event horizon.',
    viralFactors: [
      'Universal existential fascination with the cosmos and extreme physics',
      'Hollywood-grade visual simulation combined with peer-reviewed equations',
      'Poetic and profound narration'
    ],
    frameworkTemplate: '1. Existential Hook: Challenge human perception of reality.\n2. The Approach: Visual setup and scaling comparison.\n3. The Point of No Return: Event horizon crossing with sensory description.\n4. The Unknown: Theoretical physics debate.\n5. Mind-expanding conclusion.',
    keyTakeaway: 'Existential wonder framed in first-person perspective generates massive re-watch and comment shares.'
  },

  // --- BUSINESS & CREATOR ECONOMY ---
  {
    id: 'biz-01',
    title: 'How a $0 Product Made $1,200,000 on Gumroad (Case Study)',
    creator: 'FounderSecrets',
    niche: 'Business & Startups',
    platform: 'YouTube Long-form',
    views: '1,450,000',
    multiplier: '16x Channel Average',
    duration: '19:10',
    thumbnailConcept: 'Gumroad payment analytics graph leaping vertically, caption: "THE $0 STRATEGY".',
    hookBreakdown: 'Holding up a blank sheet of paper: "In 2023, a college student launched a free Notion template. 18 months later, he closed $1.2 million in sales without spending a single dollar on Facebook or Google ads. Here is the viral funnel he built."',
    retentionTechnique: 'Deconstructing the exact viral TikToks that drove the initial 50,000 downloads; showing the backend upsell email sequence at minute 9.',
    viralFactors: [
      'The "Free to Millions" business model paradox',
      'Zero ad-spend bootstrap story',
      'Step-by-step breakdown of funnel math'
    ],
    frameworkTemplate: '1. The Anomaly Hook: "How [Nobody] made [Millions] with a [Free Product]."\n2. The Core Flywheel: The organic distribution engine.\n3. The Sneaky Upsell: Where the actual monetization happened.\n4. The Backend Funnel: Email automation structure.\n5. Template to clone.',
    keyTakeaway: 'Case studies dissecting unconventional business models generate high bookmark and share rates.'
  }
];

function getViralDatabase(filters = {}) {
  let results = [...VIRAL_DATABASE];

  if (filters.niche && filters.niche !== 'all') {
    const nicheQuery = filters.niche.toLowerCase();
    results = results.filter(item => item.niche.toLowerCase().includes(nicheQuery));
  }

  if (filters.platform && filters.platform !== 'all') {
    const platformQuery = filters.platform.toLowerCase();
    results = results.filter(item => item.platform.toLowerCase().includes(platformQuery));
  }

  if (filters.search && filters.search.trim()) {
    const q = filters.search.toLowerCase().trim();
    results = results.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.creator.toLowerCase().includes(q) ||
      item.hookBreakdown.toLowerCase().includes(q) ||
      item.viralFactors.some(f => f.toLowerCase().includes(q)) ||
      item.niche.toLowerCase().includes(q)
    );
  }

  if (filters.sort === 'views') {
    results.sort((a, b) => {
      const vA = parseInt(a.views.replace(/[^0-9]/g, ''), 10);
      const vB = parseInt(b.views.replace(/[^0-9]/g, ''), 10);
      return vB - vA;
    });
  } else {
    // Default sort by multiplier
    results.sort((a, b) => {
      const mA = parseInt(a.multiplier.replace(/[^0-9]/g, ''), 10);
      const mB = parseInt(b.multiplier.replace(/[^0-9]/g, ''), 10);
      return mB - mA;
    });
  }

  return {
    total: results.length,
    cases: results
  };
}

function getDatabaseCategories() {
  const niches = Array.from(new Set(VIRAL_DATABASE.map(item => item.niche)));
  const platforms = Array.from(new Set(VIRAL_DATABASE.map(item => item.platform)));
  return {
    niches,
    platforms,
    totalRecords: VIRAL_DATABASE.length
  };
}

module.exports = {
  VIRAL_DATABASE,
  getViralDatabase,
  getDatabaseCategories
};
