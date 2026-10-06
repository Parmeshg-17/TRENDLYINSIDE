import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Zap, Anchor, BookOpen, Heart, MousePointer,
  RefreshCw, CheckCircle, AlertTriangle, ArrowRight,
  TrendingUp, Sparkles, HelpCircle, BarChart2
} from 'lucide-react';
import { analyzeVideo } from '../services/api';
import type { VideoAnalysisResult } from '../types';
import LoadingState from '../components/LoadingState';
import { ScoreCircle, getScoreTier } from '../components/ScoreComponents';
import {
  StrengthWeaknessCard,
  NextStepsCard,
  AdBanner,
  ErrorCard,
  CopyButton,
  YoutubeIcon,
  ShareButton,
  CreatorToolkit,
} from '../components/AnalysisComponents';
import { useSEO, buildFaqSchema } from '../lib/seo';

const FAQ = [
  {
    q: 'How does the YouTube Video Analyzer evaluate content?',
    a: 'TrendlyInside extracts video metadata, title phrasing, descriptions, and duration signals, passing them through our creator intelligence engine. The AI evaluates psychological hook strength, storytelling tension, retention curve friction, engagement prompts, and packaging.',
  },
  {
    q: 'What does the Hook Score mean?',
    a: 'The Hook Score measures how effectively the first 5 to 15 seconds capture viewer attention and establish the promised payoff. Scores above 75 indicate strong curiosity or tension, while scores below 60 signal unnecessary preamble or delayed payoff.',
  },
  {
    q: 'Is this video analyzer completely free?',
    a: 'Yes. TrendlyInside is 100% free with no account creation, no subscriptions, and no credit cards required. You can analyze public YouTube videos anytime.',
  },
  {
    q: 'Can I analyze private or unlisted YouTube videos?',
    a: 'Currently, TrendlyInside only analyzes publicly accessible YouTube videos. Unlisted and private videos cannot be accessed by public metadata services.',
  },
  {
    q: 'How can I improve my retention score?',
    a: 'Cut throat-clearing intros, deliver on your title promise in the first 10 seconds, introduce visual pattern interrupts every 20–30 seconds, and avoid placing multiple competing calls to action at the end.',
  },
];

