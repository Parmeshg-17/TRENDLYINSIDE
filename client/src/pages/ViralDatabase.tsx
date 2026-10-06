import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Flame, Filter, Copy, Check, Sparkles,
  ChevronDown, ChevronUp, BookOpen
} from 'lucide-react';
import { getViralDatabase } from '../services/api';
import type { ViralCaseStudy } from '../types';
import {
  AdBanner,
  ErrorCard,
  CreatorToolkit,
} from '../components/AnalysisComponents';

const NICHES = [
  'all',
  'Tech & Coding',
  'Finance & Investing',
  'Lifestyle & Productivity',
  'Gaming',
  'Fitness & Health',
  'Education & Science',
  'Business & Startups'
];

const PLATFORMS = [
  'all',
  'YouTube Long-form',
  'YouTube Shorts',
  'Instagram Reels',
  'TikTok'
];

export default function ViralDatabase() {
  const [cases, setCases] = useState<ViralCaseStudy[]>([]);
  const [search, setSearch] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [sort, setSort] = useState<'multiplier' | 'views'>('multiplier');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchCases = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getViralDatabase({
        niche: selectedNiche !== 'all' ? selectedNiche : undefined,
        platform: selectedPlatform !== 'all' ? selectedPlatform : undefined,
        search: search.trim() || undefined,
        sort
      });
      setCases(data.cases || []);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Failed to fetch viral database.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [selectedNiche, selectedPlatform, sort]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCases();
  };

  const handleCopyFramework = (id: string, template: string) => {
    navigator.clipboard.writeText(template);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-midnight-surface pt-28 md:pt-32 pb-16">
      <div className="container-main max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fjord-blue/10 border border-fjord-blue/20 text-fjord-blue text-xs font-semibold mb-3"
          >
            <Flame className="w-3.5 h-3.5 text-red-500" />
            Phase 3 Empirical Creator Library
          </motion.div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-midnight-abyss mb-3">
            Viral Content Case Study Database
          </h1>
          <p className="text-frosty-slate text-sm md:text-base max-w-2xl mx-auto">
            Dissect high-multiplier viral videos across YouTube, Shorts, Reels, and TikTok. Steal proven hook psychology and replicable script frameworks.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="card p-6 border border-glacial-sky/30 shadow-card bg-white mb-8 space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-frosty-slate" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by topic, creator, psychological trigger, or hook phrase..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7FAFC] border border-glacial-sky/30 rounded-xl text-sm text-midnight-abyss focus:outline-none focus:border-fjord-blue focus:bg-white transition-all"
              />
            </div>
            <button type="submit" className="btn-primary py-2.5 px-5 text-xs font-semibold rounded-xl shrink-0">
              Search Cases
            </button>
          </form>

          {/* Niche Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            <span className="text-xs font-semibold text-frosty-slate whitespace-nowrap mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-fjord-blue" />
              Niche:
            </span>
            {NICHES.map((niche) => (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche)}
                className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  selectedNiche === niche
                    ? 'bg-midnight-abyss text-white font-semibold shadow-xs'
                    : 'bg-[#F4F7FA] text-midnight-abyss hover:bg-glacial-sky/20 border border-glacial-sky/20'
                }`}
              >
                {niche === 'all' ? 'All Niches' : niche}
              </button>
            ))}
          </div>

          {/* Platform & Sort Sub-bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-glacial-sky/20 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-frosty-slate font-medium">Platform:</span>
              {PLATFORMS.map((platform) => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    selectedPlatform === platform
                      ? 'bg-fjord-blue text-white font-semibold'
                      : 'text-frosty-slate hover:text-midnight-abyss'
                  }`}
                >
                  {platform === 'all' ? 'All Platforms' : platform}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-frosty-slate font-medium">Sort By:</span>
              <button
                onClick={() => setSort('multiplier')}
                className={`px-2 py-0.5 rounded font-medium ${sort === 'multiplier' ? 'bg-amber-100 text-amber-800' : 'text-frosty-slate'}`}
              >
                Multiplier
              </button>
              <button
                onClick={() => setSort('views')}
                className={`px-2 py-0.5 rounded font-medium ${sort === 'views' ? 'bg-blue-100 text-blue-800' : 'text-frosty-slate'}`}
              >
                Total Views
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <ErrorCard message={error} onRetry={fetchCases} />
          </div>
        )}

        {/* Results Count Bar */}
        <div className="flex justify-between items-center mb-5 px-1">
          <span className="text-xs text-frosty-slate font-medium">
            Showing <strong className="text-midnight-abyss">{cases.length}</strong> viral case studies
          </span>
          <span className="text-xs text-fjord-blue font-semibold">
            100% Free · Click card for complete breakdown
          </span>
        </div>

        {/* Case Studies Grid */}
        {isLoading ? (
          <div className="space-y-4 mb-10">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="card p-6 border border-glacial-sky/20 bg-white animate-pulse">
                <div className="flex gap-2 mb-3">
                  <div className="h-5 bg-glacial-sky/30 rounded-full w-24" />
                  <div className="h-5 bg-glacial-sky/20 rounded-full w-28" />
                </div>
                <div className="h-6 bg-glacial-sky/25 rounded w-3/4 mb-3" />
                <div className="h-4 bg-glacial-sky/20 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 mb-10">
            {cases.map((item, idx) => {
            const isExpanded = expandedId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="card border border-glacial-sky/30 bg-white overflow-hidden shadow-card transition-all"
              >
                {/* Header Summary Row */}
                <div
                  className="p-5 md:p-6 cursor-pointer hover:bg-[#F9FBFC] transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="badge bg-red-100 text-red-700 font-bold text-[11px] flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          {item.multiplier}
                        </span>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-fjord-blue border border-glacial-sky/30">
                          {item.platform}
                        </span>
                        <span className="text-[11px] text-frosty-slate">
                          {item.niche} • {item.duration}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-lg text-midnight-abyss group-hover:text-fjord-blue">
                        {item.title}
                      </h3>

                      <p className="text-xs text-frosty-slate">
                        Creator: <strong className="text-midnight-abyss font-semibold">{item.creator}</strong> •{' '}
                        <span className="text-green-700 font-bold">{item.views} Views</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(isExpanded ? null : item.id);
                        }}
                      >
                        {isExpanded ? 'Hide Blueprint' : 'View Blueprint'}
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Hook Preview */}
                  <div className="mt-3.5 p-3 rounded-xl bg-glacial-sky/10 border border-glacial-sky/20 text-xs text-midnight-abyss leading-relaxed">
                    <span className="font-bold text-fjord-blue mr-1">3-Second Hook:</span>
                    "{item.hookBreakdown}"
                  </div>
                </div>

                {/* Expanded Deep Breakdown */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-glacial-sky/20 p-5 md:p-6 bg-[#F8FAFC] space-y-6"
                    >
                      {/* Grid: Retention & Thumbnail */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-glacial-sky/20">
                          <span className="text-xs font-bold text-midnight-abyss uppercase tracking-wide block mb-1.5">
                            Retention Technique & Pacing
                          </span>
                          <p className="text-xs text-frosty-slate leading-relaxed">
                            {item.retentionTechnique}
                          </p>
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-glacial-sky/20">
                          <span className="text-xs font-bold text-midnight-abyss uppercase tracking-wide block mb-1.5">
                            Thumbnail Packaging Concept
                          </span>
                          <p className="text-xs text-frosty-slate leading-relaxed">
                            {item.thumbnailConcept}
                          </p>
                        </div>
                      </div>

                      {/* Viral Factors */}
                      <div>
                        <span className="text-xs font-bold text-midnight-abyss uppercase tracking-wide block mb-2">
                          Psychological Triggers That Made It Viral
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                          {item.viralFactors.map((factor, fIdx) => (
                            <div key={fIdx} className="bg-white p-3 rounded-lg border border-glacial-sky/20 flex items-start gap-2 text-xs text-midnight-abyss">
                              <Sparkles className="w-3.5 h-3.5 text-fjord-blue shrink-0 mt-0.5" />
                              <span>{factor}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Replicable Script Framework */}
                      <div className="bg-white p-5 rounded-xl border border-glacial-sky/30 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-fjord-blue uppercase tracking-wide flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            Cloneable Script Framework
                          </span>
                          <button
                            onClick={() => handleCopyFramework(item.id, item.frameworkTemplate)}
                            className="btn-secondary text-xs px-3 py-1 flex items-center gap-1"
                          >
                            {copiedId === item.id ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                            {copiedId === item.id ? 'Copied Template!' : 'Copy Script Template'}
                          </button>
                        </div>
                        <pre className="text-xs bg-[#F4F7FA] p-3.5 rounded-lg text-midnight-abyss whitespace-pre-wrap font-mono leading-relaxed border border-glacial-sky/20">
                          {item.frameworkTemplate}
                        </pre>
                      </div>

                      {/* Key Golden Takeaway */}
                      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                        <span className="font-bold">Golden Rule:</span>
                        <span>{item.keyTakeaway}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

        {/* Ad Banner */}
        <div className="my-8">
          <AdBanner className="my-2" />
        </div>

        {/* Creator Growth Toolkit */}
        <CreatorToolkit />
      </div>
    </div>
  );
}
