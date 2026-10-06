import { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Repeat, Music, MessageCircle, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { analyzeTikTok } from '../services/api';
import type { TikTokAnalysisResult } from '../types';
import LoadingState from '../components/LoadingState';
import { ScoreCircle, ScoreCard } from '../components/ScoreComponents';
import {
  StrengthWeaknessCard,
  RecommendationCards,
  AdBanner,
  ErrorCard,
  ShareButton,
  CreatorToolkit,
} from '../components/AnalysisComponents';

const FAQ = [
  {
    q: 'How does the TikTok Analyzer evaluate video virality?',
    a: 'Our AI checks completion rate mechanics (loop design), audio boost potential, opening 2-second dropoff risk, and intentional comment bait cues that trigger algorithm distribution.',
  },
  {
    q: 'Why is loop design so important on TikTok?',
    a: 'Completion rate is the #1 metric on the TikTok FYP. If users watch your video 1.2x because the ending connects to the beginning, TikTok multiplies your reach to broader audience test groups.',
  },
  {
    q: 'Can I analyze my draft ideas before posting?',
    a: 'Yes! Simply paste a draft video URL or write out your planned sound and opening hook to get predictive scores.',
  },
];

export default function TikTokAnalyzer() {
  const [url, setUrl] = useState('');
  const [sound, setSound] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TikTokAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Please provide a TikTok video URL');
      return;
    }
    if (!url.includes('tiktok.com')) {
      setError('Please provide a valid TikTok URL (e.g., tiktok.com/@creator/video/...)');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await analyzeTikTok({ url, sound, description });
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'TikTok analysis failed. Please try again.');
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
            <Video className="w-3.5 h-3.5 text-[#FADADD]" />
            Phase 2 FYP Algorithm Intelligence
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
            TikTok Video Analyzer
          </h1>
          <p className="text-[#C2D6EC] text-base md:text-lg max-w-2xl mx-auto mb-8">
            Analyze loop completion, viral audio ranking, and 2-second hook retention to maximize your FYP distribution.
          </p>

          {/* Input Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl text-left border border-white/20 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1.5">
                  TikTok Video URL *
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.tiktok.com/@creator/video/..."
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl text-midnight-abyss placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A6D99] focus:bg-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1">
                    Sound / Song (Optional)
                  </label>
                  <input
                    type="text"
                    value={sound}
                    onChange={(e) => setSound(e.target.value)}
                    placeholder="e.g. Trending Sped-Up Audio"
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-lg text-midnight-abyss text-xs focus:outline-none focus:ring-2 focus:ring-[#4A6D99]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1">
                    Hashtags / Topic (Optional)
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. #productivity #growth"
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-lg text-midnight-abyss text-xs focus:outline-none focus:ring-2 focus:ring-[#4A6D99]"
                  />
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-base font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Auditing TikTok FYP Metrics...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze TikTok Video
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {isLoading && <LoadingState title="Analyzing TikTok Video..." />}

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
                <span className="text-xs uppercase font-bold tracking-wider text-frosty-slate">Analyzed TikTok</span>
                <p className="text-xs text-midnight-abyss font-mono truncate max-w-md">{result.url}</p>
              </div>
              <div className="flex items-center gap-2">
                <ShareButton
                  title="TikTok Analysis"
                  text={`My TikTok scored ${result.analysis.overallScore}/100 on TrendlyInside!`}
                  url={window.location.href}
                />
                <button
                  onClick={() => {
                    setResult(null);
                    setUrl('');
                  }}
                  className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Analyze Another
                </button>
              </div>
            </div>

            {/* Score Overview Banner */}
            <div className="card p-6 md:p-8 bg-gradient-to-br from-white to-[#F0F5FA] border-2 border-[#C2D6EC]/50 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <span className="text-xs font-semibold uppercase tracking-wider text-frosty-slate mb-1">
                    Overall TikTok Score
                  </span>
                  <ScoreCircle score={result.analysis.overallScore} size={150} />
                  <p className="text-xs text-gray-500 mt-2">
                    FYP Potential: <strong className="text-midnight-abyss">{result.analysis.foryouPagePotential}/100</strong>
                  </p>
                </div>

                <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <ScoreCard
                    label="Loop Precision"
                    score={result.analysis.loopScore}
                    icon={<Repeat className="w-4 h-4 text-[#4A6D99]" />}
                  />
                  <ScoreCard
                    label="Sound Virality"
                    score={result.analysis.soundScore}
                    icon={<Music className="w-4 h-4 text-[#4A6D99]" />}
                  />
                  <ScoreCard
                    label="Opening 2 Sec"
                    score={result.analysis.hookScore}
                    icon={<Zap className="w-4 h-4 text-[#4A6D99]" />}
                  />
                  <ScoreCard
                    label="Engagement Pace"
                    score={result.analysis.engagementScore}
                    icon={<MessageCircle className="w-4 h-4 text-[#4A6D99]" />}
                  />
                </div>
              </div>

              {/* Summary Insight */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex items-start gap-3 bg-[#C2D6EC]/15 p-4 rounded-xl">
                <Sparkles className="w-5 h-5 text-[#4A6D99] shrink-0 mt-0.5" />
                <p className="text-sm text-midnight-abyss leading-relaxed">
                  {result.analysis.summaryInsight}
                </p>
              </div>
            </div>

            {/* Ad Banner */}
            <AdBanner className="my-4" />

            {/* Detailed Diagnostics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Loop Technique */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Repeat className="w-5 h-5 text-[#4A6D99]" />
                  <h3 className="font-heading font-semibold text-lg text-midnight-abyss">Seamless Loop Analysis</h3>
                  <span className="ml-auto badge badge-primary">{result.analysis.loopAnalysis.verdict}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {result.analysis.loopAnalysis.loopTechnique}
                </p>
              </div>

              {/* Comment Bait Tactics */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="w-5 h-5 text-[#4A6D99]" />
                  <h3 className="font-heading font-semibold text-lg text-midnight-abyss">Comment Velocity Triggers</h3>
                </div>
                <p className="text-xs text-gray-500 mb-3">Comments signal deep audience interest to the FYP recommendation algorithm:</p>
                <ul className="space-y-2">
                  {result.analysis.commentBaitTactics.map((tactic, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-700 bg-[#F0F5FA] p-2.5 rounded-lg">
                      <span className="font-bold text-[#4A6D99]">💬</span>
                      <span>{tactic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <StrengthWeaknessCard
              strengths={result.analysis.strengths}
              weaknesses={result.analysis.weaknesses}
            />

            {/* Recommendations */}
            <RecommendationCards recommendations={result.analysis.recommendations} />

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
