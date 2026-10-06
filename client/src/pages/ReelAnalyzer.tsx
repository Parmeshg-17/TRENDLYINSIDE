import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Bookmark, Share2, Sparkles, AlertCircle, RefreshCw, Hash } from 'lucide-react';
import { analyzeReel } from '../services/api';
import type { ReelAnalysisResult } from '../types';
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

function InstagramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const FAQ = [
  {
    q: 'How does the Instagram Reel Analyzer work?',
    a: 'TrendlyInside evaluates your Reel against the latest Instagram ranking signals: Save rates, DM shares, audio virality, caption hooks, and 9:16 safe-zone framing.',
  },
  {
    q: 'Why are Saves and Shares so important on Instagram Reels?',
    a: 'Instagram ranking engineers have confirmed that Saves and DM Shares carry higher algorithmic weight than simple double-tap likes because they represent high-intent viewer satisfaction.',
  },
  {
    q: 'Is this tool completely free?',
    a: 'Yes! All TrendlyInside tools are 100% free with zero registration, zero accounts, and zero subscription fees.',
  },
];

export default function ReelAnalyzer() {
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [audio, setAudio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReelAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError('Please provide an Instagram Reel URL');
      return;
    }
    if (!url.includes('instagram.com') && !url.includes('instagr.am')) {
      setError('Please provide a valid Instagram URL (e.g., instagram.com/reel/...)');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await analyzeReel({ url, caption, audio });
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Reel analysis failed. Please try again.');
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
            <InstagramIcon className="w-3.5 h-3.5 text-[#FADADD]" />
            Phase 2 AI Creator Intelligence
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
            Instagram Reel Analyzer
          </h1>
          <p className="text-[#C2D6EC] text-base md:text-lg max-w-2xl mx-auto mb-8">
            Decode your Reel's saveability, sound virality, and Explore page distribution with instant AI diagnostics.
          </p>

          {/* Input Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl text-left border border-white/20 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1.5">
                  Instagram Reel URL *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.instagram.com/reel/C3abc123/..."
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl text-midnight-abyss placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A6D99] focus:bg-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1">
                    Caption / Topic (Optional)
                  </label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="e.g. 3 AI tools for productivity"
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-lg text-midnight-abyss text-xs focus:outline-none focus:ring-2 focus:ring-[#4A6D99]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1">
                    Audio / Song (Optional)
                  </label>
                  <input
                    type="text"
                    value={audio}
                    onChange={(e) => setAudio(e.target.value)}
                    placeholder="e.g. Trending Lo-Fi Beats"
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
                    Analyzing Reel Algorithm...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze Instagram Reel
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {isLoading && <LoadingState title="Analyzing Instagram Reel..." />}

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
                <span className="text-xs uppercase font-bold tracking-wider text-frosty-slate">Analyzed Reel</span>
                <p className="text-xs text-midnight-abyss font-mono truncate max-w-md">{result.url}</p>
              </div>
              <div className="flex items-center gap-2">
                <ShareButton
                  title="Instagram Reel Analysis"
                  text={`My Reel scored ${result.analysis.overallScore}/100 on TrendlyInside!`}
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
                    Overall Reel Score
                  </span>
                  <ScoreCircle score={result.analysis.overallScore} size={150} />
                  <p className="text-xs text-gray-500 mt-2">
                    Viral Potential: <strong className="text-midnight-abyss">{result.analysis.viralPotential}</strong>
                  </p>
                </div>

                <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <ScoreCard
                    label="Audio Virality"
                    score={result.analysis.audioScore}
                    icon={<Music className="w-4 h-4 text-[#4A6D99]" />}
                  />
                  <ScoreCard
                    label="Saveability"
                    score={result.analysis.saveabilityScore}
                    icon={<Bookmark className="w-4 h-4 text-[#4A6D99]" />}
                  />
                  <ScoreCard
                    label="Shareability"
                    score={result.analysis.shareabilityScore}
                    icon={<Share2 className="w-4 h-4 text-[#4A6D99]" />}
                  />
                  <ScoreCard
                    label="Caption Hook"
                    score={result.analysis.captionScore}
                    icon={<Sparkles className="w-4 h-4 text-[#4A6D99]" />}
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
              {/* Audio Analysis */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Music className="w-5 h-5 text-[#4A6D99]" />
                  <h3 className="font-heading font-semibold text-lg text-midnight-abyss">Audio Virality</h3>
                  <span className="ml-auto badge badge-primary">{result.analysis.audioAnalysis.verdict}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {result.analysis.audioAnalysis.advice}
                </p>
                <div className="bg-gray-50 rounded-lg p-3 text-xs text-frosty-slate flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#4A6D99]" />
                  Audio Trend Level: <strong className="text-midnight-abyss">{result.analysis.audioAnalysis.trendLevel}</strong>
                </div>
              </div>

              {/* Saveability Tactics */}
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Bookmark className="w-5 h-5 text-[#4A6D99]" />
                  <h3 className="font-heading font-semibold text-lg text-midnight-abyss">Save Rate Optimization</h3>
                  <span className="ml-auto badge badge-alpenglow">{result.analysis.saveabilityAnalysis.verdict} Saves</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{result.analysis.saveabilityAnalysis.reasonsToSave}</p>
                <ul className="space-y-2">
                  {result.analysis.saveabilityAnalysis.tactics.map((tactic, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-700 bg-[#F0F5FA] p-2.5 rounded-lg">
                      <span className="font-bold text-[#4A6D99]">•</span>
                      <span>{tactic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Hashtag Suggestions */}
            {result.analysis.hashtagSuggestions?.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Hash className="w-5 h-5 text-[#4A6D99]" />
                  <h3 className="font-heading font-semibold text-base text-midnight-abyss">Recommended Hashtag Footprint</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.analysis.hashtagSuggestions.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-white border border-[#C2D6EC] text-midnight-abyss rounded-full text-xs font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

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
