import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Eye, Palette, Type, Smartphone, Sparkles, RefreshCw, Upload, CheckCircle2 } from 'lucide-react';
import { analyzeThumbnail } from '../services/api';
import type { ThumbnailAnalysisResult } from '../types';
import LoadingState from '../components/LoadingState';
import { ScoreCircle, ScoreCard } from '../components/ScoreComponents';
import {
  RecommendationCards,
  AdBanner,
  ErrorCard,
  ShareButton,
  CreatorToolkit,
} from '../components/AnalysisComponents';

const FAQ = [
  {
    q: 'How does the AI predict thumbnail Click-Through Rate (CTR)?',
    a: 'We evaluate optical contrast, color theory, text word count, focal point sharpness, and visual emotion against millions of top-performing YouTube packaging designs.',
  },
  {
    q: 'Why does mobile readability matter so much?',
    a: 'Over 70% of YouTube views happen on mobile devices where thumbnails render at roughly 120x68 pixels. If your text or focal subject isn\'t instantly legible at that scale, viewers scroll right past.',
  },
  {
    q: 'Can I test multiple thumbnail concepts?',
    a: 'Yes! You can run each variant concept through the analyzer to compare scores and review generated A/B test hypotheses.',
  },
];

export default function ThumbnailAnalyzer() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [niche, setNiche] = useState('Tech & Reviews');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ThumbnailAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!title.trim()) {
      setError('Please provide the video title so we can evaluate title-thumbnail synergy');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await analyzeThumbnail({ title, imageUrl, niche });
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Thumbnail analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
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
            <ImageIcon className="w-3.5 h-3.5 text-[#FADADD]" />
            Phase 2 CTR Packaging & Visual Psychology
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
            YouTube Thumbnail Analyzer
          </h1>
          <p className="text-[#C2D6EC] text-base md:text-lg max-w-2xl mx-auto mb-8">
            Predict your Click-Through Rate (CTR), test mobile readability, and master visual psychology before uploading.
          </p>

          {/* Input Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl text-left border border-white/20 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1.5">
                  Video Title (Required for Context & Synergy) *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. I Tested 50 AI Tools: Here Are the Only 3 Worth Using"
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-gray-200 rounded-xl text-midnight-abyss placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A6D99] focus:bg-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1">
                    Thumbnail Image URL or YouTube Link
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://... or paste image link"
                    className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-lg text-midnight-abyss text-xs focus:outline-none focus:ring-2 focus:ring-[#4A6D99]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1">
                    Or Upload Image Directly
                  </label>
                  <label className="w-full px-3 py-2 bg-[#F8FAFC] border border-dashed border-gray-300 rounded-lg text-midnight-abyss text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-gray-100 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-gray-500" />
                    <span>Choose PNG/JPG</span>
                    <input type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
                  </label>
                </div>
              </div>

              {imageUrl && (
                <div className="p-2 bg-gray-50 rounded-lg flex items-center gap-3">
                  <img src={imageUrl} alt="Thumbnail preview" className="w-16 h-10 object-cover rounded shadow-sm border border-gray-200" />
                  <span className="text-xs text-green-700 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Thumbnail preview loaded
                  </span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-midnight-abyss mb-1">
                  Niche / Category
                </label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g. Gaming, Personal Finance, Lifestyle, Tech"
                  className="w-full px-3 py-2 bg-[#F8FAFC] border border-gray-200 rounded-lg text-midnight-abyss text-xs focus:outline-none focus:ring-2 focus:ring-[#4A6D99]"
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-base font-semibold shadow-md hover:shadow-lg transition-all"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Evaluating CTR & Visual Contrast...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze Thumbnail Packaging
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {isLoading && <LoadingState title="Analyzing Thumbnail Packaging..." />}

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
                <span className="text-xs uppercase font-bold tracking-wider text-frosty-slate">Packaging for Video</span>
                <p className="text-sm font-semibold text-midnight-abyss truncate max-w-lg">{result.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <ShareButton
                  title="Thumbnail Analysis"
                  text={`My thumbnail scored ${result.analysis.overallScore}/100 with predicted CTR of ${result.analysis.predictedCTR} on TrendlyInside!`}
                  url={window.location.href}
                />
                <button
                  onClick={() => {
                    setResult(null);
                    setImageUrl('');
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
                    Packaging Score
                  </span>
                  <ScoreCircle score={result.analysis.overallScore} size={150} />
                  <div className="mt-2 text-xs font-semibold px-2.5 py-1 bg-green-100 text-green-800 rounded-full inline-block">
                    Predicted CTR: {result.analysis.predictedCTR}
                  </div>
                </div>

                <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <ScoreCard
                    label="Contrast"
                    score={result.analysis.contrastScore}
                    icon={<Eye className="w-4 h-4 text-[#4A6D99]" />}
                  />
                  <ScoreCard
                    label="Text Readability"
                    score={result.analysis.readabilityScore}
                    icon={<Type className="w-4 h-4 text-[#4A6D99]" />}
                  />
                  <ScoreCard
                    label="Emotion Intensity"
                    score={result.analysis.emotionScore}
                    icon={<Sparkles className="w-4 h-4 text-[#4A6D99]" />}
                  />
                  <ScoreCard
                    label="Clickability"
                    score={result.analysis.clickabilityScore}
                    icon={<Palette className="w-4 h-4 text-[#4A6D99]" />}
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

            {/* Diagnostics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Focal Point & Mobile Check */}
              <div className="card p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#4A6D99]" />
                  <h3 className="font-heading font-semibold text-lg text-midnight-abyss">Focal Point & Mobile Scalability</h3>
                </div>
                <div className="bg-[#F0F5FA] p-3.5 rounded-xl border border-gray-100">
                  <span className="text-xs uppercase font-bold text-frosty-slate block mb-1">Identified Focal Subject</span>
                  <p className="text-xs text-midnight-abyss font-medium">{result.analysis.focalPointAnalysis.focalPoint}</p>
                </div>
                <div className="flex items-center gap-2 text-xs bg-white border border-gray-200 p-3 rounded-xl">
                  <Smartphone className="w-4 h-4 text-[#4A6D99]" />
                  <span>Mobile Verdict: <strong className="text-midnight-abyss">{result.analysis.mobileVerdict}</strong></span>
                </div>
                <ul className="space-y-1.5">
                  {result.analysis.focalPointAnalysis.suggestions.map((s, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className="text-[#4A6D99] font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color Psychology */}
              <div className="card p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-[#4A6D99]" />
                  <h3 className="font-heading font-semibold text-lg text-midnight-abyss">Color Psychology & Palette</h3>
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-frosty-slate block mb-1.5">Dominant Palette</span>
                  <div className="flex flex-wrap gap-2">
                    {result.analysis.colorPsychology.dominantColors.map((color, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-midnight-abyss">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-[#F0F5FA] p-3.5 rounded-xl border border-gray-100">
                  <span className="text-xs uppercase font-bold text-frosty-slate block mb-0.5">Emotional Vibe</span>
                  <p className="text-xs text-midnight-abyss font-semibold">{result.analysis.colorPsychology.emotionalVibe}</p>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {result.analysis.colorPsychology.recommendations}
                </p>
              </div>
            </div>

            {/* A/B Test Hypotheses */}
            {result.analysis.abTestSuggestions?.length > 0 && (
              <div className="card p-6">
                <h3 className="font-heading font-semibold text-lg text-midnight-abyss mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#4A6D99]" />
                  Recommended A/B Test Hypotheses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.analysis.abTestSuggestions.map((test, idx) => (
                    <div key={idx} className="bg-gradient-to-b from-[#F8FAFC] to-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <span className="text-xs font-bold text-[#4A6D99] uppercase tracking-wide block mb-1">
                        Variant {String.fromCharCode(65 + idx)}
                      </span>
                      <h4 className="text-xs font-bold text-midnight-abyss mb-2">{test.concept}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{test.hypothesis}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
