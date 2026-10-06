import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ChevronDown, ChevronUp, ArrowRight, Share2 } from 'lucide-react';

// =============================================
// CopyButton
// =============================================
interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label = 'Copy', className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button onClick={handleCopy} className={`copy-btn ${className}`}>
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-green-600" />
          <span className="text-green-600">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}

// =============================================
// YoutubeIcon
// =============================================
export function YoutubeIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}


// =============================================
// StrengthWeaknessCard
// =============================================
interface StrengthWeaknessProps {
  strengths: string[];
  weaknesses: string[];
}

export function StrengthWeaknessCard({ strengths, weaknesses }: StrengthWeaknessProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Strengths */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-5"
      >
        <h4 className="font-semibold text-midnight-abyss mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm">✓</span>
          What's Working
        </h4>
        <ul className="space-y-2.5">
          {strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-midnight-abyss">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Weaknesses */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-5"
      >
        <h4 className="font-semibold text-midnight-abyss mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-sm">✗</span>
          Needs Improvement
        </h4>
        <ul className="space-y-2.5">
          {weaknesses.map((w, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-midnight-abyss">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
              {w}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

// =============================================
// RecommendationCard
// =============================================
interface RecommendationCardProps {
  recommendations: Array<{ title: string; description: string; priority: string }>;
}

const priorityConfig = {
  High: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  Medium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  Low: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
};

export function RecommendationCards({ recommendations }: RecommendationCardProps) {
  return (
    <div className="space-y-3">
      {recommendations.map((rec, i) => {
        const config = priorityConfig[rec.priority as keyof typeof priorityConfig] || priorityConfig.Low;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`card p-5 border ${config.border}`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h5 className="font-semibold text-midnight-abyss text-sm flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-fjord-blue shrink-0" />
                {rec.title}
              </h5>
              <span className={`badge shrink-0 ${config.bg} ${config.text}`}>
                {rec.priority}
              </span>
            </div>
            <p className="text-sm text-frosty-slate leading-relaxed pl-6">{rec.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

// =============================================
// NextStepsCard
// =============================================
export function NextStepsCard({ steps }: { steps: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="card p-6"
      style={{ background: 'linear-gradient(135deg, #F7FAFC 0%, #E8F0F7 100%)' }}
    >
      <h4 className="font-heading font-bold text-midnight-abyss text-lg mb-4">Your Next Steps</h4>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-fjord-blue text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">
              {i + 1}
            </span>
            <span className="text-sm text-midnight-abyss">{step}</span>
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

// =============================================
// AnalysisDetailCard (expandable)
// =============================================
interface AnalysisDetailCardProps {
  title: string;
  score: number;
  verdict?: string;
  details?: string;
  improvements?: string[];
  suggestions?: string[];
  icon?: React.ReactNode;
  delay?: number;
}

export function AnalysisDetailCard({
  title,
  score,
  verdict,
  details,
  improvements = [],
  suggestions = [],
  icon,
  delay = 0,
}: AnalysisDetailCardProps) {
  const [expanded, setExpanded] = useState(false);
  const allSuggestions = [...improvements, ...suggestions];

  const getColor = (s: number) => {
    if (s >= 80) return 'text-green-600';
    if (s >= 60) return 'text-fjord-blue';
    if (s >= 40) return 'text-amber-600';
    return 'text-red-600';
  };

  const getBg = (s: number) => {
    if (s >= 80) return 'bg-green-50 border-green-200';
    if (s >= 60) return 'bg-glacial-sky/10 border-glacial-sky/30';
    if (s >= 40) return 'bg-amber-50 border-amber-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 }}
      className={`card border ${getBg(score)} overflow-hidden`}
    >
      <div
        className="flex items-center justify-between p-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-fjord-blue">
              {icon}
            </div>
          )}
          <div>
            <h5 className="font-semibold text-midnight-abyss text-sm">{title}</h5>
            {verdict && <p className="text-xs text-frosty-slate mt-0.5">{verdict}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`font-bold text-lg ${getColor(score)}`}>{score}<span className="text-xs font-normal text-frosty-slate">/100</span></span>
          {expanded ? <ChevronUp className="w-4 h-4 text-frosty-slate" /> : <ChevronDown className="w-4 h-4 text-frosty-slate" />}
        </div>
      </div>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-5 pb-5 border-t border-glacial-sky/20"
        >
          {details && <p className="text-sm text-midnight-abyss mt-4 leading-relaxed">{details}</p>}
          {allSuggestions.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-frosty-slate uppercase tracking-wide mb-2">Improvements</p>
              <ul className="space-y-2">
                {allSuggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-midnight-abyss">
                    <span className="text-fjord-blue mt-1">→</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// =============================================
// AdBanner
// =============================================
export function AdBanner({ className = '' }: { className?: string }) {
  return (
    <div className={`ad-banner ${className}`}>
      <div className="text-center">
        <p className="text-xs font-medium text-frosty-slate uppercase tracking-wide mb-1">Advertisement</p>
        <p className="text-sm text-frosty-slate">
          Ads help us keep TrendlyInside completely free. Thank you for your support! 🙏
        </p>
        {/* AdSense slot would go here */}
        {/* <ins className="adsbygoogle" ... /> */}
      </div>
    </div>
  );
}

// =============================================
// ErrorCard
// =============================================
export function ErrorCard({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card p-8 text-center border border-red-200"
    >
      <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">⚠️</span>
      </div>
      <h3 className="font-heading font-bold text-midnight-abyss text-lg mb-2">Analysis Failed</h3>
      <p className="text-sm text-frosty-slate mb-6 max-w-md mx-auto">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary text-sm">
          Try Again
        </button>
      )}
    </motion.div>
  );
}

// =============================================
// ShareButton
// =============================================
export function ShareButton({
  title = 'TrendlyInside Analysis Report',
  text = 'Check out this AI YouTube analysis on TrendlyInside:',
  url
}: {
  title?: string;
  text?: string;
  url?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const targetUrl = url || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: targetUrl });
        return;
      } catch {
        // User dismissed share dialog
      }
    }
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const el = document.createElement('textarea');
      el.value = targetUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button onClick={handleShare} className="btn-secondary text-sm py-2">
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600" />
          <span className="text-green-600">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 text-fjord-blue" />
          <span>Share Analysis</span>
        </>
      )}
    </button>
  );
}

// =============================================
// CreatorToolkit (Affiliate Partners)
// =============================================
export function CreatorToolkit() {
  const tools = [
    { name: 'Canva', desc: 'Create 12%+ CTR thumbnails with proven creator templates', tag: 'Thumbnails', url: 'https://canva.com' },
    { name: 'CapCut', desc: 'Fast vertical video editing with auto kinetic captions', tag: 'Shorts Editing', url: 'https://capcut.com' },
    { name: 'TubeBuddy', desc: 'A/B test video thumbnails and title combinations', tag: 'YouTube SEO', url: 'https://tubebuddy.com' },
    { name: 'VidIQ', desc: 'Real-time competitor keyword tracking and viral alerts', tag: 'Analytics', url: 'https://vidiq.com' },
    { name: 'Beehiiv', desc: 'Own your creator audience with an email newsletter', tag: 'Newsletter', url: 'https://beehiiv.com' },
    { name: 'Notion', desc: 'Organize video scripts, research, and content calendars', tag: 'Workflows', url: 'https://notion.so' },
  ];

  return (
    <div className="card p-6 border border-glacial-sky/30">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="badge badge-primary text-xs mb-1">Recommended Tools</span>
          <h3 className="font-heading font-bold text-lg text-midnight-abyss">Creator Growth Toolkit</h3>
        </div>
        <span className="text-xs text-frosty-slate">Essential resources</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tools.map((t) => (
          <a
            key={t.name}
            href={t.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="p-3.5 rounded-xl border border-glacial-sky/20 bg-glacial-sky/5 hover:bg-glacial-sky/20 transition-all block group no-underline"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-sm text-midnight-abyss group-hover:text-fjord-blue transition-colors">
                {t.name}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-frosty-slate border border-glacial-sky/30">
                {t.tag}
              </span>
            </div>
            <p className="text-xs text-frosty-slate line-clamp-2 leading-relaxed">{t.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

