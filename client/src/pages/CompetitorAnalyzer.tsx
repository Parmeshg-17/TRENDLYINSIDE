import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Swords, Trophy, Sparkles, RefreshCw, Target, ArrowRight } from 'lucide-react';
import { analyzeCompetitor } from '../services/api';
import type { CompetitorAnalysisResult } from '../types';
import LoadingState from '../components/LoadingState';
import { ScoreCircle } from '../components/ScoreComponents';
import {
  AdBanner,
  ErrorCard,
  ShareButton,
  CreatorToolkit,
} from '../components/AnalysisComponents';

const FAQ = [
  {
    q: 'How does Competitor Channel Analysis work?',
    a: 'TrendlyInside compares your channel strategy against a rival creator in your niche to identify their blind spots, reveal content gaps, and build a tactical plan to win viewer market share.',
  },
  {
    q: 'What is a "Content Gap Opportunity"?',
    a: 'A content gap is a high-demand topic in your niche that your competitor either covered poorly, abandoned, or overlooked, allowing you to capture search and suggested traffic.',
  },
  {
    q: 'Can I compare two competitors against each other?',
    a: 'Yes! You can compare any two public creator channels to analyze which strategy is driving stronger algorithmic momentum.',
  },
];

export default function CompetitorAnalyzer() {
  const [channelA, setChannelA] = useState('');
  const [channelB, setChannelB] = useState('');
  const [niche, setNiche] = useState('Tech & Reviews');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CompetitorAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!channelA.trim() || !channelB.trim()) {
      setError('Please provide both Channel A and Channel B handles or URLs');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await analyzeCompetitor({ channelA, channelB, niche });
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Competitor analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#223354] to-[#1a2742] text-white pt-28 md:pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#FADADD] text-xs font-medium mb-4 border border-white/10"
          >
            <Swords className="w-3.5 h-3.5 text-[#FADADD]" />
            Phase 2 Creator Intelligence & Market Share
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
            Competitor Channel Analyzer
          </h1>
          <p className="text-[#C2D6EC] text-base md:text-lg max-w-2xl mx-auto mb-8">
            Benchmark your channel against rivals, discover high-demand content gaps, and execute an audience-stealing strategy.
          </p>

          {/* Input Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl text-left border border-white/20 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1.5">
                    Your Channel (or Channel A) *
                  </label>
                  <input
                    type="text"
                    value={channelA}
                    onChange={(e) => setChannelA(e.target.value)}
                    placeholder="@YourHandle or channel link"
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-xl text-midnight-abyss text-xs focus:outline-none focus:ring-2 focus:ring-[#4A6D99]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1.5">
                    Competitor Channel (Channel B) *
                  </label>
                  <input
                    type="text"
                    value={channelB}
                    onChange={(e) => setChannelB(e.target.value)}
                    placeholder="@Competitor or channel link"
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-gray-200 rounded-xl text-midnight-abyss text-xs focus:outline-none focus:ring-2 focus:ring-[#4A6D99]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1">
                  Niche / Market Category
                </label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. Finance, AI Tools, Gaming, Fitness, Cooking"
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-lg text-midnight-abyss text-xs focus:outline-none focus:ring-2 focus:ring-[#4A6D99]"
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-base font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Comparing Channel Strategies...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Run Competitive Audit
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {isLoading && <LoadingState title="Benchmarking Competitor Channels..." />}

        {error && !isLoading && (
          <div className="max-w-2xl mx-auto mb-8">
            <ErrorCard message={error} onRetry={handleAnalyze} />
          </div>
        )}

        {result && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Action Bar */}
            <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-frosty-slate">Competitive Matchup</span>
                <p className="text-sm font-semibold text-midnight-abyss">
                  {result.channelA} <span className="text-frosty-slate font-normal">vs</span> {result.channelB}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ShareButton
                  title="Competitor Analysis"
                  text={`Comparing ${result.channelA} vs ${result.channelB} on TrendlyInside!`}
                  url={window.location.href}
                />
                <button
                  onClick={() => setResult(null)}
                  className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  New Comparison
                </button>
              </div>
            </div>

            {/* Winner Verdict Card */}
            <div className="card p-6 md:p-8 bg-gradient-to-br from-white to-[#F0F5FA] border-2 border-[#C2D6EC]/50 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-6 h-6 text-amber-500" />
                <h2 className="font-heading font-bold text-xl text-midnight-abyss">Algorithmic Verdict</h2>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
                <p className="text-sm md:text-base font-semibold text-[#4A6D99]">
                  {result.analysis.winnerVerdict}
                </p>
              </div>

              {/* Side-by-Side Scores */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
                  <ScoreCircle score={result.analysis.channelAScore} size={140} />
                  <div>
                    <span className="text-xs uppercase font-bold text-frosty-slate">Primary Channel</span>
                    <h3 className="font-bold text-base text-midnight-abyss">{result.channelA}</h3>
                    <p className="text-xs text-gray-500 mt-1">Creator Intelligence Score</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-gray-100 flex items-center gap-4">
                  <ScoreCircle score={result.analysis.channelBScore} size={140} />
                  <div>
                    <span className="text-xs uppercase font-bold text-frosty-slate">Competitor</span>
                    <h3 className="font-bold text-base text-midnight-abyss">{result.channelB}</h3>
                    <p className="text-xs text-gray-500 mt-1">Creator Intelligence Score</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ad Banner */}
            <AdBanner className="my-4" />

            {/* Content Gap Opportunities */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-[#4A6D99]" />
                <h3 className="font-heading font-semibold text-lg text-midnight-abyss">
                  Content Gap Opportunities (Topics You Can Steal)
                </h3>
              </div>
              <p className="text-xs text-gray-600 mb-4">
                These are underserved search queries and video angles where your competitor is leaving audience demand on the table:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.analysis.contentGapOpportunities.map((gap, idx) => (
                  <div key={idx} className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {gap.angle}
                      </span>
                      <span className="text-xs text-green-700 font-medium">Demand: {gap.demand}</span>
                    </div>
                    <h4 className="font-semibold text-sm text-midnight-abyss">{gap.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{gap.whyItWins}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience Steal Strategy */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-[#4A6D99]" />
                <h3 className="font-heading font-semibold text-lg text-midnight-abyss">Audience Steal Strategy</h3>
              </div>
              <div className="space-y-2.5">
                {result.analysis.audienceStealStrategy.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-[#F0F5FA] p-3 rounded-lg text-xs text-midnight-abyss font-medium">
                    <ArrowRight className="w-4 h-4 text-[#4A6D99] shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Insight */}
            <div className="card p-6 bg-[#C2D6EC]/15 border border-[#C2D6EC]">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#4A6D99] shrink-0 mt-0.5" />
                <p className="text-sm text-midnight-abyss leading-relaxed">
                  {result.analysis.summaryInsight}
                </p>
              </div>
            </div>

            {/* Creator Toolkit */}
            <CreatorToolkit />
          </motion.div>
        )}

        {/* FAQ Section */}
        <section className="mt-16 pt-12 border-t border-gray-200 max-w-3xl mx-auto">
          <h2 className="text-2xl font-heading font-bold text-center text-midnight-abyss mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {FAQ.map((item, idx) => (
              <div key={idx} className="card p-5">
                <h3 className="font-semibold text-sm text-midnight-abyss mb-1.5">{item.q}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
