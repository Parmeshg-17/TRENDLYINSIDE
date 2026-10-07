import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Video, Sparkles, Map, BookOpen, ArrowRight, Home } from 'lucide-react';
import { useSEO } from '../lib/seo';

export default function NotFoundPage() {
  useSEO({
    title: 'Page Not Found | TrendlyInside',
    description: "The page or trail you are looking for doesn't exist on TrendlyInside. Explore our free AI creator intelligence tools.",
    path: '/404',
    noindex: true,
  });

  const POPULAR_PAGES = [
    {
      title: 'YouTube Video Analyzer',
      desc: 'Find weak hooks, storytelling gaps, and retention drop-offs.',
      path: '/youtube-video-analyzer',
      icon: Video,
    },
    {
      title: 'YouTube Shorts Analyzer',
      desc: 'Diagnose first 3 seconds, pacing, and viral potential.',
      path: '/youtube-shorts-analyzer',
      icon: Sparkles,
    },
    {
      title: 'Viral Hook Generator',
      desc: 'Generate 20 high-converting psychological hooks.',
      path: '/hook-generator',
      icon: Sparkles,
    },
    {
      title: '30-Day Growth Roadmap',
      desc: 'Formulate a week-by-week execution plan.',
      path: '/growth-roadmap-generator',
      icon: Map,
    },
    {
      title: 'Creator Guides & Articles',
      desc: 'Read actionable advice on retention and click-through rate.',
      path: '/blog',
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Mountain Compass Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 rounded-3xl bg-gradient-to-br from-glacial-sky/30 to-alpenglow/30 border border-glacial-sky/50 flex items-center justify-center mx-auto mb-6 shadow-sm"
        >
          <Compass className="w-10 h-10 text-fjord-blue animate-pulse" />
        </motion.div>

        <span className="badge-primary text-xs font-semibold mb-3 inline-flex">
          HTTP 404 • Trail Not Found
        </span>

        <h1 className="font-heading font-bold text-3xl md:text-5xl text-midnight-abyss mb-3">
          Looks like this trail ends here.
        </h1>

        <p className="text-frosty-slate text-sm md:text-base max-w-lg mx-auto mb-8 leading-relaxed">
          The page you requested doesn't exist, was moved, or never started. Head back to basecamp or jump straight into one of our creator intelligence tools below.
        </p>

        {/* Primary Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Link to="/" className="btn-primary text-sm py-3 px-6 flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link to="/youtube-video-analyzer" className="btn-secondary text-sm py-3 px-6 flex items-center gap-2">
            <Video className="w-4 h-4 text-fjord-blue" />
            <span>Analyze a YouTube Video</span>
          </Link>
        </div>

        {/* Suggested Helpful Pages */}
        <div className="text-left bg-white rounded-2xl border border-glacial-sky/30 shadow-card p-6 md:p-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-fjord-blue mb-4">
            Popular Creator Tools &amp; Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {POPULAR_PAGES.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.path}
                  to={page.path}
                  className="p-3.5 rounded-xl border border-glacial-sky/25 hover:border-glacial-sky/70 hover:bg-glacial-sky/10 transition-all flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-glacial-sky/20 flex items-center justify-center shrink-0 text-fjord-blue group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs md:text-sm font-semibold text-midnight-abyss group-hover:text-fjord-blue transition-colors flex items-center justify-between">
                      <span className="truncate">{page.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                    </div>
                    <p className="text-2xs text-frosty-slate truncate mt-0.5">
                      {page.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
