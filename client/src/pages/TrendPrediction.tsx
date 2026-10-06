import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Sparkles, AlertTriangle, DollarSign,
  RefreshCw, BarChart2, ShieldAlert
} from 'lucide-react';
import { predictTrend } from '../services/api';
import type { TrendPredictionResult } from '../types';
import LoadingState from '../components/LoadingState';
import { ScoreCircle } from '../components/ScoreComponents';
import {
  AdBanner,
  ErrorCard,
  ShareButton,
  CreatorToolkit,
} from '../components/AnalysisComponents';

const SAMPLE_TRENDS = [
  'Local AI Agents on Mac',
  'Faceless YouTube Automation in 2025',
  'Micro-SaaS Solo Founder Roadmap',
  'Dopamine Detox 30-Day Experiment',
  'High-Yield Dividend Compounding'
];

export default function TrendPrediction() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('Tech & AI');
  const [platform, setPlatform] = useState('YouTube Long-form');
  const [timeframe, setTimeframe] = useState('90-Day Outlook');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<TrendPredictionResult | null>(null);
  const [error, setError] = useState('');

  const handlePredict = async (selectedTopic?: string) => {
    const queryTopic = selectedTopic || topic;
    if (!queryTopic.trim()) {
      setError('Please enter a trend topic or keyword to predict.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const res = await predictTrend({
        topic: queryTopic.trim(),
        niche,
        platform,
        timeframe
      });
      setResult(res);
      setTopic(queryTopic);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Failed to predict trend trajectory.');
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
            <Sparkles className="w-3.5 h-3.5" />
            Phase 3 Predictive AI
          </motion.div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-midnight-abyss mb-3">
            Trend Prediction Engine
          </h1>
          <p className="text-frosty-slate text-sm md:text-base max-w-2xl mx-auto">
            Forecast algorithmic search velocity, peak saturation windows, and breakout angles before topics become overcrowded.
          </p>
        </div>

        {/* Input Form */}
        <div className="card p-6 md:p-8 border border-glacial-sky/30 shadow-card bg-white mb-10">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-midnight-abyss uppercase tracking-wider mb-2">
                Trend / Content Keyword *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePredict()}
                  placeholder="e.g. AI Coding Agents, Notion Second Brain, 10-Minute Morning Routine..."
                  className="w-full px-4 py-3 bg-[#F7FAFC] border border-glacial-sky/30 rounded-xl text-midnight-abyss placeholder-frosty-slate/60 text-sm md:text-base focus:outline-none focus:border-fjord-blue focus:bg-white transition-all"
                />
                <button
                  onClick={() => handlePredict()}
                  disabled={isLoading || !topic.trim()}
                  className="absolute right-2 top-2 btn-primary py-2 px-4 text-xs font-semibold rounded-lg disabled:opacity-40"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  Predict Trajectory
                </button>
              </div>
            </div>

            {/* Config Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-frosty-slate mb-1.5">
                  Target Niche
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7FAFC] border border-glacial-sky/30 rounded-lg text-xs text-midnight-abyss focus:outline-none focus:border-fjord-blue"
                >
                  <option value="Tech & AI">Tech & AI</option>
                  <option value="Finance & Wealth">Finance & Wealth</option>
                  <option value="Productivity & Habits">Productivity & Habits</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Fitness & Health">Fitness & Health</option>
                  <option value="Creator Economy">Creator Economy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-frosty-slate mb-1.5">
                  Primary Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7FAFC] border border-glacial-sky/30 rounded-lg text-xs text-midnight-abyss focus:outline-none focus:border-fjord-blue"
                >
                  <option value="YouTube Long-form">YouTube Long-form</option>
                  <option value="YouTube Shorts">YouTube Shorts</option>
                  <option value="Instagram Reels">Instagram Reels</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Cross-Platform Omnichannel">Cross-Platform Omnichannel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-frosty-slate mb-1.5">
                  Forecast Window
                </label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7FAFC] border border-glacial-sky/30 rounded-lg text-xs text-midnight-abyss focus:outline-none focus:border-fjord-blue"
                >
                  <option value="30-Day Outlook">30-Day Outlook</option>
                  <option value="60-Day Outlook">60-Day Outlook</option>
                  <option value="90-Day Outlook">90-Day Outlook</option>
                </select>
              </div>
            </div>

            {/* Quick Sample Chips */}
            <div className="pt-2">
              <span className="text-xs text-frosty-slate mr-2 font-medium">Try predicting:</span>
              <div className="inline-flex flex-wrap gap-2 mt-1">
                {SAMPLE_TRENDS.map((sample) => (
                  <button
                    key={sample}
                    onClick={() => handlePredict(sample)}
                    className="text-xs px-2.5 py-1 rounded-md bg-glacial-sky/10 hover:bg-glacial-sky/25 text-midnight-abyss border border-glacial-sky/20 transition-colors"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-8">
            <LoadingState title="Synthesizing Algorithmic Trend Trajectory..." />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="max-w-2xl mx-auto mb-8">
            <ErrorCard message={error} onRetry={() => handlePredict()} />
          </div>
        )}

        {/* Prediction Results */}
        {result && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header Action Bar */}
            <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-4 rounded-xl shadow-sm border border-glacial-sky/20">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-frosty-slate">Forecast Model</span>
                <p className="text-sm font-semibold text-midnight-abyss">
                  {result.topic} • <span className="text-fjord-blue">{result.niche}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ShareButton
                  title="Trend Prediction"
                  text={`TrendlyInside forecasts ${result.prediction.breakoutProbability}% breakout probability for "${result.topic}"!`}
                  url={window.location.href}
                />
                <button
                  onClick={() => setResult(null)}
                  className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  New Prediction
                </button>
              </div>
            </div>

            {/* Overview Key Metrics Grid */}
            <div className="card p-6 md:p-8 bg-gradient-to-br from-white to-[#F0F5FA] border-2 border-glacial-sky/40 shadow-card">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                {/* Breakout Probability Gauge */}
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-frosty-slate mb-1">
                    Breakout Probability
                  </span>
                  <ScoreCircle score={result.prediction.breakoutProbability} size={140} label="Breakout Chance" />
                  <span className="mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                    {result.prediction.lifecycleStage}
                  </span>
                </div>

                {/* Key Timings */}
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-glacial-sky/20 shadow-2xs">
                    <span className="text-xs text-frosty-slate uppercase font-semibold block mb-1">
                      Optimal Publishing Window
                    </span>
                    <p className="text-sm font-bold text-fjord-blue">
                      {result.prediction.optimalPublishWindow}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-glacial-sky/20 shadow-2xs">
                    <span className="text-xs text-frosty-slate uppercase font-semibold block mb-1">
                      Projected Peak
                    </span>
                    <p className="text-sm font-bold text-midnight-abyss">
                      {result.prediction.predictedPeakDate}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-glacial-sky/20 shadow-2xs">
                    <span className="text-xs text-frosty-slate uppercase font-semibold block mb-1">
                      Market Saturation Hazard
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-amber-600">
                        {result.prediction.saturationIndex}/100
                      </span>
                      <span className="text-[11px] text-frosty-slate">
                        {result.prediction.saturationIndex < 50 ? '(Low Saturation)' : '(High Competition)'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Synthesis */}
              <div className="mt-6 pt-6 border-t border-glacial-sky/20 flex items-start gap-3 bg-glacial-sky/10 p-4 rounded-xl">
                <Sparkles className="w-5 h-5 text-fjord-blue shrink-0 mt-0.5" />
                <p className="text-sm text-midnight-abyss leading-relaxed">
                  {result.prediction.summaryVerdict}
                </p>
              </div>
            </div>

            {/* Velocity Forecast Chart */}
            <div className="card p-6 border border-glacial-sky/30">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-fjord-blue" />
                  <h3 className="font-heading font-bold text-lg text-midnight-abyss">
                    Algorithmic Search Velocity Projection
                  </h3>
                </div>
                <span className="text-xs text-frosty-slate">Estimated Discovery Momentum</span>
              </div>

              <div className="grid grid-cols-6 gap-2 md:gap-4 items-end h-48 pt-6 border-b border-glacial-sky/20 pb-2">
                {result.prediction.velocityForecast.map((point) => (
                  <div key={point.day} className="flex flex-col items-center h-full justify-end group">
                    <span className="text-xs font-bold text-fjord-blue mb-1 opacity-80 group-hover:opacity-100">
                      {point.velocity}%
                    </span>
                    <div
                      className="w-full max-w-[48px] bg-gradient-to-t from-fjord-blue to-glacial-sky rounded-t-lg transition-all group-hover:brightness-110"
                      style={{ height: `${point.velocity}%` }}
                    />
                    <span className="text-[11px] font-medium text-frosty-slate mt-2">
                      {point.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Banner */}
            <AdBanner className="my-4" />

            {/* High CTR Breakout Angles */}
            <div className="card p-6 border border-glacial-sky/30">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-fjord-blue" />
                <h3 className="font-heading font-bold text-lg text-midnight-abyss">
                  High-Converting Breakout Angles to Publish
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.prediction.breakoutAngles.map((angle, i) => (
                  <div key={i} className="p-4 rounded-xl border border-glacial-sky/20 bg-[#F9FBFC] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-fjord-blue">{angle.angle}</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                        CTR: {angle.expectedCTR}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-midnight-abyss leading-snug">
                      "{angle.suggestedTitle}"
                    </p>
                    <span className="text-xs text-frosty-slate block">
                      Recommended Format: <strong>{angle.format}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pitfalls & Monetization Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Saturation Hazards */}
              <div className="card p-6 border border-amber-200 bg-amber-50/30">
                <div className="flex items-center gap-2 mb-3 text-amber-700">
                  <ShieldAlert className="w-5 h-5" />
                  <h4 className="font-heading font-bold text-base">Saturation Hazards to Avoid</h4>
                </div>
                <ul className="space-y-2">
                  {result.prediction.saturationHazards.map((hazard, i) => (
                    <li key={i} className="text-xs md:text-sm text-amber-900 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{hazard}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Monetization Potential */}
              <div className="card p-6 border border-glacial-sky/30 bg-white">
                <div className="flex items-center gap-2 mb-3 text-fjord-blue">
                  <DollarSign className="w-5 h-5" />
                  <h4 className="font-heading font-bold text-base text-midnight-abyss">Monetization Economics</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center pb-2 border-b border-glacial-sky/20">
                    <span className="text-frosty-slate text-xs">Estimated RPM Range</span>
                    <span className="font-bold text-midnight-abyss">{result.prediction.monetizationPotential.estimatedRPM}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-glacial-sky/20">
                    <span className="text-frosty-slate text-xs">Monetization Velocity</span>
                    <span className="font-bold text-green-600">{result.prediction.monetizationPotential.rating}</span>
                  </div>
                  <div>
                    <span className="text-frosty-slate text-xs block mb-1">Primary Revenue Channels:</span>
                    <p className="text-xs text-midnight-abyss leading-relaxed">
                      {result.prediction.monetizationPotential.bestMonetizationRoute}
                    </p>
                  </div>
                </div>
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
