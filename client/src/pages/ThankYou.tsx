import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Video, Home } from 'lucide-react';
import { useSEO } from '../lib/seo';

export default function ThankYouPage() {
  useSEO({
    title: 'Thank You | TrendlyInside',
    description: 'Thank you for contacting TrendlyInside. Your message has been received.',
    path: '/thank-you',
    noindex: true,
  });

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center py-16 px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-lg w-full bg-white rounded-3xl border border-glacial-sky/35 shadow-card p-8 md:p-10 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center mx-auto mb-5 shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="badge-primary text-xs font-semibold mb-2 inline-flex">
          Submission Received
        </span>

        <h1 className="font-heading font-bold text-2xl md:text-3xl text-midnight-abyss mb-3">
          Thank you for reaching out!
        </h1>

        <p className="text-frosty-slate text-sm leading-relaxed mb-6">
          We've received your message. Our team reviews creator feedback, tool suggestions, and support requests within <strong>24–48 hours</strong>.
        </p>

        <div className="p-4 rounded-xl bg-glacial-sky/15 border border-glacial-sky/30 text-left mb-6">
          <h2 className="text-xs font-bold text-fjord-blue uppercase tracking-wider mb-1.5">
            What Happens Next
          </h2>
          <ul className="text-xs text-midnight-abyss space-y-1.5">
            <li>• We investigate your inquiry or issue report thoroughly.</li>
            <li>• If a reply is needed, we will email you directly.</li>
            <li>• Bug reports and feature suggestions are prioritized weekly.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="btn-primary w-full sm:w-auto text-sm py-2.5 px-5 flex items-center justify-center gap-2">
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link to="/youtube-video-analyzer" className="btn-secondary w-full sm:w-auto text-sm py-2.5 px-5 flex items-center justify-center gap-2">
            <Video className="w-4 h-4 text-fjord-blue" />
            <span>Analyze a Video</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
