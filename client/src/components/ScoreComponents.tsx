import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ScoreCircleProps {
  score: number;
  size?: number;
  label?: string;
  sublabel?: string;
  animate?: boolean;
}

export interface ScoreTier {
  label: 'Excellent' | 'Strong' | 'Good' | 'Needs Improvement' | 'Critical';
  color: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
}

export function getScoreTier(score: number): ScoreTier {
  if (score >= 90) {
    return {
      label: 'Excellent',
      color: '#0d9488', // Teal 600
      badgeBg: 'bg-teal-50',
      badgeText: 'text-teal-700',
      borderColor: 'border-teal-200',
    };
  }
  if (score >= 75) {
    return {
      label: 'Strong',
      color: '#4A6D99', // Fjord Blue
      badgeBg: 'bg-blue-50',
      badgeText: 'text-blue-700',
      borderColor: 'border-blue-200',
    };
  }
  if (score >= 60) {
    return {
      label: 'Good',
      color: '#64748b', // Slate 600
      badgeBg: 'bg-slate-50',
      badgeText: 'text-slate-700',
      borderColor: 'border-slate-200',
    };
  }
  if (score >= 40) {
    return {
      label: 'Needs Improvement',
      color: '#d97706', // Amber 600
      badgeBg: 'bg-amber-50',
      badgeText: 'text-amber-700',
      borderColor: 'border-amber-200',
    };
  }
  return {
    label: 'Critical',
    color: '#dc2626', // Red 600
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-700',
    borderColor: 'border-rose-200',
  };
}

export function getScoreColor(score: number): string {
  return getScoreTier(score).color;
}

export function getScoreLabel(score: number): string {
  return getScoreTier(score).label;
}

export function ScoreCircle({ score, size = 160, label = 'Overall Score', sublabel, animate = true }: ScoreCircleProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (displayScore / 100) * circumference;
  const color = getScoreColor(score);

  useEffect(() => {
    if (animate) {
      let start = 0;
      const increment = score / 50;
      const timer = setInterval(() => {
        start += increment;
        if (start >= score) {
          start = score;
          clearInterval(timer);
        }
        setDisplayScore(Math.round(start));
      }, 20);
      return () => clearInterval(timer);
    } else {
      setDisplayScore(score);
    }
  }, [score, animate]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(148,169,208,0.15)"
            strokeWidth={12}
          />
          {/* Score fill */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={12}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animate ? circumference : dashOffset}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading font-bold text-4xl text-midnight-abyss leading-none">
            {displayScore}
          </span>
          <span className="text-xs text-frosty-slate mt-0.5">/ 100</span>
        </div>
      </div>
      <div className="text-center">
        <p className="font-semibold text-midnight-abyss text-sm">{label}</p>
        {sublabel && <p className="text-xs text-frosty-slate mt-0.5">{sublabel}</p>}
        <span
          className="badge mt-2"
          style={{
            backgroundColor: `${color}20`,
            color: color,
          }}
        >
          {getScoreLabel(score)}
        </span>
      </div>
    </div>
  );
}

interface ScoreCardProps {
  label: string;
  score: number;
  icon?: React.ReactNode;
  description?: string;
  delay?: number;
}

export function ScoreCard({ label, score, icon, description, delay = 0 }: ScoreCardProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const color = getScoreColor(score);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const increment = score / 40;
      const interval = setInterval(() => {
        start += increment;
        if (start >= score) {
          start = score;
          clearInterval(interval);
        }
        setDisplayScore(Math.round(start));
      }, 20);
    }, delay * 150);
    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="card p-5 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-glacial-sky/20 flex items-center justify-center text-fjord-blue">
              {icon}
            </div>
          )}
          <span className="font-semibold text-sm text-midnight-abyss">{label}</span>
        </div>
        <span className="font-bold text-xl" style={{ color }}>
          {displayScore}
          <span className="text-xs text-frosty-slate font-normal">/100</span>
        </span>
      </div>

      {/* Score bar */}
      <div className="score-bar-track">
        <motion.div
          className="h-2 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: '0%' }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: delay * 0.1 + 0.3 }}
        />
      </div>

      {description && (
        <p className="text-xs text-frosty-slate leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}

interface MiniScoreProps {
  label: string;
  score: number;
}

export function MiniScore({ label, score }: MiniScoreProps) {
  const color = getScoreColor(score);
  return (
    <div className="flex items-center justify-between py-2 border-b border-glacial-sky/10 last:border-0">
      <span className="text-sm text-midnight-abyss">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-20 h-1.5 bg-glacial-sky/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: '0%' }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <span className="text-sm font-semibold" style={{ color }}>{score}</span>
      </div>
    </div>
  );
}
