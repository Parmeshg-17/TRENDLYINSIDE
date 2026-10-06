import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Zap, Heart, TrendingUp, Timer, RefreshCw,
  Repeat, AlertTriangle, ArrowRight, HelpCircle
} from 'lucide-react';
import { analyzeShorts } from '../services/api';
import type { ShortsAnalysisResult } from '../types';
import LoadingState from '../components/LoadingState';
import { ScoreCircle, ScoreCard } from '../components/ScoreComponents';
import {
  StrengthWeaknessCard,
  RecommendationCards,
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
    q: 'How does the YouTube Shorts Analyzer work?',
    a: 'Our AI examines key short-form viral signals: the first 3 seconds, pattern-interrupt pacing, content density, replay loop mechanics, and scroll-stopping visual cues.',
  },
  {
    q: 'Why are the first 3 seconds so critical for YouTube Shorts?',
    a: 'Shorts viewers swipe away within milliseconds if not immediately stimulated. High-performing Shorts show the payoff, transformation, or conflict in the very first frame rather than presenting a title card or greeting.',
  },
  {
    q: 'What is a good Replay Value score for Shorts?',
    a: 'A replay score above 75 indicates seamless looping where the final sentence connects back to the opening hook, or high informational density that causes viewers to re-watch.',
  },
  {
    q: 'Is this Shorts tool free to use?',
    a: 'Yes, 100% free with no login or payment required.',
  },
];

