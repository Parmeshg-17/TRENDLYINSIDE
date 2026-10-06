import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, TrendingUp, RefreshCw, Calendar,
  BarChart2, Award, ArrowRight, AlertTriangle,
  Zap, HelpCircle
} from 'lucide-react';
import { analyzeChannel } from '../services/api';
import type { ChannelAnalysisResult } from '../types';
import LoadingState from '../components/LoadingState';
import { ScoreCircle, getScoreTier } from '../components/ScoreComponents';
import {
  StrengthWeaknessCard,
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
    q: 'How does the YouTube Channel Analyzer evaluate my channel?',
    a: 'TrendlyInside analyzes your primary niche clarity, branding cohesion, upload cadence, content pillars, and peer benchmark potential to calculate your Creator Score and 30-day priorities.',
  },
  {
    q: 'What is the Channel Creator Score?',
    a: 'The Creator Score (0–100) measures overall algorithmic health across 6 core competencies: Branding, Consistency, Content Quality, Topic Clarity, Audience Fit, and Growth Velocity.',
  },
  {
    q: 'Can I analyze competitors’ channels?',
    a: 'Yes! You can paste any public creator channel handle to study their content themes, strengths, and roadmap strategy.',
  },
  {
    q: 'Do you need my YouTube account login?',
    a: 'No. TrendlyInside never requests passwords, Google permissions, or account connections. All analyses use public creator signals.',
  },
];

