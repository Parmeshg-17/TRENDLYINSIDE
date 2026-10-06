import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Compass, RefreshCw, Layers, Award } from 'lucide-react';
import { discoverTrends } from '../services/api';
import type { TrendDiscoveryResult } from '../types';
import LoadingState from '../components/LoadingState';
import {
  AdBanner,
  ErrorCard,
  ShareButton,
  CreatorToolkit,
} from '../components/AnalysisComponents';

const FAQ = [
  {
    q: 'How does the Trend Discovery Engine identify breakout topics?',
    a: 'We monitor rising search intent spikes, cross-platform audio momentum, and emerging keyword velocity across YouTube, TikTok, and Instagram to identify trends before they reach saturation.',
  },
  {
    q: 'What is "First-Mover Advantage" for creators?',
    a: 'When an algorithm detects a surge in search queries for a topic with very few high-quality videos available, early publishers receive exponential organic impressions.',
  },
  {
    q: 'How frequently are trends updated?',
    a: 'Our intelligence models synthesize real-time interest trajectories and 30-day forward growth projections on demand.',
  },
];

export default function TrendDiscovery() {
  const [niche, setNiche] = useState('AI & Tech Tools');
  const [platform, setPlatform] = useState('YouTube');
  const [timeframe, setTimeframe] = useState('Real-time');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrendDiscoveryResult | null>(null);

  const handleDiscover = async () => {
    if (!niche.trim()) {
      setError('Please provide a niche or topic category');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await discoverTrends({ niche, platform, timeframe });
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Trend discovery failed. Please try again.');
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
            <TrendingUp className="w-3.5 h-3.5 text-[#FADADD]" />
            Phase 2 Algorithmic Wave Detection
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
            AI Trend Discovery Engine
          </h1>
          <p className="text-[#C2D6EC] text-base md:text-lg max-w-2xl mx-auto mb-8">
            Identify breakout topics, surging search velocity, and unsaturated keywords before your competition finds them.
          </p>

          {/* Input Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl text-left border border-white/20 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1.5">
                  Your Niche / Industry *
                </label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. Personal Finance, Fitness, AI Coding, Cooking, Gaming"
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl text-midnight-abyss placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A6D99] focus:bg-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1">
                    Target Platform
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-lg text-midnight-abyss text-xs focus:outline-none focus:ring-2 focus:ring-[#4A6D99]"
                  >
                    <option value="YouTube">YouTube (Long-form & Shorts)</option>
                    <option value="TikTok">TikTok FYP</option>
                    <option value="Instagram">Instagram Reels</option>
                    <option value="Omni-channel">Omni-Channel (All)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1">
                    Timeframe Focus
                  </label>
                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-lg text-midnight-abyss text-xs focus:outline-none focus:ring-2 focus:ring-[#4A6D99]"
                  >
                    <option value="Real-time">Immediate (Next 7 Days)</option>
                    <option value="Next 30 Days">Medium Term (Next 30 Days)</option>
                    <option value="Quarterly">Quarterly Macro Trends</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleDiscover}
                disabled={isLoading}
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-base font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Scanning Algorithmic Waves...
                  </>
                ) : (
                  <>
                    <Compass className="w-5 h-5" />
                    Discover Breakout Trends
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {isLoading && <LoadingState title="Scanning Creator Search Velocity & Trends..." />}

        {error && !isLoading && (
          <div className="max-w-2xl mx-auto mb-8">
            <ErrorCard message={error} onRetry={handleDiscover} />
          </div>
        )}

        {result && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header Action Bar */}
            <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-frosty-slate">Market Landscape</span>
                <p className="text-sm font-semibold text-midnight-abyss">
                  {result.niche} • <span className="text-[#4A6D99]">{result.platform}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ShareButton
                  title="Trend Discovery Report"
                  text={`Discovered breakout trends in ${result.niche} on TrendlyInside!`}
                  url={window.location.href}
                />
                <button
                  onClick={() => setResult(null)}
                  className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  New Scan
                </button>
              </div>
            </div>

            {/* Market Momentum Banner */}
            <div className="card p-6 md:p-8 bg-gradient-to-br from-white to-[#F0F5FA] border-2 border-[#C2D6EC]/50 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-frosty-slate block mb-1">
                    Market Momentum
                  </span>
                  <h2 className="text-2xl font-heading font-bold text-midnight-abyss">{result.growthMomentum}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full font-semibold">
                    Saturation: {result.saturationLevel}
                  </span>
                  <span className="text-xs px-3 py-1.5 bg-green-100 text-green-800 rounded-full font-semibold">
                    Algorithm Priority: High
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed bg-[#C2D6EC]/15 p-4 rounded-xl">
                {result.summaryInsight}
              </p>
            </div>

            {/* Ad Banner */}
            <AdBanner className="my-4" />

            {/* Trending Breakout Topics */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-[#4A6D99]" />
                <h3 className="font-heading font-semibold text-lg text-midnight-abyss">
                  Surging Breakout Topics
                </h3>
              </div>
              <div className="space-y-3">
                {result.trendingTopics.map((item, idx) => (
                  <div key={idx} className="bg-[#F8FAFC] p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#4A6D99] bg-white px-2 py-0.5 rounded border border-gray-200">
                          #{idx + 1}
                        </span>
                        <h4 className="font-bold text-sm text-midnight-abyss">{item.topic}</h4>
                      </div>
                      <p className="text-xs text-gray-600">Angle: {item.contentAngle}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-semibold px-2.5 py-1 bg-green-100 text-green-800 rounded-full">
                        Velocity {item.searchVelocity}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                        Views {item.estimatedViewsPotential}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Viral Formats & Breakout Keywords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Formats */}
              <div className="card p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#4A6D99]" />
                  <h3 className="font-heading font-semibold text-lg text-midnight-abyss">Viral Video Formats</h3>
                </div>
                <div className="space-y-3">
                  {result.viralFormats.map((fmt, idx) => (
                    <div key={idx} className="bg-[#F0F5FA] p-3.5 rounded-xl border border-gray-100">
                      <h4 className="font-bold text-xs text-midnight-abyss mb-1">{fmt.formatName}</h4>
                      <p className="text-xs text-gray-600 mb-2">{fmt.whyItWorks}</p>
                      <p className="text-xs text-[#4A6D99] font-medium">💡 Tip: {fmt.executionTip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div className="card p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#4A6D99]" />
                  <h3 className="font-heading font-semibold text-lg text-midnight-abyss">Breakout Keywords</h3>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {result.breakoutKeywords.map((kw, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-[#F8FAFC] rounded-lg border border-gray-100 text-xs">
                      <span className="font-mono font-medium text-midnight-abyss">{kw.keyword}</span>
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                        {kw.trendDirection}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* First-Mover Advantage Tips */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-[#4A6D99]" />
                <h3 className="font-heading font-semibold text-lg text-midnight-abyss">First-Mover Execution Tactics</h3>
              </div>
              <div className="space-y-2.5">
                {result.firstMoverAdvantageTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-[#F0F5FA] p-3 rounded-lg text-xs text-midnight-abyss font-medium">
                    <span className="font-bold text-[#4A6D99]">✓</span>
                    <span>{tip}</span>
                  </div>
                ))}
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
