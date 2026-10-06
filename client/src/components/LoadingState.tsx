import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Sparkles } from 'lucide-react';

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
  { label: 'Fetching content details & metadata' },
  { label: 'Analyzing hook strength & tension' },
  { label: 'Evaluating storytelling & pacing' },
  { label: 'Checking engagement & CTA signals' },
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
    }, 4000);

    return () => clearInterval(tipInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 max-w-xl mx-auto">
      {/* Alpine Mountain Intelligence Spinner */}
      <div className="relative mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fjord-blue to-midnight-abyss flex items-center justify-center shadow-btn"
        >
          <Loader2 className="w-8 h-8 text-white" />
        </motion.div>
        <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alpenglow opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FADADD] border-2 border-white" />
        </span>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-heading text-2xl md:text-3xl font-bold text-midnight-abyss text-center mb-2"
      >
        {title}
      </motion.h2>

      <p className="text-frosty-slate text-sm text-center max-w-md mb-8">
        {subtitle}
      </p>

      {/* Step Indicators */}
      <div className="w-full bg-white rounded-2xl border border-glacial-sky/30 shadow-card p-5 mb-6 space-y-3">
        {steps.map((step, idx) => {
          // If step has explicit status, respect it; otherwise use progressive index
          const isComplete = step.status ? step.status === 'complete' : idx < activeStepIndex;
          const isLoading = step.status ? step.status === 'loading' : idx === activeStepIndex;
          const isPending = step.status ? step.status === 'pending' : idx > activeStepIndex;

          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="flex items-center gap-3 text-sm"
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                {isComplete && (
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                )}
                {isLoading && (
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fjord-blue opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-fjord-blue" />
                    </span>
                  </div>
                )}
                {isPending && (
                  <div className="w-4 h-4 rounded-full border-2 border-glacial-sky/60" />
                )}
              </div>

              <span
                className={`transition-colors duration-200 ${
                  isComplete
                    ? 'text-midnight-abyss font-medium'
                    : isLoading
                    ? 'text-fjord-blue font-semibold'
                    : 'text-frosty-slate/80'
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Rotating Educational Microcopy */}
      <div className="w-full bg-glacial-sky/15 rounded-xl border border-glacial-sky/30 p-4 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-fjord-blue uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5 text-fjord-blue" />
          <span>Creator Intelligence Tip</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={tipIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="text-xs md:text-sm text-midnight-abyss leading-relaxed italic"
          >
            "{EDUCATIONAL_TIPS[tipIndex]}"
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="mt-6 text-xs text-frosty-slate text-center">
        Analysis usually takes 4–10 seconds. Free &amp; no login required.
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