export default function ShortsAnalyzerPage() {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState<ShortsAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState(searchParams.get('url') || '');
  const [inputError, setInputError] = useState('');
  const defaultUrl = searchParams.get('url') || '';

  useSEO({
    title: 'Free YouTube Shorts Analyzer — First 3-Seconds & Viral Potential AI',
    description: 'Analyze any YouTube Short with AI. Diagnose first 3-second hook drop-off, scroll-stopping power, pacing, loop mechanics, and actionable viral improvements.',
    path: '/youtube-shorts-analyzer',
    structuredData: buildFaqSchema(FAQ),
  });

  useEffect(() => {
    if (defaultUrl) handleAnalyze(defaultUrl);
  }, []);

  const handleAnalyze = async (analysisUrl: string) => {
    const trimmed = analysisUrl.trim();
    if (!trimmed) {
      setInputError('Please enter a YouTube Shorts URL');
      return;
    }
    if (!trimmed.includes('youtube.com') && !trimmed.includes('youtu.be')) {
      setInputError('Please enter a valid YouTube Shorts URL');
      return;
    }
    setIsLoading(true);
    setError('');
    setResult(null);
    setInputError('');
    try {
      const data = await analyzeShorts(trimmed);
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again shortly.');
    } finally {
      setIsLoading(false);
    }
  };

  const getExportText = () => {
    if (!result) return '';
    const { analysis, metadata } = result;
    return `TrendlyInside YouTube Shorts Analysis
======================================
Short: ${metadata.title}
Channel: ${metadata.channel}
Overall Shorts Score: ${analysis.overallScore}/100
Hook Score: ${analysis.hookScore}/100
Retention: ${analysis.retentionScore}/100
Viral Potential: ${analysis.viralPotentialScore}/100

FIRST 3-SECOND ANALYSIS:
• Verdict: ${analysis.firstThreeSeconds?.verdict || 'Good'}
• Assessment: ${analysis.firstThreeSeconds?.analysis || ''}

VIRAL POTENTIAL BREAKDOWN:
• Trend Relevance: ${analysis.viralPotentialAnalysis?.trendRelevance || 'High'}
• Shareability: ${analysis.viralPotentialAnalysis?.shareability || 'High'}
• Replay Value: ${analysis.viralPotentialAnalysis?.replayValue || 'High'}

RECOMMENDATIONS:
${analysis.recommendations.map((r, i) => `${i + 1}. [${r.priority}] ${r.title}: ${r.description}`).join('\n')}

Analyzed by TrendlyInside — https://trendlyinside.com`;
  };

  return (
    <>
      <div
        className="pt-28 md:pt-32 pb-14 border-b border-glacial-sky/20"
        style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #E8F0F7 100%)' }}
      >
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-primary mb-3 inline-flex">Short-Form Intelligence</span>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-midnight-abyss mt-2 mb-3">
              YouTube Shorts Analyzer
            </h1>
            <p className="text-frosty-slate max-w-xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              Analyze your Shorts for hook strength, viral potential, pacing, and first-3-second impact. Discover exact adjustments to optimize for the feed algorithm.
            </p>

            <div className="w-full max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2.5 p-2 bg-white rounded-2xl shadow-card border border-glacial-sky/35">
                <div className="flex-1 flex items-center gap-3 px-3.5">
                  <YoutubeIcon className="w-5 h-5 text-red-500 shrink-0" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      setInputError('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleAnalyze(url)}
                    placeholder="https://youtube.com/shorts/..."
                    className="flex-1 py-3 text-midnight-abyss placeholder-slate-400 bg-transparent focus:outline-none text-sm font-normal"
                    disabled={isLoading}
                    id="shorts-url-input"
                    aria-label="YouTube Shorts URL"
                  />
                </div>
                <button
                  onClick={() => handleAnalyze(url)}
                  disabled={isLoading}
                  className="btn-primary shrink-0 text-sm py-3 px-6"
                  id="shorts-analyze-btn"
                >
                  <Search className="w-4 h-4" />
                  <span>{isLoading ? 'Analyzing...' : 'Analyze Short'}</span>
                </button>
              </div>

              {inputError && (
                <p className="text-red-600 text-xs md:text-sm mt-2 pl-3 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{inputError}</span>
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-main py-10">
        {isLoading && (
          <LoadingState
            title="Analyzing Short-Form Signals..."
            subtitle="Evaluating opening 3-second tension, pacing cuts, and replay looping..."
            steps={[
              { label: 'Validating Shorts URL' },
              { label: 'Reading video metadata & audio cues' },
              { label: 'Auditing first 3 seconds & scroll-stopping impact' },
              { label: 'Measuring visual cut pacing & density' },
              { label: 'Calculating replay value & viral shareability' },
              { label: 'Generating prioritized Shorts recommendations' },
            ]}
          />
        )}

        {error && !isLoading && (
          <ErrorCard
            message={error}
            onRetry={() => {
              setError('');
              setResult(null);
            }}
          />
        )}

        {result && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Short Header */}
            <div className="card p-6 border-glacial-sky/35">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <img
                  src={result.metadata.thumbnail}
                  alt={result.metadata.title}
                  className="w-full sm:w-36 rounded-xl object-cover bg-glacial-sky/20 border border-glacial-sky/25"
                  style={{ aspectRatio: '9/16' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = result.metadata.thumbnailFallback || '';
                  }}
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="badge-primary text-2xs">Shorts Analysis</span>
                    <span className="badge bg-purple-50 text-purple-700 text-2xs">
                      {result.analysis.viralPotentialScore >= 80 ? 'High Viral Potential' : 'Moderate Viral Potential'}
                    </span>
                  </div>
                  <h2 className="font-heading font-bold text-xl text-midnight-abyss mb-1.5">
                    {result.metadata.title}
                  </h2>
                  <p className="text-frosty-slate text-xs md:text-sm mb-3">
                    {result.metadata.channel}
                  </p>
                  <p className="text-sm text-midnight-abyss leading-relaxed bg-glacial-sky/10 p-3.5 rounded-xl border border-glacial-sky/20">
                    {result.analysis.summaryInsight}
                  </p>
                </div>
              </div>
            </div>

            {/* Scores Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="card p-6 flex items-center justify-center bg-white border-glacial-sky/35">
                <ScoreCircle
                  score={result.analysis.overallScore}
                  label="Overall Shorts Score"
                  sublabel="Short-Form Performance"
                />
              </div>
              <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ScoreCard label="First 3 Seconds" score={result.analysis.hookScore} icon={<Timer className="w-4 h-4" />} delay={1} />
                <ScoreCard label="Retention" score={result.analysis.retentionScore} icon={<RefreshCw className="w-4 h-4" />} delay={2} />
                <ScoreCard label="Engagement" score={result.analysis.engagementScore} icon={<Heart className="w-4 h-4" />} delay={3} />
                <ScoreCard label="Viral Potential" score={result.analysis.viralPotentialScore} icon={<TrendingUp className="w-4 h-4" />} delay={4} />
              </div>
            </div>

            {/* Dedicated: How to Improve the First 3 Seconds */}
            <div className="card p-6 border-glacial-sky/35 bg-white">
              <h3 className="font-heading font-bold text-xl text-midnight-abyss mb-4 flex items-center gap-2">
                <Timer className="w-5 h-5 text-fjord-blue" />
                <span>How to Improve the First 3 Seconds</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-xl bg-red-50/70 border border-red-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-700 mb-1">
                    Current Friction
                  </h4>
                  <p className="text-sm text-midnight-abyss leading-relaxed">
                    {result.analysis.firstThreeSeconds?.analysis || "Intro contains narrative setup or pauses before revealing the payoff."}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                    Recommended Fix
                  </h4>
                  <p className="text-sm text-midnight-abyss leading-relaxed">
                    Start immediately on frame 1 with the visual transformation or end result. Delaying the promise by even 1.5 seconds triples swipe-away rate.
                  </p>
                </div>
              </div>

              {result.analysis.firstThreeSeconds?.improvements && (
                <div className="space-y-2 pt-2 border-t border-glacial-sky/20">
                  {result.analysis.firstThreeSeconds.improvements.map((imp, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs md:text-sm text-midnight-abyss">
                      <span className="text-fjord-blue font-bold">→</span>
                      <span>{imp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Viral Potential & Replay Value */}
            {result.analysis.viralPotentialAnalysis && (
              <div className="card p-6 border-glacial-sky/35">
                <h3 className="font-heading font-bold text-xl text-midnight-abyss mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-fjord-blue" />
                  <span>Viral Potential &amp; Replay Mechanics</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-glacial-sky/15 rounded-xl border border-glacial-sky/30">
                    <p className="text-xs font-bold text-fjord-blue uppercase tracking-wider mb-1">
                      Trend Relevance
                    </p>
                    <p className="text-sm text-midnight-abyss">
                      {result.analysis.viralPotentialAnalysis.trendRelevance}
                    </p>
                  </div>
                  <div className="p-4 bg-glacial-sky/15 rounded-xl border border-glacial-sky/30">
                    <p className="text-xs font-bold text-fjord-blue uppercase tracking-wider mb-1">
                      Shareability
                    </p>
                    <p className="text-sm text-midnight-abyss">
                      {result.analysis.viralPotentialAnalysis.shareability}
                    </p>
                  </div>
                  <div className="p-4 bg-glacial-sky/15 rounded-xl border border-glacial-sky/30">
                    <p className="text-xs font-bold text-fjord-blue uppercase tracking-wider mb-1">
                      Replay &amp; Loop Value
                    </p>
                    <p className="text-sm text-midnight-abyss">
                      {result.analysis.viralPotentialAnalysis.replayValue}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Ad Banner */}
            <AdBanner />

            {/* Strengths & Weaknesses */}
            <StrengthWeaknessCard
              strengths={result.analysis.strengths}
              weaknesses={result.analysis.weaknesses}
            />

            {/* Recommendations */}
            <div>
              <h3 className="font-heading font-bold text-xl text-midnight-abyss mb-4">
                Prioritized Recommendations
              </h3>
              <RecommendationCards recommendations={result.analysis.recommendations} />
            </div>

            {/* Product Conversion Loop */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#223354] to-[#4A6D99] text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-card">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-[#FADADD] mb-2">
                  <Zap className="w-3.5 h-3.5" />
                  Shorts Hook Copilot
                </span>
                <h4 className="font-heading font-bold text-xl text-white">
                  Want 20 Scroll-Stopping Hooks for Your Next Short?
                </h4>
                <p className="text-glacial-sky text-xs md:text-sm mt-1 max-w-xl">
                  Generate hooks specifically designed to prevent swipe-away in the first 2 seconds.
                </p>
              </div>
              <Link
                to="/hook-generator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-midnight-abyss bg-white hover:bg-glacial-sky transition-colors text-sm shrink-0 shadow-md"
              >
                <span>Generate Shorts Hooks</span>
                <ArrowRight className="w-4 h-4 text-fjord-blue" />
              </Link>
            </div>

            <NextStepsCard steps={result.analysis.nextSteps} />

            <CreatorToolkit />

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ShareButton title={`${result.metadata.title} — AI Shorts Analysis`} />
              <CopyButton text={getExportText()} label="Export Report" />
              <button
                onClick={() => {
                  setResult(null);
                  setError('');
                  setUrl('');
                }}
                className="btn-secondary text-sm py-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Analyze Another Short</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Default State: Educational SEO Content */}
        {!result && !isLoading && !error && (
          <div className="space-y-12 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                  <Timer className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-midnight-abyss mb-2">
                  First 3-Second Rule
                </h3>
                <p className="text-frosty-slate text-sm leading-relaxed">
                  Analyze if your opening frame contains visual curiosity or sluggish greeting dead-air.
                </p>
              </div>

              <div className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <Repeat className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-midnight-abyss mb-2">
                  Seamless Looping
                </h3>
                <p className="text-frosty-slate text-sm leading-relaxed">
                  Evaluate whether the ending sentence feeds smoothly into the beginning to boost replay rates.
                </p>
              </div>

              <div className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-fjord-blue flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-midnight-abyss mb-2">
                  Scroll-Stopping Power
                </h3>
                <p className="text-frosty-slate text-sm leading-relaxed">
                  Multi-factor viral potential diagnostics covering trend relevance, shareability, and pacing.
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
