import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, RefreshCw, Copy, Check, ChevronDown, ChevronUp,
  Sparkles, Filter, HelpCircle, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateHooks } from '../services/api';
import type { HookGenerationResult, Hook } from '../types';
import LoadingState from '../components/LoadingState';
import { AdBanner } from '../components/AnalysisComponents';
import { useSEO, buildFaqSchema } from '../lib/seo';

const HOOK_CATEGORIES = [
  'All',
  'Curiosity',
  'Story',
  'Authority',
  'Contrarian',
  'Problem-Based',
  'Emotional',
] as const;

const PLATFORM_OPTIONS = ['YouTube', 'YouTube Shorts', 'Instagram Reels', 'TikTok'];
const CONTENT_TYPES = ['Long-form Video', 'Shorts / Reels (60s)', 'Tutorial / How-To', 'Case Study', 'Entertainment'];
const TONE_OPTIONS = ['Provocative & Direct', 'Educational & Clear', 'Story-Driven', 'Urgent & Contrarian', 'Casual & Relatable'];

const categoryStyles: Record<string, { badge: string; text: string }> = {
  Curiosity: { badge: 'bg-purple-50 text-purple-700 border-purple-200', text: 'Curiosity Gap' },
  Story: { badge: 'bg-blue-50 text-blue-700 border-blue-200', text: 'Narrative Story' },
  Authority: { badge: 'bg-amber-50 text-amber-700 border-amber-200', text: 'Authority Proof' },
  Contrarian: { badge: 'bg-red-50 text-red-700 border-red-200', text: 'Contrarian Stance' },
  'Problem-Based': { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', text: 'Problem Solved' },
  Emotional: { badge: 'bg-pink-50 text-pink-700 border-pink-200', text: 'Emotional Resonance' },
};

const FAQ = [
  {
    q: 'Why are hooks so important for video performance?',
    a: 'Viewer drop-off is highest within the first 5 seconds. A great hook establishes tension, promises a specific payoff, and breaks the viewer’s scrolling pattern before they click away.',
  },
  {
    q: 'How are the 20 hooks categorized?',
    a: 'Hooks are organized across 6 proven psychological angles: Curiosity (knowledge gap), Story (immediate narrative), Authority (credentials/results), Contrarian (challenging conventional wisdom), Problem-Based (acute pain point), and Emotional (high-stakes stakes).',
  },
  {
    q: 'Can I regenerate hooks if I want different variations?',
    a: 'Yes. Simply click "Regenerate Hooks" or tweak the tone and target audience inputs to explore new creative directions.',
  },
  {
    q: 'Is the Hook Generator free to use?',
    a: 'Yes, 100% free with no login or subscriptions required.',
  },
];

function HookCard({ hook, index }: { hook: Hook; index: number }) {
  const [copied, setCopied] = useState(false);
  const [showWhy, setShowWhy] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hook.hook);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const style = categoryStyles[hook.category] || { badge: 'badge-primary', text: hook.category };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="card p-5 border-glacial-sky/35 flex flex-col justify-between hover:border-glacial-sky/60 transition-all group"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`badge text-xs border ${style.badge}`}>
            {hook.category}
          </span>
          <button
            onClick={handleCopy}
            className="copy-btn shrink-0"
            aria-label="Copy hook text"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Copied ✓</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-fjord-blue" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <p className="text-midnight-abyss font-semibold text-sm md:text-base leading-snug mb-3">
          "{hook.hook}"
        </p>
      </div>

      <div>
        {hook.why && (
          <div>
            <button
              onClick={() => setShowWhy(!showWhy)}
              className="text-2xs text-frosty-slate hover:text-fjord-blue flex items-center gap-1 cursor-pointer pt-2 border-t border-glacial-sky/20 w-full"
            >
              <span>{showWhy ? 'Hide why this works' : 'Why it works'}</span>
              {showWhy ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <AnimatePresence>
              {showWhy && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-frosty-slate italic bg-glacial-sky/10 p-2.5 rounded-lg border border-glacial-sky/20 mt-2"
                >
                  💡 {hook.why}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function HookGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('YouTube');
  const [contentType, setContentType] = useState('Long-form Video');
  const [tone, setTone] = useState(TONE_OPTIONS[0]);
  const [audience, setAudience] = useState('');
  const [result, setResult] = useState<HookGenerationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedAll, setCopiedAll] = useState(false);

  useSEO({
    title: 'Free Viral Hook Generator — 20 Psychological Video Hooks AI',
    description: 'Generate 20 high-converting hooks across 6 psychological categories: Curiosity, Story, Authority, Contrarian, Problem-Based, and Emotional. 100% free.',
    path: '/hook-generator',
    structuredData: buildFaqSchema(FAQ),
  });

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic or video concept');
      return;
    }
    setIsLoading(true);
    setError('');
    setResult(null);
    setSelectedCategory('All');
    try {
      const data = await generateHooks({
        topic: `${topic.trim()} (Tone: ${tone})`,
        platform,
        contentType,
        audience: audience.trim() || undefined,
      });
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Generation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyAll = async () => {
    if (!result) return;
    const text = result.hooks
      .map((h, i) => `${i + 1}. [${h.category}] "${h.hook}"\nWhy: ${h.why || 'High tension opening'}`)
      .join('\n\n');
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const filteredHooks = result
    ? selectedCategory === 'All'
      ? result.hooks
      : result.hooks.filter((h) => h.category === selectedCategory)
    : [];

  return (
    <>
      <div
        className="pt-28 md:pt-32 pb-14 border-b border-glacial-sky/20"
        style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #E8F0F7 100%)' }}
      >
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-primary mb-3 inline-flex">Viral Hook Engine</span>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-midnight-abyss mt-2 mb-3">
              Viral Hook Generator
            </h1>
            <p className="text-frosty-slate max-w-xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              Generate 20 scroll-stopping video hooks across 6 psychological categories. Stop losing viewers in the critical first 5 seconds.
            </p>

            {/* Input Form */}
            <div className="w-full max-w-2xl mx-auto card p-6 text-left border-glacial-sky/35 shadow-card">
              <div className="space-y-4">
                <div>
                  <label htmlFor="hook-topic" className="block text-xs font-bold text-midnight-abyss uppercase tracking-wider mb-1.5">
                    Video Topic or Core Idea *
                  </label>
                  <input
                    id="hook-topic"
                    type="text"
                    value={topic}
                    onChange={(e) => {
                      setTopic(e.target.value);
                      if (error) setError('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    placeholder="e.g. How I built a $10k/mo side hustle without coding"
                    className="input-base"
                    disabled={isLoading}
                  />
                  {error && <p className="text-red-600 text-xs mt-1.5">{error}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-midnight-abyss uppercase tracking-wider mb-1.5">
                      Platform
                    </label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="input-base cursor-pointer"
                      disabled={isLoading}
                    >
                      {PLATFORM_OPTIONS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-midnight-abyss uppercase tracking-wider mb-1.5">
                      Content Format
                    </label>
                    <select
                      value={contentType}
                      onChange={(e) => setContentType(e.target.value)}
                      className="input-base cursor-pointer"
                      disabled={isLoading}
                    >
                      {CONTENT_TYPES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-midnight-abyss uppercase tracking-wider mb-1.5">
                      Tone
                    </label>
                    <select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="input-base cursor-pointer"
                      disabled={isLoading}
                    >
                      {TONE_OPTIONS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="hook-audience" className="block text-xs font-bold text-midnight-abyss uppercase tracking-wider mb-1.5">
                    Target Audience (Optional)
                  </label>
                  <input
                    id="hook-audience"
                    type="text"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g. Beginner creators, freelancers, college students"
                    className="input-base"
                    disabled={isLoading}
                  />
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="btn-primary w-full py-3.5 text-sm md:text-base font-semibold shadow-btn mt-2 cursor-pointer"
                  id="generate-hooks-btn"
                >
                  <Zap className="w-4 h-4" />
                  <span>{isLoading ? 'Generating 20 Viral Hooks...' : 'Generate 20 Viral Hooks'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-main py-10">
        {isLoading && (
          <LoadingState
            title="Formulating 20 Viral Hooks..."
            subtitle="Synthesizing curiosity gaps, emotional triggers, and scroll-stopping tension..."
            steps={[
              { label: 'Analyzing topic core promise' },
              { label: 'Crafting Curiosity & Story openings' },
              { label: 'Formulating Contrarian & Authority angles' },
              { label: 'Generating Problem-Based & Emotional variations' },
              { label: 'Optimizing word count for maximum retention' },
            ]}
          />
        )}

        {result && !isLoading && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Top Toolbar: Filters & Copy All */}
            <div className="card p-4 border-glacial-sky/35 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-frosty-slate uppercase tracking-wider mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>
                {HOOK_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-midnight-abyss text-white shadow-xs'
                        : 'bg-glacial-sky/20 text-midnight-abyss hover:bg-glacial-sky/40'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyAll}
                  className="btn-secondary text-xs py-2 px-3 shrink-0"
                >
                  {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAll ? 'All 20 Copied!' : 'Copy All 20 Hooks'}</span>
                </button>
                <button
                  onClick={handleGenerate}
                  className="btn-secondary text-xs py-2 px-3 shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>

            {/* Hook Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredHooks.map((h, i) => (
                <HookCard key={i} hook={h} index={i} />
              ))}
            </div>

            {/* Product Conversion Loop */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#223354] to-[#4A6D99] text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-card mt-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-[#FADADD] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Next Step in Creator Loop
                </span>
                <h4 className="font-heading font-bold text-xl text-white">
                  Got Your Hook? Now Test Full Video Retention
                </h4>
                <p className="text-glacial-sky text-xs md:text-sm mt-1 max-w-xl">
                  Paste any existing video URL to evaluate pacing, storytelling structure, and CTA effectiveness.
                </p>
              </div>
              <Link
                to="/youtube-video-analyzer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-midnight-abyss bg-white hover:bg-glacial-sky transition-colors text-sm shrink-0 shadow-md"
              >
                <span>Analyze Full Video</span>
                <ArrowRight className="w-4 h-4 text-fjord-blue" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Default State: FAQ */}
        {!result && !isLoading && (
          <div className="space-y-12 mt-4">
            <AdBanner />

            <div>
              <h2 className="font-heading font-bold text-2xl text-midnight-abyss mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4 max-w-3xl mx-auto">
                {FAQ.map((item, i) => (
                  <div key={i} className="card p-5 border-glacial-sky/30">
                    <h3 className="font-semibold text-midnight-abyss mb-2 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-fjord-blue shrink-0" />
                      <span>{item.q}</span>
                    </h3>
                    <p className="text-frosty-slate text-sm leading-relaxed pl-6">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
