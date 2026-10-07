import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCookieConsent, setCookieConsent, initGA } from '../lib/analytics';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookieConsent();
    if (consent === null) {
      // Delay showing banner slightly to avoid layout shifts on initial load
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    } else if (consent === 'granted') {
      initGA();
    }
  }, []);

  const handleAccept = () => {
    setCookieConsent('granted');
    setVisible(false);
  };

  const handleDecline = () => {
    setCookieConsent('denied');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          role="region"
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-4 md:p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-glacial-sky/50 shadow-2xl text-midnight-abyss"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-glacial-sky/20 text-fjord-blue flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-sm text-midnight-abyss">
                Privacy &amp; Cookie Choices
              </h3>
            </div>
            <button
              onClick={handleDecline}
              aria-label="Dismiss cookie notice without tracking"
              className="text-frosty-slate hover:text-midnight-abyss p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-frosty-slate leading-relaxed mb-4">
            We use anonymous analytics to understand how creators interact with TrendlyInside. We never sell personal data or use ad-retargeting trackers.{' '}
            <Link to="/privacy" className="text-fjord-blue underline hover:text-midnight-abyss">
              Read our Privacy Policy
            </Link>.
          </p>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleAccept}
              className="btn-primary flex-1 text-xs py-2 px-3 justify-center"
            >
              Accept Cookies
            </button>
            <button
              onClick={handleDecline}
              className="btn-secondary flex-1 text-xs py-2 px-3 justify-center"
            >
              Decline
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
