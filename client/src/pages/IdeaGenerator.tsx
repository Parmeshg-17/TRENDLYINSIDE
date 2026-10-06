import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lightbulb, Copy, Check, RefreshCw, TrendingUp, Filter,
  Sparkles, HelpCircle, ArrowRight, Bookmark, Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateIdeas } from '../services/api';
import type { IdeaGenerationResult, ContentIdea } from '../types';
import LoadingState from '../components/LoadingState';
import { AdBanner } from '../components/AnalysisComponents';
import { useSEO, buildFaqSchema } from '../lib/seo';

const IDEA_CATEGORIES = [
  'All',
  'Educational',
  'Storytelling',
  'Challenge',
  'Trend-Based',
  'Contrarian',
  'Personal Experience',
] as const;

const categoryColors: Record<string, string> = {
  Educational: 'bg-blue-50 text-blue-700 border-blue-200',
  Storytelling: 'bg-purple-50 text-purple-700 border-purple-200',
  Challenge: 'bg-orange-50 text-orange-700 border-orange-200',
  'Trend-Based': 'bg-red-50 text-red-700 border-red-200',
  Contrarian: 'bg-amber-50 text-amber-700 border-amber-200',
  'Personal Experience': 'bg-green-50 text-green-700 border-green-200',
};

const viralBadges: Record<string, string> = {
  High: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Medium: 'bg-blue-50 text-blue-700 border-blue-200',
  Low: 'bg-amber-50 text-amber-700 border-amber-200',
};

const FAQ = [
  {
    q: 'How does the 50 Viral Idea Generator choose video angles?',
    a: 'TrendlyInside matches your niche, target audience, and growth goal against high-performing YouTube formats across 6 strategic categories: Educational blueprints, high-stakes Storytelling, repeatable Challenges, Trend capitalizing, Contrarian debate, and Personal Case Studies.',
  },
  {
    q: 'Can I export all 50 ideas at once?',
    a: 'Yes! Use "Export All as Text" or "Copy All" to export the entire list formatted cleanly for Notion, Google Docs, or Obsidian.',
  },
  {
    q: 'How should I choose which idea to produce first?',
    a: 'We recommend starting with "High" viral potential concepts in the Educational or Contrarian categories to build initial search volume and authority.',
  },
  {
    q: 'Is this idea generator free to use?',
    a: 'Yes, 100% free with no login required.',
  },
];