export default function ChannelAnalyzerPage() {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState<ChannelAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState(searchParams.get('url') || '');
  const [inputError, setInputError] = useState('');
  const defaultUrl = searchParams.get('url') || '';

  useSEO({
    title: 'Free YouTube Channel Analyzer — Creator Score & Growth Roadmap AI',
    description: 'Get a full strategic audit of any YouTube channel. Diagnose content consistency, topic focus, branding, audience fit, and generate a 30-day growth plan.',
    path: '/youtube-channel-analyzer',
    structuredData: buildFaqSchema(FAQ),
  });

  useEffect(() => {
    if (defaultUrl) handleAnalyze(defaultUrl);
  }, []);

  const handleAnalyze = async (analysisUrl: string) => {
    const trimmed = analysisUrl.trim();
    if (!trimmed) {
      setInputError('Please enter a YouTube channel URL or handle');
      return;
    }
    if (!trimmed.includes('youtube.com')) {
      setInputError('Please enter a valid YouTube channel URL (e.g. youtube.com/@mkbhd)');
      return;
    }
    setIsLoading(true);
    setError('');
    setResult(null);
    setInputError('');
    try {
      const data = await analyzeChannel(trimmed);
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again shortly.');
    } finally {
      setIsLoading(false);
    }
  };

  const getExportText = () => {
    if (!result) return '';
    const { analysis } = result;
    return `TrendlyInside YouTube Channel Audit Report
============================================
Channel: ${result.channelHandle}
Creator Score: ${analysis.creatorScore}/100 (${getScoreTier(analysis.creatorScore).label})
Primary Niche: ${analysis.topicClarity?.primaryNiche || 'General'}

COMPETENCY METRICS:
• Consistency: ${analysis.consistencyScore}/100
• Branding: ${analysis.brandingScore}/100
• Content Quality: ${analysis.contentQualityScore}/100
• Topic Focus: ${analysis.topicClarity?.score ?? 80}/100
• Audience Alignment: ${analysis.audienceAlignmentScore}/100
• Growth Potential: ${analysis.growthPotentialScore}/100

STRENGTHS:
${analysis.strengths.map((s) => `• ${s}`).join('\n')}

WEAKNESSES:
${analysis.weaknesses.map((w) => `• ${w}`).join('\n')}

30-DAY GROWTH ROADMAP:
Week 1 (${analysis.roadmap.week1.focus}):
${analysis.roadmap.week1.tasks.map((t) => `• ${t}`).join('\n')}

Week 2 (${analysis.roadmap.week2.focus}):
${analysis.roadmap.week2.tasks.map((t) => `• ${t}`).join('\n')}

Week 3 (${analysis.roadmap.week3.focus}):
${analysis.roadmap.week3.tasks.map((t) => `• ${t}`).join('\n')}

Week 4 (${analysis.roadmap.week4.focus}):
${analysis.roadmap.week4.tasks.map((t) => `• ${t}`).join('\n')}

Audited by TrendlyInside — https://trendlyinside.com`;
  };

  const weekThemes = [
    { bg: 'from-blue-50/80 to-blue-100/40', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' },
    { bg: 'from-purple-50/80 to-purple-100/40', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700' },
    { bg: 'from-green-50/80 to-green-100/40', border: 'border-green-200', badge: 'bg-green-100 text-green-700' },
    { bg: 'from-amber-50/80 to-amber-100/40', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
  ];

  return (
    <>
      <div
        className="pt-28 md:pt-32 pb-14 border-b border-glacial-sky/20"
        style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #E8F0F7 100%)' }}
      >
        <div className="container-main text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge-primary mb-3 inline-flex">Channel Intelligence Audit</span>
            <h1 className="font-heading font-bold text-3xl md:text-5xl text-midnight-abyss mt-2 mb-3">
              YouTube Channel Analyzer
            </h1>
            <p className="text-frosty-slate max-w-xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
              Get an executive AI audit of any creator channel. Measure your Creator Score, diagnose branding alignment, and generate a customized 30-day roadmap.
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
                    placeholder="https://youtube.com/@channelname"
                    className="flex-1 py-3 text-midnight-abyss placeholder-slate-400 bg-transparent focus:outline-none text-sm font-normal"
                    disabled={isLoading}
                    id="channel-url-input"
                    aria-label="YouTube Channel URL"
                  />
                </div>
                <button
                  onClick={() => handleAnalyze(url)}
                  disabled={isLoading}
                  className="btn-primary shrink-0 text-sm py-3 px-6"
                  id="channel-analyze-btn"
                >
                  <Search className="w-4 h-4" />
                  <span>{isLoading ? 'Auditing...' : 'Analyze Channel'}</span>
                </button>
              </div>

              {inputError && (
                <p className="text-red-600 text-xs md:text-sm mt-2 pl-3 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{inputError}</span>
                </p>
              )}
              <p className="text-frosty-slate text-xs mt-2.5">
                Format: https://youtube.com/@mkbhd or https://youtube.com/@channel
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-main py-10">
        {isLoading && (
          <LoadingState
            title="Auditing Channel Signals..."
            subtitle="Evaluating content clarity, branding consistency, and peer benchmarks..."
            steps={[
              { label: 'Resolving YouTube channel handle' },
              { label: 'Reading recent upload metadata & themes' },
              { label: 'Calculating Creator Score & niche clarity' },
              { label: 'Evaluating audience fit & branding cohesion' },
              { label: 'Synthesizing 30-day weekly milestone roadmap' },
            ]}
          />
        )}

        {error && !isLoading && (
          <ErrorCard message={error} onRetry={() => setError('')} />
        )}

        {result && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Channel Info Header */}
            <div className="card p-6 border-glacial-sky/35">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fjord-blue to-midnight-abyss flex items-center justify-center text-white font-bold text-2xl shrink-0 shadow-btn">
                  {result.channelHandle.replace('@', '').charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h2 className="font-heading font-bold text-2xl text-midnight-abyss">
                      {result.channelHandle.startsWith('@') ? result.channelHandle : `@${result.channelHandle}`}
                    </h2>
                    <span className="badge-primary text-2xs">Channel Audit</span>
                  </div>

                  {result.analysis.topicClarity?.primaryNiche && (
                    <p className="text-frosty-slate text-sm mb-2.5">
                      Niche Category: <strong className="text-midnight-abyss">{result.analysis.topicClarity.primaryNiche}</strong>
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-3">
                    {result.analysis.contentThemes?.slice(0, 5).map((theme) => (
                      <span key={theme} className="badge bg-glacial-sky/25 text-fjord-blue border border-glacial-sky/40 text-xs">
                        {theme}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-midnight-abyss leading-relaxed bg-glacial-sky/10 p-3.5 rounded-xl border border-glacial-sky/20">
                    {result.analysis.summaryInsight}
                  </p>
                </div>
              </div>
            </div>

            {/* Creator Score & Competency Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="card p-6 flex items-center justify-center bg-white border-glacial-sky/35">
                <ScoreCircle
                  score={result.analysis.creatorScore}
                  label="Creator Score"
                  sublabel="Channel Health"
                />
              </div>

              {/* Horizontal Competency Bars (Section 26) */}
              <div className="card p-6 md:col-span-3 border-glacial-sky/35 bg-white flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-midnight-abyss mb-1 flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-fjord-blue" />
                    <span>Channel Health Competency Breakdown</span>
                  </h3>
                  <p className="text-xs text-frosty-slate mb-4">
                    Evaluated across 6 foundational creator pillars.
                  </p>
                </div>

                <div className="space-y-3.5">
                  {[
                    { label: 'Branding & Identity', score: result.analysis.brandingScore },
                    { label: 'Upload Consistency', score: result.analysis.consistencyScore },
                    { label: 'Content Quality', score: result.analysis.contentQualityScore },
                    { label: 'Topic Focus & Clarity', score: result.analysis.topicClarity?.score ?? 80 },
                    { label: 'Audience Alignment', score: result.analysis.audienceAlignmentScore },
                    { label: 'Growth Potential', score: result.analysis.growthPotentialScore },
                  ].map((bar) => {
                    const tier = getScoreTier(bar.score);
                    return (
                      <div key={bar.label}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-semibold text-midnight-abyss">{bar.label}</span>
                          <span className="font-bold text-midnight-abyss">
                            {bar.score}/100 <span className={`text-2xs font-normal ml-1 ${tier.badgeText}`}>({tier.label})</span>
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-glacial-sky/20 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ width: `${bar.score}%`, backgroundColor: tier.color }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <AdBanner />

            {/* Strengths & Weaknesses */}
            <StrengthWeaknessCard
              strengths={result.analysis.strengths}
              weaknesses={result.analysis.weaknesses}
            />

            {/* Growth Opportunities */}
            {result.analysis.growthOpportunities && (
              <div className="card p-6 border-glacial-sky/35">
                <h3 className="font-heading font-bold text-xl text-midnight-abyss mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-fjord-blue" />
                  <span>High-Leverage Growth Opportunities</span>
                </h3>
                <div className="space-y-3">
                  {result.analysis.growthOpportunities.map((opp, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-glacial-sky/30 bg-glacial-sky/10"
                    >
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h4 className="font-semibold text-sm text-midnight-abyss">
                          {opp.opportunity}
                        </h4>
                        <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs shrink-0">
                          {opp.impact} Impact
                        </span>
                      </div>
                      <p className="text-xs text-frosty-slate leading-relaxed">
                        {opp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 30-Day Growth Roadmap */}
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-midnight-abyss flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-fjord-blue" />
                    <span>Personalized 30-Day Growth Roadmap</span>
                  </h3>
                  <p className="text-xs text-frosty-slate mt-0.5">
                    Week-by-week actions to eliminate channel weaknesses.
                  </p>
                </div>
                <Link
                  to="/growth-roadmap-generator"
                  className="btn-secondary text-xs py-2 px-3"
                >
                  <span>Customize in Roadmap Tool →</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { week: 1, data: result.analysis.roadmap.week1 },
                  { week: 2, data: result.analysis.roadmap.week2 },
                  { week: 3, data: result.analysis.roadmap.week3 },
                  { week: 4, data: result.analysis.roadmap.week4 },
                ].map(({ week, data }) => (
                  <div
                    key={week}
                    className={`card p-5 border bg-gradient-to-br ${weekThemes[week - 1].bg} ${weekThemes[week - 1].border}`}
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="w-8 h-8 rounded-lg bg-midnight-abyss/10 text-midnight-abyss text-xs font-bold flex items-center justify-center">
                        W{week}
                      </span>
                      <h4 className="font-semibold text-sm text-midnight-abyss">
                        {data?.focus || `Week ${week} Focus`}
                      </h4>
                    </div>
                    <ul className="space-y-2">
                      {(data?.tasks || []).map((task: string, ti: number) => (
                        <li key={ti} className="flex items-start gap-2 text-xs md:text-sm text-midnight-abyss">
                          <span className="w-1.5 h-1.5 rounded-full bg-fjord-blue mt-1.5 shrink-0" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Conversion Loop */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#223354] to-[#4A6D99] text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-card">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-[#FADADD] mb-2">
                  <Zap className="w-3.5 h-3.5" />
                  Content Strategy Engine
                </span>
                <h4 className="font-heading font-bold text-xl text-white">
                  Need 50 Content Ideas for Your Next 30 Days?
                </h4>
                <p className="text-glacial-sky text-xs md:text-sm mt-1 max-w-xl">
                  Generate 50 viral video concepts mapped to your channel niche and growth goals.
                </p>
              </div>
              <Link
                to="/viral-idea-generator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-midnight-abyss bg-white hover:bg-glacial-sky transition-colors text-sm shrink-0 shadow-md"
              >
                <span>Generate 50 Ideas</span>
                <ArrowRight className="w-4 h-4 text-fjord-blue" />
              </Link>
            </div>

            <CreatorToolkit />

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ShareButton title={`${result.channelData.channel} — AI Channel Audit`} />
              <CopyButton text={getExportText()} label="Export Roadmap" />
              <button
                onClick={() => {
                  setResult(null);
                  setUrl('');
                }}
                className="btn-secondary text-sm py-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Analyze Another Channel</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Default State: Features & FAQ */}
        {!result && !isLoading && !error && (
          <div className="space-y-12 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-fjord-blue flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-midnight-abyss mb-2">
                  Creator Score (0–100)
                </h3>
                <p className="text-frosty-slate text-sm leading-relaxed">
                  Synthesize upload rhythm, topic focus, and thumbnail packaging into an executive channel health score.
                </p>
              </div>

              <div className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-midnight-abyss mb-2">
                  Growth Opportunities
                </h3>
                <p className="text-frosty-slate text-sm leading-relaxed">
                  Identify untapped content angles, format expansions, and high-conversion adjustments.
                </p>
              </div>

              <div className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-midnight-abyss mb-2">
                  30-Day Growth Roadmap
                </h3>
                <p className="text-frosty-slate text-sm leading-relaxed">
                  A personalized 4-week action plan outlining prioritized milestones and tactical execution steps.
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
