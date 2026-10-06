import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckSquare, Sparkles, RefreshCw, Copy, Check, PieChart } from 'lucide-react';
import { generateCalendar } from '../services/api';
import type { ContentCalendarResult } from '../types';
import LoadingState from '../components/LoadingState';
import {
  AdBanner,
  ErrorCard,
  ShareButton,
  CreatorToolkit,
} from '../components/AnalysisComponents';

const FAQ = [
  {
    q: 'How does the 30-Day Content Calendar work?',
    a: 'We generate an actionable 4-week publishing schedule with daily content concepts, specific hook angles, format tags, and weekly themes tailored to your niche.',
  },
  {
    q: 'Can I customize the posting frequency?',
    a: 'Yes! Whether you publish daily Shorts, 3 videos per week, or a hybrid long/short strategy, the calendar balances your workload to prevent creator burnout.',
  },
  {
    q: 'Can I export the calendar to Notion or Google Docs?',
    a: 'Yes! Simply click the "Copy Full 30-Day Calendar" button to paste the complete structured plan into your favorite project management app.',
  },
];

export default function ContentCalendar() {
  const [niche, setNiche] = useState('Personal Finance & Side Hustles');
  const [frequency, setFrequency] = useState('4 videos/week');
  const [formats, setFormats] = useState('Shorts & Long-form');
  const [audience, setAudience] = useState('Young Professionals (20-35)');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ContentCalendarResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!niche.trim()) {
      setError('Please provide your content niche');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await generateCalendar({ niche, frequency, formats, audience });
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Calendar generation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCalendar = () => {
    if (!result) return;
    let text = `${result.calendarTitle}\nTotal Posts: ${result.totalScheduledPosts}\n\n`;
    for (const week of result.weeks) {
      text += `=== WEEK ${week.weekNumber}: ${week.theme} ===\n`;
      for (const day of week.days) {
        text += `Day ${day.day} (${day.dayName}): [${day.format} | ${day.platform}] - ${day.title}\nHook: "${day.hook}"\nStatus: ${day.status}\n\n`;
      }
    }
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <Calendar className="w-3.5 h-3.5 text-[#FADADD]" />
            Phase 2 Creator Workflow & Publishing Cadence
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
            30-Day Content Calendar Generator
          </h1>
          <p className="text-[#C2D6EC] text-base md:text-lg max-w-2xl mx-auto mb-8">
            Turn blank-page anxiety into a complete month of high-retention video concepts, hooks, and publishing dates.
          </p>

          {/* Input Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl text-left border border-white/20 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1.5">
                  Content Niche / Topic *
                </label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. Real Estate, Fitness, Tech Reviews, AI Tools"
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl text-midnight-abyss placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A6D99] focus:bg-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1">
                    Posting Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-lg text-midnight-abyss text-xs focus:outline-none focus:ring-2 focus:ring-[#4A6D99]"
                  >
                    <option value="Daily (7 posts/week)">Daily (7 posts/week)</option>
                    <option value="5 posts/week">5 posts/week (Mon-Fri)</option>
                    <option value="4 videos/week">4 videos/week (Recommended)</option>
                    <option value="3 videos/week">3 videos/week (Balanced)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1">
                    Primary Formats
                  </label>
                  <select
                    value={formats}
                    onChange={(e) => setFormats(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-lg text-midnight-abyss text-xs focus:outline-none focus:ring-2 focus:ring-[#4A6D99]"
                  >
                    <option value="Shorts & Long-form">Hybrid (Shorts & Long-form)</option>
                    <option value="100% Short-form">100% Short-form (Shorts/Reels/TikTok)</option>
                    <option value="100% Long-form">100% Long-form (YouTube Focus)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. College students, busy parents, software engineers"
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-lg text-midnight-abyss text-xs focus:outline-none focus:ring-2 focus:ring-[#4A6D99]"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-base font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Assembling 30-Day Content Plan...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate 30-Day Content Calendar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {isLoading && <LoadingState title="Generating 30-Day Content Calendar..." />}

        {error && !isLoading && (
          <div className="max-w-2xl mx-auto mb-8">
            <ErrorCard message={error} onRetry={handleGenerate} />
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
                <span className="text-xs uppercase font-bold tracking-wider text-frosty-slate">30-Day Blueprint</span>
                <p className="text-sm font-semibold text-midnight-abyss">{result.calendarTitle}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCalendar}
                  className="btn-primary text-xs px-3.5 py-2 flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied Calendar!' : 'Copy Full Calendar'}
                </button>
                <ShareButton
                  title="30-Day Content Calendar"
                  text={`Generated a 30-Day publishing plan for ${result.niche} on TrendlyInside!`}
                  url={window.location.href}
                />
                <button
                  onClick={() => setResult(null)}
                  className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  New Plan
                </button>
              </div>
            </div>

            {/* Content Pillars Distribution */}
            <div className="card p-6 md:p-8 bg-gradient-to-br from-white to-[#F0F5FA] border-2 border-[#C2D6EC]/50 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="w-5 h-5 text-[#4A6D99]" />
                <h3 className="font-heading font-semibold text-lg text-midnight-abyss">Content Pillar Distribution</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {result.contentPillars.map((p, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
                    <span className="text-xl font-bold text-[#4A6D99] block mb-1">{p.percentage}</span>
                    <span className="text-xs font-semibold text-midnight-abyss">{p.pillar}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Banner */}
            <AdBanner className="my-4" />

            {/* 4-Week Progressive Calendar Grid */}
            <div className="space-y-6">
              {result.weeks.map((week) => (
                <div key={week.weekNumber} className="card p-6 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-gray-100">
                    <div>
                      <span className="text-xs font-bold text-[#4A6D99] uppercase tracking-wide">
                        Week {week.weekNumber}
                      </span>
                      <h3 className="text-lg font-heading font-bold text-midnight-abyss">{week.theme}</h3>
                    </div>
                    <span className="text-xs bg-[#C2D6EC]/30 text-[#4A6D99] px-3 py-1 rounded-full font-medium">
                      7 Days Scheduled
                    </span>
                  </div>

                  {/* Days */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {week.days.map((day) => (
                      <div key={day.day} className="bg-[#F8FAFC] p-3.5 rounded-xl border border-gray-200 space-y-2 hover:border-[#4A6D99]/40 transition-colors">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-midnight-abyss">
                            Day {day.day} • {day.dayName}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-semibold">
                            {day.format}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-midnight-abyss leading-snug">{day.title}</h4>
                        <div className="bg-white p-2 rounded-lg border border-gray-100 text-[11px] text-gray-600">
                          <strong className="text-[#4A6D99] block mb-0.5">Hook:</strong>
                          "{day.hook}"
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-frosty-slate pt-1">
                          <span>{day.platform}</span>
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700 font-medium">
                            {day.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Production Rules */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-3">
                <CheckSquare className="w-5 h-5 text-[#4A6D99]" />
                <h3 className="font-heading font-semibold text-lg text-midnight-abyss">
                  Consistency & Batching Rules
                </h3>
              </div>
              <ul className="space-y-2">
                {result.productionRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 bg-[#F0F5FA] p-3 rounded-lg">
                    <span className="text-[#4A6D99] font-bold">✓</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
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