function IdeaCard({
  idea,
  index,
  isSaved,
  onToggleSave,
}: {
  idea: ContentIdea;
  index: number;
  isSaved: boolean;
  onToggleSave: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `Title: ${idea.title}\nAngle: ${idea.angle}\nCategory: ${idea.category}\nPotential: ${idea.viralPotential}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 12) * 0.03 }}
      className="card p-5 border-glacial-sky/35 flex flex-col justify-between hover:border-glacial-sky/60 transition-all group"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <span className={`badge text-xs border ${categoryColors[idea.category] || 'badge-primary'}`}>
            {idea.category}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={onToggleSave}
              className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-fjord-blue text-white border-fjord-blue'
                  : 'bg-white text-frosty-slate border-glacial-sky/40 hover:text-midnight-abyss'
              }`}
              title={isSaved ? 'Saved locally' : 'Save idea'}
              aria-label="Save idea locally"
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>

            <button
              onClick={handleCopy}
              className="copy-btn shrink-0"
              aria-label="Copy idea"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        <h4 className="text-midnight-abyss font-semibold text-sm md:text-base leading-snug mb-2">
          {idea.title}
        </h4>
        <p className="text-xs text-frosty-slate leading-relaxed mb-4">
          {idea.angle}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-glacial-sky/20 text-xs">
        <span className={`badge text-2xs border ${viralBadges[idea.viralPotential] || viralBadges.Medium}`}>
          <TrendingUp className="w-3 h-3 mr-1 inline" />
          {idea.viralPotential} Viral Potential
        </span>

        <Link
          to={`/hook-generator?topic=${encodeURIComponent(idea.title)}`}
          className="text-2xs font-semibold text-fjord-blue hover:underline flex items-center gap-0.5"
        >
          <span>Hooks →</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function IdeaGeneratorPage() {
  const [niche, setNiche] = useState('');
  const [audience, setAudience] = useState('');
  const [goal, setGoal] = useState('Gain 10k subscribers & higher retention');
  const [result, setResult] = useState<IdeaGenerationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [savedTitles, setSavedTitles] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('trendly_saved_ideas');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useSEO({
    title: 'Free 50 Viral Video Ideas Generator — Niche Content Angles AI',
    description: 'Generate 50 high-impact video ideas tailored to your creator niche. Categorized across Educational, Storytelling, Challenges, and Contrarian formats.',
    path: '/viral-idea-generator',
    structuredData: buildFaqSchema(FAQ),
  });

  const handleGenerate = async () => {
    if (!niche.trim()) {
      setError('Please enter your channel niche or topic');
      return;
    }
    setIsLoading(true);
    setError('');
    setResult(null);
    setSelectedCategory('All');
    try {
      const data = await generateIdeas({
        niche: niche.trim(),
        audience: audience.trim() || undefined,
        goal: goal.trim() || undefined,
      });
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Generation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSaveIdea = (title: string) => {
    setSavedTitles((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      try {
        localStorage.setItem('trendly_saved_ideas', JSON.stringify(Array.from(next)));
      } catch {
        // LocalStorage fallback
      }
      return next;
    });
  };

  const handleExportText = () => {
    if (!result) return;
    const text = `TrendlyInside 50 Viral Content Ideas
Niche: ${niche}
Generated: ${new Date().toLocaleDateString()}
==============================================

${result.ideas
  .map(
    (idea, i) =>
      `${i + 1}. [${idea.category}] ${idea.title}\n   Concept/Angle: ${idea.angle}\n   Viral Potential: ${idea.viralPotential}\n`
  )
  .join('\n')}

Generated by TrendlyInside — https://trendlyinside.com`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TrendlyInside-Ideas-${(niche || 'content').replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyAll = async () => {
    if (!result) return;
    const text = result.ideas
      .map((idea, i) => `${i + 1}. [${idea.category}] ${idea.title} — ${idea.angle}`)
      .join('\n');
    await navigator.clipboard.writeText(text);
  };

  const filteredIdeas = result
    ? selectedCategory === 'All'
      ? result.ideas
      : result.ideas.filter((idea) => idea.category === selectedCategory)
    : [];

  return (
    <>
      <div
        className="pt-28 md:pt-32 pb-14 border-b border-glacial-sky/20"
        style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #E8F0F7 100%)' }}
      >
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-primary mb-3 inline-flex">50 Content Blueprints</span>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-midnight-abyss mt-2 mb-3">
              Viral Idea Generator
            </h1>
            <p className="text-frosty-slate max-w-xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              Generate 50 niche-tailored video concepts mapped to creator psychology. Filter by format, save your favorites, and export directly.
            </p>

            {/* Input Form */}
            <div className="w-full max-w-2xl mx-auto card p-6 text-left border-glacial-sky/35 shadow-card">
              <div className="space-y-4">
                <div>
                  <label htmlFor="idea-niche" className="block text-xs font-bold text-midnight-abyss uppercase tracking-wider mb-1.5">
                    Your Niche or Industry *
                  </label>
                  <input
                    id="idea-niche"
                    type="text"
                    value={niche}
                    onChange={(e) => {
                      setNiche(e.target.value);
                      if (error) setError('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    placeholder="e.g. AI productivity tools, personal finance, fitness for busy professionals"
                    className="input-base"
                    disabled={isLoading}
                  />
                  {error && <p className="text-red-600 text-xs mt-1.5">{error}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="idea-audience" className="block text-xs font-bold text-midnight-abyss uppercase tracking-wider mb-1.5">
                      Target Audience (Optional)
                    </label>
                    <input
                      id="idea-audience"
                      type="text"
                      value={audience}
                      onChange={(e) => setAudience(e.target.value)}
                      placeholder="e.g. Beginners, corporate workers"
                      className="input-base"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="idea-goal" className="block text-xs font-bold text-midnight-abyss uppercase tracking-wider mb-1.5">
                      Primary Channel Goal
                    </label>
                    <input
                      id="idea-goal"
                      type="text"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      placeholder="e.g. Fast subscriber growth"
                      className="input-base"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="btn-primary w-full py-3.5 text-sm md:text-base font-semibold shadow-btn mt-2 cursor-pointer"
                  id="generate-ideas-btn"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>{isLoading ? 'Generating 50 Video Ideas...' : 'Generate 50 Content Ideas'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-main py-10">
        {isLoading && (
          <LoadingState
            title="Formulating 50 Video Blueprints..."
            subtitle="Analyzing high-converting formats, title psychology, and viewer curiosity gaps..."
            steps={[
              { label: 'Analyzing niche & audience constraints' },
              { label: 'Formulating Educational & How-To frameworks' },
              { label: 'Structuring Storytelling & Challenge concepts' },
              { label: 'Crafting Contrarian & Trend-jacking ideas' },
              { label: 'Evaluating viral potential ratings' },
            ]}
          />
        )}

        {result && !isLoading && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Toolbar */}
            <div className="card p-4 border-glacial-sky/35 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-frosty-slate uppercase tracking-wider mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>
                {IDEA_CATEGORIES.map((cat) => (
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
                <button onClick={handleCopyAll} className="btn-secondary text-xs py-2 px-3 shrink-0">
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy All</span>
                </button>
                <button onClick={handleExportText} className="btn-secondary text-xs py-2 px-3 shrink-0">
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Text</span>
                </button>
                <button onClick={handleGenerate} className="btn-secondary text-xs py-2 px-3 shrink-0">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>

            {/* Ideas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIdeas.map((idea, i) => (
                <IdeaCard
                  key={i}
                  idea={idea}
                  index={i}
                  isSaved={savedTitles.has(idea.title)}
                  onToggleSave={() => toggleSaveIdea(idea.title)}
                />
              ))}
            </div>

            {/* Product Conversion Loop */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#223354] to-[#4A6D99] text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-card mt-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-[#FADADD] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Execution Blueprint
                </span>
                <h4 className="font-heading font-bold text-xl text-white">
                  Turn These Ideas into a 30-Day Growth Schedule
                </h4>
                <p className="text-glacial-sky text-xs md:text-sm mt-1 max-w-xl">
                  Build a structured week-by-week publishing roadmap with priority milestones.
                </p>
              </div>
              <Link
                to="/growth-roadmap-generator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-midnight-abyss bg-white hover:bg-glacial-sky transition-colors text-sm shrink-0 shadow-md"
              >
                <span>Build 30-Day Roadmap</span>
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
