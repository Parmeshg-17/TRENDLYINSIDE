import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Brain, Zap } from 'lucide-react';
import { AgentWaveLoader } from '@/components/ui/agent-wave-loader';

export interface LoadingStep {
  label: string;
  status?: 'complete' | 'loading' | 'pending';
}

interface LoadingStateProps {
  title?: string;
  subtitle?: string;
  steps?: LoadingStep[];
}

const DEFAULT_STEPS: LoadingStep[] = [
  { label: 'Validating URL & platform format' },
  { label: 'Fetching video metadata & title context' },
  { label: 'Analyzing opening hook tension & payoff' },
  { label: 'Evaluating storytelling & pacing structure' },
  { label: 'Checking audience engagement & CTA placement' },
  { label: 'Synthesizing recommendations & action plan' },
];

const EDUCATIONAL_TIPS = [
  'Strong openings establish curiosity, tension, or high value in the first 5 seconds.',
  'Thumbnails with 3 or fewer focal elements produce 34% higher click-through rates.',
  'Pattern interrupts every 20–30 seconds prevent passive audience drop-off.',
  'A single, unambiguous call-to-action converts 3x higher than multiple competing asks.',
  'The best retention curves maintain momentum without delayed logos or throat-clearing.',
  'Curiosity gaps work best when you tease the payoff without spoiling the journey.',
];

export default function LoadingState({
  title = 'Analyzing Content...',
  subtitle = 'Evaluating performance signals and generating tailored creator intelligence...',
  steps = DEFAULT_STEPS,
}: LoadingStateProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  // Progressive step animation
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStepIndex((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 1800);

    return () => clearInterval(stepInterval);
  }, [steps.length]);

  // Rotating tips
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % EDUCATIONAL_TIPS.length);
    }, 3800);

    return () => clearInterval(tipInterval);
  }, []);

  const progressPercent = Math.min(
    100,
    Math.round(((activeStepIndex + 1) / steps.length) * 100)
  );

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 max-w-xl mx-auto relative">
      {/* ── 21st.dev Multi-Model Wave Loader ─────────────────────── */}
      <div className="mb-6 p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-glacial-sky/35 shadow-sm flex flex-col items-center">
        <AgentWaveLoader
          durationMs={2400}
          label="Multi-Model Intelligence Processing"
          className="scale-110"
        />
      </div>

      {/* ── Heading & Subtitle ───────────────────────────────────── */}
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading text-2xl md:text-3xl font-bold text-midnight-abyss text-center mb-1.5"
      >
        {title}
      </motion.h2>

      <p className="text-frosty-slate text-xs md:text-sm text-center max-w-md mb-6 leading-relaxed">
        {subtitle}
      </p>

      {/* ── 21st.dev Stepped Pipeline Card ───────────────────────── */}
      <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl border border-glacial-sky/35 shadow-card p-5 mb-5 relative overflow-hidden">
        {/* Shimmering Progress Bar Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-semibold text-midnight-abyss mb-1.5">
            <span className="flex items-center gap-1.5 text-frosty-slate">
              <Zap className="w-3.5 h-3.5 text-fjord-blue" />
              Step {activeStepIndex + 1} of {steps.length}
            </span>
            <span className="text-fjord-blue font-bold tracking-tight">
              {progressPercent}%
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-glacial-sky/25 overflow-hidden relative">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-fjord-blue via-[#7B9CC4] to-[#FADADD] relative"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Light reflection scan effect */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </motion.div>
          </div>
        </div>

        {/* Step Items List */}
        <div className="space-y-2.5">
          {steps.map((step, idx) => {
            const isComplete = step.status
              ? step.status === 'complete'
              : idx < activeStepIndex;
            const isLoading = step.status
              ? step.status === 'loading'
              : idx === activeStepIndex;
            const isPending = step.status
              ? step.status === 'pending'
              : idx > activeStepIndex;

            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
                  isLoading
                    ? 'bg-gradient-to-r from-glacial-sky/25 via-white to-transparent border border-glacial-sky/40 shadow-xs'
                    : 'hover:bg-slate-50/60'
                }`}
              >
                {/* Status Indicator Icon */}
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  {isComplete && (
                    <motion.div
                      initial={{ scale: 0.6, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-5 h-5 rounded-full bg-emerald-100/90 text-emerald-600 flex items-center justify-center shadow-2xs"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </motion.div>
                  )}
                  {isLoading && (
                    <div className="w-5 h-5 flex items-center justify-center">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fjord-blue opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-fjord-blue shadow-xs" />
                      </span>
                    </div>
                  )}
                  {isPending && (
                    <div className="w-4 h-4 rounded-full border border-dashed border-glacial-sky/60 bg-white/40" />
                  )}
                </div>

                {/* Step Text */}
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <span
                    className={`text-xs md:text-sm truncate transition-colors ${
                      isComplete
                        ? 'text-midnight-abyss font-medium'
                        : isLoading
                        ? 'text-fjord-blue font-bold'
                        : 'text-frosty-slate/75'
                    }`}
                  >
                    {step.label}
                  </span>

                  {isLoading && (
                    <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-fjord-blue/10 text-fjord-blue shrink-0 animate-pulse">
                      Analyzing...
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Creator Intelligence Tip Card ──────────────────────── */}
      <div className="w-full bg-gradient-to-r from-[#FADADD]/15 via-white/80 to-[#C2D6EC]/15 backdrop-blur-sm rounded-xl border border-glacial-sky/35 p-3.5 text-center shadow-xs">
        <div className="flex items-center justify-center gap-1.5 text-2xs font-bold text-fjord-blue uppercase tracking-wider mb-1">
          <Brain className="w-3.5 h-3.5 text-fjord-blue" />
          <span>Creator Intelligence Tip</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={tipIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="text-xs md:text-sm text-midnight-abyss leading-relaxed italic"
          >
            "{EDUCATIONAL_TIPS[tipIndex]}"
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="mt-4 text-2xs text-frosty-slate text-center">
        Analysis takes 4–10 seconds • 100% Free &amp; No Login Required
      </p>
    </div>
  );
}

// Skeleton loader for cards
export function CardSkeleton() {
  return (
    <div className="card p-6 space-y-4">
      <div className="skeleton h-5 w-32 rounded" />
      <div className="skeleton h-3 w-full rounded" />
      <div className="skeleton h-3 w-4/5 rounded" />
      <div className="skeleton h-8 w-24 rounded-full" />
    </div>
  );
}