function CategoryScoreCard({
  label,
  score,
  icon,
  explanation,
  issue,
  recommendedChange,
}: {
  label: string;
  score: number;
  icon: React.ReactNode;
  explanation?: string;
  issue?: string;
  recommendedChange?: string;
}) {
  const tier = getScoreTier(score);

  return (
    <div className="card p-5 flex flex-col justify-between border-glacial-sky/30">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-glacial-sky/20 flex items-center justify-center text-fjord-blue">
              {icon}
            </div>
            <h4 className="font-semibold text-sm text-midnight-abyss">{label}</h4>
          </div>
          <span className={`badge text-xs ${tier.badgeBg} ${tier.badgeText} border ${tier.borderColor}`}>
            {tier.label}
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-heading font-bold text-2xl text-midnight-abyss">{score}</span>
          <span className="text-xs text-frosty-slate">/ 100</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full bg-glacial-sky/25 overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${score}%`, backgroundColor: tier.color }}
          />
        </div>

        {explanation && (
          <p className="text-xs text-midnight-abyss/90 leading-relaxed mb-2">
            {explanation}
          </p>
        )}

        {issue && (
          <div className="text-2xs text-amber-800 bg-amber-50/70 p-2 rounded-lg border border-amber-200/60 mb-2">
            <strong>Issue:</strong> {issue}
          </div>
        )}
      </div>

      {recommendedChange && (
        <div className="text-2xs text-fjord-blue bg-glacial-sky/15 p-2 rounded-lg border border-glacial-sky/30 mt-2">
          <strong>Recommended Change:</strong> {recommendedChange}
        </div>
      )}
    </div>
  );
}

function UrlInput({
  onAnalyze,
  isLoading,
  defaultUrl = '',
}: {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
  defaultUrl?: string;
}) {
  const [url, setUrl] = useState(defaultUrl);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultUrl) setUrl(defaultUrl);
  }, [defaultUrl]);

  const handleSubmit = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setError('Please enter a YouTube video URL');
      return;
    }
    if (!trimmed.includes('youtube.com') && !trimmed.includes('youtu.be')) {
      setError('Please enter a valid YouTube URL (e.g. youtube.com/watch?v=...)');
      return;
    }
    if (trimmed.includes('/shorts/')) {
      setError('This is a Shorts link. Try our YouTube Shorts Analyzer for short-form diagnostics.');
      return;
    }
    setError('');
    onAnalyze(trimmed);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-2.5 p-2 bg-white rounded-2xl shadow-card border border-glacial-sky/35">
        <div className="flex-1 flex items-center gap-3 px-3.5">
          <YoutubeIcon className="w-5 h-5 text-red-500 shrink-0" />
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-1 py-3 text-midnight-abyss placeholder-slate-400 bg-transparent focus:outline-none text-sm font-normal"
            disabled={isLoading}
            id="video-url-input"
            aria-label="YouTube Video URL"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="btn-primary shrink-0 text-sm py-3 px-6 disabled:opacity-60 disabled:cursor-not-allowed"
          id="video-analyze-btn"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>Analyze Video</span>
            </span>
          )}
        </button>
      </div>

      {error && (
        <p className="text-red-600 text-xs md:text-sm mt-2 pl-3 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </p>
      )}

      <p className="text-frosty-slate text-xs mt-2.5 text-center">
        Supported format: https://www.youtube.com/watch?v=dQw4w9WgXcQ
      </p>
    </div>
  );
}

export default function VideoAnalyzerPage() {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState<VideoAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const defaultUrl = searchParams.get('url') || '';

  useSEO({
    title: 'Free YouTube Video Analyzer — Hook, Storytelling & Retention AI',
    description: 'Get deep AI intelligence on any YouTube video. Uncover hook flaws, storytelling gaps, engagement opportunities, and actionable rewrites for higher retention.',
    path: '/youtube-video-analyzer',
    structuredData: buildFaqSchema(FAQ),
  });

  useEffect(() => {
    if (defaultUrl) handleAnalyze(defaultUrl);
  }, []);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await analyzeVideo(url);
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again shortly.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
  };

  const getExportText = () => {
    if (!result) return '';
    const { analysis, metadata } = result;
    return `TrendlyInside YouTube Video Analysis Report
==============================================
Video: ${metadata.title}
Channel: ${metadata.channel}
Overall Score: ${analysis.overallScore}/100 (${getScoreTier(analysis.overallScore).label})

CATEGORY SCORES:
• Hook Score: ${analysis.hookScore}/100
• Thumbnail Score: ${analysis.thumbnailScore}/100
• Storytelling: ${analysis.storytellingScore}/100
• Retention Score: ${analysis.retentionScore}/100
• Engagement Score: ${analysis.engagementScore}/100
• CTA Score: ${analysis.ctaScore}/100

SUMMARY INSIGHT:
${analysis.summaryInsight}

WHAT WORKS (STRENGTHS):
${analysis.strengths.map((s) => `• ${s}`).join('\n')}

WHAT HURTS PERFORMANCE (WEAKNESSES):
${analysis.weaknesses.map((w) => `• ${w}`).join('\n')}

TOP IMPROVEMENT ACTIONS:
${analysis.recommendations.map((r, i) => `${i + 1}. [${r.priority} Priority] ${r.title}: ${r.description}`).join('\n')}

NEXT STEPS:
${analysis.nextSteps.map((s, i) => `${i + 1}. ${s}`).join('\n')}

Analyzed by TrendlyInside — https://trendlyinside.com`;
  };

  return (
    <>
      {/* Header & Input Section */}
      <div
        className="pt-28 md:pt-32 pb-14 border-b border-glacial-sky/20"
        style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #E8F0F7 100%)' }}
      >
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-primary mb-3 inline-flex">Free AI Creator Intelligence</span>
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-midnight-abyss mt-2 mb-3">
              YouTube Video Analyzer
            </h1>
            <p className="text-frosty-slate max-w-xl mx-auto mb-8 leading-relaxed text-sm md:text-base">
              Paste any YouTube video to understand why viewers stay or leave. Uncover hook friction, storytelling gaps, and clear action steps before your next upload.
            </p>
            <UrlInput onAnalyze={handleAnalyze} isLoading={isLoading} defaultUrl={defaultUrl} />
          </motion.div>
        </div>
      </div>

      <div className="container-main py-10">
        {/* Loading State */}
        {isLoading && (
          <LoadingState
            title="Analyzing Video Signals..."
            subtitle="Evaluating hook structure, retention pacing, and creator signals..."
            steps={[
              { label: 'Validating YouTube URL' },
              { label: 'Fetching video metadata & title context' },
              { label: 'Analyzing opening hook tension' },
              { label: 'Evaluating storytelling & pacing' },
              { label: 'Checking engagement & CTA placement' },
              { label: 'Synthesizing recommendations' },
            ]}
          />
        )}

        {/* Error State */}
        {error && !isLoading && (
          <ErrorCard message={error} onRetry={() => setError('')} />
        )}

        {/* Analysis Results */}
        {result && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* 1. Video Info Header */}
            <div className="card p-6 border-glacial-sky/35">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <img
                  src={result.metadata.thumbnail}
                  alt={result.metadata.title}
                  className="w-full sm:w-52 rounded-xl object-cover aspect-video bg-glacial-sky/20 border border-glacial-sky/25"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = result.metadata.thumbnailFallback || '';
                  }}
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="badge-primary text-2xs">Analysis Complete</span>
                    {result.fromCache && (
                      <span className="badge bg-green-50 text-green-700 text-2xs">Cached Result</span>
                    )}
                    <span className="badge bg-slate-100 text-midnight-abyss text-2xs">
                      {result.analysis.viralPotential} Viral Potential
                    </span>
                  </div>

                  <h2 className="font-heading font-bold text-xl md:text-2xl text-midnight-abyss mb-1.5">
                    {result.metadata.title}
                  </h2>
                  <p className="text-frosty-slate text-xs md:text-sm mb-3">
                    Channel: {result.metadata.channel}
                  </p>

                  <p className="text-sm text-midnight-abyss leading-relaxed bg-glacial-sky/10 p-3.5 rounded-xl border border-glacial-sky/20">
                    {result.analysis.summaryInsight}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Overall Score & Category Scores */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="card p-6 flex items-center justify-center md:col-span-1 bg-white border-glacial-sky/35">
                <ScoreCircle
                  score={result.analysis.overallScore}
                  label="Overall Content Score"
                  sublabel="Content Performance"
                />
              </div>

              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CategoryScoreCard
                  label="Hook Score"
                  score={result.analysis.hookScore}
                  icon={<Zap className="w-4 h-4" />}
                  explanation={result.analysis.hookAnalysis?.details}
                  issue={result.analysis.hookAnalysis?.improvements?.[0]}
                  recommendedChange={result.analysis.hookAnalysis?.improvements?.[1] || "Lead with the transformation before context."}
                />
                <CategoryScoreCard
                  label="Retention Score"
                  score={result.analysis.retentionScore}
                  icon={<RefreshCw className="w-4 h-4" />}
                  explanation="Evaluates drop-off friction and storytelling pacing across sections."
                  recommendedChange="Add pattern interrupts every 20-30 seconds to re-engage attention."
                />
                <CategoryScoreCard
                  label="Storytelling"
                  score={result.analysis.storytellingScore}
                  icon={<BookOpen className="w-4 h-4" />}
                  explanation={result.analysis.storytellingAnalysis?.details}
                  recommendedChange={result.analysis.storytellingAnalysis?.improvements?.[0]}
                />
                <CategoryScoreCard
                  label="Thumbnail Score"
                  score={result.analysis.thumbnailScore}
                  icon={<Anchor className="w-4 h-4" />}
                  explanation={result.analysis.thumbnailAnalysis?.details}
                  recommendedChange={result.analysis.thumbnailAnalysis?.suggestions?.[0]}
                />
                <CategoryScoreCard
                  label="Engagement"
                  score={result.analysis.engagementScore}
                  icon={<Heart className="w-4 h-4" />}
                  explanation={result.analysis.engagementAnalysis?.details}
                  recommendedChange={result.analysis.engagementAnalysis?.improvements?.[0]}
                />
                <CategoryScoreCard
                  label="CTA Score"
                  score={result.analysis.ctaScore}
                  icon={<MousePointer className="w-4 h-4" />}
                  explanation={result.analysis.ctaAnalysis?.details}
                  recommendedChange={result.analysis.ctaAnalysis?.improvements?.[0]}
                />
              </div>
            </div>

            {/* Ad Banner */}
            <AdBanner />

            {/* 3. Strengths & Weaknesses */}
            <div>
              <h3 className="font-heading font-bold text-xl text-midnight-abyss mb-4">
                Performance Breakdown
              </h3>
              <StrengthWeaknessCard
                strengths={result.analysis.strengths}
                weaknesses={result.analysis.weaknesses}
              />
            </div>

            {/* 4. Top 3 Priority Improvements */}
            <div className="card p-6 border-glacial-sky/35">
              <h3 className="font-heading font-bold text-xl text-midnight-abyss mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-fjord-blue" />
                <span>Top 3 Priority Improvements</span>
              </h3>
              <div className="space-y-3">
                {result.analysis.recommendations.slice(0, 3).map((rec, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                      rec.priority === 'High'
                        ? 'bg-red-50/50 border-red-200'
                        : rec.priority === 'Medium'
                        ? 'bg-amber-50/50 border-amber-200'
                        : 'bg-blue-50/50 border-blue-200'
                    }`}
                  >
                    <span
                      className={`badge text-xs shrink-0 mt-0.5 ${
                        rec.priority === 'High'
                          ? 'bg-red-100 text-red-700 border border-red-300'
                          : rec.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-700 border border-amber-300'
                          : 'bg-blue-100 text-blue-700 border border-blue-300'
                      }`}
                    >
                      {rec.priority} Priority
                    </span>
                    <div>
                      <h4 className="font-semibold text-sm text-midnight-abyss">
                        {rec.title}
                      </h4>
                      <p className="text-xs text-frosty-slate mt-1 leading-relaxed">
                        {rec.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Product Conversion Loop Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#223354] to-[#4A6D99] text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-card">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-[#FADADD] mb-2">
                  <Zap className="w-3.5 h-3.5" />
                  Hook Score Diagnostic
                </span>
                <h4 className="font-heading font-bold text-xl text-white">
                  Need a Stronger Opening for Your Next Video?
                </h4>
                <p className="text-glacial-sky text-xs md:text-sm mt-1 max-w-xl">
                  Generate 20 high-retention hook variations across Curiosity, Story, Contrarian, and Authority angles tailored to your topic.
                </p>
              </div>
              <Link
                to="/hook-generator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-midnight-abyss bg-white hover:bg-glacial-sky transition-colors text-sm shrink-0 shadow-md"
              >
                <span>Generate 20 Hooks</span>
                <ArrowRight className="w-4 h-4 text-fjord-blue" />
              </Link>
            </div>

            {/* 6. Actionable Next Steps */}
            <NextStepsCard steps={result.analysis.nextSteps} />

            {/* 7. Creator Toolkit Affiliate Recommendations */}
            <CreatorToolkit />

            {/* 8. Export & Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ShareButton title={`${result.metadata.title} — AI Video Analysis`} />
              <CopyButton text={getExportText()} label="Export Report" />
              <button onClick={handleReset} className="btn-secondary text-sm py-2">
                <RefreshCw className="w-4 h-4" />
                <span>Analyze Another Video</span>
              </button>
              <Link to="/growth-roadmap-generator" className="btn-secondary text-sm py-2">
                <BarChart2 className="w-4 h-4" />
                <span>Build 30-Day Growth Roadmap</span>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Default State: Educational SEO Content */}
        {!result && !isLoading && !error && (
          <div className="space-y-14 mt-4">
            {/* Feature pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-midnight-abyss text-lg mb-2">
                  Hook Score &amp; Tension
                </h3>
                <p className="text-frosty-slate text-sm leading-relaxed">
                  Evaluate your first 5–15 seconds against proven curiosity frameworks to eliminate drop-off.
                </p>
              </div>

              <div className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-fjord-blue flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-midnight-abyss text-lg mb-2">
                  Retention &amp; Pacing
                </h3>
                <p className="text-frosty-slate text-sm leading-relaxed">
                  Diagnose mid-video slump moments, repetitive transitions, and storytelling friction.
                </p>
              </div>

              <div className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-midnight-abyss text-lg mb-2">
                  Prioritized Action Plan
                </h3>
                <p className="text-frosty-slate text-sm leading-relaxed">
                  Receive concrete, High/Medium/Low priority fixes so you know exactly what to modify next.
                </p>
              </div>
            </div>

            {/* SEO Content Section */}
            <div className="card p-8 border-glacial-sky/30 space-y-6">
              <div>
                <h2 className="font-heading font-bold text-2xl text-midnight-abyss mb-3">
                  What Is a YouTube Video Analyzer?
                </h2>
                <p className="text-frosty-slate text-sm leading-relaxed">
                  A YouTube video analyzer is an AI-powered diagnostic platform designed to evaluate why videos perform or underperform. Rather than merely reciting raw view counts, TrendlyInside analyzes the psychological triggers behind viewer behavior: hook potency, narrative pacing, retention roadblocks, and call-to-action friction.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-midnight-abyss mb-2">
                  How TrendlyInside Analyzes Videos
                </h3>
                <p className="text-frosty-slate text-sm leading-relaxed">
                  When you submit a YouTube URL, our engine evaluates title curiosity gaps, metadata clarity, packaging alignment, and opening structure against retention datasets. The output gives you standardized score metrics, identified weaknesses, and specific rewrites.
                </p>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xl text-midnight-abyss mb-2">
                  How to Improve YouTube Viewer Retention
                </h3>
                <p className="text-frosty-slate text-sm leading-relaxed">
                  Top-performing creators avoid long animated intros or throat-clearing preambles. To elevate retention: validate the title promise in the opening 5 seconds, use visual pattern interrupts every 25 seconds, and build anticipation toward a concrete payoff before concluding.
                </p>
              </div>
            </div>

            <AdBanner />

            {/* FAQ */}
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
