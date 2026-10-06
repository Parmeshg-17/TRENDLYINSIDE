import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, DollarSign, RefreshCw,
  TrendingDown, CheckCircle2, Shield, Sparkles, Sliders
} from 'lucide-react';
import { auditChannel } from '../services/api';
import type { AdvancedAnalyticsResult } from '../types';
import LoadingState from '../components/LoadingState';
import { ScoreCircle } from '../components/ScoreComponents';
import {
  AdBanner,
  ErrorCard,
  ShareButton,
  CreatorToolkit,
} from '../components/AnalysisComponents';

export default function AdvancedAnalytics() {
  const [channelUrl, setChannelUrl] = useState('');
  const [niche, setNiche] = useState('Tech & Reviews');
  const [subscribers, setSubscribers] = useState<number>(28000);
  const [avgWatchTime, setAvgWatchTime] = useState<number>(48);
  const [ctrAverage, setCtrAverage] = useState<number>(6.5);
  const [primaryFormat, setPrimaryFormat] = useState('Hybrid Long-form & Shorts');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AdvancedAnalyticsResult | null>(null);
  const [error, setError] = useState('');

  const handleAudit = async () => {
    setError('');
    setIsLoading(true);

    try {
      const res = await auditChannel({
        channelUrl: channelUrl.trim() || undefined,
        niche,
        subscribers,
        avgWatchTimePercent: avgWatchTime,
        ctrAverage,
        primaryFormat
      });
      setResult(res);
    } catch (err: unknown) {
      const e = err as Error;
      setError(e.message || 'Failed to complete channel audit.');
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
            <Activity className="w-3.5 h-3.5" />
            Phase 3 Deep Channel Audit
          </motion.div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-midnight-abyss mb-3">
            Advanced Analytics & Algorithmic Audit
          </h1>
          <p className="text-frosty-slate text-sm md:text-base max-w-2xl mx-auto">
            Deep-dive into audience retention curves, thumbnail fatigue indices, monetization valuations, and algorithmic remediation plans.
          </p>
        </div>

        {/* Audit Configuration Input Card */}
        <div className="card p-6 md:p-8 border border-glacial-sky/30 shadow-card bg-white mb-10">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-midnight-abyss mb-1.5">
                  Channel URL or Handle (Optional)
                </label>
                <input
                  type="text"
                  placeholder="youtube.com/@yourchannel"
                  value={channelUrl}
                  onChange={(e) => setChannelUrl(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7FAFC] border border-glacial-sky/30 rounded-xl text-sm text-midnight-abyss focus:outline-none focus:border-fjord-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-midnight-abyss mb-1.5">
                  Content Niche
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7FAFC] border border-glacial-sky/30 rounded-xl text-sm text-midnight-abyss focus:outline-none focus:border-fjord-blue"
                >
                  <option value="Tech & Reviews">Tech & Reviews</option>
                  <option value="Finance & Investing">Finance & Investing</option>
                  <option value="Education & How-To">Education & How-To</option>
                  <option value="Gaming & Esports">Gaming & Esports</option>
                  <option value="Fitness & Health">Fitness & Health</option>
                  <option value="Lifestyle & Vlog">Lifestyle & Vlog</option>
                  <option value="Business & SaaS">Business & SaaS</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-midnight-abyss mb-1.5">
                  Subscriber Count
                </label>
                <input
                  type="number"
                  value={subscribers}
                  onChange={(e) => setSubscribers(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3 py-2.5 bg-[#F7FAFC] border border-glacial-sky/30 rounded-xl text-sm text-midnight-abyss focus:outline-none focus:border-fjord-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-midnight-abyss mb-1.5">
                  Primary Video Format
                </label>
                <select
                  value={primaryFormat}
                  onChange={(e) => setPrimaryFormat(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7FAFC] border border-glacial-sky/30 rounded-xl text-sm text-midnight-abyss focus:outline-none focus:border-fjord-blue"
                >
                  <option value="Hybrid Long-form & Shorts">Hybrid (Long & Shorts)</option>
                  <option value="Dedicated Long-Form">Dedicated Long-Form</option>
                  <option value="Short-Form Dominant">Short-Form Dominant</option>
                </select>
              </div>
            </div>

            {/* Sliders for Retention & CTR */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-4 rounded-xl bg-[#F9FBFC] border border-glacial-sky/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-midnight-abyss flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-fjord-blue" />
                    Average Watch Time Percentage
                  </span>
                  <span className="text-xs font-bold text-fjord-blue">{avgWatchTime}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="85"
                  value={avgWatchTime}
                  onChange={(e) => setAvgWatchTime(parseInt(e.target.value, 10))}
                  className="w-full accent-[#4A6D99]"
                />
                <span className="text-[11px] text-frosty-slate mt-1 block">
                  Industry benchmark: 45%+ for algorithmic Browse feature push
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#F9FBFC] border border-glacial-sky/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-midnight-abyss flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-fjord-blue" />
                    Estimated Click-Through Rate (CTR)
                  </span>
                  <span className="text-xs font-bold text-fjord-blue">{ctrAverage}%</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="18"
                  step="0.1"
                  value={ctrAverage}
                  onChange={(e) => setCtrAverage(parseFloat(e.target.value))}
                  className="w-full accent-[#4A6D99]"
                />
                <span className="text-[11px] text-frosty-slate mt-1 block">
                  Industry benchmark: 6.0%–10.0% for high click velocity
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleAudit}
                disabled={isLoading}
                className="btn-primary py-2.5 px-6 text-sm font-semibold rounded-xl"
              >
                <Activity className="w-4 h-4" />
                Run Algorithmic Audit
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-8">
            <LoadingState title="Running Deep Channel Audit & Monetization Valuation..." />
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="max-w-2xl mx-auto mb-8">
            <ErrorCard message={error} onRetry={handleAudit} />
          </div>
        )}

        {/* Audit Results */}
        {result && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Action Bar */}
            <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-4 rounded-xl shadow-sm border border-glacial-sky/20">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-frosty-slate">Executive Audit Report</span>
                <p className="text-sm font-semibold text-midnight-abyss">
                  {result.niche} • {result.subscribers.toLocaleString()} Subscribers
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ShareButton
                  title="Advanced Channel Audit"
                  text={`My channel scored ${result.audit.algorithmicHealthScore}/100 on TrendlyInside!`}
                  url={window.location.href}
                />
                <button
                  onClick={() => setResult(null)}
                  className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  New Audit
                </button>
              </div>
            </div>

            {/* Health Score Overview */}
            <div className="card p-6 md:p-8 bg-gradient-to-br from-white to-[#F0F5FA] border-2 border-glacial-sky/40 shadow-card">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-frosty-slate mb-1">
                    Algorithmic Health
                  </span>
                  <ScoreCircle score={result.audit.algorithmicHealthScore} size={140} label="Health Score" />
                  <span className="mt-2 text-xs font-bold text-green-700 bg-green-100 px-3 py-0.5 rounded-full">
                    {result.audit.healthStatus}
                  </span>
                </div>

                <div className="md:col-span-3 space-y-3">
                  <h2 className="font-heading font-bold text-xl text-midnight-abyss">
                    Executive Algorithm Diagnosis
                  </h2>
                  <p className="text-sm text-midnight-abyss leading-relaxed bg-white/80 p-4 rounded-xl border border-glacial-sky/20">
                    {result.audit.executiveSummary}
                  </p>
                </div>
              </div>
            </div>

            {/* Retention & Fatigue Diagnostics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Retention Diagnostics */}
              <div className="card p-6 border border-glacial-sky/30 bg-white space-y-4">
                <div className="flex items-center gap-2 text-fjord-blue font-bold">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                  <h3 className="font-heading text-midnight-abyss text-base">Audience Retention Curve</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-red-50/50 border border-red-200">
                    <span className="font-bold text-red-700 block">First 30 Seconds Dropoff:</span>
                    <p className="text-midnight-abyss mt-0.5">{result.audit.retentionDiagnostics.first30SecDropoff}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-200">
                    <span className="font-bold text-amber-700 block">Mid-Video Drag Point:</span>
                    <p className="text-midnight-abyss mt-0.5">{result.audit.retentionDiagnostics.midVideoDipTimestamp}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-50/50 border border-blue-200">
                    <span className="font-bold text-fjord-blue block">End Screen Conversion:</span>
                    <p className="text-midnight-abyss mt-0.5">{result.audit.retentionDiagnostics.endScreenConversion}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-900">
                    <span className="font-bold block">Key Recommendation:</span>
                    <p className="mt-0.5">{result.audit.retentionDiagnostics.keyFix}</p>
                  </div>
                </div>
              </div>

              {/* Audience Fatigue & Churn Risk */}
              <div className="card p-6 border border-glacial-sky/30 bg-white space-y-4">
                <div className="flex items-center gap-2 text-fjord-blue font-bold">
                  <Shield className="w-5 h-5 text-fjord-blue" />
                  <h3 className="font-heading text-midnight-abyss text-base">Audience Fatigue Index</h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-[#F9FBFC] border border-glacial-sky/20">
                    <span className="font-semibold text-frosty-slate">Thumbnail Fatigue Score</span>
                    <span className="font-bold text-midnight-abyss">{result.audit.audienceFatigueIndex.thumbnailFatigueScore}/100</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-[#F9FBFC] border border-glacial-sky/20">
                    <span className="font-semibold text-frosty-slate">Title Pattern Diversity</span>
                    <span className="font-bold text-green-600">{result.audit.audienceFatigueIndex.titleFormulaStatus}</span>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg bg-[#F9FBFC] border border-glacial-sky/20">
                    <span className="font-semibold text-frosty-slate">Viewer Churn Risk</span>
                    <span className="font-bold text-blue-600">{result.audit.audienceFatigueIndex.churnRiskLevel}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F9FBFC] border border-glacial-sky/20">
                    <span className="font-semibold text-frosty-slate block mb-1">Traffic Distribution:</span>
                    <span className="text-midnight-abyss font-medium">{result.audit.audienceFatigueIndex.browseVsSearchRatio}</span>
                  </div>

                  <p className="text-frosty-slate leading-relaxed pt-1">
                    {result.audit.audienceFatigueIndex.fatigueDiagnosis}
                  </p>
                </div>
              </div>
            </div>

            {/* Monetization Potential Card */}
            <div className="card p-6 md:p-8 border border-green-200 bg-gradient-to-br from-white to-green-50/20 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-green-700 font-bold">
                <DollarSign className="w-5 h-5" />
                <h3 className="font-heading text-midnight-abyss text-lg">Revenue & Valuation Economics</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-green-200 shadow-2xs">
                  <span className="text-xs text-frosty-slate uppercase block mb-1">Estimated RPM</span>
                  <span className="text-lg font-bold text-midnight-abyss">{result.audit.monetizationValuation.estimatedRPM}</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-green-200 shadow-2xs">
                  <span className="text-xs text-frosty-slate uppercase block mb-1">Projected Monthly Revenue</span>
                  <span className="text-lg font-bold text-green-700">{result.audit.monetizationValuation.monthlyEstimatedRevenue}</span>
                </div>

                <div className="bg-white p-4 rounded-xl border border-green-200 shadow-2xs">
                  <span className="text-xs text-frosty-slate uppercase block mb-1">Annual Potential</span>
                  <span className="text-lg font-bold text-midnight-abyss">{result.audit.monetizationValuation.annualEarningPotential}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-midnight-abyss uppercase block mb-2">
                  Untapped Monetization Channels:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {result.audit.monetizationValuation.missingRevenueStreams.map((stream, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-lg bg-white border border-green-200/80 text-xs text-midnight-abyss flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>{stream}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ad Banner */}
            <AdBanner className="my-4" />

            {/* Prioritized Algorithmic Remediation Plan */}
            <div className="card p-6 border border-glacial-sky/30 bg-white">
              <h3 className="font-heading font-bold text-lg text-midnight-abyss mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-fjord-blue" />
                Algorithmic Remediation Action Plan
              </h3>

              <div className="space-y-3">
                {result.audit.algorithmicRemediationPlan.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-glacial-sky/20 bg-[#F9FBFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-fjord-blue/15 text-fjord-blue">
                          {step.priority}
                        </span>
                        <h4 className="text-sm font-bold text-midnight-abyss">{step.area}</h4>
                      </div>
                      <p className="text-xs text-frosty-slate pl-0.5">{step.action}</p>
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
