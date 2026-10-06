import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Zap, ChevronDown, Play, Video, BarChart2,
  Lightbulb, Map
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiToolsOpen, setAiToolsOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setAiToolsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Click outside and ESC key listener for dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAiToolsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setAiToolsOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/92 backdrop-blur-md border-b border-glacial-sky/35 shadow-sm py-2.5'
          : 'bg-white/80 backdrop-blur-md border-b border-glacial-sky/20 py-3.5'
      }`}
    >
      <nav className="container-main flex items-center justify-between" aria-label="Main Navigation">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group flex-shrink-0"
          aria-label="TrendlyInside Home"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-fjord-blue via-[#3b5d88] to-midnight-abyss flex items-center justify-center shadow-btn group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl tracking-tight text-midnight-abyss leading-tight">
              TrendlyInside
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1.5">
          <Link
            to="/youtube-video-analyzer"
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
              isActive('/youtube-video-analyzer')
                ? 'bg-glacial-sky/25 text-fjord-blue shadow-2xs'
                : 'text-midnight-abyss/85 hover:text-fjord-blue hover:bg-glacial-sky/15'
            }`}
          >
            Video Analyzer
          </Link>

          <Link
            to="/youtube-shorts-analyzer"
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
              isActive('/youtube-shorts-analyzer')
                ? 'bg-glacial-sky/25 text-fjord-blue shadow-2xs'
                : 'text-midnight-abyss/85 hover:text-fjord-blue hover:bg-glacial-sky/15'
            }`}
          >
            Shorts Analyzer
          </Link>

          <Link
            to="/youtube-channel-analyzer"
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
              isActive('/youtube-channel-analyzer')
                ? 'bg-glacial-sky/25 text-fjord-blue shadow-2xs'
                : 'text-midnight-abyss/85 hover:text-fjord-blue hover:bg-glacial-sky/15'
            }`}
          >
            Channel Analyzer
          </Link>

          {/* AI Tools Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setAiToolsOpen(!aiToolsOpen)}
              onMouseEnter={() => setAiToolsOpen(true)}
              aria-expanded={aiToolsOpen}
              className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                aiToolsOpen || ['/hook-generator', '/viral-idea-generator', '/growth-roadmap-generator'].includes(location.pathname)
                  ? 'bg-glacial-sky/25 text-fjord-blue'
                  : 'text-midnight-abyss/85 hover:text-fjord-blue hover:bg-glacial-sky/15'
              }`}
            >
              <span>AI Tools</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 text-frosty-slate ${
                  aiToolsOpen ? 'rotate-180 text-fjord-blue' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {aiToolsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  onMouseLeave={() => setAiToolsOpen(false)}
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl p-2.5 border border-glacial-sky/35 shadow-card-hover z-50"
                >
                  <div className="text-2xs font-bold uppercase tracking-wider text-frosty-slate px-3 pt-1 pb-2">
                    Core AI Generators
                  </div>

                  <Link
                    to="/hook-generator"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-glacial-sky/15 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/60 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-midnight-abyss group-hover:text-fjord-blue flex items-center gap-1.5">
                        Hook Generator
                        <span className="badge-primary text-2xs py-0 px-1.5">20 Hooks</span>
                      </div>
                      <p className="text-2xs text-frosty-slate leading-snug mt-0.5">
                        Psychological hooks across 6 viral angles
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/viral-idea-generator"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-glacial-sky/15 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-midnight-abyss group-hover:text-fjord-blue flex items-center gap-1.5">
                        Viral Idea Generator
                        <span className="badge-primary text-2xs py-0 px-1.5">50 Ideas</span>
                      </div>
                      <p className="text-2xs text-frosty-slate leading-snug mt-0.5">
                        Niche-tailored content angles &amp; formats
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/growth-roadmap-generator"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-glacial-sky/15 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200/60 text-teal-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Map className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-midnight-abyss group-hover:text-fjord-blue flex items-center gap-1.5">
                        Growth Roadmap Generator
                        <span className="badge-primary text-2xs py-0 px-1.5">30 Days</span>
                      </div>
                      <p className="text-2xs text-frosty-slate leading-snug mt-0.5">
                        Weekly milestone blueprint &amp; priorities
                      </p>
                    </div>
                  </Link>

                  <div className="mt-2 pt-2 border-t border-glacial-sky/20 px-3 py-1 flex items-center justify-between text-2xs text-frosty-slate">
                    <span>Explore all creator tools</span>
                    <Link to="/#tools" className="text-fjord-blue font-semibold hover:underline flex items-center gap-0.5">
                      All tools →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/blog"
            className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
              isActive('/blog')
                ? 'bg-glacial-sky/25 text-fjord-blue shadow-2xs'
                : 'text-midnight-abyss/85 hover:text-fjord-blue hover:bg-glacial-sky/15'
            }`}
          >
            Blog
          </Link>
        </div>

        {/* Right Action CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/youtube-video-analyzer"
            className="btn-primary text-sm py-2 px-4 shadow-btn"
            id="nav-analyze-now-btn"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Analyze Now</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            to="/youtube-video-analyzer"
            className="btn-primary text-xs py-1.5 px-3 shadow-btn"
          >
            Analyze
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            className="p-2 rounded-xl bg-glacial-sky/20 text-midnight-abyss hover:bg-glacial-sky/40 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="lg:hidden border-t border-glacial-sky/30 bg-white shadow-xl overflow-hidden"
          >
            <div className="container-main py-5 flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
              <div className="text-2xs font-bold uppercase tracking-wider text-frosty-slate px-3 pb-1">
                Core Analyzers
              </div>
              <Link
                to="/youtube-video-analyzer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm text-midnight-abyss hover:bg-glacial-sky/15"
              >
                <Video className="w-4 h-4 text-red-500" />
                <span>YouTube Video Analyzer</span>
              </Link>
              <Link
                to="/youtube-shorts-analyzer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm text-midnight-abyss hover:bg-glacial-sky/15"
              >
                <Play className="w-4 h-4 text-purple-500" />
                <span>YouTube Shorts Analyzer</span>
              </Link>
              <Link
                to="/youtube-channel-analyzer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm text-midnight-abyss hover:bg-glacial-sky/15"
              >
                <BarChart2 className="w-4 h-4 text-fjord-blue" />
                <span>YouTube Channel Analyzer</span>
              </Link>

              <div className="text-2xs font-bold uppercase tracking-wider text-frosty-slate px-3 pt-3 pb-1">
                AI Generators
              </div>
              <Link
                to="/hook-generator"
                className="flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-sm text-midnight-abyss hover:bg-glacial-sky/15"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Viral Hook Generator (20 Hooks)</span>
              </Link>
              <Link
                to="/viral-idea-generator"
                className="flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-sm text-midnight-abyss hover:bg-glacial-sky/15"
              >
                <Lightbulb className="w-4 h-4 text-emerald-500" />
                <span>Viral Idea Generator (50 Ideas)</span>
              </Link>
              <Link
                to="/growth-roadmap-generator"
                className="flex items-center gap-3 px-3 py-2 rounded-xl font-medium text-sm text-midnight-abyss hover:bg-glacial-sky/15"
              >
                <Map className="w-4 h-4 text-teal-500" />
                <span>30-Day Growth Roadmap</span>
              </Link>

              <div className="text-2xs font-bold uppercase tracking-wider text-frosty-slate px-3 pt-3 pb-1">
                Resources &amp; Company
              </div>
              <Link
                to="/blog"
                className="px-3 py-2 rounded-xl font-medium text-sm text-midnight-abyss hover:bg-glacial-sky/15"
              >
                Creator Blog
              </Link>
              <Link
                to="/about"
                className="px-3 py-2 rounded-xl font-medium text-sm text-midnight-abyss hover:bg-glacial-sky/15"
              >
                About TrendlyInside
              </Link>
              <Link
                to="/contact"
                className="px-3 py-2 rounded-xl font-medium text-sm text-midnight-abyss hover:bg-glacial-sky/15"
              >
                Contact
              </Link>

              <div className="pt-3 mt-2 border-t border-glacial-sky/20">
                <Link
                  to="/youtube-video-analyzer"
                  className="btn-primary w-full text-sm py-2.5 justify-center"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Free Analysis</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
