import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award, Users, RefreshCw, AlertTriangle, BarChart3
} from 'lucide-react';
import { benchmarkCreator } from '../services/api';
import type { CreatorBenchmarkResult } from '../types';
import LoadingState from '../components/LoadingState';
import { ScoreCircle } from '../components/ScoreComponents';
import {
  AdBanner,
  ErrorCard,
  ShareButton,
  CreatorToolkit,
} from '../components/AnalysisComponents';

const SAMPLE_CHANNELS = [
  { label: '5K Micro-Creator', niche: 'Tech & AI', subs: 5200, views: 2100, freq: '2x / week' },
  { label: '25K Growth Channel', niche: 'Finance & Investing', subs: 25000, views: 8900, freq: '2x / week' },
  { label: '100K Authority Tier', niche: 'Fitness & Health', subs: 105000, views: 32000, freq: '3x / week' }
];

export default function CreatorBenchmarking() {
  const [niche, setNiche] = useState('Tech & AI');
  const [subscribers, setSubscribers] = useState<number>(12500);
  const [avgViews, setAvgViews] = useState<number>(4200);
  const [uploadFrequency, setUploadFrequency] = useState('2x / week');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CreatorBenchmarkResult | null>(null);
  const [error, setError] = useState('');

  const handleBenchmark = async (sampleData?: typeof SAMPLE_CHANNELS[0]) => {
    const sNiche = sampleData?.niche || niche;
    const sSubs = sampleData?.subs || subscribers;
    const sViews = sampleData?.views || avgViews;
    const sFreq = sampleData?.freq || uploadFrequency;

    if (!sSubs || !sViews) {
      setError('Please provide valid subscriber and view count numbers.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const res = await benchmarkCreator({
        niche: sNiche,
        subscribers: sSubs,
        avgViews: sViews,
        uploadFrequency: sFreq
      });
      setResult(res);
      if (sampleData) {
        setNiche(sampleData.niche);
        setSubscribers(sampleData.subs);
        setAvgViews(sampleData.views);
        setUploadFrequency(sampleData.freq);
      }
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Failed to benchmark creator metrics.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight-surface pt-28 md:pt-32 pb-16">
      <div className="container-main max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-fjord-blue/10 border border-fjord-blue/20 text-fjord-blue text-xs font-semibold mb-3"
          >
            <Award className="w-3.5 h-3.5" />
            Phase 3 Algorithmic Benchmarking
          </motion.div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-midnight-abyss mb-3">
            Creator Peer Benchmarking
          </h1>
          <p className="text-frosty-slate text-sm md:text-base max-w-2xl mx-auto">
            Compare your channel’s performance against median and top 10% elite peers in your exact niche. Discover the precise bottlenecks holding you back from the next subscriber tier.
          </p>
        </div>

        {/* Input Form Card */}
        <div className="card p-6 md:p-8 border border-glacial-sky/30 shadow-card bg-white mb-10">
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-midnight-abyss mb-1.5">
                  Content Niche
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7FAFC] border border-glacial-sky/30 rounded-xl text-sm text-midnight-abyss focus:outline-none focus:border-fjord-blue"
                >
                  <option value="Tech & AI">Tech & AI</option>
                  <option value="Finance & Investing">Finance & Investing</option>
                  <option value="Lifestyle & Vlog">Lifestyle & Vlog</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Fitness & Health">Fitness & Health</option>
                  <option value="Education & Science">Education & Science</option>
                  <option value="Business & Startups">Business & Startups</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-midnight-abyss mb-1.5">
                  Subscribers / Followers
                </label>
                <input
                  type="number"
                  min="1"
                  value={subscribers}
                  onChange={(e) => setSubscribers(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-2.5 bg-[#F7FAFC] border border-glacial-sky/30 rounded-xl text-sm text-midnight-abyss focus:outline-none focus:border-fjord-blue"
                  placeholder="e.g. 15000"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-midnight-abyss mb-1.5">
                  Avg Views Per Upload
                </label>
                <input
                  type="number"
                  min="1"
                  value={avgViews}
                  onChange={(e) => setAvgViews(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-2.5 bg-[#F7FAFC] border border-glacial-sky/30 rounded-xl text-sm text-midnight-abyss focus:outline-none focus:border-fjord-blue"
                  placeholder="e.g. 4500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-midnight-abyss mb-1.5">
                  Upload Cadence
                </label>
                <select
                  value={uploadFrequency}
                  onChange={(e) => setUploadFrequency(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7FAFC] border border-glacial-sky/30 rounded-xl text-sm text-midnight-abyss focus:outline-none focus:border-fjord-blue"
                >
                  <option value="1x / week">1x / week</option>
                  <option value="2x / week">2x / week</option>
                  <option value="3x / week">3x / week</option>
                  <option value="Daily / High Frequency">Daily / High Frequency</option>
                  <option value="Bi-weekly / Monthly">Bi-weekly / Monthly</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-frosty-slate">
                <span>Or load benchmark scenario:</span>
                {SAMPLE_CHANNELS.map((sample) => (
                  <button
                    key={sample.label}
                    onClick={() => handleBenchmark(sample)}
                    className="px-2.5 py-1 rounded bg-glacial-sky/15 hover:bg-glacial-sky/30 text-midnight-abyss font-medium transition-colors"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleBenchmark()}
                disabled={isLoading}
                className="btn-primary py-2.5 px-6 text-sm font-semibold rounded-xl w-full sm:w-auto"
              >
                <BarChart3 className="w-4 h-4" />
                Benchmark Against Peers
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-8">
            <LoadingState title="Analyzing Peer Quartiles & Algorithmic Benchmarks..." />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="max-w-2xl mx-auto mb-8">
            <ErrorCard message={error} onRetry={() => handleBenchmark()} />
          </div>
        )}

        {/* Results */}
        {result && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Action Bar */}
            <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-4 rounded-xl shadow-sm border border-glacial-sky/20">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-frosty-slate">Benchmark Evaluation</span>
                <p className="text-sm font-semibold text-midnight-abyss">
                  {result.niche} • {result.subscribers.toLocaleString()} Subscribers • {result.avgViews.toLocaleString()} Avg Views
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ShareButton
                  title="Creator Benchmark"
                  text={`My channel ranked in the ${result.benchmark.tierRank} on TrendlyInside!`}
                  url={window.location.href}
                />
                <button
                  onClick={() => setResult(null)}
                  className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  New Benchmark
                </button>
              </div>
            </div>

            {/* Rank Banner */}
            <div className="card p-6 md:p-8 bg-gradient-to-br from-white to-[#F0F5FA] border-2 border-glacial-sky/40 shadow-card">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-frosty-slate mb-1">
                    Peer Percentile
                  </span>
                  <ScoreCircle score={result.benchmark.percentileScore} size={140} label="Percentile" />
                  <span className="mt-2 text-xs font-bold text-fjord-blue">
                    Top {100 - result.benchmark.percentileScore}% Tier
                  </span>
                </div>

                <div className="md:col-span-3 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-100 px-3 py-1 rounded-full inline-block">
                    {result.benchmark.tierRank}
                  </span>
                  <h2 className="font-heading font-bold text-2xl text-midnight-abyss">
                    Algorithmic Health Score: {result.benchmark.overallHealthScore}/100
                  </h2>
                  <p className="text-sm text-frosty-slate leading-relaxed">
                    {result.benchmark.competitiveAdvantage}
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Metric Comparison Matrix */}
            <div className="card p-6 border border-glacial-sky/30 bg-white">
              <h3 className="font-heading font-bold text-lg text-midnight-abyss mb-5 flex items-center gap-2">
                <Users className="w-5 h-5 text-fjord-blue" />
                Channel Metrics vs Peer Quartiles
              </h3>

              <div className="space-y-4">
                {/* View-to-Sub Ratio */}
                <div className="p-4 rounded-xl border border-glacial-sky/20 bg-[#F9FBFC] space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-bold text-midnight-abyss">View-to-Subscriber Ratio</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {result.benchmark.metrics.viewToSubRatio.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs pt-1 border-t border-glacial-sky/15">
                    <div>
                      <span className="text-frosty-slate block text-[11px]">Your Ratio:</span>
                      <strong className="text-midnight-abyss text-sm">{result.benchmark.metrics.viewToSubRatio.creatorValue}</strong>
                    </div>
                    <div>
                      <span className="text-frosty-slate block text-[11px]">Niche Median:</span>
                      <strong className="text-frosty-slate text-sm">{result.benchmark.metrics.viewToSubRatio.nicheMedian}</strong>
                    </div>
                    <div>
                      <span className="text-frosty-slate block text-[11px]">Top 10% Elite:</span>
                      <strong className="text-green-600 text-sm">{result.benchmark.metrics.viewToSubRatio.top10Percent}</strong>
                    </div>
                  </div>
                  <p className="text-xs text-frosty-slate mt-1">{result.benchmark.metrics.viewToSubRatio.verdict}</p>
                </div>

                {/* Engagement Rate */}
                <div className="p-4 rounded-xl border border-glacial-sky/20 bg-[#F9FBFC] space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-bold text-midnight-abyss">Audience Engagement Rate</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                      {result.benchmark.metrics.engagementRate.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs pt-1 border-t border-glacial-sky/15">
                    <div>
                      <span className="text-frosty-slate block text-[11px]">Your Rate:</span>
                      <strong className="text-midnight-abyss text-sm">{result.benchmark.metrics.engagementRate.creatorValue}</strong>
                    </div>
                    <div>
                      <span className="text-frosty-slate block text-[11px]">Niche Median:</span>
                      <strong className="text-frosty-slate text-sm">{result.benchmark.metrics.engagementRate.nicheMedian}</strong>
                    </div>
                    <div>
                      <span className="text-frosty-slate block text-[11px]">Top 10% Elite:</span>
                      <strong className="text-green-600 text-sm">{result.benchmark.metrics.engagementRate.top10Percent}</strong>
                    </div>
                  </div>
                  <p className="text-xs text-frosty-slate mt-1">{result.benchmark.metrics.engagementRate.verdict}</p>
                </div>

                {/* Consistency Score */}
                <div className="p-4 rounded-xl border border-glacial-sky/20 bg-[#F9FBFC] space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-bold text-midnight-abyss">Publishing Cadence & Consistency</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                      {result.benchmark.metrics.consistencyScore.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs pt-1 border-t border-glacial-sky/15">
                    <div>
                      <span className="text-frosty-slate block text-[11px]">Your Cadence:</span>
                      <strong className="text-midnight-abyss text-sm">{result.benchmark.metrics.consistencyScore.creatorValue}</strong>
                    </div>
                    <div>
                      <span className="text-frosty-slate block text-[11px]">Niche Median:</span>
                      <strong className="text-frosty-slate text-sm">{result.benchmark.metrics.consistencyScore.nicheMedian}</strong>
                    </div>
                    <div>
                      <span className="text-frosty-slate block text-[11px]">Top 10% Elite:</span>
                      <strong className="text-green-600 text-sm">{result.benchmark.metrics.consistencyScore.top10Percent}</strong>
                    </div>
                  </div>
                  <p className="text-xs text-frosty-slate mt-1">{result.benchmark.metrics.consistencyScore.verdict}</p>
                </div>
              </div>
            </div>

            {/* Primary Bottleneck Callout */}
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2 mb-2 text-amber-800 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Primary Growth Constraint:
              </div>
              <p className="text-xs md:text-sm text-amber-950 leading-relaxed">
                {result.benchmark.primaryBottleneck}
              </p>
            </div>

            {/* Ad Banner */}
            <AdBanner className="my-4" />

            {/* Next Tier Unlock Roadmap */}
            <div className="card p-6 border border-glacial-sky/30 bg-white">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4 pb-3 border-b border-glacial-sky/20">
                <div>
                  <span className="text-xs uppercase font-bold text-fjord-blue">Next Stage Target</span>
                  <h3 className="font-heading font-bold text-lg text-midnight-abyss">
                    {result.benchmark.targetMilestones.nextTierName}
                  </h3>
                </div>
                <div className="text-xs text-frosty-slate">
                  Target: <strong>{result.benchmark.targetMilestones.targetSubscribers}</strong> •{' '}
                  <strong>{result.benchmark.targetMilestones.targetAvgViews}</strong>
                </div>
              </div>

              <div className="space-y-3">
                {result.benchmark.unlockRoadmap.map((item) => (
                  <div key={item.step} className="p-4 rounded-xl border border-glacial-sky/20 bg-[#F9FBFC] flex items-start gap-3.5">
                    <span className="w-6 h-6 rounded-full bg-fjord-blue text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-midnight-abyss">{item.title}</h4>
                      <p className="text-xs text-frosty-slate leading-relaxed">{item.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Creator Growth Toolkit */}
            <CreatorToolkit />
          </motion.div>
        )}
      </div>
    </div>
  );
}
