import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Zap, Lightbulb, Map, BarChart2,
  CheckCircle, ArrowRight, Play, Video, Film, Music2,
  Image as ImageIcon, Users, Bot, Sparkles, Database,
  X, AlertCircle, ChevronRight, Eye, ShieldCheck
} from 'lucide-react';
import { YoutubeIcon } from '../components/AnalysisComponents';
import { ScoreCircle, ScoreCard } from '../components/ScoreComponents';
import FaqSection from '../components/FaqSection';
import { useSEO } from '../lib/seo';

/* ── Stable Particle Coordinates for Hero ───────────────────── */
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  w: 10 + (i * 7) % 36,
  h: 10 + (i * 7) % 36,
  left: (i * 8.3 + 4) % 100,
  top: (i * 8.5 + 6) % 90,
  opacity: 0.15 + (i * 0.04) % 0.35,
  dur: 5 + (i % 5),
  delay: (i * 0.35) % 3,
}));

/* ── URL Detection & Validation ────────────────────────────── */
type DetectedType = 'video' | 'shorts' | 'channel' | 'reel' | 'tiktok' | 'unknown' | null;

function detectUrlType(url: string): DetectedType {
  const trimmed = url.trim().toLowerCase();
  if (!trimmed) return null;
  if (trimmed.includes('youtube.com/shorts/') || trimmed.includes('youtu.be/shorts/')) return 'shorts';
  if (trimmed.includes('youtube.com/@') || trimmed.includes('youtube.com/c/') || trimmed.includes('youtube.com/channel/')) return 'channel';
  if (trimmed.includes('youtube.com/watch') || trimmed.includes('youtu.be/')) return 'video';
  if (trimmed.includes('instagram.com/reel') || trimmed.includes('instagr.am/reel')) return 'reel';
  if (trimmed.includes('tiktok.com')) return 'tiktok';
  return 'unknown';
}

