import { useState } from 'react';
import { HelpCircle, ChevronDown, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FAQItem {
  id: string;
  q: string;
  a: string;
  needsConfirmation?: string;
}

export const GENERAL_FAQS: FAQItem[] = [
  {
    id: 'how-it-works',
    q: 'How does TrendlyInside analyze videos and channels?',
    a: 'TrendlyInside inspects video packaging, title phrasing, hook psychology, duration signals, and retention indicators. It runs this metadata through our creator intelligence AI engine to generate detailed scores, retention drop-off warnings, and concrete rewrites for titles and hooks.',
  },
  {
    id: 'free-no-account',
    q: 'Is TrendlyInside completely free, and do I need an account?',
    a: 'Yes. Every tool—including the YouTube Video Analyzer, Shorts Analyzer, Channel Analyzer, Hook Generator, Viral Idea Generator, and 30-Day Growth Roadmap—is 100% free with no account creation, sign-up forms, or payment information required.',
  },
  {
    id: 'google-oauth',
    q: 'Do I need to connect or grant access to my Google or YouTube Studio account?',
    a: 'No. TrendlyInside never requests Google OAuth permissions or YouTube Studio login credentials. All analysis is performed strictly using publicly accessible video and channel URLs, ensuring your creator account remains completely secure.',
  },
  {
    id: 'supported-platforms',
    q: 'Which video platforms and content formats are supported?',
    a: 'TrendlyInside supports YouTube long-form videos, YouTube Shorts, YouTube Channels, Instagram Reels, and TikTok videos. You can also analyze YouTube thumbnails, generate 20 psychological hook variations, and create 30-day creator roadmaps.',
  },
  {
    id: 'competitor-analysis',
    q: 'Can I analyze competitor videos or channels?',
    a: 'Yes. Because our platform relies entirely on public URL inputs without requiring channel ownership verification, you can analyze any competitor video or channel to uncover their retention frameworks, audience gaps, and packaging strategies.',
  },
  {
    id: 'hook-score',
    q: 'What is the Hook Score and what does a high score mean?',
    a: 'The Hook Score measures how effectively the first 5 to 15 seconds capture viewer attention and establish the promised payoff. Scores above 75 reflect strong curiosity gaps and immediate stakes, while scores below 60 signal slow intros or delayed gratification.',
  },
  {
    id: 'rate-limits',
    q: 'Are there any usage limits on free analyses?',
    a: 'To protect server capacity and prevent automated bot abuse, we apply a fair-use limit (approximately 20 analyses per hour per IP address). When the hourly window lapses, your quota resets automatically.',
    needsConfirmation: 'Confirm whether you want to display the 20 requests/hour limit explicitly or describe it more broadly as a fair-usage quota.',
  },
  {
    id: 'data-privacy',
    q: 'How does TrendlyInside protect creator privacy and data?',
    a: 'We operate on a strict Zero-Account principle. We do not store your search history on our servers, build advertising profiles, or sell data. Inputs are processed ephemerally by our AI engine and cached locally in your browser session only.',
    needsConfirmation: 'Confirm whether any server-side database history or account saving will be added in future updates.',
  },
];

/**
 * FAQ Section Component
 * Note: FAQ schema (FAQPage structured data) is deliberately NOT included,
 * per Google Search documentation (Google no longer shows FAQ rich snippets for commercial sites).
 */
export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(GENERAL_FAQS[0].id);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="section bg-section-alt border-t border-glacial-sky/20" aria-label="Frequently Asked Questions">
      <div className="container-main max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-glacial-sky/20 text-fjord-blue border border-glacial-sky/35 mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="section-title mt-2">Frequently Asked Questions</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Everything you need to know about TrendlyInside's free AI creator intelligence, supported platforms, and data privacy.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 mb-10">
          {GENERAL_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`card transition-all overflow-hidden border ${
                  isOpen ? 'border-fjord-blue/50 shadow-card bg-white' : 'border-glacial-sky/30 hover:border-glacial-sky/60 bg-white/80'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-heading font-bold text-base text-midnight-abyss focus:outline-none focus:ring-2 focus:ring-fjord-blue/30 rounded-xl"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-fjord-blue shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-frosty-slate shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-fjord-blue' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-sm text-frosty-slate leading-relaxed border-t border-glacial-sky/15">
                        <p>{faq.a}</p>

                        {/* Owner Confirmation Flag (if applicable) */}
                        {faq.needsConfirmation && (
                          <div className="mt-3 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <strong className="font-semibold">[Needs Confirmation]: </strong>
                              <span>{faq.needsConfirmation}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Have More Questions Footer */}
        <div className="card p-6 text-center border-glacial-sky/35 bg-white">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="font-heading font-bold text-base text-midnight-abyss">
                Have a question not listed here?
              </h4>
              <p className="text-xs text-frosty-slate mt-0.5">
                Our team is happy to help clarify features, roadmap additions, or creator partnerships.
              </p>
            </div>
            <a
              href="/contact"
              className="btn-primary text-xs py-2.5 px-5 shrink-0"
              id="faq-contact-us-btn"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