function getDetectedBadge(type: DetectedType) {
  switch (type) {
    case 'video':
      return { label: 'YouTube Video detected', color: 'bg-red-50 text-red-700 border-red-200' };
    case 'shorts':
      return { label: 'YouTube Short detected', color: 'bg-purple-50 text-purple-700 border-purple-200' };
    case 'channel':
      return { label: 'YouTube Channel detected', color: 'bg-blue-50 text-blue-700 border-blue-200' };
    case 'reel':
      return { label: 'Instagram Reel detected', color: 'bg-pink-50 text-pink-700 border-pink-200' };
    case 'tiktok':
      return { label: 'TikTok Video detected', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
    default:
      return null;
  }
}

/* ── 6 Core Product Tools ──────────────────────────────────── */
const CORE_TOOLS = [
  {
    icon: <Video className="w-5 h-5 text-red-600" />,
    iconBg: 'bg-red-50 text-red-600 border-red-100',
    title: 'YouTube Video Analyzer',
    desc: 'Find weak hooks, storytelling gaps and engagement opportunities.',
    result: 'Detailed scores on Hook, Retention, Storytelling, and CTA with concrete rewrites.',
    href: '/youtube-video-analyzer',
    cta: 'Analyze Video',
    badge: 'Core Tool',
  },
  {
    icon: <Play className="w-5 h-5 text-purple-600" />,
    iconBg: 'bg-purple-50 text-purple-600 border-purple-100',
    title: 'YouTube Shorts Analyzer',
    desc: 'Evaluate first 3 seconds, pacing, and viral potential for short-form.',
    result: 'First 3-second drop-off audit, loop potential, and scroll-stopping improvements.',
    href: '/youtube-shorts-analyzer',
    cta: 'Analyze Shorts',
    badge: 'High Viral Impact',
  },
  {
    icon: <BarChart2 className="w-5 h-5 text-fjord-blue" />,
    iconBg: 'bg-blue-50 text-fjord-blue border-blue-100',
    title: 'YouTube Channel Analyzer',
    desc: 'Audit channel consistency, topic clarity, and 30-day creator roadmap.',
    result: 'Creator Score, niche alignment, brand consistency, and custom growth plan.',
    href: '/youtube-channel-analyzer',
    cta: 'Analyze Channel',
    badge: 'Strategic Audit',
  },
  {
    icon: <Zap className="w-5 h-5 text-amber-600" />,
    iconBg: 'bg-amber-50 text-amber-600 border-amber-100',
    title: 'Hook Generator',
    desc: 'Generate 20 high-converting hooks across 6 psychological categories.',
    result: 'Curiosity, Story, Authority, Contrarian, Problem-Based, and Emotional hooks.',
    href: '/hook-generator',
    cta: 'Generate Hooks',
    badge: '20 Formats',
  },
  {
    icon: <Lightbulb className="w-5 h-5 text-emerald-600" />,
    iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    title: 'Viral Idea Generator',
    desc: 'Generate 50 niche-tailored video concepts with format directions.',
    result: 'Educational, Storytelling, Challenge, and Trend-based ideas ready to script.',
    href: '/viral-idea-generator',
    cta: 'Generate Ideas',
    badge: '50 Ideas',
  },
  {
    icon: <Map className="w-5 h-5 text-teal-600" />,
    iconBg: 'bg-teal-50 text-teal-600 border-teal-100',
    title: 'Growth Roadmap Generator',
    desc: 'Build a personalized 4-week milestone strategy for channel growth.',
    result: 'Weekly objectives, prioritized actions, estimated effort, and success signals.',
    href: '/growth-roadmap-generator',
    cta: 'Build Roadmap',
    badge: '30-Day Plan',
  },
];

/* ── Secondary Specialized Tools ────────────────────────────── */
const MORE_TOOLS = [
  {
    icon: <ImageIcon className="w-4 h-4 text-amber-600" />,
    title: 'Thumbnail CTR Analyzer',
    desc: 'Visual hierarchy, contrast & emotional scoring for thumbnails.',
    href: '/thumbnail-analyzer',
  },
  {
    icon: <Film className="w-4 h-4 text-pink-600" />,
    title: 'Instagram Reel Analyzer',
    desc: 'Audio selection, pacing & Explore page reach diagnostics.',
    href: '/instagram-reel-analyzer',
  },
  {
    icon: <Music2 className="w-4 h-4 text-cyan-600" />,
    title: 'TikTok Video Analyzer',
    desc: 'Sub-second hooks, audio trends & FYP loop potential.',
    href: '/tiktok-analyzer',
  },
  {
    icon: <Users className="w-4 h-4 text-indigo-600" />,
    title: 'Competitor Channel Analyzer',
    desc: 'Side-by-side rival comparison to uncover content gaps.',
    href: '/competitor-analyzer',
  },
  {
    icon: <Bot className="w-4 h-4 text-fjord-blue" />,
    title: 'AI Creator Assistant',
    desc: 'Interactive script rewrite copilot and tactical growth coach.',
    href: '/creator-assistant',
  },
  {
    icon: <Database className="w-4 h-4 text-purple-600" />,
    title: 'Viral Content Database',
    desc: '30+ viral breakdown formulas across high-performing creators.',
    href: '/viral-database',
  },
];

/* ── How It Works Steps ─────────────────────────────────────── */
const STEPS = [
  {
    num: '01',
    title: 'Paste Your Content',
    desc: 'Add any supported YouTube video, Shorts, or channel URL into the analyzer field.',
  },
  {
    num: '02',
    title: 'AI Analyzes It',
    desc: 'TrendlyInside evaluates hooks, storytelling, engagement and creator signals.',
  },
  {
    num: '03',
    title: 'Get Clear Improvements',
    desc: 'Receive prioritized recommendations and actionable next steps before your next upload.',
  },
];

/* ── Benefits Section ───────────────────────────────────────── */
const BENEFITS = [
  {
    title: 'Understand why viewers leave',
    desc: 'Pinpoint the exact moments where pacing stalls or viewer curiosity drops.',
  },
  {
    title: 'Improve your first 30 seconds',
    desc: 'Restructure your opening promise so viewers stay invested through the payoff.',
  },
  {
    title: 'Build stronger hooks',
    desc: 'Replace generic introductions with proven psychological tension formulas.',
  },
  {
    title: 'Generate content ideas faster',
    desc: 'Access 50 niche-tailored concepts with recommended angles and formats.',
  },
  {
    title: 'Create better CTAs',
    desc: 'Position single, natural calls-to-action that convert without breaking flow.',
  },
  {
    title: 'Identify channel weaknesses',
    desc: 'Audit niche clarity, upload consistency, and topic focus systematically.',
  },
  {
    title: 'Build an actionable growth plan',
    desc: 'Translate algorithmic diagnostics into a structured 30-day weekly roadmap.',
  },
];

/* ── Curated Blog Previews ──────────────────────────────────── */
const BLOG_PREVIEWS = [
  {
    title: 'How to Write YouTube Hooks That Stop the Scroll',
    desc: 'The first 5 seconds determine retention. Here is the framework behind scroll-stopping hooks.',
    tag: 'Viral Hooks',
    readTime: '7 min read',
    slug: 'youtube-hooks-that-stop-scroll',
  },
  {
    title: '10 YouTube Shorts Strategies That Actually Work in 2025',
    desc: 'Shorts are the fastest path to subscriber velocity. Tested strategies from 1,000+ channels.',
    tag: 'Shorts Strategy',
    readTime: '9 min read',
    slug: 'youtube-shorts-strategies-2025',
  },
  {
    title: "Why Your YouTube Channel Isn't Growing (And How to Fix It)",
    desc: 'Common retention and packaging traps creators face, and the exact steps to turn them around.',
    tag: 'YouTube Growth',
    readTime: '12 min read',
    slug: 'why-youtube-channel-not-growing',
  },
];

export default function HomePage() {
  useSEO({
    title: 'Free AI YouTube Video & Channel Intelligence',
    description: 'Analyze YouTube videos, Shorts, and channels with AI. Get hook scores, retention insights, growth roadmaps, and viral rewrites — 100% free with no login required.',
    path: '/',
  });

  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showMoreTools, setShowMoreTools] = useState(false);
  const navigate = useNavigate();

  const particles = useMemo(() => PARTICLES, []);
  const detectedType = useMemo(() => detectUrlType(url), [url]);
  const detectedBadge = useMemo(() => getDetectedBadge(detectedType), [detectedType]);

  const handleAnalyze = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Please paste a YouTube video, Short, or channel link to analyze.");
      return;
    }

    const type = detectUrlType(trimmed);

    if (type === 'video') {
      setError('');
      navigate(`/youtube-video-analyzer?url=${encodeURIComponent(trimmed)}`);
    } else if (type === 'shorts') {
      setError('');
      navigate(`/youtube-shorts-analyzer?url=${encodeURIComponent(trimmed)}`);
    } else if (type === 'channel') {
      setError('');
      navigate(`/youtube-channel-analyzer?url=${encodeURIComponent(trimmed)}`);
    } else if (type === 'reel') {
      setError('');
      navigate(`/instagram-reel-analyzer?url=${encodeURIComponent(trimmed)}`);
    } else if (type === 'tiktok') {
      setError('');
      navigate(`/tiktok-analyzer?url=${encodeURIComponent(trimmed)}`);
    } else {
      setError("We couldn't recognize that YouTube link. Try a video, Short, or channel URL.");
    }
  };

  return (
    <>
      {/* ══════════════════════ HERO SECTION ══════════════════════ */}
      <section className="hero-section" aria-label="Hero">
        <div className="hero-bg" />
        <div className="hero-grid-overlay" />

        {/* Ambient atmospheric glows */}
        <div className="hero-orb w-[520px] h-[520px] bg-fjord-blue" style={{ top: '-12%', left: '-6%' }} />
        <div className="hero-orb w-[420px] h-[420px] bg-alpenglow" style={{ top: '8%', right: '-4%' }} />

        {/* Snowy alpine particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className="hero-particle bg-glacial-sky/25 backdrop-blur-xs"
              style={{
                width: p.w,
                height: p.h,
                left: `${p.left}%`,
                top: `${p.top}%`,
                opacity: p.opacity,
                '--dur': `${p.dur}s`,
                '--delay': `${p.delay}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Mountain silhouette */}
        <div className="mountain-silhouette" />

        {/* Hero Content */}
        <div className="relative z-10 container-main flex flex-col items-center justify-center min-h-[720px] text-center pt-28 pb-20 md:pt-36 md:pb-28">
          {/* Category Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/12 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              AI Creator Intelligence Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading font-bold text-white leading-[1.12] max-w-4xl"
            style={{ fontSize: 'clamp(2.5rem, 5.8vw, 4.2rem)' }}
          >
            Understand Why{' '}
            <span className="gradient-text-animated">Content Performs.</span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-5 text-glacial-sky max-w-2xl leading-relaxed text-base md:text-lg font-normal"
          >
            Analyze YouTube videos, Shorts and creator channels with AI. Discover what works, what hurts retention, and exactly what to improve next.
          </motion.p>

          {/* Central Analyzer Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="w-full max-w-2xl mx-auto mt-8"
          >
            {/* Live Detected Type Badge */}
            <div className="h-6 mb-2 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {detectedBadge && (
                  <motion.div
                    key={detectedBadge.label}
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold border ${detectedBadge.color} shadow-xs backdrop-blur-xs`}
                  >
                    <CheckCircle className="w-3 h-3" />
                    <span>{detectedBadge.label}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-white rounded-2xl shadow-[0_12px_44px_rgba(0,0,0,0.25)] border border-glacial-sky/40">
              <div className="flex-1 w-full flex items-center gap-3 px-3.5">
                <YoutubeIcon className="w-5 h-5 text-red-500 shrink-0" />
                <input
                  id="hero-content-input"
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    if (error) setError('');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  placeholder="Paste a YouTube video, Short, or channel URL"
                  className="w-full py-3.5 text-midnight-abyss placeholder-slate-400 bg-transparent focus:outline-none text-sm md:text-base font-normal"
                  aria-label="YouTube video, Short, or channel URL"
                />
              </div>
              <button
                id="hero-analyze-btn"
                onClick={handleAnalyze}
                className="btn-primary w-full sm:w-auto shrink-0 py-3.5 px-6 text-sm md:text-base font-semibold shadow-btn"
              >
                <Search className="w-4 h-4 text-white" />
                <span>Analyze Content</span>
              </button>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-3 text-xs md:text-sm text-red-100 bg-red-900/80 backdrop-blur-xs py-2 px-4 rounded-xl flex items-center justify-center gap-2 border border-red-400/40"
                >
                  <AlertCircle className="w-4 h-4 text-red-300 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Microcopy */}
            <p className="mt-3.5 text-glacial-sky/95 text-xs md:text-sm font-medium tracking-wide">
              Free • No signup • Instant AI insights
            </p>
          </motion.div>

          {/* Secondary CTA: Demo Analysis */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex items-center gap-3 mt-5"
          >
            <button
              onClick={() => setShowDemoModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/12 hover:bg-white/20 text-white font-medium border border-white/20 transition-all text-sm backdrop-blur-xs shadow-xs cursor-pointer"
              id="hero-demo-analysis-btn"
            >
              <Eye className="w-4 h-4 text-[#FADADD]" />
              <span>View Demo Analysis</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ TRUST STRIP ══════════════════════ */}
      <section className="bg-white border-b border-glacial-sky/25 py-4" aria-label="Trust Signals">
        <div className="container-main flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs md:text-sm font-semibold text-midnight-abyss/80">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>No signup</span>
          </div>
          <div className="h-3 w-px bg-glacial-sky/40 hidden sm:block" />
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Free to use</span>
          </div>
          <div className="h-3 w-px bg-glacial-sky/40 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-fjord-blue" />
            <span>AI-powered analysis</span>
          </div>
          <div className="h-3 w-px bg-glacial-sky/40 hidden sm:block" />
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Actionable recommendations</span>
          </div>
          <div className="h-3 w-px bg-glacial-sky/40 hidden sm:block" />
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-fjord-blue" />
            <span>Optimized for creators</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════ HOW IT WORKS ══════════════════════ */}
      <section className="section bg-white" aria-label="How TrendlyInside Works">
        <div className="container-main">
          <div className="text-center mb-14">
            <span className="badge-primary mb-3">Simple Process</span>
            <h2 className="section-title mt-2">How It Works</h2>
            <p className="section-subtitle">
              Transform raw content information into prioritized recommendations in three steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="step-card group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-glacial-sky/20 border border-glacial-sky/40 flex items-center justify-center text-fjord-blue font-bold text-sm mb-1">
                  {step.num}
                </div>
                <h3 className="font-heading font-bold text-xl text-midnight-abyss">
                  {step.title}
                </h3>
                <p className="text-frosty-slate text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ PRODUCT TOOLS GRID ══════════════════════ */}
      <section id="tools" className="section bg-section-alt" aria-label="Product Tools">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="badge-primary mb-3">AI Creator Intelligence Platform</span>
            <h2 className="section-title mt-2">Six Core Creator Tools</h2>
            <p className="section-subtitle">
              Every tool is purpose-built to diagnose retention, sharpen packaging, and accelerate channel growth.
            </p>
          </div>

          {/* 6 Core Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {CORE_TOOLS.map((tool) => (
              <div
                key={tool.title}
                className="tool-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${tool.iconBg}`}>
                      {tool.icon}
                    </div>
                    <span className="badge-primary text-2xs font-semibold py-0.5 px-2">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-midnight-abyss mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-midnight-abyss/85 text-sm font-medium mb-2.5">
                    "{tool.desc}"
                  </p>
                  <p className="text-xs text-frosty-slate leading-relaxed mb-6">
                    {tool.result}
                  </p>
                </div>

                <Link
                  to={tool.href}
                  className="btn-secondary w-full text-sm py-2.5 justify-center group"
                >
                  <span>{tool.cta}</span>
                  <ArrowRight className="w-4 h-4 text-fjord-blue group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          {/* Optional More Tools Accordion */}
          <div className="text-center mt-6">
            <button
              onClick={() => setShowMoreTools(!showMoreTools)}
              className="btn-ghost text-sm text-fjord-blue font-semibold inline-flex items-center gap-1.5"
            >
              <span>{showMoreTools ? 'Hide Specialized Tools' : 'Explore More Specialized Tools (Reels, TikTok, Thumbnails)'}</span>
              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${showMoreTools ? 'rotate-90' : ''}`} />
            </button>
          </div>

          <AnimatePresence>
            {showMoreTools && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-6 pt-6 border-t border-glacial-sky/25"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {MORE_TOOLS.map((tool) => (
                    <Link
                      key={tool.title}
                      to={tool.href}
                      className="card p-4 flex items-start gap-3 hover:border-glacial-sky/60 hover:-translate-y-0.5 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-glacial-sky/20 flex items-center justify-center shrink-0 mt-0.5">
                        {tool.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-midnight-abyss mb-0.5">
                          {tool.title}
                        </h4>
                        <p className="text-xs text-frosty-slate leading-relaxed">
                          {tool.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════════════════ EXAMPLE ANALYSIS SHOWCASE ══════════════════════ */}
      <section id="example-report" className="section bg-white" aria-label="Example Analysis Report">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="badge-primary mb-3">Live Output Preview</span>
            <h2 className="section-title mt-2">Example Content Intelligence Report</h2>
            <p className="section-subtitle">
              This is the depth of analysis TrendlyInside generates for every video URL.
            </p>
          </div>

          {/* Interactive Report Card */}
          <div className="card p-6 md:p-8 max-w-4xl mx-auto border-glacial-sky/40 shadow-card-hover">
            {/* Header / Notice */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-glacial-sky/25">
              <div className="flex items-center gap-3">
                <span className="badge bg-blue-50 text-fjord-blue border border-blue-200">
                  Example Analysis
                </span>
                <span className="text-xs text-frosty-slate">
                  Simulated from public video signals
                </span>
              </div>
              <button
                onClick={() => setShowDemoModal(true)}
                className="copy-btn text-xs font-semibold"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Open Full Interactive View</span>
              </button>
            </div>

            {/* Video Meta Info */}
            <div className="flex flex-col md:flex-row items-start gap-5 py-6 border-b border-glacial-sky/25">
              <div className="w-full md:w-52 aspect-video rounded-xl overflow-hidden bg-slate-900 relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-midnight-abyss to-slate-700 flex items-center justify-center text-white">
                  <Play className="w-10 h-10 text-white/80 fill-white/80" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-2xs px-1.5 py-0.5 rounded font-mono">
                  12:44
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold text-xl text-midnight-abyss mb-1.5">
                  How I Built a $10k/Month Business in 90 Days (Step-by-Step Breakdown)
                </h3>
                <p className="text-xs text-frosty-slate mb-3">
                  Channel: CreatorStudio • 142K views • Published 3 weeks ago
                </p>
                <p className="text-sm text-midnight-abyss leading-relaxed">
                  Strong authority positioning and clear visual timeline. However, the first 12 seconds contain preamble before previewing the 3 critical framework pillars, which reduces initial viewer retention.
                </p>
              </div>
            </div>

            {/* Scores Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6 border-b border-glacial-sky/25">
              <div className="card p-4 flex items-center justify-center md:col-span-1 bg-glacial-sky/5">
                <ScoreCircle score={84} label="Overall Score" sublabel="Strong Content" />
              </div>
              <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ScoreCard label="Hook" score={88} delay={1} />
                <ScoreCard label="Retention" score={79} delay={2} />
                <ScoreCard label="Storytelling" score={82} delay={3} />
                <ScoreCard label="Engagement" score={86} delay={4} />
                <ScoreCard label="CTA" score={74} delay={5} />
                <ScoreCard label="Thumbnail" score={91} delay={6} />
              </div>
            </div>

            {/* Top 3 Priority Improvements */}
            <div className="py-6 border-b border-glacial-sky/25">
              <h4 className="font-heading font-bold text-lg text-midnight-abyss mb-4">
                Top 3 Priority Improvements
              </h4>
              <div className="space-y-3">
                <div className="p-4 rounded-xl border border-red-200/80 bg-red-50/50 flex items-start gap-3">
                  <span className="badge bg-red-100 text-red-700 border-red-300 text-xs shrink-0 mt-0.5">
                    High Priority
                  </span>
                  <div>
                    <h5 className="font-semibold text-sm text-midnight-abyss">
                      Compress the opening 12 seconds into 4 seconds
                    </h5>
                    <p className="text-xs text-frosty-slate mt-1 leading-relaxed">
                      Cut the greeting and immediately state the unexpected $10k turning point. Show the proof dashboard in frame 1 before starting the backstory.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/50 flex items-start gap-3">
                  <span className="badge bg-amber-100 text-amber-700 border-amber-300 text-xs shrink-0 mt-0.5">
                    Medium Priority
                  </span>
                  <div>
                    <h5 className="font-semibold text-sm text-midnight-abyss">
                      Add a pattern interrupt at minute 04:30
                    </h5>
                    <p className="text-xs text-frosty-slate mt-1 leading-relaxed">
                      The transition between Pillar 1 and Pillar 2 has a 45-second monologue without visual B-roll or kinetic text. Insert an on-screen checklist graphic to re-engage attention.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-blue-200/80 bg-blue-50/50 flex items-start gap-3">
                  <span className="badge bg-blue-100 text-blue-700 border-blue-300 text-xs shrink-0 mt-0.5">
                    Low Priority
                  </span>
                  <div>
                    <h5 className="font-semibold text-sm text-midnight-abyss">
                      Replace double CTA at the end with a single resource link
                    </h5>
                    <p className="text-xs text-frosty-slate mt-1 leading-relaxed">
                      Asking viewers to both subscribe and click a link splits decision friction. Connect the next recommended video card directly to Pillar 3.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggested Hook Rewrite */}
            <div className="pt-6">
              <div className="p-4 rounded-xl bg-glacial-sky/15 border border-glacial-sky/30">
                <div className="flex items-center gap-2 text-xs font-semibold text-fjord-blue uppercase tracking-wider mb-2">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Suggested Hook Rewrite</span>
                </div>
                <p className="text-sm text-midnight-abyss font-medium italic">
                  "Most people think building a $10,000 a month business takes 3 years. It took me 90 days—because I stopped doing these two things in week 1."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ BENEFITS SECTION ══════════════════════ */}
      <section className="section bg-section-alt" aria-label="Benefits">
        <div className="container-main">
          <div className="text-center mb-14">
            <span className="badge-primary mb-3">Creator Outcomes</span>
            <h2 className="section-title mt-2">Make Every Upload Smarter.</h2>
            <p className="section-subtitle">
              Stop guessing what the algorithm wants. Start applying concrete adjustments backed by retention psychology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="card p-6 flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs mb-1">
                  ✓
                </div>
                <h3 className="font-heading font-bold text-lg text-midnight-abyss">
                  {b.title}
                </h3>
                <p className="text-sm text-frosty-slate leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ FAQ SECTION ══════════════════════ */}
      <FaqSection />

      {/* ══════════════════════ BLOG PREVIEWS ══════════════════════ */}
      <section className="section bg-white" aria-label="Creator Intelligence Blog">
        <div className="container-main">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="badge-primary mb-3">Creator Intelligence Guides</span>
              <h2 className="section-title text-left mt-2">Latest Insights &amp; Strategies</h2>
              <p className="text-frosty-slate text-sm md:text-base mt-2">
                Actionable frameworks on viewer psychology, hooks, and retention curves.
              </p>
            </div>
            <Link to="/blog" className="text-fjord-blue font-semibold text-sm hover:underline flex items-center gap-1 shrink-0">
              <span>View all guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_PREVIEWS.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="card p-6 flex flex-col justify-between hover:border-glacial-sky/60 hover:-translate-y-1 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-2xs font-semibold text-frosty-slate mb-3">
                    <span className="badge-primary py-0.5 px-2">{post.tag}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-midnight-abyss group-hover:text-fjord-blue transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-frosty-slate leading-relaxed mb-4">
                    {post.desc}
                  </p>
                </div>
                <div className="text-xs font-semibold text-fjord-blue flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ DEMO REPORT MODAL ══════════════════════ */}
      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-abyss/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-2xl border border-glacial-sky/40 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative"
            >
              <button
                onClick={() => setShowDemoModal(false)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-midnight-abyss transition-colors"
                aria-label="Close demo analysis modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs">
                  Interactive Demo Analysis
                </span>
                <span className="text-2xs text-frosty-slate">No API Request Required</span>
              </div>

              <h2 className="font-heading font-bold text-2xl text-midnight-abyss mb-2">
                Sample Report: Creator Intelligence Breakdown
              </h2>
              <p className="text-xs text-frosty-slate mb-6">
                Here is how TrendlyInside formats scores, retention gaps, and actionable changes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="card p-4 flex items-center justify-center bg-glacial-sky/10">
                  <ScoreCircle score={84} label="Overall Score" sublabel="Strong Content" />
                </div>
                <div className="md:col-span-2 grid grid-cols-2 gap-3">
                  <ScoreCard label="Hook" score={88} />
                  <ScoreCard label="Retention" score={79} />
                  <ScoreCard label="Storytelling" score={82} />
                  <ScoreCard label="CTA" score={74} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-glacial-sky/15 border border-glacial-sky/30 mb-6">
                <h4 className="font-semibold text-sm text-midnight-abyss mb-1 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-fjord-blue" />
                  Primary Action Needed
                </h4>
                <p className="text-xs text-frosty-slate leading-relaxed">
                  Move your key promise from minute 00:15 into the first 4 seconds. Your title creates a high expectation; validate that curiosity immediately before introducing context.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-glacial-sky/20">
                <span className="text-xs text-frosty-slate">
                  Ready to analyze your own content?
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setShowDemoModal(false);
                      const input = document.getElementById('hero-content-input');
                      input?.focus();
                    }}
                    className="btn-primary text-xs py-2 px-4"
                  >
                    Paste My Link
                  </button>
                  <Link
                    to="/hook-generator"
                    className="btn-secondary text-xs py-2 px-4"
                  >
                    Generate Hooks
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
